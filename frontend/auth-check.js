// Authentication Check Utility
// Call this on pages that require authentication

function checkAuthentication() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  // If not logged in, redirect to signin
  if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = 'signin.html';
    return false;
  }

  return true;
}

// Auto-check on page load
document.addEventListener('DOMContentLoaded', function() {
  checkAuthentication();
});

// Optional: Function to get user info
function getUserInfo() {
  return {
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName'),
    userEmail: sessionStorage.getItem('userEmail')
  };
}

// Optional: Function to logout
function logout() {
  sessionStorage.clear();
  window.location.href = 'signin.html';
}
