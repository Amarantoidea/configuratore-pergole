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
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Selezione Serie */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">1. Seleziona la Serie</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serie.map((s) => (
              <div 
                key={s.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  serieSelezionata === s.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSerieSelezionata(s.id as SerieType)}
              >
                <h4 className="font-bold">{s.nome}</h4>
                <p className="text-sm text-gray-600">{s.descrizione}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selezione Dimensioni */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">2. Seleziona le Dimensioni</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dimensioni.map((d) => (
              <div 
                key={d.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  dimensioneSelezionata === d.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setDimensioneSelezionata(d.id as DimensioneType)}
              >
                <h4 className="font-bold">{d.nome}</h4>
                <p className="text-sm text-gray-600">L: {d.larghezza}m × W: {d.lunghezza}m</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selezione Tipo di Controllo */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">3. Seleziona il Tipo di Controllo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tipiControllo.map((t) => (
              <div 
                key={t.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  controlloSelezionato === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setControlloSelezionato(t.id as ControlloType)}
              >
                <h4 className="font-bold">{t.nome}</h4>
                <p className="text-sm text-gray-600">{t.descrizione}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selezione Opzioni Aggiuntive */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">4. Seleziona Opzioni Aggiuntive (Opzionale)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opzioniAggiuntive.map((opzione) => {
              const isSelected = opzioniSelezionate.some(op => op.id === opzione.id);
              const selectedOpzione = opzioniSelezionate.find(op => op.id === opzione.id);
              
              return (
                <div key={opzione.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id={opzione.id}
                      checked={isSelected}
                      onChange={(e) => handleOpzioneChange(opzione, e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor={opzione.id} className="font-semibold cursor-pointer">
                        {opzione.nome}
                      </label>
                      <p className="text-sm text-gray-600">{opzione.descrizione}</p>
                      <p className="text-sm font-medium">
                        €{(opzione.prezzo * 2.5).toFixed(2)} / {opzione.unita}
                      </p>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-3 pl-7">
                      <label className="block text-sm font-medium text-gray-700">Quantità:</label>
                      <input
                        type="number"
                        min="1"
                        value={selectedOpzione?.quantita || 1}
                        onChange={(e) => handleQuantitaChange(opzione.id, parseInt(e.target.value) || 1)}
                        className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Riepilogo e Prezzo */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Riepilogo</h3>
          
          <div className="space-y-2 mb-4">
            <p><span className="font-medium">Serie:</span> {serie.find(s => s.id === serieSelezionata)?.nome}</p>
            <p><span className="font-medium">Dimensioni:</span> {dimensioni.find(d => d.id === dimensioneSelezionata)?.nome}</p>
            <p><span className="font-medium">Controllo:</span> {tipiControllo.find(t => t.id === controlloSelezionato)?.nome}</p>
            {opzioniSelezionate.length > 0 && (
              <div>
                <p className="font-medium">Opzioni Aggiuntive:</p>
                <ul className="list-disc pl-5">
                  {opzioniSelezionate.map((op) => (
                    <li key={op.id}>
                      {op.nome} × {op.quantita || 1} ({op.unita})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="text-2xl font-bold text-right">
            Prezzo Totale: €{prezzoFinale.toFixed(2)}
          </div>
        </div>

        {/* Pulsante di invio */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Richiedi Preventivo
          </button>
        </div>

      </form>
    </div>
  );
}
