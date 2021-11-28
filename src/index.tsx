import React, { Component } from "react";
import { render } from "react-dom";
import ImageList from "./ImageList";
import "./style.css";

// tslint:disable-next-line:no-empty-interface
interface IAppProps {}
interface IAppState {
  name: string;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      name: "React",
    };
  }

  public render() {
    return (
      <div>
        <ImageList />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
