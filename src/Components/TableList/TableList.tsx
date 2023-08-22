import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


type Props = {
    title?: string;
    rowCount?: boolean;
    headers?: string [];
    data: string[][] | Array<Object> ;     
    filter?: boolean;
}



const TextFilter = (props: any) =>  { 

    const {handler, value} = props;
return (
  <Container >
    <FloatingLabel
    controlId="floatingInput"
    label="Search"
    className="mb-3"
  >
    <Form.Control type="search" placeholder="search..." onChange={handler} value={value} />
  </FloatingLabel>
  
  </Container>
);
}

function getDataAsTable (data: string[][] | Array<object>, headers: string[] | null): { headArray: string[]; dataArray: Array<string[]> }
{ 
    let dataArray: string[][] = [];
    let headArray: string[] = [];
    if (data?.length)
    {
        let el = data.at(0);
        if (Array.isArray(el))
        {
            dataArray = data as string[][];
        } 
        else 
        {
            if (!headers || !headers.length)
            {
                headArray = Object(data.at (0)).keys ();
            }
            dataArray = data.map ((v) => Object(v).values ()) ;
        }
    }
    else if (headers?.length)
    {
        headArray = headers;
    }

    return { headArray, dataArray } ;
}


function TableList ({ title, data, headers = [], rowCount = false ,filter = true }:Props) {
 

    const datalist = getDataAsTable(data, headers);
    let colNum: number = datalist?.headArray.length ; 
    
    if (colNum > 0 && rowCount) colNum++ ;
    
    const makeCell = (data: string, isHeader: boolean) => {
            if (isHeader) return <th>{data}</th>;
            return <td>{data}</td>;
    };    
    const makeRow = (data: string[], isHeader: boolean, idx: number = 0) => {
        const finRow = [] ;
        if (isHeader === true) 
        {
            if (rowCount) finRow.push (makeCell ('', isHeader));
            data.map ((val, id) => finRow.push (makeCell (val, isHeader)));            
        }    
        else 
        {
            finRow.push ( makeCell (String(idx + 1), isHeader));
            data.map ((val) => finRow.push (makeCell (val, isHeader)));                   
        }
        return finRow;
    }    

    const makeTBody = (data: string[][]) => data.map ((row, id)=> makeRow (row, false, id))
    
    
    return (
    
    <Table title={title}   striped bordered hover variant="dark">
        <thead>
        {
            filter && 
            <tr>
                <th colSpan={colNum}>
                    <TextFilter />
                </th>
            </tr>
        }
        {
            headers?.length
            &&
            <tr>
                {makeRow ( datalist.headArray, true)}
            </tr>
        }   
        </thead>
        <tbody>
             {makeTBody (datalist.dataArray)}
      </tbody>
    </Table>
  );
}

export default TableList;