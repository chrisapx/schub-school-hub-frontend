
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
import { addTeacher, updateTeacher, Teacher } from '@/utils/localStorage';
import { toast } from 'sonner';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subjects: z.string().min(1, {
    message: "Please enter at least one subject.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  qualification: z.string().min(2, {
    message: "Qualification must be at least 2 characters.",
  }),
});

interface TeacherFormProps {
  teacher?: Teacher;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TeacherForm({ teacher, onSuccess, onCancel }: TeacherFormProps) {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: teacher ? {
      name: teacher.name,
      email: teacher.email,
      subjects: teacher.subjects.join(', '),
      phoneNumber: teacher.phoneNumber,
      qualification: teacher.qualification,
    } : {
      name: '',
      email: '',
      subjects: '',
      phoneNumber: '',
      qualification: '',
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Process subjects as an array
      const subjectsArray = values.subjects.split(',').map(subject => subject.trim());
      
      if (teacher) {
        // Update existing teacher
        updateTeacher(teacher.id, {
          ...values,
          subjects: subjectsArray,
        });
        toast.success("Teacher updated successfully");
      } else {
        // Add new teacher
        addTeacher({
          ...values,
          subjects: subjectsArray,
          profileImage: `https://avatars.dicebear.com/api/initials/${values.name.split(' ').map(n => n[0]).join('')}.svg`
        });
        toast.success("Teacher added successfully");
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
                <FormLabel>Teacher Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. John Doe" className="futuristic-input" {...field} />
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
                  <Input type="email" placeholder="teacher@example.com" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input placeholder="PhD in Mathematics" className="futuristic-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Subjects</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Mathematics, Physics, Computer Science" 
                    className="futuristic-input resize-none min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Enter subjects separated by commas
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
            {teacher ? 'Update Teacher' : 'Add Teacher'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
