import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demo purposes
    if (password === 'astrai_core_2026') {
      sessionStorage.setItem('astrai_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-sm">
        <div className="flex justify-center mb-6 text-green-500">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-center text-xl font-mono text-white mb-8 tracking-widest">
          CORE_ACCESS_REQUIRED
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="ENTER_ACCESS_KEY"
              className="w-full bg-black border border-white/20 p-4 text-center text-white focus:border-green-500 outline-none transition-colors font-mono"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs text-center font-mono animate-pulse">
              ACCESS_DENIED: INVALID KEY
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-white/10 hover:bg-green-600 hover:text-black text-white border border-white/20 py-4 transition-all duration-300 flex items-center justify-center gap-2 font-mono text-sm"
          >
            AUTHENTICATE <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        
        <div className="mt-8 text-center text-[10px] text-gray-600 font-mono">
          SECURE CONNECTION ESTABLISHED // NODE: SINGAPORE
          <br />
          (Hint: astrai_core_2026)
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
