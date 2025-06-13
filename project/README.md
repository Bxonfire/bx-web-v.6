# Portfolio Website with Global Admin Panel

## 🌍 **GLOBAL PERSISTENCE SOLUTION**

This website now uses **Supabase Database** to ensure that admin panel changes are visible to ALL users worldwide, not just locally.

### ✅ **What's Fixed:**
- **Global Storage**: Changes save to database, visible to everyone
- **Real-time Updates**: Changes appear instantly for all users
- **Cross-device Sync**: Works on any device/browser/network
- **Persistent Changes**: No more local-only storage issues

### 🚀 **Setup Instructions:**

#### 1. **Create Supabase Account** (FREE)
1. Go to [supabase.com](https://supabase.com)
2. Sign up for free account
3. Create a new project

#### 2. **Get Database Credentials**
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **Anon Key**

#### 3. **Configure Environment**
1. Create `.env` file in your project root
2. Add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

#### 4. **Setup Database**
1. In Supabase dashboard, go to **SQL Editor**
2. Run the migration file: `supabase/migrations/create_site_content.sql`

#### 5. **Build & Deploy**
```bash
npm run build
```
Upload the `dist` folder contents to your hosting provider.

### 🎯 **How It Works:**
- **Admin Panel**: Saves changes to Supabase database
- **Public Website**: Loads content from database
- **Real-time**: All users see changes instantly
- **Backup**: localStorage used as fallback

### 🔧 **Admin Panel Access:**
- Press `Ctrl + Shift + A` to activate admin mode
- Login with admin credentials
- Make changes - they'll be visible to ALL users!

### 📱 **Features:**
- ✅ Global content management
- ✅ Real-time synchronization
- ✅ Cross-device compatibility
- ✅ Auto-image resizing
- ✅ Custom button styling
- ✅ Theme customization
- ✅ Font management

### 🌟 **Result:**
When you make changes in the admin panel, they are now saved to a **global database** and will be visible to **everyone** who visits your website, regardless of their device, browser, or location!