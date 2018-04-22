var githubFinder = (function() {
  
    var module = {

      searchUser: null,
      github: new Github,
      ui: new UI,
      
      searchFor: function(e) {
        const userText = e.target.value;
        if(userText !== ''){
          module.github.getUser(userText)
          .then(data => {
            console.log('data: ', data);
            if(data.profile.message === 'Not Found') {
              module.ui.showAlert('User not found', 'alert alert-danger');
            } else {
              module.ui.showProfile(data.profile);
              module.ui.showRepos(data.repos);
            }
          })
        } else {
          module.ui.clearProfile();
        }
      },
  
      addListeners: function() {
        module.searchUser.addEventListener('keyup', module.searchFor);
      },
  
      initUI: function() {
        module.searchUser = document.getElementById('searchUser');
        module.addListeners();
      },
  
      init: function() {
        module.initUI();
        console.log('- githubFinder initialized');
      }
    };
  
    return {
      init: module.init
    };
  
  })();
  
  document.addEventListener('DOMContentLoaded', githubFinder.init());
  