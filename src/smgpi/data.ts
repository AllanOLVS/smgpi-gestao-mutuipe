export const MUNICIPIO = {
    nome: "Prefeitura Municipal de Mutuípe",
    uf: "BA",
    populacao: 22000,
    exercicio: 2025,
    loa_total: 32400000,
};

export const KPI = {
    receita_arrecadada: 8247391,
    despesa_empenhada: 26891205,
    despesa_liquidada: 24102880,
    despesa_paga: 22987330,
    servidores_ativos: 1247,
    contratos_vigentes: 89,
    obras_andamento: 14,
};

export const EXECUCAO_ORC = [
    { mes: "Jan", previsto: 2700, arrecadado: 2410 },
    { mes: "Fev", previsto: 2700, arrecadado: 2890 },
    { mes: "Mar", previsto: 2700, arrecadado: 2620 },
    { mes: "Abr", previsto: 2700, arrecadado: 2580 },
    { mes: "Mai", previsto: 2700, arrecadado: 2750 },
    { mes: "Jun", previsto: 2700, arrecadado: 2840 },
    { mes: "Jul", previsto: 2700, arrecadado: 2790 },
    { mes: "Ago", previsto: 2700, arrecadado: 2910 },
    { mes: "Set", previsto: 2700, arrecadado: 2680 },
    { mes: "Out", previsto: 2700, arrecadado: 2820 },
    { mes: "Nov", previsto: 2700, arrecadado: 2570 },
    { mes: "Dez", previsto: 2700, arrecadado: 0 },
];

export const DESPESAS_SECRETARIA = [
    { nome: "Educação", valor: 8240000, cor: "#0277BD" },
    { nome: "Saúde", valor: 7180000, cor: "#00695C" },
    { nome: "Administração", valor: 4120000, cor: "#5A5A72" },
    { nome: "Obras", valor: 3890000, cor: "#F57F17" },
    { nome: "Assist. Social", valor: 2140000, cor: "#6A1B9A" },
    { nome: "Fazenda", valor: 1320000, cor: "#1B5E20" },
];

export const ALERTAS = [
    { tipo: "critical", titulo: "Limite de pessoal LRF atingindo 92% — Secretaria de Saúde", data: "Hoje, 09:14" },
    { tipo: "warning", titulo: "7 contratos vencem nos próximos 30 dias", data: "Hoje, 08:22" },
    { tipo: "warning", titulo: "Balancete de outubro não enviado ao TCE", data: "Ontem" },
    { tipo: "success", titulo: "Folha de novembro processada — R$ 1.247.891", data: "27/11" },
    { tipo: "info", titulo: "RREO 5º bimestre publicado no Portal de Transparência", data: "25/11" },
] as const;

export const OBRIGACOES = [
    { data: "05/12", desc: "Envio da produção SUS ao SIA" },
    { data: "10/12", desc: "Balancete mensal ao TCE-BA" },
    { data: "15/12", desc: "Transmissão eSocial — remunerações" },
    { data: "30/12", desc: "RREO 6º bimestre — SICONFI" },
    { data: "31/12", desc: "Encerramento do exercício" },
];

export const SERVIDORES = [
    { matricula: "00124", nome: "Maria Silva Santos", cargo: "Professora nível III", secretaria: "Educação", vinculo: "Efetivo", situacao: "Ativo", admissao: "2008-03-15", regime: "RPPS" },
    { matricula: "00891", nome: "João Carlos Oliveira", cargo: "Agente Comunitário de Saúde", secretaria: "Saúde", vinculo: "Efetivo", situacao: "Ativo", admissao: "2011-07-01", regime: "RPPS" },
    { matricula: "01203", nome: "Ana Paula Ferreira", cargo: "Assistente Social", secretaria: "Assistência Social", vinculo: "Efetivo", situacao: "Licença médica", admissao: "2015-02-10", regime: "RPPS" },
    { matricula: "00445", nome: "Carlos Eduardo Souza", cargo: "Contador", secretaria: "Fazenda", vinculo: "Efetivo", situacao: "Ativo", admissao: "2006-09-20", regime: "RPPS" },
    { matricula: "01567", nome: "Fernanda Lima Costa", cargo: "Secretária Executiva", secretaria: "Gabinete", vinculo: "Comissionado", situacao: "Ativo", admissao: "2021-01-04", regime: "RGPS" },
    { matricula: "00782", nome: "Roberto Alves Neto", cargo: "Fiscal de Tributos", secretaria: "Fazenda", vinculo: "Efetivo", situacao: "Ativo", admissao: "2013-04-15", regime: "RPPS" },
    { matricula: "01089", nome: "Luciana Matos", cargo: "Enfermeira", secretaria: "Saúde", vinculo: "Efetivo", situacao: "Ativo", admissao: "2019-08-01", regime: "RPPS" },
    { matricula: "00334", nome: "Marcos Pereira", cargo: "Engenheiro Civil", secretaria: "Obras", vinculo: "Efetivo", situacao: "Ativo", admissao: "2010-11-30", regime: "RPPS" },
    { matricula: "01612", nome: "Patrícia Mendes", cargo: "Auxiliar Administrativo", secretaria: "Administração", vinculo: "Temporário", situacao: "Ativo", admissao: "2024-06-01", regime: "RGPS" },
    { matricula: "00298", nome: "Antônio Ramos", cargo: "Motorista", secretaria: "Saúde", vinculo: "Efetivo", situacao: "Ativo", admissao: "2009-05-12", regime: "RPPS" },
    { matricula: "01401", nome: "Juliana Castro", cargo: "Diretora Escolar", secretaria: "Educação", vinculo: "Comissionado", situacao: "Ativo", admissao: "2022-02-01", regime: "RPPS" },
    { matricula: "00567", nome: "Ricardo Nogueira", cargo: "Médico Clínico", secretaria: "Saúde", vinculo: "Efetivo", situacao: "Afastado", admissao: "2014-09-15", regime: "RPPS" },
    { matricula: "01734", nome: "Beatriz Cardoso", cargo: "Psicóloga", secretaria: "Assistência Social", vinculo: "Efetivo", situacao: "Ativo", admissao: "2020-03-10", regime: "RPPS" },
    { matricula: "00823", nome: "Eduardo Tavares", cargo: "Procurador Municipal", secretaria: "Procuradoria", vinculo: "Efetivo", situacao: "Ativo", admissao: "2012-07-20", regime: "RPPS" },
    { matricula: "01890", nome: "Sandra Vieira", cargo: "Bibliotecária", secretaria: "Educação", vinculo: "Efetivo", situacao: "Ativo", admissao: "2023-04-15", regime: "RPPS" },
];

export const CONTRATOS = [
    { numero: "001/2025", fornecedor: "Construtora Bahia Ltda", objeto: "Construção de escola municipal", valor: 1850000, inicio: "2025-02-01", fim: "2025-11-30", situacao: "Em andamento", fiscal: "Marcos Pereira" },
    { numero: "047/2025", fornecedor: "MediSupply Distribuidora", objeto: "Fornecimento de medicamentos", valor: 420000, inicio: "2025-01-15", fim: "2025-12-15", situacao: "Em andamento", fiscal: "Luciana Matos" },
    { numero: "023/2025", fornecedor: "TI Soluções Ltda", objeto: "Suporte e manutenção de TI", valor: 84000, inicio: "2025-03-01", fim: "2025-12-01", situacao: "Vence em 15 dias", fiscal: "Carlos Souza" },
    { numero: "058/2025", fornecedor: "Transporte Escolar Mutuípe", objeto: "Transporte escolar rural", valor: 680000, inicio: "2025-02-15", fim: "2026-02-14", situacao: "Em andamento", fiscal: "Juliana Castro" },
    { numero: "071/2025", fornecedor: "Limpeza Total Serviços", objeto: "Limpeza de prédios públicos", valor: 240000, inicio: "2025-04-01", fim: "2025-12-31", situacao: "Vence em 30 dias", fiscal: "Patrícia Mendes" },
    { numero: "082/2025", fornecedor: "Combustíveis Sul Ltda", objeto: "Fornecimento de combustíveis", valor: 320000, inicio: "2025-01-01", fim: "2025-12-31", situacao: "Vence em 30 dias", fiscal: "Antônio Ramos" },
    { numero: "095/2025", fornecedor: "Materiais Construção Bahia", objeto: "Material de construção", valor: 180000, inicio: "2025-05-10", fim: "2026-05-09", situacao: "Em andamento", fiscal: "Marcos Pereira" },
];

export const LICITACOES = [
    { numero: "PE 012/2025", modalidade: "Pregão Eletrônico", objeto: "Aquisição de medicamentos básicos", situacao: "Em andamento", abertura: "2025-11-15", valor: 480000 },
    { numero: "TP 003/2025", modalidade: "Tomada de Preços", objeto: "Reforma do posto de saúde do bairro Centro", situacao: "Homologado", abertura: "2025-09-20", valor: 320000 },
    { numero: "PE 015/2025", modalidade: "Pregão Eletrônico", objeto: "Material escolar 2026", situacao: "Em planejamento", abertura: "2025-12-10", valor: 215000 },
    { numero: "CO 001/2025", modalidade: "Concorrência", objeto: "Pavimentação asfáltica av. Principal", situacao: "Em andamento", abertura: "2025-10-05", valor: 2400000 },
    { numero: "PE 011/2025", modalidade: "Pregão Eletrônico", objeto: "Veículos para frota da saúde", situacao: "Homologado", abertura: "2025-08-12", valor: 540000 },
    { numero: "DL 028/2025", modalidade: "Dispensa", objeto: "Serviços emergenciais elétricos", situacao: "Cancelado", abertura: "2025-07-30", valor: 18000 },
];

export const OBRAS = [
    { numero: "OB-2025-01", desc: "Construção EMEF João da Mata", local: "Bairro Alto Bonito", valor: 1850000, executado: 62, prazo: "2025-11-30", situacao: "Em andamento" },
    { numero: "OB-2025-02", desc: "Pavimentação Av. Principal", local: "Centro", valor: 2400000, executado: 38, prazo: "2026-03-15", situacao: "Em andamento" },
    { numero: "OB-2025-03", desc: "Reforma UBS Centro", local: "Centro", valor: 320000, executado: 95, prazo: "2025-12-10", situacao: "Em andamento" },
    { numero: "OB-2025-04", desc: "Praça do Bairro Novo Horizonte", local: "Novo Horizonte", valor: 180000, executado: 100, prazo: "2025-10-20", situacao: "Concluída" },
    { numero: "OB-2025-05", desc: "Drenagem rua das Flores", local: "Vila Esperança", valor: 240000, executado: 28, prazo: "2025-12-31", situacao: "Com atraso" },
    { numero: "OB-2024-12", desc: "Quadra poliesportiva", local: "Distrito Areia", valor: 420000, executado: 75, prazo: "2025-12-20", situacao: "Em andamento" },
];

export const MEDICAMENTOS = [
    { codigo: "M001", nome: "Dipirona 500mg", saldo: 1240, minimo: 800, status: "OK" },
    { codigo: "M002", nome: "Amoxicilina 500mg", saldo: 180, minimo: 400, status: "CRÍTICO" },
    { codigo: "M003", nome: "Losartana 50mg", saldo: 2890, minimo: 1500, status: "OK" },
    { codigo: "M004", nome: "Insulina NPH", saldo: 95, minimo: 120, status: "CRÍTICO" },
    { codigo: "M005", nome: "Paracetamol 750mg", saldo: 1980, minimo: 1000, status: "OK" },
    { codigo: "M006", nome: "Captopril 25mg", saldo: 340, minimo: 500, status: "VENCENDO" },
    { codigo: "M007", nome: "Metformina 850mg", saldo: 1450, minimo: 800, status: "OK" },
];

export const USUARIOS = [
    { nome: "Admin VENYX", cpf: "000.000.000-00", perfil: "Administrador", secretaria: "Todos", status: "Ativo", ultimo: "Agora" },
    { nome: "Carlos Eduardo Souza", cpf: "123.456.789-00", perfil: "Contador", secretaria: "Fazenda", status: "Ativo", ultimo: "Hoje 09:42" },
    { nome: "Patrícia Mendes", cpf: "987.654.321-00", perfil: "Gestor RH", secretaria: "Administração", status: "Ativo", ultimo: "Ontem" },
    { nome: "Roberto Alves Neto", cpf: "111.222.333-00", perfil: "Fiscal Tributário", secretaria: "Fazenda", status: "Ativo", ultimo: "15/11" },
    { nome: "Juliana Castro", cpf: "222.333.444-55", perfil: "Secretário", secretaria: "Educação", status: "Ativo", ultimo: "Hoje 11:20" },
    { nome: "Luciana Matos", cpf: "333.444.555-66", perfil: "Visualizador", secretaria: "Saúde", status: "Inativo", ultimo: "01/10" },
];

export const fmtBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const fmtBRLm = (v: number) => `R$ ${(v / 1000000).toFixed(2)}M`;
