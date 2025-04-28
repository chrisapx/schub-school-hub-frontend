
import { v4 as uuidv4 } from 'uuid';
import type { Invoice } from '@/types';
import { getLocalStorageItems, saveLocalStorageItems } from '../utils/localStorage';

export const getInvoices = async () => {
  return getLocalStorageItems<Invoice>('invoices');
};

export const getInvoice = async (id: string) => {
  const invoices = await getInvoices();
  return invoices.find(invoice => invoice.id === id);
};

export const createInvoice = async (invoiceData: Omit<Invoice, "id">) => {
  const invoices = await getInvoices();
  const newInvoice = { 
    ...invoiceData, 
    id: uuidv4(),
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    createdAt: new Date().toISOString()
  };
  saveLocalStorageItems('invoices', [...invoices, newInvoice]);
  return newInvoice;
};

export const updateInvoice = async (invoice: Invoice) => {
  const invoices = await getInvoices();
  const updatedInvoices = invoices.map(i => i.id === invoice.id ? invoice : i);
  saveLocalStorageItems('invoices', updatedInvoices);
  return invoice;
};

export const deleteInvoice = async (id: string) => {
  const invoices = await getInvoices();
  const updatedInvoices = invoices.filter(i => i.id !== id);
  saveLocalStorageItems('invoices', updatedInvoices);
  return { success: true };
};

export const generatePaymentReference = async (invoiceId: string) => {
  const invoices = await getInvoices();
  const updatedInvoices = invoices.map(i => {
    if (i.id === invoiceId) {
      return {
        ...i,
        paymentReference: `REF-${Math.floor(Math.random() * 1000000)}`,
        updatedAt: new Date().toISOString()
      };
    }
    return i;
  });
  
  saveLocalStorageItems('invoices', updatedInvoices);
  const invoice = updatedInvoices.find(i => i.id === invoiceId);
  return invoice;
};
