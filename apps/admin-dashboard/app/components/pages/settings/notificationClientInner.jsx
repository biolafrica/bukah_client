"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import LoadingSpinner from "../../common/loadingSpinner";
import ImagePreviewCont from "./imagePreviewCont";
import Alert from "../../common/alert";

import { NotificationSettings } from "../../layout/settingsMainNav";
import { notificationSections } from "../../../data/notification";

import { useSettings } from "../../../hooks/useSettings";

export default function NotificationClientInner(){
  const router = useRouter()
  const { raw, isLoading, isError, updateSettings } = useSettings();

  const [previewImage, setPreviewImage] = useState(null);
  const [errorMsg,   setErrorMsg]   = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  if (isLoading) return <LoadingSpinner/>
  if (isError ) return <p>Failed to load settings</p>

  const handleToggle = async (section, key, value) => {

    const payloadKey = section === 'customers' ? 'customer_notifications' : 'staff_notifications';
    const updatedNotifications = {
      ...(section === 'customers' ? raw.customer_notifications : raw.staff_notifications),
      [key]: value
    };

    try {
      await updateSettings({
        [payloadKey]: updatedNotifications,
        restaurant_id: process.env.NEXT_PUBLIC_RESTAURANT_ID
      });
      
      setShowSuccess(true)
      setTimeout(() => {
        router.refresh();
        setShowSuccess(false)
      }, 2000)
    } catch (err) {
      console.error("Failed to update notification setting", err);
      setErrorMsg(err.message || 'Unknown error')
    }
  };

  const handlePreview = (sectionKey, itemKey) => {
    const previewPath = `/previews/${sectionKey}/${itemKey}.png`; 
    setPreviewImage(previewPath);
  };

  const closePreview = () => setPreviewImage(null);

  const sections = notificationSections(raw, handleToggle, handlePreview)

  return(
    <>
      {previewImage && (<ImagePreviewCont closePreview={closePreview} previewImage={previewImage} />)}

      {errorMsg && (
        <Alert
          type="error"
          heading='Failed to update notification'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {showSuccess && (
        <Alert
          type="success"
          heading='update succesful'
          subheading='notification updated successfully'
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className=" w-full lg:w-3/4">
        <NotificationSettings sections={sections}/>
      </div>

    </>
  )
}