import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function PageHeader({ title, subtitle, breadcrumb, actions }: {
    title: string; subtitle?: string; breadcrumb?: string[]; actions?: ReactNode;
}) {
    return (
        <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
            {breadcrumb && (
                <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
                    {breadcrumb.map((b, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                            {i > 0 && <ChevronRight size={12} />}
                            <span>{b}</span>
                        </span>
                    ))}
                </div>
            )}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="font-display text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>{title}</h1>
                    {subtitle && <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>{subtitle}</p>}
                </div>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
        </div>
    );
}

export function StatCard({ label, value, change, changeType = "neutral", icon, accent }: {
    label: string; value: string; change?: string;
    changeType?: "up" | "down" | "neutral"; icon: ReactNode; accent?: string;
}) {
    const accentColor = accent || "var(--color-primary)";
    const changeColor =
        changeType === "up" ? "var(--color-success)" :
            changeType === "down" ? "var(--color-danger)" :
                "var(--color-text-secondary)";
    return (
        <div className="smgpi-card p-4 smgpi-fade-in">
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `color-mix(in oklab, ${accentColor} 14%, transparent)`, color: accentColor }}>
                    {icon}
                </div>
                {change && (
                    <span className="text-xs font-semibold" style={{ color: changeColor }}>{change}</span>
                )}
            </div>
            <div className="font-display text-2xl font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>{value}</div>
            <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{label}</div>
        </div>
    );
}

export function StatusBadge({ status }: { status: string }) {
    const s = status.toLowerCase();
    let bg = "var(--color-surface-2)", fg = "var(--color-text-secondary)";
    if (/(ativo|conclu|homolog|ok|em dia|aprovado)/i.test(s)) { bg = "var(--color-success-light)"; fg = "var(--color-success)"; }
    else if (/(licen|atras|atenç|vence|pendente|vencendo)/i.test(s)) { bg = "var(--color-warning-light)"; fg = "var(--color-warning)"; }
    else if (/(inativo|cancel|crít|paralisad)/i.test(s)) { bg = "var(--color-danger-light)"; fg = "var(--color-danger)"; }
    else if (/(afast|andamento|processan|planejamento)/i.test(s)) { bg = "var(--color-info-light)"; fg = "var(--color-info)"; }
    return <span className="smgpi-badge" style={{ background: bg, color: fg }}>{status}</span>;
}

export function AlertBanner({ type, title, message, time }: {
    type: "critical" | "warning" | "info" | "success"; title: string; message?: string; time?: string;
}) {
    const map = {
        critical: { bg: "var(--color-danger-light)", fg: "var(--color-danger)" },
        warning: { bg: "var(--color-warning-light)", fg: "var(--color-warning)" },
        info: { bg: "var(--color-info-light)", fg: "var(--color-info)" },
        success: { bg: "var(--color-success-light)", fg: "var(--color-success)" },
    };
    const c = map[type];
    return (
        <div className={`flex gap-3 p-3 rounded-lg border-l-4 ${type === "critical" ? "smgpi-pulse" : ""}`}
            style={{ background: c.bg, borderLeftColor: c.fg }}>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{title}</div>
                {message && <div className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{message}</div>}
            </div>
            {time && <div className="text-xs whitespace-nowrap" style={{ color: c.fg }}>{time}</div>}
        </div>
    );
}

export function Panel({ title, action, children, className = "" }: {
    title?: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
    return (
        <div className={`smgpi-card p-5 ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-4">
                    {title && <h3 className="font-display text-base font-bold" style={{ color: "var(--color-text-primary)" }}>{title}</h3>}
                    {action}
                </div>
            )}
            {children}
        </div>
    );
}
