// // import { useState } from "react";
// // import { AckContext } from "../../context/ack/AckContext";
// // import { ackListApi, saveAckApi } from "../../api/ack.api";
// // import type { AckItem, FaultType, SaveAckPayload } from "../../types";

// // export const AckProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [ackList, setAckList] = useState<AckItem[]>([]);
// //   const [faultTypes, setFaultTypes] = useState<FaultType[]>([]);

// //   const fetchAckList = async (start: string, end: string) => {
// //     const { data } = await ackListApi({
// //       p_sdate: start,
// //       p_edate: end,
// //     });
// //     setAckList(data[0] ?? []);
// //     setFaultTypes(data[1] ?? []);
// //   };

// //   const saveAck = async (payload: SaveAckPayload) => {
// //     await saveAckApi(payload);
// //   };

// //   return (
// //     <AckContext.Provider value={{ ackList, faultTypes, fetchAckList, saveAck }}>
// //       {children}
// //     </AckContext.Provider>
// //   );
// // };






// import { useState } from "react";
// import { AckContext } from "../../context/ack/AckContext";
// import { ackListApi, saveAckApi } from "../../api/ack.api";
// import type {
//   AckItem,
//   FaultType,
//   SaveAckPayload,
// } from "../../types";

// export const AckProvider = ({ children }: { children: React.ReactNode }) => {
//   const [ackList, setAckList] = useState<AckItem[]>([]);
//   const [faultTypes, setFaultTypes] = useState<FaultType[]>([]);

//   // const fetchAckList = async (start: string, end: string) => {
//   //   try {
//   //     const { data } = await ackListApi({
//   //       p_sdate: start,
//   //       p_edate: end,
//   //     });

//   //     setAckList(data[0] ?? []);
//   //     setFaultTypes(data[1] ?? []);
//   //   } catch (err) {
//   //     console.error("ACK LIST ERROR", err);
//   //   }
//   // };


//   const fetchAckList = async (start: string, end: string) => {
//   try {
//     const { data } = await ackListApi({
//       p_sdate: start,
//       p_edate: end,
//     });

//     const invoices = data?.[0] ?? [];
//     const faults = data?.[1] ?? [];

//     const parsedList = invoices.map((inv: any) => {
//       const details = JSON.parse(inv.invoice_details || "[]");

//       return details.map((item: any) => ({
//         inv_gid: inv.inv_gid,
//         inv_no: inv.inv_no,
//         inv_date: inv.inv_date,
//         veh_no: inv.veh_no,
//         veh_name: inv.veh_name,
//         vehicle_full: inv.vehicle_full,

//         invdet_gid: item.invdet_gid,
//         prod_name: item.prod_name,
//         qty: item.qty,
//         basic_amt: item.basic_amt,
//       }));
//     }).flat();

//     setAckList(parsedList);
//     setFaultTypes(faults);

//   } catch (err) {
//     console.error("ACK LIST ERROR", err);
//   }
// };

//   const saveAck = async (payload: SaveAckPayload) => {
//     try {
//       await saveAckApi(payload);
//     } catch (err) {
//       console.error("SAVE ACK ERROR", err);
//     }
//   };

//   return (
//     <AckContext.Provider
//       value={{
//         ackList,
//         faultTypes,
//         fetchAckList,
//         saveAck,
//       }}
//     >
//       {children}
//     </AckContext.Provider>
//   );
// };






import { useState } from "react";
import { AckContext } from "../../context/ack/AckContext";
import { ackListApi, saveAckApi } from "../../api/ack.api";
import type {
  FaultType,
  InvoiceGroup,
  SaveAckPayload,
} from "../../types";

export const AckProvider = ({ children }: { children: React.ReactNode }) => {
  const [ackList, setAckList] = useState<InvoiceGroup[]>([]);
  const [faultTypes, setFaultTypes] = useState<FaultType[]>([]);

  /* FETCH LIST */
  const fetchAckList = async (start: string, end: string) => {
    try {
      const data = await ackListApi({
        p_sdate: start,
        p_edate: end,
      });

      const invoices = data?.[0] ?? [];
      const faults = data?.[1] ?? [];

      const grouped: InvoiceGroup[] = invoices.map((inv: any) => {
        let details: any[] = [];

        try {
          details = JSON.parse(inv.invoice_details || "[]");
        } catch {
          details = [];
        }

        return {
          inv_gid: Number(inv.inv_gid),
          inv_no: Number(inv.inv_no),
          inv_date: inv.inv_date,
          vehicle_full: inv.vehicle_full,

          items: details.map((item: any) => ({
            invdet_gid: Number(item.invdet_gid),
            prod_name: item.prod_name,
            qty: Number(item.qty),
            basic_amt: Number(item.basic_amt),
            prod_code: Number(item.prod_code),
          })),
        };
      });

      setAckList(grouped);
      setFaultTypes(faults);
    } catch (err) {
      console.error("ACK LIST ERROR:", err);
      setAckList([]);
    }
  };

  /* SAVE ACK */
  const saveAck = async (payload: SaveAckPayload) => {
    try {
      const res = await saveAckApi(payload);
      return res;
    } catch (err) {
      console.error("SAVE ACK ERROR:", err);
      throw err;
    }
  };

  return (
    <AckContext.Provider
      value={{
        ackList,
        faultTypes,
        fetchAckList,
        saveAck,
      }}
    >
      {children}
    </AckContext.Provider>
  );
};