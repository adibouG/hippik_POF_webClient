import React, { ReactHTML, ReactHTMLElement, ReactNode } from 'react';


export type SearchContextType = { 
    search: string | number | string [] | undefined  ;
    setSearch: Function  ;
} 
const defaultValue = {}
export const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

type Props = {
    children?: React.ReactNode ;
}

function SearchProvider ({ children }: Props ) {
  
  const [search, setSearch] = React.useState<string | number | string [] | undefined>();
 
  const addMarkup = (html: string) => {
    const res = { _html : html  } ;
    return res;
  }
 
  const replText = (h: string) => { 
    return String(h).replace (RegExp('search', 'gi'), `<span style:"color: red">${search}</span>`);
  } 
  
         
  //const updateComponent = (c) => c.forEach(element => {  

    
  //});  
  const searchContextObj = { search, setSearch };
  
  return  (
    <SearchContext.Provider value={searchContextObj} >
        {children}
    </SearchContext.Provider>
  )
}


  export default SearchProvider;