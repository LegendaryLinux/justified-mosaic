import React from 'react';
import ReactDOM from 'react-dom';
import images from './images';
import JustifiedMosaic from './JustifiedMosaic';
import '../styles/index.scss';

const MosaicWrapper = () => (
    <div id="app">
        <div id="content-left">
            <JustifiedMosaic
                images={images}
            />
        </div>
        <div id="content-middle">
            <JustifiedMosaic
                images={images}
            />
        </div>
        <div id="content-right">
            <JustifiedMosaic
                images={images}
            />
        </div>
    </div>
);

window.onload = function(){
    ReactDOM.render(<MosaicWrapper />, document.getElementById('app'));
};