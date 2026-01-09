import React, { useState, useEffect } from 'react';
import { ShieldCheck, Camera, Sparkles, Check, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center px-10 text-espresso overflow-hidden max-w-md mx-auto border-x-4 border-espresso">
      {step === 1 && (
        <div className="animate-in slide-in-from-right duration-500 text-center w-full">
          <div className="w-20 h-20 bg-blush border-2 border-espresso rounded-3xl mx-auto mb-10 flex items-center justify-center rotate-6 shadow-[4px_4px_0px_var(--espresso)]">
            <ShieldCheck size={40} />
          </div>
          <h2 className="unbounded text-4xl font-black uppercase italic leading-[0.9] mb-8">Espaço <br/> Seguro.</h2>
          <p className="font-bold text-lg mb-12 opacity-60">Para garantir a vibe da comunidade, precisamos certificar que você é... você!</p>
          <div className="space-y-4 bg-white border-2 border-espresso p-6 rounded-[2rem] text-left mb-12 shadow-[4px_4px_0px_var(--espresso)]">
            <div className="flex gap-3 items-center">
              <Check size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase">Apenas Mulheres</span>
            </div>
            <div className="flex gap-3 items-center">
              <Check size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase">Perfis Verificados</span>
            </div>
            <div className="flex gap-3 items-center">
              <Check size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase">Tolerância Zero</span>
            </div>
          </div>
          <button 
            onClick={() => setStep(2)}
            className="w-full btn-hard bg-espresso text-butter py-6 rounded-full font-black text-xs uppercase tracking-widest"
          >
            VAMOS LÁ
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in slide-in-from-right duration-500 text-center w-full">
          <h2 className="unbounded text-3xl font-black uppercase italic mb-12">Selfie de <br/> Vibe.</h2>
          
          <div className="relative w-64 h-64 mx-auto mb-12">
            <div className="absolute inset-0 border-4 border-espresso rounded-[4rem] overflow-hidden bg-espresso/5 flex items-center justify-center">
              {!isScanning && !scanComplete && <Camera size={48} className="opacity-20" />}
              {(isScanning || scanComplete) && (
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover" 
                />
              )}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-400/20">
                  <div className="w-full h-1 bg-emerald-400 absolute top-0 animate-[scan_3s_linear_infinite]"></div>
                </div>
              )}
              {scanComplete && (
                <div className="absolute inset-0 bg-emerald-400/20 flex items-center justify-center">
                   <div className="bg-white border-2 border-espresso p-4 rounded-full">
                      <Check size={32} className="text-emerald-500" />
                   </div>
                </div>
              )}
            </div>
            {/* Radar Decoration */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-butter border-2 border-espresso rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_var(--espresso)] rotate-12">
               <Sparkles size={20} />
            </div>
          </div>

          {!scanComplete ? (
            <button 
              onClick={startScan}
              disabled={isScanning}
              className="w-full btn-hard bg-espresso text-butter py-6 rounded-full font-black text-xs uppercase tracking-widest disabled:opacity-50"
            >
              {isScanning ? 'ESCANEANDO...' : 'POSAR PARA SCAN'}
            </button>
          ) : (
            <div className="space-y-6">
              <p className="unbounded text-[10px] font-black uppercase text-emerald-500">Vibe Certificada!</p>
              <button 
                onClick={() => setStep(3)}
                className="w-full btn-hard bg-espresso text-butter py-6 rounded-full font-black text-xs uppercase tracking-widest"
              >
                CONTINUAR <ArrowRight size={16} className="inline ml-2" />
              </button>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="animate-in slide-in-from-right duration-500 text-center w-full">
          <h2 className="unbounded text-3xl font-black uppercase italic mb-8">Seus <br/> Rituais.</h2>
          <p className="font-bold text-sm opacity-60 mb-10">O que faz seu coração bater mais forte?</p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {['Vinhos', 'Cine Cult', 'Brunch', 'Livros', 'Art', 'Martinis', 'Natureza', 'Cerâmica'].map(tag => (
              <button key={tag} className="sticker bg-white hover:bg-butter transition-colors">
                {tag}
              </button>
            ))}
          </div>

          <button 
            onClick={onComplete}
            className="w-full btn-hard bg-espresso text-butter py-6 rounded-full font-black text-xs uppercase tracking-widest"
          >
            ENTRAR NO ORA
          </button>
        </div>
      )}

      <style>{`
        @keyframes scan {
          from { top: 0; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
