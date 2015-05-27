$(document).ready(function(){
	// hide all the center preview
	$('#c-kingdom,#c-Rules,#c-Tower_Type,#c-Allies,#c-shop,#c-game').hide();


	//click at b1 tab, kingdom preview should show
	$('#b1').click(function(){
		$('#c-kingdom').show();
		$('#c-Rules').hide();
		$('#c-Tower_Type').hide();
		$('#c-Allies').hide();
		$('#c-shop').hide();
		$('#c-game').hide();
	});

	$('#b2').click(function(){
		$('#c-kingdom').hide();
		$('#c-Rules').show();
		$('#c-Tower_Type').hide();
		$('#c-Allies').hide();
		$('#c-shop').hide();
		$('#c-game').hide();
	});

	$('#b3').click(function(){
		$('#c-kingdom').hide();
		$('#c-Rules').hide();
		$('#c-Tower_Type').show();
		$('#c-Allies').hide();
		$('#c-shop').hide();
		$('#c-game').hide();
	});

	$('#b4').click(function(){
		$('#c-kingdom').hide();
		$('#c-Rules').hide();
		$('#c-Tower_Type').hide();
		$('#c-Allies').show();
		$('#c-shop').hide();
		$('#c-game').hide();
	});

	$('#b5').click(function(){
		$('#c-kingdom').hide();
		$('#c-Rules').hide();
		$('#c-Tower_Type').hide();
		$('#c-Allies').hide();
		$('#c-shop').show();
		$('#c-game').hide();
	});

	$('#b6').click(function(){
		$('#c-kingdom').hide();
		$('#c-Rules').hide();
		$('#c-Tower_Type').hide();
		$('#c-Allies').hide();
		$('#c-shop').hide();
		$('#c-game').show();
	});
});
