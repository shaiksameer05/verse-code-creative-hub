
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Code, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Smart Verse</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Your AI-powered workspace for intelligent conversations and code generation
          </p>
          <div className="flex items-center justify-center space-x-2 text-purple-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Powered by Google Gemini AI</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Chatbot Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <MessageCircle className="w-8 h-8" />
                  <div className="absolute inset-0 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">AI Chatbot</CardTitle>
                  <CardDescription className="text-purple-100">
                    Intelligent conversations with Gemini AI
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Engage in natural conversations with our advanced AI assistant. Get help with questions, brainstorming, problem-solving, and creative tasks.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Natural language processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Real-time responses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Context-aware conversations</span>
                </div>
              </div>
              <Button asChild className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group">
                <Link to="/chatbot">
                  Start Chatting
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Code Generator Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Code className="w-8 h-8" />
                  <div className="absolute inset-0 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Code Generator</CardTitle>
                  <CardDescription className="text-green-100">
                    AI-powered code generation and assistance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Generate code snippets, solve programming challenges, and get assistance with development tasks across multiple programming languages.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Multi-language support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Code optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Best practices guidance</span>
                </div>
              </div>
              <Button asChild className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 group">
                <Link to="/code-generator">
                  Generate Code
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Built with React & Supabase • Secure & Private
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
