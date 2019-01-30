import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Run } from '../shared/run';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  items: Observable<any[]>;
  runs: Observable<Run[]>;
  constructor(private db: AngularFirestore) {

  }

  ngOnInit(): void {
    this.runs = this.db.collection<Run>('runs', ref =>
      ref.where('date', '>=', new Date(2019, 0, 1))
        .where('date', '<', new Date(2020, 0, 1))
    ).valueChanges();
  }
}
