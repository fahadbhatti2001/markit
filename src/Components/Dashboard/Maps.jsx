import { useEffect, useRef } from 'react';
import Head from 'next/head';

export const Maps = () => {
    const mapRef = useRef(null);
    let marker;
    let circle;
    const radiusInMeters = 10; // Set your desired radius in meters

    useEffect(() => {
        let map;

        const loadGoogleMaps = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDNzn6x1beHVULdbq5Frz2qI_11nutMrZQ&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const mapOptions = {
                            center: { lat: latitude, lng: longitude },
                            zoom: 18,
                        };
                        map = new window.google.maps.Map(mapRef.current, mapOptions);

                        map.addListener('click', (event) => {
                            placeMarker(event.latLng);
                            drawCircle(event.latLng);
                            getLocationFromMarker(event.latLng);
                        });
                    },
                    (error) => {
                        console.error('Error getting current location:', error);
                        // Fallback to a default location if geolocation fails
                        const mapOptions = {
                            center: { lat: 31.51716120712125, lng: 74.2556749360686 },
                            zoom: 18,
                        };
                        map = new window.google.maps.Map(mapRef.current, mapOptions);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                // Fallback to a default location if geolocation is not supported
                const mapOptions = {
                    center: { lat: 31.51716120712125, lng: 74.2556749360686 },
                    zoom: 18,
                };
                map = new window.google.maps.Map(mapRef.current, mapOptions);
            }
        };

        const placeMarker = (location) => {
            if (marker) {
                marker.setMap(null);
            }
            marker = new window.google.maps.Marker({
                position: location,
                map: map,
            });
        };

        const drawCircle = (center) => {
            if (circle) {
                circle.setMap(null);
            }
            circle = new window.google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: center,
                radius: radiusInMeters,
            });
        };

        const isLocationWithinRadius = (markerLocation, userLocation) => {
            const R = 6371e3; // Earth's radius in meters
            const lat1 = markerLocation.lat();
            const lon1 = markerLocation.lng();
            const lat2 = userLocation.lat;
            const lon2 = userLocation.lng;

            const φ1 = (lat1 * Math.PI) / 180; // Convert to radians
            const φ2 = (lat2 * Math.PI) / 180;
            const Δφ = ((lat2 - lat1) * Math.PI) / 180;
            const Δλ = ((lon2 - lon1) * Math.PI) / 180;

            const a =
                Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c; // Distance between the two points

            return distance <= radiusInMeters;
        };

        const getLocationFromMarker = (location) => {
            // You can access the latitude and longitude of the marker location
            const latitude = location.lat();
            const longitude = location.lng();
            console.log('Marker Latitude:', latitude);
            console.log('Marker Longitude:', longitude);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude: userLatitude, longitude: userLongitude } = position.coords;
                        console.log('User Latitude:', userLatitude);
                        console.log('User Longitude:', userLongitude);

                        const isWithinRadius = isLocationWithinRadius(location, { lat: userLatitude, lng: userLongitude });
                        console.log('Is within radius:', isWithinRadius);
                    },
                    (error) => {
                        console.error('Error getting current location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        loadGoogleMaps();

        return () => {
            const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
            if (script) {
                document.head.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="md:px-20 px-4">
            <div className="py-4">
                <h1 className="font-PoppinsRegular text-base">
                    Hi, Admin
                </h1>
                <h1 className="font-PoppinsSemiBold text-4xl">
                    Glad to see you!
                </h1>
            </div>
            <div className="w-1/2">
                <div className="rounded-xl shadow" ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
            </div>
        </div>
    );
};
