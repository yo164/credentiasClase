import { Injectable, inject, signal } from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../../pages/login/login.component';
import { User } from '../models/user';

export interface StrapiUser{
  name?: string;
  surname: string;
  email: string;
  password: string;
}

export interface LoginResponse{
  jwt: string
  user: User
}
@Injectable({
  providedIn: 'root'
})
export class StrapiAuthService {

  

  //public user:any|null;
 // se sustituye por un signal para manejar el usuario de forma reactiva
 public user = signal<User | null>(null);
 public error: any | null;
 private token: string;

 private http:HttpClient = inject(HttpClient);


 //modificaciond el constructor
  constructor() { 
   this.user = signal<any>(null);
   this.error = signal<any>(null);
   const token = localStorage.getItem('token');
   if(token){

   }
   
  }
  me(): User{
    this.http.get("http://localhost:1337/api/users/me", {
      headers:{
        "Authorization":`Bearer ${}`
      }
    });
  }
  //Registrar nuevo usuario
  register(newUser: User): boolean {
    
  }

  login(credentials:Credentials){
    const body = {
      identifier:credentials.email,
      password:credentials.password
    }
    this.http.post<LoginResponse>("http://localhost:1337/api/auth/local", body).subscribe({
      next:(data:LoginResponse) => {
        localStorage.setItem('token', data.jwt);
        const newUser: User = {
          email:data.user.email,
          name: data.user.name,
          surname: data.user.surname
        }
        this.user.set(newUser);
      },
      error:(err) => {
        this.error.set('Ha habido un error: ', err);
      }
    })
  }

  checkUser(credentials: Credentials){
    const users: User[] = JSON.parse(localStorage.getItem('USERS') || '[]');

    if (!users.find(u => u.email === credentials.email)) {
      
      return false;
   }
   return true;
  }

  logout(){
   
  }

}
