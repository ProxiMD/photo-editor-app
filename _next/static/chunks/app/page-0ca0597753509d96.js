(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3451:function(e,t,a){Promise.resolve().then(a.bind(a,6005)),Promise.resolve().then(a.bind(a,162))},162:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return k}});var r=a(7437),s=a(2265),l=a(1541),n=a(5817),i=a(7042),o=a(4769);function c(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,o.m6)((0,i.W)(t))}let d=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:c("rounded-lg border bg-card text-card-foreground shadow-sm",a),...s})});d.displayName="Card";let u=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:c("flex flex-col space-y-1.5 p-6",a),...s})});u.displayName="CardHeader";let h=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("h3",{ref:t,className:c("text-2xl font-semibold leading-none tracking-tight",a),...s})});h.displayName="CardTitle";let m=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("p",{ref:t,className:c("text-sm text-muted-foreground",a),...s})});m.displayName="CardDescription";let x=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:c("p-6 pt-0",a),...s})});x.displayName="CardContent",s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:c("flex items-center p-6 pt-0",a),...s})}).displayName="CardFooter";var g=a(7256);let f=(0,a(6061).j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),b=s.forwardRef((e,t)=>{let{className:a,variant:s,size:l,asChild:n=!1,...i}=e,o=n?g.g7:"button";return(0,r.jsx)(o,{className:c(f({variant:s,size:l,className:a})),ref:t,...i})});b.displayName="Button";var p=a(9011);let v=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsxs)(p.fC,{ref:t,className:c("relative flex w-full touch-none select-none items-center",a),...s,children:[(0,r.jsxs)(p.fQ,{className:"relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#333]",children:[(0,r.jsx)(p.e6,{className:"absolute h-full bg-white"}),(0,r.jsx)("div",{className:"absolute inset-0 flex justify-between px-1",children:Array.from({length:10}).map((e,t)=>(0,r.jsx)("div",{className:"h-full w-[1px] bg-[#444]",style:{transform:"translateX(".concat(10*t,"%)")}},t))})]}),(0,r.jsx)(p.bU,{className:"block h-4 w-4 rounded-full border border-white/50 bg-white hover:bg-white/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"})]})});v.displayName=p.fC.displayName;var y=a(3589);let j=y.fC,N=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.aV,{ref:t,className:c("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",a),...s})});N.displayName=y.aV.displayName;let w=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.xz,{ref:t,className:c("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",a),...s})});w.displayName=y.xz.displayName;let C=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.VY,{ref:t,className:c("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",a),...s})});function F(e){let{points:t,onChange:a,color:l="#FFFFFF",gridColor:n="#333333",lineColor:i="#FFFFFF",pointColor:o="#00A3FF",width:c=256,height:d=256}=e,u=(0,s.useRef)(null),[h,m]=(0,s.useState)(!1),[x,g]=(0,s.useState)(null),[f,b]=(0,s.useState)(t);(0,s.useEffect)(()=>{b([...t].sort((e,t)=>e.x-t.x))},[t]);let p=e=>{e.strokeStyle=n,e.lineWidth=.5;for(let t=0;t<=4;t++){let a=c*t/4;e.beginPath(),e.moveTo(a,0),e.lineTo(a,d),e.stroke()}for(let t=0;t<=4;t++){let a=d*t/4;e.beginPath(),e.moveTo(0,a),e.lineTo(c,a),e.stroke()}},v=e=>{e.strokeStyle=i,e.lineWidth=2,e.beginPath(),e.moveTo(0,d);for(let t=0;t<=c;t++){let a=t/c,r=0;for(let e=0;e<f.length-1;e++){let t=f[e],s=f[e+1];if(a>=t.x&&a<=s.x){let e=(a-t.x)/(s.x-t.x);r=t.y+e*(s.y-t.y);break}}let s=d-r*d;0===t?e.moveTo(t,s):e.lineTo(t,s)}e.stroke()},y=e=>{f.forEach((t,a)=>{e.beginPath(),e.arc(t.x*c,d-t.y*d,a===x?6:4,0,2*Math.PI),e.fillStyle=a===x?o:l,e.fill(),e.strokeStyle="#000",e.lineWidth=1,e.stroke()})},j=()=>{let e=u.current;if(!e)return;let t=e.getContext("2d");t&&(t.clearRect(0,0,c,d),p(t),v(t),y(t))};(0,s.useEffect)(()=>{j()},[f,x]);let N=e=>{let t=u.current;if(!t)return{x:0,y:0};let a=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-a.left)/c)),y:Math.max(0,Math.min(1,1-(e.clientY-a.top)/d))}},w=e=>{let t=1/0,a=-1;return f.forEach((r,s)=>{let l=Math.hypot((r.x-e.x)*c,(r.y-e.y)*d);l<t&&(t=l,a=s)}),t<10?a:-1},C=()=>{m(!1),g(null)};return(0,r.jsx)("canvas",{ref:u,width:c,height:d,onMouseDown:e=>{let t=N(e),r=w(t);if(-1!==r)g(r),m(!0);else if(f.length<10){let e=[...f,t].sort((e,t)=>e.x-t.x);b(e),a(e),g(e.findIndex(e=>e===t)),m(!0)}},onMouseMove:e=>{if(!h||null===x)return;let t=N(e),r=[...f];0===x?t.x=0:x===f.length-1&&(t.x=1),r[x]=t,b(r),a(r)},onMouseUp:C,onMouseLeave:C,className:"border border-[#333] rounded-lg cursor-crosshair",style:{touchAction:"none"}})}function k(){let[e,t]=(0,s.useState)(null),[a,i]=(0,s.useState)("original"),[o,c]=(0,s.useState)(1),[g,f]=(0,s.useState)(!1),[p,y]=(0,s.useState)({brightness:1,contrast:1,saturation:1,temperature:0,grain:0,shadows:1,midtones:1,highlights:1,hue:0,saturationHSL:1,luminance:1,redCurve:[{x:0,y:0},{x:.5,y:.5},{x:1,y:1}],greenCurve:[{x:0,y:0},{x:.5,y:.5},{x:1,y:1}],blueCurve:[{x:0,y:0},{x:.5,y:.5},{x:1,y:1}],rgbCurve:[{x:0,y:0},{x:.5,y:.5},{x:1,y:1}]}),k=(0,s.useRef)(null),M=(0,s.useRef)(null),S={original:{colorAdjustments:"",grainAmount:0,grainSize:0},portra400:{colorAdjustments:"brightness(1.1) contrast(1.1) saturate(0.9) sepia(0.1)",grainAmount:.2,grainSize:1.5},kodachrome:{colorAdjustments:"brightness(1.2) contrast(1.5) saturate(1.4) sepia(0.15) hue-rotate(-5deg)",grainAmount:.15,grainSize:1.2},trix400:{colorAdjustments:"brightness(1.1) contrast(1.5) saturate(0) sepia(0.1)",grainAmount:.4,grainSize:2},fujipro400h:{colorAdjustments:"brightness(1.05) contrast(1.1) saturate(1.2) sepia(0.1) hue-rotate(5deg)",grainAmount:.25,grainSize:1.8},cinestill800t:{colorAdjustments:"brightness(1.1) contrast(1.2) saturate(0.8) sepia(0.15) hue-rotate(15deg)",grainAmount:.35,grainSize:2.2}},R=async e=>{var a;let r=null===(a=e.target.files)||void 0===a?void 0:a[0];if(r)try{f(!0);let e=await new Promise((e,t)=>{let a=new FileReader;a.onload=a=>{var r;"string"==typeof(null===(r=a.target)||void 0===r?void 0:r.result)?e(a.target.result):t(Error("Failed to read file"))},a.onerror=()=>t(Error("Failed to read file")),a.readAsDataURL(r)});t(e),i("original")}catch(e){}finally{f(!1)}},A=(e,t,a,r,s)=>{let l=e.getImageData(0,0,t,a),n=l.data,i=r*(1+(.2*Math.random()-.1))*o;for(let e=0;e<n.length;e+=4){let t=(Math.random()-.5)*i*255*(s*(1+(.2*Math.random()-.1)));n[e]+=t,n[e+1]+=t,n[e+2]+=t}e.putImageData(l,0,0)},V=e=>{if(e.filter="brightness(".concat(p.brightness,") \n                 contrast(").concat(p.contrast,") \n                 saturate(").concat(p.saturation,")\n                 hue-rotate(").concat(p.temperature,"deg)"),!M.current)return;e.drawImage(M.current,0,0);let t=e.getImageData(0,0,e.canvas.width,e.canvas.height),a=t.data;for(let e=0;e<a.length;e+=4){let t=a[e]/255,r=a[e+1]/255,s=a[e+2]/255,l=e=>Math.max(0,Math.min(1,e*p.shadows)),n=e=>Math.pow(e,1/p.midtones),i=e=>Math.max(0,Math.min(1,e*p.highlights)),o=(e,t)=>{for(let a=0;a<t.length-1;a++)if(e>=t[a].x&&e<=t[a+1].x){let r=(e-t[a].x)/(t[a+1].x-t[a].x);return t[a].y+r*(t[a+1].y-t[a].y)}return e},c=o(t,p.redCurve),d=o(r,p.greenCurve),u=o(s,p.blueCurve);o((t+r+s)/3,p.rgbCurve);let[h,m,x]=L(c,d,u),[g,f,b]=E((h+p.hue)%360,m*p.saturationHSL,x*p.luminance);a[e]=Math.round(255*i(n(l(g)))),a[e+1]=Math.round(255*i(n(l(f)))),a[e+2]=Math.round(255*i(n(l(b))))}e.putImageData(t,0,0)},L=(e,t,a)=>{let r=Math.max(e,t,a),s=Math.min(e,t,a),l=0,n=0,i=(r+s)/2;if(r!==s){let o=r-s;switch(n=i>.5?o/(2-r-s):o/(r+s),r){case e:l=(t-a)/o+(t<a?6:0);break;case t:l=(a-e)/o+2;break;case a:l=(e-t)/o+4}l*=60}return[l,n,i]},E=(e,t,a)=>{let r,s,l;if(0===t)r=s=l=a;else{let n=(e,t,a)=>(a<0&&(a+=1),a>1&&(a-=1),a<1/6)?e+(t-e)*6*a:a<.5?t:a<2/3?e+(t-e)*(2/3-a)*6:e,i=a<.5?a*(1+t):a+t-a*t,o=2*a-i;r=n(o,i,e/360+1/3),s=n(o,i,e/360),l=n(o,i,e/360-1/3)}return[r,s,l]},I=async e=>{if(i(e),!M.current||!k.current)return;let t=k.current,a=t.getContext("2d");a&&(t.width=M.current.naturalWidth,t.height=M.current.naturalHeight,"manual"===e?(V(a),p.grain>0&&(a.filter="none",A(a,t.width,t.height,p.grain,1.5))):(a.filter=S[e].colorAdjustments,a.drawImage(M.current,0,0),"original"!==e&&(a.filter="none",A(a,t.width,t.height,S[e].grainAmount,S[e].grainSize))))};(0,s.useEffect)(()=>{if(e){let t=new Image;t.src=e,t.onload=()=>{if(M.current=t,k.current){let e=k.current,r=e.getContext("2d");r&&(e.width=t.naturalWidth,e.height=t.naturalHeight,r.filter="none",r.drawImage(t,0,0),"original"!==a&&I(a))}}}},[e]),(0,s.useEffect)(()=>{e&&a&&M.current&&I(a)},[a,o,p]);let z=(e,t)=>{y(a=>({...a,[e]:t})),"manual"!==a&&i("manual")};return(0,r.jsxs)(d,{className:"w-full max-w-4xl mx-auto my-8 bg-black/50 backdrop-blur-xl border-[#222]",children:[(0,r.jsxs)(u,{className:"bg-black/50",children:[(0,r.jsx)(h,{className:"text-2xl font-bold text-white",children:"REALFILM editor by Mudit"}),(0,r.jsx)(m,{className:"text-gray-400",children:"Upload a photo and apply classic film looks with authentic grain each time"})]}),(0,r.jsx)(x,{className:"space-y-4 bg-black/50",children:e?(0,r.jsxs)("div",{className:"space-y-4 bg-black/50",children:[(0,r.jsxs)(j,{defaultValue:"presets",className:"w-full",children:[(0,r.jsxs)(N,{className:"bg-[#111] border-[#222]",children:[(0,r.jsx)(w,{value:"presets",className:"text-white",children:"Film Presets"}),(0,r.jsx)(w,{value:"manual",className:"text-white",children:"Manual Adjust"})]}),(0,r.jsxs)(C,{value:"presets",className:"space-y-4",children:[(0,r.jsx)("div",{className:"flex flex-wrap gap-2",children:Object.entries(S).map(e=>{let[t,s]=e;return(0,r.jsx)(b,{variant:"outline",className:"bg-[#111] text-white border-[#222] hover:bg-[#181818] ".concat(a===t?"ring-2 ring-white":""),onClick:()=>I(t),disabled:g,children:t.charAt(0).toUpperCase()+t.slice(1).replace(/([A-Z])/g," $1")},t)})}),"original"!==a&&"manual"!==a&&(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Filter Intensity"}),(0,r.jsx)(v,{value:[o],min:0,max:1,step:.1,onValueChange:e=>{let[t]=e;return c(t)},className:"w-full"})]})]}),(0,r.jsx)(C,{value:"manual",className:"space-y-4",children:(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Brightness"}),(0,r.jsx)(v,{value:[p.brightness],min:.5,max:1.5,step:.1,onValueChange:e=>{let[t]=e;return z("brightness",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Contrast"}),(0,r.jsx)(v,{value:[p.contrast],min:.5,max:1.5,step:.1,onValueChange:e=>{let[t]=e;return z("contrast",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Saturation"}),(0,r.jsx)(v,{value:[p.saturation],min:0,max:2,step:.1,onValueChange:e=>{let[t]=e;return z("saturation",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Temperature"}),(0,r.jsx)(v,{value:[p.temperature],min:-30,max:30,step:1,onValueChange:e=>{let[t]=e;return z("temperature",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Grain"}),(0,r.jsx)(v,{value:[p.grain],min:0,max:.5,step:.05,onValueChange:e=>{let[t]=e;return z("grain",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Shadows (Lift)"}),(0,r.jsx)(v,{value:[p.shadows],min:.5,max:1.5,step:.1,onValueChange:e=>{let[t]=e;return z("shadows",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Midtones (Gamma)"}),(0,r.jsx)(v,{value:[p.midtones],min:.5,max:1.5,step:.1,onValueChange:e=>{let[t]=e;return z("midtones",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Highlights (Gain)"}),(0,r.jsx)(v,{value:[p.highlights],min:.5,max:1.5,step:.1,onValueChange:e=>{let[t]=e;return z("highlights",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Hue"}),(0,r.jsx)(v,{value:[p.hue],min:-180,max:180,step:1,onValueChange:e=>{let[t]=e;return z("hue",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Saturation (HSL)"}),(0,r.jsx)(v,{value:[p.saturationHSL],min:0,max:2,step:.1,onValueChange:e=>{let[t]=e;return z("saturationHSL",t)}})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Luminance"}),(0,r.jsx)(v,{value:[p.luminance],min:0,max:2,step:.1,onValueChange:e=>{let[t]=e;return z("luminance",t)}})]}),(0,r.jsxs)("div",{className:"space-y-4 border border-[#222] rounded-lg p-4",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-white",children:"Curves"}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"RGB"}),(0,r.jsx)(F,{points:p.rgbCurve,onChange:e=>z("rgbCurve",e),color:"#FFFFFF",width:200,height:200})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Red Channel"}),(0,r.jsx)(F,{points:p.redCurve,onChange:e=>z("redCurve",e),color:"#FF4444",lineColor:"#FF4444",width:200,height:200})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Green Channel"}),(0,r.jsx)(F,{points:p.greenCurve,onChange:e=>z("greenCurve",e),color:"#44FF44",lineColor:"#44FF44",width:200,height:200})]}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)("label",{className:"text-sm text-gray-400",children:"Blue Channel"}),(0,r.jsx)(F,{points:p.blueCurve,onChange:e=>z("blueCurve",e),color:"#4444FF",lineColor:"#4444FF",width:200,height:200})]})]})]})})]}),(0,r.jsx)("div",{className:"relative bg-black/50 rounded-lg overflow-hidden border border-[#222]",style:{minHeight:"400px"},children:g?(0,r.jsx)("div",{className:"absolute inset-0 flex items-center justify-center bg-black/50",children:(0,r.jsx)("div",{className:"text-gray-400",children:"Loading image..."})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("img",{ref:M,src:e,alt:"Preview",className:"hidden",onError:()=>{f(!1),t(null)}}),(0,r.jsx)("canvas",{ref:k,className:"w-full h-full object-contain bg-black/50"})]})}),(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsx)(b,{variant:"outline",className:"bg-orange-700 text-white border-orange-900 hover:bg-orange-800",onClick:()=>{i("original"),I("original")},disabled:g,children:"Clear Filter"}),(0,r.jsxs)(b,{variant:"outline",className:"bg-green-700 text-white border-green-900 hover:bg-green-800",onClick:()=>{k.current&&k.current.toBlob(e=>{if(!e)return;let t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="edited-photo-".concat(a,".jpg"),document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},"image/jpeg",.95)},disabled:g,children:[(0,r.jsx)(n.Z,{className:"w-4 h-4 mr-2"}),"Export"]}),(0,r.jsx)(b,{variant:"outline",className:"bg-red-700 text-white border-red-900 hover:bg-red-800",onClick:()=>{t(null),i("original"),f(!1)},disabled:g,children:"Reset"})]})]}):(0,r.jsxs)("div",{className:"border-2 border-dashed border-[#222] rounded-lg p-12 text-center bg-black/50",children:[(0,r.jsx)("input",{type:"file",accept:"image/*",onChange:R,className:"hidden",id:"imageUpload"}),(0,r.jsxs)("label",{htmlFor:"imageUpload",className:"flex flex-col items-center justify-center cursor-pointer",children:[(0,r.jsx)(l.Z,{className:"w-12 h-12 text-gray-600 mb-4"}),(0,r.jsx)("span",{className:"text-gray-500",children:"Click to upload an image"})]})]})})]})}C.displayName=y.VY.displayName}},function(e){e.O(0,[732,971,938,744],function(){return e(e.s=3451)}),_N_E=e.O()}]);