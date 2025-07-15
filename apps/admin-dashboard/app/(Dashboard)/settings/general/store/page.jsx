"use client"
import SettingsNav from "../../../../components/layout/settingsNav"
import Form from "../../../../components/common/form"
import { storeFields } from "../../../../data/formFields"
import SettingsHeadingIntro from "../../../../components/pages/settings/settingsHeadingIntro"
import BackButton from "../../../../components/common/backButton"

export default function Store(){
  function validate(values) {
    const errors = {}
    const prefix = (values.prefix ?? '').trim()

    if (prefix.length > 2) {
      errors.prefix = 'Prefix cannot be more than two letters.'
    }

    return errors
  }

  const initialData = { firstName: 'John', email: 'john@example.com' }
  async function handleSubmit(values) {
    // call API
  }

  return(
    <div className="store_cont p-5 pt-30 lg:pl-75">

      <SettingsHeadingIntro/>

      <div className="border border-border-text rounded-md p-5 bg-white">

        <div className="flex gap-5">

          <div className="min-w-[270px] w-1/4 hidden lg:block">
            <SettingsNav/>
          </div>

          <div className=" w-full lg:w-3/4 border p-5 rounded-md border-border-text">
            <BackButton info="Store Info"/>

            <div className="xl:w-2/3">
              <Form   
                fields={storeFields}
                initialValues={initialData}
                validate={validate} 
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
