
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Users, Sparkles, MessageCircle, Code, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const teamMembers = [
    { name: 'Sameer', role: 'Lead Developer', color: 'from-blue-500 to-cyan-500' },
    { name: 'Nikhil', role: 'Frontend Expert', color: 'from-purple-500 to-pink-500' },
    { name: 'Sandeep', role: 'Backend Specialist', color: 'from-green-500 to-emerald-500' },
    { name: 'Manisha', role: 'UI/UX Designer', color: 'from-orange-500 to-red-500' }
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
            
            {/* Enhanced Team Section for Desktop */}
            <div className="hidden xl:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-200" />
                    <span className="text-sm font-semibold text-purple-100">Our Team</span>
                  </div>
                  <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {teamMembers.map((member, index) => (
                    <div 
                      key={member.name} 
                      className="group relative bg-white/15 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/25 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{member.name}</p>
                          <p className="text-xs text-purple-200">{member.role}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Team Section for Large Screens */}
            <div className="hidden lg:block xl:hidden">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-purple-100">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Team:</span>
                </div>
                <div className="flex space-x-2">
                  {teamMembers.map((member, index) => (
                    <div 
                      key={member.name} 
                      className="group relative"
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-white text-xs font-bold shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer`}>
                        {member.name.charAt(0)}
                      </div>
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        {member.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
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
        
        {/* Enhanced Mobile Team Members */}
        <div className="lg:hidden mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-2 text-purple-100 text-sm mb-3">
              <Users className="w-4 h-4" />
              <span className="font-medium">Meet Our Team</span>
              <Star className="w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {teamMembers.map((member) => (
                <div 
                  key={member.name} 
                  className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm p-2 rounded-lg border border-white/10"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{member.name}</p>
                    <p className="text-xs text-purple-200">{member.role}</p>
                  </div>
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
