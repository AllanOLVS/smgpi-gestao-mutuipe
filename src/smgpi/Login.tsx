import { useState } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

export function Login({ onLogin }: { onLogin: () => void }) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(onLogin, 700);
    };

    return (
        <div className="min-h-screen flex" style={{ background: "var(--color-surface)" }}>
            {/* Left */}
            <div className="hidden md:flex flex-col justify-between p-12 relative overflow-hidden"
                style={{ width: "55%", background: "var(--color-sidebar)" }}>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-extrabold text-white text-xl"
                        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}>V</div>
                    <div>
                        <div className="font-display font-extrabold text-white text-lg">VENYX</div>
                        <div className="text-[10px] tracking-widest" style={{ color: "var(--color-accent)" }}>TECHNOLOGY</div>
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "var(--color-accent)" }}>
                        SISTEMA OFICIAL DE GESTÃO
                    </div>
                    <h1 className="font-display font-extrabold text-white text-4xl leading-tight">
                        Sistema Municipal de Gestão Pública Integrada
                    </h1>
                    <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
                        Prefeitura Municipal de Mutuípe — Bahia
                    </p>

                    <ul className="mt-10 space-y-4">
                        {[
                            "Gestão integrada em tempo real",
                            "Conformidade legal automatizada",
                            "Transparência e eficiência",
                        ].map((t) => (
                            <li key={t} className="flex items-start gap-3 text-white text-sm">
                                <CheckCircle2 size={20} style={{ color: "var(--color-accent)" }} className="mt-0.5 flex-shrink-0" />
                                <span>{t}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-[11px] relative z-10" style={{ color: "rgba(255,255,255,0.4)" }}>
                    © 2025 VENYX Technology — Todos os direitos reservados
                </div>

                {/* decoração */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-30"
                    style={{ background: "radial-gradient(circle, var(--color-primary), transparent 60%)" }} />
                <div className="absolute top-1/3 right-10 w-2 h-32" style={{ background: "var(--color-accent)" }} />
                <svg className="absolute bottom-0 left-0 opacity-10" width="500" height="500" viewBox="0 0 500 500">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <line key={i} x1="0" y1={i * 25} x2="500" y2={i * 25} stroke="white" strokeWidth="0.5" />
                    ))}
                </svg>
            </div>

            {/* Right */}
            <div className="flex-1 flex items-center justify-center p-8">
                <form onSubmit={submit} className="w-full max-w-sm">
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center font-display font-bold text-white text-sm"
                            style={{ background: "var(--color-primary)" }}>S</div>
                        <div className="font-display font-extrabold text-base">SMGPI</div>
                    </div>

                    <h2 className="font-display font-extrabold text-3xl mb-2">Bem-vindo de volta</h2>
                    <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)" }}>
                        Acesse o sistema com suas credenciais
                    </p>

                    <label className="block text-xs font-semibold mb-1.5">Usuário / CPF</label>
                    <div className="relative mb-4">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                        <input defaultValue="admin.venyx" className="smgpi-input pl-9" />
                    </div>

                    <label className="block text-xs font-semibold mb-1.5">Senha</label>
                    <div className="relative mb-6">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                        <input type={show ? "text" : "password"} defaultValue="••••••••" className="smgpi-input pl-9 pr-10" />
                        <button type="button" onClick={() => setShow(!show)}
                            className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }}>
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full h-12 rounded-md font-semibold text-white flex items-center justify-center gap-2 transition"
                        style={{ background: loading ? "var(--color-primary-dark)" : "var(--color-primary)" }}>
                        {loading ? "Autenticando..." : (<>Entrar no sistema <ArrowRight size={16} /></>)}
                    </button>

                    <p className="text-xs text-center mt-8" style={{ color: "var(--color-text-muted)" }}>
                        Problemas de acesso? Contate o administrador do sistema
                    </p>
                </form>
            </div>
        </div>
    );
}
