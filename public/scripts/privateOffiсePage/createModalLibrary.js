/** Глобальный объект целей для построения модального окна */
;targetsCreateModal = {
	title: document.getElementById('listTitle'),           /** 1-я секция модального окна */
	selection: document.getElementById('trackSelection'),  /** 2-я секция модального окна */
	playlist: document.getElementById('playlist'),         /** 3-я секция модального окна */
	control: document.getElementById('control')            /** 4-я секция модального окна */
};

/**
 * Функция построения модального окна.
 *
 * Модальное окно строится 3 способоми, в зависимости от типа события:
 * - событие default - окно строится для управления дефолтными плей-листами;
 * - событие user    - окно строится для управления плей-листами пользователя;
 * - событие create  - создается новый плей-лист пользователя.
 *
 * Данная функция строит соответствующие DOM-элементы и передает управление manageList().
 *
 * В модальном окне предусмотрены 4 секции:
 * 1-я секция - заголовок
 * 2-я секция - панель добавления треков в плей лист
 * 3-я секция - содержимое плейлиста
 * 4-я секция - кнопки управления
 * ( Смотри шаблоны
 * "Шаблон для построения 1-й секции модального окна",
 * "Шаблон для построения 2-й секции модального окна",
 * "Шаблон для построения 3-й секции модального окна",
 * "Шаблон для построения 4-й секции модального окна")
 *
 * @param  {string} type - тип события.
 * @param  {string} namePlaylist - название плей-листа.
 * @return {undefined} Функция ничего не возвращает.
 */
function startCreateModal(type, namePlaylist) {
	/** старт модального окна
	 * (https://arcticlab.ru/arcticmodal/)
	 */
	$(function () {
		$('#exampleModal_1').arcticmodal();
	});
	/** получаем массив треков выбранного плейлиста */
	let playlist = getPlaylist(type, namePlaylist);

	/** Построение DOM */
	targetsCreateModal.title.innerHTML = createTemplate('listTitle1Template', type, namePlaylist);
	targetsCreateModal.selection.innerHTML = createTemplate('listSelectionTemplate', type);
	targetsCreateModal.playlist.innerHTML = createTemplate('playlistTemplate', type, namePlaylist, playlist);
	targetsCreateModal.control.innerHTML = createTemplate('listControlTemplate', type);

	/** manageList() находится в "scripts/privateOffiсePage/manageListLibrary.js" */
	manageList(type);


	/**
	 * Функция возвращает массив треков плей-листа в зависимости от type.
	 *
	 * @param  {string} type - тип события.
	 * @param  {string} namePlaylist - название плей-листа.
	 * @return {array}  Массив треков. ( Смотри descriptions.js, объект playlist )
	 */
	function getPlaylist(type, namePlaylist){
		if (type === 'create') {
			return null; /** При этом событии плей-листа нет*/
		} else if (type === 'default') {
				return JSON.parse(getFromServer('defaultLists'))[namePlaylist]; /** Смотри descriptions.js, объект defaultLists*/
		} else {
				return users[ACTIVE_USER].playLists[namePlaylist]; /** Смотри descriptions.js, объект users*/
		}
	}
}

/**
 * Функция формирования верстки из заданного шаблона.
 *
 * @param  {string} idTemplate   - ID шаблона.
 * @param  {string} type         - тип события.
 * @param  {string} namePlaylist - название плей-листа.
 * @param  {array}  arguments[3] - массив треков.
 * @return {string} Верстка для помещения в контейнер.
 */
function createTemplate(idTemplate, type, namePlaylist) {
	/** Объявляем data-объект для шаблона */
	let dataTemplate = {};
	/** Записываем в data-объект тип события */
	dataTemplate.type = type;
	/** При построении 3-й секции записываем в data-объект название плей-листа и массив треков */
	if (type !== 'create') {
		dataTemplate.name = namePlaylist;
		dataTemplate.playlist = arguments[3];
	}
	/**
	 * дополнительное событие 'select' для построения выпадающих списков модального окна
	 * см. manageListLibrary.js
 	 */
	if (type === 'select') {
		dataTemplate.base = arguments[3];
	}

	/** Смотри документацию по lodash */
	let template = _.template(document.getElementById(idTemplate).innerHTML);
	return template(dataTemplate);
}