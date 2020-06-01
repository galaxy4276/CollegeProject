const inputBox = document.querySelector('input');
const pendingList = document.querySelector('.pending');
const finishedList = document.querySelector('.finished');


let toDos = [];
let doneDos = [];


const loadPending = () => {
  const pendingItems = localStorage.getItem('PENDING');
  if (pendingItems !== null) {
    const parsedpendingItems = JSON.parse(pendingItems);
    console.log(pendingItems);
    parsedpendingItems.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
};


const loadFinished = () => {
  const finishedItems = localStorage.getItem('FINISHED');
  if (finishedItems !== null) {
    const parsedDoneItems = JSON.parse(finishedItems);
    console.log(finishedItems);
    parsedDoneItems.forEach(toDo => {
      paintDoneToDo(toDo.text);
    });
  }
};


const returnDoneDos = e => {
  const li = e.target.parentNode;
  const beforeValue = li.textContent.split('X');
  const value = beforeValue[0];
  paintToDo(value);
  deleteDoneToDo(e);
};


const saveTodo = () => {
  localStorage.setItem('PENDING', JSON.stringify(toDos));
};


const saveDoneTodo = () => {
  localStorage.setItem('FINISHED', JSON.stringify(doneDos));
};


const deleteToDo = e => {
  const btn = e.traget;
  const li = e.target.parentNode;
  pendingList.removeChild(li);
  const cleanToDos = toDos.filter((toDos) => {
    return toDos.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveTodo();
};


const deleteDoneToDo = e => {
  const li = e.target.parentNode;
  console.dir(li);
  finishedList.removeChild(li);
  const cleanDoneToDos = doneDos.filter(doneDos => {
    return doneDos.id !== parseInt(li.id);
  });
  doneDos = cleanDoneToDos;
  saveDoneTodo();
};


const completeTodo = e => {
  const btn = e.target;
  const li = btn.parentNode;
  const beforeValue = li.textContent.split('X');
  const value = beforeValue[0];
  paintDoneToDo(value);
  deleteToDo(e);
};


const paintDoneToDo = (text) => {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'X';
  delBtn.addEventListener('click', deleteDoneToDo);
  const returnBtn = document.createElement('button');
  returnBtn.innerHTML = 'return';
  returnBtn.addEventListener('click', returnDoneDos);
  const span = document.createElement('span');
  const newId = doneDos.length + 1;
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(returnBtn);
  li.id = newId;
  finishedList.appendChild(li);
  
  const todoObj = {
    text,
    id: newId,
  };

  doneDos.push(todoObj);
  saveDoneTodo();
};


const paintToDo = (text) => {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'X';
  delBtn.addEventListener('click', deleteToDo);
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = 'V';
  completeBtn.addEventListener('click', completeTodo);
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(completeBtn);
  li.id = newId;
  pendingList.appendChild(li);
  
  const todoObj = {
    text,
    id: newId,
  };
  toDos.push(todoObj);
  saveTodo();
};


const handleSubmit = e => { 
  e.preventDefault();
  const currentValue = inputBox.value;
  paintToDo(currentValue);
  inputBox.value = '';
  console.log(toDos);
};


const init = () => {
  loadPending();
  loadFinished();
  inputBox.addEventListener('change', handleSubmit);
};


init();
