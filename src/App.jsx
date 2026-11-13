import { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, Activity, Globe, ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setResult(null);
    setShowRaw(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/scan-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error scanning URL:', error);
      setResult({ error: 'Gagal menghubungi server.' });
    } finally {
      setLoading(false);
    }
  };

  const stats = result?.data?.attributes?.stats || result?.data?.attributes?.last_analysis_stats;
  const isMalicious = stats && (stats.malicious > 0 || stats.suspicious > 0);

  return (
    // Latar belakang statis hitam dengan pendaran biru gelap (semi dark blue)
    <div className="relative min-h-screen bg-[#050b14] text-gray-100 flex flex-col items-center py-16 px-4 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* Ambient glow statis (Cahaya biru di latar belakang) */}
      <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-800/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Efek merah tambahan yang muncul HANYA jika terdeteksi virus */}
      {isMalicious && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
          <div className="absolute bottom-[-10%] w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        </div>
      )}

      <div className="z-10 w-full max-w-3xl flex flex-col items-center animate-fade-in-up">
        
        {/* WADAH LIQUID GLASS PELANGI (Tetap dipertahankan) */}
        <div className="relative w-full p-8 md:p-12 rounded-[3rem] mb-8 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden group bg-black/20">
          
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px]"></div>
          
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-[70px] mix-blend-screen group-hover:bg-blue-400/40 transition-all duration-700"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/30 rounded-full blur-[70px] mix-blend-screen group-hover:bg-pink-400/40 transition-all duration-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-[90px] mix-blend-screen"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
                <ShieldCheck className="w-10 h-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Web Security Scanner
              </h1>
              <p className="text-gray-200 text-lg max-w-lg font-medium drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                Deteksi ancaman phishing dan malware pada tautan sebelum Anda mengunjunginya.
              </p>
            </div>

            <form onSubmit={handleScan} className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className={`w-5 h-5 transition-colors duration-300 ${loading ? 'text-blue-400 animate-spin' : 'text-gray-400'}`} />
              </div>
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com" 
                className="w-full pl-14 pr-36 py-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-black/60 transition-all duration-300 shadow-inner text-lg"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-full font-semibold transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Memindai...' : 'Scan URL'}
              </button>
            </form>
          </div>
        </div>

        {/* AREA HASIL (Gelap & Elegan, Tetap dipertahankan) */}
        {stats && (
          <div className="w-full mt-4 flex flex-col gap-6 animate-fade-in-up z-10">
            
            <div className={`w-full p-8 rounded-[2rem] backdrop-blur-2xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 shadow-2xl ${
              isMalicious 
                ? 'bg-red-950/40 border-red-500/30 shadow-red-900/20' 
                : 'bg-green-950/40 border-green-500/30 shadow-green-900/20'
            }`}>
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${isMalicious ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                  {isMalicious ? <ShieldAlert className="w-10 h-10 text-red-400" /> : <ShieldCheck className="w-10 h-10 text-green-400" />}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-1 text-white">
                    {isMalicious ? 'Ancaman Terdeteksi!' : 'Tautan Aman'}
                  </h2>
                  <p className="text-gray-300 text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4" /> 
                    {result.data?.meta?.url_info?.url || url}
                  </p>
                </div>
              </div>
              
              <div className="text-center bg-black/60 px-6 py-4 rounded-2xl border border-white/5">
                <div className={`text-4xl font-bold ${isMalicious ? 'text-red-400' : 'text-green-400'}`}>
                  {stats.malicious + stats.suspicious}
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Flagged</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-black/60 transition-colors shadow-lg">
                <Activity className="w-6 h-6 text-gray-400 mb-3" />
                <span className="text-3xl font-semibold text-white mb-1">{stats.harmless}</span>
                <span className="text-sm text-gray-400">Vendor Menyatakan Aman</span>
              </div>
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-black/60 transition-colors shadow-lg">
                <ShieldAlert className="w-6 h-6 text-red-400/70 mb-3" />
                <span className="text-3xl font-semibold text-red-400 mb-1">{stats.malicious}</span>
                <span className="text-sm text-gray-400">Malware Terdeteksi</span>
              </div>
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-black/60 transition-colors shadow-lg">
                <Search className="w-6 h-6 text-yellow-400/70 mb-3" />
                <span className="text-3xl font-semibold text-yellow-400 mb-1">{stats.suspicious}</span>
                <span className="text-sm text-gray-400">Mencurigakan</span>
              </div>
            </div>

            <button 
              onClick={() => setShowRaw(!showRaw)}
              className="mt-4 mx-auto flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-black/40 px-4 py-2 rounded-full border border-white/10 transition-colors"
            >
              {showRaw ? 'Sembunyikan Data Mentah' : 'Lihat Data Mentah (JSON)'}
              {showRaw ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showRaw && (
              <div className="w-full bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl overflow-hidden animate-fade-in-up">
                {/* Logika warna ditambahkan pada baris <pre> di bawah ini */}
                <pre className={`text-xs overflow-x-auto font-mono ${
                  isMalicious ? 'text-red-400' : 'text-green-400'
                }`}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default App;