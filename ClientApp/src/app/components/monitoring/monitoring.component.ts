import { Component, OnInit } from '@angular/core';
import { Module } from 'ag-grid-community';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {
  // private columnDefs;
  //public modules: Module[] = [ClientSideRowModelModule];
  recentReleaseComponent = false;
  upcomingReleaseComponent = false;

  currentSubscription: any;

  constructor(private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.currentSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
  }
  onTabClick(tabNumber) {
    if (tabNumber === 1) {
      this.recentReleaseComponent = true;
      this.upcomingReleaseComponent = false;
    }
    if (tabNumber === 2) {
      this.recentReleaseComponent = false;
      this.upcomingReleaseComponent = true;
    }
  }
}
