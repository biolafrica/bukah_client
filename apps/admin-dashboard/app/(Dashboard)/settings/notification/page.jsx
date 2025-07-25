'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoadingSpinner from "../../../components/common/loadingSpinner";
import {NotificationSettings} from "../../../components/layout/settingsMainNav";
import SettingsNav from "../../../components/layout/settingsNav"
import SettingsHeadingIntro from "../../../components/pages/settings/settingsHeadingIntro";
import ImagePreviewCont from "../../../components/pages/settings/imagePreviewCont";
import Alert from "../../../components/common/alert";

import { useSettings } from "../../../hooks/useSettings";
import { notificationSections,} from "../../../data/notification";



export default function Notification() {
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


  return (
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


      <div className="notification_cont p-5 pt-30 lg:pl-75">
        <SettingsHeadingIntro/>

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4">
            <NotificationSettings sections={sections}/>
          </div>

        </div>
        

      </div>

    </>
  )
}