import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dataViewer',
  templateUrl: 'dataViewer.component.html',
})
export class DataViewerComponent implements OnInit {
  @Input() data: Object;

  constructor() {
    this.data = {};
  }

  ngOnInit() {}
}
