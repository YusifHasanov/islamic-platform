'use client'
import React, {useEffect} from 'react';
import {useParams} from "next/navigation";
import {BASE_URL} from "@/util/Const";

const ArticleApiCount = () => {
    const {id} = useParams();

    useEffect(() => {
        fetch(`${BASE_URL}/articles/count/${id}`, {
            method: "PUT",
            contentType: "application/json",
        })
            .catch((err) => console.log(err));
    }, [])

    return (<></>);
};

export default ArticleApiCount;