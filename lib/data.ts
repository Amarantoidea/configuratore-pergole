
export type SerieType = '145' | '175' | '200' | '220';
export type DimensioneType = '3x3' | '4x3' | '6x3' | '6x4';
export type ControlloType = 'manuale' | 'automatico' | 'automatico_zip';

export interface OpzioneAggiuntiva {
  id: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  unita: string;
  quantita?: number;
}

export const serie = [
  { id: '145', nome: 'Serie 145', descrizione: 'Leggera e funzionale' },
  { id: '175', nome: 'Serie 175', descrizione: 'Struttura intermedia' },
  { id: '200', nome: 'Serie 200', descrizione: 'Alta resistenza' },
  { id: '220', nome: 'Serie 220', descrizione: 'Top di gamma' },
];

export const dimensioni = [
  { id: '3x3', nome: '3x3 m', larghezza: 3, lunghezza: 3 },
  { id: '4x3', nome: '4x3 m', larghezza: 4, lunghezza: 3 },
  { id: '6x3', nome: '6x3 m', larghezza: 6, lunghezza: 3 },
  { id: '6x4', nome: '6x4 m', larghezza: 6, lunghezza: 4 },
];

export const tipiControllo = [
  { id: 'manuale', nome: 'Controllo Manuale', descrizione: 'Senza luci LED' },
  { id: 'automatico', nome: 'Controllo Automatico', descrizione: 'Con luci LED' },
  { id: 'automatico_zip', nome: 'Automatico con Schermi Zip', descrizione: 'Con luci LED e schermi' },
];

export const opzioniAggiuntive: OpzioneAggiuntiva[] = [
  { id: 'roller_blinds', nome: 'Tende a Rullo', descrizione: 'Controllo automatico', prezzo: 500, unita: 'pz' },
  { id: 'porte_vetro', nome: 'Porte in Vetro', descrizione: 'Con o senza telaio', prezzo: 1200, unita: 'pz' },
  { id: 'pareti_vetro', nome: 'Pareti in Vetro Fisse', descrizione: '', prezzo: 800, unita: 'pz' },
  { id: 'isolamento', nome: 'Isolamento Termico', descrizione: 'Schiuma isolante nelle lame', prezzo: 600, unita: 'pz' },
  { id: 'illuminazione_led', nome: 'Illuminazione LED', descrizione: 'Strisce LED', prezzo: 400, unita: 'pz' },
  { id: 'luci_rgb', nome: 'Luci RGB', descrizione: 'Colori personalizzabili', prezzo: 500, unita: 'pz' },
  { id: 'riscaldatori', nome: 'Riscaldatori', descrizione: '', prezzo: 700, unita: 'pz' },
  { id: 'sensori_meteo', nome: 'Sensori Meteo', descrizione: '', prezzo: 350, unita: 'pz' },
  { id: 'ventilatori', nome: 'Ventilatori con Luce', descrizione: '', prezzo: 450, unita: 'pz' },
  { id: 'pavimento_decking', nome: 'Pavimento in Decking', descrizione: '', prezzo: 1500, unita: 'mq' },
];

export function calcolaPrezzoFinale(
  serie: SerieType,
  dimensione: DimensioneType,
  controllo: ControlloType,
  opzioni: OpzioneAggiuntiva[]
): number {
  let prezzoBase = 5000;
  let prezzoOpzioni = opzioni.reduce((sum, opzione) => sum + (opzione.prezzo * (opzione.quantita || 1)), 0);
  return (prezzoBase + prezzoOpzioni) * 2.5;
}
