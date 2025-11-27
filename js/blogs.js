// Redirect buttons with data-article to the article page
$('.blog-button').click(function(e){
  e.preventDefault();
  const articleId = $(this).data('article');
  window.location.href = 'blogs-article.html?article=' + articleId;
});

// On blogs-article.html: Load content dynamically
$(document).ready(function(){
  const params = new URLSearchParams(window.location.search);
  const article = params.get('article');

  if(article === 'suv-vs-sedan'){
      $('#article-title').text('SUV vs Sedan: Which Is Better for Your Lifestyle?');
      $('#article-desc').text('Choosing between an SUV and a sedan depends on how you drive, who you drive with, and what you expect from your vehicle. Both body types offer unique advantages in comfort, performance, and cost. Below is a detailed comparison to help you decide which fits your lifestyle best.');
      
      $('#article-content').html(`
<div class="article-section">
<li class="blog-section-title">Family Use</li>
<div class="blog-section-text">
  SUVs are generally the better option for families. They offer more interior space, higher seating positions, and greater cargo capacity. This makes it easier to carry strollers, groceries, luggage, and even pets. Many SUVs also include third-row seating, which is ideal for larger families.
  <br><br>
  Sedans, on the other hand, are more suitable for small families or couples. While they provide enough comfort for daily commuting and short trips, their limited trunk space may feel restrictive for family travel.
  <br><br>
  Best for families: SUV <br>
  Best for couples/small families: Sedan
</div>
</div>

<div class="article-section">
<li class="blog-section-title">City Driving</li>
<div class="blog-section-text">
  Sedans are designed for smooth city driving. They are smaller, easier to maneuver, and simpler to park in tight urban spaces. Their lower center of gravity also makes them feel more stable on sharp city turns.
  <br><br>
  SUVs can still be used in the city, but their larger size may make parking and narrow streets more challenging. Compact SUVs offer a good balance between space and city practicality.
  <br><br>
  Best for heavy city traffic: Sedan <br>
  Best for mixed city & highway use: Compact SUV
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Fuel Economy</li>
<div class="blog-section-text">
  Sedans are more fuel-efficient than SUVs in most cases. Their lighter weight and aerodynamic design help reduce fuel consumption, making them cheaper to run daily.
  <br><br>
  SUVs consume more fuel due to their size, weight, and higher engine power. However, modern hybrid and compact SUVs have improved significantly in fuel efficiency.
  <br><br>
  Lower fuel cost: Sedan <br>
  Higher fuel consumption: SUV
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Maintenance Cost</li>
<div class="blog-section-text">
  Sedans usually cost less to maintain. Their smaller engines, lighter components, and more affordable tires and brakes reduce long-term service expenses.
  <br><br>
  SUVs typically have higher maintenance costs because of larger tires, more complex suspension systems, and stronger engines. Insurance costs may also be higher for SUVs.
  <br><br>
  Lower maintenance cost: Sedan <br>
  Higher maintenance cost: SUV
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Resale Value</li>
<div class="blog-section-text">
  SUVs generally hold their value better in most markets. Their popularity, family appeal, and versatility keep demand high even after several years of use.
  <br><br>
  Sedans can lose value faster, especially in markets where buyers prefer SUVs. However, well-maintained sedans from reliable brands can still offer good resale value.
  <br><br>
  Stronger resale value: SUV <br>
  Depreciates faster: Sedan
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Final Verdict</li>
<div class="blog-section-text">
  Choose an <strong>SUV</strong> if you prioritize space, family comfort, and resale value.<br>
  Choose a <strong>Sedan</strong> if you prioritize fuel efficiency, low running cost, and easy city driving.
  <br><br>
  Both vehicles are excellent choices — the right one depends entirely on your daily needs and lifestyle.
</div>
</div>
      `);
  }
  else if(article === 'car-maintenance'){
      $('#article-title').text('Car Maintenance & Ownership');
      $('#article-desc').text('Understanding common car problems and how to prevent or fix them is essential for every car owner. Regular maintenance keeps your vehicle running efficiently and extends its lifespan.');
      
      $('#article-content').html(`
<div class="article-section">
<li class="blog-section-title">Dead Battery</li>
<div class="blog-section-text">
  Car batteries can fail due to age, extreme temperatures, or leaving lights on. Regularly check battery terminals for corrosion and replace your battery every 3–5 years to avoid unexpected failures.
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Brake Noise</li>
<div class="blog-section-text">
  Squeaking or grinding brakes may indicate worn pads or rotors. Inspect your brakes regularly and replace pads before they wear out completely to maintain safety.
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Overheating</li>
<div class="blog-section-text">
  Overheating can be caused by low coolant, radiator leaks, or a failing thermostat. Keep coolant levels topped up and check for leaks to prevent engine damage.
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Engine Warning Light</li>
<div class="blog-section-text">
  The engine warning light may indicate emissions issues, sensor failures, or other engine problems. Always run a diagnostic check when the light appears to prevent further damage.
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Transmission Slipping</li>
<div class="blog-section-text">
  Transmission slipping or rough shifts can result from low transmission fluid or worn components. Regularly change transmission fluid and service the transmission to ensure smooth operation.
</div>
</div>

<div class="article-section">
<li class="blog-section-title">Final Tips</li>
<div class="blog-section-text">
  Regular maintenance, timely repairs, and staying proactive about warning signs can save you money and prevent breakdowns. Keep a checklist for oil changes, tire rotation, brake inspections, and fluid levels.
</div>
</div>
      `);
  }
});
