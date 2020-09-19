import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Landing from "./components/Landing";
import * as actions from "./actions";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing}></Route>
          <Route path="/surveys" component={Dashboard}></Route>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
