import { useState } from "react";
import { HeartPulse, Syringe, Pill, Users, Activity, AlertTriangle, Shield, Baby, UserX, Home } from "lucide-react";
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
            <div className="flex gap-1 mb-4 border-b overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
                {[
                    ["painel", "Painel Saúde"],
                    ["reg", "Regulação"],
                    ["farm", "Farmácia"],
                    ["cras", "CRAS — Prot. Básica"],
                    ["creas", "CREAS — Prot. Especial"],
                    ["cad", "CadÚnico"],
                ].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold whitespace-nowrap"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {/* ── PAINEL SAÚDE ── */}
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

            {/* ── REGULAÇÃO ── */}
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

            {/* ── FARMÁCIA ── */}
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

            {/* ── CRAS — PROTEÇÃO BÁSICA ── */}
            {tab === "cras" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Famílias acompanhadas" value="847" icon={<Users size={18} />} accent="var(--mod-saude)" />
                    <StatCard label="Atendimentos do mês" value="1.284" icon={<HeartPulse size={18} />} accent="var(--color-info)" />
                    <StatCard label="Situação crítica" value="34" change="+3 esta semana" changeType="down" icon={<AlertTriangle size={18} />} accent="var(--color-danger)" />
                    <StatCard label="Benefícios ativos" value="612" icon={<Activity size={18} />} accent="var(--color-success)" />
                </div>

                {/* Grupos do PAIF e SCFV */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <Panel title="PAIF — Grupos ativos">
                        <div className="space-y-2">
                            {[
                                ["Grupo de Mulheres", "Terças 14h", 18, "Beatriz Cardoso"],
                                ["Grupo de Idosos", "Quintas 9h", 24, "Ana Paula Ferreira"],
                                ["Grupo Intergeracional", "Sextas 10h", 14, "Beatriz Cardoso"],
                            ].map(([nome, horario, participantes, tecnico]: any) => (
                                <div key={nome} className="p-3 rounded-md" style={{ background: "var(--color-surface-2)" }}>
                                    <div className="flex items-center justify-between">
                                        <div className="font-semibold text-sm">{nome}</div>
                                        <span className="text-xs font-bold" style={{ color: "var(--mod-saude)" }}>{participantes} participantes</span>
                                    </div>
                                    <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{horario} · {tecnico}</div>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel title="SCFV — Convivência por faixa etária">
                        <div className="space-y-3 pt-1">
                            {[
                                ["Crianças (6–11 anos)", 42, "#0277BD"],
                                ["Adolescentes (12–17)", 38, "#00695C"],
                                ["Jovens (18–29)", 21, "#E65100"],
                                ["Idosos (60+)", 67, "#6A1B9A"],
                            ].map(([faixa, n, cor]: any) => (
                                <div key={faixa}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-semibold">{faixa}</span>
                                        <span>{n} participantes</span>
                                    </div>
                                    <div className="h-2 rounded-full" style={{ background: "var(--color-surface-2)" }}>
                                        <div className="h-full rounded-full" style={{ width: `${(n / 80) * 100}%`, background: cor }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel title="RMA — Relatório do mês">
                        <div className="space-y-3 text-sm">
                            {[
                                ["Atendimentos individuais", "384"],
                                ["Atendimentos em grupo", "612"],
                                ["Visitas domiciliares", "128"],
                                ["Busca ativa realizada", "47"],
                                ["Encaminhamentos", "89"],
                                ["Famílias em descumprimento", "12"],
                            ].map(([k, v]: any) => (
                                <div key={k} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                                    <span style={{ color: "var(--color-text-secondary)" }}>{k}</span>
                                    <span className="font-bold">{v}</span>
                                </div>
                            ))}
                            <button className="smgpi-btn smgpi-btn-primary w-full mt-2">Enviar RMA à Rede SUAS</button>
                        </div>
                    </Panel>
                </div>

                <Panel title="Famílias em acompanhamento">
                    <table className="smgpi-table">
                        <thead><tr><th>Responsável</th><th>NIS</th><th>Composição</th><th>Situação</th><th>Técnico responsável</th></tr></thead>
                        <tbody>
                            {[
                                ["Maria das Dores", "12345678901", "4 pessoas", "Acompanhamento", "Beatriz Cardoso"],
                                ["Antônia Silva", "23456789012", "6 pessoas", "Crítico", "Ana Paula Ferreira"],
                                ["João Batista", "34567890123", "3 pessoas", "Acompanhamento", "Beatriz Cardoso"],
                                ["Lúcia Pereira", "45678901234", "5 pessoas", "Atenção", "Ana Paula Ferreira"],
                                ["Raimundo Costa", "56789012345", "2 pessoas", "Acompanhamento", "Beatriz Cardoso"],
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

            {/* ── CREAS — PROTEÇÃO ESPECIAL ── */}
            {tab === "creas" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Famílias em PAEFI" value="124" icon={<Shield size={18} />} accent="var(--color-danger)" />
                    <StatCard label="MSE — Adolescentes" value="18" change="meio aberto" icon={<UserX size={18} />} accent="var(--color-warning)" />
                    <StatCard label="Em acolhimento" value="9" change="3 crianças · 6 adultos" icon={<Home size={18} />} accent="var(--color-info)" />
                    <StatCard label="Pop. de rua abordada" value="31" change="este mês" icon={<Baby size={18} />} accent="var(--color-text-secondary)" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {/* PAEFI */}
                    <Panel title="PAEFI — Famílias em situação de risco">
                        <table className="smgpi-table">
                            <thead><tr><th>Responsável</th><th>Situação de risco</th><th>Desde</th><th>Técnico</th></tr></thead>
                            <tbody>
                                {[
                                    ["Josefa Lima", "Violência doméstica", "Mar/2025", "Ana Paula Ferreira"],
                                    ["Carlos Mendes", "Negligência infantil", "Jun/2025", "Beatriz Cardoso"],
                                    ["Tereza Santos", "Uso de drogas", "Ago/2025", "Ana Paula Ferreira"],
                                    ["Marcos Rocha", "Exploração de trabalho infantil", "Out/2025", "Beatriz Cardoso"],
                                ].map(([nome, sit, desde, tec]: any) => (
                                    <tr key={nome}>
                                        <td className="font-semibold">{nome}</td>
                                        <td className="text-sm" style={{ color: "var(--color-danger)" }}>{sit}</td>
                                        <td className="text-xs">{desde}</td>
                                        <td className="text-xs">{tec}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Panel>

                    {/* MSE */}
                    <Panel title="MSE — Medidas Socioeducativas (meio aberto)">
                        <div className="space-y-2">
                            {[
                                ["Lucas Almeida", "17 anos", "PSC — Prestação de serviços à comunidade", "Em cumprimento", "45 de 120h"],
                                ["Pedro Souza", "16 anos", "LA — Liberdade assistida", "Em cumprimento", "4 de 12 meses"],
                                ["Thiago Costa", "15 anos", "LA — Liberdade assistida", "Atenção", "8 de 12 meses"],
                            ].map(([nome, idade, medida, status, progresso]: any) => (
                                <div key={nome} className="p-3 rounded-md" style={{ background: "var(--color-surface-2)" }}>
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="font-semibold text-sm">{nome} <span className="text-xs font-normal" style={{ color: "var(--color-text-muted)" }}>· {idade}</span></div>
                                            <div className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{medida}</div>
                                        </div>
                                        <StatusBadge status={status === "Atenção" ? "Atenção" : "Ativo"} />
                                    </div>
                                    <div className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>Progresso: {progresso}</div>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>

                {/* Acolhimento Institucional */}
                <Panel title="Acolhimento institucional — unidades">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            ["Casa Lar Infantil", "Crianças e adolescentes", 3, 8, "Em dia"],
                            ["Abrigo Municipal Adulto", "Adultos em situação de rua", 6, 15, "Atenção"],
                            ["Família Acolhedora", "Crianças em guarda", 4, 10, "Em dia"],
                        ].map(([nome, tipo, ocupados, capacidade, status]: any) => (
                            <div key={nome} className="smgpi-card p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Home size={16} style={{ color: "var(--color-info)" }} />
                                    <StatusBadge status={status === "Atenção" ? "Atenção" : "Ativo"} />
                                </div>
                                <div className="font-display font-bold text-base">{nome}</div>
                                <div className="text-xs mb-3" style={{ color: "var(--color-text-muted)" }}>{tipo}</div>
                                <div className="flex items-end justify-between mb-1">
                                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Ocupação</span>
                                    <span className="font-bold text-sm">{ocupados} / {capacidade}</span>
                                </div>
                                <div className="h-2 rounded-full" style={{ background: "var(--color-surface-2)" }}>
                                    <div className="h-full rounded-full" style={{
                                        width: `${(ocupados / capacidade) * 100}%`,
                                        background: (ocupados / capacidade) > 0.8 ? "var(--color-warning)" : "var(--color-success)"
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Panel>
            </>}

            {/* ── CADÚNICO ── */}
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
