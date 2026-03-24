import { X } from "lucide-react";
import { useInvoice } from "../context/invoice/useInvoice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const InvoiceModal = ({ open, onClose }: Props) => {
  const { invoiceDetails } = useInvoice();

  if (!open) return null;

  const invoice = invoiceDetails[0];



  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
      {/* CARD */}
      <div
        className="bg-white w-full sm:max-w-md h-[80vh]
    rounded-t-2xl sm:rounded-2xl shadow-xl animate-slideUp
    flex flex-col overflow-hidden"
      >
        {/* HEADER (FIXED) */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-lg text-gray-800">
            Invoice Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X />
          </button>
        </div>

        {/* ✅ BODY SCROLL AREA */}
        <div
          className="flex-1 overflow-y-auto px-4 py-2
      thin-scroll"
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 py-3 bg-gray-50 border rounded-lg px-3 mb-3">
            <img
              src="/nanma.png"
              alt="logo"
              className="w-10 h-10 object-contain rounded-md border"
            />
            <div>
              <p className="font-semibold text-gray-800">Nanma Store</p>
              <p className="text-xs text-gray-500">Fresh Milk & Products</p>
            </div>
          </div>

          {/* INVOICE INFO */}
          <div className="text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Invoice No</p>
              <p className="font-medium">#{invoice?.inv_no}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Date</p>
              <p>{invoice?.inv_date}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Vehicle</p>
              <p>{invoice?.veh_no}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-500">Shift</p>
              <p>{invoice?.inv_shift === 1 ? "Morning" : "Evening"}</p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-3 pb-4">
            {invoiceDetails.map((item) => (
              <div
                key={item.gid}
                className="border rounded-xl p-3 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.prod_name}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.qty} × ₹{item.basic_rate}
                  </p>
                </div>

                <p className="font-semibold text-[#0195db]">₹{item.tot_amt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER (FIXED) */}
        <div className="px-4 py-3 border-t bg-white">
          <div className="flex justify-between font-semibold mb-3">
            <p>Grand Total</p>
            <p className="text-[#0195db]">
              ₹{invoiceDetails.reduce((sum, i) => sum + Number(i.tot_amt), 0)}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full bg-[#0195db] text-white py-3 rounded-xl font-semibold
          hover:bg-blue-700 transition"
          >
            ⬇ Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
