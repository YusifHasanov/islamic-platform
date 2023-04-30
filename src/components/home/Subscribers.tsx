
import React from 'react'
import CountUp from 'react-countup'

const stats = [
    {
        id: 1, value: '500000',
        platform: "Youtube",
        icon: <div className="bg-red-600 h-13 w-16 flex  justify-center p-2 font-semibold text-white  items-center space-x-2 rounded">
            <svg className="w-9 h-9 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" /></svg>
        </div>
    },
    {
        id: 2, value: '2000000'
        , platform: "Facebook",
        icon: <button className="bg-blue-500 p-2  h-13 w-16 flex  justify-center font-semibold text-white  items-center space-x-2 rounded">
            <svg className="w-9 h-9 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        </button>,

    },
    {
        id: 3, value: '46,000',
        platform: "Twitter",
        icon:
            <button className="bg-blue-400  p-2  h-13 w-16 flex justify-center  font-semibold text-white   items-center space-x-2 rounded">
                <svg className="w-9 h-9 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
            </button>

    },
]

const Subscribers = () => {
    return (
        <div className="bg-white dark:bg-gray-700 py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) =>
                        <div key={stat.id} className="mx-auto flex max-w-xs items-center flex-col gap-y-4">
                            {stat.icon}
                            <CountUp start={0} end={parseFloat(stat.value)} duration={2.75} decimals={3} enableScrollSpy={true}>
                                {({ countUpRef }) => (
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        <span ref={countUpRef} />
                                    </div>
                                )}
                            </CountUp>
                            <p className="text-md font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.platform}</p>
                        </div>
                    )}
                </dl>
            </div>
        </div>
    )
}

export default Subscribers
