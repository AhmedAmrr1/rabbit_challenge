
# Rabbit Coding Challenge

## Objective

The goal of this task is to evaluate your coding abilities and assess your understanding of business requirements by simulating a real-world scenario at Rabbit. This task is designed to test your skills in developing a feature for Rabbit while also optimizing existing code for performance. The task should take no more than 3-4 hours to complete.

Please ensure that the code you write is production-ready. If you make any compromises or assumptions during the task, document them. Be clear about any steps you'd take if you had more time to improve the solution.

---

## Business Context

Rabbit operates multiple stores across the region, processing thousands of orders each day across various locations. The company is working to enhance its system to provide a better user experience for customers.

---

## Requirements

### 1. **Top 10 Most Frequently Ordered Products API**

- Develop an API that returns the **top 10 most frequently ordered products** in a specific area. The area can be identified based on the location or region.
- This API will be integrated into a mobile application and displayed on the user’s home screen.
- The API should be designed to handle millions of requests efficiently, as Rabbit’s homepage experiences significant traffic.

### 2. **Optimizing a Poorly Implemented List Products API**

- There is an existing API to list products (/products), but it has **poor performance** due to inefficient database queries and bad code practices. You are tasked with reviewing and optimizing this API for better performance.
- Feel free to change the API response and request contracts (eg. DTO, Filters, ..etc) for the seek of making the API more efficient and reliable
- Refactor and improve the performance of the current implementation to ensure it can handle large-scale traffic efficiently.

---

## Technical Requirements

### 1. **Environment Setup**

- Install **Node.js** (version 20 or higher).
- Set up any **SQL database** (such as PostgreSQL or MySQL) to store product and order information.
- Review and understand the dependencies in the provided `package.json`. Identify libraries you may use to improve performance.
- Run `yarn prisma:generate`
- Run `yarn migrate:dev`
- Run `yarn seed`

### 2. **Test Cases**

- Write the necessary test cases to ensure the correctness of your implementation.
- Ensure that the **API for fetching the top 10 most ordered products** is accurate and performs as expected.

### 3. **Documentation**

- Document any **assumptions** made during the task.
- If you had more time, describe additional optimizations you would consider.

---

## Bonus Points (Optional)

- If you have more time, consider **integration with any notification library** (e.g., **Pushover**) to receive notifications after a new order is created.

---

## Submission Instructions

- Ensure your code is clean, modular, and easy to maintain.
- Provide clear instructions on how to set up and run your code.
- Commit and push your work to a public repository (GitHub or GitLab), and provide a link to the repository.

---

## Evaluation Criteria

- Code quality, modularity, and readability.
- Efficient handling of performance-related issues.
- Proper handling of database queries and optimizations.
- Correctness of the implemented solution.
- Documentation of assumptions and possible improvements.

---

Good luck with the challenge! We look forward to reviewing your submission.



---

## **Enhancements and New Features**

### **New Method: `getTopOrderedProducts`**

*   Developed an API to fetch the **top 10 ordered products**, filtered by area.  
*   Includes detailed product information and aggregated order count.

### **Enhanced `getAllProducts` API**

*   Refactored to support **dynamic filtering** by `categories` and `area`.  
*   Enhanced performance by eliminating unnecessary loops and adding order count to the response.

### **Improved `getProductById` API**

*   Added **validation** for product IDs and integrated error handling for invalid or non-existent IDs.  
*   Included the **order count** in the response for enhanced product details.

### **Database Integration**

*   Set up and connected a **MySQL database** using the `DATABASE_URL` environment variable.  
*   Ensured seamless integration and compatibility with Prisma ORM.

---

## **Testing Details**

### **Unit Tests**

*   Verified the **functionality of individual services** and repository methods.  
*   Focused primarily on filtering and sorting logic.  
*   **Result**: All unit tests passed successfully.

### **Integration Tests**

*   Tested API endpoints for **expected responses** under various scenarios:  
    *   `/product` endpoint returned accurate data with filters applied.  
    *   `/product/:id` endpoint successfully fetched the correct product by ID.  
    *   `/product/top-ordered-products` endpoint failed during integration tests and requires further debugging.  
*   **Result**: General endpoints passed integration tests, but `getTopOrderedProducts` requires further investigation.

---

## **Testing Steps**

1.  **Run Prisma Commands**  
    *   Generate the Prisma client:  
        `yarn prisma:generate`
        
    *   Apply database schema changes via migrations:  
        `yarn migrate:dev`
        
    *   Seed the database with test data:  
        `yarn seed`

2.  **Run Integration Tests**  
    *   Execute the end-to-end (e2e) tests:  
        `yarn test.e2e`

---

## **Known Issues**

### **`getTopOrderedProducts` Integration Test Failure**

*   While unit tests confirm the **correctness of the functionality**, the endpoint fails during integration tests.  
*   Possible causes include:  
    *   Missing a relation or any overwritr in the database.  
    *   Runtime discrepancies in query execution or logic.  

---

Even if the issue isn’t resolved right away, I’ll keep working on fixing it. If I’m not accepted
