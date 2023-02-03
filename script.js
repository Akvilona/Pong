/* Скрипт описывает логику игры Pong  */
/* Создал Андрей Львович Антонов 01.02.2023 года */

var idInterval = 0; /* глобалиная переменная  */
var id_start = 0; /* устанавливается чуть раньше чем clearInterval(idInterval) чтобы нельзя было сдвинуть ракетку после проигрыша */
var posArrow = 300; /** позиция ракетки по умолчанию */

/* функция остановки игры, по кнопке 'Стоп' */
function myFinish() {
  id_start = 0; /* останвливаем ракетку  */
  clearInterval(idInterval); /** останавливаем шарик */
  idInterval = id_start; /* обнуляем интервал */
}

/* функция запуска игры По кнопке 'Старт' */
function myMove() {
  var elemBall =
    document.getElementById("myBall"); /* получаем ссылку на объект мяч */
  var elemOut =
    document.getElementById(
      "out"
    ); /* получаем ссыку на объект вывода счета и время игры */
  var posX = 0; /* позиция по Х координате */
  var posY = 0; /* позиция по Y координате */
  var speed = 1; /* начальная скорость */
  var difference = 3; /* разброс скорости  */
  var posCount = 0; /* счетчик отбиваний */
  var randomX = 1; /* случайное чило межу speed и difference */
  var randomY = 1; /* случайное чило межу speed и difference */
  var start = new Date().getTime(); // время начала выполнения программы

  if (idInterval > 0) {
    return;
  } /* если функцию setInterval уже вызывали то выходим из скрипта */
  idInterval = setInterval(
    frame,
    10
  ); /*  позволяет регулярно вызывать указанную функцию через указанный промежуток времени в миллесекундах. */
  id_start = idInterval; /* запуск возможности изменять положение ракетки  */

  /* функция работает в цикле из за функции setInterval(frame, 10) для передвижения мяча */
  function frame() {
    /* прокерка на попадание мяча в ракетку */
    if (
      posX >= 330 &&
      randomX >
        0 /* координаты мяча 'posY' должен попасть между размерами ракетки -> 'posArrow' */ &&
      posArrow <= posY + 30 &&
      posY + 15 <= posArrow + 100
    ) {
      /* меняем направление мяча */
      randomX = randomX * -1;

      /* счетчик отбиваний */
      posCount++;

      /* увеличение скорости игры при достижение указанного счета  */
      if (posCount % 5 == 0) {
        speed++;
      }
    } else if (posX < 0 || posY < 0 || posX > 350 || posY > 350) {
      /* проверка координат мяча при выходе за пределы игрового поля */
      /* попадание в нижнуюю границу */
      if (posX > 350) {
        /* обрабатываем проигрыш (мячь прошел мимо ракетки) */

        /* меняем направление мяча */
        randomX = randomX * -1;

        /* это счетчик пропусков */
        posCount--;

        /* этот код остановит игру в момент когда игрок ошибся, можно закомментировать */
        myFinish();
      }

      /** меняем направление и скорость мяча при столкновение с боковыми и вехними границами (нижняя граница описана выше) */
      if (posX <= 0) {
        randomX = getRandomInt(speed, speed + difference);
      }
      if (posY <= 0) {
        randomY = getRandomInt(speed, speed + difference);
      }
      if (posY > 350) {
        randomY = getRandomInt(speed, speed + difference) * -1;
      }
    }

    /* вывод информацию о счете и времени игры */
    elemOut.innerHTML =
      "отбил: " +
      posCount +
      " за: " +
      formatTime(new Date().getTime() - start) +
      " сек.";

    /** прибавляем позицию мяча по X и Y координатам */
    posX += randomX;
    posY += randomY;

    /** устанавливаем позицию мяча по X и Y координатам */
    elemBall.style.top = posX + "px";
    elemBall.style.left = posY + "px";

    if (posCount == 30) {
      id_start = 0; /** останвливаем ракетку  */
      clearInterval(idInterval); /** останавливаем шарик */
      idInterval = id_start; /** обнуляем интервал */
    }
  }

  /** функция возвращает случайное число между min и max */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /** функция форматирования вермени в секундах */
  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };
}

/* обработка нажатия клавиш: стрелка направа и стрелка налево */
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowRight") {
    myArrow(+100);
  }
  if (event.key == "ArrowLeft") {
    myArrow(-100);
  }
});

function myArrow(pos) {
  /* проверка на то что мяч движется  */
  if (id_start > 0) {
    posArrow = posArrow + pos;

    if (posArrow < 0) {
      posArrow = 0;
    }
    if (posArrow > 300) {
      posArrow = 300;
    }

    /* получаем ссыку на объект ракетки */
    var elemRacket = document.getElementById("myRacket");
    elemRacket.style.left = posArrow + "px";
  }
}
