import React from 'react';
import '../styles/app.css';

//think of react components as functions
class Oldscan extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            numberOfRecords: '',
            name1: '',
            name2: '',
            name3: '',
            description1: '',
            description2: '',
            description3: '',
            image1: '',
            image2: '',
            image3: '',
            price1: '',
            price2: '',
            price3: ''
        };
    }
    componentDidMount() {
        let currentComponent = this;
    
        //Make use of the API not the web service. 
        let url = "http://wmjwwebapi-dev.us-west-2.elasticbeanstalk.com/api/getdata";
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
                var tempData = JSON.parse(myJson[0].return_string)
                var numberOfRecords = tempData.barcode.length;
                currentComponent.setState({ numberOfRecords: numberOfRecords });
                currentComponent.setState({ name1: tempData.name[0], name2: tempData.name[1], name3: tempData.name[2] });
                currentComponent.setState({ description1: tempData.description[0] });
                currentComponent.setState({ description2: tempData.description[1] });
                currentComponent.setState({ description3: tempData.description[2] });
                currentComponent.setState({ image1: tempData.image[0] });
                currentComponent.setState({ image2: tempData.image[1] });
                currentComponent.setState({ image3: tempData.image[2] });
                currentComponent.setState({ price1: tempData.price[0] });
                currentComponent.setState({ price2: tempData.price[1] });
                currentComponent.setState({ price3: tempData.price[2] });
            }
        });   
    } 

    render() {

        if (this.state.numberOfRecords == 1) 
        {
            return (
                <div id="appDescription">
                    <div>     
                        <center><label> {this.state.name1} </label></center>
                    </div>
                    <div className="oldscanFont">
                        <img className="resize" src={this.state.image1}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price1} </label><br />
                        <label> {this.state.description1} </label>
                    </div>  
                    <hr />                  
                    <div>
                        <button className="btnStartScan"
                            type='button'     
                            onClick={() => { 
                                location.href = ('/home') 
                            }}>
                            Home
                        </button>
                    </div>                    
                </div>
            )
        }

        else

        {

            if (this.state.numberOfRecords == 2) 
            {
                return (
                    <div id="appDescription">
                        <div>     
                            <center><label> {this.state.name1} </label></center>
                        </div>
                        <div className="oldscanFont">
                            <img className="resize" src={this.state.image1}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price1} </label><br />
                            <label> {this.state.description1} </label>
                        </div>
                        <hr />
                        <div className="oldscanFont">
                            <img className="resize" src={this.state.image2}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price2} </label><br />
                            <label> {this.state.description2} </label>
                        </div>  
                        <hr />                                    
                        <div>
                            <button className="btnStartScan"
                                type='button'     
                                onClick={() => { 
                                    location.href = ('/home') 
                                }}>
                                Home
                            </button>
                        </div>   
                    </div>
                )
            } 
            
            else 
            
            {

                if (this.state.numberOfRecords == 3) {
                    return (
                        <div className="productFont">
                            <div>     
                                <center><label> {this.state.name1} </label></center>
                            </div>
                            <div className="oldscanFont">
                                <img className="resize" src={this.state.image1}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price1} </label><br />
                                <label> {this.state.description1} </label>
                            </div>
                            <hr />
                            <div className="oldscanFont">
                                <img className="resize" src={this.state.image2}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price2} </label><br />
                                <label> {this.state.description2} </label>
                            </div>
                            <hr />
                            <div className="oldscanFont">
                                <img className="resize" src={this.state.image3}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price3} </label><br />
                                <label> {this.state.description3} </label>
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

                else

                {
                    return (
                        <div className="productFont">
                            <div>
                                Loading...
                            </div>
                        </div>
                    )
                }
            }
        }
    }
}
        
export default Oldscan