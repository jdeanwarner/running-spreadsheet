import { Component, OnInit, Input } from '@angular/core';
import { Run } from 'src/app/shared/run';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {

  @Input() run: Run;

  constructor() { }

  ngOnInit() {
  }

}
