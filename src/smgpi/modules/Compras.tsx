import { useState } from "react";
import { Plus, ChevronLeft, CheckCircle2, Circle } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Panel } from "../components/ui";
import { LICITACOES, CONTRATOS, fmtBRL } from "../data";
import { FileText, ShoppingBag, Truck, Users } from "lucide-react";

const FASES = ["Planejamento", "Publicação", "Proposta", "Julgamento", "Homologação", "Contrato"];

export function Compras() {
    const [tab, setTab] = useState("painel");
    const [lic, setLic] = useState<typeof LICITACOES[number] | null>(null);

    if (lic) return <DetalheLicitacao l={lic} onBack={() => setLic(null)} />;

    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Compras, Licitações e Contratos" breadcrumb={["SMGPI", "M06 — Compras"]}
                actions={<button className="smgpi-btn smgpi-btn-primary"><Plus size={14} /> Novo processo</button>} />
            <div className="flex gap-1 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                {[["painel", "Painel"], ["lic", "Licitações"], ["cont", "Contratos"], ["forn", "Fornecedores"]].map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                            color: tab === k ? "var(--color-primary)" : "var(--color-text-secondary)",
                            borderBottom: tab === k ? "2px solid var(--color-primary)" : "2px solid transparent", marginBottom: -1
                        }}>{l}</button>
                ))}
            </div>

            {tab === "painel" && <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="Processos em andamento" value="12" icon={<FileText size={18} />} accent="var(--mod-compras)" />
                <StatCard label="Contratos vigentes" value="89" icon={<ShoppingBag size={18} />} accent="var(--color-info)" />
                <StatCard label="Valor total contratado" value="R$ 18,4M" icon={<Truck size={18} />} accent="var(--color-success)" />
                <StatCard label="Economia nas licitações" value="R$ 1,82M" change="9,8% média" changeType="up" icon={<Users size={18} />} accent="var(--color-warning)" />
            </div>}

            {tab === "lic" && <Panel title="Processos licitatórios">
                <table className="smgpi-table">
                    <thead><tr><th>Número</th><th>Modalidade</th><th>Objeto</th><th>Abertura</th><th>Valor</th><th>Situação</th></tr></thead>
                    <tbody>
                        {LICITACOES.map((l) => (
                            <tr key={l.numero} className="cursor-pointer" onClick={() => setLic(l)}>
                                <td className="font-mono text-xs">{l.numero}</td>
                                <td className="text-sm">{l.modalidade}</td>
                                <td>{l.objeto}</td>
                                <td className="text-xs">{l.abertura}</td>
                                <td className="font-semibold">{fmtBRL(l.valor)}</td>
                                <td><StatusBadge status={l.situacao} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "cont" && <Panel title="Contratos vigentes">
                <table className="smgpi-table">
                    <thead><tr><th>Número</th><th>Fornecedor</th><th>Objeto</th><th>Vigência</th><th>Valor</th><th>Fiscal</th><th>Situação</th></tr></thead>
                    <tbody>
                        {CONTRATOS.map((c) => (
                            <tr key={c.numero}>
                                <td className="font-mono text-xs">{c.numero}</td>
                                <td className="font-semibold">{c.fornecedor}</td>
                                <td className="text-sm">{c.objeto}</td>
                                <td className="text-xs">{c.inicio} → {c.fim}</td>
                                <td>{fmtBRL(c.valor)}</td>
                                <td className="text-xs">{c.fiscal}</td>
                                <td><StatusBadge status={c.situacao} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}

            {tab === "forn" && <Panel title="Fornecedores cadastrados">
                <table className="smgpi-table">
                    <thead><tr><th>CNPJ</th><th>Razão social</th><th>Cidade</th><th>Contratos</th><th>CAUC</th><th>CEIS</th></tr></thead>
                    <tbody>
                        {[
                            ["12.345.678/0001-01", "Construtora Bahia Ltda", "Salvador/BA", 4, "OK", "Limpo"],
                            ["98.765.432/0001-02", "MediSupply Distribuidora", "Feira de Santana/BA", 2, "OK", "Limpo"],
                            ["55.444.333/0001-03", "TI Soluções Ltda", "Salvador/BA", 1, "Atenção", "Limpo"],
                            ["11.222.333/0001-04", "Transporte Escolar Mutuípe", "Mutuípe/BA", 3, "OK", "Limpo"],
                            ["77.666.555/0001-05", "Limpeza Total Serviços", "Mutuípe/BA", 2, "OK", "Limpo"],
                        ].map((r: any) => (
                            <tr key={r[0]}><td className="font-mono text-xs">{r[0]}</td><td className="font-semibold">{r[1]}</td>
                                <td className="text-sm">{r[2]}</td><td>{r[3]}</td>
                                <td><StatusBadge status={r[4]} /></td><td><StatusBadge status={r[5]} /></td></tr>
                        ))}
                    </tbody>
                </table>
            </Panel>}
        </div>
    );
}

function DetalheLicitacao({ l, onBack }: { l: typeof LICITACOES[number]; onBack: () => void }) {
    const activeIdx = l.situacao === "Em andamento" ? 2 : l.situacao === "Homologado" ? 5 : 0;
    return (
        <div className="smgpi-fade-in">
            <button onClick={onBack} className="flex items-center gap-1 text-sm mb-4 hover:underline" style={{ color: "var(--color-primary)" }}>
                <ChevronLeft size={14} /> Voltar
            </button>
            <PageHeader title={l.numero} subtitle={l.objeto} breadcrumb={["Compras", "Licitações", l.numero]} />
            <Panel title="Fases do processo">
                <div className="flex items-center justify-between">
                    {FASES.map((f, i) => (
                        <div key={f} className="flex-1 flex items-center">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                                    style={{
                                        background: i <= activeIdx ? "var(--color-primary)" : "var(--color-surface-2)",
                                        color: i <= activeIdx ? "#fff" : "var(--color-text-muted)"
                                    }}>
                                    {i < activeIdx ? <CheckCircle2 size={18} /> : i === activeIdx ? <Circle size={18} /> : i + 1}
                                </div>
                                <div className="text-[11px] mt-1.5 text-center font-semibold" style={{ color: i <= activeIdx ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>{f}</div>
                            </div>
                            {i < FASES.length - 1 && <div className="flex-1 h-0.5 mx-1" style={{ background: i < activeIdx ? "var(--color-primary)" : "var(--color-border)" }} />}
                        </div>
                    ))}
                </div>
            </Panel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Panel title="Dados do processo">
                    {[["Modalidade", l.modalidade], ["Valor estimado", fmtBRL(l.valor)], ["Abertura", l.abertura], ["Situação", l.situacao]].map(([k, v]: any) => (
                        <div key={k} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{k}</span>
                            <span className="text-sm font-semibold">{v}</span>
                        </div>
                    ))}
                </Panel>
                <Panel title="Documentos" className="md:col-span-2">
                    {["Edital completo.pdf", "Termo de referência.pdf", "Mapa de preços.pdf", "Ata de abertura.pdf"].map(d => (
                        <div key={d} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                            <FileText size={16} style={{ color: "var(--color-primary)" }} />
                            <span className="flex-1 text-sm">{d}</span>
                            <button className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>Baixar</button>
                        </div>
                    ))}
                </Panel>
            </div>
        </div>
    );
}
