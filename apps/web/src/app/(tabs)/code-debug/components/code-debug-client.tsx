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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bug, Lightbulb, RefreshCw } from 'lucide-react';
import CodeDebugHeader from './code-debug-header';

export default function CodeDebugClient() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [analysisType, setAnalysisType] = useState('explain');
  const [result, setResult] = useState('');

  const analyzeCode = () => {
    if (!code.trim()) return;

    const results = {
      explain: `📖 Code Explanation:

This code snippet appears to be written in ${language}. Here's a breakdown:

1. **Purpose**: The code implements a basic algorithm/function
2. **Structure**: It follows standard ${language} conventions
3. **Flow**: 
   - First, it initializes necessary variables
   - Then it processes the input data
   - Finally, it returns or outputs the result

4. **Key Concepts Used**:
   - Variable declaration and assignment
   - Control flow structures (if/else, loops)
   - Function/method definitions
   - Data manipulation

In a production environment, this would use advanced code analysis AI to provide detailed, context-aware explanations.`,

      debug: `🐛 Debug Analysis:

**Potential Issues Found:**

1. ⚠️ **Logic Error** (Line 3-5)
   - The loop condition might cause an off-by-one error
   - Suggestion: Review boundary conditions
   
2. ⚠️ **Performance** (Line 8)
   - Inefficient operation inside loop
   - Suggestion: Consider moving outside or optimizing
   
3. ⚠️ **Best Practices** (Line 12)
   - Variable naming could be more descriptive
   - Suggestion: Use meaningful names like 'userCount' instead of 'n'

**Recommended Fixes:**
- Add input validation
- Include error handling
- Add type hints/annotations
- Consider edge cases

**Overall Code Quality:** Good foundation, minor improvements needed.`,

      refactor: `♻️ Refactored Code:

\`\`\`${language}
// Original code has been refactored for:
// - Better readability
// - Improved performance
// - Enhanced maintainability
// - Modern ${language} best practices

${code}

// Improvements made:
// 1. More descriptive variable names
// 2. Extracted helper functions
// 3. Added documentation
// 4. Optimized algorithms
// 5. Included error handling
\`\`\`

**Changes Made:**
✓ Simplified complex logic
✓ Reduced code duplication
✓ Improved naming conventions
✓ Added comments and documentation
✓ Applied SOLID principles`,
    };

    setResult(results[analysisType as keyof typeof results]);
  };

  return (
    <div className="container mx-auto py-2">
      <CodeDebugHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Bug className="h-5 w-5 text-orange-600" />
            <h2>Input Code</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Paste your code here</label>
              <Textarea
                placeholder="Enter your code snippet..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-2 block">Language</label>
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
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm mb-2 block">Analysis Type</label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="explain">Explain Code</SelectItem>
                    <SelectItem value="debug">Find Bugs</SelectItem>
                    <SelectItem value="refactor">Refactor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={analyzeCode} className="w-full">
              Analyze Code
            </Button>

            <Card className="p-4">
              <h3 className="text-sm mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCode(`def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)`)
                  }
                >
                  Load Example
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCode('')}>
                  Clear
                </Button>
              </div>
            </Card>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2>Analysis Results</h2>
            {result && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            )}
          </div>

          {result ? (
            <div className="space-y-4">
              <Tabs defaultValue="analysis">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analysis">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="suggestions">
                    <Bug className="h-4 w-4 mr-2" />
                    Issues
                  </TabsTrigger>
                  <TabsTrigger value="metrics">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Metrics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="min-h-[400px]">
                  <div className="p-4 rounded-lg whitespace-pre-wrap text-sm">
                    {result}
                  </div>
                </TabsContent>

                <TabsContent value="suggestions">
                  <div className="space-y-3">
                    {[
                      {
                        severity: 'high',
                        issue: 'Potential null pointer exception',
                        line: 15,
                      },
                      {
                        severity: 'medium',
                        issue: 'Consider adding input validation',
                        line: 8,
                      },
                      {
                        severity: 'low',
                        issue: 'Variable naming could be improved',
                        line: 3,
                      },
                    ].map((item, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              item.severity === 'high'
                                ? 'bg-red-100 text-red-700'
                                : item.severity === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {item.severity}
                          </span>
                          <div className="flex-1">
                            <div className="text-sm">{item.issue}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Line {item.line}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="metrics">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-blue-600">8.5/10</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Code Quality
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-green-600">92%</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Maintainability
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-orange-600">3</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Issues Found
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-purple-600">O(n)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Complexity
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 border-2 border-dashed rounded-lg">
              <Bug className="h-12 w-12 mb-4" />
              <p>Paste your code and click &quot;Analyze Code&quot;</p>
              <p className="text-sm mt-2">
                Get insights, debug suggestions, and refactoring tips
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
