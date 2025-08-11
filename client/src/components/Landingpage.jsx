import React from "react";
import '../index.css';
import Navbar from './Navbar';
import Streamline from "./Streamline";
import Monitoring from "./Monitoring";
import Features from "./Features";
import Analytics from "./Analytics";
import CallToAction from "./CallToAction";

function Landingpage(){
    
    return(
        <div className="app">
            <Navbar />
            <Streamline/>
            <Monitoring/>
            <Features/>
            <Analytics/>
            <CallToAction/>
        </div>  
    );
}

export default Landingpage;

