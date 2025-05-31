
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Code, Save, Folder } from 'lucide-react';

const CodeGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [folderName, setFolderName] = useState('Default');
  const [generatedCode, setGeneratedCode] = useState('');

  // Fetch saved codes
  const { data: savedCodes, isLoading } = useQuery({
    queryKey: ['generated-codes', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generated_codes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Save code mutation
  const saveCodeMutation = useMutation({
    mutationFn: async ({ title, prompt, generatedCode, folderName }: {
      title: string;
      prompt: string;
      generatedCode: string;
      folderName: string;
    }) => {
      const { data, error } = await supabase
        .from('generated_codes')
        .insert({
          user_id: user!.id,
          title,
          prompt,
          generated_code: generatedCode,
          folder_name: folderName,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generated-codes', user?.id] });
      toast({
        title: "Success!",
        description: "Code saved successfully!",
      });
      setTitle('');
      setPrompt('');
      setGeneratedCode('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generateCode = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate code.",
        variant: "destructive",
      });
      return;
    }

    // Simulate code generation (in real app, this would call an AI API)
    const mockGeneratedCode = `// Generated code for: ${prompt}
function ${prompt.replace(/\s+/g, '')}() {
  console.log("This is generated code based on your prompt:");
  console.log("${prompt}");
  
  // Add your implementation here
  return "Hello from Smart Verse!";
}

// Example usage
${prompt.replace(/\s+/g, '')}();`;

    setGeneratedCode(mockGeneratedCode);
    
    toast({
      title: "Code Generated!",
      description: "Your code has been generated successfully.",
    });
  };

  const handleSaveCode = () => {
    if (!title.trim() || !generatedCode.trim()) {
      toast({
        title: "Error",
        description: "Please provide a title and generate code before saving.",
        variant: "destructive",
      });
      return;
    }

    saveCodeMutation.mutate({
      title,
      prompt,
      generatedCode,
      folderName,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Generation Panel */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardTitle className="flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Code Generator
            </CardTitle>
            <CardDescription className="text-purple-100">
              Enter your prompt to generate custom code
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="title">Code Title</Label>
              <Input
                id="title"
                placeholder="Give your code a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="folder">Folder Name</Label>
              <Input
                id="folder"
                placeholder="Organize your code in folders"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="prompt">Code Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Describe what you want the code to do..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button 
              onClick={generateCode}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Generate Code
            </Button>
            
            {generatedCode && (
              <div className="space-y-2">
                <Label>Generated Code</Label>
                <Textarea
                  value={generatedCode}
                  onChange={(e) => setGeneratedCode(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
                <Button 
                  onClick={handleSaveCode}
                  disabled={saveCodeMutation.isPending}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveCodeMutation.isPending ? 'Saving...' : 'Save Code'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Codes Panel */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <CardTitle className="flex items-center">
              <Folder className="w-5 h-5 mr-2" />
              Saved Codes
            </CardTitle>
            <CardDescription className="text-green-100">
              Your previously generated and saved code snippets
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-8">Loading your saved codes...</div>
            ) : savedCodes && savedCodes.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedCodes.map((code) => (
                  <Card key={code.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-purple-700">{code.title}</h3>
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                          {code.folder_name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{code.prompt}</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {code.generated_code.substring(0, 150)}...
                      </pre>
                      <p className="text-xs text-gray-500 mt-2">
                        Created: {new Date(code.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No saved codes yet. Generate and save your first code snippet!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeGenerator;
