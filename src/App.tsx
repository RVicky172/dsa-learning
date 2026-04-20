import { useState, lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import TopicDetail from './components/TopicDetail'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AdminDashboard from './pages/AdminDashboard'
import { useAuth } from './hooks/useAuth'
import './index.css'

// Lazy-load heavy components — only fetched when the user navigates to them
const BigODetail = lazy(() => import('./components/BigODetail'));
const ProblemsPage = lazy(() => import('./components/ProblemsPage'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const SubscriptionPage = lazy(() => import('./pages/Subscription'));

const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '40vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--border-color)',
      borderTop: '3px solid var(--primary-color)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Loading...</p>
  </div>
);

function App() {
  const { isAdmin } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Suspense fallback={<LoadingSpinner />}>
              <BigODetail />
            </Suspense>
          </main>
        );

      case 'problems':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Suspense fallback={<LoadingSpinner />}>
              <ProblemsPage
                onGoLogin={() => handleNavigate('login')}
                onGoUpgrade={() => handleNavigate('subscription')}
              />
            </Suspense>
          </main>
        );

      case 'subscription':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Suspense fallback={<LoadingSpinner />}>
              <SubscriptionPage onGoLogin={() => handleNavigate('login')} />
            </Suspense>
          </main>
        );

      case 'roadmap':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Suspense fallback={<LoadingSpinner />}>
              <Roadmap onNavigateToTopic={handleTopicSelect} />
            </Suspense>
          </main>
        );

      case 'topics':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Home onNavigate={handleNavigate} onTopicSelect={handleTopicSelect} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </main>
        );

      case 'login':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Login
              onSuccess={() => handleNavigate('topics')}
              onBackHome={() => handleNavigate('home')}
              onGoRegister={() => handleNavigate('register')}
              onGoForgotPassword={() => handleNavigate('forgot-password')}
            />
          </main>
        );

      case 'forgot-password':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <ForgotPassword onBackLogin={() => handleNavigate('login')} />
          </main>
        );

      case 'register':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Register
              onSuccess={() => handleNavigate('topics')}
              onGoLogin={() => handleNavigate('login')}
              onBackHome={() => handleNavigate('home')}
            />
          </main>
        );

      case 'profile':
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Profile onGoToLogin={() => handleNavigate('login')} />
          </main>
        );

      case 'admin':
        return (
          <main style={{ paddingTop: '5rem' }}>
            {isAdmin ? (
              <AdminDashboard onGoLogin={() => handleNavigate('login')} />
            ) : (
              <Profile onGoToLogin={() => handleNavigate('login')} />
            )}
          </main>
        );

      default:
        // Home / Landing page — lightweight
        return (
          <main style={{ paddingTop: '5rem' }}>
            <Home onNavigate={handleNavigate} onTopicSelect={handleTopicSelect} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </main>
        );
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', paddingBottom: '8rem' }}>
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {renderContent()}

      {/* Footer */}
      <footer className="container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <a
            href="#topics"
            onClick={(e) => { e.preventDefault(); handleNavigate('topics'); }}
            style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}
          >
            Topics
          </a>
          <a
            href="#big-o"
            onClick={(e) => { e.preventDefault(); handleNavigate('big-o'); }}
            style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}
          >
            Big O
          </a>
          <a
            href="#problems"
            onClick={(e) => { e.preventDefault(); handleNavigate('problems'); }}
            style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}
          >
            Problems
          </a>
          <a
            href="#roadmap"
            onClick={(e) => { e.preventDefault(); handleNavigate('roadmap'); }}
            style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}
          >
            Roadmap
          </a>
          <a
            href="#subscription"
            onClick={(e) => { e.preventDefault(); handleNavigate('subscription'); }}
            style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}
          >
            Upgrade
          </a>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 DSA Master. Designed for excellence.</p>
      </footer>
      <Analytics />
    </div>
  )
}

export default App
