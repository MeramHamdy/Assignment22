var selectedRow = null;

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = 'alert alert-${className}';

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
   
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function clearFields(){
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#gender").value = "";
}

document.querySelector("#info-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;

    if(name == "" || email == "" || age == "" || gender == ""){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#info-list");
            const row = document.createElement("tr");
            
          
            row.innerHTML =`
            <td>${name}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td>${gender}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm update">Update</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            
        list.appendChild(row);
        selectedRow = null;
        showAlert("Information Added", "success");
        }
        else{
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = email;
            selectedRow.children[2].textContent = age;
            selectedRow.children[3].textContent = gender;
            selectedRow = null;
            showAlert("Information Edited", "info");
        }

        clearFields();
    }
} );    

document.querySelector("#info-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("update")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#email").value = selectedRow.children[1].textContent;
        document.querySelector("#age").value = selectedRow.children[2].textContent;
        document.querySelector("#gender").value = selectedRow.children[3].textContent;
    }
});
document.querySelector("#info-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("data deleted", "danger");
    }
});