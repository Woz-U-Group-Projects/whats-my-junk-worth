import React from 'react';

//think of react components as functions
class Ebaylookup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            barcode: '',
            productTitle: '',
            errorString: '',
            numberOfRecords: '',
            name1: '',
            description1: '',
            price1: '',
            image1: '',
            name2: '',
            description2: '',
            price2: '',
            image2: '',
            name3: '',
            description3: '',
            price3: '',
            image3: ''  
        };
        
        this.saveData = this.saveData.bind(this);

    }

    saveData(which) {

        var barcode = this.state.barcode;
        var name = '';
        var description = '';
        var image = '';
        var price = '';
console.log("which: ", which);
        switch (which) {
            case 1:
                name = this.state.name1;
                description = this.state.description1;
                image = this.state.image1;
                price = this.state.price1;
            break;
            case 2:
                name = this.state.name2;
                description = this.state.description2;
                image = this.state.image2;
                price = this.state.price2;
            break;
            case 3:
                name = this.state.name3;
                description = this.state.description3;
                image = this.state.image3;
                price = this.state.price3;
            break;
        }

        if (which>0) {
            var url = "?" + barcode + "&" + name + "&" + description + "&" + image + "&" + price;
            url = encodeURI(url);
            location.href = "./saveproduct"+ url;
        }
    }

    componentDidMount() {
        let currentComponent = this;

        function valuesToArray(obj) {
            return Object.keys(obj).map(function (key) { return obj[key]; });
        }
    
        //populate the state in case the fetch failes for some reason
        let defaultTitle = "Default Title";
        let defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.";
        
        var queryString = window.location.search;	
        var passedString = queryString.substring(1);
        var passedArray = passedString.split("&");
        var passedName = passedArray[0];
        var passedBarcode = passedArray[1];
        var decodedPassedString = decodeURI(passedName);
        currentComponent.setState({ productTitle: decodedPassedString, barcode: passedBarcode });

        //
        let url = "https://cors-anywhere.herokuapp.com/http://svcs.ebay.com/services/search/FindingService/v1";
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=jonathan-wmjw-PRD-5262ede01-60b402b1";
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&keywords=" + passedString;
        url += "&paginationInput.entriesPerPage=3";
        const options = { method: 'GET' };

        fetch( url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if (myJson == undefined) 
            {
                var errorMessage = "eBay was unable to find a match on " + decodedPassedString + ". That is the name our bar code service returned.  If you want, you can try entering a different product name for eBay to try.";            
                currentComponent.setState({ errorString: errorMessage });
            } 
            else 
            {     
                //inspect the data that the WebAPI returned
                var productsReturned = myJson.findItemsByKeywordsResponse[0].searchResult[0];
                var newArray = [];
                newArray = valuesToArray(productsReturned); 
                var numberOfProducts = newArray[0];

                var product = {
                    name: "",
                    description: "",
                    price: "",
                    image: ""
                }
                currentComponent.setState({ numberOfRecords: numberOfProducts });
                if (numberOfProducts > 0) {
                    for (var r=0;r<numberOfProducts;r++){
                        product.name = newArray[1][r].title;
                        product.description = 'description';
                        var priceArray = [];
                        priceArray = valuesToArray(newArray[1][r].sellingStatus[0].currentPrice[0]);
                        product.price = priceArray[1];
                        product.image = newArray[1][r].galleryURL;
                        if (r==0) {
                            currentComponent.setState({ name1 : product.name });
                            currentComponent.setState({ description1 : product.name });
                            currentComponent.setState({ price1 : product.price });
                            currentComponent.setState({ image1 : product.image });
                        } else {
                            if (r==1) {
                                currentComponent.setState({ name2 : product.name });
                                currentComponent.setState({ description2 : product.name });
                                currentComponent.setState({ price2 : product.price });
                                currentComponent.setState({ image2 : product.image });
                            } else {
                                currentComponent.setState({ name3 : product.name });
                                currentComponent.setState({ description3 : product.name });
                                currentComponent.setState({ price3 : product.price });
                                currentComponent.setState({ image3 : product.image });
                            }
                        }
                    }
                }                     
            }
        });  
    }

    render() {

        if (this.state.numberOfRecords == 1) 
        {
            return (
                <div id="appDescription">
                    <div>     
                        <center><label>These are the entries on eBay that we found</label></center>
                    </div>
                    <div className="oldscanFont">
                        <img className="resize" src={this.state.image1}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price1} </label><br />
                        <label> {this.state.description1} </label>
                    </div>                    
                    <div>
                        <button className="btnStartScan" onClick={this.saveData(1)}>
                            Save
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
                            <center><label>These are the entries on eBay that we found</label></center>
                        </div>
                        <div className="oldscanFont">
                            <img className="resize" src={this.state.image1}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price1} </label><br />
                            <label> {this.state.description1} </label>
                        </div>                                 
                        <div>                            
                            <button className="btnStartScan" onClick={this.saveData(1)}>
                                Save
                            </button>
                        </div>
                        <hr />
                        <div className="oldscanFont">
                            <img className="resize" src={this.state.image2}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price2} </label><br />
                            <label> {this.state.description2} </label>
                        </div>                                      
                        <div>                            
                            <button className="btnStartScan" onClick={this.saveData(2)}>
                                Save
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
                                <center><label>These are the entries on eBay that we found</label></center>
                            </div>
                            <div className="oldscanFont">
                                <img className="resize" src={this.state.image1}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price1} </label><br />
                                <label> {this.state.description1} </label>
                            </div>                                    
                            <div>                            
                                <button className="btnStartScan" onClick={this.saveData(1)}>
                                    Save
                                </button>
                            </div>
                            <hr />
                            <div className="oldscanFont">
                                <img className="resize" src={this.state.image2}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price2} </label><br />
                                <label> {this.state.description2} </label>
                            </div>                                    
                            <div>                            
                                <button className="btnStartScan" onClick={this.saveData(2)}>
                                    Save
                                </button>
                            </div>
                            <hr />
                            <div className="oldscanFont">
                                <img className="resize" src={this.state.image3}></img><label>&nbsp;&nbsp;&nbsp;Price:&nbsp; {this.state.price3} </label><br />
                                <label> {this.state.description3} </label>
                            </div>                                        
                            <div>                            
                                <button className="btnStartScan" onClick={this.saveData(3)}>
                                    Save
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
        
export default Ebaylookup