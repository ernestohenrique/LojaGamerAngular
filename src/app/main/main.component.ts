import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IUproduto } from "../interface/produto";
import { ProdutoService } from "../service/produto.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent implements OnInit {
  public produtos: IUproduto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.listarProdutos();
  }

  formatPrecoIntl(preco: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);
  }

  listarProdutos(): void {
    this.produtoService.getProdutos().subscribe((retornaProduto) => {
      this.produtos = retornaProduto.map((item) => {
        return item;
      });
    });
  }
}
