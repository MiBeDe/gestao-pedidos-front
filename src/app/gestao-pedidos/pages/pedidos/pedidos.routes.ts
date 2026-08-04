import { Routes } from "@angular/router";

export const pedidosRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../../shared/custom-components/custom-template-base-drawer-component').then(c => c.CustomTemplateBaseDrawerComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./').then(c => c.PedidosScreen)
            },
            {
                path: 'novo',
                loadComponent: () => import('./').then(c => c.NovoPedidosScreen)
            }
        ]
    }
]