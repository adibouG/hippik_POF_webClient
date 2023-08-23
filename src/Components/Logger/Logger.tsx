
 
/** Signature of a logging function */
export interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

/** Basic logger interface */
export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
  cache?: string [];
  file?: string | LogFile;
  send?: () => Promise<void>; 
}

/** Log levels */
export type LogLevel = 'log' | 'warn' | 'error';

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {};

class LogFile {
    filename: string;
    filehandle?: FileSystemFileHandle;
    fileReady?: boolean;
 
    constructor (file: {filename: string, filehandle?: FileSystemFileHandle} )
    {
        this.fileReady = false;
        this.filename = file.filename;
        navigator.storage.getDirectory()
            .then ( dirHandle => dirHandle.getFileHandle(this.filename , {create: true,}))
            .then ( handle => this.filehandle = handle)
            .then (() => this.fileReady = true)
            .catch ( err => err ) ;       
            
    }


    async getHandle () {
        const opfs = await navigator.storage.getDirectory(); 
        const fileHandle = await opfs.getFileHandle(this.filename , {create: true,});   
        this.filehandle = fileHandle;
    }
    async writeLogs (text: string[]) {
        try
        {
            if (this.fileReady) 
            {
                const stream = await this.filehandle?.createWritable ({keepExistingData: true});           
                const writer = stream?.getWriter ();
                const encoder = new TextEncoder ();
                const encoded = encoder.encode (text.join ('\n'));
                
                for (const part in encoded) 
                {
                    await writer?.ready ;
                    await writer?.write (part);
                }
                await writer?.ready ;
                await writer?.close ();
            }
            return true;
        }
        catch (e) 
        {
            throw e;
        }
    }        
}
/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;
  readonly file?: string | LogFile; 
  readonly send?: () => Promise<void>; 

  constructor(options?: { level? : LogLevel, file? : string | LogFile }) {
    const { level, file } = options || {}; 
    
    if (file) 
    {
        this.file = typeof file === 'string' ? new LogFile ({ filename: file  + '_' + Date.now ()}) : file;
        this.send = async () => {
                    //send file to serverr
           };
    }

    this.error = console.error.bind(console);
    if (level === 'error') 
    {
      this.warn = NO_OP;
      this.log = NO_OP;
      return;
    }

    this.warn = console.warn.bind(console);
    if (level === 'warn')
    {
      this.log = NO_OP;
      return;
    }

    this.log = console.log.bind(console);
  }

  
}

/** The App environment */
export type Environment = 'development' | 'production';

export const APP_ENV: Environment = process.env.REACT_APP_APP_ENV /*NODE_ENV*/ === 'production' ? 'production' : 'development';

export const LOG_LEVEL: LogLevel = APP_ENV === 'production' ? 'warn' : 'log';
export const LOG_FILE : string | undefined =  process.env.REACT_APP_APP_LOG_FILE ;

export const logger = new ConsoleLogger({ level: LOG_LEVEL, file: LOG_FILE });