import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "../Palette/styles/miniPaletteStyles";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
function MiniPalette(props) {
  let { id, paletteName, emoji, classes, colors, removePalette } = props;
  const miniBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  const handleRemove = (e) => {
    e.stopPropagation();
    alert("hdifdf;la");
  };
  return (
    <div className={classes.root}>
      <div>
        <DeleteTwoToneIcon onClick={handleRemove} />
      </div>
      <div className={classes.color}>{miniBoxes}</div>

      <div className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </div>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
