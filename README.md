# Student Registration Portal 🎓

A modern, fast, and fully responsive Student Registration System built with **React**, **Vite**, **Tailwind CSS v4**, and **Supabase**.

## 📖 About

The Student Registration Portal is a comprehensive, cloud-connected web application designed to streamline the management of student records. It features a stunning glassmorphism user interface, real-time database syncing, and secure cloud storage for student profile photos. 

**🟢 Live Demo:** [https://student-registration-portal.pages.dev/](https://student-registration-portal.pages.dev/)

[![Deploy to Cloudflare Pages](https://cloudflare-pages.com/deploy.svg)](https://dash.cloudflare.com/pages/deploy)

## ✨ Features

- **Modern UI/UX**: Built with Tailwind CSS and custom glassmorphism design principles for a sleek, premium feel.
- **Live Database**: Powered by Supabase PostgreSQL for real-time data persistence.
- **Cloud Storage**: Secure image uploads for student profile photos using Supabase Storage.
- **Dynamic ID Generation**: Automatically calculates and assigns sequential Registration Numbers (e.g., `AP230000001`).
- **Full CRUD Operations**: Add, view, edit, and manage student details seamlessly.
- **Responsive**: Fully optimized for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite (Lightning fast HMR)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Modules
- **Backend & Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/shivasaiganesh/Student-Registration-Portal.git
cd Student-Registration-Portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor to create the `students` table and enable RLS:
```sql
CREATE TABLE public.students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "regNo" TEXT UNIQUE NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    "personalEmail" TEXT,
    "bloodGroup" TEXT,
    area TEXT,
    mobile TEXT,
    "parentMobile" TEXT,
    category TEXT,
    branch TEXT,
    "photoUrl" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (For demo purposes)
GRANT ALL ON public.students TO anon;
GRANT ALL ON public.students TO authenticated;
CREATE POLICY "Allow anonymous read" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON public.students FOR DELETE USING (true);
```

### 5. Storage Setup
1. Create a public bucket in Supabase named **`student-photos`**.
2. Run the following SQL to allow image uploads:
```sql
CREATE POLICY "Allow anonymous read" ON storage.objects FOR SELECT USING (bucket_id = 'student-photos');
CREATE POLICY "Allow anonymous uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'student-photos');
CREATE POLICY "Allow anonymous update" ON storage.objects FOR UPDATE USING (bucket_id = 'student-photos');
CREATE POLICY "Allow anonymous delete" ON storage.objects FOR DELETE USING (bucket_id = 'student-photos');
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## ☁️ Deployment

The absolute best and completely free way to host this Vite application is using **Cloudflare Pages**.

1. Create a free account at [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. On the left sidebar, click **Workers & Pages**.
3. Click **Create** -> **Pages** -> **Connect to Git**.
4. Select this GitHub repository (`Student-Registration-Portal`).
5. In the **Set up builds and deployments** section:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Environment Variables** (under advanced) and add:
   - `VITE_SUPABASE_URL` = (your project URL)
   - `VITE_SUPABASE_ANON_KEY` = (your anon key)
7. Click **Save and Deploy**. Cloudflare will instantly build and host your site on their blazing-fast global network for free!
