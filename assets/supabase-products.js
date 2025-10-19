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
  card.style.cursor = 'pointer';
  
  // Make entire card clickable to go to detail page
  card.addEventListener('click', function(e) {
    // Don't navigate if clicking on buttons
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
      return;
    }
    window.location.href = '/pages/plan-' + plan.id;
  });
  
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
    description.textContent = plan.description.length > 100 
      ? plan.description.substring(0, 100) + '...' 
      : plan.description;
  }
  
  // Create features list (show only 3 features on card)
  let featuresList = null;
  if (plan.features && Array.isArray(plan.features) && plan.features.length > 0) {
    featuresList = document.createElement('ul');
    featuresList.className = 'supabase-product-features';
    
    // Show first 3 features
    plan.features.slice(0, 3).forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
  }
  
  // Create "View Details" link instead of price
  const viewDetails = document.createElement('p');
  viewDetails.className = 'supabase-product-price';
  viewDetails.style.display = 'flex';
  viewDetails.style.alignItems = 'center';
  viewDetails.style.gap = '0.5rem';
  viewDetails.innerHTML = 'View Details <span style="font-size: 1rem;">→</span>';
  
  // Assemble content
  content.appendChild(title);
  content.appendChild(specs);
  if (description) {
    content.appendChild(description);
  }
  if (featuresList) {
    content.appendChild(featuresList);
  }
  content.appendChild(viewDetails);
  
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

