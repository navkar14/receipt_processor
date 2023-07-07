
const {calculatePoints, checkReceipt, processReceipt}  = require("../middleware/receiptProcessor");

test('rreturns points for a receipt', () => {
    expect(calculatePoints({
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
            {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
            },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
            },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
            },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
            },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
            }
        ],
        "total": "35.35"
        })).toBe(28);
});

test('returns points for a receipt', () => {
    expect(calculatePoints({
        "retailer": "Walgreens",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "08:13",
        "total": "2.65",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
            {"shortDescription": "Dasani", "price": "1.40"}
        ]
    })).toBe(15);
});


test('returns points for a receipt', () => {
    expect(calculatePoints({
        "retailer": "Target",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "13:13",
        "total": "1.25",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
        ]
    })).toBe(31);
});

test('returns points for a receipt', () => {
    expect(calculatePoints({
        "retailer": "",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "13:13",
        "total": "1.25",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
        ]
    })).toBe(25);
});


test('returns points for a receipt', () => {
    expect(calculatePoints({
        "retailer": "M&M Corner Market",
        "purchaseDate": "2022-03-20",
        "purchaseTime": "14:33",
        "items": [
        {
            "shortDescription": "Gatorade",
            "price": "2.25"
        },{
            "shortDescription": "Gatorade",
            "price": "2.25"
        },{
            "shortDescription": "Gatorade",
            "price": "2.25"
        },{
            "shortDescription": "Gatorade",
            "price": "2.25"
        }
        ],
        "total": "9.00"
    })).toBe(109);
});


describe('calculatePoints', () => {
test('should calculate the correct points for the given receipt', () => {
    const receipt = {
    "retailer": "M&M Corner Market",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
        {
        "shortDescription": "Gatorade",
        "price": "2.25"
        },
        {
        "shortDescription": "Gatorade",
        "price": "2.25"
        },
        {
        "shortDescription": "Gatorade",
        "price": "2.25"
        },
        {
        "shortDescription": "Gatorade",
        "price": "2.25"
        }
    ],
    "total": "9.00"
    };

    const points = calculatePoints(receipt);

    // Perform assertions to validate the calculated points
    expect(points).toBe(109); // Expected points based on the given receipt
});
});

describe('calculatePoints', () => {
test('should calculate the correct points for the given receipt', () => {
    // Test Case 1: Empty Receipt
    const receipt1 = {
    "retailer": "",
    "purchaseDate": "",
    "purchaseTime": "",
    "items": [],
    "total": "0.00"
    };
    let points = calculatePoints(receipt1);
    expect(points).toBe(0);

    // Test Case 2: Non-Alphanumeric Retailer Name
    const receipt2 = {
    "retailer": "My_Store!@123",
    "purchaseDate": "2022-06-10",
    "purchaseTime": "15:45",
    "items": [
        {
        "shortDescription": "Product A",
        "price": "9.99"
        },
        {
        "shortDescription": "Product B",
        "price": "4.50"
        }
    ],
    "total": "14.49"
    };
    points = calculatePoints(receipt2);
    expect(points).toBe(28);

    // Test Case 3: Non-Round Total Amount
    const receipt3 = {
    "retailer": "Supermart",
    "purchaseDate": "2022-07-01",
    "purchaseTime": "12:00",
    "items": [
        {
        "shortDescription": "Product X",
        "price": "3.99"
        },
        {
        "shortDescription": "Product Y",
        "price": "2.50"
        }
    ],
    "total": "6.49"
    };
    points = calculatePoints(receipt3);
    expect(points).toBe(22);

    // Test Case 4: Multiple of 0.25 Total Amount
    const receipt4 = {
    "retailer": "Grocery Depot",
    "purchaseDate": "2022-09-15",
    "purchaseTime": "16:30",
    "items": [
        {
        "shortDescription": "Product P",
        "price": "4.75"
        },
        {
        "shortDescription": "Product Q",
        "price": "3.00"
        }
    ],
    "total": "7.75"
    };
    points = calculatePoints(receipt4);
    expect(points).toBe(50);

    // Test Case 5: No Points for Item Description Length
    const receipt5 = {
    "retailer": "Grocery Store",
    "purchaseDate": "2022-12-31",
    "purchaseTime": "14:00",
    "items": [
        {
        "shortDescription": "Item 1",
        "price": "5.99"
        },
        {
        "shortDescription": "Item 2",
        "price": "3.50"
        }
    ],
    "total": "9.49"
    };
    points = calculatePoints(receipt5);
    expect(points).toBe(26);
});
});


describe('checkReceipt', () => {
  test('should validate the structure of the given receipt', () => {
    // Test Case 1: Valid Receipt
    const receipt1 = {
      "retailer": "Target",
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:01",
      "items": [
        {
          "shortDescription": "Mountain Dew 12PK",
          "price": "6.49"
        },
        {
          "shortDescription": "Emils Cheese Pizza",
          "price": "12.25"
        },
        {
          "shortDescription": "Knorr Creamy Chicken",
          "price": "1.26"
        },
        {
          "shortDescription": "Doritos Nacho Cheese",
          "price": "3.35"
        },
        {
          "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
          "price": "12.00"
        }
      ],
      "total": "35.35"
    };
    let result = checkReceipt(receipt1);
    expect(result.isValid).toBe(true);

    // Test Case 2: Missing Retailer Name
    const receipt2 = {
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:01",
      "items": [
        {
          "shortDescription": "Mountain Dew 12PK",
          "price": "6.49"
        },
        {
          "shortDescription": "Emils Cheese Pizza",
          "price": "12.25"
        }
      ],
      "total": "18.74"
    };
    result = checkReceipt(receipt2);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("One of the fields is incorrect or empty!");

    // Test Case 3: Invalid Purchase Date
    const receipt3 = {
      "retailer": "Walmart",
      "purchaseDate": "2022-15-40",
      "purchaseTime": "09:30",
      "items": [
        {
          "shortDescription": "Product A",
          "price": "9.99"
        }
      ],
      "total": "9.99"
    };
    result = checkReceipt(receipt3);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Date time is incorrect or in the future!");

    // Test Case 4: Invalid Item Description
    const receipt4 = {
      "retailer": "Grocery Store",
      "purchaseDate": "2022-06-10",
      "purchaseTime": "15:45",
      "items": [
        {
          "shortDescription": "Product A",
          "price": "9.99"
        },
        {
          "shortDescription": "",
          "price": "4.50"
        }
      ],
      "total": "14.49"
    };
    result = checkReceipt(receipt4);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("One of the items field is incorrect or empty!");

    // Test Case 5: Mismatched Total Amount
    const receipt5 = {
      "retailer": "Supermart",
      "purchaseDate": "2022-07-01",
      "purchaseTime": "12:00",
      "items": [
        {
          "shortDescription": "Product X",
          "price": "3.99"
        },
        {
          "shortDescription": "Product Y",
          "price": "2.50"
        }
      ],
      "total": "6.48"
    };
    result = checkReceipt(receipt5);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Total does not match the sum of item prices!");
  });
});


describe('processReceipt', () => {
  test('should process the receipt and return the response', () => {
    // Test Case 1: Valid Receipt
    const receipt1 = {
      "retailer": "Target",
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:01",
      "items": [
        {
          "shortDescription": "Mountain Dew 12PK",
          "price": "6.49"
        },
        {
          "shortDescription": "Emils Cheese Pizza",
          "price": "12.25"
        },
        {
          "shortDescription": "Knorr Creamy Chicken",
          "price": "1.26"
        },
        {
          "shortDescription": "Doritos Nacho Cheese",
          "price": "3.35"
        },
        {
          "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
          "price": "12.00"
        }
      ],
      "total": "35.35"
    };
    let response = processReceipt(receipt1);
    expect(response.isValid).toBe(true);
    expect(response.statusCode).toBe(201);
    expect(response.message).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/); // UUID format check

    // Test Case 2: Invalid Receipt
    const receipt2 = {
      "retailer": "Walmart",
      "purchaseDate": "2022-15-40",
      "purchaseTime": "09:30",
      "items": [
        {
          "shortDescription": "Product A",
          "price": "9.99"
        }
      ],
      "total": "9.99"
    };
    response = processReceipt(receipt2);
    expect(response.isValid).toBe(false);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Date time is incorrect or in the future!");

    // Test Case 3: Empty Receipt
    const receipt3 = {
      "retailer": "",
      "purchaseDate": "",
      "purchaseTime": "",
      "items": [],
      "total": "0.00"
    };
    response = processReceipt(receipt3);
    expect(response.isValid).toBe(false);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("One of the fields is incorrect or empty!");

    // Test Case 4: Mismatched Total Amount
    const receipt4 = {
      "retailer": "Grocery Store",
      "purchaseDate": "2022-06-10",
      "purchaseTime": "15:45",
      "items": [
        {
          "shortDescription": "Product A",
          "price": "9.09"
        },
        {
          "shortDescription": "Product B",
          "price": "4.50"
        }
      ],
      "total": "14.49"
    };
    response = processReceipt(receipt4);
    expect(response.isValid).toBe(false);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Total does not match the sum of item prices!");

    // Test Case 5: Invalid Item Description
    const receipt5 = {
      "retailer": "Grocery Store",
      "purchaseDate": "2022-06-10",
      "purchaseTime": "15:45",
      "items": [
        {
          "shortDescription": "Product A",
          "price": "9.99"
        },
        {
          "shortDescription": "",
          "price": "4.50"
        }
      ],
      "total": "14.49"
    };
    response = processReceipt(receipt5);
    expect(response.isValid).toBe(false);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("One of the items field is incorrect or empty!");
  });
});

// describe('processReceipt', () => {
//   test('should process the receipt and return the response', () => {
//     const receipt = {
//       "retailer": "",
//       "purchaseDate": "",
//       "purchaseTime": "",
//       "items": [],
//       "total": "0.00"
//       };

//     // Mock the console.log method
//     const consoleSpy = jest.spyOn(console, 'log');

//     // Call the function
//     calculatePoints(receipt);

//     // Check the console.log method has been called with the expected message
//     expect(consoleSpy).toHaveBeenCalledWith('Expected console output');

//     // Restore the original console.log method
//     consoleSpy.mockRestore();
//   });
// });
