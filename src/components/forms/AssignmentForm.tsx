import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { useAdminStore } from '@/stores/adminStore';

// Define the Assignment type
export type Assignment = {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  dueDate: string;
  classAssigned: string;
};

interface AssignmentFormProps {
  onSubmit: (assignment: Assignment) => void;
  onCancel: () => void;
  initialData?: Assignment;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Partial<Assignment>>({
    id: initialData?.id || uuidv4(),
    title: initialData?.title || '',
    description: initialData?.description || '',
    subjectId: initialData?.subjectId || '',
    dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
    classAssigned: initialData?.classAssigned || ''
  });
  
  const [date, setDate] = useState<Date | undefined>(initialData?.dueDate ? new Date(initialData.dueDate) : undefined);
  
  const { subjects } = useAdminStore();
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        description: initialData.description,
        subjectId: initialData.subjectId,
        dueDate: initialData.dueDate,
        classAssigned: initialData.classAssigned
      });
      setDate(initialData.dueDate ? new Date(initialData.dueDate) : undefined);
    }
  }, [initialData]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.subjectId) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const assignmentData: Omit<Assignment, "id"> = {
      title: formData.title,
      description: formData.description,
      subjectId: formData.subjectId,
      dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
      classAssigned: formData.classAssigned || ''
    };
    
    onSubmit({
      id: formData.id || uuidv4(),
      ...assignmentData
    } as Assignment);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      subjectId: value
    }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      setFormData(prevState => ({
        ...prevState,
        dueDate: format(date, 'yyyy-MM-dd'),
      }));
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Assignment' : 'Create New Assignment'}</CardTitle>
        <CardDescription>Fill in the details for the assignment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subjectId">Subject</Label>
          <Select onValueChange={handleSelectChange} defaultValue={formData.subjectId || ''}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="classAssigned">Class Assigned</Label>
          <Input
            id="classAssigned"
            name="classAssigned"
            value={formData.classAssigned || ''}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          {initialData ? 'Update Assignment' : 'Create Assignment'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentForm;
