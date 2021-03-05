import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yaml',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlComponent implements OnInit {

  constructor(private router:Router,) { }

  ngOnInit(): void {
  }

  goToRegisterYaml() : void {
    this.router.navigateByUrl("/app/setting/yaml/register");
  }
}
