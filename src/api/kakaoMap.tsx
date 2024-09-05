import React, { ReactElement, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  address: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface GeocoderResult {
  y: string;
  x: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap({ address }: KakaoMapProps): ReactElement {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [map, setMap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!map || !address) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: GeocoderResult[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords: Coordinates = {
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        };
        setCoordinates(coords);

        const bounds = new window.kakao.maps.LatLngBounds();
        bounds.extend(new window.kakao.maps.LatLng(coords.lat, coords.lng));
        map.setBounds(bounds);
      } else {
        setError('카카오 지도에서 해당 주소를 찾을 수 없습니다.');
      }
    });
  }, [map, address]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <p>▼아래 주소를 참고해주세요</p>
      </div>
    );
  }

  return (
    <Map
      center={coordinates || { lat: 37.566826, lng: 126.9786567 }}
      style={{
        width: '400px',
        height: '250px',
        borderRadius: '30px',
      }}
      level={3}
      onCreate={setMap}
    >
      {coordinates && (
        <MapMarker
          position={coordinates}
          image={{
            src: '/Icon/marker.svg',
            size: {
              width: 50,
              height: 50,
            },
            options: {
              offset: {
                x: 26,
                y: 50,
              },
            },
          }}
        ></MapMarker>
      )}
    </Map>
  );
}

export default KakaoMap;
