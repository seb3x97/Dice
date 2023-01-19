/* CONSTANTES */

//1
const animTime = 6000;      //Temps de l'animation en milisecondes

//2   /!\ Le min ne doit pas être plus petit que 7 et pour que se soit le plus aléatoire possible, min et max doivent être un multiple de 4 - 1. Exemple possible : 3, 7, 11, 15, 19, 23, 27, 31, ...
const MIN = 7;       //Nombre de tour min
const MAX = 27;      //Nombre de tour max

//3
const RATIO = 3 / 4;

/**
 * On diminue l'index par rapport a la taille de l'array
 * Ex : Index (13) lenght (4).
 * 13 / 4 = 12 (on arrondit à l'inférieur).
 * 13 - 12 = 1.
 * Donc l'index de sortie est de 1
 * @param {*} index Index
 * @param {*} length Taille de l'array
 * @returns Retourne l'index
 */
function getIndex(index, length) {
  //On retourne un index qui se trouve entre 0 (inclus) et length (exclus)
  return index - (Math.floor(index / length) * length);
}

/**
 * On récupére une valeur random entre un min et max
 * @param {*} min Min
 * @param {*} max Max
 * @returns valuer random
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

/**
 * On check si l'index rentre dans un array sinon on le modifie
 * @param {*} index Index
 * @param {*} length Taille de l'array
 * @returns Retourne l'index
 */
 function checkArrayIndex(index, length) {
  //Si l'index est plus petit que 0
  if(index < 0) {
    index = length + index;
  }
  //Si l'index est plus grand ou égual à la taille de l'array
  else if(index >= length) {
    index = index - length;
  }

  //On retourne l'array
  return index;
}

/**
 * On bouge les items horizontalement
 * @param {*} array Array
 * @param {*} number Number
 * @returns items bougés
 */
function moveItemsHor(array, number) {
  //Output
  const output = new Array(array.length);

  //On recup l'index
  let index = getIndex(number, array.length);

  //On boucle l'index
  for(let i = 0; i < array.length; ++i) {
    //On enregistre la valeur
    output[index] = array[i];

    //On incrémente l'index
    index++;

    //Si il dépasse on reset
    if(index >= array.length) {
      index = 0;
    }
  }

  //Return output
  return output;
}

/**
 * On bouge les items verticalement
 * @param {*} array Array
 * @param {*} number Number
 * @returns array avec les items bougés
 */
function moveItemsVer(array, number) {
  //Output
  const output = new Array(array.length);

  //Index
  let index = getIndex(number, array.length) * -1;

  //On boucle l'array
  for(let i = 0; i < array.length; ++i) {
    //On calcul l'index
    const calc = checkArrayIndex(i + index, output.length);

    //On enregistre la valeur
    output[calc] = array[i];
  }

  //Return output
  return output;
}

//Status du dès
const dice_status = Object.freeze({
  STATIC: 0,
  LOCK: 1,
});

/**
 * Class Dice
 */
class Dice {
  /**
   * Constructeur Renseigné
   * @param {*} container Container
   */
  constructor(container) {
    //On reset les données
    this.reset();

    //On génére l'element
    this.generate(container);
  }

  /**
   * On reset le dès
   */
  reset() {
    //On mets le statut du dès en static
    this.status = dice_status.STATIC;

    //On reset les faces du dès
    this.dice_faces = [
      [0, 2, 0],
      [3, 1, 4],
      [0, 5, 0],
      [0, 6, 0],
    ];
  };
  
  /**
   * On récupére le nombre qui est devant
   * @returns int
   */
  getFrontNumber() {
    return this.dice_faces[1][1];
  };

  /**
   * On génére le dès
   * @param {*} container container 
   */
  generate(container) {
    //On crée l'uiElement
    this.uiElement = document.createElement('div');
    this.uiElement.classList.add("dice");
    this.uiElement.innerHTML = `
      <div class="front">
          <span class="dot dot1"></span>
      </div>
      <div class="right">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
          <span class="dot dot4"></span>
      </div>
      <div class="left">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
      </div>
      <div class="top">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
      </div>
      <div class="bottom">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
          <span class="dot dot4"></span>
          <span class="dot dot5"></span>
      </div>
      <div class="back">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
          <span class="dot dot4"></span>
          <span class="dot dot5"></span>
          <span class="dot dot6"></span>
      </div>
    `;

    //On ajoute les events
    this.addEvents(container);

    //On ajoute l'element au container
    container.appendChild(this.uiElement);
  }

  /**
   * On ajoute les events
   */
  addEvents(container) {
    //On récupére la première et dernière position de y et le dès
    const posX = { from: -1, to: 0 };
    const posY = { from: -1, to: 0 };
    const dice = this;

    //MouseDown
    container.addEventListener("mousedown", function(e) {
      //On set posY
      posY.from = e.pageY - dice.uiElement.parentElement.offsetTop;
      posY.to = posY.from;

      //On set posX
      posX.from = e.pageX - dice.uiElement.parentElement.offsetLeft;
      posX.to = posX.from;
    });

    //MouseMove
    container.addEventListener("mousemove", function(e) {
      //On set to posY
      posY.to = e.pageY - dice.uiElement.parentElement.offsetTop;

      //On set to posX
      posX.to = e.pageX - dice.uiElement.parentElement.offsetLeft;
    });

    //MouseUp
    container.addEventListener("mouseup", function(e) {
      //On set to posY
      posY.to = e.pageY - dice.uiElement.parentElement.offsetTop;

      //On set to posX
      posX.to = e.pageX - dice.uiElement.parentElement.offsetLeft;

      //On roll le dès
      rollDice();
    });

    //MouseLeave
    container.addEventListener("mouseleave", function() {
      //On roll le dès
      rollDice();
    });

    /**
     * On clear les valeurs
     */
    function clearPos() {
      //On clear
      posX.from = -1;
      posY.from = -1;
    }

    /**
     * On récupére le nombre de rotation
     * @param {*} from From
     * @param {*} to To
     * @param {*} parentHeight Taille du parent
     * @returns On retourne le nombre de rotation
     */
    function calcRotationNb(from, to, parentHeight) {
      //On récupére la distance du scroll et la taille du ratio
      const scrollDist = Math.abs(from - to);
      const ratioSize = parentHeight * RATIO;

      //On calcul la division
      const division = scrollDist >= ratioSize ? 1 : ratioSize / scrollDist;

      //On retourne le nombre de rotation
      return Math.round((MAX - MIN) / division + MIN);
    }

    /**
     * On roll le dès
     * @return void
     */
    function rollDice() {
      //Si x et y sont définis
      if(posX.from == -1 || posY.from == -1) return clearPos();

      //Si le dès n'est pas lock
      if(dice.status != dice_status.LOCK) {
        //On calcul le nombre de tour
        const turnHor = calcRotationNb(posX.from, posX.to, dice.uiElement.parentElement.offsetWidth);
        const turnVer = calcRotationNb(posY.from, posY.to, dice.uiElement.parentElement.offsetHeight);

        //On le tourne
        dice.roll(turnHor, turnVer);
      }

      //On reset en y
      clearPos();
    }
  }

  /**
   * On roll
   */
  roll(turnHor, turnVer) {
    //Si l'element est null
    if(this.uiElement == null) throw new Error("L'ui du dès n'est pas défini");

    //On lock le dès
    this.status = dice_status.LOCK;

    //Si le dès est entrain de roll
    if(this.timeout) {
      clearTimeout(this.timeout);
    }

    //On récupére les pos
    const pos = {
      hor: turnHor + getRandom(0, this.dice_faces.length),
      ver: turnVer + getRandom(0, this.dice_faces.length),
    }

    //On récupére les degrés
    const deg = {
      hor: pos.hor * 90,
      ver: pos.ver * 90
    };

    //On lance l'animation
    this.uiElement.style.transition = `transform ${animTime}ms`;
    this.uiElement.style.webkitTransform = `rotateX(${deg.ver}deg) rotateY(${deg.hor}deg)`;
    this.uiElement.style.transform = `rotateX(${deg.ver}deg) rotateY(${deg.hor}deg)`;

    //On enregistre le timeout
    this.timeout = setTimeout(() => {
      //On récupére les index
      const index = {
        hor: getIndex(pos.hor, this.dice_faces.length),
        ver: getIndex(pos.ver, this.dice_faces.length),
      }

      //On shift les arrays
      this.shiftHorinzontalArray(index.hor);
      this.shiftVerticalArray(index.ver);

      //On récupére les nouveaux degrés
      const newDeg = {
        hor: index.hor * 90,
        ver: index.ver * 90,
      }

      //On reset l'animation
      this.uiElement.style.transition = "transform 0ms";
      this.uiElement.style.webkitTransform = `rotateX(${newDeg.ver}deg) rotateY(${newDeg.hor}deg)`;
      this.uiElement.style.transform = `rotateX(${newDeg.ver}deg) rotateY(${newDeg.hor}deg)`;

      //Si le callback existe on retourne le callback
      if(this.onroll) return this.onroll(this.getFrontNumber());
    }, animTime);
  };

  /**
   * Horinzontal
   */
  shiftHorinzontalArray(number) {
    //On récupére l'array horizontale
    const array = [this.dice_faces[3][1]].concat(this.dice_faces[1]);

    //On récupére les items bougés horizontalement
    const output = moveItemsHor(array, number);

    //On les enregistres
    this.dice_faces[3][1] = output.shift();
    this.dice_faces[1] = output;
  };

  /**
   * Vertical
   */
  shiftVerticalArray(number) {
    //On récupére l'array vertical
    const array = new Array(this.dice_faces.length);

    //On enregistre dans l'array les items
    for(let i = 0; i < array.length; ++i) {
      array[i] = this.dice_faces[i][1];
    }

    //On récupére les items bougés verticalement
    const output = moveItemsVer(array, number);

    //On les enregistres
    for(let i = 0; i < output.length; ++i) {
      this.dice_faces[i][1] = output[i];
    }
  }
}