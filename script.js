const totalPriceElement = document.getElementById("totalPrice");
const parentListElement = document.getElementById("list")

let totalPrice = 0;
let cart = [];

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

function refreshUI() {
    totalPriceElement.innerText = `Total Price : $${totalPrice} | Total Items ${cart.length}`;
    parentListElement.innerHTML = "";

    cart.forEach((item, index) => {
        console.log(cart);
        const listElement = document.createElement("li");
        const textNode = document.createTextNode(`${item.name} - $${item.price}`);
        listElement.appendChild(textNode);
        parentListElement.appendChild(listElement);
        listElement.classList.add("list-group-item", "d-flex", "justify-content-between");

        const deleteButton = document.createElement("button");
        const deleteTextNode = document.createTextNode("delete");
        deleteButton.appendChild(deleteTextNode);
        deleteButton.classList.add("btn", "btn-danger");
        listElement.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            cart.splice(index, 1);
            totalPrice -= item.price;
            refreshUI();
        })
    })
}

function addItem(form) {
    const itemName = form.itemName.value
    const itemPrice = form.itemPrice.value

    if (itemPrice === "" || itemName === "") {
        alert("PLEASE PUT All ITEM COMPLETE");
        return false
    } else if (parseInt(itemPrice) === NaN) {
        alert("PLEASE PUT THE CORRECT NUMBER")
    }

    totalPrice += parseInt(itemPrice)
    const item = new Item(itemName, parseInt(itemPrice));
    cart.push(item);

    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cart", cart);


    refreshUI();


    return false;
}