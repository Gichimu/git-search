import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GitServiceService } from '../../services/git-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { Repository } from '../../repository';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {
  name: string;
  url: string;
  userArr = [];
  repoUrl:string;
  user: User;
  repos = [];
  repository: Repository;
  @Output() em = new EventEmitter<string>()
  constructor(private route:ActivatedRoute, public gitService: GitServiceService) { 
    
  }

  

  ngOnInit() {
    let searchName = this.route.snapshot.paramMap.get('searchName');
    this.gitService.getUser(searchName).then(()=>{
      
       
      this.userArr = this.gitService.user;
      
      this.name = this.userArr[0].username;
      this.url = this.userArr[0].avatarUrl
      
    })

    this.gitService.getRepos(searchName).then(()=>{
      this.repos = this.gitService.repos;
      
      
    })
    
   
  }

}
