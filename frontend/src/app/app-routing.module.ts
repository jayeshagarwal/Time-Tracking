import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: SidebarComponent,
    children: 
    [
      {path: 'side', pathMatch:'prefix',  redirectTo: 'project'},
      { path: 'user', component: UserComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'task', component: TaskComponent },
    ]
  },
  { 
    path: 'login',
    component: LoginComponent 
  }, 
  { 
    path: 'forgot', 
    component: ForgotComponent 
  },
  { 
    path: 'reset', 
    component: ResetComponent 
  },
  { 
    path: 'side', 
    component: SidebarComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
