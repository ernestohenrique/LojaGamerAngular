import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { IUproduto } from "src/app/interface/produto";
import { ProdutoService } from "src/app/service/produto.service";

@Component({
  selector: "app-modal-produtos",
  templateUrl: "./modal-produtos.component.html",
  styleUrls: ["./modal-produtos.component.css"],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class ModalProdutosComponent implements OnInit {
  formCadastro!: FormGroup;
  mensagemErro = "";
  submetido = false;

  listasProdutos = new Subject<IUproduto[]>();
  alert = false;
  mensagem = "";

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private service: ProdutoService, // Injeção correta do serviço
    private router: Router // Injetar Router, se necessário
  ) {}

  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      produto: ["", [Validators.required]],
      descricao: ["", [Validators.required]],
      foto: ["", [Validators.required]],
      preco: [
        "",
        [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")],
      ], // Exemplo para formato de preço
    });
  }

  cadastrar(): void {
    this.submetido = true;
    if (this.formCadastro.valid) {
      const form = this.formCadastro.value;
      const id = Math.floor(Date.now() * Math.random()).toString();
      const produto: IUproduto = {
        id: id,
        produto: form.produto,
        descricao: form.descricao,
        foto: form.foto,
        preco: form.preco,
      };
      console.log("Produto a ser cadastrado:", produto);

      this.service.cadastrar(produto).subscribe(
        () => {
          console.log("Produto cadastrado com sucesso");
          this.modal.close(produto);
          this.getProdutos();
          this.mostrarMensagem("Produto cadastrado com sucesso!");
        },
        (error) => {
          console.error("Erro ao cadastrar produto", error);
        }
      );
    }
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
    this.service.getProdutos().subscribe((respostaApi: IUproduto[]) => {
      this.listasProdutos.next(respostaApi);
    });
  }
}
