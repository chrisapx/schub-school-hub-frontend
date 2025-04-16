import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBehavior, updateBehavior } from '@/lib/api/behavior';
import { getStudents } from '@/lib/api/students';
import { Student } from '@/types';

// Define the schema for the form
const formSchema = z.object({
  studentId: z.string().min(1, { message: 'Please select a student.' }),
  score: z.number().optional(),
  maxScore: z.number().optional(),
  date: z.string().optional(),
  category: z.string().min(1, { message: 'Please select a category.' }),
  notes: z.string().optional(),
});

// Define the Behavior type
export type Behavior = z.infer<typeof formSchema> & { id: string };

interface BehaviorFormProps {
  behavior?: Behavior;
  onCancel: () => void;
}

const BehaviorForm: React.FC<BehaviorFormProps> = ({ behavior, onCancel }) => {
  const queryClient = useQueryClient();
  const [isCreate, setIsCreate] = useState(!behavior);

  // Initialize form with default values from the behavior prop
  const form = useForm<Behavior>({
    resolver: zodResolver(formSchema),
    defaultValues: behavior || {
      studentId: '',
      score: 0,
      maxScore: 5,
      date: new Date().toISOString().split('T')[0],
      category: '',
      notes: '',
    },
  });
  
  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  const mutation = useMutation(
    isCreate ? createBehavior : updateBehavior,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['behaviors']);
        toast.success(`Behavior ${isCreate ? 'created' : 'updated'} successfully!`);
        onCancel();
      },
      onError: (error: any) => {
        toast.error(`Failed to ${isCreate ? 'create' : 'update'} behavior: ${error.message}`);
      },
    }
  );

  // In the handleSubmit function, ensure all required fields are provided:
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.getValues("studentId") || !form.getValues("category")) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const behaviorData: Omit<Behavior, "id"> = {
      studentId: form.getValues("studentId"),
      score: form.getValues("score") || 0,
      maxScore: form.getValues("maxScore") || 5,
      date: form.getValues("date") || new Date().toISOString().split('T')[0],
      category: form.getValues("category"),
      notes: form.getValues("notes") || ''
    };
    
    if (isCreate) {
      mutation.mutate(behaviorData);
    } else {
      if (behavior) {
        mutation.mutate({ ...behaviorData, id: behavior.id });
      } else {
        toast.error("Behavior ID is missing for update.");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {students?.map((student) => (
                    <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the student for this behavior record.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row space-x-4">
          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Score" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the score for this behavior.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxScore"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Max Score</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Max Score" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the maximum possible score for this behavior.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        new Date(field.value).toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center" side="bottom">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
                    disabled={(date) =>
                      date > new Date() || date < new Date('2020-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date when this behavior occurred.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Positive">Positive</SelectItem>
                  <SelectItem value="Negative">Negative</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the category for this behavior.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Notes about this behavior" {...field} />
              </FormControl>
              <FormDescription>
                Enter any additional notes about this behavior.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BehaviorForm;
