import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function AddRoomPage() {
  return (
    <div className="bg-gray-50 flex-grow py-16">
      <div className="container mx-auto px-4 text-center">
        <PlusCircleIcon className="mx-auto h-16 w-16 text-gray-400" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Add Your Room
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          This is where the form to add a new room listing will go.
        </p>
        <div className="mt-10">
          <a
            href="#"
            className="rounded-md bg-[#6b2184] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started (Placeholder)
          </a>
        </div>
      </div>
    </div>
  );
}
