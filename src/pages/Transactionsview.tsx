import { useEffect, useState } from "react";
import { Search, FileText, Receipt, CreditCard, Loader2 } from "lucide-react";
import { useInvoice } from "../context";
import { toast } from "react-toastify";

export default function TransactionsView() {
  const {
    bills,
    loading,
    fetchBills,
    printInvoice,
    printCashReceipt,
    clearTransactions,
  } = useInvoice();
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // ✅ per button loader
  const [invoiceLoadingId, setInvoiceLoadingId] = useState<string | null>(null);
  const [receiptLoadingId, setReceiptLoadingId] = useState<string | null>(null);

  /* ---------- FETCH BILLS ---------- */

  const handleFetch = async () => {
    if (!startDate || !endDate) return;

    await fetchBills(startDate, endDate);
  };

  /* ---------- PRINT HANDLERS ---------- */
  const handleInvoice = async (gid: string, date: string) => {
    try {
      setInvoiceLoadingId(gid);
      await printInvoice(gid, date);
    } catch {
      toast.error("Invoice download failed");
    } finally {
      setInvoiceLoadingId(null);
    }
  };

  const handleReceipt = async (gid: string, date: string) => {
    try {
      setReceiptLoadingId(gid);
      await printCashReceipt(gid, date);
    } catch (err: any) {
      toast.error(
        err?.message || err?.response?.data?.error || "Receipt download failed",
      );
    } finally {
      setReceiptLoadingId(null);
    }
  };

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    fetchBills(startDate, endDate);
  }, []);

  useEffect(() => {
    return () => {
      clearTransactions();
    };
  }, []);

  return (
    <div className="p-5  mx-auto">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-5">Transactions</h1>

      {/* DATE FILTER */}
      <div className="bg-white rounded-2xl shadow border border-gray-300 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputDate
            label="From"
            value={startDate}
            max={endDate}
            onChange={setStartDate}
          />

          <InputDate
            label="To"
            value={endDate}
            min={startDate}
            max={today} // ✅ disable future dates
            onChange={setEndDate}
          />

          <div className="sm:col-span-2 mt-3">
            <button
              onClick={handleFetch}
              disabled={!startDate || !endDate}
              className="w-full h-12 rounded-xl bg-blue-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-950 disabled:bg-gray-300"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Loading..." : "GET BILLS"}
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="min-h-[200px]">
        {loading ? (
          /* ✅ LIST LOADER (CENTER) */
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-blue-500" size={28} />
          </div>
        ) : bills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <FileText size={40} className="mb-3 text-gray-400" />
            <p className="text-center">
              No bills found for selected range
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bills.map((bill) => (
              <div
                key={bill.gid}
                className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 hover:shadow-md transition flex flex-col justify-between"
              >
                {/* TOP */}
                <div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-lg">
                      <CreditCard size={18} className="text-blue-700" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {bill.prod_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Inv: {bill.inv_no} • {bill.inv_date}
                      </p>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-gray-300 my-4"></div>

                  {/* NET AMOUNT (BOTTOM STYLE) */}
                  <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-500">Net Amount</p>

                    <p className="text-lg font-bold text-[#0195db]">
                      ₹{Number(bill.net_amt).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {/* INVOICE */}
                  <button
                    onClick={() =>
                      handleInvoice(String(bill.gid), bill.inv_date)
                    }
                    disabled={invoiceLoadingId === String(bill.gid)}
                    className="h-11 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 disabled:opacity-60"
                  >
                    {invoiceLoadingId === String(bill.gid) ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <FileText size={16} />
                    )}
                    Invoice
                  </button>

                  {/* RECEIPT */}
                  <button
                    onClick={() =>
                      handleReceipt(String(bill.gid), bill.inv_date)
                    }
                    disabled={receiptLoadingId === String(bill.gid)}
                    className="h-11 rounded-xl bg-slate-600 text-white flex items-center justify-center gap-2 hover:bg-slate-700 disabled:opacity-60"
                  >
                    {receiptLoadingId === String(bill.gid) ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Receipt size={16} />
                    )}
                    Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- DATE INPUT ---------- */
const InputDate = ({ label, value, onChange, min, max }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>

    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker()}
      onKeyDown={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
      focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);
