var expands = document.querySelectorAll('.expand');
for (let elem of expands) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        elem.parentElement.nextElementSibling.style.display = 'block';
    })
}

var collapses = document.querySelectorAll('.collapse');
for (let elem of collapses) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        elem.parentElement.nextElementSibling.style.display = 'none';
    })
}