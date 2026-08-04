import { PedidoProdutosModel } from "./pedido-produtos-model";

export interface PedidoModel{
    idCliente: number;
    idStatus: number;
    valorTotalPedido: number;
    produtos: PedidoProdutosModel[];
}