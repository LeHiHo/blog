// types/marked.d.ts
declare module 'marked' {
  export interface MarkedOptions {
    highlight?: (code: string, lang: string) => string;
  }
}
