import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Cadastro bem-sucedido:', response);
          window.location.href = '/login';
          this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
        },
        error => {
          console.log({error})
          console.error('Erro no cadastro:', error);
          this.toastr.error(error.error?.message, 'Erro ao cadastrar');
        }
      );
    }
  }
}
