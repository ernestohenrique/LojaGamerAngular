import { NgModule } from "@angular/core";

import { AppInicialComponent } from "./app-inicial/app-inicial.component";
import { BrowserModule } from "@angular/platform-browser";
import { MenuComponent } from "./menu/menu.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./main/main.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
//import { CommonModule } from "@angular/common";
import { AreaLogadaComponent } from "./logada/log-login/log-login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RestritoRoutingModule } from "./logada/logada-routing.module";
import { LogadaComponent } from "./logada/logada.component";

@NgModule({
  declarations: [AppInicialComponent],
  imports: [
    //CommonModule,
    BrowserModule,
    MenuComponent,
    AppRoutingModule,
    MainComponent,
    FooterComponent,
    LoginComponent,
    AreaLogadaComponent,
    ReactiveFormsModule,
    RestritoRoutingModule,
    LogadaComponent,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppInicialComponent],
})
export class AppModuloModule {}
