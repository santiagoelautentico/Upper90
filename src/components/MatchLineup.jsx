import React from "react";
import LineupPlayer from "./LineupPlayer";

const POSITION_SLOTSH = [
  ["", "", "GK", "", ""], // fila 1
  ["RB", "CB1", "CB2", "CB3", "LB"], // fila 2
  ["", "CDM1", "CDM2", "CDM3", ""], // fila 3
  ["RM", "CM1", "CM2", "CM3", "LM"], // fila 4
  ["LW", "", "CAM", "", "RW"], // fila 5
  ["", "ST1", "ST2", "ST3", ""], // fila 6
];
const POSITION_SLOTSA = [
  ["", "ST3", "ST2", "ST1", ""], // fila 1
  ["LW", "", "CAM", "", "RW"], // fila 2
  ["LM", "CM3", "CM2", "CM1", "RM"], // fila 3
  ["", "CDM3", "CDM2", "CDM1", ""], // fila 4
  ["LB", "CB3", "CB2", "CB1", "RB"], // fila 5
  ["", "", "GK", "", ""], // fila 6
];
const MatchLineup = ({ starting, teamType }) => {
    console.log(starting, "starting lineup");
    
  return (
    <div className="formation-grid">
      {(teamType === "home" ? POSITION_SLOTSH : POSITION_SLOTSA).flat().map((pos, idx) => {
        const player = starting.find((p) => p.playerPosition === pos);
        return (
          <div key={idx} className={`slot slot-${pos || "empty"}`}>
            {player && <LineupPlayer player={player} />}
          </div>
        );
      })}
    </div>
  );
};

export default MatchLineup;
