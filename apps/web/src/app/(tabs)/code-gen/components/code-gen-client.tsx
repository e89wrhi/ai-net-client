'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy, Check, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useStreamGenerateCode } from '@/lib/api/code-gen/stream-generate';
import { CodeQualityLevel, CodeStyle } from '@/types/enums/code-gen';
import CodeGenHeader from './code-gen-header';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function CodeGenerationClient() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('python');
  const [verbosity, setVerbosity] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const codeExamples = {
    python: `def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

# Example usage
result = fibonacci(10)
print(f"Fibonacci sequence: {result}")`,
    javascript: `function fibonacci(n) {
  // Generate Fibonacci sequence up to n terms
  const sequence = [];
  let [a, b] = [0, 1];
  
  for (let i = 0; i < n; i++) {
    sequence.push(a);
    [a, b] = [b, a + b];
  }
  
  return sequence;
}

// Example usage
const result = fibonacci(10);
console.log('Fibonacci sequence:', result);`,
    java: `public class Fibonacci {
    /**
     * Generate Fibonacci sequence up to n terms
     * @param n Number of terms to generate
     * @return Array of Fibonacci numbers
     */
    public static int[] fibonacci(int n) {
        int[] sequence = new int[n];
        int a = 0, b = 1;
        
        for (int i = 0; i < n; i++) {
            sequence[i] = a;
            int temp = a + b;
            a = b;
            b = temp;
        }
        
        return sequence;
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] result = fibonacci(10);
        System.out.println("Fibonacci sequence: " + Arrays.toString(result));
    }
}`,
    cpp: `#include <iostream>
#include <vector>

// Generate Fibonacci sequence up to n terms
std::vector<int> fibonacci(int n) {
    std::vector<int> sequence;
    int a = 0, b = 1;
    
    for (int i = 0; i < n; i++) {
        sequence.push_back(a);
        int temp = a + b;
        a = b;
        b = temp;
    }
    
    return sequence;
}

// Example usage
int main() {
    auto result = fibonacci(10);
    std::cout << "Fibonacci sequence: ";
    for (int num : result) {
        std::cout << num << " ";
    }
    return 0;
}`,
  };

  const { mutateAsync: streamGenerate, isPending } = useStreamGenerateCode();

  const generateCode = async () => {
    if (!prompt.trim()) return;

    setGeneratedCode('');

    try {
      const stream = await streamGenerate({
        UserId: 'user-1', // Placeholder
        Prompt: prompt,
        Language: language,
        Quality: CodeQualityLevel.ProductionReady,
        Style: verbosity ? CodeStyle.Standard : CodeStyle.Minimal,
        IncludeComments: verbosity,
        ModelId: selectedModel,
      });

      for await (const chunk of stream) {
        setGeneratedCode((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Code generation failed:', error);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <CodeGenHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="space-y-4">
              <Textarea
                placeholder="e.g., Write a Python function to generate the Fibonacci sequence..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[300px] border-none shadow-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center gap-2 h-10">
                    <span className="text-sm">Brief</span>
                    <Switch
                      checked={verbosity}
                      onCheckedChange={setVerbosity}
                    />
                    <span className="text-sm">Detailed</span>
                  </div>
                </div>
                <Button
                  onClick={generateCode}
                  className="w-full cursor-pointer rounded-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isPending ? 'Generating Code...' : 'Generate Code'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card
          className="p-8 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Generated Code</h2>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between mb-4">
              {generatedCode && (
                <Button variant="outline" size="sm" onClick={copyCode}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>

            {generatedCode ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{generatedCode}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <Card className="p-3">
                    <div className="text-2xl text-blue-600">
                      {generatedCode.split('\n').length}
                    </div>
                    <div className="text-gray-600">Lines</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-2xl text-blue-600">{language}</div>
                    <div className="text-gray-600">Language</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-2xl text-blue-600">0.5s</div>
                    <div className="text-gray-600">Generated</div>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Test Code
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px] text-gray-400 rounded-lg">
                Your generated code will appear here
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
