var firebaseConfig = {
  apiKey: 'AIzaSyA-zjlFKc1maHjqo2Onx_sRsaOwccc_MmA',
  authDomain: 'code-chef-srm-feedback-form.firebaseapp.com',
  databaseURL: 'https://code-chef-srm-feedback-form-default-rtdb.firebaseio.com',
  projectId: 'code-chef-srm-feedback-form',
  storageBucket: 'code-chef-srm-feedback-form.appspot.com',
  messagingSenderId: '417717367322',
  appId: '1:417717367322:web:167de4e5f33c804f5697a3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// reference contact info collections
let contactInfo = firebase.database().ref('infos');

document.getElementById('feedbackform').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  let name = document.getElementById('name').value;
  let number = document.getElementById('number').value;
  let email = document.getElementById('email').value;
  let feedback = document.getElementById('feedback').value;

  saveContactInfo(name, number, email, feedback);

  document.getElementById('feedbackform').reset();

  sendMail(name, email, feedback);
}

// save infos to firebase
function saveContactInfo(name, number, email, feedback) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    number: number,
    email: email,
    feedback: feedback,
  });

retriveInfos();
}

//Retrive Infos
function retriveInfos() {
  let ref = firebase.database().ref('infos');
  ref.on('value', gotData);
}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i];
    let name = info[infoData].name;
    let number = info[infoData].number;
    let email = info[infoData].email;
    let feedback = info[infoData].feedback;

    console.log(name, number, email, feedback);

    let inforResults = document.querySelector('.infoResults');

    inforResults.innerHTML += `<p><strong>Name: </strong>${name}</p>
    <p><strong>number: </strong>${number}</p>
    <p><strong>Email: </strong>${email}</p>
    <p><strong>Feedback: </strong>${feedback}</p>`;
  }
}

//Send email
function sendMail(name, email, feedback) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'shivamshekhar0000@gmail.com',
    Password: 'pemukdoohhuiktrp',
    To: `${email}`,
    From: 'shivamshekhar0000@gmail.com',
    Subject: `${name} Test message using Firebase`,
    Body: `Thank you ${name} for contacting and puting in the valuable feedback. I'll contact you ASAP.
            <br/>Name: ${name} <br/> Email: ${email} <br/> Feedback: ${feedback}`,
  }).then((message) => alert('The mail has been successfully sent'));
}
