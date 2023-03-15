const pitanja = [
  {
    oblast: "Pogodite marku automobila ? ",
    ponudjeno: [
      "toyota",
      "honda",
      "mitsubishi",
      "kia",
      "rangerover",
      "alfaromeo",
      "audi",
    ],
  },
  {
    oblast: "Pogodite državu u Evropi ? ",
    ponudjeno: ["srbija", "italija", "nemacka", "finska", "rusija", "turska"],
  },
  {
    oblast: "Pogodite ime valute ? ",
    ponudjeno: ["evro", "dinar", "marka", "franak", "funta", "lira"],
  },
  {
    oblast: "Pogodite ime fudbalskog kluba iz Italije ? ",
    ponudjeno: [
      "fiorentina",
      "udineze",
      "salernitana",
      "napoli",
      "palermo",
      "bolonja",
    ],
  },
  {
    oblast: "Pogodite prezime čuvenog pisca ? ",
    ponudjeno: [
      "kafka",
      "dostojevski",
      "bulgakov",
      "dikens",
      "gogolj",
      "hemingvej",
    ],
  },
];

let abeceda = [
  "a",
  "b",
  "c",
  "č",
  "ć",
  "d",
  "dž",
  "đ",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "š",
  "t",
  "u",
  "v",
  "z",
  "ž",
  "y",
  "w",
  "x",
];

var trazenaRec;
var pokusanaSlova = [];
var trenutnaRec = "";
var dozvoljenoPokusaja = 6;
var brojacPokusaja = 0;

function pocniIgru() {
  let nasumicnaOblast = nasumicniElement(pitanja);
  trazenaRec = nasumicniElement(nasumicnaOblast.ponudjeno);

  zadajRec(nasumicnaOblast.oblast);
}

function zadajRec(oblast) {
  document.getElementById("oblast").innerHTML = oblast;
  trenutnaRec = "-".repeat(trazenaRec.length);
  document.getElementById("trazenaRec").innerHTML = trenutnaRec;
}

function nasumicniElement(niz) {
  return niz[Math.floor(Math.random() * niz.length)];
}

function prikaziTastaturu() {
  let dugmad = [];
  abeceda.forEach((slovo) => {
    dugmad.push(
      `<button class="btn btn-primary p-3 m-1" id="dugme_${slovo}" onclick="odaberiSlovo('${slovo}')" >${slovo.toUpperCase()}</button>`
    );
  });
  document.getElementById("tastatura").innerHTML = dugmad.join("");
}

function odaberiSlovo(slovo) {
  pokusanaSlova.push(slovo);
  document.getElementById("dugme_" + slovo).disabled = true;

  if (trazenaRec.includes(slovo)) {
    uvrstiSlovo(slovo);
    proveriPobedu();
  } else {
    brojacPokusaja++;
    azurirajSliku();
    proveriPoraz();
  }
}

function uvrstiSlovo(odabranoSlovo) {
  let trazenaRecNiz = trazenaRec.split("");
  let trenutnaRecNiz = trenutnaRec.split("");

  trazenaRecNiz.forEach((slovo, index) => {
    if (odabranoSlovo == slovo) {
      trenutnaRecNiz[index] = odabranoSlovo;
    }
  });
  trenutnaRec = trenutnaRecNiz.join("");
  document.getElementById("trazenaRec").innerHTML = trenutnaRec;
}

function proveriPobedu() {
  if (trenutnaRec == trazenaRec) {
    document.getElementById("poruka").innerHTML =
      "<div class='alert alert-success text-center' >Čestitamo! Pronašli ste traženu reč!</div>";
    zabraniDugmad();
  }
}

function proveriPoraz() {
  if (dozvoljenoPokusaja == brojacPokusaja) {
    document.getElementById("poruka").innerHTML =
      "<div class='alert alert-danger text-center' >Tražena riječ je: " +
      trazenaRec +
      "</div>";
    let dugmePokusajPonovo =
      "<button id='pokusajPonovo' class='btn btn-warning btn-block' onclick='pokusajPonovo()' >Pokušaj ponovo</button>";
    document.getElementById("pokusajPonovo").innerHTML = dugmePokusajPonovo;
    zabraniDugmad();
  }
}

function azurirajSliku() {
  document.getElementById("slika").src = "./img/" + brojacPokusaja + ".png";
}

function pokusajPonovo() {
  location.reload();
}

function zabraniDugmad() {
  document.querySelectorAll("button:not(#pokusajPonovo)").forEach((dugme) => {
    dugme.disabled = true;
  });
}

pocniIgru();
prikaziTastaturu();
