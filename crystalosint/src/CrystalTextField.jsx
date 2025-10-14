export default function CrystalTextField({
  selected,
  value,
  onChange,
  onEnter,
  disabled = false,
  error = false,
  errorMessage = "",
}) {
  const placeholderMap = {
    "Threat Intelligence": "Inserisci l’indicatore di minaccia...",
    "Domain Scanner": "Inserisci dominio o IP...",
    "Data Enrichment": "Inserisci identificatore o hash...",
    "Malware Tracker": "Inserisci Malware ID...",
    "Image Intelligence": "Inserisci URL immagine o file hash...",
    "Leak Monitor": "Inserisci keyword o email da monitorare...",
  };

  const placeholder =
    placeholderMap[selected?.title] || "Select an OSINT module first";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && typeof onEnter === "function") {
      onEnter();
    }
  };

  return (
    <div className="w-[500px] mt-4">
      <div
        className={`flex items-center px-4 py-3 rounded-xl 
          bg-white/5 backdrop-blur-md border 
          ${
            error
              ? "border-red-500/60 hover:border-red-400/80 shadow-[0_0_10px_rgba(255,80,80,0.25)]"
              : "border-cyan-400/20 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(50,224,220,0.15)]"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "transition-all duration-200"}
        `}
      >
        <div className="mr-3">
          {selected?.icon ? (
            selected.icon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ${
                error
                  ? "text-red-400 opacity-80"
                  : "text-cyan-400 opacity-70"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`bg-transparent flex-1 outline-none text-cyan-100 placeholder-cyan-300/50 
            focus:placeholder-cyan-200/70 transition-all duration-200
            ${disabled ? "cursor-not-allowed" : ""}
          `}
        />
      </div>

      {/* Messaggio d'errore */}
      {error && errorMessage && (
        <p className="text-red-400 text-sm mt-2 text-center animate-fadeIn">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
