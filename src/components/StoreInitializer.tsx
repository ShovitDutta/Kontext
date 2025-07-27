"use client";
import { useEffect } from "react";
import { useArticleStore } from "@/store/articleStore";
const StoreInitializer = () => {
    useEffect(() => {
        useArticleStore.getState().fetchAllArticles();
    }, []);

    return null;
};
export default StoreInitializer;