import { useState } from "react";
import { HardHat, MapPin, ChevronLeft, Camera, FileText, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";
import { OBRAS, fmtBRL } from "../data";

export function Obras() {
    const [tab, setTab] = useState("painel");
    const [obra, setObra] = useState<typeof OBRAS[number] | null>(null);
    if (obra) return <DetalheObra o={obra} onBack={() => setObra(null)} />;

    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Obras, Urbanismo e Meio Ambiente" breadcrumb={["SMGPI", "M10"]}
                actions={<button className="smgpi-btn smgpi-btn-primary"><Plus size={14} /> Nova obra</button>} />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["painel", "Painel"], ["lista", "Obras"], ["alv", "Alvarás"], ["fisc", "Fiscalização"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "painel" && <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <StatCard label="Em andamento" value="14" icon={<HardHat size={18} />} accent="var(--mod-obras)" />
                    <StatCard label="Concluídas no ano" value="9" icon={<HardHat size={18} />} accent="var(--color-success)" />
                    <StatCard label="Valor em execução" value="R$ 12,4M" icon={<FileText size={18} />} accent="var(--color-info)" />
                    <StatCard label="Com atraso" value="3" changeType="down" change="atenção" icon={<HardHat size={18} />} accent="var(--color-danger)" />
                </div>
                <Panel title="Mapa das obras ativas">
                    <div className="relative h-72 rounded-lg overflow-hidden" style={{ background: "linear-gradient(135deg,#FFF3E0,#F8F8F5)" }}>
                        <svg className="absolute inset-0 w-full h-full opacity-30">
                            <defs><pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F57F17" strokeWidth="0.5" /></pattern></defs>
                            <rect width="100%" height="100%" fill="url(#grid2)" />
                        </svg>
                        {OBRAS.slice(0, 6).map((o, i) => {
                            const positions = [[20, 30], [45, 25], [68, 40], [35, 60], [75, 65], [55, 78]];
                            const cor = o.situacao === "Com atraso" ? "var(--color-danger)" : o.situacao === "Concluída" ? "var(--color-success)" : "var(--mod-obras)";
                            return (
                                <div key={o.numero} className="absolute" style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%`, transform: "translate(-50%,-100%)" }}>
                                    <MapPin size={32} style={{ color: cor, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }} />
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold smgpi-card px-2 py-0.5">{o.numero}</div>
                                </div>
                            );
                        })}
                    </div>
                </Panel>
            </>}

            {tab === "lista" && <Panel title="Obras">
                <table className="smgpi-table">
                    <thead><tr><th>Nº</th><th>Descrição</th><th>Local</th><th>Valor</th><th>Execução</th><th>Prazo</th><th>Situação</th></tr></thead>
                    <tbody>
                        {OBRAS.map((o) => (
                            <tr key={o.numero} className="cursor-pointer" onClick={() => setObra(o)}>
                                <td className="font-mono text-xs">{o.numero}</td>
                                <td className="font-semibold">{o.desc}</td>
                                <td className="text-sm">{o.local}</td>
                                <td>{fmtBRL(o.valor)}</td>
                                <td><div className="flex items-center gap-2 w-32">
                                    <div className="flex-1 h-2 rounded-full" style={{ background: "var(--color-surface-2)" }}>
                                        <div className="h-full rounded-full" style={{
                                            width: `${o.executado}%`,
                                            background: o.situacao === "Com atraso" ? "var(--color-danger)" : "var(--mod-obras)"
                                        }} />
                                    </div>
                                    <span className="text-xs font-bold">{o.executado}%</span>
                                </div></td>
                                <td className="text-xs">{o.prazo}</td>
                                <td><StatusBadge status={o.situacao} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "alv" && <Panel title="Alvarás e licenças">
                <table className="smgpi-table">
                    <thead><tr><th>Protocolo</th><th>Tipo</th><th>Requerente</th><th>Endereço</th><th>Data</th><th>Situação</th></tr></thead>
                    <tbody>
                        {[
                            ["ALV-2025-0124", "Construção", "João da Silva", "R. Acácias, 142", "15/11/2025", "Em análise"],
                            ["ALV-2025-0125", "Reforma", "Construtora ABC", "Av. Principal, 1200", "12/11/2025", "Aprovado"],
                            ["ALV-2025-0126", "Funcionamento", "Comércio XYZ", "R. Mercado, 45", "10/11/2025", "Aprovado"],
                            ["ALV-2025-0127", "Demolição", "Maria Oliveira", "R. Pedras, 89", "08/11/2025", "Pendente"],
                        ].map((r: any) => (
                            <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td>{r[1]}</td>
                                <td className="font-semibold">{r[2]}</td><td className="text-sm">{r[3]}</td>
                                <td className="text-xs">{r[4]}</td><td><StatusBadge status={r[5]} /></td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "fisc" && <Panel title="Autos de infração">
                <table className="smgpi-table">
                    <thead><tr><th>Auto</th><th>Infrator</th><th>Infração</th><th>Data</th><th>Agente</th><th>Situação</th></tr></thead>
                    <tbody>
                        {[
                            ["AI-2025-0042", "Construtora ABC", "Obra sem alvará", "20/11/2025", "Carlos Vieira", "Notificado"],
                            ["AI-2025-0041", "Comércio XYZ", "Publicidade irregular", "18/11/2025", "Roberto Silva", "Pago"],
                            ["AI-2025-0040", "João Souza", "Descarte irregular", "15/11/2025", "Carlos Vieira", "Em recurso"],
                        ].map((r: any) => (
                            <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td className="font-semibold">{r[1]}</td>
                                <td className="text-sm">{r[2]}</td><td className="text-xs">{r[3]}</td>
                                <td className="text-sm">{r[4]}</td><td><StatusBadge status={r[5] === "Pago" ? "Concluído" : r[5] === "Notificado" ? "Atenção" : "Em andamento"} /></td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}
        </div>
    );
}

function DetalheObra({ o, onBack }: { o: typeof OBRAS[number]; onBack: () => void }) {
    const curva = [
        { mes: "Jul", previsto: 10, realizado: 8 },
        { mes: "Ago", previsto: 25, realizado: 22 },
        { mes: "Set", previsto: 42, realizado: 40 },
        { mes: "Out", previsto: 60, realizado: 55 },
        { mes: "Nov", previsto: 78, realizado: o.executado },
    ];
    return (
        <div className="smgpi-fade-in">
            <button onClick={onBack} className="flex items-center gap-1 text-sm mb-4 hover:underline" style={{ color: "var(--color-primary)" }}>
                <ChevronLeft size={14} /> Voltar
            </button>
            <PageHeader title={o.desc} subtitle={`${o.local} · ${o.numero}`} breadcrumb={["Obras", o.numero]} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <StatCard label="Valor contratado" value={fmtBRL(o.valor)} icon={<HardHat size={18} />} accent="var(--mod-obras)" />
                <StatCard label="Execução" value={`${o.executado}%`} icon={<HardHat size={18} />} accent="var(--color-info)" />
                <StatCard label="Prazo" value={o.prazo} icon={<HardHat size={18} />} accent={o.situacao === "Com atraso" ? "var(--color-danger)" : "var(--color-success)"} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Panel title="Curva S — previsto x realizado" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={curva}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4DC" vertical={false} />
                            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#5A5A72" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: "#5A5A72" }} axisLine={false} tickLine={false} unit="%" />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                            <Line type="monotone" dataKey="previsto" stroke="#9090A8" strokeDasharray="4 4" strokeWidth={2} />
                            <Line type="monotone" dataKey="realizado" stroke="#C41E3A" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Panel>
                <Panel title="Galeria de fotos">
                    <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="aspect-square rounded-md flex items-center justify-center" style={{ background: "var(--color-surface-2)" }}>
                                <Camera size={32} style={{ color: "var(--color-text-muted)" }} />
                            </div>
                        ))}
                    </div>
                </Panel>
            </div>
            <Panel title="Diário de obra (últimos registros)" className="mt-4">
                <div className="space-y-3">
                    {[
                        ["27/11/2025", "Concretagem da laje superior. Efetivo: 18. Sem ocorrências.", "Marcos Pereira"],
                        ["26/11/2025", "Armação de pilares 3º pav. Efetivo: 14.", "Marcos Pereira"],
                        ["25/11/2025", "Chuva forte pela manhã. Atividade reduzida. Efetivo: 8.", "Marcos Pereira"],
                    ].map((d: any) => (
                        <div key={d[0]} className="flex gap-4 pb-3 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                            <div className="text-xs font-bold w-20" style={{ color: "var(--color-primary)" }}>{d[0]}</div>
                            <div className="flex-1 text-sm">{d[1]}</div>
                            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{d[2]}</div>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
}
