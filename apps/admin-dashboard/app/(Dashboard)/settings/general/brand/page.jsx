"use client"
import BackButton from "../../../../components/common/backButton"

export default function Brand(){

  function validate(values) {
    const errors = {}
    const prefix = (values.prefix ?? '').trim()

    if (prefix.length > 2) {
      errors.prefix = 'Prefix cannot be more than two letters.'
    }

    return errors
  }
  
  async function handleSubmit(values) {
    // call API
  }

  const initialData = { firstName: 'John', email: 'john@example.com' }


  return(
    <div className="brand_cont p-5 pt-30 lg:pl-75">
      <div className="border border-border-text rounded-md p-5 bg-white">
        <BackButton info="Brand Customization"/>

      </div>

    </div>
  )
}