var data= (localStorage.getItem('todoList'))?JSON.parse(localStorage.getItem('todoList')):{
	todo:[],
	completed:[]
};

//Remove and complete SVG code
var removeSVG = '<svg height=482.429px id=Capa_1 style="enable-background:new 0 0 482.428 482.429"version=1.1 viewBox="0 0 482.428 482.429"width=482.428px x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><g><g><path class=fill d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"/><path class=fill d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/><path class=fill d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/><path class=fill d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/></g></g></svg>';
var completeSVG ='<svg height=512px style="enable-background:new 0 0 512 512"version=1.1 viewBox="0 0 512 512"width=512px x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><g><g><path class=fill d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"fill=#0bb54c /></g></g></svg>';
renderTodoList();
//User clicked on the add button
//If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function(){
	var value = document.getElementById('item').value;
	if(value){
		addItem(value);
	}
});
document.getElementById('item').addEventListener('keydown',function(e){
	var value = this.value;
	if(e.code === 'Enter' && value){
		addItem(value);
	}
});
function renderTodoList(){
	if(!data.todo.length && !data.completed.length) return ;
	for(var i = 0;i <data.todo.length;i++){
		var value = data.todo[i];
		addItemToDOM(value);
	}
	for(var j = 0; j < data.completed.length;j++){
		var value = data.completed[j];
		addItemToDOM(value,true);
	}	
}

function addItem(value){
	addItemToDOM(value);
	document.getElementById('item').value='';
	data.todo.push(value);
	dataObjectUpdated();
}
//store the item to localStorage
function dataObjectUpdated(){
	localStorage.setItem('todoList',JSON.stringify(data));
	console.log(JSON.parse(localStorage.getItem("todoList")));
}
function removeItem(){
	var item = this.parentNode.parentNode;  //li
	var parent = item.parentNode; //ul
	var id = parent.id;
	var value = item.innerText;
	if(id === 'todo'){
		data.todo.splice(data.todo.indexOf(value),1);
	}else{
		data.completed.splice(data.completed.indexOf(value),1);
	}
	parent.removeChild(item);
}
//complete a item and then add it to completed list
function completeItem(e){
	var item = this.parentNode.parentNode;  //li
	var parent = item.parentNode;   //ul
	var id = parent.id;   //todo
	var value = item.innerText; //the text and buttons in li

	if(id === 'todo'){
		//It's a to do item to be completed
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	}else{
		// It's a completed item to be 're-done'
		data.completed.splice(data.completed.indexOf(value),1);
		data.todo.push(value);
	}
	var target = (id === 'todo')?document.getElementById('completed'):document.getElementById('todo');
	 parent.removeChild(item);
	 target.insertBefore(item,target.childNodes[0]);
	dataObjectUpdated();
}

//add a new item to todo list
function addItemToDOM(text,completed){
	var list = (completed)?document.getElementById('completed'):document.getElementById('todo');

	var item = document.createElement('li');
	item.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeSVG;
	//Add click event for removing the item
	remove.addEventListener('click', removeItem);

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeSVG;
	//Add click event for completing the item
	complete.addEventListener('click', completeItem);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);
	list.insertBefore(item,list.childNodes[0]);
}

