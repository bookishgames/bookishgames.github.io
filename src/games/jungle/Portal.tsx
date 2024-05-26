/* global window */
import React, { useEffect, useState } from "react";

type PortalProps = {
  destination: string;
};

export default function Portal({ destination }: PortalProps) {
  const [data, setData] = useState<string>('');
  useEffect(() => {

    function handleOrientation(event) {
      const alpha = event.alpha; // Rotation around z-axis (0 to 360 degrees)
      const beta = event.beta;   // Rotation around x-axis (-180 to 180 degrees)
      const gamma = event.gamma; // Rotation around y-axis (-90 to 90 degrees)

      console.log({ event });
      setData(JSON.stringify(event));
    }

    if (window.DeviceOrientationEvent) {
      // Check if iOS 13+ requires permission
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            } else {
              console.error('Permission denied for DeviceOrientationEvent');
            }
          })
          .catch(console.error);
      } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    } else {
      console.error('DeviceOrientationEvent is not supported on this device.');
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [destination]);

  return (
    <div className="game-content portal">
      <h2>Portal</h2>
      <pre>{data || "No Data"}</pre>
    </div>
  );
}