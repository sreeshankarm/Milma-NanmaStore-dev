// import { useState, useEffect } from "react";
// import { useOrder } from "../context/order/useOrder";
// import OrdersListnew from "../components/orders/OrdersListnew";
// import ReturnRequestModal from "../components/ReturnRequestModal";
// import { useNavigate } from "react-router-dom";

// export default function DamagesReturnOrderView() {
//   const { orders, fetchOrders } = useOrder();
//   const navigate = useNavigate();

//   const today = new Date().toISOString().split("T")[0];

//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);

//   const [startDate, setStartDate] = useState(today);
//   const [endDate, setEndDate] = useState(today);

//   /* ---------- LOAD ORDERS ON PAGE OPEN ---------- */

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     try {
//       setLoading(true);
//       await fetchOrders(startDate, endDate);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- FETCH ORDERS (FILTER) ---------- */

//   const handleFetch = async () => {
//     if (!startDate || !endDate) return;

//     try {
//       setLoading(true);
//       await fetchOrders(startDate, endDate);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- OPEN RETURN MODAL ---------- */

//   const handleOpenReturn = (order: any) => {
//     setSelectedOrder(order);
//   };

//   return (
//     <div className="p-5 mx-auto">

//       {/* HEADER */}

//       <div className="mb-6 flex items-center justify-between">

//         <h1 className="text-2xl font-bold">
//           Select an Order
//         </h1>

//         <button
//           onClick={() => navigate("/damagesReturn")}
//           className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
//         >
//           Back
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

//       {/* PAGE LOADER */}

//       {loading ? (
//         <div className="flex justify-center items-center py-16">
//           <div className="h-7 w-7 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         <OrdersListnew
//           orders={orders}
//           loading={loading}
//           handleOpenReturn={handleOpenReturn}
//         />
//       )}

//       {/* RETURN MODAL */}

//       {selectedOrder && (
//         <ReturnRequestModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//         />
//       )}

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