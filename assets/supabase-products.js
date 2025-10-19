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
  
  // Open detail modal instead of navigating
  card.addEventListener('click', function(e) {
    e.preventDefault();
    openPlanDetailModal(plan);
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
  
  // Create "View Details" link
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
 * Open plan detail modal
 */
function openPlanDetailModal(plan) {
  // Remove existing modal if any
  const existing = document.querySelector('.plan-detail-modal');
  if (existing) existing.remove();
  
  // Build features HTML
  let featuresHtml = '';
  if (plan.features && Array.isArray(plan.features) && plan.features.length > 0) {
    featuresHtml = `
      <div class="plan-modal-features">
        <h3>Key Features</h3>
        <ul>
          ${plan.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  const modal = document.createElement('div');
  modal.className = 'plan-detail-modal';
  modal.innerHTML = `
    <div class="plan-modal-overlay" onclick="closePlanDetailModal()"></div>
    <div class="plan-modal-content">
      <button class="plan-modal-close" onclick="closePlanDetailModal()" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="plan-modal-grid">
        <!-- Left: Image -->
        <div class="plan-modal-image-section">
          <div class="plan-modal-image-wrapper" onclick="openImageZoomModal('${(plan.image_url || '').replace(/'/g, "\\'")}', '${(plan.title || 'Floor Plan').replace(/'/g, "\\'")}', event)">
            <img src="${plan.image_url || 'https://via.placeholder.com/800x600?text=Floor+Plan'}" 
                 alt="${plan.title || 'Floor Plan'}" 
                 class="plan-modal-image"
                 onerror="this.src='https://via.placeholder.com/800x600?text=Floor+Plan'">
            <div class="zoom-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <span>Click to Zoom</span>
            </div>
          </div>
        </div>
        
        <!-- Right: Details -->
        <div class="plan-modal-info">
          <h2 class="plan-modal-title">${plan.title || 'Floor Plan'}</h2>
          
          <div class="plan-modal-specs">
            ${plan.beds ? `
            <div class="spec-badge">
              <span class="spec-icon">🛏️</span>
              <div>
                <div class="spec-value">${plan.beds}</div>
                <div class="spec-label">Bedroom${plan.beds > 1 ? 's' : ''}</div>
              </div>
            </div>
            ` : ''}
            ${plan.baths ? `
            <div class="spec-badge">
              <span class="spec-icon">🚿</span>
              <div>
                <div class="spec-value">${plan.baths}</div>
                <div class="spec-label">Bathroom${plan.baths > 1 ? 's' : ''}</div>
              </div>
            </div>
            ` : ''}
            ${plan.area ? `
            <div class="spec-badge">
              <span class="spec-icon">📐</span>
              <div>
                <div class="spec-value">${plan.area.toLocaleString()}</div>
                <div class="spec-label">Sq Ft</div>
              </div>
            </div>
            ` : ''}
          </div>
          
          <div class="plan-modal-description">
            <p>${plan.description || 'Custom steel building plan designed for modern living in the Texas Hill Country.'}</p>
          </div>
          
          ${featuresHtml}
          
          <div class="plan-modal-pricing">
            <div class="modal-price">Starting at $2,999</div>
            <p class="modal-price-note">Final pricing based on customization and site requirements</p>
          </div>
          
          <div class="plan-modal-actions">
            <button class="btn btn-large" onclick="requestQuote('${(plan.title || 'Floor Plan').replace(/'/g, "\\'")}')">
              Request Custom Quote
            </button>
            <a href="https://barnhaussteelbuilders.com/contact?plan=${encodeURIComponent(plan.title || 'Floor Plan')}" class="btn btn-secondary btn-large" target="_blank">
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  setTimeout(() => modal.classList.add('active'), 10);
}

/**
 * Close plan detail modal
 */
function closePlanDetailModal() {
  const modal = document.querySelector('.plan-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

/**
 * Open image zoom modal
 */
function openImageZoomModal(imageUrl, title, event) {
  event.stopPropagation();
  
  if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
    imageUrl = 'https://via.placeholder.com/1200x900?text=Floor+Plan';
  }
  
  const zoomModal = document.createElement('div');
  zoomModal.className = 'image-zoom-modal';
  zoomModal.innerHTML = `
    <div class="zoom-modal-overlay" onclick="closeImageZoom()"></div>
    <div class="zoom-modal-content">
      <button class="zoom-close" onclick="closeImageZoom()" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img src="${imageUrl}" 
           alt="${title || 'Floor Plan'}" 
           class="zoom-image" 
           id="zoomImage"
           onerror="this.src='https://via.placeholder.com/1200x900?text=Floor+Plan'">
      <div class="zoom-hint-text">
        <span class="desktop-hint">Scroll to zoom • Click and drag to pan</span>
        <span class="mobile-hint">Pinch to zoom • Drag to pan</span>
      </div>
    </div>
  `;
  
  document.body.appendChild(zoomModal);
  setTimeout(() => zoomModal.classList.add('active'), 10);
  
  const img = zoomModal.querySelector('#zoomImage');
  if (img) {
    initializeImageZoom(img);
  }
}

/**
 * Close image zoom modal
 */
function closeImageZoom() {
  const modal = document.querySelector('.image-zoom-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

/**
 * Initialize image zoom and pan functionality
 */
function initializeImageZoom(img) {
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialDistance = 0;
  let lastScale = 1;
  
  img.style.cursor = 'grab';
  
  // Touch events for mobile pinch and pan
  img.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      lastScale = scale;
    } else if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  }, { passive: false });
  
  img.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      const scaleChange = distance / initialDistance;
      scale = Math.max(1, Math.min(4, lastScale * scaleChange));
      updateTransform();
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      e.preventDefault();
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      updateTransform();
    }
  }, { passive: false });
  
  img.addEventListener('touchend', function(e) {
    if (e.touches.length < 2) {
      initialDistance = 0;
    }
    if (e.touches.length === 0) {
      isDragging = false;
    }
  });
  
  // Mouse events for desktop
  img.addEventListener('mousedown', function(e) {
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      img.style.cursor = 'grabbing';
      e.preventDefault();
    }
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });
  
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      img.style.cursor = scale > 1 ? 'grab' : 'default';
    }
  });
  
  // Mouse wheel zoom for desktop
  img.addEventListener('wheel', function(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const oldScale = scale;
    scale = Math.max(1, Math.min(4, scale * delta));
    
    if (scale === 1) {
      translateX = 0;
      translateY = 0;
      img.style.cursor = 'grab';
    } else {
      img.style.cursor = 'grab';
    }
    
    updateTransform();
  }, { passive: false });
  
  function updateTransform() {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    img.style.transition = isDragging ? 'none' : 'transform 0.1s ease-out';
  }
  
  function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

/**
 * Request quote function
 */
function requestQuote(planTitle) {
  window.open(`https://barnhaussteelbuilders.com/contact?plan=${encodeURIComponent(planTitle)}`, '_blank');
}

/**
 * Make functions globally accessible for onclick handlers
 */
window.openPlanDetailModal = openPlanDetailModal;
window.closePlanDetailModal = closePlanDetailModal;
window.openImageZoomModal = openImageZoomModal;
window.closeImageZoom = closeImageZoom;
window.requestQuote = requestQuote;

/**
 * Escape key handler
 */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    closeImageZoom();
    closePlanDetailModal();
  }
});

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
