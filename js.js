"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("Ready");
  get();
}

//getting data and initiate show function
function get() {
  fetch("https://todolist-4793.restdb.io/rest/tasks", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8110ddcac6621685acbc69",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(showTask);
      //   document.querySelector(".fullscreen").remove();
    });
}
//displays car database on page
function showTask(task) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = task.title.toUpperCase();
  clone.querySelector("p").textContent = task.description.toUpperCase();
  clone.querySelector("h2").textContent = task.hint;
  clone.querySelector("h3").textContent = task.goal;

  clone.querySelector("article").dataset.id = task.id;
  clone.querySelector(".remove").addEventListener("click", e => {
    e.target.parentElement.remove();
    remove(task._id);
  });
  document.querySelector("main").appendChild(clone);
}

//removes item(car) from database and show on site
function remove(id) {
  fetch("https://todolist-4793.restdb.io/rest/tasks/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8110ddcac6621685acbc69",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}
//posting new car from filled form
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  form.elements.submit.disabled = true;
  e.preventDefault();
  console.log("Submitted");
  const payload = {
    title: form.elements.title.value,
    description: form.elements.description.value,
    hint: form.elements.hint.value,
    goal: form.elements.goal.value
  };
  console.log(payload);
  post(payload);
});
//validity title
form.elements.title.addEventListener("blur", k => {
  if (form.elements.title.checkValidity()) {
    document.querySelector("#title").style.boxShadow =
      "1px 2px rgb(99, 145, 68)";
  } else {
    document.querySelector("#title").style.boxShadow =
      "2px 4px rgb(148, 63, 63)";
  }
});
//validity description

// form.elements.title.addEventListener("focus", e => {
//   if (form.elements.title.focus()) {
//     document.querySelector("#title").style.border = "10px solid #cdcdcd";
//   }
// });

//when blur,then change validity
form.elements.description.addEventListener("blur", k => {
  if (form.elements.description.checkValidity()) {
    document.querySelector("#description").style.boxShadow =
      "1px 2px rgb(99, 145, 68)";
  } else {
    document.querySelector("#description").style.boxShadow =
      "2px 4px rgb(148, 63, 63)";
  }
});
//valididty hint
form.elements.hint.addEventListener("blur", k => {
  if (form.elements.hint.checkValidity()) {
    document.querySelector("#hint").style.boxShadow =
      "1px 2px rgb(99, 145, 68)";
  } else {
    document.querySelector("#hint").style.boxShadow =
      "2px 4px rgb(148, 63, 63)";
  }
});
//validity for goal
form.elements.goal.addEventListener("blur", k => {
  if (form.elements.goal.checkValidity()) {
    document.querySelector("#goal").style.boxShadow =
      "1px 2px rgb(99, 145, 68)";
  } else {
    document.querySelector("#goal").style.boxShadow =
      "2px 4px rgb(148, 63, 63)";
  }
});

//posting to database
function post(newTask) {
  fetch("https://todolist-4793.restdb.io/rest/tasks", {
    method: "post",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8110ddcac6621685acbc69",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      //IMPORTANT! enables button when the data was
      //  POSTED(yeah,right here)
      form.elements.submit.disabled = false;
      showTask(data);
    });
}
