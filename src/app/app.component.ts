import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CallService } from './call.service';
import { CallInfoDialogComponents, DialogData } from './dialog/callinfo-dialog.component';
import * as $ from 'jquery';
import './calljs/call.js'
// import * as $ from 'jquery';
// declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  public isCallStarted$: Observable<boolean>;
  private peerId: string;

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;

  constructor(public dialog: MatDialog, private callService: CallService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.peerId = this.callService.initPeer();
  }
  show = true;
  data = { name: 'John', img: '../assets/image/profile2.jpg' };
  ngOnInit(): void {
    this.callService.localStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.localVideo.nativeElement.srcObject = stream)
    this.callService.remoteStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream)
  }
  showform(value: any) {
    this.show = !this.show;
    console.log('show');
    this.savedata(value)
  }
  savedata(datavalue: any) {
    this.data = datavalue;
    console.log("hello data");

  }
  ngOnDestroy(): void {
    this.callService.destroyPeer();
  }

  public showModal(joinCall: boolean): void {
    let dialogData: DialogData = joinCall ? ({ peerId: null, joinCall: true }) : ({ peerId: this.peerId, joinCall: false });
    const dialogRef = this.dialog.open(CallInfoDialogComponents, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap(peerId =>
          joinCall ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer())
        ),
      )
      .subscribe(_ => { });
  }

  public endCall() {
    this.callService.closeMediaCall();
  }

}
