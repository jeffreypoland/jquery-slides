jQuery Slides
================

Slides is a lightweight touch enabled responsive image slide show plugin.

##How to Use
- Requires jQuery
- Include slides.min.js
- Include slides.css

=> Use this HTML markup:
 
```html
    <head>
    <!- Link CSS ->
	 <link href="css/slides.css" rel="stylesheet">
    </head>
    
    <body>

    <!- Slides Setup ->
	<div class="slides">
 
    <div class="slide_imgs">
 
		<a href="img/myBigImage_1"><img src="img/myThumbImage_1" title="My Image Title" data-path="http://www.myurl.com"></a>
		<a href="img/myBigImage_2"><img src="img/myThumbImage_2" title="My Image Title" data-path="http://www.myurl.com"></a>
		<a href="img/myBigImage_3"><img src="img/myThumbImage_3" title="My Image Title" data-path="http://www.myurl.com"></a>
		<a href="img/myBigImage_4"><img src="img/myThumbImage_4" title="My Image Title" data-path="http://www.myurl.com"></a>
		<a href="img/myBigImage_5"><img src="img/myThumbImage_5" title="My Image Title" data-path="http://www.myurl.com"></a>
 
	</div>//end slide imgs
	 
	</div>//end slides  

     <!- Link jQuery ->
     <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> 
     <!- Include jQuery mobile custom script for swipe functions->
     <script src="js/jquery.mobile.custom.min.js"></script>
 	 <!- Link Slides ->
	 <script src="js/slides.min.js" ></script>

	 </body>
```
=> HTML Settings

	image settings = When setting up your images the larger version of the image should be referenced in
                     the <a href=""> and the thumbnail should be the <img src="">.

    title = Image title or caption

    data-path = Set the data-path to the URL of your choice if you would like the image title/caption to be linked.
          

##Options

###Markers

Markers are set to "on" by default. The markers are the clickable dot indicators under the slides. You can turn them off by setting it to "off".

#####Example:

$('.myClass').slides({markers:"off"})

###Thumbs

Thumbs are set to "off" by default. Thumbs allow you to have a clickable thumbnail grid of images below your slideshow. You can turn this on by setting thumbs to "on".

#####Example:

$('.myClass').slides({thumbs:"on"})

###Controller

Controller is set to "off" by default. The Controller will place a play, stop, and pause button under your slideshow. You can turn this on by setting controller to "on".

#####Example:

$('.myClass').slides({controller:"on"})

###Slide Title

Slide Title is set to "on" by default. If you do not what the slides to display their titles you can set slide_title to "off".

#####Example:

$('.myClass').slides({slide_title:"off"})

###Full Width Image

Full width image is set to "off" by default. By setting full_width_image to "on" it will make your images width fill its container. It will then center itself vertically and any overflow will be equally cropped from the top and the bottom of the image. To turn this feature on simply set full_width_image to "on".

#####Example:

$('.myClass').slides({full_width_image:"on"})

##Demo
[Slides Demo Site](http://www.jeffreyjpoland.com/jquery/slideshow/)
