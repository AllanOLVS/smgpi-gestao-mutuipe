import { Search, Bell, ChevronDown } from "lucide-react";
import type { ModuleKey } from "./types";
import { MODULE_TITLES } from "./types";

export function Topbar({ current }: { current: ModuleKey }) {
    return (
        <header
            className="fixed top-0 right-0 z-10 flex items-center px-6 gap-6"
            style={{
                left: "var(--sidebar-width)",
                height: "var(--topbar-height)",
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <div className="flex items-center gap-2 text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>SMGPI</span>
                <span style={{ color: "var(--color-text-muted)" }}>/</span>
                <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {MODULE_TITLES[current]}
                </span>
            </div>

            <div className="flex-1 max-w-xl mx-auto relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                <input
                    className="w-full h-10 pl-9 pr-3 rounded-md text-sm"
                    style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
                    placeholder="Buscar em todos os módulos..."
                />
            </div>

            <div className="flex items-center gap-2 text-xs whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>
                Prefeitura de Mutuípe — BA
            </div>

            <button className="relative p-2 rounded-md hover:bg-[var(--color-surface-2)] transition">
                <Bell size={18} style={{ color: "var(--color-text-secondary)" }} />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold text-white"
                    style={{ background: "var(--color-primary)" }}>5</span>
            </button>

            <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md hover:bg-[var(--color-surface-2)] transition">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "var(--color-sidebar)" }}>AV</div>
                <div className="text-left hidden md:block">
                    <div className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>Admin VENYX</div>
                    <div className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Administrador</div>
                </div>
                <ChevronDown size={14} style={{ color: "var(--color-text-muted)" }} />
            </button>
        </header>
    );
}
