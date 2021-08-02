import { Injectable } from '@angular/core';

@Injectable()
export class ExceptionService {
  private defaultMessage = 'การเชื่อมต่อกับระบบขัดข้อง';

  getDescription(code: string) {
    return this.codeMapping(code) || this.defaultMessage;
  }

  private codeMapping(code: string) {
    const map: Record<string, string> = {
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      413: 'Request entity too large',
    };
    return map[code];
  }
}
