export default function CrystalTextArea({ value, onChange, placeholder }) {
  return (
    <div
      className="w-[500px] mt-4 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md 
                 border border-cyan-400/20 shadow-[0_0_15px_rgba(50,224,220,0.15)]
                 focus-within:border-cyan-400/50 transition-all duration-200"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search results will appear here."}
        className="w-full h-48 bg-transparent outline-none text-cyan-100 placeholder-cyan-300/50 
                   font-mono text-sm resize-none scrollbar-thin scrollbar-thumb-cyan-500/60 scrollbar-track-transparent"
      />
    </div>
  );
}