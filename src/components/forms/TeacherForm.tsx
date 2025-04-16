import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSubjects, createTeacher, updateTeacher } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  department: z.string().optional(),
  phoneNumber: z.string().optional(),
  qualification: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  profileImage: z.string().url().optional().or(z.literal('')),
  joinDate: z.string().optional(),
  status: z.enum(['active', 'inactive', 'on-leave']).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TeacherFormProps {
  teacher?: Teacher;
  onSuccess: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onSuccess }) => {
  const queryClient = useQueryClient();
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: teacher?.name || "",
      email: teacher?.email || "",
      department: teacher?.department || "",
      phoneNumber: teacher?.phoneNumber || "",
      qualification: teacher?.qualification || "",
      subjects: teacher?.subjects || [],
      profileImage: teacher?.profileImage || "",
      joinDate: teacher?.joinDate || new Date().toISOString().split('T')[0],
      status: teacher?.status || "active",
    },
  });
  
  // Fetch subjects for the select dropdown
  const { data: subjectsData } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  });
  
  // Mutation for creating a new teacher
  const createMutation = useMutation({
    mutationFn: (data: Omit<Teacher, "id">) => createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher created successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to create teacher: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Mutation for updating an existing teacher
  const updateMutation = useMutation({
    mutationFn: (data: Teacher) => updateTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher updated successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to update teacher: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Submit handler
  const onSubmit = (data: FormValues) => {
    if (teacher) {
      // Update existing teacher
      updateMutation.mutate({
        ...data,
        id: teacher.id,
        subjects: data.subjects || [],
      } as Teacher);
    } else {
      // Create new teacher
      createMutation.mutate({
        ...data,
        subjects: data.subjects || [],
      } as Omit<Teacher, "id">);
    }
  };
  
  const isLoading = createMutation.isPending || updateMutation.isPending;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Teacher name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Physical Education">Physical Education</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Qualification */}
          <FormField
            control={form.control}
            name="qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input placeholder="Qualification" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Join Date */}
          <FormField
            control={form.control}
            name="joinDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Join Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <SelectContent className="z-[60]">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Profile Image */}
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Profile image URL" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a URL for the teacher's profile image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Subjects */}
        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Subjects</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {subjectsData?.map((subject) => (
                  <div key={subject.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`subject-${subject.id}`}
                      checked={field.value?.includes(subject.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const updatedValue = checked
                          ? [...(field.value || []), subject.id]
                          : (field.value || []).filter((id) => id !== subject.id);
                        field.onChange(updatedValue);
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label
                      htmlFor={`subject-${subject.id}`}
                      className="text-sm font-medium leading-none"
                    >
                      {subject.name}
                    </label>
                  </div>
                ))}
              </div>
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
            {teacher ? 'Update' : 'Create'} Teacher
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeacherForm;
