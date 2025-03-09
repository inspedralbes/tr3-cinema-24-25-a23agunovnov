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
                    <div className="relative w-full md:max-w-xl mx-8">
                        <input
                            type="text"
                            placeholder="Buscar películas..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-gray-100 text-gray-900 px-6 py-3 pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}