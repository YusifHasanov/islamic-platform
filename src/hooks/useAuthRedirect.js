"use client"

import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"

const useAuthRedirect = () => {
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (pathname === "/admin/login" || pathname === "/admin/register") {
      if (token) {
        redirect("/admin")
      }
    } else {
      if (!token) {
        redirect("/admin/login")
      }
    }
  }, [pathname])
}

export default useAuthRedirect

