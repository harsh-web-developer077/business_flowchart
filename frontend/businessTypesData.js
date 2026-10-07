// Business Types Data for Sri Dungargarh - India
// Comprehensive business database with realistic financial data

const BUSINESS_TYPES_DATA = {
  // ============ RETAIL & SHOPPING ============

  buildingMaterials: {
    id: "buildingMaterials",
    name: "Building Materials Shop",
    category: "Retail & Shopping",
    initialInvestment: 9500000,      // 15 lakh setup + 80 lakh stock
    fixedCosts: 45000,               // 40K labour + 5K utilities/misc
    variableCostPercentage: 20,      // Wholesale cost ratio
    sellingPrice: 500,               // Per unit (cement bag, steel rod, etc)
    unitsSoldPerMonth: 400           // Units sold monthly
  },

  kiranaStore: {
    id: "kiranaStore",
    name: "Kirana General Store",
    category: "Retail & Shopping",
    initialInvestment: 2500000,      // 25 lakh investment
    fixedCosts: 25000,               // 15K rent + 10K utilities/misc
    variableCostPercentage: 25,      // Wholesale cost ratio
    sellingPrice: 75,                // Avg item price
    unitsSoldPerMonth: 2500          // Items sold monthly
  },

  generalStore: {
    id: "generalStore",
    name: "General Store (Basic)",
    category: "Retail & Shopping",
    initialInvestment: 2000000,      // 20 lakh
    fixedCosts: 18000,               // 10K rent + 8K misc
    variableCostPercentage: 22,
    sellingPrice: 40,
    unitsSoldPerMonth: 2500
  },

  hardwareStore: {
    id: "hardwareStore",
    name: "Hardware & Tools Shop",
    category: "Retail & Shopping",
    initialInvestment: 3000000,      // 30 lakh
    fixedCosts: 22000,
    variableCostPercentage: 28,
    sellingPrice: 300,
    unitsSoldPerMonth: 500
  },

  clothingStore: {
    id: "clothingStore",
    name: "Clothing & Textiles Store",
    category: "Retail & Shopping",
    initialInvestment: 3500000,      // 35 lakh
    fixedCosts: 28000,
    variableCostPercentage: 35,
    sellingPrice: 400,
    unitsSoldPerMonth: 300
  },

  electronicsStore: {
    id: "electronicsStore",
    name: "Electronics & Appliances",
    category: "Retail & Shopping",
    initialInvestment: 5000000,      // 50 lakh
    fixedCosts: 35000,
    variableCostPercentage: 20,
    sellingPrice: 5000,
    unitsSoldPerMonth: 60
  },

  mobileShop: {
    id: "mobileShop",
    name: "Mobile Phone Shop",
    category: "Retail & Shopping",
    initialInvestment: 4000000,      // 40 lakh
    fixedCosts: 30000,
    variableCostPercentage: 15,
    sellingPrice: 10000,
    unitsSoldPerMonth: 30
  },

  pharmacyStore: {
    id: "pharmacyStore",
    name: "Pharmacy/Medical Store",
    category: "Retail & Shopping",
    initialInvestment: 2000000,      // 20 lakh
    fixedCosts: 20000,
    variableCostPercentage: 30,
    sellingPrice: 150,
    unitsSoldPerMonth: 800
  },

  // ============ FOOD & BEVERAGE ============

  teaStall: {
    id: "teaStall",
    name: "Tea Stall / Chai Shop",
    category: "Food & Beverage",
    initialInvestment: 400000,       // 4 lakh
    fixedCosts: 15000,               // 8K rent + 7K utilities/misc
    variableCostPercentage: 30,      // Raw materials (tea, sugar, milk)
    sellingPrice: 10,                // Per cup
    unitsSoldPerMonth: 3000          // Cups sold monthly
  },

  dhaba: {
    id: "dhaba",
    name: "Dhaba / Roadside Eatery",
    category: "Food & Beverage",
    initialInvestment: 3000000,      // 30 lakh
    fixedCosts: 40000,
    variableCostPercentage: 35,
    sellingPrice: 150,
    unitsSoldPerMonth: 400
  },

  bakery: {
    id: "bakery",
    name: "Bakery & Bakery Items",
    category: "Food & Beverage",
    initialInvestment: 1500000,      // 15 lakh
    fixedCosts: 25000,
    variableCostPercentage: 32,
    sellingPrice: 50,
    unitsSoldPerMonth: 500
  },

  sweetShop: {
    id: "sweetShop",
    name: "Sweet Shop / Confectionery",
    category: "Food & Beverage",
    initialInvestment: 1200000,      // 12 lakh
    fixedCosts: 20000,
    variableCostPercentage: 33,
    sellingPrice: 100,
    unitsSoldPerMonth: 300
  },

  cafe: {
    id: "cafe",
    name: "Small Cafe / Coffee Shop",
    category: "Food & Beverage",
    initialInvestment: 2500000,      // 25 lakh
    fixedCosts: 35000,
    variableCostPercentage: 25,
    sellingPrice: 120,
    unitsSoldPerMonth: 400
  },

  streetFoodStall: {
    id: "streetFoodStall",
    name: "Street Food Stall",
    category: "Food & Beverage",
    initialInvestment: 500000,       // 5 lakh
    fixedCosts: 12000,
    variableCostPercentage: 40,
    sellingPrice: 50,
    unitsSoldPerMonth: 500
  },

  vegetableFruitShop: {
    id: "vegetableFruitShop",
    name: "Vegetable & Fruit Shop",
    category: "Food & Beverage",
    initialInvestment: 800000,       // 8 lakh
    fixedCosts: 15000,
    variableCostPercentage: 20,
    sellingPrice: 50,
    unitsSoldPerMonth: 2000
  },

  // ============ SERVICES ============

  beautySalon: {
    id: "beautySalon",
    name: "Beauty Salon",
    category: "Services",
    initialInvestment: 1500000,      // 15 lakh
    fixedCosts: 25000,
    variableCostPercentage: 20,
    sellingPrice: 300,
    unitsSoldPerMonth: 200
  },

  barberShop: {
    id: "barberShop",
    name: "Barber Shop",
    category: "Services",
    initialInvestment: 500000,       // 5 lakh
    fixedCosts: 15000,
    variableCostPercentage: 15,
    sellingPrice: 50,
    unitsSoldPerMonth: 800
  },

  tailoringShop: {
    id: "tailoringShop",
    name: "Tailoring Shop",
    category: "Services",
    initialInvestment: 800000,       // 8 lakh
    fixedCosts: 12000,
    variableCostPercentage: 25,
    sellingPrice: 250,
    unitsSoldPerMonth: 150
  },

  carWash: {
    id: "carWash",
    name: "Car Wash / Vehicle Cleaning",
    category: "Services",
    initialInvestment: 2000000,      // 20 lakh
    fixedCosts: 30000,
    variableCostPercentage: 30,
    sellingPrice: 200,
    unitsSoldPerMonth: 300
  },

  laundryService: {
    id: "laundryService",
    name: "Laundry Service",
    category: "Services",
    initialInvestment: 1200000,      // 12 lakh
    fixedCosts: 20000,
    variableCostPercentage: 25,
    sellingPrice: 100,
    unitsSoldPerMonth: 400
  },

  tutorCenter: {
    id: "tutorCenter",
    name: "Tutor Center / Coaching",
    category: "Services",
    initialInvestment: 1500000,      // 15 lakh
    fixedCosts: 35000,
    variableCostPercentage: 10,
    sellingPrice: 500,
    unitsSoldPerMonth: 100
  },

  gym: {
    id: "gym",
    name: "Gym / Fitness Center",
    category: "Services",
    initialInvestment: 3500000,      // 35 lakh
    fixedCosts: 60000,
    variableCostPercentage: 15,
    sellingPrice: 1000,
    unitsSoldPerMonth: 150
  },

  // ============ AGRICULTURE & DAIRY ============

  dairy: {
    id: "dairy",
    name: "Dairy Farm",
    category: "Agriculture & Dairy",
    initialInvestment: 5000000,      // 50 lakh
    fixedCosts: 50000,
    variableCostPercentage: 35,
    sellingPrice: 100,
    unitsSoldPerMonth: 1500
  },

  poultryFarm: {
    id: "poultryFarm",
    name: "Poultry Farm",
    category: "Agriculture & Dairy",
    initialInvestment: 3000000,      // 30 lakh
    fixedCosts: 35000,
    variableCostPercentage: 40,
    sellingPrice: 120,
    unitsSoldPerMonth: 1000
  },

  fishFarm: {
    id: "fishFarm",
    name: "Fish Farm / Aquaculture",
    category: "Agriculture & Dairy",
    initialInvestment: 4000000,      // 40 lakh
    fixedCosts: 40000,
    variableCostPercentage: 30,
    sellingPrice: 200,
    unitsSoldPerMonth: 500
  },

  // ============ MANUFACTURING ============

  packagingUnit: {
    id: "packagingUnit",
    name: "Packaging Unit",
    category: "Manufacturing",
    initialInvestment: 6000000,      // 60 lakh
    fixedCosts: 50000,
    variableCostPercentage: 35,
    sellingPrice: 500,
    unitsSoldPerMonth: 300
  },

  printingPress: {
    id: "printingPress",
    name: "Printing Press",
    category: "Manufacturing",
    initialInvestment: 7000000,      // 70 lakh
    fixedCosts: 60000,
    variableCostPercentage: 32,
    sellingPrice: 1000,
    unitsSoldPerMonth: 200
  },

  // ============ TRANSPORT ============

  autoRickshawBusiness: {
    id: "autoRickshawBusiness",
    name: "Auto Rickshaw Business",
    category: "Transport",
    initialInvestment: 3500000,      // 35 lakh (vehicle cost)
    fixedCosts: 25000,
    variableCostPercentage: 30,
    sellingPrice: 250,
    unitsSoldPerMonth: 600
  },

  taxiService: {
    id: "taxiService",
    name: "Taxi / Cab Service",
    category: "Transport",
    initialInvestment: 5000000,      // 50 lakh
    fixedCosts: 40000,
    variableCostPercentage: 35,
    sellingPrice: 300,
    unitsSoldPerMonth: 400
  },

  // ============ EDUCATION ============

  onlineCoaching: {
    id: "onlineCoaching",
    name: "Online Coaching / E-learning",
    category: "Education",
    initialInvestment: 1000000,      // 10 lakh
    fixedCosts: 15000,
    variableCostPercentage: 5,
    sellingPrice: 1000,
    unitsSoldPerMonth: 50
  },

  // ============ REAL ESTATE ============

  propertyBrokerage: {
    id: "propertyBrokerage",
    name: "Property Brokerage / Real Estate",
    category: "Real Estate",
    initialInvestment: 2000000,      // 20 lakh
    fixedCosts: 25000,
    variableCostPercentage: 5,
    sellingPrice: 50000,
    unitsSoldPerMonth: 10
  },

  // ============ ENTERTAINMENT ============

  photoCopy: {
    id: "photoCopy",
    name: "Photo Copy Shop",
    category: "Services",
    initialInvestment: 600000,       // 6 lakh
    fixedCosts: 12000,
    variableCostPercentage: 20,
    sellingPrice: 2,
    unitsSoldPerMonth: 5000
  }
};

// Helper function to get all business types
function getAllBusinessTypes() {
  return Object.values(BUSINESS_TYPES_DATA);
}

// Helper function to get specific business data
function getBusinessData(businessId) {
  return BUSINESS_TYPES_DATA[businessId];
}

// Helper function to calculate monthly profit
function calculateMonthlyProfit(businessId) {
  const business = BUSINESS_TYPES_DATA[businessId];
  if (!business) return null;

  const totalRevenue = business.unitsSoldPerMonth * business.sellingPrice;
  const rawMaterialCost = totalRevenue * (business.variableCostPercentage / 100);
  const grossProfit = totalRevenue - rawMaterialCost;
  const netProfit = grossProfit - business.fixedCosts;

  return {
    totalRevenue,
    rawMaterialCost,
    grossProfit,
    fixedCosts: business.fixedCosts,
    netProfit
  };
}

// Helper function to calculate break-even months
function calculateBreakEvenMonths(businessId) {
  const business = BUSINESS_TYPES_DATA[businessId];
  if (!business) return null;

  const monthlyProfit = calculateMonthlyProfit(businessId).netProfit;
  if (monthlyProfit <= 0) return Infinity;

  return Math.ceil(business.initialInvestment / monthlyProfit);
}

// Format currency with commas (for display purposes)
function formatCurrency(amount) {
  if (amount >= 10000000) {
    return (amount / 1000000).toFixed(2) + ' lakhs';
  } else if (amount >= 100000) {
    return (amount / 100000).toFixed(2) + ' lakhs';
  } else if (amount >= 1000) {
    return '₹' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '₹' + amount;
}
