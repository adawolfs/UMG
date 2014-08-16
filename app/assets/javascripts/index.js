$(function(){
	var datos
 	$("#quantum").val(2);
 	$("#time").val(1);
	$(".class").hide();
 	var counter = 1;
	$("#addButton").click(function () {
		if(counter>=10){
	        //alert("Only 10 textboxes allow");
	        return false;
		}
		counter++;
		var newTextBoxDiv = $(document.createElement('div'))
		     .attr("id", 'TextBoxDiv' + counter).attr("class", "task" + counter + " textBoxDiv");
		newTextBoxDiv.after().html('<label>Tarea #'+ counter + ' : </label>' +
		      '<input type="text" class="rafaga" id="rafaga' + counter + '">' 
		      //	+ '<input type="text" class="entra" id="entra' + counter + '">'
		      );
		newTextBoxDiv.appendTo("#TextBoxesGroup");
     });
    $("#removeButton").click(function () {
		if(counter==1){
	        //alert("No more textbox to remove");
	        return false;
    	} 
    	$("#TextBoxDiv" + counter).remove();
    	counter--;
	});
	$("#getButtonValue").click(function () {
		var msg = '';
		for(i=1; i<counter; i++){
			msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();
		}
		//alert(msg);
    });
    $("#runRobin").click(function(){
    	q = $("#quantum").val();
    	Robin();
    });
/*    $("#TextBoxesGroup").on('keydown', '.rafaga', function (ev) {
    	var keycode = (ev.keyCode ? ev.keyCode : ev.which);
    	if (keycode == '13') {
			$(this).next().focus();
		} else if(keycode == '46'){
			$("#removeButton").trigger("click");
			$("#rafaga" + counter).focus();
		}		
	});*/
	$("#TextBoxesGroup").on('keydown', '.rafaga', function (ev) {
		var keycode = (ev.keyCode ? ev.keyCode : ev.which);
		if (keycode == '13') {
			$("#addButton").trigger("click");	
			$("#rafaga" + counter).focus();
		} else if(keycode == '46'){
			$("#removeButton").trigger("click");
			$("#rafaga" + counter).focus();
		}	       
	});
});
var q;
var list;
var lReady = {};
var listos = [];
function rafagaValues(){
 	var values = new Array();
 	$(".rafaga").each(function(){
 		values[values.length] = $(this).val()
 	});
 	return values;
}
function sortBy(a, b){
	    a = a.val();
	    b = b.val();
	    return a-b;
}

function firstTask(){
 	var values = new Array();
 	list = $(".entra");
 	var minValue = list.first();
 	list = list.sort(function(a, b){return $(a).val() - $(b).val()});
 	list.each(function(){ 
 		$(this).prev().attr("index", $(this).val());
 		var key = $(this).val();
 		var val = $(this).prev().val();
 		lReady[key] = val;
 	});
}

function Robin(){
	var values = rafagaValues();
	var continueLoop = Boolean(true);
	var newTable = $(document.createElement('table')).attr('id', 'robinTable');
	while(continueLoop){
		continueLoop = false;
		for (var i = 0 ; i <= values.length - 1 ; i++) {
			if(values[i] >= q){
				appendColumns(q, newTable, i + 1);
				values[i] = values[i] - q;
				//alert("Estado Task" + i+ ":" + values[i]);	
			} else{
				appendColumns(values[i], newTable, i + 1);
				values[i] = 0;
				//alert("Estado Task" + i+ ":" + values[i]);
			}
			if(values[i] > 0){
				continueLoop = true;
			}
		}
	}
	newTable.appendTo("#container");
}


function Robin2(){
	firstTask();
	var continueLoop = Boolean(true);
	var newTable = $(document.createElement('table')).attr('id', 'robinTable');
	var i = 1;
	var next = true;
	var end = 0;
	var part = [];
	while(i<40	){
		var value;
		part = listos.shift();
		for(var j = 1; j <= q && value != undefined ; j++){
			value = part.shift()
			alert(value);
		}
		value--;
		if(lReady[i] > q ){
			doFor(lReady[i],q);
		} else {
			doFor(lReady[i],lReady[i]);
		}
		if(value > q ){
			doFor(value,q);
		} else {
			doFor(value,value);
		}
		i++;
	}
}
/*
while(next){
		if(lReady[i] > q ){
			doFor(lReady[i],q);
		} else {
			doFor(lReady[i],lReady[i]);
		}
		value = listos.shift()
		alert(value);
		value = value -1 ;
		end = i + 1
		if(value > q ){
			doFor(value,q);
		} else {
			doFor(value,value);
		}
		i++
		if(i >= 15){
			next = false;
		}
	}*/
var currentTask = 0;
function doFor(value,qt){
	var part=[];
	for(var i = 1; i <= qt; i++) {
			part.push(value);
			value--;
	}
	if(qt > 0){
		listos.push(part);
	}
}
function appendColumns(x, newTable, t){
	for (var i = 1; i <= x; i++) {
		var lastElement = newTable.children().length;
		var newRow = $(document.createElement('td')).attr('class', 'task' + t)
		newRow.html(lastElement + 1)
		newRow.appendTo(newTable);
	};
}
function setRafaga(task, value){
	$($(".rafaga")[task]).html(value)
}
function rafagaRest(task){
	var oldValue = $($(".rafaga")[task]).html();
	$($(".rafaga")[task]).html(--oldValue);
}
function rafagaPlus(task){
	var oldValue = $($(".rafaga")[task]).html();
	$($(".rafaga")[task]).html(++oldValue);
}
var tasks = [];
function addTask(){
	var id = getId();
	t = Task(id, $("#rafaga").val() , $("#entra").val());
	tasks.push(t);
	$("#taskList tbody").append(
	"<tr id=" + id + " class='task'>"
		+"<td class='id'>" + t.id + " </td>"
		+"<td class='rafaga'>" + t.rafaga + "</td>"
		+"<td class='entra'>"  + t.entra  + "</td>"
	+"</tr>");
}
function getId(){
	var index = 65 + $("#taskList tbody tr").size();
	return String.fromCharCode(index);
}
var	ejecuar;
var ejecutarSJF;
function sendAjax(){
	q = $("#quantum").val();
	var time =  $("#time").val() * 1000;
	console.log (time);
	ejecutar = setInterval(jsRound, time);
}
tList = []
function sendSJF(){
	q = $("#quantum").val();
	var time =  $("#time").val() * 1000;
	console.log (time);
	tasks = tasks.sort(dynamicSort("entra"));
	tList.push(tasks.shift());
	ejecutarSJF = setInterval(sjf, time);
}
function round(t){
	console.log(currentTask++);
	$(".task" ).css('background-color','black');
	var rows = "<td class='"+ t.id +"' >" + t.id + (currentTask-1) + "</td>";
	$("#proccess").removeClass()
	$("#proccess").addClass(t.id + "_Task")
	$("#proccess").html(t.id + (currentTask-1));
	$("#response tr").append(rows);
	task = $("#" + t.id + "" );
	var value = $(task.children()[1]).html() - 1;
	$(task.children()[1]).html(value);
	$(task).css('background-color','red');
}

function jsRound(){
    var historial = [];
    var n = 0;
    t = tasks.shift();
    if(t.rafaga > 0){
    	round(t);
    	t.rafaga--;
    	q--;
    	if(q > 0){
    		tasks.unshift(t);
    	}else{
    		tasks.push(t);
    		q = $("#quantum").val();
    	}
   	} else {
   		q = $("#quantum").val();
   	}
   	if (tasks.length == 0){
   		//clearInterval(ejecutar);
   	}
}
function sjf(){
	tList = tList.sort(dynamicSort("rafaga"))
	var t = tList.shift()
	if (t){
		round(t);
		t.rafaga--;
		if (t.rafaga > 0){
			tList.push(t);
		}
	}
	tmp = tasks.shift()
	if(tmp && tmp.entra == currentTask){
		tList.push(tmp);
	}else if (tmp){
		tasks.unshift(tmp);
	}
	if(tList.length == 0){
		clearInterval(ejecutarSJF);	
	}
}
function Task(id, rafaga, entra){
	this.id = id;
	this.rafaga = rafaga;
	this.entra = entra;
	return {id:this.id, rafaga:this.rafaga, entra:this.entra};
}

function sleep(miliseconds){
	var currentTime = new Date().getTime();
	while (currentTime + miliseconds >= new Date().getTime()){
		console.log("hola")
	}
}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}	