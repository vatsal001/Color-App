import React from "react";
import seedColor from "./seedColors";
import Palette from "./Palette/Palette";
import { Route } from "react-router-dom";
import MiniPalette from "./mainpalette/MiniPalette";
import { generatePalette } from "./colorPalettes";
import PaletteParent from "./mainpalette/PaletteParent";
import SinglePalette from "./mainpalette/SinglePalette";
import NewPaletteForm from "./newPalette/NewPaletteForm";
import { Switch } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalette = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalette || seedColor,
    };
  }
  findPalette = (id) => {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    });
  };
  savePalette = (newPalete) => {
    this.setState({ palettes: [...this.state.palettes, newPalete] });
    this.syncLocalStorage();
  };
  removePalette = (paletteN) => {
    this.setState({
      palettes: this.state.palettes.filter((p) => p.paletteName !== paletteN),
    });
  };
  syncLocalStorage = () => {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  };

  render() {
   
    return (
      <>
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={(routeProps) => (
              <NewPaletteForm
                savePalette={this.savePalette}
                palette={this.state.palettes}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <PaletteParent
                miniPalettes={this.state.palettes}
                removePalette={this.removePalette}
              />
            )}
          />
          <Route
            exact
            path="/palette/:id"
            render={(routeParams) => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeParams.match.params.id)
                )}
              />
            )}
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={(routeParams) => (
              <SinglePalette
                colorId={routeParams.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeParams.match.params.paletteId)
                )}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}
export default App;

//major things to ask
//1. styles are not working
//3.My removeColor function i not working when i add sortableElement into DisplayColor.js
//4. Why is that happening when i write !== my colors array clears but one element left behind when i write === it clears all
