import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
    
    constructor(props) {
        super(props)
      }

    appFields = {
        appTitle_literal: "",
        appDescription_literal: ""
    }


        searchJRS = (props) => {

            props.appTitle_literal = "";
            props.appDescription_literal = "Please be patient while we set up your app"

            function valuesToArray(obj) {
                return Object.keys(obj).map(function (key) { return obj[key]; });
            }
    
            let url = "http://ec2-54-70-8-113.us-west-2.compute.amazonaws.com/api/homepage";
            const options = { method: 'GET' };

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
                    props.appTitle_literal = newArray[0].product_title
                    props.appDescription_literal = newArray[0].product_description; 
                    document.getElementById("appTitle").innerHTML = props.appTitle_literal;
                    document.getElementById("appDescription").innerHTML = props.appDescription_literal;
                    document.getElementById("root").innerHTML = "";
                    document.getElementById("btnStart").style.visibility = "visible";
                    document.getElementById("start_invisible").style.visibility = "visible";
                }
                }, 3000);
            });
        }   
        
        render() {
        this.searchJRS(this.appFields);
        return (
            <Header title={this.appFields.appTitle_literal} description={this.appFields.appDescription_literal} />
        );
    }
}
        
export default Search