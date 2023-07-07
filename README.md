# Receipt Processor

This repository contains a Node.js web service that processes receipt data and calculates the awarded points based on predefined rules. The service provides endpoints to process receipts and retrieve the points for a given receipt ID.

## Functionality

The web service offers the following endpoints:

1. Process Receipts:

   - Endpoint: /receipts/process
   - Method: POST
   - Payload: Receipt JSON
   - Response: JSON containing an ID for the receipt
2. Get Points:

   - Endpoint: /receipts/{id}/points
   - Method: GET
   - Response: JSON containing the number of points awarded for the receipt ID

The points calculation is based on a set of rules defined in the specifications.

## Installation

To run the web service locally, you need to have either Docker or Node.js installed on your machine.

### Docker Installation

1. Visit the official Docker website: https://www.docker.com/get-started
2. Choose the appropriate installation package for your operating system (Windows, macOS, Linux).
3. Download and run the Docker installer.
4. Follow the instructions to complete the installation.
5. Verify the installation by opening a terminal or command prompt and running the command: `<br>` ``docker --version``

### Node.js Installation

1. Visit the official Node.js website: https://nodejs.org
2. Choose the LTS version (Long-Term Support) for stability.
3. Download and run the Node.js installer.
4. Follow the instructions to complete the installation.
5. Verify the installation by opening a terminal or command prompt and running the following commands: `<br>` ``node --version`` `<br>` ``npm --version``

## Running the Web Service with Docker

### Alternative 1: Running a Docker Image from Docker Hub

These instructions will guide you on how to pull an image from Docker Hub and run it on your local machine using Docker.

Instructions:

1. Open a terminal or command prompt on your machine.
2. Pull the Docker image from Docker Hub using the following command:

   ```
   docker pull cloudelves/receipt_processor:0.0.4.RELEASE
   ```
3. Run the Docker container using the following command:

   ```
   docker run -p 3000:3000 -d --name recproc cloudelves/receipt_processor:0.0.4.RELEASE
   ```

The service will be running on http://localhost:3000

### Alternative 2: Build Docker Image from GitHub repository

These instructions will guide you on how to build a Docker Image and run it on your local machine using Docker.

Instructions:

1. Clone the Receipt Processor Web Service using your terminal.

   ```
   git clone https://github.com/navkar14/receipt_processor.git
   cd receipt_processor
   ```
2. Run the Docker build command.

   ```
   docker build -t receipt_processor:latest .
   ```
3. Spin up a container with the image built in the previous step with the following command.

   ```
   docker run -p 3000:3000 -d --name recproc receipt_processor
   ```

   The service will be running on http://localhost:3000

## Running the Web Service with Node.js

Instructions:

1. Make sure you have node and npm installed in your system by running the following commands in your terminal.

   ```
   node -v
   npm -v
   ```
2. Clone the Receipt Processor Web Service.

   ```
   https://github.com/navkar14/receipt_processor.git
   cd receipt_processor
   ```
3. Install the node modules.

   ```
   npm install
   ```
4. Run the Node.js Web Service

   ```
   npm start
   ```

   The service will be running on http://localhost:3000

## Testing the Web Service

Once the web service is running, you can use tools like cURL, Postman, or any HTTP client to send requests to the specified endpoints (/receipts/process and /receipts/{id}/points) and verify the responses.

1. Example POST REQUEST:

   ```
   http://localhost:3000/receipts/process
   ```

   ```
   {
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
   }
   ```
2. POST RESPONSE:

   ```
   { "id": "a3b1357b-2b23-a31a-4776-105ad302701d" }
   ```
3. Example GET REQUEST:

   ```
   http://localhost:3000/a3b1357b-2b23-a31a-4776-105ad302701d/points
   ```
4. GET RESPONSE:

   ```
   {"points":28}
   ```

## Rules

These rules collectively define how many points should be awarded to a receipt.

* One point for every alphanumeric character in the retailer name.
* 50 points if the total is a round dollar amount with no cents.
* 25 points if the total is a multiple of 0.25.
* 5 points for every two items on the receipt.
* If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
* 6 points if the day in the purchase date is odd.
* 10 points if the time of purchase is after 2:00pm and before 4:00pm.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
