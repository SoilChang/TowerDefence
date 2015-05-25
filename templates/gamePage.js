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
		});

		

	});
});