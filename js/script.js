'use strict';
let k = 0;
let getNews = (() => {
    document.getElementById('prev').setAttribute('disabled', 'true');
    fetch('https://content.guardianapis.com/search?api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById('all-pages').innerHTML = data.response.pages;

            content_api(data.response.results);

        })
        .catch(() => {
            document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
            document.getElementById('accordionExample').setAttribute("class", "text-danger");
        });
})();

let nextPage = () => {
    let allPages = document.getElementById('all-pages');
    document.getElementById('prev').removeAttribute('disabled');
    document.getElementById('accordionExample').innerHTML = '';
    let numberPage = document.getElementById('current-page');
    let currentPage = document.getElementById('current-page').value;
    numberPage.setAttribute('value', currentPage);
    currentPage = Number(currentPage);
    currentPage += 1;
    numberPage.value = currentPage;
    if (currentPage == allPages.textContent) {
        document.getElementById('next').setAttribute('disabled', 'true');
    }

    else {
        fetch('https://content.guardianapis.com/search?page=' + currentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                document.getElementById('all-pages').innerHTML = data.response.pages;

                content_api(data.response.results);

            })
            .catch(() => {
                document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                document.getElementById('accordionExample').setAttribute("class", "text-danger");
            });
    }
}

let currPage = (e) => {
    e = e || window.event;
    if (e.keyCode == 13) {
        let numberPage = document.getElementById('current-page');
        let currentPage = document.getElementById('current-page').value;
        numberPage.setAttribute('value', currentPage);
        let allPages = document.getElementById('all-pages').textContent;
        allPages = Number(allPages)
        currentPage = Number(currentPage)
        if (currentPage > 1 || currentPage < allPages || /^[0-9]+$/.test(currentPage)) {
            if (currentPage == 1) {
                document.getElementById('prev').setAttribute('disabled', 'true');
                document.getElementById('next').removeAttribute('disabled');
            }
            else if (currentPage == allPages) {
                document.getElementById('next').setAttribute('disabled', 'true');
                document.getElementById('prev').removeAttribute('disabled');
            }
            else {
                document.getElementById('prev').removeAttribute('disabled');
                document.getElementById('next').removeAttribute('disabled');
            }
            currentPage = Number(currentPage);
            numberPage.value = currentPage;
            document.getElementById('accordionExample').innerHTML = '';
            fetch('https://content.guardianapis.com/search?page=' + currentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    document.getElementById('all-pages').innerHTML = data.response.pages;

                    content_api(data.response.results);
                })
                .catch(() => {
                    document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                    document.getElementById('accordionExample').setAttribute("class", "text-danger");
                });
            return false;
        }
        return true;
    }
}

let previosPage = () => {
    let numberPage = document.getElementById('current-page');
    let currentPage = document.getElementById('current-page').value;
    let allPages = document.getElementById('all-pages');
    if (currentPage == 1) {
    }
    else {
        if (currentPage == allPages.textContent) {
            document.getElementById('next').removeAttribute('disabled');
        }
        if (currentPage == 2) {
            document.getElementById('prev').setAttribute('disabled', 'true');
            numberPage.value = currentPage;
        }
        currentPage = Number(currentPage);
        currentPage -= 1;
        numberPage.value = currentPage;
        document.getElementById('accordionExample').innerHTML = '';
        fetch('https://content.guardianapis.com/search?page=' + currentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.getElementById('all-pages').innerHTML = data.response.pages;

                content_api(data.response.results);
            })
            .catch(() => {
                document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                document.getElementById('accordionExample').setAttribute("class", "text-danger");
            });
    }
}

let templ = (data) => {
    let app = document.getElementById('accordionExample');
    let list = '';
    if (k == 10) {
        k = 0;
    }
    if (data.response.content.blocks.body.length == 0) {
        data.response.content.blocks.body.push({ bodyTextSummary: '' });
    }
    list +=
        `<div class="card ">
                <div class="card-header  alert alert-light"id="headingOne_${k}">
                    <div class="row " data_open="${k}" data-toggle="collapse" data-target="#collapseOne_${k}" aria-expanded="true" aria-controls="collapseOne" onclick="accordion(event.target);">
                        <div class='col-10' data_open="${k}">
                            <div class="point" data_open="${k}">${data.response.content.webTitle}
                            </div>
                        </div>
                        <div data_open="${k}" class="col-2 point d-flex justify-content-end">
                            <img class="icon" data_open="${k}" src="./img/icons.png">
                        </div>
                    </div>
                </div>
                <div id="collapseOne_${k}" class="collapse " aria-labelledby="headingOne_${k}" data_open="${k}" data-parent="#accordionExample">
                    <div class="card-body"> 
                        <p id=cont_${k}>${data.response.content.blocks.body[0].bodyTextSummary}</p> <a class="button-link mb-2" href="${data.response.content.webUrl}" target="_blank">Read more</a> 
                    </div>
                </div>
                </div>`;
    app.innerHTML += list;
    k++;
}

let animateButton = (e) => {
    let reload = document.getElementById('reload');
    reload.textContent = '';
    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    e.target.classList.add('animate');
    setTimeout(() => {
        e.target.classList.remove('animate');
        window.location.reload();
    }, 3000);
};

let classname = document.getElementsByClassName("button");
for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
}

let accordion = (event) => {
    let dataOpen = event.getAttribute('data_open');
    let imgs = document.querySelectorAll('.icon');
    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].attributes.data_open.value == dataOpen) {
            imgs[i].classList.toggle('rotates');
        }
        else {
            imgs[i].classList.remove('rotates');
        }
    }
}
let content_api = (api) => {
    for (let i = 0; i < 10; i++) {
        fetch(api[i].apiUrl + '?show-blocks=body&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                templ(data);
            })
            .catch(
                () => {
                    document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                    document.getElementById('accordionExample').setAttribute("class", "text-danger");
                }
            );

    }
}