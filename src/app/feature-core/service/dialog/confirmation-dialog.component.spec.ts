import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let activeModel: NgbActiveModal;

  beforeEach(() => {
    activeModel = new NgbActiveModal();
    component = new ConfirmationDialogComponent(activeModel);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called once decline', function () {
    spyOn(component, 'decline');
    component.decline();
    expect(component.decline).toHaveBeenCalledWith();
  });

  it('should be called once accept', function () {
    spyOn(component, 'accept');
    component.accept();
    expect(component.accept).toHaveBeenCalledWith();
  });

  it('should be called once dismiss', function () {
    spyOn(component, 'dismiss');
    component.dismiss();
    expect(component.dismiss).toHaveBeenCalledWith();
  });

});
