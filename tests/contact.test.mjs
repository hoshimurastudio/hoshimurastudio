import test from 'node:test';
import assert from 'node:assert/strict';
import {contactEndpoint,requestPayload,sendRequest} from '../dist/contact-api.js';
const endpoint='https://formspree.io/f/exampleid';
function fields(overrides={}){const values={service:'video-editing',name:'Test Client',email:'client@example.com',company:'Example',budget:'JPY 30,000',timeline:'To discuss',message:'I would like to discuss editing a short introduction video.',references:'https://example.com/reference',consent:'agreed',...overrides};const form=new FormData();for(const [key,value]of Object.entries(values))form.set(key,value);return form;}
test('only accepts a Formspree form ID URL, never an email-based endpoint',()=>{
 assert.equal(contactEndpoint(endpoint),endpoint);
 for(const value of ['', 'https://formspree.io/client@example.com','https://evil.example/f/id','http://formspree.io/f/id','https://formspree.io/f/id?email=recipient@example.com','https://user:pass@formspree.io/f/id'])assert.equal(contactEndpoint(value),null);
});
test('request contains complete project details and reply email without recipient routing fields',()=>{
 const payload=requestPayload(fields({to:'untrusted@example.com',name:'  Test Client  '}),'en');
 assert.equal(payload.name,'Test Client');assert.equal(payload.service,'Video Editing');assert.equal(payload.email,'client@example.com');assert.equal(payload.budget,'JPY 30,000');assert.equal(payload.language,'English');assert.equal(payload.references,'https://example.com/reference');assert.equal(payload.to,undefined);assert.match(payload.subject,/Video Editing/);
});
test('rejects incomplete requests, invalid email, unknown service, and missing consent',()=>{
 for(const changes of [{name:'   '},{email:'bad'},{service:'other'},{message:'short'},{consent:''}])assert.throws(()=>requestPayload(fields(changes),'ja'),/invalid/);
});
test('submits JSON to provider with the client email available for replies',async()=>{
 let captured;
 await sendRequest(endpoint,requestPayload(fields(),'ja'),{fetchImpl:async(url,options)=>{captured={url,...options};return Response.json({ok:true});}});
 assert.equal(captured.url,endpoint);assert.equal(captured.method,'POST');assert.equal(captured.credentials,'omit');assert.equal(captured.headers.Accept,'application/json');assert.equal(JSON.parse(captured.body).email,'client@example.com');
});
test('never reports success for a provider rejection, rate limit, invalid JSON or network failure',async()=>{
 for(const response of [Response.json({error:'unavailable'},{status:500}),Response.json({ok:false}),new Response('<html>error</html>',{status:200})])await assert.rejects(sendRequest(endpoint,{}, {fetchImpl:async()=>response}),/failed/);
 await assert.rejects(sendRequest(endpoint,{}, {fetchImpl:async()=>Response.json({}, {status:429})}),/limited/);
 await assert.rejects(sendRequest(endpoint,{}, {fetchImpl:async()=>{throw Error('offline')}}),/offline/);
 let calls=0;await assert.rejects(sendRequest('',{}, {fetchImpl:async()=>{calls++}}),/unavailable/);assert.equal(calls,0);
});
