import type * as CSSx from 'csstype';

type CSSStyles =  string | number | undefined | CSSx.SimplePseudos   ;
export type Styling =  {[propname: string]: CSSStyles   } | {[propname: string]: React.CSSProperties} ;  