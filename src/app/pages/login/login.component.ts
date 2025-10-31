import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formLogin;
  //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]
  constructor(private formSvc:FormBuilder,
    private auth:AuthService,
    private router: Router
  ){
    this.formLogin = this.formSvc.group({
      'email':['', [Validators.required, Validators.email]],
      'password':['', [Validators.required]],
    });
  }

  onSubmit(){
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    
    const findUser = this.auth.checkUser(this.formLogin.value as any);
    if (!findUser) {
      alert('Usuario no Encontrado');
      this.router.navigate(['/login']);
      return;
    } 


      const succes = this.auth.login(this.formLogin.value as any);

      console.log('user signal antes de navigate:', this.auth.user());
      if (succes) {
        alert('Login correcto');
      this.router.navigate(['/dashboard']);
        
      }else {
        alert('contraseña incorrectos');
        this.router.navigate(['/login']);
      }
    
     
    
    
    
   
  }

  getError(control:string){
       
    switch(control){
      case 'email':
        if(this.formLogin.controls.email.errors!=null && 
           Object.keys(this.formLogin.controls.email.errors).includes('required'))
           return "El campo email es requerido";
        else if(this.formLogin.controls.email.errors!=null && 
           Object.keys(this.formLogin.controls.email.errors).includes('email'))
           return "El email no es correcto";
        
        break;
      case 'password': 
        if(this.formLogin.controls.password.errors!=null && 
           Object.keys(this.formLogin.controls.password.errors).includes('required'))
           return "El campo contraseña es requerido";
        break;
      default:return "";
    }
    return "";
  }

}
