'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export function ActiveLink({
  href,
  className,
  activeClassName,
  inactiveClassName,
  children,
  ...otherProps
}: LinkProps & {
  className?: string;
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(isActive ? activeClassName : inactiveClassName, className)}
      {...otherProps}
    >
      {children}
    </Link>
  );
}
