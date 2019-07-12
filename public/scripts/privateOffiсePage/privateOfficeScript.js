/** прием имени активного пользователя
 * getFromServer() находится в "scripts/serverLibrary.js"
 */
;const ACTIVE_USER = JSON.parse(getFromServer('activeUser'));
/**
 * если нет активного пользователя - вернуться на welcomePage
 * goTo() находится в "scripts/systemLibrary.js"
 */
if (!ACTIVE_USER){goTo('index.html');}

/** Обнуляем объект playlist на "сервере"*/
overwriteToServer('playlist', JSON.stringify(null));

/** Прием глобальных данных данных (объект БД музыки и объект пользователей)
 * getFromServer() находится в "scripts/serverLibrary.js"
 * */
let musicDataBase = JSON.parse(getFromServer('musicDataBase'));
let users = JSON.parse(getFromServer('users'));

/** Определение объекта целей для работы с DOM */
let targetsGlobal = {
	/** Поле для имени пользователя */
	usName : document.getElementById('userName'),
	/** Кнопка релогина */
	reLog : document.getElementById('reLogIn'),
	/** Кнопка вызова рейтингов */
	transRating : document.getElementById('transferRating'),
	/** Кнопка создания пользовательского плейлиста */
	creListWindow : document.getElementById('creatureList'),
	/** Контейнер дефолтных плейлистов */
	defList : document.getElementById('defLists'),
	/** Контейнер пользовательских плейлистов */
	usList : document.getElementById('usLists'),
	/** Шаблон для построения списка плейлистов */
	listsTemplate: document.getElementById('listsTemplate')
};

/** Построение DOM */
targetsGlobal.usName.innerText = ACTIVE_USER;
targetsGlobal.defList.innerHTML = getLists();
targetsGlobal.usList.innerHTML = getLists(ACTIVE_USER);


/** Расстановка слушателей событий */
targetsGlobal.reLog.addEventListener('click', () => {
	/** goTo() находится в "scripts/systemLibrary.js" */
	goTo('index.html');
});
targetsGlobal.transRating.addEventListener('click', () => {
	/** goTo() находится в "scripts/systemLibrary.js" */
	goTo('ratingPage.html', true);
});
/**
 * startCreateModal() находится в "scripts/privateOffiсePage/createModalLibrary.js"
 * 3 нижних события вызывают построение модального окна
 * окно строится исходя из типа события:
 * create - окно для построения плейлиста с нуля,
 * default - окно для управления дефолтным плей-литом
 * user - окно для управления плей-литом пользователя
 * вызываем startCreateModal с двумя аргументами: 1-й - событие, 2-й - название плейлиста
 */
targetsGlobal.creListWindow.addEventListener('click', () => {
	startCreateModal('create', '');
});
targetsGlobal.defList.addEventListener('click', ev => {
	/** если кликнули именно по элементу списка */
	if (ev.target.className === 'content__defaultListsItem' || ev.target.className === 'content__textItem') {
		startCreateModal('default', ev.target.innerText);
	}
});
targetsGlobal.usList.addEventListener('click', ev => {
	/** если кликнули именно по элементу списка */
	if (ev.target.classList[0] === 'content__userListsItem' || ev.target.className === 'content__textItem') {
		startCreateModal('user', ev.target.innerText);
	}
});

/**
 * Функция построения DOM для списка плей-листов по шаблону .
 * @param  {string} arguments[0] - имя активного пользователя.
 * @return {string} Верстка для помещения в контейнер.
 */
function getLists() {
	/**
	 * Объявляем объект данных для функции-шаблонизатора.
	 * (Смотреть "Шаблон для построения списков плейлистов")
	 * @type {{listClass: string, listArray: array[string]}}
	 * listClass - строковая переменная, для формирования названия класса DOM-элемента
	 * listArray - список названий плейлистов
	 */
	let dataListsTemplate = {listClass: '', listArray: []};
	let playLists;
	/**
		* формируем объект данных для шаблона
		* если есть входные параметры, то функция запущена для построения списка плей-листов пользователя
	 */
	if (arguments.length) {
		dataListsTemplate.listClass = 'user';
		playLists = users[ACTIVE_USER].playLists; /** Смотри descriptions.js, объект users*/
	/** иначе строим дефолтный список */
	} else {
		dataListsTemplate.listClass = 'default';
		playLists = JSON.parse(getFromServer('defaultLists')); /** Смотри descriptions.js, объект defaultLists*/
	}
	let index = 0;
	/** формируем массив названий плей-листов */
	for (let key in playLists) {
		dataListsTemplate.listArray[index] = key;
		index++;
	}

	/** Смотри документацию по lodash */
	let template = _.template(targetsGlobal.listsTemplate.innerHTML);
	return template(dataListsTemplate);
}