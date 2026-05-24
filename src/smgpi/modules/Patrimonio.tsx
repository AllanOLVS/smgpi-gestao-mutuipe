import { useState } from "react";
import { Package, Truck, Boxes, QrCode, AlertTriangle, Plus, MapPin } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";
import { fmtBRL } from "../data";

export function Patrimonio() {
    const [tab, setTab] = useState("bens");
    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Patrimônio, Almoxarifado e Frotas" breadcrumb={["SMGPI", "M07"]} />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["bens", "Bens"], ["inv", "Inventário"], ["alm", "Almoxarifado"], ["frotas", "Frotas"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "bens" && <>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                    <StatCard label="Total de bens" value="4.812" icon={<Package size={18} />} accent="var(--mod-patrimonio)" />
                    <StatCard label="Valor total" value="R$ 24,8M" icon={<Boxes size={18} />} accent="var(--color-info)" />
                    <StatCard label="Bens em uso" value="4.621" icon={<QrCode size={18} />} accent="var(--color-success)" />
                    <StatCard label="Bens cedidos" value="42" icon={<Truck size={18} />} accent="var(--color-warning)" />
                    <StatCard label="Depreciação acum." value="R$ 6,2M" icon={<AlertTriangle size={18} />} accent="var(--color-danger)" />
                </div>
                <Panel title="Lista de bens patrimoniais">
                    <table className="smgpi-table">
                        <thead><tr><th>Tombamento</th><th>Descrição</th><th>Secretaria</th><th>Valor original</th><th>Valor atual</th><th>Situação</th></tr></thead>
                        <tbody>
                            {[
                                ["P-000124", "Notebook Dell Latitude 5530", "Administração", 4800, 3120, "Em uso"],
                                ["P-000847", "Veículo Fiat Strada 2022", "Saúde", 78000, 62400, "Em uso"],
                                ["P-001293", "Ar-condicionado Split 24000 BTUs", "Educação", 3200, 2240, "Em uso"],
                                ["P-002104", "Mesa de reuniões 2,40m", "Gabinete", 1800, 1080, "Em uso"],
                                ["P-000412", "Trator agrícola Massey", "Obras", 185000, 124000, "Em uso"],
                                ["P-003012", "Cadeira ergonômica", "Procuradoria", 890, 534, "Cedido"],
                            ].map((r: any) => (
                                <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td className="font-semibold">{r[1]}</td>
                                    <td className="text-sm">{r[2]}</td><td>{fmtBRL(r[3])}</td><td>{fmtBRL(r[4])}</td>
                                    <td><StatusBadge status={r[5]} /></td></tr>
                            ))}
                        </tbody>
                    </table>
                </Panel>
            </>}

            {tab === "inv" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Saúde", "Educação", "Administração", "Obras", "Assistência", "Gabinete"].map((s, i) => {
                    const tot = 400 + i * 120, ok = tot - (i * 30), pct = Math.round(ok / tot * 100);
                    return (
                        <div key={s} className="smgpi-card p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-display font-bold">{s}</h3>
                                <Package size={16} style={{ color: "var(--mod-patrimonio)" }} />
                            </div>
                            <div className="flex items-end justify-between mb-2">
                                <div><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Inventariados</div>
                                    <div className="font-display font-bold text-2xl">{ok}<span className="text-sm font-normal" style={{ color: "var(--color-text-muted)" }}> / {tot}</span></div></div>
                                <span className="text-sm font-bold" style={{ color: pct > 90 ? "var(--color-success)" : "var(--color-warning)" }}>{pct}%</span>
                            </div>
                            <div className="h-2 rounded-full" style={{ background: "var(--color-surface-2)" }}>
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 90 ? "var(--color-success)" : "var(--color-warning)" }} />
                            </div>
                            <button className="smgpi-btn smgpi-btn-ghost w-full mt-3 text-xs">Iniciar conferência</button>
                        </div>
                    );
                })}
            </div>}

            {tab === "alm" && <Panel title="Estoque de materiais" action={
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--color-danger)" }}>
                    <AlertTriangle size={12} /> 2 itens críticos
                </span>}>
                <table className="smgpi-table">
                    <thead><tr><th>Código</th><th>Material</th><th>Unidade</th><th>Saldo</th><th>Mínimo</th><th>Situação</th></tr></thead>
                    <tbody>
                        {[
                            ["MX001", "Papel A4 75g", "Resma", 240, 100, "OK"],
                            ["MX002", "Cartucho HP 664 preto", "Un", 8, 15, "CRÍTICO"],
                            ["MX003", "Caneta esferográfica azul", "Cx", 125, 50, "OK"],
                            ["MX004", "Toner Brother TN-2370", "Un", 3, 5, "CRÍTICO"],
                            ["MX005", "Grampeador médio", "Un", 18, 10, "OK"],
                            ["MX006", "Pasta suspensa kraft", "Un", 420, 200, "OK"],
                        ].map((r: any) => (
                            <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td className="font-semibold">{r[1]}</td>
                                <td className="text-sm">{r[2]}</td><td className="font-semibold">{r[3]}</td><td>{r[4]}</td>
                                <td><StatusBadge status={r[5]} /></td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "frotas" && <>
                <Panel title="Mapa de veículos" className="mb-4">
                    <div className="relative h-56 rounded-lg overflow-hidden" style={{ background: "linear-gradient(135deg,#E3F2FD,#F8F8F5)" }}>
                        <svg className="absolute inset-0 w-full h-full opacity-30">
                            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1565C0" strokeWidth="0.5" /></pattern></defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                        {[[20, 30], [55, 45], [75, 25], [40, 65], [68, 72], [25, 80]].map(([x, y], i) => (
                            <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-100%)" }}>
                                <MapPin size={28} style={{ color: "var(--color-primary)", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
                            </div>
                        ))}
                        <div className="absolute bottom-3 right-3 smgpi-card px-3 py-2 text-xs font-semibold">6 veículos rastreados</div>
                    </div>
                </Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        ["OUE-1234", "Ambulância Renault Master", "Saúde", 128400, "Revisão em 1.200km"],
                        ["MUT-5678", "Fiat Strada", "Administração", 84200, "OK"],
                        ["BAH-9012", "Ônibus escolar Volare", "Educação", 212800, "Atrasada 320km"],
                        ["FRT-3456", "Trator John Deere", "Obras", 4820, "OK"],
                        ["SUS-7890", "Saveiro CD", "Saúde", 62100, "Revisão em 800km"],
                        ["GAB-2345", "Toyota Corolla", "Gabinete", 38400, "OK"],
                    ].map((v: any) => (
                        <div key={v[0]} className="smgpi-card p-4">
                            <div className="flex items-start justify-between mb-2">
                                <span className="font-mono font-bold text-sm">{v[0]}</span>
                                <Truck size={16} style={{ color: "var(--mod-patrimonio)" }} />
                            </div>
                            <div className="font-semibold text-sm">{v[1]}</div>
                            <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{v[2]} · {v[3].toLocaleString("pt-BR")} km</div>
                            <div className="mt-2 pt-2 border-t text-xs" style={{ borderColor: "var(--color-border)" }}>
                                <StatusBadge status={v[4].includes("Atras") ? "Atrasada" : v[4].includes("Revisão") ? "Atenção" : "OK"} />
                                <span className="ml-2" style={{ color: "var(--color-text-muted)" }}>{v[4]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </>}
        </div>
    );
}
