// Authentication Check Utility
// Prevents repeated signin prompts - robust session-based auth

let hasCheckedAuth = false;
let authCheckInProgress = false;

function checkAuthentication() {
  // Prevent multiple simultaneous checks
  if (authCheckInProgress) return;
  if (hasCheckedAuth) return true;

  authCheckInProgress = true;

  try {
    // Get current file path (lowercase for comparison)
    const currentHref = window.location.href.toLowerCase();

    // Skip auth check on auth pages - these should never redirect
    if (currentHref.includes('signin') ||
        currentHref.includes('signup') ||
        currentHref.includes('auth-gate')) {
      hasCheckedAuth = true;
      authCheckInProgress = false;
      return true;
    }

    // Check if user is authenticated
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userId = sessionStorage.getItem('userId');

    // User is authenticated - allow access
    if (isLoggedIn === 'true' && userId) {
      hasCheckedAuth = true;
      authCheckInProgress = false;
      return true;
    }

    // User not authenticated - redirect to signin ONCE
    hasCheckedAuth = true;
    authCheckInProgress = false;
    window.location.href = 'signin.html';
    return false;
  } catch (error) {
    console.error('Auth check error:', error);
    authCheckInProgress = false;
    return false;
  }
}

// Auto-check on page load (DOM must be ready first)
document.addEventListener('DOMContentLoaded', function() {
  checkAuthentication();
});

// Get user info from sessionStorage
function getUserInfo() {
  return {
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName'),
    userEmail: sessionStorage.getItem('userEmail')
  };
}

// Logout function - clears auth and redirects
function logout() {
  sessionStorage.clear();
  hasCheckedAuth = false;
  authCheckInProgress = false;
  window.location.href = 'signin.html';
}
