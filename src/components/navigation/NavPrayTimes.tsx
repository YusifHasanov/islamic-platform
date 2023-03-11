import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

const NavPrayTimes = () => {
    const menuItems = [
        { name: "Sübh", current: false },
        { name: "Zöhr", current: false },
        { name: "Əsr", current: false },
        { name: "Məğrib", current: true },
        { name: "İşa", current: false },
      ]
 
  return (
     
     <Menu as="div" className="relative ml-3">
     <div>
       <Menu.Button className="flex rounded-full  p-2 bg-green-600 text-white  text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2  ">
         {menuItems.find(i => i.current === true)?.name}
       </Menu.Button>
     </div>
     <Transition
       as={Fragment}
       enter="transition ease-out duration-100"
       enterFrom="transform opacity-0 scale-95"
       enterTo="transform opacity-100 scale-100"
       leave="transition ease-in duration-75"
       leaveFrom="transform opacity-100 scale-100"
       leaveTo="transform opacity-0 scale-95"
     >
       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
         {
           menuItems.map((item) => (
             <Menu.Item key={item.name}>
               {({ active }) => (
                 <a href="#" className={classNames(item.current ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                   {item.name}
                 </a>
               )}

             </Menu.Item>))

         }
       </Menu.Items>
     </Transition>
   </Menu>
  )
}

export default NavPrayTimes