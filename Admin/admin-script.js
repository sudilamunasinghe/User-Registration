const database = firebase.database();

const ref = database.ref("User/");

ref.once('value')
  .then((snapshot) => {
    const data = snapshot.val();

    // Check if there is data at the specified location
    if (data) {
      // Select the HTML elements for the table
      const dataTable = document.getElementById('dataTable');
      const dataBody = document.getElementById('dataBody');

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const name = childData.Name;
        const email = childData.Email;
        const tel = childData.TelephoneNo;
        const cdate = childData.Date;
        const id = childData.ID;
        const user = childData.UserNo;

        // Create a new row for each post
        const newRow = dataBody.insertRow(-1);
        const userCell = newRow.insertCell(0)
        const nameCell = newRow.insertCell(1);
        const idCell = newRow.insertCell(2);
        const emailCell = newRow.insertCell(3);
        const telCell = newRow.insertCell(4);
        const dateCell = newRow.insertCell(5);

        // Populate the cells with post data
        userCell.textContent = user;  
        nameCell.textContent = name;
        idCell.textContent = id;
        emailCell.textContent = email;
        telCell.textContent = tel;
        dateCell.textContent = cdate;
      });
    } else {
      console.log('No data found at the specified location.');
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });
