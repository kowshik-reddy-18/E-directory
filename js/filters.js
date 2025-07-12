const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', debounce(e => {
    const query = e.target.value.toLowerCase();
    const filtered = employees.filter(emp =>
      emp.firstName.toLowerCase().includes(query) ||
      emp.lastName.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query)
    );
    renderEmployees(filtered);
  }, 300));
}