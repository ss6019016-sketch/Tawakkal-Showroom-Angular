import { NgModule } from '@angular/core';
import { LoginComponent } from './Login/login.component';
import { SharedModule } from 'src/app/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }