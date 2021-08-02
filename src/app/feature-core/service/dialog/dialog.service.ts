import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: NgbModal) { }
  public SUCCESS_ICON = 'fa-check';
  public INFO_ICON = 'fa-info-circle';
  public ERROR_ICON = 'fa-exclamation-triangle';
  public WARNING_ICON = 'fa-warning';
  public BUTTON_NAME_OK = 'OK';
  public BUTTON_NAME_COLSE = 'Close';
  public BUTTON_NAME_CANCEL = 'Cancel';


  async alert(title?: string, message?: string, iconRabel?: 'success' | 'info' | 'error' | 'warning'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogComponent, { backdrop: 'static', keyboard: false });
    let icon = this.getIconName(iconRabel);
    let btnName = this.getButtonName(iconRabel);
    this.setModalRef(modalRef, { title, message, icon, btnName });

    return modalRef.result;
  }

  async confirm(title: string, message: string, btnOkText: string = this.BUTTON_NAME_OK, btnCancelText: string = this.BUTTON_NAME_CANCEL,
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize, backdrop: 'static', keyboard: false });
    this.setModalRef(modalRef, { title, message, btnOkText, btnCancelText });

    return modalRef.result;
  }

  setModalRef(modalRef: any, modalInfo: any) {
    for (const item of Object.keys(modalInfo)) {
      modalRef.componentInstance[item] = modalInfo[item];
    }
    return modalRef;
  }

  getIconName(icon: string) {
    const map: Record<string, string> = {
      success: this.SUCCESS_ICON,
      info: this.INFO_ICON,
      error: this.ERROR_ICON,
      warning: this.WARNING_ICON
    };
    return map[icon];
  }

  getButtonName(icon: string): string {
    return (icon === 'error') ? this.BUTTON_NAME_COLSE : this.BUTTON_NAME_OK;
  }
}
