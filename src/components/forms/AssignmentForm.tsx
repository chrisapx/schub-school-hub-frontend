
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  addAssignment, 
  updateAssignment, 
  Assignment, 
  getSubjects 
} from '@/utils/localStorage';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  subjectId: z.string().min(1, {
    message: "Please select a subject.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  dueDate: z.string().min(1, {
    message: "Please select a due date.",
  }),
  classAssigned: z.string().min(1, {
    message: "Please enter a class.",
  }),
});

interface AssignmentFormProps {
  assignment?: Assignment;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AssignmentForm({ assignment, onSuccess, onCancel }: AssignmentFormProps) {
  const subjects = getSubjects();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: assignment ? {
      title: assignment.title,
      subjectId: assignment.subjectId,
      description: assignment.description,
      dueDate: assignment.dueDate,
      classAssigned: assignment.classAssigned,
    } : {
      title: '',
      subjectId: '',
      description: '',
      dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
      classAssigned: '10A',
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (assignment) {
        // Update existing assignment
        updateAssignment(assignment.id, values);
        toast.success("Assignment updated successfully");
      } else {
        // Add new assignment
        addAssignment(values);
        toast.success("Assignment added successfully");
      }
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Assignment Title</FormLabel>
                <FormControl>
                  <Input placeholder="Mathematics Problem Set" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subjectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classAssigned"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Assigned</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="10A">10A</SelectItem>
                    <SelectItem value="10B">10B</SelectItem>
                    <SelectItem value="10C">10C</SelectItem>
                    <SelectItem value="11A">11A</SelectItem>
                    <SelectItem value="11B">11B</SelectItem>
                    <SelectItem value="All">All Classes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Complete problems 1-20 in Chapter 5..." 
                    className="futuristic-input resize-none min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {assignment ? 'Update Assignment' : 'Add Assignment'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
