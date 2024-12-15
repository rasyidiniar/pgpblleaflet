import { Component } from '@angular/core';
import * as L from 'leaflet'; //cannot find declaration

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Deklarasi 3 Variabel
  map!: L.Map;
  markerIcon!: L.Icon;
  layerControl!: L.Control.Layers;

  constructor() { }
  ngOnInit() {


  }

  //Inisialisasi Peta
  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-7.770397767812406, 110.38205714193435], 13)

    //Marker
    this.markerIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [30, 41],
      iconAnchor: [15, 40],
    });

    const marker = L.marker([-7.770397767812406, 110.38205714193435], {icon: this.markerIcon}).addTo(this.map)
    .bindPopup('Wisdom Park')
    .openPopup();

    //Basemap
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    });

    var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    });

    var stamen = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      maxZoom: 19,
    });

    var gmaps = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 19,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });


    var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "Stamen Toner" : stamen,
    "Google Maps" : gmaps,
    };

    L.control.layers(baseMaps).addTo(this.map);

    //Peta OSM Default
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}
