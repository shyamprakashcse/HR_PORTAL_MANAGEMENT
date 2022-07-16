import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {path:'',component:PortfolioComponent,pathMatch:"full"},
  {path:'port',redirectTo:'',pathMatch:"full"},
  {path:'login',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'employee',loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),canActivate:[AuthGuard]},

  {path:'home',component:HomeComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
