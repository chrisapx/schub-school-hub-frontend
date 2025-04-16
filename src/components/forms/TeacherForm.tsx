import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSubjects, createTeacher, updateTeacher } from '@/lib/api';

// Define the Teacher interface
export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  profileImage?: string;
  phoneNumber?: string;
  qualification?: string;
}

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  subjects: z.array(z.string()).optional(),
  profileImage: z.string().optional(),
  phoneNumber: z.string().optional(),
  qualification: z.string().optional(),
})

interface TeacherFormProps {
  teacher?: Teacher;
  onCancel: () => void;
  onSuccess: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState<Omit<Teacher, "id">>({
    name: teacher?.name || '',
    email: teacher?.email || '',
    subjects: teacher?.subjects || [],
    profileImage: teacher?.profileImage || '',
    phoneNumber: teacher?.phoneNumber || '',
    qualification: teacher?.qualification || ''
  });
  
  const queryClient = useQueryClient();
  
  // Fetch subjects for the select dropdown
  const { data: subjectsData, isLoading: isSubjectsLoading, error: subjectsError } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: teacher?.name || "",
      email: teacher?.email || "",
      subjects: teacher?.subjects || [],
      profileImage: teacher?.profileImage || "",
      phoneNumber: teacher?.phoneNumber || "",
      qualification: teacher?.qualification || "",
    },
  })
  
  // Mutation for creating a new teacher
  const createTeacherMutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher created successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to create teacher: ${error}`);
    },
  });
  
  // Mutation for updating an existing teacher
  const updateTeacherMutation = useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher updated successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to update teacher: ${error}`);
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const teacherData: Omit<Teacher, "id"> = {
      name: formData.name,
      email: formData.email,
      subjects: formData.subjects || [],
      profileImage: formData.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      phoneNumber: formData.phoneNumber || '',
      qualification: formData.qualification || ''
    };
    
    if (teacher) {
      // Update existing teacher
      updateTeacherMutation.mutate({ id: teacher.id, ...teacherData });
    } else {
      // Create new teacher
      createTeacherMutation.mutate(teacherData);
    }
  };
  
  const isLoading = createTeacherMutation.isPending || updateTeacherMutation.isPending;
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{teacher ? 'Edit Teacher' : 'Create New Teacher'}</CardTitle>
        <CardDescription>Fill in the details to {teacher ? 'update' : 'create'} a teacher.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Teacher Name"
                        {...field}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
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
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Qualification */}
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Qualification"
                        {...field}
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      />
                    </FormControl>
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
                  <FormLabel>Subjects</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      // Ensure value is treated as a single string
                      const selectedSubjects = value ? [value] : [];
                      setFormData({ ...formData, subjects: selectedSubjects });
                      field.onChange(selectedSubjects); // Update form state
                    }}
                    defaultValue={formData.subjects ? formData.subjects[0] : ''}
                    multiple // Enable multiple selection
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subjects" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjectsData?.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the subjects taught by this teacher.
                  </FormDescription>
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
                    <Input
                      placeholder="Profile Image URL"
                      {...field}
                      value={formData.profileImage}
                      onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TeacherForm;
