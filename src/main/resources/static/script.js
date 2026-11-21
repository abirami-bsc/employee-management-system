async function loadEmployees() {

    const response = await fetch("/employees");

    const employees = await response.json();

   document.getElementById("employeeCount").textContent =
    employees.length;

    const employeeList = document.getElementById("employeeList");

    employeeList.innerHTML = "";
    const departmentFilter = document.getElementById("departmentFilter");

const departments = [...new Set(
    employees.map(employee => employee.department)
)];

departmentFilter.innerHTML = '<option value="">All Departments</option>';

departments.forEach(department => {
    departmentFilter.innerHTML += `
        <option value="${department}">${department}</option>
    `;
});

    employees.forEach(employee => {

        employeeList.innerHTML += `
    <div data-department="${employee.department}">
                <h3>${employee.name}</h3>
                <p>Email: ${employee.email}</p>
                <p>Phone: ${employee.phone}</p>
                <p>Department: ${employee.department}</p>
                <p>Salary: ₹${employee.salary}</p>

               <button class="edit-button" onclick="editEmployee(${employee.id})">
    Edit
</button>

<button class="delete-button" onclick="deleteEmployee(${employee.id})">
    Delete
</button>
            </div>

            <hr>
        `;
    });
}


document.getElementById("employeeForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const employee = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        salary: Number(document.getElementById("salary").value)

    };
    
// Phone validation
if (!/^\d{10}$/.test(employee.phone)) {
    alert("Phone number must be exactly 10 digits.");
    return;
}

// Salary validation
if (employee.salary <= 0 || isNaN(employee.salary)) {
    alert("Salary must be greater than 0.");
    return;
}
    const editId = document.getElementById("employeeForm").dataset.editId;

    let response;

    if (editId) {

        response = await fetch(`/employees/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

    } else {

        response = await fetch("/employees", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

    }

    if (response.ok) {

        if (editId) {
            alert("Employee updated successfully!");
        } else {
            alert("Employee added successfully!");
        }

        document.getElementById("employeeForm").reset();

        delete document.getElementById("employeeForm").dataset.editId;

        document.getElementById("submitButton").textContent = "Add Employee";

        loadEmployees();

  } else {

    if (response.status === 409) {
        alert("Email already exists. Please use a different email.");
    } else {
        alert("Operation failed.");
    }

}
});


async function deleteEmployee(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(`/employees/${id}`, {

        method: "DELETE"

    });

    if (response.ok) {

        alert("Employee deleted successfully!");

        loadEmployees();

    } else {

        alert("Failed to delete employee.");

    }
}


async function editEmployee(id) {

    const response = await fetch(`/employees/${id}`);

    const employee = await response.json();

    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("phone").value = employee.phone;
    document.getElementById("department").value = employee.department;
    document.getElementById("salary").value = employee.salary;

    document.getElementById("employeeForm").dataset.editId = id;
    document.getElementById("submitButton").textContent = "Update Employee";
    document.getElementById("employeeForm").scrollIntoView({
    behavior: "smooth"
});

}
function cancelEdit() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("department").value = "";
    document.getElementById("salary").value = "";

    delete document.getElementById("employeeForm").dataset.editId;
    document.getElementById("submitButton").textContent = "Add Employee";

}

function filterEmployees() {

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const selectedDepartment =
        document.getElementById("departmentFilter").value.toLowerCase();

    const employees =
        document.querySelectorAll("#employeeList > div[data-department]");

    let visibleCount = 0;

    employees.forEach(employee => {

        const employeeName =
            employee.querySelector("h3").textContent.toLowerCase();

        const employeeDepartment =
            employee.dataset.department.toLowerCase();

        const matchesName =
            employeeName.includes(searchText);

        const matchesDepartment =
            selectedDepartment === "" ||
            employeeDepartment === selectedDepartment;

        if (matchesName && matchesDepartment) {

            employee.style.display = "block";
            visibleCount++;

        } else {

            employee.style.display = "none";

        }
    });


    // Remove old message
    const oldMessage =
        document.getElementById("noResultsMessage");

    if (oldMessage) {
        oldMessage.remove();
    }


    // Show message when no employee matches
    if (visibleCount === 0 && employees.length > 0) {

        const message = document.createElement("div");

        message.id = "noResultsMessage";

        message.textContent = "No employees found.";

        document.getElementById("employeeList")
            .appendChild(message);
    }
}

document.getElementById("searchInput").addEventListener("input", filterEmployees);

document.getElementById("departmentFilter").addEventListener("change", filterEmployees);

function clearSearch() {

    document.getElementById("searchInput").value = "";

    document.getElementById("departmentFilter").value = "";

    filterEmployees();
}