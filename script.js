function addheadingindex(heading, index) {
    var headingindex = document.createElement('span');
    headingindex.classList.add('headingindex');
    headingindex.textContent = index + ' ';
    heading.querySelector('span').prepend(headingindex);
}


function findindex(content) {
    var headingnode = content.previousElementSibling;
    if (headingnode.classList.contains('heading')) {
        return headingnode.querySelector('.headingindex').textContent.replace(' ', '');
    } else {
        return '';
    }
}


function addarrow(heading) {
    var content = heading.nextElementSibling;
    if (content != null && content.classList.contains('content')) {
        var arrowup = document.createElement('BUTTON');
        arrowup.classList.add('arrowup');
        arrowup.innerHTML = "&#8593;";
        heading.querySelector('span').appendChild(arrowup);
        var arrowdown = document.createElement('BUTTON');
        arrowdown.classList.add('arrowdown');
        arrowdown.innerHTML = "&#8595;";
        heading.querySelector('span').appendChild(arrowdown);
        var showall = document.createElement('span');
        showall.classList.add('showall');
        showall.textContent = "Show all";
        heading.querySelector('span').appendChild(showall);
    }
}


//Adding headingindex and arrows
var allcontents = document.querySelectorAll('.maincontent, .content');
for (let elem of allcontents) {
    var allheadings = elem.querySelectorAll(':scope > .heading');
    if (allheadings.length > 0) {
        for (let i = 0; i < allheadings.length; i++) {
            var heading = allheadings[i];
            var index = i + 1;
            addheadingindex(heading, findindex(elem) + index + '.');
            addarrow(heading);
        }
    }
}


//Adding entry to table of contents
var allheadings = document.querySelectorAll('.heading');
var tableofcontents = document.querySelector('.toc');
for (let elem of allheadings) {
    var entry = document.createElement(elem.tagName);
    entry.classList = elem.classList;
    var link = document.createElement('a');
    var linkcontent = elem.querySelector('span').cloneNode(true);
    linkcontent.id = 'TOC' + linkcontent.id;
    link.appendChild(linkcontent);
    link.href = '#' + elem.querySelector('span').id;
    entry.appendChild(link);
    tableofcontents.appendChild(entry);
}


function showchild(tocheading) {//Function works on a heading in toc tocheading: e.g. <h1>
    //Display the heading in toc
    tocheading.style.display = 'block'; 
    //Display the heading in maincontent
    var headingid = tocheading.querySelector('a').href.split('#')[1]; 
    var heading = document.querySelector('#'+headingid).parentNode; 
    heading.style.display = 'block'; 
    //Dispay arrowup, hide arrowdown of the heading in both toc and maincontent
    if (tocheading.querySelector('.arrowdown') != null) {
        tocheading.querySelector('.arrowdown').style.display = 'none'; 
        tocheading.querySelector('.arrowup').style.display = 'inline';
        heading.querySelector('.arrowdown').style.display = 'none'; 
        heading.querySelector('.arrowup').style.display = 'inline';
    }
    var content = heading.nextElementSibling; //Get content of the heading
    if (content != null && content.classList.contains('content')) {
        content.style.display = 'block';
        //Hide child contents in maincontent
        var childcontents = content.querySelectorAll(':scope > .content');
        if (childcontents.length > 0) {
            for (let elem of childcontents) {
                elem.style.display = 'none';
            }
        }
        var childheadings = content.querySelectorAll(':scope > .heading');
        if (childheadings.length > 0) {
            console.log(childheadings);
            //If there are child headings, display showall of the heading in both toc and maincontent
            tocheading.querySelector('.showall').style.display = 'inline';
            heading.querySelector('.showall').style.display = 'inline';
            for (let elem of childheadings) {
                //Display child headings in maincontent
                elem.style.display = 'block';
                //Display child headings in toc
                var tocchildheadingid = '#TOC' + elem.querySelector('span').id;
                var tocchildheading = document.querySelector(tocchildheadingid).parentElement.parentElement;
                tocchildheading.style.display = 'block';
                //Display arrowdown, display showall, hide arrowup of child headings in both toc and maincontent
                if (tocchildheading.querySelector('.arrowdown') != null) {
                    tocchildheading.querySelector('.arrowdown').style.display = 'inline';
                    tocchildheading.querySelector('.arrowup').style.display = 'none';
                    tocchildheading.querySelector('.showall').style.display = 'inline';
                    elem.querySelector('.arrowdown').style.display = 'inline';
                    elem.querySelector('.arrowup').style.display = 'none';
                    elem.querySelector('.showall').style.display = 'inline';
                }
            }
        } else {
            tocheading.querySelector('.showall').style.display = 'none';
            heading.querySelector('.showall').style.display = 'none';
        }
    }
}


function hidechild(tocheading) {//Function works on a heading in toc tocheading: e.g. <h1>
    //Display the heading in toc
    tocheading.style.display = 'block'; 
    //Display the heading in maincontent
    var headingid = tocheading.querySelector('a').href.split('#')[1]; 
    var heading = document.querySelector('#'+headingid).parentNode; 
    heading.style.display = 'block'; 
    //Dispay arrowdown, display showall, hide arrowup of the heading in both toc and maincontent
    if (tocheading.querySelector('.arrowdown') != null) {
        tocheading.querySelector('.arrowdown').style.display = 'inline'; 
        tocheading.querySelector('.arrowup').style.display = 'none';
        tocheading.querySelector('.showall').style.display = 'inline';
        heading.querySelector('.arrowdown').style.display = 'inline'; 
        heading.querySelector('.arrowup').style.display = 'none';
        heading.querySelector('.showall').style.display = 'inline';
    }
    var content = heading.nextElementSibling; //Get content of the heading
    if (content != null && content.classList.contains('content')) {
        //Hide child contents and child headings in maincontent
        content.style.display = 'none';
        //Hide child headings in toc
        var childheadings = content.querySelectorAll(':scope .heading');
        if (childheadings.length > 0) {
            for (let elem of childheadings) {
                var tocchildheadingid = '#TOC' + elem.querySelector('span').id;
                var tocchildheading = document.querySelector(tocchildheadingid).parentElement.parentElement;
                tocchildheading.style.display = 'none';
            }
        }
    }
}


function showall(tocheading) {//Function works on a heading in toc tocheading: e.g. <h1>
    //Display the heading in toc
    tocheading.style.display = 'block'; 
    //Display the heading in maincontent
    var headingid = tocheading.querySelector('a').href.split('#')[1]; 
    var heading = document.querySelector('#'+headingid).parentNode; 
    heading.style.display = 'block'; 
    //Dispay arrowup, hide showall, hide arrowdown of the heading
    if (tocheading.querySelector('.arrowdown') != null) {
        tocheading.querySelector('.arrowdown').style.display = 'none'; 
        tocheading.querySelector('.arrowup').style.display = 'inline';
        tocheading.querySelector('.showall').style.display = 'none';
        heading.querySelector('.arrowdown').style.display = 'none'; 
        heading.querySelector('.arrowup').style.display = 'inline';
        heading.querySelector('.showall').style.display = 'none';
    }
    var content = heading.nextElementSibling; //Get content of the heading
    if (content != null && content.classList.contains('content')) {
        content.style.display = 'block';
        //Display all levels of child contents and child headings in maincontent
        var childcontents = content.querySelectorAll('.heading, .content');
        if (childcontents.length > 0) {
            for (let elem of childcontents) {
                elem.style.display = 'block';
            }
        }
        var childheadings = content.querySelectorAll(':scope .heading');
        if (childheadings.length > 0) {
            for (let elem of childheadings) {
                //Display all levels of child headings in toc
                var tocchildheadingid = '#TOC' + elem.querySelector('span').id;
                var tocchildheading = document.querySelector(tocchildheadingid).parentElement.parentElement;
                tocchildheading.style.display = 'block';
                //Hide arrowdown, hide showall, hide arrowup all all levels of child headings in both toc and maincontent
                if (tocchildheading.querySelector('.arrowdown') != null) {
                    tocchildheading.querySelector('.arrowdown').style.display = 'none';
                    tocchildheading.querySelector('.arrowup').style.display = 'inline';
                    tocchildheading.querySelector('.showall').style.display = 'none';
                    elem.querySelector('.arrowdown').style.display = 'none';
                    elem.querySelector('.arrowup').style.display = 'inline';
                    elem.querySelector('.showall').style.display = 'none';
                }
            }
        }
    }
}


var h1s = document.querySelectorAll('.toc h1');
for (let elem of h1s) {
    hidechild(elem);
}

var tocarrowdowns = document.querySelectorAll('.toc .arrowdown');
for (let elem of tocarrowdowns) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        var tocheading = elem.parentElement.parentElement.parentElement;
        showchild(tocheading);
    })
}

var tocarrowups = document.querySelectorAll('.toc .arrowup');
for (let elem of tocarrowups) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        var tocheading = elem.parentElement.parentElement.parentElement;
        hidechild(tocheading);
    })
}

var tocshowalls = document.querySelectorAll('.toc .showall');
for (let elem of tocshowalls) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        var tocheading = elem.parentElement.parentElement.parentElement;
        showall(tocheading);
    })
}

var arrowdowns = document.querySelectorAll('.maincontent .arrowdown');
for (let elem of arrowdowns) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        var tocheadingid = '#TOC' + elem.parentElement.id;
        var tocheading = document.querySelector(tocheadingid).parentElement.parentElement;
        showchild(tocheading);
    })
}

var arrowups = document.querySelectorAll('.maincontent .arrowup');
for (let elem of arrowups) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        var tocheadingid = '#TOC' + elem.parentElement.id;
        var tocheading = document.querySelector(tocheadingid).parentElement.parentElement;
        hidechild(tocheading);
    })
}

var showalls = document.querySelectorAll('.maincontent .showall');
for (let elem of showalls) {
    elem.addEventListener('click', function(e) {
        e.stopPropagation();
        var tocheadingid = '#TOC' + elem.parentElement.id;
        var tocheading = document.querySelector(tocheadingid).parentElement.parentElement;
        showall(tocheading);
    })
}

var menubutton = document.querySelector('#menubutton button');
var menu = document.querySelector('#menu');
menubutton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (menu.style.display == 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
})
