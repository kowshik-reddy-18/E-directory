let employees = employees || [];
function saveEmployees() {
  localStorage.setItem('employees', JSON.stringify(employees));
}