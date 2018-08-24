import React from 'react';
import '../styles/app.css';


class Newscan extends React.Component {

    scannerStartStop(){
        if (_scannerIsRunning) {
            _scannerIsRunning = false;
            document.getElementById("btn").innerHTML= "Start the scanner";   
            document.getElementById("scanner-container").style.visibility = "hidden";
            Quagga.stop();
        } else {
            document.getElementById("btn").innerHTML= "Stop the scanner"              
            document.getElementById("scanner-container").style.visibility = "visible";
            startScanner();
        }
    }



    render() {
        var divStyle = {
            height: '400px'
        }
        return (
            <div>
                <div id="scanner-container" class="scanbox" style={divStyle}></div>
                <div>
                    <button className="btnStartScan" id="btn" onClick={this.scannerStartStop}>
                        Start Scanner
                    </button>
                </div>
            </div>
        );
    }
}

export default Newscan;