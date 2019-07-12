// этот объект технический, нужен только для инициализации БД.
// (по сути после того как разберусь с нодой, наверное перепишу в итоге инициализацию,
// но пока так. чтоб вы могли уже работать)
// По сути в объекте БД разные свойства только те,
// которые описаны в этом техническом объекте. Используем его для заполнения.
;let newSongs = getJSON('scripts/source/init.json');

// создать в локале запись БД треков
creatMusicDataBase(newSongs);


function creatMusicDataBase(trackArray) {
	// в IF-е проверяется ответ newToServer. если true (т.е. объекта не было и он успешно создан),
	// то начинаем заполнять. Иначе консолим, что объект уже есть
	if (newToServer('musicDataBase', 'Временно пуст')) {
		let musicDataBase = {};

		// запускаем перебор служебного массива
		for (let i = 0; i < trackArray.length; i++) {
			// может возникнуть ситуация когда в БД пишем несколько треков одного и того же исполнителя
			// если в musicDataBase уже есть такой исполнитель
			// то нам нужно его не переписать, а дополнить
			if (trackArray[i].performerName in musicDataBase) {
				// по логтке (договоренности) я знаю, что info либо null, либо текст
				// если в объекте исполнителя в БД поле info еще null, а в служебном массиве текст
				if (!musicDataBase[trackArray[i].performerName].info && trackArray[i].info) {
					// запишем в БД info об изполнителе
					musicDataBase[trackArray[i].performerName].info = trackArray[i].info;
				}
				// по логике я знаю, что треки в служебном массиве не будут повторяться,
				// а значит по этому исполнителю добавляю объект трека через конструктор
				musicDataBase[trackArray[i].performerName].audio[trackArray[i].songName] = new CreatNewTrack(trackArray, i);
			// а если такого исполнителя нет, создаем новый объект исполнителя в БД через конструктор
			} else {
				musicDataBase[trackArray[i].performerName] = new CreatNewPerformer(trackArray, i);
			}
		}
		// получившуюся БД в JSON
		let musicDataBaseJSON = JSON.stringify(musicDataBase);
		// и на "сервак" переписать пустую БД
		overwriteToServer('musicDataBase', musicDataBaseJSON);

	}

	// ну что происходит в конструкторах должно быть понятно...
	// данные тянем из глобальной области видимости из служебного массива
	function CreatNewPerformer(trackArray, index) {
		this.info = trackArray[index].info;
		this.defaultInfo = "Извините, но статья по данному исполнителю временно не доступна.";
		this.audio = {};
		this.audio[trackArray[index].songName] = new CreatNewTrack(trackArray, index);
	}

	function CreatNewTrack (trackArray, index) {
		this["link"] = trackArray[index].link;
		this["counter"] = 0;
		let random = randomInteger(0,100);  //добавил рандомный каунт для того чтобы сделать рэйтинг
		this["counter"] = random;

		function randomInteger(min, max) {
			var rand = min + Math.random() * (max + 1 - min);
			rand = Math.floor(rand);
			return rand;
		}
	}
}

