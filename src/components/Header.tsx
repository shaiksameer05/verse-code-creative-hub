
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Users, Sparkles, MessageCircle, Code } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const teamMembers = [
    { name: 'Sameer', role: 'Lead Developer' },
    { name: 'Nikhil', role: 'Frontend Expert' },
    { name: 'Sandeep', role: 'Backend Specialist' },
    { name: 'Manisha', role: 'UI/UX Designer' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 text-white shadow-xl border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-yellow-300" />
                <div className="absolute inset-0 w-8 h-8 bg-yellow-300/20 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Smart Verse
              </h1>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/chatbot">
                <Button 
                  variant="ghost" 
                  className={`text-white hover:bg-white/20 transition-all duration-200 ${
                    isActive('/chatbot') ? 'bg-white/20' : ''
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chatbot
                </Button>
              </Link>
              <Link to="/code-generator">
                <Button 
                  variant="ghost" 
                  className={`text-white hover:bg-white/20 transition-all duration-200 ${
                    isActive('/code-generator') ? 'bg-white/20' : ''
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Code Generator
                </Button>
              </Link>
            </div>
            
            {/* Team Members */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-purple-100">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Team:</span>
              </div>
              <div className="flex space-x-3">
                {teamMembers.map((member, index) => (
                  <div key={member.name} className="text-center">
                    <div className="text-xs text-purple-200">{member.name}</div>
                    <div className="text-xs text-purple-300">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-purple-100">Welcome back!</p>
                <p className="text-xs text-purple-200">{user.email}</p>
              </div>
              <Button 
                onClick={signOut}
                variant="outline" 
                size="sm"
                className="text-white border-2 border-white/30 hover:bg-white hover:text-purple-600 transition-all duration-200 backdrop-blur-sm bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex space-x-2">
          <Link to="/chatbot">
            <Button 
              variant="ghost" 
              size="sm"
              className={`text-white hover:bg-white/20 transition-all duration-200 ${
                isActive('/chatbot') ? 'bg-white/20' : ''
              }`}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
          </Link>
          <Link to="/code-generator">
            <Button 
              variant="ghost" 
              size="sm"
              className={`text-white hover:bg-white/20 transition-all duration-200 ${
                isActive('/code-generator') ? 'bg-white/20' : ''
              }`}
            >
              <Code className="w-4 h-4 mr-1" />
              Code
            </Button>
          </Link>
        </div>
        
        {/* Mobile Team Members */}
        <div className="lg:hidden mt-4">
          <div className="text-center">
            <div className="text-xs text-purple-200 mb-2">Our Team</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-purple-100">
                  <div>{member.name}</div>
                  <div className="text-purple-300">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
