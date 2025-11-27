let id = 1;
let nameEr = document.getElementById("nameEr");
let emailEr = document.getElementById("emailEr");
let tableBody = document.getElementById("tableBody");
let users = [];

document.addEventListener("keydown", function(e) {
    document.getElementById("addTable").addEventListener("click", addUser);
    document.addEventListener("keydown", function(e) {
        if (e.key === "Enter") addUser();
    });
})

function addUser() {
    let nameValue = document.getElementById("nameInput").value.trim();
    let emailValue = document.getElementById("emailInput").value.trim();

    if (nameValue.length === 0) {
        nameEr.innerHTML = "Please enter name";
        return;
    } else {
        nameEr.innerHTML = "";
    }

    if (emailValue.length === 0) {
        emailEr.innerHTML = "Please enter email";
        return;
    } else {
        emailEr.innerHTML = "";
    }

    if (!emailValue.endsWith("gmail.com")) {
        emailEr.innerHTML = "Email must end with gmail.com";
        return;
    } else {
        emailEr.innerHTML = "";
    }

    let user = {
        id: id,
        name: nameValue,
        email: emailValue
    };

    let exists = users.some(function (u) {
        return (
            u.name.toLowerCase() === user.name.toLowerCase() &&
            u.email.toLowerCase() === user.email.toLowerCase()
        );
    });

    if (exists) {
        alert("User with this name and email already exists!");
        return;
    }

    users.push(user);

    tableBody.innerHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button style="background-color: #ffc107;" onclick="editRow(this)">Edit</button>
                <button style="background-color: #dc3545; margin-left:10px;" onclick="removeRow(this)">Delete</button>
            </td>
        </tr>
    `;

    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";

    id++;
};

function resetId() {
    let rows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].children[0].textContent = i + 1;
        users[i].id = i + 1;
    }
    id = users.length + 1;
}

function removeRow(btn) {
    let row = btn.parentNode.parentNode;
    let rowId = Number(row.children[0].textContent);
    users = users.filter(function (u) {
        return u.id !== rowId;
    });
    row.remove();
    resetId();
}

function editRow(btn) {
    let nameValue = document.getElementById("nameInput").value.trim();
    let emailValue = document.getElementById("emailInput").value.trim();

    if (nameValue.length > 0 || emailValue.length > 0) {
        alert("Finish editing the fields first")
        return;
    }

    let row = btn.parentNode.parentNode;
    let rowId = Number(row.children[0].textContent);
    let rowName = row.children[1].textContent;
    let rowEmail = row.children[2].textContent;

    document.getElementById("nameInput").value = rowName;
    document.getElementById("emailInput").value = rowEmail;

    users = users.filter(function (u) {
        return u.id !== rowId;
    });

    row.remove();
    resetId();
}