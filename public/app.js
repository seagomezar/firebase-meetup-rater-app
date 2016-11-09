(function () {
    var config = {
        apiKey: "",
        authDomain: "superapp-88577.firebaseapp.com",
        databaseURL: "https://superapp-88577.firebaseio.com",
        storageBucket: "superapp-88577.appspot.com",
        messagingSenderId: "294220277117"
    };
    firebase.initializeApp(config);

    var myDatabase = firebase.database().ref().child('rates');
    var myData = document.getElementById('myData');

    myDatabase.on('value', function(snap) {
        console.log('Estoy obteniendo todo!!!', snap.val());
        myData.innerHTML = JSON.stringify(snap.val(), null, 3);
    });

    myDatabase.on('child_added', function(snap) {
        console.log('Alguien añadió un dato', snap.val());
    });
    myDatabase.on('child_removed', function(snap) {
        console.log('Alguien removió un dato', snap.val());
    });
    myDatabase.on('child_changed', function(snap) {
        console.log('Alguien cambió un dato', snap.val());
    });



})();