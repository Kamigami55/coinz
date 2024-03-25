'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import { ActiveLink } from '@/components/ActiveLink';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Logo from '../../public/logo.png';

const NavbarItems = [
  {
    name: 'Dashboard',
    href: '/',
  },
  {
    name: 'Transactions',
    href: '/transactions',
  },
  {
    name: 'Reports',
    href: '/reports',
  },
  {
    name: 'Settings',
    href: '/settings',
  },
];

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base shrink-0"
        >
          <Image src={Logo} alt="Coinz Logo" className="h-6 w-6" />
          <span className="sr-only">Coinz</span>
        </Link>
        {NavbarItems.map((item) => (
          <ActiveLink
            key={item.name}
            href={item.href}
            className="transition-colors hover:text-foreground"
            activeClassName="text-primary font-semibold"
            inactiveClassName="text-muted-foreground"
          >
            {item.name}
          </ActiveLink>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src={Logo} alt="Coinz Logo" className="h-6 w-6" />
              <span className="sr-only">Coinz</span>
            </Link>

            {NavbarItems.map((item) => (
              <ActiveLink
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground"
                activeClassName="text-primary font-semibold"
                inactiveClassName="text-muted-foreground"
              >
                {item.name}
              </ActiveLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />

        {status === 'authenticated' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {session?.user?.username?.[0]?.toUpperCase()}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session?.user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link href="/settings/profile">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/settings/account">
                <DropdownMenuItem className="cursor-pointer">
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </div>
    </header>
  );
}
