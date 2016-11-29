
$( document ).ready(function() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        
       $.ajax({url: 'locations.xml', dataType : 'xml', success: function(data){     
       var infoWindow = new google.maps.InfoWindow({map: map});
        var dot = {
            url: '1480436216_bullet-red.png',
            anchor: new google.maps.Point(16, 16)
        }
        var currLocation = new google.maps.Marker({
            map: map,
            icon: dot
        });
        var gettingClose = new google.maps.Circle({
            strokeColor: '#27ae60',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#2ecc71',
            fillOpacity: 0.35,
            map: map,
            radius: 500
          });
    
        var naar =  new google.maps.LatLng(52.598694,6.3965376); 
    
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            var pos2 = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                      
            currLocation.setPosition(pos);
            gettingClose.setCenter(naar);
            
            map.setCenter(pos);
            var afstand = google.maps.geometry.spherical.computeDistanceBetween(pos2,naar);
            
            if(afstand <= 500){
            console.log(afstand);
            }
            
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
       }});  
      });
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
