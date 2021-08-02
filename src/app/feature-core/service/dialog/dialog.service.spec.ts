import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service;
  let modalService;

  beforeEach(() => {
    modalService = jasmine.createSpyObj('NgbModal', ['open']);
    service = new DialogService(modalService);
  });

  describe('getButtonName', () => {
    it('should return button name is Close when icon param is error', () => {
      let result = service.getButtonName('error');
      expect(result).toEqual('Close');
    });

    it('should return button name is OK when icon param is blank', () => {
      let result = service.getButtonName('');
      expect(result).toEqual('OK');
    });

    it('should return button name is OK when icon param is other value', () => {
      let result = service.getButtonName('hello');
      expect(result).toEqual('OK');
    });
  });

  describe('getIconName', () => {
    it('should return icon name is fa-check when icon param is success', () => {
      let result = service.getIconName('success');

      expect(result).toEqual('fa-check');
    });

    it('should return icon name is fa-info-circle when icon param is info', () => {
      let result = service.getIconName('info');

      expect(result).toEqual('fa-info-circle');
    });

    it('should return icon name is fa-exclamation-triangle when icon param is error', () => {
      let result = service.getIconName('error');

      expect(result).toEqual('fa-exclamation-triangle');
    });

    it('should return icon name is fa-warning when icon param is warning', () => {
      let result = service.getIconName('warning');

      expect(result).toEqual('fa-warning');
    });
  });

  describe('approved', () => {
    it('should return modal result when call approved function', async () => {
      modalService.open.and.returnValue({
        componentInstance: {
          title: 'title',
          message: 'message'
        },
        result: true
      });

      let result = await service.approved('title', 'message');

      expect(result).toEqual(true);
    });

    it('should call setModalRef wiht collect params when call approve function', async () => {
      spyOn(service, 'setModalRef');
      let expectParams = {
        componentInstance: {
          title: 'title',
          message: 'message'
        },
        result: true
      };
      modalService.open.and.returnValue(expectParams);

      await service.approved('title', 'message');

      expect(service.setModalRef).toHaveBeenCalledWith(expectParams, {
        title: 'title',
        message: 'message'
      });
    });
  });

  describe('confirm', () => {
    it('should return modal result params when call confirm function', async () => {
      modalService.open.and.returnValue({
        componentInstance: {},
        result: true
      });

      let result = await service.confirm('title', 'message', 'Ok', 'Cancel', 'sm');
      expect(result).toEqual(true);
    });

    it('should call setModalRef wiht collect params when call approve function', async () => {
      spyOn(service, 'setModalRef');
      let expectParams = {
        componentInstance: {},
        result: true
      };
      modalService.open.and.returnValue(expectParams);

      await service.confirm('title', 'message', 'Ok', 'Cancel', 'sm');

      expect(service.setModalRef).toHaveBeenCalledWith(expectParams, {
        title: 'title',
        message: 'message',
        btnOkText: 'Ok',
        btnCancelText: 'Cancel'
      });
    });
  });

  describe('alert', () => {
    it('should return modal result params when call alert function', async () => {
      modalService.open.and.returnValue({
        componentInstance: {},
        result: true
      });

      let result = await service.alert('title', 'message', 'success');
      expect(result).toEqual(true);
    });

    it('should call setModalRef wiht collect params when call approve function', async () => {
      spyOn(service, 'setModalRef');
      let expectParams = {
        componentInstance: {},
        result: true
      };
      modalService.open.and.returnValue(expectParams);

      await service.alert('title', 'message', 'success');

      expect(service.setModalRef).toHaveBeenCalledWith(expectParams, {
        title: 'title',
        message: 'message',
        icon: 'fa-check',
        btnName: 'OK'
      });
    });
  });

  describe('setModalRef', () => {
    it('should return modal rer wihtn collect data when call with title and message', () => {
      let modalRefInstance = {
        componentInstance: {},
        result: true
      };

      let result = service.setModalRef(modalRefInstance, {
        title: 'Dividend',
        message: 'Approve Success !!'
      });

      expect(result).toEqual({
        componentInstance: {
          title: 'Dividend',
          message: 'Approve Success !!'
        },
        result: true
      });
    });

    it('should return modal rer wihtn collect data when call with title ,btnOkText, btnCancelText and message', () => {
      let modalRefInstance = {
        componentInstance: {},
        result: true
      };

      let result = service.setModalRef(modalRefInstance, {
        title: 'Dividend',
        message: 'Confirm Success !!',
        btnOkText: 'OK',
        btnCancelText: 'Cancel'
      });

      expect(result).toEqual({
        componentInstance: {
          title: 'Dividend',
          message: 'Confirm Success !!',
          btnOkText: 'OK',
          btnCancelText: 'Cancel'
        },
        result: true
      });
    });

    it('should return modal rer wihtn collect data when call with title ,icon, btnName and message', () => {
      let modalRefInstance = {
        componentInstance: {},
        result: true
      };

      let result = service.setModalRef(modalRefInstance, {
        title: 'Dividend',
        message: 'Warning !!',
        icon: 'fa-warning',
        btnName: 'OK'
      });

      expect(result).toEqual({
        componentInstance: {
          title: 'Dividend',
          message: 'Warning !!',
          icon: 'fa-warning',
          btnName: 'OK'
        },
        result: true
      });
    });

  });

});
