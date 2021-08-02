import { DialogComponent } from './dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let activeModal: NgbActiveModal;


  beforeEach(() => {
    activeModal = new NgbActiveModal();
    component = new DialogComponent(activeModal);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
