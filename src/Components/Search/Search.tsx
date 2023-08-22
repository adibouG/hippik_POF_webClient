import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import  { SearchContextType } from '../../ContextStore/SearchContext';

interface Props {
    searchContext: SearchContextType | undefined;
}
const cont = { 
  margin: "3% auto",
  width: 'auto', 
  display: 'flex',
  flexFlow : "column",
  justifyContent: 'center',
  alignItems: 'center' 
};
const form = { 
  border:"1px solid grey",
  padding: '15px', 
  borderRadius: '15px', 
  boxShadow: '0px 0px 20px 20px' 
};

function Search({searchContext}: Props) {

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>)  => {
   
    try
    {
      event.preventDefault ();
      event.stopPropagation ();
      searchContext?.setSearch (event.target.value); //else throw  new Error (res.statusText)
      let d = document.getElementsByTagName ('body').item (0) ;
      
        const check = (i: HTMLCollection | HTMLElement) => {
      
          const hasChild = (f: HTMLElement) => f.children.length;
          const getChilds = (g: HTMLElement) => g.children ;
          const replText = (h: HTMLElement )=> h.innerText.replaceAll (RegExp (String (searchContext?.search), 'gi' ), `<span style:"color: red">${searchContext?.search}</span>`); 
          
        /*  if (hasChild (i))
          {
            let j = i.children;
            j.forEach (el => check(el));
            
          } 
          else
          {
            replText (i);
          }
          */
        };
        
       // check(d);
       

    } 
    catch (e) 
    {
      const err: Error = e as Error;
       alert (err.message);
    }
  }

  
    return (
      <Container style={ cont } >
        <FloatingLabel
        controlId="floatingInput"
        label="Search"
        className="mb-3"
      >
        <Form.Control type="search" placeholder="search..." onChange={handleSearch} value={searchContext?.search} />
      </FloatingLabel>
      
      </Container>
    );
  }




export default Search;