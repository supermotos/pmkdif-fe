import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, HostListener, ViewEncapsulation, Input } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { DialogService } from '../../service/dialog/dialog.service';
import { User } from 'src/app/feature-case-api/model/user.model';
import { UserIdleService } from 'angular-user-idle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'navbar-angular-connext',
  templateUrl: './navbar-angular-connext.component.html',
  styleUrls: ['./navbar-angular-connext.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarAngularConnextComponent implements OnInit {

  @Input()
  get isCustSuitByPass() { return this._isCustSuitByPass; }
  set isCustSuitByPass(val: boolean) {
    this._isCustSuitByPass = val;
    if (!val) {
      this.initSessionWatching();
    }
  }
  private _isCustSuitByPass: boolean;

  @Output() sidenavToggleClicked = new EventEmitter();
  @Output() isHomeEmit = new EventEmitter();
  user: User;
  currentDate: string;
  homeIndex = 0;
  private isTimeout: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private userIdle: UserIdleService,
    private ngbModal: NgbModal
  ) { }

  @HostListener('window:mousemove')
  onMousemove() {
    if (this.isTimeout) {
      return;
    }
    this.userIdle.resetTimer();
  }

  @HostListener('window:keydown')
  onKeydown() {
    if (this.isTimeout) {
      return;
    }
    this.userIdle.resetTimer();
  }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    // this.initSessionWatching();
    this.getCurrentDate();
  }

  getCurrentDate() {
    this.currentDate = moment().format('DD/MM/YYYY');
  }

  initSessionWatching() {
    console.log('start watch');
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe();
    this.userIdle.onTimeout().subscribe(() => {
      this.isTimeout = true;
      this.ngbModal.dismissAll();
      this.userIdle.stopWatching();
      this.dialogService.alert('', 'Session time out...', 'error')
        .then(() => this.router.navigate(['/login']));
    });
  }

  homePage() {
    this.router.navigate(['home']);
    this.isHomeEmit.emit('home' + this.homeIndex++);
  }

  sidenavToggle() {
    this.sidenavToggleClicked.emit();
  }

  async logout() {
    const confirmed = await this.dialogService.confirm('Logout', 'Are you about to Logout');
    if (confirmed) {
      this.router.navigate(['/login']);
    }
  }

}
