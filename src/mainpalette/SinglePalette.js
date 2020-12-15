import React from "react";
import Color from "../Palette/Color";
import Navbar from "../Palette/Navbar";
import Footer from "../Palette/PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Palette/styles/paletteStyles";
class SinglePalette extends React.Component {
  constructor(props) {
    super(props);
    this.shades = this.allColor(this.props.palette, this.props.colorId);
    this.state = {
      format: "hex",
    };
    this.changeFormat = this.changeFormat.bind(this);
  }
  allColor(palette, id) {
    let shades = [];
    let allColor = palette.colors;
    for (let key in allColor) {
      shades = shades.concat(allColor[key].filter((c) => c.id === id));
    }
    return shades.slice(1);
  }
  changeFormat(v) {
    this.setState({ format: v });
  }
  render() {
    const { classes } = this.props;
    const showBoxes = this.shades.map((c) => (
      <Color
        background={c[this.state.format]}
        name={c.name}
        key={c.name}
        showLink={false}
      />
    ));

    return (
      <div className={`ingle ${classes.Palette}`}>
        <Navbar
          changeFormat={this.changeFormat}
          showingLevels={false}
          showText={true}
        />
        <div className={classes.paletteColor}>
          {showBoxes}
          <div className={`${classes.goBack} `}>
            <Link to={`/palette/${this.props.palette.id}`}>Go Back</Link>
          </div>
        </div>
        <div>
          <Footer
            paletteName={this.props.palette.paletteName}
            emoji={this.props.palette.emoji}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SinglePalette);
