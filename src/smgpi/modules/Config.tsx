import { useState } from "react";
import { Plus, MoreVertical, X } from "lucide-react";
import { PageHeader, StatusBadge, Panel } from "../components/ui";
import { USUARIOS } from "../data";

export function Config() {
    const [open, setOpen] = useState(false);
    const [sec, setSec] = useState("usuarios");
    return (
        <div className="smgpi-fade-in">
            <PageHeader title="Configurações do Sistema" breadcrumb={["SMGPI", "Configurações"]} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <Panel className="lg:col-span-1">
                    {[
                        ["usuarios", "Usuários e perfis"],
                        ["params", "Parâmetros do sistema"],
                        ["integ", "Integrações federais"],
                        ["logs", "Logs de auditoria"],
                        ["mun", "Dados do município"],
                    ].map(([k, l]) => (
                        <button key={k} onClick={() => setSec(k)} className="w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold transition"
                            style={{ background: sec === k ? "var(--color-primary-light)" : "transparent", color: sec === k ? "var(--color-primary)" : "var(--color-text-primary)" }}>{l}</button>
                    ))}
                </Panel>
                <Panel className="lg:col-span-3" title="Usuários do sistema" action={
                    <button onClick={() => setOpen(true)} className="smgpi-btn smgpi-btn-primary"><Plus size={14} /> Novo usuário</button>
                }>
                    {sec === "usuarios" ? (
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
                    ) : (
                        <div className="text-sm py-12 text-center" style={{ color: "var(--color-text-muted)" }}>
                            Seção em demonstração — disponível na versão completa do SMGPI.
                        </div>
                    )}
                </Panel>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setOpen(false)}>
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
                                <select className="smgpi-input"><option>Administrador</option><option>Secretário</option><option>Contador</option>
                                    <option>Tesoureiro</option><option>Gestor RH</option><option>Fiscal</option><option>Visualizador</option></select></div>
                            <div><label className="text-xs font-semibold block mb-1">Secretaria vinculada</label>
                                <select className="smgpi-input"><option>Todas</option><option>Educação</option><option>Saúde</option><option>Fazenda</option></select></div>
                            <button className="smgpi-btn smgpi-btn-ghost w-full">Definir senha temporária</button>
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
