window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }})

$(document).ready(function() {
  const $hamburgerMenu = $('.hamburger-menu');
  const $sidebar = $('.sidebar');

  $hamburgerMenu.on('click', function() {
    if ($sidebar.is(':visible')) {
      // If sidebar is open, slide up to hide
      $sidebar.stop(true, true).slideUp();
    } else {
      // If sidebar is hidden, slide down to show
      $sidebar.stop(true, true).slideDown();
    }
  });
});


  const chars = "!@#$%^&*()_+1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const elements = document.querySelectorAll(".scramble-text");

  elements.forEach(el => {
    let interval = null;

    el.addEventListener("mouseover", () => {
      let iterations = 0;
      const originalText = el.dataset.text;

      clearInterval(interval);
      interval = setInterval(() => {
        el.innerText = originalText.split("")
          .map((char, i) => {
            if (i < iterations) return originalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        iterations += 1 / 3;

        if (iterations >= originalText.length) clearInterval(interval);
      }, 30);
    });
  });

  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      draggable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });
  
// Initialize global liked items storage if it doesn't exist
if (!window.likedItemsStore) {
  window.likedItemsStore = {
    items: JSON.parse(localStorage.getItem('likedItems') || '{}'),
    listeners: []
  };
}

// Load liked items from global store
let likedItems = window.likedItemsStore.items;
const heartedContainer = $('.hearted-items-container');

// Car data for different pages
const carData = {
 'Porsche 911 GT3': {
   title: 'Porsche 911 GT3',
   description: 'Precision-engineered for the racetrack yet refined for everyday roads, the Porsche 911 GT3 is a masterclass in performance and control. Beneath its aerodynamic frame lies a naturally aspirated flat-six engine that sings at high RPMs, while rear-wheel steering and race-derived suspension ensure unparalleled agility. From the iconic rear wing to the motorsport-inspired cockpit, the GT3 is built for drivers who demand an emotional, visceral connection with the road.',
   engineDesc: 'The Porsche 911 GT3 is powered by a 4.0-liter naturally aspirated flat-six engine that revs up to an exhilarating 9,000 RPM. Producing 502 horsepower, it offers razor-sharp throttle response, thanks to individual throttle bodies and racing-derived tech. With its lightweight components, dry-sump lubrication, and optional 6-speed manual or 7-speed PDK transmission, this engine delivers pure, high-revving performance inspired directly by Porsche\'s motorsport heritage.<br><br>Every element of the engine is designed for performance and endurance. The forged pistons, lightweight titanium connecting rods, and rigid valve actuation allow it to handle intense track sessions without losing composure. The sound is equally thrilling—raw, mechanical, and perfectly tuned to growl at low speeds and scream near redline. It\'s not just powerful, it\'s responsive, emotional, and built to deliver an experience as close to a race car as you can get in a street-legal machine.',
   interiorDesc: 'Inside, the 911 GT3 offers a cockpit designed for pure, unfiltered driving engagement. The interior combines motorsport materials like Alcantara and carbon fiber with Porsche\'s signature precision. A large analog tachometer anchors the instrument cluster, while a 10.9-inch touchscreen delivers seamless connectivity, real-time performance data, and track telemetry. The flat-bottom steering wheel, short-throw gear shifter, and intuitive control layout place every function right at the driver\'s fingertips.<br><br>Optional carbon fiber bucket seats offer serious bolstering and weight savings, paired with a rear seat delete that echoes its track focus. Sound insulation is purposefully minimal, allowing the naturally aspirated roar of the flat-six to flood the cabin. The result is a raw, visceral connection between machine and driver—whether you\'re ripping through mountain switchbacks or clipping apexes on a race circuit.',
   detailsImg: '../imgs/cars/porsche.jpg',
   engineImg: '../imgs/engine.jpg',
   moreDetailsImg: '../imgs/cars/interior/porsche-interior.jpg',
   price: '99,999',
   shortDesc: 'Track-bred performance meets street-ready style. The 911 GT3 delivers raw power, precision handling, and iconic Porsche design.',
   carClass: 'car-1'
 },
 'BMW M4': {
   title: 'BMW M4',
   description: 'The BMW M4 represents the perfect fusion of daily usability and track-ready performance. Built on BMW\'s legendary M heritage, this aggressive coupe delivers twin-turbocharged power wrapped in bold, distinctive styling. With its wide stance, flared fenders, and signature kidney grille, the M4 commands attention while promising exhilarating performance that few can match.',
   engineDesc: 'Under the hood lies a hand-built 3.0-liter twin-turbocharged inline-six engine producing 473 horsepower and 406 lb-ft of torque. The S58 powerplant features forged internals, closed-deck construction, and advanced cooling systems designed to handle extreme performance demands. With launch control engaged, the M4 rockets from 0-60 mph in just 4.1 seconds.<br><br>The engine\'s character is defined by its broad torque curve and explosive acceleration. Twin-scroll turbochargers eliminate lag while delivering progressive power delivery that builds to a thrilling crescendo. The active exhaust system provides multiple sound profiles, from civilized cruising to full-attack track mode, ensuring the perfect soundtrack for every driving situation.',
   interiorDesc: 'The M4\'s interior balances luxury with performance focus. M Sport seats provide excellent lateral support while maintaining comfort for longer drives. The M-specific steering wheel, gear selector, and pedals create an immediate connection to the car\'s sporting intentions. The latest iDrive system integrates seamlessly with performance data logging and track apps.<br><br>Carbon fiber trim, Alcantara accents, and customizable ambient lighting create an upscale environment. The rear seats accommodate passengers when needed, making the M4 surprisingly practical for a high-performance coupe. Every control is positioned for intuitive operation, whether you\'re navigating city streets or attacking a race circuit.',
   detailsImg: '../imgs/cars/BMW.jpg',
   engineImg: '../imgs/engine.jpg',
   moreDetailsImg: '../imgs/cars/interior/bmw-interior.jpg',
   price: '89,999',
   shortDesc: 'The perfect fusion of daily usability and track-ready performance with BMW\'s legendary M heritage.',
   carClass: 'car-2'
 },
 'Mercedes-AMG GT63': {
   title: 'Mercedes-AMG GT63',
   description: 'The Mercedes-AMG GT63 redefines the performance sedan category by combining supercar-level acceleration with four-door practicality. This handcrafted AMG masterpiece delivers brutal power through advanced all-wheel drive while maintaining the refinement expected from Mercedes-Benz. It\'s a car that seamlessly transitions from executive transport to track weapon.',
   engineDesc: 'The heart of the GT63 is AMG\'s hand-assembled 4.0-liter twin-turbocharged V8, producing an astounding 630 horsepower and 664 lb-ft of torque. The "One Man, One Engine" philosophy ensures each powerplant is meticulously crafted by a single technician. Hot-inside-V turbochargers minimize lag while maximizing performance, delivering explosive acceleration that launches the GT63 from 0-60 mph in just 3.1 seconds.<br><br>Advanced cylinder deactivation, variable valve timing, and sophisticated engine management systems balance performance with efficiency. The AMG SPEEDSHIFT DCT 9G transmission provides lightning-fast shifts while the AMG Performance 4MATIC+ all-wheel drive system ensures maximum traction in all conditions. The result is a powertrain that combines supercar performance with surprising refinement.',
   interiorDesc: 'Step inside the GT63 and you\'re greeted by a cabin that perfectly balances luxury and performance. AMG Performance seats offer extensive adjustment and massage functions while providing excellent support during spirited driving. The MBUX infotainment system features dual 12.3-inch displays that provide comprehensive vehicle information and entertainment options.<br><br>Premium Nappa leather, carbon fiber trim, and ambient lighting create an atmosphere of refined sportiness. The rear seats provide genuine comfort for adult passengers, making the GT63 a true four-door grand tourer. Track-focused elements like the AMG steering wheel, aluminum paddle shifters, and performance displays remind you of the car\'s serious sporting credentials.',
   detailsImg: '../imgs/cars/mercedes.jpg',
   engineImg: '../imgs/engine.jpg',
   moreDetailsImg: '../imgs/cars/interior/mercedes-interior.jpg',
   price: '159,999',
   shortDesc: 'Supercar-level acceleration meets four-door practicality in this handcrafted AMG masterpiece.',
   carClass: 'car-3'
 },
 'Audi RS5 Sportback': {
   title: 'Audi RS5 Sportback',
   description: 'The Audi RS5 Sportback combines the practicality of a five-door hatchback with the performance credentials of a supercar. Audi\'s quattro all-wheel drive system and twin-turbocharged V6 power create a compelling package that excels in all weather conditions. Sharp Audi design language and RS-specific styling cues announce its serious performance intentions.',
   engineDesc: 'Powering the RS5 Sportback is a 2.9-liter twin-turbocharged V6 engine producing 444 horsepower and 443 lb-ft of torque. This sophisticated powerplant features a 48-volt mild-hybrid system that improves efficiency while providing additional low-end torque. The result is explosive acceleration that propels the RS5 from 0-60 mph in just 3.7 seconds.<br><br>The engine\'s character combines smooth power delivery with an aggressive exhaust note that can be tailored through multiple drive modes. Advanced turbocharging technology eliminates lag while the mild-hybrid system fills in torque gaps for seamless acceleration. The 8-speed tiptronic transmission provides smooth shifts in comfort mode and lightning-quick responses in dynamic mode.',
   interiorDesc: 'Inside, the RS5 Sportback showcases Audi\'s commitment to luxury and technology. RS Sport seats with diamond quilting provide excellent support and comfort for long journeys. The Virtual Cockpit Plus display system puts all essential information directly in the driver\'s line of sight, while the MMI touch system controls infotainment and vehicle settings.<br><br>Premium materials including Alcantara, carbon fiber, and fine leather create an upscale environment. The Sportback configuration provides generous rear passenger space and a large cargo area, making this a truly practical performance car. Bang & Olufsen audio, wireless charging, and advanced driver assistance systems ensure the RS5 delivers on both performance and convenience.',
   detailsImg: '../imgs/cars/audi.jpg',
   engineImg: '../imgs/engine.jpg',
   moreDetailsImg: '../imgs/cars/interior/audi-interior.jpg',
   price: '79,999',
   shortDesc: 'Five-door practicality meets supercar performance with Audi\'s quattro all-wheel drive system.',
   carClass: 'car-4'
 },
 'Mercedes-Benz G-Class G63 AMG': {
   title: 'Mercedes-Benz G-Class G63 AMG',
   description: 'The Mercedes-AMG G63 represents the ultimate fusion of luxury, capability, and performance. This iconic off-road legend has evolved into a modern powerhouse while retaining its distinctive boxy silhouette and go-anywhere capability. Hand-assembled AMG power meets legendary G-Class toughness to create a vehicle that\'s equally at home on city streets or mountain trails.',
   engineDesc: 'At the heart of the G63 lies AMG\'s handcrafted 4.0-liter twin-turbocharged V8, producing 577 horsepower and 627 lb-ft of torque. The biturbo engine features hot-inside-V placement for reduced turbo lag and maximum performance. Despite weighing over 5,500 pounds, the G63 accelerates from 0-60 mph in just 4.5 seconds, defying physics with its imposing presence.<br><br>The AMG SPEEDSHIFT TCT 9G transmission delivers smooth power in comfort mode and aggressive shifts in sport+. Three differential locks and permanent all-wheel drive ensure maximum traction in any terrain, while adjustable suspension allows the G63 to tackle everything from urban parking lots to rocky mountain passes. The exhaust system provides a thunderous V8 soundtrack that announces the G63\'s presence from blocks away.',
   interiorDesc: 'The G63\'s interior combines traditional G-Class functionality with modern AMG luxury. Hand-fitted Nappa leather covers nearly every surface, while carbon fiber and aluminum trim add sophisticated accents. AMG Performance seats provide comfort during long journeys while offering support during spirited driving sessions.<br><br>The MBUX infotainment system integrates seamlessly with the cabin design, providing comprehensive vehicle information and entertainment options. Despite its rugged exterior, the G63 interior rivals the finest luxury sedans with features like heated and ventilated seats, ambient lighting, and a premium Burmester sound system. The commanding driving position provides excellent visibility while the robust construction ensures confidence in any environment.',
   detailsImg: '../imgs/cars/g-class.jpg',
   engineImg: '../imgs/engine.jpg',
   moreDetailsImg: '../imgs/cars/interior/g-class-interior.jpg',
   price: '179,999',
   shortDesc: 'Iconic off-road legend meets modern luxury powerhouse with go-anywhere capability.',
   carClass: 'car-5'
 }
};

// Function to save liked items to localStorage
function saveLikedItems() {
  localStorage.setItem('likedItems', JSON.stringify(likedItems));
  window.likedItemsStore.items = likedItems;
}

// Function to notify all listeners when liked items change
function notifyLikedItemsChange() {
  window.likedItemsStore.listeners.forEach(callback => {
    callback(likedItems);
  });
}

// Function to subscribe to liked items changes
function onLikedItemsChange(callback) {
  window.likedItemsStore.listeners.push(callback);
}

// Function to update hearted items display (only for hearted page)
function updateHeartedItemsDisplay() {
  // Only run this function if we're on the hearted page
  if (!$('#hearted').length) return;
  
  const swiperWrapper = $('#hearted .swiper-wrapper');
  const noLikesDiv = swiperWrapper.find('.d-none, .no-likes-message').first();
  const likedItemsCount = Object.keys(likedItems).length;
  
  // Clear existing slides except the no-likes div
  swiperWrapper.find('.swiper-slide').remove();
  
  if (likedItemsCount === 0) {
    // Show no likes message
    if (noLikesDiv.length === 0) {
      // Create no likes message if it doesn't exist
      const noLikesHtml = `
        <div class="d-flex justify-content-center align-items-center flex-column w-100 pt-5 no-likes-message">
          <div class="title no-likes-title">You haven't liked anything yet.</div>
          <div class="desc no-likes-desc">Start exploring and tap the heart to save your favorites!</div>
        </div>
      `;
      swiperWrapper.append(noLikesHtml);
    } else {
      noLikesDiv.removeClass('d-none').addClass('d-flex');
    }
  } else {
    // Hide no likes message
    noLikesDiv.removeClass('d-flex').addClass('d-none');
    
    // Create slides for each liked item
    Object.keys(likedItems).forEach(carName => {
      if (carData[carName]) {
        const car = carData[carName];
        const slideHtml = `
          <div class="swiper-slide">
            <div data-aos="fade-up" class="card-container">
              <div class="car-card" data-car-name="${carName}">
                <div class="car-image">
                  <div class="slider-car ${car.carClass}"></div>
                </div>
                <div class="card-content d-flex flex-column justify-content-between h-100">
                  <div class="car-name">${car.title}</div>
                  <div class="desc car-desc">${car.shortDesc}
                  <br>
                   
                  </div>
                  <div class="car-price" data-price="${car.price}">${car.price}$</div>
                  <div class="card-buttons row g-1 mt-auto">
                    <div class="col-12">
                      <button class="buy-button scramble-text view-details-btn" data-text="View Details" data-car="${carName}">View Details</button>
                    </div>
                    <div class="col-4">
                      <button class="heart-button active">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 heart-svg">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </button></div>
                    
                    <div class="col-8">
                      <button class="buy-button scramble-text" data-text="Buy Now">Buy now</button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        swiperWrapper.append(slideHtml);
      }
    });
    
    // Reinitialize Swiper if it exists (specifically for hearted page)
    if (window.heartedSwiper) {
      window.heartedSwiper.update();
    }
  }
  
  // Update hearted container count
  updateHeartedContainerDisplay();
}

// Function to update hearted container display
function updateHeartedContainerDisplay() {
  const likedItemsCount = Object.keys(likedItems).length;
  
  if (heartedContainer.length) {
    heartedContainer.attr('data-count', likedItemsCount);
    
    if (likedItemsCount > 0) {
      heartedContainer.removeClass('no-likes');
    } else {
      heartedContainer.addClass('no-likes');
    }
  }
}

// Function to update heart button states across all pages
function updateHeartButtonStates() {
  $('.heart-button').each(function() {
    const $carCard = $(this).closest('.car-card');
    let carName = $carCard.find('.car-name').text().trim();
    
    // Alternative method: check data attribute
    if (!carName) {
      carName = $carCard.attr('data-car-name');
    }
    
    if (carName && likedItems[carName]) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
}

// Handle heart button clicks (for both main page and hearted page)
$(document).on('click', '.heart-button', function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const $carCard = $(this).closest('.car-card');
  let carName = $carCard.find('.car-name').text().trim();
  
  // Alternative method: check data attribute
  if (!carName) {
    carName = $carCard.attr('data-car-name');
  }
  
  if (!carName) {
    console.error('Could not find car name');
    return;
  }
  
  // Toggle the like status
  if (likedItems[carName]) {
    delete likedItems[carName];
    $(this).removeClass('active');
  } else {
    likedItems[carName] = true;
    $(this).addClass('active');
  }
  
  // Save to localStorage and update global store
  saveLikedItems();
  
  // Update hearted container display
  updateHeartedContainerDisplay();
  
  // If we're on the hearted page, update the display immediately
  if ($('#hearted').length) {
    updateHeartedItemsDisplay();
  }
  
  // Notify all listeners of the change
  notifyLikedItemsChange();
  
  console.log('Liked items:', likedItems);
});

// Handle view details button clicks (both old anchor tags and new buttons)
$(document).on('click', 'a[href="car-details.html"], .view-details-btn', function(e) {
  e.preventDefault();
  
  const $carCard = $(this).closest('.car-card');
  let carName = $carCard.find('.car-name').text().trim();
  
  // Check data attribute for new buttons
  if ($(this).hasClass('view-details-btn')) {
    carName = $(this).attr('data-car');
  }
  
  // Alternative method: check data attribute on card
  if (!carName) {
    carName = $carCard.attr('data-car-name');
  }
  
  if (!carName) {
    console.error('Could not find car name for details view');
    return;
  }
  
  // Store in localStorage and global memory
  localStorage.setItem('selectedCar', carName);
  window.selectedCar = carName;
  
  console.log('Selected car for details:', carName);
  
  window.location.href = 'car-details.html';
});

// Initialize page-specific functionality
$(document).ready(function() {
  // Load liked items from localStorage
  const savedLikedItems = localStorage.getItem('likedItems');
  if (savedLikedItems) {
    likedItems = JSON.parse(savedLikedItems);
    window.likedItemsStore.items = likedItems;
  }
  
  // Initialize hearted container state on page load
  updateHeartedContainerDisplay();
  
  // Update heart button states based on current liked items
  updateHeartButtonStates();
  
  // If we're on the hearted page, initialize the display
  if ($('#hearted').length) {
    updateHeartedItemsDisplay();
    
    // Subscribe to changes for this page
    onLikedItemsChange(function(updatedLikedItems) {
      updateHeartedItemsDisplay();
    });
  }
  
  // Handle car details page
  if (window.location.pathname.includes('car-details.html') || $('#carDetails').length) {
    // Get selected car from localStorage first, then fallback to window
    let selectedCar = localStorage.getItem('selectedCar') || window.selectedCar;
    
    console.log('Loading car details for:', selectedCar);
    
    if (selectedCar && carData[selectedCar]) {
      const car = carData[selectedCar];
      
      // Update page content
      $('.details-title').text(car.title);
      $('.details-desc').html(car.description);
      $('.engine-desc').html(car.engineDesc);
      $('#moreDetails .details-desc').html(car.interiorDesc);
      
      // Update images (adjust paths as needed for your structure)
      $('.details-img').css('background-image', `url('${car.detailsImg}')`);
      $('.engine-img').css('background-image', `url('${car.engineImg}')`);
      $('.more-details-img').css('background-image', `url('${car.moreDetailsImg}')`);
      
      // Update page title
      $('title').text('MotorMart - ' + car.title);
      
      console.log('Car details loaded successfully for:', car.title);
    } else {
      console.error('No car data found for:', selectedCar);
    }
  }
  
  console.log('Page loaded with liked items:', likedItems);
});