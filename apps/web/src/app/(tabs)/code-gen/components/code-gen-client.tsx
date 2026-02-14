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
import { Code, Copy, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useStreamGenerateCode } from '@/lib/api/code-gen/stream-generate';
import { CodeQualityLevel, CodeStyle } from '@/types/enums/code-gen';
import CodeGenHeader from './code-gen-header';

export default function CodeGenerationClient() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('python');
  const [verbosity, setVerbosity] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
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

  return (
    <div className="container mx-auto py-2">
      <CodeGenHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-5 w-5 text-blue-600" />
            <h2>Instructions</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">
                Describe what you want to code
              </label>
              <Textarea
                placeholder="e.g., Write a Python function to generate the Fibonacci sequence..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-2 block">
                  Programming Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
                <label className="text-sm mb-2 block">Code Style</label>
                <div className="flex items-center gap-2 h-10">
                  <span className="text-sm">Brief</span>
                  <Switch checked={verbosity} onCheckedChange={setVerbosity} />
                  <span className="text-sm">Detailed</span>
                </div>
              </div>
            </div>

            <Button
              onClick={generateCode}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Generating Code...' : 'Generate Code'}
            </Button>

            <Card className="p-4">
              <h3 className="text-sm mb-2">Example Prompts</h3>
              <div className="space-y-2 text-sm">
                {[
                  'Write a function to reverse a string',
                  'Create a binary search algorithm',
                  'Implement a simple REST API endpoint',
                  'Build a class for managing a todo list',
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(example)}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2>Generated Code</h2>
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
            <div className="flex items-center justify-center min-h-[400px] text-gray-400 border-2 border-dashed rounded-lg">
              Your generated code will appear here
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
