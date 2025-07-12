function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}