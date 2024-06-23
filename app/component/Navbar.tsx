'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HomeIcon, DocumentIcon, UserIcon, PlusIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'

type NavbarProps = {
  session: any;
};

export const Navbar = ({ session }: NavbarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {!isMobile && <DesktopNavbar session={session} />}
      {isMobile && <MobileNavbar session={session} />}
    </>
  );
};

const DesktopNavbar = ({ session }: NavbarProps) => {
  return (
    <nav className="bg-gradient-to-r from-pea to-purple-500  w-full fixed shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={100} height={50} className="cursor-pointer" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {session?.pea?.role && ["admin", "checker"].includes(session.pea.role) && (
                <>
                  <NavLink href="/manage-docs">จัดการเอกสารหลายฉบับ</NavLink>
                  <NavLink href="/manage-doc">จัดการเอกสาร</NavLink>
                </>
              )}
              <NavLink href="/document">สถานะเอกสาร</NavLink>
              <NavLink href="/api/auth/signout">Logout</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MobileNavbar = ({ session }: NavbarProps) => {
  const isAdmin = session?.pea?.role && ["admin", "checker"].includes(session.pea.role);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between">
          {isAdmin ? (
            <>
              <NavItem href="/manage-docs" icon={<DocumentDuplicateIcon className="w-6 h-6" />} label="จัดการเอกสารหลายฉบับ" />
              <NavItem href="/manage-doc" icon={<DocumentIcon className="w-6 h-6" />} label="จัดการเอกสาร" />
              <NavItem href="/" icon={<HomeIcon className="w-6 h-6" />} label="หน้าแรก" />
              <NavItem href="/document" icon={<PlusIcon className="w-6 h-6" />} label="สถานะเอกสาร" />
              <NavItem href="/user/profile" icon={<UserIcon className="w-6 h-6" />} label="โปรไฟล์" />
            </>
          ) : (
            <>
              <NavItem href="/" icon={<HomeIcon className="w-6 h-6" />} label="หน้าแรก" />
              <NavItem href="/document" icon={<PlusIcon className="w-6 h-6" />} label="สถานะเอกสาร" />
              <NavItem href="/user/profile" icon={<UserIcon className="w-6 h-6" />} label="โปรไฟล์" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <Link href={href} className="flex flex-col items-center justify-center py-2">
    {icon}
    <span className="mt-1 text-xs">{label}</span>
  </Link>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href}>
    <span className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
      {children}
    </span>
  </Link>
);