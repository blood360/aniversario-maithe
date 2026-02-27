'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal'; 
import { RsvpForm } from '@/components/RsvpForm';
import { Car } from 'lucide-react';

const LOCATION = {
  lat: -22.6810774,
  lng: -43.1574441,
  nickname: "Aniversário da Maithe (Sítio Lírio dos Vales)",
  address: "Av. Dr. Paulo Diniz Carneiro, 440 - Magé, RJ"
};

const UBER_URL = `https://m.uber.com/ul/?action=setPickup&client_id=&pickup=my_location&dropoff[latitude]=${LOCATION.lat}&dropoff[longitude]=${LOCATION.lng}&dropoff[nickname]=${encodeURIComponent(LOCATION.nickname)}&dropoff[formatted_address]=${encodeURIComponent(LOCATION.address)}`;
const NINETY_NINE_URL = `https://99app.com/ul/?action=setPickup&dropoff[latitude]=${LOCATION.lat}&dropoff[longitude]=${LOCATION.lng}`;

export default function Home() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);

  return (
    <main className="fixed inset-0 w-full h-[100dvh] bg-zinc-900 flex items-center justify-center overflow-hidden">
      
      <div className="relative h-full max-h-[100dvh] aspect-[9/16] w-auto shadow-2xl overflow-hidden bg-white">
        
        <Image 
          src="/images/convite-main.jpg" 
          alt="Convite da Maithe"
          fill
          className="object-fill"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* ÁREA DE BOTÕES - Usei bottom-[15%] conforme a foto que você mandou */}
        <div className="absolute bottom-[23%] left-[19%] right-[7%] h-[12%] flex gap-4 z-50 pointer-events-auto">
          
          <button 
            type="button"
            onClick={() => setIsRsvpOpen(true)}
            className="flex-1 h-full opacity-0 cursor-pointer active:bg-purple-500/10"
          />

          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsTransportOpen(true);
            }}
            className="flex-1 h-full opacity-0 cursor-pointer active:bg-blue-500/10"
          />

          <button 
            type="button"
            onClick={() => setIsGiftsOpen(true)}
            className="flex-1 h-full opacity-0 cursor-pointer active:bg-green-500/10"
          />
        </div>
      </div>

      {/* --- MODAIS (IMPORTANTE: O DE TRANSPORTE FICOU POR ÚLTIMO PARA PRIORIDADE) --- */}

      <Modal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} title="Confirmar Presença 🥳">
        <RsvpForm onClose={() => setIsRsvpOpen(false)} />
      </Modal>

      <Modal isOpen={isGiftsOpen} onClose={() => setIsGiftsOpen(false)} noPadding={true}>
        <Image src="/images/sugestao-presentes.jpg" alt="Presentes" width={600} height={1000} className="w-full h-auto object-contain max-h-[85vh]" priority />
      </Modal>

      {/* MODAL DE TRANSPORTE - Colocado por último no DOM */}
      <Modal isOpen={isTransportOpen} onClose={() => setIsTransportOpen(false)} noPadding={true}>
        <div className="relative w-full overflow-hidden bg-white" style={{ height: '580px', minWidth: '300px' }}>
          <Image 
            src="/images/uber.jpg" 
            alt="Transporte" 
            fill 
            className="object-cover" 
            priority 
            sizes="360px"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-white/95 via-transparent to-transparent">
            <div className="mt-8 self-center bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-purple-100">
              <h3 className="text-lg font-bold text-purple-900 italic">Como deseja ir? 🚗</h3>
            </div>
            <div className="flex flex-col gap-3 mb-4 w-full">
              <a href={UBER_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-black text-white p-4 rounded-2xl shadow-xl active:scale-95 transition-transform">
                <span className="font-bold text-lg text-white">Uber</span>
                <Car size={24} color="white" />
              </a>
              <a href={NINETY_NINE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#FFD500] text-black p-4 rounded-2xl shadow-xl active:scale-95 transition-transform">
                <span className="font-bold text-lg text-black">99App</span>
                <div className="bg-black text-[#FFD500] px-2 py-0.5 rounded font-black text-xs text-center">99</div>
              </a>
              <button onClick={() => setIsTransportOpen(false)} className="text-purple-900/40 text-[10px] font-bold uppercase tracking-widest mt-2 py-2">
                — Voltar ao Convite —
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </main>
  );
}