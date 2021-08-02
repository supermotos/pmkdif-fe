import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'angular-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() icon: string;
  @Input() btnName: string;
  constructor(public activeModal: NgbActiveModal) { }

  async ok() {
    this.activeModal.close(true);
  }
}
