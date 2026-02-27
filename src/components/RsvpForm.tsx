'use client'

import { confirmPresence } from '@/app/actions';
// 1ª MUDANÇA: Tiramos os hooks daqui
import { useFormStatus } from 'react-dom';
// 2ª MUDANÇA: E colocamos o novo useActionState direto do 'react'
import { useActionState, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, User, Users, MessageCircle, ArrowRight, Calendar } from 'lucide-react';

// --- CONFIGURAÇÕES ---
const WHATSAPP_NUMBER = "5521997916447";
const WHATSAPP_MESSAGE = "Olá Adriano! Vi o convite digital da Maithe e achei incrível. Gostaria de fazer um orçamento para o meu evento!";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const generateGoogleCalendarLink = () => {
  const event = {
    title: "Aniversário de 1 Ano da Maithe 🦋",
    description: "Festa no Sítio Lírio dos Vales. Vai ser lindo!",
    location: "Sítio Lírio dos Vales de Mauá, Av. Dr. Paulo Diniz Carneiro, 440 - Magé, RJ", 
    startDate: "20260418T170000",
    endDate: "20260418T220000",
  };
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE", 
    text: event.title, 
    details: event.description, 
    location: event.location, 
    dates: `${event.startDate}/${event.endDate}`
  });
  return `${baseUrl}?${params.toString()}`;
};

// --- ESTILOS INLINE (Blindados contra erros) ---
const styles = {
  label: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#7e22ce', // Roxo escuro
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginLeft: '5px',
    marginBottom: '5px',
    display: 'block'
  },
  inputContainer: {
    position: 'relative' as const,
    marginBottom: '15px'
  },
  icon: {
    position: 'absolute' as const,
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#d8b4fe',
    pointerEvents: 'none' as const
  },
  input: {
    width: '100%',
    padding: '14px 14px 14px 45px',
    borderRadius: '20px',
    border: '1px solid #e9d5ff',
    backgroundColor: '#faf5ff',
    fontSize: '16px',
    color: '#4c1d95',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box' as const
  },
  selectArrow: {
    position: 'absolute' as const,
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a855f7',
    fontSize: '12px',
    pointerEvents: 'none' as const
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    border: '1px solid #f3e8ff',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(to right, #a855f7, #ec4899)',
    color: 'white',
    padding: '16px',
    borderRadius: '50px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '10px'
  },
  // Estilos da Área de Sucesso
  successCard: {
    textAlign: 'center' as const,
    padding: '10px',
    width: '100%'
  },
  adCard: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '2px dashed #d8b4fe', 
    position: 'relative' as const,
    overflow: 'hidden'
  },
  whatsappButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    backgroundColor: '#25D366',
    color: 'white',
    fontWeight: 'bold',
    padding: '12px',
    borderRadius: '12px',
    textDecoration: 'none',
    marginTop: '10px',
    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
  },
  agendaButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    backgroundColor: '#f3e8ff',
    color: '#6b21a8',
    fontWeight: 'bold',
    padding: '12px',
    borderRadius: '12px',
    textDecoration: 'none',
    marginBottom: '20px',
    border: '1px solid #d8b4fe'
  }
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} style={styles.submitButton}>
      {pending ? ( 
        <span>Enviando...</span> 
      ) : ( 
        <>Confirmar Presença <CheckCircle size={20} /></> 
      )}
    </button>
  );
}

export function RsvpForm({ onClose }: { onClose: () => void }) {
  // 3ª MUDANÇA: Substituí o useFormState por useActionState
  const [state, formAction] = useActionState(confirmPresence, null);
  const [showAgendaBtn, setShowAgendaBtn] = useState(false);

  useEffect(() => {
    if (state?.success) {
      // Confetes
      const scalar = 2;
      const unicorn = confetti.shapeFromText({ text: '🦋', scalar });
      confetti({ 
        particleCount: 40, spread: 100, origin: { y: 0.6 },
        shapes: [unicorn, 'circle'], colors: ['#d8b4fe', '#fce7f3'] 
      });
    }
  }, [state?.success]);

  // --- TELA DE SUCESSO ---
  if (state?.success) {
    return (
      <div style={styles.successCard}>
        
        {/* Ícone de Sucesso */}
        <div style={{ background: '#dcfce7', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>
          <CheckCircle size={30} color="#22c55e" />
        </div>
        
        <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b21a8', margin: '0 0 5px 0' }}>Presença Confirmada!</h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Nos vemos no Sítio! 🦋</p>

        {/* BOTÃO DA AGENDA (Agora o usuário clica SE quiser) */}
        {showAgendaBtn && (
            <a href={generateGoogleCalendarLink()} target="_blank" rel="noopener noreferrer" style={styles.agendaButton}>
                <Calendar size={18} /> Salvar na minha Agenda
            </a>
        )}

        {/* --- SUA ÁREA DE MARKETING --- */}
        <div style={styles.adCard}>
          <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '10px' }}>
            Gostou deste convite?
          </p>
          
          <p style={{ fontSize: '14px', color: '#1f2937', marginBottom: '4px', fontWeight: 'bold' }}>
            Desenvolvido por <span style={{ color: '#9333ea' }}>Adriano Santos</span> 👨‍💻
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '15px' }}>
            Solicite o seu convite digital exclusivo.
          </p>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={styles.whatsappButton}>
            <MessageCircle size={18} />
            Solicitar Orçamento
            <ArrowRight size={16} style={{ opacity: 0.8 }} />
          </a>
        </div>

        <button 
          onClick={onClose}
          style={{ marginTop: '20px', background: 'none', border: 'none', color: '#9ca3af', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Fechar e voltar
        </button>
      </div>
    );
  }

  // --- FORMULÁRIO ---
  return (
    <form action={formAction}>
      
      {/* NOME */}
      <div style={styles.inputContainer}>
        <label htmlFor="name" style={styles.label}>Seu Nome Completo</label>
        <div style={{ position: 'relative' }}>
          <div style={styles.icon}><User size={20} /></div>
          <input 
            type="text" name="name" id="name" required 
            placeholder="Ex: Dinda e Família" 
            style={styles.input} 
          />
        </div>
      </div>

      {/* PESSOAS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <div style={{ flex: '1', position: 'relative' }}>
          <label htmlFor="adultsCount" style={ styles.label }>Adultos</label>
          <div style={{ position: 'relative' }}>
            <div style={styles.icon}><User size={18} /></div>
            <select name="adultsCount" id="adultsCount" style={{...styles.input, paddingLeft: '40px', appearance: 'none', cursor: 'pointer'}}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (<option key={num} value={num}>{num}</option>))}
            </select>
            <div style={styles.selectArrow}>▼</div>
          </div>
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          <label htmlFor="childrenCount" style={styles.label}>Crianças</label>
          <div style={{ position: 'relative' }}>
            <div style={styles.icon}><Users size={18} /></div>
            <select name="childrenCount" id="childrenCount" style={{...styles.input, paddingLeft: '40px', appearance: 'none', cursor: 'pointer'}}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (<option key={num} value={num}>{num}</option>))}
            </select>
            <div style={styles.selectArrow}>▼</div>
          </div>
        </div>
      </div>

      
      {/* CHECKBOX AGENDA (Visualmente bonito) */}
      <label htmlFor="calendarCheck" style={styles.checkboxContainer}>
        <input 
          type="checkbox" 
          id="calendarCheck" 
          checked={showAgendaBtn} 
          onChange={(e) => setShowAgendaBtn(e.target.checked)}
          style={{ width: '20px', height: '20px', accentColor: '#a855f7' }}
        />
        <div style={{ textAlign: 'left' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#4c1d95', display: 'block' }}>Salvar na Agenda?</span>
          <span style={{ fontSize: '11px', color: '#9333ea' }}>Vou te lembrar no final pra salvar</span>
        </div>
      </label>

      {state?.message && !state.success && (
        <div style={{ padding: '10px', background: '#fef2f2', color: '#ef4444', borderRadius: '10px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', border: '1px solid #fecaca' }}>
          ⚠️ {state.message}
        </div>
      )}
      
      <SubmitButton />
    </form>
  );
}