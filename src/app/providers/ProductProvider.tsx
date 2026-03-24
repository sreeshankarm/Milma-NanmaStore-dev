// // import { createContext, useContext, useState } from "react";
// import { useState } from "react";

// import { getProductsApi } from "../../api/product.api";
// import { ProductContext } from "../../context/product/ProductContext";
// import type { Product ,ProductSubGroup } from "../../types/product";

// // interface ProductContextType {
// //   products: Product[];
// //   loading: boolean;
// //   fetchProducts: (date: string) => Promise<void>;
// // }

// // export const ProductContext = createContext<ProductContextType | null>(null);

// export const ProductProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//     const [productSubGroups, setProductSubGroups] = useState<ProductSubGroup[]>([]);


//   // const fetchProducts = async (date: string) => {
//   //   setLoading(true);
//   //   const { data } = await getProductsApi(date);
//   //   setProducts(data.proddefaultratetypedata);
//   //   setLoading(false);
//   // };


//    const fetchProducts = async (date: string) => {
//     try {
//       setLoading(true);

//       const { data } = await getProductsApi(date);

//       // If API returns empty or undefined
//       setProducts(data?.proddefaultratetypedata ?? []);
//       setProductSubGroups(data?.productsubgroups ?? []);
//     } catch (error) {
//       console.error("Product API failed:", error);

//       // 🔥 IMPORTANT: set empty array on failure
//       setProducts([]);
//        setProductSubGroups([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ProductContext.Provider value={{ products, loading, fetchProducts, productSubGroups, }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// /* ✅ EXPORT HOOK FROM SAME FILE */
// // export const useProduct = () => {
// //   const ctx = useContext(ProductContext);
// //   if (!ctx) {
// //     throw new Error("useProduct must be used inside ProductProvider");
// //   }
// //   return ctx;
// // };




// import { createContext, useContext, useState } from "react";
import { useState } from "react";

import { getProductsApi } from "../../api/product.api";
import { ProductContext } from "../../context/product/ProductContext";
import type { Product, ProductSubGroup } from "../../types/product";

// interface ProductContextType {
//   products: Product[];
//   loading: boolean;
//   fetchProducts: (date: string) => Promise<void>;
// }

// export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [productSubGroups, setProductSubGroups] = useState<ProductSubGroup[]>(
    [],
  );

  const fetchProducts = async (date: string) => {
    try {
      setLoading(true);

      const { data } = await getProductsApi(date);

      // If API returns empty or undefined
      setProducts(data?.proddefaultratetypedata ?? []);
      setProductSubGroups(data?.productsubgroups ?? []);
    } catch (error) {
      console.error("Product API failed:", error);

      // 🔥 IMPORTANT: set empty array on failure
      setProducts([]);
      setProductSubGroups([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, fetchProducts, productSubGroups }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/* ✅ EXPORT HOOK FROM SAME FILE */
// export const useProduct = () => {
//   const ctx = useContext(ProductContext);
//   if (!ctx) {
//     throw new Error("useProduct must be used inside ProductProvider");
//   }
//   return ctx;
// };
