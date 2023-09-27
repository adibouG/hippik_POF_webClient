import { createExternalModuleExport } from "typescript";

type PropName =  string | number | symbol;
type PropValue =  any | unknown | undefined | null;
declare interface UserProps extends React.ComponentProps<any>
{
    [propname: PropName]: PropValue ;
}


//export type Props =  Prop | Prop[] | { [id: PropName ]: Prop | Props };
export type CProps =  UserProps | { [propname: PropName] :UserProps } | undefined | null ;  
export interface UserComponentProps {
    [propname: PropName] : CProps | any | null;
};
 