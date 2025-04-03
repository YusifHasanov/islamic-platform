"use client"
import { usePathname } from "next/navigation"
import { ObjectUtils } from "primereact/utils"
import React, { useContext, useEffect, useState } from "react"
import { LayoutContext } from "./context/layoutcontext"

const AppBreadcrumb = (props) => {
  const pathname = usePathname()
  const [breadcrumb, setBreadcrumb] = useState(null)
  const { breadcrumbs } = useContext(LayoutContext)

  useEffect(() => {
    const filteredBreadcrumbs = breadcrumbs?.find((crumb) => {
      return crumb.to?.replace(/\/$/, "") === pathname.replace(/\/$/, "")
    })
    setBreadcrumb(filteredBreadcrumbs ?? null)
  }, [pathname, breadcrumbs])

  return (
    <div className={props.className}>
      <nav className="layout-breadcrumb">
        <ol>
          {ObjectUtils.isNotEmpty(breadcrumb) && pathname !== "/" ? (
            breadcrumb?.labels?.map((label, index) => {
              return (
                <React.Fragment key={index}>
                  {index !== 0 && <li className="layout-breadcrumb-chevron"> / </li>}
                  <li key={index}>{label}</li>
                </React.Fragment>
              )
            })
          ) : (
            <>
              {pathname === "/" && <li key={"home"}>E-Commerce Dashboard</li>}
              {pathname === "/dashboard-banking" && <li key={"banking"}>Banking Dashboard</li>}
            </>
          )}
        </ol>
      </nav>
    </div>
  )
}

export default AppBreadcrumb

