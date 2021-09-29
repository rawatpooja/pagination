       let page = 0;
       let pagedata = 20;
       totalPages = 0
       let dataId = 1;
       let url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';

       function fetchData(url) {
           fetch(url).then(res => res.json()).then(data => getData(data));
       }

       function getData(data) {
           table = '';
           button = '';
           userId = [];
           userName = [];
           userCountry = [];

           totalPages = data.totalPages

           data['data'].map((user) => {
               userId.push(user._id);
               userName.push(user.name);
               userCountry.push(user.airline[0].country);

           })
           for (let i = 0; i < userId.length; i++) {
               table += `<tr>
                    <td>${dataId}</td>
                    <td>${userId[i]}</td>
                    <td>${userName[i]}</td>
                    <td>${userCountry[i]}</td>
                </tr>`
               dataId += 1;
           }
           console.log(data);
           document.getElementById('table').innerHTML = table;
           if (page == 629) {
               button += `<button class="btn-click" id="${629}" onclick="pageNo(id)">${630}</button>`

           } else if (page == 628) {
               for (i = page + 1; i <= page + 2; i++) {
                   if (i == page + 1) {
                       button += `<button class="btn-click" id="${i - 1}" onclick="pageNo(id)">${i}</button>`
                   } else {
                       button += `<button class="btn-click" id="${i - 1}" onclick="pageNo(id)">${i}</button>`
                   }
               }
           } else if (page == 627) {
               for (i = page + 1; i <= page + 3; i++) {
                   if (i == page + 1) {
                       button += `<button class="btn-click" id="${i - 1}" onclick="pageNo(id)">${i}</button>`
                   } else {
                       button += `<button class="btn-click" id="${i - 1}" onclick="pageNo(id)">${i}</button>`
                   }
               }
           } else if (page <= 626) {
               for (i = page + 1; i <= page + 4; i++) {
                   if (i == page + 1) {
                       button += `<button class="btn-click" id="${i - 1}" onclick="pageNo(id)">${i}</button>`
                   } else {
                       button += `<button class="btn-click" id="${i - 1}" onclick="pageNo(id)">${i}</button>`
                   }
               }
           }
           document.getElementById('button').innerHTML = button;
           document.getElementById('page').innerHTML = `<label>Page ${page + 1}</label>`;

       }
       document.getElementById("next").addEventListener("click", () => {
           page += 1;

           url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';
           fetchData(url);
       })

       function nextClick() {
           if (page < 630) {
               page += 1;

               url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';
               fetchData(url);
               // document.getElementsByClassName('btn-click')[2].innerHTML=page;

           }
           //document.getElementById('page').innerHTML=page+1;
       }

       function previousClick() {

           if (page > 0 && page <= 630) {
               page -= 1;
               dataId -= (userName.length + 20);
               // dataId-=20;
               url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';
               console.log(page + "next");
               fetchData(url);
           }
       }

       function fisrtClick() {
           if (page > 0) {
               pagedata = 20;
               dataId = 1;
               page = 0;
               url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';

               fetchData(url);
           }

       }

       function lastClick() {
           page = 629;
           dataId = (628 * 20) + userName.length + 1;
           url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';

           fetchData(url);
       }

       function pageNo(id) {
           if (Number(id) == page) {
               page = Number(id);
               url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';
               console.log(page)
               fetchData(url);
           } else if (Number(id) - page == 1) {
               console.log('1' + Number(id) - page)
               page = Number(id);
               pagedata += 20;
               url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';
               fetchData(url);
           } else if (Number(id) - page == 2) {
               console.log('2' + Number(id) - page)
               page = Number(id);
               pagedata += 40;
               dataId += 20;
               url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';
               fetchData(url);
           } else if (Number(id) - page == 3) {
               console.log('3' + Number(id) - page)
               page = Number(id);
               pagedata += 60;
               dataId += 40;
               url = 'https://api.instantwebtools.net/v1/passenger?page=' + page + '&size=20';
               fetchData(url);
           }
       }

       function tableSearch() {
           table = '';
           filter = document.getElementById('search').value.toUpperCase();
           console.log(filter);
           for (i = 0; i < userName.length; i++) {
               if (userName[i].toUpperCase().indexOf(filter) > -1) {
                   table += `<tr>
                    <td>${i + 1}</td>
                    <td>${userId[i]}</td>
                    <td>${userName[i]}</td>
                    <td>${userCountry[i]}</td>
                </tr>`
               }}
           button = '';
           for (i = page + 1; i <= page + 4; i++) {
               button += `<button class="btn btn-primary btn-sm p-1 m-1" id="${i}" onclick="pageNo(id)">${i + 1}</button>`
           }
           document.getElementById('button').innerHTML = button;
           document.getElementById('table').innerHTML = table;
           // document.getElementById('page').innerHTML = `<label>Page ${page + 1}</label>`;
       }

       fetchData(url);