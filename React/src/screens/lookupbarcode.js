import React from 'react';
import '../styles/app.css';

class Lookupbarcode extends React.Component {

    constructor(props) {
        super(props);  
        this.state = {
            barcode: '',
        };
        this.barcodeLookup = this.barcodeLookup.bind(this);
        this.manuallLookup = this.manuallLookup.bind(this);
    } 

    barcodeLookup(passedBarcode) {
        let currentComponent = this;

        let url = "https://cors-anywhere.herokuapp.com/http://api.barcodelookup.com/v2/products?barcode=" + passedBarcode + "&key=mj1pm32ylcctxj1byaia85n9dk2d4i";        
        const options = { method: 'GET' }; 

        currentComponent.setState({ barcode: passedBarcode });

        fetch( url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if (myJson == undefined) 
            {
                console.log("fetch failed")
            } 
            else 
            {     
                //inspect the data that the WebAPI returned
                var product_string = encodeURI(myJson.products[0].product_name);
                location.href="./ebaylookup?" + product_string + "&" + passedBarcode;
            }
        }); 
    }
    
    componentWillMount() {
        var barcodeParm = this.props.location.search.substring(1);
        this.barcodeLookup(barcodeParm);
    }

    manuallLookup() {        
        var manualBarCode = document.getElementById("manualBarcode").value;
        document.getElementById("manualBarcode").value = "";
        this.barcodeLookup(manualBarCode);
    }

    render() {     

            return (
                <div>
                    <div>
                        <label id="errorFont">Barcode {this.state.barcode} was not found by our barcode service.  You can re-scan your barcode or manually enter a barcode below</label>
                    </div>
                    <div>
                        <button className="btnStartScan"
                            type='button'     
                            onClick={() => { 
                                location.href = ('/newscan') 
                            }}>
                            Re-Scan
                        </button>
                    </div>
                    <div>
                        <center><label className="appDescription">OR</label></center>
                    </div>
                    <div id="errorDivInput">
                        <center><input className="revisedProductName" id="manualBarcode"/></center><br />
                    </div>
                    <div>
                        <button className="btnStartScan" onClick={this.manuallLookup}>
                            Manual Lookup
                        </button>
                    </div>
                </div>
            );
    }
}

export default Lookupbarcode;