"use client"
import { useEffect, useState } from "react"

export function useForm({
  initialValues = {},
  validate = () => ({}),
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [globalError, setGlobalError] = useState('')

  // Reset values when the screen reloads
  useEffect(() => {
    setValues(initialValues)
  }, [])

  // Validate on values change
  useEffect(() => {
    setErrors(validate(values))
  }, [values, validate])

  const handleChange = e => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setTouched(Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}))
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } catch (err) {
        setGlobalError(err.message || 'An unexpected error occurred')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    globalError,
    handleChange,
    handleSubmit,
    setValues,
    setGlobalError,
  }
}