declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

interface ImportMetaEnv {
  readonly VITE_PB_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
