/**
 *  Функция для управления событиями модального окна.
 *
 *
 */
;function manageList(type) {
	// объект целей для работы в модальном окне
	let targetsManageList = {
		perfName : document.getElementById('perfNames'),
		trackName : document.getElementById('trackNames'),
		addTrackBut : document.getElementById('addTrack'),
		playButt: document.getElementById('playlistPlaying'),
		delButt:  document.getElementById('playlistDeletion'),
		saveListButt:  document.getElementById('playlistSaving')
	};
	// если не дефолтный лист, то отрисываем список для выбора исполнителей
	if (type !== 'default') {
		targetsManageList.perfName.innerHTML = createTemplate('selectTemplate', 'select', null, musicDataBase);
	}

	// все вызываемые кол-бэк функции в этом блоке
	// находятся в "scripts/privateOffiсePage/modalEventLibrary.js"
	switch (type) {
		case 'user':
			targetsManageList.delButt.addEventListener('click', deletePlaylist);
			targetsManageList.playButt.addEventListener('click', playPlaylist);
		case 'create':
			targetsManageList.addTrackBut.addEventListener('click', addTrackToPlaylist);
			addListenerToPlaylist();
			targetsManageList.saveListButt.addEventListener('click', () => {
				savePlaylist(type);
			});
			break;
		case 'default':
			targetsManageList.playButt.addEventListener('click', playPlaylist);
			break;
	}
}

// функции отрисовки песен по конкретному исполнителю
// запуск происходит из html, прописан в шаблоне listSelectionTemplate
function createSongSelect() {
	document.getElementById('trackNames').innerHTML = createTemplate('selectTemplate', 'select', null, musicDataBase[document.getElementById('perfNames').value].audio);
}

// установка слушателя для обработки кнопок удаления трека сделано в отдельной функции потому,
// что при перезаписи плейлиста "умирает" и ранее поставленный слушатель,
// поэтому при перезаписи плей-листа приходится выставлять его заново
function addListenerToPlaylist() {
	document.getElementById('playlistArea').addEventListener('click', ev => {
		if (ev.target.tagName === 'BUTTON') {ev.target.parentNode.remove();	}
	});
}