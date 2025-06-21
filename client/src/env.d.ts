interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_KINOPOISK_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}