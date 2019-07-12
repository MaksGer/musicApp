function deletePlaylist() {
	let playlistName = document.getElementsByClassName('listWindow__description')[0].innerText;
	delete users[ACTIVE_USER].playLists[playlistName];
	// overwriteToServer() находится в "scripts/serverLibrary.js"
	overwriteToServer('users', JSON.stringify(users));
	// goTo() находится в "scripts/systemLibrary.js"
	goTo('privateOffice.html');
}


function playPlaylist() {
	let playlist = getModalPlaylist();
	// getFromServer(), overwriteToServer и newToServer() находятся в "scripts/serverLibrary.js"
	if (getFromServer('playlist')) {
		overwriteToServer('playlist', JSON.stringify(playlist));
	} else {
		newToServer('playlist', JSON.stringify(playlist));
	}
	goTo('playerPage.html');
}


function addTrackToPlaylist() {
	let selectValues = {
		perf: document.getElementById('perfNames').value,
		song: document.getElementById('trackNames').value
	};
	// если заполнены селекты
	if (selectValues.perf !== 'notSelected' && selectValues.song !== '' && selectValues.song !== 'notSelected') {
		let playlist = getModalPlaylist();
		playlist.push(new GetPlaylistItem(selectValues.perf, selectValues.song));
		// createTemplate() находится в "scripts/privateOffiсePage/createModalLibrary.js"
		targetsCreateModal.playlist.innerHTML = createTemplate('playlistTemplate', 'user', null, playlist);
		// addListenerToPlaylist() находится в "scripts/privateOffiсePage/manageListLibrary.js"
		addListenerToPlaylist();
	}
}


function savePlaylist(type) {
	let targetsOfSaving = {
		input: document.getElementById('playlistNameInput'),
		playlist: document.getElementById('playlistArea'),
		description: document.getElementsByClassName('listWindow__description')[0]
	};
	// если лист создается, но еще нет названия
	if (type === 'create' && !targetsOfSaving.input.value) {
		targetsOfSaving.input.focus();
		return;
	}
	// ищем есть ли в плей-листе ожидаемые элементы, если есть - изменяем флаг playlistIsEmpty
	let playlistIsEmpty = true;
	for (let i = 0; i < targetsOfSaving.playlist.childNodes.length; i++) {
		if (targetsOfSaving.playlist.childNodes[i].className === 'listWindow__playlistAreaItem') {
			playlistIsEmpty = false;
			break;
		}
	}
	// если плей-лист не пуст
	if (!playlistIsEmpty) {
		let playlistName = (type === 'create')?targetsOfSaving.input.value:targetsOfSaving.description.innerText;
		users[ACTIVE_USER].playLists[playlistName] = getModalPlaylist();
		// overwriteToServer() находится в "scripts/serverLibrary.js"
		overwriteToServer('users', JSON.stringify(users));
		// goTo() находится в "scripts/systemLibrary.js"
		goTo('privateOffice.html');
	} else {
		targetsOfSaving.playlist.innerHTML = 'The playlist is empty!';
	}
}


function getModalPlaylist() {
	let playlistDOM = document.getElementsByClassName('listWindow__playlistAreaItem');
	let playlist = [];
	for (let i = 0; i < playlistDOM.length; i++) {
		playlist[i] = new GetPlaylistItem(playlistDOM[i].dataset.performer, playlistDOM[i].dataset.song);
	}
	return playlist;
}


function GetPlaylistItem() {
	this.performer = arguments[0];
	this.soundName = arguments[1];
}