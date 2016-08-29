define(['jquery', 'model'], function(jquery, model){

	console.log("View loaded...");

	function showMessageDel(){
		alert("User was successfully deleted.");
	}

	function showMessageCreate(){
		alert("You have successfully created a new User!");
	}

	function showMessageUpdate(){
		alert("You have successfully updated an User!");
	}

	function showMessageProblem(request){
		alert("Something gone wrong and User was not created/updated.\nFollowing message can help you to understand reason.\nstatus : " + request.status + "\nstatusText : " + request.statusText + "\nresponseText : " + request.responseText);
	}

	function refillingForm(tblData){
		var forma = document.forms.myform;
		forma.elements.first_name.value = tblData.cells[3].innerHTML;
		forma.elements.last_name.value = tblData.cells[4].innerHTML;
		forma.elements.email.value = tblData.cells[5].innerHTML;
		forma.elements.phone.value = tblData.cells[6].innerHTML;
		forma.elements.about.value = tblData.cells[7].innerHTML;
		$('#gender').val(tblData.cells[8].innerHTML);
		$('#gender').trigger("change");
		$('#country').val(tblData.cells[9].innerHTML);
		$('#country').trigger("change");
		//forma.elements.password.value = ; // it must not be filled, because password 
		//forma.elements.avatar.value = ; // avatar is very strange right now
	}

	function showResponse(jsonResponse){
		jsonResponse = JSON.parse(jsonResponse);
		alert("Congratulations!\nYou have created an user:\nID : " + 
			jsonResponse._id + 
			"\nFirst name : " + 
			jsonResponse.first_name + 
			"\nLast name : " + 
			jsonResponse.last_name + 
			"\nE-mail : " + 
			jsonResponse.email + 
			"\nPhone number : " +
			jsonResponse.phone + 
			"\nAbout me : " + 
			jsonResponse.about +
			"\nGender : " + 
			jsonResponse.gender +
			"\nCountry : " +
			jsonResponse.country + 
			"\nPassword : " +
			jsonResponse.password + 
			"\nAvatar : " +
			jsonResponse.avatar);
	}

	function clearUserList(){
		var tablePart = document.getElementById("custom");
		tablePart.innerHTML = "";
	}

	function validationHighlighting(event){
		var target = event.target;

		if(!target.value || (target == email && !model.emailMask.test(target.value))){
			if(target.parentNode.classList.contains("has-success"))
				target.parentNode.classList.remove("has-success");
			if(target == firstName || target == email || target == gender){
				target.parentNode.classList.add("has-error");
			}
			return;
		}

		if(target.parentNode.classList.contains("has-error"))
			target.parentNode.classList.remove("has-error");
		target.parentNode.classList.add("has-success");
	}

	function resetValidationHighlighting(){
		var forma = document.forms.myform;
		for(var i=0;i<forma.elements.length-1;i++){
			forma.elements[i].parentNode.classList.remove("has-success");
			forma.elements[i].parentNode.classList.remove("has-error");
		}
	}

	function showForm(){
		resetValidationHighlighting();
		document.getElementById("users-container").hidden = true;
		document.getElementsByClassName("jumbotron")[0].hidden = false;
		clearUserList();
	}

	function renderUserList(request){
		if(request.readyState == 4){
			if(request.status != 200 && request.status != 304){
				//alert(request.status + ': ' + request.statusText);
			}else{
				var jsonList = JSON.parse(request.responseText);
				var tablePart = document.getElementById("custom");
				for(var i=0; i<jsonList.length; i++){
					tablePart.innerHTML += "<tr><td>" + 
					jsonList[i]._id + "</td><td>" + 
					jsonList[i].role + "</td><td>" + 
					jsonList[i].provider + "</td><td>" + 
					jsonList[i].first_name + "</td><td>" + 
					jsonList[i].last_name + "</td><td>" + 
					jsonList[i].email + "</td><td>" + 
					jsonList[i].phone + "</td><td>" + 
					jsonList[i].about + "</td><td>" + 
					jsonList[i].gender + "</td><td>" + 
					jsonList[i].country + "</td><td class='actions'>" + 
					//jsonList[i].avatar +
					"<button value='del'>Del</button><button value='rev'>Upd</button></td></tr>";
				}
			}
		}
	}

	return {
		showMessageDel: showMessageDel,
		showMessageCreate: showMessageCreate,
		showMessageUpdate: showMessageUpdate,
		showMessageProblem: showMessageProblem,
		refillingForm: refillingForm,
		clearUserList: clearUserList,
		validationHighlighting: validationHighlighting,
		showForm: showForm,
		renderUserList: renderUserList
	};
});