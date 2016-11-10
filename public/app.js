(function () {
    var config = {
        apiKey: "AIzaSyA-bw8RmdWH08iQ5UmcdtAwT_0hwrrCUBU",
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

    // El consolidado
    var consolidado = 0;
    var counter = 0;

    myDatabase.on('value', function(snap) {
        console.log('Estoy obteniendo todo!!!', snap.val());
        var todosMisRates = snap.val();
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
        }, 5000);

        counter ++;

        consolidado = consolidado + parseInt(rate.cuanto, 10);

        var total = document.getElementById('total');

        total.innerHTML = 'Éste meetup es un meetup de: ' + parseFloat(consolidado/counter).toFixed(2) + ' puntos. '+counter+' personas han votado.';


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