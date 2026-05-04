/**
 * Authoritative floor plan specifications
 * Data matched to Shopify products via product handle
 *
 * area     = living sqft
 * patio    = covered patio/porch sqft (estimated where not explicitly stated)
 * garage   = garage/shop/carport sqft (estimated where not explicitly stated)
 * garageType = text description of garage type
 *
 * Garage estimates: 1-car ~400, 2-car ~800, 3-car ~1,200, 4-car ~1,600
 *                   1-car carport ~300, 2-car carport ~600, 4-car carport ~1,200
 * Patio estimates:  small/single ~200-300, large single ~350, giant/2 large ~400-500
 */

const FLOOR_PLANS_DATA = {

  "the-titan-luxury-modern-steel-barndominium-plan-with-shop":
    { beds: 5, baths: 3.5, area: 6060, patio: 3776, garage: 2838, garageType: "Attached Shop" },

  "the-generation-modern-steel-barndominium-plan":
    { beds: 5, baths: 4,   area: 4901, patio: 872,  garage: 1560, garageType: "4-Car Garage" },

  "the-apex-modern-industrial-barndominium-plan-with-shop":
    { beds: 4, baths: 3.5, area: 3323, patio: 300,  garage: 1459, garageType: "Heated Shop" },

  "york-creek-barndominium-plan-modern-farmhouse-steel-framed-4-bed-3-5-baths-design-blueprints":
    { beds: 4, baths: 3.5, area: 3395, patio: 1495, garage: null,  garageType: null },

  "serenity-a-mid-century-modern-luxury-house-plan-3-bedroom-3-bath-design-blueprints":
    { beds: 3, baths: 3,   area: 3136, patio: 450,  garage: 800,  garageType: "2-Car Garage" },

  "the-industry-modern-industrial-barndominium-plan-with-shop":
    { beds: 4, baths: 3,   area: 2208, patio: 1200, garage: 1755, garageType: "Shop/Garage" },

  "the-pedernales-barndominium-4-bedrooms-3-baths-2-973-sf-living-riverfront-home-design-blueprints":
    { beds: 4, baths: 3.5, area: 2973, patio: 500,  garage: 1200, garageType: "3-Car Garage" },

  "the-whiskey-barndominium-a-modern-steel-framed-farmhouse-3-bed-3-5-baths-design-blueprints":
    { beds: 3, baths: 3.5, area: 2832, patio: 400,  garage: 800,  garageType: "2-Car Garage + Screened Porch" },

  "the-spring-creek-modern-farmhouse-3-bedroom-3-bath-2639-sf-design-build-blueprints":
    { beds: 3, baths: 3,   area: 2639, patio: 500,  garage: 1200, garageType: "3-Car Garage" },

  "mid-century-modern-house-plan-the-manhattan-2547-sf-pdf-plan":
    { beds: 3, baths: 2.5, area: 2547, patio: 450,  garage: 800,  garageType: "2-Car Garage" },

  "cloud-gate-barndominium-plan-modern-farmhouse-2275-sf-pdf-download":
    { beds: 3, baths: 2.5, area: 2275, patio: 500,  garage: 1600, garageType: "4-Car Garage" },

  "cove-branch-barndominium-plan-modern-farmhouse-3-bed-pdf-download":
    { beds: 3, baths: 2.5, area: 2323, patio: 500,  garage: 600,  garageType: "2-Car Carport" },

  "mountain-breeze-barndominium-4-bedroom-3-baths-2-784-sf-living-home-design-blueprints":
    { beds: 4, baths: 3,   area: 2784, patio: 400,  garage: 800,  garageType: "2-Car Garage + Detached Shop" },

  "rhone-river-house-plan-4-bed-industrial-loft-blueprints-pdf-download":
    { beds: 4, baths: 2.5, area: 2580, patio: 500,  garage: 800,  garageType: "2-Car Underpass Garage" },

  "modern-farmhouse-barndominium-plan-4-bed-2-5-bath-pdf-plan":
    { beds: 4, baths: 2.5, area: 2626, patio: 350,  garage: 1200, garageType: "4-Car Carport" },

  "mid-century-modern-barndominium-plan-2-bed-carport-pdf":
    { beds: 2, baths: 2.5, area: 1995, patio: 633,  garage: 518,  garageType: "Attached Carport" },

  "the-orlando-barndominium-3-bedrooms-2-5-baths-1-939-sf-living-industrial-modern-farmhouse-design-blueprints":
    { beds: 3, baths: 2.5, area: 1939, patio: 400,  garage: 800,  garageType: "2-Car Garage" },

  "medina-shores-2-bed-2-bath-mid-century-modern-steel-house-plan":
    { beds: 2, baths: 2,   area: 1560, patio: 400,  garage: 600,  garageType: "2-Car Carport" },

  "the-nueces-barndominium-2-bedroom-2-bathroom-modern-farmhouse-metal-building-plan-drawing":
    { beds: 2, baths: 2,   area: 1543, patio: 415,  garage: 400,  garageType: "1-Car Garage" },

  "texas-peach-barndominium-blueprint-mid-century-modern-1-bed-1-5-bath":
    { beds: 1, baths: 1.5, area: 1182, patio: 200,  garage: 600,  garageType: "2-Car Carport" },

  "the-bungalow-barndominium-3-bedrooms-2-baths-860-sf-living-tiny-home-design-blueprints":
    { beds: 3, baths: 2,   area: 860,  patio: 200,  garage: null,  garageType: null },

  "the-evergreen-barndominium-shop-with-studio-loft-45-x-95-footprint-shop-design-build-plan":
    { beds: 1, baths: 1,   area: 770,  patio: 400,  garage: 2925, garageType: "45x65 Shop (5 Rollup Doors)" },

  "timber-trails-barndominium-plan-modern-farmhouse-design-pdf-download":
    { beds: 5, baths: 5,   area: 4147, patio: 300,  garage: 1200, garageType: "3-Car Garage" },

  "the-vatican-modern-italian-farmhouse-7-bedrooms-4-5-bathrooms-multigenerational-house-plan":
    { beds: 7, baths: 4.5, area: 4420, patio: 400,  garage: null,  garageType: null },

};

// ─── Helper Functions ──────────────────────────────────────────────────────────

window.FloorPlansData = {
  get: function(handle) {
    return FLOOR_PLANS_DATA[handle] || null;
  },
  getSpecs: function(handle) {
    return FLOOR_PLANS_DATA[handle] || null;
  },
  formatArea: function(sqft) {
    return sqft ? sqft.toLocaleString() + ' SF' : null;
  }
};
