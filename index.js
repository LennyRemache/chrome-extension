// let save = () => {
//     console.log("Button Clicked");
// };
let myLeads = [];
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el")
const delBtn = document.querySelector("#del-btn");
const tabBtn = document.querySelector("#tab-btn");

// takes leads from local storage and renders on screen when reloading page
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
//if (leadsFromLocalStorage !== null) {
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leadArr) {
    let listItems = '';
    leadArr.forEach(lead => {
        // template literals can be broken up into multiple lines, unlike regular strings with "" and '' need \n
        listItems += `
            <li>
                <a href="${lead}" target="_blank">${lead}</a>
            </li>`
    });
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", () => {
    //console.log("Button clicked from addEventListener()");
    myLeads.push(inputEl.value);
    inputEl.value = "";

    // local storage only stores strings so JSON.stringify() converts Array to String
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    // JSON.parse converts String to Array
    //ulEl.innerHTML = JSON.parse(localStorage.getItem("myLeads"));

    render(myLeads);
    //console.log(myLeads);
    //  const listItem = document.createElement("li");
    //  listItem.textContent = inputEl.value;
    //  ulEl.append(listItem);
    //ulEl.innerHTML += `<li><a href="${inputEl.value}">${inputEl.value}</a></li>`
});

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let currLink = tabs[0].url;
        myLeads.push(currLink)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        //console.log(url);
        render(myLeads);
     });
})

delBtn.addEventListener("dblclick", () => {
    localStorage.clear(); // clear ocal storage
    myLeads = []; // clear array of leads
    render(myLeads); // clear the DOM -> document object model
})

/*
    FALSY VALUES:
        false
        0
        ""
        null -> how we as a developer signalize emptiness
        undefined -> how JavaScript signalizes emptiness
        NaN

*/