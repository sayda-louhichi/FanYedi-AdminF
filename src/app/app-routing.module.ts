import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { ListArtisansComponent } from './list-artisans/list-artisans.component';
import { ListProduitsComponent } from './list-produits/list-produits.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'list-artisans', component:ListArtisansComponent },
  { path: 'list-prdouits', component:ListProduitsComponent },
  { path: 'list-prdouits', component:ListProduitsComponent },
  { path: 'ajouter-utilisateur', component:AddUserComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
