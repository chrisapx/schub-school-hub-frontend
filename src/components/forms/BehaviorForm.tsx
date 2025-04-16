
import React from 'react';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createBehavior, updateBehavior, getStudents } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { Loader2 } from 'lucide-react';

// Define the form schema using Zod
const formSchema = z.object({
  studentId: z.string().min(1, {
    message: "Please select a student.",
  }),
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  score: z.coerce.number().min(0, {
    message: "Score must be a positive number.",
  }),
  maxScore: z.coerce.number().min(1, {
    message: "Maximum score must be at least 1.",
  }),
  notes: z.string().optional(),
  reportedBy: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BehaviorFormProps {
  behavior?: Behavior;
  onSuccess: () => void;
}

const BehaviorForm: React.FC<BehaviorFormProps> = ({ behavior, onSuccess }) => {
  const queryClient = useQueryClient();
  
  // Fetch students for the select dropdown
  const { data: studentsData } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents
  });
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: behavior?.studentId || "",
      date: behavior?.date || new Date().toISOString().split('T')[0],
      category: behavior?.category || "",
      score: behavior?.score || 0,
      maxScore: behavior?.maxScore || 5,
      notes: behavior?.notes || "",
      reportedBy: behavior?.reportedBy || "",
    },
  });
  
  // Mutation for creating a new behavior record
  const createMutation = useMutation({
    mutationFn: (data: Omit<Behavior, "id">) => createBehavior(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['behaviors'] });
      toast.success('Behavior record created successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to create behavior record: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Mutation for updating an existing behavior record
  const updateMutation = useMutation({
    mutationFn: (data: Behavior) => updateBehavior(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['behaviors'] });
      toast.success('Behavior record updated successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to update behavior record: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Submit handler
  const onSubmit = (data: FormValues) => {
    if (behavior) {
      // Update existing behavior record
      updateMutation.mutate({
        ...data,
        id: behavior.id,
      } as Behavior);
    } else {
      // Create new behavior record
      createMutation.mutate(data as Omit<Behavior, "id">);
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
          
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Discipline">Discipline</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Teamwork">Teamwork</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Participation">Participation</SelectItem>
                    <SelectItem value="Punctuality">Punctuality</SelectItem>
                    <SelectItem value="Homework">Homework</SelectItem>
                    <SelectItem value="Classroom Behavior">Classroom Behavior</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Reported By */}
          <FormField
            control={form.control}
            name="reportedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reported By</FormLabel>
                <FormControl>
                  <Input placeholder="Teacher name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score */}
          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Max Score */}
          <FormField
            control={form.control}
            name="maxScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Score</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional notes about the behavior"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {behavior ? 'Update' : 'Create'} Behavior Record
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BehaviorForm;
