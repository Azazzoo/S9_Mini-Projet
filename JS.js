$(document).ready(function (){

    $nomValide = false;
    $bioValide = false;
    $specialValide = false;
    $couleurValide = false;
    class journaliste {
        constructor(nom ="", bio="", specialite="", couleur="") {
            this.Nom = nom;
            this.Bio = bio;
            this.Specialite = specialite;
            this.Couleur = couleur;
        }
        deserialiser(obj) {
            /**
             * Assigner les propriétés de l'objet obtenu à l'aide de JSON.parse aux propriétés d'un objet de type Journaliste.
             */
            Object.assign(this, obj);
        }
    }
    class Equipe{
        constructor(tabjournalist=[]) {
            this.tabjournalist = tabjournalist;
            this.compteur = 0
        }
        ajouterJournaliste(journaliste){
            this.tabjournalist[this.compteur] = journaliste;
            this.compteur++;
        }

    }
    $("#nom").keyup(function (){
        //Valider nom
        $name = $("#nom").val();
        if($name.length < 1 ){
            $nomValide = false;
        }
        else {
            $nomValide = true;
        }
        GererBouton();
    });

    $("#bio").keyup(function (){
        //Valider bio
        $biographie = $("#bio").val();
        if ( $biographie.match(/!+/) ){
            $bioValide = true;
        }
        else {
            $bioValide = false;
        }

        GererBouton();
    });
    $("#specialite").change(function (){
        //Valider specialite
        $special = $("#specialite").val();
        if ( $special !== ""){
            $specialValide = true;
        }
        else {
            $specialValide = false;
        }

        GererBouton();
    });
    $("#exampleColorInput").blur(function (){
        //Valider specialite
        $teinte = $("#exampleColorInput").val();
        if ( $teinte !== ""){
            $couleurValide = true;
        }
        else {
            $couleurValide = false;
        }

        GererBouton();
    });



    //Décider si on active ou désactive le bouton soumettre
    function GererBouton() {
        if($nomValide && $bioValide && $specialValide && $couleurValide){
            $("#soumettre").removeAttr("disabled");
        }
        else {
            $("#soumettre").attr("disabled", "disabled");
        }
    }
    //au chargement, vérifier la session
    $compteur = sessionStorage.getItem("compteur")
    if ($compteur > 0){
        for ($i = 0; $i < $compteur; $i++){
            $ident = "item"+(+$i + 1);
            $jsonObject = JSON.parse(sessionStorage.getItem($ident));
            let journalist = new journaliste();
            journalist.deserialiser($jsonObject)
            if($jsonObject !== null){
                $("#table").append("<tr><td id='jour'  class='row g-0'><div class='col-6'><p class='col-3 my-auto'>" + journalist.Nom
                    + "</p></div><div style='background-color:" + journalist.Couleur + "' class='col-6  rounded-pill'><p class='col-3 m-auto'>" + journalist.Specialite + "</p></div></td></tr>")
            }

        }
    }
    // recuperer donnee url
    $urldata = location.search.substring(1);
    if($urldata !== "" && $urldata.split('&')[0].split('=')[0] === "nom") {
        $nom = ($urldata.split('&')[0].split('=')[1]).replaceAll("+", " ");
        $bio = ($urldata.split('&')[1].split('=')[1]).replaceAll("+", " ");
        $speciality = ($urldata.split('&')[2].split('=')[1]).replaceAll("+", " ");
        $color = ($urldata.split('&')[3].split('=')[1]).replaceAll("%", "#").replaceAll("23", "");
    }
    // Creer le journalist avec l'URL
    if ($compteur > 0) {
        journaliste = new journaliste($nom, $bio, $speciality, $color)


        // ajouter nouveau journaliste
        $compteur = +$compteur + 1;
        sessionStorage.setItem("compteur", $compteur);
        $("#table").append("<tr><td id='jour'  class='row g-0'><div class='col-6'><p class='col-3 my-auto'>" + $nom
            + "</p></div><div style='background-color:" + $color + "' class='col-6  rounded-pill'><p class='col-3 m-auto'>" + $speciality + "</p></td></tr>")

        // sauvegarder journalist
        sessionStorage.setItem("item" + $compteur, JSON.stringify(journaliste))
    }
    $compteur = +$compteur + 1;
    sessionStorage.setItem("compteur", $compteur);


    $("#soumettre").click(function (){




    });
});