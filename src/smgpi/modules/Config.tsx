import { useState } from "react";
import { Plus, MoreVertical, X, CheckCircle2, AlertTriangle, Clock, Globe, Shield, Building2, RefreshCw } from "lucide-react";
import { PageHeader, StatusBadge, Panel } from "../components/ui";
import { USUARIOS } from "../data";

export function Config() {
    const [open, setOpen] = useState(false);
    const [sec, setSec] = useState("usuarios");

    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Configurações do Sistema" breadcrumb={["SMGPI", "Configurações"]} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                {/* Menu lateral */}
                <Panel className="lg:col-span-1">
                    <div className="space-y-0.5">
                        {[
                            ["usuarios", "Usuários e perfis"],
                            ["params", "Parâmetros do sistema"],
                            ["integ", "Integrações federais"],
                            ["logs", "Logs de auditoria"],
                            ["mun", "Dados do município"],
                        ].map(([k, l]) => (
                            <button key={k} onClick={() => setSec(k)}
                                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold transition"
                                style={{
                                    background: sec === k ? "var(--color-primary-light)" : "transparent",
                                    color: sec === k ? "var(--color-primary)" : "var(--color-text-primary)"
                                }}>{l}</button>
                        ))}
                    </div>
                </Panel>

                {/* Conteúdo principal */}
                <div className="lg:col-span-3 space-y-4">

                    {/* ── USUÁRIOS ── */}
                    {sec === "usuarios" && (
                        <Panel title="Usuários do sistema" action={
                            <button onClick={() => setOpen(true)} className="smgpi-btn smgpi-btn-primary">
                                <Plus size={14} /> Novo usuário
                            </button>
                        }>
                            <table className="smgpi-table">
                                <thead><tr><th>Nome</th><th>CPF</th><th>Perfil</th><th>Secretaria</th><th>Status</th><th>Último acesso</th><th></th></tr></thead>
                                <tbody>
                                    {USUARIOS.map((u) => (
                                        <tr key={u.cpf}>
                                            <td className="font-semibold">{u.nome}</td>
                                            <td className="font-mono text-xs">{u.cpf}</td>
                                            <td className="text-sm">{u.perfil}</td>
                                            <td className="text-sm">{u.secretaria}</td>
                                            <td><StatusBadge status={u.status} /></td>
                                            <td className="text-xs">{u.ultimo}</td>
                                            <td><button className="p-1.5 rounded hover:bg-[var(--color-surface-2)]"><MoreVertical size={14} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Panel>
                    )}

                    {/* ── PARÂMETROS DO SISTEMA ── */}
                    {sec === "params" && (
                        <Panel title="Parâmetros do sistema">
                            <div className="space-y-5">
                                {/* Exercício */}
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Exercício e período</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            ["Exercício corrente", "2025"],
                                            ["Data de encerramento", "31/12/2025"],
                                            ["Mês de referência (folha)", "Novembro/2025"],
                                            ["Número de parcelas (folha)", "12"],
                                        ].map(([k, v]: any) => (
                                            <div key={k}>
                                                <label className="text-xs font-semibold block mb-1">{k}</label>
                                                <input className="smgpi-input" defaultValue={v} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Alíquotas */}
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Alíquotas tributárias</div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[
                                            ["ISS mínimo", "2,00%"],
                                            ["ISS máximo", "5,00%"],
                                            ["IPTU — Zona urbana", "0,5%"],
                                            ["IPTU — Zona rural", "1,0%"],
                                        ].map(([k, v]: any) => (
                                            <div key={k}>
                                                <label className="text-xs font-semibold block mb-1">{k}</label>
                                                <input className="smgpi-input" defaultValue={v} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Limites LRF */}
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Limites LRF configurados</div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {[
                                            ["Limite de pessoal (% RCL)", "54,00%"],
                                            ["Limite prudencial", "51,30%"],
                                            ["Alerta automático em", "49,00%"],
                                        ].map(([k, v]: any) => (
                                            <div key={k}>
                                                <label className="text-xs font-semibold block mb-1">{k}</label>
                                                <input className="smgpi-input" defaultValue={v} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button className="smgpi-btn smgpi-btn-primary">Salvar parâmetros</button>
                                </div>
                            </div>
                        </Panel>
                    )}

                    {/* ── INTEGRAÇÕES FEDERAIS ── */}
                    {sec === "integ" && (
                        <Panel title="Integrações com sistemas federais">
                            <div className="space-y-3">
                                {[
                                    {
                                        sistema: "eSocial",
                                        orgao: "Receita Federal / MTE",
                                        descricao: "Transmissão de eventos de pessoal (admissões, remunerações, desligamentos)",
                                        status: "Conectado",
                                        ultimo: "15/11/2025 · 14:22",
                                        pendentes: 0,
                                    },
                                    {
                                        sistema: "SICONFI",
                                        orgao: "Secretaria do Tesouro Nacional",
                                        descricao: "Envio do RREO, RGF e Balanços Anuais",
                                        status: "Conectado",
                                        ultimo: "29/10/2025 · 10:05",
                                        pendentes: 1,
                                    },
                                    {
                                        sistema: "PNCP",
                                        orgao: "MPOG / Seges",
                                        descricao: "Publicação de editais, contratos e atas de registro de preços",
                                        status: "Conectado",
                                        ultimo: "Hoje · 09:34",
                                        pendentes: 0,
                                    },
                                    {
                                        sistema: "TCE-BA (SAGRES)",
                                        orgao: "Tribunal de Contas — Bahia",
                                        descricao: "Envio mensal do balancete e dados contábeis",
                                        status: "Atenção",
                                        ultimo: "30/09/2025 · 23:58",
                                        pendentes: 2,
                                    },
                                    {
                                        sistema: "e-SUS PEC",
                                        orgao: "Ministério da Saúde",
                                        descricao: "Integração de produção ambulatorial e prontuário eletrônico",
                                        status: "Conectado",
                                        ultimo: "Hoje · 07:15",
                                        pendentes: 0,
                                    },
                                    {
                                        sistema: "Rede SUAS",
                                        orgao: "Ministério do Desenvolvimento Social",
                                        descricao: "Envio do RMA mensal e Censo SUAS",
                                        status: "Conectado",
                                        ultimo: "01/11/2025 · 11:00",
                                        pendentes: 0,
                                    },
                                    {
                                        sistema: "INEP — Censo Escolar",
                                        orgao: "Ministério da Educação",
                                        descricao: "Coleta anual de dados de matrículas e infraestrutura escolar",
                                        status: "Aguardando",
                                        ultimo: "Coleta aberta em Jan/2026",
                                        pendentes: 0,
                                    },
                                ].map((item) => (
                                    <div key={item.sistema} className="smgpi-card p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                                    style={{ background: "var(--color-surface-2)" }}>
                                                    <Globe size={18} style={{ color: "var(--color-primary)" }} />
                                                </div>
                                                <div>
                                                    <div className="font-display font-bold text-sm">{item.sistema}</div>
                                                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.orgao}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {item.pendentes > 0 && (
                                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                                        style={{ background: "var(--color-warning-light)", color: "var(--color-warning)" }}>
                                                        {item.pendentes} pendente{item.pendentes > 1 ? "s" : ""}
                                                    </span>
                                                )}
                                                <StatusBadge status={
                                                    item.status === "Conectado" ? "Ativo" :
                                                    item.status === "Atenção" ? "Atenção" : "Pendente"
                                                } />
                                            </div>
                                        </div>
                                        <div className="mt-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>{item.descricao}</div>
                                        <div className="flex items-center justify-between mt-3 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                                <Clock size={11} /> Último envio: {item.ultimo}
                                            </div>
                                            <button className="smgpi-btn smgpi-btn-ghost text-xs">
                                                <RefreshCw size={11} /> Sincronizar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    )}

                    {/* ── LOGS DE AUDITORIA ── */}
                    {sec === "logs" && (
                        <Panel title="Logs de auditoria do sistema"
                            action={<button className="smgpi-btn smgpi-btn-ghost text-xs">Exportar CSV</button>}>
                            <div className="flex gap-2 mb-4 flex-wrap">
                                <select className="smgpi-input" style={{ width: 180 }}>
                                    <option>Todos os módulos</option>
                                    <option>Financeiro</option>
                                    <option>Pessoas</option>
                                    <option>Tributação</option>
                                </select>
                                <select className="smgpi-input" style={{ width: 160 }}>
                                    <option>Todos os usuários</option>
                                    <option>Admin VENYX</option>
                                    <option>Carlos Eduardo Souza</option>
                                </select>
                                <input type="date" className="smgpi-input" style={{ width: 170 }} defaultValue="2025-11-27" />
                            </div>
                            <table className="smgpi-table">
                                <thead><tr><th>Data/Hora</th><th>Usuário</th><th>Módulo</th><th>Ação</th><th>IP</th></tr></thead>
                                <tbody>
                                    {[
                                        ["27/11 14:32", "Admin VENYX", "Financeiro", "Empenho 2025NE001247 emitido — R$ 84.200", "192.168.1.10"],
                                        ["27/11 13:18", "Carlos E. Souza", "Financeiro", "Fechamento da folha Nov/2025 aprovado", "192.168.1.22"],
                                        ["27/11 11:45", "Patrícia Mendes", "Pessoas", "Servidor 01612 cadastrado — admissão", "192.168.1.31"],
                                        ["27/11 10:03", "Roberto Alves", "Tributação", "CDA 2024/00982 inscrita em dívida ativa", "192.168.1.45"],
                                        ["27/11 09:14", "Admin VENYX", "Sistema", "Login efetuado com sucesso", "192.168.1.10"],
                                        ["26/11 17:52", "Carlos E. Souza", "Financeiro", "Balancete Out/2025 transmitido ao TCE-BA", "192.168.1.22"],
                                        ["26/11 16:30", "Juliana Castro", "Educação", "Matrícula A-2025-0128 realizada", "192.168.1.38"],
                                        ["26/11 15:10", "Admin VENYX", "Config", "Usuário Juliana Castro habilitado", "192.168.1.10"],
                                    ].map((r: any, i) => (
                                        <tr key={i}>
                                            <td className="font-mono text-xs">{r[0]}</td>
                                            <td className="font-semibold text-sm">{r[1]}</td>
                                            <td>
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded"
                                                    style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                                                    {r[2]}
                                                </span>
                                            </td>
                                            <td className="text-sm">{r[3]}</td>
                                            <td className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>{r[4]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-xs mt-4 pt-3 border-t" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                                Exibindo 1–8 de 4.821 registros · Retenção mínima: 5 anos (exigência TCE)
                            </div>
                        </Panel>
                    )}

                    {/* ── DADOS DO MUNICÍPIO ── */}
                    {sec === "mun" && (
                        <>
                            <Panel title="Dados do município">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Identificação</div>
                                        <div className="space-y-3">
                                            {[
                                                ["Nome oficial", "Prefeitura Municipal de Mutuípe"],
                                                ["UF", "BA — Bahia"],
                                                ["CNPJ", "13.827.035/0001-40"],
                                                ["Código IBGE", "2921906"],
                                                ["Endereço", "Pça. Otávio Mangabeira, s/n — Centro"],
                                                ["CEP", "45.480-000"],
                                                ["Telefone", "(75) 3637-2100"],
                                                ["E-mail institucional", "gestao@mutuipe.ba.gov.br"],
                                            ].map(([k, v]: any) => (
                                                <div key={k}>
                                                    <label className="text-xs font-semibold block mb-1">{k}</label>
                                                    <input className="smgpi-input" defaultValue={v} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Gestão atual</div>
                                        <div className="space-y-3">
                                            {[
                                                ["Prefeito(a)", "Prefeito Municipal de Mutuípe"],
                                                ["Sec. de Administração", "Secretário de Administração"],
                                                ["Sec. de Fazenda", "Secretário de Fazenda"],
                                                ["Contador responsável", "Carlos Eduardo Souza — CRC/BA 12.345"],
                                                ["Mandato atual", "2025 – 2028"],
                                                ["Exercício financeiro", "2025"],
                                                ["LOA vigente", "Lei nº 1.184/2024 — R$ 32.400.000,00"],
                                                ["Banco oficial", "Banco do Brasil — Ag. 4321-0"],
                                            ].map(([k, v]: any) => (
                                                <div key={k}>
                                                    <label className="text-xs font-semibold block mb-1">{k}</label>
                                                    <input className="smgpi-input" defaultValue={v} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                                    <button className="smgpi-btn smgpi-btn-primary">Salvar dados do município</button>
                                </div>
                            </Panel>

                            {/* Indicadores gerais do município */}
                            <Panel title="Indicadores gerais — Mutuípe/BA">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        ["População estimada", "22.282", "IBGE 2020"],
                                        ["IDH Municipal", "0,612", "Médio"],
                                        ["Área territorial", "497,2 km²", "IBGE"],
                                        ["Altitude", "214 m", "Acima do nível do mar"],
                                    ].map(([k, v, sub]: any) => (
                                        <div key={k} className="smgpi-card p-3 text-center">
                                            <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>{k}</div>
                                            <div className="font-display font-bold text-xl" style={{ color: "var(--color-primary)" }}>{v}</div>
                                            <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{sub}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 p-3 rounded-md flex items-start gap-3" style={{ background: "var(--color-success-light)" }}>
                                    <CheckCircle2 size={16} style={{ color: "var(--color-success)", marginTop: 1 }} />
                                    <div className="text-sm" style={{ color: "var(--color-success)" }}>
                                        <span className="font-semibold">SMGPI v1.0 ativo</span> · Desenvolvido pela VENYX Technology · Implantado em Nov/2025
                                    </div>
                                </div>
                            </Panel>
                        </>
                    )}
                </div>
            </div>

            {/* Modal: Novo usuário */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setOpen(false)}>
                    <div className="smgpi-card-lg w-full max-w-lg p-6 smgpi-fade-in" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-bold text-lg">Novo usuário</h3>
                            <button onClick={() => setOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="space-y-3 text-sm">
                            {[["Nome completo"], ["CPF"], ["E-mail"], ["Telefone"]].map(([l]) => (
                                <div key={l}><label className="text-xs font-semibold block mb-1">{l}</label><input className="smgpi-input" /></div>
                            ))}
                            <div><label className="text-xs font-semibold block mb-1">Perfil de acesso</label>
                                <select className="smgpi-input">
                                    <option>Administrador</option>
                                    <option>Secretário</option>
                                    <option>Contador</option>
                                    <option>Tesoureiro</option>
                                    <option>Gestor RH</option>
                                    <option>Fiscal</option>
                                    <option>Visualizador</option>
                                </select>
                            </div>
                            <div><label className="text-xs font-semibold block mb-1">Secretaria vinculada</label>
                                <select className="smgpi-input">
                                    <option>Todas</option>
                                    <option>Educação</option>
                                    <option>Saúde</option>
                                    <option>Fazenda</option>
                                    <option>Administração</option>
                                    <option>Obras</option>
                                    <option>Assistência Social</option>
                                </select>
                            </div>
                            <button className="smgpi-btn smgpi-btn-ghost w-full">
                                <Shield size={14} /> Definir senha temporária
                            </button>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button onClick={() => setOpen(false)} className="smgpi-btn smgpi-btn-ghost flex-1">Cancelar</button>
                            <button onClick={() => setOpen(false)} className="smgpi-btn smgpi-btn-primary flex-1">Salvar usuário</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
