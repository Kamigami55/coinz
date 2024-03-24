'use client';

import { AnalyticsBrowser } from '@segment/analytics-next';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const analytics = AnalyticsBrowser.load({
  writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
});

export function SegmentAnalytics() {
  const pathname = usePathname();

  React.useEffect(() => {
    analytics.identify('hello world');
  }, []);

  React.useEffect(() => {
    const url = pathname;
    analytics.page(url);
  }, [pathname]);

  return null;
}
