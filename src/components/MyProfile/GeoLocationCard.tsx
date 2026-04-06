
// import { Compass, Navigation2, MapPin } from "lucide-react";
// import type { UserProfile } from "../../types/profile";

// interface GeoLocationCardProps {
//   profile: UserProfile | null;
//   isLocating: boolean;
//   onUpdate?: () => void;
// }

// const GeoLocationCard: React.FC<GeoLocationCardProps> = ({
//   profile,
//   isLocating,
//   onUpdate,
// }) => {
//   const lat = profile?.latitude;
//   const lng = profile?.longitude;

//   return (
//     <div className="bg-white rounded-2xl border border-gray-300  p-5 space-y-4">
      
//       {/* HEADER */}
//       <div className="flex items-center gap-2 text-gray-800 font-semibold">
//         <Compass size={18} />
//         Delivery geolocation
//       </div>

//       <div className="border-t pt-3 space-y-2">

//         {/* LABEL */}
//         <p className="text-sm text-gray-400">Drop-off coordinates</p>

//         {/* COORDINATES */}
//         <div className="flex items-center gap-2 text-gray-800 font-medium">
//           <MapPin size={16} className="text-blue-500" />
//           {lat && lng ? `${lat}, ${lng}` : "Location not available"}
//         </div>

//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={onUpdate}
//         disabled={isLocating}
//         className="w-full h-12 rounded-full border border-gray-300 
//         flex items-center justify-center gap-2 font-medium text-gray-700
//         hover:bg-gray-50 transition disabled:opacity-60"
//       >
//         <Navigation2 size={16} />
//         {isLocating ? "Updating..." : "Update geolocation"}
//       </button>
//     </div>
//   );
// };

// export default GeoLocationCard;









import { Compass, Navigation2, MapPin } from "lucide-react";
import type { UserProfile } from "../../types/profile";

interface GeoLocationCardProps {
  profile: UserProfile | null;
  isLocating: boolean;
  onUpdate?: () => void;
  currentLocation?: {
    lat: number;
    lng: number;
  } | null;
}

const GeoLocationCard: React.FC<GeoLocationCardProps> = ({
  profile,
  isLocating,
  onUpdate,
  currentLocation,
}) => {
  const lat = currentLocation?.lat ?? profile?.latitude;
  const lng = currentLocation?.lng ?? profile?.longitude;

  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-5 space-y-4">
      
      <div className="flex items-center gap-2 text-gray-800 font-semibold">
        <Compass size={18} />
        Delivery geolocation
      </div>

      <div className="border-t pt-3 space-y-2">
        <p className="text-sm text-gray-400">Drop-off coordinates</p>

        <div className="flex items-center gap-2 text-gray-800 font-medium">
          <MapPin size={16} className="text-blue-500" />
          {lat && lng ? `${lat}, ${lng}` : "Location not available"}
        </div>
      </div>

      <button
        onClick={onUpdate}
        disabled={isLocating}
        className="w-full h-12 rounded-full border border-gray-300 
        flex items-center justify-center gap-2 font-medium text-gray-700
        hover:bg-gray-50 transition disabled:opacity-60"
      >
        <Navigation2 size={16} />
        {isLocating ? "Updating..." : "Update geolocation"}
      </button>
    </div>
  );
};

export default GeoLocationCard;