# FTO Informática

Landing page institucional da FTO Informática: reparo de notebooks, celulares e impressoras, manutenção e suporte técnico.

O site é uma aplicação React com TypeScript. O Node.js entra no desenvolvimento, na checagem de tipos, no lint e na build. Não há API. O resultado de `npm run build` é a pasta `dist/`, pronta para o Nginx.

## Arquitetura

- **Interface:** React 19 e TypeScript, com seções, layout, componentes e estilos separados.
- **Tooling:** Vite, TypeScript, ESLint e Prettier, executados no Node.js.
- **Configuração:** `src/config/env.ts` lê as variáveis `VITE_*`, valida o que dá para validar e entrega um objeto único para o restante da aplicação.
- **Contato:** `src/services/contactLinks.ts` monta telefone, WhatsApp, e-mail e redes. Os componentes não carregam esses dados escritos no código.
- **Conteúdo:** textos de serviço, diferenciais, etapas, dúvidas e depoimentos de demonstração ficam em `src/content`.
- **Cena 3D:** a bancada do hero é CSS com perspectiva, sem biblioteca 3D. O aparelho em destaque segue a aba escolhida.
- **Publicação:** arquivos estáticos em `dist/`, com exemplo de servidor em `nginx/ftoinformatica.conf.example`.

Variáveis `VITE_*` são públicas. Elas aparecem no JavaScript do navegador. Use apenas dados que podem estar no site. Não coloque senha, token ou chave de API.

## Estrutura

```text
site-ftoinformatica/
├── nginx/                         exemplo de configuração do Nginx
├── public/                        favicon e robots.txt
├── src/
│   ├── assets/                    ilustração e textura
│   ├── components/
│   │   ├── brand/                 marca
│   │   ├── layout/                cabeçalho, rodapé, seção e metadados
│   │   └── ui/                    botão, ícone, bancada 3D, link e avisos
│   ├── config/                    ambiente e navegação
│   ├── content/                   textos da landing
│   ├── hooks/                     rolagem, seção ativa e movimento reduzido
│   ├── pages/                     composição da página inicial
│   ├── sections/                  hero, serviços, atendimento, contato
│   ├── services/                  links de contato e dados estruturados
│   ├── styles/                    reset, tokens e base
│   ├── types/
│   └── utils/
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Pré-requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Configuração

```bash
npm install
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

No bash:

```bash
cp .env.example .env
```

Preencha `.env` com os dados públicos da empresa. O arquivo `.env` não entra no Git. O modelo versionado é o `.env.example`.

| Variável                      | Uso                                                                   |
| ----------------------------- | --------------------------------------------------------------------- |
| `VITE_COMPANY_NAME`           | Nome exibido no site. Se ficar vazia, o fallback é `FTO Informática`. |
| `VITE_COMPANY_PHONE`          | Telefone com 10 a 15 dígitos. Para o Brasil, inclua o DDI `55`.       |
| `VITE_COMPANY_WHATSAPP`       | Mesmo formato do telefone, com DDI, para o link `wa.me`.              |
| `VITE_COMPANY_EMAIL`          | E-mail público. Valor inválido é ignorado.                            |
| `VITE_COMPANY_ADDRESS`        | Endereço público.                                                     |
| `VITE_COMPANY_CITY`           | Cidade.                                                               |
| `VITE_COMPANY_INSTAGRAM`      | Usuário ou URL `https://instagram.com/...`.                           |
| `VITE_COMPANY_FACEBOOK`       | Usuário ou URL `https://facebook.com/...`.                            |
| `VITE_COMPANY_BUSINESS_HOURS` | Horário em texto livre. Vazio usa segunda a sexta, 9h às 18h.         |
| `VITE_GOOGLE_MAPS_URL`        | Link HTTPS do Google Maps.                                            |

Canais vazios ou inválidos não são exibidos. Em desenvolvimento, o console avisa o que foi ignorado. A build de produção não quebra por causa de um campo opcional vazio.

O Vite lê o ambiente **no momento da build**. Alterar o `.env` no servidor, depois que a pasta `dist/` já foi gerada, não muda o site. Rode `npm run build` de novo.

## Desenvolvimento

```bash
npm run dev
```

O Vite sobe o site em `http://localhost:5173`.

Outros comandos:

```bash
npm run lint
npm run format
npm run format:check
npm run typecheck
```

## Build

```bash
npm run build
```

A saída fica em `dist/`. Para conferir localmente:

```bash
npm run preview
```

## Nginx

1. Gere a build na máquina de publicação ou copie a pasta `dist/` já gerada.
2. Publique o **conteúdo** de `dist/` em `/var/www/ftoinformatica/dist`.
3. Ajuste `server_name` e `root` em `nginx/ftoinformatica.conf.example`.
4. Ative o site e recarregue o Nginx.

O exemplo envia `index.html` sem cache longo e mantém cache longo só em `/assets/`, onde o Vite coloca os arquivos com hash. Também inclui cabeçalhos de segurança que não dependem de segredo nenhum.

HTTPS fica a cargo do certificado do domínio. O arquivo de exemplo deixa essa etapa comentada de propósito.

## Conteúdo de demonstração

Depoimentos e o painel de ordem de serviço do hero são ilustrativos. Os textos dizem isso na página. Os números da seção de indicadores descrevem a organização do atendimento neste site. Eles não são histórico de clientes, faturamento ou tempo de mercado.

## Acessibilidade

- HTML em português, com um `h1` e seções rotuladas.
- Link para pular ao conteúdo.
- Contraste do amarelo reservado a fundo, ícone e texto grande sobre o azul.
- Foco visível, menu com teclado e perguntas em `details`.
- Animações respeitam `prefers-reduced-motion`.
