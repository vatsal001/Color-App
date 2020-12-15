import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Palette/styles/displayColorStyles";
import DeleteTowToneIcon from "@material-ui/icons/DeleteTwoTone";
import { SortableElement } from "react-sortable-hoc";
const DisplayColor = SortableElement((props) => {
  const { classes, color, name, removeColor } = props;
  const handleRemove = () => {
    removeColor(name);
    debugger;
  };
  return (
    <div className={classes.display} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        {/* <button>delete</button> */}
        <div className={classes.buttonbox}>
          <div>
            <DeleteTowToneIcon onClick={handleRemove} />
          </div>
        </div>
      </div>
    </div>
  );
});
export default withStyles(styles)(DisplayColor);
