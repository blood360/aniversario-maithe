'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  noPadding?: boolean;
}

export function Modal({ isOpen, onClose, children, title, noPadding = false }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Fundo Escuro com Z-Index alto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* O Modal em Si - Garantindo que seja clicável */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`bg-white shadow-2xl relative z-[1000] overflow-hidden pointer-events-auto ${
              noPadding 
                ? "w-full max-w-[360px] rounded-[2.5rem]" 
                : "w-[95%] max-w-md rounded-[2rem] ring-4 ring-purple-100"
            }`}
          >
            
            {/* Botão de Fechar Unificado */}
            <button 
              onClick={onClose} 
              className={`absolute z-[1010] p-2 rounded-full transition-all active:scale-90 shadow-md ${
                noPadding 
                  ? "top-4 right-4 bg-white/90 text-purple-900" 
                  : "top-4 right-4 bg-purple-100 text-purple-600"
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho apenas se NÃO for noPadding */}
            {!noPadding && title && (
              <div className="bg-purple-50 p-5 border-b border-purple-100">
                <h3 className="text-xl font-bold text-purple-700 font-serif pr-10">
                  {title}
                </h3>
              </div>
            )}

            {/* Conteúdo */}
            <div className={`${noPadding ? "p-0" : "p-6"}`}>
              {children}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}