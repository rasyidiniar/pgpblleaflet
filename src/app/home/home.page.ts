// import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements OnInit {
//   map!: L.Map;
//   selectedBasemap: string = 'streets'; // Default basemap
//   tileLayer!: L.TileLayer; // To store the map layer
//   locations: any[] = []; // Array to store location data

//   constructor(private http: HttpClient) { }

//   ngOnInit() {
//     // Load location data from JSON file
//     this.http.get<any[]>('assets/mahasiswa.json').subscribe(data => {
//       this.locations = data;
//       this.loadMap();  // Initialize the map after data is loaded
//     });
//   }

//   ionViewDidEnter() {
//     // The map will load after location data is available
//     if (this.locations.length > 0) {
//       this.loadMap();
//     }
//   }

//   loadMap() {
//     // Initialize the map with coordinates for Yogyakarta
//     this.map = L.map('mapId').setView([-7.804117654829307, 110.17924557336778], 11);

//     // Add the initial tile layer
//     this.addTileLayer(this.selectedBasemap);

//     // Add markers from JSON data
//     this.locations.forEach(location => {
//       // Ensure latitude and longitude are valid numbers
//       const lat = parseFloat(location.Latitude);
//       const lng = parseFloat(location.Longitude);

//       if (!isNaN(lat) && !isNaN(lng)) {
//         L.circleMarker([lat, lng], {
//           radius: 20,  // Circle radius
//           color: 'red',  // Circle border color
//           fillColor: 'yellow',  // Circle fill color
//           fillOpacity: 0.5,  // Circle fill opacity
//         })
//           .addTo(this.map)
//           .bindPopup(`
//             <b>Nama:</b> ${location.Nama}<br>
//             <b>Rating:</b> ${location.Rating}<br>
//             <b>Alamat:</b> ${location.Alamat}<br>
//             <b>Jam Buka:</b> ${location['Jam Buka']}<br>
//           `);
//       } else {
//         console.error(`Invalid coordinates for location: ${location.Nama}`);
//       }
//     });
//   }

//   // Add a tile layer to the map
//   addTileLayer(basemap: string) {
//     // Remove the previous tile layer if it exists
//     if (this.tileLayer) {
//       this.tileLayer.remove();
//     }

//     // Select URL based on the selected basemap
//     let tileUrl: string;
//     switch (basemap) {
//       case 'streets':
//         tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; // OpenStreetMap streets
//         break;
//       case 'topo':
//         tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'; // OpenTopoMap
//         break;
//       case 'satellite':
//         tileUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'; // Satellite map from ArcGIS
//         break;
//       case 'topo-vector':
//         tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'; // OpenTopoMap as vector
//         break;
//       case 'carto-positron':
//         tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'; // Minimalist map from CartoDB (Positron)
//         break;
//       default:
//         tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; // Default to OpenStreetMap
//         break;
//     }

//     // Add the new tile layer
//     this.tileLayer = L.tileLayer(tileUrl, {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.map);
//   }

//   // Change the basemap
//   changeBasemap() {
//     this.addTileLayer(this.selectedBasemap);
//   }
// }

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map!: L.Map;
  selectedBasemap: string = 'streets'; // Default basemap
  tileLayer!: L.TileLayer; // To store the map layer
  locations: any[] = []; // Array to store location data

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Load location data from JSON file
    this.http.get<any[]>('assets/mahasiswa.json').subscribe(data => {
      this.locations = data;
      this.loadMap();  // Initialize the map after data is loaded
    });
  }

  ionViewDidEnter() {
    // The map will load after location data is available
    if (this.locations.length > 0) {
      this.loadMap();
    }
  }

  loadMap() {
    // Initialize the map with Yogyakarta
    this.map = L.map('mapId').setView([-7.80411765482930, 110.1792455733677], 11);

    // Add the initial tile layer
    this.addTileLayer(this.selectedBasemap);

    // Define a custom icon for the markers (tourism icon example)
    const tourismIcon = L.icon({
      iconUrl: 'assets/icon/marker.png',  // Your icon file path (replace with your own tourism icon image)
      iconSize: [32, 32],  // Size of the icon
      iconAnchor: [16, 32],  // Point of the icon that will correspond to marker's location
      popupAnchor: [0, -32],  // Popup position relative to icon
    });

    // Add markers from JSON data
    this.locations.forEach(location => {
      // Ensure latitude and longitude are valid numbers
      const lat = parseFloat(location.Latitude);
      const lng = parseFloat(location.Longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        // Use the custom tourism icon
        L.marker([lat, lng], { icon: tourismIcon })
          .addTo(this.map)
          .bindPopup(`
            <b>Nama:</b> ${location.Nama}<br>
            <b>Rating:</b> ${location.Rating}<br>
            <b>Alamat:</b> ${location.Alamat}<br>
            <b>Jam Buka:</b> ${location['Jam Buka']}<br>
          `);
      } else {
        console.error(`Invalid coordinates for location: ${location.Nama}`);
      }
    });
  }

  // Add a tile layer to the map
  addTileLayer(basemap: string) {
    // Remove the previous tile layer if it exists
    if (this.tileLayer) {
      this.tileLayer.remove();
    }

    // Select URL based on the selected basemap
    let tileUrl: string;
    switch (basemap) {
      case 'streets':
        tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; // OpenStreetMap streets
        break;
      case 'topo':
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'; // OpenTopoMap
        break;
      case 'satellite':
        tileUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'; // Satellite map from ArcGIS
        break;
      case 'topo-vector':
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'; // OpenTopoMap as vector
        break;
      case 'carto-positron':
        tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'; // Minimalist map from CartoDB (Positron)
        break;
      default:
        tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; // Default to OpenStreetMap
        break;
    }

    // Add the new tile layer
    this.tileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  // Change the basemap
  changeBasemap() {
    this.addTileLayer(this.selectedBasemap);
  }
}
