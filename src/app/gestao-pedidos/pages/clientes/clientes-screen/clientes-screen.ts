import { Component, inject, OnInit, signal } from '@angular/core';
import { clientesScreenImports } from './clientes-screen.imports';
import { ClienteModel, PagedResult } from '../../../../models';
import { ClientesService } from '../../../../services';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-clientes-screen',
  standalone: true,
  imports: [...clientesScreenImports],
  templateUrl: './clientes-screen.html',
  styleUrl: './clientes-screen.scss',
})
export class ClientesScreen implements OnInit {
  private _clienteService = inject(ClientesService);
  private _snackBar = inject(MatSnackBar);

  pagedResult = signal<PagedResult<ClienteModel>>(null);
  clienteLista = signal<ClienteModel[]>([]);
  

  //Paginator
  tamanhoPagina = signal<number>(10);
  pagina = signal<number>(1);
  pageIndex = signal<number>(0);

  gridClientesColunas = [
    { column: 'nomeCompleto', header: 'Nome Completo', columnWith: '71vw'},
    { column: 'cpf', header: 'CPF', columnWith: '7vw', mask: '000.000.000-00'},
  ];


  ngOnInit(): void {
    this.obterListagemClientes(this.pagina(), this.tamanhoPagina());
  }
  

  obterListagemClientes(page: number, pageSize: number){
    this._clienteService.getClientes(page, pageSize).subscribe(
      {
        next: (data) => {
          var dados = data as PagedResult<ClienteModel>
          var clienteLista = dados.itens;

          this.pagedResult.set(dados);
          this.clienteLista.set(clienteLista);
        },
        error: (err) =>{
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
    
      this.obterListagemClientes(1, event.pageSize);
      return;
    }
  
    if (event.pageIndex > (event.previousPageIndex ?? -1)) {
      this.pagina.update(v => v + 1);
    }
    else if (event.pageIndex < (event.previousPageIndex ?? 0)) {
      this.pagina.update(v => v - 1);
    }
  
    this.pageIndex.set(event.pageIndex);
  
    this.obterListagemClientes(this.pagina(), this.tamanhoPagina());
  }
 
}
