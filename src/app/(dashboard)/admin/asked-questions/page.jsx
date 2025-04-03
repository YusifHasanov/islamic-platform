import React, {Suspense} from 'react';
import AskedQuestionsPage from "@/components/admin/questions/AskedQuestionsPage";
import Spinner from "@/components/search/Spinner";

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Spinner/>
                </div>
            }
        >
            <AskedQuestionsPage/>
        </Suspense>
    );
};

export default Page;
