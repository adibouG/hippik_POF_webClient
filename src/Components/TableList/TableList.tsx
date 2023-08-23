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
                headArray = Object.keys (el as object);
            }
            dataArray = data.map ((v) => Object.values (v)) ;
        }
    }
    else if (headers?.length)
    {
        headArray = headers;
    }

    return { headArray, dataArray } ;
}
type TableCellData = {
    data: string | number;
    isHeader: boolean;
    id: string|number;
}

type TableRowData = {
    data: string[];
    isHeader?: boolean;
    rowCount?: boolean;
    id?: string|number;
}

const TableCell = ({data, isHeader = false, id = 0}: TableCellData) => {
    if (isHeader) return <th key={`${id}${data}`}>{data}</th>;
    return <td key={`${id}${data}`}>{data}</td>;
};    
const TableRow = ({ data, isHeader = false, rowCount = false, id = 0}: TableRowData) => {
    const finalRow = [] ;
    if (isHeader && rowCount) finalRow.push (<TableCell data={''} isHeader={true} id={'header'} />);
    else if (rowCount) finalRow.push ( <TableCell data={id} isHeader={isHeader} id={id} />); 
    data.map ((val, idx) => finalRow.push (<TableCell data={val} isHeader={isHeader} id={`${id}${idx}`} /> ));                   
    
    return <tr key={`row${id}`}>{finalRow}</tr>;
}    

function TableList ({ title, data, headers = [], rowCount = false ,filter = false }:Props) {
 

    const datalist = getDataAsTable(data, headers);
    let colNum: number = datalist?.headArray.length ; 
    
    if (colNum > 0 && rowCount) colNum++ ;
    
    
    const makeTBody = (data: string[][]) => data.map ((row, id)=> <TableRow data={row} isHeader={false} id={id} rowCount={rowCount} />);
    
    
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
            <TableRow  data={datalist.headArray} isHeader={true} rowCount={rowCount}  />
        }   
        </thead>
        <tbody>
             {makeTBody (datalist.dataArray)}
      </tbody>
    </Table>
  );
}

export default TableList;