# Frontend Deployment Guide

## Vercel (Recommended for Qwik)

1. Go to [Vercel.com](https://vercel.com/)
2. Sign up/login with GitHub
3. Click "Add New..." → "Project"
4. Select `skypulse-frontend` repository
5. Vercel auto-detects Qwik and configures build
6. Set Environment Variables:
   - `VITE_API_URL`: Backend API URL (e.g., `https://skypulse-backend.railway.app`)
7. Click "Deploy"

Your site will be live at: `https://<project-name>.vercel.app`

### Environment Variables (Vercel Dashboard)
- `VITE_API_URL` - Your Railway backend URL (without trailing slash)
  - Example: `https://skypulse-backend-production.up.railway.app`

## Netlify (Alternative)

1. Go to [Netlify.com](https://netlify.com/)
2. Sign up/login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select `skypulse-frontend` repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Set Environment Variables:
   - `VITE_API_URL`: Backend API URL
7. Click "Deploy"

Your site will be live at: `https://<your-site>.netlify.app`

## Updating After Deployment

Both platforms auto-deploy on git push to main:

```bash
# Make changes locally
git add .
git commit -m "Update weather display"
git push origin main

# Automatic deployment starts automatically
```

## Connecting Frontend to Backend

After deploying backend to Railway, copy the URL and set it as `VITE_API_URL`:

1. Get Railway API URL from Railway dashboard
2. Add to Vercel/Netlify environment variables
3. Re-deploy frontend

The frontend will now call your deployed backend API.

## Testing Deployment

1. Visit your frontend URL
2. Search for a city (e.g., "London")
3. Should see weather with mood-based theme
4. Check browser console for any API errors

## Troubleshooting

**"Failed to fetch weather"** - Check if backend URL is correct in environment variables
**CORS errors** - Backend has CORS enabled, shouldn't happen
**Empty city error** - Enter a valid city name
**Theme not showing** - Check if weather-content CSS classes are loading (F12 → Styles)
