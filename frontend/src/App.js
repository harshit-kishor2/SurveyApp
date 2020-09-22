import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import * as actions from "./actions";
import { connect } from "react-redux";
import SurveyNew from "./components/surveys/SurveyNew";
import HomeScreen from "./components/HomeScreen";
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={HomeScreen}></Route>
          <Route exact path="/surveys" component={Dashboard}></Route>
          <Route path="/surveys/new" component={SurveyNew}></Route>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
