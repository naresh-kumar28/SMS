import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import SettingsNavigation from '../../components/common/SettingsNavigation';
import Dropdown from '../../components/common/Dropdown';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const systemStats = [
  { icon: 'settings', label: 'Active Settings', value: '42', change: '+3', helper: 'Configured', tone: 'blue' },
  { icon: 'security', label: 'Security Level', value: 'High', change: 'Optimal', helper: 'Protection', tone: 'emerald' },
  { icon: 'users', label: 'User Access', value: '156', change: '+12', helper: 'Active users', tone: 'purple' },
  { icon: 'integration', label: 'Integrations', value: '8', change: '+2', helper: 'Connected', tone: 'amber' },
  { icon: 'backup', label: 'Backups', value: 'Daily', change: 'Auto', helper: 'Last 24h', tone: 'rose' },
  { icon: 'activity', label: 'System Health', value: '98%', change: '+2%', helper: 'Performance', tone: 'green' },
];

const landingSettingsCategories = [
  {
    title: 'Home Page',
    description: 'Configure home page content and layout',
    icon: 'home',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        icon: 'campaign',
        description: 'Main landing area with headline and CTAs',
        settings: [
          { label: 'Hero Title', type: 'text', value: 'Manage Your School Smartly with Skoolnet', description: 'Main hero heading' },
          { label: 'Hero Subtitle', type: 'textarea', value: 'Transform your institution into a high-performance digital ecosystem.', description: 'Hero description text' },
          { label: 'Primary CTA Button', type: 'text', value: 'Get Started Free', description: 'Main call-to-action button text' },
          { label: 'Primary CTA Link', type: 'text', value: '/pricing', description: 'Main call-to-action button URL' },
          { label: 'Secondary CTA Button', type: 'text', value: 'Book a Demo', description: 'Secondary call-to-action button text' },
          { label: 'Secondary CTA Link', type: 'text', value: '/contact', description: 'Secondary call-to-action button URL' },
        ]
      },
      {
        id: 'stats',
        title: 'Statistics',
        icon: 'bar_chart',
        description: 'Statistics displayed below hero',
        settings: [
          { label: 'Stat 1 Value', type: 'text', value: '500+', description: 'First statistic value' },
          { label: 'Stat 1 Label', type: 'text', value: 'Schools onboarded', description: 'First statistic label' },
          { label: 'Stat 2 Value', type: 'text', value: '1.2 M', description: 'Second statistic value' },
          { label: 'Stat 2 Label', type: 'text', value: 'Students managed', description: 'Second statistic label' },
          { label: 'Stat 3 Value', type: 'text', value: '99.9%', description: 'Third statistic value' },
          { label: 'Stat 3 Label', type: 'text', value: 'Uptime SLA', description: 'Third statistic label' },
          { label: 'Stat 4 Value', type: 'text', value: '4.9 ★', description: 'Fourth statistic value' },
          { label: 'Stat 4 Label', type: 'text', value: 'Average rating', description: 'Fourth statistic label' },
        ]
      },
      {
        id: 'features',
        title: 'Features',
        icon: 'grid_view',
        description: 'Feature cards with icons and descriptions',
        settings: [
          { label: 'Feature 1 Title', type: 'text', value: 'Student Dashboard', description: 'First feature title' },
          { label: 'Feature 1 Description', type: 'textarea', value: 'Personalised portal for every learner.', description: 'First feature description' },
          { label: 'Feature 2 Title', type: 'text', value: 'Fee Tracking', description: 'Second feature title' },
          { label: 'Feature 2 Description', type: 'textarea', value: 'Automated billing, smart reminders.', description: 'Second feature description' },
          { label: 'Feature 3 Title', type: 'text', value: 'Attendance', description: 'Third feature title' },
          { label: 'Feature 3 Description', type: 'textarea', value: 'Biometric and QR-based check-ins.', description: 'Third feature description' },
          { label: 'Feature 4 Title', type: 'text', value: 'Performance Analytics', description: 'Fourth feature title' },
          { label: 'Feature 4 Description', type: 'textarea', value: 'Advanced visualisations.', description: 'Fourth feature description' },
        ]
      },
      {
        id: 'cta',
        title: 'CTA Section',
        icon: 'ads_click',
        description: 'Call-to-action section at bottom',
        settings: [
          { label: 'CTA Section Primary Button', type: 'text', value: 'Get Started Free', description: 'CTA section primary button text' },
          { label: 'CTA Section Primary Link', type: 'text', value: '/pricing', description: 'CTA section primary button URL' },
          { label: 'CTA Section Secondary Button', type: 'text', value: 'Talk to Sales', description: 'CTA section secondary button text' },
          { label: 'CTA Section Secondary Link', type: 'text', value: '/contact', description: 'CTA section secondary button URL' },
        ]
      },
    ]
  },
  {
    title: 'Services Page',
    description: 'Manage services and features display',
    icon: 'category',
    sections: [
      {
        id: 'hero',
        title: 'Page Hero',
        icon: 'campaign',
        description: 'Main hero area with title and CTAs',
        settings: [
          { label: 'Page Title', type: 'text', value: 'Educational Intelligence Redefined.', description: 'Services page main title' },
          { label: 'Page Description', type: 'textarea', value: 'Deploy a comprehensive ecosystem built for modern institutions.', description: 'Services page description' },
          { label: 'Primary CTA Button', type: 'text', value: 'Get Started Free', description: 'Primary CTA button text' },
          { label: 'Primary CTA Link', type: 'text', value: '/pricing', description: 'Primary CTA button URL' },
          { label: 'Secondary CTA Button', type: 'text', value: 'View Pricing', description: 'Secondary CTA button text' },
          { label: 'Secondary CTA Link', type: 'text', value: '/pricing', description: 'Secondary CTA button URL' },
        ]
      },
      {
        id: 'featured',
        title: 'Featured Service',
        icon: 'star',
        description: 'Featured service section (Fee Management)',
        settings: [
          { label: 'Featured Title', type: 'text', value: 'Fee Management', description: 'Featured service title' },
          { label: 'Featured Description', type: 'textarea', value: 'A secure financial gateway that handles automated invoicing.', description: 'Featured service description' },
          { label: 'Feature 1', type: 'text', value: 'Automated billing', description: 'First feature' },
          { label: 'Feature 2', type: 'text', value: 'Online payments', description: 'Second feature' },
          { label: 'Feature 3', type: 'text', value: 'Overdue alerts', description: 'Third feature' },
          { label: 'Feature 4', type: 'text', value: 'Reconciliation reports', description: 'Fourth feature' },
          { label: 'Button Text', type: 'text', value: 'Explore Fee Management', description: 'CTA button text' },
          { label: 'Button Link', type: 'text', value: '/contact', description: 'CTA button URL' },
        ]
      },
      {
        id: 'services',
        title: 'Services Grid',
        icon: 'grid_view',
        description: 'Service cards display section',
        settings: [
          { label: 'Section Title', type: 'text', value: 'Everything Your School Needs', description: 'Services grid title' },
          { label: 'Enable All Tab', type: 'toggle', enabled: true, description: 'Show All category tab' },
          { label: 'Enable Administration', type: 'toggle', enabled: true, description: 'Show Administration category' },
          { label: 'Enable Academics', type: 'toggle', enabled: true, description: 'Show Academics category' },
          { label: 'Enable Finance', type: 'toggle', enabled: true, description: 'Show Finance category' },
          { label: 'Enable Communication', type: 'toggle', enabled: true, description: 'Show Communication category' },
        ]
      },
      {
        id: 'capabilities',
        title: 'Capabilities',
        icon: 'verified',
        description: 'Platform capabilities section',
        settings: [
          { label: 'Section Title', type: 'text', value: 'Built for scale, designed for simplicity.', description: 'Capabilities section title' },
          { label: 'Capability 1', type: 'text', value: 'Cloud-based, zero-infrastructure setup', description: 'First capability' },
          { label: 'Capability 2', type: 'text', value: 'Multi-school and multi-branch management', description: 'Second capability' },
          { label: 'Capability 3', type: 'text', value: 'Role-based access for all user types', description: 'Third capability' },
          { label: 'Capability 4', type: 'text', value: 'Real-time data sync across devices', description: 'Fourth capability' },
          { label: 'Capability 5', type: 'text', value: 'Automated reporting and scheduled exports', description: 'Fifth capability' },
          { label: 'Capability 6', type: 'text', value: 'Open API for third-party integrations', description: 'Sixth capability' },
          { label: 'Capability 7', type: 'text', value: '99.9 % uptime SLA with 24/7 support', description: 'Seventh capability' },
          { label: 'Capability 8', type: 'text', value: 'GDPR-compliant data handling', description: 'Eighth capability' },
        ]
      },
      {
        id: 'cta',
        title: 'CTA Section',
        icon: 'ads_click',
        description: 'Bottom call-to-action section',
        settings: [
          { label: 'CTA Title', type: 'text', value: 'Not sure which plan fits your school?', description: 'CTA section title' },
          { label: 'CTA Description', type: 'textarea', value: 'Our team will walk you through every module.', description: 'CTA section description' },
          { label: 'Primary Button', type: 'text', value: 'Book a Free Demo', description: 'Primary button text' },
          { label: 'Primary Link', type: 'text', value: '/contact', description: 'Primary button URL' },
          { label: 'Secondary Button', type: 'text', value: 'Contact Sales', description: 'Secondary button text' },
          { label: 'Secondary Link', type: 'text', value: '/contact', description: 'Secondary button URL' },
        ]
      },
    ]
  },
  {
    title: 'About Page',
    description: 'Manage about page content and team information',
    icon: 'info',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        icon: 'campaign',
        description: 'Main landing area with headline and CTAs',
        settings: [
          { label: 'Hero Eyebrow', type: 'text', value: 'Built by Developers · For Education', description: 'Hero eyebrow text' },
          { label: 'Hero Title', type: 'text', value: 'The Developer Team Behind Skoolnet.', description: 'Hero main title' },
          { label: 'Hero Subtitle', type: 'textarea', value: "We're a small, focused engineering team who felt the pain of broken school management first-hand.", description: 'Hero subtitle text' },
          { label: 'Primary CTA Button', type: 'text', value: 'Get Started Free', description: 'Primary CTA button text' },
          { label: 'Primary CTA Link', type: 'text', value: '/pricing', description: 'Primary CTA button URL' },
          { label: 'Secondary CTA Button', type: 'text', value: 'View on GitHub', description: 'Secondary CTA button text' },
          { label: 'Secondary CTA Link', type: 'text', value: 'https://github.com', description: 'Secondary CTA button URL' },
        ]
      },
      {
        id: 'mission',
        title: 'Mission',
        icon: 'rocket_launch',
        description: 'Mission and vision statement section',
        settings: [
          { label: 'Mission Title', type: 'text', value: 'Our Mission', description: 'Mission section title' },
          { label: 'Mission Content', type: 'textarea', value: 'To empower educational institutions with developer-grade digital tools that simplify complexity.', description: 'Mission statement text' },
          { label: 'Vision Title', type: 'text', value: 'Our Vision', description: 'Vision section title' },
          { label: 'Vision Content', type: 'textarea', value: 'A world where every school runs on software that is as reliable as the engineers who build it.', description: 'Vision statement text' },
        ]
      },
      {
        id: 'problem',
        title: 'Problem',
        icon: 'compare',
        description: 'Problem and solution comparison section',
        settings: [
          { label: 'Section Title', type: 'text', value: 'The Shift in Management', description: 'Section title' },
          { label: 'Problem 1', type: 'text', value: 'Fragmented data across disconnected platforms', description: 'First problem' },
          { label: 'Solution 1', type: 'text', value: 'Unified ecosystem with real-time sync', description: 'First solution' },
          { label: 'Problem 2', type: 'text', value: 'Manual, error-prone entry', description: 'Second problem' },
          { label: 'Solution 2', type: 'text', value: 'Intelligent automation', description: 'Second solution' },
          { label: 'Problem 3', type: 'text', value: 'Clunky interfaces', description: 'Third problem' },
          { label: 'Solution 3', type: 'text', value: 'Clean, developer-crafted UI', description: 'Third solution' },
        ]
      },
      {
        id: 'stack',
        title: 'Tech Stack',
        icon: 'code',
        description: 'Technology stack display',
        settings: [
          { label: 'Section Title', type: 'text', value: 'Built on a Modern Stack', description: 'Tech stack section title' },
          { label: 'Tech 1', type: 'text', value: 'React + Vite', description: 'First technology' },
          { label: 'Tech 2', type: 'text', value: 'Django REST Framework', description: 'Second technology' },
          { label: 'Tech 3', type: 'text', value: 'MySQL', description: 'Third technology' },
          { label: 'Tech 4', type: 'text', value: 'Redis', description: 'Fourth technology' },
          { label: 'Tech 5', type: 'text', value: 'Docker + AWS', description: 'Fifth technology' },
          { label: 'Tech 6', type: 'text', value: 'GitHub Actions', description: 'Sixth technology' },
        ]
      },
      {
        id: 'timeline',
        title: 'Timeline',
        icon: 'timeline',
        description: 'Company timeline section',
        settings: [
          { label: 'Section Title', type: 'text', value: 'From First Commit to 500 Schools', description: 'Timeline section title' },
          { label: 'Timeline 1 Year', type: 'text', value: '2023', description: 'First timeline year' },
          { label: 'Timeline 1 Title', type: 'text', value: 'Problem Identified', description: 'First timeline title' },
          { label: 'Timeline 1 Description', type: 'textarea', value: 'A dev team noticed school management ran on spreadsheets.', description: 'First timeline description' },
          { label: 'Timeline 2 Year', type: 'text', value: '2024 Q1', description: 'Second timeline year' },
          { label: 'Timeline 2 Title', type: 'text', value: 'First Commit', description: 'Second timeline title' },
          { label: 'Timeline 2 Description', type: 'textarea', value: 'Skoolnet v0.1 was a single-module attendance tracker.', description: 'Second timeline description' },
          { label: 'Timeline 3 Year', type: 'text', value: '2024 Q3', description: 'Third timeline year' },
          { label: 'Timeline 3 Title', type: 'text', value: 'Platform Expanded', description: 'Third timeline title' },
          { label: 'Timeline 3 Description', type: 'textarea', value: 'Fee management, student portals, and analytics shipped.', description: 'Third timeline description' },
          { label: 'Timeline 4 Year', type: 'text', value: '2025', description: 'Fourth timeline year' },
          { label: 'Timeline 4 Title', type: 'text', value: 'Scaling', description: 'Fourth timeline title' },
          { label: 'Timeline 4 Description', type: 'textarea', value: 'Crossed 500 schools and 1.2M students managed.', description: 'Fourth timeline description' },
        ]
      },
      {
        id: 'team',
        title: 'Team',
        icon: 'groups',
        description: 'Team members display',
        settings: [
          { label: 'Section Title', type: 'text', value: 'The Engineers Behind Skoolnet', description: 'Team section title' },
          { label: 'Team Member 1 Name', type: 'text', value: 'Danish Farhan', description: 'First team member name' },
          { label: 'Team Member 1 Role', type: 'text', value: 'Founder & Lead Engineer', description: 'First team member role' },
          { label: 'Team Member 2 Name', type: 'text', value: 'Arjun Mehta', description: 'Second team member name' },
          { label: 'Team Member 2 Role', type: 'text', value: 'Backend Architect', description: 'Second team member role' },
          { label: 'Team Member 3 Name', type: 'text', value: 'Sana Qureshi', description: 'Third team member name' },
          { label: 'Team Member 3 Role', type: 'text', value: 'Frontend Engineer', description: 'Third team member role' },
          { label: 'Team Member 4 Name', type: 'text', value: 'Ravi Sharma', description: 'Fourth team member name' },
          { label: 'Team Member 4 Role', type: 'text', value: 'DevOps & Infrastructure', description: 'Fourth team member role' },
        ]
      },
      {
        id: 'values',
        title: 'Values',
        icon: 'verified',
        description: 'Company values section',
        settings: [
          { label: 'Section Title', type: 'text', value: 'Our Engineering Values', description: 'Values section title' },
          { label: 'Value 1 Title', type: 'text', value: 'Code-first Thinking', description: 'First value title' },
          { label: 'Value 1 Description', type: 'textarea', value: 'Every product decision starts with engineering.', description: 'First value description' },
          { label: 'Value 2 Title', type: 'text', value: 'Education is the Mission', description: 'Second value title' },
          { label: 'Value 2 Description', type: 'textarea', value: 'We build Skoolnet because we believe good software changes how institutions operate.', description: 'Second value description' },
          { label: 'Value 3 Title', type: 'text', value: 'Ship Iteratively', description: 'Third value title' },
          { label: 'Value 3 Description', type: 'textarea', value: 'We prefer working software over perfect plans.', description: 'Third value description' },
          { label: 'Value 4 Title', type: 'text', value: 'Privacy by Design', description: 'Fourth value title' },
          { label: 'Value 4 Description', type: 'textarea', value: 'Student data is sacred. We enforce FERPA-compliant handling.', description: 'Fourth value description' },
        ]
      },
      {
        id: 'cta',
        title: 'CTA',
        icon: 'ads_click',
        description: 'Call-to-action section at bottom',
        settings: [
          { label: 'CTA Title', type: 'text', value: 'Want to contribute or partner?', description: 'CTA section title' },
          { label: 'CTA Description', type: 'textarea', value: "We're always open to passionate devs and educators.", description: 'CTA section description' },
          { label: 'Primary Button', type: 'text', value: 'Get Started Free', description: 'Primary button text' },
          { label: 'Primary Link', type: 'text', value: '/pricing', description: 'Primary button URL' },
          { label: 'Secondary Button', type: 'text', value: 'Contact Us', description: 'Secondary button text' },
          { label: 'Secondary Link', type: 'text', value: '/contact', description: 'Secondary button URL' },
        ]
      },
    ]
  },
  {
    title: 'Contact Page',
    description: 'Configure contact information and form settings',
    icon: 'contact_mail',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        icon: 'campaign',
        description: 'Main landing area with title and stats',
        settings: [
          { label: 'Hero Eyebrow', type: 'text', value: "We're here to help 24/7", description: 'Hero eyebrow text' },
          { label: 'Hero Title', type: 'text', value: 'Get in Touch', description: 'Hero main title' },
          { label: 'Hero Description', type: 'textarea', value: 'Our team of educational technology experts is ready to help.', description: 'Hero description text' },
          { label: 'Stat 1 Label', type: 'text', value: '24/7', description: 'First stat label' },
          { label: 'Stat 1 Value', type: 'text', value: 'Support Available', description: 'First stat value' },
          { label: 'Stat 2 Label', type: 'text', value: '<1hr', description: 'Second stat label' },
          { label: 'Stat 2 Value', type: 'text', value: 'Response Time', description: 'Second stat value' },
          { label: 'Stat 3 Label', type: 'text', value: '500+', description: 'Third stat label' },
          { label: 'Stat 3 Value', type: 'text', value: 'Happy Schools', description: 'Third stat value' },
        ]
      },
      {
        id: 'methods',
        title: 'Contact Methods',
        icon: 'contact_phone',
        description: 'Quick contact options',
        settings: [
          { label: 'Section Title', type: 'text', value: 'Quick Contact Options', description: 'Contact methods section title' },
          { label: 'Method 1 Title', type: 'text', value: 'Email', description: 'First contact method title' },
          { label: 'Method 1 Description', type: 'text', value: 'Get a response within 24 hours', description: 'First method description' },
          { label: 'Method 1 Action', type: 'text', value: 'support@skoolnet.ai', description: 'First method action' },
          { label: 'Method 2 Title', type: 'text', value: 'Phone', description: 'Second contact method title' },
          { label: 'Method 2 Description', type: 'text', value: 'Mon-Fri: 9am - 6pm EST', description: 'Second method description' },
          { label: 'Method 2 Action', type: 'text', value: '+1 (555) 000-1234', description: 'Second method action' },
          { label: 'Method 3 Title', type: 'text', value: 'Demo', description: 'Third contact method title' },
          { label: 'Method 3 Description', type: 'text', value: '30-minute guided tour', description: 'Third method description' },
          { label: 'Method 3 Action', type: 'text', value: 'Book a Call', description: 'Third method action' },
        ]
      },
      {
        id: 'office',
        title: 'Office Info',
        icon: 'location_on',
        description: 'Office location and hours',
        settings: [
          { label: 'Section Title', type: 'text', value: 'Visit Our Office', description: 'Office info section title' },
          { label: 'Office Title', type: 'text', value: 'Silicon Valley Headquarters', description: 'Office name' },
          { label: 'Office Address', type: 'textarea', value: '101 Innovation Way, Silicon Valley, CA 94025', description: 'Office address' },
          { label: 'Hours Weekday', type: 'text', value: 'Monday - Friday: 9:00 AM - 6:00 PM', description: 'Weekday hours' },
          { label: 'Hours Saturday', type: 'text', value: 'Saturday: 10:00 AM - 2:00 PM', description: 'Saturday hours' },
          { label: 'Hours Sunday', type: 'text', value: 'Sunday: Closed', description: 'Sunday hours' },
        ]
      },
      {
        id: 'quick',
        title: 'Quick Help',
        icon: 'help',
        description: 'Quick help section',
        settings: [
          { label: 'Section Title', type: 'text', value: 'Need Quick Help?', description: 'Quick help section title' },
          { label: 'Section Description', type: 'textarea', value: 'Check our help center or schedule a demo.', description: 'Quick help description' },
          { label: 'Primary Button', type: 'text', value: 'Visit Help Center', description: 'Primary button text' },
          { label: 'Primary Link', type: 'text', value: '/about', description: 'Primary button URL' },
          { label: 'Secondary Button', type: 'text', value: 'Schedule Demo', description: 'Secondary button text' },
          { label: 'Secondary Link', type: 'text', value: '/contact', description: 'Secondary button URL' },
        ]
      },
      {
        id: 'map',
        title: 'Map Section',
        icon: 'map',
        description: 'Office map section',
        settings: [
          { label: 'Location Title', type: 'text', value: 'Visit Our Silicon Valley Office', description: 'Map location title' },
          { label: 'Get Directions Button', type: 'text', value: 'Get Directions', description: 'Directions button text' },
          { label: 'Schedule Visit Button', type: 'text', value: 'Schedule Visit', description: 'Visit button text' },
        ]
      },
    ]
  },
  {
    title: 'SEO',
    description: 'Manage SEO settings for all landing pages',
    icon: 'search',
    sections: [
      {
        id: 'home',
        title: 'Home Page SEO',
        icon: 'home',
        description: 'SEO settings for Home Page',
        settings: [
          { label: 'Page Title', type: 'text', value: 'Skoolnet - School Management Software', description: 'Browser tab title' },
          { label: 'Meta Description', type: 'textarea', value: 'Skoolnet is a comprehensive school management software for modern institutions.', description: 'Meta description for search engines' },
          { label: 'Meta Keywords', type: 'text', value: 'school management, education software, student management system', description: 'Comma-separated keywords' },
          { label: 'OG Title', type: 'text', value: 'Skoolnet - Manage Your School Smartly', description: 'Open Graph title' },
          { label: 'OG Description', type: 'textarea', value: 'Transform your institution into a high-performance digital ecosystem.', description: 'Open Graph description' },
          { label: 'Canonical URL', type: 'text', value: 'https://skoolnet.ai', description: 'Canonical URL' },
          { label: 'No Index', type: 'toggle', enabled: false, description: 'Prevent search engines from indexing' },
        ]
      },
      {
        id: 'services',
        title: 'Services Page SEO',
        icon: 'category',
        description: 'SEO settings for Services Page',
        settings: [
          { label: 'Page Title', type: 'text', value: 'Skoolnet Services - Educational Software Solutions', description: 'Browser tab title' },
          { label: 'Meta Description', type: 'textarea', value: 'Explore Skoolnet educational software services for schools.', description: 'Meta description for search engines' },
          { label: 'Meta Keywords', type: 'text', value: 'school software, education technology, fee management', description: 'Comma-separated keywords' },
          { label: 'OG Title', type: 'text', value: 'Skoolnet Services - Everything Your School Needs', description: 'Open Graph title' },
          { label: 'OG Description', type: 'textarea', value: 'Deploy a comprehensive ecosystem built for modern institutions.', description: 'Open Graph description' },
          { label: 'Canonical URL', type: 'text', value: 'https://skoolnet.ai/services', description: 'Canonical URL' },
          { label: 'No Index', type: 'toggle', enabled: false, description: 'Prevent search engines from indexing' },
        ]
      },
      {
        id: 'about',
        title: 'About Page SEO',
        icon: 'info',
        description: 'SEO settings for About Page',
        settings: [
          { label: 'Page Title', type: 'text', value: 'About Skoolnet - Developer Team Behind Skoolnet', description: 'Browser tab title' },
          { label: 'Meta Description', type: 'textarea', value: 'Learn about the developer team behind Skoolnet school management software.', description: 'Meta description for search engines' },
          { label: 'Meta Keywords', type: 'text', value: 'about skoolnet, school software company, edtech', description: 'Comma-separated keywords' },
          { label: 'OG Title', type: 'text', value: 'Meet the Skoolnet Team', description: 'Open Graph title' },
          { label: 'OG Description', type: 'textarea', value: "We're a small, focused engineering team who felt the pain of broken school management first-hand.", description: 'Open Graph description' },
          { label: 'Canonical URL', type: 'text', value: 'https://skoolnet.ai/about', description: 'Canonical URL' },
          { label: 'No Index', type: 'toggle', enabled: false, description: 'Prevent search engines from indexing' },
        ]
      },
      {
        id: 'contact',
        title: 'Contact Page SEO',
        icon: 'contact_mail',
        description: 'SEO settings for Contact Page',
        settings: [
          { label: 'Page Title', type: 'text', value: 'Contact Skoolnet - Get in Touch', description: 'Browser tab title' },
          { label: 'Meta Description', type: 'textarea', value: 'Contact Skoolnet for school management software demos and support.', description: 'Meta description for search engines' },
          { label: 'Meta Keywords', type: 'text', value: 'contact skoolnet, school software support, demo request', description: 'Comma-separated keywords' },
          { label: 'OG Title', type: 'text', value: 'Contact Skoolnet - We Are Here to Help', description: 'Open Graph title' },
          { label: 'OG Description', type: 'textarea', value: 'Our team of educational technology experts is ready to help you.', description: 'Open Graph description' },
          { label: 'Canonical URL', type: 'text', value: 'https://skoolnet.ai/contact', description: 'Canonical URL' },
          { label: 'No Index', type: 'toggle', enabled: false, description: 'Prevent search engines from indexing' },
        ]
      },
      {
        id: 'global',
        title: 'Global SEO',
        icon: 'language',
        description: 'Global SEO settings for entire site',
        settings: [
          { label: 'Site Name', type: 'text', value: 'Skoolnet', description: 'Organization/site name' },
          { label: 'Site URL', type: 'text', value: 'https://skoolnet.ai', description: 'Main site URL' },
          { label: 'Default OG Image', type: 'text', value: '/og-image.png', description: 'Default Open Graph image URL' },
          { label: 'Twitter Handle', type: 'text', value: '@skoolnet', description: 'Twitter username' },
          { label: 'Schema Type', type: 'select', value: 'SoftwareApplication', options: ['SoftwareApplication', 'Education', 'Business', 'Organization'], description: 'Schema.org type' },
          { label: 'Google Analytics ID', type: 'text', value: '', description: 'Google Analytics tracking ID (optional)' },
          { label: 'Enable Breadcrumbs', type: 'toggle', enabled: true, description: 'Enable breadcrumb structured data' },
        ]
      },
    ]
  },
];

const settingsCategories = [
  {
    title: 'Landing Website',
    description: 'Manage landing page content and settings',
    icon: 'language',
    settings: []
  },
  {
    title: 'Branding',
    description: 'Customize logo, colors, and brand identity',
    icon: 'palette',
    settings: [
      { label: 'Site Name', type: 'text', value: 'Skoolnet', description: 'Organization name' },
      { label: 'Logo', type: 'text', value: '/logo.svg', description: 'Logo file path' },
      { label: 'Favicon', type: 'text', value: '/favicon.ico', description: 'Favicon file path' },
      { label: 'Primary Color', type: 'text', value: '#0052FF', description: '_primary brand color' },
      { label: 'Accent Color', type: 'text', value: '#00D4AA', description: 'Secondary brand color' },
      { label: 'Font Family', type: 'text', value: 'Inter, system-ui', description: 'Primary font family' },
    ]
  },
  // {
  //   title: 'Email',
  //   description: 'Configure email templates and settings',
  //   icon: 'mail',
  //   settings: [
  //     { label: 'Sender Name', type: 'text', value: 'Skoolnet', description: 'Email sender name' },
  //     { label: 'Sender Email', type: 'text', value: 'noreply@skoolnet.ai', description: 'Email sender address' },
  //     { label: 'Support Email', type: 'text', value: 'support@skoolnet.ai', description: 'Support email address' },
  //     { label: 'Enable Welcome Email', type: 'toggle', enabled: true, description: 'Send welcome email to new users' },
  //     { label: 'Enable Password Reset', type: 'toggle', enabled: true, description: 'Allow password reset emails' },
  //   ]
  // },
  {
    title: 'Social Media',
    description: 'Manage social media links and sharing',
    icon: 'share',
    settings: [
      { label: 'Facebook URL', type: 'text', value: '', description: 'Facebook page URL' },
      { label: 'Twitter URL', type: 'text', value: '', description: 'Twitter profile URL' },
      { label: 'LinkedIn URL', type: 'text', value: '', description: 'LinkedIn page URL' },
      { label: 'Instagram URL', type: 'text', value: '', description: 'Instagram profile URL' },
      { label: 'YouTube URL', type: 'text', value: '', description: 'YouTube channel URL' },
    ]
  },
  // {
  //   title: 'Integrations',
  //   description: 'Connect third-party services and APIs',
  //   icon: 'extension',
  //   settings: [
  //     { label: 'Google OAuth', type: 'toggle', enabled: false, description: 'Enable Google login' },
  //     { label: 'Google Client ID', type: 'text', value: '', description: 'Google OAuth client ID' },
  //     { label: 'Stripe Key', type: 'text', value: '', description: 'Stripe publishable key' },
  //     { label: 'Webhook URL', type: 'text', value: '', description: 'Webhook endpoint URL' },
  //     { label: 'API Key', type: 'text', value: '', description: 'REST API key' },
  //   ]
  // },
  {
    title: 'Analytics',
    description: 'Configure analytics and tracking',
    icon: 'analytics',
    settings: [
      { label: 'Google Analytics ID', type: 'text', value: '', description: 'GA4 measurement ID' },
      { label: 'Enable Tracking', type: 'toggle', enabled: true, description: 'Enable analytics tracking' },
      { label: 'IP Anonymization', type: 'toggle', enabled: true, description: 'Anonymize user IP addresses' },
    ]
  },
  {
    title: 'Legal',
    description: 'Legal pages and compliance settings',
    icon: 'gavel',
    settings: [
      { label: 'Enable Privacy Policy', type: 'toggle', enabled: true, description: 'Show privacy policy page' },
      { label: 'Privacy Policy Link', type: 'text', value: '/privacy', description: 'Privacy policy page URL' },
      { label: 'Enable Terms of Service', type: 'toggle', enabled: true, description: 'Show terms of service' },
      { label: 'Terms Link', type: 'text', value: '/terms', description: 'Terms of service URL' },
      { label: 'Cookie Consent', type: 'toggle', enabled: true, description: 'Show cookie consent banner' },
    ]
  },
  {
    title: 'Announcement',
    description: 'Site-wide announcements and banners',
    icon: 'campaign',
    settings: [
      { label: 'Enable Banner', type: 'toggle', enabled: false, description: 'Show announcement banner' },
      { label: 'Banner Text', type: 'text', value: '', description: 'Banner message text' },
      { label: 'Banner Link', type: 'text', value: '', description: 'Banner link URL (optional)' },
      { label: 'Banner Style', type: 'select', value: 'info', options: ['Info', 'Success', 'Warning', 'Error'], description: 'Banner color style' },
    ]
  },
  {
    title: 'Security Settings',
    description: 'Configure security policies and access controls',
    icon: 'security',
    settings: [
      { label: 'Two-factor authentication', type: 'toggle', enabled: true, description: 'Require 2FA for admin users' },
      { label: 'Session timeout', type: 'select', value: '30 minutes', options: ['15 minutes', '30 minutes', '1 hour', '2 hours'], description: 'Auto-logout inactive users' },
    ]
  },
];

export default function ManagerSettings() {
  const [activeCategory, setActiveCategory] = useState(settingsCategories[1]);
  const [activeLandingCategory, setActiveLandingCategory] = useState(landingSettingsCategories[0]);
  const [activeHomeSection, setActiveHomeSection] = useState(landingSettingsCategories[0]?.sections?.[0] || null);
  const [settings, setSettings] = useState(
    settingsCategories.reduce((acc, category) => {
      category.settings?.forEach(setting => {
        acc[setting.label] = setting.type === 'toggle' ? setting.enabled : setting.value;
      });
      return acc;
    }, {})
  );
  const [landingSettings, setLandingSettings] = useState(() => {
    const initial = {};
    landingSettingsCategories.forEach(category => {
      category.sections?.forEach(section => {
        section.settings.forEach(setting => {
          initial[setting.label] = setting.type === 'toggle' ? setting.enabled : setting.value;
        });
      });
      category.settings?.forEach(setting => {
        initial[setting.label] = setting.type === 'toggle' ? setting.enabled : setting.value;
      });
    });
    return initial;
  });

  const handleSettingChange = (label, value) => {
    setSettings(prev => ({ ...prev, [label]: value }));
  };

  const handleLandingSettingChange = (label, value) => {
    setLandingSettings(prev => ({ ...prev, [label]: value }));
  };

  const renderSettingInput = (setting, value, onChange) => {
    switch (setting.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(setting.label, e.target.value)}
            className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            placeholder={`Enter ${setting.label.toLowerCase()}`}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(setting.label, e.target.value)}
            className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none bg-white"
            rows={2}
            placeholder={`Enter ${setting.label.toLowerCase()}`}
          />
        );
      case 'select':
        return (
          <Dropdown
            value={value}
            onChange={(val) => onChange(setting.label, val)}
            options={setting.options?.map(opt => ({ label: opt, value: opt }))}
            placeholder={`Select ${setting.label.toLowerCase()}`}
            className="min-w-[120px] md:min-w-40 capitalize"
          />
        );
      case 'toggle':
        return (
          <button
            onClick={() => onChange(setting.label, !value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary' : 'bg-slate-200'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${value ? 'translate-x-5' : 'translate-x-1'}`}
            />
          </button>
        );
      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => onChange(setting.label, parseInt(e.target.value))}
            className="w-20 md:w-28 px-3 md:px-4 py-2 md:py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          />
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    if (!activeHomeSection) return null;
    
    if (activeLandingCategory.title === 'Services Page') {
      return (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-4 md:px-6 py-2 md:py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-500 font-mono ml-2 hidden sm:block">skoolnet.ai/services</span>
            </div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Preview
            </span>
          </div>
          <div className="p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-[280px]">
            {activeHomeSection.id === 'hero' && (
              <div className="text-center max-w-2xl mx-auto py-4 md:py-8">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4">
                  {landingSettings['Page Title'] || 'Educational Intelligence Redefined.'}
                </h2>
                <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 max-w-lg mx-auto">
                  {landingSettings['Page Description'] || 'Deploy a comprehensive ecosystem...'}
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  <span className="px-4 md:px-6 py-2 md:py-3 bg-primary text-white font-semibold rounded-xl text-sm">
                    {landingSettings['Primary CTA Button'] || 'Get Started Free'}
                  </span>
                  <span className="px-4 md:px-6 py-2 md:py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl text-sm">
                    {landingSettings['Secondary CTA Button'] || 'View Pricing'}
                  </span>
                </div>
              </div>
            )}
            {activeHomeSection.id === 'featured' && (
              <div className="bg-primary rounded-xl p-4 md:p-8 text-white flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 mb-3 md:mb-4 w-fit">
                    <AppIcon name="star" size={13} className="text-white" />
                    <span className="text-xs font-semibold text-white uppercase">Featured Service</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3">{landingSettings['Featured Title'] || 'Fee Management'}</h3>
                  <p className="text-white/80 mb-3 md:mb-4 max-w-md">{landingSettings['Featured Description'] || 'A secure financial gateway...'}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                    {[landingSettings['Feature 1'], landingSettings['Feature 2'], landingSettings['Feature 3'], landingSettings['Feature 4']].filter(Boolean).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/85 text-sm">
                        <AppIcon name="check_circle" size={14} className="text-white" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="px-4 md:px-6 py-2 md:py-2.5 bg-white text-primary rounded-lg font-semibold text-sm">
                    {landingSettings['Button Text'] || 'Explore Fee Management'}
                  </span>
                </div>
                <div className="w-full md:w-48 lg:w-64 h-24 md:h-40 bg-white/10 rounded-xl flex items-center justify-center">
                  <AppIcon name="payments" size={32} className="text-white/50" />
                </div>
              </div>
            )}
            {activeHomeSection.id === 'services' && (
              <div>
                <div className="text-center mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900">{landingSettings['Section Title'] || 'Everything Your School Needs'}</h3>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-3 md:mb-4">
                  {['All', 'Administration', 'Academics', 'Finance', 'Communication'].map((cat, i) => (
                    <span key={cat} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium ${i === 0 ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {['School Management', 'Coaching Management', 'Attendance', 'Student Dashboard', 'Performance Analytics', 'Communication Hub'].map((s, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 md:p-4 border border-slate-200">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                        <AppIcon name="school" size={16} className="text-primary" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1 text-sm md:text-base">{s}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">Centralise every administrative operation...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeHomeSection.id === 'capabilities' && (
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6 text-center">
                  {landingSettings['Section Title'] || 'Built for scale, designed for simplicity.'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[1,2,3,4,5,6,7,8].map((i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 md:p-4 border border-slate-200">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <AppIcon name="check" size={16} className="text-primary" />
                      </div>
                      <span className="text-sm text-slate-700">
                        {landingSettings[`Capability ${i}`] || `Capability ${i}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeHomeSection.id === 'cta' && (
              <div className="bg-white rounded-xl p-4 md:p-8 border border-slate-200 text-center">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 md:mb-3">
                  {landingSettings['CTA Title'] || 'Not sure which plan fits your school?'}
                </h3>
                <p className="text-slate-600 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
                  {landingSettings['CTA Description'] || 'Our team will walk you through every module.'}
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  <span className="px-4 md:px-6 py-2 md:py-3 bg-primary text-white font-semibold rounded-xl text-sm">
                    {landingSettings['Primary Button'] || 'Book a Free Demo'}
                  </span>
                  <span className="px-4 md:px-6 py-2 md:py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl text-sm">
                    {landingSettings['Secondary Button'] || 'Contact Sales'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeLandingCategory.title === 'About Page') {
      const previewUrl = 'skoolnet.ai/about';
      return (
        <div className="mt-6 bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-500 font-mono ml-2">{previewUrl}</span>
            </div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {activeHomeSection.title} Preview
            </span>
          </div>
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-[280px]">
            {activeHomeSection.id === 'hero' && (
              <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 mb-4 w-fit">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-primary uppercase">{landingSettings['Hero Eyebrow'] || 'Built by Developers'}</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">
                  {landingSettings['Hero Title'] || 'The Developer Team Behind Skoolnet.'}
                </h2>
                <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed mb-6">
                  {landingSettings['Hero Subtitle'] || "We're a small, focused team..."}
                </p>
                <div className="flex justify-center gap-4">
                  <span className="px-6 py-3 bg-primary text-white font-semibold rounded-xl text-sm">
                    {landingSettings['Primary CTA Button'] || 'Get Started Free'}
                  </span>
                  <span className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl text-sm">
                    {landingSettings['Secondary CTA Button'] || 'View on GitHub'}
                  </span>
                </div>
              </div>
            )}
            {activeHomeSection.id === 'mission' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <AppIcon name="rocket_launch" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{landingSettings['Mission Title'] || 'Our Mission'}</h3>
                  <p className="text-sm text-slate-600">{landingSettings['Mission Content']?.substring(0, 100) || 'Mission statement...'}...</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <AppIcon name="visibility" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{landingSettings['Vision Title'] || 'Our Vision'}</h3>
                  <p className="text-sm text-slate-600">{landingSettings['Vision Content']?.substring(0, 100) || 'Vision statement...'}...</p>
                </div>
              </div>
            )}
            {activeHomeSection.id === 'problem' && (
              <div className="rounded-xl overflow-hidden border border-slate-200 grid grid-cols-2">
                <div className="bg-white p-6 border-r border-slate-200">
                  <h3 className="text-sm font-bold text-red-500 uppercase mb-4">The Problem</h3>
                  <ul className="space-y-2">
                    {[landingSettings['Problem 1'], landingSettings['Problem 2'], landingSettings['Problem 3']].filter(Boolean).map((p, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <AppIcon name="close" size={14} className="text-red-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary/5 p-6">
                  <h3 className="text-sm font-bold text-primary uppercase mb-4">The Solution</h3>
                  <ul className="space-y-2">
                    {[landingSettings['Solution 1'], landingSettings['Solution 2'], landingSettings['Solution 3']].filter(Boolean).map((s, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                        <AppIcon name="check" size={14} className="text-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeHomeSection.id === 'stack' && (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 text-center">{landingSettings['Section Title'] || 'Built on a Modern Stack'}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[landingSettings['Tech 1'], landingSettings['Tech 2'], landingSettings['Tech 3'], landingSettings['Tech 4'], landingSettings['Tech 5'], landingSettings['Tech 6']].filter(Boolean).map((tech, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <span className="text-sm font-semibold text-slate-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeHomeSection.id === 'timeline' && (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 text-center">{landingSettings['Section Title'] || 'Our Story'}</h3>
                <div className="space-y-3">
                  {[
                    { year: landingSettings['Timeline 1 Year'], title: landingSettings['Timeline 1 Title'] },
                    { year: landingSettings['Timeline 2 Year'], title: landingSettings['Timeline 2 Title'] },
                    { year: landingSettings['Timeline 3 Year'], title: landingSettings['Timeline 3 Title'] },
                    { year: landingSettings['Timeline 4 Year'], title: landingSettings['Timeline 4 Title'] },
                  ].filter(t => t.year).map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-slate-200">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{item.year}</span>
                      <span className="text-sm font-medium text-slate-700">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeHomeSection.id === 'team' && (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 text-center">{landingSettings['Section Title'] || 'The Team'}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: landingSettings['Team Member 1 Name'], role: landingSettings['Team Member 1 Role'] },
                    { name: landingSettings['Team Member 2 Name'], role: landingSettings['Team Member 2 Role'] },
                    { name: landingSettings['Team Member 3 Name'], role: landingSettings['Team Member 3 Role'] },
                    { name: landingSettings['Team Member 4 Name'], role: landingSettings['Team Member 4 Role'] },
                  ].filter(m => m.name).map((member, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <span className="text-sm font-bold text-primary">{member.name?.charAt(0)}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeHomeSection.id === 'values' && (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 text-center">{landingSettings['Section Title'] || 'Our Values'}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: landingSettings['Value 1 Title'], desc: landingSettings['Value 1 Description'] },
                    { title: landingSettings['Value 2 Title'], desc: landingSettings['Value 2 Description'] },
                    { title: landingSettings['Value 3 Title'], desc: landingSettings['Value 3 Description'] },
                    { title: landingSettings['Value 4 Title'], desc: landingSettings['Value 4 Description'] },
                  ].filter(v => v.title).map((value, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{value.title}</h4>
                      <p className="text-xs text-slate-500">{value.desc?.substring(0, 60) || 'Value description...'}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeHomeSection.id === 'cta' && (
              <div className="bg-primary rounded-2xl p-10 text-center shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-white mb-4">{landingSettings['CTA Title'] || 'Want to contribute?'}</h2>
                  <p className="text-white/75 text-base mb-8 max-w-md mx-auto">{landingSettings['CTA Description'] || "We're always open..."}</p>
                  <div className="flex justify-center gap-4">
                    <span className="px-8 py-3 bg-white text-primary font-bold rounded-xl text-sm">
                      {landingSettings['Primary Button'] || 'Get Started Free'}
                    </span>
                    <span className="px-8 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-xl text-sm">
                      {landingSettings['Secondary Button'] || 'Contact Us'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeLandingCategory.title === 'Contact Page') {
      const previewUrl = 'skoolnet.ai/contact';
      return (
        <div className="mt-6 bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-500 font-mono ml-2">{previewUrl}</span>
            </div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {activeHomeSection.title} Preview
            </span>
          </div>
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-[280px]">
            {activeHomeSection.id === 'hero' && (
              <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 mb-4 w-fit">
                  <AppIcon name="support_agent" size={14} className="text-primary" />
                  <span className="text-xs font-semibold text-primary">{landingSettings['Hero Eyebrow'] || "We're here to help 24/7"}</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">
                  {landingSettings['Hero Title'] || 'Get in Touch'}
                </h2>
                <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed mb-6">
                  {landingSettings['Hero Description'] || 'Our team is ready to help...'}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{landingSettings['Stat 1 Label'] || '24/7'}</div>
                    <div className="text-xs text-slate-500">{landingSettings['Stat 1 Value'] || 'Support'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{landingSettings['Stat 2 Label'] || '<1hr'}</div>
                    <div className="text-xs text-slate-500">{landingSettings['Stat 2 Value'] || 'Response'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{landingSettings['Stat 3 Label'] || '500+'}</div>
                    <div className="text-xs text-slate-500">{landingSettings['Stat 3 Value'] || 'Schools'}</div>
                  </div>
                </div>
              </div>
            )}
            {activeHomeSection.id === 'methods' && (
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 text-center">{landingSettings['Section Title'] || 'Quick Contact Options'}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { title: landingSettings['Method 1 Title'], desc: landingSettings['Method 1 Description'], action: landingSettings['Method 1 Action'] },
                    { title: landingSettings['Method 2 Title'], desc: landingSettings['Method 2 Description'], action: landingSettings['Method 2 Action'] },
                    { title: landingSettings['Method 3 Title'], desc: landingSettings['Method 3 Description'], action: landingSettings['Method 3 Action'] },
                  ].filter(m => m.title).map((method, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{method.title}</h4>
                      <p className="text-xs text-slate-500 mb-2">{method.desc}</p>
                      <span className="text-xs text-primary font-medium">{method.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeHomeSection.id === 'office' && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-4">{landingSettings['Section Title'] || 'Visit Our Office'}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AppIcon name="location_on" size={18} className="text-primary" />
                    <div>
                      <p className="font-semibold text-slate-900">{landingSettings['Office Title'] || 'Silicon Valley HQ'}</p>
                      <p className="text-sm text-slate-500">{landingSettings['Office Address'] || 'Address...'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AppIcon name="schedule" size={18} className="text-primary" />
                    <div className="text-sm text-slate-600">
                      <p>{landingSettings['Hours Weekday'] || 'Mon-Fri: 9AM - 6PM'}</p>
                      <p>{landingSettings['Hours Saturday'] || 'Sat: 10AM - 2PM'}</p>
                      <p>{landingSettings['Hours Sunday'] || 'Sun: Closed'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeHomeSection.id === 'quick' && (
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white text-center">
                <h3 className="text-xl font-black mb-2">{landingSettings['Section Title'] || 'Need Quick Help?'}</h3>
                <p className="text-white/80 mb-6 text-sm">{landingSettings['Section Description'] || 'Check our help center...'}</p>
                <div className="flex justify-center gap-3">
                  <span className="px-4 py-2 bg-white text-primary rounded-lg font-semibold text-sm">
                    {landingSettings['Primary Button'] || 'Visit Help Center'}
                  </span>
                  <span className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold text-sm border border-white/30">
                    {landingSettings['Secondary Button'] || 'Schedule Demo'}
                  </span>
                </div>
              </div>
            )}
            {activeHomeSection.id === 'map' && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-4">{landingSettings['Location Title'] || 'Visit Our Office'}</h3>
                <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <AppIcon name="map" size={32} className="text-slate-400" />
                </div>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm">
                    {landingSettings['Get Directions Button'] || 'Get Directions'}
                  </span>
                  <span className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold text-sm">
                    {landingSettings['Schedule Visit Button'] || 'Schedule Visit'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeLandingCategory.title === 'SEO') {
      const previewUrl = activeHomeSection?.id === 'home' ? 'skoolnet.ai' : activeHomeSection?.id === 'services' ? 'skoolnet.ai/services' : activeHomeSection?.id === 'about' ? 'skoolnet.ai/about' : activeHomeSection?.id === 'contact' ? 'skoolnet.ai/contact' : 'skoolnet.ai';
      return (
        <div className="mt-6 bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-500 font-mono ml-2">{previewUrl}</span>
            </div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              SEO Preview
            </span>
          </div>
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-[280px]">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <AppIcon name="search" size={12} />
                  <span>Google Search Preview</span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <div className="text-blue-600 text-xl truncate hover:underline cursor-pointer">
                    {landingSettings['Page Title'] || 'Skoolnet - School Management Software'}
                  </div>
                </div>
                <div className="text-green-700 text-sm mb-1 truncate">
                  {activeHomeSection?.id === 'home' ? 'https://skoolnet.ai' : activeHomeSection?.id === 'services' ? 'https://skoolnet.ai/services' : activeHomeSection?.id === 'about' ? 'https://skoolnet.ai/about' : activeHomeSection?.id === 'contact' ? 'https://skoolnet.ai/contact' : 'https://skoolnet.ai'}
                </div>
                <div className="text-slate-600 text-sm leading-snug">
                  {landingSettings['Meta Description']?.substring(0, 160) || 'Meta description for search engines...'}
                </div>
                {(activeHomeSection?.id === 'global' || !activeHomeSection?.id) && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <AppIcon name="settings" size={16} />
                      Global SEO Settings
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-slate-500">Site Name:</span> <span className="font-medium">{landingSettings['Site Name'] || 'Skoolnet'}</span></div>
                      <div><span className="text-slate-500">URL:</span> <span className="font-medium">{landingSettings['Site URL'] || 'https://skoolnet.ai'}</span></div>
                      <div><span className="text-slate-500">Twitter:</span> <span className="font-medium">{landingSettings['Twitter Handle'] || '@skoolnet'}</span></div>
                      <div><span className="text-slate-500">Schema:</span> <span className="font-medium">{landingSettings['Schema Type'] || 'SoftwareApplication'}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-blue-50 px-4 py-2 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <AppIcon name="share" size={12} />
                  <span>Social Media Preview (Open Graph)</span>
                </div>
              </div>
              <div className="p-4">
                <div className="h-24 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                  <AppIcon name="image" size={32} className="text-slate-300" />
                </div>
                <div className="text-slate-900 font-semibold mb-1">
                  {landingSettings['OG Title'] || 'Skoolnet'}
                </div>
                <div className="text-slate-600 text-sm">
                  {landingSettings['OG Description']?.substring(0, 100) || 'Open Graph description...'}
                </div>
                <div className="text-slate-500 text-xs mt-2">
                  skoolnet.ai
                </div>
              </div>
            </div>
            <div className="mt-4 bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AppIcon name="code" size={16} />
                Structured Data (JSON-LD)
              </h4>
              <pre className="text-xs bg-slate-800 text-green-400 p-3 rounded-lg overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "${landingSettings['Schema Type'] || 'SoftwareApplication'}",
  "name": "${landingSettings['Site Name'] || 'Skoolnet'}",
  "url": "${landingSettings['Site URL'] || 'https://skoolnet.ai'}",
  "description": "${(landingSettings['Meta Description'] || '').substring(0, 80)}..."
}`}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    // Home Page preview (existing code)
    return (
      <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-4 md:px-6 py-2 md:py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-slate-500 font-mono ml-2 hidden sm:block">skoolnet.ai</span>
          </div>
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            Preview
          </span>
        </div>
        <div className="p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-[280px]">
          {activeHomeSection.id === 'hero' && (
            <div className="bg-white rounded-xl shadow-md p-4 md:p-8 border border-slate-200 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-slate-900 mb-3">
                  {landingSettings['Hero Title'] || 'Hero Title'}
                </h2>
                <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
                  {landingSettings['Hero Subtitle'] || 'Hero Subtitle'}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <span className="px-6 py-3 bg-primary text-white font-semibold rounded-xl text-sm">
                  {landingSettings['Primary CTA Button'] || 'Primary CTA'}
                </span>
                <span className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl text-sm">
                  {landingSettings['Secondary CTA Button'] || 'Secondary CTA'}
                </span>
              </div>
            </div>
          )}
          {activeHomeSection.id === 'stats' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: landingSettings['Stat 1 Value'] || '500+', label: landingSettings['Stat 1 Label'] || 'Schools' },
                { value: landingSettings['Stat 2 Value'] || '1.2M', label: landingSettings['Stat 2 Label'] || 'Students' },
                { value: landingSettings['Stat 3 Value'] || '99.9%', label: landingSettings['Stat 3 Label'] || 'Uptime' },
                { value: landingSettings['Stat 4 Value'] || '4.9★', label: landingSettings['Stat 4 Label'] || 'Rating' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-sm">
                  <div className="text-3xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          {activeHomeSection.id === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: landingSettings['Feature 1 Title'], desc: landingSettings['Feature 1 Description'] },
                { title: landingSettings['Feature 2 Title'], desc: landingSettings['Feature 2 Description'] },
                { title: landingSettings['Feature 3 Title'], desc: landingSettings['Feature 3 Description'] },
                { title: landingSettings['Feature 4 Title'], desc: landingSettings['Feature 4 Description'] },
              ].map((feature, i) => (
                <div key={i} className={`bg-white rounded-xl p-5 border shadow-sm ${i === 1 ? 'bg-primary text-white border-primary' : 'border-slate-200'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${i === 1 ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <AppIcon name={['group', 'payments', 'how_to_reg', 'analytics'][i]} size={20} className={i === 1 ? 'text-white' : 'text-primary'} />
                  </div>
                  <h4 className={`font-bold mb-2 ${i === 1 ? 'text-white' : 'text-slate-900'}`}>{feature.title || 'Feature'}</h4>
                  <p className={`text-sm leading-relaxed ${i === 1 ? 'text-white/80' : 'text-slate-500'}`}>
                    {feature.desc?.substring(0, 80) || 'Description'}...
                  </p>
                </div>
              ))}
            </div>
          )}
          {activeHomeSection.id === 'cta' && (
            <div className="bg-primary rounded-2xl p-10 text-center shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-white mb-4">Ready to transform your school?</h2>
                <p className="text-white/75 text-base mb-8 max-w-md mx-auto">Join 500+ schools already running on Skoolnet.</p>
                <div className="flex justify-center gap-4">
                  <span className="px-8 py-3 bg-white text-primary font-bold rounded-xl text-sm">
                    {landingSettings['CTA Section Primary Button'] || 'Get Started'}
                  </span>
                  <span className="px-8 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-xl text-sm">
                    {landingSettings['CTA Section Secondary Button'] || 'Talk to Sales'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DashboardPage
      eyebrow="System configuration"
      title="Settings"
      actions={
        <>
          <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="save" size={16} />
            Save changes
          </button>
          <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="history" size={16} />
            View audit log
          </button>
        </>
      }
    >
      <MetricGrid>
        {systemStats.map((stat, index) => (
          <MetricCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            helper={stat.helper}
            tone={stat.tone}
          />
        ))}
      </MetricGrid>

      <SettingsNavigation
        categories={settingsCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="w-full">
        <div className="w-full">
          {activeCategory.title === 'Landing Website' && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-1 md:gap-2 overflow-x-auto border-b border-slate-200 pb-1 md:pb-0">
                {landingSettingsCategories.map((category) => (
                  <button
                    key={category.title}
                    onClick={() => {
                      setActiveLandingCategory(category);
                      setActiveHomeSection(category.sections?.[0] || null);
                    }}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 md:gap-2 ${
                      activeLandingCategory.title === category.title
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <AppIcon name={category.icon} size={14} />
                    <span className="hidden sm:inline">{category.title}</span>
                  </button>
                ))}
              </div>

              {(activeLandingCategory.title === 'Home Page' || activeLandingCategory.title === 'Services Page' || activeLandingCategory.title === 'About Page' || activeLandingCategory.title === 'Contact Page' || activeLandingCategory.title === 'SEO') && activeLandingCategory.sections && (
                <>
                  <div className="flex gap-1 md:gap-2 overflow-x-auto border-b border-slate-200 pb-1 md:pb-0">
                    {activeLandingCategory.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveHomeSection(section)}
                        className={`px-2.5 md:px-3 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 md:gap-2 ${
                          activeHomeSection?.id === section.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <AppIcon name={section.icon} size={12} />
                        <span className="hidden md:inline">{section.title}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 md:px-6 py-3 md:py-4 border-b border-slate-200">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                          <AppIcon name={activeHomeSection?.icon || 'article'} size={16} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-md md:text-lg font-bold text-slate-900">{activeHomeSection?.title}</h3>
                          <p className="text-xs md:text-sm text-slate-500 truncate">{activeHomeSection?.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="space-y-4 md:space-y-5">
                        {activeHomeSection?.settings?.map((setting, index) => (
                          <div key={index}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 md:p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                              <div className="flex-1 min-w-0 w-full md:w-auto">
                                <label className="font-medium text-slate-900 block mb-1">{setting.label}</label>
                                <p className="text-sm text-slate-500">{setting.description}</p>
                              </div>
                              <div className="shrink-0 w-full md:w-56 lg:w-72">
                                {renderSettingInput(setting, landingSettings[setting.label], handleLandingSettingChange)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {renderPreview()}
                </>
              )}

              {(activeLandingCategory.title === 'Home Page' || activeLandingCategory.title === 'Services Page') && (
                <SectionCard 
                  title={activeLandingCategory.title}
                  description={activeLandingCategory.description}
                >
                  <div className="space-y-6">
                    {activeLandingCategory.settings?.map((setting, index) => (
                      <div key={index}>
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0 w-full sm:w-auto">
                            <h4 className="font-medium text-slate-900 mb-1">{setting.label}</h4>
                            <p className="text-sm text-slate-500">{setting.description}</p>
                          </div>
                          <div className="w-full sm:w-56 lg:w-64 shrink-0">
                            {renderSettingInput(setting, landingSettings[setting.label], handleLandingSettingChange)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}
            </div>
          )}

          {activeCategory.title !== 'Landing Website' && (
            <SectionCard 
              title={activeCategory.title}
              description={activeCategory.description}
            >
              <div className="space-y-5">
                {activeCategory.settings?.map((setting, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 p-3 sm:p-0 rounded-xl sm:rounded-none">
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <h4 className="font-medium text-slate-900 mb-1">{setting.label}</h4>
                        <p className="text-sm text-slate-500">{setting.description}</p>
                      </div>
                      <div className="w-full sm:w-44 lg:w-56 shrink-0">
                        {renderSettingInput(setting, settings[setting.label], handleSettingChange)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </DashboardPage>
  );
}