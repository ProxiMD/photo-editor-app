# Photo Editor App

A modern photo editor with film emulation filters, built with Next.js and TypeScript.

## Features

- Film emulation filters (Portra 400, Kodachrome, etc.)
- Manual adjustments (brightness, contrast, curves)
- Dynamic animated background
- Responsive design
- Real-time preview

## Deployment Instructions for Hostinger

1. Log in to your Hostinger Business Plan account

2. Go to Hosting > Your Website > Git

3. Set up Git deployment:
   - Repository URL: [Your Git Repository URL]
   - Branch: main
   - Directory: /public_html

4. Configure Node.js:
   - Go to Advanced > Node.js
   - Enable Node.js
   - Set Node.js version to 18.x or later
   - Set NPM version to 9.x or later

5. Set up environment:
   - Create a new `.env` file in your root directory
   - Add any necessary environment variables

6. Deploy:
   - Push your code to the repository
   - Hostinger will automatically detect changes and deploy

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

Built by Mudit Dubey 2024
