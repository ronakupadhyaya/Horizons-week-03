function showFlashMessage(flag){

	if(flag === "success"){

		$("#success").removeClass("hidden");
		console.log("MERRRY&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

	}else{

		$("#error").removeClass("hidden");
	}

};

function sendContribution(){

	var contrName = $('#name').val();
	var contrAmount = $('#amount').val();

	var newContribution = {
	    name: contrName,
	    amount: contrAmount
   	};

   	$.ajax({

   		url: '/api/project/:projectId/contribution',
   		method: 'POST',

   		error: function(){

   			showFlashMessage('error');
   			// showFlashMessage("An error ocurred", 'danger');


   		},

   		success: function(){

   			// CLEARING THE VALUES IN THE CONTRIBUTION'S FORM
   			$('#name').val('');
   			$('#amount').val('');

   			console.log("#############################################################");

   			showFlashMessage('success');
   			// showFlashMessage("Thanks for your contribution! You rock!", 'success');

   		},

   		data: newContribution


   	});

};


$("#myLife").on("click", function() {
	console.log("*******************Hit the ClICK HANDLER*****************");
  	sendContribution();
});


