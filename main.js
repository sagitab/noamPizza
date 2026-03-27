document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initCallButtons();
    initWhatsApp();
    initCTAButtons();
    initContactForm();
    initInstagramLinks();
    initScrollToTop();
    initCart();
});

const PHONE = '972547566033';
const ISRAEL_LOCAL = '054-7566033'; // Best guess formatting for visual display if needed
const EMAIL = 'noamfrenkel111@gmail.com';
// Move isHome to the top level so all functions can see it
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const isHome = currentPage === "index.html" || currentPage === "";

function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");

    if (!toggle || !menu) {
        console.log("menu-toggle or mobile-menu not found");
        return;
    }

    console.log("Mobile menu initialized");

    toggle.addEventListener("click", () => {
        console.log("CLICK WORKS");
        menu.classList.toggle("hidden");
    });
}

function initNavigation() {
    const routes = {
        'בית': 'index.html',
        'עלינו': 'about.html',
        'צור קשר': 'contact.html',
        'תפריט': isHome ? '#menu' : 'index.html#menu',
        'גלריה': isHome ? '#gallery' : 'index.html#gallery',
        'ביקורות': isHome ? '#reviews' : 'index.html#reviews'
    };

    // 1. Get Desktop and Footer links
    let allLinks = Array.from(document.querySelectorAll('nav a, footer a'));

    // 2. Get Mobile Menu links and add them to the array
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    allLinks = allLinks.concat(Array.from(mobileLinks));

    console.log('Total links found:', allLinks.length);

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkText = link.textContent.trim();
            
            if (routes[linkText]) {
                // If it's an anchor link (#menu) on the home page, let it scroll
                // If it's a page link (about.html), let it navigate
                link.href = routes[linkText];
                
                // Close mobile menu if it's open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('hidden');
            }
        });
    });

    // 3. Attach Scroll Spy (Moved inside the init for cleaner execution)
    if (isHome) {
        initScrollSpy(allLinks);
    }
}

function initScrollSpy(links) {
    const sections = document.querySelectorAll("section[id]");
    
    window.addEventListener("scroll", () => {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            const href = link.getAttribute('href');
            // Reset styles
            link.classList.remove('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
            
            // Apply active styles
            if (href === `#${currentSection}` || href === `index.html#${currentSection}`) {
                link.classList.add('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
            }
        });
    });
}
    document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    emailjs.send("service_6x6mxrp", "template_8c1igw9", {
        name: document.querySelector('[name="name"]').value,
        phone: document.querySelector('[name="phone"]').value,
        email: document.querySelector('[name="email"]').value,
        message: document.querySelector('[name="message"]').value
    })
    .then(function(response) {
        alert("ההודעה נשלחה בהצלחה! 🎉");
    }, function(error) {
        alert("שגיאה בשליחה ❌");
    });
});
    // ------------------------
    // Scroll Spy for homepage sections
    // ------------------------
    if (isHome) {
        const sections = document.querySelectorAll("section[id]");
        window.addEventListener("scroll", () => {
            let currentSection = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    currentSection = section.getAttribute("id");
                }
            });

            links.forEach(link => {
                const href = link.getAttribute('href');

                // reset
                link.classList.remove('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
                link.classList.add('text-on-surface');

                // match section
                if (
                    href === `#${currentSection}` ||
                    href === `index.html#${currentSection}`
                ) {
                    link.classList.add('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
                    link.classList.remove('text-on-surface');
                }

                // keep "home" active at top
                if (window.scrollY < 100 && href === "index.html") {
                    link.classList.add('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
                    link.classList.remove('text-on-surface');
                }
            });
        });
    }
    // ------------------------
    // 2. SCROLL SPY (ONLY HOMEPAGE)
    // ------------------------
    if (isHome) {
        const sections = document.querySelectorAll("section[id]");

        window.addEventListener("scroll", () => {
            let currentSection = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    currentSection = section.getAttribute("id");
                }
            });

            links.forEach(link => {
                const href = link.getAttribute("href");

                // reset
                link.classList.remove('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
                link.classList.add('text-on-surface');

                // match section
                if (
                    href === `#${currentSection}` ||
                    href === `index.html#${currentSection}`
                ) {
                    link.classList.add('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
                    link.classList.remove('text-on-surface');
                }

                // keep "home" active at top
                if (window.scrollY < 100 && href === "index.html") {
                    link.classList.add('text-primary', 'font-extrabold', 'border-b-2', 'border-primary');
                    link.classList.remove('text-on-surface');
                }
            });
        });
    }


function initCallButtons() {
    document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
        btn.setAttribute('href', `tel:${PHONE}`);
        btn.addEventListener('click', () => {
            console.log(`[Tracking] Call button clicked at: ${new Date().toISOString()}`);
        });
    });
}

function initWhatsApp() {
    const waBaseMsg = encodeURIComponent('שלום אני רוצה להזמין פיצה');
    const waLink = `https://wa.me/${PHONE}?text=${waBaseMsg}`;

    // Replace all existing WhatsApp links
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(link => {
        link.setAttribute('href', waLink);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Add Floating WhatsApp Button (Bottom-Left)
    // Note: If one already exists in HTML, we skip. But we inject it if not present.
    if (!document.querySelector('a[aria-label="WhatsApp"]')) {
        const floatingBtn = document.createElement('a');
        floatingBtn.href = waLink;
        floatingBtn.target = '_blank';
        floatingBtn.rel = 'noopener noreferrer';
        floatingBtn.className = 'fixed bottom-6 left-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1EBE5D] transition-all hover:scale-110 z-50 flex items-center justify-center';
        floatingBtn.setAttribute('aria-label', 'WhatsApp');
        floatingBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
        `;
        document.body.appendChild(floatingBtn);
    }
}

function initCTAButtons() {
    document.querySelectorAll('button, a').forEach(btn => {
        const text = btn.textContent.trim();

        if (text === 'צפה בתפריט' || text === 'לכל התפריט') {
            btn.addEventListener('click', (e) => {
                if (btn.tagName !== 'A') {
                    e.preventDefault();
                    window.location.href = '../menu_page/code.html'; // Adjust path if needed
                }
            });
        }
        else if (text === 'הזמנה עכשיו') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact, .contact-section');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent('שלום אני רוצה להזמין פיצה')}`, '_blank');
                }
            });
        }
        else if (text === 'הזמינו משלוח') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent('אני רוצה להזמין משלוח')}`, '_blank');
            });
        }
    });
}

function initContactForm() {
    const form = document.querySelector('#contact-form') || document.querySelector('form');
    if (!form) return;

    // Dynamically inject attributes if they are missing
    if (!form.getAttribute('action')) {
        form.setAttribute('action', `https://formsubmit.co/${EMAIL}`);
        form.setAttribute('method', 'POST');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('input[name="name"]') || form.querySelector('input[type="text"]');
        const phoneInput = form.querySelector('input[name="phone"]') || form.querySelector('input[type="tel"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        // Ensure names exist for FormSubmit
        if (nameInput && !nameInput.name) nameInput.name = 'name';
        if (phoneInput && !phoneInput.name) phoneInput.name = 'phone';

        // Basic Validation
        if (!nameInput?.value.trim() || !phoneInput?.value.trim()) {
            alert('אנא הזן שם ומספר טלפון כדי שנוכל לחזור אליך.');
            return;
        }

        // Add dummy captcha disable
        let captchaInp = form.querySelector('input[name="_captcha"]');
        if (!captchaInp) {
            captchaInp = document.createElement('input');
            captchaInp.type = 'hidden';
            captchaInp.name = '_captcha';
            captchaInp.value = 'false';
            form.appendChild(captchaInp);
        }

        // Loading State
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'שולח...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const actionURL = form.getAttribute('action').replace('formsubmit.co/', 'formsubmit.co/ajax/');
            const response = await fetch(actionURL, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset();
                alert('ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.');
            } else throw new Error('Network response non-ok');
        } catch (error) {
            console.error('Form Submit Error:', error);
            alert('הטופס נשלח (או אירעה שגיאה). אנא וודא שהפעלת את המייל ב-FormSubmit.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

function initInstagramLinks() {
    const instImages = document.querySelectorAll('img[alt*="instagram"], img[alt*="אינסטגרם"]');
    instImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            window.open('https://instagram.com/noampizza_hodhasharon', '_blank');
        });
    });
}

function initScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'fixed bottom-24 left-6 bg-[#b90027] text-white w-12 h-12 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-40 hover:bg-[#e31837] flex items-center justify-center font-bold text-2xl';
    btn.setAttribute('aria-label', 'חזור למעלה');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.remove('opacity-0', 'pointer-events-none');
            btn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            btn.classList.add('opacity-0', 'pointer-events-none');
            btn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initCart() {
    let cart = JSON.parse(localStorage.getItem('noam_pizza_cart')) || [];

    const updateCartBadge = () => {
        let badge = document.querySelector('#cart-badge');
        if (!badge) {
            const nav = document.querySelector('nav') || document.body;
            badge = document.createElement('div');
            badge.id = 'cart-badge';
            badge.className = 'fixed top-4 right-4 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg z-50 transition-transform transform';
            nav.appendChild(badge);
        }

        badge.textContent = cart.length;
        badge.style.display = cart.length === 0 ? 'none' : 'flex';

        if (cart.length > 0) {
            badge.classList.add('scale-125');
            setTimeout(() => badge.classList.remove('scale-125'), 300);
        }
    };

    updateCartBadge();

    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('הוסף לעגלה')) {
            btn.addEventListener('click', (e) => {
                cart.push({ id: Date.now() });
                localStorage.setItem('noam_pizza_cart', JSON.stringify(cart));
                updateCartBadge();

                const originalText = btn.textContent;
                btn.textContent = 'נוסף! ✓';
                btn.style.backgroundColor = '#1EBE5D';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 1500);
            });
        }
    });
}
