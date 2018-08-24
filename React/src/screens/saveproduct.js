import React from 'react';

//think of react components as functions
class Saveproduct extends React.Component {
    
    constructor(props) {
        super(props);  
        
        this.state = {
            barcode: '',
            name: '',
            description: '',
            image: '',
            price: ''
        } 
    } 

    componentDidMount() {
        let currentComponent = this;

    
        //populate the state in case the fetch failes for some reason
        let defaultTitle = "Default Title";
        let defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.";
        
        var queryString = window.location.search;	
        var passedString = decodeURI(queryString.substring(1));
        var stringArray = passedString.split("&");
        currentComponent.setState({barcode: stringArray[0], name: stringArray[1], description: stringArray[2], image: stringArray[3], price: stringArray[4]});

    }

        
        render() {

            return (
                <div id="appDescription">
                    <div>     
                        <center><label>We have saved the following item</label></center>
                    </div>
                    <div className="oldscanFont">
                        <img className="resize" src={this.state.image}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price} </label><br />
                        <label> {this.state.description} </label>
                    </div>                                 
                    <hr />                                        
                    <div>
                        <button className="btnStartScan"
                            type='button'     
                            onClick={() => { 
                            location.href = ('/landingpage') 
                            }}>
                             Return
                        </button>
                    </div>                  
                </div>
            )
    }
}
        
export default Saveproduct