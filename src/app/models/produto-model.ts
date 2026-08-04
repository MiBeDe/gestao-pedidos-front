export interface ProdutoModel{
    idProduto?: number;
    nomeProduto: string;
    descricao: string;
    preco: number;
    quantidade: number;

    quantidadeSolicitado?: number;
}