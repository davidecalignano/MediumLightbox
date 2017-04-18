MediumLightbox
=============

#### Nice and elegant way to add zooming functionality for images, inspired by medium.com

This plugin reproduce exactly the same code that use Medium to add the smooth transition effect clicking over the images, with some improvement.
* **It works on mobile**, unlike [Medium](https:/medium.com).
* **It's simple**, unlike [Fluidbox](http://terrymun.github.io/Fluidbox/).

##### Key features
Written in pure javascript for better performance, lightweight and simple. [View demo](http://davidecalignano.it/project/files/medium-lightbox/demo/demo.html).
##### Use

**Include**

    <link href="style.css" rel="stylesheet">
    <script src="mediumLightbox.js" ></script>
**Style.css** has some extra style for demo purposes. Pick just what you need.

**html**

    <figure class="half left zoom-effect">
        <div class="aspectRatioPlaceholder" >
            <div class="aspect-ratio-fill" style="padding-bottom: 50%;"></div>
            <img class="img" data-width="900" data-height="450" src="image.jpg">
        </div>
    </figure>
    
To do some calculations some attributes are necessary:
* **data-width**: the real width of the image.
* **data-height**: the real height of the image.
* To the div with **aspect-ratio-fill** class is applied a padding-bottom that is the aspect ratio of the image. 
The aspect ratio percentage is found with [(height/width)*100] formula.

**Initialize plugin**

	MediumLightbox('figure.zoom-effect');
#### Option

    MediumLightbox('figure.zoom-effect', {
        margin:40
    });
* **Margin** - default: 20 - Margin in px applied to the image in zoomed view.


#### Preview | [Live demo](http://davidecalignano.it/project/files/medium-lightbox/demo/demo.html)
![alt text](http://davidecalignano.it/project/files/medium-lightbox/medium-lightbox-demo.gif "Demo")
