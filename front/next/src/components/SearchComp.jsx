'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchComp() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    async function buscarMovie() {
        router.push(`/search?title=${searchTerm}`)
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') buscarMovie();
    }

    return <>
        <div className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-gray-900">
                        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/dashboard')}>Cinetix</h1>
                    </div>
                    <div className="flex items-center space-x-6 flex-1 justify-end">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Buscar películas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-gray-100 text-gray-900 px-6 py-3 pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                            />
                        </div>

                        <button onClick={() => router.push('/login')} className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-md transition hover:bg-red-700 transition-colors cursor-pointer">
                            <span>Iniciar sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}