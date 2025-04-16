
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Search, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ReceiptIcon,
  Clock,
  ArrowDownToLine
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Invoice type
interface Invoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  studentId: string;
  issuedDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  items: {
    description: string;
    amount: number;
  }[];
  notes?: string;
}

const StudentInvoices: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // Fetch invoices for the current student
    const fetchInvoices = () => {
      setIsLoading(true);
      try {
        // In a real app, you would filter by the current user's ID
        const storedInvoices = localStorage.getItem('invoices');
        
        if (storedInvoices) {
          const allInvoices = JSON.parse(storedInvoices);
          // Filter invoices for the current student
          const studentInvoices = user 
            ? allInvoices.filter((invoice: Invoice) => invoice.studentId === user.id)
            : allInvoices;
          
          setInvoices(studentInvoices);
        } else {
          // Generate sample invoices if none exist
          const sampleInvoices = [
            {
              id: 'INV-001',
              invoiceNumber: 'INV-001',
              studentName: user?.name || 'Student Name',
              studentId: user?.id || 'student-123',
              issuedDate: '2025-04-01',
              dueDate: '2025-04-30',
              amount: 1200,
              status: 'pending' as const,
              items: [
                { description: 'Tuition Fee', amount: 1000 },
                { description: 'Library Fee', amount: 200 },
              ],
              notes: 'Please pay before the due date to avoid late fees',
            },
            {
              id: 'INV-002',
              invoiceNumber: 'INV-002',
              studentName: user?.name || 'Student Name',
              studentId: user?.id || 'student-123',
              issuedDate: '2025-03-01',
              dueDate: '2025-03-31',
              amount: 1500,
              status: 'paid' as const,
              items: [
                { description: 'Tuition Fee', amount: 1000 },
                { description: 'Lab Fee', amount: 300 },
                { description: 'Exam Fee', amount: 200 },
              ],
              notes: 'Payment received. Thank you!',
            },
            {
              id: 'INV-003',
              invoiceNumber: 'INV-003',
              studentName: user?.name || 'Student Name',
              studentId: user?.id || 'student-123',
              issuedDate: '2025-02-01',
              dueDate: '2025-02-28',
              amount: 1100,
              status: 'overdue' as const,
              items: [
                { description: 'Tuition Fee', amount: 1000 },
                { description: 'Activity Fee', amount: 100 },
              ],
              notes: 'This invoice is overdue. Please pay immediately.',
            },
          ];
          
          // Store sample invoices in localStorage
          localStorage.setItem('invoices', JSON.stringify(sampleInvoices));
          setInvoices(sampleInvoices);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        toast.error('Failed to load invoice data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInvoices();
  }, [user]);
  
  // Filter invoices based on search term and active tab
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && invoice.status === 'pending';
    if (activeTab === 'paid') return matchesSearch && invoice.status === 'paid';
    if (activeTab === 'overdue') return matchesSearch && invoice.status === 'overdue';
    
    return matchesSearch;
  });
  
  // Handler for viewing invoice details
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };
  
  // Handler for generating payment reference
  const handleGeneratePaymentRef = (invoice: Invoice) => {
    // In a real app, you would call an API to generate a reference
    const paymentRef = `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    toast.success(`Payment reference generated: ${paymentRef}`, {
      description: `For invoice ${invoice.invoiceNumber} - $${invoice.amount.toFixed(2)}`,
    });
  };
  
  // Handler for downloading invoice
  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Invoice ${invoice.invoiceNumber} downloaded`, {
      description: 'The PDF file has been downloaded to your device',
    });
  };
  
  // Get status badge based on invoice status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">View and manage your fee invoices</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="text-2xl font-bold">
                  ${invoices
                    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue').length} unpaid invoices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid This Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <div className="text-2xl font-bold">
                  ${invoices
                    .filter(inv => inv.status === 'paid')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoices.filter(inv => inv.status === 'paid').length} paid invoices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-destructive mr-2" />
              <div>
                <div className="text-2xl font-bold">
                  ${invoices
                    .filter(inv => inv.status === 'overdue')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invoices.filter(inv => inv.status === 'overdue').length} overdue invoices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
            <CardTitle>Fee Invoices</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Invoices</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          Loading invoices...
                        </TableCell>
                      </TableRow>
                    ) : filteredInvoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No invoices found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                          <TableCell>
                            {new Date(invoice.issuedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewInvoice(invoice)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View
                              </Button>
                              
                              {invoice.status === 'pending' && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleGeneratePaymentRef(invoice)}
                                >
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Pay Now
                                </Button>
                              )}
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadInvoice(invoice)}
                              >
                                <ArrowDownToLine className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Invoice Details Dialog */}
      <Dialog open={showInvoiceDetails} onOpenChange={setShowInvoiceDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice #{selectedInvoice?.invoiceNumber}</DialogTitle>
            <DialogDescription>
              Issued on {selectedInvoice?.issuedDate && new Date(selectedInvoice.issuedDate).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="font-semibold">Billed To:</h3>
                <p>{selectedInvoice?.studentName}</p>
                <p>ID: {selectedInvoice?.studentId}</p>
              </div>
              
              <div className="text-right">
                <h3 className="font-semibold">Invoice Details:</h3>
                <p>Status: {selectedInvoice?.status.toUpperCase()}</p>
                <p>Due Date: {selectedInvoice?.dueDate && new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedInvoice?.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">${selectedInvoice?.amount.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {selectedInvoice?.notes && (
              <div>
                <h3 className="font-semibold mb-2">Notes:</h3>
                <p className="text-sm text-muted-foreground">{selectedInvoice.notes}</p>
              </div>
            )}
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => handleDownloadInvoice(selectedInvoice!)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              
              {selectedInvoice?.status === 'pending' && (
                <Button onClick={() => handleGeneratePaymentRef(selectedInvoice)}>
                  <ReceiptIcon className="mr-2 h-4 w-4" />
                  Generate Payment Reference
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentInvoices;
