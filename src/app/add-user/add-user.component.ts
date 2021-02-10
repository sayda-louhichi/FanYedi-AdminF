import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(  public auth: FirebaseService) { }
authError:any;
  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data =>{
      this.authError= data;
    })
  }
  createUser(frm){
    this.auth.createUser(frm.value)
  }
}
