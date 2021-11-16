import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;



@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  
  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef:ElementRef;

  infoWindows: any [];
  markers: any = [];

  constructor() { }

   addMarkersToMap(marksers){
     for(let marker  of this.markers){
       let position = new google.maps.LatLng(marker.latitude, marker.longitude);
       let mapMarker = new google.maps.Marker({
         position: position,
         title: marker.title,
         latitude: marker.latitude,
         longitude: marker.longitude

       });
       mapMarker.setMap(this.map);
       this.addInforWindowToMarker(mapMarker);
     }
   }
   
   addInforWindowToMarker(marker){
     let infoWindowContent = '<div id="content">' +
                               '<h2> id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                               '<p> Latitude: ' + marker.latitude + '</p>' +
                               '<p> Longitude: ' + marker.longitude +  '</p>' +
                              '<ion-button id= "navigate">Navigate</ion-button>' +
                              '</div>' ;
     let infoWindow = new google.maps.infoWindow({
       content: infoWindowContent
     });
     
     marker.addListener('click', () =>{
       this.closeAllInfoWindows();
       infoWindow.ope(this.map, marker);
     });

     this.infoWindows.push(infoWindow);
   }

   closeAllInfoWindows(){
     for(let window of this.infoWindows){
       window.close();
     }
   }





  ionViewDidEnter(){
    this.showMap();
  }

  showMap(){
    const location = new google.maps.LatLng(-17.824858, 31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
     this.map = new google.maps.Map(this.mapRef.nativeElement, options);
     this.addMarkersToMap(this.markers);
  }


  ngOnInit() {
  }

}
