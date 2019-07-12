/**
 * ФУНКЦИИ работы с серверной частью.
 *
 * Предполагается, что рабочие объекты должны возвращаться из backend-а.
 * Но ввиду того что его у нас нет, данные функционал будет эмулироваться
 * работой с localStorage.
 */

/**
 * Функция получения данных по ключу.
 *
 * Если ключ есть, то вернет JSON по этому ключу, иначе - null.
 *
 * @param  {string} key - ключевое слово объекта (в частности ключ localStorage).
 * @return {JSON} Запрашиваемый объект.
 */
function getFromServer(key) {
	return localStorage.getItem(key);
}

/**
 * Функция записи данных для НОВОГО ключа.
 *
 * Если ключа нет, то запишет value под ключом key и вернет true, иначе - вернет false.
 *
 * @param  {string} key - ключевое слово объекта.
 * @param  {JSON} value - Данные для записи.
 * @return {boolean} Результат записи.
 */
function newToServer(key, value) {
	if (!localStorage.getItem(key)) {
		localStorage.setItem(key, value);
		return true;
	}
	else {return false;}
}

/**
 * Функция перезаписи данных по существующему ключу.
 *
 * Если ключ есть, то перезапишет по этому ключу value и вернет true, иначе - вернет false.
 *
 * @param  {string} key - ключевое слово объекта.
 * @param  {JSON} value - Данные для записи.
 * @return {boolean} Результат записи.
 */
function overwriteToServer(key, value) {
	if (localStorage.getItem(key)) {
		localStorage.setItem(key, value);
		return true;
	}
	else {return false;}
}

/**
 * Техническая функция для очистки localStorage.
 */
function clearLocal() {
	localStorage.clear();
}