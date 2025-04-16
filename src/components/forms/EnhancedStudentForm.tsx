
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudent, updateStudent } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { Separator } from "@/components/ui/separator";
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
  class: z.string().min(1, {
    message: "Please select a class.",
  }),
  rollNumber: z.string().min(1, {
    message: "Roll number is required.",
  }),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  bloodGroup: z.string().optional(),
  admissionDate: z.string().optional(),
  profileImage: z.string().url().optional().or(z.literal('')),
  status: z.enum(['active', 'suspended', 'graduated']).optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  transportRoute: z.string().optional(),
  emergencyContact: z.string().optional(),
  documents: z.object({
    birthCertificate: z.string().optional(),
    previousSchoolRecords: z.string().optional(),
    medicalRecords: z.string().optional(),
    idPhotocopy: z.string().optional(),
    guardianIdPhotocopy: z.string().optional()
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EnhancedStudentFormProps {
  student?: Student;
  onSuccess: () => void;
}

const EnhancedStudentForm: React.FC<EnhancedStudentFormProps> = ({ student, onSuccess }) => {
  const queryClient = useQueryClient();
  const [allergies, setAllergies] = useState<string[]>(student?.allergies || []);
  const [newAllergy, setNewAllergy] = useState('');
  const [hobbies, setHobbies] = useState<string[]>(student?.hobbies || []);
  const [newHobby, setNewHobby] = useState('');
  const [medicalConditions, setMedicalConditions] = useState<string[]>(student?.medicalConditions || []);
  const [newMedicalCondition, setNewMedicalCondition] = useState('');
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
      class: student?.class || "",
      rollNumber: student?.rollNumber || "",
      guardianName: student?.guardianName || "",
      guardianContact: student?.guardianContact || "",
      address: student?.address || "",
      phoneNumber: student?.phoneNumber || "",
      dateOfBirth: student?.dateOfBirth || "",
      gender: student?.gender || undefined,
      bloodGroup: student?.bloodGroup || "",
      admissionDate: student?.admissionDate || new Date().toISOString().split('T')[0],
      profileImage: student?.profileImage || "",
      status: student?.status || "active",
      nationality: student?.nationality || "",
      religion: student?.religion || "",
      transportRoute: student?.transportRoute || "",
      emergencyContact: student?.emergencyContact || "",
      documents: {
        birthCertificate: student?.documents?.birthCertificate || "",
        previousSchoolRecords: student?.documents?.previousSchoolRecords || "",
        medicalRecords: student?.documents?.medicalRecords || "",
        idPhotocopy: student?.documents?.idPhotocopy || "",
        guardianIdPhotocopy: student?.documents?.guardianIdPhotocopy || "",
      }
    },
  });
  
  // Mutation for creating a new student
  const createMutation = useMutation({
    mutationFn: (data: Omit<Student, "id">) => createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student created successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to create student: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Mutation for updating an existing student
  const updateMutation = useMutation({
    mutationFn: (data: Student) => updateStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student updated successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to update student: ${error instanceof Error ? error.message : String(error)}`);
    },
  });

  // Handle adding new allergy
  const handleAddAllergy = () => {
    if (newAllergy.trim() !== '' && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  // Handle removing an allergy
  const handleRemoveAllergy = (allergyToRemove: string) => {
    setAllergies(allergies.filter(allergy => allergy !== allergyToRemove));
  };

  // Handle adding new hobby
  const handleAddHobby = () => {
    if (newHobby.trim() !== '' && !hobbies.includes(newHobby.trim())) {
      setHobbies([...hobbies, newHobby.trim()]);
      setNewHobby('');
    }
  };

  // Handle removing a hobby
  const handleRemoveHobby = (hobbyToRemove: string) => {
    setHobbies(hobbies.filter(hobby => hobby !== hobbyToRemove));
  };

  // Handle adding new medical condition
  const handleAddMedicalCondition = () => {
    if (newMedicalCondition.trim() !== '' && !medicalConditions.includes(newMedicalCondition.trim())) {
      setMedicalConditions([...medicalConditions, newMedicalCondition.trim()]);
      setNewMedicalCondition('');
    }
  };

  // Handle removing a medical condition
  const handleRemoveMedicalCondition = (conditionToRemove: string) => {
    setMedicalConditions(medicalConditions.filter(condition => condition !== conditionToRemove));
  };
  
  // Submit handler
  const onSubmit = (data: FormValues) => {
    // Add the dynamic arrays to the data
    const studentData = {
      ...data,
      allergies,
      hobbies,
      medicalConditions,
    };

    if (student) {
      // Update existing student
      updateMutation.mutate({
        ...studentData,
        id: student.id,
        attendancePercentage: student.attendancePercentage || 0,
        behaviorScore: student.behaviorScore || 0,
      } as Student);
    } else {
      // Create new student
      createMutation.mutate({
        ...studentData,
        attendancePercentage: 0,
        behaviorScore: 0,
      } as Omit<Student, "id">);
    }
  };
  
  const isLoading = createMutation.isPending || updateMutation.isPending;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="medical">Medical & Personal</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="additional">Additional Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Basic Information</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter the student's basic personal information.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Student name" {...field} />
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Class */}
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10A">Class 10A</SelectItem>
                        <SelectItem value="10B">Class 10B</SelectItem>
                        <SelectItem value="10C">Class 10C</SelectItem>
                        <SelectItem value="11A">Class 11A</SelectItem>
                        <SelectItem value="11B">Class 11B</SelectItem>
                        <SelectItem value="12A">Class 12A</SelectItem>
                        <SelectItem value="12B">Class 12B</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Roll Number */}
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Roll number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="text-lg font-medium">Guardian Information</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Provide details about the student's guardian or parent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Guardian Name */}
              <FormField
                control={form.control}
                name="guardianName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guardian Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Guardian name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Guardian Contact */}
              <FormField
                control={form.control}
                name="guardianContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guardian Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Guardian contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="medical" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Medical Information</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Provide medical details about the student.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Group */}
              <FormField
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Emergency contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Allergies */}
            <div className="space-y-2">
              <FormLabel>Allergies</FormLabel>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add an allergy" 
                  value={newAllergy} 
                  onChange={(e) => setNewAllergy(e.target.value)} 
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddAllergy} 
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {allergies.map((allergy, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {allergy}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveAllergy(allergy)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="space-y-2">
              <FormLabel>Medical Conditions</FormLabel>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a medical condition" 
                  value={newMedicalCondition} 
                  onChange={(e) => setNewMedicalCondition(e.target.value)} 
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddMedicalCondition} 
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {medicalConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {condition}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveMedicalCondition(condition)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Documents</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload or link to important student documents.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Birth Certificate */}
              <FormField
                control={form.control}
                name="documents.birthCertificate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Certificate</FormLabel>
                    <FormControl>
                      <Input placeholder="Document URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter URL to the birth certificate document
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Previous School Records */}
              <FormField
                control={form.control}
                name="documents.previousSchoolRecords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous School Records</FormLabel>
                    <FormControl>
                      <Input placeholder="Document URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter URL to previous school records
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medical Records */}
              <FormField
                control={form.control}
                name="documents.medicalRecords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Records</FormLabel>
                    <FormControl>
                      <Input placeholder="Document URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter URL to medical records
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* ID Photocopy */}
              <FormField
                control={form.control}
                name="documents.idPhotocopy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Photocopy</FormLabel>
                    <FormControl>
                      <Input placeholder="Document URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter URL to ID photocopy
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Guardian ID Photocopy */}
            <FormField
              control={form.control}
              name="documents.guardianIdPhotocopy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian ID Photocopy</FormLabel>
                  <FormControl>
                    <Input placeholder="Document URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter URL to guardian's ID photocopy
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          <TabsContent value="additional" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Additional Information</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Provide additional details about the student.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nationality */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Religion */}
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Religion</FormLabel>
                    <FormControl>
                      <Input placeholder="Religion" {...field} />
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
            
            {/* Transport Route */}
            <FormField
              control={form.control}
              name="transportRoute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport Route</FormLabel>
                  <FormControl>
                    <Input placeholder="Transport route" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Hobbies */}
            <div className="space-y-2">
              <FormLabel>Hobbies & Interests</FormLabel>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a hobby" 
                  value={newHobby} 
                  onChange={(e) => setNewHobby(e.target.value)} 
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddHobby} 
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {hobbies.map((hobby, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {hobby}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveHobby(hobby)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Admission Date */}
              <FormField
                control={form.control}
                name="admissionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admission Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="graduated">Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
                    Enter a URL for the student's profile image
                  </FormDescription>
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
            {student ? 'Update' : 'Create'} Student
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EnhancedStudentForm;
