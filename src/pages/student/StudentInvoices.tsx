
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getInvoices, generatePaymentReference } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { DataCard } from '@/components/ui/data-card';
import { PageTabs } from '@/components/ui/page-tabs';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  FileText, 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Search, 
  Download,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { format } from 'date-fns';

// Define tabs
const tabs = [
  { id: 'all', label: 'All Invoices' },
  { id: 'pending', label: 'Pending' },
  { id: 'paid', label: 'Paid' },
  { id: 'overdue', label: 'Overdue' },
];

const StudentInvoices: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch invoices
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices
  });
  
  // Generate payment reference mutation
  const generateRefMutation = useMutation({
    mutationFn: generatePaymentReference,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Payment reference generated successfully');
      
      // Show the payment reference in a toast message
      if (data?.paymentReference) {
        toast.info(`Your payment reference: ${data.paymentReference}`, {
          duration: 10000,
          action: {
            label: 'Copy',
            onClick: () => {
              navigator.clipboard.writeText(data.paymentReference || '');
              toast.success('Reference copied to clipboard');
            },
          },
        });
      }
    },
    onError: (error) => {
      toast.error(`Failed to generate payment reference: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
  
  // Filter invoices based on active tab and search term
  const filteredInvoices = invoices
    .filter(invoice => 
      invoice.studentId === user?.id && // Only show invoices for the current student
      (activeTab === 'all' || invoice.status === activeTab) &&
      (
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.term.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  // Calculate stats
  const totalPending = invoices.filter(inv => inv.studentId === user?.id && inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.filter(inv => inv.studentId === user?.id && inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = invoices.filter(inv => inv.studentId === user?.id && inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
  
  // Handle generating payment reference
  const handleGenerateReference = (invoiceId: string) => {
    generateRefMutation.mutate(invoiceId);
  };
  
  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  // Simulate downloading an invoice
  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success('Invoice download started');
    // In a real app, this would trigger a download
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">Your Invoices</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataCard
          title="Pending Payments"
          subtitle={formatCurrency(totalPending)}
          icon={<Clock className="h-4 w-4" />}
          variant="border"
        >
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              You have {invoices.filter(inv => inv.studentId === user?.id && inv.status === 'pending').length} pending invoices
            </p>
          </div>
        </DataCard>
        
        <DataCard
          title="Amount Paid"
          subtitle={formatCurrency(totalPaid)}
          icon={<CheckCircle className="h-4 w-4" />}
          variant="border"
        >
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              {invoices.filter(inv => inv.studentId === user?.id && inv.status === 'paid').length} invoices paid
            </p>
          </div>
        </DataCard>
        
        <DataCard
          title="Overdue"
          subtitle={formatCurrency(totalOverdue)}
          icon={<AlertCircle className="h-4 w-4" />}
          variant="border"
        >
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              {invoices.filter(inv => inv.studentId === user?.id && inv.status === 'overdue').length} overdue invoices
            </p>
          </div>
        </DataCard>
      </div>
      
      <PageTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filters={[
          { label: 'Latest First', onClick: () => toast.info('Filter: Latest First') },
          { label: 'Oldest First', onClick: () => toast.info('Filter: Oldest First') },
          { label: 'Highest Amount', onClick: () => toast.info('Filter: Highest Amount') },
        ]}
      />
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    {isLoading ? 'Loading invoices...' : 'No invoices found.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{invoice.invoiceNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(invoice.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{invoice.term}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>{renderStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {invoice.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                            onClick={() => handleGenerateReference(invoice.id)}
                            disabled={generateRefMutation.isPending}
                          >
                            <CreditCard className="mr-1 h-3.5 w-3.5" />
                            Pay Now
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {invoice => invoice.paymentReference && (
        <DataCard
          title="Payment Information"
          subtitle="Use the reference code below to make your payment"
          icon={<CreditCard className="h-4 w-4" />}
          variant="glass"
          className="mt-6"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Payment Reference</p>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 text-primary px-3 py-2 rounded-md font-mono text-lg">
                  {invoice.paymentReference}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(invoice.paymentReference || '');
                    toast.success('Reference copied to clipboard');
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Payment Methods</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    <span>Mobile Money</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    <span>Bank Transfer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    <span>In-person at Cashier</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Instructions</p>
                <p className="text-sm text-muted-foreground">
                  Use this payment reference when making your payment. Once payment is processed, 
                  your invoice status will be updated automatically.
                </p>
              </div>
            </div>
          </div>
        </DataCard>
      )}
    </div>
  );
};

export default StudentInvoices;
