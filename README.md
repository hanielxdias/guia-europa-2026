# Guia de Viagem — Europa 2026

Dashboard interativo da viagem da Família Cotrim pela Europa em 2026.

## Como instalar

```bash
npm install
```

## Como rodar em desenvolvimento

```bash
npm run dev
```

Depois abra a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Como gerar build de produção

```bash
npm run build
```

Os arquivos finais serão gerados em `dist/`.

## Como editar dados da viagem

Os dados principais ficam em:

```text
src/data/trip.ts
```

Ali você pode alterar:

- cidades e resumos;
- timeline de 15/06/2026 a 07/07/2026;
- voos e trens;
- hospedagens;
- vouchers;
- pontos de mapa;
- dicas;
- documentos;
- missões do dia.

Os tipos TypeScript ficam em:

```text
src/types/trip.ts
```

## Como adicionar imagens

Coloque imagens locais em:

```text
public/images/
```

Depois informe o caminho no item correspondente dos dados, por exemplo:

```ts
image: "/images/roma-coliseu.jpg"
```

Se uma imagem não for informada, o app mostra um placeholder visual com gradiente, ícone e nome do local.

Os assets editoriais atuais ficam em:

```text
public/images/hero-europa-2026.png
public/images/roma-coliseu.png
public/images/florenca-duomo.png
public/images/barcelona-sagrada-familia.png
public/images/basel-catedral-rio-reno.png
```

Os prompts usados para gerar ou recriar essas imagens ficam em:

```text
docs/image-prompts.md
```

## Como adicionar documentos

Coloque arquivos em:

```text
public/documents/
```

Depois atualize o campo `documentPath` ou `filePath` em `src/data/trip.ts`, por exemplo:

```ts
documentPath: "/documents/passagem-italo-roma-florenca.pdf"
```

Enquanto o arquivo real não existir, os cards apontam para:

```text
public/documents/placeholder-documento.html
```

## Como alterar links de Google Maps

Todos os botões usam a função:

```text
src/utils/maps.ts
```

```ts
getGoogleMapsUrl(query: string)
```

Para mudar um local, edite o campo `mapQuery`, `originMapQuery`, `destinationMapQuery` ou `query` nos dados em `src/data/trip.ts`.

## Deploy na Vercel

1. Suba o projeto para um repositório Git.
2. Importe o repositório na Vercel.
3. Use:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

## Deploy na Netlify

1. Suba o projeto para um repositório Git.
2. Importe o repositório na Netlify.
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Estrutura

```text
src/
  assets/
  components/
  data/
  layouts/
  pages/
  types/
  utils/
  App.tsx
  main.tsx
  index.css

public/
  images/
  documents/
```

## Navegação principal

A navegação foi mantida enxuta para uso durante a viagem:

- Início
- Roteiros
- Voos & Trens
- Hospedagens
- Dicas
- Missões
- Documentos

Mapas e vouchers continuam nos dados, mas aparecem de forma contextual em roteiros, hospedagens, transportes e documentos.
