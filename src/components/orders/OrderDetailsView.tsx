import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useOrder } from "../../context/order/useOrder";
import { Sun, Moon } from "lucide-react";
import { getSettingsApi } from "../../api/settings.api";
import { useNavigate } from "react-router-dom";
import CancelEntireOrderModal from "./CancelEntireOrderModal";
import ProductModal from "../../components/ProductModal";
import { updateOrderDetailApi } from "../../api/order.api";
import { toast } from "react-toastify";
import type { OrderDetail } from "../../types/order";
import OrderRemarks from "./OrderRemarks";
import CancelOrderdetailModal from "./CancelorderdetailModal";
import AddProductListModal from "./AddProductListModal";
import { addProductToOrderApi } from "../../api/order.api";
import { useProduct } from "../../context/product/useProduct";
import { XCircle, Pencil, Trash2, PlusCircle, ArrowLeft } from "lucide-react";

const OrderDetailsView = () => {
  const { gid } = useParams();
  const { orderDetails, fetchOrderDetails } = useOrder();

  const { products, fetchProducts } = useProduct();

  /* fetch products once order loads */
  useEffect(() => {
    if (orderDetails.length > 0) {
      fetchProducts(orderDetails[0].supply_date);
    }
  }, [orderDetails]);

  /* fast lookup map */
  const productMap = useMemo(() => {
    const map: Record<number, string | undefined> = {};
    products.forEach((p) => (map[p.prod_code] = p.imagepath));
    return map;
  }, [products]);

  const [shiftcodetext, setShiftcodetext] = useState<Record<string, string>>(
    {},
  );

  const [selectedItem, setSelectedItem] = useState<OrderDetail | null>(null);
  const [cancelItem, setCancelItem] = useState<OrderDetail | null>(null);
  const [openAddList, setOpenAddList] = useState(false);
  // const [newProduct, setNewProduct] = useState<any | null>(null);
  const [selectedNewProduct, setSelectedNewProduct] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (gid) fetchOrderDetails(Number(gid));

  //     const loadSettings = async () => {
  //       const data = await getSettingsApi();
  //       setShiftcodetext(data.shiftcodetext);
  //     };

  //     loadSettings();
  //   }, [gid]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (gid) {
        await fetchOrderDetails(Number(gid));
      }

      const data = await getSettingsApi();
      setShiftcodetext(data.shiftcodetext);

      setLoading(false);
    };

    loadData();
  }, [gid]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-10 w-10 border-4 border-[#8e2d26] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Orders details...</p>
      </div>
    );
  }
  const hasItems = orderDetails.length > 0;

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Order Details #{gid}
        </h2>
        {hasItems && (
          <OrderRemarks
            gid={Number(gid)}
            initialRemarks={orderDetails[0]?.remarks}
          />
        )}
        {/* Items */}
        {/* {orderDetails.map((item) => ( */}
        {/* {orderDetails.map((item) => {
          const image = productMap[item.prod_code]; */}

        {!hasItems ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <XCircle size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-lg">
              No order details available
            </p>
          </div>
        ) : (
          orderDetails.map((item) => {
            const image = productMap[item.prod_code];

            return (
              <div
                key={item.inddet_gid}
                className="bg-white rounded-2xl border border-gray-200
                       shadow-sm p-5 space-y-4"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                  <img
                    src={image || "https://via.placeholder.com/100"}
                    alt={item.prod_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Product Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.prod_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.ind_qty} nos
                    </p>
                    <p className="text-sm text-gray-500">
                      Rate: ₹{Number(item.rate).toFixed(2)}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-semibold text-emerald-600">
                      ₹{Number(item.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Shift Card */}
                <div
                  className="bg-orange-50 border border-orange-200
             rounded-xl p-4 flex flex-col sm:flex-row
             sm:justify-between sm:items-center gap-4"
                >
                  {/* Supply Date */}
                  <div>
                    <p className="font-medium text-orange-600">Supply Date</p>
                    <p className="text-sm text-gray-600">{item.supply_date}</p>
                  </div>

                  {/* Shift with Icon */}

                  <div className="flex items-center gap-3">
                    {item.supply_shift === 1 ? (
                      <Sun className="text-yellow-500" size={20} />
                    ) : (
                      <Moon className="text-indigo-500" size={20} />
                    )}

                    <div>
                      <p className="text-sm font-semibold">
                        {item.supply_shift === 1
                          ? "Morning Shift"
                          : "Evening Shift"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {shiftcodetext[item.supply_shift.toString()]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Cancel Item */}
                  <button
                    onClick={() => setCancelItem(item)}
                    className="flex-1 flex items-center justify-center gap-2
               border border-red-500 text-red-600
               rounded-xl py-2.5 font-semibold text-sm
               hover:bg-red-50 active:scale-[0.98]
               transition-all duration-200"
                  >
                    <XCircle size={18} />
                    Cancel
                  </button>

                  {/* Update Item */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 flex items-center justify-center gap-2
               bg-emerald-600 text-white
               rounded-xl py-2.5 font-semibold text-sm
               hover:bg-emerald-700 active:scale-[0.98]
               transition-all duration-200 shadow-sm"
                  >
                    <Pencil size={18} />
                    Update
                  </button>
                </div>
              </div>
              //   );
              // })}
              /* ))} */
            );
          })
        )}

        {/* Bottom Action Buttons */}
        {hasItems && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* Cancel Entire Order */}
            <button
              onClick={() => setOpenModal(true)}
              className="flex-1 flex items-center justify-center gap-2
               bg-red-600 text-white
               py-3 rounded-xl font-semibold text-sm
               hover:bg-red-700 active:scale-[0.98]
               transition-all duration-200 shadow-md"
            >
              <Trash2 size={18} />
              Cancel Entire Order
            </button>

            {/* Add Product */}
            <button
              onClick={() => setOpenAddList(true)}
              className="flex-1 flex items-center justify-center gap-2
               bg-blue-600 text-white
               py-3 rounded-xl font-semibold text-sm
               hover:bg-blue-700 active:scale-[0.98]
               transition-all duration-200 shadow-md"
            >
              <PlusCircle size={18} />
              Add Product
            </button>
          </div>
        )}

        {/* Back */}
         <button
          onClick={() => navigate("/orders")}
          className="w-full mt-4 flex items-center justify-center gap-2
             bg-white border border-gray-200 text-gray-700
             py-3 rounded-xl font-semibold text-sm
             hover:bg-gray-50 active:scale-[0.98]
             transition-all duration-200"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>
      </div>

      <CancelEntireOrderModal
        open={openModal}
        indentgid={Number(gid)}
        onClose={() => setOpenModal(false)}
        onSuccess={() => navigate("/orders")} // redirect after cancel
      />
      {cancelItem && (
        <CancelOrderdetailModal
          open={true}
          indentdetailgid={cancelItem.inddet_gid}
          onClose={() => setCancelItem(null)}
          onSuccess={async () => {
            await fetchOrderDetails(Number(gid));
            setCancelItem(null);
          }}
        />
      )}

      {selectedItem && (
        <ProductModal
          product={{
            prod_code: selectedItem.prod_code,
            prod_name: selectedItem.prod_name,
            // final_rate: Number(selectedItem.rate),
            final_rate: Number(selectedItem.final_rate),

            // imagepath: "",
            // mrp: "",
          }}
          supplyDate={selectedItem.supply_date}
          initialQty={Number(selectedItem.ind_qty)}
          initialShift={selectedItem.supply_shift}
          isEdit
          onClose={() => setSelectedItem(null)}
          onConfirm={async (qty, shift, date) => {
            try {
              const response = await updateOrderDetailApi({
                indentdetailgid: selectedItem.inddet_gid,
                quantity: qty,
                supplydate: date,
                supplyshift: shift,
              });

              const data = response.data; // ✅ extract data

              /* ❌ BUSINESS ERROR */
              if (!data.success) {
                toast.error(data.error || "Unable to update order item");
                return;
              }

              
              /* ✅ SUCCESS → show backend message */
              toast.success(String(data.success));

              await fetchOrderDetails(Number(gid));
              setSelectedItem(null);
            } catch (error: any) {
               toast.error(
                error?.response?.data?.error ||
                  error?.response?.data?.message ||
                  "Unable to update order item ❌",
              );
            }
          }}
        />
      )}

      {openAddList && (
        <AddProductListModal
          supplyDate={orderDetails[0]?.supply_date}
          onClose={() => setOpenAddList(false)}
          onSelect={(product) => {
            setOpenAddList(false);
            setSelectedNewProduct(product); // open ProductModal next
          }}
        />
      )}
      {selectedNewProduct && (
        <ProductModal
          product={selectedNewProduct}
          supplyDate={orderDetails[0]?.supply_date}
          onClose={() => setSelectedNewProduct(null)}
          onConfirm={async (qty, shift, date) => {
            try {
              // 🔒 SAFETY CHECK HERE
              if (!selectedNewProduct?.prod_gid) {
                toast.error("Invalid product. Please try again.");
                return;
              }

              await addProductToOrderApi({
                indentgid: Number(gid),
                productgid: selectedNewProduct.prod_gid,
                quantity: qty,
                supplydate: date,
                supplyshift: shift,
              });

              toast.success("Product added successfully");

              await fetchOrderDetails(Number(gid));
              setSelectedNewProduct(null);
            } catch (error: any) {
              toast.error(error?.response?.data?.message || "Add failed");
            }
          }}
        />
      )}
    </div>
  );
};

export default OrderDetailsView;
