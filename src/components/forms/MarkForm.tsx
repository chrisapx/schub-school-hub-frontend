
import React from 'react';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudents, getSubjects, createMark, updateMark } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { useSearchParams } from 'react-router-dom';

// Define the form schema using Zod
const formSchema = z.object({
  studentId: z.string().min(1, {
    message: "Please select a student.",
  }),
  subjectId: z.string().min(1, {
    message: "Please select a subject.",
  }),
  examType: z.string().min(1, {
    message: "Please select an exam type.",
  }),
  marksObtained: z.coerce.number().min(0, {
    message: "Marks must be a positive number.",
  }),
  totalMarks: z.coerce.number().min(1, {
    message: "Total marks must be at least 1.",
  }),
  grade: z.string().optional(),
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  semester: z.string().optional(),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Function to calculate grade based on percentage
const calculateGrade = (marksObtained: number, totalMarks: number): string => {
  const percentage = (marksObtained / totalMarks) * 100;
  
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
};

interface MarkFormProps {
  mark?: Mark;
  onSuccess?: () => void;
}

const MarkForm: React.FC<MarkFormProps> = ({ mark, onSuccess }) => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get('marksFormOpen');
  const isOpen = searchParams.get('marksFormOpen') === '1';
  
  // Fetch students for the select dropdown
  const { data: studentsData } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents
  });
  
  // Fetch subjects for the select dropdown
  const { data: subjectsData } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  });
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: mark?.studentId || "",
      subjectId: mark?.subjectId || "",
      examType: mark?.examType || "",
      marksObtained: mark?.marksObtained || 0,
      totalMarks: mark?.totalMarks || 100,
      grade: mark?.grade || "",
      date: mark?.date || new Date().toISOString().split('T')[0],
      semester: mark?.semester || "",
      comments: mark?.comments || "",
    },
  });
  
  // Mutation for creating a new mark
  const createMutation = useMutation({
    mutationFn: (data: Omit<Mark, "id">) => createMark(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marks'] });
      toast.success('Mark added successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to add mark: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Mutation for updating an existing mark
  const updateMutation = useMutation({
    mutationFn: (data: Mark) => updateMark(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marks'] });
      toast.success('Mark updated successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to update mark: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Watch the marks fields to calculate grade automatically
  const marksObtained = form.watch('marksObtained');
  const totalMarks = form.watch('totalMarks');
  
  // Update grade when marks change
  React.useEffect(() => {
    if (marksObtained && totalMarks) {
      const calculatedGrade = calculateGrade(marksObtained, totalMarks);
      form.setValue('grade', calculatedGrade);
    }
  }, [marksObtained, totalMarks, form]);
  
  // Submit handler
  const onSubmit = (data: FormValues) => {
    if (mark) {
      // Update existing mark
      updateMutation.mutate({
        ...data,
        id: mark.id,
      } as Mark);
    } else {
      // Create new mark
      createMutation.mutate(data as Omit<Mark, "id">);
    }
  };
  
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const closePanel = () => {
    searchParams.delete('marksFormOpen');
    setSearchParams(searchParams);
  };

  return (
    <Sheet 
      open={isOpen} 
      onOpenChange={(open) => {
      if (!open) closePanel();
    }}
    >
      <SheetContent className="w-[50vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>{mark ? "Update Mark" : "Add Mark"}</SheetTitle>
          <SheetDescription>
            Fill in the student's performance details below.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student */}
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studentsData?.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({student.class})
                          </SelectItem>
                        ))}
                        <SelectItem value="other">
                          Chris Mwesigwa F3B
                        </SelectItem>
                        <SelectItem value="other">
                          Bongo Josh F3A
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Subject */}
              <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjectsData?.map((subject) => (
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exam Type */}
              <FormField
                control={form.control}
                name="examType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                        <SelectItem value="Assignment">Assignment</SelectItem>
                        <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                        <SelectItem value="Final">Final</SelectItem>
                        <SelectItem value="Project">Project</SelectItem>
                        <SelectItem value="Practical">Practical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Semester */}
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="First">First term</SelectItem>
                        <SelectItem value="Second">Second term</SelectItem>
                        <SelectItem value="Second">Third term</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Marks Obtained */}
              <FormField
                control={form.control}
                name="marksObtained"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marks Obtained</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Total Marks */}
              <FormField
                control={form.control}
                name="totalMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Marks</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Grade (Auto-calculated but can be overridden) */}
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <FormControl>
                      <Input placeholder="Auto-calculated grade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Comments */}
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Teacher's comments on the student's performance"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
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
                {mark ? 'Update' : 'Create'} Mark
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default MarkForm;
