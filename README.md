#Objetivo principal: 
criar uma interface web para nutricionistas, capaz de listar pacientes, exibir detalhes de cada paciente (incluindo histórico de planos alimentares), permitir criar e editar planos em um modal, mostrar indicadores de desempenho (KPIs) dinâmicos e oferecer um modo claro/escuro com persistência.

Stack escolhida:

Front-end: Vue 3 (Composition API)

Componentes visuais: inicialmente Kendo UI, depois removido para usar HTML nativo + Tailwind

Estilização: Tailwind CSS (com setup via PostCSS)

Roteamento: Vue Router

Mock de API: arquivos JavaScript simulando retorno de dados de pacientes e planos

Deploy: Vercel

Testes unitários: Jest + Vue Test Utils

Controle de estado: apenas Composition API e props/refs reativas.