'use client';

import * as React from 'react';

import { Counter } from '@/components/Counter';

export default function Home() {
  return (
    <div className="p-12">
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Time Zone Converter</h1>
          <h2 className="text-lg font-medium text-[#7C7C7C] dark:text-[#DFDFDF]">
            Easily convert time between different timezones and compare
            overlapping time periods.
          </h2>

          <Counter />
        </div>
      </div>
    </div>
  );
}
