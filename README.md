# Sales Analytics Dashboard

A comprehensive, modern sales analytics dashboard built with React, Vite, and Tailwind CSS. This application provides real-time insights into sales performance, team metrics, and executive overviews.

## 🚀 Features

- **Executive Sales Overview**: Strategic performance insights for senior leadership
- **Team Performance Dashboard**: Operational sales management and team metrics
- **Real-time Operations**: Live monitoring and activity tracking
- **Analytics Deep Dive**: Comprehensive data analysis environment
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion
- **Interactive Charts**: Powered by Recharts and D3.js
- **Real-time Updates**: Live data refresh and notifications

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Charts**: Recharts, D3.js
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **State Management**: Redux Toolkit
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sales_analytics_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Netlify Deployment

1. **Connect your repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Deploy**
   - Netlify will automatically deploy on every push to main branch
   - The `netlify.toml` file is already configured for optimal performance

### Vercel Deployment

1. **Connect your repository to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure build settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - The `vercel.json` file is already configured for optimal performance

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder**
   - Upload the contents of the `dist` folder to your web server
   - Ensure your server is configured to serve `index.html` for all routes

## 📁 Project Structure

```
sales_analytics_dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── executive-sales-overview-dashboard/
│   │   ├── sales-manager-performance-dashboard/
│   │   ├── real-time-sales-operations-dashboard/
│   │   └── sales-analytics-deep-dive-dashboard/
│   ├── styles/            # CSS and Tailwind styles
│   ├── utils/             # Utility functions
│   ├── App.jsx           # Main app component
│   ├── Routes.jsx        # Routing configuration
│   └── index.jsx         # Entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── netlify.toml          # Netlify deployment config
├── vercel.json           # Vercel deployment config
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Styling
- Modify `src/styles/tailwind.css` for global styles
- Update `tailwind.config.js` for theme customization
- Component-specific styles are co-located with components

### Data Sources
- Replace mock data in dashboard components with real API calls
- Update data fetching logic in `useEffect` hooks
- Configure API endpoints in environment variables

### Components
- Add new dashboard pages in `src/pages/`
- Create reusable components in `src/components/`
- Update routing in `src/Routes.jsx`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_TITLE=Sales Analytics Dashboard
```

## 📊 Performance Optimization

- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Lazy Loading**: Components are loaded on demand
- **Caching**: Static assets are cached for 1 year
- **Compression**: Gzip compression enabled
- **CDN Ready**: Optimized for CDN deployment

## 🔒 Security

- **Content Security Policy**: Configured headers for security
- **XSS Protection**: Enabled in deployment configurations
- **Frame Options**: Prevented clickjacking attacks
- **HTTPS Only**: Recommended for production

## 🚀 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the code comments
- Review the deployment logs for troubleshooting

## 🔄 Updates

- **v0.1.0**: Initial release with core dashboard functionality
- Optimized for Netlify and Vercel deployment
- Responsive design and modern UI components
- Real-time data visualization capabilities
