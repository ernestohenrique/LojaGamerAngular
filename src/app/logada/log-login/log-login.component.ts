import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject, timeout } from "rxjs";
import { ModalEditarComponent } from "src/app/components/modal-editar/modal-editar.component";
import { IUsuario } from "../../interface/usuario";
import { LoginService } from "../../service/login.service";
import { ProdutoService } from "src/app/service/produto.service";
import { CommonModule } from "@angular/common";
import { ModalDeletarComponent } from "src/app/components/modal-deletar/modal-deletar.component";

@Component({
  selector: "app-area-logada",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./log-login.component.html",
  styleUrls: ["./log-login.component.css"],
})
export class AreaLogadaComponent implements OnInit {
  usuarios: Array<IUsuario> = [];

  listasUsuarios = new Subject<Array<IUsuario>>();

  alert = false;

  mensagem = "";

  constructor(
    private service: LoginService,
    private _modalService: NgbModal,
    private serviceProduto: ProdutoService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();

    this.listasUsuarios.subscribe((respostaSubject: Array<IUsuario>) => {
      this.usuarios = respostaSubject;
    });
  }

  //---
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
      if (tipo === "usuário") {
        this.service.deletarUsuario(id).subscribe(() => {
          this.getUsuarios();
          this.mostrarMensagem("Usuário excluído com sucesso!");
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

  //----

  modalEditar(item: IUsuario) {
    const modal = this._modalService.open(ModalEditarComponent, {
      centered: true,
    });
    modal.componentInstance.nome = item.nome;
    modal.componentInstance.email = item.email;
    modal.componentInstance.senha = item.senha;

    modal.closed.subscribe((resposta) => {
      console.log(resposta);
      const usuario: IUsuario = {
        id: item.id,
        nome: resposta.nome,
        email: resposta.email,
        senha: resposta.senha,
      };
      this.service.editarUsuario(usuario).subscribe(() => {
        this.getUsuarios();
        this.alert = true;
        this.mensagem = "Usuário alterado com sucesso!";
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      });
    });
  }

  getUsuarios() {
    this.service.getUsuarios().subscribe((respostaApi: Array<IUsuario>) => {
      this.listasUsuarios.next(respostaApi);
    });
  }
}
