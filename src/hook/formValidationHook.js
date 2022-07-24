import React from 'react';
import { useCallback } from 'react'

export default function useFormWithValidation(inputs) {
  const [values, setValues] = React.useState(inputs)
  const [errors, setErrors] = React.useState({})
  const [isValid, setIsValid] = React.useState(false)

  const handleChange = (evt) => {
    const input = evt.target
    const { value } = input
    const { name } = input
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: input.validationMessage })
    setIsValid(input.closest('form').checkValidity())
  }

  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid],
  )

  return { values, handleChange, resetFrom, errors, isValid }
}