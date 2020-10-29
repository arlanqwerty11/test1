$(document).ready(function(){
	const filterContainer = document.querySelector(".portfolio__filter"),
		  filterBtns = filterContainer.children,
		  totalFilterBtn = filterBtns.length;
	      PortfolioItems = document.querySelector(".portfolio__main").children;
		  totalPortfolioItems = PortfolioItems.length;

	for(let i = 0; i<totalFilterBtn; i++){
		filterBtns[i].addEventListener("click", function(){
			filterContainer.querySelector(".active").classList.remove("active");
			this.classList.add("active");                         
			const filterItemValue = this.getAttribute("data-filter");
			for(let k = 0; k<totalPortfolioItems; k++){
				const mainItemValue = PortfolioItems[k].getAttribute("data-category");
				if(filterItemValue === mainItemValue){
					PortfolioItems[k].classList.remove("hide");
					PortfolioItems[k].classList.add("show");

				}
				else{
					PortfolioItems[k].classList.remove("show");
					PortfolioItems[k].classList.add("hide");
				}
				if(filterItemValue === "all"){
					PortfolioItems[k].classList.remove("hide");
					PortfolioItems[k].classList.add("show");
				}
			}
		});
	}

	const lightbox = document.querySelector(".lightbox"),
		  lightboxImg = lightbox.querySelector("img"),
		  lightboxTextCaption = lightbox.querySelector(".lightbox__caption"),
		  lightboxCounter = lightbox.querySelector(".lightbox__counter"),
		  lightboxClose = lightbox.querySelector(".close-lightbox");
	let itemIndex = 0;
	
	for(let i = 0; i<totalPortfolioItems; i++){
		PortfolioItems[i].addEventListener("click", function(){
			itemIndex = i;
			changeItem();
		});
	}
	$(".next").click(function(){
		if(itemIndex == totalPortfolioItems - 1){
			itemIndex = 0;
		}
		else{
			itemIndex++;
		}
		changeItem();
	});

	$(".prev").click(function(){
		if(itemIndex == 0){
			itemIndex = totalPortfolioItems-1;
		}
		else{
			itemIndex--;
		}
		changeItem();
	});

	$(".main__icon").click(function(){
		$(".lightbox").removeClass("disn");
		$(".lightbox").addClass("disbl");

	})

	$(".close-lightbox").click(function(){
		$(".lightbox").addClass("disn");
		$(".lightbox").removeClass("disbl");

	});

	function changeItem(){
		imgSrc = PortfolioItems[itemIndex].querySelector(".main__img img").getAttribute("src");
		lightboxImg.src = imgSrc;
		lightboxTextCaption.innerHTML = PortfolioItems[itemIndex].querySelector("h4").innerHTML;
		lightboxCounter.innerHTML = (itemIndex+1) +  " of " + totalPortfolioItems;
	}

	

	let social__sector = document.querySelector(".social__link");
	let social__sectorItems = social__sector.children;
	let totalSocial__sectorItem = social__sectorItems.length;
	let warningsector = document.querySelector(".warning__social")
	for(let t = 0; t<totalSocial__sectorItem; t++){
		if(social__sectorItems[t] !== social__sectorItems[2]){
			social__sectorItems[t].addEventListener("click", function(){
				alert("Аккаунта не существует")
			});
		}
	};

//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;
 
//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [55.730138, 37.594238], // координаты центра на карте
    zoom: 7, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
  });
  var myPlacemarkTemp = new ymaps.Placemark([55.730138, 37.594238], {
      balloonContent: "Здесь может быть ваш адрес",
  }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: 'img/map-marker.png',
      // Размеры метки.
      iconImageSize: [50, 50],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-25, -50],
  });
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту
 
  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);
 
  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass('is-active');
  });
}
 
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}
 
function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}
 
// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");
 
  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
 
// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
 
	  	// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
 
		// Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');
 
		// Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
        });                
      }
    }
  );  
}
 
$(function() {
 
  //Запускаем основную функцию
  ymap();
 
});
});
	


//git remote rm origin

