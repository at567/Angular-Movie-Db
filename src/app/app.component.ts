import { Component , OnInit } from '@angular/core';
import { Movie } from './movie.model';
import {NgForm} from '@angular/forms';

import { AppService } from './app.service';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { CompileShallowModuleMetadata } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
movies$:Movie[];
searchmovies$:Movie[];
poster:string;
title:string;
date:number;
rating:string;
totaldescription:string;
totalReview:string;
public show:boolean = true;
public next:boolean = false;
public regulardetails:boolean = false;
public searchdetails:boolean = false;
constructor( private movieservice :AppService ){
}
ngOnInit(){
 this.movieservice.getMovies().subscribe(value => 
( 
this.poster = value['results']['0'].poster_path,
this.title = value['results']['0'].title,
this.date =  value['results']['0'].release_date, 
this.rating = value['results']['0'].vote_average,
this.totalReview = value['results']['0'].vote_count,
this.totaldescription = value['results']['0'].overview,
value['results']['0']
));
return this.movieservice.getMovies()
.subscribe(data => this.movies$ = data['results']);
}
onSubmit(f) {
this.next = true;  
this.show = false;
let parameter = f.value.first;
this.movieservice.getMoviessearch(parameter).subscribe(value => 
( 
  this.poster = value['results']['0'].poster_path,
  this.title = value['results']['0'].title,
  this.date =  value['results']['0'].release_date, 
  this.rating = value['results']['0'].vote_average,
  this.totalReview = value['results']['0'].vote_count,
  this.totaldescription = value['results']['0'].overview,
  value['results']['0']
  ));
return this.movieservice.getMoviessearch(parameter)
.subscribe(data => this.searchmovies$ = data['results']);
}

serialDetailFunction(event,movie){
this.next = false;  
this.show = true; 
this.regulardetails = true;
let movieParameter = movie.id;

this.movieservice.getRegularDetails(movieParameter).subscribe(value => 
(
this.poster = value['poster_path'],
this.title = value['title'],
this.date =  value['release_date'],
this.rating = value['vote_average'],
this.totalReview = value['vote_count'],
this.totaldescription = value['overview'],
value      
));
}
searchDetailsFunction(event,search){
let searchMovieparameter = search.id;
this.next = true;  
this.show = false; 
this.regulardetails = false;
this.searchdetails = true;

this.movieservice.getSearchwithSignleDetails(searchMovieparameter).subscribe(value => (this.poster = value['poster_path'],
this.title = value['title'],
this.date =  value['release_date'],
this.rating = value['vote_average'],
this.totalReview = value['vote_count'],
this.totaldescription = value['overview'],
value      
));
}
}
