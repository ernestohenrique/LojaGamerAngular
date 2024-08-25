import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AreaLogadaComponent } from "./log-login/log-login.component";
import { LogProdutosComponent } from "./log-produtos/log-produtos.component";
import { LogadaComponent } from "./logada.component";

const restritoRoutes: Routes = [
  {
    path: "",
    component: LogadaComponent,
    canActivate: [AuthGuard], // Protege a rota base 'logada' com o AuthGuard
    children: [
      {
        path: "loginlogado",
        component: AreaLogadaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "produtos",
        component: LogProdutosComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  // Adiciona uma rota coringa para capturar todas as rotas não existentes
  { path: "**", redirectTo: "/main" },
];

@NgModule({
  imports: [RouterModule.forChild(restritoRoutes)],
  exports: [RouterModule],
})
export class RestritoRoutingModule {}
