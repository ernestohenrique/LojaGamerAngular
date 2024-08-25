import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginService } from "src/app/service/login.service";
import { ProdutoService } from "src/app/service/produto.service";

@Component({
  selector: "app-modal-excluir-item",
  templateUrl: "./modal-deletar.component.html",
  styleUrls: ["./modal-deletar.component.css"],
})
export class ModalDeletarComponent {
  @Input() itemId!: number;
  @Input() itemTipo!: string; // Pode ser 'usuário' ou 'produto'
  @Input() itemNome!: string;

  constructor(
    public modal: NgbActiveModal,
    private produtoService: ProdutoService,
    private usuarioService: LoginService
  ) {}

  confirmarExclusao() {
    if (this.itemTipo === "produto") {
      this.produtoService.deletarProduto(this.itemId).subscribe(
        () => this.modal.close("Produto excluído com sucesso"),
        (error) => console.error("Erro ao excluir o produto", error)
      );
    } else if (this.itemTipo === "usuário") {
      this.usuarioService.deletarUsuario(this.itemId).subscribe(
        () => this.modal.close("Usuário excluído com sucesso"),
        (error) => console.error("Erro ao excluir o usuário", error)
      );
    }
  }
}
