import { Component, inject, OnInit } from '@angular/core';
import { novoProdutosScreenImports } from './novo-produtos.screen.imports';
import { ProdutosService } from '../../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { ProdutoModel, ResultadoOperacaoModel } from '../../../../models';

@Component({
  selector: 'app-novo-produtos-screen',
  standalone: true,
  imports: [...novoProdutosScreenImports],
  templateUrl: './novo-produtos-screen.html',
  styleUrl: './novo-produtos-screen.scss',
})
export class NovoProdutosScreen implements OnInit {
  private _produtoService = inject(ProdutosService)
  private _activeRoute = inject(ActivatedRoute)
  private _router = inject(Router)
  private _snackBar = inject(MatSnackBar)

  form = new FormGroup({
    inputNomeProduto: new FormControl(''),
    inputDescricao: new FormControl(''),
    inputPreco: new FormControl(''),
    inputQuantidade: new FormControl('')
  })

  ngOnInit(): void {
    
  }

  salvarProduto(){

    const produto: ProdutoModel = {
      nomeProduto: this.form.get('inputNomeProduto').value,
      descricao: this.form.get('inputDescricao').value,
      preco: Number(this.form.get('inputPreco').value.replaceAll('R$', '').replaceAll('.', '').replaceAll(',','.')),
      quantidade: Number(this.form.get('inputQuantidade').value)
    }

    if(produto.nomeProduto == ''){
      this._snackBar.open('Preencha o Nome do Produto!', null, {duration: 3000});
      return;
    }

    if(produto.descricao == ''){
      this._snackBar.open('Preencha a Descrição!', null, {duration: 3000});
      return;
    }

    if(produto.preco == 0){
      this._snackBar.open('Informe o Preço!', null, {duration: 3000});
      return;
    }

    if(produto.quantidade == 0){
      this._snackBar.open('Informe a Quantidade!', null, {duration: 3000});
      return;
    }

    this._produtoService.postProduto(produto).subscribe(
      {
        next: (data) =>{
          const dados = data as ResultadoOperacaoModel;
          if(dados.sucesso){
            this._snackBar.open(dados.mensagem, null, {duration: 3000});
            this._router.navigate(['/produtos'], { relativeTo: this._activeRoute});
          }
        },
        error: (err) => {
           this._snackBar.open(err.error.errors[0], null, {duration: 3000});
        }
      }
    )
  }
}
