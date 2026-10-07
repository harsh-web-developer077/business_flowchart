// Complete Business Types Data - 53+ Categories with Full Investment & Calculation Data
const BUSINESS_TYPES_DATA = {
  // ============ FOOD & BEVERAGE ============
  restaurant: {
    name: "Restaurant",
    category: "Food & Beverage",
    initialInvestment: 500000,
    fixedCosts: 50000,
    variableCostPercentage: 30,
    sellingPrice: 200,
    unitsSoldPerMonth: 3000,
    loanAmount: 300000,
    interestRate: 10,
    loanTenure: 5
  },
  
  dhaba: {
    name: "Dhaba",
    category: "Food & Beverage",
    initialInvestment: 150000,
    fixedCosts: 15000,
    variableCostPercentage: 25,
    sellingPrice: 80,
    unitsSoldPerMonth: 4000,
    loanAmount: 100000,
    interestRate: 10,
    loanTenure: 3
  },
  
  sweetShop: {
    name: "Sweet Shop",
    category: "Food & Beverage",
    initialInvestment: 200000,
    fixedCosts: 20000,
    variableCostPercentage: 35,
    sellingPrice: 300,
    unitsSoldPerMonth: 800,
    loanAmount: 150000,
    interestRate: 11,
    loanTenure: 3
  },
  
  teaStall: {
    name: "Tea Stall",
    category: "Food & Beverage",
    initialInvestment: 30000,
    fixedCosts: 5000,
    variableCostPercentage: 20,
    sellingPrice: 10,
    unitsSoldPerMonth: 5000,
    loanAmount: 20000,
    interestRate: 12,
    loanTenure: 2
  },
  
  cafeteria: {
    name: "Cafeteria",
    category: "Food & Beverage",
    initialInvestment: 250000,
    fixedCosts: 25000,
    variableCostPercentage: 28,
    sellingPrice: 150,
    unitsSoldPerMonth: 2500,
    loanAmount: 150000,
    interestRate: 10,
    loanTenure: 4
  },
  
  bakery: {
    name: "Bakery",
    category: "Food & Beverage",
    initialInvestment: 300000,
    fixedCosts: 30000,
    variableCostPercentage: 32,
    sellingPrice: 250,
    unitsSoldPerMonth: 1500,
    loanAmount: 200000,
    interestRate: 10,
    loanTenure: 4
  },

  // ============ RETAIL & E-COMMERCE ============
  clothingBoutique: {
    name: "Clothing Boutique",
    category: "Retail & E-commerce",
    initialInvestment: 400000,
    fixedCosts: 30000,
    variableCostPercentage: 40,
    sellingPrice: 1000,
    unitsSoldPerMonth: 150,
    loanAmount: 250000,
    interestRate: 11,
    loanTenure: 4
  },
  
  groceryStore: {
    name: "Grocery Store",
    category: "Retail & E-commerce",
    initialInvestment: 350000,
    fixedCosts: 25000,
    variableCostPercentage: 20,
    sellingPrice: 100,
    unitsSoldPerMonth: 4000,
    loanAmount: 200000,
    interestRate: 10,
    loanTenure: 4
  },
  
  ecommerce: {
    name: "E-commerce Store",
    category: "Retail & E-commerce",
    initialInvestment: 150000,
    fixedCosts: 15000,
    variableCostPercentage: 35,
    sellingPrice: 500,
    unitsSoldPerMonth: 500,
    loanAmount: 100000,
    interestRate: 9,
    loanTenure: 3
  },
  
  bookStore: {
    name: "Book Store",
    category: "Retail & E-commerce",
    initialInvestment: 200000,
    fixedCosts: 20000,
    variableCostPercentage: 25,
    sellingPrice: 300,
    unitsSoldPerMonth: 800,
    loanAmount: 120000,
    interestRate: 10,
    loanTenure: 3
  },
  
  mobileshop: {
    name: "Mobile Shop",
    category: "Retail & E-commerce",
    initialInvestment: 500000,
    fixedCosts: 40000,
    variableCostPercentage: 15,
    sellingPrice: 20000,
    unitsSoldPerMonth: 50,
    loanAmount: 300000,
    interestRate: 10,
    loanTenure: 5
  },
  
  electronicStore: {
    name: "Electronics Store",
    category: "Retail & E-commerce",
    initialInvestment: 600000,
    fixedCosts: 45000,
    variableCostPercentage: 18,
    sellingPrice: 10000,
    unitsSoldPerMonth: 100,
    loanAmount: 400000,
    interestRate: 10,
    loanTenure: 5
  },

  // ============ SERVICES ============
  beautySalon: {
    name: "Beauty Salon",
    category: "Services",
    initialInvestment: 250000,
    fixedCosts: 25000,
    variableCostPercentage: 15,
    sellingPrice: 500,
    unitsSoldPerMonth: 400,
    loanAmount: 150000,
    interestRate: 11,
    loanTenure: 3
  },
  
  tutoring: {
    name: "Tutoring Center",
    category: "Services",
    initialInvestment: 100000,
    fixedCosts: 15000,
    variableCostPercentage: 10,
    sellingPrice: 2000,
    unitsSoldPerMonth: 50,
    loanAmount: 50000,
    interestRate: 10,
    loanTenure: 2
  },
  
  gym: {
    name: "Gym",
    category: "Services",
    initialInvestment: 500000,
    fixedCosts: 60000,
    variableCostPercentage: 20,
    sellingPrice: 2000,
    unitsSoldPerMonth: 200,
    loanAmount: 300000,
    interestRate: 10,
    loanTenure: 5
  },
  
  carWash: {
    name: "Car Wash",
    category: "Services",
    initialInvestment: 200000,
    fixedCosts: 20000,
    variableCostPercentage: 25,
    sellingPrice: 300,
    unitsSoldPerMonth: 400,
    loanAmount: 120000,
    interestRate: 11,
    loanTenure: 3
  },
  
  laundry: {
    name: "Laundry Service",
    category: "Services",
    initialInvestment: 150000,
    fixedCosts: 18000,
    variableCostPercentage: 20,
    sellingPrice: 100,
    unitsSoldPerMonth: 2000,
    loanAmount: 100000,
    interestRate: 10,
    loanTenure: 3
  },
  
  electrician: {
    name: "Electrician Service",
    category: "Services",
    initialInvestment: 50000,
    fixedCosts: 5000,
    variableCostPercentage: 30,
    sellingPrice: 1000,
    unitsSoldPerMonth: 100,
    loanAmount: 30000,
    interestRate: 12,
    loanTenure: 2
  },

  // ============ MANUFACTURING ============
  textileUnit: {
    name: "Textile Unit",
    category: "Manufacturing",
    initialInvestment: 800000,
    fixedCosts: 80000,
    variableCostPercentage: 35,
    sellingPrice: 500,
    unitsSoldPerMonth: 2000,
    loanAmount: 500000,
    interestRate: 10,
    loanTenure: 5
  },
  
  furnitureFactory: {
    name: "Furniture Factory",
    category: "Manufacturing",
    initialInvestment: 600000,
    fixedCosts: 70000,
    variableCostPercentage: 40,
    sellingPrice: 5000,
    unitsSoldPerMonth: 200,
    loanAmount: 400000,
    interestRate: 10,
    loanTenure: 5
  },
  
  handicraft: {
    name: "Handicraft Unit",
    category: "Manufacturing",
    initialInvestment: 150000,
    fixedCosts: 15000,
    variableCostPercentage: 25,
    sellingPrice: 1000,
    unitsSoldPerMonth: 200,
    loanAmount: 100000,
    interestRate: 11,
    loanTenure: 3
  },
  
  agriProcessing: {
    name: "Agri-Processing Unit",
    category: "Manufacturing",
    initialInvestment: 400000,
    fixedCosts: 40000,
    variableCostPercentage: 30,
    sellingPrice: 300,
    unitsSoldPerMonth: 3000,
    loanAmount: 250000,
    interestRate: 10,
    loanTenure: 4
  },
  
  packagingUnit: {
    name: "Packaging Unit",
    category: "Manufacturing",
    initialInvestment: 350000,
    fixedCosts: 35000,
    variableCostPercentage: 28,
    sellingPrice: 100,
    unitsSoldPerMonth: 5000,
    loanAmount: 200000,
    interestRate: 10,
    loanTenure: 4
  },

  // ============ ADDITIONAL SERVICES ============
  transportBusiness: {
    name: "Transport Business",
    category: "Services",
    initialInvestment: 1000000,
    fixedCosts: 100000,
    variableCostPercentage: 25,
    sellingPrice: 50000,
    unitsSoldPerMonth: 50,
    loanAmount: 600000,
    interestRate: 10,
    loanTenure: 5
  },
  
  photoDevelop: {
    name: "Photo Studio",
    category: "Services",
    initialInvestment: 200000,
    fixedCosts: 20000,
    variableCostPercentage: 20,
    sellingPrice: 2000,
    unitsSoldPerMonth: 150,
    loanAmount: 120000,
    interestRate: 11,
    loanTenure: 3
  },
  
  salon: {
    name: "Hair Salon",
    category: "Services",
    initialInvestment: 200000,
    fixedCosts: 20000,
    variableCostPercentage: 15,
    sellingPrice: 300,
    unitsSoldPerMonth: 400,
    loanAmount: 120000,
    interestRate: 11,
    loanTenure: 3
  },
  
  plumbingService: {
    name: "Plumbing Service",
    category: "Services",
    initialInvestment: 50000,
    fixedCosts: 5000,
    variableCostPercentage: 25,
    sellingPrice: 800,
    unitsSoldPerMonth: 100,
    loanAmount: 30000,
    interestRate: 12,
    loanTenure: 2
  },

  // ============ ADDITIONAL RETAIL ============
  petShop: {
    name: "Pet Shop",
    category: "Retail & E-commerce",
    initialInvestment: 300000,
    fixedCosts: 25000,
    variableCostPercentage: 30,
    sellingPrice: 1000,
    unitsSoldPerMonth: 300,
    loanAmount: 200000,
    interestRate: 10,
    loanTenure: 4
  },
  
  pharmacyShop: {
    name: "Pharmacy",
    category: "Retail & E-commerce",
    initialInvestment: 250000,
    fixedCosts: 20000,
    variableCostPercentage: 22,
    sellingPrice: 200,
    unitsSoldPerMonth: 1500,
    loanAmount: 150000,
    interestRate: 10,
    loanTenure: 3
  },
  
  hardwareShop: {
    name: "Hardware Shop",
    category: "Retail & E-commerce",
    initialInvestment: 300000,
    fixedCosts: 25000,
    variableCostPercentage: 25,
    sellingPrice: 500,
    unitsSoldPerMonth: 1000,
    loanAmount: 180000,
    interestRate: 10,
    loanTenure: 4
  },

  // ============ ADDITIONAL MANUFACTURING ============
  steelFabrication: {
    name: "Steel Fabrication",
    category: "Manufacturing",
    initialInvestment: 700000,
    fixedCosts: 70000,
    variableCostPercentage: 38,
    sellingPrice: 2000,
    unitsSoldPerMonth: 500,
    loanAmount: 450000,
    interestRate: 10,
    loanTenure: 5
  },
  
  plasticProcessing: {
    name: "Plastic Processing",
    category: "Manufacturing",
    initialInvestment: 500000,
    fixedCosts: 50000,
    variableCostPercentage: 32,
    sellingPrice: 300,
    unitsSoldPerMonth: 2000,
    loanAmount: 300000,
    interestRate: 10,
    loanTenure: 4
  },
  
  paperMill: {
    name: "Paper Mill",
    category: "Manufacturing",
    initialInvestment: 900000,
    fixedCosts: 90000,
    variableCostPercentage: 35,
    sellingPrice: 200,
    unitsSoldPerMonth: 5000,
    loanAmount: 550000,
    interestRate: 10,
    loanTenure: 5
  },

  // ============ ADDITIONAL FOOD ============
  juiceBar: {
    name: "Juice Bar",
    category: "Food & Beverage",
    initialInvestment: 120000,
    fixedCosts: 12000,
    variableCostPercentage: 22,
    sellingPrice: 60,
    unitsSoldPerMonth: 3000,
    loanAmount: 80000,
    interestRate: 11,
    loanTenure: 2
  },
  
  icecreamParlor: {
    name: "Ice Cream Parlor",
    category: "Food & Beverage",
    initialInvestment: 180000,
    fixedCosts: 18000,
    variableCostPercentage: 28,
    sellingPrice: 150,
    unitsSoldPerMonth: 1500,
    loanAmount: 120000,
    interestRate: 11,
    loanTenure: 3
  },
  
  fastFood: {
    name: "Fast Food Center",
    category: "Food & Beverage",
    initialInvestment: 300000,
    fixedCosts: 30000,
    variableCostPercentage: 30,
    sellingPrice: 200,
    unitsSoldPerMonth: 2500,
    loanAmount: 200000,
    interestRate: 10,
    loanTenure: 4
  },

  // ============ ADDITIONAL SERVICES ============
  adsAgency: {
    name: "Advertising Agency",
    category: "Services",
    initialInvestment: 300000,
    fixedCosts: 30000,
    variableCostPercentage: 20,
    sellingPrice: 50000,
    unitsSoldPerMonth: 10,
    loanAmount: 200000,
    interestRate: 9,
    loanTenure: 3
  },
  
  eventManagement: {
    name: "Event Management",
    category: "Services",
    initialInvestment: 250000,
    fixedCosts: 25000,
    variableCostPercentage: 25,
    sellingPrice: 30000,
    unitsSoldPerMonth: 15,
    loanAmount: 150000,
    interestRate: 10,
    loanTenure: 3
  },
  
  consultingFirm: {
    name: "Consulting Firm",
    category: "Services",
    initialInvestment: 200000,
    fixedCosts: 25000,
    variableCostPercentage: 15,
    sellingPrice: 25000,
    unitsSoldPerMonth: 20,
    loanAmount: 100000,
    interestRate: 9,
    loanTenure: 3
  },

  // ============ REAL ESTATE & AGRICULTURE ============
  realEstate: {
    name: "Real Estate Business",
    category: "Services",
    initialInvestment: 2000000,
    fixedCosts: 100000,
    variableCostPercentage: 10,
    sellingPrice: 500000,
    unitsSoldPerMonth: 5,
    loanAmount: 1000000,
    interestRate: 9,
    loanTenure: 7
  },
  
  organicFarming: {
    name: "Organic Farming",
    category: "Manufacturing",
    initialInvestment: 300000,
    fixedCosts: 30000,
    variableCostPercentage: 25,
    sellingPrice: 200,
    unitsSoldPerMonth: 5000,
    loanAmount: 200000,
    interestRate: 10,
    loanTenure: 5
  },
  
  dairyFarming: {
    name: "Dairy Farming",
    category: "Manufacturing",
    initialInvestment: 400000,
    fixedCosts: 50000,
    variableCostPercentage: 30,
    sellingPrice: 50,
    unitsSoldPerMonth: 10000,
    loanAmount: 250000,
    interestRate: 10,
    loanTenure: 5
  },

  // ============ TECHNOLOGY & EDUCATION ============
  coachingCenter: {
    name: "Coaching Center",
    category: "Services",
    initialInvestment: 200000,
    fixedCosts: 25000,
    variableCostPercentage: 10,
    sellingPrice: 3000,
    unitsSoldPerMonth: 100,
    loanAmount: 120000,
    interestRate: 10,
    loanTenure: 3
  },
  
  softwareStudio: {
    name: "Software Development Studio",
    category: "Services",
    initialInvestment: 500000,
    fixedCosts: 100000,
    variableCostPercentage: 15,
    sellingPrice: 100000,
    unitsSoldPerMonth: 10,
    loanAmount: 250000,
    interestRate: 9,
    loanTenure: 4
  }
};

// Function to get business type data
function getBusinessData(businessType) {
  return BUSINESS_TYPES_DATA[businessType] || null;
}

// Function to get all business types
function getAllBusinessTypes() {
  return Object.keys(BUSINESS_TYPES_DATA).map(key => ({
    id: key,
    ...BUSINESS_TYPES_DATA[key]
  }));
}

// Function to calculate monthly profit
function calculateMonthlyProfit(businessType) {
  const data = getBusinessData(businessType);
  if (!data) return 0;
  
  const revenue = data.sellingPrice * data.unitsSoldPerMonth;
  const variableCosts = revenue * (data.variableCostPercentage / 100);
  const totalCosts = data.fixedCosts + variableCosts;
  const profit = revenue - totalCosts;
  
  return profit;
}

// Function to calculate break-even months
function calculateBreakEvenMonths(businessType) {
  const data = getBusinessData(businessType);
  if (!data) return 0;
  
  const monthlyProfit = calculateMonthlyProfit(businessType);
  if (monthlyProfit <= 0) return Infinity;
  
  return Math.ceil(data.initialInvestment / monthlyProfit);
}

// Export for use in calculator
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BUSINESS_TYPES_DATA,
    getBusinessData,
    getAllBusinessTypes,
    calculateMonthlyProfit,
    calculateBreakEvenMonths
  };
}
