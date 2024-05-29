// html elemnts 
let ulContainer = document.querySelectorAll('.navbar .navbar-nav li a');
let containerBox = document.getElementById('containerBox');
let detailsContainer = document.getElementById('detailsContainer');

// class's
class Games {
    constructor() {
        for (let i = 0; i < ulContainer.length; i++) {
            ulContainer[i].addEventListener("click", (e) => {
                let activeLink = document.querySelector('.navbar .navbar-nav li .active');
                activeLink.classList.remove('active');
                e.target.classList.add('active');
                const categ = e.target.getAttribute('category');
                this.getApi(categ);
            })
        }
        this.ui = new Ui();
        
    }

    async getApi(category = "mmorpg") {
        let options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b05047fea7mshc1db9e76e5ec5bfp165d6cjsnaa9ab5f0cb87',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }

        }
        let myHttp = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        let respone = await myHttp.json();
        this.ui.displayGames(respone);
        this.LopOfCards();
        console.log(respone);

    }

    LopOfCards() {
        let numCard = document.querySelectorAll(".inner");
        for (let i = 0; i < numCard.length; i++) {
            numCard[i].addEventListener('click', ()=> {
                let idNum = numCard[i].getAttribute('data-id');
              
                this.showDetails(idNum);
            })
        }


    }

    showDetails(idGame) {
        let details = new GetDetails(idGame);
        document.querySelector('main').classList.add('d-none')
        document.querySelector('.details').classList.remove('d-none')
     }

}

class Ui {

    displayGames(data) {
        let gamesBox = "";

        for (let i = 0; i < data.length; i++) {
            gamesBox += `
                
                <div class="col-xl-3 content col-lg-4 col-sm-6 col-12 my-3" ">
                <div class="inner" data-id="${data[i].id}">
                    <div class="card-body ">
                        <figure class="p-2">
                            <img src="${data[i].thumbnail}" class="w-100" alt="">
                        </figure>
                        <figcaption class="p-2">
                            <div class="d-flex justify-content-between ">
                                <span class="mt-1 ">${data[i].title}</span>
                                <p class="">free</p>
                            </div>
                            <p class="text-center mb-5 opacity-50">${data[i].short_description}</p>
                        </figcaption>
                    </div>
                    <div class="card-footer d-flex fixed-bottom   justify-content-between  align-items-center">
                        <p class="ms-2 ">${data[i].genre}</p>
                        <P class="me-2">${data[i].platform}</P>
                    </div>
                </div>
            </div>
                
                `

        }

        containerBox.innerHTML = gamesBox;


    }



    displayDetails(data) {
        
           const gameDetails = `
                <div class="row ">
                <div class="col-xl-4 col-lg-5 ">
                    <img src="${data.thumbnail}" alt="photo">
                </div>
                <div class="col-xl-8 col-lg-7  details-card">
                    <h4>Title : ${data.title}</h4>
                    <p>Category: <span>ARPG</span> </p>
                    <p>platform: <span>${data.platform}</span> </p>
                    <p>status: <span>${data.status}</span></p>
                    <p>${data.short_description}</p>
                        <a class="btn btn-primary" target="_blank" href="${data.game_url}">Show Game</a>
                </div>
            </div>

                `
  
        document.getElementById('detailsContainer').innerHTML = gameDetails;
    }





}

class GetDetails {
    constructor(id) {
        document.getElementById('close').addEventListener('click',function(){
            document.querySelector('main').classList.remove('d-none')
            document.querySelector('.details').classList.add('d-none')
        })
        this.ui = new Ui();
        this.getDetailsApi(id);
    }

   async getDetailsApi(id) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b05047fea7mshc1db9e76e5ec5bfp165d6cjsnaa9ab5f0cb87',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        let myHttp = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options)
        let respone = await myHttp.json();
        this.ui.displayDetails(respone);
        console.log(respone);
      
    }
}
// app var
let hady = new Games();
async function test() {
    await hady.getApi()
}

test();


