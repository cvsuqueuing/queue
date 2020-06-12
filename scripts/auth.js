// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('qregformreg').orderBy('time').onSnapshot(snapshot => {
      setupQueues(snapshot.docs);
    }, err => console.log(err.message));
    db.collection('qregformirreg').orderBy('time').onSnapshot(snapshot => {
      setupQueues2(snapshot.docs);
    }, err => console.log(err.message));
    db.collection('qcog').orderBy('time').onSnapshot(snapshot => {
      setupQueues3(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupQueues([]);
    setupQueues2([]);
    setupQueues3([]);
  }
});

// add account
const addAccount = document.querySelector('#signup-form');
addAccount.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = addAccount['signup-email'].value;
  const password = addAccount['signup-password'].value;

  // add account & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    swal(email, {
      title: "ADDED NEW ACCOUNT!",
      icon: "success",
    });
    return db.collection('customers').doc(cred.user.uid).set({
      name: addAccount['signup-name'].value,
      college: addAccount['signup-college'].value,
      course: addAccount['signup-course'].value,
      StudentNumber: addAccount['signup-StudentNumber'].value,
      time: Date.now()
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    addAccount.reset();
    auth.signOut();
  });
});

// add queue to regform regular
const addQueue = document.querySelector('#qform');
addQueue.addEventListener('submit', (e) => {
  e.preventDefault();
  // db.collection('qregformreg').add({
  //   name: addQueue['qname'].value,
  //   course: addQueue['qcourse'].value,
  //   StudentNumber: addQueue['qStudentNumber'].value,
  //   time: Date.now()
  // })
  //close the modal
  const modal = document.querySelector('#modal-queue');
  M.Modal.getInstance(modal).close();
  addQueue.reset();
  swal({
    title: "You are currently in a queue!",
    icon: "error",
  });
});
  // add queue to regform irregular
  const addQueue2 = document.querySelector('#q2form');
  addQueue2.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('qregformirreg').add({
      name: addQueue2['q2name'].value,
      course: addQueue2['q2course'].value,
      StudentNumber: addQueue2['q2StudentNumber'].value,
      time: Date.now()
    })
    //close the modal
    const modal = document.querySelector('#modal-queue2');
    M.Modal.getInstance(modal).close();
    addQueue2.reset();
    swal({
      title: "You are now in the queue!",
      icon: "success",
    });
  });

// add queue to cog
const addQueue3 = document.querySelector('#q3form');
addQueue3.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('qcog').add({
    name: addQueue3['q3name'].value,
    course: addQueue3['q3course'].value,
    StudentNumber: addQueue3['q3StudentNumber'].value,
    time: Date.now()
  })
  //close the modal
  const modal = document.querySelector('#modal-queue3');
  M.Modal.getInstance(modal).close();
  addQueue3.reset();
  swal({
    title: "You are now in the Queue!",
    icon: "success",
  });
});
// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  auth.signOut();
});
// login
const errorElement = document.getElementById('error-message');
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    swal({
      title: "You are now signed in!",
      icon: "success",
    });
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
  if (email === 'csso@gmail.com') {
    swal({
      title: "INCORRECT EMAIL OR PASSWORD!",
      icon: "error",
    });
  }
});