
function filterCharacterByName() {
    const characterName = document.getElementById("characterName");
    document.getElementById("spinner").classList.remove("hide");
    document.getElementById("emptyResult").classList.add("hide");
    document.getElementById("list").classList.add("hide");

    characterName.value ?
        getCharactersByName(characterName, spinner)
        :
        getAllCharacters(spinner);
};

function getCharactersByName(characterName) {
    genericGetCharacter(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${characterName.value}&ts=1&apikey=091d092638b3cf6c58f91a07dda476af&hash=0e5da09a03340c876f9348c4409d3aff`)
};

function getAllCharacters() {
    genericGetCharacter(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=091d092638b3cf6c58f91a07dda476af&hash=0e5da09a03340c876f9348c4409d3aff`)
};

window.onload = function () {
    filterCharacterByName();
}


function genericGetCharacter(path) {
    fetch(path)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            formatResult(myJson);
        })
        .catch(function (error) {
            console.log(error);
        }).finally(function () {
            document.getElementById("spinner").classList.add("hide");
        });
};

function formatResult(myJson) {
    const list = document.getElementById("list");
    const emptyResult = document.getElementById("emptyResult");

    while (list.firstChild) list.removeChild(list.firstChild);

    if (myJson.data.results.length != 0) {

        myJson.data.results.map((character) => {
            const li = document.createElement("li");

            li.addEventListener("click", function (event) {
                event.preventDefault();
                alert(`${character.name} aparece en : ${character.comics.available} comics`)
            });

            li.innerHTML = character.name;
            list.appendChild(li);
        });

        responseResultShow(list, emptyResult)
    }
    else {
        emptyResponseShow(list, emptyResult)
    }
};

function responseResultShow(list, emptyResult) {
    emptyResult.classList.add("hide");
    list.classList.remove("hide");
}

function emptyResponseShow(list, emptyResult) {
    emptyResult.classList.remove("hide");
    list.classList.add("hide");
}
