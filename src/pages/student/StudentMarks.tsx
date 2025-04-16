
import React, { useState } from 'react';
import { 
  getMarks, 
  getSubjects, 
  getStudentMarks, 
  Mark 
} from '@/utils/localStorage';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { FileDown, Filter, BarChart2 } from 'lucide-react';

const StudentMarks: React.FC = () => {
  const { user } = useAuth();
  const subjects = getSubjects();
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  // Get student marks, assuming the first student for demo purposes
  const studentId = user?.id || 'student-1';
  const allStudentMarks = getStudentMarks(studentId);
  
  // Filter marks based on selections
  const filteredMarks = allStudentMarks.filter(mark => {
    const termMatch = selectedTerm === 'all' || mark.term === selectedTerm;
    const subjectMatch = selectedSubject === 'all' || mark.subjectId === selectedSubject;
    return termMatch && subjectMatch;
  });
  
  // Group marks by subject for the chart
  const getChartData = () => {
    const termData: Record<string, Record<string, number>> = {};
    
    allStudentMarks.forEach(mark => {
      const subject = subjects.find(s => s.id === mark.subjectId)?.name || 'Unknown';
      const percentage = (mark.score / mark.maxScore) * 100;
      
      if (!termData[mark.term]) {
        termData[mark.term] = {};
      }
      
      termData[mark.term][subject] = percentage;
    });
    
    // Convert to chart format
    return Object.entries(termData).map(([term, subjects]) => ({
      term,
      ...subjects
    }));
  };
  
  // Group marks by subject and term for the grade table
  const getGradesTableData = () => {
    const gradesData: Record<string, Record<string, { score: number, maxScore: number }>> = {};
    
    allStudentMarks.forEach(mark => {
      const subject = subjects.find(s => s.id === mark.subjectId)?.name || 'Unknown';
      
      if (!gradesData[subject]) {
        gradesData[subject] = {};
      }
      
      gradesData[subject][mark.term] = {
        score: mark.score,
        maxScore: mark.maxScore
      };
    });
    
    return gradesData;
  };
  
  // Helper to get grade letter
  const getGradeLetter = (percentage: number): string => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'C+';
    if (percentage >= 60) return 'C';
    if (percentage >= 55) return 'D+';
    if (percentage >= 50) return 'D';
    return 'F';
  };
  
  // Get unique terms from marks
  const terms = ['all', ...Array.from(new Set(allStudentMarks.map(mark => mark.term)))];
  
  const chartData = getChartData();
  const gradesTableData = getGradesTableData();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-blue bg-clip-text text-transparent animate-pulse-soft">
          My Marks & Assessments
        </h1>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[140px] futuristic-input">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map(term => (
                <SelectItem key={term} value={term}>
                  {term === 'all' ? 'All Terms' : term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px] futuristic-input">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="table" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="space-y-6">
          {/* Assessment Marks Table */}
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                Assessment Marks
              </CardTitle>
              <CardDescription>
                View your marks for different assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Term</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMarks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No marks found for the selected filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMarks.map((mark) => {
                        const subject = subjects.find(s => s.id === mark.subjectId);
                        const percentage = (mark.score / mark.maxScore) * 100;
                        const gradeLetter = getGradeLetter(percentage);
                        
                        return (
                          <TableRow key={mark.id}>
                            <TableCell className="font-medium">{subject?.name || 'Unknown'}</TableCell>
                            <TableCell>{mark.term}</TableCell>
                            <TableCell>{mark.type}</TableCell>
                            <TableCell>{format(parseISO(mark.date), 'MMM d, yyyy')}</TableCell>
                            <TableCell>
                              <span className="font-semibold">{mark.score}</span>
                              <span className="text-muted-foreground">/{mark.maxScore}</span>
                            </TableCell>
                            <TableCell>
                              <span className={`font-semibold px-2 py-1 rounded text-xs ${
                                percentage >= 80 ? 'bg-green-100 text-green-800' : 
                                percentage >= 60 ? 'bg-blue-100 text-blue-800' : 
                                percentage >= 50 ? 'bg-amber-100 text-amber-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {gradeLetter} ({percentage.toFixed(0)}%)
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Term Grades Table */}
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileDown className="mr-2 h-5 w-5 text-primary" />
                Term Grades Summary
              </CardTitle>
              <CardDescription>
                Overview of your grades by subject and term
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      {terms.filter(term => term !== 'all').map(term => (
                        <TableHead key={term}>{term}</TableHead>
                      ))}
                      <TableHead>Final Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(gradesTableData).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={terms.filter(term => term !== 'all').length + 2} className="text-center py-8 text-muted-foreground">
                          No grades available.
                        </TableCell>
                      </TableRow>
                    ) : (
                      Object.entries(gradesTableData).map(([subject, termGrades]) => {
                        // Calculate final grade (average of all terms)
                        const grades = Object.values(termGrades);
                        const totalPercentage = grades.reduce((sum, { score, maxScore }) => 
                          sum + (score / maxScore) * 100, 0);
                        const averagePercentage = totalPercentage / grades.length;
                        const finalGrade = getGradeLetter(averagePercentage);
                        
                        return (
                          <TableRow key={subject}>
                            <TableCell className="font-medium">{subject}</TableCell>
                            {terms.filter(term => term !== 'all').map(term => {
                              const grade = termGrades[term];
                              if (!grade) {
                                return <TableCell key={term}>-</TableCell>;
                              }
                              
                              const percentage = (grade.score / grade.maxScore) * 100;
                              return (
                                <TableCell key={term}>
                                  <span className="font-semibold">{percentage.toFixed(0)}%</span>
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({getGradeLetter(percentage)})
                                  </span>
                                </TableCell>
                              );
                            })}
                            <TableCell>
                              <span className={`font-semibold ${
                                averagePercentage >= 80 ? 'text-green-600' : 
                                averagePercentage >= 60 ? 'text-blue-600' : 
                                averagePercentage >= 50 ? 'text-amber-600' : 
                                'text-red-600'
                              }`}>
                                {finalGrade} ({averagePercentage.toFixed(0)}%)
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chart">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Performance Chart</CardTitle>
              <CardDescription>
                Visualize your academic performance across terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="term" />
                    <YAxis domain={[0, 100]} unit="%" />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(0)}%`, `Score`]}
                      labelFormatter={(label) => `Term: ${label}`}
                    />
                    <Legend />
                    {subjects.map((subject, index) => (
                      <Line
                        key={subject.id}
                        type="monotone"
                        dataKey={subject.name}
                        stroke={`hsl(${210 + index * 30}, 80%, 50%)`}
                        strokeWidth={2}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="futuristic-card mt-6">
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>
                Compare your performance across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(gradesTableData).map(([subject, termGrades]) => {
                      // Calculate average percentage for each subject
                      const grades = Object.values(termGrades);
                      const totalPercentage = grades.reduce((sum, { score, maxScore }) => 
                        sum + (score / maxScore) * 100, 0);
                      const averagePercentage = totalPercentage / grades.length;
                      
                      return {
                        subject,
                        average: parseFloat(averagePercentage.toFixed(0))
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} unit="%" />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, `Average Score`]}
                      labelFormatter={(label) => `Subject: ${label}`}
                    />
                    <Bar dataKey="average" fill="hsl(222, 47%, 25%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentMarks;
