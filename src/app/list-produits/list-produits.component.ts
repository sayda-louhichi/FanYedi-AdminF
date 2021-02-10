import { Component, OnInit } from '@angular/core';
import {AngularFirestore}from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.css']
})
export class ListProduitsComponent implements OnInit {
  _db:AngularFirestore;
  products: Observable<any[]>;
  searchValue: string = "";
  name_filtered_items: Array<any>;


  constructor(db: AngularFirestore,public firebaseService :FirebaseService) {
    this.products = db.collection('Products').valueChanges({idField: 'productId' });
    this._db = db; 
   }
  ngOnInit(): void {}
  
  delete(id: string) {
    this.firebaseService.deleteProduct(id);
  }

}
