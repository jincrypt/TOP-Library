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
    let title = document.createElement('td');
    title.textContent = book.title;

    let author = document.createElement('td');
    author.textContent = book.author;

    let pages = document.createElement('td');
    pages.textContent = book.pages;

    let read = document.createElement('td');
    read.textContent = book.read;
    
    row.className = "bookList";

    let delete = document.createElement('td')
    let deleteButton = document.createElement('button');
    deleteButton.id = 'delete-button';
    deleteButton.innerHTML = 'Delete'

    deleteButton.addEventListener('onclick', (e) => {
        removeBook(book.id)
    })

    delete.appendChild(deleteButton);
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(read);
    row.appendChild(delete);
    table.appendChild(row);
    
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
    index = 0;
}

addBookToLibrary(new Book('Test1', 'Test2', 777, false,-1));
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
    index++;
    addBookToLibrary(newBook)
}