import React from "react";
import Skeleton from "./Skeleton";

const ArticleCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <Skeleton className="w-full h-48" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;