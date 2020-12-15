import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/navbarStyles";
class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: "hex", open: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ current: e.target.value, open: true });
    this.props.changeFormat(e.target.value);
  }
  render() {
    const { classes } = this.props;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          {this.props.showText ? (
            <div>Single Color Palette</div>
          ) : (
            <Link to="/">REAL COLOR PICKER!</Link>
          )}
        </div>
        {this.props.showingLevels && (
          <div>
            <span>Level:{this.props.level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={this.props.level}
                min={100}
                max={900}
                step={100}
                onAfterChange={this.props.changeLevel}
              />
            </div>
          </div>
        )}

        <div style={{ marginLeft: "auto" }}>
          <Select value={this.state.current} onChange={this.handleChange}>
            <MenuItem value="hex">Hex - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,355,355)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
          autoHideDuration={3000}
          // onClose={handleClose}
          message={
            <h2 className="message-id">
              Color format changed to {this.state.current}!
            </h2>
          }
          ContentProps={{ "aria-describedby": "message-id" }}
          action={[
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({ open: false })}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
