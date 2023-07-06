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

To run the web service locally, you need to have Docker and Node.js installed on your machine.

### Docker Installation

1. Visit the official Docker website: https://www.docker.com/get-started
2. Choose the appropriate installation package for your operating system (Windows, macOS, Linux).
3. Download and run the Docker installer.
4. Follow the instructions to complete the installation.
5. Verify the installation by opening a terminal or command prompt and running the command: <br> ``` docker --version ```


### Node.js Installation

1. Visit the official Node.js website: https://nodejs.org
2. Choose the LTS version (Long-Term Support) for stability.
3. Download and run the Node.js installer.
4. Follow the instructions to complete the installation.
5. Verify the installation by opening a terminal or command prompt and running the following commands: <br> ``` node --version ``` <br> ```
npm --version ```


## Running the Web Service

1. Clone this repository to your local machine using the following command: <br> ``` git clone <repository-url> ```
2. Navigate to the project directory: <br> ``` cd receipt_processor ``` 
3. Install the dependencies by running the following command: <br> ``` npm install ```
4. Start the web service using the following command: <br> ``` npm start ```


The service will be running on http://localhost:3000.

## Testing the Web Service

Once the web service is running, you can use tools like cURL, Postman, or any HTTP client to send requests to the specified endpoints (/receipts/process and /receipts/{id}/points) and verify the responses.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
