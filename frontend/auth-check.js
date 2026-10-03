// Authentication Check Utility
// Prevents repeated signin prompts - robust session-based auth

let hasCheckedAuth = false;
let authCheckInProgress = false;
let redirectAttempts = 0;
const MAX_REDIRECT_ATTEMPTS = 2;

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
    const authToken = sessionStorage.getItem('authToken');
    const lastAuthToken = localStorage.getItem('lastAuthToken');

    // User is authenticated - allow access
    if (isLoggedIn === 'true' && userId && authToken) {
      hasCheckedAuth = true;
      authCheckInProgress = false;
      console.log('✓ Auth check passed');
      return true;
    }

    // Check if just signed in (authToken in localStorage)
    if (lastAuthToken && !authToken) {
      // Recently signed in, restore sessionStorage
      console.log('Restoring auth from localStorage...');
      hasCheckedAuth = false;
      authCheckInProgress = false;
      return true;
    }

    // User not authenticated - redirect to signin (with attempt counter)
    redirectAttempts++;
    if (redirectAttempts > MAX_REDIRECT_ATTEMPTS) {
      console.warn('Too many redirect attempts, clearing auth and staying on page');
      hasCheckedAuth = true;
      authCheckInProgress = false;
      return false;
    }

    console.log('Auth check failed, redirecting to signin (attempt ' + redirectAttempts + ')');
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
  // Small delay to ensure sessionStorage is ready
  setTimeout(checkAuthentication, 100);
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
