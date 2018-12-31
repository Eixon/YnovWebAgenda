import React, { Component } from "react";
import { Provider } from "react-redux";

import { LocaleProvider } from "antd";
import frFR from "antd/lib/locale-provider/fr_FR";

import "./App.css";
import { store } from "./store/store";
import Agenda from "./containers/Agenda/Agenda";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={frFR}>
          <Agenda />
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
