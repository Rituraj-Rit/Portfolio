import { useCallback, useMemo, useState } from 'react'
import { sendEmail } from '../services/emailService'

const initialValues = {
  name: '',
  email: '',
  message: '',
}

export function useContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('idle')

  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'name':
        return value.trim() ? '' : 'Name is required.'
      case 'email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) return 'Email is required.'
        if (!emailPattern.test(value)) return 'Please enter a valid email address.'
        return ''
      }
      case 'message': {
        if (!value.trim()) return 'Message is required.'
        if (value.trim().length < 10) return 'Message must be at least 10 characters.'
        return ''
      }
      default:
        return ''
    }
  }, [])

  const validateForm = useCallback(() => {
    const nextErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message),
    }

    setErrors(nextErrors)
    return !nextErrors.name && !nextErrors.email && !nextErrors.message
  }, [values, validateField])

  const handleChange = useCallback((event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
  }, [validateField])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
  }, [])

  const submitForm = useCallback(async (event) => {
    event.preventDefault()

    const hasErrors = !validateForm()
    if (hasErrors) {
      setStatus('error')
      return { success: false, validationFailed: true }
    }

    setIsSubmitting(true)
    setStatus('loading')

    try {
      await sendEmail(values)
      setStatus('success')
      resetForm()
      return { success: true, validationFailed: false }
    } catch (error) {
      setStatus('error')
      return { success: false, validationFailed: false }
    } finally {
      setIsSubmitting(false)
    }
  }, [resetForm, validateForm, values])

  return useMemo(() => ({
    values,
    errors,
    isSubmitting,
    status,
    handleChange,
    submitForm,
    resetForm,
  }), [errors, handleChange, isSubmitting, resetForm, status, submitForm, values])
}
