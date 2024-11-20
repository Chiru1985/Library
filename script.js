const myLibrary=[];
let id=0;
const cards =document.querySelector(".cards");
const leftbar=document.querySelector(".leftbar");
const dialog=document.querySelector("dialog");
const add=document.querySelector("#add");
const input=document.querySelector("input");
function Book(title,author,pages,readStatus) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStatus=readStatus;    
  }
  
function addBookToLibrary(title,author,pages,readStatus) {
    myLibrary.push(new Book(title,author,pages,readStatus));
    

    
}

function addCardDetails(title, author, pages, readStatus, id) {
   
    const details = [
        `BOOK NAME: ${title.toUpperCase()}`,
        `AUTHOR NAME: ${author.toUpperCase()}`,
        `NO OF PAGES: ${pages}`
    ];

    const cardDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const closeButton = document.createElement("button");
    closeButton.className = "close";
    closeButton.textContent = "X";
    closeButton.id = id;
    closeButton.addEventListener("click", () => closeCard(id));
    // closeButton.addEventListener("mouseover",()=>{card.classList.add("close-card")})
    // closeButton.addEventListener("mouseout",()=>{card.classList.remove("close-card")})
    cardDiv.appendChild(closeButton);
    contentDiv.className = "cardContent";

    details.forEach(detail => {
        const detailDiv = document.createElement("div");
        detailDiv.textContent = detail;
        contentDiv.appendChild(detailDiv);
    });

    cardDiv.appendChild(contentDiv);

    const statusDiv = document.createElement("div");
    statusDiv.textContent = "FINISHED..!?";
    statusDiv.className = "read-status";
    
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "readButton";

    const yesButton = document.createElement("button");
    yesButton.textContent = "YES";
    yesButton.addEventListener("click", () => {
        yesButton.classList.add("completed");
        noButton.classList.remove("completed");
    });

    const noButton = document.createElement("button");
    noButton.textContent = "NO";
    noButton.addEventListener("click", () => {
        yesButton.classList.remove("completed");
        noButton.classList.add("completed");
    });
    if(readStatus){
        yesButton.classList.add("completed");
    }else{
        noButton.classList.add("completed");
    }

    buttonDiv.appendChild(yesButton);
    buttonDiv.appendChild(noButton);
    
    cardDiv.appendChild(statusDiv);
    cardDiv.appendChild(buttonDiv);

    return cardDiv;
}

function closeCard(id) {
    const cardToRemove = document.getElementById(id);
    if (cardToRemove) {
        cardToRemove.parentElement.remove(); 
    }
    myLibrary.splice(id,1);
}

const close=document.querySelector("#close-button");
close.addEventListener("click",()=>{
    dialog.close();
})



function displayBooks(myLibrary){
    cards.textContent=null;
    id=0;
    myLibrary.forEach(e => {
        const div=addCardDetails(e.title,e.author,e.pages,e.readStatus); 
        div.className="card";
        div.id="book"+id++;
        cards.appendChild(div);
    });

    
}

const addBook=document.createElement("button");
addBook.textContent="ADD BOOK";
addBook.className="addBook";
leftbar.appendChild(addBook);
let form=document.querySelector("#form");
addBook.addEventListener("click",()=>{
    dialog.showModal();
    form.reset();
    
})
add.addEventListener("click",()=>{
    
    if(form.checkValidity()){
        addBookToLibrary(
            document.querySelector("#bookName").value,
            document.querySelector("#author").value,
            document.querySelector("#pages").value,
            document.querySelector("#readStatus").checked
        )
        displayBooks(myLibrary);
    }
    
    
})

// function removeBook(id){
//     myLibrary.splice(id,1);
//     displayBooks(myLibrary);
// }