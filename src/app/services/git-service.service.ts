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
  // repoUrl: string;
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
        // this.user.username = result['login'];
        //this.user.avatarUrl = result['avatar_url'];
        // for(var i = 0; i < Object.keys(result).length; i++){
        // //   //this.repoUrl = result['repos_url']
        // //   this.repos.push(result[i]['name'], result[i]['description'], result[i]['html_url'], result[i]['created_at']);
        //   // this.repos.push(result[i]['description']);
        //   // this.repos.push();
        //   // this.repos.push(result[i]['created_at'])
        //   // this.repositories.repoTitle = result[i]['name'];
        //   // this.repositories.repoDescription = result[i]['description'];
        //   // this.repositories.repoUrl = result[i]['html_url'];
        //   // this.repositories.createdAt = new Date(result[i]['created_at']);
          
        //   let name = result['data'][i]['owner']['login'];
        //   let url = result['data'][i]['owner']['avatar_url'];

        //   let usr = new User(name, url);
        // this.name = result['data']['owner']['login'];
        // this.avatarUrl = result['data']['owner']['avatar_url'];
        for(var i = 0; i < Object.keys(result).length; i++){
          let name = result[i]['owner']['login'];
            
            let url = result[i]['owner']['avatar_url'];
            
  
            let usr = new User(name, url);
            this.user.push(usr);
            
          }
        
        
        //   this.user.push(usr);
          
        // }
        // this.userObj = result
        
       
        // this.name = result[0]['owner']['login'];
        // this.avatarUrl = result[0]['owner']['avatar_url'];
        // this.user.avatarUrl = result[0]['owner']['avatar_url'];
        // this.user.username = result[0]['owner']['login'];
        // this.repoUrl = result[0]['owner']['repos_url'];
        
        
        
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
        // this.repositories.repoTitle = results['name'];
        // this.repositories.repoDescription = results['description'];
        // this.repositories.repoUrl = results['html_url'];
        // this.repositories.createdAt = results['created_at'];
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
