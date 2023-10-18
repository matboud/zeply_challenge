# Zeply Blockchain Information App

## Overview

This project is a technical challenge submission for Zeply. It's a full-stack application that allows you to search for information on Bitcoin addresses and transactions. The backend is integrated, but the WebSockets part is not integrated into the frontend due to long wait times for address updates, which made manual testing challenging. However, the WebSocket code is written and functional on the backend.

## Features

- **Search Functionality**: Search for specific Bitcoin addresses and transactions.
- **Currency Conversion**: Choose to display values in USD, EUR, or BTC.
- **Responsive Design**: A dark mode interface that's also mobile-responsive.
- **Real-time Notifications**: (Backend only) Uses WebSockets to notify users of changes to subscribed BTC addresses and transactions.

## Pre-requisites

- Node.js
- npm

## Installation

1. Clone this repository to your local machine.
```bash
git clone <repository_link>
```

2. Navigate to the project folder.
```bash
cd <project_folder_name>
```

3. Install the required npm packages.
```bash
npm install
```

## Setup

Create a `.env` file in the root directory and add the following content:

```env
PORT=3000
BLOCKCHAIN_API_URL=<Your_Blockchain_API_URL>
```

## Running the Application

To start the application, run the following command in the root directory:

```bash
npm start
```

This will start both the frontend and the backend servers. Open your browser and navigate to `http://localhost:3000`.

## Running Tests

Run the following command to execute the test cases:

```bash
npm test
```

## Tech Stack

- Frontend: ReactJS, (NextJs), Typescript.
- Backend: Node.js, Express
- Database: SQLite3
- Testing: Jest
- Other: WebSockets for real-time notifications (Backend Only)

## Contributing

This is a technical challenge and not open for contributions.
