# StoryCast

An accessible media feature microsite. StoryCast showcases short audio and video stories, and every story ships with captions or a full transcript. Built with semantic HTML5, Sass, CSS Grid, Flexbox, a container-queried component and a little vanilla JavaScript. No frameworks.

- Repository: https://github.com/nezyman/storycast
- Live site: https://nezyman.github.io/storycast/

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Introduces StoryCast, features three stories, clear primary navigation |
| Story (detail) | `story/market-in-sound.html` | Video with captions, transcript, visual description, related stories |
| Story (detail) | `story/night-shift-letters.html`, `story/radio-that-taught-me.html` | Audio stories using the same detail template |
| About / Access | `about.html` | Mission, accessibility features, how to engage, keyboard guide, accessibility statement |

## Project structure

```
storycast/
├── index.html
├── about.html
├── story/
│   ├── market-in-sound.html
│   ├── night-shift-letters.html
│   └── radio-that-taught-me.html
├── sass/
│   ├── main.scss
│   ├── _colors.scss
│   ├── _typography.scss
│   ├── _spacing.scss
│   ├── _base.scss
│   ├── _layout.scss
│   ├── _media-card.scss
│   ├── _story.scss
│   ├── _transcript.scss
│   └── _about.scss
├── css/
│   └── main.css
├── js/
│   └── storycast.js
├── assets/
│   ├── audio/
│   ├── video/
│   ├── captions/
│   ├── transcripts/
│   └── images/
├── docs/
│   ├── StoryCast-Research.pdf
│   └── StoryCast-Documentation.pdf
├── package.json
└── README.md
```

Sass is split into design tokens (`_colors`, `_typography`, `_spacing`), base styles, layout, and one partial per component. `main.scss` pulls them together with `@use`.

## Run locally

You need Node.js installed.

```bash
git clone https://github.com/nezyman/storycast.git
cd storycast
npm install
npm run build
```

Then serve the folder with any static server. In VS Code, install the Live Server extension, right-click `index.html` and choose Open with Live Server. Or run `npx serve` in the project folder.

While editing Sass, run `npm run watch` in a second terminal and the CSS rebuilds on every save.

| Command | What it does |
|---|---|
| `npm run build` | Compiles `sass/main.scss` to `css/main.css` |
| `npm run watch` | Recompiles automatically when a `.scss` file changes |

## Responsive layout

- CSS Grid: the story card grid (`repeat(auto-fit, minmax(...))`), the story page two-column layout, the feature list and the transcript rows.
- Flexbox: header, navigation, footer, button rows and card metadata tags.
- Container query: each story card sits in a `.media-card-wrap` with `container-type: inline-size`. When its container is at least 34rem wide, the card switches from stacked to image-left. When it is under 20rem, the metadata tags stack. The card reacts to the space it is given, not the screen width.

## Accessibility checklist

| Requirement | How it is met |
|---|---|
| Semantic structure | `header`, `nav`, `main`, `article`, `section`, `aside`, `figure`, `figcaption`, `footer`, `time`, `dl`, `ol`/`ul` used for their meaning. One `h1` per page and a logical heading order. |
| Landmarks labelled | Two or more `nav` elements are distinguished with `aria-label` (Primary, Footer, Breadcrumb). Sections use `aria-labelledby` pointing at their headings. |
| Captions for video | `<track kind="captions" srclang="en" default>` loading a WebVTT file for the video story. |
| Transcripts for all media | Every audio and video story has a full on-page transcript and a plain text download. |
| Description of visuals | Each `figure` has a `figcaption` describing the visual, linked to the media with `aria-describedby`. The video transcript includes a visual description note. |
| Decorative images | Cover images and posters use `alt=""` because their content is described in the `figcaption` and transcript. |
| Contrast (WCAG 2.1 AA) | Measured ratios: body text 15.7:1, links 7.29:1, muted text 7.96:1, white on primary 7.9:1, hero eyebrow 5.32:1, UI borders 3.11:1. Text needs 4.5:1 and UI components 3:1. |
| Keyboard navigation | Everything is reachable with Tab. A skip link is the first focusable element. Transcript timestamps are real `<button>` elements. |
| Visible focus | `:focus-visible` shows a 3px outline with offset. On dark backgrounds the outline switches to the accent colour so it stays visible. |
| Current page | `aria-current="page"` on the active nav link and breadcrumb item, plus bold text and a thicker underline so it is not colour alone. |
| Active transcript line | Highlighted with a thick left bar, bold text and tinted background, not colour alone, and marked with `aria-current="true"`. |
| Links | Underlined by default. Link text describes the destination. |
| Target size | Buttons and nav links have a minimum height of 2.75rem. |
| No audio clash | Starting one player pauses any other (WCAG 1.4.2). |
| Progressive enhancement | Without JavaScript the media still plays with native controls, captions load from `<track>`, and the transcript is a plain readable list. |
| Language | `lang="en"` on every page. |
| Responsive and zoom friendly | Rem-based sizing, fluid grids and a mobile-first layout that reflows without horizontal scrolling. |
| ARIA used sparingly | Native HTML is used first. ARIA is added for labelling landmarks, linking descriptions to media, marking the current item and labelling timestamp buttons ("Play from 0:24"). |

## Media and credits

The three stories are fictional pieces written for this project. Narration is a synthetic demo voice. Captions are WebVTT files in `assets/captions/`, and plain text transcripts are in `assets/transcripts/`.

## Known limitations

- Video is described in text only; there is no separate audio-described soundtrack.
- Player controls come from the browser, so their look and shortcuts vary.
- Captions are English only.

## Research and planning

The sitemap, wireframe link and high-fidelity mockup link are in `docs/StoryCast-Research.pdf`. Design decisions and build notes are in `docs/StoryCast-Documentation.pdf`.

## Author

Ishimwe Sam Nelson, African Leadership University.