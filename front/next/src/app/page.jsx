'use client'

import { MapPin, Clock, Phone, Star, X, Navigation2, ExternalLink, Share2 } from 'lucide-react';


export default function Home() {

  const store = {
    "name": "Cinetix",

  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50">
      <div className="fixed bottom-0 left-0 right-0 animate-slide-up">
        <div className="bg-white rounded-t-[2.5rem] shadow-2xl max-w-2xl mx-auto">
          {/* Drag handle */}
          <div className="flex justify-center pt-4">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{store.name}</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {/* <span className="font-medium">{store.rating}</span> */}
                  </div>
                  <span className="text-sm text-emerald-600 font-medium px-2 py-0.5 bg-emerald-50 rounded-full">Open Now</span>
                </div>
              </div>
              <button
                
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Store Image */}
            <div className="relative mb-6 rounded-2xl overflow-hidden">
              <img
                // src={store.image}
                // alt={store.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-white rounded-full">
                    <MapPin className="w-5 h-5 text-gray-700" />
                  </div>
                  <span className="font-medium text-gray-900">Location</span>
                </div>
                {/* <p className="text-sm text-gray-600 leading-relaxed">{store.address}</p> */}
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-white rounded-full">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                  <span className="font-medium text-gray-900">Hours</span>
                </div>
                {/* <p className="text-sm text-gray-600">{store.hours}</p> */}
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-white rounded-full">
                    <Phone className="w-5 h-5 text-gray-700" />
                  </div>
                  <span className="font-medium text-gray-900">Contact</span>
                </div>
                {/* <p className="text-sm text-gray-600">{store.phone}</p> */}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Navigation2 className="w-4 h-4" />
                <span className="font-medium">Get Directions</span>
              </button>
              <button className="bg-gray-100 text-gray-700 p-3.5 rounded-xl hover:bg-gray-200 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
