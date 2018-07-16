var display = "no";
var imageTest;

function searchIt(){

	if(display === "yes"){
			$("#imageResult").animate({right:'-500px',opacity:'0'},1000);
			$("#songResult").animate({left:'-100px',opacity:'0'},1000);
			display = "no";
	}

	$("#musicVideo").animate({opacity:'0'},500);
	$("#songControl").css('background-image','url(Images/Play.png)');
	$("#songControl").css('background-color','#00DB04');
	$("#playing").animate({left:'20px',opacity:'0'});
	sub.pause();
	music = "play";

	var str = $('#typeBox').val();
	if( str == ""){
	
		alert("You must type something before searching.");
	
	} 

	else {
		$("#pat").css('display','inline');
		$("#pat").animate({left:'-7000px'},120000, 'linear');

		setTimeout(function(){
			//unsplash api request <<<<<<
			var unsplash = 'https://api.unsplash.com/search/photos/?client_id=d8ba850a24e78fb254312b97c575e9dac5e07887bb961e906d0f5f681cf8df6a&query=' + str;

			$.getJSON(unsplash, function(pictureInfo){
				if(pictureInfo.total === 0){
					$("#image").css('background-image', 'url(Images/NoImage.jpg)');
					imageTest = "fail";
				} else {
			    	var created_at = pictureInfo.results[0].created_at;
			    	var description = pictureInfo.results[0].description;
			    	var dateY = created_at.substring(0, 4);
			    	var dateDM = created_at.substring(5, 10);
			    	var time = created_at.substring(11, 16);	
					$("#bigPicture").css('background-image','url(' + pictureInfo.results[0].urls.regular + ')')
					console.log(pictureInfo.total);
					$("#image").css('background-image', 'url(' + pictureInfo.results[0].urls.regular + ')');
					$("#imageName").html('Created on <span style="color: white">' + dateDM + '-' + dateY + '</span>, at <span style="color: #555">' + time + '</span>');	
					$("#imageDescription").html('Description: ' + description + '.');
					if(description === null){
						$("#imageDescription").html('Description: Unavailable.');
					}
					imageTest = "pass";
				}
			});
			//>>>>>>

			//itunes api request <<<<<<
			var itunes = 'https://itunes.apple.com/search?term=' + str;

			$.getJSON(itunes, function(songInfo){
				var song = songInfo.results[0].previewUrl
				var name = songInfo.results[0].trackName.toUpperCase();
				$("#sub").attr("src",song);
				$("#songName").html('<span style="color: blue">' + name + '</span> <br /> <span style="font-family: arial">By</span> ' + songInfo.results[0].artistName)
			});
			//>>>>>>
	//	$("#image").load(function() {
		if(display === "no"){
			$("#imageResult").animate({right:'0px',opacity:'1'},1000);
			$("#songResult").animate({left:'20px',opacity:'1'},1000);
			display = "yes";
		} else if(display === "yes"){
			$("#imageResult").animate({right:'0px',opacity:'1'},1000);
			$("#songResult").animate({left:'20px',opacity:'1'},1000);
			display = "yes";
		}
	//	});
		}, 1000);
	}
};


var music = "play";
var sub = document.getElementById('sub');
sub.volume = .3;
var musicVideo = document.getElementById('musicVideo');

function stopMusic(){
	$("#musicVideo").animate({opacity:'0'},500);
	$("#songControl").css('background-image','url(Images/Play.png)');
	$("#songControl").css('background-color','#00DB04');
	$("#playing").animate({left:'20px',opacity:'0'});
	sub.pause();
	music = "play";
}

$("#songControl").click(function(){
	if(music === "play"){
		musicVideo.currentTime = 0;
		$("#musicVideo").animate({opacity:'.2'},500);
		$("#songControl").css('background-image','url(Images/Pause.png)');
		$("#songControl").css('background-color','#FF0D0D');
		$("#playing").animate({left:'40px',opacity:'1'});
		sub.currentTime = 0;
		sub.play();
		music = "stop";
		setTimeout(function(){
			stopMusic();
		},29000);
	}
	else if(music === "stop"){
		stopMusic();
	}
});

$("#searchBtn").click(function (){
	searchIt();
})


$(document).keypress(function(e) {
	if(e.which == 13) {
	    searchIt();
	}
});


$("#image").click(function(){
	if(imageTest === "pass"){
		$("#cover").css('display','inline');
		if(music === "play"){
			$("#musicVideo").animate({opacity:'.2'},500);
			$("#songControl").css('background-image','url(Images/Pause.png)');
			$("#songControl").css('background-color','#FF0D0D');
			$("#playing").animate({left:'40px',opacity:'1'});
			sub.currentTime = 0;
			sub.play();
			music = "stop";
			setTimeout(function(){
				stopMusic();
			},29000);
		}
	}
})

$("#cover").click(function(){
	$("#cover").css('display','none');
})
