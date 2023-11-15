# RIPIT

A fantastic mobile app built with Expo.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Project Overview

RIPIT is a mobile application that allows users to practice their favorite language through spaced repetitions. AI will help them achieve their goal.
Users can add, edit and delete "Barajas" for practice, as well as chat with the AI ​​and receive advices.

## Features

- User authentication with firebase
- CRUD (Create, Read, Update, Delete) functionality for "Barajas"
- Live chat
- Clean, minimal and intuitive user interface

## Getting Started

Follow these instructions to get the RIPIT app up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js
- Expo CLI
- Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KevinDev90/ripit

2. Navigate to the project directory:

   ```bash
   cd ripit

3. Install dependencies:

   ```bash
   npm install or yarn install

4. API Key Setup

   1. OpenAI API
      - Visit [API OpenAI](https://platform.openai.com/api-keys).
      - Sign up for an account if you don't have one.
      - Navigate to the API keys section and generate a new API key.
      - Copy the API key.

   2. Create a file named apiKeys.js in the root of the project:
      ```bash
      // apiKeys.js      
      export const API_KEY_OPENAI = 'your_api_key_here';

      Replace 'your_api_key_here' with the API keys you obtained.

   3. Save the file.

5. Start the Expo development server:

   ```bash
   npx expo start
   
   Scan the QR code with the Expo Go app on your mobile device or run the app in an emulator.



### Usage

1. Sign up or log in to start practicing your favorite lenguage.
2. Add a new "Baraja" or edit/delete existing ones.
3. "Practice" to start to learn, ✅ you know the word, ❌ you need to practice more
4. Ask to AI for help, use the Chat
5. Notes to keep a record of what you have learned 

### Acknowledgments

- The Expo and React Native communities for their excellent documentation and support.
