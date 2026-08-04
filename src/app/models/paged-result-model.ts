export interface PagedResult<T>{
    itens: T[];
    pagina: number;
    tamanhoPagina: number;
    totalRegistros: number;
    totalPaginas: number;
    possuiProximaPagina: boolean;
    possuiPaginaAnterior: boolean;
}