import { ActiveLink } from '@/components/ActiveLink';

const NavbarItems = [
  {
    name: 'By Category',
    href: '/reports',
  },
];

export default function ReportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Reports</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          {NavbarItems.map((item) => (
            <ActiveLink
              key={item.name}
              href={item.href}
              activeClassName="font-semibold text-primary"
            >
              {item.name}
            </ActiveLink>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
