import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-log-menu",
  standalone: true,
  imports: [],
  templateUrl: "./log-menu.component.html",
  styleUrls: ["./log-menu.component.css"],
})
export class LogMenuComponent {
  constructor(private _router: Router) {}
  navigateToCadastros() {
    this._router.navigate(["/logada/loginlogado"]);
  }

  navigateToProdutos() {
    this._router.navigate(["/logada/produtos"]);
  }
}
