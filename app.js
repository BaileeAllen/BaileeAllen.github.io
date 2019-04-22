var characters = null;
var selectedCharacterId = null;

var modal = document.getElementById('myModal');
var modalContent = document.getElementsByClassName('modal-content')[0];
var span = document.getElementsByClassName("close")[0];

var helloModal = document.getElementById('helloModal');


var signupModal = document.getElementById('signupModal');
var loginModal = document.getElementById('loginModal');
var successfulLoginModal = document.getElementById('successfulLoginModal');
var postSigninModal = document.getElementById('postSigninModal');


var goToSiteButton = document.getElementById('goToSiteButton');
var GoToLoginButton = document.querySelector("#GoToLoginButton");
var GoToSignupButton = document.querySelector("#GoToSignUpButton");

var loginInstead = document.querySelector("#loginInstead");
var signupInstead = document.querySelector("#signupInstead");








span.onclick = function() {
  modal.style.display = "none";
};

var createCharacter = function (name, level, race, cclass, alignment, XP) {
  var data = "name=" + encodeURIComponent(name);
  data += "&level=" + encodeURIComponent(level);
  data += "&race=" + encodeURIComponent(race);
  data += "&cclass=" + encodeURIComponent(cclass);
  data += "&alignment=" + encodeURIComponent(alignment);
  data += "&XP=" + encodeURIComponent(XP);

  fetch("https://dnd-server-baileeallen.herokuapp.com/dndCharacters", {
    method: 'POST',
    body: data,
    credentials: "include",
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("character saved.");
    // load the new list of characters!
    updateList();
    document.getElementById("name").value = "";
    document.getElementById("level").value = "";
    document.getElementById("cclass").value = "";
    document.getElementById("race").value = "";
    document.getElementById("alignment").value = "";
    document.getElementById("XP").value = "";

  });
};

var deleteCharacter = function (id) {
  fetch(`https://dnd-server-baileeallen.herokuapp.com/dndCharacters/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(function (response) {
    console.log("character deleted.");
    // one more thing to do: refresh the characters
    updateList();
  });
};


var updateCharacter = function (name, level, race, cclass, alignment, XP, id) {
  var data = "name=" + encodeURIComponent(name);
  data += "&level=" + encodeURIComponent(level);
  data += "&race=" + encodeURIComponent(race);
  data += "&cclass=" + encodeURIComponent(cclass);
  data += "&alignment=" + encodeURIComponent(alignment);
  data += "&XP=" + encodeURIComponent(XP);

  fetch(`https://dnd-server-baileeallen.herokuapp.com/dndCharacters/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("character updated.");
    // load the new list of characters!
    updateList();
    modal.style.display = "none";
  });
};

var sessionCreate = function (email, password) {
  var data = "email=" + encodeURIComponent(email);
  data += "&password=" + encodeURIComponent(password);

  fetch(`https://dnd-server-baileeallen.herokuapp.com/dndSessions`, {
    method: 'POST',
    credentials: 'include',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if (response.status == 401) {
      document.getElementById("loginModalH4").innerHTML= "Aww Shucks! That didn't work. Try again."
    } else {
      console.log("Session created.");
      updateList();
      loginModal.style.display = "none";
      successfulLoginModal.style.display = "block";
      goToSiteButton.onclick = function () {
        successfulLoginModal.style.display = "none";
        helloModal.style.display = "none";

      };
    }
    
  });
};

var UsersCreate = function (firstName, lastName, username, email, password) {
  var data = "firstName=" + encodeURIComponent(firstName);
  data += "&lastName=" + encodeURIComponent(lastName);
  data += "&username=" + encodeURIComponent(username);
  data += "&email=" + encodeURIComponent(email);
  data += "&password=" + encodeURIComponent(password);


  fetch(`https://dnd-server-baileeallen.herokuapp.com/dndUsers`, {
    method: 'POST',
    credentials: 'include',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if (response.status == 422) {
      document.getElementById("signupModalH4").innerHTML= "Aww Shucks! That email is taken. Try again."
    } else {
    console.log("User Created.");
    signupModal.style.display = "none";
    postSignupModal.style.display = "block";
    var GoToLoginButtonFromSignup = document.querySelector("#GoToLoginButtonFromSignup");

    GoToLoginButtonFromSignup.onclick = function () {
      postSignupModal.style.display = "none";
      loginModal.style.display = "block";
    };

    loginButton.onclick = function () {
      loginEmail = document.getElementById("loginEmail").value;
      loginPassword = document.getElementById("loginPassword").value;
      sessionCreate(loginEmail, loginPassword);
    };

    loginInstead.onclick = function () {
        signinModal.style.display = "none";
        loginModal.style.display = "block"; };
    };


  });
};

var theButton = document.querySelector("#the-button");
console.log("the button is", theButton);
theButton.onclick = function () {
  var nameInput = document.querySelector("#name");
  var levelInput = document.querySelector("#level");
  var raceInput = document.querySelector("#race");
  var cclassInput = document.querySelector("#cclass");
  var alignmentInput = document.querySelector("#alignment");
  var xpInput = document.querySelector("#XP");

  var name = nameInput.value;
  var level = levelInput.value;
  var race = raceInput.value;
  var cclass = cclassInput.value;
  var alignment = alignmentInput.value;
  var XP = xpInput.value;

  createCharacter(name, level, race, cclass, alignment, XP);
};

var masterButton = document.querySelector("#master-button");
console.log("the button is", masterButton);
masterButton.onclick = function () {
  var master = document.getElementById("master").value;
  document.getElementById("master").value = "";
  document.getElementById("masterName").innerHTML= master;
  };

var campaignButton = document.querySelector("#campaign-button");
console.log("the button is", campaignButton);
campaignButton.onclick = function () {
  var campaign = document.getElementById("campaign").value;
  document.getElementById("campaign").value = "";
  document.getElementById("h1").innerHTML= campaign;
  document.getElementById("campaignName").innerHTML= campaign;
  };



var updateList = function () {
  fetch("https://dnd-server-baileeallen.herokuapp.com/dndCharacters", {
    credentials: 'include'
  }).then(function (response) {
    if (response.status == 401) {
      //TODO: show the login/register forms
      helloModal.style.display = "block";
      return;
    }
    if (response.status != 200) {
      //SOMETHING WEIRD/UNEXPECTED, maybe show some kind of confused emoji or something.
      alert("&#1F409; GET OUTTA HERE YOU DON'T BELONG");
      return;
    }

    response.json().then(function (data) {
      // show appropriate divs for data
      
      // save all of the data into a global variable (to use later)
      characters = data;

      // data is an array of string values
      var characterList = document.querySelector("#characters");
      characterList.innerHTML = "";
      // add the characters to the list
      data.forEach(function (character) { // for character in data
        var newItem = document.createElement("li");

        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = character.name;
        nameDiv.className = "character-name";
        newItem.appendChild(nameDiv);

        var infoDiv = document.createElement("div");
        infoDiv.className = "character-level";
        newItem.appendChild(infoDiv);

        if (character.level) {
          infoDiv.innerHTML = `Level: ${character.level}`;
        } else {
          infoDiv.innerHTML = "No level available";
        }

        //var raceDiv = document.createElement("div");
        if (character.race) {
          infoDiv.innerHTML += ` | Race: ${character.race}`;
        } else {
          infoDiv.innerHTML += " | No race available";
        }

        if (character.class) {
          infoDiv.innerHTML += ` | Class: ${character.class}`;
        } else {
          infoDiv.innerHTML += " | No class available";
        }

        if (character.alignment) {
          infoDiv.innerHTML += ` | Alignment: ${character.alignment}`;
        } else {
          infoDiv.innerHTML += " | No alignment available";
        }

        if (character.XP) {
          infoDiv.innerHTML += ` | XP: ${character.XP}`;
        } else {
          infoDiv.innerHTML += " | No alignment available";
        }
        //raceDiv.className = "character-race";
        // newItem.appendChild(levelDiv);

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () {
          var proceed = confirm(`Do you want to delete ${character.name}?`);
          if (proceed) {
            deleteCharacter(character.id);
          }
        };
        newItem.appendChild(deleteButton);

        var openUpdateButton = document.createElement("button");
        openUpdateButton.innerHTML = "Update";
        openUpdateButton.id = 'openUpdate';
        openUpdateButton.onclick = function () {
          modal.style.display = "block";
          document.getElementById("updatename").value = character.name;
          document.getElementById("updatelevel").value = character.level;
          document.getElementById("updaterace").value = character.race;
          document.getElementById("updatecclass").value = character.class;
          document.getElementById("updatealignment").value = character.alignment;
          document.getElementById("updateXP").value = character.XP;
          selectedCharacterId = character.id;
        };
        newItem.appendChild(openUpdateButton);

        characterList.appendChild(newItem);
      });
    });
  });
};

var updateCharacterButton = document.querySelector("#updateCharacterButton");
updateCharacterButton.onclick = function () {
  newName = document.getElementById("updatename").value;
  newLevel = document.getElementById("updatelevel").value;
  newRace = document.getElementById("updaterace").value;
  newCclass = document.getElementById("updatecclass").value;
  newAlignment = document.getElementById("updatealignment").value;
  newXP = document.getElementById("updateXP").value;
  updateCharacter(newName, newLevel, newRace, newCclass, newAlignment, newXP, selectedCharacterId);
};

GoToLoginButton.onclick = function () {
  loginModal.style.display = "block";
  loginButton.onclick = function () {
    loginEmail = document.getElementById("loginEmail").value;
    loginPassword = document.getElementById("loginPassword").value;
    sessionCreate(loginEmail, loginPassword);
  };
};

GoToSignupButton.onclick = function () {
  signupModal.style.display = "block";
  signupButton.onclick = function () {
    newFirstName = document.getElementById("newFirstName").value;
    newLastName = document.getElementById("newLastName").value;
    newUsername = document.getElementById("newUsername").value;
    newEmail = document.getElementById("newEmail").value;
    newPassword = document.getElementById("newPassword").value;
    UsersCreate(newFirstName, newLastName, newUsername, newEmail, newPassword);
  };
};

loginInstead.onclick = function () {
  signupModal.style.display = "none";
  loginModal.style.display = "block"; };

signupInstead.onclick = function () {
  loginModal.style.display = "none";
  signupModal.style.display = "block"; };


var loadFile = function(event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
  };



window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

 updateList();







