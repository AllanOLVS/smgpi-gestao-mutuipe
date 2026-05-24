import {
    TrendingUp, TrendingDown, Wallet, Users, FileText, HardHat,
    RefreshCw, AlertTriangle, Calendar, HeartPulse, GraduationCap, Building2, ShieldAlert,
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { PageHeader, StatCard, Panel, AlertBanner } from "../components/ui";
import { EXECUCAO_ORC, DESPESAS_SECRETARIA, ALERTAS, OBRIGACOES, fmtBRL } from "../data";

export function Dashboard() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

    return (
        <div className="smgpi-fade-in">
            <PageHeader
                title="Bom dia, Administrador"
                subtitle={dateStr.charAt(0).toUpperCase() + dateStr.slice(1) + " · Exercício 2025"}
                actions={
                    <button className="smgpi-btn smgpi-btn-ghost">
                        <RefreshCw size={14} /> Atualizar dados
                    </button>
                }
            />

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <StatCard label="Receita arrecadada (mês)" value="R$ 8,24M" change="+12,4%" changeType="up"
                    icon={<Wallet size={20} />} accent="var(--color-success)" />
                <StatCard label="Despesa empenhada · 83,6% LOA" value="R$ 26,89M" change="83,6%" changeType="neutral"
                    icon={<TrendingDown size={20} />} accent="var(--color-primary)" />
                <StatCard label="Servidores ativos · +3 este mês" value="1.247" change="+3" changeType="up"
                    icon={<Users size={20} />} accent="var(--mod-rh)" />
                <StatCard label="Contratos vigentes · 7 vencendo" value="89" change="7 alerta" changeType="down"
                    icon={<FileText size={20} />} accent="var(--mod-compras)" />
                <StatCard label="Obras em andamento · 3 c/ atraso" value="14" change="3 atraso" changeType="down"
                    icon={<HardHat size={20} />} accent="var(--mod-obras)" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
                <Panel title="Execução Orçamentária — 2025" className="lg:col-span-3">
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={EXECUCAO_ORC} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                            <defs>
                                <linearGradient id="gPrev" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#9090A8" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#9090A8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gArr" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#C41E3A" stopOpacity={0.5} />
                                    <stop offset="100%" stopColor="#C41E3A" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4DC" vertical={false} />
                            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: "#5A5A72" }} axisLine={false} tickLine={false}
                                tickFormatter={(v) => `R$${v / 1000}M`} />
                            <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}k`}
                                contentStyle={{ border: "1px solid #E4E4DC", borderRadius: 10, fontSize: 12 }} />
                            <Area type="monotone" dataKey="previsto" stroke="#9090A8" fill="url(#gPrev)" strokeWidth={2} name="Previsto" />
                            <Area type="monotone" dataKey="arrecadado" stroke="#C41E3A" fill="url(#gArr)" strokeWidth={2.5} name="Arrecadado" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Panel>

                <Panel title="Despesas por Secretaria" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={DESPESAS_SECRETARIA} layout="vertical" margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4DC" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 10, fill: "#5A5A72" }} axisLine={false} tickLine={false}
                                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                            <YAxis type="category" dataKey="nome" tick={{ fontSize: 11, fill: "#1A1A2E" }} axisLine={false} tickLine={false} width={90} />
                            <Tooltip formatter={(v: number) => fmtBRL(v)}
                                contentStyle={{ border: "1px solid #E4E4DC", borderRadius: 10, fontSize: 12 }} />
                            <Bar dataKey="valor" radius={[0, 6, 6, 0]}>
                                {DESPESAS_SECRETARIA.map((d, i) => <Cell key={i} fill={d.cor} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Panel>
            </div>

            {/* Alerts + obligations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <Panel title="Alertas do Sistema" action={
                    <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--color-primary)" }}>
                        <AlertTriangle size={12} /> 5 ativos
                    </span>
                }>
                    <div className="space-y-2.5">
                        {ALERTAS.map((a, i) => (
                            <AlertBanner key={i} type={a.tipo as any} title={a.titulo} time={a.data} />
                        ))}
                    </div>
                </Panel>

                <Panel title="Próximas Obrigações Legais" action={
                    <span className="text-xs flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
                        <Calendar size={12} /> Dezembro
                    </span>
                }>
                    <div className="space-y-1">
                        {OBRIGACOES.map((o, i) => (
                            <div key={i} className="flex items-stretch gap-3 py-2.5 border-b last:border-0"
                                style={{ borderColor: "var(--color-border)" }}>
                                <div className="flex flex-col items-center" style={{ minWidth: 44 }}>
                                    <div className="font-display font-bold text-base" style={{ color: "var(--color-primary)" }}>
                                        {o.data.split("/")[0]}
                                    </div>
                                    <div className="text-[10px] uppercase font-bold" style={{ color: "var(--color-text-muted)" }}>DEZ</div>
                                </div>
                                <div className="w-px" style={{ background: "var(--color-border)" }} />
                                <div className="flex-1 text-sm py-1" style={{ color: "var(--color-text-primary)" }}>{o.desc}</div>
                            </div>
                        ))}
                    </div>
                </Panel>
            </div>

            {/* Setoriais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SetorialCard icon={<HeartPulse size={18} />} accent="var(--mod-saude)" titulo="Saúde"
                    kpi="87%" label="Cobertura vacinal" sub="Produção SUS em dia" />
                <SetorialCard icon={<ShieldAlert size={18} />} accent="var(--mod-compras)" titulo="Assistência Social"
                    kpi="847" label="Famílias acompanhadas" sub="3 alertas críticos" />
                <SetorialCard icon={<GraduationCap size={18} />} accent="var(--mod-educacao)" titulo="Educação"
                    kpi="4.231" label="Alunos matriculados" sub="IDEB 4.8" />
                <SetorialCard icon={<Building2 size={18} />} accent="var(--mod-obras)" titulo="Obras"
                    kpi="14" label="Obras em andamento" sub="R$ 12,4M em execução" />
            </div>
        </div>
    );
}

function SetorialCard({ icon, accent, titulo, kpi, label, sub }: any) {
    return (
        <div className="smgpi-card p-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{ background: `color-mix(in oklab, ${accent} 14%, transparent)`, color: accent }}>{icon}</div>
                <div className="font-semibold text-sm">{titulo}</div>
            </div>
            <div className="font-display font-bold text-2xl" style={{ color: accent }}>{kpi}</div>
            <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{label}</div>
            <div className="text-[11px] mt-2 pt-2 border-t" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>{sub}</div>
        </div>
    );
}
