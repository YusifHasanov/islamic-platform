import React, {Suspense} from 'react';
import Spinner from "@/components/search/Spinner";
import BooksListPage from "@/components/book/BooksPage";

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Spinner/>
                </div>
            }
        >
            <BooksListPage/>
        </Suspense>
    );
};

export default Page;
