// components/Map.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Text } from 'react-native';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const WebMapComponent = React.forwardRef(({ locationsData, selectedIncidentId, onMarkerPress, initialRegion }: any, ref) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBL2lf_jys31QHv8VcBRD6-q7oFFzkywnk',
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
        if (ref) {
            (ref as React.MutableRefObject<any>).current = {
                panTo: (latLng: google.maps.LatLngLiteral) => mapInstance.panTo(latLng),
            };
        }
    }, [ref]);

    useEffect(() => {
        if (map && selectedIncidentId !== null) {
            const location = locationsData.find((l: any) => l.id === selectedIncidentId);
            if (location) {
                map.panTo({ lat: location.coordinates.latitude, lng: location.coordinates.longitude });
                map.setZoom(10);
            }
        }
    }, [selectedIncidentId, map, locationsData]);

    if (loadError) return <Text>Map cannot be loaded.</Text>;
    if (!isLoaded) return <Text>Loading Map...</Text>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: initialRegion.latitude, lng: initialRegion.longitude }}
            zoom={4}
            onLoad={onLoad}
        >
            {locationsData.map((location: any) => (
                <MarkerF
                    key={location.id}
                    position={{ lat: location.coordinates.latitude, lng: location.coordinates.longitude }}
                    onClick={() => onMarkerPress(location)}
                    icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: selectedIncidentId === location.id ? '#007AFF' : '#d32f2f',
                        fillOpacity: 1,
                        strokeWeight: 0,
                        scale: 6,
                    }}
                />
            ))}
        </GoogleMap>
    );
});

export default WebMapComponent;