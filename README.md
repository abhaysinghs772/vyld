# Project Name

task Management (Backend).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [Installation Guide](https://nodejs.org/)
- Git: [Installation Guide](https://git-scm.com/)

## Getting Started

To set up this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/abhaysinghs772/vyld_assignment

2. go to the cloned project. 
    ```bash
    cd vyld_assignment

3. Install dependencies:
    ```bash
    npm install

4. navigate to app.ts and change the value of uri to your mongodb atlas credentials at line num 25.

5. run the project 
    ```bash
    npm run:start
6. please find the api collections in mail and in this projects root folder named with "task_management-postman_collection.json" and import it in postman and then run it.

7. In order to test/check task's api first signup and then do login by their respective apis and then use the token as : 
    ```bash
    authorication: Bearear <your_token>