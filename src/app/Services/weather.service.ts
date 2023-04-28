import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }


   
  getWeather(city:string,units:string){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=8d5de0d7ea536d80f7395147800fb0f1&units=' + units); 
  }

}
