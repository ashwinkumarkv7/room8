import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LifestyleTraitSkeleton = () => (
    <div className="flex items-center space-x-3">
        <Skeleton circle width={24} height={24} />
        <div>
            <Skeleton width={50} height={10} />
            <Skeleton width={80} height={12} />
        </div>
    </div>
);

export default function RoommateCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col h-full overflow-hidden">
      {/* --- Header Section --- */}
      <div className="p-5 flex items-center border-b border-gray-200">
        <Skeleton circle width={80} height={80} className="mr-4" />
        <div>
          <Skeleton width={120} height={28} />
          <Skeleton width={80} height={20} className="mt-1" />
        </div>
      </div>

      {/* --- Body Section --- */}
      <div className="p-5 flex flex-col flex-grow text-sm text-gray-700">
        <div className="flex items-center text-gray-700 mb-4">
            <Skeleton circle width={20} height={20} className="mr-3" />
            <Skeleton width={100} height={20} />
        </div>

        {/* --- Lifestyle Section --- */}
        <div className="space-y-3 mb-4">
            <LifestyleTraitSkeleton />
            <LifestyleTraitSkeleton />
            <LifestyleTraitSkeleton />
            <LifestyleTraitSkeleton />
        </div>

        <div className="flex-grow">
            <Skeleton count={2} />
        </div>
        
        <Skeleton height={42} borderRadius={8} className="mt-4" />
      </div>
    </div>
  );
}
