
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Users, Sparkles } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();

  const teamMembers = ['Sameer', 'Nikhil', 'Sandeep', 'Manisha'];

  return (
    <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 text-white shadow-xl border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-yellow-300" />
                <div className="absolute inset-0 w-8 h-8 bg-yellow-300/20 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Smart Verse
              </h1>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-purple-100">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Team:</span>
              </div>
              <div className="flex space-x-2">
                {teamMembers.map((member, index) => (
                  <span 
                    key={member} 
                    className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/25 transition-all duration-200 border border-white/10"
                  >
                    {member}
                  </span>
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
        
        {/* Mobile Team Members */}
        <div className="lg:hidden mt-4 flex flex-wrap gap-2">
          <div className="flex items-center space-x-2 text-purple-100 text-sm">
            <Users className="w-4 h-4" />
            <span className="font-medium">Team:</span>
          </div>
          {teamMembers.map((member) => (
            <span 
              key={member} 
              className="bg-white/15 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium border border-white/10"
            >
              {member}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
