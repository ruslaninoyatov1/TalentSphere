/* ============================================================
   UNIVERSAL MOBILE SIDEBAR LOGIC
   Handles sidebar toggle, overlay, and layout fixes globally.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements Selection
    const toggleBtn = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('dashboardSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // 2. State Management Functions
    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // 3. Toggle Click Handler
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (sidebar && sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // 4. Overlay Click Handler (Close on tap outside)
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // 5. Close on Window Resize (Protect layout)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
    });

    // 6. Support for the alternative ID 'mobileMenuToggle' (Legacy consistency)
    const altToggleBtn = document.getElementById('mobileMenuToggle');
    if (altToggleBtn) {
        altToggleBtn.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            }
        });
    }
});
