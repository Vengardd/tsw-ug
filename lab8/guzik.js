window.addEventListener('DOMContentLoaded', (event) => {
    let specButton = document.querySelector('#lista > .spec > button');
    specButton.addEventListener('click', copyAndInsertButton);
});

const copyAndInsertButton = (event) => {
    let eventSource = event.target;
    let newListEl = eventSource.parentNode.cloneNode(false);
    let button = eventSource.cloneNode(true);
    newListEl.innerHTML = "nowy";
    button.addEventListener('click', copyAndInsertButton);
    newListEl.appendChild(button);
    eventSource.parentNode.parentNode.insertBefore(newListEl, eventSource.parentNode.nextSibling);
};