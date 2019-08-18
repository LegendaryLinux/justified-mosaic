import React from 'react';
import ReactDOM from 'react-dom';
import images from './images';
import JustifiedMosaic from './JustifiedMosaic';

const MosaicWrapper = () => (
    <div id="app">
        <JustifiedMosaic
            images={images}
        />
    </div>
);

window.onload = function(){
    ReactDOM.render(<MosaicWrapper />, document.getElementById('app'));
};