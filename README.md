# native-federation-examples-react

A minimal **React 18** hello world application built with **ESbuild**, serving as the foundation for a native-federation micro frontend example.

## Stack

- **React 18** — with hooks and Strict Mode
- **TypeScript** — for type safety
- **ESbuild** — for fast bundling (dev + production)

## Getting started

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens a dev server at <http://localhost:3000> with file watching.

### Production build

```bash
npm run build
```

Outputs minified bundles to `dist/`.

## Project structure

```
├── public/
│   └── index.html       # HTML entry point
├── src/
│   ├── main.tsx         # React root mount
│   └── App.tsx          # App component
├── build.mjs            # ESbuild dev/build script
├── tsconfig.json
└── package.json
```

## Preview

![Hello World app](https://github.com/user-attachments/assets/379e78ca-e45c-4751-bc7c-eec50725286a)
