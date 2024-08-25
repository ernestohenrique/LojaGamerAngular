import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUsuario } from "../interface/usuario";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private apiUsuario = "http://localhost:3000/usuario";
  private currentUser: IUsuario | null = null;

  constructor(private http: HttpClient) {}

  // Método para cadastrar um novo usuário
  cadastrar(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.apiUsuario, usuario);
  }
  // Método para realizar o login
  login(email: string): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.apiUsuario}?email=${email}`);
  }

  // Método para obter o usuário atual
  getCurrentUser(): IUsuario | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
      return this.currentUser;
    }

    return null;
  }

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.apiUsuario);
  }

  deletarUsuario(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${this.apiUsuario}/${id}`);
  }

  editarUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.apiUsuario}/${usuario.id}`, usuario);
  }

  // Método de exemplo para verificar autenticação (precisa ser implementado corretamente)
  isAuthenticated(): boolean {
    return !!localStorage.getItem("currentUser");
  }

  setCurrentUser(user: IUsuario) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  // Método para realizar o logout
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }
}
