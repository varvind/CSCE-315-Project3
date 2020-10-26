import React, { Component } from "react";
import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Polling from "./Polling";
 
class Main extends Component {
  render() {
    return (
		<HashRouter>
        <div>
          <h1>Election Tracker 2020</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Search for Information">Search</NavLink></li>
            <li><NavLink to="/Polling Information">Polling</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path="/" component={Home}/>
			 <Route path="/Search for Information" component={Search}/>
			 <Route path="/Polling Information" component={Polling}/>
          </div>
        </div>
		</HashRouter>
    );
  }
}
 
export default Main;