$( document ).ready(function() {
        var circles = new Array();
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 53.1718523, lng: 6.3749349},
          disableDefaultUI: true,
          zoom: 15
        });

       $.ajax({url: 'locations.xml', dataType : 'xml', success: function(data){  
        var dot = {
            url: '1480436216_bullet-red.png',
            anchor: new google.maps.Point(16, 16)
        }
        var currLocation = new google.maps.Marker({
            map: map,
            icon: dot
        });                      
        
               
               
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {lat: position.coords.latitude,lng: position.coords.longitude};      
            var pos2 = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);          
            currLocation.setPosition(pos);
            map.setCenter(pos);
                  
                  var markers = data.documentElement.getElementsByTagName("marker");
                       for (var i = 0; i < markers.length; i++) {
                        var id = markers[i].getAttribute("id");
                        var lat = markers[i].getAttribute("lat");
                        var lng = markers[i].getAttribute("lng");
                        var next = markers[i].getAttribute("next");        
                        var text = markers[i].getAttribute("text");        
                        var naar = new google.maps.LatLng(lat, lng);
                        var afstand = google.maps.geometry.spherical.computeDistanceBetween(pos2,naar);       
                        var gettingClose = new google.maps.Circle({
                            strokeColor: '#27ae60',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#2ecc71',
                            fillOpacity: 0.35,
                            map: map,
                            radius: 0
                          });
                       circles.push(gettingClose);        
                       gettingClose.setCenter(naar);
                       if (afstand <= 500){
                       gettingClose.setRadius(200);
                       }
                       if (afstand <=500){
                       $(".coobox").html(next);
                       $("#overlay").show();
                       $("#overlay").html(text);           
                       }
                       }          
                  
                  
         
                                var positionTimer = navigator.geolocation.watchPosition(
                                    function (position) {
                                      var pos = {lat: position.coords.latitude,lng: position.coords.longitude};
                                      var pos2 = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);           
                                      currLocation.setPosition(pos);
                                      map.setCenter(pos);      
                                      for (var i = 0; i < markers.length; i++) {
                                        var lat = markers[i].getAttribute("lat");
                                        var lng = markers[i].getAttribute("lng");
                                        var next = markers[i].getAttribute("next");        
                                        var text = markers[i].getAttribute("text");        
                                        var naar = new google.maps.LatLng(lat, lng);
                                        var afstand = google.maps.geometry.spherical.computeDistanceBetween(pos2,naar);        
                                        circles[i].setCenter(naar);
                                               if (afstand <= 500){
                                               circles[i].setRadius(200);
                                               } else {
                                               circles[i].setRadius(0);
                                               }
                                               if (afstand <=500){
                                               $(".coobox").html(next);
                                               $("#overlay").show();
                                               $("#overlay").html("<p>" + text + "</p><span class='close'></span>");        
                                               }
                                                                                    }        
                                    });
                        
                          
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
       }});  
       
 $('body').on('click', '.close', function() {    
        $("#overlay").hide();        
 });
});
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }


