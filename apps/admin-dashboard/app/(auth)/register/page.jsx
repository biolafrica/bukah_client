"use client"

import { useState } from "react"
import ConfirmBanner from "../../components/common/banner"

export default function Register(){
   const [showModal, setShowModal] = useState(true)
 
  return(
    <div>
      <h4>Register</h4>

      <ConfirmBanner
        open={showModal}
        title="Delete this item?"
        message="This action cannot be undone. Are you sure bdgdgdgdg dbdgdgdgd dgdgdgdg dgdggd?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false)
        }}
      />
    </div>
  )
}