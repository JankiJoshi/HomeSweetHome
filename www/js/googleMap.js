
var lat = 0;
var lon = 0;

function addLocation() {
    var txtLocation = $("#txtAddress").val() + " " + $("#txtCity").val() + $("#txtPostalCode").val();

    try {
        if (navigator.geolocation !== null) {
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            if (txtLocation.trim() === "") {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
            }
            else {
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({'address': txtLocation}, function (results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        lon = results[0].geometry.location.lng();
                    }
                    var LatLng = {lat: lat, lng: lon};

                    var map = new google.maps.Map(document.getElementById('divLocation'), {
                        zoom: 14,
                        center: LatLng
                    });

                    var marker = new google.maps.Marker({
                        position: LatLng,
                        map: map,
                        title: txtLocation
                    });

                });
            }

            function successCallback(position) {
                var coordinates = position.coords;
                var latitude = coordinates.latitude;
                var longitude = coordinates.longitude;
                var altitude = coordinates.altitude;

                // alert(lat + ", " + lon);

                // var mapOptions = {
                //     center: new google.maps.LatLng(0, 0),
                //     zoom: 1,
                //     mapTypeId: google.maps.MapTypeId.ROADMAP
                // };

                // var map = new google.maps.Map(document.getElementById("divLocation"), mapOptions);


                var type = google.maps.MapTypeId.ROADMAP;

                function showPositionOnMapWithMarker() {
                    var pos = {
                        lat: latitude,
                        lng: longitude
                    };
                    var options = {
                        zoom: 14,
                        center: pos,
                        mapTypeId: type
                    };
                    var map = new google.maps.Map(document.getElementById('divLocation'), options);
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Your Location"
                    });
                }

                showPositionOnMapWithMarker();
            }

            function errorCallback(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        console.error("Error: TIMEOUT - " + error.message);
                        break;
                    case error.PERMISSION_DENIED:
                        console.error("Error: PERMISSION_DENIED - " + error.message);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Error: POSITION_UNAVAILABLE - " + error.message);
                        break;
                    default:
                        console.error("Error: Unhandled error - " + error.code + " - " + error.message);
                        break;

                }
            }
        } else {
            console.error("HTML5 geolocation is not permitted");
        }


    }
    catch (e) {
        console.error("exception (addPosition()) : " + e);
    }
}

function showPosition(latitude, longitude) {
    var position = {
        lat: latitude,
        lng: longitude
    };
    var options = {
        zoom: 14,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("divPostingLocation"), options);
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Your Location"
    });
}