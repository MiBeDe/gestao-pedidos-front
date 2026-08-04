import { Component, inject, OnInit, signal } from '@angular/core';
import { pedidosScreenImports } from './pedidos-screen.imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagedResult, PedidoListModel, ResultadoOperacaoModel } from '../../../../models';
import { PedidosService } from '../../../../services/pedidos/pedidos.service';
import { PageEvent } from '@angular/material/paginator';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pedidos-screen',
  standalone: true,
  imports: [...pedidosScreenImports, CurrencyPipe],
  templateUrl: './pedidos-screen.html',
  styleUrl: './pedidos-screen.scss',
})
export class PedidosScreen implements OnInit{
  private _pedidoService = inject(PedidosService);
  private _snackBar = inject(MatSnackBar);

  pagedResult = signal<PagedResult<PedidoListModel>>(null);

  //Paginator
  tamanhoPagina = signal<number>(10);
  pagina = signal<number>(1);
  pageIndex = signal<number>(0);

  gridPedidoColunas = [
    { column: 'idPedido'},
    { column: 'valorTotalPedido'},
    { column: 'valorTotalPedido'},
  ];

  ngOnInit(): void {
    this.obterListaPedidos(this.pagina(), this.tamanhoPagina())
  }

  obterListaPedidos(page: number, pageSize: number){
    this._pedidoService.getPedidos(page, pageSize).subscribe(
      {
        next: (data) => {
          var dados = data as PagedResult<PedidoListModel>

          this.pagedResult.set(dados);
        },
        error: (err) => {
           this._snackBar.open(err.error.errors[0], null, {duration: 3000});
        }
      }
    )
  }

  alterarStatusPedido(idPedido: number, idStatus: number){
    this._pedidoService.putStatusPedido(idPedido, idStatus).subscribe(
      {
        next: (data) => {
          var dados = data as ResultadoOperacaoModel

          if(dados.sucesso){
            this._snackBar.open(dados.mensagem, null, {duration: 3000});
            this.obterListaPedidos(this.pagina(), this.tamanhoPagina());
          }
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
    
      this.obterListaPedidos(1, event.pageSize);
      return;
    }
  
    if (event.pageIndex > (event.previousPageIndex ?? -1)) {
      this.pagina.update(v => v + 1);
    }
    else if (event.pageIndex < (event.previousPageIndex ?? 0)) {
      this.pagina.update(v => v - 1);
    }
  
    this.pageIndex.set(event.pageIndex);
  
    this.obterListaPedidos(this.pagina(), this.tamanhoPagina());
  }
}
