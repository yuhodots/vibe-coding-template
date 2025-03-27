import { useState } from 'react';
import { generateText, TextGenerationRequest, TextGenerationResponse } from '@/services/llm';

export default function TextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<TextGenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Omit<TextGenerationRequest, 'prompt'>>({
    model: 'gpt-3.5-turbo',
    max_tokens: 500,
    temperature: 0.7,
    provider: 'openai',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setResponse(null);

      const request: TextGenerationRequest = {
        prompt,
        ...settings
      };

      const result = await generateText(request);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Text Generation</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Prompt
          </label>
          <textarea
            id="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
              Provider
            </label>
            <select
              id="provider"
              value={settings.provider}
              onChange={(e) => handleSettingChange('provider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic (Claude)</option>
            </select>
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <select
              id="model"
              value={settings.model}
              onChange={(e) => handleSettingChange('model', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {settings.provider === 'openai' ? (
                <>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                </>
              ) : (
                <>
                  <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
                  <option value="claude-3-opus-20240229">Claude 3 Opus</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
              Temperature: {settings.temperature}
            </label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="max_tokens" className="block text-sm font-medium text-gray-700 mb-1">
              Max Tokens: {settings.max_tokens}
            </label>
            <input
              type="range"
              id="max_tokens"
              min="50"
              max="2000"
              step="50"
              value={settings.max_tokens}
              onChange={(e) => handleSettingChange('max_tokens', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Text'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Response</h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 whitespace-pre-wrap">
            {response.text}
          </div>

          <div className="mt-2 text-xs text-gray-500">
            Model: {response.model} •
            Tokens: {response.usage.total_tokens} (
            {response.usage.prompt_tokens} prompt,
            {response.usage.completion_tokens} completion)
          </div>
        </div>
      )}
    </div>
  );
}