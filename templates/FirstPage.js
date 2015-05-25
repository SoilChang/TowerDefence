$(document).ready(function(){

	//hide credit panel
	$('#credit').hide();
	//for the enlargement of the lighthouse
	$('#lighthouse').hover(function(){
		$('#lighthouse').height('250px');
		$('#lighthouse').css('margin-left','695px');
		$('#lighthouse').css('margin-top','-15px');
		$('#credit').show();
		},
		function(){
		$('#lighthouse').height('220px');
		$('#lighthouse').css('margin-left','706px');
		$('#lighthouse').css('margin-top','10px');
		$('#credit').hide();
	});

	//for the enlargment of 2nd tower
	$('#secTower').hover(function(){
		$('#secTower').height('130px');
		$('#secTower').css('margin-left','440px');
		$('#secTower').css('margin-top','145px');
		},
		function(){
		$('#secTower').height('100px');
		$('#secTower').css('margin-left','452px');
		$('#secTower').css('margin-top','169px');
	});

	//hide the enter when the page is loaded
	$('#enter').hide();
	//For the enlargement of Knight
	$('#knight').hover(function(){
			$('#knight').height('120px');
			$('#knight').css('margin-left','470px');
			$('#knight').css('margin-top','395px');
			$('#enter').show();
			
		},
		function(){
			$('#knight').height('100px');
			$('#knight').css('margin-left','475px');
			$('#knight').css('margin-top','415px');
			$('#enter').hide();
		});




});
