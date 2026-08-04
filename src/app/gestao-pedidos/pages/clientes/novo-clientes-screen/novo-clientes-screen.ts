import { Component, inject, OnInit } from '@angular/core';
import { novoClienteScreenImports } from './novo-cliente-screen.imports';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteModel, ResultadoOperacaoModel } from '../../../../models';
import { ClientesService } from '../../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novo-clientes-screen',
  standalone: true,
  imports: [...novoClienteScreenImports],
  templateUrl: './novo-clientes-screen.html',
  styleUrl: './novo-clientes-screen.scss',
})
export class NovoClientesScreen implements OnInit {
  
  private _clienteService = inject(ClientesService)
  private _activeRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  form = new FormGroup({
    inputNomeCompleto: new FormControl(''),
    inputCpf: new FormControl('')
  })

  ngOnInit(): void {
   
  }

  salvarCliente(){

    const cliente: ClienteModel = {
       nomeCompleto: this.form.get('inputNomeCompleto').value,
       cpf: this.form.get('inputCpf').value.replaceAll('.', '').replaceAll('-','')
    }

    if(cliente.nomeCompleto == ''){
      this._snackBar.open('Preencha o Nome Completo', null, {duration: 3000});
      return;
    }

    if(cliente.cpf == '' || cliente.cpf.length < 11){
      this._snackBar.open('Preencha corretamente o CPF!', null, {duration: 3000});
      return
    }

    this._clienteService.postCliente(cliente).subscribe(
      {
        next: (data) => {
          const dados = data as ResultadoOperacaoModel;
          if(dados.sucesso){
            this._snackBar.open(dados.mensagem, null, {duration: 3000});
            this._router.navigate(['/clientes'], { relativeTo: this._activeRoute});
          }
          else{
            this._snackBar.open(dados.mensagem, null, {duration: 3000});
          }
        },
        error: (err) => {
          this._snackBar.open(err.error.errors[0], null, {duration: 3000});
        }
      }
    )
  }
}
