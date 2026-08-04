import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo: '/pedidos',
        pathMatch: 'full'
    },
    {
        path: 'clientes',
        loadChildren: () => import('./gestao-pedidos/pages/clientes').then(m => m.clientesRoutes)
    },
    {
        path: 'produtos',
        loadChildren: () => import('./gestao-pedidos/pages/produtos').then(m => m.produtosRoutes)
    },
    {
        path: 'pedidos',
        loadChildren: () => import('./gestao-pedidos/pages/pedidos').then(m => m.pedidosRoutes)
    }
];
