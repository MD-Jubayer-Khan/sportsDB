
document.addEventListener('DOMContentLoaded', () => {
    displayDefaultData();
});
const displayDefaultData = () => {
    const url = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=';
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.player.slice(0, 12)));
};


const searchPlayers = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.player));
    };

    const showModal = id =>{
        const modalContent = document.getElementById('showModal')
        const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const playerData = data.players[0]
            modalContent.innerHTML = `
            <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">${playerData.strPlayer} Details</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
            <img class="border rounded-pill h-25 w-25" src="${playerData.strThumb || './img.jpg'}" class="card-img-top" alt="Player image">
                <h5 class="card-title">Name: ${playerData.strPlayer}</h5>
                <h6 class="card-title">Nationality: ${playerData.strNationality}</h6>
                <h6 class="card-title">Team: ${playerData.strTeam} ${playerData.strTeam2}</h6>
                <h6 class="card-title">Sports: ${playerData.strSport}</h6>
                <h6 class="card-title">Salary: ${playerData.strWage || 'Negotiable'}</h6>
                <h6 class="card-title">Gender: ${playerData.strGender}</h6>
                <h6 class="card-title">Height: ${playerData.strHeight}</h6>
                <h6 class="card-title">Position: ${playerData.strPosition}</h6>
                <p class="card-text">${playerData.strDescriptionEN ? playerData.strDescriptionEN.slice(0, 90) : 'No description available'}
                </p>                
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
            `
      });
    }

    let playerCount = 0
    const playerList = []
    let isClicked = false
      

    const addToCart = (playerName) =>{
        const totalPlayer = document.getElementById('totalPlayer') 
        const playerNm = document.getElementById('playerName')

        if(playerCount >= 11) {
            alert("You can't add more than 11 players")
            return
        }

        isClicked = true
        playerCount++
        playerList.push(playerName)
        totalPlayer.innerText = playerCount

        let pn = '';
        playerList.forEach(pN => {
            pn += `<h6>${pN}</h6>`;
        });
    
        playerNm.innerHTML = pn;
    }
   

    const displaySearchResult = players => {
        const searchResult = document.getElementById('search-result')

        searchResult.innerHTML = '';
        
        if (players) {
          players.forEach(player => {
            const isNotLink = "https://storage.googleapis.com/support-forums-api/attachment/thread-185132321-4448730924803654493.jpg"

              const div = document.createElement('div');
              div.classList.add('col');
              div.innerHTML = `
                <div class="card h-100 shadow">
                    <img src="${player.strThumb || './img.jpg'}" class="card-img-top" alt="Player image">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${player.strPlayer}</h5>
                        <h6 class="card-title">Nationality: ${player.strNationality}</h6>
                        <h6 class="card-title">Team: ${player.strTeam} ${player.strTeam2}</h6>
                        <h6 class="card-title">Sports: ${player.strSport}</h6>
                        <h6 class="card-title">Salary: ${player.strWage || 'Negotiable'}</h6>
                        <p class="card-text">${player.strDescriptionEN ? player.strDescriptionEN.slice(0, 90) : 'No description available'}
                        </p>
                     <div class="d-flex gap-3">
                        <p>Contact method: </p>
                        <a href="${player.strFacebook? player.strFacebook : isNotLink}" target="_blank" class="text-primary"><i class="fa-brands fa-facebook"></i></a>
                        <a href="${player.strTwitter? player.strTwitter : isNotLink}"  target="_blank" class="text-primary"><i class="fa-brands fa-twitter"></i></a>
                        <a href="${player.strInstagram? player.strInstagram : isNotLink}"target="_blank" class="text-danger"><i class="fa-brands fa-instagram"></i></a>
                        <a href="${player.strWhatsapp? player.strWhatsapp : isNotLink}" target="_blank" class="text-success"><i class="fa-brands fa-whatsapp"></i></a>                          
                    </div>
                    <button onClick="showModal('${player.idPlayer}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    See Details
                    </button>

                    <button onClick="addToCart('${player.strPlayer}')" type="button" class="btn btn-primary">
                    Add to cart
                    </button>
                    </div>
                </div>`;
              searchResult.appendChild(div);
          });
      } else {
          searchResult.innerHTML = '<p class="text-center">No players found</p>';
      }
    }