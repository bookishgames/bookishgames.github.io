/* global window */
import React, { useContext, useEffect, useState } from "react";
import { GameContext, GameContextProps } from "../../Game";

type PortalProps = {
  allSymbols: string;
  goalSymbols: string;
};

type ModernDeviceOrientationEvent = DeviceOrientationEvent & {
  requestPermission?: () => Promise<string>;
};

type OrientationData = {
  alpha: number;
  beta: number;
  gamma: number;
};

function useDeviceOrientation(deps?: React.DependencyList) {
  const [data, setData] = useState<OrientationData | null>(null);

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

type OrientationSliderProps = {
  sliderOrientation: OrientationData;
  setSliderOrientation: React.Dispatch<React.SetStateAction<OrientationData>>;
};

function OrientationSlider({
  sliderOrientation,
  setSliderOrientation,
}: OrientationSliderProps) {
  return (
    <div className="orientation-slider">
      <p>If your gyroscope isn't working, you can use this slider to control the portal.</p>
      <input
        type="range"
        min={0} max={TOTAL_DEGREES}
        value={sliderOrientation.alpha}
        onChange={(e) => {
          const alpha = parseInt(e.target.value, 10) % TOTAL_DEGREES;
          setSliderOrientation((d) => ({ ...d, alpha }));
        }}
      />
    </div>
  );
}

const TOTAL_DEGREES = 360;
const QUARTER_DEGREES = 90;
const MIN_TIME_MS = 750;
const ADVANCE_ACTIVATE_DELAY_MS = 2000;

function getSymbolForDegrees(symbols: string[], degrees: number): string {
  const degreesPerSymbol = TOTAL_DEGREES / symbols.length;
  const halfDegreeSegment = degreesPerSymbol / 2;
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const accumulatedDegrees = degreesPerSymbol * i;
    const delta = Math.abs(degrees - accumulatedDegrees);
    if (delta <= halfDegreeSegment) {
      return symbol;
    }
  }

  return symbols[0];
}

function chunkSymbols(symbols: string): React.JSX.Element {
  return (
    <>
      {symbols.split("").map((s, i) => (
        <span key={i} className="chunk">{s}</span>
      ))}
    </>
  );
}

export default function Portal({ allSymbols, goalSymbols }: PortalProps) {
  const symbols = allSymbols.toUpperCase().split("");
  const targetSymbols = goalSymbols.toUpperCase();
  const degreesPerSymbol = TOTAL_DEGREES / symbols.length;
  const deviceOrientation = useDeviceOrientation();
  const [sliderOrientation, setSliderOrientation] = useState<OrientationData>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const orientation = deviceOrientation ?? sliderOrientation;
  const pointerDegrees = (orientation.alpha + QUARTER_DEGREES) % TOTAL_DEGREES;
  const sliderProps = { sliderOrientation: orientation, setSliderOrientation };

  const [lastSymbol, setLastSymbol] = useState<string>('');
  const [lastTime, setLastTime] = useState<number>(Date.now());
  const [progress, setProgress] = useState<number>(0);
  const nextTargetSymbol = targetSymbols[progress];
  const progressSymbols = targetSymbols.split("").map((l, i) => (
    i < progress ? l : "_"
  )).join("");
  const isActivated = progressSymbols === targetSymbols;

  const gameContext = useContext<GameContextProps>(GameContext);
  useEffect(() => {
    if (isActivated) {
      setTimeout(() => {
        gameContext.setNextIndex();
      }, ADVANCE_ACTIVATE_DELAY_MS);
    }
  }, [gameContext, progress]);

  useEffect(() => {
    const newSymbol = getSymbolForDegrees(symbols, orientation.alpha);
    setLastSymbol(newSymbol);
  }, [orientation, symbols]);

  useEffect(() => {
    // Update the last change timestamp whenever the value changes
    setLastTime(Date.now());
  }, [lastSymbol]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastTime < MIN_TIME_MS) return;
      // Perform the action if the value has not changed for the min time
      if (lastSymbol === nextTargetSymbol) {
        setProgress((n) => {
          const newIndex = n + 1;
          if (newIndex > targetSymbols.length) return n;
          return newIndex;
        });
      }

    }, 3000);

    // Clear the timeout if the component unmounts or if the value changes
    return () => clearTimeout(timer);
  }, [lastTime]);

  return (
    <div className="game-content portal">
      <div className="destination">
        <h1>{chunkSymbols(targetSymbols)}</h1>
        <h1>{chunkSymbols(progressSymbols)}</h1>
        {isActivated ? (
          <p>You activated the portal!</p>
        ) : (
          <p>Use your gyroscope to select the letters that spell the destination. Hold the pointer on a letter for one second to select it.</p>
        )}
      </div>
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
      <OrientationSlider {...sliderProps} />
    </div>
  );
}