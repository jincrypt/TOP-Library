let myLibrary = [];
let index = 0;

function Book(title, author, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function createRow(book) {
    let table = document.querySelector("table");
    let row = document.createElement('tr');
    row.setAttribute('data-id', book.id);
    row.className = "bookList";
    let title = document.createElement('td');
    title.textContent = book.title;

    let author = document.createElement('td');
    author.textContent = book.author;

    let pages = document.createElement('td');
    pages.textContent = book.pages;

    let readBox = document.createElement('td');
    let readButton = document.createElement('input')
    readButton.setAttribute('type', 'checkbox')
    readButton.checked = book.read;
    readButton.addEventListener('click', (e) => {
        updateReadStatus(book);
    })
    

    let deleteBox = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.id = 'delete-button';
    deleteButton.innerHTML = 'Delete'

    deleteButton.addEventListener('click', (e) => {
        removeBook(book.id)
    })

    deleteBox.appendChild(deleteButton);
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    readBox.appendChild(readButton);
    row.appendChild(readBox);
    row.appendChild(deleteBox);
    table.appendChild(row);
    
}

function updateReadStatus(book) {
    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === book.id) {
            myLibrary[i].read = !myLibrary[i].read;
            break;
        }
    }
}

function removeBook(id) {
    document.querySelector(`[data-id='${id}']`).remove();
}

function displayBooks() {
    clearDisplay();
    myLibrary.forEach(book => {
        createRow(book);
    })
}

function clearDisplay() {
    document.querySelectorAll(".bookList").forEach(row => {
        document.querySelector("table").removeChild(row)
    })
}

addBookToLibrary(new Book('Test1', 'Test2', 777, true,-1));
// Complete submit and cacnel buttons
// next steps on odin project

let form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    buttonSubmit();
    form.reset();
})

function buttonSubmit() {
    let isRead = false;
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    if (document.querySelector('#read').checked) {
        isRead = true;
    }
    
    let newBook = new Book(title, author, pages, isRead, index);
    addBookToLibrary(newBook);
    index++;
}