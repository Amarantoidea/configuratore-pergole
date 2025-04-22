
'use client';

import { useState, useEffect } from 'react';
import { 
  serie, 
  dimensioni, 
  tipiControllo, 
  opzioniAggiuntive,
  calcolaPrezzoFinale,
  SerieType,
  DimensioneType,
  ControlloType,
  OpzioneAggiuntiva
} from '../../lib/data';

export default function ConfiguratoreForm() {
  const [serieSelezionata, setSerieSelezionata] = useState<SerieType>('145');
  const [dimensioneSelezionata, setDimensioneSelezionata] = useState<DimensioneType>('3x3');
  const [controlloSelezionato, setControlloSelezionato] = useState<ControlloType>('manuale');
  const [opzioniSelezionate, setOpzioniSelezionate] = useState<OpzioneAggiuntiva[]>([]);
  const [prezzoFinale, setPrezzoFinale] = useState<number>(0);

  useEffect(() => {
    const prezzo = calcolaPrezzoFinale(
      serieSelezionata,
      dimensioneSelezionata,
      controlloSelezionato,
      opzioniSelezionate
    );
    setPrezzoFinale(prezzo);
  }, [serieSelezionata, dimensioneSelezionata, controlloSelezionato, opzioniSelezionate]);

  const handleOpzioneChange = (opzione: OpzioneAggiuntiva, checked: boolean) => {
    if (checked) {
      setOpzioniSelezionate([...opzioniSelezionate, { ...opzione, quantita: 1 }]);
    } else {
      setOpzioniSelezionate(opzioniSelezionate.filter(op => op.id !== opzione.id));
    }
  };

  const handleQuantitaChange = (id: string, quantita: number) => {
    setOpzioniSelezionate(
      opzioniSelezionate.map(op => 
        op.id === id ? { ...op, quantita } : op
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configurazione completata! Prezzo finale: €' + prezzoFinale.toFixed(2));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Configuratore Pergole Bioclimatiche</h2>
      {/* Qui andrebbe il resto del form */}
    </div>
  );
}
