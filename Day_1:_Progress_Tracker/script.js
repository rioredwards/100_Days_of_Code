let elementID = 0;

function createNewListElement() {
  elementID++;
  let newListElement = document.createElement("LI");
  newListElement.classList.add("list_element");
  newListElement.setAttribute(`id`, `element_${elementID}`);
  newListElement.innerHTML = `
    <input
    id="checkbox_${elementID}"
    class="css-checkbox"
    type="checkbox"
    name="entry_${elementID}"
    />
    <label
    for="checkbox_${elementID}"
    name="checkbox_${elementID}_lbl"
    class="css-label lite-green-check"
    ></label>
    <div class="list_box">
        <input class="user_entry" type="text"></input>
    </div>
    <div class="button_container">
        <button id="new_element_btn" onclick="addListElement()"><i class="fa-solid fa-plus"></i></button>
        <button id="delete_element_btn" onclick="deleteListElement(${elementID})"><i class="fa-solid fa-minus"></i></button>
    </div>`;
  return newListElement;
}

function addListElement() {
  let newListElement = createNewListElement();
  document.getElementById("list_section").appendChild(newListElement);
}

function deleteListElement(id) {
  if (true) {
    let removeListElement = document.getElementById(`element_${id}`);
    removeListElement.remove();
  }
}
