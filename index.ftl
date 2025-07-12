<#assign employees = [
  { "id": "1", "firstName": "Alice", "lastName": "Lee", "email": "alice@example.com", "department": "Engineering", "role": "Developer" },
  { "id": "2", "firstName": "Bob", "lastName": "Kim", "email": "bob@example.com", "department": "Sales", "role": "Manager" }
]>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Employee Directory</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style/main.css">
</head>
<body>
  <header>
    <h1>Employee Directory</h1>
    <input type="text" id="search" placeholder="Search by name or email">
    <button onclick="location.href='form.ftl'">Add Employee</button>
  </header>

  <main id="employee-list">
    <#list employees as emp>
      <div class="employee-card">
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p>${emp.email}</p>
        <p>${emp.department} - ${emp.role}</p>
        <button onclick="editEmployee('${emp.id}')">Edit</button>
        <button onclick="deleteEmployee('${emp.id}')">Delete</button>
      </div>
    </#list>
  </main>

  <footer id="pagination"></footer>

  <script src="js/data.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/render.js"></script>
  <script src="js/filters.js"></script>
</body>
</html>
