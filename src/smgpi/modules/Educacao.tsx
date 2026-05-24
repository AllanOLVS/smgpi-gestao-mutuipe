import { useState } from "react";
import { GraduationCap, School, Users, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";

const MATRICULAS = [
    { escola: "EMEF João da Mata", EI: 120, EF1: 340, EF2: 280 },
    { escola: "EMEF Centro", EI: 95, EF1: 412, EF2: 325 },
    { escola: "EMEI Bairro Novo", EI: 285, EF1: 0, EF2: 0 },
    { escola: "EMEF Areia", EI: 78, EF1: 198, EF2: 148 },
    { escola: "EMEF Alto Bonito", EI: 104, EF1: 267, EF2: 212 },
];

export function Educacao() {
    const [tab, setTab] = useState("painel");
    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Educação Municipal" breadcrumb={["SMGPI", "M09"]} />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["painel", "Painel"], ["mat", "Matrículas"], ["freq", "Frequência"], ["fundeb", "FUNDEB"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "painel" && <>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                    <StatCard label="Alunos matriculados" value="4.231" icon={<GraduationCap size={18} />} accent="var(--mod-educacao)" />
                    <StatCard label="Escolas da rede" value="18" icon={<School size={18} />} accent="var(--color-info)" />
                    <StatCard label="Professores" value="324" icon={<Users size={18} />} accent="var(--color-warning)" />
                    <StatCard label="Frequência média" value="92,4%" change="+1,8%" changeType="up" icon={<Award size={18} />} accent="var(--color-success)" />
                    <StatCard label="IDEB" value="4.8" change="meta 4.6" changeType="up" icon={<Award size={18} />} accent="var(--color-primary)" />
                </div>
                <Panel title="Matrículas por escola e etapa">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={MATRICULAS}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4DC" vertical={false} />
                            <XAxis dataKey="escola" tick={{ fontSize: 10, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                            <Bar dataKey="EI" stackId="a" fill="#0277BD" name="Ed. Infantil" />
                            <Bar dataKey="EF1" stackId="a" fill="#1565C0" name="EF Anos Iniciais" />
                            <Bar dataKey="EF2" stackId="a" fill="#0d47a1" name="EF Anos Finais" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Panel>
            </>}

            {tab === "mat" && <Panel title="Matrículas — busca e listagem">
                <input className="smgpi-input mb-4 max-w-md" placeholder="Buscar aluno por nome ou matrícula..." />
                <table className="smgpi-table">
                    <thead><tr><th>Matrícula</th><th>Aluno</th><th>Escola</th><th>Turma</th><th>Turno</th><th>Situação</th></tr></thead>
                    <tbody>
                        {[
                            ["A-2025-0124", "Lucas Almeida Silva", "EMEF João da Mata", "5º A", "Manhã", "Ativo"],
                            ["A-2025-0125", "Beatriz Costa", "EMEF Centro", "8º B", "Manhã", "Ativo"],
                            ["A-2025-0126", "Gabriel Pereira", "EMEI Bairro Novo", "Pré II", "Tarde", "Ativo"],
                            ["A-2025-0127", "Letícia Souza", "EMEF Areia", "3º A", "Manhã", "Transferido"],
                            ["A-2025-0128", "Mateus Oliveira", "EMEF Alto Bonito", "7º C", "Tarde", "Ativo"],
                        ].map((r: any) => (
                            <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td className="font-semibold">{r[1]}</td>
                                <td className="text-sm">{r[2]}</td><td>{r[3]}</td><td className="text-sm">{r[4]}</td>
                                <td><StatusBadge status={r[5]} /></td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "freq" && <>
                <Panel className="mb-4">
                    <div className="flex gap-3">
                        <select className="smgpi-input" style={{ width: 220 }}><option>EMEF João da Mata</option></select>
                        <select className="smgpi-input" style={{ width: 140 }}><option>5º A</option></select>
                        <input type="date" className="smgpi-input" style={{ width: 170 }} defaultValue="2025-11-27" />
                    </div>
                </Panel>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Panel title="Chamada do dia" className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {["Lucas Almeida", "Beatriz Costa", "Gabriel Pereira", "Letícia Souza", "Mateus Oliveira", "Sofia Lima", "João Pedro", "Maria Eduarda", "Pedro Henrique", "Rafael Santos"].map((n, i) => (
                                <label key={n} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[var(--color-surface-2)] cursor-pointer">
                                    <input type="checkbox" defaultChecked={i !== 3} className="w-4 h-4 accent-[var(--color-primary)]" />
                                    <span className="flex-1 text-sm font-semibold">{n}</span>
                                    <span className="text-xs" style={{ color: i === 3 ? "var(--color-danger)" : "var(--color-success)" }}>
                                        {i === 3 ? "Falta" : "Presente"}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </Panel>
                    <Panel title="Frequência < 75%" action={<span className="smgpi-badge" style={{ background: "var(--color-danger-light)", color: "var(--color-danger)" }}>Notificar</span>}>
                        <div className="space-y-2">
                            {[["Letícia Souza", "68%"], ["Carlos Mendes", "71%"], ["Yasmin Alves", "72%"]].map(([n, p]) => (
                                <div key={n} className="flex items-center justify-between p-2.5 rounded-md" style={{ background: "var(--color-danger-light)" }}>
                                    <span className="text-sm font-semibold">{n}</span>
                                    <span className="text-xs font-bold" style={{ color: "var(--color-danger)" }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>
            </>}

            {tab === "fundeb" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Receita educação 2025" value="R$ 9,82M" icon={<GraduationCap size={18} />} accent="var(--color-info)" />
                    <StatCard label="% do mínimo (25%)" value="27,4%" change="acima do mínimo" changeType="up" icon={<Award size={18} />} accent="var(--color-success)" />
                    <StatCard label="FUNDEB recebido" value="R$ 6,84M" icon={<School size={18} />} accent="var(--color-warning)" />
                    <StatCard label="% em remuneração (mín. 70%)" value="74,2%" changeType="up" change="conforme LC 173" icon={<Users size={18} />} accent="var(--color-success)" />
                </div>
                <Panel title="Aplicação do FUNDEB por programa">
                    <table className="smgpi-table">
                        <thead><tr><th>Programa</th><th>Aplicado</th><th>% do total</th></tr></thead>
                        <tbody>
                            {[
                                ["Remuneração de profissionais", 5076000, 74.2],
                                ["Material didático", 680000, 9.9],
                                ["Transporte escolar", 420000, 6.1],
                                ["Formação continuada", 340000, 5.0],
                                ["Infraestrutura", 324000, 4.7],
                            ].map((r: any) => (
                                <tr key={r[0]}><td className="font-semibold">{r[0]}</td>
                                    <td>R$ {r[1].toLocaleString("pt-BR")}</td><td>{r[2]}%</td></tr>
                            ))}
                        </tbody>
                    </table>
                </Panel>
            </>}
        </div>
    );
}
