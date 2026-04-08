// import type { AckItem } from "../types/ack";
// import { ChevronRight } from "lucide-react";

// interface Props {
//   items: AckItem[];
//   loading: boolean;
// //   handleOpenReturn?: (item: AckItem) => void;
// }

// const ReturnList: React.FC<Props> = ({
//   items,
//   loading,
// //   handleOpenReturn,
// }) => {
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!loading && items.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-10">
//         No invoices found
//       </div>
//     );
//   }

//   const sorted = [...items].sort((a, b) => b.inv_gid - a.inv_gid);

//   return (
//     <div
//       className="
//       grid
//       grid-cols-1
//       sm:grid-cols-2
//       lg:grid-cols-3
//       xl:grid-cols-4
//       gap-4
//     "
//     >
//       {sorted.map((item) => (
//         <div
//           key={item.invdet_gid}
//         //   onClick={() => handleOpenReturn?.(item)}
//           className="bg-white rounded-2xl shadow-sm border border-gray-200
//           p-4 flex justify-between items-center hover:shadow-md transition cursor-pointer"
//         >
//           {/* LEFT */}
//           <div>
//             <p className="text-sm text-gray-500">
//               Inv No
//               <span className="font-semibold text-gray-800 ml-1">
//                 {item.inv_no}
//               </span>
//             </p>

//             <p className="text-sm text-gray-500 mt-1">
//               Date: {item.inv_date}
//             </p>

//             <p className="text-xs text-gray-400 mt-1">
//               Vehicle: {item.veh_no}
//             </p>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-2">
//             <p className="text-lg font-semibold text-emerald-600">
//               ₹{Number(item.basic_amt).toFixed(2)}
//             </p>

//             <ChevronRight size={24} className="text-gray-400" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReturnList;




// import React from "react";
// import type { InvoiceGroup, Acknowledgement } from "../types";

// interface Props {
//   items: InvoiceGroup[];
//   loading: boolean;
//   onSelect: (inv: InvoiceGroup) => void;
//   acknowledgements?: Acknowledgement[];
//   //   // selectedId?: string; // optional for green highlight
// }

// const ReturnList: React.FC<Props> = ({ items, loading, onSelect }) => {
//   /* ---------- LOADING ---------- */
//   if (loading) {
//     return (
//       <div className="flex justify-center py-16">
//         <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   /* ---------- EMPTY ---------- */
//   if (!items.length) {
//     return <p className="text-center text-gray-400 py-16">No return requests found</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {items.map((inv) => {
//         const total = inv.items.reduce(
//           (sum, i) => sum + Number(i.basic_amt),
//           0,
//         );
//         // const isSelected = selectedId === inv.inv_gid;

//         const hasAck = inv.items.some(
//           (item) => (item.acknowledgements?.length ?? 0) > 0,
//         );

//         return (
//           <div
//             key={inv.inv_gid}
//             onClick={() => onSelect(inv)}
//             // className="
//             //   cursor-pointer
//             //   bg-white
//             //   border border-gray-200
//             //   rounded-2xl
//             //   shadow-sm
//             //   hover:shadow-xl
//             //   hover:-translate-y-1
//             //   transition-all duration-200

//             //   flex flex-col
//             //   h-full
//             // "

//             className={`
//             cursor-pointer
//             bg-white
//             border
//             rounded-2xl
//             shadow-sm
//             hover:shadow-xl
//             hover:-translate-y-1
//             transition-all duration-200
//             flex flex-col h-full

//             ${
//               hasAck
//                 ? "border-red-400 ring-1 ring-red-200 bg-red-50 "
//                 : "border-gray-200 hover:border-gray-300"
//             }
//           `}
//           >
//             {/* ================= HEADER ================= */}
//             <div className="px-5 pt-5 pb-4 flex items-start justify-between">
//               {/* LEFT */}
//               <div className="min-w-0">
//                 <p className="text-base font-semibold text-gray-900 truncate">
//                   Inv: {inv.inv_no}
//                 </p>

//                 <p className="text-xs text-gray-500 mt-1 truncate">
//                   Vehicle: {inv.vehicle_full}
//                 </p>
//               </div>

//               {/* RIGHT (DATE BADGE) */}
//               <div className="ml-3 shrink-0">
//                 <span
//                   className="
//                   inline-flex items-center
//                   text-xs font-medium
//                   bg-blue-50 text-blue-600
//                   px-3 py-1
//                   rounded-full
//                 "
//                 >
//                   {inv.inv_date}
//                 </span>
//               </div>
//             </div>

//             {/* DIVIDER */}
//             <div className="border-t border-gray-100" />

//             {/* ================= BODY ================= */}
//             <div className="px-5 py-4 flex-1 flex flex-col">
//               {/* TITLE */}
//               <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
//                 Items in Invoice
//               </p>

//               {/* ITEMS */}
//               <div className="space-y-2 flex-1">
//                 {inv.items.map((item) => (
//                   <div
//                     key={item.invdet_gid}
//                     className="
//                       grid grid-cols-[1fr_auto_auto]
//                       items-center
//                       gap-3
//                     "
//                   >
//                     {/* PRODUCT */}
//                     <p className="text-sm text-gray-800 truncate">
//                       {item.prod_name}
//                     </p>

//                     {/* QTY */}
//                     <p className="text-xs text-gray-500 text-right min-w-[55px]">
//                       Qty: {item.qty}
//                     </p>

//                     {/* PRICE */}
//                     <p className="text-sm font-semibold text-emerald-600 text-right min-w-[80px]">
//                       ₹{Number(item.basic_amt).toFixed(2)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ================= FOOTER ================= */}
//             <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-2xl">
//               {/* LEFT */}
//               <p className="text-xs text-gray-500 font-medium">
//                 {inv.items.length} Items
//               </p>

//               {/* RIGHT (TOTAL) */}
//               <div className="text-right">
//                 <p className="text-xs text-gray-400 leading-none">Total</p>
//                 <p className="text-lg font-bold text-emerald-600 leading-tight">
//                   ₹{total.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ReturnList;




import React from "react";
import type { InvoiceGroup, Acknowledgement } from "../types";
import { RotateCw } from "lucide-react";

interface Props {
  items: InvoiceGroup[];
  loading: boolean;
  onSelect: (inv: InvoiceGroup) => void;
  acknowledgements?: Acknowledgement[];
}

const ReturnList: React.FC<Props> = ({ items, loading, onSelect }) => {
  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!items.length) {
       return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <RotateCw size={40} className="mb-3 text-gray-400" />
        <p className="text-center text-gray-500">
          No return requests found for selected range
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((inv) => {
        const total = inv.items.reduce(
          (sum, i) => sum + Number(i.basic_amt),
          0,
        );

        const hasAck = inv.items.some(
          (item) => (item.acknowledgements?.length ?? 0) > 0,
        );

        return (
          <div
            key={inv.inv_gid}
            onClick={() => onSelect(inv)}
            // className="
            //   cursor-pointer
            //   bg-white
            //   border border-gray-200
            //   rounded-2xl
            //   shadow-sm
            //   hover:shadow-xl
            //   hover:-translate-y-1
            //   transition-all duration-200

            //   flex flex-col
            //   h-full
            // "

            className={`
            cursor-pointer
            bg-white
            border
            rounded-2xl
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all duration-200
            flex flex-col h-full

            ${
              hasAck
                ? "border-red-400 ring-1 ring-red-200 bg-red-50 "
                : "border-gray-200 hover:border-gray-300"
            }
          `}
          >
            {/* ================= HEADER ================= */}
            <div className="px-5 pt-5 pb-4 flex items-start justify-between">
              {/* LEFT */}
              <div className="min-w-0">
                <p className="text-base font-semibold text-gray-900 truncate">
                  Inv: {inv.inv_no}
                </p>

                <p className="text-xs text-gray-500 mt-1 truncate">
                  Vehicle: {inv.vehicle_full}
                </p>
              </div>

              {/* RIGHT (DATE BADGE) */}
              <div className="ml-3 shrink-0">
                <span
                  className="
                  inline-flex items-center
                  text-xs font-medium
                  bg-blue-50 text-blue-600
                  px-3 py-1
                  rounded-full
                "
                >
                  {inv.inv_date}
                </span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-100" />

            {/* ================= BODY ================= */}
            <div className="px-5 py-4 flex-1 flex flex-col">
              {/* TITLE */}
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Items in Invoice
              </p>

              {/* ITEMS */}
              <div className="space-y-2 flex-1">
                {inv.items.map((item) => (
                  <div
                    key={item.invdet_gid}
                    className="
                      grid grid-cols-[1fr_auto_auto]
                      items-center
                      gap-3
                    "
                  >
                    {/* PRODUCT */}
                    <p className="text-sm text-gray-800 truncate">
                      {item.prod_name}
                    </p>

                    {/* QTY */}
                    <p className="text-xs text-gray-500 text-right min-w-[55px]">
                      Qty: {item.qty}
                    </p>

                    {/* PRICE */}
                    <p className="text-sm font-semibold text-emerald-600 text-right min-w-[80px]">
                      ₹{Number(item.basic_amt).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-2xl">
              {/* LEFT */}
              <p className="text-xs text-gray-500 font-medium">
                {inv.items.length} Items
              </p>

              {/* RIGHT (TOTAL) */}
              <div className="text-right">
                <p className="text-xs text-gray-400 leading-none">Total</p>
                <p className="text-lg font-bold text-emerald-600 leading-tight">
                  ₹{total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReturnList;
