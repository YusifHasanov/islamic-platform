import { NewNavbar } from "@/components/common/NewNavbar"
import { BASE_URL } from "@/util/Const"
import Footer from "@/components/common/Footer";

const staticMenuItems = [
  {
    name: "Videolar",
    href: "/videos",
    subcategories: [],
  },
  {
    name: "Məqalələr",
    href: "/articles",
    subcategories: [],
  },
  {
    name: "Suallar",
    href: "/questions",
    subcategories: [],
  },
  {
    name: "Haqqımızda",
    href: "/about",
    subcategories: [],
  },
  {
    name: "Əlaqə",
    href: "/contact",
    subcategories: [],
  },
  {
    name: "Kitablar",
    href: "/books",
    subcategories: [],
  },
]

const Layout = async ({ children }) => {
  const res = await fetch(`${BASE_URL}/categories/menu`)
  const menusData = await res.json()

  const addHrefToMenuItems = (menuItems) => {
    return menuItems.map((item) => ({
      ...item,
      href: `/search?categoryId=${item.id}`,
      subcategories: item.subcategories ? addHrefToMenuItems(item.subcategories) : [],
    }))
  }
  const finalMenus = addHrefToMenuItems(menusData)

  const menus = [...finalMenus, ...staticMenuItems]

  return (
    <>
      {/*<Navbar/>*/}
      <NewNavbar menus={menus} />
      {/*<NavbarOld/>*/}
      {children}
      <Footer />
    </>
  )
}

export default Layout

