import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecordComponent } from './auth/record/record.component';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [publicGuard()],
  },
  {
    path: 'auth/record',
    component: RecordComponent,
    canActivate: [publicGuard()],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [privateGuard()],
  },
];
