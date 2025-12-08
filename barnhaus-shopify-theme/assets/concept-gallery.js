/**
 * Concept Voting Gallery
 * Allows visitors to browse and vote on upcoming floor plan concepts
 */

// ============================================
// Supabase Configuration
// ============================================
const SUPABASE_URL = 'https://hbfjdfxephlczkfgpceg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZmpkZnhlcGhsY3prZmdwY2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMzc3MTAsImV4cCI6MjA1NDkxMzcxMH0.kPty5s2bpf4kYS-aVlMb8nb2L7tJXhpwl76VdsgzvHM';

let supabaseClient;
let concepts = [];
let userVotes = new Set();
let currentSort = 'popular';
let currentFilter = 'all';
let currentConceptId = null;
let pendingVoteConceptId = null;

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initSupabase();
  initVisitorId();
  loadConcepts();
  setupEventListeners();
});

/**
 * Initialize Supabase client
 */
function initSupabase() {
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase library not loaded');
    return;
  }
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log('Concept gallery Supabase initialized');
}

/**
 * Generate or retrieve visitor ID for anonymous voting
 */
function initVisitorId() {
  let visitorId = localStorage.getItem('barnhaus_visitor_id');
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem('barnhaus_visitor_id', visitorId);
  }
  return visitorId;
}

/**
 * Generate a unique visitor ID
 */
function generateVisitorId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const browserInfo = (navigator.userAgent + navigator.language).split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0).toString(36);
  return `${timestamp}-${randomPart}-${browserInfo}`;
}

/**
 * Get stored visitor ID
 */
function getVisitorId() {
  return localStorage.getItem('barnhaus_visitor_id') || initVisitorId();
}

/**
 * Check if user has provided email before
 */
function hasProvidedEmail() {
  return localStorage.getItem('barnhaus_voter_email') !== null;
}

/**
 * Store user email
 */
function storeUserEmail(email) {
  localStorage.setItem('barnhaus_voter_email', email);
}

/**
 * Get stored email
 */
function getStoredEmail() {
  return localStorage.getItem('barnhaus_voter_email');
}

// ============================================
// Data Loading
// ============================================

// Plans currently listed for sale in Shopify (exclude from concepts)
const SHOPIFY_LISTED_PLANS = [
  'york creek',
  'timber trails',
  'whiskey',
  'vatican',
  'spring creek',
  'pedernales',
  'the orlando',
  'the nueces',
  'evergreen',
  'the bungalow',
  'texas peach',
  'serenity',
  'rhone river',
  'mountain breeze',
  'the manhattan',
  'medina shores',
  'cove branch',
  'cloud gate',
  'the apex'
];

/**
 * Check if a floor plan is already listed in Shopify
 */
function isListedInShopify(planTitle) {
  if (!planTitle) return false;
  const normalizedTitle = planTitle.toLowerCase().trim();

  return SHOPIFY_LISTED_PLANS.some(listedPlan => {
    return normalizedTitle === listedPlan ||
           normalizedTitle === 'the ' + listedPlan ||
           normalizedTitle.replace('the ', '') === listedPlan.replace('the ', '');
  });
}

/**
 * Load concepts from Supabase (website_floor_plans minus Shopify products)
 */
async function loadConcepts() {
  const grid = document.getElementById('concepts-grid');

  if (!supabaseClient) {
    grid.innerHTML = '<div class="concepts-empty">Unable to connect to database. Please refresh the page.</div>';
    return;
  }

  try {
    // Fetch all floor plans from website_floor_plans
    const { data: plansData, error: plansError } = await supabaseClient
      .from('website_floor_plans')
      .select('*')
      .order('display_order', { ascending: true });

    if (plansError) {
      console.error('Error fetching floor plans:', plansError);
      grid.innerHTML = '<div class="concepts-empty">Unable to load concepts. Please try again later.</div>';
      return;
    }

    // Filter out plans that are already in Shopify
    const filteredPlans = (plansData || []).filter(plan => {
      return !isListedInShopify(plan.title);
    });

    // Map website_floor_plans fields to concept format
    concepts = filteredPlans.map(plan => ({
      id: plan.id,
      name: plan.title || plan.name,
      description: plan.description || 'A custom steel building floor plan designed for modern living with strength and style. Vote to help us prioritize developing this concept!',
      image_url: plan.image_url,
      beds: plan.beds,
      baths: plan.baths,
      sqft: plan.area || plan.sqft,
      style: plan.style || 'barndominium',
      status: 'active',
      vote_count: plan.vote_count || 0,
      created_at: plan.created_at,
      features: plan.features || []
    }));

    console.log('Concepts loaded:', concepts.length, '(excluded', (plansData || []).length - concepts.length, 'Shopify products)');

    // Fetch user's votes
    const visitorId = getVisitorId();
    const { data: votesData, error: votesError } = await supabaseClient
      .from('concept_votes')
      .select('concept_id')
      .eq('visitor_id', visitorId);

    if (!votesError && votesData) {
      userVotes = new Set(votesData.map(v => v.concept_id));
    }

    renderConcepts();

  } catch (err) {
    console.error('Unexpected error loading concepts:', err);
    grid.innerHTML = '<div class="concepts-empty">An error occurred. Please refresh the page.</div>';
  }
}

// ============================================
// Rendering
// ============================================

/**
 * Render concepts based on current sort and filter
 */
function renderConcepts() {
  const grid = document.getElementById('concepts-grid');

  if (concepts.length === 0) {
    grid.innerHTML = '<div class="concepts-empty">No concepts available at this time. Check back soon!</div>';
    return;
  }

  // Filter concepts
  let filtered = [...concepts];
  if (currentFilter !== 'all') {
    filtered = filtered.filter(c => c.style === currentFilter);
  }

  // Sort concepts
  if (currentSort === 'popular') {
    filtered.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
  } else if (currentSort === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="concepts-empty">No concepts match this filter. Try selecting a different style.</div>';
    return;
  }

  grid.innerHTML = filtered.map((concept, index) => createConceptCard(concept, index)).join('');
}

/**
 * Create HTML for a concept card
 */
function createConceptCard(concept, index) {
  const isVoted = userVotes.has(concept.id);
  const isComingSoon = concept.status === 'coming_soon';
  const voteCount = concept.vote_count || 0;

  // Format style for display
  const styleDisplay = formatStyleName(concept.style);

  // Star icon - filled or outline
  const starIcon = isVoted
    ? `<svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
    : `<svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

  return `
    <div class="concept-card" data-concept-id="${concept.id}" style="animation-delay: ${index * 0.05}s">
      ${isComingSoon ? '<span class="coming-soon-badge">Coming Soon!</span>' : ''}

      <button class="vote-btn ${isVoted ? 'voted' : ''}" onclick="toggleVote('${concept.id}', event)" aria-label="${isVoted ? 'Remove vote' : 'Vote for this concept'}">
        ${starIcon}
        <span>${voteCount}</span>
      </button>

      <div class="concept-image-wrapper">
        <img
          src="${concept.image_url || 'https://via.placeholder.com/600x450?text=Concept+Image'}"
          alt="${concept.name || 'Floor Plan Concept'}"
          class="concept-image"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/600x450?text=Concept+Image'"
        >
        <div class="concept-overlay">
          <button class="view-details-btn" onclick="openDetailModal('${concept.id}')">View Details</button>
        </div>
      </div>

      <div class="concept-content">
        <h3 class="concept-name">${concept.name || 'Untitled Concept'}</h3>
        ${concept.style ? `<span class="concept-style-badge">${styleDisplay}</span>` : ''}

        <div class="concept-specs">
          ${concept.beds ? `
            <div class="spec-item">
              <span class="spec-icon">&#x1F6CF;</span>
              <span class="spec-value">${concept.beds}</span>
              <span class="spec-label">Beds</span>
            </div>
          ` : ''}
          ${concept.baths ? `
            <div class="spec-item">
              <span class="spec-icon">&#x1F6BF;</span>
              <span class="spec-value">${concept.baths}</span>
              <span class="spec-label">Baths</span>
            </div>
          ` : ''}
          ${concept.sqft ? `
            <div class="spec-item">
              <span class="spec-icon">&#x1F4D0;</span>
              <span class="spec-value">${concept.sqft.toLocaleString()}</span>
              <span class="spec-label">SF</span>
            </div>
          ` : ''}
          <div class="spec-item vote-count-spec">
            <span class="spec-value">${voteCount}</span>
            <span class="spec-label">Votes</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format style name for display
 */
function formatStyleName(style) {
  if (!style) return '';
  const styleMap = {
    'barndominium': 'Barndominium',
    'modern-farmhouse': 'Modern Farmhouse',
    'mid-century': 'Mid-Century Modern',
    'industrial': 'Industrial',
    'traditional': 'Traditional'
  };
  return styleMap[style] || style.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ============================================
// Voting Logic
// ============================================

/**
 * Toggle vote on a concept
 */
async function toggleVote(conceptId, event) {
  if (event) {
    event.stopPropagation();
  }

  if (!supabaseClient) {
    console.error('Supabase not initialized');
    return;
  }

  const isVoted = userVotes.has(conceptId);
  const visitorId = getVisitorId();

  if (isVoted) {
    // Unvote
    await removeVote(conceptId, visitorId);
  } else {
    // Vote - check if first time voting
    if (!hasProvidedEmail()) {
      pendingVoteConceptId = conceptId;
      openEmailModal();
    } else {
      await addVote(conceptId, visitorId, getStoredEmail());
    }
  }
}

/**
 * Add a vote
 */
async function addVote(conceptId, visitorId, email = null, notifyOnRelease = false) {
  try {
    const voteData = {
      concept_id: conceptId,
      visitor_id: visitorId
    };

    if (email) {
      voteData.email = email;
      voteData.notify_on_release = notifyOnRelease;
    }

    const { error } = await supabaseClient
      .from('concept_votes')
      .insert(voteData);

    if (error) {
      if (error.code === '23505') {
        // Duplicate vote - already voted
        console.log('Already voted for this concept');
      } else {
        console.error('Error adding vote:', error);
      }
      return;
    }

    // Update local state
    userVotes.add(conceptId);
    updateVoteCountLocally(conceptId, 1);
    updateVoteUI(conceptId, true);

  } catch (err) {
    console.error('Error adding vote:', err);
  }
}

/**
 * Remove a vote
 */
async function removeVote(conceptId, visitorId) {
  try {
    const { error } = await supabaseClient
      .from('concept_votes')
      .delete()
      .eq('concept_id', conceptId)
      .eq('visitor_id', visitorId);

    if (error) {
      console.error('Error removing vote:', error);
      return;
    }

    // Update local state
    userVotes.delete(conceptId);
    updateVoteCountLocally(conceptId, -1);
    updateVoteUI(conceptId, false);

  } catch (err) {
    console.error('Error removing vote:', err);
  }
}

/**
 * Update vote count in local concepts array
 */
function updateVoteCountLocally(conceptId, delta) {
  const concept = concepts.find(c => c.id === conceptId);
  if (concept) {
    concept.vote_count = Math.max(0, (concept.vote_count || 0) + delta);
  }
}

/**
 * Update vote button UI
 */
function updateVoteUI(conceptId, isVoted) {
  // Update card vote button
  const card = document.querySelector(`[data-concept-id="${conceptId}"]`);
  if (card) {
    const voteBtn = card.querySelector('.vote-btn');
    const concept = concepts.find(c => c.id === conceptId);
    const voteCount = concept ? concept.vote_count : 0;

    if (voteBtn) {
      voteBtn.classList.toggle('voted', isVoted);

      const starIcon = isVoted
        ? `<svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        : `<svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

      voteBtn.innerHTML = `${starIcon}<span>${voteCount}</span>`;
    }

    // Update vote count in specs
    const voteCountSpec = card.querySelector('.vote-count-spec .spec-value');
    if (voteCountSpec) {
      voteCountSpec.textContent = voteCount;
    }
  }

  // Update detail modal if open and showing this concept
  if (currentConceptId === conceptId) {
    const detailVoteBtn = document.getElementById('detail-vote-btn');
    const detailVoteCount = document.getElementById('detail-vote-count');
    const detailTotalVotes = document.getElementById('detail-total-votes');
    const concept = concepts.find(c => c.id === conceptId);

    if (detailVoteBtn) {
      detailVoteBtn.classList.toggle('voted', isVoted);
      const voteText = detailVoteBtn.querySelector('.vote-text');
      if (voteText) {
        voteText.textContent = isVoted ? 'Voted' : 'Vote';
      }
    }
    if (detailVoteCount && concept) {
      detailVoteCount.textContent = concept.vote_count || 0;
    }
    if (detailTotalVotes && concept) {
      detailTotalVotes.textContent = concept.vote_count || 0;
    }
  }
}

// ============================================
// Email Modal
// ============================================

/**
 * Open email capture modal
 */
function openEmailModal() {
  const modal = document.getElementById('email-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus email input
    setTimeout(() => {
      const input = document.getElementById('email-input');
      if (input) input.focus();
    }, 100);
  }
}

/**
 * Close email capture modal
 */
function closeEmailModal() {
  const modal = document.getElementById('email-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  pendingVoteConceptId = null;
}

/**
 * Submit email and vote
 */
async function submitEmail(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email-input');
  const notifyCheckbox = document.getElementById('notify-checkbox');
  const email = emailInput ? emailInput.value.trim() : '';
  const notifyOnRelease = notifyCheckbox ? notifyCheckbox.checked : false;

  if (email && pendingVoteConceptId) {
    storeUserEmail(email);
    await addVote(pendingVoteConceptId, getVisitorId(), email, notifyOnRelease);

    // Reset form
    if (emailInput) emailInput.value = '';
    if (notifyCheckbox) notifyCheckbox.checked = true;
  }

  closeEmailModal();
}

/**
 * Skip email and just vote
 */
async function skipEmail() {
  if (pendingVoteConceptId) {
    // Mark as having skipped (won't ask again this session)
    storeUserEmail('skipped');
    await addVote(pendingVoteConceptId, getVisitorId());
  }
  closeEmailModal();
}

// ============================================
// Detail Modal
// ============================================

/**
 * Open concept detail modal
 */
function openDetailModal(conceptId) {
  const concept = concepts.find(c => c.id === conceptId);
  if (!concept) return;

  currentConceptId = conceptId;
  const isVoted = userVotes.has(conceptId);

  // Populate modal
  document.getElementById('detail-image').src = concept.image_url || 'https://via.placeholder.com/800x500?text=Concept+Image';
  document.getElementById('detail-image').alt = concept.name || 'Floor Plan Concept';
  document.getElementById('detail-title').textContent = concept.name || 'Untitled Concept';
  document.getElementById('detail-style').textContent = formatStyleName(concept.style);
  document.getElementById('detail-description').textContent = concept.description || 'This is an upcoming floor plan concept. Vote to help us decide if we should develop it into a full plan!';
  document.getElementById('detail-beds').textContent = concept.beds || '-';
  document.getElementById('detail-baths').textContent = concept.baths || '-';
  document.getElementById('detail-sqft').textContent = concept.sqft ? concept.sqft.toLocaleString() : '-';
  document.getElementById('detail-vote-count').textContent = concept.vote_count || 0;
  document.getElementById('detail-total-votes').textContent = concept.vote_count || 0;

  // Update vote button state
  const voteBtn = document.getElementById('detail-vote-btn');
  if (voteBtn) {
    voteBtn.classList.toggle('voted', isVoted);
    const voteText = voteBtn.querySelector('.vote-text');
    if (voteText) {
      voteText.textContent = isVoted ? 'Voted' : 'Vote';
    }
  }

  // Show modal
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close concept detail modal
 */
function closeDetailModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  currentConceptId = null;
}

/**
 * Toggle vote from detail modal
 */
function toggleDetailVote() {
  if (currentConceptId) {
    toggleVote(currentConceptId);
  }
}

// ============================================
// Event Listeners
// ============================================

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const sort = this.dataset.sort;
      if (sort === currentSort) return;

      currentSort = sort;
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderConcepts();
    });
  });

  // Filter dropdown
  const filterSelect = document.getElementById('style-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', function() {
      currentFilter = this.value;
      renderConcepts();
    });
  }

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeEmailModal();
      closeDetailModal();
    }
  });

  // Click outside modals to close
  document.querySelectorAll('.email-modal-overlay, .detail-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
      closeEmailModal();
      closeDetailModal();
    });
  });
}

// ============================================
// Make functions globally accessible
// ============================================
window.toggleVote = toggleVote;
window.openDetailModal = openDetailModal;
window.closeDetailModal = closeDetailModal;
window.closeEmailModal = closeEmailModal;
window.submitEmail = submitEmail;
window.skipEmail = skipEmail;
window.toggleDetailVote = toggleDetailVote;
