import { useState } from "react";
import {
    LayoutDashboard, Users, Wallet, Receipt, ShoppingCart, Package,
    HeartPulse, GraduationCap, HardHat, BarChart3, Settings, LogOut, ShieldCheck,
} from "lucide-react";
import type { ModuleKey } from "./types";

const GROUPS: Array<{ label: string; items: Array<{ key: ModuleKey; label: string; icon: any; badge?: number }> }> = [
    {
        label: "Gestão Municipal", items: [
            { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { key: "pessoas", label: "Pessoas e RH", icon: Users, badge: 3 },
            { key: "financeiro", label: "Financeiro", icon: Wallet },
            { key: "tributacao", label: "Tributação", icon: Receipt },
        ]
    },
    {
        label: "Operações", items: [
            { key: "compras", label: "Compras e Contratos", icon: ShoppingCart, badge: 7 },
            { key: "patrimonio", label: "Patrimônio", icon: Package },
        ]
    },
    {
        label: "Setoriais", items: [
            { key: "saude", label: "Saúde e Assistência", icon: HeartPulse },
            { key: "educacao", label: "Educação", icon: GraduationCap },
            { key: "obras", label: "Obras e Urbanismo", icon: HardHat },
        ]
    },
    {
        label: "Inteligência", items: [
            { key: "bi", label: "BI e Transparência", icon: BarChart3 },
        ]
    },
    {
        label: "Sistema", items: [
            { key: "config", label: "Configurações", icon: Settings },
        ]
    },
];

export function Sidebar({ current, onNavigate, onLogout }: {
    current: ModuleKey; onNavigate: (k: ModuleKey) => void; onLogout: () => void;
}) {
    return (
        <aside
            className="fixed top-0 left-0 h-screen flex flex-col"
            style={{
                width: "var(--sidebar-width)",
                background: "var(--color-sidebar)",
                color: "var(--color-sidebar-text)",
            }}
        >
            {/* Logo */}
            <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-extrabold text-white"
                        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}>
                        V
                    </div>
                    <div>
                        <div className="font-display font-extrabold text-white text-lg leading-none">SMGPI</div>
                        <div className="text-[10px] tracking-wider mt-1" style={{ color: "var(--color-accent)" }}>
                            VENYX TECHNOLOGY
                        </div>
                    </div>
                </div>
                <div className="text-[11px] mt-3" style={{ color: "var(--color-sidebar-text)" }}>
                    Prefeitura de Mutuípe — BA
                </div>
                <div className="h-px mt-3" style={{ background: "rgba(212,175,55,0.3)" }} />
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-2 pb-4">
                {GROUPS.map((g) => (
                    <div key={g.label} className="mt-4">
                        <div className="px-3 mb-1.5 text-[10px] font-bold tracking-widest uppercase"
                            style={{ color: "rgba(168,168,192,0.6)" }}>
                            {g.label}
                        </div>
                        {g.items.map((it) => {
                            const active = current === it.key;
                            const Icon = it.icon;
                            return (
                                <button
                                    key={it.key}
                                    onClick={() => onNavigate(it.key)}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium relative transition-all"
                                    style={{
                                        background: active ? "var(--color-sidebar-active)" : "transparent",
                                        color: active ? "var(--color-sidebar-text-active)" : "var(--color-sidebar-text)",
                                        borderLeft: active ? "3px solid var(--color-accent)" : "3px solid transparent",
                                        paddingLeft: active ? 9 : 12,
                                    }}
                                    onMouseEnter={(e) => { if (!active) (e.currentTarget.style.background = "var(--color-sidebar-hover)"); }}
                                    onMouseLeave={(e) => { if (!active) (e.currentTarget.style.background = "transparent"); }}
                                >
                                    <Icon size={18} />
                                    <span className="flex-1 text-left">{it.label}</span>
                                    {it.badge !== undefined && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                            style={{ background: "var(--color-primary)", color: "#fff" }}>
                                            {it.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Footer user */}
            <div className="p-3 border-t" style={{ borderColor: "rgba(168,168,192,0.15)" }}>
                <div className="flex items-center gap-2.5 px-2 py-2 rounded-md">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "var(--color-accent)" }}>AV</div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white truncate">Admin VENYX</div>
                        <div className="text-[10px] truncate" style={{ color: "var(--color-sidebar-text)" }}>Administrador</div>
                    </div>
                    <button onClick={onLogout} title="Sair" className="p-1.5 rounded hover:bg-white/10 transition">
                        <LogOut size={14} />
                    </button>
                </div>
                <div className="flex items-center gap-1.5 mt-2 px-2 text-[10px]" style={{ color: "rgba(168,168,192,0.7)" }}>
                    <ShieldCheck size={11} /> Sistema seguro · v1.0
                </div>
            </div>
        </aside>
    );
}
