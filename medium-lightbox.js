/*
 * Plugin: MediumLightbox v1.0
 * Author: Davide Calignano
 */


function MediumLightbox(element, options) {
	"use strict";

	// quit if no root element
	if (!element) return;

	var zoomedImg;
	var screenSize ={};
	var options = options || {};
	var margin = options.margin || 50;

	// Get the scrollbar width
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scrollbar-measure";
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);


	//Get size screen x and y
	function updateScreenSize(){
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		screenSize.x = x;
		screenSize.y = y;
	}

	updateScreenSize();

	//recalc size screen on resize
	window.addEventListener("resize", updateScreenSize);


	function zoom(){

		if(!this.isZoomed){

			//Set status
			this.isZoomed = !this.isZoomed;

			//Get image to be removed on scroll
			zoomedImg = this;

			//Get img node
			if(!this.img)
				this.img = this.getElementsByTagName('img')[0];

			//Get img size
			var imgH = this.img.getBoundingClientRect().height;
			var imgW = this.img.getBoundingClientRect().width;
			var imgL = this.img.getBoundingClientRect().left;
			var imgT = this.img.getBoundingClientRect().top;
			var realW, realH;

			//Get real dimension
			if(this.img.dataset){
				realW = this.img.dataset.width;    
				realH = this.img.dataset.height;
			}else{
				realW = this.img.getAttribute('data-width');
				realH = this.img.getAttribute('data-height');
			}



			//add class to img
			if (this.img.classList)
				this.img.classList.add('zoomImg');
			else
				this.img.className += ' ' + 'zoomImg';


			//create overlay div
			this.overlay = document.createElement('div');
			this.overlay.id = 'the-overlay';
			this.overlay.className = 'zoomOverlay';
			this.overlay.style.cssText = 'height:'+(screenSize.y)+'px; width: '+screenSize.x+'px; top: -'+ ((screenSize.y-imgH)/2) +'px; left: -'+((screenSize.x-imgW)/2)+'px;';


			//create wrapper for img and set attributes 
			this.wrapper = document.createElement('div');
			this.wrapper.id = 'the-wrapper';
			this.wrapper.className = 'zoomImg-wrap zoomImg-wrap--absolute';
			// this.wrapper.style.cssText = 'transform: translate(0px, 0px) translateZ(0px);';
			this.wrapper.appendChild(this.img);


			//appen element to body
			this.wrapper.appendChild(this.overlay);
			this.children[0].appendChild(this.wrapper);


			//wrap coordinates
			var wrapX = ((screenSize.x-scrollbarWidth)/2)-imgL - (imgW/2);
			var wrapY = imgT*(-1) + (screenSize.y-imgH)/2;



			//Calc scale
			//TODO if ratio*H > realH no scale
			var scale = 1;
			if(realH > imgH){
				if(imgH == imgW && screenSize.y > screenSize.x){  
					// case 1: square image and screen h > w
					scale = (screenSize.x-margin)/imgW;
				}else if(imgH == imgW && screenSize.y < screenSize.x){ 
					// case 2: square image and screen w > h
					scale = (screenSize.y-margin)/imgH;
				}else if(imgH > imgW){ 
					// case 3: rectangular image h > w
					scale = (screenSize.y-margin)/imgH;
					if (scale*imgW > screenSize.x) { 
						// case 3b: rectangular image h > w but zoomed image is too big 
						scale = (screenSize.x-margin)/imgW;
					};
				}else if(imgH < imgW){ 
					// case 4: rectangular image w > h
					scale = (screenSize.x-margin)/imgW;
					if (scale*imgH > screenSize.y) {
						// case 4b: rectangular image w > h but zoomed image is too big 
						scale = (screenSize.y-margin)/imgH;
					};
				}
			}

			//recal scale if zoomed image is more bigger then original
			if(scale*imgW > realW){
				scale = realW/imgW;
				//console.log('big')
			}
			
                        //Add zommed values: x,y and scale
                        var that = this;
                        setTimeout(function(){
                            that.wrapper.style.cssText = 'transform: translate('+wrapX+'px, '+wrapY+'px) translateZ(0px);-webkit-transform: translate('+wrapX+'px, '+wrapY+'px) translateZ(0px);';
                            that.img.style.cssText="transform: scale("+scale+");-webkit-transform: scale("+scale+")";
                            that.overlay.className = 'zoomOverlay show';
                        },0);


		}else{
			this.isZoomed = !this.isZoomed;

			//remove from zoomeImg
			zoomedImg = null

			//remove style
			this.img.style.cssText="";
			this.wrapper.style.cssText = '';
			this.overlay.className = 'zoomOverlay';



			//remove element
			var that = this;
			setTimeout(function(){
				that.children[0].appendChild(that.img)
				that.children[0].removeChild(that.wrapper) 

				var className = 'zoomImg'
				if (that.img.classList)
					that.img.classList.remove(className);
				else
					that.img.className = that.img.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

			},300)
		}
	}

	//Apply effect on all elements
	var elements = document.querySelectorAll(element);
	Array.prototype.forEach.call(elements, function(el, i){
		el.addEventListener("click", zoom);
	});

	//zoomOut on scroll
	function zoomOut(){
		if(zoomedImg){
			zoomedImg.click();
		}
	}

	window.addEventListener("scroll", zoomOut);
}
