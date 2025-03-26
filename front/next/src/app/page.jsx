'use client'

import React from 'react';
import { Play, Info, ChevronRight, Monitor, Tablet, Download, Users, } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 80%), rgb(0 0 0 / 40%)), url('https://assets.nflxext.com/ffe/siteui/vlv3/4bcafa4d-1171-450c-b28e-2a750edc44b9/web/ES-en-20250324-TRIFECTA-perspective_fc6e0ec6-8e87-46cc-a948-362401612939_large.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/0 to-black"></div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-4 py-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-red-600 text-4xl font-bold">CINETIX</h1>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-4">
          <h2 className="text-5xl lg:text-6xl font-bold mb-4">
            Compra Entradas para el Cine
          </h2>
          <p className="text-xl lg:text-2xl mb-6">
            Disfruta de las mejores películas en la pantalla grande. Compra tus entradas de forma rápida y sencilla.
          </p>
          <button onClick={() => { router.push('/dashboard') }} className="bg-red-600 px-8 py-4 rounded font-medium hover:bg-red-700 transition flex items-center justify-center cursor-pointer">
            Ver Sesiones Disponibles <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto py-24 px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "¿Qué es Cinetix?",
              answer: "Cinetix es un portal online donde puedes comprar entradas para las mejores películas en tu cine local. Ofrecemos una plataforma fácil de usar para que puedas ver las sesiones disponibles, elegir tus asientos y realizar la compra de tus entradas rápidamente."
            },
            {
              question: "¿Cuánto cuesta comprar en Cinetix?",
              answer: "Los precios varían según el tipo de entrada (normal o VIP). Con Cinetix, podrás disfrutar de precios accesibles y promociones especiales, todo con un sistema de pago seguro y rápido."
            },
            {
              question: "¿Dónde puedo ver las películas de Cinetix?",
              answer: "Consulta las sesiones disponibles de las películas en tu cine local a través de nuestro portal. Con Cinetix, podrás comprar entradas para ver las películas que más te gustan en el cine de tu ciudad, desde cualquier dispositivo conectado a internet."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-900 rounded">
              <button className="w-full px-6 py-4 text-left text-xl flex items-center justify-between">
                <span>{faq.question}</span>
              </button>
              <div className="px-6 py-4 text-lg text-gray-300 border-t border-gray-800">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-gray-400 mb-4">Cinetix</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Centro de ayuda</a></li>
                <li><a href="#" className="hover:underline">Términos de uso</a></li>
                <li><a href="#" className="hover:underline">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-4">Cuenta</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Mi cuenta</a></li>
                <li><a href="#" className="hover:underline">Formas de ver</a></li>
                <li><a href="#" className="hover:underline">Información corporativa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Avisos legales</a></li>
                <li><a href="#" className="hover:underline">Cookies</a></li>
                <li><a href="#" className="hover:underline">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-4">Síguenos</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-8">© 2024 Cinetix. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
