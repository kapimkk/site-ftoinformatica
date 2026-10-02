/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COMPANY_NAME?: string;
  readonly VITE_COMPANY_PHONE?: string;
  readonly VITE_COMPANY_WHATSAPP?: string;
  readonly VITE_COMPANY_EMAIL?: string;
  readonly VITE_COMPANY_ADDRESS?: string;
  readonly VITE_COMPANY_CITY?: string;
  readonly VITE_COMPANY_INSTAGRAM?: string;
  readonly VITE_COMPANY_FACEBOOK?: string;
  readonly VITE_COMPANY_BUSINESS_HOURS?: string;
  readonly VITE_GOOGLE_MAPS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
