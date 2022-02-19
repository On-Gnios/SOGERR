import { Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';

import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: 'login',
        children: [
            {
            path: '',
            loadChildren: () => import('src/app/pages/login/login.module').then(m => m.LoginModule)
            }
        ],
        canActivate: [LoginGuard]
    },
    { path: 'register',       component: RegisterComponent }
];
