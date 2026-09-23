import fs from 'fs';

// playwright doesn't load .env. kept the config comment as-is and read it here.
export function qwenKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY.trim();
  if (!fs.existsSync('.env')) return '';

  const line = fs
    .readFileSync('.env', 'utf8')
    .split('\n')
    .find((row) => row.startsWith('OPENROUTER_API_KEY='));

  return line ? line.slice('OPENROUTER_API_KEY='.length).trim() : '';
}

// we only keep Good or Bad, the model sometimes adds a full stop.
export async function classifyDream(name: string) {
  const apiKey = qwenKey();
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set');

  const prompt = [
    'Classify this dream title as Good or Bad.',
    'Good means pleasant or hopeful. Bad means scary, stressful or unpleasant.',
    'Reply with one word: Good or Bad.',
    `Dream: ${name}`,
  ].join('\n');

  const res = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
        max_tokens: 10,
        reasoning: { effort: 'none' },
      }),
    },
  );
  const raw = await res.text();
  if (!res.ok) throw new Error(`openrouter ${res.status}: ${raw.slice(0, 240)}`);

  const data = JSON.parse(raw);
  const answer = data.choices?.[0]?.message?.content || '';
  const match = answer.match(/\b(Good|Bad)\b/i);
  if (!match) throw new Error(`no Good/Bad in "${answer}" for "${name}"`);

  return match[1].toLowerCase() === 'good' ? 'Good' : 'Bad';
}
