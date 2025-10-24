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
  "timber-trails-barndominium-plan-modern-farmhouse-design-pdf-download": { beds: 6, baths: 5.5, area: 4850 },
  "the-whiskey-barndominium-a-modern-steel-framed-farmhouse-3-bed-3-5-baths-design-blueprints": { beds: 3, baths: 3.5, area: 2950 },
  "the-vatican-modern-italian-farmhouse-7-bedrooms-4-5-bathrooms-multigenerational-house-plan": { beds: 6, baths: 4.5, area: 4650 },
  "the-spring-creek-modern-farmhouse-3-bedroom-3-bath-2639-sf-design-build-blueprints": { beds: 3, baths: 3, area: 2700 },
  "the-pedernales-barndominium-4-bedrooms-3-baths-2-973-sf-living-riverfront-home-design-blueprints": { beds: 3, baths: 3, area: 2700 },
  "the-orlando-barndominium-3-bedrooms-2-5-baths-1-939-sf-living-industrial-modern-farmhouse-design-blueprints": { beds: 2, baths: 2.5, area: 2000 },
  "the-nueces-barndominium-2-bedroom-2-bathroom-modern-farmhouse-metal-building-plan-drawing": { beds: 2, baths: 2, area: 1300 },
  "the-evergreen-barndominium-shop-with-studio-loft-45-x-95-footprint-shop-design-build-plan": { beds: 2, baths: 2, area: 1200 },
  "the-bungalow-barndominium-3-bedrooms-2-baths-860-sf-living-tiny-home-design-blueprints": { beds: 2, baths: 1.5, area: 1200 },
  "texas-peach-barndominium-blueprint-mid-century-modern-1-bed-1-5-bath": { beds: 1, baths: 2, area: 1050 },
  "serenity-a-mid-century-modern-luxury-house-plan-3-bedroom-3-bath-design-blueprints": { beds: 3, baths: 3, area: 3200 },
  "rhone-river-house-plan-4-bed-industrial-loft-blueprints-pdf-download": { beds: 4, baths: 2.5, area: 2900 },
  "mountain-breeze-barndominium-4-bedroom-3-baths-2-784-sf-living-home-design-blueprints": { beds: 4, baths: 3, area: 2800 },
  "modern-farmhouse-barndominium-plan-4-bed-2-5-bath-pdf-plan": { beds: 4, baths: 2.5, area: 2626 },
  "mid-century-modern-house-plan-the-manhattan-2547-sf-pdf-plan": { beds: 3, baths: 2.5, area: 2547 },
  "mid-century-modern-barndominium-plan-2-bed-carport-pdf": { beds: 3, baths: 2.5, area: 1900 },
  "medina-shores-2-bed-2-bath-mid-century-modern-steel-house-plan": { beds: 2, baths: 2, area: 1560 },
  "cove-branch-barndominium-plan-modern-farmhouse-3-bed-pdf-download": { beds: 3, baths: 2.5, area: 2323 },
  "cloud-gate-barndominium-plan-modern-farmhouse-2275-sf-pdf-download": { beds: 3, baths: 2.5, area: 2275 },
  
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

