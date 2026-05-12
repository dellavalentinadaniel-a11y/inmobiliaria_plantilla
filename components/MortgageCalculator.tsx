import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, DollarSign, Percent, Calendar, ArrowRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const MortgageCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    } else if (principal > 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      setMonthlyPayment(0);
    }
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  return (
    <section className="py-24 bg-white overflow-hidden" id="calculator">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            {/* Left side: Content */}
            <div className="md:w-1/2">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-full mb-6">
                <CalcIcon className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Herramientas Financieras</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                Calculá tu cuota mensual de forma <span className="text-red-600">instantánea</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                Usá nuestra calculadora para tener una idea clara de tu inversión. Ajustá los valores según tu perfil financiero y encontrá el plan que mejor se adapte a tus necesidades.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Asesoramiento Personalizado</h4>
                    <p className="text-sm text-gray-500">Contactanos para obtener una tasa preferencial a través de nuestros convenios bancarios.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Calculator Card */}
            <div className="md:w-1/2 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200 text-white relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                
                <div className="relative z-10 space-y-8">
                  {/* Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Valor Propiedad (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                        <input 
                          type="number" 
                          value={propertyPrice} 
                          onChange={(e) => setPropertyPrice(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 font-bold focus:bg-white/10 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Pago Inicial (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                        <input 
                          type="number" 
                          value={downPayment} 
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 font-bold focus:bg-white/10 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Tasa Interés (%)</label>
                      <div className="relative">
                        <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                        <input 
                          type="number" 
                          step="0.1"
                          value={interestRate} 
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 font-bold focus:bg-white/10 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Plazo (Años)</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                        <input 
                          type="number" 
                          value={loanTerm} 
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 font-bold focus:bg-white/10 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-center">
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-2">Cuota Mensual Estimada</p>
                    <div className="flex items-center justify-center text-5xl md:text-6xl font-black text-red-500 tracking-tighter">
                      <span className="text-2xl mr-2 text-white/50">$</span>
                      {monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">Capital a financiar: ${(propertyPrice - downPayment).toLocaleString()}</p>
                  </div>

                  <button className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-900/40 hover:bg-red-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-sm flex items-center justify-center space-x-3">
                    <span>Solicitar Pre-Aprobación</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
