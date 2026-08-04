import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PagedResult, ResultadoOperacaoModel } from "../../models";
import { ProdutoModel } from "../../models/produto-model";
import { ProdutoDropdownModel } from "../../models/produto-dropdown-model";

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {
    url: string = `${environment.apiUrl}`;

    private http = inject(HttpClient);

    getProdutos(page: number, pageSize: number){
        return this.http.get<PagedResult<ProdutoModel>>(`${this.url}Produto?Pagina=${page}&tamanhoPagina=${pageSize}`);
    }

    getProdutosDropdown(){
        return this.http.get<ProdutoDropdownModel[]>(`${this.url}Produto/ProdutoDropdown`);
    }

    getObterProdutoQuantidadeValida(idProduto: number, quantidadeSolicitado: number){
        return this.http.get<ResultadoOperacaoModel>(`${this.url}Produto/ObterProdutoQuantidadeValida?idProduto=${idProduto}&quantidadeSolicitado=${quantidadeSolicitado}`);
    }

    postProduto(produto: ProdutoModel){
        return this.http.post<ResultadoOperacaoModel>(`${this.url}Produto`, produto);
    }
}