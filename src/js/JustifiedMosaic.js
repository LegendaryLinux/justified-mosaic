import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash-es/forEach';
import LoadingScreen from './LoadingScreen';
import '../styles/JustifiedMosaic.scss';

class JustifiedMosaic extends Component{
    constructor(props){
        super(props);
        this.htmlId = 'justified-mosaic-'+Math.floor(Math.random()*999999);
        this.state = {
            showLoading: true,
            imageObjects: [],
            imageLayout: {},
            imageElements: [],
        };
    }

    /** Load all images from props, find their width and height, save them into state */
    componentDidMount() {
        forEach(this.props.images, (image) => {
            const thisImage = new Image();
            thisImage.onload = () => {
                this.setState(prevState => ({
                    imageObjects: [...prevState.imageObjects, {
                        ...image,
                        width: thisImage.width,
                        height: thisImage.height,
                        aspectRatio: (thisImage.width / thisImage.height),
                        key: Math.floor(Math.random()*9999999)
                    }]
                }), this.analyzeImages); // Callback from setState
            };
            thisImage.src = image.src;
        });
    }

    /** Implement maths done by Flickr to determine the prettiest layout */
    analyzeImages = () => {
        // No-op if all data is not loaded
        if(this.props.images.length !== this.state.imageObjects.length) { return; }

        // Do all the maths
        const aspectRatios = this.state.imageObjects.map(img => img.aspectRatio);
        const config = {
            containerWidth: document.getElementById(this.htmlId).offsetWidth,
            containerPadding: this.props.containerPadding,
            targetRowHeight: this.props.targetRowHeight,
            boxSpacing: this.props.boxSpacing,
            showWidows: !this.props.omitIncompleteRows,
        };
        this.setState({ imageLayout: require('justified-layout')(aspectRatios, config) }, this.generateImages);
    };

    /** Generate an array of <img /> to be used when rendering */
    generateImages = () => {
        // No-op if there are no images to render
        if(this.state.imageLayout.boxes.length === 0 || this.state.imageObjects.length === 0){ return; }

        if(this.state.imageObjects.length < this.state.imageLayout.boxes.length){
            throw Error('Count of image objects exceeds count of layout objects.');
        }

        for(let i=0; i < this.state.imageLayout.boxes.length; ++i){
            const divStyle = {
                position: 'absolute',
                left: this.state.imageLayout.boxes[i].left,
                top: this.state.imageLayout.boxes[i].top,
                width: this.state.imageLayout.boxes[i].width-1,
                height: this.state.imageLayout.boxes[i].height-1,
            };
            this.setState(prevState => ({
                imageElements: [...prevState.imageElements, (
                    <div
                        style={divStyle}
                        key={Math.floor(Math.random()*9999999)}
                        className="justified-mosaic-image-wrapper"
                    >
                        <a href={this.state.imageObjects[i].url ? this.state.imageObjects[i].url : null}>
                            <img
                                className="justified-mosaic-image"
                                src={this.state.imageObjects[i].src}
                                alt={this.state.imageObjects[i].title}
                                width={this.state.imageLayout.boxes[i].width}
                                height={this.state.imageLayout.boxes[i].height}
                            />
                        </a>
                        <span className="image-info">
                            <span className="title">{this.state.imageObjects[i].title}</span>
                            <br />
                            <span className="description">{this.state.imageObjects[i].description}</span>
                        </span>
                    </div>
                )],
            }), () => { // Callback for setState
                if(i === (this.state.imageLayout.boxes.length-1)){
                    this.setState({ showLoading: false });
                }
            });
        }
    };

    render(){
        if(this.state.showLoading){
            return (
                <div id={this.htmlId} className="justified-mosaic">
                    <LoadingScreen />
                </div>
            );
        }

        return (
            <div id={this.htmlId} className="justified-mosaic">
                {this.state.imageElements}
            </div>
        );
    }
}

JustifiedMosaic.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string
    })),
    omitIncompleteRows: PropTypes.bool,
    containerPadding: PropTypes.number,
    boxSpacing: PropTypes.number,
    targetRowHeight: PropTypes.number,
    rowLimit: PropTypes.number,
};

JustifiedMosaic.defaultProps = {
    omitIncompleteRows: true,
    containerPadding: 5,
    boxSpacing: 5,
    targetRowHeight: 300,
    rowLimit: Infinity,
};

export default JustifiedMosaic;
