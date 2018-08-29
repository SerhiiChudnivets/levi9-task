'use strict';
var k = 0;
let getNews = (() => {
    document.getElementById('prev').setAttribute('disabled', 'true');
    fetch('https://content.guardianapis.com/search?api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('all-pages').innerHTML = data.response.pages;
            for (var i = 0; i < 10; i++) {
                fetch(data.response.results[i].apiUrl + '?show-blocks=body&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        templ(data);
                    })
                    .catch(
                        function () {
                            document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                            document.getElementById('accordionExample').setAttribute("class", "text-danger");
                        });
            }
        })
        .catch(function () {
            document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
            document.getElementById('accordionExample').setAttribute("class", "text-danger");
        });
})();

let nextPage = () => {
    var all_pages = document.getElementById('all-pages');
    document.getElementById('prev').removeAttribute('disabled');
    document.getElementById('accordionExample').innerHTML = '';
    var number_page = document.getElementById('current-page');
    var curentPage = document.getElementById('current-page').value;
    number_page.setAttribute('value', curentPage);
    curentPage = Number(curentPage);
    curentPage += 1;
    number_page.value = curentPage;
    if (curentPage == all_pages.textContent) {
        document.getElementById('next').setAttribute('disabled', 'true');
    }

    else {
        fetch('https://content.guardianapis.com/search?page=' + curentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for (var i = 0; i < 10; i++) {
                    fetch(data.response.results[i].apiUrl + '?show-blocks=body&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            templ(data);
                        })
                        .catch(function () {
                            document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                            document.getElementById('accordionExample').setAttribute("class", "text-danger");
                        });
                }
            })
            .catch(function () {
                document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                document.getElementById('accordionExample').setAttribute("class", "text-danger");
            });
    }
}

let currPage = (e) => {
    e = e || window.event;
    if (e.keyCode == 13) {
        var number_page = document.getElementById('current-page');
        var curentPage = document.getElementById('current-page').value;
        number_page.setAttribute('value', curentPage);
        var all_pages = document.getElementById('all-pages').textContent;
        all_pages = Number(all_pages)
        curentPage = Number(curentPage)
        if (curentPage > 1 || curentPage < all_pages || /^[0-9]+$/.test(curentPage)) {
            if (curentPage == 1) {
                document.getElementById('prev').setAttribute('disabled', 'true');
                document.getElementById('next').removeAttribute('disabled');
            }
            else if (curentPage == all_pages) {
                document.getElementById('next').setAttribute('disabled', 'true');
                document.getElementById('prev').removeAttribute('disabled');
            }
            else {
                document.getElementById('prev').removeAttribute('disabled');
                document.getElementById('next').removeAttribute('disabled');
            }
            curentPage = Number(curentPage);
            number_page.value = curentPage;
            document.getElementById('accordionExample').innerHTML = '';
            fetch('https://content.guardianapis.com/search?page=' + curentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (var i = 0; i < 10; i++) {
                        fetch(data.response.results[i].apiUrl + '?show-blocks=body&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                templ(data);
                            })
                            .catch(
                                function () {
                                    document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                                    document.getElementById('accordionExample').setAttribute("class", "text-danger");
                                }
                            );
                    }
                })
                .catch(function () {
                    document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                    document.getElementById('accordionExample').setAttribute("class", "text-danger");
                });
            return false;
        }
        return true;
    }
}

let previosPage = () => {
    var number_page = document.getElementById('current-page');
    var curentPage = document.getElementById('current-page').value;
    var all_pages = document.getElementById('all-pages');
    if (curentPage == 1) {
    }
    else {
        if (curentPage == all_pages.textContent) {
            document.getElementById('next').removeAttribute('disabled');
        }
        if (curentPage == 2) {
            document.getElementById('prev').setAttribute('disabled', 'true');
            number_page.value = curentPage;
        }
        curentPage = Number(curentPage);
        curentPage -= 1;
        number_page.value = curentPage;
        document.getElementById('accordionExample').innerHTML = '';
        fetch('https://content.guardianapis.com/search?page=' + curentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for (var i = 0; i < 10; i++) {
                    fetch(data.response.results[i].apiUrl + '?show-blocks=body&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            templ(data);
                        })
                        .catch(
                            function () {
                                document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                                document.getElementById('accordionExample').setAttribute("class", "text-danger");
                            }
                        );
                }
            })
            .catch(function () {
                document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                document.getElementById('accordionExample').setAttribute("class", "text-danger");
            });
    }
}

let templ = (data) => {
    var app = document.getElementById('accordionExample');
    var list = '';
    if (k == 10) {
        k = 0;
    }
    if (data.response.content.blocks.body.length == 0) {
        data.response.content.blocks.body.push({ bodyTextSummary: '' });
    }
    list +=
        `<div class="card ">
                <div class="card-header  alert alert-success"id="headingOne_${k}">
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
                        <p id=cont_${k}>${data.response.content.blocks.body[0].bodyTextSummary}</p> <a href="${data.response.content.webUrl}" target="_blank">Read more</a> 
                    </div>
                </div>
                </div>`;
    app.innerHTML += list;
    k++;
}

var animateButton = function (e) {
    var reload = document.getElementById('reload');
    reload.textContent = '';
    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
        window.location.reload();
    }, 3000);
};

var classname = document.getElementsByClassName("button");
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
}

let accordion = (event) => {
    var data_open = event.getAttribute('data_open');
    var imgs = document.querySelectorAll('.icon');
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].attributes.data_open.value == data_open) {
            imgs[i].classList.toggle('rotates');
        }
        else {
            imgs[i].classList.remove('rotates');
        }
    }
}
