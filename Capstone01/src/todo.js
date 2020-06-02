const todo_inputBox = document.getElementById('todo_inputBox');
const pendingContent = document.querySelector('.pending_content');
const finishedContent = document.querySelector('.finished_content');


let toDos = [];
let doneDos = [];

// load functions
const loadPending = () => {
  const pendingItems = localStorage.getItem('PENDING');
  if (pendingItems !== null) {
    const parsedItems = JSON.parse(pendingItems);
    console.log(parsedItems);
    parsedItems.forEach(item => {
      paintToDo(item.text);
    });
  }
};

const loadFinished = () => {
  const finishedItems = localStorage.getItem('FINISHED');
  if (finishedItems !== null) {
    const parsedItems = JSON.parse(finishedItems);
    console.log(parsedItems);
    parsedItems.forEach(item => {
      paintDoneToDo(item.text);
    });
  }
};

// save fucntions
const saveToDo = () => {
  localStorage.setItem('PENDING', JSON.stringify(toDos));
}

const saveDoneToDo = () => {
  localStorage.setItem('FINISHED', JSON.stringify(doneDos));
}

//delete functions
const deleteToDo = e => {
  const li = e.target.parentNode;

  pendingContent.removeChild(li);
  const cleanToDos = toDos.filter(toDos => {
    return toDos.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo();
}

const delDoneToDo = e => {
  const li = e.target.parentNode;
  finishedContent.removeChild(li);
  const cleanDoneDos = doneDos.filter(doneDos => {
    return doneDos.id !== parseInt(li.id);
  });
  doneDos = cleanDoneDos;
  saveDoneToDo();
}


// Attributes Functions
const completeToDo = e => {
  const btn = e.target;
  const li = btn.parentNode;
  const beforeValue = li.textContent.split('X');
  const value = beforeValue[0];
  paintDoneToDo(value);
  deleteToDo(e);
  saveToDo();
}

const returnDoneToDo = e => {
  const li = e.target.parentNode;
  const beforeValue = li.textContent.split('X')[0];
  paintToDo(beforeValue);
  delDoneToDo(e);
  saveDoneToDo();
}   


// paint functions
const paintDoneToDo = (text) => {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'X';
  delBtn.addEventListener('click', delDoneToDo);
  const returnBtn = document.createElement('button');
  returnBtn.innerHTML = 'return';
  returnBtn.addEventListener('click', returnDoneToDo);
  const span = document.createElement('span');
  const newId = doneDos.length + 1;
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(returnBtn);
  li.id = newId;
  finishedContent.appendChild(li);

  const todoObj = {
    text,
    id: newId,
  };

  doneDos.push(todoObj);
  saveDoneToDo();
}


const paintToDo = (text) => {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'X';
  delBtn.addEventListener('click', deleteToDo);
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = 'V';
  completeBtn.addEventListener('click', completeToDo);
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(completeBtn);
  li.id = newId;

  pendingContent.appendChild(li);

  const todoObj = {
    text: text,
    id: newId,
  }

  toDos.push(todoObj);
  saveToDo();
}

// root 
const handleSubmit = e => {
  e.preventDefault();
  const currentValue = todo_inputBox.value;
  paintToDo(currentValue);
  todo_inputBox.value = '';
  console.log(toDos);
}

const todo_init = () => {
  loadPending();
  loadFinished();
  todo_inputBox.addEventListener('change', handleSubmit);
};

todo_init();