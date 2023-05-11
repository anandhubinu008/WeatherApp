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
  tempMax : string = '0';
  tempMin :string = '0';
  services : string ='----';
  units : string = 'metric';
  cityNameValue: string = '----';
  humidity:string ='0';
  windSpeed:string ='0'; 
  morningImage = './assets/night.jpg';
  dayImage ='./assets/pic2.jpg';
  eveningImage = './assets/pic2.jpg';
  nightImage = './assets/pic2.jpg';
  date = new Date();
  hours = new Date().getHours();
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
          this.services = this.myWeather.weather[0].main;
          this.tempMax = this.myWeather.main.temp_max;
          this.tempMin = this.myWeather.main.temp_min;
          this.humidity = this.myWeather.main.humidity;
          this.windSpeed = this.myWeather.wind.speed;  
        },
  error :(error) => console.log(error.message),
  complete:() => console.info('API call complicated')
        })     
        setInterval(() => {         //replaced function() by ()=>
          this.date = new Date();
        }, 1000);
  }
  getTimeOfDay(): string {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      return 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'day';
    } else if (currentHour >= 18 && currentHour < 22) {
      return 'evening';
    } else {
      return 'night';
    }
    
  }

}

