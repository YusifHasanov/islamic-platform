import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, memo, useEffect, useState, useMemo, useCallback } from 'react'
import moment from 'moment'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}



type prayTime = {
  value: string,
  name: string,
}
const NavPrayTimes = () => {

  const [now, setNow] = useState<any>(moment(moment(), "HH:mm"));
  const [currentTime, setCurrentTime] = useState<string>(now.format("HH:mm"));
  const [prayerTimes, setPrayerTimes] = useState<any>({});
  const [currentPrayer, setCurrentPrayer] = useState<prayTime>({
    value: "",
    name: ""
  } as prayTime);


  const fetchFunction = useMemo(() => () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(`https://api.aladhan.com/v1/timings?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&method=13&school=1`)
        .then(response => response.json())
        .then(data => setPrayerTimes({
          fajr: moment(data.data.timings.Fajr, "HH:mm").format("HH:mm"),
          sunrise: moment(data.data.timings.Sunrise, "HH:mm").format("HH:mm"),
          dhuhr: moment(data.data.timings.Dhuhr, "HH:mm").format("HH:mm"),
          asr: moment(data.data.timings.Asr, "HH:mm").format("HH:mm"),
          maghrib: moment(data.data.timings.Maghrib, "HH:mm").format("HH:mm"),
          isha: moment(data.data.timings.Isha, "HH:mm").format("HH:mm"),
        }))
        .then(() => console.log(prayerTimes))
        .catch(error => console.error(error));
    });
  }, [])

  const timeCalculator = useCallback(() => {
    const times = Object.entries(prayerTimes).map(([key, value]) => ({ name: key, value: value }))
    const current = times.find((i: any) => moment(i?.value, "HH:mm").isBefore(moment(currentTime, "HH:mm")))
    if (current) {
      setCurrentPrayer(current as prayTime)
    }
  }, [prayerTimes, now])


  useEffect(() => {
    fetchFunction()
  }, [fetchFunction])

  useEffect(() => {
    timeCalculator()
  }, [prayerTimes, currentTime, timeCalculator])







  const menuItems = [
    { name: "Sübh", current: currentPrayer.name === "fajr", value: prayerTimes?.fajr },
    { name: "Zöhr", current: currentPrayer.name === "dhuhr", value: prayerTimes?.dhuhr },
    { name: "Əsr", current: currentPrayer.name === "asr", value: prayerTimes?.asr },
    { name: "Məğrib", current: currentPrayer.name === "maghrib", value: prayerTimes?.maghrib },
    { name: "İşa", current: currentPrayer.name === "isha", value: prayerTimes?.isha },
  ]


  return (

    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full  p-2 bg-yellow-300 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2  ">

          {menuItems.find(i => i.current === true) ? `${menuItems.find(i => i.current === true)?.name}` : "Yüklənir"}
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
                  <a href="#" className={`flex  items-center justify-between w-full  ${classNames(item.current ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} `}>
                    <span>{item.name}</span>
                    <span className="text-gray-400 text-xs">{item.value}</span>
                  </a>
                )}

              </Menu.Item>)) 
          }
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
 
export default  NavPrayTimes