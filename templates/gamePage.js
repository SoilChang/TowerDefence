$(document).ready(function(){
	// hide all the center preview
	$('#c-kingdom').hide();

	//click at b1 tab, kingdom preview should show
	$('#b1').click(function(){
		$('#c-kingdom').show(function(){

			// the following code is to add input text status to the display message
			$('#c-kingdom-status-button').click(function(){
				var inputText = $('input[name=inputText]').val();
				$('#c-kingdom-status-display').html(inputText);
			});

			// the following is the functionality specific to close button
			$('#c-kingdom-closeButton').hover(function(){
				// when hover
				$('#c-kingdom-closeButton').animate(
					{	'height':'40px','left':'95%','top':'0%',},'fast');
				$('#c-kingdom-closeButton').click(function(){
					$('#c-kingdom').hide();
				});
			},
				// when unhover
				function(){
					$('#c-kingdom-closeButton').animate(
					{	'height':'30px','left':'96%','top':'0%',},'fast');
				}
			);
			
		});



	});
});