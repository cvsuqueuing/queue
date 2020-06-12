// DOM elements
const guideList = document.querySelector('.queuereg');
const guideList2 = document.querySelector('.queueirreg');
const guideList3 = document.querySelector('.queuecog');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('customers').doc(user.uid).get().then(doc => {
      const html = `
        <div class="left-align"><h5>Email: ${user.email}</h5></div>
        <div class="left-align"><h5>Name: ${doc.data().name}</h5></div>
        <div class="left-align"><h5>College: ${doc.data().college}</h5></div>
        <div class="left-align"><h5>Couse: ${doc.data().course}</h5></div>
        <div class="left-align"><h5>Student Number: ${doc.data().StudentNumber}</h5></div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup queues
const setupQueues = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const queue = doc.data();
      const li = `
          <li>
          <div class="collapsible-header indigo white-text">${queue.name}
          <br>${queue.StudentNumber}
          <br>${queue.course}
          </div>
          </li>
        `;
      html += li;
    });
    guideList.innerHTML = '<div><center><h3>REG FORM REGULAR</h3><a href="#" class="btn indigo darken-5 z-depth-4 modal-trigger" data-target="modal-queue">Take this Queue</a></center></div><br>' + html;
  } else {
    guideList.innerHTML = '';
  }

};
const setupQueues2 = (data) => {

  if (data.length) {
    let html2 = '';
    data.forEach(doc => {
      const queue2 = doc.data();
      const li2 = `
        <li>
          <div class="collapsible-header indigo white-text">${queue2.name}
          <br>${queue2.StudentNumber}
          <br>${queue2.course}
          </div>
        </li>
      `;
      html2 += li2;
    });
    guideList2.innerHTML = '<div><center><h3>REG FORM IRREGULAR</h3><a href="#" class="btn indigo darken-5 z-depth-4 modal-trigger" data-target="modal-queue2">Take this Queue</a></center><br></div>' + html2;
  } else {
    guideList2.innerHTML = '';
  }

};
const setupQueues3 = (data) => {

  if (data.length) {
    let html3 = '';
    data.forEach(doc => {
      const queue3 = doc.data();
      const li3 = `
        <li>
          <div class="collapsible-header indigo white-text">${queue3.name}
          <br>${queue3.StudentNumber}
          <br>${queue3.course}
          </div>
        </li>
      `;
      html3 += li3;
    });
    guideList3.innerHTML = '<div><center><h3>CERTIFICATE OF GRADES</h3><a href="#" class="btn indigo darken-5 z-depth-4 modal-trigger" data-target="modal-queue3">Take this Queue</a></center><br></div>' + html3;
  } else {
    guideList3.innerHTML = '';
  }

};
// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});