# Influencer Campaign Tracker

A modern web application for tracking influencer campaigns, managing content creators, and monitoring their performance across Instagram and TikTok platforms.

## 🚀 Features

- **Influencer Management**: Add, edit, and track influencers across multiple platforms
- **Campaign Monitoring**: Track campaign status (Posted, Script Needed, Approval Needed)
- **Performance Analytics**: Monitor views, engagement, and payment status
- **Video Post Tracking**: Record and track individual video posts with views 
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account and project

## ⚡ Quick Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd influencer-tracking-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
The project includes Supabase migrations. Run them in your Supabase dashboard or using the CLI:
```bash
# If using Supabase CLI
supabase db push
```

The database schema includes:
- `influencers` table: Core influencer data
- `video_posts` table: Individual post tracking
- Automated triggers for timestamp updates

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📊 Database Schema

### Influencers Table
- `id`: UUID primary key
- `username`: Influencer username
- `profile_url`: Social media profile URL
- `platform`: Instagram, TikTok, or Both
- `views_median`: Median views per post
- `total_views`: Calculated total views (median × 5)
- `current_views`: Current campaign views
- `status`: Campaign status
- `is_paid`: Payment status
- `created_at`/`updated_at`: Timestamps

### Video Posts Table
- `id`: UUID primary key
- `influencer_id`: Foreign key to influencers
- `url`: Video post URL
- `posted_date`: Date posted
- `views_count`: View count for the post
- `created_at`/`updated_at`: Timestamps

## 🎯 Usage

1. **Add Influencers**: Click "Add Influencer" to create new entries
2. **Track Progress**: Update campaign status as work progresses
3. **Monitor Performance**: View aggregated metrics and individual post performance
4. **Manage Payments**: Toggle payment status and track financial obligations
5. **Filter & Sort**: Use filters to find influencers based on their status

## ⏱️ Development Timeline

**Total Time: ~2 hours**

- **20 minutes**: Initial setup and core functionality planning
- **10 minutes**: UI/UX design decisions
- **30 minutes**: Core application development
- **30 minutes**: Debugging RLS (Row Level Security) issues in Supabase
- **20 minutes**: Final testing and miscellaneous fixes

## 🔧 Development Process

1. **Requirements Definition**: Used ChatGPT to clarify and structure requirements
2. **UI Design**: Leveraged UXPilot for design inspiration and best practices
3. **Core Development**: Built the application using Bolt for rapid prototyping
4. **Debugging**: Used Cursor to resolve RLS authentication issues

### Planned Features

#### 🔐 Authentication & Security
- **Internal Team Authentication**: Restrict access to authorized team members only
- **Role-based Permissions**: Different access levels for team members

#### 📈 Analytics & Metrics
- **Campaign Performance Dashboard**: Visual analytics for campaign success
- **Engagement Rate Analysis**: Deep dive into engagement metrics
- **Trend Analysis**: Track performance over time
- **Export Capabilities**: Generate reports in PDF/Excel format

## 💭 Developer Comments

This project showcases a rapid development approach combining AI tools for different aspects:
- **ChatGPT** for requirement clarity and planning
- **UXPilot** for design inspiration
- **Bolt** for rapid application scaffolding
- **Cursor** for debugging and code refinement

The main challenge was configuring Supabase RLS policies correctly, which required disabling RLS for development purposes. In production, proper authentication and row-level security should be implemented.


