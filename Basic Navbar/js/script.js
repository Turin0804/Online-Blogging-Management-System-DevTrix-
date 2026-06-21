document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'bi bi-sun-fill';
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill';
    }
  }

  // Dynamic Navigation Link Active States
  const navLinks = document.querySelectorAll('.nav-link-custom');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Footer Year Auto-Update
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Mock Newsletter Form Submit
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const originalText = newsletterForm.querySelector('button').innerHTML;
        newsletterForm.querySelector('button').innerHTML = '<i class="bi bi-check2"></i> Subscribed!';
        newsletterForm.querySelector('button').classList.replace('btn-primary-custom', 'btn-success');
        emailInput.value = '';
        
        setTimeout(() => {
          newsletterForm.querySelector('button').innerHTML = originalText;
          newsletterForm.querySelector('button').classList.replace('btn-success', 'btn-primary-custom');
        }, 3000);
      }
    });
  }

  // Mobile Menu Toggling
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', (e) => {
      e.stopPropagation();
      navbarCollapse.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (navbarCollapse.classList.contains('show') && !navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
        navbarCollapse.classList.remove('show');
      }
    });
  }

  // ==========================================
  // AUTHENTICATION SIMULATION LOGIC
  // ==========================================
  
  const mockUsers = {
    guest: {
      name: "",
      role: "",
      avatar: "",
      description: "<strong>Guest Mode:</strong> Shows public pages (Home, Blogs, Categories, About, Contact) and the Sign In menu. Right side displays options to log in or register."
    },
    user: {
      name: "Jane Cooper",
      role: "Reader",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      description: "<strong>Standard User Mode:</strong> Shows public links + My Profile. Login menu is replaced by user avatar dropdown menu (My Profile, Settings, Logout). No 'Create Post' button is visible."
    },
    author: {
      name: "Sarah Jenkins",
      role: "Author",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      description: "<strong>Author Mode:</strong> Extends user mode by adding a premium <strong>'Create Post'</strong> action button in the navbar for writing new articles."
    },
    admin: {
      name: "Alex Vance",
      role: "Administrator",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
      description: "<strong>Administrator Mode:</strong> Shows full authorization links. User is marked as Administrator and has full access including the <strong>'Create Post'</strong> CTA."
    }
  };

  const stateDescription = document.getElementById('state-description');
  const profileAvatar = document.getElementById('profile-avatar');
  const profileNameMobile = document.getElementById('profile-name-mobile');
  const profileUserName = document.getElementById('profile-user-name');
  const profileUserRole = document.getElementById('profile-user-role');
  const stateToggleButtons = document.querySelectorAll('.btn-state-toggle');

  // Core function to set authentication state
  function setAuthState(state) {
    const userDetails = mockUsers[state] || mockUsers.guest;
    
    // Set state attribute on body tag (controls CSS selectors)
    document.body.setAttribute('data-auth-state', state);

    // Update Profile Information
    if (state !== 'guest') {
      if (profileAvatar) profileAvatar.src = userDetails.avatar;
      if (profileNameMobile) profileNameMobile.textContent = userDetails.name;
      if (profileUserName) profileUserName.textContent = userDetails.name;
      if (profileUserRole) profileUserRole.textContent = userDetails.role;
    }

    // Update Description Panel
    if (stateDescription) {
      stateDescription.innerHTML = userDetails.description;
    }

    // Update Active Simulation Button state
    stateToggleButtons.forEach(btn => {
      if (btn.getAttribute('data-state') === state) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Trigger login simulation from navbar options
  document.querySelectorAll('.simulate-login, .simulate-register').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const role = item.getAttribute('data-role');
      setAuthState(role);
    });
  });

  // Handle Logout trigger
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setAuthState('guest');
    });
  }

  // Simulator Panel state buttons click
  stateToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetState = btn.getAttribute('data-state');
      setAuthState(targetState);
    });
  });
});
