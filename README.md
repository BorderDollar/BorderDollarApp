# BorderDollar

BorderDollar is a crypto crowdfunding invoice financing platform designed to provide efficient and secure funding for cross-borderd trade invoices. The platform leverages ReactJS for its frontend, Supabase for backend services, and smart contracts on the blockchain for secure transactions.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features

- **Invoice Crowdfunding:** Users can fund invoices with cryptocurrency.
- **Secure Transactions:** Utilizes Soroban smart contracts for secure and transparent transactions.
- **User Management:** Supabase backend for efficient user management and data storage.
- **Admin Dashboard:** Allows admins to manage funding campaigns and invoices.
- **Responsive Design:** User-friendly interface built with ReactJS and Chakra UI.

## Architecture

- **Frontend:** ReactJS, Chakra UI
- **Backend:** Supabase
- **Smart Contracts:** Soroban

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Supabase account
- Soroban CLI

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/borderdollar.git
   cd borderdollar
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project on Supabase.
   - Obtain your Supabase URL and anon key.
   - Create a `.env.local` file in the root directory and add your Supabase credentials:
     ```bash
     REACT_APP_SUPABASE_URL=your_supabase_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up Soroban:**
   - Install Soroban CLI following the official documentation.
   - Compile the smart contracts
     ```bash
     cd smart_contracts/soroban_contracts
     soroban build
     ```
     
5. **Run the application:**

   ```bash
   npm start
   ```

## Usage
1. **User registration:**
   - Sign up for an account through the SignInPage.
   - Verify your email via a magic link and log in.

2. **Admin dashboard:**
   - Admin users can access the Admin Dashboard to create, edit, and delete funding campaigns.
   - Admins can upload new invoices and manage existing ones.
   - Admins can also add and manage partner companies.
  
3. **Funding invoices:**
   - Users can browse available funding campaigns and contribute to them using cryptocurrency (USDC for now)
   - Transactions are handled securely through Soroban smart contracts.

## Folder Structure
This is the folder structure (WIP)

```
borderdollar/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── supabaseClient.js
│   │   ├── auth/
│   │   │   ├── AuthContext.js
│   │   │   ├── RedirectIfLoggedIn.js
│   │   │   └── RequireAuth.js
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AdminLayout.js
│   │   │   │   ├── Header.js
│   │   │   │   ├── MainContent.js
│   │   │   │   └── Sidebar.js
│   │   │   ├── ConnectModal.js
│   │   │   ├── InvestModal.js
│   │   │   ├── PoolDetails.js
│   │   │   └── PoolList.js
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── CreateCampaign.js
│   │   │   │   ├── CreateInvoice.js
│   │   │   │   ├── DeployCampaign.js
│   │   │   │   ├── EditCampaign.js
│   │   │   │   └── SignInPage.js
│   │   │   ├── PoolDetailPage.js
│   │   │   ├── PoolsPage.js
│   │   │   └── SignInPage.js
│   │   └── smartContractUtils/
│   │       └── soroban/
├── smart_contracts/
│   └── soroban_contracts/
│       ├── contracts/
│       │   ├── crowdfunding/
│       │   │   ├── src/
│       │   │   │   ├── events.rs
│       │   │   │   ├── lib.rs
│       │   │   │   ├── test.rs
│       │   │   │   ├── testutils.rs
│       │   │   │   └── test_snapshots/
│       │   │   └── Cargo.toml
│       │   └── crowdfunding_factory/
│       │       ├── src/
│       │       └── Cargo.toml
│       └── Cargo.lock
│       └── Cargo.toml
│       └── README.md
└── README.md
```

## Contributing
We welcome contributions to BorderDollar! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Create a pull request detailing your changes.
