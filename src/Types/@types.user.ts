
export interface User {
  id?: number;
  name?: string;
  role?: string ;
  mail?: string ;
  imgSrc?: string;
}

export interface UserDisplayData extends User {
  status?: string;
}

export class UserData implements UserDisplayData {
  id?: number;
  name?: string;
  role?: string ;
  mail?: string ;
  imgSrc?: string;
  status?: string;
  constructor ( user: User ) 
  {
    this.id = user.id ;
    this.name = user.name ;
    this.role = user.role;
    this.mail = user.mail ;
    this.imgSrc = user.imgSrc;
    this.status = '';
  }

}