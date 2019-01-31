import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Run } from '../shared/run';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  items: Observable<any[]>;
  runs: Observable<Run[]>;
  year: number;
  constructor(private db: AngularFirestore, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: {year: number}) => {
      if (params.year) {
        this.year = +params.year;
      } else {
        this.year = new Date().getFullYear();
      }

      this.runs = this.db.collection<Run>('runs', ref =>
        ref.where('date', '>=', new Date(this.year, 0, 1))
          .where('date', '<', new Date(this.year + 1, 0, 1))
      ).valueChanges();
    });
  }

  incrementYear(i: number) {
    this.router.navigate([''], {
      queryParams: {
        year: this.year += i
      }
    });
  }
}
