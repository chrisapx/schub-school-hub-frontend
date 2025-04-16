
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createSubject, getSubject, updateSubject } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface SubjectFormProps {
  isUpdate?: boolean;
  onSuccess?: () => void;
}

interface SubjectFormData {
  name: string;
  code: string;
  teacher?: string;
  description?: string;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ isUpdate = false, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SubjectFormData>({
    name: '',
    code: '',
  });
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const queryClient = useQueryClient();

  const { isLoading: isGetLoading, data: subjectData } = useQuery({
    queryKey: ['subject', subjectId],
    queryFn: () => getSubject(subjectId!),
    enabled: isUpdate && !!subjectId,
  });

  useEffect(() => {
    if (subjectData) {
      setFormData({
        name: subjectData.name,
        code: subjectData.code,
        teacher: subjectData.teacher,
        description: subjectData.description,
      });
    }
  }, [subjectData]);

  const createSubjectMutation = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      toast.success('Subject created successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/subjects');
      }
    },
    onError: (error: any) => {
      toast.error(`Failed to create subject: ${error.message}`);
    },
  });

  const updateSubjectMutation = useMutation({
    mutationFn: updateSubject,
    onSuccess: () => {
      toast.success('Subject updated successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/subjects');
      }
    },
    onError: (error: any) => {
      toast.error(`Failed to update subject: ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.code) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const subjectData: Partial<Subject> = {
      name: formData.name,
      code: formData.code,
      teacher: formData.teacher || '',
      description: formData.description || ''
    };

    if (isUpdate && subjectId) {
      updateSubjectMutation.mutate({ id: subjectId, ...subjectData } as Subject);
    } else {
      createSubjectMutation.mutate(subjectData as Omit<Subject, "id">);
    }
  };

  if (isGetLoading) {
    return <div>Loading subject data...</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isUpdate ? 'Update Subject' : 'Create Subject'}
        </CardTitle>
        <CardDescription className="text-center">
          {isUpdate ? 'Edit subject details' : 'Enter subject information'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Subject Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              placeholder="Subject Code"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Subject Description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={createSubjectMutation.isPending || updateSubjectMutation.isPending}>
            {createSubjectMutation.isPending || updateSubjectMutation.isPending
              ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              : isUpdate
                ? 'Update Subject'
                : 'Create Subject'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SubjectForm;
