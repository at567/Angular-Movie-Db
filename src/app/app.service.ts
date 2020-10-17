import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
movieUrlsearch:string;
regularUrl:string;  
movieUrl ='https://api.themoviedb.org/3/movie/popular?api_key=<<apikey>>&language=en-US&page=1';
constructor( private _http: HttpClient ) { }
getMovies() {
return this._http.get<Movie[]>(this.movieUrl)
}
getMoviessearch(search) {
 
this.movieUrlsearch = 'https://api.themoviedb.org/3/search/movie?api_key=<<apikey>>&language=en-US&query='+search+'&page=1&include_adult=false';

return this._http.get<Movie[]>(this.movieUrlsearch)
}
getRegularDetails(movieParameter){
 
this.regularUrl = 'https://api.themoviedb.org/3/movie/'+movieParameter+'?api_key=<<apikey>>&language=en-US';  
return this._http.get<Movie[]>(this.regularUrl)
}
getSearchwithSignleDetails(searchMovieparameter){

  this.regularUrl = 'https://api.themoviedb.org/3/movie/'+searchMovieparameter+'?api_key=<<apikey>>&language=en-US';  
  return this._http.get<Movie[]>(this.regularUrl)
}
}
