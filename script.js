window.onload = () => {
  const updatedTasksList = bringlistFromLocalStorage();
  sendtasksListToDom(updatedTasksList);
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  saveInfo();
})

function saveInfo() {
  const newTask = creatTask();
  if (newTask === undefined) {
      return
  }
  const updatedTasksList = bringlistFromLocalStorage();
  updatedTasksList.push(newTask);
  const tasksLeftTodo = removeExpiredTasks(updatedTasksList)
  console.log(updatedTasksList)
  sendToLocalStorage(tasksLeftTodo);
  sendtasksListToDom(tasksLeftTodo);
}

function creatTask() {
  const taskDetailsEl = document.getElementById("task-details-input");
  const dateEl = document.getElementById("date-input-box");
  const timeEl = document.getElementById("time-input-box");
  if (taskDetailsEl.value === "" || dateEl.value === "" || timeEl.value === "") {
      // alert("All the fields did not complete")
      return
  }

  let task = {
      taskDetails: taskDetailsEl.value,
      date: dateEl.value,
      time: timeEl.value,
  }
  // Make the form fields empty

  taskDetailsEl.value = ""
  dateEl.value = ""
  timeEl.value = ""
  //
  return task;
}

function bringlistFromLocalStorage() {
  const currentListInLocalStorage = localStorage.getItem("taskList");
  currnetListInJs = JSON.parse(currentListInLocalStorage);

  if (currnetListInJs === null) {
      currnetListInJs = []
  }
 
  currnetListInJs = removeExpiredTasks(currnetListInJs)
  
  return currnetListInJs;
}

function sendToLocalStorage(tasksList) {
  localStorage.setItem("taskList", JSON.stringify(tasksList));
}


function sendtasksListToDom(updatedTasksList) {
  notesContainer = document.getElementById("notes-container");
  let arrayOfNotes = [];
  let end = updatedTasksList.length;
  
  for (let i = 0; i < end; i++) {
      const isLast = end - 1 === i;
      arrayOfNotes += `
      <div class="note-bg ${getFadeIn(isLast)}" onmouseenter="seeTheCloseButton(${[i]})" onmouseleave="hideCloseButton(${[i]})"  >
      
          <button class="close-button"  id="close-button${[i]}" onclick="deleteTask(${i})"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>

          <div class="text-holder">
              <p class="task-text bigger-font-for-text-task">${updatedTasksList[i].taskDetails}</p>
          </div>

          <div class="date-holder">
              <p id="date">${updatedTasksList[i].date.split('-').reverse().join('/')}</p>
             
          </div>

          <div class="time-holder">
              <p id="time">${updatedTasksList[i].time}</p>
          </div>

      </div>`
  }
  notesContainer.innerHTML = arrayOfNotes;
}

function deleteTask(index) {
  const updatedTasksList = bringlistFromLocalStorage();
  newTasksListAfterDelete = [];
  for (let i = 0; i < updatedTasksList.length; i++) {
      if (i !== index) {
          newTasksListAfterDelete.push(updatedTasksList[i])
      }
  }
  sendToLocalStorage(newTasksListAfterDelete);
  notesContainer = document.getElementById("notes-container");
  let arrayOfNotes = [];
  let end = newTasksListAfterDelete.length;
  for (let i = 0; i < end; i++) {
      const isLast = end - 1 === i;
      arrayOfNotes += `
      <div class="note-bg" onmouseenter="seeTheCloseButton(${[i]})" onmouseleave="hideCloseButton(${[i]})"  >
      
          <button class="close-button"  id="close-button${[i]}" onclick="deleteTask(${i})"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>

          <div class="text-holder">
              <p class="task-text bigger-font-for-text-task">${newTasksListAfterDelete[i].taskDetails}</p>
          </div>

          <div class="date-holder">
              <p id="date">${newTasksListAfterDelete[i].date.split('-').reverse().join('/')}</p>
             
          </div>

          <div class="time-holder">
              <p id="time">${newTasksListAfterDelete[i].time}</p>
          </div>

      </div>`
  }
  notesContainer.innerHTML = arrayOfNotes;
}

function seeTheCloseButton(index) {
  const closeButton = document.getElementById(`close-button${[index]}`);
  closeButton.classList.add("show-button");
}

function hideCloseButton(index) {
  const closeButton = document.getElementById(`close-button${[index]}`);
  closeButton.classList.remove("show-button");
}


function getFadeIn(isLast) {
  if (isLast) return "fade-in";
  return "";
}

function removeExpiredTasks(array) {
  const tasksAreNotExpired = []
  const now = new Date().getTime()

  for (let i = 0; i < array.length; i++) {
      let taskDeadline = new Date(`${array[i].date} ${array[i].time}`).getTime();
      if (taskDeadline > now) {
          tasksAreNotExpired.push(array[i]);
      }
  }
  
  return tasksAreNotExpired;
  
}




