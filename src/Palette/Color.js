import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Palette/styles/colorBoxstyles";
// const styles = {

// };
class Color extends React.Component {
  constructor(props) {
    super(props);

    this.state = { copy: false };
    this.handleCopy = this.handleCopy.bind(this);
  }
  handleCopy() {
    this.setState({ copy: true }, () =>
      setTimeout(() => this.setState({ copy: false }), 2000)
    );
  }
  render() {
    const {
      background,
      name,
      paletteId,
      colorId,
      showLink,
      classes,
    } = this.props;
    const { copy } = this.state;
    const isDark = chroma(background).luminance() <= 0.08;
    const isWhite = chroma(background).luminance() >= 0.8;
    return (
      <CopyToClipboard text={background} onCopy={this.handleCopy}>
        <div
          className={classes.colorBox}
          style={{ backgroundColor: `${background}` }}
        >
          <div
            className={`${classes.copyPalette} ${copy ? classes.show1 : ""}`}
            style={{ background }}
          />
          <div className={`${classes.copyMsg} ${copy ? classes.show : ""}`}>
            <p>Copied!!</p>
            <h4 className={classes.copyText}>{background}</h4>
          </div>
          <div>
            <div className={classes.copyContent}>
              <p className={classes.copyColor}>{name}</p>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={classes.learnMore}>Learn More!</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(Color);
