import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuConfig {
  constructor() { }
  getMapMenu() {
    return {
      '001': {
        'route': 'admin'
      },
      '002': {
        'route': 'report'
      },
      '010': {
        'icon': 'ic-equalizer'
      },
    };
  }

  getMapGroupMenu() {
    return {
      '0': {
        'icon': 'ic-search-menu'
      },
      '1': {
        'icon': 'ic-daily-txn'
      },
      '2': {
        'icon': 'ic-other-txn'
      },
      '3': {
        'icon': 'ic-payment-txn'
      },
      '4': {
        'icon': 'ic-maintenance'
      },
      '5': {
        'icon': 'ic-admin'
      },
      '6': {
        'icon': 'ic-list'
      },
      '7': {
        'icon': 'ic-list'
      },
      '8': {
        'icon': 'ic-description'
      },
      '9': {
        'icon': 'ic-sync'
      },
      '10': {
        'icon': 'ic-enquiry'
      },
      '11': {
        'icon': 'ic-pie-chart'
      },
      '12': {
        'icon': 'ic-setup'
      },
      '13': {
        'icon': 'ic-post-add'
      },
      '14': {
        'icon': 'ic-regulatory'
      },
      '15': {
        'icon': 'ic-date-range'
      },
      '16': {
        'icon': 'ic-date-range'
      },
      '17': {
        'icon': 'ic-equalizer'
      },
      '18': {
        'icon': 'ic-equalizer'
      },
      '19': {
        'icon': 'ic-daily-txn'
      },
      '20': {
        'icon': 'ic-description'
      },
      '21': {
        'icon': 'ic-regulatory'
      },
      '22': {
        'icon': 'ic-switching'
      },
      '23': {
        'icon': 'ic-description'
      },
      '24': {
        'icon': 'ic-description'
      },
      '25': {
        'icon': 'ic-switching'
      },
      '26': {
        'icon': 'ic-book-note'
      },
      '27': {
        'icon': 'ic-checked'
      },
      '28': {
        'icon': 'ic-checked'
      },
      '29': {
        'icon': 'ic-folder-shared'
      },
      '30': {
        'icon': 'ic-switching'
      },
    };
  }


}
