import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../../interfaces/User.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
  providers:[
    MessageService
  ]
})
export class LoginPageComponent {
  user$: Observable<User> | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  
    this.authService.login(this.myForm.value).subscribe(
      (user) => {
        // Manejar la respuesta del backend aquí
        console.log(user);
        this.showMessageLeft(user);
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        // Manejar el error aquí
      }
    );
  }
  
  showMessageLeft(user: User): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Inicio de sesión',
      detail: `${user.message}`
    });
  }
}
