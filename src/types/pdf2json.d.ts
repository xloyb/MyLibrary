declare module 'pdf2json' {
    import { EventEmitter } from 'events';
  
    export default class PDFParser extends EventEmitter {
      constructor(context?: any, value?: number);
      parseBuffer(buffer: Buffer): void;
      loadPDF(pdfFilePath: string, verbosity?: number): Promise<void>;
      createParserStream(): any;
      on(eventName: string, listener: any): this;
      getRawTextContent(): string;
    }
  }
  