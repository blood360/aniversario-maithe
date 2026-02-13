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
        <>
          {/* Fundo Escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Wrapper de Centralização */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            
            {/* O Modal em Si */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className={`bg-white max-w-md shadow-2xl pointer-events-auto overflow-hidden ring-4 ring-purple-100 relative rounded-[2rem] ${
                noPadding ? "w-[95%] h-auto" : "w-[90%]"
              }`}
            >
              
              {/* Lógica do Cabeçalho */}
              {noPadding ? (
                // Botão Flutuante (Modo Foto)
                <button 
                  onClick={onClose} 
                  className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 backdrop-blur-md transition"
                >
                  <X className="w-6 h-6" />
                </button>
              ) : (
                // Cabeçalho Normal (Modo Texto)
                <div className="bg-purple-50 p-4 border-b border-purple-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-purple-600 pl-2 font-serif">
                    {title || <span>&nbsp;</span>}
                  </h3>
                  <button 
                    onClick={onClose} 
                    className="bg-white p-2 rounded-full text-purple-400 hover:text-purple-600 hover:bg-purple-100 transition shadow-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Lógica do Padding */}
              <div className={noPadding ? "p-0" : "p-6"}>
                {children}
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}