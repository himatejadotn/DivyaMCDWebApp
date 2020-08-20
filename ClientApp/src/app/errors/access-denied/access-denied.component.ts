import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  messageTitle: string
  message: string

  constructor() { }

  ngOnInit(): void {

    this.messageTitle = "403 - Not Authorized";
    this.message = "To obtain access the RTP Sharp Deployment Console system, please contact your deployment administrator";
  }

}
