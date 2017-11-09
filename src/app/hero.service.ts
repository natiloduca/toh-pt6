import { HEROES } from './mock-heroes';
import { Injectable }    from '@angular/core';
//import { Headers, Http } from '@angular/http';

import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HeroService {
  getHeroesOld(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }


	getHero(id: number): Promise<Hero> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.get(url)
	    .toPromise()
	    .then(response => response.json().data as Hero)
	    .catch(this.handleError);
	}
	getHeroOld(id: number): Promise<Hero> {
	    return this.getHeroes()
	               .then(heroes => heroes.find(hero => hero.id === id));
	}

  	private heroesUrl = 'api/heroes';  // URL to web api
 	private headers = new Headers({'Content-Type': 'application/json'});
	
	constructor(private http: Http) { }
	 
	getHeroes(): Promise<Hero[]> {
	  /*return this.http.get(this.heroesUrl)
	             .toPromise()
	             .then(response => response.json().data as Hero[])
	             .catch(this.handleError);*/    
        return this.http.get(`http://localhost/index.php`)
	      .toPromise()
	             .then(response => response.json())
	             .catch(this.handleError);
	    FB.api('/me/friends', function(response) {
            $scope.$apply(function() {
              $scope.myFriends = response.data;
              console.log($scope.myFriends);
            });         
        
	}
	 
	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
	

	update(hero: Hero): Promise<Hero> {
	  const url = `${this.heroesUrl}/${hero.id}`;
	  return this.http
	    .put(url, JSON.stringify(hero), {headers: this.headers})
	    .toPromise()
	    .then(() => hero)
	    .catch(this.handleError);
	}
	create(name: string): Promise<Hero> {
	  	return this.http
	    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json().data as Hero)
	    .catch(this.handleError);
	}
	delete(id: number): Promise<void> {
  		const url = `${this.heroesUrl}/${id}`;
  		return this.http.delete(url, {headers: this.headers})
    	.toPromise()
    	.then(() => null)
    	.catch(this.handleError);
	}
}
