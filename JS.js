$(document).ready(function (){

    //au chargement, vérifier la session
    $compteur = sessionStorage.getItem("compteur")
    if ($compteur > 0){
        for ($i = 0; $i < $compteur; $i++){
            $ident = "item"+(+$i + 1);
            $item = sessionStorage.getItem($ident);
            if($item !== null){
                $("#table").append($item);
            }
        }
    }
    // recuperer donnee url
    $urldata = location.search.substring(1);
    if($urldata !== "" && $urldata.split('&')[0].split('=')[0] === "nom") {
        $nom = ($urldata.split('&')[0].split('=')[1]).replaceAll("+", " ");
        $bio = ($urldata.split('&')[1].split('=')[1]).replaceAll("+", " ");
        $speciality = ($urldata.split('&')[2].split('=')[1]).replaceAll("+", " ");
        $color = ($urldata.split('&')[3].split('=')[1]).replaceAll("+", " ");
    }
    // ajouter nouveau journaliste
    $compteur = +$compteur + 1;
    sessionStorage.setItem("compteur", $compteur);
    $("#table").append("<tr><td  class='row g-0'><div class='col-6'><p class='col-3 my-auto'>" + $nom
        + "</p></div><div class='col-6 border border-primary rounded-pill'><p class='col-3 m-auto'>" + $color + "</p></div></td></tr>")
    // sauvegarder journalist
    $newjourn = $("#table")
    sessionStorage.setItem("item" + $compteur, $newjourn)



    $("#soumettre").click(function (){


        //ajouter le journaliste


        //$newjourn = $("#table").append("<tr><td  class='row g-0'><div class='col-6'><p class='col-3 my-auto'>" + $nom
          //  + "</p></div><div class='col-6 border border-primary rounded-pill'><p class='col-3 m-auto'>" + $color + "</p></div></td></tr>")






                    //$("#table").append("<tr><td  class='row g-0'><div class='col-6'><p class='col-3 my-auto'>nom</p></div><div class='col-6 border border-primary rounded-pill'><p class='col-3 m-auto'>couleur</p></div></td></tr>")


    });
});