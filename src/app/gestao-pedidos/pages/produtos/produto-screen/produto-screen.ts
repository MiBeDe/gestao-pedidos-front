import { Component, inject, OnInit, signal } from '@angular/core';
import { produtoScreenImports } from './produto-screen.imports';
import { PagedResult } from '../../../../models';
import { ProdutoModel } from '../../../../models/produto-model';
import { PageEvent } from '@angular/material/paginator';
import { ProdutosService } from '../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-screen',
  standalone: true,
  imports: [...produtoScreenImports],
  templateUrl: './produto-screen.html',
  styleUrl: './produto-screen.scss',
})
export class ProdutoScreen implements OnInit {
  private _produtoService = inject(ProdutosService);
  private _snackBar = inject(MatSnackBar);
   
  pagedResult = signal<PagedResult<ProdutoModel>>(null);
  produtoLista = signal<ProdutoModel[]>([]);

  //Paginator
  tamanhoPagina = signal<number>(10);
  pagina = signal<number>(1);
  pageIndex = signal<number>(0);

  gridProdutoColunas = [
    { column: 'nomeProduto', header: 'Nome Produto', columnWith: '35vw'},
    { column: 'descricao', header: 'Descricao', columnWith: '31vw'},
    { column: 'quantidade', header: 'Quantidade', columnWith: '6vw'},
    { column: 'preco', header: 'Preço', columnWith: '6vw', currency: {code: 'BRL', display: 'symbol', digitsInfo: '1.2-2', locale: 'pt-BR' }},
  ];


  ngOnInit(): void {
    this.obterListagemProdutos(this.pagina(), this.tamanhoPagina());
  }

  obterListagemProdutos(page: number, pageSize: number){
    this._produtoService.getProdutos(page, pageSize).subscribe(
      {
        next: (data) => {
          var dados = data as PagedResult<ProdutoModel>
          var produtosLista = dados.itens;

          this.pagedResult.set(dados);
          this.produtoLista.set(produtosLista);
        },
        error: (err) => {
          this._snackBar.open(err.error.errors[0], null, {duration: 3000});
        }
      }
    )
  }

  onPageChange(event: PageEvent): void {
  
    if (this.tamanhoPagina() !== event.pageSize) {
    
      this.tamanhoPagina.set(event.pageSize);
      this.pagina.set(1);
      this.pageIndex.set(0);
    
      this.obterListagemProdutos(1, event.pageSize);
      return;
    }
  
    if (event.pageIndex > (event.previousPageIndex ?? -1)) {
      this.pagina.update(v => v + 1);
    }
    else if (event.pageIndex < (event.previousPageIndex ?? 0)) {
      this.pagina.update(v => v - 1);
    }
  
    this.pageIndex.set(event.pageIndex);
  
    this.obterListagemProdutos(this.pagina(), this.tamanhoPagina());
  }
}
