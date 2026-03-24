// import type { Order } from "../../types/order";
// import { ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface Props {
//   orders: Order[];
//   loading: boolean;
// }

// const OrdersListnew: React.FC<Props> = ({ orders, loading }) => {
//   const navigate = useNavigate();

//   // if (loading) {
//   //   return (
//   //     <div className="text-center text-gray-500 py-6">Loading orders...</div>
//   //   );
//   // }

//   // if (!loading && orders.length === 0) {
//   //   return (
//   //     <div className="text-center text-gray-500 py-6">No orders found</div>
//   //   );
//   // }


//     if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!loading && orders.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-10">
//         No orders found
//       </div>
//     );
//   }
//   const sortedOrders = [...orders].sort((a, b) => b.gid - a.gid);

//   return (
//     <div
//       // className="space-y-4 "
//       className="
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         lg:grid-cols-3
//         xl:grid-cols-4
//         gap-4
//       "
//     >
//       {sortedOrders.map((order) => (
//         <div
//           key={order.gid}
//           onClick={() => navigate(`/order-details/${order.gid}`)}
//           className="bg-white rounded-2xl shadow-sm border border-gray-200
//                      p-4 flex justify-between items-center
//                      hover:shadow-md transition"
//         >
//           {/* Left Section */}
//           <div>
//             <p className="text-sm text-gray-500">
//               Order ID:{" "}
//               <span className="font-semibold text-gray-800">{order.gid}</span>
//             </p>

//             <p className="text-sm text-gray-500 mt-1">Date: {order.ind_date}</p>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-2">
//             <p className="text-lg font-semibold text-emerald-600">
//               ₹{Number(order.ordertotal).toFixed(2)}
//             </p>

//             <ChevronRight size={25} className="text-gray-400" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersListnew;





// import type { Order } from "../../types/order";
// import { ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface Props {
//   orders: Order[];
//   loading: boolean;
//     handleOpenReturn?: (order: Order) => void;
// }

// const OrdersListnew: React.FC<Props> = ({ orders, loading,handleOpenReturn }) => {
//   const navigate = useNavigate();

//   // if (loading) {
//   //   return (
//   //     <div className="text-center text-gray-500 py-6">Loading orders...</div>
//   //   );
//   // }

//   // if (!loading && orders.length === 0) {
//   //   return (
//   //     <div className="text-center text-gray-500 py-6">No orders found</div>
//   //   );
//   // }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!loading && orders.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-10">No orders found</div>
//     );
//   }

//   const sortedOrders = [...orders].sort((a, b) => b.gid - a.gid);

//   return (
//     <div
//       // className="space-y-4 "
//       className="
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         lg:grid-cols-3
//         xl:grid-cols-4
//         gap-4
//       "
//     >
//       {sortedOrders.map((order) => (
//         <div
//           key={order.gid}
//           // onClick={() => navigate(`/order-details/${order.gid}`)}
//              onClick={() =>
//             handleOpenReturn
//               ? handleOpenReturn(order)
//               : navigate(`/order-details/${order.gid}`)
//           }
//           className="bg-white rounded-2xl shadow-sm border border-gray-200
//                      p-4 flex justify-between items-center
//                      hover:shadow-md transition"
//         >
//           {/* Left Section */}
//           <div>
//             <p className="text-sm text-gray-500">
//               Order ID:{" "}
//               <span className="font-semibold text-gray-800">{order.gid}</span>
//             </p>

//             <p className="text-sm text-gray-500 mt-1">Date: {order.ind_date}</p>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-2">
//             <p className="text-lg font-semibold text-emerald-600">
//               ₹{Number(order.ordertotal).toFixed(2)}
//             </p>

//             <ChevronRight size={25} className="text-gray-400" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersListnew;





import type { Order } from "../../types/order";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  orders: Order[];
  loading: boolean;
  // handleOpenReturn?: (order: Order) => void;
  // startDate: string;
  // endDate: string;
}

const OrdersListnew: React.FC<Props> = ({
  orders,
  loading,
  //  handleOpenReturn,
  // startDate,
  // endDate,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No orders found</div>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => b.gid - a.gid);

  return (
    <div
      // className="space-y-4 "
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
      "
    >
      {sortedOrders.map((order) => (
        <div
          key={order.gid}
          onClick={() =>
            navigate(
              `/order-details/${order.gid}`,
              //   , {
              //   state: { startDate, endDate },
              // }
            )
          }
          //    onClick={() =>
          //   handleOpenReturn
          //     ? handleOpenReturn(order)
          //     : navigate(`/order-details/${order.gid}`)
          // }
          className="bg-white rounded-2xl shadow-sm border border-gray-200
                     p-4 flex justify-between items-center
                     hover:shadow-md transition"
        >
          {/* Left Section */}
          <div>
            <p className="text-sm text-gray-500">
              Order ID:{" "}
              <span className="font-semibold text-gray-800">{order.gid}</span>
            </p>

            <p className="text-sm text-gray-500 mt-1">Date: {order.ind_date}</p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-emerald-600">
              ₹{Number(order.ordertotal).toFixed(2)}
            </p>

            <ChevronRight size={25} className="text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersListnew;
