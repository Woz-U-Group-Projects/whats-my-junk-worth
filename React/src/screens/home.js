import React from 'react';
import Header from '../components/Header';

//think of react components as functions
class Search extends React.Component {
    
    constructor(props) {
        super(props)
    }  

    appFields = {
        appTitle_literal: "",
        appDescription_literal: ""
    }
        searchJRS = (props) => {

            //initalize these fields
            props.appTitle_literal = "";
            props.appDescription_literal = "Please be patient while we set up your app"

            function valuesToArray(obj) {
                return Object.keys(obj).map(function (key) { return obj[key]; });
            }
    
            //define the url of the WebAPI that will be called to return data
            let url = "http://ec2-54-70-8-113.us-west-2.compute.amazonaws.com/api/homepage";
            const options = { method: 'GET' };

            //call the WebAPI.  This should return 2 pieces of data
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
                    //inspect the data that the WebAPI returned
                    var newArray = [];
                    newArray = valuesToArray(myJson);  
                    props.appTitle_literal = newArray[0].product_title
                    props.appDescription_literal = newArray[0].product_description; 
                    //since the homepage has been rendered, find the DOM element
                    //that will display the application title and set it equal to
                    //the title that was returned by the Web API
                    document.getElementById("appTitle").innerHTML = props.appTitle_literal;
                    //since the homepage has been rendered, find the DOM element
                    //that will display the application description and set it 
                    //equal to the description that was returned by the Web API
                    document.getElementById("appDescription").innerHTML = props.appDescription_literal;
                    document.getElementById("root").innerHTML = "";
                    //since the homepage has been rendered, find the DOM element
                    //that will be in change of the viewable data and change the 
                    //visibility of those elements to visible.  The initial view of
                    //the page has these elements visibility: hidden so a clean
                    //background is shown when the page first loads and is waiting 
                    //for the data from the Web API to be retrieved
                    document.getElementById("btnStart").style.visibility = "visible";
                    document.getElementById("intro_page").style.visibility = "visible";
                }
                }, 3000);
            });
        }   
        
        render() {
            this.searchJRS(this.appFields);
            return (
             //   <Header title={this.appFields.appTitle_literal} description={this.appFields.appDescription_literal} />

                        <button     
                        type='button'     
                        onClick={() => { 
                            history.push('/new-location') 
                        }}>
                        Click Me! 
                        </button>
        );
    }
}
        
export default Search