export type ModuleKey =
    | "dashboard" | "pessoas" | "financeiro" | "tributacao"
    | "compras" | "patrimonio" | "saude" | "educacao"
    | "obras" | "bi" | "config";

export const MODULE_TITLES: Record<ModuleKey, string> = {
    dashboard: "Dashboard Executivo",
    pessoas: "Gestão de Pessoas",
    financeiro: "Planejamento e Contabilidade",
    tributacao: "Tributação e Arrecadação",
    compras: "Compras, Licitações e Contratos",
    patrimonio: "Patrimônio, Almoxarifado e Frotas",
    saude: "Saúde e Assistência Social",
    educacao: "Educação Municipal",
    obras: "Obras, Urbanismo e Meio Ambiente",
    bi: "BI, Transparência e Controle Interno",
    config: "Configurações do Sistema",
};
