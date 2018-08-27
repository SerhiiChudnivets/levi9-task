
getNews();
function getNews() {
    'use strict';
    fetch('https://content.guardianapis.com/search?api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {
            var number_page = document.getElementById('current-page');
            var app = document.getElementById('app');
            var all_pages = document.getElementById('all-pages');
            number_page.innerHTML = 1;
            var list = '<div class="accordion" id="accordionExample">';
            for (var i = 0; i < 10; i++) {
                list +=
                 '<div class="card"> <div class="card-header"id="headingOne_' + i + '"><h5 class="mb-0"> <button class="btn btn-link"type="button" data-toggle="collapse" data-target="#collapseOne_' + i + '" aria-expanded="true" aria-controls="collapseOne">' + data.response.results[i].webTitle + '</button></h5></div><div id="collapseOne_' + i + '" class="collapse " aria-labelledby="headingOne_' + i + '" data-parent="#accordionExample"><div class="card-body"> <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.</p> <a href="' + data.response.results[i].webUrl + '" target="_blank">Read more</a> </div> </div> </div>';
            }
            list += '</div>';
            console.log(data.response.results);
            all_pages.innerHTML = data.response.pages;
            app.innerHTML = list;

        })
        .catch(function () {
            document.getElementById('app').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
            document.getElementById('app').setAttribute("class", "text-danger");
        });
}
function nextPage() {
    var number_page = document.getElementById('current-page');
    var curentPage = document.getElementById('current-page').textContent;
    var all_pages = document.getElementById('all-pages');
    curentPage = Number(curentPage);
    curentPage += 1;
    number_page.innerHTML = curentPage;
    'use strict';
    fetch('https://content.guardianapis.com/search?page=' + curentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var app = document.getElementById('app');
            var list = '<div class="accordion" id="accordionExample">';
            for (var i = 0; i < 10; i++) {
                list += 
                '<div class="card"><div class="card-header" id="headingOne_' + i + '"><h5 class="mb-0"> <button class="btn btn-link"type="button" data-toggle="collapse" data-target="#collapseOne_' + i + '" aria-expanded="true" aria-controls="collapseOne">' + data.response.results[i].webTitle + '</button></h5></div><div id="collapseOne_' + i + '" class="collapse " aria-labelledby="headingOne_' + i + '" data-parent="#accordionExample"><div class="card-body"> <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.</p> <a href="' + data.response.results[i].webUrl + '" target="_blank">Read more</a></div></div> </div>';
            }
            list += '</div>';
            all_pages.innerHTML = data.response.pages;
            app.innerHTML = list;
        })
        .catch(function () {
            document.getElementById('app').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
            document.getElementById('app').setAttribute("class", "text-danger");
        });
}
function previosPage() {
    var number_page = document.getElementById('current-page');
    var curentPage = document.getElementById('current-page').textContent;
    var all_pages = document.getElementById('all-pages');
    if (curentPage == 1) {
    }
    else {
        curentPage = Number(curentPage);
        curentPage -= 1;
        number_page.innerHTML = curentPage;
        'use strict';
        fetch('https://content.guardianapis.com/search?page=' + curentPage + '&api-key=b0e6d696-338f-4eac-abcd-6e28c0cf4e50')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var app = document.getElementById('app');
                var list = '<div class="accordion" id="accordionExample">';
                for (var i = 0; i < 10; i++) {
                    list += 
                    ' <div class="card"> <div class="card-header" id="headingOne_' + i + '"><h5 class="mb-0"> <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne_' + i + '" aria-expanded="true" aria-controls="collapseOne">' + data.response.results[i].webTitle + '</button></h5></div><div id="collapseOne_' + i + '" class="collapse " aria-labelledby="headingOne_' + i + '" data-parent="#accordionExample"><div class="card-body"> <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.</p> <a href="' + data.response.results[i].webUrl + '" target="_blank">Read more</a> </div> </div> </div>';
                }
                list += '</div>';
               
                app.innerHTML = list;
                all_pages.innerHTML = data.response.pages;
            })
            .catch(function () {
                document.getElementById('app').innerHTML = "Sorry, we couldn't find news for you. Please try again later";
                document.getElementById('app').setAttribute("class", "text-danger");
            });
    }
}
