import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Login } from "./Login";
import { Dashboard } from "./modules/Dashboard";
import { Pessoas } from "./modules/Pessoas";
import { Financeiro } from "./modules/Financeiro";
import { Tributacao } from "./modules/Tributacao";
import { Compras } from "./modules/Compras";
import { Patrimonio } from "./modules/Patrimonio";
import { Saude } from "./modules/Saude";
import { Educacao } from "./modules/Educacao";
import { Obras } from "./modules/Obras";
import { BI } from "./modules/BI";
import { Config } from "./modules/Config";
import type { ModuleKey } from "./types";

export function AppShell() {
    const [authed, setAuthed] = useState(false);
    const [current, setCurrent] = useState<ModuleKey>("dashboard");

    if (!authed) return <Login onLogin={() => setAuthed(true)} />;

    const Screen = {
        dashboard: Dashboard, pessoas: Pessoas, financeiro: Financeiro,
        tributacao: Tributacao, compras: Compras, patrimonio: Patrimonio,
        saude: Saude, educacao: Educacao, obras: Obras, bi: BI, config: Config,
    }[current];

    return (
        <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
            <Sidebar current={current} onNavigate={(k) => setCurrent(k)} onLogout={() => setAuthed(false)} />
            <Topbar current={current} />
            <main
                style={{
                    marginLeft: "var(--sidebar-width)",
                    paddingTop: "var(--topbar-height)",
                }}
            >
                <div className="p-6 max-w-[1600px] mx-auto">
                    <Screen />
                </div>
            </main>
        </div>
    );
}
