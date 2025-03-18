'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthComp from '@/components/AuthComp';

export default function DashboardLayout({ children, onClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState(null);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [loginAuth, setLoginAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    const menuItems = [
        { label: 'Dashboard', active: true },
        { label: 'Calendario' },
        { label: 'Usuarios' },
        { label: 'Configuración' },
    ];

    useEffect(() => {
        setUsername(localStorage.getItem('name'));
        setToken(localStorage.getItem('token'));
    }, []);

    return <>
        <div className="min-h-screen bg-gray-50">
            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-800/50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-20'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <div className={`flex items-center gap-3 ${!sidebarOpen && 'hidden'}`}>
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">A</span>
                        </div>
                        <span className="font-semibold text-gray-900">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 hidden lg:block"
                    >
                        {/* {sidebarOpen ? (
                            <ChevronLeft className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                        )} */}
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                    >
                        x
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${item.active
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }
              `}
                        >
                            {/* <item.icon className="w-5 h-5 shrink-0" /> */}
                            <span className={`${!sidebarOpen && 'hidden'}`}>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <div
                className={`
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        `}
            >
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-30 lg:left-auto">
                    <div className="flex items-center justify-between h-full px-4">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                        >
                            {/* <Menu className="w-5 h-5 text-gray-500" /> */}
                        </button>

                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                                {/* <Bell className="w-5 h-5 text-gray-500" /> */}
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    {/* <User className="w-5 h-5 text-gray-500" /> */}
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    Admin User
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <main>{children}</main>
            </div>
            </>
}