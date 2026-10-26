export function contactEndpoint(value) {
  try {
    const url = new URL(value);
    return url.origin === 'https://formspree.io' && /^\/f\/[a-zA-Z0-9]+$/.test(url.pathname) && !url.search && !url.hash && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function requestPayload(formData, language) {
  const text = (name, max) => String(formData.get(name) || '').trim().slice(0, max);
  const service = text('service',40) === 'web-design' ? 'Web Design' : null;
  const plans = { '':'To discuss', starter:'Starter Website', standard:'Standard Website', premium:'Premium Static Website' };
  const planId = text('plan',40);
  if(!Object.hasOwn(plans,planId))throw new Error('invalid');
  const name = text('name',100), email = text('email',254), message = text('message',5000);
  if (!service || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 20 || formData.get('consent') !== 'agreed') throw new Error('invalid');
  return { name, email, service, plan:plans[planId], company:text('company',150), budget:text('budget',150), timeline:text('timeline',150), message, references:text('references',2000), consent:'Agreed to request processing', language:language === 'en' ? 'English' : 'Japanese', subject:'Hoshimura Studio | '+service+' request' };
}

export async function sendRequest(endpoint, payload, {fetchImpl=fetch, signal}={}) {
  const url=contactEndpoint(endpoint);
  if(!url)throw new Error('unavailable');
  const response=await fetchImpl(url,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal,credentials:'omit',redirect:'error'});
  const result=await response.json().catch(()=>null);
  if(response.status===429)throw new Error('limited');
  if(!response.ok || result?.ok !== true)throw new Error('failed');
}
