import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../Palette/styles/PersistantSidebarStyles";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import DraggableColor from "./DraggableColor";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import { arrayMove } from "react-sortable-hoc";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColor: 20,
  };
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      current: "purple",
      colors: this.props.palette[0].colors,
      text: "",
      NewPaletteName: "",
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  updateColor = (newColor) => {
    console.log(newColor);
    this.setState({ current: newColor.hex });
  };
  addNewColor = () => {
    const newColorName = { color: this.state.current, name: this.state.text };
    this.setState({ colors: [...this.state.colors, newColorName] });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  addRandomColor = () => {
    const allColors = this.props.palette.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = this.state.colors.some(
        (color) => color.name === randomColor.name
      );
    }

    this.setState({ colors: [...this.state.colors, randomColor] });
  };
  handleSubmitPalette = () => {
    const newName = this.state.NewPaletteName;

    const colorPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"), //matches for whites spaces globaly into that strng,
      colors: this.state.colors,
    };
    this.props.savePalette(colorPalette);
    this.props.history.push("/");
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameMatch", (value) =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorMatch", (value) =>
      this.state.colors.every(({ color }) => color !== this.state.current)
    );
    ValidatorForm.addValidationRule("isPaletteMatch", (value) =>
      this.props.palette.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  removeColor = (name1) => {
    this.setState({
      colors: this.state.colors.filter((c) => c.name !== name1),
    });
   
  };
  render() {
    const { current } = this.state;
    const { classes, theme, maxColor } = this.props;
    // const [open, setOpen] = React.useState(false);
    const paletteFull = this.state.colors.length >= maxColor;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create new Palette
            </Typography>
            {/* <Picker
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
            /> */}
            <div className={classes.appblow}>
              <ValidatorForm onSubmit={this.handleSubmitPalette}>
                <TextValidator
                  label="Save Palette"
                  name="NewPaletteName"
                  value={this.state.NewPaletteName}
                  onChange={this.handleChange}
                  validators={["required", "isPaletteMatch"]}
                  errorMessages={[
                    "this field is required",
                    "PaletteName already taken",
                  ]}
                />

                <Link to="/">
                  <Button variant="contained" color="secondary">
                    Go Back
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"

                  // style={{ float: "right", margin: "auto" }}
                >
                  Save Palette
                </Button>
              </ValidatorForm>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4">Select Color Here</Typography>
            <div className={classes.root}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.setState({ colors: [] })}
              >
                Clear palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={paletteFull}
              >
                Random palette
              </Button>
            </div>
            <ChromePicker
              color={current}
              onChangeComplete={this.updateColor}
              className={classes.picker}
            />
            <div>
              <ValidatorForm onSubmit={this.addNewColor}>
                <TextValidator
                  label="Add color"
                  name="text"
                  value={this.state.text}
                  variant="filled"
                  className={classes.input}
                  onChange={this.handleChange}
                  validators={["required", "isColorNameMatch", "isColorMatch"]}
                  errorMessages={[
                    "this field is required",
                    "Color name must be different!",
                    "Color must be different!",
                  ]}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.pad}
                  disabled={paletteFull}
                  style={{
                    backgroundColor: paletteFull ? "lightgrey" : current,
                  }}
                >
                  {paletteFull ? "Palette is now full" : "Add Color"}
                </Button>
              </ValidatorForm>
            </div>
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColor
            colors={this.state.colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
