import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { CallInfoDialogComponents } from './dialog/callinfo-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CallService } from './call.service';
// import { SocketIoModule ,SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
// import apiRTC from '@apirtc/apirtc';
// const config: SocketIoConfig = {
// 	url: environment.socketUrl, // socket server url;
// 	options: {
// 		transports: ['websocket']
// 	}
// }


@NgModule({
  declarations: [
    AppComponent,
    CallInfoDialogComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatSnackBarModule,
    // SocketIoModule.forRoot(config),
    // apiRTC

  ],
  providers: [
    CallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
