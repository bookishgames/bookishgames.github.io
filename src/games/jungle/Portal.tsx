/* global document */
import React, { useEffect, useState } from "react";

type PortalProps = {
  destination: string;
};

export default function Portal({ destination }: PortalProps) {
  const [data, setData] = useState<string>('');
  useEffect(() => {
    const onOrientation = (orientation) => {
      console.log({ orientation });
      setData(JSON.stringify(orientation));
    };
    document.addEventListener("deviceorientation", onOrientation, true);

    return () => {
      document.removeEventListener("deviceorientation", onOrientation);
    };
  }, [destination]);

  return (
    <div className="game-content portal">
      <h2>Portal</h2>
      <pre>{data || "No Data"}</pre>
    </div>
  );
}