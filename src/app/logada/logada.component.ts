import { Component } from "@angular/core";
import { LogMenuComponent } from "./log-menu/log-menu.component";
import { RouterModule, RouterLink } from "@angular/router";

@Component({
  selector: "app-logada",
  standalone: true,
  imports: [LogMenuComponent, RouterModule, RouterLink],
  templateUrl: "./logada.component.html",
  styleUrls: ["./logada.component.css"],
})
export class LogadaComponent {}
