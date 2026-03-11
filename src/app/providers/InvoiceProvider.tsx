import { useState } from "react";
import { InvoiceContext } from "../../context/invoice/InvoiceContext";
import {
  billsApi,
  invoiceDetailsApi,
  orderInvoiceStatusApi,
} from "../../api/invoice.api";
import type { BillItem, InvoiceDetail, OrderInvoiceStatus } from "../../types";

export const InvoiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bills, setBills] = useState<BillItem[]>([]);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);
  const [orderInvoices, setOrderInvoices] = useState<OrderInvoiceStatus[]>([]);

  const fetchBills = async (start: string, end: string) => {
    const { data } = await billsApi({
      p_sdate: start,
      p_edate: end,
    });
    setBills(data ?? []);
  };

  const fetchInvoiceDetails = async (gid: number) => {
    const { data } = await invoiceDetailsApi(gid);
    setInvoiceDetails(data.invoicedetails ?? []);
  };

  const fetchOrderInvoiceStatus = async (order_gid: number) => {
    const { data } = await orderInvoiceStatusApi(order_gid);

    if (data.status === "success") {
      setOrderInvoices(data.data ?? []);
    } else {
      setOrderInvoices([]);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        bills,
        invoiceDetails,
        fetchBills,
        fetchInvoiceDetails,
        orderInvoices,
        fetchOrderInvoiceStatus,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
