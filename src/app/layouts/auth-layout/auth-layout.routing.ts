import { Routes } from '@angular/router';

import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: 'login',
        children: [
            {
            path: '',
            loadChildren: () => import('src/app/pages/login/login.module').then(m => m.LoginModule)
            }
        ]
    },
    { path: 'register',       component: RegisterComponent }
];
