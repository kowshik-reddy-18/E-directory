function renderEmployees(list = employees) {
  const container = document.getElementById('employee-list');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(emp => {
    const div = document.createElement('div');
    div.className = 'employee-card';
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>${emp.email}</p>
      <p>${emp.department} - ${emp.role}</p>
      <button onclick="editEmployee('${emp.id}')">Edit</button>
      <button onclick="deleteEmployee('${emp.id}')">Delete</button>
    `;
    container.appendChild(div);
  });
}
function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  saveEmployees();
  renderEmployees();
}
function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  localStorage.setItem('editEmployee', JSON.stringify(emp));
  window.location.href = 'form.ftl';
}
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('employee-list')) renderEmployees();
});