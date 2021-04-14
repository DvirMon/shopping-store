import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthDashboardComponent } from './components/auth-dashboard/auth-dashboard.component';

const routes: Routes = [

  {
    path: "",
    children: [
      { path: 'login', component: AuthDashboardComponent },
      { path: 'register', component: AuthDashboardComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
