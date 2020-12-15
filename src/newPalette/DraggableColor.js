import React from "react";
import DisplayColor from "./DisplayColor";
import { SortableContainer } from "react-sortable-hoc";
const DraggableColor = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((c, i) => (
        <DisplayColor
          index={i}
          color={c.color}
          name={c.name}
          removeColor={removeColor}
        />
      ))}
    </div>
  );
});
export default DraggableColor;
