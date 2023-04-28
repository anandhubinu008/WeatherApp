import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
  city :string = '';
  myWeather : any;
  temprature : number = 0;
  tempMax : string = '';
  tempMin :string = '';
  services : string ='';
  units : string = 'metric';
  cityNameValue: string = '';
  humidity:string ='';
  windSpeed:string =''; 
  cityName(eventData:Event){
    this.cityNameValue = ((<HTMLInputElement>eventData.target).value);
      }
 btnClicked(){
    this.city = this.cityNameValue;
    console.log(this.city);
    this.ngOnInit();
  }
  constructor(private weatherService: WeatherService){}
  ngOnInit(): void {
      this.weatherService.getWeather(this.city,this.units).subscribe({
        next:(res) => {
          console.log(res)
          this.myWeather = res;
          console.log(this.myWeather);
          this.temprature = this.myWeather.main.temp;
          this.services = this.myWeather.weather[0].description;
          this.tempMax = this.myWeather.main.temp_max;
          this.tempMin = this.myWeather.main.temp_min;
          this.humidity = this.myWeather.main.humidity;
          this.windSpeed = this.myWeather.wind.speed;  
        },
  error :(error) => console.log(error.message),
  complete:() => console.info('API call complicated')
        })
  }

}
