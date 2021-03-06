/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
The authentication sample code with some helper functions to render the username/user record name and to construct
    the auth button containers.
*/
CKCatalog.tabs['authentication'] = (function() {

  var displayUserName = function(name) {
    var userNameEl = document.getElementById('username');
    userNameEl.textContent = name;
    var displayedUserName = document.getElementById('displayed-username');
    if(displayedUserName) {
      displayedUserName.textContent = name;
    }
  };

  var createButtonContainersHTML = function() {
    return '<div>'+
      '<h2 id="displayed-username"></h2>'+
      '<div id="apple-sign-in-button"></div>'+
      '<div id="apple-sign-out-button"></div>'+
    '</div>';
  };

  var authSample = {
    run: function() {
      var content = this.content;
      content.innerHTML = createButtonContainersHTML();
      return this.sampleCode().then(function() {
        return content.firstChild;
      });
    },
    sampleCode: function demoSetUpAuth() {

      // Get the container.
      var container = CloudKit.getDefaultContainer();

      function gotoAuthenticatedState(userInfo) {
        if(userInfo.isDiscoverable) {
          displayUserName(userInfo.firstName + ' ' + userInfo.lastName);
        } else {
          displayUserName('User record name: ' + userInfo.userRecordName);
        }
        container
          .whenUserSignsOut()
          .then(gotoUnauthenticatedState);
      }
      function gotoUnauthenticatedState() {
        displayUserName('Unauthenticated User');
        container
          .whenUserSignsIn()
          .then(gotoAuthenticatedState)
          .catch(gotoUnauthenticatedState);
      }

      // Check a user is signed in and render the appropriate button.
      return container.setUpAuth()
        .then(function(userInfo) {

          // Either a sign-in or a sign-out button was added to the DOM.

          // userInfo is the signed-in user or null.
          if(userInfo) {
            gotoAuthenticatedState(userInfo);
          } else {
            gotoUnauthenticatedState();
          }
        });
    }
  };

  return [ authSample ];

})();