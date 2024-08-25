import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject, take } from "rxjs";
import { IUproduto } from "src/app/interface/produto";
import { CommonModule } from "@angular/common";
import { ProdutoService } from "src/app/service/produto.service";
import { ModalEditarProdutoComponent } from "src/app/components/modal-produto-editar/modal-produto-editar.component";
import { ModalDeletarComponent } from "src/app/components/modal-deletar/modal-deletar.component";
import { ModalProdutosComponent } from "src/app/components/modal-produtos/modal-produtos.component";

@Component({
  selector: "app-log-produtos",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./log-produtos.component.html",
  styleUrls: ["./log-produtos.component.css"],
})
export class LogProdutosComponent implements OnInit {
  produtos: IUproduto[] = [];
  listasProdutos = new Subject<IUproduto[]>();
  alert = false;
  mensagem = "";

  constructor(
    private produtoService: ProdutoService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProdutos();

    // Assinatura do Subject para atualizar a lista de produtos
    this.listasProdutos.subscribe((respostaSubject: IUproduto[]) => {
      this.produtos = respostaSubject;
    });
  }

  //metodo chamar modal cadastro
  openModal(): void {
    const modalRef = this._modalService.open(ModalProdutosComponent);

    modalRef.closed.subscribe((produto: IUproduto) => {
      if (produto) {
        // Verifique se o produto não está duplicado antes de adicionar à lista
        const produtoExistente = this.produtos.find((p) => p.id === produto.id);
        this.getProdutos();
        this.mostrarMensagem("Produto cadastrado com sucesso!");
      } else {
        this.mostrarMensagem("Produto não cadastrado!");
      }
    });
  }

  modalEditar(item: IUproduto) {
    const modal = this._modalService.open(ModalEditarProdutoComponent, {
      centered: true,
    });
    modal.componentInstance.id = item.id;
    modal.componentInstance.produto = item.produto;
    modal.componentInstance.descricao = item.descricao;
    modal.componentInstance.foto = item.foto;
    modal.componentInstance.preco = item.preco;

    modal.closed.subscribe((resposta) => {
      console.log(resposta);
      const produto: IUproduto = {
        id: resposta.id,
        produto: resposta.produto,
        descricao: resposta.descricao,
        foto: resposta.foto,
        preco: resposta.preco,
      };
      this.produtoService.editarProduto(produto).subscribe(() => {
        this.getProdutos();
        this.alert = true;
        this.mensagem = "Produto alterado com sucesso!";
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      });
    });
  }

  //metodo para deletar produto

  modalDeletar(id: number, tipo: string) {
    const modal = this._modalService.open(ModalDeletarComponent, {
      centered: true,
    });

    // Passa as informações para o modal
    modal.componentInstance.itemId = id;
    modal.componentInstance.itemTipo = tipo;
    modal.componentInstance.itemNome =
      tipo === "usuário" ? "usuário" : "produto";

    modal.closed.subscribe(() => {
      if (tipo === "produto") {
        this.produtoService.deletarProduto(id).subscribe(() => {
          this.getProdutos();
          this.mostrarMensagem("Produto excluído com sucesso!");
        });
      }
    });
  }

  mostrarMensagem(mensagem: string) {
    this.alert = true;
    this.mensagem = mensagem;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

  // Método para buscar produtos do serviço

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe((respostaApi: IUproduto[]) => {
      this.listasProdutos.next(respostaApi);
    });
  }
}
