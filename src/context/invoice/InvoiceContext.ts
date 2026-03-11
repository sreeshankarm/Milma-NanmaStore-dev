import { createContext } from "react";
import type { BillItem, InvoiceDetail, OrderInvoiceStatus } from "../../types";

export interface InvoiceContextType {
  bills: BillItem[];
  invoiceDetails: InvoiceDetail[];
  orderInvoices: OrderInvoiceStatus[];
  fetchOrderInvoiceStatus: (order_gid: number) => Promise<void>;

  fetchBills: (start: string, end: string) => Promise<void>;
  fetchInvoiceDetails: (gid: number) => Promise<void>;
}

export const InvoiceContext = createContext<InvoiceContextType | null>(null);
