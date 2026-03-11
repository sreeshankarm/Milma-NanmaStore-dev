import api from "./axios";
import type {
  DateRange,
  BillItem,
  InvoiceDetail,
  OrderInvoiceStatusResponse,
} from "../types";

/* ---------- BILLS ---------- */

export const billsApi = (payload: DateRange) =>
  api.post<BillItem[]>("/bills", payload);

/* ---------- INVOICE DETAILS ---------- */

interface InvoiceDetailsResponse {
  invoicedetails: InvoiceDetail[];
}

export const invoiceDetailsApi = (inv_gid: number) =>
  api.post<InvoiceDetailsResponse>("/invoicedetails", { inv_gid });

/* ---------- ORDER INVOICE STATUS ---------- */

export const orderInvoiceStatusApi = (order_gid: number) => {
  const form = new FormData();
  form.append("order_gid", String(order_gid));

  return api.post<OrderInvoiceStatusResponse>(
    "/getinvoicedstatusoforderid",
    form,
  );
};
