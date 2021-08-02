import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { UserIdleModule } from 'angular-user-idle';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxPaginationModule } from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service';
import { NgxFileDropModule } from 'ngx-file-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DialogService } from './feature-core/service/dialog/dialog.service';
import { AuthControlApi } from './feature-case-api/api/auth-control-api.service';
import { AuthenticationService } from './feature-core/service/authentication.service';
import { ExceptionService } from './feature-core/service/exception.service';
import { AuthInterceptor } from './feature-core/interceptor/auth-interceptor';
import { HandleErrorInterceptor } from './feature-core/interceptor/handle-error-interceptor';
import { DialogComponent } from './feature-core/service/dialog/dialog.component';

import { ConfirmationDialogComponent } from './feature-core/service/dialog/confirmation-dialog.component';
import { LoginComponent } from './widget-login/login/login.component';
import { HomeComponent } from './widget-home/widget-home.component';
import { MenuComponent } from './feature-core/layouts/menu/menu.component';
import { MenuServiceControlApi } from './feature-case-api/api/menu-control-api.service';
import { ClientInterceptor } from './feature-core/interceptor/client-interceptor';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule } from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { DestLocationInterceptor } from './feature-core/interceptor/dest-location-interceptor';
import { FilterByTextComponent } from './feature-core/component/filter-by-text/filter-by-text.component';
import { NavbarAngularConnextComponent } from './feature-core/layouts/navbar-fund-connext/navbar-angular-connext.component';

export const MY_CUSTOM_FORMATS = {
  parseInput: 'DD/MM/YYYY',
  fullPickerInput: 'DD/MM/YYYY',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'DD/MM/YYYY',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'DD/MM/YYYY',
  monthYearA11yLabel: 'DD/MM/YYYY',
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarAngularConnextComponent,
    DialogComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    FilterByTextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    UiSwitchModule.forRoot({
      size: 'small',
      defaultBgColor: '#eeeeee'
    }),
    NgxMaskModule.forRoot(),
    UserIdleModule.forRoot({ idle: 1, timeout: 1800, ping: 120 }),
    NgxFileDropModule,
    MatOptionModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    UserIdleModule.forRoot({ idle: 1, timeout: 900, ping: 120 }),
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    CookieService,
    AuthControlApi,
    AuthenticationService,
    DialogService,
    ExceptionService,
    MenuServiceControlApi,
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: ClientInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DestLocationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    ConfirmationDialogComponent,
  ]
})
export class AppModule { }
