
import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Spinner from 'react-bootstrap/Spinner';




import { SyntheticEvent } from 'react';

import Events from 'events';
import { EventEmitter } from 'stream';
import { ArrayBindingOrAssignmentElement, ThisExpression } from 'typescript';


interface Props {
  url?: string ;
  opt?: RequestInit ;
  children: React.ReactNode;
  onSubmit?:Function
  onFetch?:Function
  onDataLoaded?:Function
  onError?:Function
}

const style = {
  display: 'block',
  padding: 'var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x)',
  fontSize: 'var(--bs-nav-link-font-size)',
  fontWeight: 'var(--bs-nav-link-font-weight)',
  color: 'var(--bs-nav-link-color)',
  textDecoration: 'none',
  background: '0',
  border: '0',
  transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out',
}
class MyEvent extends Events.EventEmitter {}
        
const ev = new MyEvent();
ev.once ('fetchend', checkResults);

function checkResults (cbArr: Array<FunctionStringCallback>, argArr: Array<unknown>, thisObjArr: (ThisExpression[] | ThisExpression)) {

    if (cbArr && Array.isArray (cbArr)) cbArr.forEach ((cb, idx) =>  {
        let cbArgs = [];
        let thisValue;
        if (argArr.at (idx)) 
        {
            cbArgs.push (argArr.at (idx)); 
        }
        if (thisObjArr)
        {
            if (Array.isArray (thisObjArr) && thisObjArr.at (idx))
            {
                thisValue = thisObjArr.at (idx);
            }
            else 
            {
                thisValue = thisObjArr;
            }
        }
        
        return cb.call (thisValue, cbArgs.toString ());
        // (...cbArgs) ();
        
    })       
}

enum FetchStatus { IDLE , STARTED, LOADING, ENDED, ERRORED, ABORTED }
function DataLoader ({ url='#', opt={}, children, onDataLoaded, onError }: Props) {

    const [data, setData] = useState<{} | []>();
    const [fetchError, setFetchError] = useState<string>('');

    const refStatus = useRef<FetchStatus[]> ([FetchStatus.IDLE]);
    const refPromise = useRef<Promise<unknown>> ();
    
    const startFetch = (data: FormData) => {
        if (refStatus.current.at (-1) !== FetchStatus.IDLE) return false;
        if (refStatus.current.length > 5)   { 
            refStatus.current.splice (0)
            refStatus.current.push (FetchStatus.IDLE) ;
        }
             
        refStatus.current.push (FetchStatus.STARTED) ;
        refPromise.current = new Promise ((resolve, reject) => {
            
              fetchData (data)
                    .then (res => resolve (res))
                    .catch (err => reject (err))
                    
        }); 
        
        throw refPromise.current ;
    }
   /* useEffect (() => {

        
    }, [])
*/

    const onFetchEnd = () => {
/*     
    */      }
   
    const fetchData = async (data: unknown) => {
        
        try
        {
        
            refStatus.current.push (FetchStatus.LOADING);
        
            const res = await fetch (url, opt); 
            refStatus.current.push (FetchStatus.ENDED);
        
            if (res.ok)
            {   
                const jsonData = await res.json ();
                if (JSON.stringify (data) !== JSON.stringify (jsonData))
                {   

                    const merged = Object.assign ({}, jsonData, data);
                    setData ((prevStateData) => { 
                        return {
                            oldData: prevStateData,
                            newData: jsonData,
                            mergedData: merged 
                        };
                    });
                    
                }
                
            } 
        }

        catch (e: Error)
        {
            refStatus.current.push (FetchStatus.ERRORED);
            const text = e.message ;             
            setFetchError (text);
            if (onError) onError (e) ;

        }
        finally
        {
            refStatus.current.push (FetchStatus.IDLE);
            let ev = new Events.EventEmitter ( 'fetchend') ;
            onFetchEnd ();
        }

    }

    useEffect (
        () => { 
            if (onDataLoaded) onDataLoaded (data) ;
            return ;
        },
    [data]
    ) 

  const changeBackground = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.background = 'grey';
      e.currentTarget.style.color = 'white';
    }

  const changeBackgroundBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = '0';
    e.currentTarget.style.color = 'var(--bs-nav-link-color)';
  }
  
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => 
  {

    const formData = new FormData (e.currentTarget);
    startFetch (formData);
    return formData; 
      
  }
  return ;
}

export default DataLoader;