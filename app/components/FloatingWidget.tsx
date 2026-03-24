"use client";
import { useState } from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import WhatsAppForm from "./WhatsAppForm";

interface FloatingWidgetProps {
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  businessName: string;
  businessType: "salon" | "restaurant";
}

export default function FloatingWidget({
  phone,
  whatsapp,
  googleMapsUrl,
  businessName,
  businessType,
}: FloatingWidgetProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm && (
        <WhatsAppForm
          whatsapp={whatsapp}
          businessName={businessName}
          businessType={businessType}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Widget bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white rounded-full shadow-2xl px-5 py-3 border border-gray-100">
        {/* Llamar */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center gap-1 group"
          aria-label="Llamar"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Llamar</span>
        </a>

        <div className="h-10 w-px bg-gray-100" />

        {/* WhatsApp */}
        <button
          onClick={() => setShowForm(true)}
          className="flex flex-col items-center gap-1 group"
          aria-label="WhatsApp"
        >
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">WhatsApp</span>
        </button>

        <div className="h-10 w-px bg-gray-100" />

        {/* Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 group"
          aria-label="Cómo llegar"
        >
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <MapPin className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Ubicación</span>
        </a>
      </div>
    </>
  );
}
