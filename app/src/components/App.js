/* eslint-disable import/no-unresolved */
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Portfolio from "./portfolio/Portfolio";
import Sinesthesia from "./sinesthesia/Sinesthesia";
import Resume from "./resume/Resume";
import LessonsHome from "./lessons/LessonsHome";
import Header from "./common/Header";
import SocialFollow from "./common/SocialFollow";
import PageNotFound from "./PageNotFound";
// import logo from "./logo.svg";
// import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sinesthesia" component={Sinesthesia} />
        <Route path="/lessons" component={LessonsHome} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/resume" component={Resume} />
        <Route component={PageNotFound} />
      </Switch>
      <SocialFollow />
    </div>
  );
}

export default App;
