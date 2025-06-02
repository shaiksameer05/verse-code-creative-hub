
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import Chatbot from '@/components/Chatbot';

const ChatbotPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-500 animate-pulse mx-auto"></div>
          </div>
          <p className="text-purple-700 font-semibold text-lg">Loading Smart Verse...</p>
          <p className="text-purple-500 text-sm mt-2">Preparing your AI workspace</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Chatbot</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have intelligent conversations with Google Gemini AI
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Chatbot />
        </div>

        <div className="text-center mt-16 pb-8">
          <p className="text-gray-500 text-sm">
            Powered by Google Gemini AI • Built with React & Supabase
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
