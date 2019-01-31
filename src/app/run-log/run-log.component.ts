import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Run } from '../shared/run';
import { Router, ActivatedRoute } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  items: Observable<any[]>;
  runs: Observable<Run[]>;
  year: number;
  constructor(private db: AngularFirestore, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {

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
      ).snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<Run>[]) => {
          return actions.map((a: DocumentChangeAction<Run>) => {
            const data: Run = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    });
  }

  incrementYear(i: number) {
    this.router.navigate([''], {
      queryParams: {
        year: this.year += i
      }
    });
  }

  daySelected(run: Run) {
    console.log('day Selected');
    console.log(run);
    this.openActivity(run);
  }

  addActivity() {
    this.openActivity(null);
  }

  openActivity(run: Run) {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      minWidth: '20%',
      maxWidth: '99%',
      data : {
        run: run
      }
    });

    dialogRef.afterClosed().subscribe((result: Run) => {
      if (result) {
        console.log(result);
        if (result.id) {
          console.log('updating');
          this.db.collection('runs').doc(result.id).set(result);
        } else {
          console.log('inserting');
          this.db.collection('runs').add(result);
        }
      }
    });
  }


}
