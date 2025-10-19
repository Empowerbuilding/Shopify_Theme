/**
 * Shopify Products Integration
 * Fetches and displays products directly from Shopify
 */

console.log('Shopify products script initialized');

/**
 * Fetch products from Shopify
 */
async function loadShopifyProducts(collectionHandle = 'floor-plans') {
  console.log('Fetching products from Shopify...');
  
  const container = document.getElementById('products-grid');
  
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  container.innerHTML = `
    <div class="loading-message">
      <svg width="40" height="40" viewBox="0 0 40 40" style="margin: 0 auto 1rem; display: block;">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#3A3A3A" stroke-width="4"/>
        <circle cx="20" cy="20" r="18" fill="none" stroke="#B8860B" stroke-width="4" stroke-dasharray="90, 150" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
      Loading floor plans...
    </div>
  `;
  
  try {
    const response = await fetch(`/collections/${collectionHandle}/products.json`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    const products = data.products;
    
    console.log('Products fetched:', products.length);
    
    if (!products || products.length === 0) {
      container.innerHTML = '<div class="loading-message">No products available.</div>';
      return;
    }
    
    container.innerHTML = '';
    products.forEach(product => {
      container.appendChild(createProductCard(product));
    });
    
  } catch (err) {
    console.error('Error:', err);
    container.innerHTML = '<div class="loading-message" style="color: #DC2626;">Error loading products.</div>';
  }
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card fade-in';
  card.style.cursor = 'pointer';
  
  card.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    window.location.href = `/products/${product.handle}`;
  });
  
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].src 
    : 'https://via.placeholder.com/400x300?text=Floor+Plan';
  
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = product.title;
  image.className = 'product-image';
  image.loading = 'lazy';
  
  const content = document.createElement('div');
  content.className = 'product-content';
  
  const title = document.createElement('h3');
  title.className = 'product-title';
  title.textContent = product.title;
  
  const specs = document.createElement('div');
  specs.className = 'product-specs';
  
  const bedMatch = product.tags.find(tag => tag.toLowerCase().includes('bed'));
  const bathMatch = product.tags.find(tag => tag.toLowerCase().includes('bath'));
  const sqftMatch = product.tags.find(tag => tag.toLowerCase().includes('sqft') || tag.toLowerCase().includes('sf'));
  
  if (bedMatch) {
    const beds = bedMatch.match(/\d+/)?.[0];
    if (beds) {
      const span = document.createElement('span');
      span.innerHTML = `🛏️ ${beds} Bed${beds > 1 ? 's' : ''}`;
      specs.appendChild(span);
    }
  }
  
  if (bathMatch) {
    const baths = bathMatch.match(/[\d.]+/)?.[0];
    if (baths) {
      const span = document.createElement('span');
      span.innerHTML = `🚿 ${baths} Bath${baths > 1 ? 's' : ''}`;
      specs.appendChild(span);
    }
  }
  
  if (sqftMatch) {
    const sqft = sqftMatch.match(/[\d,]+/)?.[0];
    if (sqft) {
      const span = document.createElement('span');
      span.innerHTML = `📏 ${sqft} sq ft`;
      specs.appendChild(span);
    }
  }
  
  const description = document.createElement('p');
  description.className = 'product-description';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = product.body_html || '';
  const plainText = tempDiv.textContent || tempDiv.innerText || '';
  description.textContent = plainText.length > 100 
    ? plainText.substring(0, 100) + '...' 
    : plainText;
  
  const priceSection = document.createElement('div');
  priceSection.className = 'product-price';
  
  const variant = product.variants[0];
  if (variant && variant.price) {
    const price = parseFloat(variant.price);
    priceSection.innerHTML = `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    priceSection.innerHTML = 'View Product →';
  }
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'product-buttons';
  buttonContainer.style.marginTop = '1rem';
  
  const buyButton = document.createElement('button');
  buyButton.className = 'btn btn-primary';
  buyButton.textContent = 'View Details';
  buyButton.style.width = '100%';
  buyButton.onclick = function(e) {
    e.stopPropagation();
    window.location.href = `/products/${product.handle}`;
  };
  
  buttonContainer.appendChild(buyButton);
  
  content.appendChild(title);
  if (specs.children.length > 0) {
    content.appendChild(specs);
  }
  if (description.textContent) {
    content.appendChild(description);
  }
  content.appendChild(priceSection);
  content.appendChild(buttonContainer);
  
  card.appendChild(image);
  card.appendChild(content);
  
  return card;
}

document.addEventListener('DOMContentLoaded', function() {
  loadShopifyProducts('floor-plans');
});

window.loadShopifyProducts = loadShopifyProducts;

