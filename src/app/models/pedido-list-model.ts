import { ClienteModel, PedidoProdutosModel, StatusPedidoModel } from "./";

export interface PedidoListModel {
    idPedido: number;
    valorTotalPedido: number;
    cliente: ClienteModel,
    statusPedido: StatusPedidoModel,
    pedidoProdutos: PedidoProdutosModel
}