import { createClient } from '@supabase/supabase-js';

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { db: { schema: 'google_request' } } as any
    );
  }
  return _client;
}

export default new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getClient() as any)[prop];
  },
});
