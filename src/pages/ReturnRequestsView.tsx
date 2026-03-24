// import { ArrowRight, Clock, RefreshCcw } from "lucide-react";
// import { useStore } from "../context/store/store";
// import type { ReturnItem } from "../typesss/typesss";
// import { useNavigate } from "react-router-dom";

// // interface ReturnItem {
// //   id: string;
// //   orderId: string;
// //   date: string;
// //   status: "REQUESTED" | "APPROVED" | "IN_REVIEW";
// //   credited?: string;
// //   products: {
// //     name: string;
// //     qty: number;
// //     issue: string;
// //   }[];
// // }

// // interface Props {
// //   requests?: ReturnItem[];
// //   onStartNew?: () => void;
// // }

// export default function ReturnRequestsView() {
//   // const { returnRequests } = useStore();
//   const { returnRequests } = useStore() as {
//     returnRequests: ReturnItem[];
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="p-5 max-w-3xl mx-auto">
//       {/* PAGE TITLE */}

//       <div className="mb-6 flex items-center justify-between">
//         {/* Title */}
//         <h1 className="text-2xl font-bold text-gray-900">Return Requests</h1>

//         {/* New Request button */}
//         <button
//           // onClick={onStartNew}
//           className="rounded-full border border-red-400 px-5 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
//           onClick={() => navigate("/orders")}
//         >
//           New Request
//         </button>
//       </div>

//       {/* BIG START CARD – MATCHING DESIGN */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-4 text-white">
//           {/* Left icon */}
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
//             <RefreshCcw size={22} />
//           </div>

//           {/* Text */}
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Start a new return</p>
//             <p className="text-sm opacity-90">
//               Tap below to pick the order linked to this return before filling
//               the form.
//             </p>
//           </div>

//           {/* Begin button */}
//           <button
//             // onClick={onStartNew}
//             className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
//             onClick={() => navigate("/orders")}
//           >
//             Begin
//             <ArrowRight size={16} />
//           </button>
//         </div>
//       </div>

//       {/* RETURN LIST */}
//       <div className="space-y-4">
//         {returnRequests.map((r) => (
//           <div key={r.id} className="rounded-2xl border border-gray-300 p-4">
//             <div className="flex justify-between">
//               <p className="font-bold">{r.id}</p>
//               <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
//                 {r.status}
//               </span>
//             </div>

//             <p className="text-sm text-gray-500">For Order #{r.orderId}</p>

//             <div className="mt-3 bg-gray-50 rounded-xl p-3">
//               {r.products.map((p, i) => (
//                 <div key={i} className="flex justify-between text-sm">
//                   <span>
//                     {p.name} x{p.qty}
//                   </span>
//                   <span className="text-red-500">{p.issue}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-3 flex items-center gap-1 text-sm text-gray-500">
//               <Clock size={14} />
//               {r.date}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









// import { useState, useEffect } from "react";
// import { ArrowRight, RefreshCcw } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAck } from "../context/ack/useAck";
// import ReturnList from "../components/ReturnList";

// export default function ReturnRequestsView() {
//   const { fetchAckList, ackList } = useAck();
//   const navigate = useNavigate();

//   const today = new Date().toISOString().split("T")[0];

//   const [startDate, setStartDate] = useState(today);
//   const [endDate, setEndDate] = useState(today);
//   const [loading, setLoading] = useState(false);

//   /* ---------- LOAD RETURNS ---------- */

//   useEffect(() => {
//     loadReturns();
//   }, []);

//   const loadReturns = async () => {
//     try {
//       setLoading(true);
//       await fetchAckList(startDate, endDate);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- NEW REQUEST ---------- */

//   const handleNewRequest = () => {
//     navigate("/damagesReturnOrder");
//   };

//   /* ---------- FILTER ---------- */

//   const handleFetch = async () => {
//     if (!startDate || !endDate) return;

//     try {
//       setLoading(true);
//       await fetchAckList(startDate, endDate);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-5 mx-auto">
//       {/* HEADER */}

//       <div className="mb-6 flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Return Requests</h1>

//         <button
//           onClick={handleNewRequest}
//           className="rounded-full border border-red-400 px-5 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
//         >
//           New Request
//         </button>
//       </div>

//       {/* START CARD */}

//       <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-4 text-white">
//         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
//           <RefreshCcw size={22} />
//         </div>

//         <div className="flex-1">
//           <p className="text-lg font-semibold">Start a new return</p>

//           <p className="text-sm opacity-90">Pick order date range to begin</p>
//         </div>

//         <button
//           onClick={handleNewRequest}
//           className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-red-600"
//         >
//           Begin
//           <ArrowRight size={16} />
//         </button>
//       </div>

//       {/* DATE FILTER */}

//       <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-5 mb-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InputDate
//             label="Start Date"
//             value={startDate}
//             max={endDate}
//             onChange={setStartDate}
//           />

//           <InputDate
//             label="End Date"
//             value={endDate}
//             min={startDate}
//             max={today}
//             onChange={setEndDate}
//           />

//           <div className="sm:col-span-2 mt-3">
//             <button
//               onClick={handleFetch}
//               disabled={!startDate || !endDate}
//               className="w-full h-11 sm:h-12 rounded-xl bg-emerald-600 text-white font-semibold
//               hover:bg-emerald-700 disabled:bg-gray-300"
//             >
//               {loading ? "Loading..." : "Get Requests"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RETURN LIST */}

//       <ReturnList items={ackList} loading={loading} />
//     </div>
//   );
// }

// /* ---------- DATE INPUT ---------- */

// const InputDate = ({ label, value, onChange, min, max }: any) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-600 mb-2">
//       {label}
//     </label>

//     <input
//       type="date"
//       value={value}
//       min={min}
//       max={max}
//       onChange={(e) => onChange(e.target.value)}
//       onClick={(e) => e.currentTarget.showPicker()}
//       onKeyDown={(e) => e.preventDefault()}
//       onPaste={(e) => e.preventDefault()}
//       className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
//       focus:ring-2 focus:ring-emerald-500 focus:outline-none"
//     />
//   </div>
// );





import { useState, useEffect } from "react";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAck } from "../context/ack/useAck";
import ReturnList from "../components/ReturnList";
import type { InvoiceGroup } from "../types";
import ReturnRequestModal from "../components/ReturnRequestModal";

export default function ReturnRequestsView() {
  const { fetchAckList, ackList } = useAck();
  const [selectedInv, setSelectedInv] = useState<InvoiceGroup | null>(null);

  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [loading, setLoading] = useState(false);



  const loadReturns = async () => {
    try {
      setLoading(true);
      await fetchAckList(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- NEW REQUEST ---------- */

  const handleNewRequest = () => {
    navigate("/orders");
  };

  /* ---------- FILTER ---------- */

  const handleFetch = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      await fetchAckList(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

   /* ---------- LOAD RETURNS ---------- */

  useEffect(() => {
    loadReturns();
  }, []);

  

  return (
    <div className="p-5 mx-auto">
      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Return Requests</h1>

        {/* <button
          onClick={handleNewRequest}
          className="rounded-full border border-red-400 px-5 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
        >
          New Request
        </button> */}
      </div>

      {/* START CARD */}

      <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-4 text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
          <RefreshCcw size={22} />
        </div>

        <div className="flex-1">
          <p className="text-lg font-semibold">Start a new return</p>

          <p className="text-sm opacity-90">Pick order date range to begin</p>
        </div>

        <button
          onClick={handleNewRequest}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-red-600"
        >
          Begin
          <ArrowRight size={16} />
        </button>
      </div>

      {/* DATE FILTER */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputDate
            label="Start Date"
            value={startDate}
            max={endDate}
            onChange={setStartDate}
          />

          <InputDate
            label="End Date"
            value={endDate}
            min={startDate}
            max={today}
            onChange={setEndDate}
          />

          <div className="sm:col-span-2 mt-3">
            <button
              onClick={handleFetch}
              disabled={!startDate || !endDate}
              className="w-full h-11 sm:h-12 rounded-xl bg-emerald-600 text-white font-semibold
              hover:bg-emerald-700 disabled:bg-gray-300 "
            >
              {loading ? "Loading..." : "Get Requests"}
            </button>
          </div>
        </div>
      </div>

      {/* RETURN LIST */}


      <ReturnList
        items={ackList}
        loading={loading}
        // onSelect={(inv) => setSelectedInv(inv)}
        onSelect={setSelectedInv}
      />

      {selectedInv && (
        <ReturnRequestModal
          invoice={selectedInv}
          onClose={() => setSelectedInv(null)}
        />
      )}
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
      focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
);
