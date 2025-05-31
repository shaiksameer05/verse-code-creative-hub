
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();

  const teamMembers = ['Sameer', 'Nikhil', 'Sandeep', 'Manisha'];

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">Smart Verse</h1>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-sm font-medium">Team:</span>
            {teamMembers.map((member, index) => (
              <span 
                key={member} 
                className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
              >
                {member}
              </span>
            ))}
          </div>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user.email}</span>
            <Button 
              onClick={signOut}
              variant="outline" 
              size="sm"
              className="text-white border-white hover:bg-white hover:text-purple-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
