'use strict';
var k = 0;
let getNews = (() => {
    
    document.getElementById('prev').setAttribute('disabled', 'true');
    fetch('https://content.guardianapis.com/search?api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
        .then( (response)=> {
            return response.json();
        })
        .then( (data) =>{
            document.getElementById('all-pages').innerHTML = data.response.pages;
            for (let i = 0; i < 10; i++) {
                content_api(data.response.results[i].apiUrl);
            }
        })
        .catch( () =>{
            document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
            document.getElementById('accordionExample').setAttribute("class", "text-danger");
        });
})();

let nextPage = () => {
    let all_pages = document.getElementById('all-pages');
    document.getElementById('prev').removeAttribute('disabled');
    document.getElementById('accordionExample').innerHTML = '';
    let number_page = document.getElementById('current-page');
    let currentPage = document.getElementById('current-page').value;
    number_page.setAttribute('value', currentPage);
    currentPage = Number(currentPage);
    currentPage += 1;
    number_page.value = currentPage;
    if (currentPage == all_pages.textContent) {
        document.getElementById('next').setAttribute('disabled', 'true');
    }

    else {
        fetch('https://content.guardianapis.com/search?page=' + currentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then( (response) =>{
                return response.json();
            })
            .then( (data)=> {
                for (let i = 0; i < 10; i++) {
                    content_api(data.response.results[i].apiUrl);
                }
            })
            .catch(()=> {
                document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                document.getElementById('accordionExample').setAttribute("class", "text-danger");
            });
    }
}

let currPage = (e) => {
    e = e || window.event;
    if (e.keyCode == 13) {
        let number_page = document.getElementById('current-page');
        let currentPage = document.getElementById('current-page').value;
        number_page.setAttribute('value', currentPage);
        let all_pages = document.getElementById('all-pages').textContent;
        all_pages = Number(all_pages)
        currentPage = Number(currentPage)
        if (currentPage > 1 || currentPage < all_pages || /^[0-9]+$/.test(currentPage)) {
            if (currentPage == 1) {
                document.getElementById('prev').setAttribute('disabled', 'true');
                document.getElementById('next').removeAttribute('disabled');
            }
            else if (currentPage == all_pages) {
                document.getElementById('next').setAttribute('disabled', 'true');
                document.getElementById('prev').removeAttribute('disabled');
            }
            else {
                document.getElementById('prev').removeAttribute('disabled');
                document.getElementById('next').removeAttribute('disabled');
            }
            currentPage = Number(currentPage);
            number_page.value = currentPage;
            document.getElementById('accordionExample').innerHTML = '';
            fetch('https://content.guardianapis.com/search?page=' + currentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                .then( (response)=> {
                    return response.json();
                })
                .then( (data)=> {
                    for (let i = 0; i < 10; i++) {
                        content_api(data.response.results[i].apiUrl);
                       
                    }
                })
                .catch( ()=> {
                    document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                    document.getElementById('accordionExample').setAttribute("class", "text-danger");
                });
            return false;
        }
        return true;
    }
}

let previosPage = () => {
    let number_page = document.getElementById('current-page');
    let currentPage = document.getElementById('current-page').value;
    let all_pages = document.getElementById('all-pages');
    if (currentPage == 1) {
    }
    else {
        if (currentPage == all_pages.textContent) {
            document.getElementById('next').removeAttribute('disabled');
        }
        if (currentPage == 2) {
            document.getElementById('prev').setAttribute('disabled', 'true');
            number_page.value = currentPage;
        }
        currentPage = Number(currentPage);
        currentPage -= 1;
        number_page.value = currentPage;
        document.getElementById('accordionExample').innerHTML = '';
        fetch('https://content.guardianapis.com/search?page=' + currentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then( (response)=> {
                return response.json();
            })
            .then( (data)=> {
                for (let i = 0; i < 10; i++) {
                    content_api(data.response.results[i].apiUrl);
                }
            })
            .catch(()=> {
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
                        <p id=cont_${k}>${data.response.content.blocks.body[0].bodyTextSummary}</p> <a href="${data.response.content.webUrl}" target="_blank">Read more</a> 
                    </div>
                </div>
                </div>`;
    app.innerHTML += list;
    k++;
}

let animateButton =  (e)=> {
    let reload = document.getElementById('reload');
    reload.textContent = '';
    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    e.target.classList.add('animate');
    setTimeout( ()=> {
        e.target.classList.remove('animate');
        window.location.reload();
    }, 3000);
};

let classname = document.getElementsByClassName("button");
for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
}

let accordion = (event) => {
    let data_open = event.getAttribute('data_open');
    let imgs = document.querySelectorAll('.icon');
    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].attributes.data_open.value == data_open) {
            imgs[i].classList.toggle('rotates');
        }
        else {
            imgs[i].classList.remove('rotates');
        }
    }
}
let content_api = (api)=>{
        fetch(api + '?show-blocks=body&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
                               .then( (response)=> {
                                   return response.json();
                               })
                               .then( (data)=> {
                                   templ(data);
                               })
                               .catch(
                                    ()=> {
                                       document.getElementById('accordionExample').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                                       document.getElementById('accordionExample').setAttribute("class", "text-danger");
                                   }
                               );
       }
