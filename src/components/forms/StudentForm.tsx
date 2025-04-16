
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
import { addStudent, updateStudent, Student } from '@/utils/localStorage';
import { toast } from 'sonner';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  class: z.string().min(1, {
    message: "Class is required.",
  }),
  rollNumber: z.string().min(1, {
    message: "Roll number is required.",
  }),
  guardianName: z.string().min(2, {
    message: "Guardian name must be at least 2 characters.",
  }),
  guardianContact: z.string().min(10, {
    message: "Guardian contact must be at least 10 characters.",
  }),
  attendancePercentage: z.coerce.number().min(0).max(100),
  behaviorScore: z.coerce.number().min(0).max(5),
});

interface StudentFormProps {
  student?: Student;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function StudentForm({ student, onSuccess, onCancel }: StudentFormProps) {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: student ? {
      name: student.name,
      email: student.email,
      class: student.class,
      rollNumber: student.rollNumber,
      guardianName: student.guardianName,
      guardianContact: student.guardianContact,
      attendancePercentage: student.attendancePercentage,
      behaviorScore: student.behaviorScore,
    } : {
      name: '',
      email: '',
      class: '',
      rollNumber: '',
      guardianName: '',
      guardianContact: '',
      attendancePercentage: 0,
      behaviorScore: 0,
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (student) {
        // Update existing student
        updateStudent(student.id, values);
        toast.success("Student updated successfully");
      } else {
        // Add new student
        addStudent({
          ...values,
          profileImage: `https://avatars.dicebear.com/api/initials/${values.name.split(' ').map(n => n[0]).join('')}.svg`
        });
        toast.success("Student added successfully");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="student@example.com" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <FormControl>
                  <Input placeholder="10A" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number</FormLabel>
                <FormControl>
                  <Input placeholder="1001" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guardianName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guardianContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Contact</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attendancePercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attendance Percentage</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="100" className="futuristic-input" {...field} />
                </FormControl>
                <FormDescription>
                  Value between 0 and 100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="behaviorScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Behavior Score</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="5" step="0.1" className="futuristic-input" {...field} />
                </FormControl>
                <FormDescription>
                  Value between 0 and 5
                </FormDescription>
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
            {student ? 'Update Student' : 'Add Student'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
