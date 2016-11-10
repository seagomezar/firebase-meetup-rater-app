(function () {
    var config = {
        apiKey: "",
        authDomain: "superapp-88577.firebaseapp.com",
        databaseURL: "https://superapp-88577.firebaseio.com",
        storageBucket: "superapp-88577.appspot.com",
        messagingSenderId: "294220277117"
    };
    firebase.initializeApp(config);

    // Mi base de datos
    var myDatabase = firebase.database().ref().child('rates');

    // Mi pre tag en el index
    var myData = document.getElementById('myData');

    // Mis elementos del formulario
    var quien = document.getElementById('quien');
    var cuanto = document.getElementById('cuanto');
    var enviar = document.getElementById('enviar');

    // Elemento de alerta
    var alerta = document.getElementById('alert');
    

    myDatabase.on('value', function(snap) {
        console.log('Estoy obteniendo todo!!!', snap.val());
        // myData.innerHTML = JSON.stringify(snap.val(), null, 3);
    });

    myDatabase.on('child_added', function(snap) {
        console.log('Alguien añadió un dato', snap.val());
        var rate = snap.val();
        alerta.innerHTML = '<strong>' + rate.quien + '</strong> ha calificado este meetup con: <strong>' + rate.cuanto + '</strong> puntos';
        if(rate.cuanto <= 5) {
            alerta.setAttribute('class', 'alert alert-danger');
        } else if(rate.cuanto > 5 && rate.cuanto <= 7) {
            alerta.setAttribute('class', 'alert alert-warning');
        } else if(rate.cuanto > 7) {
            alerta.setAttribute('class', 'alert alert-success');
        }
        alerta.hidden = false;

        setTimeout(function() {
            alerta.hidden = true;
        }, 3000);

    });
    myDatabase.on('child_removed', function(snap) {
        console.log('Alguien removió un dato', snap.val());
    });
    myDatabase.on('child_changed', function(snap) {
        console.log('Alguien cambió un dato', snap.val());
    });

    enviar.addEventListener('click', function(){
        
        console.log('quien', quien.value);
        console.log('cuanto', cuanto.value);

        // Creemos un objeto con esos datos

        var newRate = {quien: quien.value, cuanto: cuanto.value};

        myDatabase.push(newRate);

    });



})();