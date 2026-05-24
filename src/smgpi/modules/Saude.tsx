import { useState } from "react";
import { HeartPulse, Syringe, Pill, Users, Activity, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";
import { MEDICAMENTOS } from "../data";

const UBS_PROD = [
    { ubs: "UBS Centro", consultas: 1240, vacinas: 340 },
    { ubs: "UBS Alto Bonito", consultas: 892, vacinas: 215 },
    { ubs: "UBS Novo Horizonte", consultas: 1120, vacinas: 287 },
    { ubs: "UBS Distrito Areia", consultas: 540, vacinas: 142 },
];

const INDICADORES = [
    { name: "Pré-natal", value: 84, fill: "#00695C" },
    { name: "Saúde bucal", value: 72, fill: "#0277BD" },
    { name: "Hipertensão", value: 91, fill: "#1B5E20" },
    { name: "Diabetes", value: 88, fill: "#E65100" },
];

export function Saude() {
    const [tab, setTab] = useState("painel");
    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Saúde e Assistência Social" breadcrumb={["SMGPI", "M08"]} />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["painel", "Painel Saúde"], ["reg", "Regulação"], ["farm", "Farmácia"], ["cras", "CRAS"], ["cad", "CadÚnico"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "painel" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Atendimentos do mês" value="3.792" change="+8%" changeType="up" icon={<HeartPulse size={18} />} accent="var(--mod-saude)" />
                    <StatCard label="Cobertura vacinal" value="87%" icon={<Syringe size={18} />} accent="var(--color-success)" />
                    <StatCard label="Consultas reguladas" value="247" change="62 pendentes" icon={<Activity size={18} />} accent="var(--color-info)" />
                    <StatCard label="Produção SUS enviada" value="100%" change="Novembro" changeType="up" icon={<Pill size={18} />} accent="var(--color-warning)" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Panel title="Produção por UBS (mês)">
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={UBS_PROD}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4DC" vertical={false} />
                                <XAxis dataKey="ubs" tick={{ fontSize: 10, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                                <Bar dataKey="consultas" fill="#00695C" radius={[4, 4, 0, 0]} name="Consultas" />
                                <Bar dataKey="vacinas" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Vacinas" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Panel>
                    <Panel title="Indicadores Previne Brasil">
                        <ResponsiveContainer width="100%" height={260}>
                            <RadialBarChart innerRadius="20%" outerRadius="100%" data={INDICADORES}>
                                <RadialBar background dataKey="value" cornerRadius={6} />
                                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </Panel>
                </div>
            </>}

            {tab === "reg" && <Panel title="Fila de regulação — especialidades">
                <table className="smgpi-table">
                    <thead><tr><th>Paciente</th><th>Especialidade</th><th>Espera</th><th>Prioridade</th><th>Status</th></tr></thead>
                    <tbody>
                        {[
                            ["Maria das Graças", "Cardiologia", "42 dias", "Alta", "Aguardando"],
                            ["José Pereira", "Ortopedia", "18 dias", "Média", "Marcado 12/12"],
                            ["Ana Beatriz", "Oftalmologia", "65 dias", "Baixa", "Aguardando"],
                            ["Pedro Alves", "Neurologia", "120 dias", "Alta", "Encaminhado Salvador"],
                            ["Joana Lima", "Endocrinologia", "32 dias", "Média", "Aguardando"],
                        ].map((r: any) => (
                            <tr key={r[0]}><td className="font-semibold">{r[0]}</td><td>{r[1]}</td>
                                <td className="text-sm">{r[2]}</td>
                                <td><StatusBadge status={r[3] === "Alta" ? "Crítico" : r[3] === "Média" ? "Atenção" : "OK"} /></td>
                                <td className="text-sm">{r[4]}</td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "farm" && <Panel title="Farmácia Municipal — estoque" action={
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--color-danger)" }}>
                    <AlertTriangle size={12} /> 2 itens críticos · 1 vencendo
                </span>}>
                <table className="smgpi-table">
                    <thead><tr><th>Código</th><th>Medicamento</th><th>Saldo</th><th>Mínimo</th><th>Status</th></tr></thead>
                    <tbody>
                        {MEDICAMENTOS.map((m) => (
                            <tr key={m.codigo}><td className="font-mono text-xs">{m.codigo}</td><td className="font-semibold">{m.nome}</td>
                                <td className="font-bold">{m.saldo}</td><td>{m.minimo}</td>
                                <td><StatusBadge status={m.status === "OK" ? "OK" : m.status === "CRÍTICO" ? "Crítico" : "Atenção"} /></td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "cras" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Famílias acompanhadas" value="847" icon={<Users size={18} />} accent="var(--mod-compras)" />
                    <StatCard label="Atendimentos do mês" value="1.284" icon={<HeartPulse size={18} />} accent="var(--color-info)" />
                    <StatCard label="Situação crítica" value="34" change="+3 esta semana" changeType="down" icon={<AlertTriangle size={18} />} accent="var(--color-danger)" />
                    <StatCard label="Benefícios ativos" value="612" icon={<Activity size={18} />} accent="var(--color-success)" />
                </div>
                <Panel title="Famílias em acompanhamento">
                    <table className="smgpi-table">
                        <thead><tr><th>Responsável</th><th>NIS</th><th>Composição</th><th>Situação</th><th>Técnico</th></tr></thead>
                        <tbody>
                            {[
                                ["Maria das Dores", "12345678901", "4 pessoas", "Acompanhamento", "Beatriz Cardoso"],
                                ["Antônia Silva", "23456789012", "6 pessoas", "Crítico", "Ana Paula Ferreira"],
                                ["João Batista", "34567890123", "3 pessoas", "Acompanhamento", "Beatriz Cardoso"],
                                ["Lúcia Pereira", "45678901234", "5 pessoas", "Atenção", "Ana Paula Ferreira"],
                            ].map((r: any) => (
                                <tr key={r[1]}><td className="font-semibold">{r[0]}</td><td className="font-mono text-xs">{r[1]}</td>
                                    <td className="text-sm">{r[2]}</td>
                                    <td><StatusBadge status={r[3] === "Crítico" ? "Crítico" : r[3] === "Atenção" ? "Atenção" : "Ativo"} /></td>
                                    <td className="text-sm">{r[4]}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </Panel>
            </>}

            {tab === "cad" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Panel title="Distribuição de benefícios">
                    <div className="space-y-3">
                        {[
                            ["Bolsa Família", 412, "var(--color-primary)"],
                            ["BPC", 84, "var(--color-info)"],
                            ["Benefícios municipais", 116, "var(--color-warning)"],
                        ].map(([n, v, c]: any) => (
                            <div key={n}>
                                <div className="flex justify-between text-sm mb-1"><span className="font-semibold">{n}</span><span>{v} beneficiários</span></div>
                                <div className="h-2.5 rounded-full" style={{ background: "var(--color-surface-2)" }}>
                                    <div className="h-full rounded-full" style={{ width: `${v / 4.5}%`, background: c }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Panel>
                <Panel title="Beneficiários (amostra)">
                    <table className="smgpi-table">
                        <thead><tr><th>Nome</th><th>NIS</th><th>Benefício</th><th>Valor</th></tr></thead>
                        <tbody>
                            {[
                                ["Maria das Dores", "12345678901", "Bolsa Família", "R$ 614"],
                                ["José Carlos", "23456789012", "BPC", "R$ 1.412"],
                                ["Antônia Silva", "34567890123", "Bolsa Família", "R$ 800"],
                                ["João Batista", "45678901234", "Municipal", "R$ 200"],
                            ].map((r: any) => (
                                <tr key={r[1]}><td>{r[0]}</td><td className="font-mono text-xs">{r[1]}</td>
                                    <td>{r[2]}</td><td className="font-semibold">{r[3]}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </Panel>
            </div>}
        </div>
    );
}
