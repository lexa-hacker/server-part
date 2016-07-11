
$(document).ready(select2Using);

document.forms.myform.addEventListener("blur", validationHighlighting, true);

document.forms.myform.onsubmit = function(event){

	if(!validationOnSubmit(event)) return;

	formParsing(this);
}

var emailMask = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

function select2Using(){
	var genderList = [
		{id:"M", text: "Man"},
		{id:"W", text: "Woman"}]

	$("#gender").select2({
	  placeholder: "Choose your gender",
	  allowClear: true,
	  data: genderList
	});

	var countryList = [
	{id:"Albania", text:"Albania"},
	{id:"Vatican", text:"Vatican"},
	{id:"Monaco", text:"Monaco"},
	{id:"Bosnia and Herzegovina", text:"Bosnia and Herzegovina"},
	{id:"Croatia", text:"Croatia"},
	{id:"Hungary", text:"Hungary"},
	{id:"Luxembourg", text:"Luxembourg"},
	{id:"Moldova", text:"Moldova"},
	{id:"Montenegro", text:"Montenegro"},
	{id:"Macedonia", text:"Macedonia"}];

	$("#country").select2({
	  placeholder: "Choose your location",
	  allowClear: true,
	  data: countryList
	});
}

function validationHighlighting(event){
	var target = event.target;

	if(!target.value || (target == email && !emailMask.test(target.value))){
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

function validationOnSubmit(event){
	if(!firstName.value || !gender.value || !emailMask.test(email.value)){
		event.preventDefault();
		alert("Не заполнено одно или несколько из обязательных полей.");
		return false;
	}
	return true;
}

function formParsing(form){
	var tojsonobj = {};
	var jsonstr;

	for(var i=0;i<form.elements.length-1;i++){ //-1 submit
		tojsonobj[form.elements[i].name] = form.elements[i].value;
	}

	if(avatar.value){
		var reader = new FileReader();
		reader.readAsDataURL(avatar.files[0]);
		reader.addEventListener("loadend", function(event) {
			tojsonobj.avatar = event.target.result;
			jsonstr = JSON.stringify(tojsonobj);
			alert(jsonstr);
		}, false);		
	}else{
		jsonstr = JSON.stringify(tojsonobj);
		alert(jsonstr);
	}
}