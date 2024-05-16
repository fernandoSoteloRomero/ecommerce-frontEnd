import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, of, pipe, tap } from 'rxjs';
import { User } from '../../interfaces/User.interface';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ValidationsErrors } from '../../services/validators.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
  providers: [MessageService],
})
export class LoginPageComponent implements OnInit {
  user$: Observable<User> | null = null;
  messages: Message[] = [];
  showMessage = this.authService.getShowMessage() || false;
  
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private validationsErrors: ValidationsErrors
  ) {}
  ngOnInit(): void {
    this.messages = [{
      severity:'error', detail:'Inicie sesión nuevamente'
    }]
    console.log(this.showMessage);
  }
  
  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isValidField(field: string) {
    return this.validationsErrors.isValidField(this.myForm, field);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.showMessage = false;
    this.authService.iniciarSesion(this.myForm.value).subscribe(
      response => {
        this.showMessageLeft(response, 'success');
        setTimeout(() => {
          this.router.navigateByUrl('/cibernetica/inicio')
        }, 1000);
      },
      error => {
        console.error('Login error', error);
        this.showMessageLeft(error.error, 'error');
      }
    );
  }

  showMessageLeft(response: any, type: string): void {
    this.messageService.add({
      severity: type,
      summary: 'Inicio de sesión',
      detail: `${response.message}`,
    });
  }
}
