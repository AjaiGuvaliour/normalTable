import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  martData: any =[];
  dataTrue: boolean;

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.martData=[
      {USER: "yuri", SCORE: 6000, TIME: 34, AGE: 19, COUNTRY: "RU",SURNAME:"vvv" ,SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "yuri", SCORE: 6000, TIME: 34, AGE: 19, COUNTRY: "RU",SURNAME:"vvv",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
       {USER: "yuri", SCORE: 6000, TIME: 34, AGE: 19, COUNTRY: "RU",SURNAME:"vvv",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
       {USER: "yuri", SCORE: 1000, TIME: 34, AGE: 19, COUNTRY: "RU",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
       {USER: "yuri", SCORE: 1000, TIME: 3, AGE: 19, COUNTRY: "RU",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "yuri", SCORE: 1000, TIME: 3, AGE: 19, COUNTRY: "RU",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "yuri", SCORE: 1000, TIME: 3, AGE: 18, COUNTRY: "RU",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "yuri", SCORE: 1000, TIME: 3, AGE: 18, COUNTRY: "Ar",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "tim", SCORE: 1000, TIME: 30, AGE: 17, COUNTRY: "UK",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "sally", SCORE: 2000, TIME: 30, AGE: 16, COUNTRY: "CA",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "mary", SCORE: 1500, TIME: 31, AGE: 19, COUNTRY: "PL",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "mark", SCORE: 2000, TIME: 30, AGE: 18, COUNTRY: "DE",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "joe", SCORE: 2500, TIME: 33, AGE: 18, COUNTRY: "US",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "jane", SCORE: 4000, TIME: 35, AGE: 16, COUNTRY: "DE",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "bob", SCORE: 2000, TIME: 32, AGE: 16, COUNTRY: "US",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "anita", SCORE: 2500, TIME: 32, AGE: 17, COUNTRY: "LV",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      {USER: "amy", SCORE: 1500, TIME: 29, AGE: 19, COUNTRY: "UK",SURNAME:"kk",SURNAME1:"vvv",SURNAME2:"vvv" ,SURNAME3:"vvv",SURNAME4:"vvv" ,SURNAME5:"vvv"},
      
    ];
    this.dataTrue= true;
  }
}
