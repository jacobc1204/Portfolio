const btns = document.querySelectorAll('.nav-btn');

btns.forEach(btn => btn.addEventListener('click', () => {
  const target = btn.id;
  window.location += target;
}));
