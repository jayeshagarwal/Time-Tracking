import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProjectService } from './services/project.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component'
import { LoginService } from './services/login.service';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ForgotComponent } from './forgot/forgot.component';
import { ToastrModule } from 'ngx-toastr';
import { ResetComponent } from './reset/reset.component';
import { SidebarComponent } from './sidebar/sidebar.component'; 
import { MatDialogModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent,
    SidebarComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,

  ],
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ProjectService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
