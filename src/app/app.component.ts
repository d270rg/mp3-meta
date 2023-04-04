import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  parsedMp3Data = {};
  setParsedMp3Data = ($obj: Object) => {
    this.parsedMp3Data = $obj;
    console.log('parsed data:', this.parsedMp3Data, $obj);
  };
  title = 'mp3-meta';
}
