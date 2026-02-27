'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal'; 
import { RsvpForm } from '@/components/RsvpForm';
import { Car, MapPin } from 'lucide-react'; // <-- Adicionei só o ícone do mapa aqui

const LOCATION = {
  lat: -22.6810774,
  lng: -43.1574441,
  nickname: "Aniversário da Maithe (Sítio Lírio dos Vales)",
  address: "Av. Dr. Paulo Diniz Carneiro, 440 - Magé, RJ"
};

const UBER_URL = `https://m.uber.com/ul/?action=setPickup&client_id=&pickup=my_location&dropoff[latitude]=${LOCATION.lat}&dropoff[longitude]=${LOCATION.lng}&dropoff[nickname]=${encodeURIComponent(LOCATION.nickname)}&dropoff[formatted_address]=${encodeURIComponent(LOCATION.address)}`;
const NINETY_NINE_URL = `https://99app.com/ul/?action=setPickup&dropoff[latitude]=${LOCATION.lat}&dropoff[longitude]=${LOCATION.lng}`;
const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}`; // <-- Rota do Maps

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
        />

        {/* --- ÁREA DE BOTÕES COM A TRAVA DE CLIQUE --- */}
        <div className="absolute bottom-[23%] left-[19%] right-[7%] h-[12%] flex gap-4 z-[999] pointer-events-auto">
          
          <button 
            type="button"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              setIsRsvpOpen(true); 
            }}
            className="flex-1 h-full opacity-0 cursor-pointer"
          />

          <button 
            type="button"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              setIsTransportOpen(true); 
            }}
            className="flex-1 h-full opacity-0 cursor-pointer"
          />

          <button 
            type="button"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              setIsGiftsOpen(true); 
            }}
            className="flex-1 h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* --- MODAIS --- */}
      <Modal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)}>
        {/* Adicionei boxSizing e overflow pra segurar o campo e não cortar */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
          
          {/* NOSSO TÍTULO PADRÃO FIFA: Longe do X, centralizado e roxinho */}
          <h2 style={{ textAlign: 'center', color: '#4c1d95', fontSize: '22px', fontWeight: '900', marginTop: '5px', marginBottom: '20px' }}>
            Confirmar Presença 🥳
          </h2>

          <RsvpForm onClose={() => setIsRsvpOpen(false)} />
        </div>
      </Modal>

      <Modal isOpen={isGiftsOpen} onClose={() => setIsGiftsOpen(false)} noPadding={true}>
        <Image src="/images/sugestao-presentes.jpg" alt="Presentes" width={600} height={1000} className="w-full h-auto object-contain max-h-[85vh]" priority />
      </Modal>

      {/* --- MODAL DO TRANSPORTE COM O MAPS ADICIONADO --- */}
      <Modal isOpen={isTransportOpen} onClose={() => setIsTransportOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', backgroundColor: 'white', borderRadius: '16px', boxSizing: 'border-box' }}>
          
          {/* NOSSO TÍTULO PADRÃO FIFA: Longe do X e arrumadinho */}
          <h2 style={{ textAlign: 'center', color: '#4c1d95', fontSize: '22px', fontWeight: '900', marginTop: '5px', marginBottom: '5px' }}>
            Como deseja ir? 🚗
          </h2>

          <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', margin: 0, marginBottom: '10px' }}>
            Selecione seu aplicativo preferido:
          </p>
          
          {/* Botão Uber */}
          <a href={UBER_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#000', color: '#fff', padding: '16px 20px', borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
            <span>Uber</span>
            <Car size={24} color="white" />
          </a>

          {/* Botão 99 */}
          <a href={NINETY_NINE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFD500', color: '#000', padding: '16px 20px', borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 10px rgba(255, 213, 0, 0.3)' }}>
            <span>99App</span>
            <div style={{ backgroundColor: '#000', color: '#FFD500', padding: '2px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: '900' }}>99</div>
          </a>

          {/* Botão Google Maps */}
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#4285F4', color: '#fff', padding: '16px 20px', borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)' }}>
            <span>Google Maps</span>
            <MapPin size={24} color="white" />
          </a>

          <div style={{ marginTop: '10px', paddingTop: '15px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 'bold', margin: 0 }}>Destino Selecionado:</p>
            <p style={{ fontSize: '12px', color: '#9333ea', fontWeight: '600', marginTop: '4px' }}>Sítio Lírio dos Vales - Magé, RJ</p>
          </div>

        </div>
      </Modal>

    </main>
  );
}