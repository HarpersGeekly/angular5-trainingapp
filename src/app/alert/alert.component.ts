import {Component, OnInit} from '@angular/core';
import {AlertService} from '../services/alert.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  // The alert component passes alert messages to the template whenever a message is received from the alert service.
  // It does this by subscribing to the alert service's getMessage() method which returns an Observable.
  message: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  close() {
    this.message = !this.message;
  }

}
