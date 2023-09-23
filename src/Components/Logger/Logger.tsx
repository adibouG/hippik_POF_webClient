import { create } from "domain";
import { type } from "os";
import { Component, ComponentProps, ReactComponentElement, ReactPropTypes, Ref, createRef, useRef } from "react";
 
/*
*  Signature of a logging function 
*/
export interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

/*
* Basic logger interface 
*/

export interface ConsoleLogger 
{
  log: LogFn;
  warn: LogFn;
  error: LogFn;
  send?: () => Promise<void>; 
  cache?: string [];
  options? : LoggerOption;
  //file?: string | LogFile;
  //unique?: boolean;
  instanceRef?: React.RefObject<ConsoleLogger>;
}


/*
* Log levels 
*/

export type LogLevel = 'log' | 'warn' | 'error';

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {};

class LogFile {
    filename: string;
    filehandle?: FileSystemFileHandle;
    private fileReady?: boolean;
 
    constructor (file: {filename: string, filehandle?: FileSystemFileHandle} )
    {
        this.fileReady = false;
        this.filename = file.filename;
        navigator.storage.getDirectory()
            .then ( dir => dir.getFileHandle(this.filename , {create: true,}))
            .then ( handle => this.filehandle = handle)
            .then (() => this.fileReady = true)
            .catch ( err => err ) ;       
            
    }

    // get a new file handler 
    async getHandle () {
        const dir  = await navigator.storage.getDirectory(); 
        const fileHandle = await dir.getFileHandle(this.filename , {create: true,});   
        return this.filehandle = fileHandle;
    }

    //write to file
    async writeLogs (text: string[]) {
        try
        {
            if (this.fileReady) 
            {
                const handle = this.filehandle as FileSystemFileHandle   ;
                if (window.isSecureContext) {
                    const stream  = await handle.createWritable ({keepExistingData: true}) ;           
                    const writer = stream ? stream.getWriter () : null;
                    if (!writer) throw new Error ('get file writer error');
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
            return false;
        }
        catch (e) 
        {
            throw e;
        }
    }        
}

/*
* Logger which outputs to the browser console and a file if specified (file should be sent to server at session end)
*/
interface LoggerOption 
{
  level? : LogLevel;
  file? : string | LogFile; 
  isSingleton? :boolean;
}


export class Logger extends Component implements ConsoleLogger {
  
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;
  
  readonly send?: () => Promise<void>; 
  readonly options? : LoggerOption;
  instanceRef? : React.RefObject<this>;
  
  
  constructor(loggerProps: React.ComponentProps<any>) {
    
    const { options, props } = loggerProps || {}; 
    const { level, file, isSingleton } = options || {}; 
    super(props);
    this.options = {} ;
    this.options.isSingleton = (!isSingleton) ? true : isSingleton ;
        
    if (file) 
    {
        this.options.file = typeof file === 'string' ? new LogFile ({ filename: file  + '_' + Date.now ()}) : file;
        this.send = async () => {
            //TODO: send file to serverr
        };
    }
    if (this.options.isSingleton && (this.instanceRef?.current === this) ) 
    {
      return;
    }

    this.instanceRef = createRef<this> ();
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



/*
* The App environment 
*/
export enum Env { development, production };

export const APP_ENV: Env = process.env.REACT_APP_APP_ENV?.toLowerCase () /*NODE_ENV*/ === 'prod' ? Env.production : Env.development;

export const LOG_LEVEL: LogLevel = APP_ENV === Env.production ? 'warn' : 'log';

export const LOG_FILE : string | undefined =  process.env.REACT_APP_APP_LOG_FILE ;

export const logger = new Logger({ level: LOG_LEVEL, file: LOG_FILE });


 

