import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000/user';

  getAll(){
    return this.http.get(this.apiurl);
  }
  getByCode(code:any){
    return this.http.get(this.apiurl + '/' + code);
  }
  getAllRole(){
    return this.http.get('http://localhost:3000/role');
  }

  proceedRegister(inputdata:any){
    return this.http.post(this.apiurl,inputdata);
  }

  updateUser(code:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+code,inputdata);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  getUserRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }
  Deleteuser(code:any){
    return this.http.delete(this.apiurl+'/'+code);
  }
}
