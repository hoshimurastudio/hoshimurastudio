import { FORM_ENDPOINT } from './contact-config.js';
import { contactEndpoint, requestPayload, sendRequest } from './contact-api.js';

const form=document.getElementById('contact-form');
if(form){
  const requestedPlan=new URLSearchParams(location.search).get('plan');
  if(['starter','standard','premium'].includes(requestedPlan))document.getElementById('request-plan').value=requestedPlan;
  const endpoint=contactEndpoint(FORM_ENDPOINT);
  const button=document.getElementById('request-submit'), label=document.getElementById('request-submit-label'), status=document.getElementById('contact-status'), fields=document.getElementById('request-fields');
  const messages={
    ja:{send:'相談内容を送信',sending:'送信中…',idle:'',unavailable:'フォームは準備中です。現在、このページからの送信はできません。',success:'ご相談内容を受け付けました。ご入力のメールアドレス宛にご連絡します。',invalid:'必須項目と入力内容をご確認ください。',failed:'送信を確認できませんでした。入力内容は残しています。時間をおいて再度お試しください。',limited:'現在、送信を受け付けられません。入力内容は残しています。時間をおいて再度お試しください。',timeout:'送信結果を確認できませんでした。入力内容は残しています。再送すると重複する場合があります。'},
    en:{send:'Send project request',sending:'Sending…',idle:'',unavailable:'This form is being prepared. Requests cannot be sent from this page yet.',success:'Your request has been accepted. We will reply to the email address you provided.',invalid:'Please check the required fields and your details.',failed:'We could not confirm your submission. Your details are still here. Please try again later.',limited:'Submissions are currently unavailable. Your details are still here. Please try again later.',timeout:'We could not confirm the result. Your details are still here. Sending again could create a duplicate request.'}
  };
  let state=endpoint?'idle':'unavailable', busy=false;
  const language=()=>document.documentElement.lang==='en'?'en':'ja';
  function render(){const text=messages[language()];label.textContent=busy?text.sending:text.send;button.disabled=busy||!endpoint;fields.disabled=busy;form.setAttribute('aria-busy',String(busy));status.textContent=text[state]||'';status.dataset.state=state;status.hidden=state==='idle';}
  document.querySelectorAll('[data-lang]').forEach(control=>control.addEventListener('click',render));
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(busy)return;
    if(!endpoint){state='unavailable';render();return;}
    if(!form.checkValidity()){state='invalid';render();form.reportValidity();return;}
    let payload;
    try{payload=requestPayload(new FormData(form),language());}catch{state='invalid';render();status.focus();return;}
    busy=true;state='idle';render();
    const controller=new AbortController();let timedOut=false;
    const timeout=setTimeout(()=>{timedOut=true;controller.abort();},20000);
    try{await sendRequest(endpoint,payload,{signal:controller.signal});form.reset();state='success';}
    catch(error){state=timedOut?'timeout':error.message==='limited'?'limited':'failed';}
    finally{clearTimeout(timeout);busy=false;render();status.focus();}
  });
  render();
}
