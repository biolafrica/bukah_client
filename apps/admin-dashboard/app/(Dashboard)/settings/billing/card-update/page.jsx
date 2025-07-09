'use client'

import BackButton from "../../../../components/common/backButton";
import Form from "../../../../components/common/form";
import SettingsNav from "../../../../components/layout/settingsNav";
import SettingsHeadingIntro from "../../../../components/pages/settingsHeadingIntro";
import {cardUpdateFields } from "../../../../data/formFields";

export default function AddTables(){
  const initialData = { cardHolderName: '', cardNumber: '' , expiryDate: '', cvv:''}

  async function handleSubmit(values) {
    // call API
  }
  
  return(
    <div className="tables_cont p-5 pt-30 lg:pl-75">

      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info="Add Table"/>

            <div className="xl:w-2/3">
              <Form   
                fields={cardUpdateFields}
                initialValues={initialData}
                validate={()=>[]} 
                onSubmit={handleSubmit}
                submitLabel="Save"
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}