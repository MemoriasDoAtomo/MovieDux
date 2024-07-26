import React from 'react';
import '../styles.css';

export default function Header (){
    return (<div className='header'>
        <img className='logo' src='logo.png' alt=""></img>
        <h2 className='app-subtitle'>It's time for popcorn!</h2>
    </div>
    );
}