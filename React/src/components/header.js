import React from 'react';
const Header = (props) => (
  <div>
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
    </div>
  </div>
);
export default Header;