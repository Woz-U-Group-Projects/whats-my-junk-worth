import React from 'react';

class Newscan extends React.Component {

    
    render() {

        document.getElementById("intro_page").style.visibility = "visible";
        document.getElementById("btnStart").style.visibility = "hidden";
        document.getElementById("appTitleDiv").style.visibility = "hidden";
        document.getElementById("appDescriptionDiv").style.visibility = "hidden";    
        document.getElementById("btnNewScan").style.visibility = "hidden";
        document.getElementById("btnOldScan").style.visibility = "hidden";
        document.getElementById("scanner-container").style.visibility = "visible";
        document.getElementById('showScanner').style.visibility = "visible";
         
        var thisIsMyCopy = (
            <p></p>
        );

        return (
            <div>
                <h1>{thisIsMyCopy}</h1>
            </div>
        );
    }
}

export default Newscan;