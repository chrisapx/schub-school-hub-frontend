
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
  addBehavior, 
  updateBehavior, 
  Behavior, 
  getStudents
} from '@/utils/localStorage';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Define the form schema
const formSchema = z.object({
  studentId: z.string().min(1, {
    message: "Please select a student.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  score: z.coerce.number().min(0),
  maxScore: z.coerce.number().min(1),
  notes: z.string().min(5, {
    message: "Notes must be at least 5 characters.",
  }),
});

interface BehaviorFormProps {
  behavior?: Behavior;
  studentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BehaviorForm({ behavior, studentId, onSuccess, onCancel }: BehaviorFormProps) {
  const students = getStudents();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: behavior ? {
      studentId: behavior.studentId,
      date: behavior.date,
      category: behavior.category,
      score: behavior.score,
      maxScore: behavior.maxScore,
      notes: behavior.notes,
    } : {
      studentId: studentId || '',
      date: format(new Date(), 'yyyy-MM-dd'),
      category: 'Attendance',
      score: 5,
      maxScore: 5,
      notes: '',
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (behavior) {
        // Update existing behavior
        updateBehavior(behavior.id, values);
        toast.success("Behavior record updated successfully");
      } else {
        // Add new behavior
        addBehavior(values);
        toast.success("Behavior record added successfully");
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
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!studentId}>
                  <FormControl>
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {students.map((student) => (
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

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" className="futuristic-input" {...field} />
                </FormControl>
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
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Attendance">Attendance</SelectItem>
                    <SelectItem value="Discipline">Discipline</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Participation">Participation</SelectItem>
                    <SelectItem value="Punctuality">Punctuality</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="5" step="0.5" className="futuristic-input" {...field} />
                </FormControl>
                <FormDescription>Score out of {form.watch('maxScore')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Score</FormLabel>
                <FormControl>
                  <Input type="number" min="1" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Student demonstrates excellent leadership qualities..." 
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
            {behavior ? 'Update Record' : 'Add Record'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
