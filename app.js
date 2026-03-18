// /Users/mo/.gemini/antigravity/scratch/riseos-webapp/js/app.js
import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from './firebase-config.js';

// Setup common UI logic and auth state listening
document.addEventListener("DOMContentLoaded", () => {
    
    // Auth state observer for routing and UI updates
    onAuthStateChanged(auth, async (user) => {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        
        // Handle navbar UI depending on auth
        updateNavbar(user);

        if (user) {
            // User is signed in. Let's check if they have paid.
            // In a real app, this should be done securely via backend. 
            // We simulate it here by checking Firestore.
            
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                
                const hasPaid = userDoc.exists() && userDoc.data().hasPaid === true;

                // Routing Rules
                if (page === 'login.html' || page === 'signup.html') {
                    if (hasPaid) {
                        window.location.href = 'dashboard.html';
                    } else {
                        window.location.href = 'payment.html';
                    }
                }

                if (page === 'dashboard.html' && !hasPaid) {
                    window.location.href = 'payment.html';
                }
                
                if (page === 'dashboard.html' && hasPaid) {
                    // Populate dashboard with user data
                    const welcomeName = document.getElementById('welcome-name');
                    if (welcomeName) {
                        welcomeName.textContent = user.displayName || 'Executioner';
                    }
                }

            } catch (error) {
                // Ignore Firestore errors on placeholder config
                console.warn("Firestore placeholder error, skipping payment check strictly", error);
                
                // Fallback basic routing if firestore throws (e.g. invalid API key)
                // We'll allow access to dashboard for testing purposes if they manage to sign in,
                // OR we can check local storage for our simulated payment success.
                const simulatedPayment = localStorage.getItem("hasPaid_" + user.uid);
                
                if (page === 'login.html' || page === 'signup.html') {
                    window.location.href = simulatedPayment ? 'dashboard.html' : 'payment.html';
                }
                if (page === 'dashboard.html' && !simulatedPayment) {
                    window.location.href = 'payment.html';
                }
                if (page === 'dashboard.html') {
                    const welcomeName = document.getElementById('welcome-name');
                    if (welcomeName) {
                        welcomeName.textContent = user.displayName || 'Executioner';
                    }
                }
            }
            
        } else {
            // User is signed out.
            if (page === 'dashboard.html' || page === 'payment.html') {
                window.location.href = 'login.html';
            }
        }
    });

    // Logout logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = 'login.html';
            }).catch((error) => {
                console.error("Sign out error", error);
            });
        });
    }
});

function updateNavbar(user) {
    const navAuthArea = document.getElementById('nav-auth');
    if (!navAuthArea) return;
    
    if (user) {
        navAuthArea.innerHTML = `
            <a href="dashboard.html" class="btn btn-secondary" style="margin-right: 10px; padding: 0.6rem 1.2rem; font-size: 0.95rem;">Dashboard</a>
            <button id="logout-btn" class="btn btn-logout">Logout</button>
        `;
        // Re-attach listener 
        document.getElementById('logout-btn').addEventListener('click', () => {
             signOut(auth).then(() => { window.location.href = 'index.html'; });
        });
    } else {
        navAuthArea.innerHTML = `
            <a href="login.html" class="btn btn-secondary" style="margin-right: 10px; padding: 0.6rem 1.2rem; font-size: 0.95rem;">Login</a>
            <a href="signup.html" class="btn btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.95rem;">Sign Up</a>
        `;
    }
}
