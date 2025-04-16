
// Import required modules and components
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Trash2 } from 'lucide-react';

// Define the schema for the form
const invoiceFormSchema = z.object({
  studentName: z.string().min(1, { message: 'Student name is required' }),
  invoiceNumber: z.string().min(1, { message: 'Invoice number is required' }),
  issuedDate: z.date(),
  dueDate: z.date(),
  status: z.string().min(1, { message: 'Status is required' }),
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      description: z.string().min(1, { message: 'Description is required' }),
      amount: z.number().min(0, { message: 'Amount must be a positive number' }),
    })
  ),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface InvoiceFormProps {
  invoice?: any;
  onSubmit: (data: InvoiceFormValues) => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onSubmit, onCancel }) => {
  // Initialize form with default values or existing invoice data
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      studentName: invoice?.studentName || '',
      invoiceNumber: invoice?.invoiceNumber || '',
      issuedDate: invoice?.issuedDate ? new Date(invoice.issuedDate) : new Date(),
      dueDate: invoice?.dueDate ? new Date(invoice.dueDate) : new Date(),
      status: invoice?.status || 'pending',
      amount: invoice?.amount || 0,
      notes: invoice?.notes || '',
      items: invoice?.items || [{ description: '', amount: 0 }],
    },
  });

  // State to track invoice items
  const [items, setItems] = useState<{ description: string; amount: number }[]>(
    invoice?.items || [{ description: '', amount: 0 }]
  );

  // Add a new invoice item
  const addItem = () => {
    const newItems = [...items, { description: '', amount: 0 }];
    setItems(newItems);
    form.setValue('items', newItems);
  };

  // Remove an invoice item
  const removeItem = (index: number) => {
    if (items.length === 1) {
      toast.error('Invoice must have at least one item');
      return;
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    form.setValue('items', newItems);
  };

  // Update an invoice item
  const updateItem = (index: number, field: 'description' | 'amount', value: string | number) => {
    const newItems = [...items];
    if (field === 'description') {
      newItems[index].description = value as string;
    } else {
      newItems[index].amount = value as number;
    }
    setItems(newItems);
    form.setValue('items', newItems);
  };

  // Calculate total amount
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.amount || 0), 0);
  };

  // Handle form submission
  const handleSubmit = (data: InvoiceFormValues) => {
    // Update the total amount
    data.amount = calculateTotal();
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="Student Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input placeholder="INV-0001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="issuedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Issue Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="w-full pl-3 text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="w-full pl-3 text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">Invoice Items</h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-8">
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Item Description"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.amount}
                    onChange={(e) => 
                      updateItem(index, 'amount', parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addItem}
              className="w-full"
            >
              Add Item
            </Button>
          </div>
          
          <div className="mt-4 flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes for this invoice" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {invoice ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceForm;
