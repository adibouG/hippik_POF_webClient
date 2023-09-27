import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import type {UserComponentProps} from '../../Types/@types.props';


//  {
//     title?: string;
//     rowCount?: boolean;
//     headers?: string [];
//     data: string[][] | Array<Object> ;     
//     filter?: boolean;
//     editable?: boolean;
//     onclickCb? : Function | null;
//     filterCb? : Function | null;
// }


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

// typedef for object returned by the function prepareData and fo  
export type TableData = { 
    header: string[] | null; 
    data: string[][] | null; 
}; 

export function prepareData (rawData: string[][] | object[] | string [], headers: string[] = []) : TableData 
{ 
    const tBodyData: string[][] = new Array <Array<string>> ();
    const tHeaderData: string[] = new Array <string> ();
    const formated: TableData = { header: null , data: null } ;  
    let isHeaderProvided = headers.length ;
    
    if (!rawData.length) return formated;
    
    // check 1st raw for array  dimensions, value type, and headers
    
    const row0 = rawData.at (0);
    const isObjectArray = !Array.isArray (row0) && typeof row0 === 'object' ;
    const isStringArray = !isObjectArray  && typeof row0 === 'string' ;
    // prepare header data
    if (!isHeaderProvided)
    {
        if (isObjectArray) 
        {
            tHeaderData.concat (Object.keys (row0 as object)) ;
        }
        else
        {   // test the key for a numbered or associted indexed array,
            // once all data are ready  we will compare the data to confirm if these can be used 
            for (const [key, value] of row0 as string[])
            {
                if (Number.isNaN (key) && typeof key === 'string' ) tHeaderData.push (key) // if associative, the index can be used as headers  
                else tHeaderData.push (value); // otherwise , we use the value , under assumption that the 1sr row contains the headers,
            }
        }
    } 
    else tHeaderData.concat (headers);

    
    // check and preare table body data
    if (isObjectArray)  rawData.forEach ((el) => tBodyData.push ( Array.from (Object.values (el as object)))); 
    else if (isStringArray) rawData.forEach ((el) => tBodyData.push (Array.from ([el as string])));
    else tBodyData.concat (rawData as string[][]) ;
    
    formated.data = tBodyData;
    
    // check header length is ok 
    const headerOk = tBodyData.filter (rows => tHeaderData.length ===  rows.length) ; 
    if (tBodyData.length === headerOk.length) 
    {
        formated.header = tHeaderData;            
    }

    return formated ;
}

/* Table Cell def  */
type TableCellData = {
    celldata: string | number;
    isHeader: boolean;
    id: string|number;
}

const TableCell = ({celldata, isHeader = false, id = 0}: TableCellData) => {
    if (isHeader) return <th key={`${id}${celldata}`}id={`${id}${celldata}`} >{celldata}</th>;
    return <td key={`${id}${celldata}`} id={`${id}${celldata}`}>{celldata}</td>;
};    

/* Table Row  def */ 
type TableRowData = {
    rowdata: string[];
    isHeader?: boolean;
    rowCount?: boolean;
    id?: string|number;
    editable?: boolean;
}

const TableRow = ({ rowdata, isHeader = false, rowCount = false, id = 1, editable = false }: TableRowData) => {
    const finalRow = [] ;
    if (isHeader && rowCount) finalRow.push (<TableCell celldata={''} isHeader={true} id={'headerCount'} />);
    else if (rowCount) finalRow.push ( <TableCell celldata={id} isHeader={isHeader} id={'count' + id} />); 
    rowdata.map ((val, idx) => finalRow.push (<TableCell celldata={val} isHeader={isHeader} id={`${id}-${idx}`} /> ));                   
    
    if (editable) finalRow.push (<TableCell celldata={''} isHeader={isHeader} id={`edit${id}`} />  )
    
    return <tr key={`row${id}`} id={String(id)}>{finalRow}</tr>;
}    

/* Table def */

type TableProps = UserComponentProps;
function TableList ({ title, data, headers = [], rowCount = false ,filter = false, editable=false, onclickCb = null, filterCb =null }: TableProps) {
 
    const [filterText ,setFilterText] = useState<string> () ; 
    const [selectedRow ,setSelectedRow] = useState<string> () ;
    const [selectedData ,setSelectedData] = useState<unknown> () ;
    const [displayedData ,setDisplayedData] = useState<unknown> () ;


    const datalist = prepareData (data, headers);
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