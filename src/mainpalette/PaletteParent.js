import React from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "../Palette/styles/megaPaletteStyles";
class PaletteParent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // const { colors } = this.props.miniPalettes;
    const { classes, removePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Createnew Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {this.props.miniPalettes.map((p) => (
              <Link to={`palette/${p.id}`}>
                <MiniPalette {...p} removePalette={removePalette} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteParent);
