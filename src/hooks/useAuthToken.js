"use client"
import { useState, useEffect } from "react"

function useAuthToken() {
  // Initialize token state
  const [token, setToken] = useState(() => localStorage.getItem("authToken"))
  const [isAuthenticated, setIsAuthenticated] = useState(() => token !== null && token !== "")

  // Function to set the token and store it in localStorage
  const saveToken = (newToken) => {
    setToken(newToken)
    localStorage.setItem("authToken", newToken)
    setIsAuthenticated(newToken !== null && newToken !== "")
  }

  // Function to get the token (can be used directly from the state)
  const getToken = () => {
    return token
  }

  // Sync token with localStorage changes (optional)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("authToken")
      setToken(storedToken)
      setIsAuthenticated(storedToken !== null && storedToken !== "")
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [token])

  return { token, isAuthenticated, saveToken, getToken }
}

export default useAuthToken

