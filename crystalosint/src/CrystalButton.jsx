export default function CrystalButton({ children, onClick, icon, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-4 w-[500px] px-6 py-3 rounded-xl 
                 bg-gradient-to-r from-[#32E0DC] via-[#1ACDD9] to-[#32E0DC] 
                 text-white font-semibold text-lg flex items-center justify-center 
                 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(50,224,220,0.3)]
                 hover:shadow-[0_0_25px_rgba(50,224,220,0.7)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                 transition-all duration-200"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}