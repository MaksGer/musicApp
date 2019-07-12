;overwriteToServer('activeUser', JSON.stringify(null));
let signUpButton = document.getElementById('sign-up-button');
let signUpModalWindow = document.getElementById('sign-up-modal');
let signUpModalWindowClose = document.getElementById('sign-up-modal__close');

let logInButton = document.getElementById('log-in-button');
let logInModalWindow = document.getElementById('log-in-modal');
let logInModalWindowClose = document.getElementById('log-in-modal__close');

let successfulSignUpModal = document.getElementById('successful-sign-up-modal');
let signUpModalFormButton = document.getElementById('sign-up-modal--form--button');

let successfulSignUpModalClose = document.getElementById('successful-sign-up-modal__close');

let logInModalFormButton = document.getElementById('log-in-modal--form--button');

/* modal window sign up*/
let firstName= document.getElementById('first-name');
let firstNameError = document.getElementById('first-name-error');

let lastName= document.getElementById('last-name');
let lastNameError = document.getElementById('last-name-error');

let username = document.getElementById('username');
let usernameError = document.getElementById('username-error');

let password = document.getElementById('password');
let passwordError = document.getElementById('password-error');

let logInModalSameUsername = document.getElementById('log-in-error-same-username');

/* */

logInButton.addEventListener("click", function () {
    logInModalWindow.style.display = 'flex';
});

logInModalWindowClose.addEventListener("click", function () {
	document.getElementById('log-in-username').value = '';
	document.getElementById('log-in-password').value = '';
	document.getElementById('log-in-error').style.display = 'none';

	logInModalWindow.style.display = 'none';
});

signUpButton.addEventListener("click", function () {
    signUpModalWindow.style.display = 'flex';
});

signUpModalWindowClose.addEventListener("click", function () {
		clearModalInputElements();
		hideModalErrorElements();
    signUpModalWindow.style.display = 'none';
});

signUpModalFormButton.addEventListener("click", signingUp);

successfulSignUpModalClose.addEventListener("click", function () {
    successfulSignUpModal.style.display = 'none';
});

logInModalFormButton.addEventListener("click", logingIn);

function signingUp () {

    hideModalErrorElements();

    if (firstName.value.length === 0) {
        (function () {firstNameError.style.display = 'block'; firstName.style.marginBottom = '3px';} ())
    } else if (lastName.value.length === 0) {
        (function () {lastNameError.style.display = 'block'; lastName.style.marginBottom = '3px';} ())
    } else if (username.value.length === 0) {
        (function () {usernameError.style.display = 'block'; username.style.marginBottom = '3px';} ())
    } else if (password.value.length === 0) {
        (function () {passwordError.style.display = 'block'; password.style.marginBottom = '3px';} ())
    } else {
        let users = JSON.parse(getFromServer('users'));
        console.log(username.value);
        if (username.value in users) {
					(function () {logInModalSameUsername.style.display = 'block'; username.style.marginBottom = '3px';} ())
        } else {
					users[username.value] = {'password': password.value, playLists: {}};
					let usersJSON = JSON.stringify(users);
					overwriteToServer('users', usersJSON);
					signUpModalWindow.style.display = 'none';
					successfulSignUpModal.style.display = 'flex';
        }
    }
}

function logingIn () {
let logInUsername = document.getElementById('log-in-username').value;
let	logInPassword = document.getElementById('log-in-password').value;
let logInError = document.getElementById('log-in-error');
logInError.style.display = 'none';
    let users = JSON.parse(getFromServer('users'));
    if (users[logInUsername]) {
        (function () {
            if (logInPassword === users[logInUsername].password) {
								overwriteToServer('activeUser', JSON.stringify(logInUsername));
                goTo('privateOffice.html');
            } else {
               logInError.style.display = 'block';
            }
        }());
        
    } else {
        logInError.style.display = 'block';
    }
}

function hideModalErrorElements() {
	firstNameError.style.display = 'none';
	lastNameError.style.display = 'none';
	usernameError.style.display = 'none';
	passwordError.style.display = 'none';
	logInModalSameUsername.style.display = 'none';
}

function clearModalInputElements() {
	firstName.value = '';
	lastName.value = '';
	username.value = '';
	password.value = '';
}