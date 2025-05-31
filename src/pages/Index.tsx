
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import CodeGenerator from '@/components/CodeGenerator';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading Smart Verse...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <CodeGenerator />
    </div>
  );
};

export default Index;
