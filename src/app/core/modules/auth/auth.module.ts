import { NgModule } from '@angular/core';
import { RegisterComponent } from './Register/register.component';
import { LoginComponent } from './Login/login.component';
import { SharedModule } from 'src/app/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }