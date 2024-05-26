import React from "react";

type PortalProps = {
  destination: string;
};

export default function Portal({ destination }: PortalProps) {
  return (
    <div className="game-content portal">
      <h2>Portal</h2>
    </div>
  );
}