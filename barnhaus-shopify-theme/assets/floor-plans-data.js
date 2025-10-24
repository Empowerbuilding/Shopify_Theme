/**
 * Authoritative floor plan specifications
 * This data provides accurate beds, baths, and area for all floor plans
 * Data is matched to Shopify products using the product handle
 * 
 * HOW TO ADD YOUR PLANS:
 * 1. Go to your Shopify product page URL (e.g., /products/york-creek)
 * 2. The part after /products/ is your "handle" (e.g., "york-creek")
 * 3. Add a line below with: "handle": { beds: #, baths: #, area: #### },
 * 4. Use decimals for half baths (e.g., 2.5 baths)
 * 5. Don't forget the comma at the end of each line (except the last one before })
 */

const FLOOR_PLANS_DATA = {
  // ========================================
  // YOUR 20 FLOOR PLANS - EDIT THESE!
  // ========================================
  // Example: "product-handle": { beds: 4, baths: 3, area: 3200 },
  
  "york-creek-barndominium-plan-modern-farmhouse-steel-framed-4-bed-3-5-baths-design-blueprints": { beds: 4, baths: 4.5, area: 4200 },
  "timber-trails": { beds: 6, baths: 5.5, area: 4850 },
  "whiskey": { beds: 3, baths: 3.5, area: 2950 },
  "vatican": { beds: 6, baths: 4.5, area: 4650 },
  "spring-creek": { beds: 4, baths: 3.5, area: 3200 },
  "pedernales": { beds: 3, baths: 3, area: 3200 },
  "the-orlando": { beds: 4, baths: 4.5, area: 4500 },
  "the-nueces": { beds: 8, baths: 8, area: 6500 },
  "the-evergreen": { beds: 6, baths: 5.5, area: 4600 },
  "the-bungalow": { beds: 3, baths: 4, area: 4195 },
  "texas-peach": { beds: 5, baths: 5, area: 4500 },
  "serenity": { beds: 4, baths: 5.5, area: 3850 },
  "rhone-river": { beds: 4, baths: 3.5, area: 3800 },
  "mountain-breeze": { beds: 4, baths: 3.5, area: 3800 },
  "pure-pastures": { beds: 4, baths: 2.5, area: 3300 },
  "the-manhattan": { beds: 4, baths: 3, area: 3100 },
  "the-villa": { beds: 4, baths: 2, area: 3100 },
  "medina-shores": { beds: 3, baths: 3, area: 2700 },
  "cove-branch": { beds: 3, baths: 2.5, area: 2600 },
  "cloud-gate": { beds: 4, baths: 2, area: 2450 },
  
  // ========================================
  // OLD PLANS BELOW (can be deleted if not needed)
  // ========================================
  "mystique": { beds: 4, baths: 4, area: 4000 },
  "titan": { beds: 4, baths: 4, area: 5200 },
  "cloud-gate": { beds: 3, baths: 2.5, area: 2600 },
  "vatican": { beds: 6, baths: 4.5, area: 4650 },
  "horizon": { beds: 4, baths: 3, area: 3400 },
  "the-bungalow": { beds: 2, baths: 1.5, area: 1200 },
  "york-creek": { beds: 4, baths: 4.5, area: 4200 },
  "the-villa": { beds: 3, baths: 3.5, area: 2000 },
  "the-retreat": { beds: 8, baths: 8, area: 6500 },
  "arena": { beds: 4, baths: 2.5, area: 3300 },
  "farm-modern": { beds: 3, baths: 2.5, area: 2200 },
  "the-apex": { beds: 4, baths: 3.5, area: 3800 },
  "medina-shores": { beds: 2, baths: 2, area: 1850 },
  "sky-haus": { beds: 3, baths: 2.5, area: 1800 },
  "escape": { beds: 3, baths: 2.5, area: 2100 },
  "silo-estate": { beds: 4, baths: 2, area: 2450 },
  "iowa": { beds: 6, baths: 5.5, area: 7000 },
  "evergreen": { beds: 2, baths: 2, area: 1200 },
  "dynasty": { beds: 4, baths: 5.5, area: 3850 },
  "serenity": { beds: 3, baths: 3, area: 3200 },
  "the-orlando": { beds: 3, baths: 2.5, area: 2000 },
  "pedernales": { beds: 4, baths: 3.5, area: 3200 },
  "the-estate": { beds: 5, baths: 5, area: 4500 },
  "open-home": { beds: 2, baths: 1.5, area: 1600 },
  "corner-stone": { beds: 3, baths: 2.5, area: 2170 },
  "airrosti": { beds: 2, baths: 2, area: 1950 },
  "ranch-view": { beds: 4, baths: 2, area: 3100 },
  "spring-creek": { beds: 3, baths: 3, area: 2700 },
  "whiskey": { beds: 3, baths: 3.5, area: 2950 },
  "cafe": { beds: 4, baths: 3, area: 3100 },
  "tranquil": { beds: 2, baths: 3, area: 2500 },
  "rhone-river": { beds: 4, baths: 2.5, area: 2900 },
  "mountain-breeze": { beds: 5, baths: 3, area: 3300 },
  "the-manhattan": { beds: 3, baths: 2.5, area: 2400 },
  "cielo-alto": { beds: 4, baths: 3.5, area: 3800 },
  "the-nueces": { beds: 2, baths: 2, area: 1300 },
  "pure-pastures": { beds: 4, baths: 2.5, area: 2900 },
  "cove-branch": { beds: 3, baths: 3, area: 2400 },
  "timber-trails": { beds: 6, baths: 5.5, area: 4850 },
  "the-revelry": { beds: 3, baths: 4, area: 4195 },
  "sky-tower": { beds: 3, baths: 2.5, area: 1750 },
  "generation": { beds: 6, baths: 5.5, area: 4600 },
  "spring-mountain": { beds: 4, baths: 4.5, area: 4500 },
  "industry": { beds: 4, baths: 3, area: 2300 },
  "cedar": { beds: 2, baths: 1.5, area: 1500 },
  "complex": { beds: 8, baths: 6, area: 5000 },
  "german": { beds: 2, baths: 2, area: 1450 },
  "vista-grande": { beds: 4, baths: 4.5, area: 3000 },
  "texas-peach": { beds: 1, baths: 3, area: 1050 },
  "bastion": { beds: 4, baths: 4, area: 4500 }
};

/**
 * Get floor plan specs by product handle
 * @param {string} handle - Shopify product handle (e.g., "mystique", "the-bungalow")
 * @returns {object|null} - Floor plan specs or null if not found
 */
function getFloorPlanSpecs(handle) {
  if (!handle) return null;
  
  // Normalize handle (lowercase, trim)
  const normalizedHandle = handle.toLowerCase().trim();
  
  // Direct lookup
  if (FLOOR_PLANS_DATA[normalizedHandle]) {
    return FLOOR_PLANS_DATA[normalizedHandle];
  }
  
  // Fallback: try to match by removing common prefixes
  const withoutThe = normalizedHandle.replace(/^the-/, '');
  if (FLOOR_PLANS_DATA[withoutThe]) {
    return FLOOR_PLANS_DATA[withoutThe];
  }
  
  // Fallback: try adding "the-" prefix
  const withThe = 'the-' + normalizedHandle;
  if (FLOOR_PLANS_DATA[withThe]) {
    return FLOOR_PLANS_DATA[withThe];
  }
  
  return null;
}

/**
 * Format area with commas
 * @param {number} area - Square footage
 * @returns {string} - Formatted area string
 */
function formatArea(area) {
  if (!area) return '';
  return area.toLocaleString('en-US');
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.FloorPlansData = {
    getSpecs: getFloorPlanSpecs,
    formatArea: formatArea,
    data: FLOOR_PLANS_DATA
  };
}

