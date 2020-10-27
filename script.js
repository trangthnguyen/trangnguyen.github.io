function shownothing(heading) {
    heading.querySelector(':scope > .hideall').style.display = 'none';
    let content = heading.nextElementSibling;
    if (content != null && content.classList.contains('content')) {
        let contentcontent = content.querySelectorAll(':scope > p, :scope > pre, :scope > ul');
        let contentheadings = content.querySelectorAll(':scope > .heading');
        
        if (contentheadings.length > 0) {
            heading.querySelector(':scope > .showheadings').style.display = 'inline';
            for (let elem of contentheadings) {
                elem.style.display = 'none';
            }
        } else {
            heading.querySelector(':scope > .showheadings').style.display = 'none';
        }
        
        if (contentcontent.length > 0) {
            heading.querySelector(':scope > .showall').style.display = 'inline';
            for (let elem of contentcontent) {
                elem.style.display = 'none';
            }
        } else {
            heading.querySelector(':scope > .showall').style.display = 'none';
        }
    } else {
        heading.querySelector(':scope > .showheadings').style.display = 'none';
        heading.querySelector(':scope > .showall').style.display = 'none';
        
    }
}


function showheading(heading) {
    heading.querySelector(':scope > .showheadings').style.display = 'none';
    heading.querySelector(':scope > .hideall').style.display = 'inline';
    let content = heading.nextElementSibling;
    let contentcontent = content.querySelectorAll(':scope > p, :scope > pre, :scope > ul');
    let contentheadings = content.querySelectorAll(':scope > .heading');

    for (let elem of contentheadings) {
        elem.style.display = 'block';
    }

    if (contentcontent.length > 0) {
        heading.querySelector(':scope > .showall').style.display = 'inline';
        for (let elem of contentcontent) {
            elem.style.display = 'none';
        }
    } else {
        heading.querySelector(':scope > .showall').style.display = 'none';
    }
}


function showall(heading) {
    heading.querySelector(':scope > .showall').style.display = 'none';
    heading.querySelector(':scope > .hideall').style.display = 'inline';
    let content = heading.nextElementSibling;
    let contentcontent = content.querySelectorAll(':scope > p, :scope > pre, :scope > ul');
    let contentheadings = content.querySelectorAll(':scope > .heading');

    if (contentheadings.length > 0) {
        heading.querySelector(':scope > .showheadings').style.display = 'inline';
        for (let elem of contentheadings) {
            elem.style.display = 'block';
        }
    } else {
        heading.querySelector(':scope > .showheadings').style.display = 'none';
    }

    if (contentcontent.length > 0) {
        for (let elem of contentcontent) {
            elem.style.display = 'block';
        }
    }
}


var headings = document.querySelectorAll('.heading');
for (let elem of headings) {
    var node = document.createElement("span");
    var textnode = document.createTextNode("Show headings only");
    node.appendChild(textnode);
    node.classList.add('showheadings');
    elem.appendChild(node)
    
    var node = document.createElement("span");
    var textnode = document.createTextNode("Show all");
    node.appendChild(textnode);
    node.classList.add('showall');
    elem.appendChild(node)
    
    var node = document.createElement("span");
    var textnode = document.createTextNode("Hide all");
    node.appendChild(textnode);
    node.classList.add('hideall');
    elem.appendChild(node)
    
    shownothing(elem);
}


var showheadingss = document.querySelectorAll('.showheadings');
for (let elem of showheadingss) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        let heading = elem.parentElement;
        showheading(heading);
    })
}


var showalls = document.querySelectorAll('.showall');
for (let elem of showalls) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        let heading = elem.parentElement;
        showall(heading)
    })
}


var hidealls = document.querySelectorAll('.hideall');
for (let elem of hidealls) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        let heading = elem.parentElement;
        let content = heading.nextElementSibling;
        let contentheadings = content.querySelectorAll(':scope .heading');
        for (let contentheading of contentheadings) {
            shownothing(contentheading);
        }
        shownothing(heading);
    })
}

