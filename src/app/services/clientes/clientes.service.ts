import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ClienteModel, PagedResult, ResultadoOperacaoModel } from "../../models";
import { ClienteDropdownModel } from "../../models/cliente-dropdown-model";

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    url: string = `${environment.apiUrl}`;

    private http = inject(HttpClient);

    getClientes(page: number, pageSize: number){
        return this.http.get<PagedResult<ClienteModel>>(`${this.url}Cliente?Pagina=${page}&tamanhoPagina=${pageSize}`);
    }

    getClientesDropdown(){
        return this.http.get<ClienteDropdownModel[]>(`${this.url}Cliente/ClienteDropdown`);
    }

    postCliente(cliente: ClienteModel){
        return this.http.post<ResultadoOperacaoModel>(`${this.url}Cliente`, cliente);
    }
}