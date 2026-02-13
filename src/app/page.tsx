'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal'; 
import { RsvpForm } from '@/components/RsvpForm';

// --- CONFIGURAÇÕES DO LOCAL (Sítio Lírio dos Vales) ---
const LOCATION = {
  lat: -22.6810774, // Coordenadas exatas do Sítio
  lng: -43.1574441,
  nickname: "Aniversário da Maithe (Sítio Lírio dos Vales)", // Nome que aparece no app
  address: "Av. Dr. Paulo Diniz Carneiro, 440 - Magé, RJ" // Endereço pra confirmar
};

// --- LINK MÁGICO DO UBER ---
// action=setPickup&pickup=my_location -> Pega a localização atual da pessoa
// dropoff[...] -> Define o destino exato da festa
const UBER_URL = `https://m.uber.com/ul/?action=setPickup&client_id=&pickup=my_location&dropoff[latitude]=${LOCATION.lat}&dropoff[longitude]=${LOCATION.lng}&dropoff[nickname]=${encodeURIComponent(LOCATION.nickname)}&dropoff[formatted_address]=${encodeURIComponent(LOCATION.address)}`;

export default function Home() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);

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

          {/* 2. Botão Uber (Agora com Destino Certo!) */}
          <a 
            href={UBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[30%] h-full opacity-0 cursor-pointer active:bg-white/20 transition rounded-full block"
            aria-label="Ir de Uber para o Sítio"
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

      {/* --- MODAL 2: PRESENTES --- */}
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