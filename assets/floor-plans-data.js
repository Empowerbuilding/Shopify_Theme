/**
 * Authoritative floor plan specifications
 * Data matched to Shopify products via product handle
 *
 * area     = living sqft
 * patio    = covered patio/porch sqft (null if not specified)
 * garage   = garage/shop/carport sqft (null if not specified)
 * garageType = text description of garage type
 */

const FLOOR_PLANS_DATA = {

  "the-generation-modern-steel-barndominium-plan":
    { beds: 5, baths: 4,   area: 4901, patio: 872,  garage: 1560, garageType: "4-Car Garage" },

  "the-apex-modern-industrial-barndominium-plan-with-shop":
    { beds: 4, baths: 3.5, area: 3323, patio: null,  garage: 1459, garageType: "Heated Shop" },

  "york-creek-barndominium-plan-modern-farmhouse-steel-framed-4-bed-3-5-baths-design-blueprints":
    { beds: 4, baths: 3.5, area: 3395, patio: 1495, garage: null,  garageType: null },

  "serenity-a-mid-century-modern-luxury-house-plan-3-bedroom-3-bath-design-blueprints":
    { beds: 3, baths: 3,   area: 3136, patio: null,  garage: null,  garageType: "2-Car Attached" },

  "the-pedernales-barndominium-4-bedrooms-3-baths-2-973-sf-living-riverfront-home-design-blueprints":
    { beds: 4, baths: 3.5, area: 2973, patio: null,  garage: null,  garageType: "3-Car Garage" },

  "the-whiskey-barndominium-a-modern-steel-framed-farmhouse-3-bed-3-5-baths-design-blueprints":
    { beds: 3, baths: 3.5, area: 2832, patio: null,  garage: null,  garageType: "2-Car Garage + Screened Porch" },

  "the-spring-creek-modern-farmhouse-3-bedroom-3-bath-2639-sf-design-build-blueprints":
    { beds: 3, baths: 3,   area: 2639, patio: null,  garage: null,  garageType: "3-Car Garage" },

  "mid-century-modern-house-plan-the-manhattan-2547-sf-pdf-plan":
    { beds: 3, baths: 2.5, area: 2547, patio: null,  garage: null,  garageType: "2-Car Garage" },

  "cloud-gate-barndominium-plan-modern-farmhouse-2275-sf-pdf-download":
    { beds: 3, baths: 2.5, area: 2275, patio: null,  garage: null,  garageType: "4-Car Garage" },

  "cove-branch-barndominium-plan-modern-farmhouse-3-bed-pdf-download":
    { beds: 3, baths: 2.5, area: 2323, patio: null,  garage: null,  garageType: "2-Car Carport" },

  "mountain-breeze-barndominium-4-bedroom-3-baths-2-784-sf-living-home-design-blueprints":
    { beds: 4, baths: 3,   area: 2784, patio: null,  garage: null,  garageType: "2-Car Garage + Detached Shop" },

  "rhone-river-house-plan-4-bed-industrial-loft-blueprints-pdf-download":
    { beds: 4, baths: 2.5, area: 2580, patio: null,  garage: null,  garageType: "2-Car Underpass Garage" },

  "modern-farmhouse-barndominium-plan-4-bed-2-5-bath-pdf-plan":
    { beds: 4, baths: 2.5, area: 2626, patio: null,  garage: null,  garageType: "4-Car Carport" },

  "mid-century-modern-barndominium-plan-2-bed-carport-pdf":
    { beds: 2, baths: 2.5, area: 1995, patio: 633,  garage: 518,  garageType: "Attached Carport" },

  "the-orlando-barndominium-3-bedrooms-2-5-baths-1-939-sf-living-industrial-modern-farmhouse-design-blueprints":
    { beds: 3, baths: 2.5, area: 1939, patio: null,  garage: null,  garageType: "2-Car Garage" },

  "medina-shores-2-bed-2-bath-mid-century-modern-steel-house-plan":
    { beds: 2, baths: 2,   area: 1560, patio: null,  garage: null,  garageType: "2-Car Carport" },

  "the-nueces-barndominium-2-bedroom-2-bathroom-modern-farmhouse-metal-building-plan-drawing":
    { beds: 2, baths: 2,   area: 1543, patio: 415,  garage: null,  garageType: "1-Car Garage" },

  "texas-peach-barndominium-blueprint-mid-century-modern-1-bed-1-5-bath":
    { beds: 1, baths: 1.5, area: 1182, patio: null,  garage: null,  garageType: "2-Car Carport" },

  "the-bungalow-barndominium-3-bedrooms-2-baths-860-sf-living-tiny-home-design-blueprints":
    { beds: 3, baths: 2,   area: 860,  patio: null,  garage: null,  garageType: null },

  "the-evergreen-barndominium-shop-with-studio-loft-45-x-95-footprint-shop-design-build-plan":
    { beds: 1, baths: 1,   area: 770,  patio: null,  garage: 2925, garageType: "45x65 Shop (5 Rollup Doors)" },

  "timber-trails-barndominium-plan-modern-farmhouse-design-pdf-download":
    { beds: 5, baths: 5,   area: 4147, patio: null,  garage: null,  garageType: "3-Car Garage" },

  "the-vatican-modern-italian-farmhouse-7-bedrooms-4-5-bathrooms-multigenerational-house-plan":
    { beds: 7, baths: 4.5, area: 4420, patio: null,  garage: null,  garageType: null },

};

// ─── Helper Functions ──────────────────────────────────────────────────────────

window.FloorPlansData = {
  get: function(handle) {
    return FLOOR_PLANS_DATA[handle] || null;
  },
  formatArea: function(sqft) {
    return sqft ? sqft.toLocaleString() + ' SF' : null;
  }
};
