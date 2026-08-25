document.addEventListener('DOMContentLoaded', function() {
  var currentLang = 'en';

  var mobileToggle = document.getElementById('mobile-toggle');
  var navLinks = document.getElementById('nav-links');
  var langBtn = document.getElementById('lang-btn');

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      var isExpanded = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Language Switcher Toggle
  if (langBtn) {
    langBtn.addEventListener('click', function() {
      currentLang = currentLang === 'en' ? 'sw' : 'en';
      document.documentElement.setAttribute('data-lang', currentLang);
      
      document.getElementById('lang-label').innerText = currentLang === 'en' ? 'SWA' : 'ENG';

      var translatableElements = document.querySelectorAll('[data-en]');
      for (var i = 0; i < translatableElements.length; i++) {
        var el = translatableElements[i];
        var text = el.getAttribute('data-' + currentLang);
        if (text) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
          } else {
            el.innerText = text;
          }
        }
      }
    });
  }

  // Animated Counter for Stats Section
  var counters = document.querySelectorAll('.counter');
  var statsSection = document.getElementById('stats');
  var hasAnimated = false;

  function runCounters() {
    counters.forEach(function(counter) {
      var target = +counter.getAttribute('data-target');
      var count = 0;
      var speed = Math.ceil(target / 90); // Adjust speed for smoother animation

      var updateCount = setInterval(function() {
        count += speed;
        if (count >= target) {
          counter.innerText = target;
          clearInterval(updateCount);
        } else {
          counter.innerText = count;
        }
      }, 30);
    });
  }

  window.addEventListener('scroll', function() {
    if (!statsSection) return;
    var rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && !hasAnimated) {
      hasAnimated = true;
      runCounters();
    }
  });

  // Interactive Pillars Detail Box Data
  var pillarData = {
    extractives: {
      img: 'photos/Miningimages.jpg',
       en: {
        title: "NABAKI EXTRACTIVES",
        content: "<p>Providing high-performance technical solutions designed for heavy civil engineering, earthworks, and extraction environments:</p><ul class='pillar-detail-list'><li>Geosynthetic soil stabilization and slope protection.</li><li>Heavy-duty drainage & erosion control matrices.</li><li>Mine site containment barriers and personnel safety equipment.</li></ul>"
       }
      ,
      sw: {
        title: "NABAKI UCHIMBAJI",
        content: "<p>Kutoa mifumo ya hali ya juu inayolinda miundombinu, uchimbaji na usalama wa wafanyakazi:</p><ul class='pillar-detail-list'><li>Mifumo ya kuimarisha udongo na kuzuia mmomonyoko.</li><li>Mifumo ya mifereji ya maji ya viwandani na migodi.</li><li>Vifaa vya usalama vya wafanyakazi wa migodini.</li></ul>"
      }
    },
    construction: {
      img: 'photos/Nabakiconstructionimage.jpg',
      en: {
        title: "NABAKI CONSTRUCTION",
        content: "<p>Delivering structural materials that exceed global standards for durability and safety:</p><ul class='pillar-detail-list'><li>CONMIX concrete repair mortars & structural grouts.</li><li>Heavy commercial expansion joints and elastomeric sealants.</li><li>Structural waterproofing membranes for basements and foundations.</li></ul>"
      },
      sw: {
        title: "NABAKI UJENZI",
        content: "<p>Vifaa vya ujenzi vilivyothibitishwa kwa ajili ya kudumu kwa muda mrefu:</p><ul class='pillar-detail-list'><li>Simenti maalumu za ukarabati kutoka CONMIX.</li><li>Mifumo ya kuzuia nyufa na kuzuia kuvuja kwa misingi ya majengo.</li><li>Nyenzo thabiti za ujenzi wa ghorofa na madaraja.</li></ul>"
      }
    },
    home: {
      img: 'photos/Homeimage.jpg',
      en: {
        title: "NABAKI HOME",
        content: "<p>Elevating residential properties with durable, aesthetic, and weather-tested solutions:</p><ul class='pillar-detail-list'><li>Decra Stone-Coated Roofing Tiles (Original Lightweight Roofing).</li><li>Woodoc wood care sealers & protective coatings for exterior timber.</li><li>IPS pressure piping systems and residential waterproofing sealers.</li></ul>"
      },
      sw: {
        title: "NABAKI MAJUMBANI",
        content: "<p>Mifumo bora ya paa, kuzuia kuvuja, na umaliziaji wa nyumba nchi nzima:</p><ul class='pillar-detail-list'><li>Paa za Decra zenye ubora wa kimataifa na udumu wa miaka mingi.</li><li>Dawa za mbao za Woodoc zinazolinda dhidi ya mvua na jua.</li><li>Mabomba ya IPS na mifumo ya kuzuia maji kuta na paa.</li></ul>"
      }
    },
    esg: {
      img: 'photos/Nabakiesgimage.png',
      en: {
        title: "NABAKI ESG & Sustainability",
        content: "<p>Committed to social responsibility, environmental stewardship, and sustainable building:</p><ul class='pillar-detail-list'><li>Founding partnership with Nipe Fagio for environmental cleanliness.</li><li>Supply of Mixx eco-friendly cement reducing carbon footprints.</li><li>Community education programs for local Tanzanian contractors.</li></ul>"
      },
      sw: {
        title: "NABAKI ESG na Hifadhi ya Mazingira",
        content: "<p>Uongozi katika hifadhi ya mazingira na maendeleo ya jamii:</p><ul class='pillar-detail-list'><li>Ushirika wa uanzishwaji wa taasisi ya Nipe Fagio.</li><li>Usambazaji wa Mixx Cement inayohifadhi mazingira.</li><li>Programu za mafunzo kwa wakandarasi wa ndani wa Tanzania.</li></ul>"
      }
    }
  };

  var pillarCards = document.querySelectorAll('.pillar-card');
  var detailBox = document.getElementById('pillar-detail-box');
  var detailContent = document.getElementById('pillar-detail-content');
  var closePillarBtn = document.getElementById('close-pillar-btn');

  pillarCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var pillarKey = card.getAttribute('data-pillar');
      var pillarObj = pillarData[pillarKey]; // Access root object to get img property
      var langData = pillarObj[currentLang]; // Access current language (en or sw)

      // Inject both text content and image wrapper
      detailContent.innerHTML = 
        "<div class='pillar-detail-grid'>" +
          "<div class='pillar-text'>" +
            "<h3 class='pillar-detail-title'>" + langData.title + "</h3>" + 
            langData.content +
          "</div>" +
          "<div class='pillar-image-wrap'>" +
            "<img src='" + pillarObj.img + "' alt='" + langData.title + "' class='pillar-detail-img'>" +
          "</div>" +
        "</div>";

      detailBox.hidden = false;
      detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  if (closePillarBtn) {
    closePillarBtn.addEventListener('click', function() {
      detailBox.hidden = true;
    });
  }

  // Netlify Form Submission & Validation Logic
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        const nameErr = document.getElementById('nameError');
        const emailErr = document.getElementById('emailError');
        const msgErr = document.getElementById('messageError');

        // Reset previous validation styles
        [nameErr, emailErr, msgErr].forEach(err => {
            if (err) {
                err.style.display = 'none';
                err.textContent = '';
            }
        });
        [name, email, message].forEach(input => {
            if (input) input.classList.remove('input-error');
        });

        // 1. Validate Name
        if (!name || !name.value.trim()) {
            if (nameErr) {
                nameErr.textContent = currentLang === 'en' ? 'Please enter your full name.' : 'Tafadhali ingiza jina lako kamili.';
                nameErr.style.display = 'block'
                nameErr.style.color = 'red';
            }
            if (name) name.classList.add('input-error');
            isValid = false;
        }

        // 2. Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.value.trim() || !emailRegex.test(email.value)) {
            if (emailErr) {
                emailErr.textContent = currentLang === 'en' ? 'Please enter a valid email address.' : 'Tafadhali ingiza anwani ya barua pepe sahihi.';
                emailErr.style.display = 'block'
                emailErr.style.color = 'red';
            }
            if (email) email.classList.add('input-error');
            isValid = false;
        }

        // 3. Validate Message
        if (!message || !message.value.trim()) {
            if (msgErr) {
                msgErr.textContent = currentLang === 'en' ? 'Message cannot be empty.' : 'Ujumbe hauwezi kuwa wazi.';
                msgErr.style.display = 'block';
                msgErr.style.color = 'red';
            }
            if (message) message.classList.add('input-error');
            isValid = false;
        }

        // 4. Submit to Netlify via Fetch API
        if (isValid) {
            const formData = new FormData(form);

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                alert(currentLang === 'en' ? 'Thank you! Your message has been sent successfully.' : 'Asante! Ujumbe wako umetumwa kikamilifu.');
                form.reset();
            })
            .catch(error => {
                alert(currentLang === 'en' ? 'Submission failed. Please try again later.' : 'Ujumbe haukutwa. Tafadhali jaribu tena baadaye.');
                console.error('Netlify Form Error:', error);
            });
        }
    });
}
});