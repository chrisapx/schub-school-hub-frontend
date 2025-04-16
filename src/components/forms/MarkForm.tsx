
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  addMark, 
  updateMark, 
  Mark, 
  getStudents, 
  getSubjects 
} from '@/utils/localStorage';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Define the form schema
const formSchema = z.object({
  studentId: z.string().min(1, {
    message: "Please select a student.",
  }),
  subjectId: z.string().min(1, {
    message: "Please select a subject.",
  }),
  term: z.string().min(1, {
    message: "Please enter a term.",
  }),
  score: z.coerce.number().min(0),
  maxScore: z.coerce.number().min(1),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  type: z.string().min(1, {
    message: "Please select an assessment type.",
  }),
});

interface MarkFormProps {
  mark?: Mark;
  studentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function MarkForm({ mark, studentId, onSuccess, onCancel }: MarkFormProps) {
  const students = getStudents();
  const subjects = getSubjects();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mark ? {
      studentId: mark.studentId,
      subjectId: mark.subjectId,
      term: mark.term,
      score: mark.score,
      maxScore: mark.maxScore,
      date: mark.date,
      type: mark.type,
    } : {
      studentId: studentId || '',
      subjectId: '',
      term: 'Term 1',
      score: 0,
      maxScore: 100,
      date: format(new Date(), 'yyyy-MM-dd'),
      type: 'Exam',
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (mark) {
        // Update existing mark
        updateMark(mark.id, values);
        toast.success("Mark updated successfully");
      } else {
        // Add new mark
        addMark(values);
        toast.success("Mark added successfully");
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
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select a term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Term 1">Term 1</SelectItem>
                    <SelectItem value="Term 2">Term 2</SelectItem>
                    <SelectItem value="Term 3">Term 3</SelectItem>
                    <SelectItem value="Final">Final</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="futuristic-input">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Exam">Exam</SelectItem>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Assignment">Assignment</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                    <SelectItem value="Presentation">Presentation</SelectItem>
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
                  <Input type="number" min="0" className="futuristic-input" {...field} />
                </FormControl>
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
        </div>

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {mark ? 'Update Mark' : 'Add Mark'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
