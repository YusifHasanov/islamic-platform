import Layout from '@/src/admin/Layout'
import Title from '@/src/admin/Title'
import Header from '@/src/components/common/Header'
import React from 'react'

const index = () => {
    return (
        <>
            <Header title="Admin Categories" description="Admin Categories" />
            <Layout>
                <Title name='Müəlliflər' />
                <div className="border-b border-gray-400 px-4 dark:border-gray-700">
                    <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                        <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white active" id="basic-tabs-item-1" data-hs-tab="#basic-tabs-1" aria-controls="basic-tabs-1" role="tab">
                            Müəlliflər
                        </button>
                        <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white" id="basic-tabs-item-2" data-hs-tab="#basic-tabs-2" aria-controls="basic-tabs-2" role="tab"  >
                            Yeni Müəllif
                        </button>
                    </nav>
                </div>
                <div className="mt-3 p-4">
                    <div id="basic-tabs-1" role="tabpanel" aria-labelledby="basic-tabs-item-1">
                      
                    </div>
                    <div id="basic-tabs-2" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-2">
                       
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default index