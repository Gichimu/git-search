import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../user';
import { Repository } from '../repository';



@Injectable({
  providedIn: 'root'
})
export class GitServiceService {
  userObj: User;
  user = [];
  repos = [];
  name: string;
  avatarUrl: string;
  repoObj: Repository;

  constructor(private http: HttpClient) { 
    this.userObj = new User("", "");
    this.repoObj = new Repository("", "", "", new Date())
  }

  getUser(searchUsername: string){
    interface apiInterface{
      username:string;
      avatarUrl:string;
    }
    let searchUrl = "https://api.github.com/users/"+searchUsername+"/repos?access_token="+environment.api_key;
    let promise = new Promise((resolve, reject)=>{
      this.http.get<apiInterface>(searchUrl).toPromise().then((result)=>{
        
        for(var i = 0; i < Object.keys(result).length; i++){
          let name = result[i]['owner']['login'];
            
            let url = result[i]['owner']['avatar_url'];
            
  
            let usr = new User(name, url);
            this.user.push(usr);
            
          }
    
        
        
        
        resolve();
      },(error)=>{
        console.log('there was an error');
        reject();
      }
      )
    })
    return promise;
  }

  getRepos(name){
    interface ApiInterface{
      repoTitle:string,
      repoDescription:string,
      repoUrl:string,
      createdAt:Date
    }
    let searchUrl = "https://api.github.com/users/"+name+"/repos?access_token="+environment.api_key;
    let promise1 = new Promise((resolve, reject)=>{
      this.http.get<ApiInterface>(searchUrl).toPromise().then((results)=>{
        
        for(var i = 0; i < Object.keys(results).length; i++){
        let name = results[i]['name'];
          let desc = results[i]['description'];
          let url = results[i]['html_url'];
          let date = results[i]['created_at'];

          let repo = new Repository(name, desc, url, new Date(date));
          this.repos.push(repo);
        }
        
        

        resolve();
      },(error)=>{
        console.log('There was an error');
        reject();
      });
    })
    return promise1;
  }

  
}
