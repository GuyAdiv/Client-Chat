import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsBoardComponent } from './components/chats-board/chats-board.component';
import { CmpLoginComponent } from './components/cmp-login/cmp-login.component';

const routes: Routes = [
  {path: '', redirectTo: '/chats', pathMatch: 'full'},
  {path: 'chats', component:ChatsBoardComponent},
  {path: 'join-chat', component:CmpLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
