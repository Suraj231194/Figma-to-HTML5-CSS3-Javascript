/**
 * Main JavaScript File
 * Handles Global Navigation, UI Interactions, and State Management
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initMegaMenu();

    // Page specific initializations
    if (document.querySelector('#quote-widget')) {
        initQuoteWidget();
    }
    if (document.querySelector('.step-active')) { // Detection for quote page
        initQuoteResults();
    }
});

/* =========================================
   Navigation & Mobile Menu
   ========================================= */
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!mobileBtn || !mobileMenu) return;

    mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

function initMegaMenu() {
    // Mega Menu Toggle Logic
    const triggers = document.querySelectorAll('[data-menu-trigger]');
    const header = document.getElementById('main-header');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const targetId = trigger.getAttribute('data-menu-trigger');
            const target = document.getElementById(targetId);

            // Close others if any (though we only have one)
            document.querySelectorAll('.mega-menu').forEach(m => {
                if (m.id !== targetId) m.classList.add('hidden');
            });

            if (target) {
                const isHidden = target.classList.contains('hidden');
                if (isHidden) {
                    target.classList.remove('hidden');
                    // Header Becomes Dark
                    if (header) {
                        header.classList.remove('header-transparent', 'text-navy-900');
                        header.classList.add('bg-[#1F2937]', 'text-white');
                    }
                    // Add active state to button
                    trigger.classList.add('text-gray-200');
                    const chevron = trigger.querySelector('.chevron');
                    if (chevron) chevron.classList.add('rotate-180');
                } else {
                    target.classList.add('hidden');
                    // Header Reverts
                    if (header) {
                        header.classList.add('header-transparent', 'text-navy-900');
                        header.classList.remove('bg-[#1F2937]', 'text-white');
                    }
                    trigger.classList.remove('text-gray-200');
                    const chevron = trigger.querySelector('.chevron');
                    if (chevron) chevron.classList.remove('rotate-180');
                }
            }
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#mega-menu-insurance') && !e.target.closest('[data-menu-trigger]') && !e.target.closest('#main-header')) {
            document.querySelectorAll('.mega-menu').forEach(m => m.classList.add('hidden'));
            document.querySelectorAll('[data-menu-trigger] .chevron').forEach(c => c.classList.remove('rotate-180'));

            // Revert Header
            if (header) {
                header.classList.add('header-transparent', 'text-navy-900');
                header.classList.remove('bg-[#1F2937]', 'text-white');
            }
        }
    });
}

/* =========================================
   Quote Widget Logic (Home Page)
   ========================================= */
function initQuoteWidget() {
    // Tabs - Single vs Multi
    const tabSingle = document.getElementById('tab-single');
    const tabMulti = document.getElementById('tab-multi');

    if (tabSingle && tabMulti) {
        tabSingle.addEventListener('click', () => {
            setTripType('single');
        });
        tabMulti.addEventListener('click', () => {
            setTripType('multi');
        });
    }

    function setTripType(type) {
        if (type === 'single') {
            tabSingle.className = 'flex-1 py-4 font-bold text-sm transition-colors quote-tab-active';
            tabMulti.className = 'flex-1 py-4 font-bold text-sm transition-colors quote-tab-inactive';
        } else {
            tabSingle.className = 'flex-1 py-4 font-bold text-sm transition-colors quote-tab-inactive';
            tabMulti.className = 'flex-1 py-4 font-bold text-sm transition-colors quote-tab-active';
        }
        sessionStorage.setItem('tripType', type);
    }

    // Destination Select Logic
    const destInput = document.getElementById('dest-input');
    const destDropdown = document.getElementById('dest-dropdown');
    const destChips = document.getElementById('dest-chips');
    let selectedDestinations = [];

    const POPULAR_DESTINATIONS = [
        "Bali [Indonesia]", "New Zealand", "USA [United States]",
        "United Kingdom", "World Wide", "All of Europe", "All of Asia"
    ];

    if (destInput) {
        destInput.addEventListener('focus', () => {
            destDropdown.classList.remove('hidden');
            renderDestinations('');
        });

        destInput.addEventListener('input', (e) => {
            renderDestinations(e.target.value);
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.destination-wrapper')) {
                destDropdown.classList.add('hidden');
            }
        });
    }

    function renderDestinations(search) {
        const list = destDropdown.querySelector('ul');
        list.innerHTML = '';
        const filtered = POPULAR_DESTINATIONS.filter(d => d.toLowerCase().includes(search.toLowerCase()));

        if (filtered.length === 0) {
            list.innerHTML = '<li class="p-4 text-center text-gray-500 text-sm">Destination not found</li>';
            return;
        }

        filtered.forEach(dest => {
            const li = document.createElement('li');
            li.className = `px-4 py-2.5 text-sm text-gray-800 cursor-pointer transition-colors hover:bg-gray-50 ${selectedDestinations.includes(dest) ? 'text-gray-400 cursor-default' : ''}`;
            li.textContent = dest;
            if (!selectedDestinations.includes(dest)) {
                li.addEventListener('click', () => addDestination(dest));
            }
            list.appendChild(li);
        });
    }

    function addDestination(dest) {
        if (!selectedDestinations.includes(dest)) {
            selectedDestinations.push(dest);
            renderChips();
            destInput.value = '';
            destDropdown.classList.add('hidden');
            sessionStorage.setItem('destinations', JSON.stringify(selectedDestinations));
        }
    }

    window.removeDestination = function (dest) {
        selectedDestinations = selectedDestinations.filter(d => d !== dest);
        renderChips();
        sessionStorage.setItem('destinations', JSON.stringify(selectedDestinations));
    }

    function renderChips() {
        destChips.innerHTML = '';
        if (selectedDestinations.length > 0) {
            destChips.classList.remove('hidden');
            selectedDestinations.forEach(dest => {
                const chip = document.createElement('div');
                chip.className = 'bg-navy-900 text-white text-xs px-3 py-1.5 rounded flex items-center gap-2';
                chip.innerHTML = `
                    <span>${dest.split('[')[0]}</span>
                    <button type="button" onclick="removeDestination('${dest}')" class="opacity-80 hover:opacity-100 flex items-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                `;
                destChips.appendChild(chip);
            });
            destInput.placeholder = "Add another destination";
        } else {
            destChips.classList.add('hidden');
            destInput.placeholder = "Type or choose your destinations";
        }
    }

    // Age Logic
    const ageInput = document.getElementById('age-input');
    const addAgeBtn = document.getElementById('add-age-btn');
    const ageList = document.getElementById('age-list');
    let ages = [];

    if (addAgeBtn) {
        addAgeBtn.addEventListener('click', addAge);
        ageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addAge();
        });
    }

    function addAge() {
        const age = ageInput.value.trim();
        if (age && !isNaN(age)) {
            ages.push(age);
            ageInput.value = '';
            renderAges();
            sessionStorage.setItem('ages', JSON.stringify(ages));
        }
    }

    window.removeAge = function (index) {
        ages.splice(index, 1);
        renderAges();
        sessionStorage.setItem('ages', JSON.stringify(ages));
    }

    function renderAges() {
        ageList.innerHTML = '';
        ages.forEach((age, idx) => {
            const chip = document.createElement('div');
            chip.className = 'bg-gray-100 text-navy-900 text-xs font-bold px-2 py-1 rounded flex items-center gap-1';
            chip.innerHTML = `
                ${age}
                <button onclick="removeAge(${idx})" class="text-gray-400 hover:text-red-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            `;
            ageList.appendChild(chip);
        });
    }

    // Get Quote Button
    document.getElementById('get-quote-btn').addEventListener('click', () => {
        const depart = document.getElementById('date-depart').value;
        const returnDate = document.getElementById('date-return').value;

        sessionStorage.setItem('dates', JSON.stringify({ depart, return: returnDate }));

        // Simple validation or direct navigate
        window.location.href = 'quote.html';
    });
}

/* =========================================
   Quote Results Logic (Quote Page)
   ========================================= */
function initQuoteResults() {
    // Populate Session Data
    const dests = JSON.parse(sessionStorage.getItem('destinations') || '[]');
    const dates = JSON.parse(sessionStorage.getItem('dates') || '{"depart":"","return":""}');
    const ages = JSON.parse(sessionStorage.getItem('ages') || '[]');

    document.querySelectorAll('.dest-val').forEach(el => el.textContent = dests.length ? dests.join(', ') : 'Australia');
    document.querySelectorAll('.dates-val').forEach(el => el.textContent = (dates.depart && dates.return) ? `${dates.depart} - ${dates.return}` : '04/11/2025 - 13/11/2025');
    document.querySelectorAll('.ages-val').forEach(el => el.textContent = ages.length ? ages.join(', ') : '23');

    // Default Mobile Selection
    selectMobilePlan('plus');

    // Bind click events for mobile selection manually if not using inline onclick
    const basicRow = document.getElementById('mobile-plan-basic');
    const plusRow = document.getElementById('mobile-plan-plus');

    if (basicRow) basicRow.addEventListener('click', () => selectMobilePlan('basic'));
    if (plusRow) plusRow.addEventListener('click', () => selectMobilePlan('plus'));
}

window.selectMobilePlan = function (plan) {
    const basicRow = document.getElementById('mobile-plan-basic');
    const plusRow = document.getElementById('mobile-plan-plus');
    const icon = document.getElementById('mobile-plan-icon');
    const name = document.getElementById('mobile-plan-name');
    const price = document.getElementById('mobile-plan-price');
    const from = document.getElementById('mobile-plan-from');
    const btn = document.getElementById('mobile-choose-btn');

    // Benefits
    const benCancel = document.getElementById('mob-ben-cancel');
    const benLuggage = document.getElementById('mob-ben-luggage');
    const benDelay = document.getElementById('mob-ben-delay');
    const benLiability = document.getElementById('mob-ben-liability');

    if (!basicRow || !plusRow) return;

    if (plan === 'basic') {
        basicRow.classList.add('bg-gray-50'); basicRow.classList.remove('bg-white');
        plusRow.classList.add('bg-white'); plusRow.classList.remove('bg-gray-50');

        icon.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold font-heading bg-navy-900";
        name.textContent = "VOYAGER";
        from.textContent = "From $17.37";
        price.textContent = "$15.98";
        price.className = "text-3xl font-bold text-navy-900 mb-1";
        btn.className = "w-full py-3 text-white font-bold rounded uppercase bg-navy-900";

        benCancel.textContent = "$1,000";
        benLuggage.textContent = "$500";
        benDelay.textContent = "Not available";
        benLiability.textContent = "Not available";

    } else {
        basicRow.classList.add('bg-white'); basicRow.classList.remove('bg-gray-50');
        plusRow.classList.add('bg-gray-50'); plusRow.classList.remove('bg-white');

        icon.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold font-heading bg-yellow-400";
        name.textContent = "VOYAGER PLUS";
        from.textContent = "From $44.94";
        price.textContent = "$41.34";
        price.className = "text-3xl font-bold text-yellow-400 mb-1";
        btn.className = "w-full py-3 text-white font-bold rounded uppercase bg-yellow-400";

        benCancel.textContent = "$4,000";
        benLuggage.textContent = "$1,000";
        benDelay.textContent = "$1,000";
        benLiability.textContent = "$2,500,000";
    }
}

