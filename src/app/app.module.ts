import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AuthService} from './services/auth.service';
import {ItemsService} from './services/items.service';
import {UsersService} from './services/users.service';
import {NavbarService} from './services/navbar.service';
import {MessagesService} from './services/messages.service';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {ItemsComponent} from './items/items/items.component';
import {UsersComponent} from './users/users/users.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './routes';
import {ItemSearchComponent} from './items/item-search/item-search.component';
import {ItemComponent} from './items/item/item.component';
import './rxjs-extensions';

import {
  MaterialModule,
  MdDialogModule, MdGridListModule, MdIconModule, MdListModule, MdMenuModule, MdProgressBarModule,
  MdProgressSpinnerModule, MdSelectModule,
  MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {DeleteConfirmComponent} from './confirm/delete-confirm/delete-confirm.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MessageComponent} from './message/message.component';
import {AuthGuard} from './services/auth.guard';
import {APP_BASE_HREF} from '@angular/common';
import {UserComponent} from './users/user/user.component';
import {CanDeactivateEditGuard} from './services/can-deactivate-edit.guard';
import {EditService} from './services/edit.service';
import {ChangeConfirmComponent} from './confirm/change-confirm/change-confirm.component';
import {FileImportService} from './services/file-import.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ItemsComponent,
    UsersComponent,
    ItemSearchComponent,
    ItemComponent,
    DeleteConfirmComponent,
    NavbarComponent,
    MessageComponent,
    UserComponent,
    ChangeConfirmComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule, // Angular Material 2
    MdTabsModule, // Angular Material 2
    MdInputModule, // Angular Material 2
    MdButtonModule, // Angular Material 2
    MdCardModule, // Angular Material 2
    MdMenuModule, // Angular Material 2
    MdIconModule, // Angular Material 2
    MdGridListModule, // Angular Material 2
    MdSelectModule, // Angular Material 2
    MdDialogModule, // Angular Material 2
    MdListModule, // Angular Material 2
    MdSnackBarModule, // Angular Material 2
    MdProgressSpinnerModule, // Angular Material 2
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule
  ],
  entryComponents: [
    DeleteConfirmComponent,
    MessageComponent,
    ChangeConfirmComponent
  ],
  providers: [
    AuthService,
    UsersService,
    ItemsService,
    NavbarService,
    MessagesService,
    AuthGuard, {provide: APP_BASE_HREF, useValue: '/'},
    CanDeactivateEditGuard,
    EditService,
    FileImportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
