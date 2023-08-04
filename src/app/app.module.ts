// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AdminGuard } from './components/guards/admin.guard';
import { UserGuard } from './components/guards/user.guard';
import { AuthService } from './components/services/auth.service';
import { FormsModule } from '@angular/forms';
import { PlasmaDonationComponent } from './components/plasma-donation/plasma-donation.component';
import { DonationTableComponent } from './components/donation-table/donation-table.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserLoginComponent,
    PlasmaDonationComponent,
    DonationTableComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AdminGuard,
    UserGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
