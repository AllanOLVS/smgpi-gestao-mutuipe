import { useState } from "react";
import { Plus, Search, MoreVertical, FileText, Calendar as CalIcon, ChevronLeft } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";
import { SERVIDORES, fmtBRL } from "../data";
import { Users, UserCheck, UserPlus, Briefcase } from "lucide-react";

export function Pessoas() {
    const [tab, setTab] = useState<"lista" | "folha" | "ponto">("lista");
    const [selected, setSelected] = useState<typeof SERVIDORES[number] | null>(null);

    if (selected) return <FichaServidor s={selected} onBack={() => setSelected(null)} />;

    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Gestão de Pessoas" breadcrumb={["SMGPI", "M02 — Pessoas"]}
                subtitle="1.247 servidores · 892 efetivos · 312 comissionados · 43 temporários"
                actions={<button className="smgpi-btn smgpi-btn-primary"><Plus size={14} /> Novo servidor</button>}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard label="Servidores ativos" value="1.247" icon={<Users size={20} />} accent="var(--mod-rh)" />
                <StatCard label="Efetivos" value="892" change="71,5%" icon={<UserCheck size={20} />} accent="var(--color-success)" />
                <StatCard label="Comissionados" value="312" change="25,0%" icon={<Briefcase size={20} />} accent="var(--color-warning)" />
                <StatCard label="Admissões (mês)" value="3" change="+3" changeType="up" icon={<UserPlus size={20} />} accent="var(--color-info)" />
            </div>

            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["lista", "Servidores"], ["folha", "Folha de Pagamento"], ["ponto", "Ponto e Frequência"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k as any)}
                        className="px-4 py-2.5 text-sm font-semibold transition relative"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent",
                            marginBottom: -1,
                        }}>{l}</button>
                ))}
            </div>

            {tab === "lista" && <ListaServidores onOpen={setSelected} />}
            {tab === "folha" && <FolhaPagamento />}
            {tab === "ponto" && <PontoFrequencia />}
        </div>
    );
}

function ListaServidores({ onOpen }: { onOpen: (s: any) => void }) {
    return (
        <Panel>
            <div className="flex gap-2 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                    <input className="smgpi-input pl-9" placeholder="Buscar por nome, CPF ou matrícula..." />
                </div>
                <select className="smgpi-input" style={{ width: 180 }}><option>Todas secretarias</option></select>
                <select className="smgpi-input" style={{ width: 160 }}><option>Todos vínculos</option></select>
                <select className="smgpi-input" style={{ width: 140 }}><option>Todas situações</option></select>
            </div>
            <div className="overflow-x-auto">
                <table className="smgpi-table">
                    <thead><tr>
                        <th>Matrícula</th><th>Servidor</th><th>Cargo</th><th>Secretaria</th><th>Vínculo</th><th>Situação</th><th></th>
                    </tr></thead>
                    <tbody>
                        {SERVIDORES.map((s) => (
                            <tr key={s.matricula} onClick={() => onOpen(s)} className="cursor-pointer">
                                <td className="font-mono text-xs">{s.matricula}</td>
                                <td>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                                            style={{ background: "var(--color-sidebar)" }}>
                                            {s.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                        </div>
                                        <span className="font-semibold">{s.nome}</span>
                                    </div>
                                </td>
                                <td className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{s.cargo}</td>
                                <td className="text-sm">{s.secretaria}</td>
                                <td className="text-xs">{s.vinculo}</td>
                                <td><StatusBadge status={s.situacao} /></td>
                                <td><button className="p-1.5 rounded hover:bg-[var(--color-surface-2)]"><MoreVertical size={14} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
                <span>Exibindo 1–15 de 1.247 servidores</span>
                <div className="flex gap-1">
                    <button className="smgpi-btn smgpi-btn-ghost h-8 px-3">Anterior</button>
                    <button className="smgpi-btn smgpi-btn-primary h-8 px-3">Próximo</button>
                </div>
            </div>
        </Panel>
    );
}

function FichaServidor({ s, onBack }: { s: typeof SERVIDORES[number]; onBack: () => void }) {
    const [tab, setTab] = useState("pessoais");
    return (
        <div className="smgpi-fade-in">
            <button onClick={onBack} className="flex items-center gap-1 text-sm mb-4 hover:underline" style={{ color: "var(--color-primary)" }}>
                <ChevronLeft size={14} /> Voltar à lista
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <Panel className="lg:col-span-4 text-center">
                    <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white mb-3"
                        style={{ background: "var(--color-sidebar)" }}>
                        {s.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <h2 className="font-display font-bold text-xl">{s.nome}</h2>
                    <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>{s.cargo}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{s.secretaria}</p>
                    <div className="mt-3"><StatusBadge status={s.situacao} /></div>
                    <div className="mt-5 pt-4 border-t text-left text-xs space-y-2" style={{ borderColor: "var(--color-border)" }}>
                        <div className="flex justify-between"><span style={{ color: "var(--color-text-muted)" }}>Matrícula</span><span className="font-semibold">{s.matricula}</span></div>
                        <div className="flex justify-between"><span style={{ color: "var(--color-text-muted)" }}>Admissão</span><span className="font-semibold">{s.admissao}</span></div>
                        <div className="flex justify-between"><span style={{ color: "var(--color-text-muted)" }}>Regime</span><span className="font-semibold">{s.regime}</span></div>
                        <div className="flex justify-between"><span style={{ color: "var(--color-text-muted)" }}>Vínculo</span><span className="font-semibold">{s.vinculo}</span></div>
                    </div>
                </Panel>
                <Panel className="lg:col-span-8">
                    <div className="flex gap-1 mb-4 border-b -mt-2" style={{ borderColor: "var(--color-border)" }}>
                        {[["pessoais", "Dados Pessoais"], ["funcionais", "Dados Funcionais"], ["docs", "Documentos"], ["hist", "Histórico"]].map(([k, l]) => (
                            <button key={k} onClick={() => setTab(k)} className="px-3 py-2 text-sm font-semibold"
                                style={{
                                    color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                                    borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                                }}>{l}</button>
                        ))}
                    </div>
                    {tab === "pessoais" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            {[
                                ["CPF", "123.456.789-00"], ["RG", "09.876.543-21 SSP/BA"],
                                ["Data nascimento", "12/05/1978"], ["Estado civil", "Casado(a)"],
                                ["Endereço", "Rua das Acácias, 142 — Centro, Mutuípe/BA"], ["CEP", "45.480-000"],
                                ["Telefone", "(75) 99876-5432"], ["E-mail", "servidor@mutuipe.ba.gov.br"],
                                ["Banco", "Banco do Brasil"], ["Conta", "Ag. 0123-4 · CC 56789-0"],
                            ].map(([k, v]) => (
                                <div key={k}>
                                    <div className="text-xs mb-0.5" style={{ color: "var(--color-text-muted)" }}>{k}</div>
                                    <div className="font-semibold">{v}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {tab === "funcionais" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            {[
                                ["Data admissão", s.admissao], ["Regime jurídico", "Estatutário"],
                                ["Regime previdenciário", s.regime], ["Classe / Nível", "Classe C — Nível 3"],
                                ["Carga horária", "40h semanais"], ["Lotação", s.secretaria],
                                ["Cargo efetivo", s.cargo], ["Última progressão", "15/03/2023"],
                            ].map(([k, v]) => (
                                <div key={k}>
                                    <div className="text-xs mb-0.5" style={{ color: "var(--color-text-muted)" }}>{k}</div>
                                    <div className="font-semibold">{v}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {tab === "docs" && (
                        <div className="space-y-2">
                            {["Ato de nomeação", "Comprovante de residência", "Diploma de graduação", "Certidão negativa criminal"].map((d) => (
                                <div key={d} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[var(--color-surface-2)]">
                                    <FileText size={16} style={{ color: "var(--color-primary)" }} />
                                    <div className="flex-1"><div className="text-sm font-semibold">{d}</div>
                                        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>PDF · 234 KB · {s.admissao}</div></div>
                                    <button className="smgpi-btn smgpi-btn-ghost h-8 px-3 text-xs">Download</button>
                                </div>
                            ))}
                        </div>
                    )}
                    {tab === "hist" && (
                        <div className="space-y-3 relative pl-6 border-l-2" style={{ borderColor: "var(--color-border)" }}>
                            {[
                                ["Admissão por concurso", s.admissao],
                                ["Progressão por antiguidade", "20/06/2018"],
                                ["Licença prêmio (3 meses)", "10/01/2021"],
                                ["Progressão por mérito", "15/03/2023"],
                            ].map(([t, d], i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full" style={{ background: "var(--color-primary)" }} />
                                    <div className="text-sm font-semibold">{t}</div>
                                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{d}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </Panel>
            </div>
        </div>
    );
}

function FolhaPagamento() {
    return (
        <>
            <Panel className="mb-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                        <select className="smgpi-input" style={{ width: 200 }}><option>Novembro / 2025</option></select>
                        <span className="smgpi-badge" style={{ background: "var(--color-info-light)", color: "var(--color-info)" }}>Fechada</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="smgpi-btn smgpi-btn-ghost text-xs">Exportar CNAB</button>
                        <button className="smgpi-btn smgpi-btn-ghost text-xs">Gerar holerites</button>
                        <button className="smgpi-btn smgpi-btn-primary text-xs">Transmitir eSocial</button>
                    </div>
                </div>
            </Panel>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {[
                    ["Proventos brutos", "R$ 1.482.310", "var(--color-text-primary)"],
                    ["Descontos", "R$ 234.419", "var(--color-danger)"],
                    ["Líquido a pagar", "R$ 1.247.891", "var(--color-success)"],
                    ["INSS Patronal", "R$ 312.840", "var(--color-info)"],
                    ["IRRF retido", "R$ 89.412", "var(--color-warning)"],
                ].map(([l, v, c]) => (
                    <div key={l} className="smgpi-card p-3">
                        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{l}</div>
                        <div className="font-display font-bold text-lg" style={{ color: c }}>{v}</div>
                    </div>
                ))}
            </div>
            <Panel title="Servidores na folha">
                <div className="overflow-x-auto">
                    <table className="smgpi-table">
                        <thead><tr><th>Servidor</th><th>Cargo</th><th>Proventos</th><th>Descontos</th><th>Líquido</th></tr></thead>
                        <tbody>
                            {SERVIDORES.slice(0, 10).map((s, i) => {
                                const p = 2800 + (i * 430);
                                const d = Math.round(p * 0.18);
                                return (
                                    <tr key={s.matricula}>
                                        <td className="font-semibold">{s.nome}</td>
                                        <td className="text-sm">{s.cargo}</td>
                                        <td>{fmtBRL(p)}</td>
                                        <td style={{ color: "var(--color-danger)" }}>-{fmtBRL(d)}</td>
                                        <td className="font-bold">{fmtBRL(p - d)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Panel>
        </>
    );
}

function PontoFrequencia() {
    const dias = Array.from({ length: 30 }, (_, i) => i + 1);
    return (
        <>
            <Panel className="mb-4">
                <div className="flex gap-3 items-center">
                    <select className="smgpi-input" style={{ width: 180 }}><option>Novembro / 2025</option></select>
                    <select className="smgpi-input" style={{ width: 200 }}><option>Secretaria de Saúde</option></select>
                </div>
            </Panel>
            <Panel title="Calendário do mês — Luciana Matos">
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {["D", "S", "T", "Q", "Q", "S", "S"].map(d => (
                        <div key={d} className="text-center text-xs font-bold" style={{ color: "var(--color-text-muted)" }}>{d}</div>
                    ))}
                    {dias.map(d => {
                        const status = d % 7 === 0 ? "falta" : d % 9 === 0 ? "ferias" : d % 6 === 0 ? "feriado" : "presente";
                        const cor = status === "presente" ? "var(--color-success-light)" : status === "falta" ? "var(--color-danger-light)" : status === "ferias" ? "var(--color-info-light)" : "#E4E4DC";
                        const fg = status === "presente" ? "var(--color-success)" : status === "falta" ? "var(--color-danger)" : status === "ferias" ? "var(--color-info)" : "var(--color-text-muted)";
                        return <div key={d} className="aspect-square rounded-md flex items-center justify-center text-sm font-semibold"
                            style={{ background: cor, color: fg }}>{d}</div>;
                    })}
                </div>
                <div className="flex gap-4 text-xs flex-wrap pt-3 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: "var(--color-success)" }} />Presente (22)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: "var(--color-danger)" }} />Falta (1)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: "var(--color-info)" }} />Férias (3)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: "#E4E4DC" }} />Feriado (4)</span>
                </div>
            </Panel>
        </>
    );
}
