import React from "react";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  footer: {
    display: " flex",
    height: "5vh",
    justifyContent: " flex-end",
    backgroundColor: " lightsalmon",
    fontWeight: " bold",
    alignItems: " center",
  },
};
function Footer(props) {
  const { paletteName, emoji, classes } = props;
  return (
    <footer className={classes.footer}>
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
}
export default withStyles(styles)(Footer);
