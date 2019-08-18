Justified Mosaic
---
A react component which automatically resizes images to conform to a justified layout using
[Flickr's open-source algorithm](https://github.com/flickr/justified-layout).

![Basic example](https://i.imgur.com/6ru2wXW.png)

### Installation:  
```
npm install --save justified-mosaic
```

### Basic Usage:
```jsx harmony
const images = [
  { src: 'http://imagewebsite.com/image1.png' },
  { src: 'http://imagewebsite.com/image2.jpg' },
  { src: 'http://imagewebsite.com/image3.gif' },
  ...
];

<JustifiedMosaic images={images} />
```

### Props:
| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| images | array | Yes | N/A | An array of objects which follow a shape described below |
| omitIncompleteRows | boolean | No | true | If true, images which are unable to form a complete row will be dropped |
| containerPadding | integer | No | 5 | Pixels to use as padding around the container
| boxSpacing | integer | No | 5 | Pixels of empty space between images |
| targetRowHeight | integer | No | 300 | Pixel height of each row in a perfect world |
| rowLimit | integer | No | Infinity | Maximum number of rows to render. Excess images will be dropped
| darkenOnHover | boolean | No | false | If false, image will not darken and title/description will not be displayed |

### Shape of `images` prop

The following keys are part of the `images` prop of the main component. Remember, if the component
prop `darkenOnHover` is not `true`, title and description will never be displayed. If `darkenOnHover`
is `true`, and a title and description are not provided, the image will still darken, but no text
will be displayed.

| Key | Type | Required | Description |
| --- | ---- | -------- | ----------- |
| src | string | Yes | Link to an image |
| title | string | No | Title of the image, also used as alt text. Displayed when the user hovers over the image |
| description | string | No | Description of the image. Displayed in smaller text below the title |
| url | string | No | A URL to navigate to when the image is clicked |

Code example:
```ecmascript 6
{
  src: 'http://somewebsite.com/with/an/image.jpg',
  title: 'Image Title',
  description: 'Tell the user something about the image',
  url: 'Navigate here if the user clicks the image'
}
```

### Want to tinker with it?
```
git clone http://github.com/LegendaryLinux/justified-mosaic.git
npm install && npm run dev
cd public/ && http-server
```
The browse to `localhost:8080`