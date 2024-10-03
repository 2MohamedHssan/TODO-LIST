document.querySelector(".header p").innerHTML = new Date().toDateString();
let clear = document.querySelector(".header i");
const ulist = document.querySelector("ul");
let plus = document.querySelector("#add i");
let add = document.querySelector("input");
let list = JSON.parse(localStorage.getItem('tasks')) || [];
const completcircle = "fa fa-check-circle";
const line = "linthrough";

function renderTasks() {
    ulist.innerHTML = ''; 
    list.forEach(task => {
        const li = document.createElement('li');
        const iremove = document.createElement('i');
        iremove.classList.add('fa', 'fa-trash-alt', 'delete');
        
        const p = document.createElement("p");
        p.textContent = task.text;
        
        const icomplete = document.createElement('i');
        icomplete.classList.add('fa-circle','far');
        
        li.append(icomplete);
        li.append(p);
        li.append(iremove);
        ulist.appendChild(li);

        iremove.addEventListener("click", () => {
            removeTask(task.id);
        });
        icomplete.addEventListener("click", () => {
            p.classList.toggle(line);
            icomplete.classList.toggle("fa");
            icomplete.classList.toggle("fa-check-circle");
        });
        p.addEventListener("click", () => {
            p.classList.toggle(line);
            icomplete.classList.toggle("fa");
            icomplete.classList.toggle("fa-check-circle");
        });
    });
}

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text
    };
    list.push(task);
    localStorage.setItem('tasks', JSON.stringify(list));
    renderTasks(); 
}

function removeTask(id) {
    list = list.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(list)); 
    renderTasks();
}

renderTasks();

add.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        plus.click();
    }
});

plus.addEventListener("click", () => {
    const text = add.value.trim();
    if (text !== '') {
        addTask(text);
        add.value = '';
    }
});

clear.addEventListener("click", function () {
    this.classList.add("cl");
    localStorage.clear();
    renderTasks();
});
