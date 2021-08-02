import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private ipAddress = '';
  private isIpSuccessed = false;

  constructor() { }

  IsGetIpSuccessed() {
    return this.isIpSuccessed;
  }

  getIpAddress() {
    return this.isValidIpAddress() ? this.ipAddress : '';
  }

  async getIpAddressFromSystem() {
    const rtc = new RTCPeerConnection({ iceServers: [] });
    rtc.createDataChannel('');
    rtc.onicecandidate = (evt) => {
      if (evt.candidate) {
        this.isIpSuccessed = true;
        const ip = /((0|\d{0,3})\.(0|\d{0,3})\.(0|\d{0,3})\.(0|\d{0,3}))/i;
        evt.candidate.candidate.split('\r\n').forEach(line => {
          if (line.match(ip)) {
            const ipAddress = line.match(ip)[0];
            this.ipAddress = ipAddress;
          }
        });
      }
    };
    const offerDesc = await rtc.createOffer();
    return rtc.setLocalDescription(offerDesc);
  }

  isValidIpAddress() {
    const ipPattern = /((0|\d{0,3})\.(0|\d{0,3})\.(0|\d{0,3})\.(0|\d{0,3}))/i;
    return this.ipAddress.match(ipPattern);
  }
}
