# Student Registration Portal 🎓

A modern, fast, and fully responsive Student Registration System built with **React**, **Vite**, **Tailwind CSS v4**, and **Supabase**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshivasaiganesh%2FStudent-Registration-Portal&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY)

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

The easiest way to deploy this application is to use the Vercel Platform.
Simply click the **Deploy with Vercel** button at the top of this README. 

During the Vercel deployment, you will be prompted to enter your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Environment Variables.
