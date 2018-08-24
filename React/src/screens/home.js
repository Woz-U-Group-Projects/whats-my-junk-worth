import React from 'react';
import '../styles/app.css';

//think of react components as functions
class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            title: 'title',
            description: 'description'
        };
    }
    componentDidMount() {
        let currentComponent = this;

        function valuesToArray(obj) {
            return Object.keys(obj).map(function (key) { return obj[key]; });
        }
    
        //populate the state in case the fetch failes for some reason
        let defaultTitle = "Default Title";
        let defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.";
        
        this.setState({ title: defaultTitle });
        this.setState({ description: defaultDescription });

        //Make use of the API not the web service.  This should return 2 pieces of data
        let url = "http://wmjwwebapi-dev.us-west-2.elasticbeanstalk.com/api/homepage";
        const options = { method: 'GET' };

        fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if (myJson == undefined) 
            {
                console.log("fetch failed");
            } 
            else 
            {
                //inspect the data that the WebAPI returned
                var newArray = [];
                newArray = valuesToArray(myJson);  
                
                currentComponent.setState({ title: newArray[0].product_title });
                currentComponent.setState({ description: newArray[0].product_description });
            }
        });   
    }
 
    render() {

            return (              
                <div>
                    <div className="row">
                        <div className="col-sm-12 center_text">
                            <div className="appTitle">
                                {this.state.title}
                            </div>
                        </div>
                    </div>
                    <div className="appDescription">
                        {this.state.description}
                    </div>
                    <div>
                        <button className="btnStartScan"
                            type='button'     
                            onClick={() => { 
                                location.href = ('/landingpage') 
                            }}>
                            Let's Go!
                        </button>
                    </div>
                </div>

            );
        }
}
        
export default Home