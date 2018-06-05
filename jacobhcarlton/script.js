const btns = document.querySelectorAll('.nav-btn');

btns.forEach(btn => btn.addEventListener('click', () => {
    let target = btn.id;
    window.location += target;
}));