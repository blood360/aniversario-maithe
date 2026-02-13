'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal'; 
import { RsvpForm } from '@/components/RsvpForm';
import { Car, MapPin } from 'lucide-react'; // Ícones para o menu de transporte

// --- CONFIGURAÇÕES DO LOCAL (Sítio Lírio dos Vales) ---
const LOCATION = {
  lat: -22.6810774,
  lng: -43.1574441,
  nickname: "Aniversário da Maithe (Sítio Lírio dos Vales)",
  address: "Av. Dr. Paulo Diniz Carneiro, 440 - Magé, RJ"
};

// --- LINKS DE TRANSPORTE ---
const UBER_URL = `https://m.uber.com/ul/?action=setPickup&client_id=&pickup=my_location&dropoff[latitude]=${LOCATION.lat}&dropoff[longitude]=${LOCATION.lng}&dropoff[nickname]=${encodeURIComponent(LOCATION.nickname)}&dropoff[formatted_address]=${encodeURIComponent(LOCATION.address)}`;
const NINETY_NINE_URL = `https://99app.com/ul/?action=setPickup&dropoff[latitude]=${LOCATION.lat}&dropoff[longitude]=${LOCATION.lng}`;

export default function Home() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false); // Novo modal para Uber/99

  return (
    <main className="fixed inset-0 w-full h-[100dvh] bg-zinc-900 flex items-center justify-center overflow-hidden">
      
      {/* --- CARTÃO DO CONVITE --- */}
      <div className="relative h-full max-h-[100dvh] aspect-[9/16] w-auto shadow-2xl overflow-hidden bg-white">
        
        {/* Imagem de Fundo */}
        <Image 
          src="/images/convite-main.jpg" 
          alt="Convite de 1 Ano da Maithe"
          fill
          className="object-fill"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* --- ÁREA DE BOTÕES INVISÍVEIS --- */}
        <div className="absolute bottom-[28%] left-[8%] right-[8%] h-[15%] flex justify-between z-10">
          
          {/* 1. Botão Confirmar Presença */}
          <button 
            onClick={() => setIsRsvpOpen(true)}
            className="w-[30%] h-full opacity-0 cursor-pointer active:bg-white/20 transition rounded-full"
            aria-label="Confirmar Presença"
          />

          {/* 2. NOVO: Botão de Transporte (Uber/99) */}
          <button 
            onClick={() => setIsTransportOpen(true)}
            className="w-[30%] h-full opacity-0 cursor-pointer active:bg-white/20 transition rounded-full"
            aria-label="Escolher transporte para o Sítio"
          />

          {/* 3. Botão Presentes */}
          <button 
            onClick={() => setIsGiftsOpen(true)}
            className="w-[30%] h-full opacity-0 cursor-pointer active:bg-white/20 transition rounded-full"
            aria-label="Ver Sugestão de Presentes"
          />
        </div>
      </div>

      {/* --- MODAL 1: CONFIRMAR PRESENÇA --- */}
      <Modal 
        isOpen={isRsvpOpen} 
        onClose={() => setIsRsvpOpen(false)} 
        title="Confirmar Presença 🥳"
      >
        <RsvpForm onClose={() => setIsRsvpOpen(false)} />
      </Modal>

      {/* --- MODAL 2: ESCOLHER TRANSPORTE (UBER OU 99) --- */}
      <Modal
        isOpen={isTransportOpen}
        onClose={() => setIsTransportOpen(false)}
        title="Como deseja ir? 🚗"
      >
        <div className="flex flex-col gap-4 py-2">
          <p className="text-sm text-gray-500 text-center mb-2">Selecione seu aplicativo de transporte preferido:</p>
          
          {/* Botão Uber */}
          <a 
            href={UBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-black text-white p-4 rounded-2xl shadow-md active:scale-95 transition-transform"
          >
            <span className="font-bold text-lg">Uber</span>
            <Car size={24} />
          </a>

          {/* Botão 99 */}
          <a 
            href={NINETY_NINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-[#FFD500] text-black p-4 rounded-2xl shadow-md active:scale-95 transition-transform"
          >
            <span className="font-bold text-lg">99App</span>
            <div className="bg-black text-[#FFD500] px-2 py-1 rounded font-black text-xs">99</div>
          </a>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 text-center uppercase font-bold">Destino Selecionado:</p>
            <p className="text-xs text-purple-600 text-center font-medium mt-1">Sítio Lírio dos Vales - Magé, RJ</p>
          </div>
        </div>
      </Modal>

      {/* --- MODAL 3: PRESENTES --- */}
      <Modal 
        isOpen={isGiftsOpen} 
        onClose={() => setIsGiftsOpen(false)} 
        noPadding={true} 
      >
        <Image 
          src="/images/sugestao-presentes.jpg" 
          alt="Sugestão de Presentes"
          width={600} 
          height={1000}
          className="w-full h-auto object-contain max-h-[85vh]"
          priority
        />
      </Modal>

    </main>
  );
}