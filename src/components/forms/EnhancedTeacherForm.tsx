
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSubjects, createTeacher, updateTeacher } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Loader2, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  address: z.string().optional(),
  employeeId: z.string().optional(),
  emergencyContact: z.string().optional(),
  bankAccount: z.string().optional(),
  documents: z.object({
    appointmentLetter: z.string().optional(),
    contractId: z.string().optional(),
    referenceLetter: z.string().optional(),
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EnhancedTeacherFormProps {
  teacher?: Teacher;
  onSuccess: () => void;
}

const EnhancedTeacherForm: React.FC<EnhancedTeacherFormProps> = ({ teacher, onSuccess }) => {
  const queryClient = useQueryClient();
  const [specializations, setSpecializations] = useState<string[]>(teacher?.specialization || []);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [academicCertificates, setAcademicCertificates] = useState<string[]>(
    teacher?.documents?.academicCertificates || []
  );
  const [newCertificate, setNewCertificate] = useState('');
  
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
      address: teacher?.address || "",
      employeeId: teacher?.employeeId || "",
      emergencyContact: teacher?.emergencyContact || "",
      bankAccount: teacher?.bankAccount || "",
      documents: {
        appointmentLetter: teacher?.documents?.appointmentLetter || "",
        contractId: teacher?.documents?.contractId || "",
        referenceLetter: teacher?.documents?.referenceLetter || "",
      }
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

  // Handle adding new specialization
  const handleAddSpecialization = () => {
    if (newSpecialization.trim() !== '' && !specializations.includes(newSpecialization.trim())) {
      setSpecializations([...specializations, newSpecialization.trim()]);
      setNewSpecialization('');
    }
  };

  // Handle removing a specialization
  const handleRemoveSpecialization = (specializationToRemove: string) => {
    setSpecializations(specializations.filter(spec => spec !== specializationToRemove));
  };

  // Handle adding new certificate
  const handleAddCertificate = () => {
    if (newCertificate.trim() !== '' && !academicCertificates.includes(newCertificate.trim())) {
      setAcademicCertificates([...academicCertificates, newCertificate.trim()]);
      setNewCertificate('');
    }
  };

  // Handle removing a certificate
  const handleRemoveCertificate = (certificateToRemove: string) => {
    setAcademicCertificates(academicCertificates.filter(cert => cert !== certificateToRemove));
  };
  
  // Submit handler
  const onSubmit = (data: FormValues) => {
    const teacherData = {
      ...data,
      specialization: specializations,
      documents: {
        ...data.documents,
        academicCertificates,
      }
    };

    if (teacher) {
      // Update existing teacher
      updateMutation.mutate({
        ...teacherData,
        id: teacher.id,
        subjects: data.subjects || [],
      } as Teacher);
    } else {
      // Create new teacher
      createMutation.mutate({
        ...teacherData,
        subjects: data.subjects || [],
      } as Omit<Teacher, "id">);
    }
  };
  
  const isLoading = createMutation.isPending || updateMutation.isPending;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="work">Work Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
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
              
              {/* Emergency Contact */}
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Emergency contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Address" {...field} />
                  </FormControl>
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
          </TabsContent>
          
          <TabsContent value="work" className="space-y-6">
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
              
              {/* Employee ID */}
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Employee ID" {...field} />
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
            
            {/* Specializations */}
            <div className="space-y-2">
              <FormLabel>Specializations</FormLabel>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add specialization" 
                  value={newSpecialization} 
                  onChange={(e) => setNewSpecialization(e.target.value)} 
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddSpecialization} 
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {specializations.map((specialization, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {specialization}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveSpecialization(specialization)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bank Account */}
              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank account details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Letter */}
              <FormField
                control={form.control}
                name="documents.appointmentLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Letter</FormLabel>
                    <FormControl>
                      <Input placeholder="Document URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Link to appointment letter document
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Contract ID */}
              <FormField
                control={form.control}
                name="documents.contractId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Document URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Link to contract ID document
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Reference Letter */}
            <FormField
              control={form.control}
              name="documents.referenceLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Letter</FormLabel>
                  <FormControl>
                    <Input placeholder="Document URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Link to reference letter document
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Academic Certificates */}
            <div className="space-y-2">
              <FormLabel>Academic Certificates</FormLabel>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add certificate URL" 
                  value={newCertificate} 
                  onChange={(e) => setNewCertificate(e.target.value)} 
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddCertificate} 
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {academicCertificates.map((certificate, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-2">
                    <span className="text-sm truncate mr-2 flex-1">{certificate}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => handleRemoveCertificate(certificate)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-6">
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
          </TabsContent>
        </Tabs>
        
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

export default EnhancedTeacherForm;
