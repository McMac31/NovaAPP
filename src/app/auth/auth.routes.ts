import { Routes } from "@angular/router";
import { AuthGuard } from "./auth guard/auth.guard";

export const authRoutes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
        canActivate:[AuthGuard]
    }
]