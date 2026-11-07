// Login helper for the content manager. Runs free on Cloudflare Workers.
// Needs three settings (Workers > this worker > Settings > Variables):
//   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET (secret), ALLOWED_ORIGINS (e.g. https://sonicsquirrels.com)
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/auth') {
      const state = crypto.randomUUID();
      const p = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, scope: 'repo', state });
      return new Response(null, { status: 302, headers: {
        Location: `https://github.com/login/oauth/authorize?${p}`,
        'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600` } });
    }
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code'), state = url.searchParams.get('state');
      const saved = (request.headers.get('Cookie') || '').match(/oauth_state=([^;]+)/);
      if (!code || !state || !saved || saved[1] !== state) return new Response('Invalid login attempt. Close this window and try again.', { status: 400 });
      const r = await fetch('https://github.com/login/oauth/access_token', { method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'sonic-squirrels-cms' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }) });
      const d = await r.json();
      const msg = d.access_token ? 'authorization:github:success:' + JSON.stringify({ token: d.access_token, provider: 'github' })
        : 'authorization:github:error:' + JSON.stringify({ message: d.error_description || 'Login failed' });
      const allowed = JSON.stringify((env.ALLOWED_ORIGINS || 'https://sonicsquirrels.com').split(',').map(s => s.trim()));
      const html = `<!doctype html><body><script>
(function(){var ok=${allowed};
function receive(e){if(ok.indexOf(e.origin)<0)return;window.opener.postMessage(${JSON.stringify(msg).replace(/</g, '\\u003c')},e.origin);window.removeEventListener('message',receive,false);}
window.addEventListener('message',receive,false);window.opener.postMessage('authorizing:github','*');})();
</script></body>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Set-Cookie': 'oauth_state=; Path=/; Max-Age=0' } });
    }
    return new Response('Sonic Squirrels content manager login helper', { status: 200 });
  }
};
