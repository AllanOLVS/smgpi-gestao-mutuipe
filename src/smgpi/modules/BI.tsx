import { useState } from "react";
import { BarChart3, Eye, ShieldAlert, FileText, ExternalLink } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";

export function BI() {
    const [tab, setTab] = useState("bi");
    const data = [{ m: "Jul", v: 32 }, { m: "Ago", v: 48 }, { m: "Set", v: 41 }, { m: "Out", v: 55 }, { m: "Nov", v: 62 }];
    return (
        <div className="smgpi-fade-in">
            <PageHeader title="BI, Transparência e Controle Interno" breadcrumb={["SMGPI", "M11"]} />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["bi", "BI Gerencial"], ["trans", "Transparência"], ["ctrl", "Controle Interno"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "bi" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    ["Financeiro", "R$ 26,8M empenhado", "var(--mod-financeiro)"],
                    ["Pessoas", "1.247 servidores", "var(--mod-rh)"],
                    ["Tributação", "R$ 3,15M arrecadado", "var(--mod-tributacao)"],
                    ["Saúde", "3.792 atendimentos", "var(--mod-saude)"],
                    ["Educação", "4.231 matrículas", "var(--mod-educacao)"],
                    ["Obras", "14 em andamento", "var(--mod-obras)"],
                ].map(([t, k, c]: any) => (
                    <div key={t} className="smgpi-card p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-display font-bold">{t}</h3>
                            <BarChart3 size={16} style={{ color: c }} />
                        </div>
                        <div className="font-display font-bold text-xl mb-2" style={{ color: c }}>{k}</div>
                        <ResponsiveContainer width="100%" height={80}>
                            <LineChart data={data}><Line dataKey="v" stroke={c} strokeWidth={2} dot={false} /></LineChart>
                        </ResponsiveContainer>
                        <button className="text-xs font-semibold mt-2" style={{ color: "var(--color-primary)" }}>Ver relatório completo →</button>
                    </div>
                ))}
            </div>}

            {tab === "trans" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Publicações ativas" value="1.284" icon={<Eye size={18} />} accent="var(--color-info)" />
                    <StatCard label="Pendentes" value="7" change="atenção" changeType="down" icon={<FileText size={18} />} accent="var(--color-warning)" />
                    <StatCard label="Solicitações LAI" value="12" change="3 pendentes" icon={<FileText size={18} />} accent="var(--color-primary)" />
                    <StatCard label="Acessos (mês)" value="3.421" change="+18%" changeType="up" icon={<Eye size={18} />} accent="var(--color-success)" />
                </div>
                <Panel title="Portal de Transparência" action={
                    <button className="smgpi-btn smgpi-btn-ghost text-xs"><ExternalLink size={12} /> Acessar portal público</button>
                }>
                    <div className="rounded-lg p-6 mb-4" style={{ background: "var(--color-surface-2)" }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {[["Receitas", "R$ 22,8M"], ["Despesas", "R$ 24,1M"], ["Pessoal", "R$ 14,2M"], ["Licitações", "27"]].map(([k, v]: any) => (
                                <div key={k}><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{k}</div>
                                    <div className="font-display font-bold text-lg">{v}</div></div>
                            ))}
                        </div>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">Solicitações LAI pendentes</h4>
                    <table className="smgpi-table">
                        <thead><tr><th>Protocolo</th><th>Assunto</th><th>Prazo</th><th>Status</th></tr></thead>
                        <tbody>
                            {[["LAI-2025-012", "Despesas com diárias", "02/12", "Em prazo"],
                            ["LAI-2025-011", "Folha pagto comissionados", "28/11", "Atrasada"],
                            ["LAI-2025-010", "Contratos da saúde", "05/12", "Em prazo"]].map((r: any) => (
                                <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td>{r[1]}</td>
                                    <td className="text-xs">{r[2]}</td><td><StatusBadge status={r[3] === "Atrasada" ? "Crítico" : "Ativo"} /></td></tr>
                            ))}
                        </tbody>
                    </table>
                </Panel>
            </>}

            {tab === "ctrl" && <>
                <Panel title="Conformidade LRF — em tempo real" className="mb-4">
                    {[
                        ["Pessoal (limite 54%)", 92, "var(--color-danger)", "ATENÇÃO"],
                        ["Dívida consolidada (limite 120% RCL)", 45, "var(--color-success)", "OK"],
                        ["Operações de crédito (limite 16%)", 0, "var(--color-success)", "OK"],
                    ].map(([l, p, c, s]: any) => (
                        <div key={l} className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-semibold">{l}</span>
                                <span className="font-bold" style={{ color: c }}>{p}% · {s}</span>
                            </div>
                            <div className="h-2.5 rounded-full" style={{ background: "var(--color-surface-2)" }}>
                                <div className="h-full rounded-full" style={{ width: `${p}%`, background: c }} />
                            </div>
                        </div>
                    ))}
                </Panel>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Panel title="PACI 2025 — atividades">
                        <table className="smgpi-table">
                            <thead><tr><th>Atividade</th><th>Prazo</th><th>Status</th></tr></thead>
                            <tbody>
                                {[["Auditoria de almoxarifado", "Out/25", "Realizada"],
                                ["Revisão de processos licitatórios", "Nov/25", "Em andamento"],
                                ["Conferência de bens patrimoniais", "Dez/25", "Pendente"],
                                ["Avaliação execução orçamentária", "Out/25", "Realizada"]].map((r: any) => (
                                    <tr key={r[0]}><td className="text-sm">{r[0]}</td><td className="text-xs">{r[1]}</td>
                                        <td><StatusBadge status={r[2] === "Realizada" ? "Concluído" : r[2] === "Pendente" ? "Pendente" : "Em andamento"} /></td></tr>
                                ))}
                            </tbody>
                        </table>
                    </Panel>
                    <Panel title="Mapa de riscos — 5×5">
                        <div className="grid grid-cols-6 gap-1 text-[10px]">
                            <div></div>
                            {[1, 2, 3, 4, 5].map(p => <div key={p} className="text-center font-bold">P{p}</div>)}
                            {[5, 4, 3, 2, 1].map(i => (
                                <>
                                    <div key={"l" + i} className="font-bold flex items-center">I{i}</div>
                                    {[1, 2, 3, 4, 5].map(p => {
                                        const score = i * p;
                                        const cor = score >= 15 ? "var(--color-danger-light)" : score >= 8 ? "var(--color-warning-light)" : "var(--color-success-light)";
                                        const has = (i === 4 && p === 5) || (i === 5 && p === 3) || (i === 2 && p === 4) || (i === 3 && p === 2);
                                        return <div key={i + "-" + p} className="aspect-square rounded flex items-center justify-center"
                                            style={{ background: cor }}>{has && <ShieldAlert size={14} style={{ color: "var(--color-text-primary)" }} />}</div>;
                                    })}
                                </>
                            ))}
                        </div>
                        <div className="mt-3 text-xs" style={{ color: "var(--color-text-muted)" }}>4 riscos mapeados · 1 crítico</div>
                    </Panel>
                </div>
            </>}
        </div>
    );
}
