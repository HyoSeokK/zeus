import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {
  url:SafeResourceUrl;

  constructor(
    private router:Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://192.168.0.106:31401/#!/state/{%22pinnedMetricType%22:%22CPU%22,%22topologyId%22:%22hosts%22}");
  }
}
