import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { novoPedidoScreenImports } from './novo-pedido-screen.imports';
import { ClientesService, ProdutosService } from '../../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteDropdownModel } from '../../../../models/cliente-dropdown-model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProdutoDropdownModel } from '../../../../models/produto-dropdown-model';
import { PedidoProdutosModel, ProdutoModel, ResultadoOperacaoModel } from '../../../../models';
import { PedidoModel } from '../../../../models/pedido-model';
import { PedidosService } from '../../../../services/pedidos/pedidos.service';

@Component({
  selector: 'app-novo-pedidos-screen',
  standalone: true,
  imports: [...novoPedidoScreenImports, ReactiveFormsModule],
  templateUrl: './novo-pedidos-screen.html',
  styleUrl: './novo-pedidos-screen.scss',
})
export class NovoPedidosScreen implements OnInit {

  private _clienteService = inject(ClientesService);
  private _produtoService = inject(ProdutosService);
  private _pedidoService = inject(PedidosService);
  private _activeRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  clientesDropdown = signal<ClienteDropdownModel[]>([]);
  produtosDropdown = signal<ProdutoDropdownModel[]>([]);
  produtosSelecionados = signal<ProdutoModel[]>([]);
  pendenteConfig = signal<boolean>(null);

  valorTotal = computed(() => 
    this.produtosSelecionados().reduce(
      (total, produto) => total + (produto.quantidadeSolicitado * produto.preco), 0)
  )

  form = new FormGroup({
    dropdownCliente: new FormControl(null),
    dropdownProduto: new FormControl(null),
    inputQuantidade: new FormControl('')
  })

  ngOnInit(): void {
    this.obterClientesDropdown();
    this.obterProdutosDropdown();
  }

  obterClientesDropdown(){
    this._clienteService.getClientesDropdown().subscribe(
      {
        next: (data) => {
          const dados = data as ClienteDropdownModel[];

          this.clientesDropdown.set(dados);
        },
        error: (err) => {
          this._snackBar.open(err.error.errors[0], null, {duration: 3000});
        }
      }
    )
  }

  adicionarItem(){
    if(this.form.get('inputQuantidade').value != '' && this.form.get('dropdownProduto').value != null){
      let quantidadeSolicitadaNumber = Number(this.form.get('inputQuantidade').value);
      let idProdutoNumber = Number(this.form.get('dropdownProduto').value);

      this.incluirItemNoPedido(idProdutoNumber, quantidadeSolicitadaNumber);
    }else{
       this._snackBar.open('Preencha os campos obrigatórios para adicionar um item!', null, {duration: 3000});
    }
    
  }

  removerItem(idProduto: number){
    this.produtosSelecionados.update(lista => lista.filter(x => x.idProduto !== idProduto))
  }

  obterProdutosDropdown(){
    this._produtoService.getProdutosDropdown().subscribe(
      {
        next: (data) => {
          const dados = data as ProdutoDropdownModel[]
          
          this.produtosDropdown.set(dados);
        },
        error: (err) => {
          this._snackBar.open(err.error.errors[0], null, {duration: 3000});
        }
      }
    )
  }

  incluirItemNoPedido(idProduto: number, quantidadeSolicitada: number){

    let produtoJaAdicionado = this.produtosSelecionados().some(x => x.idProduto == idProduto);
    if(!produtoJaAdicionado){
      this._produtoService.getObterProdutoQuantidadeValida(idProduto, quantidadeSolicitada).subscribe(
      {
        next: (data) =>{
          if(data.sucesso){
            const prod = (data.dados as ProdutoModel[])[0];

            this.produtosSelecionados.update(lista => [
              ...lista,
              prod
            ]);

            this.form.get('dropdownProduto').setValue(null);
            this.form.get('inputQuantidade').setValue('');
          }
          else{
            this._snackBar.open(data.mensagem, null, {duration: 5000});
          }
        },
        error: (err) => {
          this._snackBar.open(err.error.errors[0], null, {duration: 3000});
        }
      }
    )
    }else{
      this._snackBar.open('Esse produto já foi incluído neste pedido.', null, {duration: 5000});
    }

    
  }

  salvarPedido(){
    if(this.form.get('dropdownCliente').value != null && this.produtosSelecionados().length > 0 && this.valorTotal() > 0){
      let pedido: PedidoModel = { idCliente: 0, idStatus: 0, produtos: [], valorTotalPedido: 0 }
          
      pedido.idCliente = Number(this.form.get('dropdownCliente').value);
      pedido.idStatus = 1;
      pedido.valorTotalPedido = this.valorTotal();

      this.produtosSelecionados().map((x) => {
        let produtosPedido: PedidoProdutosModel = { idProduto: 0, quantidade: 0, subTotal: 0, valorUnitario: 0 }
        
        produtosPedido.idProduto = x.idProduto
        produtosPedido.quantidade = x.quantidadeSolicitado
        produtosPedido.valorUnitario = x.preco
        produtosPedido.subTotal = (x.quantidadeSolicitado * x.preco)

        pedido.produtos.push(produtosPedido);
      });

      this._pedidoService.postPedido(pedido).subscribe(
        {
          next: (data) =>{
            const dados = data as ResultadoOperacaoModel;
            if(dados.sucesso){
              this._snackBar.open(dados.mensagem, null, {duration: 3000});
              this._router.navigate(['/pedidos'], { relativeTo: this._activeRoute});
            }
          },
          error: (err) => {
             this._snackBar.open(err.error.errors[0], null, {duration: 3000});
          }
        }
      )
    }else{
      this._snackBar.open('Pedido não pode ser realizado. Verifique se o cliente está selecionado e se o pedido contém produtos adicionados!', null, {duration: 5000});
    }
  }

}
