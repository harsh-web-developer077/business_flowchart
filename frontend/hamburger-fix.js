// Improved Hamburger Menu - Mobile Fix
// Include this script on all pages

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) {
        console.warn('Hamburger menu elements not found');
        return;
    }

    // Open/Close Menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        console.log('Menu toggled - Active:', hamburger.classList.contains('active'));
    });

    // Close menu when link is clicked
    const navLinks_items = navLinks.querySelectorAll('a');
    navLinks_items.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            console.log('Menu closed - Link clicked');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle touch events (better for mobile)
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        hamburger.click();
    });

    console.log('Hamburger menu initialized');
});
