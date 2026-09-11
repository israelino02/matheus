# Site — Stoff Line Estofados

Site institucional estático (HTML + CSS + JavaScript, sem dependências).
Basta hospedar a pasta `site/` em qualquer servidor ou serviço de hospedagem.

---

## Contatos do site

- **WhatsApp:** (75) 99960-4266
- **Instagram:** https://www.instagram.com/stoff.line/

### Como trocar o número do WhatsApp
Abra `js/main.js`, primeira linha de código:

```js
const WHATSAPP = "5575999604266";
```

Formato: **55 + DDD + número**, só dígitos, sem espaços ou traços.
Todos os botões e links de WhatsApp (topo, menu, cards de produto, formulário,
rodapé e botão flutuante) são montados a partir dessa constante.

O número também aparece **escrito** em três pontos do `index.html`, que
precisam ser trocados à mão: em "Venha nos visitar", no rodapé e no campo
`"telephone"` dos dados estruturados.

## Manutenção

### Fotos dos produtos
As fotos vêm da pasta `PRODUTOS`, uma subpasta por modelo. Para trocar ou
acrescentar, coloque o arquivo em `assets/img/` seguindo o padrão de nome
(`nome-do-modelo-1.jpg`, `-2.jpg`…) e some a tag `<img>` dentro do
`.model__img` do card — os indicadores de foto se ajustam sozinhos.

### Depoimentos
A seção de depoimentos foi retirada por seguir com texto de exemplo. Quando
tiver os feedbacks reais do destaque "Feedbacks ❤️" do Instagram, é só pedir
que ela volta — o espaço no layout já está previsto.

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
6. Modelos — 5 produtos com filtro por categoria e troca de fotos
7. Como funciona — 4 etapas do processo
8. Tecidos — famílias de tecido
9. Vídeos — os 3 reels
10. Dúvidas frequentes — acordeão
11. Orçamento — formulário que abre o WhatsApp preenchido
12. Localização — mapa do Google + horários
13. Rodapé

## Como alterar as cores

Tudo está no início de `css/style.css`, no bloco `:root`:

```css
--ink:  #0C0C0C;   /* preto da marca   */
--gold: #FFC20E;   /* amarelo da marca */
--sand: #F6F2EC;   /* bege dos fundos  */
```

## Tipografia

Títulos em **Fraunces** e textos em **DM Sans**, carregadas do Google Fonts.
Para trocar, altere o `<link>` no `<head>` do `index.html` e as variáveis
`--font-display` e `--font-sans` no topo do `css/style.css`.

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

### Endereço atual

O site está publicado pelo GitHub Pages em:
**https://israelino02.github.io/matheus/**

As tags `canonical`, `og:url` e `og:image` do `index.html` já apontam para esse
endereço. **Ao contratar o domínio próprio** (ex.: `stoffline.com.br`), troque as
três para o novo endereço — sem isso a prévia do link no WhatsApp e o
posicionamento no Google continuam apontando para o endereço antigo.
