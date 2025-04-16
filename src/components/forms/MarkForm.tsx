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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useData } from '@/contexts/DataContext';

// Define the schema for the form
const markFormSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required." }),
  subjectId: z.string().min(1, { message: "Subject ID is required." }),
  term: z.string().min(1, { message: "Term is required." }),
  score: z.number().optional(),
  maxScore: z.number().optional(),
  date: z.string().optional(),
  type: z.string().optional(),
  notes: z.string().optional(),
});

// Define the form props
interface MarkFormProps {
  onSubmit: (data: Mark) => void;
  initialValues?: Mark;
}

// Define the Mark type
export type Mark = {
  id: string;
  studentId: string;
  subjectId: string;
  term: string;
  score: number;
  maxScore: number;
  date: string;
  type: string;
  notes: string;
};

// Define the form component
const MarkForm: React.FC<MarkFormProps> = ({ onSubmit, initialValues }) => {
  const { students, subjects } = useData();
  const [formData, setFormData] = useState<Omit<Mark, "id">>({
    studentId: initialValues?.studentId || '',
    subjectId: initialValues?.subjectId || '',
    term: initialValues?.term || '',
    score: initialValues?.score || 0,
    maxScore: initialValues?.maxScore || 100,
    date: initialValues?.date || new Date().toISOString().split('T')[0],
    type: initialValues?.type || 'Exam',
    notes: initialValues?.notes || ''
  });

  // Initialize react-hook-form
  const form = useForm<Omit<Mark, "id">>({
    resolver: zodResolver(markFormSchema),
    defaultValues: {
      studentId: initialValues?.studentId || '',
      subjectId: initialValues?.subjectId || '',
      term: initialValues?.term || '',
      score: initialValues?.score || 0,
      maxScore: initialValues?.maxScore || 100,
      date: initialValues?.date || new Date().toISOString().split('T')[0],
      type: initialValues?.type || 'Exam',
      notes: initialValues?.notes || ''
    },
  });

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.studentId || !formData.subjectId || !formData.term) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const markData: Omit<Mark, "id"> = {
      studentId: formData.studentId,
      subjectId: formData.subjectId,
      term: formData.term,
      score: formData.score || 0,
      maxScore: formData.maxScore || 100,
      date: formData.date || new Date().toISOString().split('T')[0],
      type: formData.type || 'Exam',
      notes: formData.notes || ''
    };
    
    onSubmit({ id: initialValues?.id || '', ...markData });
  };

  // Handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialValues ? "Edit Mark" : "Add New Mark"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentId">Student</Label>
                <select
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="subjectId">Subject</Label>
                <select
                  id="subjectId"
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="term">Term</Label>
                <Input
                  type="text"
                  id="term"
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  placeholder="e.g., Fall 2024"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="score">Score</Label>
                <Input
                  type="number"
                  id="score"
                  name="score"
                  value={formData.score}
                  onChange={e => setFormData({ ...formData, score: Number(e.target.value) })}
                  placeholder="e.g., 85"
                />
              </div>
              <div>
                <Label htmlFor="maxScore">Max Score</Label>
                <Input
                  type="number"
                  id="maxScore"
                  name="maxScore"
                  value={formData.maxScore}
                  onChange={e => setFormData({ ...formData, maxScore: Number(e.target.value) })}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="e.g., Exam"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes about the mark"
              />
            </div>
            <Button type="submit">{initialValues ? "Update Mark" : "Add Mark"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MarkForm;
