import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import reportWebVitals from '../../reportWebVitals';


type Props = {
    title?: string;
    rowCount?: boolean;
    headers?: string [];
    data: string[][] | Array<Object> ;     
    filter?: boolean;
    editable?: boolean;
    onclickCb? : Function | null;
    filterCb? : Function | null;
}

type TableCellData = {
    celldata: string | number;
    isHeader: boolean;
    id: string|number;
}

type TableRowData = {
    rowdata: string[];
    isHeader?: boolean;
    rowCount?: boolean;
    id?: string|number;
    editable?: boolean;
}



const TextFilter = (props: any) =>  { 

    const {handler, value} = props;
return (
  <Container >
    <FloatingLabel controlId="searchInput"
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
const TableCell = ({celldata, isHeader = false, id = 0}: TableCellData) => {
    if (isHeader) return <th key={`${id}${celldata}`}id={`${id}${celldata}`} >{celldata}</th>;
    return <td key={`${id}${celldata}`} id={`${id}${celldata}`}>{celldata}</td>;
};    

const TableRow = ({ rowdata, isHeader = false, rowCount = false, id = 1, editable = false }: TableRowData) => {
    const finalRow = [] ;
    if (isHeader && rowCount) finalRow.push (<TableCell celldata={''} isHeader={true} id={'headerCount'} />);
    else if (rowCount) finalRow.push ( <TableCell celldata={id} isHeader={isHeader} id={'count' + id} />); 
    rowdata.map ((val, idx) => finalRow.push (<TableCell celldata={val} isHeader={isHeader} id={`${id}-${idx}`} /> ));                   
    
    if (editable) finalRow.push (<TableCell celldata={''} isHeader={isHeader} id={`edit${id}`} />  )
    
    return <tr key={`row${id}`} id={String(id)}>{finalRow}</tr>;
}    

function TableList ({ title, data, headers = [], rowCount = false ,filter = false, editable=false, onclickCb = null, filterCb =null }:Props) {
 
    const [filterText ,setFilterText] = useState<string> () ; 
    const [selectedRow ,setSelectedRow] = useState<string> () ;
    const [selectedData ,setSelectedData] = useState<unknown> () ;


    const datalist = getDataAsTable(data, headers);
    let colNum: number = datalist?.headArray.length ; 
    
    if (colNum > 0 && rowCount) colNum++ ;
      
    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation ();
        e.preventDefault () ;
        const {target} = e;
        const element = target as HTMLElement;
        const row = element.closest ('tr') ;
        if (row) {

            alert (row?.id)
            console.log(row.childNodes);
            setSelectedRow (row?.id) ; 
            if (onclickCb) onclickCb (row?.id)
        }
    }
    return (
    
    <Table title={title} onClick={handleClick}  striped bordered hover variant="dark">
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
            datalist.headArray?.length
            &&
            <TableRow  rowdata={datalist.headArray} isHeader={true} id={'head'} rowCount={rowCount} editable={editable} />
        }   
        </thead>
        <tbody>
        {
            datalist.dataArray?.length
            &&
            datalist.dataArray.map ((row, id) => <TableRow rowdata={row} isHeader={false} id={id} rowCount={rowCount} editable={editable} />)
        }   
      </tbody>
    </Table>
  );
}

export default TableList;