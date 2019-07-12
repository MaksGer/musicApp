;creatDefaultLists();
creatUsers('aza-za', 'Ivanko', 'barmaley');
newToServer('activeUser', JSON.stringify(null));


function creatDefaultLists() {
	if (newToServer('defaultLists', 'Временно пуст')) {
		let defaultLists = {"Wake up!": null, "For running": null, "Behind the wheel": null, "Relax": null, "To fall asleep": null};
		for (let key in defaultLists) {
			defaultLists[key] = creatPlayList();
		}
		overwriteToServer('defaultLists', JSON.stringify(defaultLists));
	}

	function creatPlayList() {
		let playlist = [];
		for (let i = 0; i < 10; i++) {
			playlist[i] = new CreatNewSong(i);
		}
		return playlist;

		function CreatNewSong(index) {
			this.performer = newSongs[index].performerName;
			this.soundName = newSongs[index].songName;
		}
	}
}

function creatUsers() {
	if (newToServer('users', 'Временно пуст')) {
		let users = {};
		for (let i = 0; i < arguments.length; i++) {
			users[arguments[i]] = new getUser();
		}
		let usersJSON = JSON.stringify(users);
		overwriteToServer('users', usersJSON);
	}

	function getUser() {
		this.password = '11111';
		this.playLists = JSON.parse(getFromServer('defaultLists'));
	}
}
