import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../service/login.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formLogar!: FormGroup;
  mensagemErro = "";
  submetido = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogar = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.*?[!@#$%¨&*])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
          ),
        ],
      ],
    });
  }

  logar(): void {
    this.submetido = true;
    if (this.formLogar.valid) {
      const form = this.formLogar.value;
      this.loginService.login(form.email).subscribe((usuarios: any[]) => {
        if (usuarios.length > 0) {
          const usuario = usuarios[0];
          if (usuario.senha === form.senha) {
            this.loginService.setCurrentUser(usuario);
            this.router.navigateByUrl("/logada");
          } else {
            this.mensagemErro = "Usuário ou Senha inválida";
          }
        } else {
          this.mensagemErro = "Usuário ou Senha inválida";
        }
      });
    }
  }

  btnInscrever() {
    this.router.navigateByUrl("/cadastrar");
  }
}
