//mongoDB queries to insert and retrieve data
//Make sure to run this in the mongo shell or a MongoDB client or any online compiler
//To insert customer data
db.customers.insertMany(
  [
  {
    "id":1,
    "name": "chetana",
    "email": "chetanasm@gmail.com",
    
  },
  {
    "id":2,
    "name": "sm",
    "email": "sm@gmail.com",
    
  },
  {
    "id":3,
    "name": "chetanasm",
    "email": "chetanasm20@gmail.com",
   
  }
]
)

//orders
db.orders.insertMany([
  {
    id:1,
    orderDate: new Date("2024-01-10T12:00:00.000"),
    // customerId:ObjectId("6889cfa2b9414cbeab508a80"),
    customerId:1,
    totalAmount:40000
  },
  {
    id:2,
    orderDate: new Date("2024-01-10T12:00:00.000"),
    // customerId:ObjectId("6889cfa2b9414cbeab508a80"),
    customerId:2,
    totalAmount:40000
  },
  {
    id:3,
    orderDate: new Date("2025-01-10T12:00:00.000"),
    // customerId:ObjectId("6889cfa2b9414cbeab508a80"),
    customerId:1,
    totalAmount:40000
  }
  
  ])
  
//orderItems  
db.orderItems.insertMany([
  {
    id:1,
    orderId:1,
    productName:"HP Laptop",
    quantity:2,
    unitPrice:10000
  },
  {
    id:1,
    orderId:1,
    productName:"Dell Laptop",
    quantity:1,
    unitPrice:20000
  }
])

//Get query
db.orders.aggregate([
  {
    $match:{"orderDate":new Date("2024-01-10T12:00:00.000")}
  },
  // 1. Join with customers
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },

  // 2. Group by customerId and status
  {
    $group: {
      _id: {
        customerId: "$customerId",
        orderDate: "$orderDate"
      },
      totalOrders: { $sum: 1 },
      totalAmount: { $sum: "$totalAmount" },
      customers: {
        $addToSet: {
          _id: "$customer._id",
          name: "$customer.name",
          email: "$customer.email"
        }
      }
    }
  },
  // 3. Optional: clean output
  {
    $project: {
      _id: 0,
      
     totalAmount:1,
      totalOrders: 1,
      
      customers: 1
    }
  }
]).toArray()









