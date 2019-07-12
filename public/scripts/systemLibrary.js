/**
 * Функция перехода на страницу (вызывается с одним или двумя аргументами).
 *
 * 1-й параметр - обязательный.
 * 2-й параметр - опциональный (boolean)
 *
 * @param {string} target - Путь назначения.
 */
;function goTo(target) {
	/** Если опциональный параметр true - открываем в отдельной вкладке*/
	if (arguments[1]) {
		window.open(target);
	} else {
		location.href = target;
	}
}

/**
 * Функция получения объекта из ресурсного JSON-файла.
 *
 * @param {string} target - Путь к файлу.
 * @return {object} Запрашиваемый объект.
 */
function getJSON(target) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', target, false);
	xhr.send();

	if (xhr.status != 200) {
		return null;
	} else {
		return JSON.parse(xhr.responseText);
	}
}