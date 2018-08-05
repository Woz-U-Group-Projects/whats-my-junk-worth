import React from 'react';

class Landingpage extends React.Component {

    
    render() {

        document.getElementById("intro_page").style.visibility = "visible";
        document.getElementById("btnStart").style.visibility = "hidden";
        document.getElementById("appTitleDiv").style.visibility = "hidden";
        document.getElementById("appDescriptionDiv").style.visibility = "visible";
        document.getElementById("appDescription").innerHTML = "Click the New Scan button to access your camera and scan the barcode of a product.  If you want to see products you have scanned in the past, click on the Old Scans button."

        document.getElementById("btnNewScan").style.visibility = "visible";
        document.getElementById("btnOldScan").style.visibility = "visible";

        var thisIsMyCopy = (
            <p></p>
        );

        return (
            <div>
                {thisIsMyCopy}
            </div>
        );
    }
}

export default Landingpage;