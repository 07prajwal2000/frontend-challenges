let idx = 0;
const todoList = document.querySelector('.todo-list');
const observer = new IntersectionObserver(async entries => {
  if (!entries[0].isIntersecting) return;
  const totalItems = 10;
  await wait(300);
  for (let i = 0; i < totalItems; i++) {
    createTodoItem(++idx);
  }
}, {
  rootMargin: "100px",
});
const observerDiv = document.querySelector(".observer");
observer.observe(observerDiv);

function createTodoItem(text) {
  const element = document.createElement("div");
  element.classList.add("todo-item");
  element.textContent = text;
  todoList.appendChild(element);
}

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}