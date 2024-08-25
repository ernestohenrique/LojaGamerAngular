import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUproduto } from "../interface/produto";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private apiProduto = "http://localhost:3000/produtos";
  private currentProduto: IUproduto | null = null;

  constructor(private http: HttpClient) {}

  // Método para cadastrar um novo produto
  cadastrar(produto: IUproduto): Observable<IUproduto> {
    return this.http.post<IUproduto>(this.apiProduto, produto);
  }

  // Método para obter o produto atual
  getCurrentProduto(): IUproduto | null {
    if (this.currentProduto) {
      return this.currentProduto;
    }

    const userJson = localStorage.getItem("currentProduto");
    if (userJson) {
      this.currentProduto = JSON.parse(userJson);
      return this.currentProduto;
    }

    return null;
  }

  // Método buscar o produto
  getProdutos(): Observable<IUproduto[]> {
    return this.http.get<IUproduto[]>(this.apiProduto);
  }

  // Método deletar o produto
  deletarProduto(id: number): Observable<IUproduto> {
    return this.http.delete<IUproduto>(`${this.apiProduto}/${id}`);
  }
  // Método para editar o produto
  editarProduto(produto: IUproduto): Observable<IUproduto> {
    return this.http
      .put<IUproduto>(`${this.apiProduto}/${produto.id}`, produto)
      .pipe(
        catchError((error) => {
          console.error("Erro ao editar o produto:", error);
          return throwError(error);
        })
      );
  }
}
