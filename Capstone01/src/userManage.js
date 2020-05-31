const inputBox = document.getElementById('inputBox');
const drawUser = document.getElementById('draw_user');
const div = document.querySelector('.user_management');

let name;


const btnEvent = (e) => {
  const data = e.target.value;
  name = data;
  saveUserInLocalDB(name);
  drawUserName(name);
};


const validate = () => {
  if (localStorage.getItem('name')) {
    const name = localStorage.getItem('name');
    drawUserName(name);
  }
};


const saveUserInLocalDB = name => {
  localStorage.setItem("name", name);
};


const drawUserName = name => {
  div.removeChild(inputBox);
  return drawUser.innerHTML = `환영합니다. ${name}님`;
};


const userManage_init = () => {
  validate();
  inputBox.addEventListener('change', btnEvent);
  // 1. 이벤트 트리거, 2. 달아줄 이벤트 함수
}


userManage_init();