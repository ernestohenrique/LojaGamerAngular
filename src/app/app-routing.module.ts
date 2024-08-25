import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { AuthGuard } from "./auth.guard";
import { CadastrarComponent } from "./cadastrar/cadastrar.component";
import { LogadaComponent } from "./logada/logada.component";

const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () =>
      import("./login/login.component").then((m) => m.LoginComponent),
  },
  { path: "main", component: MainComponent },
  { path: "cadastrar", component: CadastrarComponent },
  {
    path: "logada",
    loadChildren: () =>
      import("./logada/logada-routing.module").then(
        (m) => m.RestritoRoutingModule
      ),
  },
  // Adiciona uma rota coringa para capturar todas as rotas não existentes
  { path: "**", redirectTo: "/main" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
