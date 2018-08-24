import React from 'react';

class Landingpage extends React.Component {

    
    render() {
        return (
            <div>
                <div>
                    <div id="appTitle">
                        <center>&nbsp;</center>
                    </div>
                    <div id="appDescription">
                        Click the New Scan button to access your camera and scan the barcode of a product.  If you want to see products you have scanned in the past, click on the Old Scans button.
                    </div>
                </div>
                <div>
                    <button className="btnStartScan"
                        type='button'     
                        onClick={() => { 
                            location.href = ('/newscan') 
                        }}>
                        New Scan
                    </button>
                    <button className="btnStartScan"
                        type='button'     
                        onClick={() => { 
                            location.href = ('/oldscan') 
                        }}>
                        Old Scans
                    </button>
                </div>
            </div>
        )
    }
}

export default Landingpage;