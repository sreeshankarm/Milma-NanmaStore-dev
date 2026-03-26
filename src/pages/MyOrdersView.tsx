// import { useState, useEffect } from "react";
// import { useStore } from "../context/store/store";
// import HeaderCard from "../components/orders/HeaderCard";
// import StatsCards from "../components/orders/StatsCards";
// import OrderFilters from "../components/orders/OrderFilters";
// import OrderList from "../components/orders/OrderList";
// import type { Order } from "../typesss/typesss"; // type-only import
// import { OrderStatus } from "../typesss/typesss"; // value import
// import { useNavigate } from "react-router-dom";

// const MyOrdersView: React.FC = () => {
//   const {
//     orders,
//     setActiveView,
//     modifyOrder,
//     setSelectedOrderIdForReturn,
//     returnIntentMessage,
//     setReturnIntentMessage,
//   } = useStore();

//   const navigate = useNavigate();

//   const [tab, setTab] = useState<"UPCOMING" | "PAST">("UPCOMING");
//   const [dateFilter, setDateFilter] = useState("");
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

//   // -------------------------------
//   // FILTER ORDERS
//   // -------------------------------

//   const filtered = orders.filter((o: Order) => {
//     const isPast = o.status === OrderStatus.COMPLETED;

//     if (tab === "UPCOMING" && isPast) return false;
//     if (tab === "PAST" && !isPast) return false;

//     if (tab === "PAST" && dateFilter) {
//       const d = new Date(o.createdAt).toISOString().split("T")[0];
//       if (d !== dateFilter) return false;
//     }

//     return true;
//   });

//   useEffect(() => {
//     if (filtered.length && !expandedOrderId) {
//       setExpandedOrderId(filtered[0].id);
//     }
//   }, [filtered]);

//   const upcomingCount = orders.filter(
//     (o: Order) => o.status === OrderStatus.UPCOMING
//   ).length;
//   const pastCount = orders.filter(
//     (o: Order) => o.status !== OrderStatus.UPCOMING
//   ).length;

//   return (
//     <div className="p-4 pb-24 h-full flex flex-col space-y-3">
//       <HeaderCard
//         returnIntentMessage={returnIntentMessage}
//         clearReturn={() => setReturnIntentMessage(null)}
//         openReturns={() => navigate("/damagesReturn")}
//       />

//       <StatsCards orders={orders} />

//       <OrderFilters
//         tab={tab}
//         setTab={setTab}
//         dateFilter={dateFilter}
//         setDateFilter={setDateFilter}
//         creditAlerts={
//           orders.filter((o: Order) =>
//             o.remarks?.some((r: string) => r.toLowerCase().includes("credit"))
//           ).length
//         }
//         upcomingCount={upcomingCount}
//         pastCount={pastCount}
//       />

//       <OrderList
//         orders={filtered}
//         expanded={expandedOrderId}
//         setExpanded={setExpandedOrderId}
//         modifyOrder={modifyOrder}
//         setActiveView={setActiveView}
//         setReturnOrder={setSelectedOrderIdForReturn}
//         clearReturnMsg={() => setReturnIntentMessage(null)}
//       />
//     </div>
//   );
// };

// export default MyOrdersView;



import { useEffect, useState } from "react";
import { useOrder } from "../context/order/useOrder";
import DatePicker from "../components/orders/Datepicker";
import OrdersListnew from "../components/orders/OrdersListnew";
import HeaderCard from "../components/orders/HeaderCard";
import {
  useNavigate,
  //  useLocation
} from "react-router-dom";

const MyOrdersView: React.FC = () => {
  const { orders, fetchOrders, startDate, endDate, setDates } = useOrder();
  const navigate = useNavigate();
  // const location = useLocation();

  // const today = new Date().toISOString().split("T")[0];

  // const [startDate, setStartDate] = useState(
  //   location.state?.startDate || today,
  // );

  // const [endDate, setEndDate] = useState(location.state?.endDate || today);

  // const [startDate, setStartDate] = useState(today);
  // const [endDate, setEndDate] = useState(today);
  const [loading, setLoading] = useState(false);
  // const [initialLoading, setInitialLoading] = useState(true);

  // 🔥 Initial full-page load
  // useEffect(() => {
  //   const loadInitial = async () => {
  //     try {
  //       await fetchOrders(today, today);
  //     } finally {
  //       setInitialLoading(false);
  //     }
  //   };

  //   loadInitial();
  // }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      await fetchOrders(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleFetch = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      await fetchOrders(startDate, endDate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(startDate, endDate);
  }, []);

  // useEffect(() => {
  //   fetchOrders(today, today);
  // }, []);

  // ---------------- FULL PAGE INITIAL LOADER ----------------
  // if (initialLoading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center py-20 text-center">
  //       <div className="h-10 w-10 border-4 border-[#8e2d26] border-t-transparent rounded-full animate-spin mb-4" />
  //       <p className="text-gray-500 font-medium">Loading orders...</p>
  //     </div>
  //   );
  // }

  return (
    <div className=" h-full flex flex-col space-y-3">
      <div className="min-h-screen  p-4 sm:p-6">
        <div className="mx-auto space-y-6">
          <HeaderCard openReturns={() => navigate("/damagesReturn")} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 sm:p-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Start Date */}
              <DatePicker
                label="Start Date"
                value={startDate}
                max={endDate}
                // onChange={setStartDate}
                onChange={(val) => setDates(val, endDate)}
              />

              {/* End Date */}
              <DatePicker
                label="End Date"
                value={endDate}
                min={startDate}
                // max={today}
                // onChange={setEndDate}
                onChange={(val) => setDates(startDate, val)}
              />

              {/* Button */}
              <div className="md:col-span-2 mt-2">
                <button
                  onClick={handleFetch}
                  disabled={!startDate || !endDate}
                  className="w-full h-11 sm:h-12 rounded-xl bg-emerald-600 text-white font-semibold text-sm sm:text-base
        hover:bg-emerald-700 disabled:bg-gray-300 
        transition active:scale-[0.98]"
                >
                  {loading ? "Loading..." : "Get Orders"}
                </button>
              </div>
            </div>
          </div>

          {/* Orders List Component */}

          {/* ------------------ LOADING UI ------------------ */}

          <OrdersListnew
            orders={orders}
            loading={loading}
            // startDate={startDate}
            // endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrdersView;
