interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_INDEXABLE?: string;
  readonly PUBLIC_FORM_PROVIDER?: string;
  readonly PUBLIC_FORMSUBMIT_TARGET?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
