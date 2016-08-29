require(['jquery', 'select2', 'model', 'view'], function(jquery, select2, model, view){

	console.log("Controller loaded...");

	$(document).ready(function(){document.forms.myform.reset();});

	$(document).ready(model.select2Using);

	document.forms.myform.addEventListener("blur", view.validationHighlighting, true);

	document.forms.myform.onsubmit = function(event){

		if(!validationOnSubmit(event)) return;

		//var msg = formParsingToJSON(this);
		var msg = formParsingToUrlencoded(this);
		makeLoveWithAjax(msg);
		return false;
	}

	function showUserList(){
		creatingUsersList();
		document.getElementsByClassName("jumbotron")[0].hidden = true;
		document.getElementById("users-container").hidden = false;	
		document.forms.myform.reset();
		model.select2Using();//instead of clearing of select2 inputs
	}

	function validationOnSubmit(event){
		if(!firstName.value || !gender.value || !model.emailMask.test(email.value)){
			event.preventDefault();
			alert("Не заполнено одно или несколько из обязательных полей.");
			return false;
		}
		return true;
	}

	function formParsingToJSON(form){
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
		return jsonstr;
	}

	function formParsingToUrlencoded(form){
		var body = '';
		for(var i=0;i<form.elements.length-1;i++){ //-1 submit
			//special condition for case with updating where password & avatar are strange shit
			if(model.ajaxReqType.get() == 1 && ((form.elements[i].name == "password" && form.elements[i].value === "") || 
											(form.elements[i].name == "avatar" && form.elements[i].value === "")))
												continue;

			body += "&" + form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value);
			if(i==0) body = body.slice(1);
		}

		if(avatar.value){
			var reader = new FileReader();
			reader.readAsDataURL(avatar.files[0]);
			reader.addEventListener("loadend", function(event) {
				console.log('file = ' + event.target.result);
				console.log('file encoded = ' + encodeURIComponent(event.target.result));
				body += '&avatar=' + event.target.result;
			}, false);
			return body;
		}else{
			return body;
		}
	}

	function makeLoveWithAjax(message){

		var type = model.ajaxReqType.get();

		switch(type){
			case 0:
				var creating = new XMLHttpRequest();
				creating.onreadystatechange = function(){aroundCreating(this);};
				creating.open('POST', 'http://localhost:9000/api/users', true);
				creating.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				creating.send(message);
				break;
			case 1:
				var updating = new XMLHttpRequest();
				updating.onreadystatechange = function(){aroundUpdating(this);};
				updating.open('PUT', 'http://localhost:9000/api/users/' + document.forms.myform.dataset.id, true);
				updating.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				updating.send(message);
				break;
			case 2:
				var getusrs = new XMLHttpRequest();
				getusrs.onreadystatechange = function(){aroundGetting(this);};
				getusrs.open('GET', 'http://localhost:9000/api/users', true);
				getusrs.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				getusrs.send();
				break;
			case 3:
				var deleting = new XMLHttpRequest();
				deleting.onreadystatechange = function(){aroundDeleting(this);};
				deleting.open('DELETE', 'http://localhost:9000/api/users/' + document.forms.myform.dataset.id, true);
				deleting.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				deleting.send();
				break;
		}

		model.ajaxReqType.reset();
		document.forms.myform.dataset.id = "";
	}

	document.getElementById("usr-view").onclick = function(){
		showUserList();
		return false;
	}

	document.getElementById("form-view").onclick = function(){
		view.showForm();
		return false;
	}

	function aroundGetting(request){
		view.renderUserList(request);
		buttonActions();
	}

	function creatingUsersList(){
		model.ajaxReqType.set(2);
		makeLoveWithAjax();
	}

	function buttonActions(){
		var butoni = document.getElementsByTagName("button");
		for(var i=0; i<butoni.length; i++){
			butoni[i].onclick = function(){
				if(this.value == "del"){
					if(confirm("Are you pretty sure you want to DELETE this user?")){
						deletingUser(this.closest("tr").firstElementChild.innerHTML);
						view.clearUserList();
					}
				}
				if(this.value == "rev"){
					if(confirm("Are you sure you want to UPDATE this user?")){
						updatingUser(this.closest("tr"));
					}
				}
			}
		}
	}

	function reCreatingUsersList(){
		view.clearUserList();
		creatingUsersList();
	}

	function aroundDeleting(request) {
		if(request.readyState == 4){
			//alert("status : " + deleting.status + "\nstatusText : " + deleting.statusText + "\nresponseText : " + deleting.responseText);
			reCreatingUsersList();
			view.showMessageDel();
		}
	}

	function deletingUser(id){
		//alert(id);
		model.ajaxReqType.set(3);
		document.forms.myform.dataset.id = id;
		makeLoveWithAjax();
	}

	function updatingUser(tblstr){
		view.refillingForm(tblstr);
		model.ajaxReqType.set(1);
		document.forms.myform.dataset.id = +tblstr.cells[0].innerHTML;
		view.showForm();
		//updating will be processed by submit
	}

	function aroundCreating(request){
		if(request.readyState == 4){
			if(request.status == 200){
				showUserList();
				view.showMessageCreate();
			}
			else
				view.showMessageProblem(request);
		}
	}
	function aroundUpdating(request){
		if(request.readyState == 4){
			if(request.status == 200){
				showUserList();
				view.showMessageUpdate();
			}
			else
				view.showMessageProblem(request);
		}
	}
});
