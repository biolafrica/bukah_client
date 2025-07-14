import { useForm } from "../../Hooks/useForm"


export default function Form({
  fields,
  initialValues,
  validate,
  onSubmit,
  submitLabel,
  errorClassName = 'bg-red-100 text-red-800 p-3 rounded mb-4',
}) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    globalError,
    handleChange,
    handleSubmit,
  } = useForm({ initialValues, validate, onSubmit })

  // Determine if form is valid: no errors and all required fields filled
  const isFormValid =
    Object.keys(errors).length === 0 &&
    fields.filter(f => f.required).every(f => {
      const val = values[f.name]
      return val !== undefined && val !== null && val.toString().trim() !== ''
    })

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {globalError && <div className={errorClassName}>{globalError}</div>}

      {fields.map(field => {
        const { name, label, type, placeholder, required, options } = field
        const showError = touched[name] && errors[name]
        const inputClass = `mt-1 block w-full rounded-md border px-3 py-2 sm:text-sm focus:outline-none focus:ring-2 focus:ring-pri-text focus:border-pri-text ${
          showError ? 'border-red-500' : 'border-gray-300'
        }`

        return (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-pri-text">
              {label}{required && <span className="text-red-500">*</span>}
            </label>

            {type === 'select' && Array.isArray(options) ? (
              <select
                id={name}
                name={name}
                value={values[name] ?? ''}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="" disabled>
                  {placeholder || `Select ${label}`}
                </option>
                {options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={values[name] ?? ''}
                onChange={handleChange}
                className={inputClass}
              />
            )}

            {showError && (
              <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
          </div>
        )
      })}

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`btn btn-filled w-full text-center ${(!isFormValid || isSubmitting)
          ? 'btn-inactive cursor-not-allowed'
          : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>
    </form>
  )
}


