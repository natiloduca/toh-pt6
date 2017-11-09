"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mock_heroes_1 = require("./mock-heroes");
var core_1 = require("@angular/core");
//import { Headers, Http } from '@angular/http';
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var hero_1 = require("./hero");
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'api/heroes'; // URL to web api
        this.headers = new http_2.Headers({ 'Content-Type': 'application/json' });
    }
    HeroService.prototype.getHeroesOld = function () {
        return Promise.resolve(mock_heroes_1.HEROES);
    };
    HeroService.prototype.getHeroesSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 2 second delay
            setTimeout(function () { return resolve(_this.getHeroes()); }, 2000);
        });
    };
    HeroService.prototype.getHero = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.getHeroOld = function (id) {
        return this.getHeroes()
            .then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.getHeroes = function () {
        /*return this.http.get(this.heroesUrl)
                   .toPromise()
                   .then(response => response.json().data as Hero[])
                   .catch(this.handleError);*/
        return this.http.get("http://localhost/index.php")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
        FB.api('/me/friends', function (response) {
            $scope.$apply(function () {
                $scope.myFriends = response.data;
                console.log($scope.myFriends);
            });
        }, private, handleError(error, any), Promise < any > {
            console: .error('An error occurred', error),
            return: Promise.reject(error.message || error)
        }, update(hero, hero_1.Hero), Promise < hero_1.Hero > {
            const: url = this.heroesUrl + "/" + hero.id,
            return: this.http
                .put(url, JSON.stringify(hero), { headers: this.headers })
                .toPromise()
                .then(function () { return hero; })
                .catch(this.handleError)
        }, create(name, string), Promise < hero_1.Hero > {
            return: this.http
                .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
                .toPromise()
                .then(function (res) { return res.json().data; })
                .catch(this.handleError)
        }, delete (id), number);
        Promise < void  > {
            const: url = this.heroesUrl + "/" + id,
            return: this.http.delete(url, { headers: this.headers })
                .toPromise()
                .then(function () { return null; })
                .catch(this.handleError)
        };
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HeroService);
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map