import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudent, updateStudent } from '@/lib/api/students';
import { Student } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  profileImage: z.string().optional(),
  class: z.string().optional(),
  rollNumber: z.string().optional(),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  attendancePercentage: z.number().optional(),
  behaviorScore: z.number().optional(),
});

interface StudentFormProps {
  student?: Student;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    name: student?.name || '',
    email: student?.email || '',
    profileImage: student?.profileImage || '',
    class: student?.class || '',
    rollNumber: student?.rollNumber || '',
    guardianName: student?.guardianName || '',
    guardianContact: student?.guardianContact || '',
    attendancePercentage: student?.attendancePercentage || 0,
    behaviorScore: student?.behaviorScore || 0
  });
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation(
    student ? updateStudent : createStudent,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['students']);
        toast.success(`Student ${student ? 'updated' : 'created'} successfully`);
        onCancel();
      },
      onError: (error) => {
        toast.error(`Failed to ${student ? 'update' : 'create'} student: ${error.message}`);
      },
    }
  );
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
      profileImage: student?.profileImage || "",
      class: student?.class || "",
      rollNumber: student?.rollNumber || "",
      guardianName: student?.guardianName || "",
      guardianContact: student?.guardianContact || "",
      attendancePercentage: student?.attendancePercentage || 0,
      behaviorScore: student?.behaviorScore || 0,
    },
  });
  
  useEffect(() => {
    form.reset({
      name: student?.name || "",
      email: student?.email || "",
      profileImage: student?.profileImage || "",
      class: student?.class || "",
      rollNumber: student?.rollNumber || "",
      guardianName: student?.guardianName || "",
      guardianContact: student?.guardianContact || "",
      attendancePercentage: student?.attendancePercentage || 0,
      behaviorScore: student?.behaviorScore || 0,
    });
    setFormData({
      name: student?.name || '',
      email: student?.email || '',
      profileImage: student?.profileImage || '',
      class: student?.class || '',
      rollNumber: student?.rollNumber || '',
      guardianName: student?.guardianName || '',
      guardianContact: student?.guardianContact || '',
      attendancePercentage: student?.attendancePercentage || 0,
      behaviorScore: student?.behaviorScore || 0
    });
  }, [student, form]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: Number(value)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const studentData: Omit<Student, "id"> = {
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      class: formData.class || '',
      rollNumber: formData.rollNumber || '',
      guardianName: formData.guardianName || '',
      guardianContact: formData.guardianContact || '',
      attendancePercentage: formData.attendancePercentage || 0,
      behaviorScore: formData.behaviorScore || 0
    };
    
    if (student) {
      mutation.mutate({ id: student.id, ...studentData });
    } else {
      mutation.mutate(studentData);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Student Name" {...field} value={formData.name} onChange={handleInputChange} />
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
                <Input placeholder="name@example.com" type="email" {...field} value={formData.email} onChange={handleInputChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>
                <Input placeholder="URL" {...field} value={formData.profileImage} onChange={handleInputChange} />
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
                <Input placeholder="e.g., 10A" {...field} value={formData.class} onChange={handleInputChange} />
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
                <Input placeholder="e.g., 24" {...field} value={formData.rollNumber} onChange={handleInputChange} />
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
                <Input placeholder="Guardian Name" {...field} value={formData.guardianName} onChange={handleInputChange} />
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
                <Input placeholder="Contact Number" {...field} value={formData.guardianContact} onChange={handleInputChange} />
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
                <Input type="number" placeholder="e.g., 95" {...field} value={formData.attendancePercentage} onChange={handleNumberInputChange} />
              </FormControl>
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
                <Input type="number" placeholder="e.g., 4" {...field} value={formData.behaviorScore} onChange={handleNumberInputChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudentForm;
