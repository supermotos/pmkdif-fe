import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'angular-filter-by-text',
  templateUrl: './filter-by-text.component.html',
  styleUrls: ['./filter-by-text.component.scss']
})
export class FilterByTextComponent implements OnInit {

  @ViewChild('focus') focus: ElementRef;

  @Input() id: string;
  @Input() placeholder: string;
  @Input()
  get focusElement() { return this._focusElement; }
  set focusElement(value: string) {
    this._focusElement = value;
    if (value) {
      this.focusInput();
    }
  }
  private _focusElement: string;

  @Output() dataChanged = new EventEmitter();

  dataCode = new FormControl();

  constructor() { }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = '';
    }

    this.dataCode.valueChanges.subscribe((value) => {
      this.dataChanged.emit(value.trim());
    });
  }

  setDefaultValue(defaultValue: string) {
    if (defaultValue) {
      this.dataCode.setValue(defaultValue);
    }
  }

  clearCode() {
    this.dataCode.setValue('');
  }

  focusInput() {
    this.focus.nativeElement.focus();
  }
}
