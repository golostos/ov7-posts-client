import { useState } from 'react'

export default function useLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailError, setIsEmailError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  // max 20 length, [a-zA-Z0-9.@-_] = \d
  const setEmailValid = (email: string) => {
    if (email.length < 20)
      if (/^[a-zA-Z0-9.@-_]*$/.test(email)) {
        setEmail(email)
        setIsEmailError(false)
      } else {
        setIsEmailError(true)
      }
  }
  const setPasswordValid = (password: string) => {
    if (password.length < 20)
      if (/^[a-zA-Z0-9.@-_]*$/.test(password)) {
        setPassword(password)
        setIsPasswordError(false)
      } else {
        setIsPasswordError(true)
      }
  }
  return {
    email: email,
    setEmail: setEmailValid,
    password,
    setPassword: setPasswordValid,
    isEmailError,
    isPasswordError,
    setIsEmailError,
    setIsPasswordError
  }
}