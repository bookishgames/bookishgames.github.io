/* global window */
import React, { useEffect, useState } from "react";

type PortalProps = {
  destination: string;
};

type ModernDeviceOrientationEvent = DeviceOrientationEvent & {
  requestPermission?: () => Promise<string>;
};

const TOTAL_DEGREES = 360;

export default function Portal({ destination }: PortalProps) {
  const symbols = destination.toUpperCase().split("");
  const degreesPerSymbol = TOTAL_DEGREES / symbols.length;


  return (
    <div className="game-content portal">
      <div className="outer-ring">
        <div className="inner-ring">
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