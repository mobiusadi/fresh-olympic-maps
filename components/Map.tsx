// components/Map.tsx - FINAL VERSION (Manual Script Loader)
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// --- This is our manual script loader ---
const useScript = (url: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Check if the script is already on the page
    if (document.querySelector(`script[src="${url}"]`)) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;

    const onReady = () => setIsLoaded(true);
    const onError = (e: any) => setError(e);

    script.addEventListener('load', onReady);
    script.addEventListener('error', onError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', onReady);
      script.removeEventListener('error', onError);
    };
  }, [url]);

  return { isLoaded, error };
};
// -----------------------------------------


const MapComponent = ({ locationsData }: { locationsData: any[] }) => {
  const [map, setMap] = useState<any>(null);

  const onMapLoad = (mapInstance: any) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (!map || !window.google) return;

    // Create markers
    locationsData.forEach(location => {
      new window.google.maps.Marker({
        position: { lat: location.coordinates.latitude, lng: location.coordinates.longitude },
        map: map,
        title: location.location_name,
      });
    });

  }, [map, locationsData]);

  if (!window.google) {
    return <View style={styles.container}><Text>Map script not loaded</Text></View>;
  }

  return (
    <div
      ref={el => {
        if (el && !map) {
          const newMap = new window.google.maps.Map(el, {
            center: { lat: 40, lng: -30 },
            zoom: 3,
          });
          onMapLoad(newMap);
        }
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};


export default function MapWrapper() {
  // This is where you put your key. It's still hardcoded for this test.
  const apiKey = "AIzaSyBL2lf_jys31QHv8VcBRD6-q7oFFzkywnk"; 
  
  const { isLoaded, error } = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
  );

  if (error) return <View style={styles.container}><Text>Error loading map script.</Text></View>;
  if (!isLoaded) return <View style={styles.container}><Text>Loading map script...</Text></View>;

  // This is a placeholder for your real data for now
  const placeholderData = [{id: 1, coordinates: {latitude: 51.5074, longitude: -0.1278}, location_name: 'London'}];

  return (
     <MapComponent locationsData={placeholderData} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});