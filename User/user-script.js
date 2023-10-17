var fname, email, pass, usernumber, count;

function getData() {
    fname = document.getElementById('name').value;
    email = document.getElementById('email').value;
    id = document.getElementById('id').value;
    tel = document.getElementById('telephone').value;
    
}

function last(callback) {
    firebase.database()
    .ref("LastNo/Last")
    .once("value", function(snap) {
        count = snap.val();
        console.log(count);
        usernumber = parseInt(count, 10) + 1;
        count = usernumber;
        callback();
    });
}

function change() {
    firebase
    .database()
    .ref("LastNo")
    .update({
        Last: count
    });
}

function clearInputs(){
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('id').value = "";
    document.getElementById('telephone').value = "";
}

document.getElementById('submit').onclick = function () {
    getData();
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    var cdate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    console.log(cdate)
    last(function() {
        firebase
        .database()
        .ref("User/" + usernumber)
        .set({
            UserNo : usernumber,
            Name: fname,
            Email: email,
            ID: id,
            TelephoneNo : tel,
            Date : cdate,
        });
        change();
        clearInputs();

        $('.popup').css({
            right : '50px',
        })
        $('.closebtn').click(function(){
            $('.popup').css({
                right: '-100%',
            })
        })
    });
};
