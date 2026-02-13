/**
 * Plan Detail Page
 * Displays individual floor plan with image zoom functionality
 */

// Initialize Supabase
const supabaseUrl = 'https://hbfjdfxephlczkfgpceg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZmpkZnhlcGhsY3prZmdwY2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMzc3MTAsImV4cCI6MjA1NDkxMzcxMH0.kPty5s2bpf4kYS-aVlMb8nb2L7tJXhpwl76VdsgzvHM';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log('Plan detail page initialized');

/**
 * Get plan ID from URL
 */
function getPlanIdFromUrl() {
  const path = window.location.pathname;
  // Match pattern: /pages/plan-{id}
  const match = path.match(/plan-([^\/]+)/);
  const planId = match ? match[1] : null;
  console.log('Extracted plan ID from URL:', planId);
  return planId;
}

/**
 * Load single plan details
 */
async function loadPlanDetails() {
  console.log('Loading plan details...');
  
  const planId = getPlanIdFromUrl();
  if (!planId) {
    console.error('No plan ID found in URL');
    const container = document.getElementById('plan-detail-container');
    if (container) {
      container.innerHTML = '<div class="loading-message" style="color: #DC2626;">Invalid plan URL</div>';
    }
    return;
  }
  
  const container = document.getElementById('plan-detail-container');
  if (!container) {
    console.error('Container #plan-detail-container not found');
    return;
  }
  
  try {
    const { data: plan, error } = await supabaseClient
      .from('website_floor_plans')
      .select('*')
      .eq('id', planId)
      .single();
    
    if (error) {
      console.error('Error fetching plan:', error);
      container.innerHTML = '<div class="loading-message" style="color: #DC2626;">Plan not found. <a href="/" style="color: #B8860B;">Return to homepage</a></div>';
      return;
    }
    
    console.log('Plan loaded successfully:', plan);
    displayPlanDetails(plan);
    
  } catch (err) {
    console.error('Unexpected error:', err);
    container.innerHTML = '<div class="loading-message" style="color: #DC2626;">An error occurred loading this plan.</div>';
  }
}

/**
 * Display plan details
 */
function displayPlanDetails(plan) {
  const container = document.getElementById('plan-detail-container');
  
  // Build features HTML
  let featuresHtml = '';
  if (plan.features && Array.isArray(plan.features) && plan.features.length > 0) {
    featuresHtml = `
      <div class="plan-features-section">
        <h3>Features & Amenities</h3>
        <ul class="plan-features-list">
          ${plan.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Build description HTML
  const descriptionHtml = plan.description 
    ? `<div class="plan-description"><p>${plan.description}</p></div>`
    : '<div class="plan-description"><p>Custom steel building plan designed for modern living with strength and style.</p></div>';
  
  container.innerHTML = `
    <div class="plan-detail-grid">
      <!-- Image Section -->
      <div class="plan-detail-image-section">
        <div class="plan-image-wrapper" onclick="openImageZoom('${plan.image_url || ''}', '${(plan.title || '').replace(/'/g, "\\'")}')">
          <img src="${plan.image_url || 'https://via.placeholder.com/800x600?text=Floor+Plan'}" 
               alt="${plan.title || 'Floor Plan'}" 
               class="plan-detail-image"
               onerror="this.src='https://via.placeholder.com/800x600?text=Floor+Plan'">
          <div class="zoom-hint">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            Click to zoom
          </div>
        </div>
      </div>
      
      <!-- Details Section -->
      <div class="plan-detail-info">
        <h1 class="plan-detail-title">${plan.title || 'Floor Plan'}</h1>
        
        <div class="plan-specs-large">
          ${plan.beds ? `
          <div class="spec-item">
            <div class="spec-icon">🛏️</div>
            <div class="spec-text">
              <div class="spec-value">${plan.beds}</div>
              <div class="spec-label">Bedroom${plan.beds > 1 ? 's' : ''}</div>
            </div>
          </div>
          ` : ''}
          ${plan.baths ? `
          <div class="spec-item">
            <div class="spec-icon">🚿</div>
            <div class="spec-text">
              <div class="spec-value">${plan.baths}</div>
              <div class="spec-label">Bathroom${plan.baths > 1 ? 's' : ''}</div>
            </div>
          </div>
          ` : ''}
          ${plan.area ? `
          <div class="spec-item">
            <div class="spec-icon">📐</div>
            <div class="spec-text">
              <div class="spec-value">${plan.area.toLocaleString()}</div>
              <div class="spec-label">Sq Ft</div>
            </div>
          </div>
          ` : ''}
        </div>
        
        ${descriptionHtml}
        
        ${featuresHtml}
        
        <div class="plan-pricing-section">
          <div class="plan-price">Starting at $2,999</div>
          <p class="price-note">Final pricing based on customization and site requirements</p>
        </div>
        
        <div class="plan-actions">
          <button class="btn btn-large" onclick="requestQuote('${(plan.title || '').replace(/'/g, "\\'")}')">
            Request Custom Quote
          </button>
          <a href="/pages/contact?plan=${encodeURIComponent(plan.title || '')}" class="btn btn-secondary btn-large">
            Schedule Consultation
          </a>
        </div>
        
        <a href="/" class="back-link">← Back to All Plans</a>
      </div>
    </div>
  `;
}

/**
 * Open image zoom modal
 */
function openImageZoom(imageUrl, title) {
  if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
    imageUrl = 'https://via.placeholder.com/1200x900?text=Floor+Plan';
  }
  
  const modal = document.createElement('div');
  modal.className = 'image-zoom-modal';
  modal.innerHTML = `
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
           onerror="this.src='https://via.placeholder.com/1200x900?text=Floor+Plan'">
      <div class="zoom-hint-text">Pinch to zoom • Drag to pan • Scroll to zoom</div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Trigger animation
  setTimeout(() => modal.classList.add('active'), 10);
  
  // Initialize zoom functionality
  const img = modal.querySelector('.zoom-image');
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
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
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
      // Pinch zoom start
      e.preventDefault();
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      lastScale = scale;
    } else if (e.touches.length === 1) {
      // Pan start
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  }, { passive: false });
  
  img.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      const scaleChange = distance / initialDistance;
      scale = Math.max(1, Math.min(4, lastScale * scaleChange));
      updateTransform();
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Pan
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
    
    // Zoom towards cursor position
    if (scale !== oldScale) {
      const rect = img.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      
      translateX -= offsetX * (scale / oldScale - 1);
      translateY -= offsetY * (scale / oldScale - 1);
    }
    
    // Reset position if zoomed out completely
    if (scale === 1) {
      translateX = 0;
      translateY = 0;
      img.style.cursor = 'grab';
    } else {
      img.style.cursor = 'grab';
    }
    
    updateTransform();
  }, { passive: false });
  
  // Update transform
  function updateTransform() {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    img.style.transition = isDragging ? 'none' : 'transform 0.1s ease-out';
  }
  
  // Calculate distance between two touch points
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
  const encodedTitle = encodeURIComponent(planTitle || 'Floor Plan');
  window.location.href = `/pages/contact?plan=${encodedTitle}&type=quote`;
}

/**
 * Close zoom on Escape key
 */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    closeImageZoom();
  }
});

/**
 * Load plan on page load
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('plan-detail-container')) {
      loadPlanDetails();
    }
  });
} else {
  if (document.getElementById('plan-detail-container')) {
    loadPlanDetails();
  }
}

