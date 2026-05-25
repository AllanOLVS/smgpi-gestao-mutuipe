import { useState } from "react";
import { Search, Plus, FileText, AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";
import { fmtBRL } from "../data";
import { Receipt, Building, TrendingDown, FileCheck } from "lucide-react";

const ARREC = [
    { mes: "Jan", IPTU: 180, ISS: 95, ITBI: 45, Taxas: 32 }, { mes: "Fev", IPTU: 420, ISS: 98, ITBI: 38, Taxas: 28 },
    { mes: "Mar", IPTU: 95, ISS: 102, ITBI: 52, Taxas: 35 }, { mes: "Abr", IPTU: 78, ISS: 108, ITBI: 41, Taxas: 31 },
    { mes: "Mai", IPTU: 82, ISS: 115, ITBI: 63, Taxas: 29 }, { mes: "Jun", IPTU: 74, ISS: 121, ITBI: 48, Taxas: 33 },
    { mes: "Jul", IPTU: 71, ISS: 118, ITBI: 55, Taxas: 30 }, { mes: "Ago", IPTU: 69, ISS: 125, ITBI: 42, Taxas: 34 },
    { mes: "Set", IPTU: 72, ISS: 132, ITBI: 60, Taxas: 36 }, { mes: "Out", IPTU: 68, ISS: 128, ITBI: 51, Taxas: 32 },
    { mes: "Nov", IPTU: 73, ISS: 135, ITBI: 0, Taxas: 31 },
];

const DIVIDA = [
    ["2023/00124", "João da Silva", "IPTU", "2021", 2480, 3120, "Inadimplente"],
    ["2023/00125", "Maria Oliveira", "ISS", "2022", 8400, 10200, "Parcelado"],
    ["2024/00876", "Construtora ABC", "ITBI", "2024", 15200, 16800, "Inadimplente"],
    ["2023/00541", "Ana Souza", "IPTU", "2020 a 2023", 6800, 9420, "Em ajuizamento"],
    ["2024/00982", "Comércio XYZ", "ISS", "2023", 4200, 4910, "Parcelado"],
    ["2023/00302", "Pedro Costa", "IPTU", "2022", 1840, 2280, "Inadimplente"],
];

const NFSE = [
    { numero: "NFS-e 000842", prestador: "Clínica São Lucas Ltda", servico: "Serviços médicos", competencia: "Nov/2025", valor: 12400, iss: 496, situacao: "Ativa" },
    { numero: "NFS-e 000841", prestador: "TI Soluções Ltda", servico: "Desenvolvimento de software", competencia: "Nov/2025", valor: 7000, iss: 280, situacao: "Ativa" },
    { numero: "NFS-e 000840", prestador: "Advocacia Nogueira", servico: "Consultoria jurídica", competencia: "Nov/2025", valor: 5500, iss: 220, situacao: "Ativa" },
    { numero: "NFS-e 000839", prestador: "Studio Clean Limpeza", servico: "Serviços de limpeza", competencia: "Nov/2025", valor: 8200, iss: 328, situacao: "Cancelada" },
    { numero: "NFS-e 000838", prestador: "Escola de Idiomas Master", servico: "Cursos de idiomas", competencia: "Out/2025", valor: 3600, iss: 144, situacao: "Ativa" },
    { numero: "NFS-e 000837", prestador: "Contabilidade Ferreira", servico: "Serviços contábeis", competencia: "Out/2025", valor: 4200, iss: 168, situacao: "Ativa" },
];

export function Tributacao() {
    const [tab, setTab] = useState("painel");
    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Tributação e Arrecadação" breadcrumb={["SMGPI", "M05 — Tributação"]} />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["painel", "Painel"], ["contrib", "Contribuintes"], ["iptu", "IPTU"], ["nfse", "NFS-e"], ["divida", "Dívida Ativa"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "painel" && <>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                    <StatCard label="IPTU arrecadado" value="R$ 1,38M" change="+8,2%" changeType="up" icon={<Receipt size={18} />} accent="var(--mod-tributacao)" />
                    <StatCard label="ISS arrecadado" value="R$ 1,28M" change="+12,4%" changeType="up" icon={<Building size={18} />} accent="var(--color-info)" />
                    <StatCard label="ITBI" value="R$ 495k" change="-3,1%" changeType="down" icon={<FileCheck size={18} />} accent="var(--color-success)" />
                    <StatCard label="Dívida ativa inscrita" value="R$ 4,82M" change="2.341 inscrições" icon={<TrendingDown size={18} />} accent="var(--color-danger)" />
                    <StatCard label="Certidões emitidas (mês)" value="487" icon={<FileText size={18} />} accent="var(--color-text-secondary)" />
                </div>
                <Panel title="Arrecadação mensal por tributo (R$ mil)">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={ARREC} stackOffset="none">
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4DC" vertical={false} />
                            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                            <Area type="monotone" stackId="1" dataKey="IPTU" stroke="#E65100" fill="#E65100" fillOpacity={0.7} />
                            <Area type="monotone" stackId="1" dataKey="ISS" stroke="#1565C0" fill="#1565C0" fillOpacity={0.7} />
                            <Area type="monotone" stackId="1" dataKey="ITBI" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.7} />
                            <Area type="monotone" stackId="1" dataKey="Taxas" stroke="#6A1B9A" fill="#6A1B9A" fillOpacity={0.7} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Panel>
            </>}

            {tab === "contrib" && <Panel title="Buscar contribuinte">
                <div className="relative max-w-2xl mb-6">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                    <input className="smgpi-input pl-9" placeholder="CPF, CNPJ ou nome..." defaultValue="123.456.789-00" />
                </div>
                <div className="smgpi-card-lg p-5" style={{ background: "var(--color-surface-2)" }}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-display font-bold text-lg">João da Silva Almeida</h3>
                            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>CPF 123.456.789-00 · Rua das Acácias, 142</p>
                        </div>
                        <StatusBadge status="Com débitos" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Imóveis</div><div className="font-display font-bold text-xl">3</div></div>
                        <div><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Débitos abertos</div><div className="font-display font-bold text-xl" style={{ color: "var(--color-danger)" }}>R$ 8.420</div></div>
                        <div><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Pago em 2025</div><div className="font-display font-bold text-xl" style={{ color: "var(--color-success)" }}>R$ 2.180</div></div>
                        <div><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Certidões</div><div className="font-display font-bold text-xl">4</div></div>
                    </div>
                </div>
            </Panel>}

            {tab === "iptu" && <Panel title="Lançamento de IPTU — Exercício 2026"
                action={<button className="smgpi-btn smgpi-btn-primary"><Plus size={14} /> Lançar carnês em massa</button>}>
                <table className="smgpi-table">
                    <thead><tr><th>Inscrição</th><th>Proprietário</th><th>Endereço</th><th>Valor venal</th><th>IPTU 2026</th><th>Situação</th></tr></thead>
                    <tbody>
                        {[
                            ["01.001.0124", "João Silva", "R. Acácias, 142", 128000, 2480, "Em dia"],
                            ["01.001.0125", "Maria Oliveira", "R. Pedras, 89", 96000, 1840, "Inadimplente"],
                            ["02.003.0876", "Construtora ABC", "Av. Principal, 1200", 480000, 9620, "Parcelado"],
                            ["01.002.0541", "Ana Souza", "Travessa Sol, 12", 84000, 1640, "Em dia"],
                            ["03.001.0982", "Comércio XYZ", "R. Mercado, 45", 210000, 4180, "Em dia"],
                        ].map((r: any) => (
                            <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td>{r[1]}</td>
                                <td className="text-sm">{r[2]}</td><td>{fmtBRL(r[3])}</td><td className="font-semibold">{fmtBRL(r[4])}</td>
                                <td><StatusBadge status={r[5]} /></td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {/* ── NOVA ABA: NFS-e ── */}
            {tab === "nfse" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="NFS-e emitidas (mês)" value="842" change="+34 vs out" changeType="up" icon={<FileText size={18} />} accent="var(--mod-tributacao)" />
                    <StatCard label="ISS apurado (mês)" value="R$ 51.240" change="+12,8%" changeType="up" icon={<Receipt size={18} />} accent="var(--color-success)" />
                    <StatCard label="Prestadores ativos" value="187" icon={<Building size={18} />} accent="var(--color-info)" />
                    <StatCard label="DMS pendentes" value="12" change="prazo 10/12" changeType="down" icon={<AlertTriangle size={18} />} accent="var(--color-warning)" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    {/* Emissão rápida */}
                    <Panel title="Emitir NFS-e" className="lg:col-span-1">
                        <div className="space-y-3 text-sm">
                            <div>
                                <label className="text-xs font-semibold block mb-1">CPF / CNPJ do prestador</label>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                                    <input className="smgpi-input pl-9" placeholder="000.000.000-00" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold block mb-1">Discriminação do serviço</label>
                                <textarea className="smgpi-input resize-none" rows={3} placeholder="Descreva o serviço prestado..." />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-semibold block mb-1">Valor do serviço</label>
                                    <input className="smgpi-input" placeholder="R$ 0,00" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold block mb-1">Competência</label>
                                    <input className="smgpi-input" placeholder="Nov/2025" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold block mb-1">Código do serviço (LC 116)</label>
                                <select className="smgpi-input">
                                    <option>1.01 — Análise e desenvolvimento de sistemas</option>
                                    <option>4.01 — Medicina e biomedicina</option>
                                    <option>7.02 — Execução de obras</option>
                                    <option>17.01 — Assessoria e consultoria</option>
                                </select>
                            </div>
                            <div className="p-3 rounded-md" style={{ background: "var(--color-surface-2)" }}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span style={{ color: "var(--color-text-muted)" }}>Alíquota ISS</span>
                                    <span className="font-semibold">4,00%</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span style={{ color: "var(--color-text-muted)" }}>ISS a recolher</span>
                                    <span className="font-semibold" style={{ color: "var(--color-primary)" }}>R$ 0,00</span>
                                </div>
                            </div>
                            <button className="smgpi-btn smgpi-btn-primary w-full">
                                <Send size={14} /> Emitir NFS-e
                            </button>
                        </div>
                    </Panel>

                    {/* Lista de NFS-e */}
                    <Panel title="NFS-e emitidas — novembro/2025" className="lg:col-span-2"
                        action={<button className="smgpi-btn smgpi-btn-ghost text-xs">Exportar XML</button>}>
                        <table className="smgpi-table">
                            <thead><tr><th>Número</th><th>Prestador</th><th>Serviço</th><th>Competência</th><th>Valor</th><th>ISS</th><th>Situação</th></tr></thead>
                            <tbody>
                                {NFSE.map((n) => (
                                    <tr key={n.numero}>
                                        <td className="font-mono text-xs">{n.numero}</td>
                                        <td className="font-semibold text-sm">{n.prestador}</td>
                                        <td className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{n.servico}</td>
                                        <td className="text-xs">{n.competencia}</td>
                                        <td className="font-semibold">{fmtBRL(n.valor)}</td>
                                        <td style={{ color: "var(--color-info)" }}>{fmtBRL(n.iss)}</td>
                                        <td><StatusBadge status={n.situacao === "Cancelada" ? "Cancelado" : "Ativo"} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between items-center mt-4 text-xs pt-3 border-t" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                            <span>Exibindo 1–6 de 842 registros</span>
                            <div className="flex gap-1">
                                <button className="smgpi-btn smgpi-btn-ghost h-8 px-3">Anterior</button>
                                <button className="smgpi-btn smgpi-btn-primary h-8 px-3">Próximo</button>
                            </div>
                        </div>
                    </Panel>
                </div>

                {/* DMS */}
                <Panel title="DMS — Declaração Mensal de Serviços">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            ["Clínica São Lucas Ltda", "12.345.678/0001-01", "Entregue", "Nov/2025"],
                            ["TI Soluções Ltda", "98.765.432/0001-02", "Entregue", "Nov/2025"],
                            ["Studio Clean Limpeza", "55.444.333/0001-03", "Pendente", "Nov/2025"],
                            ["Advocacia Nogueira", "11.222.333/0001-04", "Pendente", "Nov/2025"],
                            ["Escola de Idiomas Master", "77.666.555/0001-05", "Entregue", "Out/2025"],
                            ["Contabilidade Ferreira", "33.111.222/0001-06", "Entregue", "Out/2025"],
                        ].map(([nome, cnpj, status, comp]: any) => (
                            <div key={cnpj} className="smgpi-card p-3 flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate">{nome}</div>
                                    <div className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{cnpj}</div>
                                    <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{comp}</div>
                                </div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <StatusBadge status={status === "Entregue" ? "Concluído" : "Pendente"} />
                                    {status === "Pendente" && (
                                        <button className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>Notificar</button>
                                    )}
                                    {status === "Entregue" && (
                                        <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-success)" }}>
                                            <CheckCircle2 size={12} /> Recebida
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Panel>
            </>}

            {tab === "divida" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Inscrições ativas" value="2.341" icon={<AlertTriangle size={18} />} accent="var(--color-danger)" />
                    <StatCard label="Valor inscrito" value="R$ 4,82M" icon={<Receipt size={18} />} accent="var(--color-warning)" />
                    <StatCard label="Em parcelamento" value="312" icon={<FileCheck size={18} />} accent="var(--color-info)" />
                    <StatCard label="Em ajuizamento" value="89" icon={<FileText size={18} />} accent="var(--color-text-secondary)" />
                </div>
                <Panel title="Inscrições em dívida ativa">
                    <table className="smgpi-table">
                        <thead><tr><th>CDA</th><th>Contribuinte</th><th>Tributo</th><th>Exercício</th><th>Original</th><th>Atualizado</th><th>Situação</th></tr></thead>
                        <tbody>
                            {DIVIDA.map((r: any) => (
                                <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td>{r[1]}</td>
                                    <td>{r[2]}</td><td className="text-xs">{r[3]}</td>
                                    <td>{fmtBRL(r[4])}</td><td className="font-semibold">{fmtBRL(r[5])}</td>
                                    <td><StatusBadge status={r[6]} /></td></tr>
                            ))}
                        </tbody>
                    </table>
                </Panel>
            </>}
        </div>
    );
}
