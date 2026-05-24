import { useState } from "react";
import { Plus, FileText, Download, CheckCircle2, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";
import { fmtBRL } from "../data";
import { Wallet, TrendingUp, FileCheck, Building2 } from "lucide-react";

const FONTES = [
    { name: "FPM", value: 9800000, cor: "#1B5E20" },
    { name: "Recursos próprios", value: 7200000, cor: "#C41E3A" },
    { name: "ICMS", value: 6400000, cor: "#0277BD" },
    { name: "SUS", value: 4100000, cor: "#00695C" },
    { name: "FUNDEB", value: 3800000, cor: "#E65100" },
    { name: "Convênios", value: 1100000, cor: "#6A1B9A" },
];

const DOTACOES = [
    ["Educação", 8240000, 6890000], ["Saúde", 7180000, 5940000], ["Administração", 4120000, 3420000],
    ["Obras", 3890000, 2110000], ["Assist. Social", 2140000, 1782000], ["Fazenda", 1320000, 1098000],
];

export function Financeiro() {
    const [tab, setTab] = useState("painel");
    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Planejamento e Contabilidade" breadcrumb={["SMGPI", "M03/04 — Financeiro"]}
                subtitle="LOA 2025: R$ 32.400.000,00 · Exercício corrente" />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["painel", "Painel Orçamentário"], ["empenho", "Empenho"], ["lrf", "Relatórios LRF"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "painel" && <>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                    <StatCard label="LOA 2025" value="R$ 32,4M" icon={<Wallet size={18} />} accent="var(--color-text-secondary)" />
                    <StatCard label="Empenhado · 82,97%" value="R$ 26,89M" icon={<FileCheck size={18} />} accent="var(--color-info)" />
                    <StatCard label="Liquidado · 74,39%" value="R$ 24,10M" icon={<CheckCircle2 size={18} />} accent="var(--color-warning)" />
                    <StatCard label="Pago · 70,95%" value="R$ 22,99M" icon={<TrendingUp size={18} />} accent="var(--color-success)" />
                    <StatCard label="Saldo disponível" value="R$ 5,51M" icon={<Building2 size={18} />} accent="var(--color-primary)" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                    <Panel title="Execução por fonte de recurso" className="lg:col-span-2">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie data={FONTES} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                                    {FONTES.map((f, i) => (<Cell key={i} fill={f.cor} />))}
                                </Pie>
                                <Tooltip formatter={(v: number) => fmtBRL(v)} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Panel>
                    <Panel title="Dotação x Empenhado por secretaria" className="lg:col-span-3">
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={DOTACOES.map(([n, d, e]) => ({ nome: n, dotacao: d, empenhado: e }))}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4DC" vertical={false} />
                                <XAxis dataKey="nome" tick={{ fontSize: 10, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: "#5A5A72" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                                <Tooltip formatter={(v: number) => fmtBRL(v)} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                                <Bar dataKey="dotacao" fill="#A8A8C0" radius={[4, 4, 0, 0]} name="Dotação" />
                                <Bar dataKey="empenhado" fill="#C41E3A" radius={[4, 4, 0, 0]} name="Empenhado" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Panel>
                </div>
                <Panel title="Dotações por secretaria">
                    <table className="smgpi-table">
                        <thead><tr><th>Secretaria</th><th>Dotação</th><th>Empenhado</th><th>%</th><th>Saldo</th></tr></thead>
                        <tbody>
                            {DOTACOES.map(([n, d, e]: any) => {
                                const pct = Math.round(e / d * 100);
                                return (
                                    <tr key={n}>
                                        <td className="font-semibold">{n}</td>
                                        <td>{fmtBRL(d)}</td><td>{fmtBRL(e)}</td>
                                        <td><div className="flex items-center gap-2 w-40">
                                            <div className="flex-1 h-2 rounded-full" style={{ background: "var(--color-surface-2)" }}>
                                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 85 ? "var(--color-danger)" : "var(--color-success)" }} />
                                            </div>
                                            <span className="text-xs font-semibold">{pct}%</span>
                                        </div></td>
                                        <td className="font-semibold">{fmtBRL(d - e)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Panel>
            </>}

            {tab === "empenho" && <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Panel title="Novo empenho" className="lg:col-span-1">
                        <div className="space-y-3 text-sm">
                            {["Tipo", "Unidade orçamentária", "Programa / Ação", "Natureza da despesa", "Fonte de recurso", "Fornecedor", "Valor", "Nº processo"].map(l => (
                                <div key={l}><label className="text-xs font-semibold block mb-1">{l}</label>
                                    <input className="smgpi-input" /></div>
                            ))}
                            <button className="smgpi-btn smgpi-btn-primary w-full"><Plus size={14} /> Emitir empenho</button>
                        </div>
                    </Panel>
                    <Panel title="Empenhos emitidos (últimos)" className="lg:col-span-2">
                        <table className="smgpi-table">
                            <thead><tr><th>Nº</th><th>Credor</th><th>Objeto</th><th>Valor</th><th>Situação</th></tr></thead>
                            <tbody>
                                {[
                                    ["2025NE001247", "MediSupply", "Medicamentos básicos", 84200, "Ativo"],
                                    ["2025NE001246", "Construtora Bahia", "Medição 8 obra escola", 212000, "Ativo"],
                                    ["2025NE001245", "TI Soluções", "Suporte mensal nov/25", 7000, "Ativo"],
                                    ["2025NE001244", "Combustíveis Sul", "Combustível frota", 26400, "Ativo"],
                                    ["2025NE001243", "Transporte Escolar", "Transporte nov/25", 56600, "Ativo"],
                                    ["2025NE001242", "Materiais Construção", "Material drenagem", 18700, "Anulado"],
                                ].map((r: any) => (
                                    <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td>{r[1]}</td>
                                        <td className="text-sm">{r[2]}</td><td className="font-semibold">{fmtBRL(r[3])}</td>
                                        <td><StatusBadge status={r[4]} /></td></tr>
                                ))}
                            </tbody>
                        </table>
                    </Panel>
                </div>
            </>}

            {tab === "lrf" && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    ["RREO — 5º Bimestre 2025", "Publicado em 29/10/2025", "success", CheckCircle2],
                    ["RGF — 2º Quadrimestre 2025", "Enviado ao SICONFI", "success", CheckCircle2],
                    ["RREO — 6º Bimestre 2025", "Prazo: 30/01/2026", "warning", Clock],
                    ["DCA 2024", "Aprovado pelo TCE-BA", "success", CheckCircle2],
                ].map(([t, s, c, Ic]: any) => (
                    <div key={t} className="smgpi-card p-5">
                        <div className="flex items-start justify-between mb-3">
                            <FileText size={32} style={{ color: "var(--color-primary)" }} />
                            <Ic size={20} style={{ color: c === "success" ? "var(--color-success)" : "var(--color-warning)" }} />
                        </div>
                        <h3 className="font-display font-bold text-base">{t}</h3>
                        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{s}</p>
                        <div className="flex gap-2 mt-4">
                            <button className="smgpi-btn smgpi-btn-primary text-xs flex-1"><Download size={12} /> Visualizar PDF</button>
                            <button className="smgpi-btn smgpi-btn-ghost text-xs">Reenviar</button>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
}
