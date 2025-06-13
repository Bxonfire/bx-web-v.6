# 🔑 **How to Find Your Supabase Credentials**
## Step-by-Step Guide to Get VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

---

## 📋 **What You Need:**
- Your Supabase account (already created)
- Your Supabase project (already created)

---

## 🎯 **Step 1: Go to Supabase Dashboard**
1. **Open your browser**
2. **Go to:** [https://supabase.com](https://supabase.com)
3. **Click:** "Sign In" (top right corner)
4. **Login** with your account credentials

---

## 🎯 **Step 2: Select Your Project**
1. **You'll see your project dashboard**
2. **Click on your project** (the one you created earlier)
3. **You should see your project name** in the top left

---

## 🎯 **Step 3: Find the API Settings**
1. **Look at the LEFT SIDEBAR**
2. **Scroll down** until you see "Settings"
3. **Click on "Settings"**
4. **In the Settings submenu, click "API"**

**Path:** Settings → API

---

## 🎯 **Step 4: Copy Your Credentials**

### **🔗 Project URL (VITE_SUPABASE_URL)**
1. **Look for section:** "Project URL"
2. **You'll see something like:** `https://xxxxxxxxxx.supabase.co`
3. **Click the COPY button** next to it
4. **Save this** - this is your `VITE_SUPABASE_URL`

### **🔑 Anon Key (VITE_SUPABASE_ANON_KEY)**
1. **Look for section:** "Project API keys"
2. **Find:** "anon public" key
3. **You'll see a long string** starting with `eyJ...`
4. **Click the COPY button** next to it
5. **Save this** - this is your `VITE_SUPABASE_ANON_KEY`

---

## 🎯 **Step 5: Use in Deployment**

### **In Your Deployment Form:**

**First Environment Variable:**
```
Key: VITE_SUPABASE_URL
Value: [Paste your Project URL here]
```

**Second Environment Variable:**
```
Key: VITE_SUPABASE_ANON_KEY
Value: [Paste your anon public key here]
```

---

## 📸 **Visual Guide:**

### **What to Look For:**
1. **Left Sidebar:** Settings → API
2. **Project URL section:** Copy the URL
3. **Project API keys section:** Copy the "anon public" key

### **Example of What You'll See:**
```
Project URL: https://abcdefghijk.supabase.co
API Key (anon public): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚠️ **Important Notes:**
- **DO NOT** use the "service_role" key (it's secret!)
- **ONLY** use the "anon public" key
- **Keep these credentials safe** - don't share them publicly
- **The URL** should end with `.supabase.co`
- **The anon key** should start with `eyJ`

---

## 🚨 **If You Can't Find Them:**
1. **Make sure you're logged into Supabase**
2. **Make sure you've selected the correct project**
3. **Make sure you're in Settings → API**
4. **Try refreshing the page**

---

## ✅ **Once You Have Both:**
1. **Go back to your deployment form**
2. **Delete the wrong environment variables**
3. **Add the correct ones** with the exact keys:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **Click Deploy**

---

## 🎉 **Success!**
Your website will now be connected to your Supabase database and work globally!