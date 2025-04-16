
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudents, createInvoice, updateInvoice } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Define schema for invoice items
const invoiceItemSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.coerce.number().min(0, { message: "Amount must be a positive number" }),
});

// Define the main form schema
const formSchema = z.object({
  studentId: z.string().min(1, { message: "Please select a student" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  term: z.string().min(1, { message: "Term is required" }),
  status: z.enum(['pending', 'paid', 'overdue', 'cancelled']),
  items: z.array(invoiceItemSchema).min(1, { message: "At least one item is required" }),
});

type FormValues = z.infer<typeof formSchema>;
type InvoiceItem = z.infer<typeof invoiceItemSchema>;

interface InvoiceFormProps {
  invoice?: Invoice;
  onSuccess: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onSuccess }) => {
  const queryClient = useQueryClient();
  
  // Initialize form items
  const defaultItems = invoice?.items || [{ description: 'Tuition Fee', amount: 0 }];
  
  // State for dynamic invoice items
  const [items, setItems] = useState<InvoiceItem[]>(defaultItems);
  
  // Fetch students for the select dropdown
  const { data: studentsData } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents
  });
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: invoice?.studentId || "",
      dueDate: invoice?.dueDate || "",
      term: invoice?.term || "",
      status: invoice?.status || "pending",
      items: defaultItems,
    },
  });
  
  // Update form items when items state changes
  React.useEffect(() => {
    form.setValue('items', items);
  }, [items, form]);
  
  // Add a new item
  const addItem = () => {
    setItems([...items, { description: '', amount: 0 }]);
  };
  
  // Remove an item at a specific index
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    } else {
      toast.error("At least one invoice item is required");
    }
  };
  
  // Update an item at a specific index
  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'amount') {
      newItems[index][field] = typeof value === 'string' ? parseFloat(value) || 0 : value;
    } else {
      newItems[index][field] = value as string;
    }
    setItems(newItems);
  };
  
  // Calculate total
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  
  // Mutation for creating a new invoice
  const createMutation = useMutation({
    mutationFn: (data: Omit<Invoice, "id" | "invoiceNumber" | "createdAt">) => createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice created successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to create invoice: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Mutation for updating an existing invoice
  const updateMutation = useMutation({
    mutationFn: (data: Invoice) => updateInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice updated successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to update invoice: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Submit handler
  const onSubmit = (data: FormValues) => {
    // Calculate total amount from items
    const amount = data.items.reduce((sum, item) => sum + item.amount, 0);
    
    if (invoice) {
      // Update existing invoice
      updateMutation.mutate({
        ...invoice,
        ...data,
        amount,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Create new invoice
      createMutation.mutate({
        ...data,
        amount,
      });
    }
  };
  
  const isLoading = createMutation.isPending || updateMutation.isPending;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student */}
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!!invoice}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {studentsData?.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.class})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Term */}
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Term 1 2025">Term 1 2025</SelectItem>
                    <SelectItem value="Term 2 2025">Term 2 2025</SelectItem>
                    <SelectItem value="Term 3 2025">Term 3 2025</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator className="my-4" />
        
        {/* Invoice Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Invoice Items</h3>
            <Button
              type="button"
              onClick={addItem}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Fee description"
                  />
                </div>
                <div className="w-1/3">
                  <label className="text-sm font-medium mb-1 block">Amount</label>
                  <Input
                    type="number"
                    value={item.amount}
                    onChange={(e) => updateItem(index, 'amount', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => removeItem(index)}
                  variant="ghost"
                  size="icon"
                  className="mt-6"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            ))}
          </div>
          
          {/* Error message for items */}
          {form.formState.errors.items && (
            <p className="text-sm font-medium text-destructive mt-2">
              {form.formState.errors.items.message}
            </p>
          )}
          
          {/* Total Amount */}
          <div className="flex justify-end mt-6">
            <div className="bg-muted rounded-md px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {invoice ? 'Update' : 'Create'} Invoice
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceForm;
