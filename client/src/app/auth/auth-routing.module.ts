import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { AccountComponent } from '../menu/components/account/account.component';

const routes: Routes = [

  {
    path: "",
    component: RootComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'reset', component: ResetComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'account', component: AccountComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
