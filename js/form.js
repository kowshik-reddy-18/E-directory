const form = document.getElementById('employee-form');
if (form) {
  const idField = document.getElementById('employee-id');
  form.onsubmit = (e) => {
    e.preventDefault();
    const id = idField.value || generateId();
    const employee = {
      id,
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      email: document.getElementById('email').value,
      department: document.getElementById('department').value,
      role: document.getElementById('role').value
    };
    const index = employees.findIndex(e => e.id === id);
    if (index > -1) employees[index] = employee;
    else employees.push(employee);
    saveEmployees();
    window.location.href = 'index.ftl';
  };
}