/* global window */
import React, { useEffect, useState } from "react";

type PortalProps = {
  destination: string;
};

type ModernDeviceOrientationEvent = DeviceOrientationEvent & {
  requestPermission?: () => Promise<string>;
};

type OrientationData = {
  alpha: number;
  beta: number;
  gamma: number;
};

function useOrientation(deps?: React.DependencyList) {
  const [data, setData] = useState<OrientationData>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {

    function handleOrientation(event) {
      const alpha = event.alpha; // Rotation around z-axis (0 to 360 degrees)
      const beta = event.beta;   // Rotation around x-axis (-180 to 180 degrees)
      const gamma = event.gamma; // Rotation around y-axis (-90 to 90 degrees)
      const newData = { alpha, beta, gamma };
      setData((oldData) => ({ ...oldData, ...newData }));
    }

    const MaybeDeviceOrientationEvent = (
      window.DeviceOrientationEvent as unknown as ModernDeviceOrientationEvent
    );

    if (MaybeDeviceOrientationEvent) {
      // Check if iOS 13+ requires permission
      if (typeof MaybeDeviceOrientationEvent.requestPermission === 'function') {
        MaybeDeviceOrientationEvent.requestPermission()
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

  }, deps ?? []);

  return data;
}

const TOTAL_DEGREES = 360;
const QUARTER_DEGREES = 90;

export default function Portal({ destination }: PortalProps) {
  const symbols = destination.toUpperCase().split("");
  const degreesPerSymbol = TOTAL_DEGREES / symbols.length;
  const orientation = useOrientation();
  const pointerDegrees = (orientation.alpha + QUARTER_DEGREES) % TOTAL_DEGREES;

  return (
    <div className="game-content portal">
      <div className="outer-ring">
        <div className="inner-ring">
          <div className="pointer" style={{
            transform: `rotate(${pointerDegrees}deg)`
          }}
          ></div>
          {symbols.map((symbol, i) => {
            const degrees = i * degreesPerSymbol;
            return (
              <div key={i} className="symbol" style={{
                transform: `rotate(${degrees}deg) translate(125px) rotate(90deg)`
              }}
              >{symbol}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}