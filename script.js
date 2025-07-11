
const createTask = (task) =>{
    const id = crypto.randomUUID();
    return {
        id, task
    }
}
let tasks = [
    "Eat",
    "Sleep",
    "Watch movie",
    "Study"
];

tasks = tasks.map(task=>createTask(task));

const container = document.querySelector('.container')
const addTaskBtn = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form')
const addTask = ()=>{
    let newTask = input.value;
    newTask = createTask(newTask);
    tasks.push(newTask);
    displayTasks();
    input.value = '';
}

addTaskBtn.addEventListener("click", ()=>{
    addTask();
})

form.addEventListener("keypress", (event)=>{
    const key = event.key;
    if (key==="Enter"){
        event.preventDefault();

        addTask();
    }
})


const displayTasks = ()=>{
    while (container.hasChildNodes()){
        container.removeChild(container.firstChild);
    }

    for(const task of tasks){
        let taskCard = document.createElement("li");
        const removeBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const taskContainer = document.createElement("div");

        taskCard.textContent = task.task;
        taskCard.classList.add("task");
        taskContainer.appendChild(taskCard);
        taskContainer.appendChild(editBtn);
        taskContainer.classList.add("task-container");

        taskContainer.appendChild(removeBtn);

        container.appendChild(taskContainer);
        removeBtn.textContent = "remove";
        removeBtn.classList.add('remove');
        editBtn.textContent = "edit";
        
        const currID = task.id;


        removeBtn.addEventListener("click", ()=>{
            tasks = tasks.filter(task=>task.id !== currID);
            displayTasks();
        });

        editBtn.addEventListener("click", ()=>{
            newInput = document.createElement('input');
            
            newBtn = document.createElement('button');
            newBtn.textContent = 'click here to update your task';
            const DIV = document.createElement('div');
            DIV.appendChild(newInput);
            DIV.appendChild(newBtn);
            DIV.classList.add('new-div');
            taskContainer.appendChild(DIV);
            newInput.focus();
            newBtn.addEventListener("click", ()=>{
                taskCard.textContent = newInput.value;
                taskContainer.removeChild(DIV);
            })

            // taskContainer.style.backgroundColor = red;
            
        })
        
    }
}

displayTasks();