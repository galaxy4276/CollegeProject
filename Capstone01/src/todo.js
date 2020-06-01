const todo_inputBox = document.getElementById('todo_inputBox');
const pendingContent = document.querySelector('.pending_content');
const finishedContent = document.querySelector('.finished_content');


let toDos = [];
let doneDos = [];

// load functions
const loadPending = () => {
  const pendingItems = localStorage.getItem('PENDING');
  if (pendingItems !== null) {
  }
};

const loadFinished = () => {
  const finishedItems = localStorage.getItem('FINISHIED');
  if (finishedItems !== null) {
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
  const btn = e.target;
  const li = e.target.parentNode;

  pendingContent.removeChild(li);
  const cleanToDos = toDos.filter(item => {
    return toDos.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo();
}


// paint functions
const paintToDo = (text) => {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'X';
  delBtn.addEventListener('click', deleteToDo);
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = 'V';
  // completeBtn.addEventListener('click', completeToDo);
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