import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { SessionGuard } from 'src/app/guards/session.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,
    canActivate: [SessionGuard] },
    { path: 'user-profile',   component: UserProfileComponent,
    canActivate: [SessionGuard] },
    { path: 'tables',         component: TablesComponent,
    canActivate: [SessionGuard] },
    { path: 'icons',          component: IconsComponent,
    canActivate: [SessionGuard] },
    { path: 'maps',           component: MapsComponent ,
    canActivate: [SessionGuard]},
    {
        path: 'recoleccion',
        children: [
            {
            path: '',
            loadChildren: () => import('../../pages/proceso-recoleccion/proceso-recoleccion.module').then(m => m.ProcesoRecoleccionModule),
            }
        ],
        canActivate: [SessionGuard]
    },
];
