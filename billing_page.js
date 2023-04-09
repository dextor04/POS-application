document.addEventListener("DOMContentLoaded", () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "index.json", true);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      if (!localStorage.getItem("product")) {
        let setting_value = localStorage.setItem("product", xhr.responseText);
      }
      // it will change the string to the object
      let getting_value = JSON.parse(localStorage.getItem("product"));
      //   show the object on the console
      //   console.log(getting_value);
      let drinks = getting_value.filter((item) => item.type === "drinks");
      let snacks = getting_value.filter((item) => item.type === "snacks");
      console.log(drinks, snacks);
      //   here the 24 representing the number of drinks shown in the webpage
      for (let i = 0; i < drinks.length; i++) {
        // getting the corresponding value from the object and store it in the variable
        let img_name = drinks[i].item_name;
        let img_path = drinks[i].img;
        let img_price = drinks[i].price;
        let img_number = drinks[i].item_no;
        // console.log(img_name);
        // console.log(img_path);
        // now creating an element and attribute in the place we  want
        let ptag = document.createElement("p");
        let imgtag = document.createElement("img");
        ptag.textContent = img_name;
        imgtag.setAttribute("src", img_path);
        // it will select all the .img in the file
        let dri_container = document.querySelectorAll(".img")[i];
        dri_container.appendChild(ptag);
        dri_container.appendChild(imgtag);
      }
      //   here the 13 representing the number of snacks shown in the webpage
      for (let i = 0; i < snacks.length; i++) {
        let snack_list = snacks[i].item_name;
        let sanck_price = snacks[i].price;
        let snack_number = snacks[i].item_no;
        // console.log(snack_name);
        let snack_name = document.createElement("p");
        snack_name.setAttribute("class", "snack-item");
        snack_name.setAttribute("onClick", "snack_run(this)");
        snack_name.textContent = snack_list;
        let snack_container = document.querySelectorAll(".drink")[i];
        snack_container.appendChild(snack_name);
      }
    }
  };
});
// create a function for the drinks item, when we clcik the item it will show the output on the content area
let product = JSON.parse(localStorage.getItem("product"));
let table = document.querySelector("#content table");
let drink_containers = [];
document.querySelectorAll("#images td").forEach((td) => {
  td.addEventListener("click", () => {
    let drink = td.innerText;
    // console.log(drink);
    let drink_price = product.find(function (p) {
      return p.item_name === drink;
    });
    // console.log(drink_price.price);
    let dri_price = parseFloat(drink_price.price);
    console.log(drink);
    console.log(dri_price);
    if (!drink_containers[drink]) {
      drink_containers[drink] = {
        quantity: 1,
        unit_price: dri_price,
      };
    } else {
      drink_containers[drink].quantity++;
    }
    console.log(drink_containers);
    let update_snack = document.getElementById(`${drink}_row`);
    // console.log(update_snack);
    let roundoff = (
      drink_containers[drink].quantity * drink_containers[drink].unit_price
    ).toFixed(2);
    if (update_snack) {
      // here there are already an <tr> is avilable so we don't need to create a new row
      update_snack.innerHTML = ` 
          <td class="table-item styles">${drink}</td>
          <td class="table-quantity styles">${drink_containers[drink].quantity}</td>
          <td class="table-unitprice styles">${drink_containers[drink].unit_price}</td>
          <td class="table-totalprice styles" id="tprice">${roundoff}</td>`;
    } else {
      table.innerHTML += ` 
          <tr id="${drink}_row">
          <td class="table-item styles">${drink}</td>
          <td class="table-quantity styles">${drink_containers[drink].quantity}</td>
          <td class="table-unitprice styles">${drink_containers[drink].unit_price}</td>
          <td class="table-totalprice styles" id="tprice">${roundoff}</td>
          </tr>`;
    }
  });
});
let snack_containers = [];
function snack_run(elem) {
  let snack = elem.innerText;
  let snack_price = product.find(function (p) {
    return p.item_name === snack;
  });
  let snk_price = parseFloat(snack_price.price);
  console.log(snack);
  console.log(snk_price);
  if (!snack_containers[snack]) {
    snack_containers[snack] = {
      quantity: 1,
      unit_price: snk_price,
    };
  } else {
    snack_containers[snack].quantity++;
  }
  console.log(snack_containers);
  let update_snack = document.getElementById(`${snack}_row`);
  // console.log(update_snack);
  let roundoff = (
    snack_containers[snack].quantity * snack_containers[snack].unit_price
  ).toFixed(2);
  if (update_snack) {
    // here there are already an <tr> is avilable so we don't need to create a new row
    update_snack.innerHTML = ` 
        <td class="table-item styles">${snack}</td>
        <td class="table-quantity styles">${snack_containers[snack].quantity}</td>
        <td class="table-unitprice styles">${snack_containers[snack].unit_price}</td>
        <td class="table-totalprice styles" id="tprice">${roundoff}</td>`;
  } else {
    table.innerHTML += ` 
        <tr id="${snack}_row">
        <td class="table-item styles">${snack}</td>
        <td class="table-quantity styles">${snack_containers[snack].quantity}</td>
        <td class="table-unitprice styles">${snack_containers[snack].unit_price}</td>
        <td class="table-totalprice styles" id="tprice">${roundoff}</td>
        </tr>`;
  }
}
// setting the input for the four input field
let numberpad = document.getElementById("numbers");
const input1 = document.querySelector("#input-item-number");
const input2 = document.querySelector("#input-quantity");
const input3 = document.querySelector("#calc-language-in1");
const input4 = document.querySelector("#calc-language-in2");
const inputs = [input1, input2, input3, input4];
let currentinput = input1;
inputs.forEach((input) => {
  input.addEventListener("click", () => {
    currentinput = input;
    console.log(currentinput);
  });
});
numberpad.addEventListener("click", (event) => {
  if (event.target.classList.contains("num-btn")) {
    const value = event.target.textContent;
    currentinput.value += value;
  }
});
// setting the function for the all clear button
let all_clear = document.querySelector("#all-clear-button");
all_clear.addEventListener("click", () => {
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
});
// setting the function for the clear button
let clear = document.querySelector("#clear-button");
clear.addEventListener("click", () => {
  currentinput.value = "";
});
let add_button = document.querySelector("#display-add");
add_button.addEventListener("click", () => {
  let itemnumber = Number(input1.value);
  let quantity = Number(input2.value);
  console.log(itemnumber, quantity);
  let getting_value = JSON.parse(localStorage.getItem("product"));
  // let product = localStorage.getItem("product");
  // console.log(product);
  console.log(getting_value);
  let item_random = getting_value.filter(function (e) {
    return e.item_no === itemnumber;
  });
  let random_item = item_random[0].item_name;
  console.log(random_item);
  // let random_item = item_random.item_name;
  // console.log(random_item);
});
