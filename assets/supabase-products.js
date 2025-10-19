/**
 * Supabase Floor Plans Integration
 * Fetches and displays floor plans from Supabase database
 */

// Initialize Supabase client
const supabaseUrl = 'https://hbfjdfxephlczkfgpceg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZmpkZnhlcGhsY3prZmdwY2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMzc3MTAsImV4cCI6MjA1NDkxMzcxMH0.kPty5s2bpf4kYS-aVlMb8nb2L7tJXhpwl76VdsgzvHM';

// Create Supabase client
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log('Supabase client initialized:', supabaseClient ? 'Success' : 'Failed');

/**
 * Fetch floor plans from Supabase
 */
async function loadFloorPlans() {
  console.log('Starting to fetch floor plans from Supabase...');
  
  const container = document.getElementById('supabase-products-grid');
  
  if (!container) {
    console.error('Container element #supabase-products-grid not found');
    return;
  }
  
  // Show loading state
  container.innerHTML = '<div class="loading-message">Loading floor plans...</div>';
  
  try {
    // Fetch floor plans from Supabase
    const { data: plans, error } = await supabaseClient
      .from('website_floor_plans')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching floor plans:', error);
      container.innerHTML = '<div class="loading-message" style="color: #DC2626;">Error loading floor plans. Please try again later.</div>';
      return;
    }
    
    console.log('Floor plans fetched successfully:', plans);
    
    if (!plans || plans.length === 0) {
      container.innerHTML = '<div class="loading-message">No floor plans available at this time.</div>';
      return;
    }
    
    // Clear loading message
    container.innerHTML = '';
    
    // Display plans
    displayPlans(plans, container);
    
  } catch (err) {
    console.error('Unexpected error:', err);
    container.innerHTML = '<div class="loading-message" style="color: #DC2626;">An unexpected error occurred. Please try again later.</div>';
  }
}

/**
 * Display floor plans in the grid
 */
function displayPlans(plans, container) {
  plans.forEach(plan => {
    const card = createProductCard(plan);
    container.appendChild(card);
  });
  
  console.log(`Displayed ${plans.length} floor plans`);
}

/**
 * Create a product card element
 */
function createProductCard(plan) {
  // Create card container
  const card = document.createElement('div');
  card.className = 'supabase-product-card fade-in';
  
  // Create image
  const image = document.createElement('img');
  image.src = plan.image_url || 'https://via.placeholder.com/400x300?text=Floor+Plan';
  image.alt = plan.title || 'Floor Plan';
  image.className = 'supabase-product-image';
  image.loading = 'lazy';
  
  // Handle image load error
  image.onerror = function() {
    this.src = 'https://via.placeholder.com/400x300?text=Floor+Plan';
  };
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'supabase-product-content';
  
  // Create title
  const title = document.createElement('h3');
  title.className = 'supabase-product-title';
  title.textContent = plan.title || 'Floor Plan';
  
  // Create specs
  const specs = document.createElement('div');
  specs.className = 'supabase-product-specs';
  
  if (plan.beds) {
    const bedsSpan = document.createElement('span');
    bedsSpan.innerHTML = `🛏️ ${plan.beds} Bed${plan.beds > 1 ? 's' : ''}`;
    specs.appendChild(bedsSpan);
  }
  
  if (plan.baths) {
    const bathsSpan = document.createElement('span');
    bathsSpan.innerHTML = `🚿 ${plan.baths} Bath${plan.baths > 1 ? 's' : ''}`;
    specs.appendChild(bathsSpan);
  }
  
  if (plan.area) {
    const areaSpan = document.createElement('span');
    areaSpan.innerHTML = `📏 ${plan.area.toLocaleString()} sq ft`;
    specs.appendChild(areaSpan);
  }
  
  // Create description if available
  let description = null;
  if (plan.description) {
    description = document.createElement('p');
    description.className = 'supabase-product-description';
    description.textContent = plan.description.length > 150 
      ? plan.description.substring(0, 150) + '...' 
      : plan.description;
  }
  
  // Create features list
  let featuresList = null;
  if (plan.features && Array.isArray(plan.features) && plan.features.length > 0) {
    featuresList = document.createElement('ul');
    featuresList.className = 'supabase-product-features';
    
    // Show first 4 features
    plan.features.slice(0, 4).forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
  }
  
  // Create price
  const price = document.createElement('p');
  price.className = 'supabase-product-price';
  price.textContent = 'Starting at $2,999';
  
  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'supabase-product-buttons';
  
  // Request Quote button
  const quoteButton = document.createElement('button');
  quoteButton.className = 'btn btn-small';
  quoteButton.textContent = 'Request Quote';
  quoteButton.onclick = function() {
    // Open search modal or redirect to contact
    if (typeof openSearchModal === 'function') {
      // You could create a custom modal for quotes
      window.location.href = '/pages/contact?plan=' + encodeURIComponent(plan.title);
    } else {
      window.location.href = '/pages/contact?plan=' + encodeURIComponent(plan.title);
    }
  };
  
  // Learn More button
  const learnMoreButton = document.createElement('a');
  learnMoreButton.className = 'btn btn-secondary btn-small';
  learnMoreButton.textContent = 'Learn More';
  learnMoreButton.href = '/pages/contact?plan=' + encodeURIComponent(plan.title);
  learnMoreButton.style.background = '#3A3A3A';
  
  // Assemble buttons
  buttonsContainer.appendChild(quoteButton);
  buttonsContainer.appendChild(learnMoreButton);
  
  // Assemble content
  content.appendChild(title);
  content.appendChild(specs);
  if (description) {
    content.appendChild(description);
  }
  if (featuresList) {
    content.appendChild(featuresList);
  }
  content.appendChild(price);
  content.appendChild(buttonsContainer);
  
  // Assemble card
  card.appendChild(image);
  card.appendChild(content);
  
  return card;
}

/**
 * Initialize on DOM ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for Supabase products container...');
    if (document.getElementById('supabase-products-grid')) {
      loadFloorPlans();
    }
  });
} else {
  // DOM already loaded
  console.log('DOM already loaded, checking for Supabase products container...');
  if (document.getElementById('supabase-products-grid')) {
    loadFloorPlans();
  }
}

