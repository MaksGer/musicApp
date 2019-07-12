/**
   *******  ОПИСАНИЕ ОБЪЕКТОВ ********

для работы используются следующие ключи запросов на "сервер":

------------------------------------------------------------|
-----------------------|------------------------------------|
      ключ             |    данные по ключу
-----------------------|------------------------------------|
musicDataBase          |   JSON-объект БД музыки	          |
-----------------------|------------------------------------|
playlist               |   JSON-объект активного плей-листа |
-----------------------|------------------------------------|
defaultLists           |   JSON-объект c описанием дефолтных|
                       |   плей-листов                      |
-----------------------|------------------------------------|
users                  |   JSON-объект всех юзверей         |
-----------------------|------------------------------------|
activeUser             |   строка c именем активного юзверя |
-----------------------|------------------------------------|



*** Описание musicDataBase ***

Предпологается, что при отсылке на "сервер" этого ключа вернется JSON-объект следующего содержания

{
	"название исполнителя" : {
			"info" : "Информация для биографии исполнителя.",
			"defaultInfo" : "Извините, но статья по данному исполнителю временно не доступна.",
			"audio" : {
					"название композиции" : {
							"link" : "ссылка на местоположение файла",
							"counter" : "счетчик проигрываний",
					}
			}
	},
};

"название исполнителя" - это название свойства объекта (первый уровень вложенности).
 (вместо "название исполнителя" будет реальное название)
 Чем больше в базе треков всевозможных исполнителей, тем больше свойств на этом уровне вложенности
 у получаемого нами объекта.

"название композиции" - это название свойства внутреннего объекта audio (третий уровень вложенности).
 Чем больше в базе треков данного исполнителя, тем больше свойств у объекта audio.

 Всего у получаемого объекта 4 уровня вложенности:
 1) множество внутренних объектов "исполнителей";
 2) в каждом объекте исполнителя свойства info, defaultInfo и внутренний объект audio
 3) в объекте audio множество внутренних объектов "треков данного исполнителя"
 4) в каждом объекте "трека исполнителя" свойства link и counter




*** Описание playlist ***

Предпологается, что при отсылке на "сервер" этого ключа вернется JSON-объект следующего содержания

[object[0], object[1], object[2], ...., object[n]]

	где object[n] - объекты следующего содержания

{
	performer: "название исполнителя",
	// его можно спользовать как ключ для доступа к данным musicDataBase на 1-м уровне вложенности

	soundName : "название композиции"
	// его можно спользовать как ключ для доступа к данным musicDataBase на 3-м уровне вложенности
}



*** Описание defaultLists ***

Предпологается, что при отсылке на "сервер" этого ключа вернется JSON-объект следующего содержания

{
		"название плей-листа : [массив, анологичный playlist]"
}



*** Описание users ***

Предпологается, что при отсылке на "сервер" этого ключа вернется JSON-объект следующего содержания

{
	"имя пользователя" : {
	    "password" : строка пароля пользователя,
	    "playLists" : {
	        "название плей-листа пользователя" : [массив объектов аналогичных playlist]
	    }
	}
}




*** Описание activeUser ***

Предпологается, что при отсылке на "сервер" этого ключа вернется строка
                                                       с именем активного пользователя.
 
 
 */