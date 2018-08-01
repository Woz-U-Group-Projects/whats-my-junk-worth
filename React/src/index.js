import React from 'react';
import { render } from 'react-dom';
import * as Redux from 'redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./screens";

const Index = () => (
    <Router>
      <div>
        <Route path="/" exact={true} component={Home} />
      </div>
    </Router>
);

render(<Index />, document.getElementById('root'));
