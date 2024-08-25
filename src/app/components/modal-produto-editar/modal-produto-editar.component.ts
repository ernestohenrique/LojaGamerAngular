import { CommonModule } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IUproduto } from "src/app/interface/produto";
import { ProdutoService } from "src/app/service/produto.service";

@Component({
  selector: "app-modal-editar-produto",
  templateUrl: "./modal-produto-editar.component.html",
  styleUrls: ["./modal-produto-editar.component.css"],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class ModalEditarProdutoComponent implements OnInit {
  @Input() produto!: string;
  @Input() descricao!: string;
  @Input() foto!: string;
  @Input() preco!: number;
  @Input() id!: number; // Adicionei o id como input

  formEditar!: FormGroup;
  submetido = false;
  mensagemErro = "";

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.formEditar = this.fb.group({
      produto: [this.produto, [Validators.required]],
      descricao: [this.descricao, [Validators.required]],
      foto: [this.foto, [Validators.required]],
      preco: [
        this.preco,
        [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")],
      ],
    });
  }

  editar(): void {
    this.submetido = true;
    console.log(this.formEditar.value); // Verifica os valores do formulário
    if (this.formEditar.valid) {
      const produtoAtualizado: IUproduto = {
        id: this.id, // Utilize o id correto do produto
        produto: this.formEditar.get("produto")?.value,
        descricao: this.formEditar.get("descricao")?.value,
        foto: this.formEditar.get("foto")?.value,
        preco: this.formEditar.get("preco")?.value,
      };
      this.produtoService.editarProduto(produtoAtualizado).subscribe(
        () => {
          this.modal.close(produtoAtualizado);
        },
        (error) => {
          console.error(error); // Mostra o erro no console
          this.mensagemErro = "Erro ao salvar o produto";
        }
      );
    } else {
      console.log("Formulário inválido");
    }
  }
}
