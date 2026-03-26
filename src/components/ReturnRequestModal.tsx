// // import { X, Camera } from "lucide-react";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useStore } from "../context/store/store";

// // interface Item {
// //   id: string;
// //   name: string;
// //   quantity: number;
// //   price: number;
// //   image?: string;
// // }

// // interface Props {
// //   show: boolean;
// //   onCancel: () => void;
// //   onConfirm: (data: {
// //     selectedItems: {
// //       id: string;
// //       qty: number;
// //       issue: string;
// //     }[];
// //     photo: File | null;
// //     remarks: string;
// //   }) => void;

// //   orderId: string;
// //   deliveryInfo: string;
// //   items: Item[];
// // }

// // export default function ReturnRequestModal({
// //   show,
// //   onCancel,
// //   // onConfirm,
// //   orderId,
// //   deliveryInfo,
// //   items,
// // }: Props) {
// //   const navigate = useNavigate();
// //   const { createReturnRequest } = useStore();
// //   const [selectedItems, setSelectedItems] = useState<string[]>([]);
// //   const [itemDetails, setItemDetails] = useState<{
// //     [key: string]: { qty: number; issue: string };
// //   }>({});

// //   const [photo, setPhoto] = useState<File | null>(null);
// //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// //   const [remarks, setRemarks] = useState("");

// //   if (!show) return null;

// //   // Validate form
// //   const isFormValid =
// //     selectedItems.length > 0 && photo !== null && remarks.trim().length > 0;

// //   // Toggle item selection
// //   //   const toggleItem = (id: string, maxQty: number) => {
// //   //     setSelectedItems((prev) =>
// //   //       prev.includes(id)
// //   //         ? prev.filter((x) => x !== id)
// //   //         : [...prev, id]
// //   //     );

// //   //     // Initialize if first time
// //   //     setItemDetails((prev) => ({
// //   //       ...prev,
// //   //       [id]: prev[id] || { qty: 1, issue: "Spoilage" },
// //   //     }));
// //   //   };

// //   const toggleItem = (id: string, maxQty: number) => {
// //     setSelectedItems((prev) =>
// //       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
// //     );

// //     setItemDetails((prev) => ({
// //       ...prev,
// //       [id]: prev[id] || { qty: Math.min(1, maxQty), issue: "Spoilage" },
// //     }));
// //   };

// //   // Update qty
// //   const updateQty = (id: string, change: number, max: number) => {
// //     setItemDetails((prev) => ({
// //       ...prev,
// //       [id]: {
// //         ...prev[id],
// //         qty: Math.min(max, Math.max(1, prev[id].qty + change)),
// //       },
// //     }));
// //   };

// //   // Update issue type
// //   const updateIssue = (id: string, issue: string) => {
// //     setItemDetails((prev) => ({
// //       ...prev,
// //       [id]: { ...prev[id], issue },
// //     }));
// //   };

// //   // Photo upload
// //   const handlePhotoUpload = (file: File | null) => {
// //     if (!file) return;
// //     setPhoto(file);
// //     setPreviewUrl(URL.createObjectURL(file));
// //   };

// //   const removePhoto = () => {
// //     setPhoto(null);
// //     setPreviewUrl(null);
// //   };

// //   const handleSubmit = () => {
// //   const payload = {
// //     orderId,
// //     products: selectedItems.map((id) => ({
// //       name: items.find((i) => i.id === id)?.name,
// //       qty: itemDetails[id].qty,
// //       issue: itemDetails[id].issue,
// //     })),
// //     remarks,
// //     photo,
// //   };

// //   console.log("RETURN REQUEST DATA:", payload);

// //   createReturnRequest(payload);
// //   onCancel();
// //   navigate("/damagesReturn");
// // };


// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
// //         {/* HEADER */}
// //         <div className="flex justify-between items-center p-4 border-b">
// //           <h2 className="text-xl font-semibold">Return Request</h2>
// //           <button onClick={onCancel} className="p-1 hover:bg-gray-200 rounded">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* BODY */}
// //         <div className="p-4 space-y-6 overflow-y-auto thin-scroll flex-1">
// //           {/* ORDER INFO */}
// //           <div className="border p-4 rounded-xl">
// //             <p className="font-bold">Order #{orderId}</p>
// //             <p className="text-sm text-gray-600">{deliveryInfo}</p>
// //           </div>

// //           {/* ITEMS LIST */}
// //           <div>
// //             <p className="font-semibold mb-2">Select Damaged Items</p>

// //             {items.map((item) => {
// //               const selected = selectedItems.includes(item.id);
// //               const details = itemDetails[item.id];

// //               return (
// //                 <div
// //                   key={item.id}
// //                   className={`border rounded-xl p-3 mb-3 transition ${
// //                     selected ? "bg-red-50 border-red-300" : ""
// //                   }`}
// //                 >
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                       <img
// //                         src={
// //                           item.image && item.image.trim() !== ""
// //                             ? item.image
// //                             : "https://via.placeholder.com/80?text=No+Image"
// //                         }
// //                         className="w-14 h-14 rounded-lg object-cover bg-gray-100"
// //                       />

// //                       <div>
// //                         <p className="font-medium">{item.name}</p>
// //                         <p className="text-xs text-gray-500">
// //                           Max Qty: {item.quantity}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     {/* CHECKBOX */}
// //                     <input
// //                       type="checkbox"
// //                       className="w-5 h-5"
// //                       checked={selected}
// //                       onChange={() => toggleItem(item.id, item.quantity)}
// //                     />
// //                   </div>

// //                   {/* SHOW EXTRA FIELDS ONLY IF SELECTED */}
// //                   {selected && (
// //                     <div className="mt-3 border-t pt-3 space-y-3">
// //                       {/* DAMAGED QTY */}
// //                       <div>
// //                         <p className="text-sm font-semibold mb-1">
// //                           Damaged Qty
// //                         </p>

// //                         <div className="flex items-center gap-3">
// //                           <button
// //                             onClick={() =>
// //                               updateQty(item.id, -1, item.quantity)
// //                             }
// //                             className="px-3 py-1 rounded border"
// //                           >
// //                             -
// //                           </button>

// //                           <span className="font-semibold">{details.qty}</span>

// //                           <button
// //                             onClick={() =>
// //                               updateQty(item.id, +1, item.quantity)
// //                             }
// //                             className="px-3 py-1 rounded border"
// //                           >
// //                             +
// //                           </button>
// //                         </div>
// //                       </div>

// //                       {/* ISSUE TYPE */}
// //                       <div>
// //                         <p className="text-sm font-semibold mb-1">Issue Type</p>

// //                         <select
// //                           value={details.issue}
// //                           onChange={(e) => updateIssue(item.id, e.target.value)}
// //                           className="w-full border rounded-lg p-2 text-sm"
// //                         >
// //                           <option>Leakage</option>
// //                           <option>Spoilage</option>
// //                           <option>Packaging Damage</option>
// //                           <option>Wrong Item Received</option>
// //                           <option>Quality Issue</option>
// //                         </select>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* PHOTO UPLOAD */}
// //           <div>
// //             <p className="font-semibold mb-2">Evidence (Mandatory)</p>

// //             {!previewUrl ? (
// //               <label className="border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer">
// //                 <Camera size={28} />
// //                 <p className="text-gray-500 text-sm">Upload Photo</p>

// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   className="hidden"
// //                   onChange={(e) =>
// //                     handlePhotoUpload(e.target.files?.[0] ?? null)
// //                   }
// //                 />
// //               </label>
// //             ) : (
// //               <div className="relative w-fit mt-2">
// //                 <img
// //                   src={previewUrl}
// //                   className="w-24 h-24 object-cover rounded-xl border"
// //                 />
// //                 <button
// //                   onClick={removePhoto}
// //                   className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full p-1"
// //                 >
// //                   <X size={14} />
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           {/* REMARKS */}
// //           <div>
// //             <p className="font-semibold mb-2">Remarks</p>
// //             <textarea
// //               className="w-full border rounded-xl p-3 text-sm"
// //               rows={3}
// //               value={remarks}
// //               onChange={(e) => setRemarks(e.target.value)}
// //               placeholder="Describe the issue..."
// //             />
// //           </div>
// //         </div>

// //         {/* FOOTER */}
// //         <div className="p-4 border-t bg-white">
// //           {/* <button
// //             disabled={!isFormValid}
// //             className={`w-full py-3 rounded-xl font-semibold transition
// //               ${
// //                 isFormValid
// //                   ? "bg-black text-white cursor-pointer"
// //                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
// //               }`}
// //             onClick={() =>
// //               onConfirm({
// //                 selectedItems: selectedItems.map((id) => ({
// //                   id,
// //                   qty: itemDetails[id].qty,
// //                   issue: itemDetails[id].issue,
// //                 })),
// //                 photo,
// //                 remarks,
// //               })
// //             }
// //           >
// //             Submit Return Request
// //           </button> */}
// //           <button
// //             disabled={!isFormValid}
// //             className={`w-full py-3 rounded-xl font-semibold
// //     ${isFormValid ? "bg-black text-white" : "bg-gray-300 text-gray-500"}`}
// //             onClick={handleSubmit}
// //           >
// //             Submit Return Request
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }








// import { useEffect, useMemo, useState } from "react";
// import {
//   X,
//   Plus,
//   Minus,
//   Trash2,
//   CheckSquare,
//   Square,
//   Package,
//   Loader2,
//   PlusCircle,
// } from "lucide-react";

// import { useOrder } from "../context/order/useOrder";
// import { useAck } from "../context/ack/useAck";
// import { useProduct } from "../context/product/useProduct";

// interface Props {
//   order: any;
//   onClose: () => void;
// }

// interface Row {
//   faultId: number;
//   qty: number;
// }

// interface SaveAckItem {
//   inv_gid: number;
//   invdet_gid: number;
//   remarks: string;
//   faults: {
//     fault_id: number;
//     fault_name: string;
//     qty: number;
//   }[];
// }

// export default function ReturnRequestModal({ order, onClose }: Props) {
//   const { orderDetails, fetchOrderDetails, loading } = useOrder();
//   const { faultTypes, saveAck } = useAck();
//   const { products, fetchProducts } = useProduct();

//   const [selectedItems, setSelectedItems] = useState<
//     Record<string, { rows: Row[] }>
//   >({});
//   const [remarks, setRemarks] = useState("");
//   const [submitLoading, setSubmitLoading] = useState(false);

//   /* FETCH ORDER */

//   useEffect(() => {
//     if (order?.gid) fetchOrderDetails(order.gid);
//   }, [order]);

//   /* FETCH PRODUCTS */

//   useEffect(() => {
//     if (orderDetails.length > 0) {
//       fetchProducts(orderDetails[0].supply_date);
//     }
//   }, [orderDetails]);

//   /* PRODUCT IMAGE MAP */

//   const productMap = useMemo(() => {
//     const map: Record<number, string | undefined> = {};
//     products.forEach((p) => (map[p.prod_code] = p.imagepath));
//     return map;
//   }, [products]);

//   /* ITEMS */

//   const items = useMemo(
//     () =>
//       orderDetails.map((i: any) => ({
//         id: String(i.inddet_gid),
//         name: i.prod_name,
//         qty: Number(i.ind_qty),
//         prod_code: i.prod_code,
//         image: productMap[i.prod_code],
//         inv_gid: i.inddet_gid,
//         invdet_gid: i.inddet_gid,
//       })),
//     [orderDetails, productMap],
//   );

//   const totalQty = orderDetails.reduce(
//     (a: number, b: any) => a + Number(b.ind_qty ?? 0),
//     0,
//   );

//   const totalAmount = Number(order?.ordertotal ?? 0);

//   /* SELECT ITEM */

//   const handleSelect = (itemId: string) => {
//     setSelectedItems((prev) => {
//       const copy = { ...prev };

//       if (copy[itemId]) delete copy[itemId];
//       else
//         copy[itemId] = {
//           rows: [{ faultId: faultTypes?.[0]?.id ?? 1, qty: 1 }],
//         };

//       return copy;
//     });
//   };

//   /* ADD ROW */

//   const addRow = (itemId: string) => {
//     setSelectedItems((prev) => ({
//       ...prev,
//       [itemId]: {
//         rows: [
//           ...prev[itemId].rows,
//           { faultId: faultTypes?.[0]?.id ?? 1, qty: 1 },
//         ],
//       },
//     }));
//   };

//   /* CHANGE QTY (PROPER LOGIC) */

//   const changeQty = (itemId: string, index: number, delta: number) => {
//     setSelectedItems((prev) => {
//       const rows = [...prev[itemId].rows];
//       const item = items.find((i) => i.id === itemId);
//       if (!item) return prev;

//       const currentRow = rows[index];

//       const otherQty = rows.reduce(
//         (sum, r, i) => (i === index ? sum : sum + r.qty),
//         0,
//       );

//       const maxAllowed = item.qty - otherQty;
//       const newQty = currentRow.qty + delta;

//       if (newQty < 1 || newQty > maxAllowed) return prev;

//       rows[index] = { ...currentRow, qty: newQty };

//       return {
//         ...prev,
//         [itemId]: { rows },
//       };
//     });
//   };

//   /* DELETE ROW */

//   const deleteRow = (itemId: string, index: number) => {
//     setSelectedItems((prev) => {
//       const rows = [...prev[itemId].rows];
//       rows.splice(index, 1);
//       return { ...prev, [itemId]: { rows } };
//     });
//   };

//   /* CHANGE FAULT */

//   const changeFault = (itemId: string, index: number, faultId: number) => {
//     setSelectedItems((prev) => {
//       const rows = [...prev[itemId].rows];
//       rows[index].faultId = faultId;
//       return { ...prev, [itemId]: { rows } };
//     });
//   };

//   /* VALIDATION */

//   const isValid =
//     Object.keys(selectedItems).length > 0 && remarks.trim().length > 2;

//   /* SUBMIT */

//   const handleSubmit = async () => {
//     try {
//       setSubmitLoading(true);

//       const payload: SaveAckItem[] = [];

//       Object.entries(selectedItems).forEach(([id, data]) => {
//         const item = items.find((i) => i.id === id);
//         if (!item) return;

//         payload.push({
//           inv_gid: item.inv_gid,
//           invdet_gid: item.invdet_gid,
//           remarks,
//           faults: faultTypes.map((f: any) => ({
//             fault_id: f.id,
//             fault_name: f.name,
//             qty: data.rows.find((r) => r.faultId === f.id)?.qty ?? 0,
//           })),
//         });
//       });

//       await saveAck({ items: payload });

//       onClose();
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
//       <div className="bg-white w-full max-w-2xl h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
//         {/* HEADER */}

//         <div className="border-b  border-gray-400 px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-2 font-semibold text-gray-800">
//             <Package size={18} />
//             Order #{order?.gid}
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* BODY */}

//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 thin-scroll">
//           {loading ? (
//             <div className="flex justify-center py-20">
//               <Loader2 className="animate-spin text-gray-500" size={32} />
//             </div>
//           ) : (
//             <>
//               {/* SUMMARY */}

//               <div className="border  border-gray-300 rounded-xl p-4 text-sm space-y-2">
//                 <div className="flex justify-between">
//                   <span>Total Qty</span>
//                   <span className="font-semibold">{totalQty}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span>Items</span>
//                   <span className="font-semibold">
//                     {items.length} product(s)
//                   </span>
//                 </div>

//                 <div className="border-t  border-gray-300 my-2"></div>

//                 <div className="flex justify-between font-semibold text-base">
//                   <span>Total</span>
//                   <span className="text-[#0195db]">
//                     ₹{totalAmount.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {/* PRODUCTS */}

//               <div className="space-y-4">
//                 <h3 className="text-sm font-semibold text-gray-700">
//                   Select Damaged Items
//                 </h3>

//                 {items.map((item) => {
//                   const active = !!selectedItems[item.id];
//                   const rows = selectedItems[item.id]?.rows || [];

//                   const totalSelected = rows.reduce((s, r) => s + r.qty, 0);
//                   const canAddMore = totalSelected < item.qty;

//                   return (
//                     <div
//                       key={item.id}
//                       className={`border rounded-xl p-4 space-y-4 ${
//                         active ? "border-red-400 bg-red-50" : "border-gray-300"
//                       }`}
//                     >
//                       {/* PRODUCT HEADER */}

//                       <div
//                         onClick={() => handleSelect(item.id)}
//                         className="flex items-center gap-4 cursor-pointer"
//                       >
//                         <img
//                           src={item.image || "https://via.placeholder.com/80"}
//                           className="w-12 h-12 rounded-md object-cover"
//                         />

//                         <div className="flex-1">
//                           <p className="text-sm font-semibold">{item.name}</p>
//                           <p className="text-xs text-gray-500">
//                             Ordered Qty: {item.qty}
//                           </p>
//                         </div>

//                         {active ? (
//                           <CheckSquare size={20} className="text-red-500" />
//                         ) : (
//                           <Square size={20} className="text-gray-400" />
//                         )}
//                       </div>

//                       {/* DAMAGE ROWS */}

//                       {active && (
//                         <div className="space-y-3">
//                           {rows.map((row, i) => {
//                             const otherQty = rows.reduce(
//                               (sum, r, idx) => (idx === i ? sum : sum + r.qty),
//                               0,
//                             );

//                             const maxAllowed = item.qty - otherQty;

//                             return (
//                               <div key={i} className="flex items-center gap-3">
//                                 <select
//                                   value={row.faultId}
//                                   onChange={(e) =>
//                                     changeFault(
//                                       item.id,
//                                       i,
//                                       Number(e.target.value),
//                                     )
//                                   }
//                                   className="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#339cff]"
//                                 >
//                                   {faultTypes.map((f: any) => (
//                                     <option key={f.id} value={f.id}>
//                                       {f.name}
//                                     </option>
//                                   ))}
//                                 </select>

//                                 <div className="flex items-center border border-gray-400 rounded-lg ">
//                                   <button
//                                     onClick={() => changeQty(item.id, i, -1)}
//                                     className="px-2 py-1"
//                                   >
//                                     <Minus size={16} />
//                                   </button>

//                                   <span className="w-8 text-center text-sm">
//                                     {row.qty}
//                                   </span>

//                                   <button
//                                     disabled={row.qty >= maxAllowed}
//                                     onClick={() => changeQty(item.id, i, 1)}
//                                     className={`px-2 py-1 ${
//                                       row.qty >= maxAllowed
//                                         ? "opacity-40 cursor-not-allowed"
//                                         : ""
//                                     }`}
//                                   >
//                                     <Plus size={16} />
//                                   </button>
//                                 </div>

//                                 <button
//                                   disabled={i === 0}
//                                   onClick={() => deleteRow(item.id, i)}
//                                   className={`${
//                                     i === 0
//                                       ? "text-gray-300 cursor-not-allowed"
//                                       : "text-red-500 hover:text-red-600"
//                                   }`}
//                                 >
//                                   <Trash2 size={18} />
//                                 </button>
//                               </div>
//                             );
//                           })}

//                           <button
//                             disabled={!canAddMore}
//                             onClick={() => addRow(item.id)}
//                             className={`flex items-center gap-2 text-sm ${
//                               canAddMore
//                                 ? "text-green-600"
//                                 : "text-gray-400 cursor-not-allowed"
//                             }`}
//                           >
//                             <PlusCircle size={16} />
//                             Add Another Damage Entry
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* REMARKS */}

//               <div>
//                 <p className="text-sm font-semibold mb-2">Remarks</p>

//                 <textarea
//                   rows={3}
//                   value={remarks}
//                   onChange={(e) => setRemarks(e.target.value)}
//                   className="w-full border  border-gray-300 rounded-xl p-3 text-sm outline-none focus:border-[#339cff] "
//                   placeholder="Describe the issue..."
//                 />
//               </div>
//             </>
//           )}
//         </div>

//         {/* FOOTER */}

//         <div className="border-t border-gray-400 p-4">
//           <button
//             disabled={!isValid || submitLoading}
//             onClick={handleSubmit}
//             className={`w-full py-3 rounded-xl text-sm font-semibold text-white flex justify-center items-center gap-2 ${
//               isValid ? "bg-gray-900 hover:bg-black" : "bg-gray-300"
//             }`}
//           >
//             {submitLoading && <Loader2 className="animate-spin" size={18} />}
//             Submit Return Request
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useEffect, useMemo, useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  CheckSquare,
  Square,
  Package,
  Loader2,
  PlusCircle,
} from "lucide-react";

import { useAck } from "../context/ack/useAck";
import { useProduct } from "../context/product/useProduct";
import type { InvoiceGroup, SaveAckPayload } from "../types";
import { toast } from "react-toastify";

interface Props {
  invoice: InvoiceGroup;
  onClose: () => void;
}

/* ROW */
interface Row {
  faultId: number;
  qty: number;
}

/* ITEM STATE */
interface ItemState {
  rows: Row[];
  remarks: string;
}

export default function ReturnRequestModal({ invoice, onClose }: Props) {
  const { faultTypes, saveAck, fetchAckList, startDate, endDate } = useAck();
  const { products, fetchProducts } = useProduct();

  const [selectedItems, setSelectedItems] = useState<Record<string, ItemState>>(
    {},
  );
  // const [loading, setLoading] = useState(false);

  // ✅ separate loading states
  const [loadingData, setLoadingData] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* FETCH PRODUCTS */
  useEffect(() => {
    if (!products.length) {
      const today = new Date().toISOString().split("T")[0];
      fetchProducts(today);
    }
  }, []);

  /* PRODUCT MAP (SAFE) */

  // const productMap = useMemo(() => {
  //   const map: Record<number, string> = {};
  //   products.forEach((p: any) => {
  //     if (p?.prod_code) map[p.prod_code] = p.imagepath || "";
  //   });
  //   return map;
  // }, [products]);

  const productMap = useMemo(() => {
    const map: Record<number, string> = {};

    products.forEach((p: any) => {
      if (p?.prod_code && p?.imagepath) {
        // ✅ FIX: clean URL
        const cleanUrl = p.imagepath
          .replace(/\\/g, "")
          .replace(/\/+/g, "/")
          .replace("https:/", "https://");

        map[p.prod_code] = cleanUrl;
      }
    });

    return map;
  }, [products]);

  /* ITEMS + ACK PARSE */
  // const items = useMemo(() => {
  //   return invoice.items.map((i: any) => ({
  //     id: String(i.invdet_gid),
  //     name: i.prod_name,
  //     qty: Number(i.qty),
  //     basic_amt: Number(i.basic_amt),
  //     image: productMap[i.prod_code] || "",
  //     inv_gid: invoice.inv_gid,
  //     invdet_gid: i.invdet_gid,
  //     acknowledgements: i.acknowledgements || [],
  //   }));
  // }, [invoice, productMap]);

  const items = useMemo(() => {
    return invoice.items.map((i: any) => {
      const fallback = `https://nanmastagingapi.milma.in/products/2005/${i.prod_code}.png`;

      return {
        id: String(i.invdet_gid),
        name: i.prod_name,
        qty: Number(i.qty),
        basic_amt: Number(i.basic_amt),

        // ✅ MAIN FIX HERE
        image: productMap[i.prod_code] || fallback,

        inv_gid: invoice.inv_gid,
        invdet_gid: i.invdet_gid,
        acknowledgements: i.acknowledgements || [],
      };
    });
  }, [invoice, productMap]);

  const totalQty = items.reduce((a, b) => a + b.qty, 0);
  /* 🔥 FIX: TOTAL AMOUNT CORRECT */
  const totalAmount = items.reduce(
    (sum, item) => sum + (Number(item.basic_amt) || 0),
    0,
  );

  /* 🔥 FIX: used qty helper */
  const getUsedQty = (id: string) =>
    selectedItems[id]?.rows.reduce((sum, r) => sum + r.qty, 0) || 0;

  /* VIEW MODE (ACK EXISTS) */
  const isViewMode = useMemo(() => {
    return items.some((i) => i.acknowledgements?.length > 0);
  }, [items]);

  /* SELECT ITEM */

  const handleSelect = (id: string) => {
    if (isViewMode) return;

    setSelectedItems((prev) => {
      const copy = { ...prev };

      if (copy[id]) delete copy[id];
      else {
        copy[id] = {
          rows: [{ faultId: faultTypes?.[0]?.id ?? 1, qty: 1 }],
          remarks: "",
        };
      }

      return copy;
    });
  };

  /* ADD ROW */

  const addRow = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const used = getUsedQty(id);

    // ❌ if already fully used
    if (used >= item.qty) return;

    setSelectedItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        rows: [
          ...prev[id].rows,
          {
            faultId: faultTypes?.[0]?.id ?? 1,
            qty: 1,
          },
        ],
      },
    }));
  };

  /* CHANGE QTY */

  const changeQty = (id: string, index: number, delta: number) => {
    setSelectedItems((prev) => {
      const item = items.find((i) => i.id === id);
      if (!item) return prev;

      const rows = prev[id].rows.map((r) => ({ ...r }));

      const currentTotal = rows.reduce((sum, r) => sum + r.qty, 0);
      const currentQty = rows[index].qty;

      let newQty = currentQty + delta;

      // ❌ prevent less than 1
      if (newQty < 1) return prev;

      // ❌ prevent total overflow
      const newTotal = currentTotal - currentQty + newQty;
      if (newTotal > item.qty) return prev;

      rows[index].qty = newQty;

      return {
        ...prev,
        [id]: { ...prev[id], rows },
      };
    });
  };

  /* DELETE ROW (FIRST PROTECTED) */

  const deleteRow = (id: string, index: number) => {
    if (index === 0) return;

    setSelectedItems((prev) => {
      const rows = [...prev[id].rows];
      rows.splice(index, 1);
      return { ...prev, [id]: { ...prev[id], rows } };
    });
  };

  /* CHANGE FAULT */

  const changeFault = (id: string, index: number, faultId: number) => {
    setSelectedItems((prev) => {
      const rows = [...prev[id].rows];
      rows[index].faultId = faultId;
      return { ...prev, [id]: { ...prev[id], rows } };
    });
  };

  /* REMARKS */

  const changeRemarks = (id: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], remarks: value },
    }));
  };

  /* SUBMIT */

  // const handleSubmit = async () => {
  //   try {
  //     // setLoading(true);
  //      setSubmitting(true);

  //     const payload: SaveAckPayload = {
  //       items: Object.entries(selectedItems).map(([id, data]) => {
  //         const item = items.find((i) => i.id === id)!;

  //         return {
  //           inv_gid: item.inv_gid,
  //           invdet_gid: item.invdet_gid,
  //           remarks: data.remarks,
  //           faults: faultTypes.map((f: any) => ({
  //             fault_id: f.id,
  //             fault_name: f.name,
  //             qty: data.rows.find((r) => r.faultId === f.id)?.qty ?? 0,
  //           })),
  //         };
  //       }),
  //     };

  //     await saveAck(payload);
  //     onClose();
  //   } finally {
  //     // setLoading(false);
  //      setSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const payload: SaveAckPayload = {
        items: Object.entries(selectedItems).map(([id, data]) => {
          const item = items.find((i) => i.id === id)!;

          return {
            inv_gid: item.inv_gid,
            invdet_gid: item.invdet_gid,
            remarks: data.remarks,
            faults: faultTypes.map((f: any) => ({
              fault_id: f.id,
              fault_name: f.name,
              qty: data.rows.find((r) => r.faultId === f.id)?.qty ?? 0,
            })),
          };
        }),
      };

      const res = await saveAck(payload);

      /* ✅ SUCCESS */

      if (res.status === "success" && res.saved > 0) {
        toast.success(res.msg || "Saved successfully");

        // ✅ REFRESH LIST WITH SAME DATE
        await fetchAckList(startDate, endDate);

        onClose();
        return;
      }

      /* ⚠️ VALIDATION ERRORS */
      if (res.errors?.length) {
        // Option 1: multiple toast
        res.errors.forEach((err) => toast.error(err));

        // Option 2 (clean): single toast
        // toast.error(res.errors.join("\n"));

        return;
      }

      /* ❌ FALLBACK */
      toast.error(res.msg || "Failed to save");
    } catch (error) {
      toast.error("Server error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* VALIDATION */

  const isValid =
    Object.keys(selectedItems).length > 0 &&
    Object.values(selectedItems).every((i) => i.remarks.trim().length > 0);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       setLoading(true);

  //       const today = new Date().toISOString().split("T")[0];

  //       // ✅ call products API
  //       await fetchProducts(today);

  //       // (optional) if separate ack API per invoice
  //       // await fetchAckDetails(invoice.inv_gid);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, [invoice.inv_gid]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingData(true);
        const today = new Date().toISOString().split("T")[0];
        await fetchProducts(today);
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [invoice.inv_gid]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      {/* <div className="bg-white w-full max-w-2xl h-[92vh] rounded-2xl shadow-xl flex flex-col overflow-hidden"> */}
      <div className="relative bg-white w-full max-w-2xl h-[92vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* ✅ LOADER OVERLAY */}
        {loadingData && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 ">
            <div className="h-10 w-10 border-2 border-[#8e2d26] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {/* HEADER */}
        <div className="border-b px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <Package size={18} />
            {/* Return Request */}
            {isViewMode ? "View Acknowledgement" : "Return Request"}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 bg-gray-50 thin-scroll">
          {/* SUMMARY */}
          <div className="rounded-xl border border-gray-400 bg-white p-4 shadow-sm">
            <p className="font-semibold text-gray-800 mb-2">
              Invoice #{invoice.inv_no}
            </p>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Qty: {totalQty}</span>
              <span className="font-semibold text-[#0195db]">
                Total : ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              Vehicle: {invoice.vehicle_full}
            </p>
          </div>

          {/* TITLE */}
          <p className="text-sm font-semibold text-gray-700">
            {isViewMode ? "Reported Issues" : "Select Damaged Items"}
          </p>

          {/* ITEMS */}
          <div className="space-y-4">
            {items.map((item) => {
              const active = !!selectedItems[item.id];
              const rows = selectedItems[item.id]?.rows || [];
              const usedQty = getUsedQty(item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition ${
                    active
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {/* ITEM HEADER */}
                  <div
                    // onClick={() => handleSelect(item.id)}
                    // className="flex items-center gap-3 cursor-pointer"
                    onClick={() => !isViewMode && handleSelect(item.id)}
                    className={`flex items-center gap-3 ${
                      isViewMode ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      className="w-12 h-12 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Invoice Qty: {item.qty}
                      </p>
                    </div>

                    {/* {!isViewMode && active ? (
                      <CheckSquare className="text-red-500" size={18} />
                    ) : (
                      <Square className="text-gray-400" size={18} />
                    )} */}
                    {!isViewMode &&
                      (active ? (
                        <CheckSquare className="text-red-500" size={18} />
                      ) : (
                        <Square className="text-gray-400" size={18} />
                      ))}
                  </div>

                  {/* VIEW MODE */}

                  {isViewMode && (
                    <div className="mt-3">
                      {item.acknowledgements.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">
                          No issues reported
                        </p>
                      ) : (
                        item.acknowledgements.map((ack: any, i: number) => (
                          <div key={i} className="bg-gray-100 p-2 rounded mb-2">
                            {ack.faults.map((f: any) => (
                              <div
                                key={f.fault_id}
                                className="flex justify-between text-sm"
                              >
                                <span
                                  className={
                                    f.fault_name === "Good"
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }
                                >
                                  {f.fault_name}
                                </span>
                                <span>Qty: {f.qty}</span>
                              </div>
                            ))}
                            <p className="text-xs text-gray-500 mt-1">
                              Remark: {ack.remarks}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* ACTIVE CONTENT */}
                  {!isViewMode && active && (
                    <div className="mt-4 space-y-3">
                      {rows.map((row, i) => {
                        const totalUsed = getUsedQty(item.id);
                        const remaining = item.qty - totalUsed + row.qty;

                        return (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2"
                          >
                            {/* DROPDOWN */}
                            <select
                              value={row.faultId}
                              onChange={(e) =>
                                changeFault(item.id, i, Number(e.target.value))
                              }
                              className="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#339cff]"
                            >
                              {faultTypes.map((f: any) => (
                                <option key={f.id} value={f.id}>
                                  {f.name}
                                </option>
                              ))}
                            </select>

                            {/* QTY CONTROL */}
                            <div className="flex items-center border border-gray-400 rounded-lg ">
                              <button
                                disabled={row.qty === 1}
                                onClick={() => changeQty(item.id, i, -1)}
                                className={`px-2 py-1 ${
                                  row.qty === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                <Minus size={14} />
                              </button>

                              <span className="px-3 text-sm">{row.qty}</span>

                              <button
                                disabled={row.qty >= remaining}
                                onClick={() => changeQty(item.id, i, 1)}
                                className={`px-2 py-1 ${
                                  row.qty >= remaining
                                    ? "opacity-40 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* DELETE */}
                            <button
                              disabled={i === 0}
                              onClick={() => deleteRow(item.id, i)}
                              className={`${
                                i === 0
                                  ? "text-gray-300 cursor-not-allowed disabled:opacity-30"
                                  : "text-red-500 hover:text-red-600"
                              }`}
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        );
                      })}

                      {/* ADD */}

                      <button
                        disabled={usedQty >= item.qty}
                        onClick={() => addRow(item.id)}
                        className="text-green-600 text-xs flex items-center gap-1 font-medium disabled:opacity-40"
                      >
                        <PlusCircle size={14} />
                        Add Another Damage Entry
                      </button>

                      {/* REMARKS PER ITEM */}
                      <textarea
                        placeholder={`Remarks for ${item.name}`}
                        value={selectedItems[item.id]?.remarks || ""}
                        onChange={(e) => changeRemarks(item.id, e.target.value)}
                        className="w-full border  border-gray-400 rounded-xl p-3 text-sm outline-none focus:border-[#339cff] "
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}

        {!isViewMode && (
          <div className="border-t p-4 bg-white">
            <button
              // disabled={!isValid || loading}
              disabled={!isValid || submitting}
              onClick={handleSubmit}
              // className={`w-full py-3 rounded-xl text-white font-medium transition ${
              //   isValid
              //     ? "bg-black hover:bg-gray-900"
              //     : "bg-gray-300 cursor-not-allowed"
              // }`}

              className={`w-full py-3 rounded-xl text-sm font-semibold text-white flex justify-center items-center gap-2 ${
                isValid ? "bg-gray-900 hover:bg-black" : "bg-gray-300"
              }`}
            >
              {/* {loading ? "Submitting..." : "Submit Return Request"} */}
              {submitting && <Loader2 className="animate-spin" size={18} />}
              {/* {submitting ? "Submitting..." : "Submit Return Request"} */}
              Submit Return Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

