import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import fetch from 'node-fetch';
 
let appTitle_literal = "Title Not Found";
let appDescription_literal = "Description Not Found"

function valuesToArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

let url = "http://ec2-54-70-8-113.us-west-2.compute.amazonaws.com/api/homepage";
const options = {
    method: 'GET'
  };

// fetch(url) 
fetch(url, options)
.then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    setTimeout(function(){ 
    if (myJson == undefined) 
    {
        console.log("fetch failed")
    } 
    else 
    {
        var newArray = [];
        newArray = valuesToArray(myJson);  
        appTitle_literal = newArray[0].product_title
        appDescription_literal = newArray[0].product_description; 
        const appTitle_element = React.createElement('div', null, appTitle_literal);
        const appDescription_element = React.createElement('div', null, appDescription_literal);

        ReactDOM.render(appTitle_element, document.getElementById('appTitle'));
        ReactDOM.render(appDescription_element, document.getElementById('appDescription'));

    }
    }, 3000);
  });


