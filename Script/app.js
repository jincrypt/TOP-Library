
let myLibrary = [];
let index = 0;

// Local Storage
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


// Initiate if Local Storage Exists
if (storageAvailable('localStorage')) {
    if (localStorage.getItem('storedLibrary')) {
        let retrievedLibrary = JSON.parse(localStorage.getItem('storedLibrary'));
        myLibrary = [...retrievedLibrary];
        if (myLibrary.length !=  0) {
            displayBooks();
        }
    }
}


function updateStorage() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('storedLibrary', JSON.stringify(myLibrary));
    }
}



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
    myLibrary.splice(id, 1);
    for (let i = id; i < myLibrary.length; i++) {
        myLibrary[i].id = myLibrary[i].id - 1;
    }
    index--;
    displayBooks();
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
    updateStorage();
}

// // Tests
// addBookToLibrary(new Book('Test1', 'Author 1', 777, true, index));
// index++;
// addBookToLibrary(new Book('Test2', 'Author 2', 327, false, index));
// index++;
// addBookToLibrary(new Book('Test3', 'Author 3', 7, true, index));
// index++;