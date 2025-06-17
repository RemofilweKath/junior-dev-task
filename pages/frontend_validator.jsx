import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function WebhookTester() {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  url = 'https://junior-dev-task-sort-string.vercel.app/';
  email = 'taeleremofilwe@gmail.com';


  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev?url=${encodeURIComponent(
          url
        )}&email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Failed to reach validation endpoint.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-4">
        <h1 className="text-xl font-semibold mb-4 text-center">Sorted-String Validator</h1>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Your deployed API URL (e.g. https://yourdomain.com/webhook)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading || !email || !url}>
            {loading ? 'Validating...' : 'Validate'}
          </Button>
          {result && (
            <div className="mt-4 text-sm bg-white p-3 rounded shadow">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}