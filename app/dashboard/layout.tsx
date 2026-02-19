"use client";

import { LayoutGrid, Users, FileText, CreditCard, Settings, LogOut, Bell, Factory } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

function NavItem({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? "bg-[#4f795a] text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    router.push("/login");
  }
  return (
    <div className="flex bg-[#fdf6ee] min-h-screen">
      {/* Sidebar */}
      <aside className="w-[272px] bg-white border-r-2 border-gray-300 flex flex-col fixed h-full z-10">
        <div className="flex justify-center border-b-2 border-gray-300 ">
          <Image src="/image/dashboard-logo.png" alt="Logo" width={71.5} height={68} />
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" href="/dashboard" />
          <NavItem icon={<Users size={20} />} label="Users" href="/dashboard/users" />
          <NavItem icon={<FileText size={20} />} label="Content Manager" href="/dashboard/content" />
          <NavItem icon={<CreditCard size={20} />} label="Subscriptions" href="/dashboard/subscriptions" />
          <NavItem icon={<Settings size={20} />} label="Settings" href="/dashboard/settings" />
          <NavItem icon={<Factory  size={20} />} label="Access" href="/dashboard/access" />
        </nav>
        <div className="p-4 border-t-2 border-gray-300">
          <button onClick={handleLogout} className="flex items-center gap-3 text-gray-500 hover:text-red-600 w-full px-4 py-2">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 ml-[272px] flex flex-col">
        <header className="flex justify-between items-center bg-white px-8 py-2 shadow-sm sticky top-0 z-20">
          <h2 className="text-gray-600 font-medium font-serif">Saturday, January 10, 2026</h2>
          <div className="flex items-center gap-6">
            <Link href="/dashboard/notifications" className="relative">
            <div className='border-r-2 border-gray-300 pr-4'><Bell size={22} className="text-gray-400" /></div>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
            <div className="flex items-center gap-3">
              <Image src="/image/profile-pic.png" alt="User" className="rounded-full border-2 border-orange-200" width={40} height={40} />
              <div className="text-left"><p className="text-sm font-bold text-gray-800">Jane Cooper</p><p className="text-xs text-gray-400">Admin</p></div>
            </div>
            </Link>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}