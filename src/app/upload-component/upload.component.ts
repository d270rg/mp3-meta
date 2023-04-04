import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ID3v2_4 } from 'app/utils/schemas';
import { ByteParser } from '../utils/parsers';

@Component({
  selector: 'upload',
  templateUrl: 'upload.component.html',
})
export class UploadComponent implements OnInit {
  @Output() dataParsedEvent = new EventEmitter<Object>();

  constructor() {}
  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });
  get f() {
    return this.uploadForm.controls;
  }
  onFileChange(event: Event) {
    let eventTarget = <HTMLInputElement>event.target;
    if (eventTarget.files !== null) {
      if (eventTarget.files.length > 0) {
        const file = eventTarget.files[0];
        console.log('file', file);

        var reader = new FileReader();

        reader.onload = (e) => {
          let result = <ArrayBuffer>reader.result;
          if (result) {
            const byteParser = new ByteParser();
            let parsedData = byteParser.Parse(result, ID3v2_4);
            this.dataParsedEvent.emit(parsedData);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }
  ngOnInit() {}
}
