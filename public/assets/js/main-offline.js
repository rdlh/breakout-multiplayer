/* LIGNE */

var nombre_lignes        = 3;
var nombre_briques_ligne = 8;

/* BRIQUE */

var brique_largeur       = 96;
var brique_hauteur       = 20;
var brique_espace        = 5;
var brique_couleurs      = ["#8F0037", "#A52959", "#DC0055", "#EE3B80", "#EE6B9E"];
var brique_limite        = (brique_espace+brique_hauteur)*nombre_lignes;
var tableau_briques;
var nombre_briques       = nombre_lignes * nombre_briques_ligne;
var nombre_briques_init  = nombre_briques;

/* NIVEAU */

var tableau_briques_niveau = [1,0,1,0,1,0,1,0];

for (var j=0; j < nombre_briques_ligne; j++) {
  tableau_briques_niveau[j]  = new Array(nombre_briques_ligne);
}

// tableau_briques_niveau[0]  = [2,1,2,1,1,2,1,2];
// tableau_briques_niveau[1]  = [1,2,1,1,1,1,2,1];
// tableau_briques_niveau[2]  = [2,1,2,1,1,2,1,2];

for (var i=0; i < nombre_lignes; i++) {
  for (var j=0; j < nombre_briques_ligne; j++) {

      tableau_briques_niveau[i][j] = Math.round(2*Math.random());
    
  }
}

/* BARRE */

var barre_largeur        = 80;
var barre_hauteur        = 15;
var taille_deplacement   = 40;
var barre_position_x;
var barre_position_y;
var choix_deplacement;

/* ZONE JEUX */

var pause                = 0;
var win                  = 0;
var temps                = 0;
var count_down           = 3;
var zone_jeu_largeur     = 800;
var zone_jeu_hauteur     = 300;
var context;
var canvas;
/* NE PAS OUBLIER DE CHANGER LE NOM DE CETTE VARIABLE */
var panien_tu_casse_les_couilles;
var decalage_souris      = document.getElementById('monCanvas').offsetLeft;
var est_en_pause         = false;
var niveau               = 1;
var piege                = false;

/* BALLE */

var balle_couleur        = "#03899C";
var balle_taille         = 8;
var balle_vitesse        = 4;
var balle_position_x     = (zone_jeu_largeur / 2) - (balle_taille / 2);
var balle_position_y     = 280;
var direction_balle_x    = 0;
var direction_balle_y    = -1;

window.addEventListener('load', function () {

  /* ON RECUPERE LE CANVAS */

  canvas = document.getElementById('monCanvas');
  if (!canvas || !canvas.getContext) {
  return;
  }

  /* ON RECUPERE LE CONTEXT */

  context = canvas.getContext('2d');
  if (!context) {
    return;
  }
  
  initialisation();

  /* LA BOUCLE DU JEU */

  context.fillStyle = balle_couleur;
  context.beginPath();
  context.arc(balle_position_x, balle_position_y, balle_taille, 0, Math.PI*2, true);
  context.closePath();
  context.fill();
  context.fillStyle = "#DC0055";
  context.fillRect(barre_position_x,barre_position_y,barre_largeur,barre_hauteur);

  window.document.onmousemove = checkDepla;

}, false);

/* ALGO DU JEU */

function demarer(choix) {

  choix_deplacement = choix;

  $('#aCacher').hide("fast");

  countDown();
  setTimeout(countDown, 1000);
  setTimeout(countDown, 2000);
  setTimeout(countDown, 3000);
  setTimeout(demarer_jeux, 3000);

}

function arreterJeux() {

  clearInterval(panien_tu_casse_les_couilles);

}

function mettreEnPause() {

  clearInterval(panien_tu_casse_les_couilles);
  est_en_pause = true;

}

function pauser() {

  mettreEnPause();
  document.getElementById('notification').innerHTML = 'Le jeux est en pause.';

}

function restart() {

  if(est_en_pause) {
    est_en_pause = false;
    countDown();
    setTimeout(countDown, 1000);
    setTimeout(countDown, 2000);
    setTimeout(countDown, 3000);
    setTimeout(demarer_jeux, 3000);
  }

}

function rejouer() {

  $('#rejouer').hide("fast");

  initialisation();

  /* LA BOUCLE DU JEU */

  context.fillStyle = balle_couleur;
  context.beginPath();
  context.arc(balle_position_x, balle_position_y, balle_taille, 0, Math.PI*2, true);
  context.closePath();
  context.fill();
  context.fillStyle = "#DC0055";
  context.fillRect(barre_position_x,barre_position_y,barre_largeur,barre_hauteur);

  countDown();
  setTimeout(countDown, 1000);
  setTimeout(countDown, 2000);
  setTimeout(countDown, 3000);
  setTimeout(demarer_jeux, 3000);

}

function demarer_jeux() {

  panien_tu_casse_les_couilles = setInterval(refreshGame, 10);

}

function countDown(count) {

  if (count_down > 0) 
  {

    document.getElementById('notification').innerHTML = 'Attention ! ' + count_down--;

  } else {

    document.getElementById('notification').innerHTML = "C'est parti !";
    count_down = 3;

  }
}

function changeVitesseBoule(choix) {

  if (choix == '+') {

    balle_vitesse++;

  } else {

    balle_vitesse--;

  }

}

function initialisation() {

  zone_jeu_largeur     = canvas.width;
  zone_jeu_hauteur     = canvas.height;
  barre_position_x     = ( zone_jeu_largeur / 2 ) - ( barre_largeur / 2 );
  barre_position_y     = ( zone_jeu_hauteur - barre_hauteur );
  balle_position_x     = (zone_jeu_largeur / 2) - (balle_taille / 2);
  balle_position_y     = 280;
  direction_balle_x    = 0;
  direction_balle_y    = -1;
  nombre_briques       = nombre_lignes * nombre_briques_ligne;
  nombre_briques_init  = nombre_briques;
  temps = 0;

  creerBriques(nombre_lignes, nombre_briques_ligne, brique_largeur, brique_hauteur, brique_espace);

}


function refreshGame() {

  temps = temps + 0.01;
  document.getElementById('notification').innerHTML = 'Temps : ' + Math.round(temps*10)/10 + ' secondes';

  // if(temps >= 5 && temps < 5.01) {
  //   changeVitesseBoule('+');
  // }

  // if(temps >= 7 && temps < 7.01) {
  //   changeVitesseBoule();
  // }

  clearContexte(context, 0, zone_jeu_largeur, 0, zone_jeu_hauteur);
  
  win = 1;
  
  /* ON RE-AFFICHE LES BRIQUES */

  for (var i=0; i < tableau_briques.length; i++) {

    context.fillStyle = brique_couleurs[i];

    for (var j=0; j < tableau_briques[i].length; j++) {

      if (tableau_briques[i][j] == 1) {

        context.fillStyle = brique_couleurs[i];
        context.fillRect((j*(brique_largeur+brique_espace)),(i*(brique_hauteur+brique_espace)),brique_largeur,brique_hauteur);
        win = 0;

      }
      if (tableau_briques[i][j] == 2) {

        context.fillStyle = 'black';
        context.fillRect((j*(brique_largeur+brique_espace)),(i*(brique_hauteur+brique_espace)),brique_largeur,brique_hauteur);
        win = 0;

      }
    }
  }
  
  /* ON VERIFIE SI LE JOUEUR A GAGNE */

  if ( win ) gagne();
  
  /* DEPLACEMENT DE LA BARRE */

  context.fillStyle = "#DC0055";
  context.fillRect(barre_position_x,barre_position_y,barre_largeur,barre_hauteur);
  
  /* DEPLACEMENT DE LA BALLE */
  
  if ( (balle_position_x + direction_balle_x * balle_vitesse) >  zone_jeu_largeur) {

    direction_balle_x = -1;

  } else if ( (balle_position_x + direction_balle_x * balle_vitesse) <  0) {

    direction_balle_x = 1;

  }
  if ( (balle_position_y + direction_balle_y * balle_vitesse) >  zone_jeu_hauteur) {

    perdu();

  }
  else {

    if ( (balle_position_y + direction_balle_y * balle_vitesse) <  0) {

      direction_balle_y = 1;

    } else {

      /* COLLISION AVEC LA BARRE */

      if (  ((balle_position_y + direction_balle_y * balle_vitesse) > (zone_jeu_hauteur - barre_hauteur)) 
        && ((balle_position_x + direction_balle_x * balle_vitesse) >= barre_position_x) 
        && ((balle_position_x + direction_balle_x * balle_vitesse) <= (barre_position_x+barre_largeur))) {

        direction_balle_y = -1;
        direction_balle_x = 2*(balle_position_x-(barre_position_x+barre_largeur/2))/barre_largeur;

      }

    }
  }
  
  /* COLLISION AVEC LES BRIQUES */

  if ( balle_position_y <= brique_limite) {
    
    var ligneY = Math.floor(balle_position_y/(brique_hauteur+brique_espace));
    var ligneX = Math.floor(balle_position_x/(brique_largeur+brique_espace));

    if ( tableau_briques[ligneY][ligneX] >= 1 ) {

      tableau_briques[ligneY][ligneX] = tableau_briques[ligneY][ligneX] - 1;
      direction_balle_y = 1;
      if (tableau_briques[ligneY][ligneX] == 0){

        nombre_briques--;

      }
    }
  }
  
  balle_position_x += direction_balle_x * balle_vitesse;
  balle_position_y += direction_balle_y * balle_vitesse;
  
  /* AFFICHAGE DE LA BALLE */
  context.fillStyle = balle_couleur;
  context.beginPath();
  context.arc(balle_position_x, balle_position_y, balle_taille, 0, Math.PI*2, true);
  context.closePath();
  context.fill();
  
}

function checkDeplaButtons(side) {

  if (side == 'left') {

    barre_position_x -= taille_deplacement;

  } else {

    barre_position_x += taille_deplacement;

  }

}

function checkDepla(e) {

  if (choix_deplacement == 'souris')
  {

    x = e.clientX - (barre_largeur / 2);

    if ( (barre_position_x+taille_deplacement+barre_largeur-decalage_souris) <= zone_jeu_largeur ) {

      barre_position_x = x - decalage_souris;

    } 
    if ( ((barre_position_x-taille_deplacement)) >= 0 ) {

      barre_position_x = x - decalage_souris;

    }

  }
}

function perdu() {

  $('#rejouer').show("fast");

  clearInterval(panien_tu_casse_les_couilles);
  document.getElementById('notification').innerHTML = 'Vous avez perdu, mais vous avez détruit <strong>' + (nombre_briques_init - nombre_briques) + ' briques</strong> en <strong>' + Math.round(temps*10)/10 + ' secondes</strong> !';

  sauvegarder();

}

function gagne() {

  $('#rejouer').show("fast");

  clearInterval(panien_tu_casse_les_couilles);
  document.getElementById('notification').innerHTML = '<h3>Vous avez gagné !</h3>Votre temps est de <strong>' + Math.round(temps*10)/10 + ' secondes</strong> !';

  sauvegarder();

}

function sauvegarder() {
  $.ajax({
    type: "GET",
    url: "http://localhost/CasseBriqueOnline/public/score/create.json?niveau=" + niveau + "&briques=" + (nombre_briques_init - nombre_briques) + "&temps=" + Math.round(temps*10000)/10000,
    success:function(data){

      if (data == "non") {

        document.getElementById('notification').innerHTML = document.getElementById('notification').innerHTML + '</br> Connectez-vous pour enregistrer ce score !';
      
      } else {

       document.getElementById('notification').innerHTML = document.getElementById('notification').innerHTML + '</br>' + data;

     }
    }
  });
}

function clearContexte(ctx, startwidth, ctxwidth, startheight, ctxheight) {

  ctx.clearRect(startwidth, startheight, ctxwidth, ctxheight);

}

/* CREATION DES BRIQUES */

function creerBriques(nbrLignes, nbrParLigne, largeur, hauteur, espace) {

  tableau_briques = new Array(nbrLignes);
  
  for (var i=0; i < nbrLignes; i++) {
    
    tableau_briques[i] = new Array(nbrParLigne);
    
    /* ON MET LES COULEURS */

    context.fillStyle = brique_couleurs[i];
    
    for (var j=0; j < nbrParLigne; j++) {
      
      /* CHANGEMENT DE LIGNE */

      if(tableau_briques_niveau[i][j] >= 1) {

        if(tableau_briques_niveau[i][j] == 1){
          context.fillStyle = brique_couleurs[i];
        } else if (tableau_briques_niveau[i][j] == 2){
          context.fillStyle = 'darkgrey';
        }
        context.fillRect((j*(largeur+espace)),(i*(hauteur+espace)),largeur,hauteur);
        tableau_briques[i][j] = tableau_briques_niveau[i][j];

      } else {

        tableau_briques[i][j] = 0;

      }
      
    }
  }
  
  return 1;
  
}