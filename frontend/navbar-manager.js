// Navbar Manager - Handles auth state for all pages
function initializeNavbar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Get the auth buttons container
    const authContainer = document.querySelector('[data-auth-container]');

    if (!authContainer) {
        console.log('Auth container not found');
        return;
    }

    if (isLoggedIn && currentUser.email) {
        // User is logged in - show profile and logout
        const userName = currentUser.name || currentUser.email.split('@')[0];
        const userInitial = userName.charAt(0).toUpperCase();

        authContainer.innerHTML = `
            <a href="dashboard.html" style="color: white; text-decoration: none; font-weight: 600; font-size: 0.95rem; padding: 0.5rem 1rem;">📊 Dashboard</a>
            <div class="user-menu" style="display: flex; align-items: center; gap: 1rem;">
                <div class="user-avatar" style="width: 45px; height: 45px; background: rgba(255,255,255,0.3); border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; cursor: pointer;" onclick="toggleUserMenu()">
                    ${userInitial}
                </div>
                <button class="theme-toggle" id="themeToggle" title="Toggle Dark Mode" style="background: rgba(255,255,255,0.2); border: 2px solid white; color: white; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2em; font-weight: 700; transition: all 0.3s;">🌙</button>
            </div>
            <div id="userDropdown" style="display: none; position: absolute; top: 60px; right: 60px; background: var(--bg-card); border: 2px solid var(--border); border-radius: 8px; min-width: 200px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); z-index: 1000; background: #ffffff; color: #0c2340;">
                <div style="padding: 1rem; border-bottom: 1px solid #e0e0e0;">
                    <p style="font-weight: 600; margin: 0;">${userName}</p>
                    <p style="font-size: 0.85rem; color: #666; margin: 0.3rem 0 0 0;">${currentUser.email}</p>
                </div>
                <button onclick="logout()" style="width: 100%; padding: 0.75rem 1rem; background: none; border: none; text-align: left; cursor: pointer; color: #ef4444; font-weight: 600; transition: all 0.3s;">🚪 Logout</button>
            </div>
        `;

        // Theme toggle button after navbar init
        setTimeout(() => {
            setupThemeToggle();
        }, 100);
    } else {
        // User not logged in - show sign in/sign up
        authContainer.innerHTML = `
            <a href="signin.html" style="color: white; text-decoration: none; font-weight: 600; font-size: 0.95rem; padding: 0.5rem 1rem;">Sign In</a>
            <a href="signup.html" style="color: white; text-decoration: none; font-weight: 600; font-size: 0.95rem; padding: 0.5rem 1rem; background: rgba(255,255,255,0.2); border-radius: 6px;">Sign Up</a>
            <button class="theme-toggle" id="themeToggle" title="Toggle Dark Mode" style="background: rgba(255,255,255,0.2); border: 2px solid white; color: white; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2em; font-weight: 700; transition: all 0.3s;">🌙</button>
        `;

        // Theme toggle button after navbar init
        setTimeout(() => {
            setupThemeToggle();
        }, 100);
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastCalculation');
    window.location.href = 'index.html';
}

// Track user registrations
function trackUserSignup(userEmail, userName) {
    try {
        let users = JSON.parse(localStorage.getItem('bizcalc_registered_users') || '[]');
        const userExists = users.some(u => u.email === userEmail);

        if (!userExists) {
            users.push({
                email: userEmail,
                name: userName,
                signupDate: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            });
            localStorage.setItem('bizcalc_registered_users', JSON.stringify(users));
        } else {
            // Update last login for existing user
            users = users.map(u =>
                u.email === userEmail ? {...u, lastLogin: new Date().toISOString()} : u
            );
            localStorage.setItem('bizcalc_registered_users', JSON.stringify(users));
        }
    } catch (e) {
        console.error('Error tracking user:', e);
    }
}

// Get all registered users (for admin/tracking)
function getRegisteredUsers() {
    try {
        return JSON.parse(localStorage.getItem('bizcalc_registered_users') || '[]');
    } catch (e) {
        return [];
    }
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && !e.target.closest('.user-menu') && !e.target.closest('.user-avatar')) {
        dropdown.style.display = 'none';
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', initializeNavbar);
