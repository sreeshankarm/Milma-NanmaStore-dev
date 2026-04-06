import React, { useEffect, useState } from "react";

import ProfileHeader from "../components/MyProfile/ProfileHeader";
import LanguageCard from "../components/MyProfile/LanguageCard";
import ContactDetailsCard from "../components/MyProfile//ContactDetailsCard";

import { useAuth } from "../context/auth/useAuth";
import { useProfile } from "../context/profile/useProfile";
import type { ContactDetailsFormState } from "../types/profile";
import ChangePassword from "../components/MyProfile/ChangePassword";
import GeoLocationCard from "../components/MyProfile/GeoLocationCard";
import UpdateLocationModal from "../components/MyProfile/UpdateLocationModal";
import { toast } from "react-toastify";

export const MyProfileView: React.FC = () => {
  const { userName } = useAuth();
  const { profile, fetchProfile } = useProfile();

  // const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving] = useState(false);

  const [statusMessage] = useState("");

  const [formState, setFormState] = useState<ContactDetailsFormState>({
    phone: "",
    email: "",
    address: "",
    storePhotos: [],
  });

  useEffect(() => {
    if (!profile) return;

    setFormState({
      phone: profile.login_mobile ?? "",
      email: profile.lgin_email ?? "",
      address: profile.state_name ?? "",
      storePhotos: [],
    });
  }, [profile]);

  useEffect(() => {
    fetchProfile();
  }, []);

  //   if (loading || !profile) {
  //   return (
  //     <div className="p-6 text-center text-gray-500">
  //       {t("Loading profile...")}
  //     </div>
  //   );
  // }

  const [openModal, setOpenModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleGeoUpdate = () => {
    setOpenModal(true);
  };

  // const handleSaveLocation = () => {
  //   setIsLocating(true);

  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const lat = pos.coords.latitude;
  //       const lng = pos.coords.longitude;

  //       console.log("NEW LOCATION:", lat, lng);

  //       // 🔥 CALL API HERE (update location API)
  //       // await updateLocationApi({ lat, lng });

  //       setIsLocating(false);
  //       setOpenModal(false);
  //     },
  //     () => {
  //       setIsLocating(false);
  //     },
  //   );
  // };

  const handleSaveLocation = () => {
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("NEW LOCATION:", lat, lng);

        // ✅ SET LOCAL STATE (THIS FIXES YOUR UI)
        setCurrentLocation({ lat, lng });

        try {
          // 🔥 CALL API
          // await updateLocationApi({ lat, lng });

          toast.success("Location updated successfully ✅", {
            theme: "colored",
          });
        } catch (err) {
          toast.error("Failed to update location ❌", {
            theme: "colored",
          });
        }

        setIsLocating(false);
        setOpenModal(false);
      },
      () => {
        toast.error("Unable to fetch location ❌", {
          theme: "colored",
        });
        setIsLocating(false);
      },
    );
  };

  return (
    <div className="p-4 pb-24 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProfileHeader
        profile={profile}
        userName={userName}
        isEditing={isEditing}
        statusMessage={statusMessage}
        onToggleEdit={() => setIsEditing((p) => !p)}
      />
      <LanguageCard />
      <ContactDetailsCard
        profile={profile}
        formState={formState}
        setFormState={setFormState}
        isEditing={isEditing}
        isSaving={isSaving}
        // onSave={handleSave}
      />

      <ChangePassword />

      <GeoLocationCard
        profile={profile}
        isLocating={isLocating}
        onUpdate={handleGeoUpdate}
        currentLocation={currentLocation}
      />

      <UpdateLocationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveLocation}
        latitude={Number(profile?.latitude)}
        longitude={Number(profile?.longitude)}
      />
    </div>
  );
};
