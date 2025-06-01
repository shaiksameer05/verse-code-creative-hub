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
import { Code, Save, Folder, Loader2, Download, File } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const CodeGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [folderName, setFolderName] = useState('Default');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCode, setSelectedCode] = useState<any>(null);

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

  const generateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate code.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      console.log('Calling generate-code function with prompt:', prompt);
      
      const { data, error } = await supabase.functions.invoke('generate-code', {
        body: { prompt }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Generated code received:', data);
      
      if (data && data.generatedCode) {
        setGeneratedCode(data.generatedCode);
        toast({
          title: "Code Generated!",
          description: "Your code has been generated successfully using AI.",
        });
      } else {
        throw new Error('No code generated');
      }
    } catch (error: any) {
      console.error('Error generating code:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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

  const downloadCode = (code: any) => {
    const element = document.createElement('a');
    const file = new Blob([code.generated_code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${code.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: `${code.title} has been downloaded.`,
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
              AI Code Generator
            </CardTitle>
            <CardDescription className="text-purple-100">
              Enter your prompt to generate custom code using AI
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
                placeholder="Describe what you want the code to do... (e.g., 'Create a function to validate email addresses', 'Build a React component for a user profile card')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button 
              onClick={generateCode}
              disabled={isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Code...
                </>
              ) : (
                'Generate Code with AI'
              )}
            </Button>
            
            {generatedCode && (
              <div className="space-y-2">
                <Label>Generated Code</Label>
                <Textarea
                  value={generatedCode}
                  onChange={(e) => setGeneratedCode(e.target.value)}
                  rows={12}
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
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-xs text-gray-500">
                          Created: {new Date(code.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedCode(code)}
                              >
                                <File className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                              <DialogHeader>
                                <DialogTitle>{selectedCode?.title}</DialogTitle>
                                <DialogDescription>
                                  Folder: {selectedCode?.folder_name} | Created: {selectedCode?.created_at ? new Date(selectedCode.created_at).toLocaleDateString() : ''}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4">
                                <Label>Prompt:</Label>
                                <p className="text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded">
                                  {selectedCode?.prompt}
                                </p>
                                <Label>Generated Code:</Label>
                                <div className="mt-2 max-h-96 overflow-y-auto">
                                  <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm whitespace-pre-wrap">
                                    {selectedCode?.generated_code}
                                  </pre>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadCode(code)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
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
