
"use strict";
const DB_KEY="voxpilot_chairman_runtime_v3";
const SESSION_KEY="voxpilot_chairman_ai_settings";
const SYNC_KEY="voxpilot_chairman_sync_settings";
const now=()=>new Date().toISOString();
const uid=()=>crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`;
const clone=x=>JSON.parse(JSON.stringify(x));
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

const integrationCatalog={"connectors":[{"id":"autodesk","brand":"Autodesk Platform Services","category":"CAD / BIM / Manufacturing","products":["AutoCAD","Revit","Fusion","Inventor","3ds Max","Forma","Construction Cloud"],"capabilities":["Data Management","Model Derivative","Automation","Viewer","Reality Capture","Parameters"],"formats":["DWG","DXF","RVT","IFC","STEP","IGES","STL","OBJ","FBX","SVF2","PDF"],"auth":"OAuth 2.0 / service credentials","mode":"server-required","risk":"high"},{"id":"bentley","brand":"Bentley Systems","category":"Infrastructure / Digital Twin","products":["MicroStation","iTwin","OpenRoads","OpenBuildings","ProjectWise"],"capabilities":["Infrastructure models","Digital twins","Project data","Reality modeling"],"formats":["DGN","IFC","LandXML","LAS","OBJ","iModel"],"auth":"OAuth / platform credentials","mode":"server-required","risk":"high"},{"id":"dassault","brand":"Dassault Syst\u00e8mes 3DEXPERIENCE","category":"PLM / CAD / Simulation","products":["SOLIDWORKS","CATIA","SIMULIA","DELMIA","ENOVIA"],"capabilities":["CAD","PLM","Simulation","Manufacturing planning","Lifecycle governance"],"formats":["STEP","IGES","STL","3DXML","SLDPRT","CATPart"],"auth":"OAuth / enterprise tenant","mode":"server-required","risk":"high"},{"id":"siemens","brand":"Siemens Xcelerator","category":"PLM / CAD / Simulation","products":["NX","Teamcenter","Simcenter","Solid Edge","Tecnomatix"],"capabilities":["CAD/CAM","PLM","CAE","Digital manufacturing","Digital twin"],"formats":["JT","STEP","IGES","Parasolid","STL","CSV"],"auth":"Enterprise API credentials","mode":"server-required","risk":"high"},{"id":"ptc","brand":"PTC","category":"PLM / CAD / IoT","products":["Creo","Windchill","ThingWorx","Vuforia"],"capabilities":["Product design","PLM","Industrial IoT","AR work instructions"],"formats":["STEP","IGES","STL","Creo","JT","CSV"],"auth":"OAuth / enterprise credentials","mode":"server-required","risk":"high"},{"id":"ansys","brand":"Ansys","category":"Engineering Simulation","products":["Mechanical","Fluent","HFSS","LS-DYNA","Digital Twin"],"capabilities":["FEA","CFD","Electromagnetics","Explicit dynamics","Reduced-order models"],"formats":["STEP","IGES","Parasolid","STL","CSV","HDF5"],"auth":"Enterprise API / PyAnsys service","mode":"server-required","risk":"high"},{"id":"altair","brand":"Altair","category":"Engineering Simulation / Analytics","products":["HyperWorks","SimSolid","Inspire","RapidMiner"],"capabilities":["CAE","Optimization","Generative design","Data analytics"],"formats":["STEP","IGES","STL","CSV","H3D"],"auth":"Enterprise credentials","mode":"server-required","risk":"high"},{"id":"mathworks","brand":"MathWorks","category":"Modeling / Analysis","products":["MATLAB","Simulink"],"capabilities":["Numerical analysis","Control systems","Signal processing","Model-based design","Code generation"],"formats":["MAT","CSV","JSON","HDF5","FMU"],"auth":"MATLAB Production Server / enterprise credentials","mode":"server-required","risk":"high"},{"id":"hexagon","brand":"Hexagon","category":"Metrology / Geospatial / Industrial","products":["MSC Software","HxGN","Leica Geosystems","Nexus"],"capabilities":["Metrology","CAE","Reality capture","Geospatial","Manufacturing intelligence"],"formats":["STEP","IGES","LAS","E57","CSV","HDF5"],"auth":"Enterprise API credentials","mode":"server-required","risk":"high"},{"id":"trimble","brand":"Trimble","category":"Construction / Geospatial","products":["SketchUp","Trimble Connect","Tekla","Siteworks"],"capabilities":["Construction collaboration","Structural BIM","Field positioning","3D modeling"],"formats":["SKP","IFC","DWG","DXF","LandXML","CSV"],"auth":"OAuth 2.0","mode":"server-required","risk":"medium"},{"id":"esri","brand":"Esri ArcGIS","category":"GIS / Spatial Analysis","products":["ArcGIS Online","ArcGIS Enterprise","ArcGIS Pro"],"capabilities":["Maps","Feature services","Geocoding","Spatial analysis","Digital twins"],"formats":["GeoJSON","Shapefile","KML","GeoTIFF","LAS","CSV"],"auth":"OAuth 2.0 / API key","mode":"hybrid","risk":"medium"},{"id":"nvidia","brand":"NVIDIA Omniverse","category":"Digital Twin / Visualization","products":["Omniverse","USD","RTX","Isaac Sim"],"capabilities":["OpenUSD collaboration","Digital twins","Simulation","Rendering","Robotics"],"formats":["USD","USDA","USDC","USDZ","OBJ","FBX","glTF"],"auth":"Nucleus / enterprise credentials","mode":"server-required","risk":"high"},{"id":"unity","brand":"Unity","category":"Realtime 3D / XR","products":["Unity Engine","Industry","Cloud"],"capabilities":["Realtime visualization","XR","Simulation interfaces","Digital twins"],"formats":["FBX","OBJ","glTF","USD","JSON"],"auth":"Cloud / project credentials","mode":"hybrid","risk":"medium"},{"id":"unreal","brand":"Epic Games Unreal Engine","category":"Realtime 3D / Film","products":["Unreal Engine","Twinmotion","MetaHuman"],"capabilities":["Realtime rendering","Virtual production","Digital twins","Cinematics"],"formats":["FBX","USD","Datasmith","OBJ","glTF"],"auth":"Project / cloud credentials","mode":"hybrid","risk":"medium"},{"id":"blender","brand":"Blender","category":"Open 3D Creation","products":["Blender"],"capabilities":["Modeling","Animation","Rendering","Geometry Nodes","Python automation"],"formats":["BLEND","FBX","OBJ","USD","glTF","STL"],"auth":"Local automation / optional services","mode":"local-worker","risk":"medium"},{"id":"adobe","brand":"Adobe","category":"Creative / Documents","products":["Photoshop","Illustrator","InDesign","Premiere Pro","After Effects","Acrobat","Firefly","Substance 3D"],"capabilities":["Image editing","Vector automation","Document generation","Video","Generative media","PDF services","Materials"],"formats":["PSD","AI","INDD","PDF","SVG","PNG","JPG","MP4","GLB"],"auth":"OAuth / client credentials","mode":"server-required","risk":"high"},{"id":"figma","brand":"Figma","category":"Product / Interface Design","products":["Figma Design","FigJam","Dev Mode"],"capabilities":["UI design","Design systems","Prototypes","Comments","Asset export"],"formats":["FIG","SVG","PNG","PDF","JSON"],"auth":"OAuth 2.0 / token","mode":"hybrid","risk":"medium"},{"id":"miro","brand":"Miro","category":"Visual Collaboration","products":["Miro"],"capabilities":["Boards","Diagrams","Workshops","Cards","Comments"],"formats":["JSON","SVG","PDF","PNG"],"auth":"OAuth 2.0","mode":"hybrid","risk":"medium"},{"id":"microsoft","brand":"Microsoft Graph / Azure","category":"Productivity / Cloud / Engineering","products":["Microsoft 365","Teams","SharePoint","OneDrive","Power Platform","Azure DevOps","Azure AI"],"capabilities":["Files","Mail","Calendar","Teams","Identity","Workflows","DevOps","Cloud compute"],"formats":["DOCX","XLSX","PPTX","PDF","JSON","CSV"],"auth":"Microsoft Entra OAuth 2.0","mode":"server-required","risk":"high"},{"id":"google","brand":"Google Workspace / Cloud","category":"Productivity / Cloud","products":["Drive","Docs","Sheets","Gmail","Calendar","Meet","Google Cloud"],"capabilities":["Files","Documents","Mail","Calendar","Events","Cloud compute","Data"],"formats":["Google Docs","DOCX","XLSX","PDF","JSON","CSV"],"auth":"Google OAuth 2.0 / service account","mode":"server-required","risk":"high"},{"id":"github","brand":"GitHub","category":"Code / Automation","products":["Repositories","Actions","Issues","Projects","Models","Codespaces"],"capabilities":["Source control","CI/CD","Work tracking","AI inference","Packages","Pages"],"formats":["Git","Markdown","JSON","YAML","Artifacts"],"auth":"Fine-grained PAT / GitHub App","mode":"hybrid","risk":"medium"},{"id":"gitlab","brand":"GitLab","category":"Code / DevSecOps","products":["Repositories","CI/CD","Issues","Security"],"capabilities":["Source control","Pipelines","Planning","Security scanning"],"formats":["Git","Markdown","JSON","YAML","Artifacts"],"auth":"OAuth / access token","mode":"hybrid","risk":"medium"},{"id":"atlassian","brand":"Atlassian","category":"Work Management / Knowledge","products":["Jira","Confluence","Trello"],"capabilities":["Issues","Projects","Documentation","Roadmaps","Automation"],"formats":["JSON","CSV","Markdown","PDF"],"auth":"OAuth 2.0 / API token","mode":"server-required","risk":"medium"},{"id":"slack","brand":"Slack","category":"Collaboration","products":["Slack"],"capabilities":["Messages","Channels","Files","Workflows","Approvals"],"formats":["JSON","Text","Files"],"auth":"OAuth 2.0","mode":"server-required","risk":"high"},{"id":"salesforce","brand":"Salesforce","category":"CRM / Enterprise","products":["Sales Cloud","Service Cloud","Platform","MuleSoft"],"capabilities":["CRM","Cases","Opportunities","Automation","Integration"],"formats":["JSON","CSV","Documents"],"auth":"OAuth 2.0","mode":"server-required","risk":"high"},{"id":"servicenow","brand":"ServiceNow","category":"Enterprise Workflow","products":["ITSM","App Engine","CMDB"],"capabilities":["Tickets","Assets","Approvals","CMDB","Workflow"],"formats":["JSON","CSV","Attachments"],"auth":"OAuth 2.0","mode":"server-required","risk":"high"},{"id":"sap","brand":"SAP","category":"ERP / Supply Chain / PLM","products":["S/4HANA","BTP","PLM","Digital Manufacturing"],"capabilities":["ERP","BOM","Procurement","Manufacturing","Asset management"],"formats":["OData","JSON","XML","CSV","IDoc"],"auth":"OAuth / enterprise identity","mode":"server-required","risk":"high"},{"id":"oracle","brand":"Oracle","category":"ERP / Database / Cloud","products":["Fusion Cloud","Oracle Database","OCI","Primavera"],"capabilities":["ERP","Database","Projects","Cloud","Construction planning"],"formats":["JSON","CSV","SQL","XML"],"auth":"OAuth / signed requests","mode":"server-required","risk":"high"},{"id":"aws","brand":"Amazon Web Services","category":"Cloud / Data / AI","products":["S3","Lambda","Bedrock","Step Functions","IoT TwinMaker"],"capabilities":["Object storage","Serverless compute","AI","Workflow","Digital twins"],"formats":["JSON","CSV","Parquet","Artifacts"],"auth":"IAM / Cognito","mode":"server-required","risk":"high"},{"id":"azure","brand":"Microsoft Azure","category":"Cloud / AI / Digital Twin","products":["Functions","Blob Storage","AI Foundry","Digital Twins","Service Bus"],"capabilities":["Compute","Storage","AI","Events","Digital twins"],"formats":["JSON","CSV","Parquet","Artifacts"],"auth":"Entra ID / managed identity","mode":"server-required","risk":"high"},{"id":"gcp","brand":"Google Cloud","category":"Cloud / Data / AI","products":["Cloud Run","Storage","Vertex AI","BigQuery","Pub/Sub"],"capabilities":["Compute","Storage","AI","Analytics","Events"],"formats":["JSON","CSV","Parquet","Artifacts"],"auth":"OAuth / service account","mode":"server-required","risk":"high"},{"id":"snowflake","brand":"Snowflake","category":"Data Cloud","products":["Snowflake","Cortex"],"capabilities":["Warehouse","Data sharing","Analytics","AI"],"formats":["SQL","CSV","JSON","Parquet"],"auth":"OAuth / key pair","mode":"server-required","risk":"high"},{"id":"databricks","brand":"Databricks","category":"Data / AI Engineering","products":["Lakehouse","MLflow","Workflows"],"capabilities":["Data engineering","Analytics","ML lifecycle","Agent workflows"],"formats":["Delta","Parquet","JSON","CSV"],"auth":"OAuth / service principal","mode":"server-required","risk":"high"},{"id":"openai","brand":"OpenAI","category":"AI Models","products":["Responses API","Realtime API","Embeddings"],"capabilities":["Reasoning","Generation","Vision","Voice","Tool use"],"formats":["JSON","Text","Audio","Images"],"auth":"API key / OAuth where supported","mode":"server-preferred","risk":"high"},{"id":"anthropic","brand":"Anthropic","category":"AI Models","products":["Claude API"],"capabilities":["Reasoning","Long context","Tool use","Vision"],"formats":["JSON","Text","Images"],"auth":"API key","mode":"server-preferred","risk":"high"}],"workflows":[{"name":"Concept-to-Engineered Product","steps":["Figma/Miro requirements","Autodesk Fusion or Dassault/Siemens CAD","Ansys/Altair/Simcenter analysis","PLM release","Adobe documentation","GitHub audit package"],"approval":"Founder approves design freeze and release"},{"name":"Building Digital Twin","steps":["Revit/AutoCAD or Bentley authoring","IFC/APS model translation","Esri geospatial context","NVIDIA Omniverse or Unreal visualization","Azure/AWS digital-twin telemetry","Chairman executive dashboard"],"approval":"Founder approves publication and operational connection"},{"name":"Industrial Design-to-Manufacture","steps":["Adobe/Figma concept assets","Fusion/Inventor/SOLIDWORKS/CATIA design","Simulation and optimization","BOM into SAP/Oracle","Supplier package via SharePoint/Drive","Quality and metrology feedback"],"approval":"Founder approves procurement and manufacturing release"},{"name":"WonderGate Cinematic Pipeline","steps":["Chairman story and franchise brief","Adobe concept art and documents","Blender/3ds Max/Substance assets","Unreal virtual production","Premiere/After Effects finishing","GitHub versioned production ledger"],"approval":"Founder approves canonical assets and final release"},{"name":"Engineering Change Control","steps":["Issue from Jira/ServiceNow","Affected-model lookup","CAD/BIM revision","Simulation revalidation","PLM/BOM update","Teams/Slack review","Immutable decision and audit record"],"approval":"Founder or delegated engineering authority approves change"}]};
const doctrine={
 identity:"Chairman Founder Replicant",
 authority:"The Founder retains final authority over consequential actions.",
 optimization:"Increase enterprise value through revenue, margin, asset value, strategic leverage, risk reduction, capital efficiency, reduced Founder attention, or faster achievement.",
 rules:[
  "Separate verified facts from goals, hypotheses, assumptions, and unknowns.",
  "Preserve VoxPilot Nexus as the central platform.",
  "Extend the existing system rather than replacing it.",
  "Use bounded specialist consultation and preserve disagreement.",
  "Require Founder approval for consequential external actions.",
  "Prioritize iPhone-first operation, security, audit, continuity, and truthful capability claims."
 ]
};

const seed=()=>({
 version:7,initialized:false,
 founder:{name:"Lewis Franklin Feuquay",github:"Feuquay"},
 doctrine:[
 "VoxPilot Nexus is the central platform of the Sovereign Enterprise.",
 "Chairman is the persistent Founder-facing executive cognition runtime inside VoxPilot Nexus, not a generic chatbot.",
 "The runtime owns identity, continuity, doctrine, memory, decisions, approvals, permissions, enterprise state, orchestration, evidence, and audit.",
 "Reasoning models are replaceable substrates beneath VoxPilot; the enterprise owns continuity and cognition.",
 "Consequential external actions require explicit Founder approval and a durable audit record.",
 "Extend the canonical VoxPilot application rather than replacing it with disconnected prototypes.",
 "Optimize for enterprise value through revenue, margin, strategic leverage, asset value, capital efficiency, risk reduction, reduced Founder attention, and faster execution.",
 "The iPhone is the primary Founder command interface. Local-first operation and provider independence are strategic requirements.",
 "claw-code-main.zip is the locked Claude-derived engineering reference unless the Founder explicitly replaces it.",
 "Claude/Claw-derived runtime capabilities include the agent loop, tool routing, permission gates, sessions, context compression, subagents, task routing, filesystem/terminal execution patterns, provider abstraction, and worker orchestration."
 ],
 memories:[
 {id:uid(),content:"VoxPilot Nexus is the central platform of the Sovereign Enterprise.",type:"doctrine",scope:"enterprise",provenance:"Locked architecture",created_at:now()},
 {id:uid(),content:"The standalone Chairman must run locally on the Founder's iPhone by default, with optional cloud escalation rather than mandatory cloud dependence.",type:"doctrine",scope:"runtime",provenance:"Founder requirement",created_at:now()},
 {id:uid(),content:"The Chairman Runtime must preserve enterprise continuity across sessions and across changes in model provider.",type:"doctrine",scope:"runtime",provenance:"Founder requirement",created_at:now()},
 {id:uid(),content:"The canonical engineering anchor is claw-code-main.zip, treated as the Claude-derived foundation for standalone VoxPilot discussions unless explicitly replaced.",type:"fact",scope:"engineering",provenance:"Locked reference",created_at:now()},
 {id:uid(),content:"Active enterprise lanes include VoxPilot Nexus, rideshare operations, Gravity Sports Syndicate, Franklin Capital Energy, WonderGate Studios, and LifeWave/MedSpa on compliance hold.",type:"fact",scope:"enterprise",provenance:"Enterprise OS",created_at:now()},
 {id:uid(),content:"The controlling VoxPilot MVP gate requires five fields: target user, pain point, spoken command, target app/tool, and action performed.",type:"decision",scope:"voxpilot",provenance:"Q-002",created_at:now()},
 {id:uid(),content:"The Founder wants one canonical application, not repeated disconnected ZIP demonstrations.",type:"preference",scope:"engineering",provenance:"Founder correction",created_at:now()}
 ],
 ventures:[
 {id:"VOX",name:"VoxPilot Nexus",status:"active",role:"Central sovereign enterprise platform and Chairman Runtime",gate:"Complete a genuinely useful persistent standalone executive runtime and close Q-002"},
 {id:"RIDE",name:"Rideshare Operations",status:"active",role:"Current cash-generation operation",gate:"Establish true weekly net cash after all vehicle and operating costs"},
 {id:"GSS",name:"Gravity Sports Syndicate",status:"gated",role:"AI-native competitive sports and media platform",gate:"Non-wagering proof asset; wagering requires counsel"},
 {id:"FCE",name:"Franklin Capital Energy",status:"available",role:"Energy development and advisory lane",gate:"Choose a monetizable proof asset"},
 {id:"WGS",name:"WonderGate Studios",status:"available",role:"AI-native cinematic and children's media studio",gate:"Select and develop the flagship property"},
 {id:"LWM",name:"LifeWave / MedSpa",status:"hold",role:"Health and medspa venture",gate:"Medical-claims and compliance review"}
 ],
 sessions:[],decisions:[],actions:[],tasks:[],
 audit:[{id:uid(),type:"runtime_created",actor:"Founder",at:now(),detail:"VoxPilot Chairman v7 executive runtime created"}],
 chairman_lock:true
})
function mergeUniqueByContent(target,source){
 const existing=new Set(target.map(x=>String(x.content||x).toLowerCase()));
 source.forEach(x=>{const key=String(x.content||x).toLowerCase();if(!existing.has(key)){target.push(x);existing.add(key)}});
}
function migrateState(s){
 const baseline=seed();
 s.version=8;
 s.doctrine=s.doctrine||[];
 baseline.doctrine.forEach(x=>{if(!s.doctrine.includes(x))s.doctrine.push(x)});
 s.memories=s.memories||[];mergeUniqueByContent(s.memories,baseline.memories);
 s.ventures=s.ventures||[];
 baseline.ventures.forEach(v=>{
  const existing=s.ventures.find(x=>x.id===v.id||x.name===v.name);
  if(existing)Object.assign(existing,{role:v.role,gate:v.gate,status:existing.status||v.status});
  else s.ventures.push(v);
 });
 s.sessions=s.sessions||[];s.decisions=s.decisions||[];s.actions=s.actions||[];s.tasks=s.tasks||[];s.audit=s.audit||[];
 s.chairman_lock=s.chairman_lock!==false;
 return s;
}
function load(){
 try{
  const raw=localStorage.getItem(STORAGE_KEY);
  return migrateState(raw?JSON.parse(raw):seed());
 }catch{return migrateState(seed())}
}
function persist(){localStorage.setItem(DB_KEY,JSON.stringify(state))}
function loadSession(key,fallback){try{return JSON.parse(sessionStorage.getItem(key))||fallback}catch{return fallback}}
let state=load();
let ai=loadSession(SESSION_KEY,{provider:"ondevice",model:"Qwen2.5-0.5B-Instruct-q4f16_1-MLC",apiKey:"",proxyUrl:""});
let sync=loadSession(SYNC_KEY,{owner:"",repo:"voxpilot-chairman",token:"",passphrase:"",path:"private/chairman-runtime.enc.json"});
let currentSession=null;
let localEngineInstance=null;
let localEngineModel=null;
let localEngineLoading=null;
const WEBLLM_CDN="https://esm.run/@mlc-ai/web-llm";
function saveAI(){sessionStorage.setItem(SESSION_KEY,JSON.stringify(ai))}
function saveSync(){sessionStorage.setItem(SYNC_KEY,JSON.stringify(sync))}
function audit(type,detail){state.audit.unshift({id:uid(),type,actor:"Founder",at:now(),detail});persist()}
function ensureSession(){if(!currentSession){currentSession={id:uid(),title:"Executive Session",created_at:now(),messages:[]};state.sessions.unshift(currentSession);persist()}return currentSession}
function addMessage(role,content,meta={}){ensureSession().messages.push({id:uid(),role,content,meta,at:now()});persist();renderMessages()}
function relevantMemories(prompt,limit=16){
 const stop=new Set(["the","and","that","this","with","from","your","you","for","are","was","were","have","has","into","then","all","everything","chairman"]);
 const terms=String(prompt).toLowerCase().match(/[a-z0-9_-]{3,}/g)||[];
 const query=[...new Set(terms.filter(t=>!stop.has(t)))];
 return state.memories.map((m,i)=>{
  const text=`${m.content} ${m.type} ${m.scope||""} ${m.provenance||""}`.toLowerCase();
  let score=0;query.forEach(t=>{if(text.includes(t))score+=text.startsWith(t)?5:2});
  if(/recall|everything|enterprise|complete|comprehensive|deep/.test(prompt.toLowerCase()))score+=Math.max(0,10-i*.08);
  if(String(m.type).toLowerCase()==="doctrine")score+=2.5;
  if(String(m.type).toLowerCase()==="decision")score+=2;
  return {...m,_score:score};
 }).sort((a,b)=>b._score-a._score||String(b.created_at).localeCompare(String(a.created_at))).slice(0,limit);
}
function domainsFor(q){
 const rules=[
  ["Engineering & Security",/code|app|github|security|api|iphone|software|deploy|runtime/],
  ["Finance & Capital",/cash|finance|valuation|raise|investor|capital|budget|margin/],
  ["Legal & IP",/legal|patent|rights|agreement|counsel|compliance|ownership/],
  ["Fleet & Rideshare",/uber|ride|fleet|vehicle|driver|airport/],
  ["WonderGate",/movie|studio|wondergate|film|character|cinematic/],
  ["Gravity Sports",/gravity|golf|sports|game|tournament|esport/],
  ["Portfolio Strategy",/priority|enterprise|portfolio|strategy|next/]
 ];
 const out=rules.filter(([,r])=>r.test(q)).map(([n])=>n);return out.length?out:["Portfolio Strategy"];
}
function localEngine(prompt){
 const memories=relevantMemories(prompt,10);
 return {
  text:`Live Chairman is not activated on this browser session.

I preserved your command and retrieved ${memories.length} relevant Founder memory item${memories.length===1?"":"s"}, but I will not imitate live executive intelligence with a canned synthesis.

Open Settings and activate GitHub Models, or tap the Chairman status badge to enter your token.`,
  confidence:1,
  domains:["Runtime diagnostics"],
  diagnostic:true
 };
}
function systemPrompt(){
 return `You are Chairman, the persistent executive cognition runtime inside VoxPilot Nexus for Founder ${state.founder.name}.

IDENTITY
You are not a generic assistant. You are the Founder-facing executive layer of VoxPilot Nexus. Never address the Founder as Chairman. The Founder retains final authority.

RUNTIME DOCTRINE
${state.doctrine.map(x=>`- ${x}`).join("\n")}

OPERATING METHOD
1. Determine the Founder's actual objective.
2. Retrieve relevant doctrine, durable memories, venture state, decisions, approvals, tasks, audit evidence, and recent dialogue.
3. Distinguish verified fact, Founder-stated target, inference, and unknown only when material.
4. Synthesize a direct executive response.
5. Name the controlling next action when action is appropriate.
6. Never claim that an external action, connector, code merge, deployment, model, or file exists without supplied evidence.
7. Never substitute repetitive boilerplate, canned governance text, or generic advice for actual reasoning.
8. Preserve continuity and correct prior errors rather than restarting the project.
9. Be decisive and specific; go deeply when the Founder asks for comprehensive recall.
10. Consequential execution requires Founder approval and audit.

CURRENT OPTIMIZATION
Increase enterprise value through revenue, margin, strategic leverage, asset value, capital efficiency, risk reduction, reduced Founder attention, or faster execution.

When the Founder says "recall everything," produce an integrated operational reconstruction, not a vague philosophy summary.`;
}
function webGPUSupported(){return Boolean(navigator.gpu)}
function setModelProgress(progress,text){
 const bar=$("#modelProgress");if(bar)bar.style.width=`${Math.max(0,Math.min(100,progress*100))}%`;
 const status=$("#localActivationStatus");if(status&&text)status.textContent=text;
}
async function ensureLocalModel(modelId=ai.model){
 if(localEngineInstance&&localEngineModel===modelId)return localEngineInstance;
 if(localEngineLoading)return localEngineLoading;
 if(!webGPUSupported())throw new Error("WebGPU is unavailable. Update the iPhone to iOS 26 or later and open the app in Safari.");
 localEngineLoading=(async()=>{
  setModelProgress(.01,"Loading the on-device AI runtime…");
  const webllm=await import(WEBLLM_CDN);
  const selected=modelId||"Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
  localEngineInstance=await webllm.CreateMLCEngine(selected,{
   initProgressCallback:p=>{
    const raw=typeof p.progress==="number"?p.progress:0;
    setModelProgress(raw,p.text||`Preparing ${selected}…`);
   }
  });
  localEngineModel=selected;
  setModelProgress(1,`${selected} is active on this iPhone.`);
  return localEngineInstance;
 })();
 try{return await localEngineLoading}
 finally{localEngineLoading=null}
}


function isDeepRecallRequest(prompt){
 return /(recall|remember).*(everything|complete|comprehensive|deep|all code|all enterprise)|complete.*(architecture|enterprise|voxpilot)|deep recall/i.test(prompt);
}
function evidenceLabel(value){
 return value?"Verified runtime record":"Unknown";
}
function executiveRecallSynthesis(prompt){
 const pendingActions=state.actions.filter(a=>a.status==="pending");
 const openTasks=state.tasks.filter(t=>t.status!=="completed");
 const decisions=state.decisions.slice(0,12);
 const memories=relevantMemories(prompt,24);
 const ventures=state.ventures;
 const vox=ventures.find(v=>v.id==="VOX")||ventures[0];

 const sections=[];
 sections.push(`CHAIRMAN — COMPLETE OPERATIONAL RECONSTRUCTION

FOUNDATIONAL OBJECTIVE
VoxPilot Nexus is the central platform of the Sovereign Enterprise. Chairman is the persistent Founder-facing executive cognition runtime inside VoxPilot—not a generic chatbot and not merely the local language model. VoxPilot owns identity, doctrine, memory, enterprise state, decisions, approvals, permissions, evidence, audit, task continuity, and provider routing. The language model is a replaceable reasoning substrate beneath that runtime.`);

 sections.push(`STANDALONE AI LINEAGE
• The locked engineering reference is claw-code-main.zip unless the Founder replaces it.
• The intended Claude/Claw-derived integration is the agent-runtime architecture: iterative agent loop, context assembly and compression, permissioned tool routing, task packets, sessions, subagents, filesystem/terminal execution patterns, provider abstraction, and worker orchestration.
• The present iPhone deployment now runs an open Qwen model locally through Safari WebGPU. This makes inference local and token-free after caching.
• Anthropic Claude model weights are not embedded; the Claude-derived value is the runtime architecture absorbed into VoxPilot.
• The earlier failure occurred because the 0.5B model was being asked to reconstruct the enterprise by itself. Version 8 moves authoritative recall into the VoxPilot runtime, where it belongs.`);

 sections.push(`CURRENT RUNTIME STATE
• On-device inference provider: ${ai.provider==="ondevice"?ai.model:"not currently selected"}
• Durable memories: ${state.memories.length}
• Executive sessions: ${state.sessions.length}
• Recorded Founder decisions: ${state.decisions.length}
• Pending governed actions: ${pendingActions.length}
• Open tasks: ${openTasks.length}
• Audit events: ${state.audit.length}
• Founder authority: final
• Chairman Lock: ${state.chairman_lock?"active":"inactive"}`);

 sections.push(`ENTERPRISE PORTFOLIO
${ventures.map(v=>`• ${v.name} — ${v.status}
  Role: ${v.role}
  Controlling gate: ${v.gate}`).join("\n")}`);

 sections.push(`VOXPILOT ARCHITECTURE
Founder
  ↓
Chairman Runtime
  ↓
VoxPilot Nexus
  ├─ Founder doctrine and fidelity
  ├─ Durable enterprise memory
  ├─ Conversation and decision lineage
  ├─ Mission and task engine
  ├─ Governed action proposals and approvals
  ├─ Evidence, provenance, and audit
  ├─ Domain replicants and specialist consultation
  ├─ Model router: on-device first, optional cloud escalation
  ├─ Connector and tool boundary
  └─ iPhone-first command interface

The runtime is the enduring enterprise asset. Interfaces and models are replaceable.`);

 sections.push(`CURRENT FOUNDER DECISIONS
${decisions.length?decisions.map(d=>`• ${d.title}: ${d.text}`).join("\n"):"• No additional Founder decisions have yet been entered through the current app installation."}`);

 sections.push(`RELEVANT DURABLE MEMORY
${memories.map(m=>`• [${String(m.type).toUpperCase()}] ${m.content}`).join("\n")}`);

 sections.push(`VERIFIED CAPABILITIES NOW PRESENT
• GitHub Pages deployment on the Founder's iPhone
• Local WebGPU language-model inference
• Persistent browser-held Chairman state
• Founder doctrine, ventures, memories, sessions, decisions, tasks, actions, and audit
• Voice input
• Optional reply playback
• Provider abstraction and optional cloud escalation
• Structured deep-recall synthesis independent of model compliance
• Explicit approval boundary for consequential actions`);

 sections.push(`CAPABILITIES NOT YET COMPLETE
• Native signed iOS application and App Store/TestFlight packaging
• Cryptographically encrypted durable sync across devices
• Live execution against GitHub, Autodesk, Ansys, email, calendars, files, terminals, or vendor engineering systems
• Full semantic vector index over the complete historical enterprise corpus
• Mac/GPU worker mesh
• Bounded domain replicants running as independent services
• Production-grade identity, key management, backups, and recovery
• Verified physical merge of inaccessible source archives beyond the code actually deployed`);

 sections.push(`CONTROLLING NEXT ACTION
${vox?.gate||"Close the five-field VoxPilot MVP definition."}

The immediate engineering priority is to finish the Chairman knowledge substrate before adding more surface integrations: import the complete enterprise doctrine and verified project records into a structured local knowledge pack, then let the runtime retrieve and synthesize that pack deterministically before invoking the local model.`);

 sections.push(`FOUNDER COMMANDS NOW SUPPORTED
• “Remember that …” stores durable memory.
• “Decision: …” records a Founder decision.
• “Task: …” creates an executive task.
• “Chairman, recall everything comprehensively and deeply” invokes this authoritative runtime reconstruction rather than relying on the small model alone.`);

 return {
  text:sections.join("\n\n"),
  confidence:.98,
  domains:["VoxPilot Runtime","Enterprise Portfolio","Engineering & Security"],
  deterministicRecall:true
 };
}

function classifyFounderCommand(prompt){
 let m;if((m=prompt.trim().match(/^remember(?: that)?\s+(.+)/i)))return {kind:"memory",content:m[1]};
 if((m=prompt.trim().match(/^decision\s*:\s*(.+?)(?:\s*[-—:]\s*(.+))?$/i)))return {kind:"decision",title:m[1],content:m[2]||m[1]};
 if((m=prompt.trim().match(/^task\s*:\s*(.+)/i)))return {kind:"task",content:m[1]};
 return null;
}
function captureFounderCommand(prompt){
 const c=classifyFounderCommand(prompt);if(!c)return null;
 if(c.kind==="memory"){state.memories.unshift({id:uid(),content:c.content,type:"fact",scope:"enterprise",provenance:"Founder command",created_at:now()});audit("memory_created",c.content);return "Stored as durable Founder memory."}
 if(c.kind==="decision"){state.decisions.unshift({id:uid(),title:c.title,text:c.content,created_at:now(),authority:"Founder"});state.memories.unshift({id:uid(),content:`Founder decision: ${c.content}`,type:"decision",scope:"enterprise",provenance:"Founder command",created_at:now()});audit("decision_recorded",c.title);return "Recorded as a Founder decision."}
 if(c.kind==="task"){state.tasks.unshift({id:uid(),title:c.content,due_at:null,kind:"founder",status:"pending",created_at:now()});audit("task_created",c.content);return "Added to the Chairman task register."}
}
function completeRuntimeContext(prompt){
 const memory=relevantMemories(prompt,32);
 return `COMPLETE VOXPILOT RUNTIME CONTEXT

FOUNDER
- ${state.founder.name}
- Final authority remains with the Founder.

LOCKED DOCTRINE
${state.doctrine.map(x=>`- ${x}`).join("\n")}

RELEVANT DURABLE MEMORY
${memory.length?memory.map(m=>`- [${m.type}/${m.scope||"enterprise"}] ${m.content} (source: ${m.provenance||"runtime"})`).join("\n"):"- No matching durable memory."}

ENTERPRISE PORTFOLIO
${state.ventures.map(v=>`- ${v.name} [${v.status}]: ${v.role}. Controlling gate: ${v.gate}`).join("\n")}

FOUNDER DECISIONS
${state.decisions.slice(0,25).map(d=>`- ${d.title}: ${d.text}`).join("\n")||"- No additional recorded decisions."}

ACTION REGISTER
${state.actions.slice(0,20).map(a=>`- ${a.title}: status=${a.status}; risk=${a.risk}; rationale=${a.rationale}`).join("\n")||"- No action proposals."}

TASK REGISTER
${state.tasks.slice(0,20).map(t=>`- ${t.title}: status=${t.status}${t.due_at?`; due=${t.due_at}`:""}`).join("\n")||"- No tasks."}

RECENT AUDIT
${state.audit.slice(0,12).map(a=>`- ${a.type}: ${a.detail}`).join("\n")||"- No audit events."}

CURRENT COMMAND
${prompt}`;
}
function compactSessionIfNeeded(){
 const s=ensureSession();if(s.messages.length<=34)return;
 const old=s.messages.slice(0,-22),summary=old.map(m=>`${m.role}: ${m.content}`).join("\n").slice(0,7000);
 state.memories.unshift({id:uid(),content:`Session continuity summary:\n${summary}`,type:"session_summary",scope:"runtime",provenance:"Automatic context compression",created_at:now()});
 s.messages=s.messages.slice(-22);audit("context_compressed",`${old.length} messages compressed into durable continuity`);
}

async function onDeviceCompletion(prompt,onToken=null){
 const engine=await ensureLocalModel(ai.model),session=ensureSession();
 const transcript=session.messages.filter(m=>!m.meta?.pending).slice(-20).map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.content}));
 const messages=[{role:"system",content:systemPrompt()},...transcript.slice(0,-1),{role:"user",content:completeRuntimeContext(prompt)}];
 if(onToken){
  const stream=await engine.chat.completions.create({messages,temperature:.32,max_tokens:1500,stream:true});
  let text="";for await(const chunk of stream){if(window.__chairmanAbort)break;const d=chunk.choices?.[0]?.delta?.content||"";text+=d;if(d)onToken(text)}
  return {text:text||"The on-device model returned no response.",confidence:.8,domains:[`On-device · ${ai.model}`],ondevice:true};
 }
 const reply=await engine.chat.completions.create({messages,temperature:.32,max_tokens:1500});
 return {text:reply.choices?.[0]?.message?.content||"The on-device model returned no response.",confidence:.8,domains:[`On-device · ${ai.model}`],ondevice:true};
}
async function providerCall(prompt){
 if(ai.provider==="ondevice")return onDeviceCompletion(prompt);
 if(ai.provider==="local")return localEngine(prompt);
 if(!ai.apiKey&&!ai.proxyUrl)throw new Error("LIVE_AI_NOT_CONFIGURED");

 const memory=relevantMemories(prompt,40);
 const session=ensureSession();
 const transcript=session.messages
  .filter(m=>!m.meta?.pending)
  .slice(-24)
  .map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.content}));

 const enterpriseContext=`PERSISTENT FOUNDER CONTEXT

DURABLE MEMORY
${memory.length?memory.map(m=>`- [${m.type}] ${m.content}`).join("\n"):"- No directly matching durable memories."}

ENTERPRISE PORTFOLIO
${state.ventures.map(v=>`- ${v.name}: status=${v.status}; role=${v.role}; controlling gate=${v.gate}`).join("\n")}

FOUNDER DECISIONS
${state.decisions.slice(0,30).map(d=>`- ${d.title}: ${d.text}`).join("\n")||"- No recorded decisions."}

ACTION GOVERNANCE
${state.actions.slice(0,20).map(a=>`- ${a.title}: ${a.status}; risk=${a.risk}; rationale=${a.rationale}`).join("\n")||"- No action proposals."}

CURRENT COMMAND
${prompt}`;

 if(ai.proxyUrl){
  const r=await fetch(ai.proxyUrl,{
   method:"POST",
   headers:{"Content-Type":"application/json","Authorization":ai.apiKey?`Bearer ${ai.apiKey}`:""},
   body:JSON.stringify({provider:ai.provider,model:ai.model,system:systemPrompt(),messages:transcript,context:enterpriseContext})
  });
  const d=await r.json();if(!r.ok)throw new Error(d.message||`Secure runtime failed (${r.status})`);
  return {text:d.text||d.output||JSON.stringify(d),confidence:d.confidence||.88,domains:d.domains||["Secure Chairman Runtime"]};
 }

 if(ai.provider==="github"){
  const messages=[
   {role:"system",content:systemPrompt()},
   ...transcript.slice(0,-1),
   {role:"user",content:enterpriseContext}
  ];
  const r=await fetch("https://models.github.ai/inference/chat/completions",{
   method:"POST",
   headers:{
    "Accept":"application/vnd.github+json",
    "Authorization":`Bearer ${ai.apiKey}`,
    "X-GitHub-Api-Version":"2022-11-28",
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    model:ai.model||"openai/gpt-4.1",
    messages,
    temperature:.35,
    max_tokens:3500
   })
  });
  const d=await r.json();
  if(!r.ok)throw new Error(d.message||d.error?.message||`GitHub Models failed (${r.status})`);
  return {text:d.choices?.[0]?.message?.content||"The model returned no response.",confidence:.9,domains:["Live Chairman · GitHub Models"]};
 }

 if(ai.provider==="openai"){
  const input=[
   {role:"system",content:systemPrompt()},
   ...transcript.slice(0,-1),
   {role:"user",content:enterpriseContext}
  ];
  const r=await fetch("https://api.openai.com/v1/responses",{
   method:"POST",
   headers:{"Content-Type":"application/json","Authorization":`Bearer ${ai.apiKey}`},
   body:JSON.stringify({model:ai.model||"gpt-4.1-mini",input})
  });
  const d=await r.json();if(!r.ok)throw new Error(d.error?.message||`OpenAI failed (${r.status})`);
  return {text:d.output_text||d.output?.flatMap(x=>x.content||[]).map(x=>x.text||"").join("\n")||"The model returned no response.",confidence:.9,domains:["Live Chairman · OpenAI"]};
 }

 if(ai.provider==="anthropic"){
  const anthropicMessages=transcript.slice(0,-1).concat([{role:"user",content:enterpriseContext}]);
  const r=await fetch("https://api.anthropic.com/v1/messages",{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
    "x-api-key":ai.apiKey,
    "anthropic-version":"2023-06-01",
    "anthropic-dangerous-direct-browser-access":"true"
   },
   body:JSON.stringify({model:ai.model||"claude-sonnet-4-20250514",max_tokens:3500,system:systemPrompt(),messages:anthropicMessages})
  });
  const d=await r.json();if(!r.ok)throw new Error(d.error?.message||`Anthropic failed (${r.status})`);
  return {text:(d.content||[]).map(x=>x.text||"").join("\n"),confidence:.9,domains:["Live Chairman · Anthropic"]};
 }
 throw new Error("Unsupported AI provider.");
}
async function execute(){
 const box=$("#commandInput"),prompt=box.value.trim();if(!prompt)return;
 box.value="";window.__chairmanAbort=false;const captured=captureFounderCommand(prompt);addMessage("user",prompt);
 const pending={id:uid(),role:"assistant",content:captured?`${captured}\n\nChairman is integrating this into the runtime…`:"Chairman is reasoning…",meta:{pending:true},at:now()};
 ensureSession().messages.push(pending);persist();renderMessages();
 $("#sendButton").disabled=true;$("#stopButton").classList.remove("hidden");
 try{
  const out=isDeepRecallRequest(prompt)
   ?executiveRecallSynthesis(prompt)
   :ai.provider==="ondevice"
     ?await onDeviceCompletion(prompt,text=>{pending.content=text;renderMessages(false)})
     :await providerCall(prompt);
  pending.content=out.text;pending.meta={confidence:out.confidence,domains:out.domains,diagnostic:out.diagnostic};audit("executive_response",`${ai.provider}; confidence ${out.confidence}`);
 }catch(e){pending.content=`Chairman runtime error: ${e.message}`;pending.meta={error:true};audit("provider_error",e.message)}
 finally{$("#sendButton").disabled=false;$("#stopButton").classList.add("hidden")}
 compactSessionIfNeeded();persist();renderMessages();renderBrief();renderMemories();renderDecisions();renderTasks();updateAIState();
}
function renderMessages(scroll=true){
 const rows=currentSession?.messages||[];
 $("#messages").innerHTML=rows.length?rows.map(x=>`<div class="message ${x.role}${x.meta?.pending?" typing":""}">${esc(x.content)}${x.meta?.confidence?`<div class="meta">Confidence ${Math.round(x.meta.confidence*100)}% · ${(x.meta.domains||[]).join(", ")}</div>`:""}</div>`).join(""):`<div class="message assistant">Chairman Runtime ready.

This application runs from GitHub Pages on your iPhone. It preserves memory, sessions, decisions, action approvals, tasks, ventures, and audit state on this device.</div>`;
 $("#messages").scrollTop=$("#messages").scrollHeight;
}
function card(title,body,meta=""){return `<div class="card"><h3>${esc(title)}</h3><div>${body}</div>${meta?`<div class="meta">${esc(meta)}</div>`:""}</div>`}
function renderBrief(){
 const top=state.ventures.slice().sort((a,b)=>a.priority-b.priority).slice(0,3);
 const pending=state.actions.filter(a=>a.status==="pending").length,due=state.tasks.filter(t=>t.status==="pending"&&new Date(t.due_at)<=new Date()).length;
 $("#briefContent").innerHTML=card("Controlling Objective",doctrine.optimization,state.chairman_lock?"Chairman Lock active":"Founder authority active")+
 card("Operating State",`Pending approvals: <strong>${pending}</strong><br>Due tasks: <strong>${due}</strong><br>Durable memories: <strong>${state.memories.length}</strong><br>Executive sessions: <strong>${state.sessions.length}</strong>`)+
 top.map(v=>card(v.name,`<strong>Gate:</strong> ${esc(v.gate)}`,`${v.status} · Priority ${v.priority}`)).join("");
}
function renderMemories(){
 const q=$("#memorySearch").value.toLowerCase();
 const rows=state.memories.filter(m=>!q||`${m.content} ${m.type} ${m.scope}`.toLowerCase().includes(q));
 $("#memoryList").innerHTML=rows.map(m=>card(m.type,esc(m.content),`${m.provenance} · ${m.scope}`)).join("")||"<p>No matching memory.</p>";
}
function renderVentures(){$("#ventureList").innerHTML=state.ventures.slice().sort((a,b)=>a.priority-b.priority).map(v=>card(v.name,`${esc(v.role)}<br><br><strong>Gate:</strong> ${esc(v.gate)}`,`${v.status} · Priority ${v.priority}`)).join("")}
function renderDecisions(){$("#decisionList").innerHTML=state.decisions.map(d=>card(d.title,esc(d.text),`${d.authority} · ${new Date(d.created_at).toLocaleString()}`)).join("")||"<p>No recorded decisions.</p>"}
function renderActions(){
 $("#actionList").innerHTML=state.actions.map(a=>`<div class="card ${a.status}"><span class="status-pill ${a.status}">${a.status}</span><h3>${esc(a.title)}</h3><div>${esc(a.rationale)}</div><div class="meta">${a.risk} risk · ${new Date(a.created_at).toLocaleString()}</div>${a.status==="pending"?`<div class="action-buttons"><button onclick="decideAction('${a.id}','rejected')">Reject</button><button class="primary" onclick="decideAction('${a.id}','approved')">Founder Approve</button></div>`:""}</div>`).join("")||"<p>No action proposals.</p>";
}
window.decideAction=(id,status)=>{const a=state.actions.find(x=>x.id===id);if(!a)return;a.status=status;a.decided_at=now();a.authority="Founder";audit("action_"+status,a.title);renderActions();renderBrief()}
function renderTasks(){
 $("#taskList").innerHTML=state.tasks.map(t=>card(t.title,`Kind: ${esc(t.kind)}<br>Status: ${esc(t.status)}`,new Date(t.due_at).toLocaleString())).join("")||"<p>No executive tasks.</p>";
}
function evaluateTasks(){
 const due=state.tasks.filter(t=>t.status==="pending"&&new Date(t.due_at)<=new Date());
 due.forEach(t=>{t.status="due";t.triggered_at=now();if(t.kind==="brief")addMessage("assistant",`SCHEDULED EXECUTIVE BRIEF

${localEngine("What is the controlling priority and current enterprise state?").text}`,{confidence:.82,domains:["Task scheduler"]});else if(t.kind==="backup")addMessage("assistant",`BACKUP CHECKPOINT DUE\n\nOpen Settings and perform Encrypted Backup to preserve the current Chairman runtime in GitHub.`,{confidence:1,domains:["Continuity"]});else addMessage("assistant",`EXECUTIVE REMINDER\n\n${t.title}`,{confidence:1,domains:["Task scheduler"]});audit("task_due",t.title)});
 if(due.length)persist();
}

function connectorState(id){return state.connectorStates?.[id]||"disconnected"}
function setConnectorState(id,next){
 if(!state.connectorStates)state.connectorStates={};
 const c=integrationCatalog.connectors.find(x=>x.id===id);if(!c)return;
 if(next==="connected"&&c.mode.includes("server")){alert("This connector requires a secure backend or vendor cloud function. Its architecture is ready, but a static iPhone app cannot safely hold the required client secret.");next="planned"}
 state.connectorStates[id]=next;audit("connector_state",`${c.brand}: ${next}`);renderIntegrations();
}
window.cycleConnector=id=>{const s=connectorState(id),next=s==="disconnected"?"planned":s==="planned"?"connected":"disconnected";setConnectorState(id,next)}
function integrationCard(c){
 const stateName=connectorState(c.id);
 return `<div class="card"><div class="connector-head"><div><div class="eyebrow">${esc(c.category)}</div><h3>${esc(c.brand)}</h3></div><button class="connector-state ${stateName}" onclick="cycleConnector('${c.id}')">${stateName}</button></div>
 <div><strong>Products:</strong> ${esc(c.products.join(", "))}</div>
 <div><strong>Functions:</strong> ${esc(c.capabilities.join(", "))}</div>
 <div><strong>Authentication:</strong> ${esc(c.auth)}</div>
 <div><strong>Execution:</strong> ${esc(c.mode)}</div>
 <div class="meta">${c.formats.map(f=>`<span class="format-chip">${esc(f)}</span>`).join("")}</div></div>`;
}
function renderIntegrations(){
 const search=$("#integrationSearch")?.value.toLowerCase()||"",category=$("#integrationCategory")?.value||"";
 const rows=integrationCatalog.connectors.filter(c=>(!category||c.category===category)&&(!search||JSON.stringify(c).toLowerCase().includes(search)));
 const connected=integrationCatalog.connectors.filter(c=>connectorState(c.id)==="connected").length,planned=integrationCatalog.connectors.filter(c=>connectorState(c.id)==="planned").length;
 $("#integrationSummary").innerHTML=card("Integration Fabric",`${integrationCatalog.connectors.length} connector families · ${planned} planned · ${connected} connected<br><br><strong>Neutral artifact bus:</strong> IFC, STEP, IGES, USD, glTF, FBX, DWG/DXF, PDF/SVG, GeoJSON, CSV/JSON, webhooks and REST.`,`Founder-governed · provenance-preserving`);
 $("#integrationList").className="integration-grid";$("#integrationList").innerHTML=rows.map(integrationCard).join("")||"<p>No matching connector.</p>";
}
function showArchitecture(){
 $("#integrationList").className="";
 $("#integrationList").innerHTML=`<div class="card architecture-flow"><h3>VoxPilot Design & Engineering Bus</h3>
 <span class="architecture-node">Founder command and enterprise objective</span><div class="arrow">↓</div>
 <span class="architecture-node">Chairman doctrine, memory retrieval, risk classification and approval gate</span><div class="arrow">↓</div>
 <span class="architecture-node">Domain orchestration: CAD/BIM · CAE · PLM · GIS · Media · Data · Cloud · Enterprise</span><div class="arrow">↓</div>
 <span class="architecture-node">Secure connector gateway: OAuth, vendor tokens, webhooks, job queues and rate limits</span><div class="arrow">↓</div>
 <span class="architecture-node">Artifact and model registry: versions, hashes, lineage, metadata, permissions and digital signatures</span><div class="arrow">↓</div>
 <span class="architecture-node">Neutral interchange and transformation: IFC · STEP · USD · glTF · FBX · DWG/DXF · PDF/SVG · JSON/CSV</span><div class="arrow">↓</div>
 <span class="architecture-node">Vendor execution workers: Autodesk APS, Adobe services, simulation solvers, cloud functions and enterprise systems</span><div class="arrow">↓</div>
 <span class="architecture-node">Validation, comparison, exception handling, Founder approval and immutable audit result</span></div>`;
}
function showWorkflows(){
 $("#integrationList").className="";
 $("#integrationList").innerHTML=integrationCatalog.workflows.map(w=>card(w.name,w.steps.map((s,i)=>`${i+1}. ${esc(s)}`).join("<br>"),w.approval)).join("");
}


function updateAIState(){
 const ondevice=ai.provider==="ondevice";
 const cloud=ai.provider!=="local"&&!ondevice&&Boolean(ai.apiKey||ai.proxyUrl);
 const live=ondevice||cloud;
 const badge=$("#aiState");
 if(badge){
  badge.className=`ai-state ${ondevice?"ondevice":cloud?"live":"offline"}`;
  badge.textContent=ondevice?(localEngineInstance?`On-device · ${ai.model}`:"On-device · model not loaded"):cloud?`Cloud · ${ai.provider}`:"No model";
  badge.onclick=()=>{if(!live||ondevice&&!localEngineInstance)$("#liveAIOverlay").classList.remove("hidden")};
 }
 $("#statusLine").textContent=state.chairman_lock
  ?`Chairman Lock active · ${ondevice?"standalone AI":cloud?"cloud intelligence":"no model"}`
  :`${state.founder.name} · Founder authority`;
}
async function testAIConnection(token=null,model=null){
 const previous={...ai};
 if(token!==null)ai={...ai,provider:"github",apiKey:token,model:model||"openai/gpt-4.1"};
 try{
  const out=await providerCall("Respond with exactly: Chairman live.");
  if(!out.text.toLowerCase().includes("chairman"))throw new Error("Unexpected model response.");
  return out;
 }catch(e){
  ai=previous;
  throw e;
 }
}
function renderSettings(){
 $("#provider").value=ai.provider;$("#model").value=ai.model||"";$("#apiKey").value=ai.apiKey||"";$("#proxyUrl").value=ai.proxyUrl||"";
 $("#githubOwner").value=sync.owner||state.founder.github||"";$("#githubRepo").value=sync.repo||"voxpilot-chairman";$("#githubToken").value=sync.token||"";$("#syncPassphrase").value=sync.passphrase||"";$("#syncPath").value=sync.path||"private/chairman-runtime.enc.json";
 $("#lockButton").classList.toggle("locked",state.chairman_lock);updateAIState();
}
function bytes64(b){let s="";for(let i=0;i<b.length;i+=32768)s+=String.fromCharCode(...b.subarray(i,i+32768));return btoa(s)}
function from64(s){const x=atob(s.replace(/\n/g,"")),b=new Uint8Array(x.length);for(let i=0;i<x.length;i++)b[i]=x.charCodeAt(i);return b}
async function keyFrom(pass,salt){const m=await crypto.subtle.importKey("raw",new TextEncoder().encode(pass),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:310000,hash:"SHA-256"},m,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function encryptRuntime(pass){if(!pass)throw new Error("Encryption passphrase required.");const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),key=await keyFrom(pass,salt),plain=new TextEncoder().encode(JSON.stringify(state)),cipher=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv},key,plain));return JSON.stringify({format:"voxpilot-chairman-encrypted-v1",kdf:"PBKDF2-SHA256",iterations:310000,cipher:"AES-256-GCM",salt:bytes64(salt),iv:bytes64(iv),ciphertext:bytes64(cipher),created_at:now()})}
async function decryptRuntime(raw,pass){const b=JSON.parse(raw),key=await keyFrom(pass,from64(b.salt)),plain=await crypto.subtle.decrypt({name:"AES-GCM",iv:from64(b.iv)},key,from64(b.ciphertext)),x=JSON.parse(new TextDecoder().decode(plain));if(!x.memories||!x.sessions||!x.actions)throw new Error("Invalid Chairman backup.");return x}
function syncForm(){sync={owner:$("#githubOwner").value.trim(),repo:$("#githubRepo").value.trim(),token:$("#githubToken").value.trim(),passphrase:$("#syncPassphrase").value,path:$("#syncPath").value.trim()||"private/chairman-runtime.enc.json"};saveSync();if(!sync.owner||!sync.repo||!sync.token||!sync.passphrase)throw new Error("GitHub username, repository, token, and passphrase are required.");return sync}
async function gh(url,opt={}){const c=syncForm(),r=await fetch(url,{...opt,headers:{"Accept":"application/vnd.github+json","Authorization":`Bearer ${c.token}`,"X-GitHub-Api-Version":"2022-11-28","Content-Type":"application/json",...(opt.headers||{})}}),text=await r.text();let d={};try{d=text?JSON.parse(text):{}}catch{d={message:text}}if(!r.ok)throw new Error(d.message||`GitHub failed (${r.status})`);return d}
function contentURL(c){return `https://api.github.com/repos/${encodeURIComponent(c.owner)}/${encodeURIComponent(c.repo)}/contents/${c.path.split("/").map(encodeURIComponent).join("/")}`}
async function pushCloud(){const c=syncForm();$("#syncStatus").textContent="Encrypting on iPhone…";const enc=await encryptRuntime(c.passphrase),url=contentURL(c);let sha;try{sha=(await gh(url)).sha}catch(e){if(!/Not Found|404/.test(e.message))throw e}const body={message:`Chairman encrypted checkpoint ${now()}`,content:bytes64(new TextEncoder().encode(enc)),branch:"main"};if(sha)body.sha=sha;await gh(url,{method:"PUT",body:JSON.stringify(body)});$("#syncStatus").textContent=`Encrypted backup completed ${new Date().toLocaleString()}.`;audit("encrypted_backup",c.path)}
async function pullCloud(){const c=syncForm(),d=await gh(contentURL(c)),raw=new TextDecoder().decode(from64(d.content)),restored=await decryptRuntime(raw,c.passphrase);if(!confirm("Replace this iPhone's Chairman runtime with the encrypted GitHub backup?"))return;state=restored;persist();currentSession=null;renderAll();$("#syncStatus").textContent=`Runtime restored ${new Date().toLocaleString()}.`;audit("encrypted_restore",c.path)}
function renderRuntimeStats(){
 const el=$("#runtimeStats");if(!el)return;const s=ensureSession();
 el.innerHTML=`<span>${state.memories.length} memories</span><span>${state.decisions.length} decisions</span><span>${state.tasks.filter(t=>t.status!=="completed").length} open tasks</span><span>${s.messages.length} session messages</span>`;
}
function renderAll(){renderMessages();renderBrief();renderActions();renderIntegrations();renderMemories();renderVentures();renderTasks();renderDecisions();renderSettings()}
$$("nav button").forEach(b=>b.onclick=()=>{$$("nav button").forEach(x=>x.classList.remove("active"));$$(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#"+b.dataset.tab).classList.add("active");renderAll()});
$("#quickCommands").onclick=e=>{const b=e.target.closest("[data-command]");if(!b)return;$("#commandInput").value=b.dataset.command;execute()};
$("#stopButton").onclick=()=>{window.__chairmanAbort=true;$("#stopButton").classList.add("hidden");$("#sendButton").disabled=false};
$("#readLast").onclick=()=>{const s=ensureSession(),last=[...s.messages].reverse().find(m=>m.role==="assistant"&&!m.meta?.pending);if(!last||!("speechSynthesis"in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(last.content);u.rate=.96;speechSynthesis.speak(u)};
$("#sendButton").onclick=execute;$("#commandInput").onkeydown=e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))execute()};
$("#newSession").onclick=()=>{currentSession=null;renderMessages();audit("new_session","Founder opened a new executive session")};
$("#saveMemory").onclick=()=>{const c=$("#memoryInput").value.trim();if(!c)return;state.memories.unshift({id:uid(),content:c,type:$("#memoryType").value,scope:"enterprise",provenance:"Founder",created_at:now()});$("#memoryInput").value="";audit("memory_created",c);renderMemories();renderBrief()};
$("#memorySearch").oninput=renderMemories;
$("#saveDecision").onclick=()=>{const title=$("#decisionTitle").value.trim(),text=$("#decisionText").value.trim();if(!title||!text)return;state.decisions.unshift({id:uid(),title,text,created_at:now(),authority:"Founder"});$("#decisionTitle").value="";$("#decisionText").value="";audit("decision_recorded",title);renderDecisions()};
$("#proposeAction").onclick=()=>{const title=$("#actionTitle").value.trim(),rationale=$("#actionRationale").value.trim();if(!title||!rationale)return;state.actions.unshift({id:uid(),title,rationale,risk:$("#actionRisk").value,status:"pending",created_at:now()});$("#actionTitle").value="";$("#actionRationale").value="";audit("action_proposed",title);renderActions();renderBrief()};
$("#saveTask").onclick=()=>{const title=$("#taskTitle").value.trim(),due=$("#taskDue").value;if(!title||!due)return;state.tasks.unshift({id:uid(),title,due_at:new Date(due).toISOString(),kind:$("#taskKind").value,status:"pending",created_at:now()});$("#taskTitle").value="";audit("task_created",title);renderTasks()};
$("#saveSettings").onclick=()=>{
 ai={provider:$("#provider").value,model:$("#model").value.trim(),apiKey:$("#apiKey").value.trim(),proxyUrl:$("#proxyUrl").value.trim()};
 saveAI();audit("ai_settings",ai.provider);updateAIState();
 alert(ai.provider==="ondevice"?"On-device mode selected. Load the model from the activation screen if it is not already cached.":ai.provider==="local"?"No-model diagnostic mode selected.":"Cloud Chairman settings saved for this browser session.");
};
$("#testAI").onclick=async()=>{
 $("#testAI").disabled=true;$("#testAI").textContent="Testing…";
 try{
  ai={provider:$("#provider").value,model:$("#model").value.trim(),apiKey:$("#apiKey").value.trim(),proxyUrl:$("#proxyUrl").value.trim()};
  await testAIConnection();saveAI();updateAIState();alert("Live Chairman connection verified.");
 }catch(e){alert("Connection failed: "+e.message)}
 finally{$("#testAI").disabled=false;$("#testAI").textContent="Test Connection"}
};
$("#activateLocalAI").onclick=async()=>{
 const model=$("#localModel").value;
 $("#activateLocalAI").disabled=true;$("#activateLocalAI").textContent="Loading On-Device Chairman…";
 try{
  ai={provider:"ondevice",model,apiKey:"",proxyUrl:""};saveAI();
  await ensureLocalModel(model);
  $("#provider").value="ondevice";$("#model").value=model;$("#apiKey").value="";
  $("#liveAIOverlay").classList.add("hidden");updateAIState();
  audit("ondevice_ai_activated",model);
  addMessage("assistant","I am active on this iPhone. I am the persistent Chairman Runtime inside VoxPilot Nexus. My language model is now running locally beneath the VoxPilot memory, doctrine, decisions, approvals, and enterprise state.",{confidence:.82,domains:[`On-device · ${model}`]});
 }catch(e){
  $("#localActivationStatus").textContent="Activation failed: "+e.message;
  audit("ondevice_activation_error",e.message);
 }finally{
  $("#activateLocalAI").disabled=false;$("#activateLocalAI").textContent="Download and Activate On-Device Chairman";
 }
};
$("#activateLiveAI").onclick=async()=>{
 const token=$("#liveToken").value.trim(),model=$("#liveModel").value.trim()||"openai/gpt-4.1";
 if(!token){$("#activationStatus").textContent="Enter a GitHub token with Models: read.";return}
 $("#activateLiveAI").disabled=true;$("#activateLiveAI").textContent="Testing live Chairman…";
 $("#activationStatus").textContent="Connecting to GitHub Models…";
 try{
  await testAIConnection(token,model);
  ai={provider:"github",model,apiKey:token,proxyUrl:""};saveAI();
  $("#provider").value="github";$("#model").value=model;$("#apiKey").value=token;
  $("#liveAIOverlay").classList.add("hidden");updateAIState();
  audit("live_ai_activated",model);
  addMessage("assistant","I am live. I am the Chairman Runtime inside VoxPilot Nexus. Speak to me directly.",{confidence:.95,domains:["Live Chairman · GitHub Models"]});
 }catch(e){
  $("#activationStatus").textContent="Activation failed: "+e.message;
 }finally{
  $("#activateLiveAI").disabled=false;$("#activateLiveAI").textContent="Activate and Test Chairman";
 }
};
$("#continueOffline").onclick=()=>{
 ai={...ai,provider:"local",apiKey:""};saveAI();
 $("#liveAIOverlay").classList.add("hidden");updateAIState();
};
$("#pushCloud").onclick=async()=>{try{await pushCloud()}catch(e){$("#syncStatus").textContent="Backup failed: "+e.message;audit("backup_error",e.message)}};
$("#pullCloud").onclick=async()=>{try{await pullCloud()}catch(e){$("#syncStatus").textContent="Restore failed: "+e.message;audit("restore_error",e.message)}};
$("#lockButton").onclick=()=>{state.chairman_lock=!state.chairman_lock;audit("chairman_lock",state.chairman_lock?"activated":"deactivated");renderSettings()};
$("#exportData").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`voxpilot-chairman-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);audit("data_export","Local JSON export")};
$("#importData").onchange=async e=>{try{const x=JSON.parse(await e.target.files[0].text());if(!x.memories||!x.ventures)throw new Error("Invalid Chairman data.");state=x;persist();currentSession=null;renderAll();alert("Chairman data imported.")}catch(err){alert(err.message)}};
$("#clearData").onclick=()=>{if(confirm("Erase all Chairman data from this iPhone?")){state=seed();persist();currentSession=null;location.reload()}};
$("#finishSetup").onclick=()=>{state.founder.name=$("#setupFounder").value.trim()||"Founder";state.founder.github=$("#setupGithub").value.trim();sync.owner=state.founder.github;sync.repo=$("#setupRepo").value.trim()||"voxpilot-chairman";state.initialized=true;saveSync();audit("runtime_initialized",`${state.founder.name}; GitHub ${state.founder.github}`);$("#setupOverlay").classList.add("hidden");renderAll()};

const categories=[...new Set(integrationCatalog.connectors.map(c=>c.category))].sort();
categories.forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=c;$("#integrationCategory").appendChild(o)});
$("#integrationSearch").oninput=renderIntegrations;$("#integrationCategory").onchange=renderIntegrations;
$("#showArchitecture").onclick=showArchitecture;$("#showWorkflows").onclick=showWorkflows;

const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(SR){const r=new SR();r.lang="en-US";r.onresult=e=>{$("#commandInput").value=e.results[0][0].transcript};$("#micButton").onclick=()=>r.start()}else{$("#micButton").disabled=true;$("#micButton").textContent="Voice unavailable"}
document.addEventListener("visibilitychange",()=>{if(!document.hidden)evaluateTasks()});
if(!state.initialized)$("#setupOverlay").classList.remove("hidden");
evaluateTasks();renderAll();updateAIState();
if(state.initialized&&ai.provider==="ondevice"){setTimeout(async()=>{try{await ensureLocalModel(ai.model);updateAIState();$("#liveAIOverlay").classList.add("hidden")}catch(e){$("#liveAIOverlay").classList.remove("hidden")}},250)}
else if(state.initialized&&ai.provider!=="local"&&!(ai.apiKey||ai.proxyUrl))$("#liveAIOverlay").classList.remove("hidden");
if("serviceWorker"in navigator)navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
