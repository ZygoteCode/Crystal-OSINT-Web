import { useState, useRef, useEffect } from "react";
import {
  Search,
  Shield,
  Globe,
  Database,
  Bug,
  Camera,
  Lock,
} from "lucide-react";

const items = [
  { id: 1, icon: <Shield className="w-6 h-6 text-cyan-400" />, title: "Threat Intelligence", description: "Analizza e correla fonti OSINT per individuare minacce." },
  { id: 2, icon: <Globe className="w-6 h-6 text-cyan-400" />, title: "Domain Scanner", description: "Scansiona domini, IP e subdomain con precisione cristallina." },
  { id: 3, icon: <Database className="w-6 h-6 text-cyan-400" />, title: "Data Enrichment", description: "Arricchisci i risultati con metadati e correlazioni avanzate." },
  { id: 4, icon: <Bug className="w-6 h-6 text-cyan-400" />, title: "Malware Tracker", description: "Traccia indicatori di compromissione provenienti da OSINT." },
  { id: 5, icon: <Camera className="w-6 h-6 text-cyan-400" />, title: "Image Intelligence", description: "Analizza metadati e reverse search su immagini." },
  { id: 6, icon: <Lock className="w-6 h-6 text-cyan-400" />, title: "Leak Monitor", description: "Monitora fughe di dati pubbliche e dark web." },
];

// funzione highlight dei match
const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-cyan-300 font-semibold drop-shadow-[0_0_6px_rgba(50,224,220,0.8)]">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default function CrystalComboBox({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
    setQuery("");
    if (onSelect) onSelect(item);
  };

  // click fuori chiude il dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // autofocus input ricerca interno quando si apre
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative w-[500px] font-sans" ref={dropdownRef}>
      {/* Bottone principale */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl 
                   bg-white/5 backdrop-blur-md border border-cyan-400/20 
                   hover:border-cyan-400/50 text-cyan-100 shadow-[0_0_15px_rgba(50,224,220,0.15)] 
                   transition-all duration-200"
      >
        <span className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-cyan-400" />
          <span>{selected ? selected.title : "Select a OSINT module"}</span>
        </span>
        <span className="text-cyan-400">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-[#0E1212]/95 backdrop-blur-xl 
                        border border-cyan-300/20 rounded-2xl shadow-[0_0_25px_rgba(50,224,220,0.2)] 
                        overflow-hidden animate-fadeIn">
          {/* input di ricerca interno */}
          <div className="flex items-center px-4 py-2 border-b border-cyan-300/10">
            <Search className="w-4 h-4 text-cyan-400 mr-2" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cerca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-cyan-100 placeholder-cyan-300/50"
            />
          </div>

          {/* lista scrollabile */}
          <div className="max-h-64 overflow-y-auto divide-y divide-cyan-300/10 
                          scrollbar-thin scrollbar-thumb-cyan-500/60 scrollbar-track-transparent">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-start p-4 space-x-3 hover:bg-cyan-400/10 
                             cursor-pointer transition-colors duration-150"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-cyan-100 font-semibold leading-tight">
                      {highlightMatch(item.title, query)}
                    </span>
                    <span className="text-sm text-cyan-200/70 leading-snug">
                      {highlightMatch(item.description, query)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-cyan-300/60 text-sm">No results found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}