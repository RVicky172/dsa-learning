import { useState, lazy, Suspense, type ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import TopicDetail from './components/TopicDetail'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AdminDashboard from './pages/AdminDashboard'
import LoadingSpinner from './components/AppShell/LoadingSpinner'
import AppFooter from './components/AppShell/AppFooter'
import { useAuth } from './hooks/useAuth'
import './index.css'

// Lazy-load heavy components — only fetched when the user navigates to them
const BigODetail = lazy(() => import('./components/BigODetail'));
const ProblemsPage = lazy(() => import('./components/ProblemsPage'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const SubscriptionPage = lazy(() => import('./pages/Subscription'));

function App() {
  const { isAdmin } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const withMainLayout = (content: ReactNode) => (
    <main style={{ paddingTop: '5rem' }}>
      {content}
    </main>
  );

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setSelectedTopicId(null);

    // Scroll to top for section-based navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveSection('topics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine what to render based on active section
  const renderContent = () => {
    // If a specific topic is selected, show its detail page
    if (selectedTopicId) {
      return (
        <TopicDetail
          topicId={selectedTopicId}
          onBack={() => setSelectedTopicId(null)}
        />
      );
    }

    // Section-based rendering
    switch (activeSection) {
      case 'big-o':
        return withMainLayout(
          <Suspense fallback={<LoadingSpinner />}>
            <BigODetail />
          </Suspense>
        );

      case 'problems':
        return withMainLayout(
          <Suspense fallback={<LoadingSpinner />}>
            <ProblemsPage
              onGoLogin={() => handleNavigate('login')}
              onGoUpgrade={() => handleNavigate('subscription')}
            />
          </Suspense>
        );

      case 'subscription':
        return withMainLayout(
          <Suspense fallback={<LoadingSpinner />}>
            <SubscriptionPage onGoLogin={() => handleNavigate('login')} />
          </Suspense>
        );

      case 'roadmap':
        return withMainLayout(
          <Suspense fallback={<LoadingSpinner />}>
            <Roadmap onNavigateToTopic={handleTopicSelect} />
          </Suspense>
        );

      case 'topics':
        return withMainLayout(
          <Home onNavigate={handleNavigate} onTopicSelect={handleTopicSelect} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        );

      case 'login':
        return withMainLayout(
          <Login
            onSuccess={() => handleNavigate('topics')}
            onBackHome={() => handleNavigate('home')}
            onGoRegister={() => handleNavigate('register')}
            onGoForgotPassword={() => handleNavigate('forgot-password')}
          />
        );

      case 'forgot-password':
        return withMainLayout(
          <ForgotPassword onBackLogin={() => handleNavigate('login')} />
        );

      case 'register':
        return withMainLayout(
          <Register
            onSuccess={() => handleNavigate('topics')}
            onGoLogin={() => handleNavigate('login')}
            onBackHome={() => handleNavigate('home')}
          />
        );

      case 'profile':
        return withMainLayout(
          <Profile onGoToLogin={() => handleNavigate('login')} />
        );

      case 'admin':
        return withMainLayout(
          isAdmin ? (
            <AdminDashboard onGoLogin={() => handleNavigate('login')} />
          ) : (
            <Profile onGoToLogin={() => handleNavigate('login')} />
          )
        );

      default:
        // Home / Landing page — lightweight
        return withMainLayout(
          <Home onNavigate={handleNavigate} onTopicSelect={handleTopicSelect} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        );
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', paddingBottom: '8rem' }}>
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {renderContent()}

      <AppFooter onNavigate={handleNavigate} />
      <Analytics />
    </div>
  )
}

export default App
