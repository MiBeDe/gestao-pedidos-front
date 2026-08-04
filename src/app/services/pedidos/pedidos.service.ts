import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PagedResult, PedidoListModel, ResultadoOperacaoModel } from "../../models";
import { PedidoModel } from "../../models/pedido-model";

@Injectable({
    providedIn: 'root'
})
export class PedidosService {
    url: string = `${environment.apiUrl}`;

    private http = inject(HttpClient);
    
    getPedidos(page: number, pageSize: number){
        return this.http.get<PagedResult<PedidoListModel>>(`${this.url}Pedido?Pagina=${page}&tamanhoPagina=${pageSize}`);
    }

    postPedido(pedido: PedidoModel){
        return this.http.post<ResultadoOperacaoModel>(`${this.url}Pedido`, pedido);
    }

    putStatusPedido(idPedido: number, idStatus: number){
        return this.http.put<ResultadoOperacaoModel>(`${this.url}Pedido?idPedido=${idPedido}&idStatus=${idStatus}`, null);
    }
}