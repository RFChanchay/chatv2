import { Component, OnInit } from '@angular/core';
import { Geolocation} from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
declare var mapboxgl:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map:any;
  longitud: number = -76.4572219;
 latitude: number = -0.1778666;

  constructor() { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    console.log('slslslsls');

    mapboxgl.accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [this.longitud,this.latitude], // starting position [lng, lat]
    zoom: 12 // starting zoom
    });
  }
  async getLocation()
  {
    console.log('xd');
    await Geolocation.checkPermissions();
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates)
    this.latitude = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;
    
    this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [this.longitud,this.latitude], // starting position [lng, lat]
            zoom: 12 // starting zoom
            });
    const marker = new mapboxgl.Marker()
            .setLngLat([this.longitud,this.latitude])
            .addTo(this.map);
  }

}
