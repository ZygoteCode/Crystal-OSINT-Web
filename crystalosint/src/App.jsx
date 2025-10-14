import { useState, useEffect } from "react";
import { Zap, AlertCircle, Eye, PieChart, Puzzle } from "lucide-react";
import CrystalComboBox from "./CrystalComboBox";
import CrystalTextField from "./CrystalTextField";
import CrystalTextArea from "./CrystalTextArea";
import CrystalButton from "./CrystalButton";
import { useAlerts } from "./CrystalAlertSystem";

export default function LandingPageApp() {
  const [selected, setSelected] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [results, setResults] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { addAlert } = useAlerts();

  // Effetto parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🔹 Validazione in base al modulo OSINT selezionato
  const validateInput = (value) => {
    if (!selected) return false;

    let regex, message;
    switch (selected.title) {
      case "Leak Monitor":
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        message = "Please enter a valid email address.";
        break;
      case "Domain Scanner":
        regex =
          /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|^(?:\d{1,3}\.){3}\d{1,3}$/;
        message = "Please enter a valid domain or IP address.";
        break;
      case "Malware Tracker":
        regex = /^[A-Fa-f0-9]{16,64}$/;
        message = "Please enter a valid malware hash or ID.";
        break;
      case "Image Intelligence":
        regex =
          /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;
        message = "Please enter a valid image URL.";
        break;
      default:
        return true;
    }

    const valid = regex.test(value);
    setIsValid(valid);
    setErrorMessage(valid ? "" : message);
    return valid;
  };

  // 🔹 Azione del bottone
  const handleButtonClick = () => {
    if (!selected) {
      addAlert(
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-cyan-400 mt-1" />
          <div className="flex flex-col">
            <span className="font-bold text-cyan-100 text-sm">Selection required</span>
            <span className="text-cyan-200/70 text-xs">
              Please select an OSINT module before executing a query.
            </span>
          </div>
        </div>
      );
      return;
    }

    if (!isValid || !textValue.trim()) {
      addAlert(
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-red-400 mt-1" />
          <div className="flex flex-col">
            <span className="font-bold text-red-300 text-sm">Invalid input</span>
            <span className="text-red-200/70 text-xs">
              {errorMessage || "Please fix your query before continuing."}
            </span>
          </div>
        </div>
      );
      return;
    }

    // Loading simulato
    setIsLoading(true);
    setResults("");
    setTimeout(() => {
      setIsLoading(false);
      const fakeResults = {
        module: selected.title,
        query: textValue,
        timestamp: new Date().toISOString(),
        data: [
          { id: 1, name: "Sample Data 1" },
          { id: 2, name: "Sample Data 2" },
        ],
      };
      setResults(JSON.stringify(fakeResults, null, 2));
      addAlert(
        <div className="flex items-start space-x-3">
          <Zap className="w-6 h-6 text-cyan-400 mt-1" />
          <div className="flex flex-col">
            <span className="font-bold text-cyan-100 text-sm">Research complete!</span>
            <span className="text-cyan-200/70 text-xs">
              Query executed successfully.
            </span>
          </div>
        </div>
      );
    }, 5000);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0E1212] flex flex-col items-center justify-center px-6">
      {/* Sfondo parallax */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-[#0B0F10] via-[#12181A] to-[#0B0F10]"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: "transform 0.1s",
        }}
      />
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#32E0DC_0%,_transparent_70%)]"
        style={{
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
          transition: "transform 0.1s",
        }}
      />

      {/* Contenitore principale */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl w-full">
        {/* Titolo */}
        <h1 className="text-6xl font-extrabold text-center bg-gradient-to-r from-[#1AF0E0] via-[#6AF0F0] to-[#A3FFF3] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(50,224,220,0.7)]">
          Crystal OSINT
        </h1>

        <p className="mt-4 text-xl text-cyan-200/80 text-center max-w-3xl font-medium drop-shadow-[0_0_10px_rgba(50,224,220,0.4)]">
          A complete OSINT suite for monitoring, analyzing, and enriching digital information. Focused, fast, and futuristic.
        </p>

        <div className="h-12" />

        {/* Sezione interattiva */}
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <CrystalComboBox onSelect={(item) => {
            setSelected(item);
            setTextValue("");
            setIsValid(true);
            setErrorMessage("");
          }} />

          <CrystalTextField
            selected={selected}
            value={textValue}
            onChange={(val) => {
              setTextValue(val);
              validateInput(val);
            }}
            onEnter={handleButtonClick}
            disabled={!selected || isLoading}
            error={!isValid}
            errorMessage={errorMessage}
          />

          {/* Pulsante */}
          <CrystalButton
            onClick={handleButtonClick}
            className="relative flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Search informations
              </>
            )}
          </CrystalButton>

          <CrystalTextArea value={results} onChange={setResults} />
        </div>

        <div className="h-12" />

        {/* Feature highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center w-full px-4">
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-cyan-400/20 
            shadow-[0_0_15px_rgba(50,224,220,0.1)] flex flex-col items-center 
            transition hover:shadow-[0_0_25px_rgba(50,224,220,0.25)] group">
            <Eye className="w-8 h-8 text-cyan-400 mb-2 transition-colors duration-300 group-hover:text-cyan-100" />
            <h3 className="text-cyan-100 font-bold text-lg mb-2">Monitoring</h3>
            <p className="text-cyan-200 text-sm">
              Track public and dark web data in real-time with crystal-clear precision without ease.
            </p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-cyan-400/20 
            shadow-[0_0_15px_rgba(50,224,220,0.1)] flex flex-col items-center 
            transition hover:shadow-[0_0_25px_rgba(50,224,220,0.25)] group">
            <PieChart className="w-8 h-8 text-cyan-400 mb-2 transition-colors duration-300 group-hover:text-cyan-100" />
            <h3 className="text-cyan-100 font-bold text-lg mb-2">Analysis</h3>
            <p className="text-cyan-200 text-sm">
              Correlate OSINT sources and enrich data to make smarter, faster decisions.
            </p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-cyan-400/20 
            shadow-[0_0_15px_rgba(50,224,220,0.1)] flex flex-col items-center 
            transition hover:shadow-[0_0_25px_rgba(50,224,220,0.25)] group">
            <Puzzle className="w-8 h-8 text-cyan-400 mb-2 transition-colors duration-300 group-hover:text-cyan-100" />
            <h3 className="text-cyan-100 font-bold text-lg mb-2">Integration</h3>
            <p className="text-cyan-200 text-sm">
              Modular OSINT tools easily integrated into any workflow or platform.
            </p>
          </div>
        </div>

        <div className="h-12" />
        <p className="text-cyan-300/50 text-sm">
          &copy; 2025 Crystal OSINT. All rights reserved.
        </p>
      </div>
    </div>
  );
}