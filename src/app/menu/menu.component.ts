import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LoginService } from "../service/login.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./menu.component.html",
})
export class MenuComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate([""]);
  }
}
