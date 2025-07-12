<#-- Dummy editEmployee fallback for template rendering -->
<#assign editEmployee = {
  "id": "", "firstName": "", "lastName": "", "email": "", "department": "", "role": ""
}>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add/Edit Employee</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style/main.css">
</head>
<body>
  <form id="employee-form">
    <h2 id="form-title">${editEmployee.id?has_content?string('Edit', 'Add')} Employee</h2>
    <input type="hidden" id="employee-id" value="${editEmployee.id}">

    <label>First Name <input type="text" id="first-name" value="${editEmployee.firstName}" required></label>
    <label>Last Name <input type="text" id="last-name" value="${editEmployee.lastName}" required></label>
    <label>Email <input type="email" id="email" value="${editEmployee.email}" required></label>
    <label>Department <input type="text" id="department" value="${editEmployee.department}" required></label>
    <label>Role <input type="text" id="role" value="${editEmployee.role}" required></label>

    <button type="submit">Save</button>
    <button type="button" onclick="window.location.href='index.ftl'">Cancel</button>
  </form>

  <script src="js/data.js"></script>
  <script src="js/form.js"></script>
</body>
</html>
