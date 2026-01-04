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
    // 2. State Management Functions
    window.openMobileSidebar = function () {
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeMobileSidebar = function () {
        if (sidebar) sidebar.classList.remove('active');

        // Check for filters sidebar (Marketplace specific)
        const filtersSidebar = document.getElementById('filtersSidebar');
        if (filtersSidebar) filtersSidebar.classList.remove('mobile-open');

        if (overlay) overlay.classList.remove('active');
        // Restore scrolling with a small delay to ensure it stays
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 50);
    };

    // 3. Toggle Click Handler
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (sidebar && sidebar.classList.contains('active')) {
                window.closeMobileSidebar();
            } else {
                window.openMobileSidebar();
            }
        });
    }

    // 4. Overlay Click Handler (Close on tap outside)
    if (overlay) {
        overlay.addEventListener('click', window.closeMobileSidebar);
    }

    // 5. Close on Window Resize (Protect layout)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
    });

    // 6. Alternative Toggle Support (Multiple buttons, different IDs)
    const setupToggle = (id) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (sidebar && sidebar.classList.contains('active')) {
                    window.closeMobileSidebar();
                } else {
                    window.openMobileSidebar();
                }
            });
        }
    };

    setupToggle('mobileMenuToggle');
    setupToggle('sidebarToggle');
    setupToggle('openSidebarBtn');
});
