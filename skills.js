function arrayContainsAnotherArray(needle, haystack){
  for(var i = 0; i < needle.length; i++){
    if(haystack.indexOf(needle[i]) === -1)
       return false;
  }
  return true;
}
function entry(header, caption, image, link, lang, tech) {
    this.header = header;
    this.caption = caption;
    this.image = image;
    this.link = link;
    this.lang = lang;
    this.tech = tech;
    console.log(tech);
}
var createEntry = function (item){
    var divElement = document.createElement("div");
    divElement.className = "view view-sixth";
    divElement.lang = item.lang;
    var image = document.createElement("img");
    image.src = item.image;
    divElement.appendChild(image);
    
    var divEl = document.createElement("div");
    divEl.className = "mask";
    var header = document.createElement("h2");
    header.innerHTML = item.header;
    divEl.appendChild(header);
    var caption = document.createElement("p");
    caption.innerHTML = item.caption;
    divEl.appendChild(caption);
    var button = document.createElement("a");
    button.href = item.link;
    button.className = "info";
    button.innerHTML = "See More";
    divEl.appendChild(button);

    divElement.appendChild(divEl);
    $(divElement).data('tech', item.tech);
    document.getElementById("gallery").appendChild(divElement);
    console.log("done");
}
$(document).ready(function() {
  var gallery = [];
  gallery.push(new entry("C++", "school at ucla taught", "http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD", "http://google.com", "c++", ["c++"]));
  gallery.push(new entry("Spotify Scraper", 
    "Extract song/artist information and scrapes the song lyrics and artist background information",
    "http://www.scdn.co/i/_global/open-graph-default.png",
    "http://google.com",
    "python",
    ["python"]));
  gallery.push(new entry("Location Listener", 
    "Chrome Extension offering tab audio utility! Mutes tabs at quiet preset locations such as the library or class.",
    "https://voltron00x.files.wordpress.com/2014/04/chrome-os-2odl-800.jpg",
    "http://google.com",
    "javascript",
    ["javascript"]));
    gallery.push(new entry("C++", "school at ucla taught", "http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD", "http://google.com", "c++", ["c++"]));

  gallery.push(new entry("Location Listener", 
    "Chrome Extension offering tab audio utility! Mutes tabs at quiet preset locations such as the library or class.",
    "https://voltron00x.files.wordpress.com/2014/04/chrome-os-2odl-800.jpg",
    "http://google.com",
    "code",
    ["code"]));
  gallery.forEach(createEntry);
});

function fadeGallery(){
	$("#gallery").find('div').fadeOut("fast", function(){
		$(this).remove();
	});
};
var array = [];
var o = {
	init: function(){
		this.diagram();	
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l);
	},
	diagram: function(){
		var r = Raphael('diagram', 550, 550),
			rad = 73;

		r.circle(300, 300, 85).attr({ stroke: 'none', fill: '#193340' });

		var title = r.text(300, 300, 'Skills').attr({
			font: '20px Arial',
			fill: '#fff'
		}).toFront();

		r.customAttributes.arc = function(value, color, rad){
			var v = 3.6*value,
				alpha = v == 360 ? 359.99 : v,
				random = o.random(100, 270),
				a = (random-alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = 300 + rad * Math.cos(b),
				sy = 300 - rad * Math.sin(b),
				x = 300 + rad * Math.cos(a),
				y = 300 - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}

		$('.get').find('.arc').each(function(i){
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();

			rad += 30;	
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 20 });
			var clicked = false;
			z.mouseover(function(){
				
                this.animate({ 'stroke-width': 50, opacity: .75 }, 500, 'elastic');
                if(Raphael.type != 'VML') //solves IE problem
					this.toFront();
				title.animate({ opacity: 0 }, 500, '>', function(){
					this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, 500, '<');
				});//////////////set something
				//fadeGallery();    not the most efficient way

				var lower = text.toLowerCase();
				$("#gallery").find('div').each(function(){
					var temp = $(this).data('tech');
					var fade = $(this);
					if(temp ){
						if(temp.indexOf(lower) === -1)
							fade.css({opacity:0, height:0});
						array.forEach(function(lentry){
							if(temp.indexOf(lentry) === -1)
							 	fade.css({opacity:0, height:0});
						});
					}
				});
            }).mouseout(function(){
             	if(!clicked){
				 	this.animate({ 'stroke-width': 26, opacity: 1 }, 500, 'elastic');
				 	title.animate({ opacity: 0 }, 500, '>', function(){
				 		this.attr({ text: "Skills" }).animate({ opacity: 1 }, 500, '<');
				 	});
				 	$("#gallery").find('div').each(function(){//restore everything if array empty and restore not everything if not
				 		var temp = $(this).data('tech');
				 		if(temp && arrayContainsAnotherArray(array, temp)){
				 			$(this).css({opacity:1, height: "200px", width: '200px'});
				 		}
				 	});
				 };
            });
            z.click(function(){
            	clicked = !clicked;
            		if(clicked){
            			console.log(this);
            			this.animate({ 'stroke-width': 50, opacity: .75 }, 1, 'elastic');
            			array.push(text.toLowerCase());
            			console.log("array", array, text);
            		}
            		else{
            			console.log(array.indexOf(text));
            			array.splice(array.indexOf(text), 1);
            			console.log("array rm", array, text);
            		}
            });
		});
	}
}
$(function(){ o.init(); });