import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cmp-header',
  templateUrl: './cmp-header.component.html',
  styleUrls: ['./cmp-header.component.css']
})
export class CmpHeaderComponent implements OnInit {

  @Input("AppTitle") appTitle:string;

  constructor(private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  }

  addNewClient(){
    this.router.navigate(['./join-chat']);
  }

}
