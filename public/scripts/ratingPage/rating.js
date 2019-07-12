;if (!JSON.parse(getFromServer('activeUser'))){goTo('index.html');}
let raitingButton = document.getElementById('wrapper-button-list'),
    list = document.getElementById('trackList'),
    showMore = document.getElementById('trackList_btn'),
    text = document.getElementById('wrapper__text');

function creatTracklistArray() {
    let inputJSON = getFromServer('musicDataBase');
    let dataBase = JSON.parse(inputJSON);
    let trackList = [];
    let index = 0;
    for (let personName in dataBase) {
        for (let song in dataBase[personName].audio) {
            trackList[index] = new GetSong(personName, song);
            ++index;
        }
    }
    function GetSong(personName,song) {
        this.personName = personName;
        this.song = song;
        this.count = dataBase[personName].audio[song].counter;
    }
    return trackList;
}

let sortArray = creatTracklistArray();
sortArray.sort(compareNumeric);

function compareNumeric(a, b) {
    return b.count - a.count;
}

function sortTracklist() {
    let templateRes = [];
    for (let i=0; i<=sortArray.length-1; i++) {
        let template = `<li class="trackList-elements">${sortArray[i].personName} - ${sortArray[i].song}<div class="stars-outer"><div class="stars-inner"></div></div></li>`;
        templateRes.push(template);
    }
    return templateRes;
}
let listArray = sortTracklist();

function drawStars() {
    let starsInner = document.querySelectorAll(".stars-inner"),
        percent = 100;
    for (let i=0; i<= starsInner.length-1; i++) {
        const starPercentageRounded = `${Math.round(percent)}%`;
        document.querySelectorAll(".stars-inner")[i].style.width = starPercentageRounded;
        --percent;
    }
}

raitingButton.addEventListener('click', (e) => {
    let click = e.target;
    const top10 = 10,
          top25 = 25,
          top50 = 50,
          top100 = 100;
    let result = "",
        topArray,
        counter = top10,
        interval = 10,
        intForTop25 = 15;
    text.style.display = "none";
    switch (click.dataset.index) {
        case '10':
            showList();
            break;
        case '25':
            showList(top25,intForTop25);
            break;
        case '50':
            showList(top50,interval);
            break;
        case '100':
            showList(top100,interval);
    }
    function touchShowMore(number, interval) {
        counter += interval;
        result = "";
        topArray = listArray.slice(0,counter);
        addListElements();
        showMore.style.display = counter == number ? "none" : "block";
    }

    function showList(number,interval) {
        topArray = listArray.slice(0, top10);
        addListElements();
        showMore.style.display = arguments.length == 0 ? "none" : "block";
        showMore.addEventListener('click',  () => touchShowMore(number, interval));

    }
    function addListElements() {
        for (let i=0; i<=topArray.length-1; i++) {
            result += topArray[i];
        }
        list.innerHTML = result;
        drawStars();
    }
});








