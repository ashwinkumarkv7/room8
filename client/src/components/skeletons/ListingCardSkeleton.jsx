import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ListingCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg h-full">
      {/* Image Placeholder */}
      <Skeleton height={192} />
      
      <div className="flex flex-col flex-grow p-5">
        {/* Title and Location Placeholders */}
        <Skeleton width="80%" height={28} />
        <Skeleton width="50%" height={20} className="mt-2" />
        
        {/* Features/Tags Placeholder */}
        <div className="flex flex-wrap gap-2 my-4">
          <Skeleton width={60} height={28} borderRadius={999} />
          <Skeleton width={80} height={28} borderRadius={999} />
          <Skeleton width={70} height={28} borderRadius={999} />
        </div>

        {/* Posted By Placeholder */}
        <div className="border-t border-gray-200 pt-3 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton circle width={40} height={40} className="mr-3" />
              <div>
                <Skeleton width={80} height={20} />
                <Skeleton width={50} height={16} />
              </div>
            </div>
            <Skeleton width={60} height={40} borderRadius={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
