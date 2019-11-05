import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchName: string;
  
  

  constructor(private router: Router) { }

  submitOk(){
    this.router.navigate(['search', this.searchName]);
    
  }

  ngOnInit() {
  }

}
