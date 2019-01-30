import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  items: Observable<any[]>;
  constructor(private db: AngularFirestore) {

  }

  ngOnInit(): void {
    this.items = this.db.collection('runs').valueChanges();
  }
}
