type PropName =  string | number | symbol;
type PropValue =  any | unknown | undefined | null;
declare interface UserProps 
{
    [propname: PropName] : PropValue ;
}
declare interface Prop extends React.ComponentProps<any>, UserProps 
{
    // 
}

export type Props =  Prop | Prop[] | { [id: PropName ]: Prop | Props } ;
export type CProps =  Props & ({ [propname: PropName] : Prop } | null ) ;
 