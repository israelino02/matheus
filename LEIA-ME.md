# Site — Stoff Line Estofados

Site institucional estático (HTML + CSS + JavaScript, sem dependências).
Basta hospedar a pasta `site/` em qualquer servidor ou serviço de hospedagem.

---

## ⚠️ 3 coisas para ajustar ANTES de publicar

### 1. Número do WhatsApp (obrigatório)
Hoje está com um número de exemplo. Abra `js/main.js`, primeira linha de código:

```js
const WHATSAPP = "5575999999999"; // <-- trocar pelo número real
```

Formato: **55 + DDD + número**, só dígitos, sem espaços ou traços.
Exemplo: `(75) 98765-4321` vira `5575987654321`.

Só é preciso alterar **nesse único lugar** — os 17 botões e links de WhatsApp do
site (topo, menu, cards de produto, formulário, rodapé e botão flutuante) são
montados automaticamente a partir dele.

### 2. Depoimentos
A seção "Depoimentos" está com textos de espaço reservado. Substitua no
`index.html` (procure por `SUBSTITUIR pelos feedbacks reais`) pelos prints do
destaque **"Feedbacks ❤️"** do Instagram, com nome e cidade de cada cliente.

### 3. Nomes dos modelos
Só "Monarc" e "Riane" vieram do material original. Os demais nomes
("Linha Compact", "Bouclê Milano", "Linha Nórdica", "Curve Caramelo",
"Poltrona Madeira", "Sofá Retrátil Bicolor") foram criados como sugestão —
confirme com a Gizele e ajuste no `index.html`, seção `MODELOS`.

---

## Estrutura de arquivos

```
site/
├── index.html          página única, com todas as seções comentadas
├── css/style.css       estilos (paleta e tipografia no topo, em :root)
├── js/main.js          menu, filtros, FAQ, galeria, vídeos e formulário
└── assets/
    ├── img/            fotos dos produtos e logo
    └── video/          3 reels do Instagram
```

## Seções da página

1. Barra de topo — endereço, horário e redes
2. Cabeçalho fixo com menu
3. Hero — chamada principal
4. Diferenciais — 4 pilares
5. A fábrica — sobre a empresa + frase da CEO
6. Modelos — 8 produtos com filtro por categoria
7. Como funciona — 4 etapas do processo
8. Tecidos — famílias de tecido
9. Projetos entregues — galeria com ampliação de imagem
10. Vídeos — os 3 reels
11. Depoimentos
12. Condições do mês — promoções
13. Dúvidas frequentes — acordeão
14. Orçamento — formulário que abre o WhatsApp preenchido
15. Localização — mapa do Google + horários
16. Rodapé

## Como alterar as cores

Tudo está no início de `css/style.css`, no bloco `:root`:

```css
--ink:  #0C0C0C;   /* preto da marca   */
--gold: #FFC20E;   /* amarelo da marca */
--sand: #F6F2EC;   /* bege dos fundos  */
```

## Como trocar as fotos

Coloque a nova imagem em `assets/img/` e troque o caminho no `index.html`.
Recomendação: JPG, no máximo 1400px no lado maior, até ~300KB por foto
(as atuais já estão nesse padrão — o pacote inteiro de imagens tem 2,2 MB).

## Como visualizar no computador

Abra o `index.html` direto no navegador (duplo clique), ou rode um servidor
local dentro da pasta `site`:

```bash
python3 -m http.server 5173
```

Depois acesse `http://localhost:5173`.

## Publicação

Por ser um site estático, funciona em qualquer hospedagem: basta enviar o
conteúdo da pasta `site/` para a raiz do domínio (`public_html`, Netlify,
Vercel, GitHub Pages, Hostinger etc.).

Antes de publicar, ajuste também no `index.html`:
- a tag `<link rel="canonical">` com o domínio definitivo;
- a tag `<meta property="og:image">` com a URL completa da imagem de
  compartilhamento (necessário para a prévia aparecer no WhatsApp).
