import React from "react";
import Color from "./Color";
import Navbar from "./Navbar";
import Footer from "./PaletteFooter";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/paletteStyles";
// const styles = {
//   Palette: {
//     height: " 100vh",
//   },
//   paletteColor: {
//     height: " 90%",
//   },
// };
class Palette extends React.Component {
  constructor(props) {
    super(props);

    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(v) {
    this.setState({ format: v });
  }
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    let colorBox = colors[this.state.level].map((c) => (
      <Color
        background={c[this.state.format]}
        name={c.name}
        colorId={c.id}
        paletteId={id}
        showLink={true}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar
          level={this.state.level}
          showingLevels={true}
          showText={false}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
        />
        <div className={classes.paletteColor}>{colorBox}</div>
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
