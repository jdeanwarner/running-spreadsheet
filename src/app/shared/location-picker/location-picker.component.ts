import { State } from '../state.enum';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {

  @Input() location: FormGroup;
  statesArray = Object.keys(State).map(k => ({key: k, value: State[k]}));

  constructor() { }

  ngOnInit() {

  }

}
