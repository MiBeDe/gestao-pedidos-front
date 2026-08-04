import { ProdutoModel } from "./produto-model";

export interface PedidoProdutosModel {
    idPedidoProduto?: number;
    idPedido?: number;
    idProduto: number;
    valorUnitario: number;
    quantidade: number;
    subTotal: number;

    produto?: ProdutoModel;
}