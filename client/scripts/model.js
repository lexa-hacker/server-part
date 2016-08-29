define(['jquery', 'select2'], function(jquery, select2){

	console.log("Model loaded...");


	var emailMask = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

	var ajaxReqType = new requestType();

	function requestType(){
		this.type = 0;//0-post,1-put,2-get,3-delete
		this.set = function(value){
			this.type = value;
		};
		this.get = function(){
			return this.type;
		};
		this.reset = function(){
			this.type = 0;
		};
	}

	function select2Using(){
		var genderList = [
			{id:"M", text: "Man"},
			{id:"W", text: "Woman"}];

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
		{id:"Russian Federation", text:"Russian Federation"},	
		{id:"Macedonia", text:"Macedonia"}];

		$("#country").select2({
		  placeholder: "Choose your location",
		  allowClear: true,
		  data: countryList
		});
	}

	return {
		emailMask: emailMask,
		ajaxReqType: ajaxReqType,
		select2Using: select2Using
	};
});