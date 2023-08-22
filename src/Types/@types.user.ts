
export interface User {
  id?: number;
  name: string;
  role?: string ;
  email: string ;
  imgSrc?: string;
}

export interface UserDisplayData extends User {
  
  status?: string;
}

export class UserData implements UserDisplayData {
  id?: number;
  name: string;
  role?: string ;
  email: string ;
  imgSrc?: string;
  status?: string;

  constructor ( user: UserDisplayData | UserData ) 
  {

    this.id = user.id ;
    this.name = user.name ;
    this.role = user.role ;
    this.email = user.email ;
    this.imgSrc = user.imgSrc;
    this.status = user.status ;
  }

}