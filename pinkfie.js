var PinkFie=(function(_){var a={},b=function(c){if(a[c])return a[c].exports;var e={},d={exports:e};a[c]=d;_[c](d,e,b);return d.exports};return b("./src/index.js")}({
	"./lib/at-asao.js": function(module, exports, __webpack_require__) {
		/* 
		 * ANIM TRED NELLYMOSER ASAO IN JAVASCRIPT
		 */
		var AT_ASAO=(function(){const _1=function(){this.bytePos=0,this.bitPos=0};_1.prototype.push=function(val,len,buf){if(this.bitPos==0)buf[this.bytePos]=val;else buf[this.bytePos]|=val<<this.bitPos;this.bitPos+=len;if(this.bitPos>=8){this.bytePos++,this.bitPos-=8;if(this.bitPos>0)buf[this.bytePos]=(val>>(len-this.bitPos))}},_1.prototype.pop=function(a,b){let c=(b[this.bytePos]&0xff)>>this.bitPos,d=8-this.bitPos;if(a>=d){this.bytePos++;if(a>d)c|=b[this.bytePos]<<d}this.bitPos=(this.bitPos+a)&7;return c&((1<<a)-1)};const _2=function(a){this.value=0,this.scale=0;if(a==0){this.value=a,this.scale=31;return}else if(a >=(1<<30)){this.value=0,this.scale=0;return}let v=a,s=0;if(v>0){do v<<=1,++s;while(v<(1<<30))}else{let b=1<<31;do v<<=1,++s;while(v>b+(1<<30))}this.value=v,this.scale=s},_o1=[0,2,4,6,8,10,12,14,16,18,21,24,28,32,37,43,49,56,64,73,83,95,109,124],_o2=[6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0],_t0=[2,2,2,2,2,2,2,2,2,3,3,4,4,5,6,6,7,8,9,10,12,14,15,0],_t1=[3134,5342,6870,7792,8569,9185,9744,10191,10631,11061,11434,11770,12116,12513,12925,13300,13674,14027,14352,14716,15117,15477,15824,16157,16513,16804,17090,17401,17679,17948,18238,18520,18764,19078,19381,19640,19921,20205,20500,20813,21162,21465,21794,22137,22453,22756,23067,23350,23636,23926,24227,24521,24819,25107,25414,25730,26120,26497,26895,27344,27877,28463,29426,31355],_t2=[-11725,-9420,-7910,-6801,-5948,-5233,-4599,-4039,-3507,-3030,-2596,-2170,-1774,-1383,-1016,-660,-329,-1,337,696,1085,1512,1962,2433,2968,3569,4314,5279,6622,8154,10076,12975],_t3=[0,-0.847256005,0.722470999,-1.52474797,-0.453148007,0.375360996,1.47178996,-1.98225796,-1.19293797,-0.582937002,-0.0693780035,0.390956998,0.906920016,1.486274,2.22154093,-2.38878703,-1.80675399,-1.41054201,-1.07736099,-0.799501002,-0.555810988,-0.333402008,-0.132449001,0.0568020009,0.254877001,0.477355003,0.738685012,1.04430604,1.39544594,1.80987501,2.39187598,-2.38938308,-1.98846805,-1.75140405,-1.56431198,-1.39221299,-1.216465,-1.04694998,-0.890510023,-0.764558017,-0.645457983,-0.52592802,-0.405954987,-0.302971989,-0.209690005,-0.123986997,-0.0479229987,0.025773,0.100134,0.173718005,0.258554012,0.352290004,0.456988007,0.576775014,0.700316012,0.842552006,1.00938797,1.18213499,1.35345602,1.53208196,1.73326194,1.97223496,2.39781404,-2.5756309,-2.05733204,-1.89849198,-1.77278101,-1.66626,-1.57421803,-1.49933195,-1.43166399,-1.36522806,-1.30009902,-1.22809303,-1.15885794,-1.09212506,-1.013574,-0.920284986,-0.828705013,-0.737488985,-0.644775987,-0.559094012,-0.485713989,-0.411031991,-0.345970005,-0.285115987,-0.234162003,-0.187058002,-0.144250005,-0.110716999,-0.0739680007,-0.0365610011,-0.00732900016,0.0203610007,0.0479039997,0.0751969963,0.0980999991,0.122038998,0.145899996,0.169434994,0.197045997,0.225243002,0.255686998,0.287010014,0.319709986,0.352582991,0.388906986,0.433492005,0.476945996,0.520482004,0.564453006,0.612204015,0.668592989,0.734165013,0.803215981,0.878404021,0.956620991,1.03970695,1.12937701,1.22111595,1.30802798,1.40248001,1.50568199,1.62277305,1.77249599,1.94308805,2.29039311,0],_t4=[0.999981225,0.999529421,0.998475611,0.996820271,0.994564593,0.991709828,0.988257587,0.984210074,0.979569793,0.974339426,0.968522072,0.962121427,0.955141187,0.947585583,0.939459205,0.930767,0.921513975,0.911705971,0.901348829,0.890448689,0.879012227,0.867046177,0.854557991,0.841554999,0.828045011,0.81403631,0.799537301,0.784556627,0.769103289,0.753186822,0.736816585,0.720002472,0.702754676,0.685083687,0.666999876,0.64851439,0.629638195,0.610382795,0.590759695,0.570780694,0.550458014,0.529803574,0.50883007,0.487550199,0.465976506,0.444122106,0.422000289,0.399624199,0.377007395,0.354163498,0.331106305,0.307849586,0.284407496,0.260794103,0.237023607,0.213110298,0.189068705,0.164913103,0.1406582,0.116318598,0.0919089988,0.0674438998,0.0429382995,0.0184067003],_t5=[0.125,0.124962397,0.124849401,0.124661297,0.124398097,0.124059901,0.123647101,0.123159699,0.122598201,0.121962801,0.1212539,0.120471999,0.119617499,0.118690997,0.117693,0.116624102,0.115484901,0.114276201,0.112998702,0.111653,0.110240199,0.108760901,0.107216097,0.105606697,0.103933699,0.102198102,0.100400902,0.0985433012,0.0966262966,0.094651103,0.0926188976,0.0905309021,0.0883883014,0.0861926004,0.0839449018,0.0816465989,0.0792991966,0.076903902,0.0744623989,0.0719759986,0.069446303,0.0668746978,0.0642627999,0.0616123006,0.0589246005,0.0562013984,0.0534444004,0.0506552011,0.0478353985,0.0449868999,0.0421111993,0.0392102003,0.0362856016,0.0333391018,0.0303725004,0.0273876991,0.0243862998,0.0213702004,0.0183412991,0.0153013002,0.0122520998,0.0091955997,0.00613350002,0.00306769996],_t6=[-0.00613590004,-0.0306748003,-0.0551952012,-0.0796824023,-0.104121603,-0.128498107,-0.152797207,-0.177004203,-0.201104596,-0.225083902,-0.248927593,-0.272621393,-0.296150893,-0.319501996,-0.342660695,-0.365613014,-0.388345003,-0.410843194,-0.433093786,-0.455083609,-0.47679919,-0.498227686,-0.519356012,-0.540171504,-0.560661614,-0.580814004,-0.600616515,-0.620057225,-0.639124393,-0.657806695,-0.676092684,-0.693971515,-0.711432219,-0.728464425,-0.745057821,-0.761202395,-0.77688849,-0.792106628,-0.806847572,-0.8211025,-0.834862888,-0.848120272,-0.860866904,-0.873094976,-0.884797096,-0.895966172,-0.906595707,-0.916679084,-0.926210225,-0.935183525,-0.943593502,-0.95143503,-0.958703518,-0.965394378,-0.971503913,-0.977028072,-0.981963873,-0.986308098,-0.990058184,-0.993211925,-0.995767415,-0.997723103,-0.999077678,-0.999830604],_t7=[0.00613590004,0.0184067003,0.0306748003,0.0429382995,0.0551952012,0.0674438998,0.0796824023,0.0919089988,0.104121603,0.116318598,0.128498107,0.1406582,0.152797207,0.164913103,0.177004203,0.189068705,0.201104596,0.213110298,0.225083902,0.237023607,0.248927593,0.260794103,0.272621393,0.284407496,0.296150893,0.307849586,0.319501996,0.331106305,0.342660695,0.354163498,0.365613014,0.377007395,0.388345003,0.399624199,0.410843194,0.422000289,0.433093786,0.444122106,0.455083609,0.465976506,0.47679919,0.487550199,0.498227686,0.50883007,0.519356012,0.529803574,0.540171504,0.550458014,0.560661614,0.570780694,0.580814004,0.590759695,0.600616515,0.610382795,0.620057225,0.629638195,0.639124393,0.64851439,0.657806695,0.666999876,0.676092684,0.685083687,0.693971515,0.702754676,0.711432219,0.720002472,0.728464425,0.736816585,0.745057821,0.753186822,0.761202395,0.769103289,0.77688849,0.784556627,0.792106628,0.799537301,0.806847572,0.81403631,0.8211025,0.828045011,0.834862888,0.841554999,0.848120272,0.854557991,0.860866904,0.867046177,0.873094976,0.879012227,0.884797096,0.890448689,0.895966172,0.901348829,0.906595707,0.911705971,0.916679084,0.921513975,0.926210225,0.930767,0.935183525,0.939459205,0.943593502,0.947585583,0.95143503,0.955141187,0.958703518,0.962121427,0.965394378,0.968522072,0.971503913,0.974339426,0.977028072,0.979569793,0.981963873,0.984210074,0.986308098,0.988257587,0.990058184,0.991709828,0.993211925,0.994564593,0.995767415,0.996820271,0.997723103,0.998475611,0.999077678,0.999529421,0.999830604,0.999981225],_t8=[32767,30840,29127,27594,26214,24966,23831,22795,21845,20972,20165,19418,18725,18079,17476,16913,16384,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],_t9=[0,0.0122715384,0.024541229,0.0368072242,0.0490676723,0.061320737,0.0735645667,0.0857973099,0.0980171412,0.110222213,0.122410677,0.134580716,0.146730468,0.158858135,0.170961887,0.183039889,0.195090324,0.207111374,0.219101235,0.231058106,0.242980182,0.254865646,0.266712755,0.27851969,0.290284693,0.302005947,0.313681751,0.32531029,0.336889863,0.348418683,0.359895051,0.371317178,0.382683426,0.393992037,0.405241311,0.416429549,0.427555084,0.438616246,0.449611336,0.460538715,0.471396744,0.482183784,0.492898196,0.50353837,0.514102757,0.524589658,0.534997642,0.545324981,0.555570245,0.565731823,0.575808167,0.585797846,0.59569931,0.605511069,0.615231574,0.624859512,0.634393275,0.643831551,0.653172851,0.662415802,0.671558976,0.680601001,0.689540565,0.698376238,0.707106769,0.715730846,0.724247098,0.732654274,0.740951121,0.749136388,0.757208824,0.765167296,0.773010433,0.780737221,0.78834641,0.795836926,0.803207517,0.81045723,0.817584813,0.824589312,0.831469595,0.838224709,0.84485358,0.851355195,0.857728601,0.863972843,0.870086968,0.876070082,0.881921232,0.887639642,0.893224299,0.898674488,0.903989315,0.909168005,0.914209783,0.919113874,0.923879504,0.928506076,0.932992816,0.937339008,0.941544056,0.945607305,0.949528158,0.953306019,0.956940353,0.960430503,0.963776052,0.966976464,0.970031261,0.972939968,0.975702107,0.97831738,0.980785251,0.983105481,0.985277653,0.987301409,0.989176512,0.990902662,0.992479503,0.993906975,0.99518472,0.996312618,0.997290432,0.998118103,0.99879545,0.999322355,0.999698818,0.999924719,1],_3=function(a){this.value=0,this.shift=0;if(a==124){this.value=4228,this.shift=19;return}else if(a==0){this.value=0,this.shift=0;return}let b=((~a>>>31)<<1)-1,c=a*b,d=-1;while((c&(1<<15))==0)c<<=1,d++;c>>=1;this.shift=27-d;let e=_t8[(c-0x3e00)>>10],f=c*e;f=(1<<30)-f,f+=(1<<14),f>>=15,f*=e,f+=(1<<14),f>>=15;let g=f;f*=c,f=(1<<29)-f,f+=(1<<14),f>>=15,f*=g,f+=(1<<13),f>>=14,f*=b;if(f>32767&&b==1)f=32767;else if(f<-32768&&b==-1)f=-32768;this.value=f},_f1=function(a,b,c,e,f){var d=0;if(c<=0)return d|0;var g=1<<(b-1);for(var i=0;i<c;++i){var h=a[i]-f;if(h<0)h=0;else h=(h+g)>>b;d+=Math.min(h,e)}return d|0},_f2=function(a,b,c,d){var e=0;for(var i=0;i<b;++i)if(a[i]>e)e=a[i];var f=0,g=new _2(e);f=g.scale-16;var h=new Int16Array(124);if(f<0)for(var i=0;i<b;++i)h[i]=(a[i]>>-f);else for(var i=0;i<b;++i)h[i]=(a[i]<<f);var k=new _3(b);for(var i=0;i<b;++i)h[i]=((h[i]*3)>>2);var l=0;for(var i=0;i<b;++i)l+=h[i];f+=11,l-=c<<f;var m=0,n=l-(c<<f);g=new _2(n),m=((n>>16)*k.value)>>15;var o=31-k.shift-g.scale;if(o>=0)m<<=o;else m>>=-o;var p=_f1(h,f,b,6,m);if(p!=c){var a1=(p-c),a2=0;if(a1<=0)for(;a1>=-16384;a1<<=1)a2++;else for(;a1<16384;a1<<=1)a2++;var a3=(a1*k.value)>>15;a2=f-(k.shift+a2-15);if(a2>=0)a3<<=a2;else a3>>=-a2;var a4=1,b1=0,b2=0;for(;;){b1=p,b2=m,m+=a3,p=_f1(h,f,b,6,m);if(++a4>19)break;if((p-c)*(b1-c)<=0)break};if(p!=c){var b3=0,b4=0,b5=0;if(p>c)b3=m,m=b2,b4=p,b5=b1;else b3=b2,b4=b1,b5=p;while(p!=c&&a4<20){var c1=(m+b3)>>1;p=_f1(h,f,b,6,c1);++a4;if(p>c)b3=c1,b4=p;else m=c1,b5=p}var c2=Math.abs((b4-c)|0),c3=Math.abs((b5-c)|0);if(c2<c3)m=b3,p=b4;else p=b5}}for(var i=0;i<b;++i){var d1=h[i]-m;if(d1>=0)d1=(d1+(1<<(f-1)))>>f;else d1=0;d[i]=Math.min(d1,6)}if(p>c){var i=0,d2=0;for(;d2<c;++i)d2+=d[i];d2-=d[i-1];d[i-1]=c-d2;p=c;for(;i<b;++i)d[i]=0}return(c-p)|0},_f3=function(a,b,c){var f=c<<1,j=1;for(var i=1;i<f;i+=2){if(i<j){var d=a[b+i];a[b+i]=a[b+j],a[b+j]=d;var e=a[b+i-1];a[b+i-1]=a[b+j-1],a[b+j-1]=e}var x=c;while(x>1&&x<j)j-=x,x>>=1;j+=x}},_f4=function(a,b,c){var d=1<<c,j=0;_f3(a,b,d);for(var i=(d>>1);i>0;--i,j+=4){var j0=a[b+j],j1=a[b+j+1],j2=a[b+j+2],j3=a[b+j+3];a[b+j]=j0+j2,a[b+j+1]=j1+j3,a[b+j+2]=j0-j2,a[b+j+3]=j1-j3};j=0;for(var i=(d>>2);i>0;--i,j+=8){var j0=a[b+j],j1=a[b+j+1],j2=a[b+j+2],j3=a[b+j+3],j4=a[b+j+4],j5=a[b+j+5],j6=a[b+j+6],j7=a[b+j+7];a[b+j]=j0+j4,a[b+j+1]=j1+j5,a[b+j+2]=j2+j7,a[b+j+3]=j3-j6,a[b+j+4]=j0-j4,a[b+j+5]=j1-j5,a[b+j+6]=j2-j7,a[b+j+7]=j3+j6}var i=0,x=(d>>3),y=64,z=4;for(var idx1=c-2;idx1>0;--idx1,z<<=1,y>>=1,x>>=1){j=0;for(var idx2=x;idx2!=0;--idx2,j+=z<<1){for(var idx3=z>>1;idx3>0;--idx3,j+=2,i+=y){var k=j+(z<<1),j0=a[b+j],j1=a[b+j+1],k0=a[b+k],k1=a[b+k+1];a[b+k]=(j0-(k0*_t9[128-i]+k1*_t9[i])),a[b+j]=(j0+(k0*_t9[128-i]+k1*_t9[i])),a[b+k+1]=(j1+(k0*_t9[i]-k1*_t9[128-i])),a[b+j+1]=(j1-(k0*_t9[i]-k1*_t9[128-i]))};for(var idx4=z>>1;idx4>0;--idx4,j+=2,i-=y){var k=j+(z<<1),j0=a[b+j],j1=a[b+j+1],k0=a[b+k],k1=a[b+k+1];a[b+k]=(j0+(k0*_t9[128-i]-k1*_t9[i])),a[b+j]=(j0-(k0*_t9[128-i]-k1*_t9[i])),a[b+k+1]=(j1+(k1*_t9[128-i]+k0*_t9[i])),a[b+j+1]=(j1-(k1*_t9[128-i]+k0*_t9[i]))}}}},_f5=function(a,b,c,d,e){var f=1<<c,g=(f>>1)-1,h=f>>2;for(var i=0;i<h;++i){var i2=i<<1,j=f-1-i2,k=j-1,in_i2=a[b+i2],in_i2_1=a[b+i2+1],in_j=a[b+j],in_k=a[b+k];d[e+i2]=(_t4[i]*in_i2-_t6[i]*in_j),d[e+i2+1]=(in_j*_t4[i]+in_i2*_t6[i]),d[e+k]=(_t4[g-i]*in_k-_t6[g-i]*in_i2_1),d[e+j]=(in_i2_1*_t4[g-i]+in_k*_t6[g-i])};_f4(d,e,c-1);var l=d[e+f-1],m=d[e+f-2];d[e]=_t5[0]*d[e],d[e+f-1]=d[e+1]*-_t5[0],d[e+f-2]=_t5[g]*d[e+f-2]+_t5[1]*l,d[e+1]=m*_t5[1]-l*_t5[g];var o=f-3,p=g,j=3;for(var i=1;i<h;++i,--p,o-=2,j+=2){var q=d[e+o],r=d[e+o-1],s=d[e+j],t=d[e+j-1];d[e+j-1]=(_t5[p]*s+_t5[(j-1)>>1]*t),d[e+j]=(r*_t5[(j+1)>>1]-q*_t5[p-1]),d[e+o]=(t*_t5[p]-s*_t5[(j-1)>>1]),d[e+o-1]=(_t5[(j+1)>>1]*q+_t5[p-1]*r)}},_f6=function(a,b,c,d,e){var f=1<<c,g=f>>2,y=f-1,x=f>>1,j=x-1,i=0;_f5(b,0,c,d,e);for(;i<g;++i,--j,++x,--y){var h=a[i],k=a[j],l=d[e+x],m=d[e+y];a[i]=-d[e+j],a[j]=-d[e+i],d[e+i]=(h*_t7[y]+l*_t7[i]),d[e+j]=(k*_t7[x]+m*_t7[j]),d[e+x]=(_t7[x]*-m+_t7[j]*k),d[e+y]=(_t7[y]*-l+_t7[i]*h)}},_f7=function(a,b,c){const d=new Uint8Array(124),e1=new Float32Array(128),e2=new Float32Array(124),e3=new Float32Array(124),f=new Int32Array(124),o=new _1;var g=o.pop(_o2[0],b);d[0]=g,e1[0]=_t1[g];for(var i=1;i<23;i++)g=o.pop(_o2[i],b),d[i]=g,e1[i]=e1[i-1]+_t2[g];for(var i=0;i<23;i++){var h=Math.pow(2.0,e1[i]*(0.5*0.0009765625)),k=_o1[i],l=_o1[i+1];for(;k<l;++k)e3[k]=e1[i],e2[k]=h}var m=_f2(e3,124,198,f);for(var n=0;n<256;n+=128){for(var i=0;i<124;++i){let h=f[i],k=e2[i];if(h>0){let l=1<<h;g=o.pop(h,b),d[i]=g,k*=_t3[l-1+g]}else{var p=Math.random()*4294967296.0;if(p<(1<<30)+(1<<14))k*=-0.707099974;else k*=0.707099974}e1[i]=k;};for(var i=124;i<128;++i)e1[i]=0;for(var i=m;i>0;i-=8){if(i>8)o.pop(8,b);else{o.pop(i,b);break}};_f6(a,e1,7,c,n)}},_f8=function(a,b,c,d){var e=0;var f=Math.abs(a-b[c]);for(var i=c;i<d;++i){var g=Math.abs(a-b[i]);if(g<f)f=g,e=i-c}return e},_f9=function(a,b,c,d){var e=c,f=d;do{var g=(e+f)>>1;if(a>b[g])e=g;else f=g} while(f-e>1);if(f!=d)if(a-b[e]>b[f]-a)e=f;return e-c},_f10=function(a,b,c,d,e,f){var g=1<<d,h=g>>2,y=g-1,x=g>>1,j=x-1,i=0;for(;i<h;++i,++x,--y,--j)e[f+x]=a[i],e[f+y]=a[j],e[f+i]=-b[c+j]*_t7[x]-b[c+x]*_t7[j],e[f+j]=-b[c+y]*_t7[i]-b[c+i]*_t7[y],a[i]=b[c+i]*_t7[i]-b[c+y]*_t7[y],a[j]=b[c+j]*_t7[j]-b[c+x]*_t7[x];_f5(e,f,d,e,f)},_f11=function(q,w,e){const c=new Float32Array(256),d=new Float32Array(23),f=new Float32Array(23),g=new Float32Array(124),h=new Float32Array(124),j=new Int32Array(124),k=new _1;_f10(q,w,0,7,c,0);_f10(q,w,128,7,c,128);for(var i=0;i<23;++i){var l=_o1[i],m=_o1[i+1],n=0.0;for(;l<m;++l){var a=c[l],b=c[l+128];n+=a*a+b*b};var o=Math.max(1.0,n/(_t0[i]<<1));d[i]=Math.round(Math.log(o)*(1.44269502*1024.0))};var r=_f8(d[0],_t1,0,64);f[0]=_t1[r];k.push(r,_o2[0],e);for(var i=1;i<23;++i){r=_f8(d[i]-f[i-1],_t2,0,32);f[i]=f[i-1]+_t2[r];k.push(r,_o2[i],e)};for(var i=0;i<23;++i)d[i]=(1.0/Math.pow(2.0,f[i]*(0.5*0.0009765625)));for(var i=0;i<23;++i){var l=_o1[i],m=_o1[i+1];for(;l<m;++l)g[l]=f[i],h[l]=d[i]}var s=_f2(g,124,198,j);for(var u=0;u<256;u+=128){for(var i=0;i<124;++i){var p=j[i];if(p>0){var t=1<<p;r=_f9(h[i]*c[u+i],_t3,t-1,(t<<1)-1);k.push(r,p,e)}}for(var i=s;i>0;i-=8){if(i>8)k.push(0,8,e);else{k.push(0,i,e);break}}}};return{decode:_f7,encode:_f11}}());
		module.exports = AT_ASAO;
	},
	"./lib/at-h263-js.js": function(module, exports, __webpack_require__) {
		/* 
		 * ANIM TRED H.263 IN JAVASCRIPT
		 */
		var AT_H263=(function(){function saturatingSub(a,b){return a-b}function asU8(_){return(_<<24)>>>24}function asI8(_){return(_<<24)>>24}function asU16(_){return(_<<16)>>>16}function asI16(_){return(_<<16)>>16}function num_clamp(_,a,b){return Math.max(Math.min(_, b), a)}function asfgdgdfg(_,a,b){return(_>=a)&&(_<=b)}function op_cmp(a,b){if(a>b){return"greater"}else if(a<b){return"less"}else{return"equal"}}function is_eof_error(type){return(type=="EndOfFile")||(type=="_")}class A{constructor(){this.version=0,this.temporal_reference=0,this.format=null,this.options=null,this.has_plusptype=false,this.has_opptype=false,this.picture_type=null,this.motion_vector_range=null,this.slice_submode=null,this.scalability_layer=null,this.reference_picture_selection_mode=null,this.prediction_reference=0,this.backchannel_message=null,this.reference_picture_resampling=null,this.quantizer=0,this.multiplex_bitstream=0,this.pb_reference=0,this.pb_quantizer=null,this.extra=[]}}class B{constructor(a,b){this.type=a,this.value=(b||null)}}B.Square=1,B.Par12_11=2,B.Par10_11=3,B.Par16_11=4,B.Par40_33=5,B.Reserved=6,B.Extended=7;class C{constructor(q,w,e){this.pixelAspectRatio=q,this.pictureWidthIndication=w,this.pictureHeightIndication=e}}class D{constructor(a){this.type=a}}D.Extended=0,D.Unlimited=1;class E{constructor(a,b){this.type=a,this.value=b||null}intoWidthAndHeight(){switch(this.type){case E.SubQcif:return[128,96];case E.QuarterCif:return[176,144];case E.FullCif:return[352,288];case E.FourCif:return[704,576];case E.SixteenCif:return[1408,1152];case E.Reserved:return null;case E.Extended:return[this.value.pictureWidthIndication,this.value.pictureHeightIndication]}}}E.SubQcif=1,E.QuarterCif=2,E.FullCif=3,E.FourCif=4,E.SixteenCif=5,E.Reserved=6,E.Extended=7;class F{constructor(a,b){this.type=a,this.value=b}is_any_pbframe(){return (this.type==F.PbFrame)||(this.type==F.ImprovedPbFrame)}is_disposable(){return this.type==F.DisposablePFrame}getType(){switch(this.type){case F.IFrame:return"IFrame";case F.PFrame:return"PFrame";case F.PbFrame:return"PbFrame";case F.EiFrame:return"EiFrame";case F.EpFrame:return"EpFrame";case F.Reserved:return"Reserved";case F.DisposablePFrame:return"DisposablePFrame"}}}F.IFrame=1,F.PFrame=2,F.PbFrame=3,F.ImprovedPbFrame=4,F.BFrame=5,F.EiFrame=6,F.EpFrame=7,F.Reserved=8,F.DisposablePFrame=9;class G{constructor(a,b){this.type=a,this.value=b}}G.Zero=1,G.Dc=2,G.Horiz=3,G.Vert=4,G.Full=5;class H{constructor(){this.USE_SPLIT_SCREEN=false,this.USE_DOCUMENT_CAMERA=false,this.RELEASE_FULL_PICTURE_FREEZE=false,this.UNRESTRICTED_MOTION_VECTORS=false,this.SYNTAX_BASED_ARITHMETIC_CODING=false,this.ADVANCED_PREDICTION=false,this.ADVANCED_INTRA_CODING=false,this.DEBLOCKING_FILTER=false,this.SLICE_STRUCTURED=false,this.REFERENCE_PICTURE_SELECTION=false,this.INDEPENDENT_SEGMENT_DECODING=false,this.ALTERNATIVE_INTER_VLC=false,this.MODIFIED_QUANTIZATION=false,this.REFERENCE_PICTURE_RESAMPLING=false,this.REDUCED_RESOLUTION_UPDATE=false,this.ROUNDING_TYPE_ONE=false,this.USE_DEBLOCKER=false}static empty(){return new H()}}class I{constructor(q,e){let[w,h]=e.intoWidthAndHeight();let a=new Uint8Array(w*h),s=Math.ceil(w/2.0),d=Math.ceil(h/2.0),f=s*d,g=new Uint8Array(f),j=new Uint8Array(f);this.picture_header=q,this.format=e,this.luma=a,this.chroma_b=g,this.chroma_r=j,this.chroma_samples_per_row=s}as_yuv(){return[this.luma,this.chroma_b,this.chroma_r]}as_header(){return this.picture_header}as_luma_mut(){return this.luma}as_chroma_b_mut(){return this.chroma_b}as_chroma_r_mut(){return this.chroma_r}as_luma(){return this.luma}as_chroma_b(){return this.chroma_b}as_chroma_r(){return this.chroma_r}luma_samples_per_row(){return this.format.intoWidthAndHeight()[0]}}function decodeSorensonPType(_){var x,y;switch(_.readBits(3)){case 0:x=null;y=8;break;case 1:x=null;y=16;break;case 2:x=new E(E.FullCif);y=0;break;case 3:x=new E(E.QuarterCif);y=0;break;case 4:x=new E(E.SubQcif);y=0;break;case 5:x=new E(E.Extended,new C(new B(B.Square),320,240));y=0;break;case 6:x=new E(E.Extended,new C(new B(B.Square),160,120));y=0;break;default:x=new E(E.Reserved);y=0}if(x===null){let a=_.readBits(y),b=_.readBits(y);x=new E(E.Extended,new C(new B(B.Square),a,b))}var u=_.readBits(2),v;switch(u){case 0:v=new F(F.IFrame);break;case 1:v=new F(F.PFrame);break;case 2:v=new F(F.DisposablePFrame);break;default:v=new F(F.Reserved,u);break;}let j = H.empty();if(_.readBits(1) == 1)j.USE_DEBLOCKER=true;return [x, v, j]}function decodePei(_){var r=[];while(true){var e=_.readBits(1);if(e==1){r.push(_.readUint8());}else{break}}return r}function decodePicture(_,x,y){var q=_.recognizeStartCode(false);_.skipBits(17 + q);var w=_.readBits(5);if(x.sorensonSpark){var a=_.readUint8();var[z,x,c]=decodeSorensonPType(_);var s=_.readBits(5);var d=decodePei(_);var m=new A();m.version=w,m.temporal_reference=a,m.format=z,m.options=c,m.has_plusptype=false,m.has_opptype=false,m.picture_type=x,m.quantizer=s,m.extra=d,m.motion_vector_range=new D(D.Unlimited),m.slice_submode=null,m.scalability_layer=null,m.reference_picture_selection_mode=null,m.prediction_reference=null,m.backchannel_message=null,m.reference_picture_resampling=null,m.multiplex_bitstream=null,m.pb_reference=null,m.pb_quantizer=null;return m}}class J{constructor(a,b,c){this.codes_luma=a,this.codes_chroma_b=b,this.codes_chroma_r=c}}class K{constructor(n){this.n=n}static zero(){return new K(0)}static from(a){return new K(asI16(Math.floor(a*2)))}static from_unit(a){return new K(asI16(a))}is_mv_within_range(_){return -_.n<=this.n&&this.n<_.n}invert(){switch(op_cmp(this.n,0)){case"greater":return new K(this.n-64);case"less":return new K(this.n + 64);case"equal":return this}}average_sum_of_mvs(){let a=(this.n>>4)<<1,b=this.n&0x0F;if(asfgdgdfg(b,0,2)){return new K(a)}else if(asfgdgdfg(b,14,15)){return new K(a+2)}else{return new K(a+1)}}median_of(a,b){var _=this.n,x=a.n,y=b.n;if(_>x){if(y>x){if(y>_){return this}else{return b}}else{return a}}else if(x>y){if(y>_){return b}else{return this}}else{return a}}into_lerp_parameters(){if(this.n%2==0){return [asI16(this.n/2),false]}else if(this.n<0){return [asI16(this.n/2-1),true]}else{return [asI16(this.n/2),true]}}}K.STANDARD_RANGE=new K(32),K.EXTENDED_RANGE=new K(64),K.EXTENDED_RANGE_QUADCIF=new K(128),K.EXTENDED_RANGE_SIXTEENCIF=new K(256),K.EXTENDED_RANGE_BEYONDCIF=new K(512);class L{constructor(a,b){this.n1=a,this.n2=b}static zero(){return new L(K.zero(),K.zero())}median_of(a,b){return new L(this.n1.median_of(a.n1,b.n1),this.n2.median_of(a.n2,b.n2))}into_lerp_parameters(){return [this.n1.into_lerp_parameters(),this.n2.into_lerp_parameters()]}add(_){var a=asI16(this.n1.n+_.n1.n),b =asI16(this.n2.n+_.n2.n);return new L(new K(a),new K(b))}average_sum_of_mvs(){return new L(this.n1.average_sum_of_mvs(),this.n2.average_sum_of_mvs())}}class M{constructor(n){this.n=n}static from_u8(_){if(_==0||_ ==128){return null}else{return new M(_)}}into_level(){if(this.n==255){return 1024}else{return asI16(asI16(asU16(this.n))<<3)}}}class N{constructor(a,b,c){this.is_short=a,this.run=b,this.level=c}}class O{constructor(a,b){this.intradc=a,this.tcoef=b}}class P{constructor(a,b){this.type=a,this.value=b}}P.End=1,P.Fork=2;class Q{constructor(a){this.type=a}is_inter(){return this.type==Q.Inter||this.type==Q.InterQ||this.type==Q.Inter4V||this.type==Q.Inter4Vq}is_intra(){return this.type==Q.Intra||this.type==Q.IntraQ}has_fourvec(){return this.type==Q.Inter4V||this.type==Q.Inter4Vq}has_quantizer(){return this.type==Q.InterQ||this.type==Q.IntraQ||this.type==Q.Inter4Vq}}Q.Inter=1,Q.InterQ=2,Q.Inter4V=3,Q.Intra=4,Q.IntraQ=5,Q.Inter4Vq=6;class R{constructor(a,b){this.type=a,this.value=b}}R.Uncoded=1,R.Stuffing=2,R.Coded=3;class S{constructor(a,b){this.type=a,this.value=b}}S.Stuffing=1,S.Invalid=2,S.Valid=3;const MCBPC_I_TABLE=[new P(P.Fork,[2,1]),new P(P.End,new S(S.Valid,[new Q(Q.Intra),false,false])),new P(P.Fork,[6,3]),new P(P.Fork,[4,5]),new P(P.End,new S(S.Valid,[new Q(Q.Intra),true,false])),new P(P.End,new S(S.Valid,[new Q(Q.Intra),true,true])),new P(P.Fork,[8,7]),new P(P.End,new S(S.Valid,[new Q(Q.Intra),false,true])),new P(P.Fork,[10,9]),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),false,false])),new P(P.Fork,[14,11]),new P(P.Fork,[12,13]),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),true,false])),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),true,true])),new P(P.Fork,[16,20]),new P(P.End,new S(S.Invalid)),new P(P.Fork,[17,15]),new P(P.Fork,[18,15]),new P(P.Fork,[15,19]),new P(P.End,new S(S.Stuffing)),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),false,true]))];const MCBPC_P_TABLE=[new P(P.Fork,[2,1]),new P(P.End,new S(S.Valid,[new Q(Q.Inter),false,false])),new P(P.Fork,[6,3]),new P(P.Fork,[4,5]),new P(P.End,new S(S.Valid,[new Q(Q.Inter4V),false,false])),new P(P.End,new S(S.Valid,[new Q(Q.InterQ),false,false])),new P(P.Fork,[10,7]),new P(P.Fork,[8,9]),new P(P.End,new S(S.Valid,[new Q(Q.Inter),true,false])),new P(P.End,new S(S.Valid,[new Q(Q.Inter),false,true])),new P(P.Fork,[16,11]),new P(P.Fork,[13,12]),new P(P.End,new S(S.Valid,[new Q(Q.Intra),false,false])),new P(P.Fork,[14,15]),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),false,false])),new P(P.End,new S(S.Valid,[new Q(Q.Inter),true,true])),new P(P.Fork,[24,17]),new P(P.Fork,[18,21]),new P(P.Fork,[19,20]),new P(P.End,new S(S.Valid,[new Q(Q.Inter4V),true,false])),new P(P.End,new S(S.Valid,[new Q(Q.Inter4V),false,true])),new P(P.Fork,[22,23]),new P(P.End,new S(S.Valid,[new Q(Q.InterQ),true,false])),new P(P.End,new S(S.Valid,[new Q(Q.InterQ),false,true])),new P(P.Fork,[30,25]),new P(P.Fork,[27,26]),new P(P.End,new S(S.Valid,[new Q(Q.Intra),true,true])),new P(P.Fork,[28,29]),new P(P.End,new S(S.Valid,[new Q(Q.Intra),false,true])),new P(P.End,new S(S.Valid,[new Q(Q.Inter4V),true,true])),new P(P.Fork,[36,31]),new P(P.Fork,[33,32]),new P(P.End,new S(S.Valid,[new Q(Q.Intra),true,false])),new P(P.Fork,[34,35]),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),false,true])),new P(P.End,new S(S.Valid,[new Q(Q.InterQ),true,true])),new P(P.Fork,[40,37]),new P(P.Fork,[38,39]),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),true,true])),new P(P.End,new S(S.Valid,[new Q(Q.IntraQ),true,false])),new P(P.Fork,[42,41]),new P(P.End,new S(S.Stuffing)),new P(P.Fork,[43,44]),new P(P.End,new S(S.Invalid)),new P(P.Fork,[45,46]),new P(P.End,new S(S.Valid,[new Q(Q.Inter4Vq),false,false])),new P(P.Fork,[47,50]),new P(P.Fork,[48,49]),new P(P.End,new S(S.Valid,[new Q(Q.Inter4Vq),false,true])),new P(P.End,new S(S.Invalid)),new P(P.Fork,[51,52]),new P(P.End,new S(S.Valid,[new Q(Q.Inter4Vq),true,false])),new P(P.End,new S(S.Valid,[new Q(Q.Inter4Vq),true,true]))];const MODB_TABLE=[new P(P.Fork,[1,2]),new P(P.End,[false,false]),new P(P.Fork,[3,4]),new P(P.End,[false,true]),new P(P.End,[true,true])];function decode_cbpb(_){let a=_.readBits(1)==1,b=_.readBits(1)==1,c=_.readBits(1)==1,d=_.readBits(1)==1,e=_.readBits(1)==1,f=_.readBits(1)==1;return new J([a, b, c, d],e,f)}const CBPY_TABLE_INTRA=[new P(P.Fork,[1,24]),new P(P.Fork,[2,17]),new P(P.Fork,[3,12]),new P(P.Fork,[4,9]),new P(P.Fork,[5,6]),new P(P.End,null),new P(P.Fork,[7,8]),new P(P.End,[false,true,true,false]),new P(P.End,[true,false,false,true]),new P(P.Fork,[10,11]),new P(P.End,[true,false,false,false]),new P(P.End,[false,true,false,false]),new P(P.Fork,[13,16]),new P(P.Fork,[14,15]),new P(P.End,[false,false,true,false]),new P(P.End,[false,false,false,true]),new P(P.End,[false,false,false,false]),new P(P.Fork,[18,21]),new P(P.Fork,[19,20]),new P(P.End,[true,true,false,false]),new P(P.End,[true,false,true,false]),new P(P.Fork,[22,23]),new P(P.End,[true,true,true,false]),new P(P.End,[false,true,false,true]),new P(P.Fork,[25,32]),new P(P.Fork,[26,29]),new P(P.Fork,[27,28]),new P(P.End,[true,true,false,true]),new P(P.End,[false,false,true,true]),new P(P.Fork,[30,31]),new P(P.End,[true,false,true,true]),new P(P.End,[false,true,true,true]),new P(P.End,[true,true,true,true])];function decode_dquant(_){switch(_.readBits(2)){case 0:return -1;case 1:return -2;case 2:return 1;case 3:return 2;default:throw new Error("InternalDecoderError")}}const MVD_TABLE=[new P(P.Fork,[2,1]),new P(P.End,0.0),new P(P.Fork,[6,3]),new P(P.Fork,[4,5]),new P(P.End,0.5),new P(P.End,-0.5),new P(P.Fork,[10,7]),new P(P.Fork,[8,9]),new P(P.End,1.0),new P(P.End,-1.0),new P(P.Fork,[14,11]),new P(P.Fork,[12,13]),new P(P.End,1.5),new P(P.End,-1.5),new P(P.Fork,[26,15]),new P(P.Fork,[19,16]),new P(P.Fork,[17,18]),new P(P.End,2.0),new P(P.End,-2.0),new P(P.Fork,[23,20]),new P(P.Fork,[21,22]),new P(P.End,2.5),new P(P.End,-2.5),new P(P.Fork,[24,25]),new P(P.End,3.0),new P(P.End,-3.0),new P(P.Fork,[50,27]),new P(P.Fork,[31,28]),new P(P.Fork,[29,30]),new P(P.End,3.5),new P(P.End,-3.5),new P(P.Fork,[39,32]),new P(P.Fork,[36,33]),new P(P.Fork,[34,35]),new P(P.End,4.0),new P(P.End,-4.0),new P(P.Fork,[37,38]),new P(P.End,4.5),new P(P.End,-4.5),new P(P.Fork,[43,40]),new P(P.Fork,[41,42]),new P(P.End,5.0),new P(P.End,-5.0),new P(P.Fork,[47,44]),new P(P.Fork,[45,46]),new P(P.End,5.5),new P(P.End,-5.5),new P(P.Fork,[48,49]),new P(P.End,6.0),new P(P.End,-6.0),new P(P.Fork,[82,51]),new P(P.Fork,[67,52]),new P(P.Fork,[60,53]),new P(P.Fork,[57,54]),new P(P.Fork,[55,56]),new P(P.End,6.5),new P(P.End,-6.5),new P(P.Fork,[58,59]),new P(P.End,7.0),new P(P.End,-7.0),new P(P.Fork,[64,61]),new P(P.Fork,[62,63]),new P(P.End,7.5),new P(P.End,-7.5),new P(P.Fork,[65,66]),new P(P.End,8.0),new P(P.End,-8.0),new P(P.Fork,[75,68]),new P(P.Fork,[72,69]),new P(P.Fork,[70,71]),new P(P.End,8.5),new P(P.End,-8.5),new P(P.Fork,[73,74]),new P(P.End,9.0),new P(P.End,-9.0),new P(P.Fork,[79,76]),new P(P.Fork,[77,78]),new P(P.End,9.5),new P(P.End,-9.5),new P(P.Fork,[80,81]),new P(P.End,10.0),new P(P.End,-10.0),new P(P.Fork,[98,83]),new P(P.Fork,[91,84]),new P(P.Fork,[88,85]),new P(P.Fork,[86,87]),new P(P.End,10.5),new P(P.End,-10.5),new P(P.Fork,[89,90]),new P(P.End,11.0),new P(P.End,-11.0),new P(P.Fork,[95,92]),new P(P.Fork,[93,94]),new P(P.End,11.5),new P(P.End,-11.5),new P(P.Fork,[96,97]),new P(P.End,12.0),new P(P.End,-12.0),new P(P.Fork,[114,99]),new P(P.Fork,[107,100]),new P(P.Fork,[104,101]),new P(P.Fork,[102,103]),new P(P.End,12.5),new P(P.End,-12.5),new P(P.Fork,[105,106]),new P(P.End,13.0),new P(P.End,-13.0),new P(P.Fork,[111,108]),new P(P.Fork,[109,110]),new P(P.End,13.5),new P(P.End,-13.5),new P(P.Fork,[112,113]),new P(P.End,14.0),new P(P.End,-14.0),new P(P.Fork,[122,115]),new P(P.Fork,[119,116]),new P(P.Fork,[117,118]),new P(P.End,14.5),new P(P.End,-14.5),new P(P.Fork,[120,121]),new P(P.End,15.0),new P(P.End,-15.0),new P(P.Fork,[129,123]),new P(P.Fork,[127,124]),new P(P.Fork,[125,126]),new P(P.End,15.5),new P(P.End,-15.5),new P(P.Fork,[129,128]),new P(P.End,-16.0),new P(P.End,null)];function decode_motion_vector(_,a,b){if(b.UNRESTRICTED_MOTION_VECTORS&&a.has_plusptype){let x=_.read_umv(),y=_.read_umv();return new L(x,y)}else{var f=_.readVLC(MVD_TABLE),g=_.readVLC(MVD_TABLE);if(f===null||g===null)throw new Error("InvalidMvd");let x=K.from(f),y=K.from(g);return new L(x,y)}}function decode_macroblock(_,a,b){return _.withTransaction(function(_){let c=0;if(a.picture_type.type==F.IFrame)c=0;else c=_.readBits(1);if(c==0){var d=null,e=a.picture_type;switch(e.type){case F.IFrame:d=_.readVLC(MCBPC_I_TABLE);break;case F.PFrame:d=_.readVLC(MCBPC_P_TABLE);break;default:throw new Error("UnimplementedDecoding")}var f=null,g=null,h=null;switch(d.type){case S.Stuffing:return new R(R.Stuffing);case S.Invalid:throw new Error("InvalidMacroblockHeader");case S.Valid:f=d.value[0],g=d.value[1],h=d.value[2];break}var j=null,k=null;if(e.type==F.PbFrame){var i=_.readVLC(MODB_TABLE);j=i[0],k=i[1]}else j=false,k=false;let l=null;if(f.is_intra()){var i=_.readVLC(CBPY_TABLE_INTRA);if (i===null)throw new Error("InvalidMacroblockCodedBits");l=i}else{var i=_.readVLC(CBPY_TABLE_INTRA);if (i===null)throw new Error("InvalidMacroblockCodedBits");l=[!i[0],!i[1],!i[2],!i[3]]}let q = null;if(j)q=decode_cbpb(_);let w=null;if(b.MODIFIED_QUANTIZATION){throw new Error("UnimplementedDecoding")}else if(f.has_quantizer())w=decode_dquant(_);let r=null;if(f.is_inter()||e.is_any_pbframe())r=decode_motion_vector(_, a, b);let t=null;if(f.has_fourvec()){let a1=decode_motion_vector(_,a,b),a2=decode_motion_vector(_,a,b),a3=decode_motion_vector(_,a,b);t=[a1,a2,a3]}let u=null;if(k){let a1=decode_motion_vector(_,a,b),a2=decode_motion_vector(_,a,b),a3=decode_motion_vector(_,a,b),a4=decode_motion_vector(_,a,b);u=[a1,a2,a3,a4]}return new R(R.Coded,{mb_type:f,coded_block_pattern:{codes_luma:l,codes_chroma_b:g,codes_chroma_r:h},coded_block_pattern_b:q,d_quantizer:w,motion_vector:r,addl_motion_vectors:t,motion_vectors_b:u})}else return new R(R.Uncoded)})}class T{constructor(a,b){this.type=a,this.value=b}}T.EscapeToLong=1,T.Run=2;const TCOEF_TABLE=[new P(P.Fork,[8,1]),new P(P.Fork,[2,3]),new P(P.End,new T(T.Run,{last:false,run:0,level:1})),new P(P.Fork,[4,5]),new P(P.End,new T(T.Run,{last:false,run:1,level:1})),new P(P.Fork,[6,7]),new P(P.End,new T(T.Run,{last:false,run:2,level:1})),new P(P.End,new T(T.Run,{last:false,run:0,level:2})),new P(P.Fork,[28,9]),new P(P.Fork,[15,10]),new P(P.Fork,[12,11]),new P(P.End,new T(T.Run,{last:true,run:0,level:1})),new P(P.Fork,[13,14]),new P(P.End,new T(T.Run,{last:false,run:4,level:1})),new P(P.End,new T(T.Run,{last:false,run:3,level:1})),new P(P.Fork,[16,23]),new P(P.Fork,[17,20]),new P(P.Fork,[18,19]),new P(P.End,new T(T.Run,{last:false,run:9,level:1})),new P(P.End,new T(T.Run,{last:false,run:8,level:1})),new P(P.Fork,[21,22]),new P(P.End,new T(T.Run,{last:false,run:7,level:1})),new P(P.End,new T(T.Run,{last:false,run:6,level:1})),new P(P.Fork,[25,24]),new P(P.End,new T(T.Run,{last:false,run:5,level:1})),new P(P.Fork,[26,27]),new P(P.End,new T(T.Run,{last:false,run:1,level:2})),new P(P.End,new T(T.Run,{last:false,run:0,level:3})),new P(P.Fork,[52,29]),new P(P.Fork,[37,30]),new P(P.Fork,[31,34]),new P(P.Fork,[32,33]),new P(P.End,new T(T.Run,{last: true,run:4,level:1})),new P(P.End,new T(T.Run,{last:true,run:3,level:1})),new P(P.Fork,[35,36]),new P(P.End,new T(T.Run,{last:true,run:2,level:1})),new P(P.End,new T(T.Run,{last:true,run:1,level:1})),new P(P.Fork,[38,45]),new P(P.Fork,[39,42]),new P(P.Fork,[40,41]),new P(P.End,new T(T.Run,{last:true,run:8,level:1})),new P(P.End,new T(T.Run,{last:true,run:7,level:1})),new P(P.Fork,[43,44]),new P(P.End,new T(T.Run,{last:true,run:6,level:1})),new P(P.End,new T(T.Run,{last:true,run:5,level:1})),new P(P.Fork,[46,49]),new P(P.Fork,[47,48]),new P(P.End,new T(T.Run,{last:false,run:12,level:1})),new P(P.End,new T(T.Run,{last:false,run:11,level:1})),new P(P.Fork,[50,51]),new P(P.End,new T(T.Run,{last:false,run:10,level:1})),new P(P.End,new T(T.Run,{last:false,run:0,level:4})),new P(P.Fork,[90,53]),new P(P.Fork,[69,54]),new P(P.Fork,[55,62]),new P(P.Fork,[56,59]),new P(P.Fork,[57,58]),new P(P.End,new T(T.Run,{last:true,run:11,level:1})),new P(P.End,new T(T.Run,{last:true,run:10,level:1})),new P(P.Fork,[60,61]),new P(P.End,new T(T.Run,{last:true,run:9,level:1})),new P(P.End,new T(T.Run,{last:false,run:14,level:1})),new P(P.Fork,[63,66]),new P(P.Fork,[64,65]),new P(P.End,new T(T.Run,{last:false,run:13,level:1})),new P(P.End,new T(T.Run,{last:false,run:2,level:2})),new P(P.Fork,[67,68]),new P(P.End,new T(T.Run,{last:false,run:1,level:3})),new P(P.End,new T(T.Run,{last:false,run:0,level:5})),new P(P.Fork,[77,70]),new P(P.Fork,[71,74]),new P(P.Fork,[72,73]),new P(P.End,new T(T.Run,{last:true,run:15,level:1})),new P(P.End,new T(T.Run,{last:true,run:14,level:1})),new P(P.Fork,[75,76]),new P(P.End,new T(T.Run,{last:true,run:13,level:1})),new P(P.End,new T(T.Run,{last:true,run:12,level:1})),new P(P.Fork,[78,85]),new P(P.Fork,[79,82]),new P(P.Fork,[80,81]),new P(P.End,new T(T.Run,{last:false,run:16,level:1})),new P(P.End,new T(T.Run,{last:false,run:15,level:1})),new P(P.Fork,[83,84]),new P(P.End,new T(T.Run,{last:false,run:4,level:2})),new P(P.End,new T(T.Run,{last:false,run:3,level:2})),new P(P.Fork,[86,89]),new P(P.Fork,[87,88]),new P(P.End,new T(T.Run,{last:false,run:0,level:7})),new P(P.End,new T(T.Run,{last:false,run:0,level:6})),new P(P.End,new T(T.Run,{last: true,run:16,level:1})),new P(P.Fork,[124,91]),new P(P.Fork,[92,109]),new P(P.Fork,[93,102]),new P(P.Fork,[94,99]),new P(P.Fork,[95,98]),new P(P.Fork,[96,97]),new P(P.End,new T(T.Run,{last:false,run:0,level:9})),new P(P.End,new T(T.Run,{last:false,run:0,level:8})),new P(P.End,new T(T.Run,{last: true,run:24,level:1})),new P(P.Fork,[100,101]),new P(P.End,new T(T.Run,{last: true,run:23,level:1})),new P(P.End,new T(T.Run,{last: true,run:22,level:1})),new P(P.Fork,[103,106]),new P(P.Fork,[104,105]),new P(P.End,new T(T.Run,{last: true,run:21,level:1})),new P(P.End,new T(T.Run,{last: true,run:20,level:1})),new P(P.Fork,[107,108]),new P(P.End,new T(T.Run,{last: true,run:19,level:1})),new P(P.End,new T(T.Run,{last: true,run:18,level:1})),new P(P.Fork,[110,117]),new P(P.Fork,[111,114]),new P(P.Fork,[112,113]),new P(P.End,new T(T.Run,{last: true,run:17,level:1})),new P(P.End,new T(T.Run,{last: true,run:0,level:2})),new P(P.Fork,[115,116]),new P(P.End,new T(T.Run,{last:false,run:22,level:1})),new P(P.End,new T(T.Run,{last:false,run:21,level:1})),new P(P.Fork,[118,121]),new P(P.Fork,[119,120]),new P(P.End,new T(T.Run,{last:false,run:20,level:1})),new P(P.End,new T(T.Run,{last:false,run:19,level:1})),new P(P.Fork,[122,123]),new P(P.End,new T(T.Run,{last:false,run:18,level:1})),new P(P.End,new T(T.Run,{last:false,run:17,level:1})),new P(P.Fork,[174,125]),new P(P.Fork,[127,126]),new P(P.End,new T(T.EscapeToLong)),new P(P.Fork,[128,143]),new P(P.Fork,[129,136]),new P(P.Fork,[130,133]),new P(P.Fork,[131,132]),new P(P.End,new T(T.Run,{last:false,run:0,level:12})),new P(P.End,new T(T.Run,{last:false,run:1,level:5})),new P(P.Fork,[134,135]),new P(P.End,new T(T.Run,{last:false,run:23,level:1})),new P(P.End,new T(T.Run,{last:false,run:24,level:1})),new P(P.Fork,[137,140]),new P(P.Fork,[138,139]),new P(P.End,new T(T.Run,{last: true,run:29,level:1})),new P(P.End,new T(T.Run,{last: true,run:30,level:1})),new P(P.Fork,[141,142]),new P(P.End,new T(T.Run,{last: true,run:31,level:1})),new P(P.End,new T(T.Run,{last: true,run:32,level:1})),new P(P.Fork,[144,159]),new P(P.Fork,[145,152]),new P(P.Fork,[146,149]),new P(P.Fork,[147,148]),new P(P.End,new T(T.Run,{last:false,run:1,level:6})),new P(P.End,new T(T.Run,{last:false,run:2,level:4})),new P(P.Fork,[150,151]),new P(P.End,new T(T.Run,{last:false,run:4,level:3})),new P(P.End,new T(T.Run,{last:false,run:5,level:3})),new P(P.Fork,[153,156]),new P(P.Fork,[154,155]),new P(P.End,new T(T.Run,{last:false,run:6,level:3})),new P(P.End,new T(T.Run,{last:false,run:10,level:2})),new P(P.Fork,[157,158]),new P(P.End,new T(T.Run,{last:false,run:25,level:1})),new P(P.End,new T(T.Run,{last:false,run:26,level:1})),new P(P.Fork,[160,167]),new P(P.Fork,[161,164]),new P(P.Fork,[162,163]),new P(P.End,new T(T.Run,{last: true,run:33,level:1})),new P(P.End,new T(T.Run,{last: true,run:34,level:1})),new P(P.Fork,[165,166]),new P(P.End,new T(T.Run,{last: true,run:35,level:1})),new P(P.End,new T(T.Run,{last: true,run:36,level:1})),new P(P.Fork,[168,171]),new P(P.Fork,[169,170]),new P(P.End,new T(T.Run,{last: true,run:37,level:1})),new P(P.End,new T(T.Run,{last: true,run:38,level:1})),new P(P.Fork,[172,173]),new P(P.End,new T(T.Run,{last: true,run:39,level:1})),new P(P.End,new T(T.Run,{last: true,run:40,level:1})),new P(P.Fork,[190,175]),new P(P.Fork,[176,183]),new P(P.Fork,[177,180]),new P(P.Fork,[178,179]),new P(P.End,new T(T.Run,{last:false,run:9,level:2})),new P(P.End,new T(T.Run,{last:false,run:8,level:2})),new P(P.Fork,[181,182]),new P(P.End,new T(T.Run,{last:false,run:7,level:2})),new P(P.End,new T(T.Run,{last:false,run:6,level:2})),new P(P.Fork,[184,187]),new P(P.Fork,[185,186]),new P(P.End,new T(T.Run,{last:false,run:5,level:2})),new P(P.End,new T(T.Run,{last:false,run:3,level:3})),new P(P.Fork,[188,189]),new P(P.End,new T(T.Run,{last:false,run:2,level:3})),new P(P.End,new T(T.Run,{last:false,run:1,level:4})),new P(P.Fork,[198,191]),new P(P.Fork,[192,195]),new P(P.Fork,[193,194]),new P(P.End,new T(T.Run,{last: true,run:28,level:1})),new P(P.End,new T(T.Run,{last: true,run:27,level:1})),new P(P.Fork,[196,197]),new P(P.End,new T(T.Run,{last: true,run:26,level:1})),new P(P.End,new T(T.Run,{last: true,run:25,level:1})),new P(P.Fork,[206,199]),new P(P.Fork,[200,203]),new P(P.Fork,[201,202]),new P(P.End,new T(T.Run,{last: true,run:1,level:2})),new P(P.End,new T(T.Run,{last: true,run:0,level:3})),new P(P.Fork,[204,205]),new P(P.End,new T(T.Run,{last:false,run:0,level:11})),new P(P.End,new T(T.Run,{last:false,run:0,level:10})),new P(P.End,null)];function decode_block(_,q,w,e,r,t){return _.withTransaction(function(_){let a=null;if(r.is_intra()){a=M.from_u8(_.readUint8());if(a===null)throw new Error("InvalidIntraDc")}var s=[];while(t){let d=_.readVLC(TCOEF_TABLE);if (d===null)throw new Error("InvalidShortCoefficient");switch(d.type){case T.EscapeToLong:let f=null;if(q.sorensonSpark&&(w.version==1)){if(_.readBits(1)==1)f=11;else f=7}else f=8;let g=_.readBits(1)==1,h=_.readBits(6),j=_.readSignedBits(f);if(j==0)throw new Error("InvalidLongCoefficient");s.push(new N(false,h,j));t=!g;break;case T.Run:var k=d.value,l=_.readBits(1);if(l==0)s.push(new N(true, k.run, k.level));else s.push(new N(true, k.run,-k.level));t = !k.last;break}}return new O(a,s)})}const DEZIGZAG_MAPPING=[[0,0],[1,0],[0,1],[0,2],[1,1],[2,0],[3,0],[2,1],[1,2],[0,3],[0,4],[1,3],[2,2],[3,1],[4,0],[5,0],[4,1],[3,2],[2,3],[1,4],[0,5],[0,6],[1,5],[2,4],[3,3],[4,2],[5,1],[6,0],[7,0],[6,1],[5,2],[4,3],[3,4],[2,5],[1,6],[0,7],[1,7],[2,6],[3,5],[4,4],[5,3],[6,2],[7,1],[7,2],[6,3],[5,4],[4,5],[3,6],[2,7],[3,7],[4,6],[5,5],[6,4],[7,3],[7,4],[6,5],[5,6],[4,7],[5,7],[6,6],[7,5],[7,6],[6,7],[7,7]];function inverse_rle(_,a,b,c,d){let z=((b[0]/8)|0)+(((b[1]/8)|0)*c);if(_.tcoef.length==0){if(_.intradc){let m=_.intradc.into_level();if(m==0)a[z]=new G(G.Zero);else a[z]=new G(G.Dc,m)}else a[z]=new G(G.Zero)} else {var e=[new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8)];let y=true,u=true,t=0;if(_.intradc){e[0][0] = _.intradc.into_level();t+=1}for (var i=0;i<_.tcoef.length;i++){var j = _.tcoef[i];t += j.run;if(t>=DEZIGZAG_MAPPING.length)return;let[p,o]=DEZIGZAG_MAPPING[t];let k=asI16(d)*((2*Math.abs(j.level))+1),l=null;if(d%2==1)l=0;else l=-1;let val=Math.max(Math.min(Math.sign(j.level)*(k+l),2047),-2048);e[o][p]=val,t+=1;if(val!=0.0){if(o>0)y=false;if(p>0)u=false}}if((y==true)&&(u==true)){if(e[0][0]==0)a[z]=new G(G.Zero);else a[z]=new G(G.Dc,e[0][0])}else if((y==true)&&(u==false)){a[z]=new G(G.Horiz,e[0])}else if((y == false) && (u == true)){var r=new Float32Array(8);r[0]=e[0][0],r[1]=e[1][0],r[2]=e[2][0],r[3]=e[3][0],r[4]=e[4][0],r[5]=e[5][0],r[6]=e[6][0],r[7]=e[7][0],a[z]=new G(G.Vert, r)}else if((y == false) && (u == false)){a[z]=new G(G.Full,e)}}}function read_sample(_,a,b,c){let[x,y]=c;let i=num_clamp(x,0,a-1),j=num_clamp(y,0,b-1);return _[i+(j*a)]}function lerp(a,b,m){if(m)return asU8((a+b+1)/2);else return asU8(a)}function gather_block(o,p,l,m,t){var g=m.into_lerp_parameters();let[a1,b1]=g[0];let[a2,b2]=g[1];let c1=(l[0]+a1)|0,c2=(l[1]+a2)|0,q=(o.length/p)|0;let w=num_clamp((p-l[0]),0,8),e=num_clamp((q-l[1]),0,8);if(!b1&&!b2){if(w==8&&e==8&&asfgdgdfg(c1,0,p-8)&&asfgdgdfg(c2,0,q-8)){for(var j=0;j<8;j++){let a=c1+((c2+j)*p);let b=l[0]+(l[1]+j)*p;for(var _=0;_<8;_++)t[b+_]=o[a+_]}}else{for(var _j=0;_j<e;_j+=1){var j=_j,v=_j+c2;for(var _i=0;_i<w;_i+=1){var i=_i,u=_i + c1;t[l[0]+i+((l[1]+j)*p)]=read_sample(o,p,q,[u,v])}}}}else{for(var _j=0;_j<e;_j+=1){var j=_j,v=_j+c2;for(var _i=0;_i<w;_i+=1){var i=_i,u=_i+c1;let s1=read_sample(o,p,q,[u,v]),s2=read_sample(o,p,q,[u+1,v]),s3=read_sample(o,p,q,[u,v+1]),s4=read_sample(o,p,q,[u+1,v+1]);if (b1 && b2){let s=asU8((s1+s2+s3+s4+2)/4);t[l[0]+i+((l[1]+j)*p)]=s}else{let g1=lerp(s1,s2,b1),g2=lerp(s3,s4,b1);t[l[0]+i+((l[1]+j)*p)]=lerp(g1,g2,b2)}}}}}function gather(a,b,c,d,e){for(var i=0;i<a.length;i++){var f=a[i],g=c[i];if(f.is_inter()){if(!b)throw new Error("UncodedIFrameBlocks");let r=b.luma_samples_per_row(),p=[Math.floor(i%d)*16,Math.floor(i/d)*16];gather_block(b.as_luma(),r,p,g[0],e.as_luma_mut());gather_block(b.as_luma(),r,[p[0]+8,p[1]],g[1],e.as_luma_mut());gather_block(b.as_luma(),r,[p[0],p[1]+8],g[2],e.as_luma_mut());gather_block(b.as_luma(),r,[p[0]+8,p[1]+8],g[3],e.as_luma_mut());let h=g[0].add(g[1].add(g[2].add(g[3]))).average_sum_of_mvs(),t=b.chroma_samples_per_row,y=[Math.floor(i%d)*8,Math.floor(i/d)*8];gather_block(b.as_chroma_b(), t,[y[0], y[1]], h,e.as_chroma_b_mut());gather_block(b.as_chroma_r(), t,[y[0], y[1]], h,e.as_chroma_r_mut())}}}const BASIS_TABLE = [new Float32Array([0.70710677,0.70710677,0.70710677,0.70710677,0.70710677,0.70710677,0.70710677,0.70710677]),new Float32Array([0.98078525,0.8314696,0.5555702,0.19509023,-0.19509032,-0.55557036,-0.83146966,-0.9807853]),new Float32Array([0.9238795,0.38268343,-0.38268352,-0.9238796,-0.9238795,-0.38268313,0.3826836,0.92387956]),new Float32Array([0.8314696,-0.19509032,-0.9807853,-0.55557,0.55557007,0.98078525,0.19509007,-0.8314698]),new Float32Array([0.70710677,-0.70710677,-0.70710665,0.707107,0.70710677,-0.70710725,-0.70710653,0.7071068]),new Float32Array([0.5555702,-0.9807853,0.19509041,0.83146936,-0.8314698,-0.19508928,0.9807853,-0.55557007]),new Float32Array([0.38268343,-0.9238795,0.92387974,-0.3826839,-0.38268384,0.9238793,-0.92387974,0.3826839]),new Float32Array([0.19509023,-0.55557,0.83146936,-0.9807852,0.98078525,-0.83147013,0.55557114,-0.19508967])];function idct_1d(_,o){o.fill(0);for(var i=0;i<o.length;i++)for(var j=0;j<8;j++)o[i]+=_[j]*BASIS_TABLE[j][i]}function idct_channel(_,o,p,q){let h=(o.length/q)|0,blk_height=(_.length/p)|0,a=[new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8)],s=[new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8),new Float32Array(8)];for(var d=0;d<blk_height;d++){for(var f=0;f<p;f++){let g=f+(d*p);if (g>=_.length)continue;let xs=num_clamp((q-f*8),0,8),ys=num_clamp((h-d*8),0,8),b=_[g];switch(b.type){case G.Zero:break;case G.Dc:var dc=b.value;let n=num_clamp(asI16((dc*0.5/4.0+Math.sign(dc)*0.5)),-256,255);for (var g2 = 0; g2 < ys; g2++){for (var g1=0;g1<xs;g1++){let x=f*8+g1,y=d*8+g2;let m=asI16(o[x+(y*q)]);o[x+(y*q)]=asU8(num_clamp(n+m,0,255))}}break;case G.Horiz:var v=b.value;idct_1d(v,a[0]);for (var g2=0;g2<ys;g2++){var j=a[0];for(var g1=0;g1<xs;g1++){var i=j[g1];let x=f*8+g1,y=d*8+g2;let n=num_clamp((asI16(i*BASIS_TABLE[0][0]/4.0+Math.sign(i)*0.5)),-256,255),m=asI16(o[x+(y*q)]);o[x+(y*q)]=asU8(num_clamp((n+m),0,255))}}break;case G.Vert:var v=b.value;idct_1d(v,a[0]);var j=a[0];for(var g2=0;g2<ys;g2++){var i=j[g2];for(var g1=0;g1<xs;g1++){let x=f*8+g1,y=d*8+g2;let n=num_clamp((asI16(i*BASIS_TABLE[0][0]/4.0+Math.sign(i)*0.5)),-256,255),m=asI16(o[x+(y*q)]);o[x+(y*q)]=asU8(num_clamp((n+m),0,255))}}break;case G.Full:var v=b.value;for(var u=0;u<8;u++){idct_1d(v[u],s[u]);for(var i=0;i<a.length;i++)a[i][u]=s[u][i]}for(var u=0;u<8;u++)idct_1d(a[u],s[u]);for(var g1=0;g1<xs;g1++){var j=s[g1];for(var g2=0;g2<ys;g2++){var i=j[g2];let x=f*8+g1,y=d*8+g2;let n=num_clamp((asI16(i/4.0+Math.sign(i)*0.5)),-256,255),m=asI16(o[x+(y*q)]);o[x+(y*q)]=asU8(num_clamp((n+m),0,255))}}break}}}}function predict_candidate(a,b,c,d){let s=a.length,f=s%c,z=null;switch(d){case 0:case 2:if(f==0)z=L.zero();else z=a[s-1][d+1];break;case 1:case 3:z = b[d - 1];break;default:throw new Error("unreachable")}let g=(s/c)|0,h=(saturatingSub(g,1)*c)+f,x=null;switch(d){case 0:case 1:if(g==0)x=z;else{var r=a[h];if(r)x=r[d+2];else x=z}break;case 2:case 3:x=b[0];break;default:throw new Error("unreachable")}let n=f==saturatingSub(c,1),v=null;switch(d){case 0:case 1:if(n)v=L.zero();else{if (g == 0)v=z;else{var r=a[h + 1];if (r)v=r[2];else v=z}}break;case 2:case 3:v=b[1];break;default:throw new Error("unreachable")}return z.median_of(x, v)}function halfpel_decode(a,b,c,d,e){let f=K.STANDARD_RANGE,out=new K(asI16(d.n+c.n));if(!out.is_mv_within_range(f))out=new K(asI16(d.invert().n+c.n));return out}function mv_decode(q,w,e,r){let a=r.n1,s=r.n2,d=e.n1,f=e.n2;let x=halfpel_decode(q,w,d,a,true),y=halfpel_decode(q,w,f,s,false);return new L(x,y)}class U{constructor(_){this.decoderOptions=_,this.last_picture=null,this.reference_picture=null,this.running_options=H.empty(),this.reference_states=new Map()}isSorenson(){return this.decoderOptions.sorensonSpark}getLastPicture(){if(this.last_picture===null){return null}else{return this.reference_states.get(this.last_picture)}}getReferencePicture(){if(this.reference_picture===null){return null}else{return this.reference_states.get(this.reference_picture)}}cleanup_buffers(){let a=this.last_picture,b=this.reference_states.get(a);this.reference_states=new Map();if(b)this.reference_states.set(a,b)}parsePicture(a,b){return decodePicture(a,this.decoderOptions,b)}decodeNextPicture(_){var a=this.parsePicture(_, this.getLastPicture());var b=a.options,c=null;if(a.format){c=a.format}else if(a.picture_type.type==F.IFrame){throw new Error("PictureFormatMissing")}else{var i=null,j=this.getLastPicture();if(j!==null)i=j.format;else throw new Error("PictureFormatMissing");c=i}let q=this.getReferencePicture(),w=c.intoWidthAndHeight();let x=Math.ceil(w[0]/16),y=Math.ceil(w[1]/16);let z=[x*16,y*16],v=a.quantizer,k=x*y,e=[],r=[],t=new I(a,c);var m=new Array(z[0]*z[1]/64),o=new Array(z[0]*z[1]/4/64),p=new Array(z[0]*z[1]/4/64);var i;for(i=0;i<m.length;i++)m[i]=new G(G.Zero);for(i=0;i<o.length;i++)o[i]=new G(G.Zero);for(i=0;i<p.length;i++)p[i]=new G(G.Zero);while(r.length<k){let a1;try {a1=decode_macroblock(_,t.as_header(),b)}catch(e){a1=e.message}var ax=[Math.floor(r.length%x)*16,Math.floor(r.length/x)*16];var az=[L.zero(),L.zero(),L.zero(),L.zero()]; var a2=null,a3=false;if(typeof a1=="string"){if(is_eof_error(a1))break;else throw new Error(a1)}else{switch(a1.type){case R.Stuffing:a3=true;break;case R.Uncoded:if(t.as_header().picture_type.type==F.IFrame)throw new Error("UncodedIFrameBlocks");a2 = new Q(Q.Inter);break;case R.Coded:var b_=a1.value,b1=asI8(asI8(v)+((b_.d_quantizer===null)?0:b_.d_quantizer));v=asU8(num_clamp(b1,1,31));if(b_.mb_type.is_inter()){let b2=b_.motion_vector;if(b2===null)b2=L.zero();let mpred1=predict_candidate(e,az,x,0);az[0]=mv_decode(t,b,mpred1,b2);var c_=b_.addl_motion_vectors;if(c_){let c1=predict_candidate(e,az,x,1);az[1]=mv_decode(t, b, c1, c_[0]);c1=predict_candidate(e,az,x,2);az[2]=mv_decode(t, b, c1, c_[1]);c1=predict_candidate(e,az,x,3);az[3]=mv_decode(t, b, c1, c_[2])}else az[1]=az[0],az[2]=az[0],az[3]=az[0]}let d1=decode_block(_, this.decoderOptions, t.as_header(), b, b_.mb_type, b_.coded_block_pattern.codes_luma[0]);inverse_rle(d1,m,ax,z[0]/8,v);d1=decode_block(_,this.decoderOptions,t.as_header(),b,b_.mb_type,b_.coded_block_pattern.codes_luma[1]);inverse_rle(d1,m,[ax[0]+8,ax[1]],z[0]/8,v);d1=decode_block(_,this.decoderOptions,t.as_header(),b,b_.mb_type,b_.coded_block_pattern.codes_luma[2]);inverse_rle(d1,m,[ax[0],ax[1]+8],z[0]/8,v);d1=decode_block(_,this.decoderOptions,t.as_header(),b,b_.mb_type,b_.coded_block_pattern.codes_luma[3]);inverse_rle(d1,m,[ax[0]+8,ax[1]+8],z[0]/8,v);d1=decode_block(_,this.decoderOptions,t.as_header(),b,b_.mb_type,b_.coded_block_pattern.codes_chroma_b);inverse_rle(d1,o,[ax[0]/2,ax[1]/2],x,v);d1=decode_block(_,this.decoderOptions,t.as_header(),b,b_.mb_type,b_.coded_block_pattern.codes_chroma_r);inverse_rle(d1,p,[ax[0]/2,ax[1]/2],x,v);a2=b_.mb_type;break}if (a3) continue}e.push(az),r.push(a2)}while(e.length<k)e.push(L.zero());while(r.length<k)r.push(new Q(Q.Inter));gather(r,q,e,x,t);idct_channel(m,t.as_luma_mut(),x*2,w[0]);let e1=t.chroma_samples_per_row;idct_channel(o,t.as_chroma_b_mut(),x,e1);idct_channel(p,t.as_chroma_r_mut(),x,e1);if (t.as_header().picture_type.type==F.IFrame)this.reference_picture=null;let e2=t.as_header().temporal_reference;this.last_picture=e2;if(!t.as_header().picture_type.is_disposable())this.reference_picture=e2;this.reference_states.set(e2,t);this.cleanup_buffers()}}class V{constructor(_){this.source=_,this.bitsRead=0}readBits(_){let a=this.peekBits(_);this.skipBits(_);return a}readSignedBits(_){let a=this.readBits(_);let b=32-_;return(a<<b)>>b}peekBits(_){if(_==0)return 0;let a=0,i=_;let b=this.bitsRead;while(i--){if (_==0)break;let q=Math.floor(this.bitsRead/8),w=(this.bitsRead%8);if(q>=this.source.length)throw new Error("EndOfFile");let e=this.source[q];a<<=1,a|=((e>>(7-w))&0x1);this.bitsRead++}this.bitsRead=b;return a}skipBits(_){this.bitsRead+=_;}readUint8(){return this.readBits(8)}recognizeStartCode(_){return this.withLookahead(function(r){let a=r.realignmentBits(),b=0,c=r.peekBits(17);while(c!=1){if(!_&&b>a)return null;r.skipBits(1);b+=1;c=r.peekBits(17)}return b})}realignmentBits(){return(8-(this.bitsRead%8))%8}checkpoint(){return this.bitsRead}readVLC(_){var a=0;while(true){var t=_[a];if(t){switch(t.type){case P.End:return t.value;case P.Fork:let h=this.readBits(1);if(h==0)a=t.value[0];else a=t.value[1];break}}else throw new Error("InternalDecoderError")}}read_umv(){let a=this.readBits(1);if(a==1)return K.from_unit(0);let z=0,x=1;while(x<4096){var r=this.readBits(2);switch(r){case 0b00:return K.from_unit(z+x);case 0b10:return K.from_unit(-(z+x));case 0b01:z<<=1;x<<=1;break;case 0b11:z=z<<1|1;x<<=1;break}}throw new Error("InvalidMvd")}bitAva(){return(this.source.length*8)-this.bitsRead}rollback(a){if(a>(this.source.length*8))throw new Error("InternalDecoderError");this.bitsRead=a}withTransaction(f){var a=this.checkpoint(),b;try{b=f(this)}catch(e){this.rollback(a);throw e}return b}withTransactionUnion(f){var a=this.checkpoint(),b;try{b=f(this);if(b === null)this.rollback(a)}catch(e){this.rollback(a);throw e}return b}withLookahead(f){let a=this.checkpoint(),b=f(this);this.rollback(a);return b}}return{H263Reader:V,H263State:U}}());
		module.exports = AT_H263
	},
	"./lib/at-jpg-decoder.js": function(module, exports, __webpack_require__) {
		var AT_JPG_Decoder = function() {
			var dctZigZag = new Int32Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
			var dctCos1 = 4017;
			var dctSin1 = 799;
			var dctCos3 = 3406;
			var dctSin3 = 2276;
			var dctCos6 = 1567;
			var dctSin6 = 3784;
			var dctSqrt2 = 5793;
			var dctSqrt1d2 = 2896;
			function constructor() {}
			function buildHuffmanTable(codeLengths, values) {
				var k = 0, code = [], i, j, length = 16;
				while (length > 0 && !codeLengths[length - 1])
					length--;
				code.push({
					children: [],
					index: 0
				});
				var p = code[0], q;
				for (i = 0; i < length; i++) {
					for (j = 0; j < codeLengths[i]; j++) {
						p = code.pop();
						p.children[p.index] = values[k];
						while (p.index > 0) {
							p = code.pop()
						}
						p.index++;
						code.push(p);
						while (code.length <= i) {
							code.push(q = {
								children: [],
								index: 0
							});
							p.children[p.index] = q.children;
							p = q
						}
						k++
					}
					if (i + 1 < length) {
						code.push(q = {
							children: [],
							index: 0
						});
						p.children[p.index] = q.children;
						p = q
					}
				}
				return code[0].children
			}
			function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
				var precision = frame.precision;
				var samplesPerLine = frame.samplesPerLine;
				var scanLines = frame.scanLines;
				var mcusPerLine = frame.mcusPerLine;
				var progressive = frame.progressive;
				var maxH = frame.maxH
				  , maxV = frame.maxV;
				var startOffset = offset
				  , bitsData = 0
				  , bitsCount = 0;
				function readBit() {
					if (bitsCount > 0) {
						bitsCount--;
						return bitsData >> bitsCount & 1
					}
					bitsData = data[offset++];
					if (bitsData == 255) {
						var nextByte = data[offset++];
						if (nextByte) {
							throw new Error("unexpected marker: " + (bitsData << 8 | nextByte).toString(16))
						}
					}
					bitsCount = 7;
					return bitsData >>> 7
				}
				function decodeHuffman(tree) {
					var node = tree, bit;
					while ((bit = readBit()) !== null) {
						node = node[bit];
						if (typeof node === "number")
							return node;
						if (typeof node !== "object")
							throw new Error("invalid huffman sequence")
					}
					return null
				}
				function receive(length) {
					var n = 0;
					while (length > 0) {
						var bit = readBit();
						if (bit === null)
							return;
						n = n << 1 | bit;
						length--
					}
					return n
				}
				function receiveAndExtend(length) {
					var n = receive(length);
					if (n >= 1 << length - 1)
						return n;
					return n + (-1 << length) + 1
				}
				function decodeBaseline(component, zz) {
					var t = decodeHuffman(component.huffmanTableDC);
					var diff = t === 0 ? 0 : receiveAndExtend(t);
					zz[0] = component.pred += diff;
					var k = 1;
					while (k < 64) {
						var rs = decodeHuffman(component.huffmanTableAC);
						var s = rs & 15
						  , r = rs >> 4;
						if (s === 0) {
							if (r < 15)
								break;
							k += 16;
							continue
						}
						k += r;
						var z = dctZigZag[k];
						zz[z] = receiveAndExtend(s);
						k++
					}
				}
				function decodeDCFirst(component, zz) {
					var t = decodeHuffman(component.huffmanTableDC);
					var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
					zz[0] = component.pred += diff
				}
				function decodeDCSuccessive(component, zz) {
					zz[0] |= readBit() << successive
				}
				var eobrun = 0;
				function decodeACFirst(component, zz) {
					if (eobrun > 0) {
						eobrun--;
						return
					}
					var k = spectralStart
					  , e = spectralEnd;
					while (k <= e) {
						var rs = decodeHuffman(component.huffmanTableAC);
						var s = rs & 15
						  , r = rs >> 4;
						if (s === 0) {
							if (r < 15) {
								eobrun = receive(r) + (1 << r) - 1;
								break
							}
							k += 16;
							continue
						}
						k += r;
						var z = dctZigZag[k];
						zz[z] = receiveAndExtend(s) * (1 << successive);
						k++
					}
				}
				var successiveACState = 0, successiveACNextValue;
				function decodeACSuccessive(component, zz) {
					var k = spectralStart
					  , e = spectralEnd
					  , r = 0;
					while (k <= e) {
						var z = dctZigZag[k];
						var direction = zz[z] < 0 ? -1 : 1;
						switch (successiveACState) {
						case 0:
							var rs = decodeHuffman(component.huffmanTableAC);
							var s = rs & 15
							  , r = rs >> 4;
							if (s === 0) {
								if (r < 15) {
									eobrun = receive(r) + (1 << r);
									successiveACState = 4
								} else {
									r = 16;
									successiveACState = 1
								}
							} else {
								if (s !== 1)
									throw new Error("invalid ACn encoding");
								successiveACNextValue = receiveAndExtend(s);
								successiveACState = r ? 2 : 3
							}
							continue;
						case 1:
						case 2:
							if (zz[z])
								zz[z] += (readBit() << successive) * direction;
							else {
								r--;
								if (r === 0)
									successiveACState = successiveACState == 2 ? 3 : 0
							}
							break;
						case 3:
							if (zz[z])
								zz[z] += (readBit() << successive) * direction;
							else {
								zz[z] = successiveACNextValue << successive;
								successiveACState = 0
							}
							break;
						case 4:
							if (zz[z])
								zz[z] += (readBit() << successive) * direction;
							break
						}
						k++
					}
					if (successiveACState === 4) {
						eobrun--;
						if (eobrun === 0)
							successiveACState = 0
					}
				}
				function decodeMcu(component, decode, mcu, row, col) {
					var mcuRow = mcu / mcusPerLine | 0;
					var mcuCol = mcu % mcusPerLine;
					var blockRow = mcuRow * component.v + row;
					var blockCol = mcuCol * component.h + col;
					decode(component, component.blocks[blockRow][blockCol])
				}
				function decodeBlock(component, decode, mcu) {
					var blockRow = mcu / component.blocksPerLine | 0;
					var blockCol = mcu % component.blocksPerLine;
					decode(component, component.blocks[blockRow][blockCol])
				}
				var componentsLength = components.length;
				var component, i, j, k, n;
				var decodeFn;
				if (progressive) {
					if (spectralStart === 0)
						decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
					else
						decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive
				} else {
					decodeFn = decodeBaseline
				}
				var mcu = 0, marker;
				var mcuExpected;
				if (componentsLength == 1) {
					mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn
				} else {
					mcuExpected = mcusPerLine * frame.mcusPerColumn
				}
				if (!resetInterval)
					resetInterval = mcuExpected;
				var h, v;
				while (mcu < mcuExpected) {
					for (i = 0; i < componentsLength; i++)
						components[i].pred = 0;
					eobrun = 0;
					if (componentsLength == 1) {
						component = components[0];
						for (n = 0; n < resetInterval; n++) {
							decodeBlock(component, decodeFn, mcu);
							mcu++
						}
					} else {
						for (n = 0; n < resetInterval; n++) {
							for (i = 0; i < componentsLength; i++) {
								component = components[i];
								h = component.h;
								v = component.v;
								for (j = 0; j < v; j++) {
									for (k = 0; k < h; k++) {
										decodeMcu(component, decodeFn, mcu, j, k)
									}
								}
							}
							mcu++;
							if (mcu === mcuExpected)
								break
						}
					}
					bitsCount = 0;
					marker = data[offset] << 8 | data[offset + 1];
					if (marker < 65280) {
						throw new Error("marker was not found")
					}
					if (marker >= 65488 && marker <= 65495) {
						offset += 2
					} else
						break
				}
				return offset - startOffset
			}
			function buildComponentData(frame, component) {
				var lines = [];
				var blocksPerLine = component.blocksPerLine;
				var blocksPerColumn = component.blocksPerColumn;
				var samplesPerLine = blocksPerLine << 3;
				var R = new Int32Array(64)
				  , r = new Uint8Array(64);
				function quantizeAndInverse(zz, dataOut, dataIn) {
					var qt = component.quantizationTable;
					var v0, v1, v2, v3, v4, v5, v6, v7, t;
					var p = dataIn;
					var i;
					for (i = 0; i < 64; i++)
						p[i] = zz[i] * qt[i];
					for (i = 0; i < 8; ++i) {
						var row = 8 * i;
						if (p[1 + row] == 0 && p[2 + row] == 0 && p[3 + row] == 0 && p[4 + row] == 0 && p[5 + row] == 0 && p[6 + row] == 0 && p[7 + row] == 0) {
							t = dctSqrt2 * p[0 + row] + 512 >> 10;
							p[0 + row] = t;
							p[1 + row] = t;
							p[2 + row] = t;
							p[3 + row] = t;
							p[4 + row] = t;
							p[5 + row] = t;
							p[6 + row] = t;
							p[7 + row] = t;
							continue
						}
						v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
						v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
						v2 = p[2 + row];
						v3 = p[6 + row];
						v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
						v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
						v5 = p[3 + row] << 4;
						v6 = p[5 + row] << 4;
						t = v0 - v1 + 1 >> 1;
						v0 = v0 + v1 + 1 >> 1;
						v1 = t;
						t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
						v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
						v3 = t;
						t = v4 - v6 + 1 >> 1;
						v4 = v4 + v6 + 1 >> 1;
						v6 = t;
						t = v7 + v5 + 1 >> 1;
						v5 = v7 - v5 + 1 >> 1;
						v7 = t;
						t = v0 - v3 + 1 >> 1;
						v0 = v0 + v3 + 1 >> 1;
						v3 = t;
						t = v1 - v2 + 1 >> 1;
						v1 = v1 + v2 + 1 >> 1;
						v2 = t;
						t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
						v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
						v7 = t;
						t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
						v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
						v6 = t;
						p[0 + row] = v0 + v7;
						p[7 + row] = v0 - v7;
						p[1 + row] = v1 + v6;
						p[6 + row] = v1 - v6;
						p[2 + row] = v2 + v5;
						p[5 + row] = v2 - v5;
						p[3 + row] = v3 + v4;
						p[4 + row] = v3 - v4
					}
					for (i = 0; i < 8; ++i) {
						var col = i;
						if (p[1 * 8 + col] == 0 && p[2 * 8 + col] == 0 && p[3 * 8 + col] == 0 && p[4 * 8 + col] == 0 && p[5 * 8 + col] == 0 && p[6 * 8 + col] == 0 && p[7 * 8 + col] == 0) {
							t = dctSqrt2 * dataIn[i + 0] + 8192 >> 14;
							p[0 * 8 + col] = t;
							p[1 * 8 + col] = t;
							p[2 * 8 + col] = t;
							p[3 * 8 + col] = t;
							p[4 * 8 + col] = t;
							p[5 * 8 + col] = t;
							p[6 * 8 + col] = t;
							p[7 * 8 + col] = t;
							continue
						}
						v0 = dctSqrt2 * p[0 * 8 + col] + 2048 >> 12;
						v1 = dctSqrt2 * p[4 * 8 + col] + 2048 >> 12;
						v2 = p[2 * 8 + col];
						v3 = p[6 * 8 + col];
						v4 = dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048 >> 12;
						v7 = dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048 >> 12;
						v5 = p[3 * 8 + col];
						v6 = p[5 * 8 + col];
						t = v0 - v1 + 1 >> 1;
						v0 = v0 + v1 + 1 >> 1;
						v1 = t;
						t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
						v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
						v3 = t;
						t = v4 - v6 + 1 >> 1;
						v4 = v4 + v6 + 1 >> 1;
						v6 = t;
						t = v7 + v5 + 1 >> 1;
						v5 = v7 - v5 + 1 >> 1;
						v7 = t;
						t = v0 - v3 + 1 >> 1;
						v0 = v0 + v3 + 1 >> 1;
						v3 = t;
						t = v1 - v2 + 1 >> 1;
						v1 = v1 + v2 + 1 >> 1;
						v2 = t;
						t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
						v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
						v7 = t;
						t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
						v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
						v6 = t;
						p[0 * 8 + col] = v0 + v7;
						p[7 * 8 + col] = v0 - v7;
						p[1 * 8 + col] = v1 + v6;
						p[6 * 8 + col] = v1 - v6;
						p[2 * 8 + col] = v2 + v5;
						p[5 * 8 + col] = v2 - v5;
						p[3 * 8 + col] = v3 + v4;
						p[4 * 8 + col] = v3 - v4
					}
					for (i = 0; i < 64; ++i) {
						var sample = 128 + (p[i] + 8 >> 4);
						dataOut[i] = sample < 0 ? 0 : sample > 255 ? 255 : sample
					}
				}
				var i, j;
				for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
					var scanLine = blockRow << 3;
					for (i = 0; i < 8; i++)
						lines.push(new Uint8Array(samplesPerLine));
					for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
						quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);
						var offset = 0
						  , sample = blockCol << 3;
						for (j = 0; j < 8; j++) {
							var line = lines[scanLine + j];
							for (i = 0; i < 8; i++)
								line[sample + i] = r[offset++]
						}
					}
				}
				return lines
			}
			function clampTo8bit(a) {
				return a < 0 ? 0 : a > 255 ? 255 : a
			}
			constructor.prototype = {
				parse: function parse(data) {
					var offset = 0
					  , length = data.length;
					function readUint16() {
						var value = data[offset] << 8 | data[offset + 1];
						offset += 2;
						return value
					}
					function readDataBlock() {
						var length = readUint16();
						var array = data.subarray(offset, offset + length - 2);
						offset += array.length;
						return array
					}
					function prepareComponents(frame) {
						var maxH = 0
						  , maxV = 0;
						var component, componentId;
						for (componentId in frame.components) {
							if (frame.components.hasOwnProperty(componentId)) {
								component = frame.components[componentId];
								if (maxH < component.h)
									maxH = component.h;
								if (maxV < component.v)
									maxV = component.v
							}
						}
						var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH);
						var mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV);
						for (componentId in frame.components) {
							if (frame.components.hasOwnProperty(componentId)) {
								component = frame.components[componentId];
								var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / maxH);
								var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / maxV);
								var blocksPerLineForMcu = mcusPerLine * component.h;
								var blocksPerColumnForMcu = mcusPerColumn * component.v;
								var blocks = [];
								for (var i = 0; i < blocksPerColumnForMcu; i++) {
									var row = [];
									for (var j = 0; j < blocksPerLineForMcu; j++)
										row.push(new Int32Array(64));
									blocks.push(row)
								}
								component.blocksPerLine = blocksPerLine;
								component.blocksPerColumn = blocksPerColumn;
								component.blocks = blocks
							}
						}
						frame.maxH = maxH;
						frame.maxV = maxV;
						frame.mcusPerLine = mcusPerLine;
						frame.mcusPerColumn = mcusPerColumn
					}
					var jfif = null;
					var adobe = null;
					var pixels = null;
					var frame, resetInterval;
					var quantizationTables = []
					  , frames = [];
					var huffmanTablesAC = []
					  , huffmanTablesDC = [];
					var fileMarker = readUint16();
					if (fileMarker != 65496) {
						throw new Error("SOI not found")
					}
					fileMarker = readUint16();
					while (fileMarker != 65497) {
						var i, j, l;
						switch (fileMarker) {
						case 65280:
							break;
						case 65504:
						case 65505:
						case 65506:
						case 65507:
						case 65508:
						case 65509:
						case 65510:
						case 65511:
						case 65512:
						case 65513:
						case 65514:
						case 65515:
						case 65516:
						case 65517:
						case 65518:
						case 65519:
						case 65534:
							var appData = readDataBlock();
							if (fileMarker === 65504) {
								if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
									jfif = {
										version: {
											major: appData[5],
											minor: appData[6]
										},
										densityUnits: appData[7],
										xDensity: appData[8] << 8 | appData[9],
										yDensity: appData[10] << 8 | appData[11],
										thumbWidth: appData[12],
										thumbHeight: appData[13],
										thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
									}
								}
							}
							if (fileMarker === 65518) {
								if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
									adobe = {
										version: appData[6],
										flags0: appData[7] << 8 | appData[8],
										flags1: appData[9] << 8 | appData[10],
										transformCode: appData[11]
									}
								}
							}
							break;
						case 65499:
							var quantizationTablesLength = readUint16();
							var quantizationTablesEnd = quantizationTablesLength + offset - 2;
							while (offset < quantizationTablesEnd) {
								var quantizationTableSpec = data[offset++];
								var tableData = new Int32Array(64);
								if (quantizationTableSpec >> 4 === 0) {
									for (j = 0; j < 64; j++) {
										var z = dctZigZag[j];
										tableData[z] = data[offset++]
									}
								} else if (quantizationTableSpec >> 4 === 1) {
									for (j = 0; j < 64; j++) {
										var z = dctZigZag[j];
										tableData[z] = readUint16()
									}
								} else
									throw new Error("DQT: invalid table spec");
								quantizationTables[quantizationTableSpec & 15] = tableData
							}
							break;
						case 65472:
						case 65473:
						case 65474:
							readUint16();
							frame = {};
							frame.extended = fileMarker === 65473;
							frame.progressive = fileMarker === 65474;
							frame.precision = data[offset++];
							frame.scanLines = readUint16();
							frame.samplesPerLine = readUint16();
							frame.components = {};
							frame.componentsOrder = [];
							var componentsCount = data[offset++], componentId;
							var maxH = 0
							  , maxV = 0;
							for (i = 0; i < componentsCount; i++) {
								componentId = data[offset];
								var h = data[offset + 1] >> 4;
								var v = data[offset + 1] & 15;
								var qId = data[offset + 2];
								frame.componentsOrder.push(componentId);
								frame.components[componentId] = {
									h: h,
									v: v,
									quantizationIdx: qId
								};
								offset += 3
							}
							prepareComponents(frame);
							frames.push(frame);
							break;
						case 65476:
							var huffmanLength = readUint16();
							for (i = 2; i < huffmanLength; ) {
								var huffmanTableSpec = data[offset++];
								var codeLengths = new Uint8Array(16);
								var codeLengthSum = 0;
								for (j = 0; j < 16; j++,
								offset++)
									codeLengthSum += codeLengths[j] = data[offset];
								var huffmanValues = new Uint8Array(codeLengthSum);
								for (j = 0; j < codeLengthSum; j++,
								offset++)
									huffmanValues[j] = data[offset];
								i += 17 + codeLengthSum;
								(huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues)
							}
							break;
						case 65501:
							readUint16();
							resetInterval = readUint16();
							break;
						case 65498:
							var scanLength = readUint16();
							var selectorsCount = data[offset++];
							var components = [], component;
							for (i = 0; i < selectorsCount; i++) {
								component = frame.components[data[offset++]];
								var tableSpec = data[offset++];
								component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
								component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
								components.push(component)
							}
							var spectralStart = data[offset++];
							var spectralEnd = data[offset++];
							var successiveApproximation = data[offset++];
							var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
							offset += processed;
							break;
						default:
							if (data[offset - 3] == 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
								offset -= 3;
								break
							}
							throw new Error("unknown JPEG marker " + fileMarker.toString(16))
						}
						fileMarker = readUint16()
					}
					if (frames.length != 1)
						throw new Error("only single frame JPEGs supported");
					for (var i = 0; i < frames.length; i++) {
						var cp = frames[i].components;
						for (var j in cp) {
							cp[j].quantizationTable = quantizationTables[cp[j].quantizationIdx];
							delete cp[j].quantizationIdx
						}
					}
					this.width = frame.samplesPerLine;
					this.height = frame.scanLines;
					this.jfif = jfif;
					this.adobe = adobe;
					this.components = [];
					for (var i = 0; i < frame.componentsOrder.length; i++) {
						var component = frame.components[frame.componentsOrder[i]];
						this.components.push({
							lines: buildComponentData(frame, component),
							scaleX: component.h / frame.maxH,
							scaleY: component.v / frame.maxV
						})
					}
				},
				getData: function getData(width, height) {
					var scaleX = this.width / width
					  , scaleY = this.height / height;
					var component1, component2, component3, component4;
					var component1Line, component2Line, component3Line, component4Line;
					var x, y;
					var offset = 0;
					var Y, Cb, Cr, K, C, M, Ye, R, G, B;
					var colorTransform;
					var dataLength = width * height * this.components.length;
					var data = new Uint8Array(dataLength);
					switch (this.components.length) {
					case 1:
						component1 = this.components[0];
						for (y = 0; y < height; y++) {
							component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
							for (x = 0; x < width; x++) {
								Y = component1Line[0 | x * component1.scaleX * scaleX];
								data[offset++] = Y
							}
						}
						break;
					case 2:
						component1 = this.components[0];
						component2 = this.components[1];
						for (y = 0; y < height; y++) {
							component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
							component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
							for (x = 0; x < width; x++) {
								Y = component1Line[0 | x * component1.scaleX * scaleX];
								data[offset++] = Y;
								Y = component2Line[0 | x * component2.scaleX * scaleX];
								data[offset++] = Y
							}
						}
						break;
					case 3:
						colorTransform = true;
						if (this.adobe && this.adobe.transformCode)
							colorTransform = true;
						else if (typeof this.colorTransform !== "undefined")
							colorTransform = !!this.colorTransform;
						component1 = this.components[0];
						component2 = this.components[1];
						component3 = this.components[2];
						for (y = 0; y < height; y++) {
							component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
							component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
							component3Line = component3.lines[0 | y * component3.scaleY * scaleY];
							for (x = 0; x < width; x++) {
								if (!colorTransform) {
									R = component1Line[0 | x * component1.scaleX * scaleX];
									G = component2Line[0 | x * component2.scaleX * scaleX];
									B = component3Line[0 | x * component3.scaleX * scaleX]
								} else {
									Y = component1Line[0 | x * component1.scaleX * scaleX];
									Cb = component2Line[0 | x * component2.scaleX * scaleX];
									Cr = component3Line[0 | x * component3.scaleX * scaleX];
									R = clampTo8bit(Y + 1.402 * (Cr - 128));
									G = clampTo8bit(Y - .3441363 * (Cb - 128) - .71413636 * (Cr - 128));
									B = clampTo8bit(Y + 1.772 * (Cb - 128))
								}
								data[offset++] = R;
								data[offset++] = G;
								data[offset++] = B
							}
						}
						break;
					case 4:
						if (!this.adobe)
							throw "Unsupported color mode (4 components)";
						colorTransform = false;
						if (this.adobe && this.adobe.transformCode)
							colorTransform = true;
						else if (typeof this.colorTransform !== "undefined")
							colorTransform = !!this.colorTransform;
						component1 = this.components[0];
						component2 = this.components[1];
						component3 = this.components[2];
						component4 = this.components[3];
						for (y = 0; y < height; y++) {
							component1Line = component1.lines[0 | y * component1.scaleY * scaleY];
							component2Line = component2.lines[0 | y * component2.scaleY * scaleY];
							component3Line = component3.lines[0 | y * component3.scaleY * scaleY];
							component4Line = component4.lines[0 | y * component4.scaleY * scaleY];
							for (x = 0; x < width; x++) {
								if (!colorTransform) {
									C = component1Line[0 | x * component1.scaleX * scaleX];
									M = component2Line[0 | x * component2.scaleX * scaleX];
									Ye = component3Line[0 | x * component3.scaleX * scaleX];
									K = component4Line[0 | x * component4.scaleX * scaleX]
								} else {
									Y = component1Line[0 | x * component1.scaleX * scaleX];
									Cb = component2Line[0 | x * component2.scaleX * scaleX];
									Cr = component3Line[0 | x * component3.scaleX * scaleX];
									K = component4Line[0 | x * component4.scaleX * scaleX];
									C = 255 - clampTo8bit(Y + 1.402 * (Cr - 128));
									M = 255 - clampTo8bit(Y - .3441363 * (Cb - 128) - .71413636 * (Cr - 128));
									Ye = 255 - clampTo8bit(Y + 1.772 * (Cb - 128))
								}
								data[offset++] = 255 - C;
								data[offset++] = 255 - M;
								data[offset++] = 255 - Ye;
								data[offset++] = 255 - K
							}
						}
						break;
					default:
						throw "Unsupported color mode"
					}
					return data
				},
				copyToImageData: function copyToImageData(imageData) {
					var width = imageData.width
					  , height = imageData.height;
					var imageDataArray = imageData.data;
					var data = this.getData(width, height);
					var i = 0, j = 0, x, y;
					var Y, K, C, M, R, G, B;
					switch (this.components.length) {
					case 1:
						for (y = 0; y < height; y++) {
							for (x = 0; x < width; x++) {
								Y = data[i++];
								imageDataArray[j++] = Y;
								imageDataArray[j++] = Y;
								imageDataArray[j++] = Y;
								imageDataArray[j++] = 255
							}
						}
						break;
					case 3:
						for (y = 0; y < height; y++) {
							for (x = 0; x < width; x++) {
								R = data[i++];
								G = data[i++];
								B = data[i++];
								imageDataArray[j++] = R;
								imageDataArray[j++] = G;
								imageDataArray[j++] = B;
								imageDataArray[j++] = 255
							}
						}
						break;
					case 4:
						for (y = 0; y < height; y++) {
							for (x = 0; x < width; x++) {
								C = data[i++];
								M = data[i++];
								Y = data[i++];
								K = data[i++];
								R = 255 - clampTo8bit(C * (1 - K / 255) + K);
								G = 255 - clampTo8bit(M * (1 - K / 255) + K);
								B = 255 - clampTo8bit(Y * (1 - K / 255) + K);
								imageDataArray[j++] = R;
								imageDataArray[j++] = G;
								imageDataArray[j++] = B;
								imageDataArray[j++] = 255
							}
						}
						break;
					default:
						throw "Unsupported color mode"
					}
				}
			};
			function jpeg_decode(jpegData) {
				var decoder = new constructor;
				decoder.parse(jpegData);
				var image = {
					width: decoder.width,
					height: decoder.height,
					data: new Uint8Array(decoder.width * decoder.height * 4)
				};
				decoder.copyToImageData(image);
				return image
			};
			return {
				decode: jpeg_decode
			}
		}();
		module.exports = AT_JPG_Decoder;
	},
	"./lib/at-mp3.min.js": function(module, exports, __webpack_require__) {
		// ANIM TRED MP3 IN JAVASCRIPT

		var AT_MP3=(function(){const A=function(){this._end=0,this.viewUint8=null,this.bitPos=0,this.bytePos=0};A.prototype.readBit=function(){if(this._end<=this.bytePos)return 0;var a=(this.viewUint8[this.bytePos]>>(7-(this.bitPos++)));if(this.bitPos>7)this.bitPos=0,this.bytePos++;return a&1},A.prototype.get_bits=function(n){if(n===0)return 0;if(this._end<=this.bytePos)return 0;var a=0;while(n--)a<<=1,a|=this.readBit();return a},A.prototype.setData=function(_){this._end=_.length,this.viewUint8=_,this.bitPos=0,this.bytePos=0};const B=function(){this.h_layer=0,this.h_protection_bit=0,this.h_bitrate_index=0,this.h_padding_bit=0,this.h_mode_extension=0,this.h_version=0,this.h_mode=0,this.h_sample_frequency=0,this.h_number_of_subbands=0,this.h_intensity_stereo_bound=0,this.h_copyright=false,this.h_original=false,this.h_crc=0,this.framesize=0,this.nSlots=0};B.versionTable=[2,1,2.5,-1],B.layerTable=[-1,3,2,1],B.frequencies=[[22050,24000,16000],[44100,48000,32000],[11025,12000,8000]],B.MPEG2_LSF=0,B.MPEG25_LSF=2,B.MPEG1=1,B.STEREO=0,B.JOINT_STEREO=1,B.DUAL_CHANNEL=2,B.SINGLE_CHANNEL=3,B.FOURTYFOUR_POINT_ONE=0,B.FOURTYEIGHT=1,B.THIRTYTWO=2,B.bitrates=[[[0,32000,48000,56000,64000,80000,96000,112000,128000,144000,160000,176000,192000,224000,256000,0],[0,8000,16000,24000,32000,40000,48000,56000,64000,80000,96000,112000,128000,144000,160000,0],[0,8000,16000,24000,32000,40000,48000,56000,64000,80000,96000,112000,128000,144000,160000,0]],[[0,32000,64000,96000,128000,160000,192000,224000,256000,288000,320000,352000,384000,416000,448000,0],[0,32000,48000,56000,64000,80000,96000,112000,128000,160000,192000,224000,256000,320000,384000,0],[0,32000,40000,48000,56000,64000,80000,96000,112000,128000,160000,192000,224000,256000,320000,0]],[[0,32000,48000,56000,64000,80000,96000,112000,128000,144000,160000,176000,192000,224000,256000,0],[0,8000,16000,24000,32000,40000,48000,56000,64000,80000,96000,112000,128000,144000,160000,0],[0,8000,16000,24000,32000,40000,48000,56000,64000,80000,96000,112000,128000,144000,160000,0]]],B.prototype.parseHeader=function(_){this.h_crc=((_&0x00010000)>>>16)>>>0,this.h_sample_frequency=((_>>>10)&3),this.h_version=((_>>>19)&1);var a=0;if(((_>>>20)&1)==0)if(this.h_version==B.MPEG2_LSF)this.h_version=B.MPEG25_LSF;else throw new Error("UNKNOWN_ERROR");this.h_layer=4-(_>>>17)&3,this.h_protection_bit=(_>>>16)&1,this.h_bitrate_index=(_>>>12)&0xF,this.h_padding_bit=(_>>>9)&1,this.h_mode=(_>>>6)&3,this.h_mode_extension=(_>>>4)&3;if(this.h_mode==B.JOINT_STEREO)this.h_intensity_stereo_bound=(this.h_mode_extension<<2)+4;else this.h_intensity_stereo_bound=0;if(((_>>>3)&1)==1)this.h_copyright=true;if(((_>>>2)&1)==1)this.h_original=true;if(this.h_layer==1)this.h_number_of_subbands=32;else {a=this.h_bitrate_index;if(this.h_mode!=B.SINGLE_CHANNEL)if(a==4)a=1;else a-=4;if((a==1)||(a==2))if(this.h_sample_frequency==B.THIRTYTWO)this.h_number_of_subbands=12;else this.h_number_of_subbands=8;else if((this.h_sample_frequency==B.FOURTYEIGHT)||((a>=3)&&(a<=5)))this.h_number_of_subbands=27;else this.h_number_of_subbands=30}if(this.h_intensity_stereo_bound>this.h_number_of_subbands)this.h_intensity_stereo_bound=this.h_number_of_subbands;this.calculate_framesize()},B.prototype.frequency=function(){return B.frequencies[this.h_version][this.h_sample_frequency]},B.prototype.sample_frequency=function(){return this.h_sample_frequency},B.prototype.version=function(){return this.h_version},B.prototype.layer=function(){return this.h_layer},B.prototype.mode=function(){return this.h_mode},B.prototype.checksums=function(){return this.h_protection_bit==0},B.prototype.copyright=function(){return this.h_copyright},B.prototype.crc=function(){return this.h_crc},B.prototype.original=function(){return this.h_original},B.prototype.padding=function(){return this.h_padding_bit!=0},B.prototype.slots=function(){return this.nSlots},B.prototype.mode_extension=function(){return this.h_mode_extension},B.prototype.calculate_framesize=function(){if(this.h_layer==1){this.framesize=((12*B.bitrates[this.h_version][0][this.h_bitrate_index])/B.frequencies[this.h_version][this.h_sample_frequency])|0;if(this.h_padding_bit!=0)this.framesize++;this.framesize<<=2,this.nSlots=0}else{this.framesize=((144*B.bitrates[this.h_version][this.h_layer-1][this.h_bitrate_index])/B.frequencies[this.h_version][this.h_sample_frequency])|0;if(this.h_version==B.MPEG2_LSF||this.h_version==B.MPEG25_LSF)this.framesize>>=1;if(this.h_padding_bit!=0)this.framesize++;if(this.h_layer==3){if(this.h_version==B.MPEG1)this.nSlots=this.framesize-((this.h_mode==B.SINGLE_CHANNEL)?17:32)-((this.h_protection_bit!=0)?0:2)-4;else this.nSlots=this.framesize-((this.h_mode==B.SINGLE_CHANNEL)?9:17)-((this.h_protection_bit!=0)?0:2)-4}else this.nSlots=0}return this.framesize-=4,this.framesize},B.prototype.layer_string=function(){switch (this.h_layer){case 1:return "I";case 2:return "II";case 3:return "III"}return null},B.bitrate_str=[[["free format","32 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","144 kbit/s","160 kbit/s","176 kbit/s","192 kbit/s","224 kbit/s","256 kbit/s","forbidden"],["free format","8 kbit/s","16 kbit/s","24 kbit/s","32 kbit/s","40 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","144 kbit/s","160 kbit/s","forbidden"],["free format","8 kbit/s","16 kbit/s","24 kbit/s","32 kbit/s","40 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","144 kbit/s","160 kbit/s","forbidden"]],[["free format","32 kbit/s","64 kbit/s","96 kbit/s","128 kbit/s","160 kbit/s","192 kbit/s","224 kbit/s","256 kbit/s","288 kbit/s","320 kbit/s","352 kbit/s","384 kbit/s","416 kbit/s","448 kbit/s","forbidden"],["free format","32 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","160 kbit/s","192 kbit/s","224 kbit/s","256 kbit/s","320 kbit/s","384 kbit/s","forbidden"],["free format","32 kbit/s","40 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","160 kbit/s","192 kbit/s","224 kbit/s","256 kbit/s","320 kbit/s","forbidden"]],[["free format","32 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","144 kbit/s","160 kbit/s","176 kbit/s","192 kbit/s","224 kbit/s","256 kbit/s","forbidden"],["free format","8 kbit/s","16 kbit/s","24 kbit/s","32 kbit/s","40 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","144 kbit/s","160 kbit/s","forbidden"],["free format","8 kbit/s","16 kbit/s","24 kbit/s","32 kbit/s","40 kbit/s","48 kbit/s","56 kbit/s","64 kbit/s","80 kbit/s","96 kbit/s","112 kbit/s","128 kbit/s","144 kbit/s","160 kbit/s","forbidden"]]],B.prototype.bitrate_string=function(){return B.bitrate_str[this.h_version][this.h_layer-1][this.h_bitrate_index]},B.prototype.sample_frequency_string=function(){switch (this.h_sample_frequency){case B.THIRTYTWO:if(this.h_version==B.MPEG1)return "32 kHz";else if(this.h_version==B.MPEG2_LSF)return "16 kHz";else return "8 kHz";case B.FOURTYFOUR_POINT_ONE:if(this.h_version==B.MPEG1)return "44.1 kHz";else if(this.h_version==B.MPEG2_LSF)return "22.05 kHz";else return "11.025 kHz";case B.FOURTYEIGHT:if(this.h_version==B.MPEG1)return "48 kHz";else if(this.h_version==B.MPEG2_LSF)return "24 kHz";else return "12 kHz"}return null},B.isValidHeader=function(h){return(((h>>>24)==0xFF)&&(((h>>21)&2047)==2047)&&((((h&0x00180000)>>>19)>>>0)!=1)&&((((h&0x00060000)>>>17)>>>0)!=0)&&((((h&0x0000f000)>>>12)>>>0)!=0)&&((((h&0x0000f000)>>>12)>>>0)!=15)&&((((h&0x00000c00)>>>10)>>>0)!=3)&&(((h&0x00000003)>>>0)!=2))};const C=function(){this.offset=0,this.totbit=0,this.buf_byte_idx=0,this.buf=new Int32Array(C.BUFSIZE)};C.BUFSIZE=4096*8,C.BUFSIZE_MASK=C.BUFSIZE-1;C.prototype.hputbuf=function(_){var a=this.offset;this.buf[a++]=_&0x80,this.buf[a++]=_&0x40,this.buf[a++]=_&0x20,this.buf[a++]=_&0x10,this.buf[a++]=_&0x08,this.buf[a++]=_&0x04,this.buf[a++]=_&0x02,this.buf[a++]=_&0x01;if(a==C.BUFSIZE) this.offset=0;else this.offset=a},C.prototype.hsstell=function(){return this.totbit},C.prototype.hgetbits=function(_){this.totbit+=_;var a=0,b=this.buf_byte_idx;if(b+_<C.BUFSIZE)while(_-->0)a<<=1,a|=((this.buf[b++]!=0)?1:0);else while(_-->0)a<<=1,a|=((this.buf[b]!=0)?1:0),b=(b+1)&C.BUFSIZE_MASK;return this.buf_byte_idx=b,a},C.prototype.hget1bit=function(){this.totbit++;var a=this.buf[this.buf_byte_idx];this.buf_byte_idx=(this.buf_byte_idx+1)&C.BUFSIZE_MASK;return a},C.prototype.rewindNbits=function(_){this.totbit-=_;this.buf_byte_idx-=_;if(this.buf_byte_idx<0)this.buf_byte_idx+=C.BUFSIZE},C.prototype.rewindNbytes=function(_){var a=_<<3;this.totbit-=a,this.buf_byte_idx-=a;if(this.buf_byte_idx<0)this.buf_byte_idx+=C.BUFSIZE};const D=function(_,a,b,c,d,e,f,g){this.tablename0=_.charAt(0),this.tablename1=_.charAt(1),this.tablename2=_.charAt(2),this.xlen=a,this.ylen=b,this.linbits=c,this.linmax=d,this.ref=e,this.val=f,this.treelen=g};D.MXOFF=250,D.ValTab0=[[0,0]],D.ValTab1=[[2,1],[0,0],[2,1],[0,16],[2,1],[0,1],[0,17]],D.ValTab2=[[2,1],[0,0],[4,1],[2,1],[0,16],[0,1],[2,1],[0,17],[4,1],[2,1],[0,32],[0,33],[2,1],[0,18],[2,1],[0,2],[0,34]],D.ValTab3=[[4,1],[2,1],[0,0],[0,1],[2,1],[0,17],[2,1],[0,16],[4,1],[2,1],[0,32],[0,33],[2,1],[0,18],[2,1],[0,2],[0,34]],D.ValTab4=[[0,0]],D.ValTab5=[[2,1],[0,0],[4,1],[2,1],[0,16],[0,1],[2,1],[0,17],[8,1],[4,1],[2,1],[0,32],[0,2],[2,1],[0,33],[0,18],[8,1],[4,1],[2,1],[0,34],[0,48],[2,1],[0,3],[0,19],[2,1],[0,49],[2,1],[0,50],[2,1],[0,35],[0,51]],D.ValTab6=[[6,1],[4,1],[2,1],[0,0],[0,16],[0,17],[6,1],[2,1],[0,1],[2,1],[0,32],[0,33],[6,1],[2,1],[0,18],[2,1],[0,2],[0,34],[4,1],[2,1],[0,49],[0,19],[4,1],[2,1],[0,48],[0,50],[2,1],[0,35],[2,1],[0,3],[0,51]],D.ValTab7=[[2,1],[0,0],[4,1],[2,1],[0,16],[0,1],[8,1],[2,1],[0,17],[4,1],[2,1],[0,32],[0,2],[0,33],[18,1],[6,1],[2,1],[0,18],[2,1],[0,34],[0,48],[4,1],[2,1],[0,49],[0,19],[4,1],[2,1],[0,3],[0,50],[2,1],[0,35],[0,4],[10,1],[4,1],[2,1],[0,64],[0,65],[2,1],[0,20],[2,1],[0,66],[0,36],[12,1],[6,1],[4,1],[2,1],[0,51],[0,67],[0,80],[4,1],[2,1],[0,52],[0,5],[0,81],[6,1],[2,1],[0,21],[2,1],[0,82],[0,37],[4,1],[2,1],[0,68],[0,53],[4,1],[2,1],[0,83],[0,84],[2,1],[0,69],[0,85]],D.ValTab8=[[6,1],[2,1],[0,0],[2,1],[0,16],[0,1],[2,1],[0,17],[4,1],[2,1],[0,33],[0,18],[14,1],[4,1],[2,1],[0,32],[0,2],[2,1],[0,34],[4,1],[2,1],[0,48],[0,3],[2,1],[0,49],[0,19],[14,1],[8,1],[4,1],[2,1],[0,50],[0,35],[2,1],[0,64],[0,4],[2,1],[0,65],[2,1],[0,20],[0,66],[12,1],[6,1],[2,1],[0,36],[2,1],[0,51],[0,80],[4,1],[2,1],[0,67],[0,52],[0,81],[6,1],[2,1],[0,21],[2,1],[0,5],[0,82],[6,1],[2,1],[0,37],[2,1],[0,68],[0,53],[2,1],[0,83],[2,1],[0,69],[2,1],[0,84],[0,85]],D.ValTab9=[[8,1],[4,1],[2,1],[0,0],[0,16],[2,1],[0,1],[0,17],[10,1],[4,1],[2,1],[0,32],[0,33],[2,1],[0,18],[2,1],[0,2],[0,34],[12,1],[6,1],[4,1],[2,1],[0,48],[0,3],[0,49],[2,1],[0,19],[2,1],[0,50],[0,35],[12,1],[4,1],[2,1],[0,65],[0,20],[4,1],[2,1],[0,64],[0,51],[2,1],[0,66],[0,36],[10,1],[6,1],[4,1],[2,1],[0,4],[0,80],[0,67],[2,1],[0,52],[0,81],[8,1],[4,1],[2,1],[0,21],[0,82],[2,1],[0,37],[0,68],[6,1],[4,1],[2,1],[0,5],[0,84],[0,83],[2,1],[0,53],[2,1],[0,69],[0,85]],D.ValTab10=[[2,1],[0,0],[4,1],[2,1],[0,16],[0,1],[10,1],[2,1],[0,17],[4,1],[2,1],[0,32],[0,2],[2,1],[0,33],[0,18],[28,1],[8,1],[4,1],[2,1],[0,34],[0,48],[2,1],[0,49],[0,19],[8,1],[4,1],[2,1],[0,3],[0,50],[2,1],[0,35],[0,64],[4,1],[2,1],[0,65],[0,20],[4,1],[2,1],[0,4],[0,51],[2,1],[0,66],[0,36],[28,1],[10,1],[6,1],[4,1],[2,1],[0,80],[0,5],[0,96],[2,1],[0,97],[0,22],[12,1],[6,1],[4,1],[2,1],[0,67],[0,52],[0,81],[2,1],[0,21],[2,1],[0,82],[0,37],[4,1],[2,1],[0,38],[0,54],[0,113],[20,1],[8,1],[2,1],[0,23],[4,1],[2,1],[0,68],[0,83],[0,6],[6,1],[4,1],[2,1],[0,53],[0,69],[0,98],[2,1],[0,112],[2,1],[0,7],[0,100],[14,1],[4,1],[2,1],[0,114],[0,39],[6,1],[2,1],[0,99],[2,1],[0,84],[0,85],[2,1],[0,70],[0,115],[8,1],[4,1],[2,1],[0,55],[0,101],[2,1],[0,86],[0,116],[6,1],[2,1],[0,71],[2,1],[0,102],[0,117],[4,1],[2,1],[0,87],[0,118],[2,1],[0,103],[0,119]],D.ValTab11=[[6,1],[2,1],[0,0],[2,1],[0,16],[0,1],[8,1],[2,1],[0,17],[4,1],[2,1],[0,32],[0,2],[0,18],[24,1],[8,1],[2,1],[0,33],[2,1],[0,34],[2,1],[0,48],[0,3],[4,1],[2,1],[0,49],[0,19],[4,1],[2,1],[0,50],[0,35],[4,1],[2,1],[0,64],[0,4],[2,1],[0,65],[0,20],[30,1],[16,1],[10,1],[4,1],[2,1],[0,66],[0,36],[4,1],[2,1],[0,51],[0,67],[0,80],[4,1],[2,1],[0,52],[0,81],[0,97],[6,1],[2,1],[0,22],[2,1],[0,6],[0,38],[2,1],[0,98],[2,1],[0,21],[2,1],[0,5],[0,82],[16,1],[10,1],[6,1],[4,1],[2,1],[0,37],[0,68],[0,96],[2,1],[0,99],[0,54],[4,1],[2,1],[0,112],[0,23],[0,113],[16,1],[6,1],[4,1],[2,1],[0,7],[0,100],[0,114],[2,1],[0,39],[4,1],[2,1],[0,83],[0,53],[2,1],[0,84],[0,69],[10,1],[4,1],[2,1],[0,70],[0,115],[2,1],[0,55],[2,1],[0,101],[0,86],[10,1],[6,1],[4,1],[2,1],[0,85],[0,87],[0,116],[2,1],[0,71],[0,102],[4,1],[2,1],[0,117],[0,118],[2,1],[0,103],[0,119]],D.ValTab12=[[12,1],[4,1],[2,1],[0,16],[0,1],[2,1],[0,17],[2,1],[0,0],[2,1],[0,32],[0,2],[16,1],[4,1],[2,1],[0,33],[0,18],[4,1],[2,1],[0,34],[0,49],[2,1],[0,19],[2,1],[0,48],[2,1],[0,3],[0,64],[26,1],[8,1],[4,1],[2,1],[0,50],[0,35],[2,1],[0,65],[0,51],[10,1],[4,1],[2,1],[0,20],[0,66],[2,1],[0,36],[2,1],[0,4],[0,80],[4,1],[2,1],[0,67],[0,52],[2,1],[0,81],[0,21],[28,1],[14,1],[8,1],[4,1],[2,1],[0,82],[0,37],[2,1],[0,83],[0,53],[4,1],[2,1],[0,96],[0,22],[0,97],[4,1],[2,1],[0,98],[0,38],[6,1],[4,1],[2,1],[0,5],[0,6],[0,68],[2,1],[0,84],[0,69],[18,1],[10,1],[4,1],[2,1],[0,99],[0,54],[4,1],[2,1],[0,112],[0,7],[0,113],[4,1],[2,1],[0,23],[0,100],[2,1],[0,70],[0,114],[10,1],[6,1],[2,1],[0,39],[2,1],[0,85],[0,115],[2,1],[0,55],[0,86],[8,1],[4,1],[2,1],[0,101],[0,116],[2,1],[0,71],[0,102],[4,1],[2,1],[0,117],[0,87],[2,1],[0,118],[2,1],[0,103],[0,119]],D.ValTab13=[[2,1],[0,0],[6,1],[2,1],[0,16],[2,1],[0,1],[0,17],[28,1],[8,1],[4,1],[2,1],[0,32],[0,2],[2,1],[0,33],[0,18],[8,1],[4,1],[2,1],[0,34],[0,48],[2,1],[0,3],[0,49],[6,1],[2,1],[0,19],[2,1],[0,50],[0,35],[4,1],[2,1],[0,64],[0,4],[0,65],[70,1],[28,1],[14,1],[6,1],[2,1],[0,20],[2,1],[0,51],[0,66],[4,1],[2,1],[0,36],[0,80],[2,1],[0,67],[0,52],[4,1],[2,1],[0,81],[0,21],[4,1],[2,1],[0,5],[0,82],[2,1],[0,37],[2,1],[0,68],[0,83],[14,1],[8,1],[4,1],[2,1],[0,96],[0,6],[2,1],[0,97],[0,22],[4,1],[2,1],[0,128],[0,8],[0,129],[16,1],[8,1],[4,1],[2,1],[0,53],[0,98],[2,1],[0,38],[0,84],[4,1],[2,1],[0,69],[0,99],[2,1],[0,54],[0,112],[6,1],[4,1],[2,1],[0,7],[0,85],[0,113],[2,1],[0,23],[2,1],[0,39],[0,55],[72,1],[24,1],[12,1],[4,1],[2,1],[0,24],[0,130],[2,1],[0,40],[4,1],[2,1],[0,100],[0,70],[0,114],[8,1],[4,1],[2,1],[0,132],[0,72],[2,1],[0,144],[0,9],[2,1],[0,145],[0,25],[24,1],[14,1],[8,1],[4,1],[2,1],[0,115],[0,101],[2,1],[0,86],[0,116],[4,1],[2,1],[0,71],[0,102],[0,131],[6,1],[2,1],[0,56],[2,1],[0,117],[0,87],[2,1],[0,146],[0,41],[14,1],[8,1],[4,1],[2,1],[0,103],[0,133],[2,1],[0,88],[0,57],[2,1],[0,147],[2,1],[0,73],[0,134],[6,1],[2,1],[0,160],[2,1],[0,104],[0,10],[2,1],[0,161],[0,26],[68,1],[24,1],[12,1],[4,1],[2,1],[0,162],[0,42],[4,1],[2,1],[0,149],[0,89],[2,1],[0,163],[0,58],[8,1],[4,1],[2,1],[0,74],[0,150],[2,1],[0,176],[0,11],[2,1],[0,177],[0,27],[20,1],[8,1],[2,1],[0,178],[4,1],[2,1],[0,118],[0,119],[0,148],[6,1],[4,1],[2,1],[0,135],[0,120],[0,164],[4,1],[2,1],[0,105],[0,165],[0,43],[12,1],[6,1],[4,1],[2,1],[0,90],[0,136],[0,179],[2,1],[0,59],[2,1],[0,121],[0,166],[6,1],[4,1],[2,1],[0,106],[0,180],[0,192],[4,1],[2,1],[0,12],[0,152],[0,193],[60,1],[22,1],[10,1],[6,1],[2,1],[0,28],[2,1],[0,137],[0,181],[2,1],[0,91],[0,194],[4,1],[2,1],[0,44],[0,60],[4,1],[2,1],[0,182],[0,107],[2,1],[0,196],[0,76],[16,1],[8,1],[4,1],[2,1],[0,168],[0,138],[2,1],[0,208],[0,13],[2,1],[0,209],[2,1],[0,75],[2,1],[0,151],[0,167],[12,1],[6,1],[2,1],[0,195],[2,1],[0,122],[0,153],[4,1],[2,1],[0,197],[0,92],[0,183],[4,1],[2,1],[0,29],[0,210],[2,1],[0,45],[2,1],[0,123],[0,211],[52,1],[28,1],[12,1],[4,1],[2,1],[0,61],[0,198],[4,1],[2,1],[0,108],[0,169],[2,1],[0,154],[0,212],[8,1],[4,1],[2,1],[0,184],[0,139],[2,1],[0,77],[0,199],[4,1],[2,1],[0,124],[0,213],[2,1],[0,93],[0,224],[10,1],[4,1],[2,1],[0,225],[0,30],[4,1],[2,1],[0,14],[0,46],[0,226],[8,1],[4,1],[2,1],[0,227],[0,109],[2,1],[0,140],[0,228],[4,1],[2,1],[0,229],[0,186],[0,240],[38,1],[16,1],[4,1],[2,1],[0,241],[0,31],[6,1],[4,1],[2,1],[0,170],[0,155],[0,185],[2,1],[0,62],[2,1],[0,214],[0,200],[12,1],[6,1],[2,1],[0,78],[2,1],[0,215],[0,125],[2,1],[0,171],[2,1],[0,94],[0,201],[6,1],[2,1],[0,15],[2,1],[0,156],[0,110],[2,1],[0,242],[0,47],[32,1],[16,1],[6,1],[4,1],[2,1],[0,216],[0,141],[0,63],[6,1],[2,1],[0,243],[2,1],[0,230],[0,202],[2,1],[0,244],[0,79],[8,1],[4,1],[2,1],[0,187],[0,172],[2,1],[0,231],[0,245],[4,1],[2,1],[0,217],[0,157],[2,1],[0,95],[0,232],[30,1],[12,1],[6,1],[2,1],[0,111],[2,1],[0,246],[0,203],[4,1],[2,1],[0,188],[0,173],[0,218],[8,1],[2,1],[0,247],[4,1],[2,1],[0,126],[0,127],[0,142],[6,1],[4,1],[2,1],[0,158],[0,174],[0,204],[2,1],[0,248],[0,143],[18,1],[8,1],[4,1],[2,1],[0,219],[0,189],[2,1],[0,234],[0,249],[4,1],[2,1],[0,159],[0,235],[2,1],[0,190],[2,1],[0,205],[0,250],[14,1],[4,1],[2,1],[0,221],[0,236],[6,1],[4,1],[2,1],[0,233],[0,175],[0,220],[2,1],[0,206],[0,251],[8,1],[4,1],[2,1],[0,191],[0,222],[2,1],[0,207],[0,238],[4,1],[2,1],[0,223],[0,239],[2,1],[0,255],[2,1],[0,237],[2,1],[0,253],[2,1],[0,252],[0,254]],D.ValTab14=[[0,0]],D.ValTab15=[[16,1],[6,1],[2,1],[0,0],[2,1],[0,16],[0,1],[2,1],[0,17],[4,1],[2,1],[0,32],[0,2],[2,1],[0,33],[0,18],[50,1],[16,1],[6,1],[2,1],[0,34],[2,1],[0,48],[0,49],[6,1],[2,1],[0,19],[2,1],[0,3],[0,64],[2,1],[0,50],[0,35],[14,1],[6,1],[4,1],[2,1],[0,4],[0,20],[0,65],[4,1],[2,1],[0,51],[0,66],[2,1],[0,36],[0,67],[10,1],[6,1],[2,1],[0,52],[2,1],[0,80],[0,5],[2,1],[0,81],[0,21],[4,1],[2,1],[0,82],[0,37],[4,1],[2,1],[0,68],[0,83],[0,97],[90,1],[36,1],[18,1],[10,1],[6,1],[2,1],[0,53],[2,1],[0,96],[0,6],[2,1],[0,22],[0,98],[4,1],[2,1],[0,38],[0,84],[2,1],[0,69],[0,99],[10,1],[6,1],[2,1],[0,54],[2,1],[0,112],[0,7],[2,1],[0,113],[0,85],[4,1],[2,1],[0,23],[0,100],[2,1],[0,114],[0,39],[24,1],[16,1],[8,1],[4,1],[2,1],[0,70],[0,115],[2,1],[0,55],[0,101],[4,1],[2,1],[0,86],[0,128],[2,1],[0,8],[0,116],[4,1],[2,1],[0,129],[0,24],[2,1],[0,130],[0,40],[16,1],[8,1],[4,1],[2,1],[0,71],[0,102],[2,1],[0,131],[0,56],[4,1],[2,1],[0,117],[0,87],[2,1],[0,132],[0,72],[6,1],[4,1],[2,1],[0,144],[0,25],[0,145],[4,1],[2,1],[0,146],[0,118],[2,1],[0,103],[0,41],[92,1],[36,1],[18,1],[10,1],[4,1],[2,1],[0,133],[0,88],[4,1],[2,1],[0,9],[0,119],[0,147],[4,1],[2,1],[0,57],[0,148],[2,1],[0,73],[0,134],[10,1],[6,1],[2,1],[0,104],[2,1],[0,160],[0,10],[2,1],[0,161],[0,26],[4,1],[2,1],[0,162],[0,42],[2,1],[0,149],[0,89],[26,1],[14,1],[6,1],[2,1],[0,163],[2,1],[0,58],[0,135],[4,1],[2,1],[0,120],[0,164],[2,1],[0,74],[0,150],[6,1],[4,1],[2,1],[0,105],[0,176],[0,177],[4,1],[2,1],[0,27],[0,165],[0,178],[14,1],[8,1],[4,1],[2,1],[0,90],[0,43],[2,1],[0,136],[0,151],[2,1],[0,179],[2,1],[0,121],[0,59],[8,1],[4,1],[2,1],[0,106],[0,180],[2,1],[0,75],[0,193],[4,1],[2,1],[0,152],[0,137],[2,1],[0,28],[0,181],[80,1],[34,1],[16,1],[6,1],[4,1],[2,1],[0,91],[0,44],[0,194],[6,1],[4,1],[2,1],[0,11],[0,192],[0,166],[2,1],[0,167],[0,122],[10,1],[4,1],[2,1],[0,195],[0,60],[4,1],[2,1],[0,12],[0,153],[0,182],[4,1],[2,1],[0,107],[0,196],[2,1],[0,76],[0,168],[20,1],[10,1],[4,1],[2,1],[0,138],[0,197],[4,1],[2,1],[0,208],[0,92],[0,209],[4,1],[2,1],[0,183],[0,123],[2,1],[0,29],[2,1],[0,13],[0,45],[12,1],[4,1],[2,1],[0,210],[0,211],[4,1],[2,1],[0,61],[0,198],[2,1],[0,108],[0,169],[6,1],[4,1],[2,1],[0,154],[0,184],[0,212],[4,1],[2,1],[0,139],[0,77],[2,1],[0,199],[0,124],[68,1],[34,1],[18,1],[10,1],[4,1],[2,1],[0,213],[0,93],[4,1],[2,1],[0,224],[0,14],[0,225],[4,1],[2,1],[0,30],[0,226],[2,1],[0,170],[0,46],[8,1],[4,1],[2,1],[0,185],[0,155],[2,1],[0,227],[0,214],[4,1],[2,1],[0,109],[0,62],[2,1],[0,200],[0,140],[16,1],[8,1],[4,1],[2,1],[0,228],[0,78],[2,1],[0,215],[0,125],[4,1],[2,1],[0,229],[0,186],[2,1],[0,171],[0,94],[8,1],[4,1],[2,1],[0,201],[0,156],[2,1],[0,241],[0,31],[6,1],[4,1],[2,1],[0,240],[0,110],[0,242],[2,1],[0,47],[0,230],[38,1],[18,1],[8,1],[4,1],[2,1],[0,216],[0,243],[2,1],[0,63],[0,244],[6,1],[2,1],[0,79],[2,1],[0,141],[0,217],[2,1],[0,187],[0,202],[8,1],[4,1],[2,1],[0,172],[0,231],[2,1],[0,126],[0,245],[8,1],[4,1],[2,1],[0,157],[0,95],[2,1],[0,232],[0,142],[2,1],[0,246],[0,203],[34,1],[18,1],[10,1],[6,1],[4,1],[2,1],[0,15],[0,174],[0,111],[2,1],[0,188],[0,218],[4,1],[2,1],[0,173],[0,247],[2,1],[0,127],[0,233],[8,1],[4,1],[2,1],[0,158],[0,204],[2,1],[0,248],[0,143],[4,1],[2,1],[0,219],[0,189],[2,1],[0,234],[0,249],[16,1],[8,1],[4,1],[2,1],[0,159],[0,220],[2,1],[0,205],[0,235],[4,1],[2,1],[0,190],[0,250],[2,1],[0,175],[0,221],[14,1],[6,1],[4,1],[2,1],[0,236],[0,206],[0,251],[4,1],[2,1],[0,191],[0,237],[2,1],[0,222],[0,252],[6,1],[4,1],[2,1],[0,207],[0,253],[0,238],[4,1],[2,1],[0,223],[0,254],[2,1],[0,239],[0,255]],D.ValTab16=[[2,1],[0,0],[6,1],[2,1],[0,16],[2,1],[0,1],[0,17],[42,1],[8,1],[4,1],[2,1],[0,32],[0,2],[2,1],[0,33],[0,18],[10,1],[6,1],[2,1],[0,34],[2,1],[0,48],[0,3],[2,1],[0,49],[0,19],[10,1],[4,1],[2,1],[0,50],[0,35],[4,1],[2,1],[0,64],[0,4],[0,65],[6,1],[2,1],[0,20],[2,1],[0,51],[0,66],[4,1],[2,1],[0,36],[0,80],[2,1],[0,67],[0,52],[138,1],[40,1],[16,1],[6,1],[4,1],[2,1],[0,5],[0,21],[0,81],[4,1],[2,1],[0,82],[0,37],[4,1],[2,1],[0,68],[0,53],[0,83],[10,1],[6,1],[4,1],[2,1],[0,96],[0,6],[0,97],[2,1],[0,22],[0,98],[8,1],[4,1],[2,1],[0,38],[0,84],[2,1],[0,69],[0,99],[4,1],[2,1],[0,54],[0,112],[0,113],[40,1],[18,1],[8,1],[2,1],[0,23],[2,1],[0,7],[2,1],[0,85],[0,100],[4,1],[2,1],[0,114],[0,39],[4,1],[2,1],[0,70],[0,101],[0,115],[10,1],[6,1],[2,1],[0,55],[2,1],[0,86],[0,8],[2,1],[0,128],[0,129],[6,1],[2,1],[0,24],[2,1],[0,116],[0,71],[2,1],[0,130],[2,1],[0,40],[0,102],[24,1],[14,1],[8,1],[4,1],[2,1],[0,131],[0,56],[2,1],[0,117],[0,132],[4,1],[2,1],[0,72],[0,144],[0,145],[6,1],[2,1],[0,25],[2,1],[0,9],[0,118],[2,1],[0,146],[0,41],[14,1],[8,1],[4,1],[2,1],[0,133],[0,88],[2,1],[0,147],[0,57],[4,1],[2,1],[0,160],[0,10],[0,26],[8,1],[2,1],[0,162],[2,1],[0,103],[2,1],[0,87],[0,73],[6,1],[2,1],[0,148],[2,1],[0,119],[0,134],[2,1],[0,161],[2,1],[0,104],[0,149],[220,1],[126,1],[50,1],[26,1],[12,1],[6,1],[2,1],[0,42],[2,1],[0,89],[0,58],[2,1],[0,163],[2,1],[0,135],[0,120],[8,1],[4,1],[2,1],[0,164],[0,74],[2,1],[0,150],[0,105],[4,1],[2,1],[0,176],[0,11],[0,177],[10,1],[4,1],[2,1],[0,27],[0,178],[2,1],[0,43],[2,1],[0,165],[0,90],[6,1],[2,1],[0,179],[2,1],[0,166],[0,106],[4,1],[2,1],[0,180],[0,75],[2,1],[0,12],[0,193],[30,1],[14,1],[6,1],[4,1],[2,1],[0,181],[0,194],[0,44],[4,1],[2,1],[0,167],[0,195],[2,1],[0,107],[0,196],[8,1],[2,1],[0,29],[4,1],[2,1],[0,136],[0,151],[0,59],[4,1],[2,1],[0,209],[0,210],[2,1],[0,45],[0,211],[18,1],[6,1],[4,1],[2,1],[0,30],[0,46],[0,226],[6,1],[4,1],[2,1],[0,121],[0,152],[0,192],[2,1],[0,28],[2,1],[0,137],[0,91],[14,1],[6,1],[2,1],[0,60],[2,1],[0,122],[0,182],[4,1],[2,1],[0,76],[0,153],[2,1],[0,168],[0,138],[6,1],[2,1],[0,13],[2,1],[0,197],[0,92],[4,1],[2,1],[0,61],[0,198],[2,1],[0,108],[0,154],[88,1],[86,1],[36,1],[16,1],[8,1],[4,1],[2,1],[0,139],[0,77],[2,1],[0,199],[0,124],[4,1],[2,1],[0,213],[0,93],[2,1],[0,224],[0,14],[8,1],[2,1],[0,227],[4,1],[2,1],[0,208],[0,183],[0,123],[6,1],[4,1],[2,1],[0,169],[0,184],[0,212],[2,1],[0,225],[2,1],[0,170],[0,185],[24,1],[10,1],[6,1],[4,1],[2,1],[0,155],[0,214],[0,109],[2,1],[0,62],[0,200],[6,1],[4,1],[2,1],[0,140],[0,228],[0,78],[4,1],[2,1],[0,215],[0,229],[2,1],[0,186],[0,171],[12,1],[4,1],[2,1],[0,156],[0,230],[4,1],[2,1],[0,110],[0,216],[2,1],[0,141],[0,187],[8,1],[4,1],[2,1],[0,231],[0,157],[2,1],[0,232],[0,142],[4,1],[2,1],[0,203],[0,188],[0,158],[0,241],[2,1],[0,31],[2,1],[0,15],[0,47],[66,1],[56,1],[2,1],[0,242],[52,1],[50,1],[20,1],[8,1],[2,1],[0,189],[2,1],[0,94],[2,1],[0,125],[0,201],[6,1],[2,1],[0,202],[2,1],[0,172],[0,126],[4,1],[2,1],[0,218],[0,173],[0,204],[10,1],[6,1],[2,1],[0,174],[2,1],[0,219],[0,220],[2,1],[0,205],[0,190],[6,1],[4,1],[2,1],[0,235],[0,237],[0,238],[6,1],[4,1],[2,1],[0,217],[0,234],[0,233],[2,1],[0,222],[4,1],[2,1],[0,221],[0,236],[0,206],[0,63],[0,240],[4,1],[2,1],[0,243],[0,244],[2,1],[0,79],[2,1],[0,245],[0,95],[10,1],[2,1],[0,255],[4,1],[2,1],[0,246],[0,111],[2,1],[0,247],[0,127],[12,1],[6,1],[2,1],[0,143],[2,1],[0,248],[0,249],[4,1],[2,1],[0,159],[0,250],[0,175],[8,1],[4,1],[2,1],[0,251],[0,191],[2,1],[0,252],[0,207],[4,1],[2,1],[0,253],[0,223],[2,1],[0,254],[0,239]],D.ValTab24=[[60,1],[8,1],[4,1],[2,1],[0,0],[0,16],[2,1],[0,1],[0,17],[14,1],[6,1],[4,1],[2,1],[0,32],[0,2],[0,33],[2,1],[0,18],[2,1],[0,34],[2,1],[0,48],[0,3],[14,1],[4,1],[2,1],[0,49],[0,19],[4,1],[2,1],[0,50],[0,35],[4,1],[2,1],[0,64],[0,4],[0,65],[8,1],[4,1],[2,1],[0,20],[0,51],[2,1],[0,66],[0,36],[6,1],[4,1],[2,1],[0,67],[0,52],[0,81],[6,1],[4,1],[2,1],[0,80],[0,5],[0,21],[2,1],[0,82],[0,37],[250,1],[98,1],[34,1],[18,1],[10,1],[4,1],[2,1],[0,68],[0,83],[2,1],[0,53],[2,1],[0,96],[0,6],[4,1],[2,1],[0,97],[0,22],[2,1],[0,98],[0,38],[8,1],[4,1],[2,1],[0,84],[0,69],[2,1],[0,99],[0,54],[4,1],[2,1],[0,113],[0,85],[2,1],[0,100],[0,70],[32,1],[14,1],[6,1],[2,1],[0,114],[2,1],[0,39],[0,55],[2,1],[0,115],[4,1],[2,1],[0,112],[0,7],[0,23],[10,1],[4,1],[2,1],[0,101],[0,86],[4,1],[2,1],[0,128],[0,8],[0,129],[4,1],[2,1],[0,116],[0,71],[2,1],[0,24],[0,130],[16,1],[8,1],[4,1],[2,1],[0,40],[0,102],[2,1],[0,131],[0,56],[4,1],[2,1],[0,117],[0,87],[2,1],[0,132],[0,72],[8,1],[4,1],[2,1],[0,145],[0,25],[2,1],[0,146],[0,118],[4,1],[2,1],[0,103],[0,41],[2,1],[0,133],[0,88],[92,1],[34,1],[16,1],[8,1],[4,1],[2,1],[0,147],[0,57],[2,1],[0,148],[0,73],[4,1],[2,1],[0,119],[0,134],[2,1],[0,104],[0,161],[8,1],[4,1],[2,1],[0,162],[0,42],[2,1],[0,149],[0,89],[4,1],[2,1],[0,163],[0,58],[2,1],[0,135],[2,1],[0,120],[0,74],[22,1],[12,1],[4,1],[2,1],[0,164],[0,150],[4,1],[2,1],[0,105],[0,177],[2,1],[0,27],[0,165],[6,1],[2,1],[0,178],[2,1],[0,90],[0,43],[2,1],[0,136],[0,179],[16,1],[10,1],[6,1],[2,1],[0,144],[2,1],[0,9],[0,160],[2,1],[0,151],[0,121],[4,1],[2,1],[0,166],[0,106],[0,180],[12,1],[6,1],[2,1],[0,26],[2,1],[0,10],[0,176],[2,1],[0,59],[2,1],[0,11],[0,192],[4,1],[2,1],[0,75],[0,193],[2,1],[0,152],[0,137],[67,1],[34,1],[16,1],[8,1],[4,1],[2,1],[0,28],[0,181],[2,1],[0,91],[0,194],[4,1],[2,1],[0,44],[0,167],[2,1],[0,122],[0,195],[10,1],[6,1],[2,1],[0,60],[2,1],[0,12],[0,208],[2,1],[0,182],[0,107],[4,1],[2,1],[0,196],[0,76],[2,1],[0,153],[0,168],[16,1],[8,1],[4,1],[2,1],[0,138],[0,197],[2,1],[0,92],[0,209],[4,1],[2,1],[0,183],[0,123],[2,1],[0,29],[0,210],[9,1],[4,1],[2,1],[0,45],[0,211],[2,1],[0,61],[0,198],[85,250],[4,1],[2,1],[0,108],[0,169],[2,1],[0,154],[0,212],[32,1],[16,1],[8,1],[4,1],[2,1],[0,184],[0,139],[2,1],[0,77],[0,199],[4,1],[2,1],[0,124],[0,213],[2,1],[0,93],[0,225],[8,1],[4,1],[2,1],[0,30],[0,226],[2,1],[0,170],[0,185],[4,1],[2,1],[0,155],[0,227],[2,1],[0,214],[0,109],[20,1],[10,1],[6,1],[2,1],[0,62],[2,1],[0,46],[0,78],[2,1],[0,200],[0,140],[4,1],[2,1],[0,228],[0,215],[4,1],[2,1],[0,125],[0,171],[0,229],[10,1],[4,1],[2,1],[0,186],[0,94],[2,1],[0,201],[2,1],[0,156],[0,110],[8,1],[2,1],[0,230],[2,1],[0,13],[2,1],[0,224],[0,14],[4,1],[2,1],[0,216],[0,141],[2,1],[0,187],[0,202],[74,1],[2,1],[0,255],[64,1],[58,1],[32,1],[16,1],[8,1],[4,1],[2,1],[0,172],[0,231],[2,1],[0,126],[0,217],[4,1],[2,1],[0,157],[0,232],[2,1],[0,142],[0,203],[8,1],[4,1],[2,1],[0,188],[0,218],[2,1],[0,173],[0,233],[4,1],[2,1],[0,158],[0,204],[2,1],[0,219],[0,189],[16,1],[8,1],[4,1],[2,1],[0,234],[0,174],[2,1],[0,220],[0,205],[4,1],[2,1],[0,235],[0,190],[2,1],[0,221],[0,236],[8,1],[4,1],[2,1],[0,206],[0,237],[2,1],[0,222],[0,238],[0,15],[4,1],[2,1],[0,240],[0,31],[0,241],[4,1],[2,1],[0,242],[0,47],[2,1],[0,243],[0,63],[18,1],[8,1],[4,1],[2,1],[0,244],[0,79],[2,1],[0,245],[0,95],[4,1],[2,1],[0,246],[0,111],[2,1],[0,247],[2,1],[0,127],[0,143],[10,1],[4,1],[2,1],[0,248],[0,249],[4,1],[2,1],[0,159],[0,175],[0,250],[8,1],[4,1],[2,1],[0,251],[0,191],[2,1],[0,252],[0,207],[4,1],[2,1],[0,253],[0,223],[2,1],[0,254],[0,239]],	D.ValTab32=[[2,1],[0,0],[8,1],[4,1],[2,1],[0,8],[0,4],[2,1],[0,1],[0,2],[8,1],[4,1],[2,1],[0,12],[0,10],[2,1],[0,3],[0,6],[6,1],[2,1],[0,9],[2,1],[0,5],[0,7],[4,1],[2,1],[0,14],[0,13],[2,1],[0,15],[0,11]],D.ValTab33=[[16,1],[8,1],[4,1],[2,1],[0,0],[0,1],[2,1],[0,2],[0,3],[4,1],[2,1],[0,4],[0,5],[2,1],[0,6],[0,7],[8,1],[4,1],[2,1],[0,8],[0,9],[2,1],[0,10],[0,11],[4,1],[2,1],[0,12],[0,13],[2,1],[0,14],[0,15]],D.ht=null,D.initHuff=function(){if(D.ht!=null)return;D.ht=[],D.ht[0]=new D("0  ",0,0,0,0,-1,D.ValTab0,0),D.ht[1]=new D("1  ",2,2,0,0,-1,D.ValTab1,7),D.ht[2]=new D("2  ",3,3,0,0,-1,D.ValTab2,17),D.ht[3]=new D("3  ",3,3,0,0,-1,D.ValTab3,17),D.ht[4]=new D("4  ",0,0,0,0,-1,D.ValTab4,0),D.ht[5]=new D("5  ",4,4,0,0,-1,D.ValTab5,31),D.ht[6]=new D("6  ",4,4,0,0,-1,D.ValTab6,31),D.ht[7]=new D("7  ",6,6,0,0,-1,D.ValTab7,71),D.ht[8]=new D("8  ",6,6,0,0,-1,D.ValTab8,71),D.ht[9]=new D("9  ",6,6,0,0,-1,D.ValTab9,71),D.ht[10]=new D("10 ",8,8,0,0,-1,D.ValTab10,127),D.ht[11]=new D("11 ",8,8,0,0,-1,D.ValTab11,127),D.ht[12]=new D("12 ",8,8,0,0,-1,D.ValTab12,127),D.ht[13]=new D("13 ",16,16,0,0,-1,D.ValTab13,511),D.ht[14]=new D("14 ",0,0,0,0,-1,D.ValTab14,0),D.ht[15]=new D("15 ",16,16,0,0,-1,D.ValTab15,511),D.ht[16]=new D("16 ",16,16,1,1,-1,D.ValTab16,511),D.ht[17]=new D("17 ",16,16,2,3,16,D.ValTab16,511),D.ht[18]=new D("18 ",16,16,3,7,16,D.ValTab16,511),D.ht[19]=new D("19 ",16,16,4,15,16,D.ValTab16,511),D.ht[20]=new D("20 ",16,16,6,63,16,D.ValTab16,511),D.ht[21]=new D("21 ",16,16,8,255,16,D.ValTab16,511),D.ht[22]=new D("22 ",16,16,10,1023,16,D.ValTab16,511),D.ht[23]=new D("23 ",16,16,13,8191,16,D.ValTab16,511),D.ht[24]=new D("24 ",16,16,4,15,-1,D.ValTab24,512),D.ht[25]=new D("25 ",16,16,5,31,24,D.ValTab24,512),D.ht[26]=new D("26 ",16,16,6,63,24,D.ValTab24,512),D.ht[27]=new D("27 ",16,16,7,127,24,D.ValTab24,512),D.ht[28]=new D("28 ",16,16,8,255,24,D.ValTab24,512),D.ht[29]=new D("29 ",16,16,9,511,24,D.ValTab24,512),D.ht[30]=new D("30 ",16,16,11,2047,24,D.ValTab24,512),D.ht[31]=new D("31 ",16,16,13,8191,24,D.ValTab24,512),D.ht[32]=new D("32 ",1,16,0,0,-1,D.ValTab32,31),D.ht[33]=new D("33 ",1,16,0,0,-1,D.ValTab33,31)},D.huffman_decoder=function(h,x,y,v,w,_){var a=1<<((4*8)-1),b=0,c=1;if(h.val==null)return 2;if(h.treelen==0)return x[0]=y[0]=0,0;do{if(h.val[b][0]==0){x[0]=h.val[b][1]>>>4,y[0]=h.val[b][1]&0xf,c=0;break}if(_.hget1bit()!=0){while(h.val[b][1]>=D.MXOFF)b+=h.val[b][1];b+=h.val[b][1]}else{while(h.val[b][0]>=D.MXOFF)b+=h.val[b][0];b+=h.val[b][0]}a>>>=1}while((a!=0)||(b<0));if(h.tablename0=='3'&&(h.tablename1=='2'||h.tablename1=='3')){v[0]=(y[0]>>3)&1,w[0]=(y[0]>>2)&1,x[0]=(y[0]>>1)&1,y[0]=y[0]&1;if(v[0]!=0)if(_.hget1bit()!=0) v[0]=-v[0];if(w[0]!=0)if(_.hget1bit()!=0) w[0]=-w[0];if(x[0]!=0)if(_.hget1bit()!=0) x[0]=-x[0];if(y[0]!=0)if(_.hget1bit()!=0) y[0]=-y[0]}else{if(h.linbits!=0) if((h.xlen-1)==x[0]) x[0]+=_.hgetbits(h.linbits);if(x[0]!=0) if(_.hget1bit()!=0) x[0]=-x[0];if(h.linbits!=0) if((h.ylen-1)==y[0]) y[0]+=_.hgetbits(h.linbits);if(y[0]!=0) if(_.hget1bit()!=0) y[0]=-y[0]}return c};const E=function(a,b,c){if(E.d==null)E.d=E.load_d(),E.d16=E.splitArray(E.d,16);this.v1=new Float32Array(512),this.v2=new Float32Array(512),this._tmpOut=new Float32Array(32),this.samples=new Float32Array(32),this.channel=a,this.scalefactor=b,this.setEQ(c),this.reset()};E.d=null,E.d16=null,E.load_d=function(){return new Float32Array([0.000000000,-0.000442505, 0.003250122,-0.007003784,0.031082153,-0.078628540, 0.100311279,-0.572036743,1.144989014, 0.572036743, 0.100311279, 0.078628540,0.031082153, 0.007003784, 0.003250122, 0.000442505,-0.000015259,-0.000473022, 0.003326416,-0.007919312,0.030517578,-0.084182739, 0.090927124,-0.600219727,1.144287109, 0.543823242, 0.108856201, 0.073059082,0.031478882, 0.006118774, 0.003173828, 0.000396729,-0.000015259,-0.000534058, 0.003387451,-0.008865356,0.029785156,-0.089706421, 0.080688477,-0.628295898,1.142211914, 0.515609741, 0.116577148, 0.067520142,0.031738281, 0.005294800, 0.003082275, 0.000366211,-0.000015259,-0.000579834, 0.003433228,-0.009841919,0.028884888,-0.095169067, 0.069595337,-0.656219482,1.138763428, 0.487472534, 0.123474121, 0.061996460,0.031845093, 0.004486084, 0.002990723, 0.000320435,-0.000015259,-0.000625610, 0.003463745,-0.010848999,0.027801514,-0.100540161, 0.057617188,-0.683914185,1.133926392, 0.459472656, 0.129577637, 0.056533813,0.031814575, 0.003723145, 0.002899170, 0.000289917,-0.000015259,-0.000686646, 0.003479004,-0.011886597,0.026535034,-0.105819702, 0.044784546,-0.711318970,1.127746582, 0.431655884, 0.134887695, 0.051132202,0.031661987, 0.003005981, 0.002792358, 0.000259399,-0.000015259,-0.000747681, 0.003479004,-0.012939453,0.025085449,-0.110946655, 0.031082153,-0.738372803,1.120223999, 0.404083252, 0.139450073, 0.045837402,0.031387329, 0.002334595, 0.002685547, 0.000244141,-0.000030518,-0.000808716, 0.003463745,-0.014022827,0.023422241,-0.115921021, 0.016510010,-0.765029907,1.111373901, 0.376800537, 0.143264771, 0.040634155,0.031005859, 0.001693726, 0.002578735, 0.000213623,-0.000030518,-0.000885010, 0.003417969,-0.015121460,0.021575928,-0.120697021, 0.001068115,-0.791213989,1.101211548, 0.349868774, 0.146362305, 0.035552979,0.030532837, 0.001098633, 0.002456665, 0.000198364,-0.000030518,-0.000961304, 0.003372192,-0.016235352,0.019531250,-0.125259399,-0.015228271,-0.816864014,1.089782715, 0.323318481, 0.148773193, 0.030609131,0.029937744, 0.000549316, 0.002349854, 0.000167847,-0.000030518,-0.001037598, 0.003280640,-0.017349243,0.017257690,-0.129562378,-0.032379150,-0.841949463,1.077117920, 0.297210693, 0.150497437, 0.025817871,0.029281616, 0.000030518, 0.002243042, 0.000152588,-0.000045776,-0.001113892, 0.003173828,-0.018463135,0.014801025,-0.133590698,-0.050354004,-0.866363525,1.063217163, 0.271591187, 0.151596069, 0.021179199,0.028533936,-0.000442505, 0.002120972, 0.000137329,-0.000045776,-0.001205444, 0.003051758,-0.019577026,0.012115479,-0.137298584,-0.069168091,-0.890090942,1.048156738, 0.246505737, 0.152069092, 0.016708374,0.027725220,-0.000869751, 0.002014160, 0.000122070,-0.000061035,-0.001296997, 0.002883911,-0.020690918,0.009231567,-0.140670776,-0.088775635,-0.913055420,1.031936646, 0.221984863, 0.151962280, 0.012420654,0.026840210,-0.001266479, 0.001907349, 0.000106812,-0.000061035,-0.001388550, 0.002700806,-0.021789551,0.006134033,-0.143676758,-0.109161377,-0.935195923,1.014617920, 0.198059082, 0.151306152, 0.008316040,0.025909424,-0.001617432, 0.001785278, 0.000106812,-0.000076294,-0.001480103, 0.002487183,-0.022857666,0.002822876,-0.146255493,-0.130310059,-0.956481934,0.996246338, 0.174789429, 0.150115967, 0.004394531,0.024932861,-0.001937866, 0.001693726, 0.000091553,-0.000076294,-0.001586914, 0.002227783,-0.023910522,-0.000686646,-0.148422241,-0.152206421,-0.976852417,0.976852417, 0.152206421, 0.148422241, 0.000686646,0.023910522,-0.002227783, 0.001586914, 0.000076294,-0.000091553,-0.001693726, 0.001937866,-0.024932861,-0.004394531,-0.150115967,-0.174789429,-0.996246338,0.956481934, 0.130310059, 0.146255493,-0.002822876,0.022857666,-0.002487183, 0.001480103, 0.000076294,-0.000106812,-0.001785278, 0.001617432,-0.025909424,-0.008316040,-0.151306152,-0.198059082,-1.014617920,0.935195923, 0.109161377, 0.143676758,-0.006134033,0.021789551,-0.002700806, 0.001388550, 0.000061035,-0.000106812,-0.001907349, 0.001266479,-0.026840210,-0.012420654,-0.151962280,-0.221984863,-1.031936646,0.913055420, 0.088775635, 0.140670776,-0.009231567,0.020690918,-0.002883911, 0.001296997, 0.000061035,-0.000122070,-0.002014160, 0.000869751,-0.027725220,-0.016708374,-0.152069092,-0.246505737,-1.048156738,0.890090942, 0.069168091, 0.137298584,-0.012115479,0.019577026,-0.003051758, 0.001205444, 0.000045776,-0.000137329,-0.002120972, 0.000442505,-0.028533936,-0.021179199,-0.151596069,-0.271591187,-1.063217163,0.866363525, 0.050354004, 0.133590698,-0.014801025,0.018463135,-0.003173828, 0.001113892, 0.000045776,-0.000152588,-0.002243042,-0.000030518,-0.029281616,-0.025817871,-0.150497437,-0.297210693,-1.077117920,0.841949463, 0.032379150, 0.129562378,-0.017257690,0.017349243,-0.003280640, 0.001037598, 0.000030518,-0.000167847,-0.002349854,-0.000549316,-0.029937744,-0.030609131,-0.148773193,-0.323318481,-1.089782715,0.816864014, 0.015228271, 0.125259399,-0.019531250,0.016235352,-0.003372192, 0.000961304, 0.000030518,-0.000198364,-0.002456665,-0.001098633,-0.030532837,-0.035552979,-0.146362305,-0.349868774,-1.101211548,0.791213989,-0.001068115, 0.120697021,-0.021575928,0.015121460,-0.003417969, 0.000885010, 0.000030518,-0.000213623,-0.002578735,-0.001693726,-0.031005859,-0.040634155,-0.143264771,-0.376800537,-1.111373901,0.765029907,-0.016510010, 0.115921021,-0.023422241,0.014022827,-0.003463745, 0.000808716, 0.000030518,-0.000244141,-0.002685547,-0.002334595,-0.031387329,-0.045837402,-0.139450073,-0.404083252,-1.120223999,0.738372803,-0.031082153, 0.110946655,-0.025085449,0.012939453,-0.003479004, 0.000747681, 0.000015259,-0.000259399,-0.002792358,-0.003005981,-0.031661987,-0.051132202,-0.134887695,-0.431655884,-1.127746582,0.711318970,-0.044784546, 0.105819702,-0.026535034,0.011886597,-0.003479004, 0.000686646, 0.000015259,-0.000289917,-0.002899170,-0.003723145,-0.031814575,-0.056533813,-0.129577637,-0.459472656,-1.133926392,0.683914185,-0.057617188, 0.100540161,-0.027801514,0.010848999,-0.003463745, 0.000625610, 0.000015259,-0.000320435,-0.002990723,-0.004486084,-0.031845093,-0.061996460,-0.123474121,-0.487472534,-1.138763428,0.656219482,-0.069595337, 0.095169067,-0.028884888,0.009841919,-0.003433228, 0.000579834, 0.000015259,-0.000366211,-0.003082275,-0.005294800,-0.031738281,-0.067520142,-0.116577148,-0.515609741,-1.142211914,0.628295898,-0.080688477, 0.089706421,-0.029785156,0.008865356,-0.003387451, 0.000534058, 0.000015259,-0.000396729,-0.003173828,-0.006118774,-0.031478882,-0.073059082,-0.108856201,-0.543823242,-1.144287109,0.600219727,-0.090927124, 0.084182739,-0.030517578,0.007919312,-0.003326416, 0.000473022, 0.000015259])},E.subArray=function(a,b,c){if(b+c>a.length)c=a.length-b;if(c<0)c=0;var _=new Float32Array(c);return arraycopy(a,b+0,_,0,c),_},E.splitArray=function(a,b){var c=(a.length/b)|0;var d=new Array(c);for(var i=0;i<c;i++)d[i]=E.subArray(a,i*b,b);return d},E.prototype.setEQ=function(eq0){this.eq=eq0;if(this.eq==null){this.eq=new Float32Array(32);for(var i=0;i<32;i++)this.eq[i]=1}if(this.eq.length<32)throw new Error("IllegalArgumentException(eq0)")},E.prototype.reset=function(){for(var p=0;p<512;p++)this.v1[p]=this.v2[p]=0.0;for(var p2=0;p2<32;p2++)this.samples[p2]=0.0;this.actual_v=this.v1,this.actual_write_pos=15},E.prototype.input_sample=function(){},E.prototype.input_samples=function(s){for(var i=31;i>=0;i--)this.samples[i]=s[i]*this.eq[i]},E.prototype.compute_new_v=function(){var v0=0,v1=0,v2=0,v3=0,v4=0,v5=0,v6=0,v7=0,v8=0,v9=0;var v10=0,v11=0,v12=0,v13=0,v14=0,v15=0,v16=0,v17=0,v18=0,v19=0;var v20=0,v21=0,v22=0,v23=0,v24=0,v25=0,v26=0,v27=0,v28=0,v29=0;var v30=0,v31=0;var a,d,s=this.samples;var s0=s[0],s1=s[1],s2=s[2],s3=s[3],s4=s[4],s5=s[5],s6=s[6],s7=s[7],s8=s[8],s9=s[9],s10=s[10],s11=s[11],s12=s[12],s13=s[13],s14=s[14],s15=s[15],s16=s[16],s17=s[17],s18=s[18],s19=s[19],s20=s[20],s21=s[21],s22=s[22],s23=s[23],s24=s[24],s25=s[25],s26=s[26],s27=s[27],s28=s[28],s29=s[29],s30=s[30],s31=s[31];var p0=s0+s31,p1=s1+s30,p2=s2+s29,p3=s3+s28,p4=s4+s27,p5=s5+s26,p6=s6+s25,p7=s7+s24,p8=s8+s23,p9=s9+s22,p10=s10+s21,p11=s11+s20,p12=s12+s19,p13=s13+s18,p14=s14+s17,p15=s15+s16;var pp0=p0+p15,pp1=p1+p14,pp2=p2+p13,pp3=p3+p12,pp4=p4+p11,pp5=p5+p10,pp6=p6+p9,pp7=p7+p8;var pp8=(p0-p15)*E.cos1_32,pp9=(p1-p14)*E.cos3_32,pp10=(p2-p13)*E.cos5_32,pp11=(p3-p12)*E.cos7_32,pp12=(p4-p11)*E.cos9_32,pp13=(p5-p10)*E.cos11_32,pp14=(p6-p9)*E.cos13_32,pp15=(p7-p8)*E.cos15_32;p0=pp0+pp7,p1=pp1+pp6,p2=pp2+pp5,p3=pp3+pp4,p4=(pp0-pp7)*E.cos1_16,p5=(pp1-pp6)*E.cos3_16,p6=(pp2-pp5)*E.cos5_16,p7=(pp3-pp4)*E.cos7_16,p8=pp8+pp15,p9=pp9+pp14,p10=pp10+pp13,p11=pp11+pp12,p12=(pp8-pp15)*E.cos1_16,p13=(pp9-pp14)*E.cos3_16,p14=(pp10-pp13)*E.cos5_16,p15=(pp11-pp12)*E.cos7_16,pp0=p0+p3,pp1=p1+p2,pp2=(p0-p3)*E.cos1_8,pp3=(p1-p2)*E.cos3_8,pp4=p4+p7,pp5=p5+p6,pp6=(p4-p7)*E.cos1_8,pp7=(p5-p6)*E.cos3_8,pp8=p8+p11,pp9=p9+p10,pp10=(p8-p11)*E.cos1_8,pp11=(p9-p10)*E.cos3_8,pp12=p12+p15,pp13=p13+p14,pp14=(p12-p15)*E.cos1_8,pp15=(p13-p14)*E.cos3_8,p0=pp0+pp1,p1=(pp0-pp1)*E.cos1_4,p2=pp2+pp3,p3=(pp2-pp3)*E.cos1_4,p4=pp4+pp5,p5=(pp4-pp5)*E.cos1_4,p6=pp6+pp7,p7=(pp6-pp7)*E.cos1_4,p8=pp8+pp9,p9=(pp8-pp9)*E.cos1_4,p10=pp10+pp11,p11=(pp10-pp11)*E.cos1_4,p12=pp12+pp13,p13=(pp12-pp13)*E.cos1_4,p14=pp14+pp15,p15=(pp14-pp15)*E.cos1_4,v19=-(v4=(v12=p7)+p5)-p6,v27=-p6-p7-p4,v6=(v10=(v14=p15)+p11)+p13,v17=-(v2=p15+p13+p9)-p14,v21=(a=-p14-p15-p10-p11)-p13,v29=-p14-p15-p12-p8,v25=a-p12,v31=-p0,v0=p1,v23=-(v8=p3)-p2,p0=(s0-s31)*E.cos1_64,p1=(s1-s30)*E.cos3_64,p2=(s2-s29)*E.cos5_64,p3=(s3-s28)*E.cos7_64,p4=(s4-s27)*E.cos9_64,p5=(s5-s26)*E.cos11_64,p6=(s6-s25)*E.cos13_64,p7=(s7-s24)*E.cos15_64,p8=(s8-s23)*E.cos17_64,p9=(s9-s22)*E.cos19_64,p10=(s10-s21)*E.cos21_64,p11=(s11-s20)*E.cos23_64,p12=(s12-s19)*E.cos25_64,p13=(s13-s18)*E.cos27_64,p14=(s14-s17)*E.cos29_64,p15=(s15-s16)*E.cos31_64,pp0=p0+p15,pp1=p1+p14,pp2=p2+p13,pp3=p3+p12,pp4=p4+p11,pp5=p5+p10,pp6=p6+p9,pp7=p7+p8,pp8=(p0-p15)*E.cos1_32,pp9=(p1-p14)*E.cos3_32,pp10=(p2-p13)*E.cos5_32,pp11=(p3-p12)*E.cos7_32,pp12=(p4-p11)*E.cos9_32,pp13=(p5-p10)*E.cos11_32,pp14=(p6-p9)*E.cos13_32,pp15=(p7-p8)*E.cos15_32,p0=pp0+pp7,p1=pp1+pp6,p2=pp2+pp5,p3=pp3+pp4,p4=(pp0-pp7)*E.cos1_16,p5=(pp1-pp6)*E.cos3_16,p6=(pp2-pp5)*E.cos5_16,p7=(pp3-pp4)*E.cos7_16,p8=pp8+pp15,p9=pp9+pp14,p10=pp10+pp13,p11=pp11+pp12,p12=(pp8-pp15)*E.cos1_16,p13=(pp9-pp14)*E.cos3_16,p14=(pp10-pp13)*E.cos5_16,p15=(pp11-pp12)*E.cos7_16,pp0=p0+p3,pp1=p1+p2,pp2=(p0-p3)*E.cos1_8,pp3=(p1-p2)*E.cos3_8,pp4=p4+p7,pp5=p5+p6,pp6=(p4-p7)*E.cos1_8,pp7=(p5-p6)*E.cos3_8,pp8=p8+p11,pp9=p9+p10,pp10=(p8-p11)*E.cos1_8,pp11=(p9-p10)*E.cos3_8,pp12=p12+p15,pp13=p13+p14,pp14=(p12-p15)*E.cos1_8,pp15=(p13-p14)*E.cos3_8,p0=pp0+pp1,p1=(pp0-pp1)*E.cos1_4,p2=pp2+pp3,p3=(pp2-pp3)*E.cos1_4,p4=pp4+pp5,p5=(pp4-pp5)*E.cos1_4,p6=pp6+pp7,p7=(pp6-pp7)*E.cos1_4,p8=pp8+pp9,p9=(pp8-pp9)*E.cos1_4,p10=pp10+pp11,p11=(pp10-pp11)*E.cos1_4,p12=pp12+pp13,p13=(pp12-pp13)*E.cos1_4,p14=pp14+pp15,p15=(pp14-pp15)*E.cos1_4,v5=(v11=(v13=(v15=p15)+p7)+p11)+p5+p13,v7=(v9=p15+p11+p3)+p13,v16=-(v1=(a=p13+p15+p9)+p1)-p14,v18=-(v3=a+p5+p7)-p6-p14,v22=(a=-p10-p11-p14-p15)-p13-p2-p3,v20=a-p13-p5-p6-p7,v24=a-p12-p2-p3,v26=a-p12-(d=p4+p6+p7),v30=(a=-p8-p12-p14-p15)-p0,v28=a-d;var g=this.actual_v,f=this.actual_write_pos;g[0+f]=v0,g[16+f]=v1,g[32+f]=v2,g[48+f]=v3,g[64+f]=v4,g[80+f]=v5,g[96+f]=v6,g[112+f]=v7,g[128+f]=v8,g[144+f]=v9,g[160+f]=v10,g[176+f]=v11,g[192+f]=v12,g[208+f]=v13,g[224+f]=v14,g[240+f]=v15,g[256+f]=0,g[272+f]=-v15,g[288+f]=-v14,g[304+f]=-v13,g[320+f]=-v12,g[336+f]=-v11,g[352+f]=-v10,g[368+f]=-v9,g[384+f]=-v8,g[400+f]=-v7,g[416+f]=-v6,g[432+f]=-v5,g[448+f]=-v4,g[464+f]=-v3,g[480+f]=-v2,g[496+f]=-v1;g=(this.actual_v === this.v1)?this.v2:this.v1;g[0+f]=-v0,g[16+f]=v16,g[32+f]=v17,g[48+f]=v18,g[64+f]=v19,g[80+f]=v20,g[96+f]=v21,g[112+f]=v22,g[128+f]=v23,g[144+f]=v24,g[160+f]=v25,g[176+f]=v26,g[192+f]=v27,g[208+f]=v28,g[224+f]=v29,g[240+f]=v30,g[256+f]=v31,g[272+f]=v30,g[288+f]=v29,g[304+f]=v28,g[320+f]=v27,g[336+f]=v26,g[352+f]=v25,g[368+f]=v24,g[384+f]=v23,g[400+f]=v22,g[416+f]=v21,g[432+f]=v20,g[448+f]=v19,g[464+f]=v18,g[480+f]=v17,g[496+f]=v16},E.prototype.compute_pcm_samples0=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[0+dvp]*dp[0])+(vp[15+dvp]*dp[1])+(vp[14+dvp]*dp[2])+(vp[13+dvp]*dp[3])+(vp[12+dvp]*dp[4])+(vp[11+dvp]*dp[5])+(vp[10+dvp]*dp[6])+(vp[9+dvp]*dp[7])+(vp[8+dvp]*dp[8])+(vp[7+dvp]*dp[9])+(vp[6+dvp]*dp[10])+(vp[5+dvp]*dp[11])+(vp[4+dvp]*dp[12])+(vp[3+dvp]*dp[13])+(vp[2+dvp]*dp[14])+(vp[1+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples1=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[1+dvp]*dp[0])+(vp[0+dvp]*dp[1])+(vp[15+dvp]*dp[2])+(vp[14+dvp]*dp[3])+(vp[13+dvp]*dp[4])+(vp[12+dvp]*dp[5])+(vp[11+dvp]*dp[6])+(vp[10+dvp]*dp[7])+(vp[9+dvp]*dp[8])+(vp[8+dvp]*dp[9])+(vp[7+dvp]*dp[10])+(vp[6+dvp]*dp[11])+(vp[5+dvp]*dp[12])+(vp[4+dvp]*dp[13])+(vp[3+dvp]*dp[14])+(vp[2+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples2=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[2+dvp]*dp[0])+(vp[1+dvp]*dp[1])+(vp[0+dvp]*dp[2])+(vp[15+dvp]*dp[3])+(vp[14+dvp]*dp[4])+(vp[13+dvp]*dp[5])+(vp[12+dvp]*dp[6])+(vp[11+dvp]*dp[7])+(vp[10+dvp]*dp[8])+(vp[9+dvp]*dp[9])+(vp[8+dvp]*dp[10])+(vp[7+dvp]*dp[11])+(vp[6+dvp]*dp[12])+(vp[5+dvp]*dp[13])+(vp[4+dvp]*dp[14])+(vp[3+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples3=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[3+dvp]*dp[0])+(vp[2+dvp]*dp[1])+(vp[1+dvp]*dp[2])+(vp[0+dvp]*dp[3])+(vp[15+dvp]*dp[4])+(vp[14+dvp]*dp[5])+(vp[13+dvp]*dp[6])+(vp[12+dvp]*dp[7])+(vp[11+dvp]*dp[8])+(vp[10+dvp]*dp[9])+(vp[9+dvp]*dp[10])+(vp[8+dvp]*dp[11])+(vp[7+dvp]*dp[12])+(vp[6+dvp]*dp[13])+(vp[5+dvp]*dp[14])+(vp[4+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples4=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[4+dvp]*dp[0])+(vp[3+dvp]*dp[1])+(vp[2+dvp]*dp[2])+(vp[1+dvp]*dp[3])+(vp[0+dvp]*dp[4])+(vp[15+dvp]*dp[5])+(vp[14+dvp]*dp[6])+(vp[13+dvp]*dp[7])+(vp[12+dvp]*dp[8])+(vp[11+dvp]*dp[9])+(vp[10+dvp]*dp[10])+(vp[9+dvp]*dp[11])+(vp[8+dvp]*dp[12])+(vp[7+dvp]*dp[13])+(vp[6+dvp]*dp[14])+(vp[5+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples5=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[5+dvp]*dp[0])+(vp[4+dvp]*dp[1])+(vp[3+dvp]*dp[2])+(vp[2+dvp]*dp[3])+(vp[1+dvp]*dp[4])+(vp[0+dvp]*dp[5])+(vp[15+dvp]*dp[6])+(vp[14+dvp]*dp[7])+(vp[13+dvp]*dp[8])+(vp[12+dvp]*dp[9])+(vp[11+dvp]*dp[10])+(vp[10+dvp]*dp[11])+(vp[9+dvp]*dp[12])+(vp[8+dvp]*dp[13])+(vp[7+dvp]*dp[14])+(vp[6+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples6=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[6+dvp]*dp[0])+(vp[5+dvp]*dp[1])+(vp[4+dvp]*dp[2])+(vp[3+dvp]*dp[3])+(vp[2+dvp]*dp[4])+(vp[1+dvp]*dp[5])+(vp[0+dvp]*dp[6])+(vp[15+dvp]*dp[7])+(vp[14+dvp]*dp[8])+(vp[13+dvp]*dp[9])+(vp[12+dvp]*dp[10])+(vp[11+dvp]*dp[11])+(vp[10+dvp]*dp[12])+(vp[9+dvp]*dp[13])+(vp[8+dvp]*dp[14])+(vp[7+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples7=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[7+dvp]*dp[0])+(vp[6+dvp]*dp[1])+(vp[5+dvp]*dp[2])+(vp[4+dvp]*dp[3])+(vp[3+dvp]*dp[4])+(vp[2+dvp]*dp[5])+(vp[1+dvp]*dp[6])+(vp[0+dvp]*dp[7])+(vp[15+dvp]*dp[8])+(vp[14+dvp]*dp[9])+(vp[13+dvp]*dp[10])+(vp[12+dvp]*dp[11])+(vp[11+dvp]*dp[12])+(vp[10+dvp]*dp[13])+(vp[9+dvp]*dp[14])+(vp[8+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples8=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[8+dvp]*dp[0])+(vp[7+dvp]*dp[1])+(vp[6+dvp]*dp[2])+(vp[5+dvp]*dp[3])+(vp[4+dvp]*dp[4])+(vp[3+dvp]*dp[5])+(vp[2+dvp]*dp[6])+(vp[1+dvp]*dp[7])+(vp[0+dvp]*dp[8])+(vp[15+dvp]*dp[9])+(vp[14+dvp]*dp[10])+(vp[13+dvp]*dp[11])+(vp[12+dvp]*dp[12])+(vp[11+dvp]*dp[13])+(vp[10+dvp]*dp[14])+(vp[9+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples9=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[9+dvp]*dp[0]) +(vp[8+dvp]*dp[1]) +(vp[7+dvp]*dp[2]) +(vp[6+dvp]*dp[3]) +(vp[5+dvp]*dp[4]) +(vp[4+dvp]*dp[5]) +(vp[3+dvp]*dp[6]) +(vp[2+dvp]*dp[7]) +(vp[1+dvp]*dp[8]) +(vp[0+dvp]*dp[9]) +(vp[15+dvp]*dp[10]) +(vp[14+dvp]*dp[11]) +(vp[13+dvp]*dp[12]) +(vp[12+dvp]*dp[13]) +(vp[11+dvp]*dp[14]) +(vp[10+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples10=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[10+dvp]*dp[0])+(vp[9+dvp]*dp[1])+(vp[8+dvp]*dp[2])+(vp[7+dvp]*dp[3])+(vp[6+dvp]*dp[4])+(vp[5+dvp]*dp[5])+(vp[4+dvp]*dp[6])+(vp[3+dvp]*dp[7])+(vp[2+dvp]*dp[8])+(vp[1+dvp]*dp[9])+(vp[0+dvp]*dp[10])+(vp[15+dvp]*dp[11])+(vp[14+dvp]*dp[12])+(vp[13+dvp]*dp[13])+(vp[12+dvp]*dp[14])+(vp[11+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples11=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[11+dvp]*dp[0])+(vp[10+dvp]*dp[1])+(vp[9+dvp]*dp[2])+(vp[8+dvp]*dp[3])+(vp[7+dvp]*dp[4])+(vp[6+dvp]*dp[5])+(vp[5+dvp]*dp[6])+(vp[4+dvp]*dp[7])+(vp[3+dvp]*dp[8])+(vp[2+dvp]*dp[9])+(vp[1+dvp]*dp[10])+(vp[0+dvp]*dp[11])+(vp[15+dvp]*dp[12])+(vp[14+dvp]*dp[13])+(vp[13+dvp]*dp[14])+(vp[12+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples12=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[12+dvp]*dp[0])+(vp[11+dvp]*dp[1])+(vp[10+dvp]*dp[2])+(vp[9+dvp]*dp[3])+(vp[8+dvp]*dp[4])+(vp[7+dvp]*dp[5])+(vp[6+dvp]*dp[6])+(vp[5+dvp]*dp[7])+(vp[4+dvp]*dp[8])+(vp[3+dvp]*dp[9])+(vp[2+dvp]*dp[10])+(vp[1+dvp]*dp[11])+(vp[0+dvp]*dp[12])+(vp[15+dvp]*dp[13])+(vp[14+dvp]*dp[14])+(vp[13+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples13=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[13+dvp]*dp[0])+(vp[12+dvp]*dp[1])+(vp[11+dvp]*dp[2])+(vp[10+dvp]*dp[3])+(vp[9+dvp]*dp[4])+(vp[8+dvp]*dp[5])+(vp[7+dvp]*dp[6])+(vp[6+dvp]*dp[7])+(vp[5+dvp]*dp[8])+(vp[4+dvp]*dp[9])+(vp[3+dvp]*dp[10])+(vp[2+dvp]*dp[11])+(vp[1+dvp]*dp[12])+(vp[0+dvp]*dp[13])+(vp[15+dvp]*dp[14])+(vp[14+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples14=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[14+dvp]*dp[0])+(vp[13+dvp]*dp[1])+(vp[12+dvp]*dp[2])+(vp[11+dvp]*dp[3])+(vp[10+dvp]*dp[4])+(vp[9+dvp]*dp[5])+(vp[8+dvp]*dp[6])+(vp[7+dvp]*dp[7])+(vp[6+dvp]*dp[8])+(vp[5+dvp]*dp[9])+(vp[4+dvp]*dp[10])+(vp[3+dvp]*dp[11])+(vp[2+dvp]*dp[12])+(vp[1+dvp]*dp[13])+(vp[0+dvp]*dp[14])+(vp[15+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples15=function(){var vp=this.actual_v,_=this._tmpOut,dvp=0;for(var i=0;i<32;i++){var dp=E.d16[i];_[i]=((vp[15+dvp]*dp[0])+(vp[14+dvp]*dp[1])+(vp[13+dvp]*dp[2])+(vp[12+dvp]*dp[3])+(vp[11+dvp]*dp[4])+(vp[10+dvp]*dp[5])+(vp[9+dvp]*dp[6])+(vp[8+dvp]*dp[7])+(vp[7+dvp]*dp[8])+(vp[6+dvp]*dp[9])+(vp[5+dvp]*dp[10])+(vp[4+dvp]*dp[11])+(vp[3+dvp]*dp[12])+(vp[2+dvp]*dp[13])+(vp[1+dvp]*dp[14])+(vp[0+dvp]*dp[15]))*this.scalefactor;dvp+=16}},E.prototype.compute_pcm_samples=function(_){switch (this.actual_write_pos){case 0:this.compute_pcm_samples0();break;case 1:this.compute_pcm_samples1();break;case 2:this.compute_pcm_samples2();break;case 3:this.compute_pcm_samples3();break;case 4:this.compute_pcm_samples4();break;case 5:this.compute_pcm_samples5();break;case 6:this.compute_pcm_samples6();break;case 7:this.compute_pcm_samples7();break;case 8:this.compute_pcm_samples8();break;case 9:this.compute_pcm_samples9();break;case 10:this.compute_pcm_samples10();break;case 11:this.compute_pcm_samples11();break;case 12:this.compute_pcm_samples12();break;case 13:this.compute_pcm_samples13();break;case 14:this.compute_pcm_samples14();break;case 15:this.compute_pcm_samples15();break}if(_!=null)_.appendSamples(this.channel,this._tmpOut)},E.prototype.calculate_pcm_samples=function(_){this.compute_new_v(),this.compute_pcm_samples(_),this.actual_write_pos=(this.actual_write_pos+1)&0xf,this.actual_v=(this.actual_v === this.v1)?this.v2:this.v1;for(var p=0;p<32;p++)this.samples[p]=0.0},E.MY_PI=3.14159265358979323846,E.cos1_64=(1.0/(2.0*Math.cos(E.MY_PI/64.0))),E.cos3_64=(1.0/(2.0*Math.cos(E.MY_PI*3.0/64.0))),E.cos5_64=(1.0/(2.0*Math.cos(E.MY_PI*5.0/64.0))),E.cos7_64=(1.0/(2.0*Math.cos(E.MY_PI*7.0/64.0))),E.cos9_64=(1.0/(2.0*Math.cos(E.MY_PI*9.0/64.0))),E.cos11_64=(1.0/(2.0*Math.cos(E.MY_PI*11.0/64.0))),E.cos13_64=(1.0/(2.0*Math.cos(E.MY_PI*13.0/64.0))),E.cos15_64=(1.0/(2.0*Math.cos(E.MY_PI*15.0/64.0))),E.cos17_64=(1.0/(2.0*Math.cos(E.MY_PI*17.0/64.0))),E.cos19_64=(1.0/(2.0*Math.cos(E.MY_PI*19.0/64.0))),E.cos21_64=(1.0/(2.0*Math.cos(E.MY_PI*21.0/64.0))),E.cos23_64=(1.0/(2.0*Math.cos(E.MY_PI*23.0/64.0))),E.cos25_64=(1.0/(2.0*Math.cos(E.MY_PI*25.0/64.0))),E.cos27_64=(1.0/(2.0*Math.cos(E.MY_PI*27.0/64.0))),E.cos29_64=(1.0/(2.0*Math.cos(E.MY_PI*29.0/64.0))),E.cos31_64=(1.0/(2.0*Math.cos(E.MY_PI*31.0/64.0))),E.cos1_32=(1.0/(2.0*Math.cos(E.MY_PI/ 32.0))),E.cos3_32=(1.0/(2.0*Math.cos(E.MY_PI* 3.0/32.0))),E.cos5_32=(1.0/(2.0*Math.cos(E.MY_PI* 5.0/32.0))),E.cos7_32=(1.0/(2.0*Math.cos(E.MY_PI* 7.0/32.0))),E.cos9_32=(1.0/(2.0*Math.cos(E.MY_PI* 9.0/32.0))),E.cos11_32=(1.0/(2.0*Math.cos(E.MY_PI*11.0/32.0))),E.cos13_32=(1.0/(2.0*Math.cos(E.MY_PI*13.0/32.0))),E.cos15_32=(1.0/(2.0*Math.cos(E.MY_PI*15.0/32.0))),E.cos1_16=(1.0/(2.0*Math.cos(E.MY_PI/16.0))),E.cos3_16=(1.0/(2.0*Math.cos(E.MY_PI*3.0/16.0))),E.cos5_16=(1.0/(2.0*Math.cos(E.MY_PI*5.0/16.0))),E.cos7_16=(1.0/(2.0*Math.cos(E.MY_PI*7.0/16.0))),E.cos1_8=(1.0/(2.0*Math.cos(E.MY_PI/8.0))),E.cos3_8=(1.0/(2.0*Math.cos(E.MY_PI*3.0/8.0))),E.cos1_4=(1.0/(2.0*Math.cos(E.MY_PI/4.0)));const gr_info_s=function(){this.part2_3_length=0,this.big_values=0,this.global_gain=0,this.scalefac_compress=0,this.window_switching_flag=0,this.block_type=0,this.mixed_block_flag=0,this.table_select=new Int32Array(3),this.subblock_gain=new Int32Array(3),this.region0_count=0,this.region1_count=0,this.preflag=0,this.scalefac_scale=0,this.count1table_select=0};const temporaire=function(){this.scfsi=new Int32Array(4),this.gr=[new gr_info_s(),new gr_info_s()]};const temporaire2=function(){this.l=new Int32Array(23),this.s=[new Int32Array(13),new Int32Array(13),new Int32Array(13)]};const III_side_info_t=function(){this.main_data_begin=0,this.private_bits=0,this.ch=[new temporaire(),new temporaire()]};const SBI=function(a,b){this.l=a,this.s=b};const Sftable=function(a,b){this.l=a,this.s=b};const F=function(_,a,s,d,b){D.initHuff();this.checkSumHuff=0,this.is_1d=new Int32Array(F.SBLIMIT*F.SSLIMIT+4),this.ro=new Array(2),this.lr=new Array(2),this.prevblck=new Array(2),this.k=new Array(2);for(var i=0;i<2;i++){this.ro[i]=new Array(F.SBLIMIT),this.lr[i]=new Array(F.SBLIMIT),this.prevblck[i]=new Float32Array(F.SBLIMIT*F.SSLIMIT),this.k[i]=new Float32Array(F.SBLIMIT*F.SSLIMIT);for(var j=0;j<F.SBLIMIT;j++)this.ro[i][j]=new Float32Array(F.SSLIMIT),this.lr[i][j]=new Float32Array(F.SSLIMIT)}this.out_1d=new Float32Array(F.SBLIMIT*F.SSLIMIT),this.nonzero=new Int32Array(2),this.III_scalefac_t=new Array(2),this.III_scalefac_t[0]=new temporaire2(),this.III_scalefac_t[1]=new temporaire2(),this.scalefac=this.III_scalefac_t;F.sfBandIndex=new Array(9);var l0=[0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],s0=[0,4,8,12,18,24,32,42,56,74,100,132,174,192],l1=[0,6,12,18,24,30,36,44,54,66,80,96,114,136,162,194,232,278,330,394,464,540,576],s1=[0,4,8,12,18,26,36,48,62,80,104,136,180,192],l2=[0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],s2=[0,4,8,12,18,26,36,48,62,80,104,134,174,192],l3=[0,4,8,12,16,20,24,30,36,44,52,62,74,90,110,134,162,196,238,288,342,418,576],s3=[0,4,8,12,16,22,30,40,52,66,84,106,136,192],l4=[0,4,8,12,16,20,24,30,36,42,50,60,72,88,106,128,156,190,230,276,330,384,576],s4=[0,4,8,12,16,22,28,38,50,64,80,100,126,192],l5=[0,4,8,12,16,20,24,30,36,44,54,66,82,102,126,156,194,240,296,364,448,550,576],s5=[0,4,8,12,16,22,30,42,58,78,104,138,180,192],l6=[0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],s6=[0,4,8,12,18,26,36,48,62,80,104,134,174,192],l7=[0,6,12,18,24,30,36,44,54,66,80,96,116,140,168,200,238,284,336,396,464,522,576],s7=[0,4,8,12,18,26,36,48,62,80,104,134,174,192],l8=[0,12,24,36,48,60,72,88,108,132,160,192,232,280,336,400,476,566,568,570,572,574,576],s8=[0,8,16,24,36,52,72,96,124,160,162,164,166,192];F.sfBandIndex[0]=new SBI(l0,s0),F.sfBandIndex[1]=new SBI(l1,s1),F.sfBandIndex[2]=new SBI(l2,s2),F.sfBandIndex[3]=new SBI(l3,s3),F.sfBandIndex[4]=new SBI(l4,s4),F.sfBandIndex[5]=new SBI(l5,s5),F.sfBandIndex[6]=new SBI(l6,s6),F.sfBandIndex[7]=new SBI(l7,s7),F.sfBandIndex[8]=new SBI(l8,s8);if(F.reorder_table==null){F.reorder_table=new Array(9);for(var i=0;i<9;i++)F.reorder_table[i]=F.reorder(F.sfBandIndex[i].s)}var ll0=[0,6,11,16,21],ss0=[0,6,12];this.sftable=new Sftable(ll0,ss0),this.scalefac_buffer=new Int32Array(54),this.stream=_,this.header=a,this.filter1=s,this.filter2=d,this.buffer=b,this.first_channel=0,this.last_channel=0,this.frame_start=0,this.channels=(this.header.mode()==B.SINGLE_CHANNEL)?1:2,this.max_gr=(this.header.version()==B.MPEG1)?2:1,this.sfreq=(this.header.sample_frequency()+((this.header.version()==B.MPEG1)?3:(this.header.version()==B.MPEG25_LSF)?6:0))|0;if(this.channels==2)this.first_channel=0,this.last_channel=1;else this.first_channel=this.last_channel=0;this.part2_start=0;for(var ch=0;ch<2;ch++)for(var j=0;j<576;j++)this.prevblck[ch][j]=0.0;this.nonzero[0]=this.nonzero[1]=576,this.br=new C(),this.si=new III_side_info_t(),this.samples1=new Float32Array(32),this.samples2=new Float32Array(32),this.new_slen=new Int32Array(4)};F.reorder_table=null,F.reorder=function(_){var j=0,ix=new Int32Array(576);for(var sfb=0;sfb<13;sfb++){var a=_[sfb],b=_[sfb+1];for(var _window=0;_window<3;_window++)for(var i=a;i<b;i++)ix[3*i+_window]=j++}return ix},F.SSLIMIT=18,F.SBLIMIT=32,F.slen=[[0,0,0,0,3,1,1,1,2,2,2,3,3,3,4,4],[0,1,2,3,0,1,2,3,1,2,3,1,2,3,2,3]],F.pretab=[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,3,2,0],F.d43=4/3,F.t_43=(function(){var a=new Float32Array(8192),b=(4.0/3.0);for(var i=0;i<8192;i++)a[i]=Math.pow(i,b);return a}()),F.prototype.decodeFrame=function(){this.decode()},F.prototype.decode=function(){var br=this.br,_=this.out_1d,_1=this.header.slots(),_2=0,gr=0,ch=0,ss=0,sb=0,sb18=0,_3=0,_4=0,i=0;if(this.header.crc()==0)this.stream.get_bits(16);this.get_side_info();for(i=0;i<_1;i++) br.hputbuf(this.stream.get_bits(8));_3=br.hsstell()>>>3;if((_2=(br.hsstell()&7))!=0)br.hgetbits(8-_2),_3++;_4=this.frame_start-_3-this.si.main_data_begin;this.frame_start+=_1;if(_4<0)return;if(_3>4096)this.frame_start-=4096,br.rewindNbytes(4096);for(;_4>0;_4--) br.hgetbits(8);for(gr=0;gr<this.max_gr;gr++){for(ch=0;ch<this.channels;ch++){this.part2_start=br.hsstell();if(this.header.version()==B.MPEG1) this.get_scale_factors(ch,gr);else this.get_LSF_scale_factors(ch,gr);this.huffman_decode(ch,gr),this.dequantize_sample(this.ro[ch],ch,gr)}this.stereo(gr);for(ch=this.first_channel;ch<=this.last_channel;ch++){this.reorder(this.lr[ch],ch,gr),this.antialias(ch,gr),this.hybrid(ch,gr);for(sb18=18;sb18<576;sb18+=36)for(ss=1;ss<F.SSLIMIT;ss+=2)_[sb18+ss]=-_[sb18+ss];if(ch==0){for(ss=0;ss<F.SSLIMIT;ss++){sb=0;for(sb18=0;sb18<576;sb18+=18)this.samples1[sb]=_[sb18+ss],sb++;this.filter1.input_samples(this.samples1),this.filter1.calculate_pcm_samples(this.buffer)}}else for(ss=0;ss<F.SSLIMIT;ss++){sb=0;for(sb18=0;sb18<576;sb18+=18)this.samples2[sb]=_[sb18+ss],sb++;this.filter2.input_samples(this.samples2),this.filter2.calculate_pcm_samples(this.buffer)}}}},F.prototype.get_side_info=function(){var a=this.channels,si=this.si,s=this.stream,ch=0,gr=0;if(this.header.version()==B.MPEG1){si.main_data_begin=s.get_bits(9);if(a==1)si.private_bits=s.get_bits(5);else si.private_bits=s.get_bits(3);for(ch=0;ch<a;ch++)si.ch[ch].scfsi[0]=s.get_bits(1),si.ch[ch].scfsi[1]=s.get_bits(1),si.ch[ch].scfsi[2]=s.get_bits(1),si.ch[ch].scfsi[3]=s.get_bits(1);for(gr=0;gr<2;gr++){for(ch=0;ch<a;ch++){var _=si.ch[ch].gr[gr];_.part2_3_length=s.get_bits(12),_.big_values=s.get_bits(9),_.global_gain=s.get_bits(8),_.scalefac_compress=s.get_bits(4),_.window_switching_flag=s.get_bits(1);if((_.window_switching_flag)!=0){_.block_type=s.get_bits(2),_.mixed_block_flag=s.get_bits(1),_.table_select[0]=s.get_bits(5),_.table_select[1]=s.get_bits(5),_.subblock_gain[0]=s.get_bits(3),_.subblock_gain[1]=s.get_bits(3),_.subblock_gain[2]=s.get_bits(3);if(_.block_type==0)return false;else if(_.block_type==2&&_.mixed_block_flag==0)_.region0_count=8;else _.region0_count=7;_.region1_count=20-_.region0_count}else _.table_select[0]=s.get_bits(5),_.table_select[1]=s.get_bits(5),_.table_select[2]=s.get_bits(5),_.region0_count=s.get_bits(4),_.region1_count=s.get_bits(3),_.block_type=0;_.preflag=s.get_bits(1),_.scalefac_scale=s.get_bits(1),_.count1table_select=s.get_bits(1)}}}else{si.main_data_begin=s.get_bits(8);if(a==1) si.private_bits=s.get_bits(1);else si.private_bits=s.get_bits(2);for(ch=0;ch<a;ch++){var _=si.ch[ch].gr[0];_.part2_3_length=s.get_bits(12),_.big_values=s.get_bits(9),_.global_gain=s.get_bits(8),_.scalefac_compress=s.get_bits(9),_.window_switching_flag=s.get_bits(1);if((_.window_switching_flag)!=0){_.block_type=s.get_bits(2),_.mixed_block_flag=s.get_bits(1),_.table_select[0]=s.get_bits(5),_.table_select[1]=s.get_bits(5),_.subblock_gain[0]=s.get_bits(3),_.subblock_gain[1]=s.get_bits(3),_.subblock_gain[2]=s.get_bits(3);if(_.block_type==0)return false;else if(_.block_type==2&&_.mixed_block_flag==0)_.region0_count=8;else _.region0_count=7,_.region1_count=20-_.region0_count}else _.table_select[0]=s.get_bits(5),_.table_select[1]=s.get_bits(5),_.table_select[2]=s.get_bits(5),_.region0_count=s.get_bits(4),_.region1_count=s.get_bits(3),_.block_type=0;_.scalefac_scale=s.get_bits(1),_.count1table_select=s.get_bits(1)}}return true},F.prototype.get_scale_factors=function(ch,gr){var c=this.scalefac[ch],br=this.br,cg=this.si.ch[ch],sfb=0,_w=0;var gr_info=cg.gr[gr];var g=gr_info.scalefac_compress;var l0=F.slen[0][g],l1=F.slen[1][g];if((gr_info.window_switching_flag!=0)&&(gr_info.block_type==2)){if((gr_info.mixed_block_flag)!=0){for(sfb=0;sfb<8;sfb++)c.l[sfb]=br.hgetbits(F.slen[0][gr_info.scalefac_compress]);for(sfb=3;sfb<6;sfb++)for(_w=0;_w<3;_w++)c.s[_w][sfb]=br.hgetbits(F.slen[0][gr_info.scalefac_compress]);for(sfb=6;sfb<12;sfb++)for(_w=0;_w<3;_w++)c.s[_w][sfb]=br.hgetbits(F.slen[1][gr_info.scalefac_compress]);for(sfb=12,_w=0;_w<3;_w++)c.s[_w][sfb]=0}else c.s[0][0]=br.hgetbits(l0),c.s[1][0]=br.hgetbits(l0),c.s[2][0]=br.hgetbits(l0),c.s[0][1]=br.hgetbits(l0),c.s[1][1]=br.hgetbits(l0),c.s[2][1]=br.hgetbits(l0),c.s[0][2]=br.hgetbits(l0),c.s[1][2]=br.hgetbits(l0),c.s[2][2]=br.hgetbits(l0),c.s[0][3]=br.hgetbits(l0),c.s[1][3]=br.hgetbits(l0),c.s[2][3]=br.hgetbits(l0),c.s[0][4]=br.hgetbits(l0),c.s[1][4]=br.hgetbits(l0),c.s[2][4]=br.hgetbits(l0),c.s[0][5]=br.hgetbits(l0),c.s[1][5]=br.hgetbits(l0),c.s[2][5]=br.hgetbits(l0),c.s[0][6]=br.hgetbits(l1),c.s[1][6]=br.hgetbits(l1),c.s[2][6]=br.hgetbits(l1),c.s[0][7]=br.hgetbits(l1),c.s[1][7]=br.hgetbits(l1),c.s[2][7]=br.hgetbits(l1),c.s[0][8]=br.hgetbits(l1),c.s[1][8]=br.hgetbits(l1),c.s[2][8]=br.hgetbits(l1),c.s[0][9]=br.hgetbits(l1),c.s[1][9]=br.hgetbits(l1),c.s[2][9]=br.hgetbits(l1),c.s[0][10]=br.hgetbits(l1),c.s[1][10]=br.hgetbits(l1),c.s[2][10]=br.hgetbits(l1),c.s[0][11]=br.hgetbits(l1),c.s[1][11]=br.hgetbits(l1),c.s[2][11]=br.hgetbits(l1),c.s[0][12]=0,c.s[1][12]=0,c.s[2][12]=0}else{if((cg.scfsi[0]==0)||(gr==0))c.l[0]=br.hgetbits(l0),c.l[1]=br.hgetbits(l0),c.l[2]=br.hgetbits(l0),c.l[3]=br.hgetbits(l0),c.l[4]=br.hgetbits(l0),c.l[5]=br.hgetbits(l0);if((cg.scfsi[1]==0)||(gr==0))c.l[6]=br.hgetbits(l0),c.l[7]=br.hgetbits(l0),c.l[8]=br.hgetbits(l0),c.l[9]=br.hgetbits(l0),c.l[10]=br.hgetbits(l0);if((cg.scfsi[2]==0)||(gr==0))c.l[11]=br.hgetbits(l1),c.l[12]=br.hgetbits(l1),c.l[13]=br.hgetbits(l1),c.l[14]=br.hgetbits(l1),c.l[15]=br.hgetbits(l1);if((cg.scfsi[3]==0)||(gr==0))c.l[16]=br.hgetbits(l1),c.l[17]=br.hgetbits(l1),c.l[18]=br.hgetbits(l1),c.l[19]=br.hgetbits(l1),c.l[20]=br.hgetbits(l1);c.l[21]=0,c.l[22]=0}},F.prototype.get_LSF_scale_data=function(ch,gr){var e=this.new_slen,br=this.br,d=this.header.mode_extension();var gr_info=this.si.ch[ch].gr[gr];var m,a=0,b=0,c=gr_info.scalefac_compress,f=0;if(gr_info.block_type==2){if(gr_info.mixed_block_flag==0)a=1;else if(gr_info.mixed_block_flag==1)a=2;else a=0}else a=0;if(!(((d==1)||(d==3))&&(ch==1))){if(c<400)e[0]=(c>>>4)/5,e[1]=(c>>>4)%5,e[2]=(c&0xF)>>>2,e[3]=(c&3),gr_info.preflag=0,b=0;else if(c<500)e[0]=((c-400)>>>2)/5,e[1]=((c-400)>>>2)%5,e[2]=(c-400)&3,e[3]=0,gr_info.preflag=0,b=1;else if(c<512)e[0]=(c-500)/3,e[1]=(c-500)%3,e[2]=0,e[3]=0,gr_info.preflag=1,b=2}if((((d==1)||(d==3))&&(ch==1))){f=c>>>1;if(f<180)e[0]=f/36,e[1]=(f%36)/6,e[2]=(f%36)%6,e[3]=0,gr_info.preflag=0,b=3;else if(f<244)e[0]=((f-180)&0x3F)>>>4,e[1]=((f-180)&0xF)>>>2,e[2]=(f-180)&3,e[3]=0,gr_info.preflag=0,b=4;else if(f<255)e[0]=(f-244)/3,e[1]=(f-244)%3,e[2]=0,e[3]=0,gr_info.preflag=0,b=5}for(var x=0;x<45;x++)this.scalefac_buffer[x]=0;m=0;for(var i=0;i<4;i++)for(var j=0;j<F.nr_of_sfb_block[b][a][i];j++)this.scalefac_buffer[m]=(e[i]==0)?0:br.hgetbits(e[i]),m++},F.prototype.get_LSF_scale_factors=function(ch,gr){var u=this.scalefac,m=0,sfb=0,_w=0,cr=this.si.ch[ch].gr[gr];this.get_LSF_scale_data(ch,gr);if((cr.window_switching_flag!=0)&&(cr.block_type==2)){if(cr.mixed_block_flag!=0){for(sfb=0;sfb<8;sfb++)u[ch].l[sfb]=this.scalefac_buffer[m],m++;for(sfb=3;sfb<12;sfb++)for(_w=0;_w<3;_w++)u[ch].s[_w][sfb]=this.scalefac_buffer[m],m++;for(_w=0;_w<3;_w++)u[ch].s[_w][12]=0}else{for(sfb=0;sfb<12;sfb++)for(_w=0;_w<3;_w++)u[ch].s[_w][sfb]=this.scalefac_buffer[m],m++;for(_w=0;_w<3;_w++)u[ch].s[_w][12]=0}}else{for(sfb=0;sfb<21;sfb++)u[ch].l[sfb]=this.scalefac_buffer[m],m++;u[ch].l[21]=0,u[ch].l[22]=0}};var x=new Int32Array(1),y=new Int32Array(1),v=new Int32Array(1),w=new Int32Array(1);F.prototype.huffman_decode=function(ch,gr){var br=this.br,si=this.si,_=this.is_1d,a=this.sfreq;x[0]=0,y[0]=0,v[0]=0,w[0]=0;var cr=si.ch[ch].gr[gr];var b=cr.part2_3_length;if(b==0)return _.fill(0),void 0;var c=this.part2_start+b,d=0,e=0,f=0,g=0,h=null,buf=0,buf1=0;if(((cr.window_switching_flag)!=0)&&(cr.block_type==2))e=(a==8)?72:36,f=576;else{buf=cr.region0_count+1,buf1=buf+cr.region1_count+1;if(buf1>F.sfBandIndex[a].l.length-1)buf1=F.sfBandIndex[a].l.length-1;e=F.sfBandIndex[a].l[buf],f=F.sfBandIndex[a].l[buf1]}g=0;for(var i=0;i<(cr.big_values<<1);i+=2){if(i<e) h=D.ht[cr.table_select[0]];else if(i<f) h=D.ht[cr.table_select[1]];else h=D.ht[cr.table_select[2]];D.huffman_decoder(h,x,y,v,w,br);_[g++]=x[0];_[g++]=y[0];this.checkSumHuff=this.checkSumHuff+x[0]+y[0]}h=D.ht[cr.count1table_select+32],d=br.hsstell();while((d<c)&&(g<576))D.huffman_decoder(h,x,y,v,w,br),_[g++]=v[0],_[g++]=w[0],_[g++]=x[0],_[g++]=y[0],this.checkSumHuff=this.checkSumHuff+v[0]+w[0]+x[0]+y[0],d=br.hsstell();if(d>c)br.rewindNbits(d-c),g-=4;d=br.hsstell();if(d<c)br.hgetbits(c-d);this.nonzero[ch]=Math.min(g,576);if(g<0)g=0;for(;g<576;g++)_[g]=0},F.prototype.dequantize_sample=function(xr,ch,gr){var _1=this.scalefac,_2=this.sfreq,_3=this.is_1d,_4=this.si.ch[ch].gr[gr],cb=0,_5=0,_6=0,_7=0,_8=0,_9=0,j=0,_10=0;if((_4.window_switching_flag!=0)&&(_4.block_type==2)){if(_4.mixed_block_flag!=0)_5=F.sfBandIndex[_2].l[1];else _7=F.sfBandIndex[_2].s[1],_5=(_7<<2)-_7,_6=0}else _5=F.sfBandIndex[_2].l[1];_10=Math.pow(2.0,(0.25*(_4.global_gain-210.0)));for(j=0;j<this.nonzero[ch];j++){var a=j%F.SSLIMIT;var b=((j-a)/F.SSLIMIT)|0;if(_3[j]==0) xr[b][a]=0.0;else {var abv=_3[j];if(abv<F.t_43.length){if(_3[j]>0) xr[b][a]=_10*F.t_43[abv];else {if(-abv<F.t_43.length) xr[b][a]=-_10*F.t_43[-abv];else xr[b][a]=-_10*Math.pow(-abv,F.d43)}}else{if(_3[j]>0) xr[b][a]=_10*Math.pow(abv,F.d43);else xr[b][a]=-_10*Math.pow(-abv,F.d43)}}}for(j=0;j<this.nonzero[ch];j++){var a=j%F.SSLIMIT;var b=((j-a)/F.SSLIMIT)|0;if(_8==_5){if((_4.window_switching_flag!=0)&&(_4.block_type==2)){if(_4.mixed_block_flag!=0){if(_8==F.sfBandIndex[_2].l[8])_5=F.sfBandIndex[_2].s[4],_5=(_5<<2)-_5,cb=3,_7=F.sfBandIndex[_2].s[4]-F.sfBandIndex[_2].s[3],_6=F.sfBandIndex[_2].s[3],_6=(_6<<2)-_6;else if(_8<F.sfBandIndex[_2].l[8])_5=F.sfBandIndex[_2].l[(++cb)+1];else _5=F.sfBandIndex[_2].s[(++cb)+1],_5=(_5<<2)-_5,_6=F.sfBandIndex[_2].s[cb],_7=F.sfBandIndex[_2].s[cb+1]-_6,_6=(_6<<2)-_6}else _5=F.sfBandIndex[_2].s[(++cb)+1],_5=(_5<<2)-_5,_6=F.sfBandIndex[_2].s[cb],_7=F.sfBandIndex[_2].s[cb+1]-_6,_6=(_6<<2)-_6}else _5=F.sfBandIndex[_2].l[(++cb)+1]}if((_4.window_switching_flag!=0)&&(((_4.block_type==2)&&(_4.mixed_block_flag==0))||((_4.block_type==2)&&(_4.mixed_block_flag!=0)&&(j>=36)))){_9=((_8-_6)/_7)|0;var c=_1[ch].s[_9][cb]<<_4.scalefac_scale;c+=(_4.subblock_gain[_9]<<2),xr[b][a]*=F.two_to_negative_half_pow[c]}else{var c=_1[ch].l[cb];if(_4.preflag!=0)c+=F.pretab[cb];c=c<<_4.scalefac_scale,xr[b][a]*=F.two_to_negative_half_pow[c]}_8++}for(j=this.nonzero[ch];j<576;j++){var a=j%F.SSLIMIT;var b=((j-a)/F.SSLIMIT)|0;if(a<0)a=0;if(b<0)b=0;xr[b][a]=0}},F.nr_of_sfb_block=[[[6,5,5,5],[9,9,9,9],[6,9,9,9]],[[6,5,7,3],[9,9,12,6],[6,9,12,6]],[[11,10,0,0],[18,18,0,0],[15,18,0,0]],[[7,7,7,0],[12,12,12,0],[6,15,12,0]],[[6,6,6,3],[12,9,9,6],[6,12,9,6]],[[8,8,5,0],[15,12,9,0],[6,18,9,0]]];var is_pos=new Int32Array(576),is_ratio=new Float32Array(576);F.io=[new Float32Array([1.0000000000E+00,8.4089641526E-01,7.0710678119E-01,5.9460355751E-01,5.0000000001E-01,4.2044820763E-01,3.5355339060E-01,2.9730177876E-01,2.5000000001E-01,2.1022410382E-01,1.7677669530E-01,1.4865088938E-01,1.2500000000E-01,1.0511205191E-01,8.8388347652E-02,7.4325444691E-02,6.2500000003E-02,5.2556025956E-02,4.4194173826E-02,3.7162722346E-02,3.1250000002E-02,2.6278012978E-02,2.2097086913E-02,1.8581361173E-02,1.5625000001E-02,1.3139006489E-02,1.1048543457E-02,9.2906805866E-03,7.8125000006E-03,6.5695032447E-03,5.5242717285E-03,4.6453402934E-03]),new Float32Array([1.0000000000E+00,7.0710678119E-01,5.0000000000E-01,3.5355339060E-01,2.5000000000E-01,1.7677669530E-01,1.2500000000E-01,8.8388347650E-02,6.2500000001E-02,4.4194173825E-02,3.1250000001E-02,2.2097086913E-02,1.5625000000E-02,1.1048543456E-02,7.8125000002E-03,5.5242717282E-03,3.9062500001E-03,2.7621358641E-03,1.9531250001E-03,1.3810679321E-03,9.7656250004E-04,6.9053396603E-04,4.8828125002E-04,3.4526698302E-04,2.4414062501E-04,1.7263349151E-04,1.2207031251E-04,8.6316745755E-05,6.1035156254E-05,4.3158372878E-05,3.0517578127E-05,2.1579186439E-05])],F.TAN12=new Float32Array([0.0,0.26794919,0.57735027,1.0,1.73205081,3.73205081,9.9999999e10,-3.73205081,-1.73205081,-1.0,-0.57735027,-0.26794919,0.0,0.26794919,0.57735027,1.0]),F.cs=new Float32Array([0.857492925712,0.881741997318,0.949628649103,0.983314592492,0.995517816065,0.999160558175,0.999899195243,0.999993155067]),F.ca=new Float32Array([-0.5144957554270,-0.4717319685650,-0.3133774542040,-0.1819131996110,-0.0945741925262,-0.0409655828852,-0.0141985685725,-0.00369997467375]),F.two_to_negative_half_pow=new Float32Array([1.0000000000E+00,7.0710678119E-01,5.0000000000E-01,3.5355339059E-01,2.5000000000E-01,1.7677669530E-01,1.2500000000E-01,8.8388347648E-02,6.2500000000E-02,4.4194173824E-02,3.1250000000E-02,2.2097086912E-02,1.5625000000E-02,1.1048543456E-02,7.8125000000E-03,5.5242717280E-03,3.9062500000E-03,2.7621358640E-03,1.9531250000E-03,1.3810679320E-03,9.7656250000E-04,6.9053396600E-04,4.8828125000E-04,3.4526698300E-04,2.4414062500E-04,1.7263349150E-04,1.2207031250E-04,8.6316745750E-05,6.1035156250E-05,4.3158372875E-05,3.0517578125E-05,2.1579186438E-05,1.5258789062E-05,1.0789593219E-05,7.6293945312E-06,5.3947966094E-06,3.8146972656E-06,2.6973983047E-06,1.9073486328E-06,1.3486991523E-06,9.5367431641E-07,6.7434957617E-07,4.7683715820E-07,3.3717478809E-07,2.3841857910E-07,1.6858739404E-07,1.1920928955E-07,8.4293697022E-08,5.9604644775E-08,4.2146848511E-08,2.9802322388E-08,2.1073424255E-08,1.4901161194E-08,1.0536712128E-08,7.4505805969E-09,5.2683560639E-09,3.7252902985E-09,2.6341780319E-09,1.8626451492E-09,1.3170890160E-09,9.3132257462E-10,6.5854450798E-10,4.6566128731E-10,3.2927225399E-10]),F.prototype.i_stereo_k_values=function(a,b,i){var k=this.k;if(a==0)k[0][i]=1.0,k[1][i]=1.0;else if((a&1)!=0)k[0][i]=F.io[b][(a+1)>>>1],k[1][i]=1.0;else k[0][i]=1.0,k[1][i]=F.io[b][a>>>1]},F.prototype.stereo=function(gr){var _1=this.sfreq,_2=this.scalefac,ro=this.ro,lr=this.lr,k=this.k,sb=0,ss=0;if(this.channels==1){for(sb=0;sb<F.SBLIMIT;sb++)for(ss=0;ss<F.SSLIMIT;ss+=3)lr[0][sb][ss]=ro[0][sb][ss],lr[0][sb][ss+1]=ro[0][sb][ss+1],lr[0][sb][ss+2]=ro[0][sb][ss+2]}else{var _3=this.si.ch[0].gr[gr],_4=this.header.mode_extension(),sfb=0,i=0,_5=0,_6=0,_7=0,_8=((this.header.mode()==B.JOINT_STEREO)&&((_4&0x2)!=0)),_9=((this.header.mode()==B.JOINT_STEREO)&&((_4&0x1)!=0)),lsf=((this.header.version()==B.MPEG2_LSF||this.header.version()==B.MPEG25_LSF));var _10=_3.scalefac_compress&1;is_pos.fill(7),is_ratio.fill(0.0);if(_9){if((_3.window_switching_flag!=0)&&(_3.block_type==2)){if(_3.mixed_block_flag!=0){var max_sfb=0;for(var j=0;j<3;j++){var sfbcnt=0;sfbcnt=2;for(sfb=12;sfb>=3;sfb--){i=F.sfBandIndex[_1].s[sfb];_5=F.sfBandIndex[_1].s[sfb+1]-i;i=(i<<2)-i+(j+1)*_5-1;while(_5>0){if(ro[1][(i/18)|0][i%18]!=0.0)sfbcnt=sfb,sfb=-10,_5=-10;_5--,i--}}sfb=sfbcnt+1;if(sfb>max_sfb)max_sfb=sfb;while(sfb<12){_6=F.sfBandIndex[_1].s[sfb],sb=F.sfBandIndex[_1].s[sfb+1]-_6,i=(_6<<2)-_6+j*sb;for(;sb>0;sb--){is_pos[i]=_2[1].s[j][sfb];if(is_pos[i]!=7)if(lsf)this.i_stereo_k_values(is_pos[i],_10,i);else is_ratio[i]=F.TAN12[is_pos[i]];i++}sfb++}sfb=F.sfBandIndex[_1].s[10],sb=F.sfBandIndex[_1].s[11]-sfb,sfb=(sfb<<2)-sfb+j*sb,_6=F.sfBandIndex[_1].s[11],sb=F.sfBandIndex[_1].s[12]-_6,i=(_6<<2)-_6+j*sb;for(;sb>0;sb--){is_pos[i]=is_pos[sfb];if(lsf)k[0][i]=k[0][sfb],k[1][i]=k[1][sfb];else is_ratio[i]=is_ratio[sfb];i++}}if(max_sfb<=3){i=2,ss=17,sb=-1;while(i>=0){if(ro[1][i][ss]!=0.0)sb=(i<<4)+(i<<1)+ss,i=-1;else{ss--;if(ss<0)i--,ss=17}}i=0;while(F.sfBandIndex[_1].l[i]<=sb)i++;sfb=i,i=F.sfBandIndex[_1].l[i];for(;sfb<8;sfb++){sb=F.sfBandIndex[_1].l[sfb+1]-F.sfBandIndex[_1].l[sfb];for(;sb>0;sb--){is_pos[i]=_2[1].l[sfb];if(is_pos[i]!=7)if(lsf)this.i_stereo_k_values(is_pos[i],_10,i);else is_ratio[i]=F.TAN12[is_pos[i]];i++}}}}else for(var j=0;j<3;j++){var sfbcnt=0;sfbcnt=-1;for(sfb=12;sfb>=0;sfb--){_6=F.sfBandIndex[_1].s[sfb],_5=F.sfBandIndex[_1].s[sfb+1]-_6,i=(_6<<2)-_6+(j+1)*_5-1;while(_5>0){if(ro[1][(i/18)|0][i%18]!=0.0)sfbcnt=sfb,sfb=-10,_5=-10;_5--,i--}}sfb=sfbcnt+1;while(sfb<12){_6=F.sfBandIndex[_1].s[sfb],sb=F.sfBandIndex[_1].s[sfb+1]-_6,i=(_6<<2)-_6+j*sb;for(;sb>0;sb--){is_pos[i]=_2[1].s[j][sfb];if(is_pos[i]!=7)if(lsf)this.i_stereo_k_values(is_pos[i],_10,i);else is_ratio[i]=F.TAN12[is_pos[i]];i++}sfb++}_6=F.sfBandIndex[_1].s[10],_7=F.sfBandIndex[_1].s[11],sb=_7-_6,sfb=(_6<<2)-_6+j*sb,sb=F.sfBandIndex[_1].s[12]-_7,i=(_7<<2)-_7+j*sb;for(;sb>0;sb--){is_pos[i]=is_pos[sfb];if(lsf)k[0][i]=k[0][sfb],k[1][i]=k[1][sfb];else is_ratio[i]=is_ratio[sfb];i++}}}else{i=31,ss=17,sb=0;while(i>=0){if(ro[1][i][ss]!=0.0)sb=(i<<4)+(i<<1)+ss,i=-1;else{ss--;if(ss<0)i--,ss=17}}i=0;while(F.sfBandIndex[_1].l[i]<=sb)i++;sfb=i;i=F.sfBandIndex[_1].l[i];for(;sfb<21;sfb++){sb=F.sfBandIndex[_1].l[sfb+1]-F.sfBandIndex[_1].l[sfb];for(;sb>0;sb--){is_pos[i]=_2[1].l[sfb];if(is_pos[i]!=7)if(lsf)this.i_stereo_k_values(is_pos[i],_10,i);else is_ratio[i]=F.TAN12[is_pos[i]];i++}}sfb=F.sfBandIndex[_1].l[20];for(sb=576-F.sfBandIndex[_1].l[21];(sb>0)&&(i<576);sb--){is_pos[i]=is_pos[sfb];if(lsf)k[0][i]=k[0][sfb],k[1][i]=k[1][sfb];else is_ratio[i]=is_ratio[sfb];i++}}}i=0;for(sb=0;sb<F.SBLIMIT;sb++)for(ss=0;ss<F.SSLIMIT;ss++){if(is_pos[i]==7){if(_8)lr[0][sb][ss]=(ro[0][sb][ss]+ro[1][sb][ss])*0.707106781,lr[1][sb][ss]=(ro[0][sb][ss]-ro[1][sb][ss])*0.707106781;else lr[0][sb][ss]=ro[0][sb][ss],lr[1][sb][ss]=ro[1][sb][ss]}else if(_9){if(lsf)lr[0][sb][ss]=ro[0][sb][ss]*k[0][i],lr[1][sb][ss]=ro[0][sb][ss]*k[1][i];else lr[1][sb][ss]=ro[0][sb][ss]/(1+is_ratio[i]),lr[0][sb][ss]=lr[1][sb][ss]*is_ratio[i]}i++}}},F.prototype.reorder=function(_6,ch,gr){var _=this.out_1d,_1=this.sfreq,_2=this.si.ch[ch].gr[gr],_3=0,_4=0,_5=0,_7=0,_8=0,sfb=0,_9=0,_10=0;if((_2.window_switching_flag!=0)&&(_2.block_type==2)){for(_5=0;_5<576;_5++)_[_5]=0;if(_2.mixed_block_flag!=0){for(_5=0;_5<36;_5++){var a=_5%F.SSLIMIT;var b=((_5-a)/F.SSLIMIT)|0;_[_5]=_6[b][a]}for(sfb=3;sfb<13;sfb++){_9=F.sfBandIndex[_1].s[sfb],_10=F.sfBandIndex[_1].s[sfb+1]-_9;var _11=(_9<<2)-_9;for(_3=0,_4=0;_3<_10;_3++,_4+=3){_7=_11+_3,_8=_11+_4;var a=_7%F.SSLIMIT;var b=((_7-a)/F.SSLIMIT)|0;_[_8]=_6[b][a],_7+=_10,_8++,a=_7%F.SSLIMIT,b=((_7-a)/F.SSLIMIT)|0,_[_8]=_6[b][a],_7+=_10,_8++,a=_7%F.SSLIMIT,b=((_7-a)/F.SSLIMIT)|0,_[_8]=_6[b][a]}}}else for(_5=0;_5<576;_5++){var j=F.reorder_table[_1][_5];var a=j%F.SSLIMIT;var b=((j-a)/F.SSLIMIT)|0;_[_5]=_6[b][a]}}else for(_5=0;_5<576;_5++){var a=_5%F.SSLIMIT;var b=((_5-a)/F.SSLIMIT)|0;_[_5]=_6[b][a]}},F.prototype.antialias=function(ch,gr){var _=this.out_1d,sb18=0,ss=0,sb18lim=0,h=this.si.ch[ch].gr[gr];if((h.window_switching_flag!=0)&&(h.block_type==2)&&!(h.mixed_block_flag!=0))return;if((h.window_switching_flag!=0)&&(h.mixed_block_flag!=0)&&(h.block_type==2))sb18lim=18;else sb18lim=558;for(sb18=0;sb18<sb18lim;sb18+=18)for(ss=0;ss<8;ss++){var a=sb18+17-ss,b=sb18+18+ss;var bu=_[a],bd=_[b];_[a]=(bu*F.cs[ss])-(bd*F.ca[ss]),_[b]=(bd*F.cs[ss])+(bu*F.ca[ss])}};var tsOutCopy=new Float32Array(18),rawout=new Float32Array(36);function arraycopy(_in,a,out,b,c){var _=0;for(var i=b;i<c;i++)out[i]=_in[a+_],_++};F.prototype.hybrid=function(ch,gr){var a=this.out_1d,bt=0,sb18=0,b=null,c=null,gr_info=this.si.ch[ch].gr[gr];for(sb18=0;sb18<576;sb18+=18)bt=((gr_info.window_switching_flag!=0)&&(gr_info.mixed_block_flag!=0)&&(sb18<36))?0:gr_info.block_type,b=a,arraycopy(b,0+sb18,tsOutCopy,0,18),this.inv_mdct(tsOutCopy,rawout,bt),arraycopy(tsOutCopy,0,b,0+sb18,18),c=this.prevblck,b[0+sb18]=rawout[0]+c[ch][sb18+0],c[ch][sb18+0]=rawout[18],b[1+sb18]=rawout[1]+c[ch][sb18+1],c[ch][sb18+1]=rawout[19],b[2+sb18]=rawout[2]+c[ch][sb18+2],c[ch][sb18+2]=rawout[20],b[3+sb18]=rawout[3]+c[ch][sb18+3],c[ch][sb18+3]=rawout[21],b[4+sb18]=rawout[4]+c[ch][sb18+4],c[ch][sb18+4]=rawout[22],b[5+sb18]=rawout[5]+c[ch][sb18+5],c[ch][sb18+5]=rawout[23],b[6+sb18]=rawout[6]+c[ch][sb18+6],c[ch][sb18+6]=rawout[24],b[7+sb18]=rawout[7]+c[ch][sb18+7],c[ch][sb18+7]=rawout[25],b[8+sb18]=rawout[8]+c[ch][sb18+8],c[ch][sb18+8]=rawout[26],b[9+sb18]=rawout[9]+c[ch][sb18+9],c[ch][sb18+9]=rawout[27],b[10+sb18]=rawout[10]+c[ch][sb18+10],c[ch][sb18+10]=rawout[28],b[11+sb18]=rawout[11]+c[ch][sb18+11],c[ch][sb18+11]=rawout[29],b[12+sb18]=rawout[12]+c[ch][sb18+12],c[ch][sb18+12]=rawout[30],b[13+sb18]=rawout[13]+c[ch][sb18+13],c[ch][sb18+13]=rawout[31],b[14+sb18]=rawout[14]+c[ch][sb18+14],c[ch][sb18+14]=rawout[32],b[15+sb18]=rawout[15]+c[ch][sb18+15],c[ch][sb18+15]=rawout[33],b[16+sb18]=rawout[16]+c[ch][sb18+16],c[ch][sb18+16]=rawout[34],b[17+sb18]=rawout[17]+c[ch][sb18+17],c[ch][sb18+17]=rawout[35]},F.win=[new Float32Array([-1.6141214951E-02,-5.3603178919E-02,-1.0070713296E-01,-1.6280817573E-01,-4.9999999679E-01,-3.8388735032E-01,-6.2061144372E-01,-1.1659756083E+00,-3.8720752656E+00,-4.2256286556E+00,-1.5195289984E+00,-9.7416483388E-01,-7.3744074053E-01,-1.2071067773E+00,-5.1636156596E-01,-4.5426052317E-01,-4.0715656898E-01,-3.6969460527E-01,-3.3876269197E-01,-3.1242222492E-01,-2.8939587111E-01,-2.6880081906E-01,-5.0000000266E-01,-2.3251417468E-01,-2.1596714708E-01,-2.0004979098E-01,-1.8449493497E-01,-1.6905846094E-01,-1.5350360518E-01,-1.3758624925E-01,-1.2103922149E-01,-2.0710679058E-01,-8.4752577594E-02,-6.4157525656E-02,-4.1131172614E-02,-1.4790705759E-02]),new Float32Array([-1.6141214951E-02,-5.3603178919E-02,-1.0070713296E-01,-1.6280817573E-01,-4.9999999679E-01,-3.8388735032E-01,-6.2061144372E-01,-1.1659756083E+00,-3.8720752656E+00,-4.2256286556E+00,-1.5195289984E+00,-9.7416483388E-01,-7.3744074053E-01,-1.2071067773E+00,-5.1636156596E-01,-4.5426052317E-01,-4.0715656898E-01,-3.6969460527E-01,-3.3908542600E-01,-3.1511810350E-01,-2.9642226150E-01,-2.8184548650E-01,-5.4119610000E-01,-2.6213228100E-01,-2.5387916537E-01,-2.3296291359E-01,-1.9852728987E-01,-1.5233534808E-01,-9.6496400054E-02,-3.3423828516E-02,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00]),new Float32Array([-4.8300800645E-02,-1.5715656932E-01,-2.8325045177E-01,-4.2953747763E-01,-1.2071067795E+00,-8.2426483178E-01,-1.1451749106E+00,-1.7695290101E+00,-4.5470225061E+00,-3.4890531002E+00,-7.3296292804E-01,-1.5076514758E-01,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00]),new Float32Array([0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,0.0000000000E+00,-1.5076513660E-01,-7.3296291107E-01,-3.4890530566E+00,-4.5470224727E+00,-1.7695290031E+00,-1.1451749092E+00,-8.3137738100E-01,-1.3065629650E+00,-5.4142014250E-01,-4.6528974900E-01,-4.1066990750E-01,-3.7004680800E-01,-3.3876269197E-01,-3.1242222492E-01,-2.8939587111E-01,-2.6880081906E-01,-5.0000000266E-01,-2.3251417468E-01,-2.1596714708E-01,-2.0004979098E-01,-1.8449493497E-01,-1.6905846094E-01,-1.5350360518E-01,-1.3758624925E-01,-1.2103922149E-01,-2.0710679058E-01,-8.4752577594E-02,-6.4157525656E-02,-4.1131172614E-02,-1.4790705759E-02])],F.prototype.inv_mdct=function(a,out,u){var k,i=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,a10=0,a11=0,a12=0,a13=0,a14=0,a15=0,a16=0,a17=0;if(u==2){out.fill(0);var ai=0;for(i=0;i<3;i++){a[15+i]+=a[12+i],a[12+i]+=a[9+i],a[9+i]+=a[6+i],a[6+i]+=a[3+i],a[3+i]+=a[0+i],a[15+i]+=a[9+i],a[9+i]+=a[3+i];var pp2=a[12+i]*0.500000000,pp1=a[6+i]*0.866025403;var sum=a[0+i]+pp2;a1=a[0+i]-a[12+i],a0=sum+pp1,a2=sum-pp1,pp2=a[15+i]*0.500000000,pp1=a[9+i]*0.866025403,sum=a[3+i]+pp2,a4=a[3+i]-a[15+i],a5=sum+pp1,a3=sum-pp1,a3*=1.931851653,a4*=0.707106781,a5*=0.517638090;var save=a0;a0+=a5,a5=save-a5,save=a1,a1+=a4,a4=save-a4,save=a2,a2+=a3,a3=save-a3,a0*=0.504314480,a1*=0.541196100,a2*=0.630236207,a3*=0.821339815,a4*=1.306562965,a5*=3.830648788,a8=-a0*0.793353340,a9=-a0*0.608761429,a7=-a1*0.923879532,a10=-a1*0.382683432,a6=-a2*0.991444861,a11=-a2*0.130526192,a0=a3,a1=a4*0.382683432,a2=a5*0.608761429,a3=-a5*0.793353340,a4=-a4*0.923879532,a5=-a0*0.991444861,a0*=0.130526192,out[ai+6]+=a0,out[ai+7]+=a1,out[ai+8]+=a2,out[ai+9]+=a3,out[ai+10]+=a4,out[ai+11]+=a5,out[ai+12]+=a6,out[ai+13]+=a7,out[ai+14]+=a8,out[ai+15]+=a9,out[ai+16]+=a10,out[ai+17]+=a11,ai+=6}}else{a[17]+=a[16],a[16]+=a[15],a[15]+=a[14],a[14]+=a[13],a[13]+=a[12],a[12]+=a[11],a[11]+=a[10],a[10]+=a[9],a[9]+=a[8],a[8]+=a[7],a[7]+=a[6],a[6]+=a[5],a[5]+=a[4],a[4]+=a[3],a[3]+=a[2],a[2]+=a[1],a[1]+=a[0],a[17]+=a[15],a[15]+=a[13],a[13]+=a[11],a[11]+=a[9],a[9]+=a[7],a[7]+=a[5],a[5]+=a[3],a[3]+=a[1];var i00=a[0]+a[0];var iip12=i00+a[12];var tmp0=iip12+a[4]*1.8793852415718+a[8]*1.532088886238+a[16]*0.34729635533386,tmp1=i00+a[4]-a[8]-a[12]-a[12]-a[16],tmp2=iip12-a[4]*0.34729635533386-a[8]*1.8793852415718+a[16]*1.532088886238,tmp3=iip12-a[4]*1.532088886238+a[8]*0.34729635533386-a[16]*1.8793852415718,tmp4=a[0]-a[4]+a[8]-a[12]+a[16];var i66_=a[6]*1.732050808;var tmp0_=a[2]*1.9696155060244+i66_+a[10]*1.2855752193731+a[14]*0.68404028665134,tmp1_=(a[2]-a[10]-a[14])*1.732050808,tmp2_=a[2]*1.2855752193731-i66_-a[10]*0.68404028665134+a[14]*1.9696155060244,tmp3_=a[2]*0.68404028665134-i66_+a[10]*1.9696155060244-a[14]*1.2855752193731;var i0=a[0+1]+a[0+1];var i0p12=i0+a[12+1];var tmp0o=i0p12+a[4+1]*1.8793852415718+a[8+1]*1.532088886238+a[16+1]*0.34729635533386,tmp1o=i0+a[4+1]-a[8+1]-a[12+1]-a[12+1]-a[16+1],tmp2o=i0p12-a[4+1]*0.34729635533386-a[8+1]*1.8793852415718+a[16+1]*1.532088886238,tmp3o=i0p12-a[4+1]*1.532088886238+a[8+1]*0.34729635533386-a[16+1]*1.8793852415718,tmp4o=(a[0+1]-a[4+1]+a[8+1]-a[12+1]+a[16+1])*0.707106781;var i6_=a[6+1]*1.732050808;var tmp0_o=a[2+1]*1.9696155060244+i6_+a[10+1]*1.2855752193731+a[14+1]*0.68404028665134,tmp1_o=(a[2+1]-a[10+1]-a[14+1])*1.732050808,tmp2_o=a[2+1]*1.2855752193731-i6_-a[10+1]*0.68404028665134+a[14+1]*1.9696155060244,tmp3_o=a[2+1]*0.68404028665134-i6_+a[10+1]*1.9696155060244-a[14+1]*1.2855752193731;var e,o=0;e=tmp0+tmp0_,o=(tmp0o+tmp0_o)*0.501909918,a0=e+o,a17=e-o,e=tmp1+tmp1_,o=(tmp1o+tmp1_o)*0.517638090,a1=e+o,a16=e-o,e=tmp2+tmp2_,o=(tmp2o+tmp2_o)*0.551688959,a2=e+o,a15=e-o,e=tmp3+tmp3_,o=(tmp3o+tmp3_o)*0.610387294,a3=e+o,a14=e-o,a4=tmp4+tmp4o,a13=tmp4-tmp4o,e=tmp3-tmp3_,o=(tmp3o-tmp3_o)*0.871723397,a5=e+o,a12=e-o,e=tmp2-tmp2_,o=(tmp2o-tmp2_o)*1.183100792,a6=e+o,a11=e-o,e=tmp1-tmp1_,o=(tmp1o-tmp1_o)*1.931851653,a7=e+o,a10=e-o,e=tmp0-tmp0_,o=(tmp0o-tmp0_o)*5.736856623,a8=e+o,a9=e-o,k=F.win[u];out[0]=-a9*k[0],out[1]=-a10*k[1],out[2]=-a11*k[2],out[3]=-a12*k[3],out[4]=-a13*k[4],out[5]=-a14*k[5],out[6]=-a15*k[6],out[7]=-a16*k[7],out[8]=-a17*k[8],out[9]=a17*k[9],out[10]=a16*k[10],out[11]=a15*k[11],out[12]=a14*k[12],out[13]=a13*k[13],out[14]=a12*k[14],out[15]=a11*k[15],out[16]=a10*k[16],out[17]=a9*k[17],out[18]=a8*k[18],out[19]=a7*k[19],out[20]=a6*k[20],out[21]=a5*k[21],out[22]=a4*k[22],out[23]=a3*k[23],out[24]=a2*k[24],out[25]=a1*k[25],out[26]=a0*k[26],out[27]=a0*k[27],out[28]=a1*k[28],out[29]=a2*k[29],out[30]=a3*k[30],out[31]=a4*k[31],out[32]=a5*k[32],out[33]=a6*k[33],out[34]=a7*k[34],out[35]=a8*k[35]}};const G=function(a,b){this.buffer=new Float32Array(G.OBUFFERSIZE),this.bufferp=new Int32Array(G.MAXCHANNELS),this.channels=b,this.frequency=a;for(var i=0;i<b;++i)this.bufferp[i]=i};G.OBUFFERSIZE=2*1152,G.MAXCHANNELS=2,G.prototype.getChannelCount=function(){return this.channels},G.prototype.getSampleFrequency=function(){return this.frequency},G.prototype.getBuffer=function(){return this.buffer},G.prototype.getBufferLength=function(){return this.bufferp[0]},G.prototype.write_buffer=function(){},G.prototype.clear_buffer=function(){for(var i=0;i<this.channels;++i)this.bufferp[i]=i},G.prototype.appendSamples=function(a,f){var b=this.bufferp[a];for(var i=0;i<32;)this.buffer[b]=f[i++],b+=this.channels;this.bufferp[a]=b};const H=function(){this.output=null,this.initialized=false};H.prototype.setOutputBuffer=function(_){this.output=_},H.prototype.initialize=function(_){var c=_.mode()==B.SINGLE_CHANNEL?1:2;if(this.output==null)this.output=new G(_.frequency(),c);this.filter1=new E(0,1,null);if(c==2) this.filter2=new E(1,1,null);this.outputChannels=c,this.outputFrequency=_.frequency(),this.initialized=true},H.prototype.decodeFrame=function(_,b){if(!this.initialized)this.initialize(_);this.output.clear_buffer();var a=this.retrieveDecoder(_,b);a.decodeFrame();return this.output.write_buffer(1),this.output},H.prototype.retrieveDecoder=function(header,stream){if(this.l3decoder==null)this.l3decoder=new F(stream,header,this.filter1,this.filter2,this.output);return this.l3decoder};return {BitStream:A,Decoder:H,Header:B}}());
		module.exports = AT_MP3
	},
	"./lib/at-vp6.min.js": function(module, exports, __webpack_require__) {
		// ANIM TRED NIHAV VP6 IN JAVASCRIPT

		var AT_NIHAV_VP6=(function(){class A{constructor(_){this.src=_,this.bytePos=0,this.bitPos=0}read(n){var a=0;while(n--)a<<=1,a|=this.read_bit();return a}read_bit(){var a=(this.src[this.bytePos]>>(7-this.bitPos++))&0x1;if(this.bitPos>7)this.bytePos++,this.bitPos=0;return a}read_bool(){return this.read_bit()>0}tell(){return this.bytePos*8+this.bitPos}peek(a){var b=this.bytePos,c=this.bitPos,r=this.read(a);return this.bytePos=b,this.bitPos=c,r}skip(a){this.read(a)}read_huff(_){let a=this.peek(16);for(let i=0;i<_.codes.length;i++){var b=_.codes[i],c=_.bits[i];if(((a>>(16-c))>>>0)==b){this.skip(c);return i}}throw new Error("InvalidData")}};function edge_emu(src,xpos,ypos,bw,bh,dst,dstride,comp,align){let stride=src.get_stride(comp),offs=src.get_offset(comp);let[w_,h_]=src.get_dimensions(comp);let[hss,vss]=src.get_info().get_format().get_chromaton(comp).get_subsampling();let data=src.get_data();let framebuf=data,w,h;if(align==0)w=w_,h=h_;else{let wa=(align>hss)?(1<<(align-hss))-1:0,ha=(align>vss)?(1<<(align-vss))-1:0;w=(w_+wa)-wa,h=(h_+ha)-ha}for(let y=0;y<bh;y++){let srcy;if(y+ypos<0)srcy=0;else if((y)+ypos>=(h))srcy=h-1;else srcy=((y)+ypos);for(let x=0;x<bw;x++){let srcx;if((x)+xpos<0)srcx=0;else if((x)+xpos>=(w))srcx=w-1;else srcx=((x)+xpos);dst[x+y*dstride]=framebuf[offs+srcx+srcy*stride]}}};class B{constructor(x,y){this.x=x,this.y=y}add(other){return new B(this.x+other.x,this.y+other.y)}eq(other){return(this.x==other.x)&&(this.y==other.y)}};const ZERO_MV=new B(0,0);const ZIGZAG=new Uint32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);class C{constructor(a){this.type=a}}C.YCbCr=1,C.YIQ=2,C.YUVJ=3;class D{constructor(a,b){this.type=a,this.value=b}}D.RGB=1,D.YUV=2,D.CMYK=3,D.HSV=4,D.LAB=5,D.XYZ=6;class E{constructor(_){this.h_ss=_.h_ss,this.v_ss=_.v_ss,this.packed=_.packed,this.depth=_.depth,this.shift=_.shift,this.comp_offs=_.comp_offs,this.next_elem=_.next_elem}get_subsampling(){return[this.h_ss,this.v_ss]}is_packed(){return this.packed}get_depth(){return this.depth}get_shift(){return this.shift}get_offset(){return this.comp_offs}get_step(){return this.next_elem}get_width(a){return(a+((1<<this.h_ss)-1))>>this.h_ss}get_height(a){return(a+((1<<this.v_ss)-1))>>this.v_ss}get_linesize(width){let d=this.depth;if(this.packed)return(this.get_width(width)*d+d-1)>>3;else return this.get_width(width)}get_data_size(){let nh=(height+((1<<this.v_ss)-1))>>this.v_ss;return(this.get_linesize(width)*nh)}};class F{constructor(_){this.model=_.model,this.components=_.components,this.comp_info=_.comp_info,this.elem_size=_.elem_size,this.be=_.be,this.alpha=_.alpha,this.palette=_.palette}get_model(){return this.model}get_num_comp(){return this.components}get_chromaton(i){return this.comp_info[i]}is_be(){return this.be}has_alpha(){return this.alpha}is_paletted(){return this.palette}get_elem_size(){return this.elem_size}}const YUV420_FORMAT=new F({model:new D(D.YUV,new C(C.YUVJ)),components:3,comp_info:[new E({h_ss:0,v_ss:0,packed:false,depth:8,shift:0,comp_offs:0,next_elem:1}),new E({h_ss:1,v_ss:1,packed:false,depth:8,shift:0,comp_offs:1,next_elem:1}),new E({h_ss:1,v_ss:1,packed:false,depth:8,shift:0,comp_offs:2,next_elem:1}),null,null],elem_size:0,be:false,alpha:false,palette:false});class G{constructor(a,b,c,d){this.width=a,this.height=b,this.flipped=c,this.format=d}get_width(){return this.width}get_height(){return this.height}is_flipped(){return this.flipped}get_format(){return this.format}set_width(w){this.width=w}set_height(h){this.height=h}eq(other){return this.width==other.width&&this.height==other.height&&this.flipped==other.flipped}}function get_plane_size(_,u){let l=_.get_format().get_chromaton(u);if(l===null)return[0,0];let[hs,vs]=l.get_subsampling();let w=(_.get_width()+((1<<hs)-1))>>hs,h=(_.get_height()+((1<<vs)-1))>>vs;return[w,h]}class H{constructor(data){this.info=data.info,this.data=data.data,this.offs=data.offs,this.strides=data.strides}get_num_refs(){return 1}get_info(){return this.info}get_data(){return this.data}get_dimensions(idx){return get_plane_size(this.info,idx)}get_offset(idx){if(idx>=this.offs.length)return 0;else return this.offs[idx]}get_stride(idx){if(idx>=this.strides.length)return 0;return this.strides[idx]}cloned(){return new H({info:this.info,data:this.data.slice(0),offs:this.offs,strides:this.strides})}}class I{constructor(a,b){this.type=a,this.value=b}get_vbuf(){return this.value}}I.Video=1,I.Video16=2,I.Video32=3,I.VideoPacked=4,I.Data=5,I.None=6;const NA_SIMPLE_VFRAME_COMPONENTS=4;class J{constructor(_){this.width=_.width,this.height=_.height,this.flip=_.flip,this.stride=_.stride,this.offset=_.offset,this.components=_.components,this.data=_.data}static from_video_buf(_){let a=_.get_info();let a1=a.format.components;if(a1>NA_SIMPLE_VFRAME_COMPONENTS)return null;let w=new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS),h=new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS),s=new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS),o=new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS);for(var a2=0;a2<a1;a2++){let[b1,b2]=_.get_dimensions(a2);w[a2]=b1,h[a2]=b2,s[a2]=_.get_stride(a2),o[a2]=_.get_offset(a2)}let a3=a.flipped;return new J({width:w,height:h,flip:a3,stride:s,offset:o,components:a1,data:_.data,})}}function alloc_video_buffer(vinfo,align){let fmt=vinfo.format;let new_size=0;let offs=[];let strides=[];for(var i=0;i<fmt.get_num_comp();i++)if(!fmt.get_chromaton(i))throw new Error("AllocatorError::FormatError");let align_mod=(1<<align)-1;let width=(vinfo.width+align_mod)-align_mod,height=(vinfo.height+align_mod)-align_mod;let max_depth=0,all_packed=true;for(var i=0;i<fmt.get_num_comp();i++){let ochr=fmt.get_chromaton(i);if(!ochr)continue;let chr=ochr;if(!chr.is_packed())all_packed=false;max_depth=Math.max(max_depth,chr.get_depth())}let unfit_elem_size=false;switch(fmt.get_elem_size()){case 2:case 4:unfit_elem_size=true;break}unfit_elem_size=!unfit_elem_size;if(!all_packed){for(var i=0;i<fmt.get_num_comp();i++){let ochr=fmt.get_chromaton(i);if(!ochr)continue;let chr=ochr;offs.push(new_size);let stride=chr.get_linesize(width);let cur_h=chr.get_height(height);let cur_sz=(stride*cur_h);let new_sz=(new_size+cur_sz);new_size=new_sz;strides.push(stride)}if(max_depth<=8){let data=new Uint8Array(new_size);let buf=new H({data:data,info:vinfo,offs,strides});return new I(I.Video,buf)}}}class K{constructor(a){this.pool=[],this.max_len=a,this.add_len=0}set_dec_bufs(a){this.add_len=a}reset(){this.pool=[]}prealloc_video(a,b){let c=this.max_len+this.add_len-this.pool.length;for(var _=0;_<c;_++){let d=alloc_video_buffer(a,b);this.pool.push(d.value)}}get_free(){for(var i=0;i<this.pool.length;i++){var e=this.pool[i];if(e.get_num_refs()==1)return e}return null}get_info(){if(this.pool.length)return(this.pool[0].get_info());else return null}get_copy(_){let a=this.get_free().cloned();a.data.set(_.data,0);return a}}const LONG_VECTOR_ORDER=new Uint32Array([0,1,2,7,6,5,4]),NZ_PROBS=new Uint8Array([162,164]),RAW_PROBS=[new Uint8Array([247,210,135,68,138,220,239,246]),new Uint8Array([244,184,201,44,173,221,239,253])],TREE_PROBS=[new Uint8Array([225,146,172,147,214,39,156]),new Uint8Array([204,170,119,235,140,230,228])],ZERO_RUN_PROBS=[new Uint8Array([198,197,196,146,198,204,169,142,130,136,149,149,191,249]),new Uint8Array([135,201,181,154,98,117,132,126,146,169,184,240,246,254])],HAS_NZ_PROB=new Uint8Array([237,231]),HAS_SIGN_PROB=new Uint8Array([246,243]),HAS_TREE_PROB=[new Uint8Array([253,253,254,254,254,254,254]),new Uint8Array([245,253,254,254,254,254,254])],HAS_RAW_PROB=[new Uint8Array([254,254,254,254,254,250,250,252]),new Uint8Array([254,254,254,254,254,251,251,254])],HAS_COEF_PROBS=[new Uint8Array([146,255,181,207,232,243,238,251,244,250,249]),new Uint8Array([179,255,214,240,250,255,244,255,255,255,255])],HAS_SCAN_UPD_PROBS=new Uint8Array([0,132,132,159,153,151,161,170,164,162,136,110,103,114,129,118,124,125,132,136,114,110,142,135,134,123,143,126,153,183,166,161,171,180,179,164,203,218,225,217,215,206,203,217,229,241,248,243,253,255,253,255,255,255,255,255,255,255,255,255,255,255,255,255]),HAS_ZERO_RUN_PROBS=[new Uint8Array([219,246,238,249,232,239,249,255,248,253,239,244,241,248]),new Uint8Array([198,232,251,253,219,241,253,255,248,249,244,238,251,255])],VP6_AC_PROBS=[[[new Uint8Array([227,246,230,247,244,255,255,255,255,255,255]),new Uint8Array([255,255,209,231,231,249,249,253,255,255,255]),new Uint8Array([255,255,225,242,241,251,253,255,255,255,255]),new Uint8Array([255,255,241,253,252,255,255,255,255,255,255]),new Uint8Array([255,255,248,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255])],[new Uint8Array([240,255,248,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,240,253,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255])]],[[new Uint8Array([206,203,227,239,247,255,253,255,255,255,255]),new Uint8Array([207,199,220,236,243,252,252,255,255,255,255]),new Uint8Array([212,219,230,243,244,253,252,255,255,255,255]),new Uint8Array([236,237,247,252,253,255,255,255,255,255,255]),new Uint8Array([240,240,248,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255])],[new Uint8Array([230,233,249,255,255,255,255,255,255,255,255]),new Uint8Array([238,238,250,255,255,255,255,255,255,255,255]),new Uint8Array([248,251,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255])]],[[new Uint8Array([225,239,227,231,244,253,243,255,255,253,255]),new Uint8Array([232,234,224,228,242,249,242,252,251,251,255]),new Uint8Array([235,249,238,240,251,255,249,255,253,253,255]),new Uint8Array([249,253,251,250,255,255,255,255,255,255,255]),new Uint8Array([251,250,249,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255])],[new Uint8Array([243,244,250,250,255,255,255,255,255,255,255]),new Uint8Array([249,248,250,253,255,255,255,255,255,255,255]),new Uint8Array([253,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255]),new Uint8Array([255,255,255,255,255,255,255,255,255,255,255])]]],VP6_DC_WEIGHTS=[[new Int16Array([122,133]),new Int16Array([133,51]),new Int16Array([142,-16])],[new Int16Array([0,1]),new Int16Array([0,1]),new Int16Array([0,1])],[new Int16Array([78,171]),new Int16Array([169,71]),new Int16Array([221,-30])],[new Int16Array([139,117]),new Int16Array([214,44]),new Int16Array([246,-3])],[new Int16Array([168,79]),new Int16Array([210,38]),new Int16Array([203,17])]],VP6_IDX_TO_AC_BAND=new Uint32Array([0,0,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]),VP6_BICUBIC_COEFFS=[[new Int16Array([0,128,0,0]),new Int16Array([-3,122,9,0]),new Int16Array([-4,109,24,-1]),new Int16Array([-5,91,45,-3]),new Int16Array([-4,68,68,-4]),new Int16Array([-3,45,91,-5]),new Int16Array([-1,24,109,-4]),new Int16Array([ 0,9,122,-3])],[new Int16Array([0,128,0,0]),new Int16Array([-4,124,9,-1]),new Int16Array([-5,110,25,-2]),new Int16Array([-6,91,46,-3]),new Int16Array([-5,69,69,-5]),new Int16Array([-3,46,91,-6]),new Int16Array([-2,25,110,-5]),new Int16Array([-1,9,124,-4])],[new Int16Array([0,128,0,0]),new Int16Array([-4,123,10,-1]),new Int16Array([-6,110,26,-2]),new Int16Array([-7,92,47,-4]),new Int16Array([-6,70,70,-6]),new Int16Array([-4,47,92,-7]),new Int16Array([-2,26,110,-6]),new Int16Array([-1,10,123,-4])],[new Int16Array([0,128,0,0]),new Int16Array([-5,124,10,-1]),new Int16Array([-7,110,27,-2]),new Int16Array([-7,91,48,-4]),new Int16Array([-6,70,70,-6]),new Int16Array([-4,48,92,-8]),new Int16Array([-2,27,110,-7]),new Int16Array([-1,10,124,-5])],[new Int16Array([0,128,0,0]),new Int16Array([-6,124,11,-1]),new Int16Array([-8,111,28,-3]),new Int16Array([-8,92,49,-5]),new Int16Array([-7,71,71,-7]),new Int16Array([-5,49,92,-8]),new Int16Array([-3,28,111,-8]),new Int16Array([-1,11,124,-6])],[new Int16Array([0,128,0,0]),new Int16Array([-6,123,12,-1]),new Int16Array([-9,111,29,-3]),new Int16Array([-9,93,50,-6]),new Int16Array([-8,72,72,-8]),new Int16Array([-6,50,93,-9]),new Int16Array([-3,29,111,-9]),new Int16Array([-1,12,123,-6])],[new Int16Array([0,128,0,0]),new Int16Array([-7,124,12,-1]),new Int16Array([-10,111,30,-3]),new Int16Array([-10,93,51,-6]),new Int16Array([-9,73,73,-9]),new Int16Array([-6,51,93,-10]),new Int16Array([-3,30,111,-10]),new Int16Array([-1,12,124,-7])],[new Int16Array([0,128,0,0]),new Int16Array([-7,123,13,-1]),new Int16Array([-11,112,31,-4]),new Int16Array([-11,94,52,-7]),new Int16Array([-10,74,74,-10]),new Int16Array([-7,52,94,-11]),new Int16Array([-4,31,112,-11]),new Int16Array([-1,13,123,-7])],[new Int16Array([0,128,0,0]),new Int16Array([-8,124,13,-1]),new Int16Array([-12,112,32,-4]),new Int16Array([-12,94,53,-7]),new Int16Array([-10,74,74,-10]),new Int16Array([-7,53,94,-12]),new Int16Array([-4,32,112,-12]),new Int16Array([-1,13,124,-8])],[new Int16Array([0,128,0,0]),new Int16Array([-9,124,14,-1]),new Int16Array([-13,112,33,-4]),new Int16Array([-13,95,54,-8]),new Int16Array([-11,75,75,-11]),new Int16Array([-8,54,95,-13]),new Int16Array([-4,33,112,-13]),new Int16Array([-1,14,124,-9])],[new Int16Array([0,128,0,0]),new Int16Array([-9,123,15,-1]),new Int16Array([-14,113,34,-5]),new Int16Array([-14,95,55,-8]),new Int16Array([-12,76,76,-12]),new Int16Array([-8,55,95,-14]),new Int16Array([-5,34,112,-13]),new Int16Array([-1,15,123,-9])],[new Int16Array([0,128,0,0]),new Int16Array([-10,124,15,-1]),new Int16Array([-14,113,34,-5]),new Int16Array([-15,96,56,-9]),new Int16Array([-13,77,77,-13]),new Int16Array([-9,56,96,-15]),new Int16Array([-5,34,113,-14]),new Int16Array([-1,15,124,-10])],[new Int16Array([0,128,0,0]),new Int16Array([-10,123,16,-1]),new Int16Array([-15,113,35,-5]),new Int16Array([-16,98,56,-10]),new Int16Array([-14,78,78,-14]),new Int16Array([-10,56,98,-16]),new Int16Array([-5,35,113,-15]),new Int16Array([-1,16,123,-10])],[new Int16Array([0,128,0,0]),new Int16Array([-11,124,17,-2]),new Int16Array([-16,113,36,-5]),new Int16Array([-17,98,57,-10]),new Int16Array([-14,78,78,-14]),new Int16Array([-10,57,98,-17]),new Int16Array([-5,36,113,-16]),new Int16Array([-2,17,124,-11])],[new Int16Array([0,128,0,0]),new Int16Array([-12,125,17,-2]),new Int16Array([-17,114,37,-6]),new Int16Array([-18,99,58,-11]),new Int16Array([-15,79,79,-15]),new Int16Array([-11,58,99,-18]),new Int16Array([-6,37,114,-17]),new Int16Array([-2,17,125,-12])],[new Int16Array([0,128,0,0]),new Int16Array([-12,124,18,-2]),new Int16Array([-18,114,38,-6]),new Int16Array([-19,99,59,-11]),new Int16Array([-16,80,80,-16]),new Int16Array([-11,59,99,-19]),new Int16Array([-6,38,114,-18]),new Int16Array([-2,18,124,-12])],[new Int16Array([0,128,0,0]),new Int16Array([-4,118,16,-2]),new Int16Array([-7,106,34,-5]),new Int16Array([-8,90,53,-7]),new Int16Array([-8,72,72,-8]),new Int16Array([-7,53,90,-8]),new Int16Array([-5,34,106,-7]),new Int16Array([-2,16,118,-4])]],VP6_DEFAULT_SCAN_ORDER=new Uint32Array([0,0,1,1,1,2,2,2,2,2,2,3,3,4,4,4,5,5,5,5,6,6,7,7,7,7,7,8,8,9,9,9,9,9,9,10,10,11,11,11,11,11,11,12,12,12,12,12,12,13,13,13,13,13,14,14,14,14,15,15,15,15,15,15]),VP6_INTERLACED_SCAN_ORDER=new Uint32Array([0,1,0,1,1,2,5,3,2,2,2,2,4,7,8,10,9,7,5,4,2,3,5,6,8,9,11,12,13,12,11,10,9,7,5,4,6,7,9,11,12,12,13,13,14,12,11,9,7,9,11,12,14,14,14,15,13,11,13,15,15,15,15,15]),VP6_COEF_ADD_BITS=new Uint8Array([1,2,3,4,5,11]);class L{constructor(){this.pool_u8=new K(0)}}const VP_YUVA420_FORMAT=new F({model:new D(D.YUV,new C(C.YUVJ)),components:4,comp_info:[new E({h_ss:0,v_ss:0,packed:false,depth:8,shift:0,comp_offs:0,next_elem:1}),new E({h_ss:1,v_ss:1,packed:false,depth:8,shift:0,comp_offs:1,next_elem:1}),new E({h_ss:1,v_ss:1,packed:false,depth:8,shift:0,comp_offs:2,next_elem:1}),new E({h_ss:0,v_ss:0,packed:false,depth:8,shift:0,comp_offs:3,next_elem:1}),null],elem_size:0,be:false,alpha:true,palette:false});const VP_REF_INTER=1,VP_REF_GOLDEN=2;class M{constructor(a){this.type=a}is_intra(){return this.type==M.Intra}get_ref_id(){switch(this.type){case M.Intra:return 0;case M.InterNoMV:case M.InterMV:case M.InterNearest:case M.InterNear:case M.InterFourMV:return VP_REF_INTER;default:return VP_REF_GOLDEN}}}M.Intra=1,M.InterNoMV=2,M.InterMV=3,M.InterNearest=4,M.InterNear=5,M.InterFourMV=6,M.GoldenNoMV=7,M.GoldenMV=8,M.GoldenNearest=9,M.GoldenNear=10;class N{constructor(){this.lastframe=null,this.goldframe=null}clear(){this.lastframe=null,this.goldframe=null}add_frame(_){this.lastframe=_}add_golden_frame(_){this.goldframe=_}get_last(){return this.lastframe}get_golden(){return this.goldframe}has_refs(){return !!this.lastframe}}const VP56_COEF_BASE=new Int16Array([5,7,11,19,35,67]),VP56_COEF_ADD_PROBS=[new Uint8Array([159,128,0,0,0,0,0,0,0,0,0,0]),new Uint8Array([165,145,128,0,0,0,0,0,0,0,0,0]),new Uint8Array([173,148,140,128,0,0,0,0,0,0,0,0]),new Uint8Array([176,155,140,135,128,0,0,0,0,0,0,0]),new Uint8Array([180,157,141,134,130,128,0,0,0,0,0,0]),new Uint8Array([254,254,243,230,196,177,153,140,133,130,129,128])];const ff_vp56_norm_shift=new Uint8Array([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);class O{constructor(_){if(_.length<3)throw new Error("DecoderError::ShortData");this.src=_,this.pos=4,this.value=((_[0]<<24)|(_[1]<<16)|(_[2]<<8)|(_[3]))>>>0,this.range=255,this.bits=8}read_bool(){return this.read_prob(128)}read_prob(_){this.renorm();let a=(1+(((((this.range-1)>>>0)*(_>>>0))>>8)>>>0))>>>0,b;if((this.value>>>0)<((a<<24)>>>0))this.range=a,b=false;else this.range-=a,this.range=this.range>>>0,this.value -=(a<<24)>>>0,this.value=this.value>>>0,b=true;return b}read_bits(_){let a=0;for(var i=0;i<_;i++)a=(a<<1)|this.read_prob(128);return a>>>0}read_probability(){let val=this.read_bits(7);return(val==0)?1:(val<<1)}renorm(){let a=ff_vp56_norm_shift[this.range];this.range<<=a,this.value<<=a,this.range=this.range>>>0,this.value=this.value>>>0,this.bits-=a;if((this.bits<=0)&&(this.pos<this.src.length))this.value|=(this.src[this.pos]<<((-this.bits)<<24>>>24)),this.value=this.value>>>0,this.pos+=1,this.bits+=8}skip_bytes(nbytes){for(var i=0;i<nbytes;i++){this.value<<=8;if(this.pos<this.src.length)this.value|=(this.src[this.pos]),this.pos+=1}}}function rescale_prob(_,a,b){return Math.max(Math.min(((((_<<24>>>24)*a[0]+128)>>8)+a[1]),b),1)<<24>>>24}const C1S7=64277,C2S6=60547,C3S5=54491,C4S4=46341,C5S3=36410,C6S2=25080,C7S1=12785;function mul16(a,b){return(a*b)>>16}function vp_idct(_){let o=new Int32Array(64),i,t_a,t_b,t_c,t_d,t_a1,t_b1,t_e,t_f,t_g,t_h,t_e1;for(i=0;i<64;i+=8)t_a=mul16(C1S7,(_[i+1]))+mul16(C7S1,_[i+7]),t_b=mul16(C7S1,(_[i+1]))-mul16(C1S7,_[i+7]),t_c=mul16(C3S5,(_[i+3]))+mul16(C5S3,_[i+5]),t_d=mul16(C3S5,(_[i+5]))-mul16(C5S3,_[i+3]),t_a1=mul16(C4S4,t_a-t_c),t_b1=mul16(C4S4,t_b-t_d),t_c=t_a+t_c,t_d=t_b+t_d,t_e=mul16(C4S4,(_[i]+_[i+4])),t_f=mul16(C4S4,(_[i]-_[i+4])),t_g=mul16(C2S6,(_[i+2]))+mul16(C6S2,(_[i+6])),t_h=mul16(C6S2,(_[i+2]))-mul16(C2S6,(_[i+6])),t_e1=t_e-t_g,t_g=t_e+t_g,t_a=t_f+t_a1,t_f=t_f-t_a1,t_b=t_b1-t_h,t_h=t_b1+t_h,o[i]=t_g+t_c,o[i+1]=t_a+t_h,o[i+2]=t_a-t_h,o[i+3]=t_e1+t_d,o[i+4]=t_e1-t_d,o[i+5]=t_f+t_b,o[i+6]=t_f-t_b,o[i+7]=t_g-t_c;for(i=0;i<8;i++)t_a=mul16(C1S7,(o[8+i]))+mul16(C7S1,o[56+i]),t_b=mul16(C7S1,(o[8+i]))-mul16(C1S7,o[56+i]),t_c=mul16(C3S5,(o[24+i]))+mul16(C5S3,o[40+i]),t_d=mul16(C3S5,(o[40+i]))-mul16(C5S3,o[24+i]),t_a1=mul16(C4S4,t_a-t_c),t_b1=mul16(C4S4,t_b-t_d),t_c=t_a+t_c,t_d=t_b+t_d,t_e=mul16(C4S4,(o[i]+o[32+i]))+8,t_f=mul16(C4S4,(o[i]-o[32+i]))+8,t_g=mul16(C2S6,(o[16+i]))+mul16(C6S2,(o[48+i])),t_h=mul16(C6S2,(o[16+i]))-mul16(C2S6,(o[48+i])),t_e1=t_e-t_g,t_g=t_e+t_g,t_a=t_f+t_a1,t_f=t_f-t_a1,t_b=t_b1-t_h,t_h=t_b1+t_h,_[i]=(t_g+t_c)>>4,_[8+i]=(t_a+t_h)>>4,_[16+i]=(t_a-t_h)>>4,_[24+i]=(t_e1+t_d)>>4,_[32+i]=(t_e1-t_d)>>4,_[40+i]=(t_f+t_b)>>4,_[48+i]=(t_f-t_b)>>4,_[56+i]=(t_g-t_c)>>4}function vp_idct_dc(_){let a=((mul16(C4S4,mul16(C4S4,_[0]))+8)>>4)<<16>>16;for(let i=0;i<64;i++)_[i]=a}function vp_put_block(_,bx,by,h,frm){var o=frm.data;vp_idct(_);let a=frm.offset[h]+((bx*8)+((by*8)*frm.stride[h]));for(var y=0;y<8;y++){for(var x=0;x<8;x++)o[a+x]=Math.max(Math.min((_[x+(y*8)]+128),255),0);a+=frm.stride[h]}}function vp_put_block_ilace(_,bx,by,plane,frm){var data=frm.data;vp_idct(_);let off=frm.offset[plane]+bx*8+((by-1)*8+(by+1))*frm.stride[plane];for(let y=0;y<8;y++){for(let x=0;x<8;x++)data[off+x]=Math.max(Math.min((_[x+y*8]+128),255),0);off+=frm.stride[plane]*2}}function vp_put_block_dc(_,bx,by,plane,frm){var data=frm.data;vp_idct_dc(_);let dc=(Math.max(Math.min((_[0]+128),255),0))|0;let off=frm.offset[plane]+bx*8+by*8*frm.stride[plane];for(let y=0;y<8;y++){for(let x=0;x<8;x++)data[off+x]=dc;off+=frm.stride[plane]}}function vp_add_block(_,bx,by,plane,frm){var data=frm.data;vp_idct(_);let off=frm.offset[plane]+bx*8+by*8*frm.stride[plane];for(let y=0;y<8;y++){for(let x=0;x<8;x++)data[off+x]=Math.max(Math.min((_[x+y*8]+data[off+x]),255),0);off+=frm.stride[plane]}}function vp_add_block_ilace(_,bx,by,plane,frm){var data=frm.data;vp_idct(_);let off=frm.offset[plane]+bx*8+((by-1)*8+(by+1))*frm.stride[plane];for(let y=0;y<8;y++){for(let x=0;x<8;x++)data[off+x]=Math.max(Math.min((_[x+y*8]+data[off+x]),255),0);off+=frm.stride[plane]*2}}function vp_add_block_dc(_,bx,by,plane,frm){var data=frm.data;vp_idct_dc(_);let dc=_[0],off=frm.offset[plane]+bx*8+by*8*frm.stride[plane];for(let y=0;y<8;y++){for(let x=0;x<8;x++)data[off+x]=Math.max(Math.min((dc+data[off+x]),255),0);off+=frm.stride[plane]}}function vp31_loop_filter(data,off,step,stride,len,loop_str){for(let _=0;_<len;_++){let a=data[off-step*2],b=data[off-step],c=data[off],d=data[off+step];let diff=((a-d)+3*(c-b)+4)>>3;if(Math.abs(diff)>= 2*loop_str)diff=0;else if(Math.abs(diff)>= loop_str){if(diff<0)diff=-diff-2*loop_str;else diff=-diff+2*loop_str}if(diff!=0)data[off-step]=Math.min(Math.max((b+diff),0),255)|0,data[off]=Math.min(Math.max((c-diff),0),255)|0;off+=stride}}const TOKEN_LARGE=5;const TOKEN_EOB=42;class P{constructor(){this.is_intra=false,this.is_golden=false,this.quant=0,this.multistream=false,this.use_huffman=false,this.version=0,this.profile=0,this.interlaced=false,this.offset=0,this.mb_w=0,this.mb_h=0,this.disp_w=0,this.disp_h=0,this.scale=0}}class Q{constructor(a,b){this.type=a,this.value=b}}Q.None=1,Q.Bool=2,Q.Huff=3;class R{constructor(){this.nz_prob=0,this.sign_prob=0,this.raw_probs=new Uint8Array(8),this.tree_probs=new Uint8Array(7)}}class S{constructor(){this.probs=new Uint8Array(10)}}class T{constructor(){this.dc_token_probs=[[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)]],this.dc_value_probs=new Uint8Array(11),this.ac_ctype_probs=[[[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)]],[[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)]],[[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)]]],this.ac_type_probs=[[[[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)]],[[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)]],[[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)],[new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5),new Uint8Array(5)]]]],this.ac_val_probs=[[new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11)],[new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11)],[new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11),new Uint8Array(11)]]}}class U{constructor(){this.scan_order=new Uint32Array(64),this.scan=new Uint32Array(64),this.zigzag=new Uint32Array(64),this.zero_run_probs=[new Uint8Array(14),new Uint8Array(14)]}}const VP56_DC_QUANTS=new Int16Array([47,47,47,47,45,43,43,43,43,43,42,41,41,40,40,40,40,35,35,35,35,33,33,33,33,32,32,32,27,27,26,26,25,25,24,24,23,23,19,19,19,19,18,18,17,16,16,16,16,16,15,11,11,11,10,10,9,8,7,5,3,3,2,2]);const VP56_AC_QUANTS=new Int16Array([94,92,90,88,86,82,78,74,70,66,62,58,54,53,52,51,50,49,48,47,46,45,44,43,42,40,39,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]);const VP56_FILTER_LIMITS=new Uint8Array([14,14,13,13,12,12,10,10,10,10,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,7,7,7,7,7,6,6,6,6,6,6,5,5,5,5,4,4,4,4,4,4,4,3,3,3,3,2]);const VP56_MODE_VQ=[[new Uint8Array([9,15,32,25,7,19,9,21,1,12,14,12,3,18,14,23,3,10,0,4]),new Uint8Array([48,39,1,2,11,27,29,44,7,27,1,4,0,3,1,6,1,2,0,0]),new Uint8Array([21,32,1,2,4,10,32,43,6,23,2,3,1,19,1,6,12,21,0,7]),new Uint8Array([69,83,0,0,0,2,10,29,3,12,0,1,0,3,0,3,2,2,0,0]),new Uint8Array([11,20,1,4,18,36,43,48,13,35,0,2,0,5,3,12,1,2,0,0]),new Uint8Array([70,44,0,1,2,10,37,46,8,26,0,2,0,2,0,2,0,1,0,0]),new Uint8Array([8,15,0,1,8,21,74,53,22,42,0,1,0,2,0,3,1,2,0,0]),new Uint8Array([141,42,0,0,1,4,11,24,1,11,0,1,0,1,0,2,0,0,0,0]),new Uint8Array([8,19,4,10,24,45,21,37,9,29,0,3,1,7,11,25,0,2,0,1]),new Uint8Array([46,42,0,1,2,10,54,51,10,30,0,2,0,2,0,1,0,1,0,0]),new Uint8Array([28,32,0,0,3,10,75,51,14,33,0,1,0,2,0,1,1,2,0,0]),new Uint8Array([100,46,0,1,3,9,21,37,5,20,0,1,0,2,1,2,0,1,0,0]),new Uint8Array([27,29,0,1,9,25,53,51,12,34,0,1,0,3,1,5,0,2,0,0]),new Uint8Array([80,38,0,0,1,4,69,33,5,16,0,1,0,1,0,0,0,1,0,0]),new Uint8Array([16,20,0,0,2,8,104,49,15,33,0,1,0,1,0,1,1,1,0,0]),new Uint8Array([194,16,0,0,1,1,1,9,1,3,0,0,0,1,0,1,0,0,0,0])],[new Uint8Array([41,22,1,0,1,31,0,0,0,0,0,1,1,7,0,1,98,25,4,10]),new Uint8Array([123,37,6,4,1,27,0,0,0,0,5,8,1,7,0,1,12,10,0,2]),new Uint8Array([26,14,14,12,0,24,0,0,0,0,55,17,1,9,0,36,5,7,1,3]),new Uint8Array([209,5,0,0,0,27,0,0,0,0,0,1,0,1,0,1,0,0,0,0]),new Uint8Array([2,5,4,5,0,121,0,0,0,0,0,3,2,4,1,4,2,2,0,1]),new Uint8Array([175,5,0,1,0,48,0,0,0,0,0,2,0,1,0,2,0,1,0,0]),new Uint8Array([83,5,2,3,0,102,0,0,0,0,1,3,0,2,0,1,0,0,0,0]),new Uint8Array([233,6,0,0,0,8,0,0,0,0,0,1,0,1,0,0,0,1,0,0]),new Uint8Array([34,16,112,21,1,28,0,0,0,0,6,8,1,7,0,3,2,5,0,2]),new Uint8Array([159,35,2,2,0,25,0,0,0,0,3,6,0,5,0,1,4,4,0,1]),new Uint8Array([75,39,5,7,2,48,0,0,0,0,3,11,2,16,1,4,7,10,0,2]),new Uint8Array([212,21,0,1,0,9,0,0,0,0,1,2,0,2,0,0,2,2,0,0]),new Uint8Array([4,2,0,0,0,172,0,0,0,0,0,1,0,2,0,0,2,0,0,0]),new Uint8Array([187,22,1,1,0,17,0,0,0,0,3,6,0,4,0,1,4,4,0,1]),new Uint8Array([133,6,1,2,1,70,0,0,0,0,0,2,0,4,0,3,1,1,0,0]),new Uint8Array([251,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0])],[new Uint8Array([2,3,2,3,0,2,0,2,0,0,11,4,1,4,0,2,3,2,0,4]),new Uint8Array([49,46,3,4,7,31,42,41,0,0,2,6,1,7,1,4,2,4,0,1]),new Uint8Array([26,25,1,1,2,10,67,39,0,0,1,1,0,14,0,2,31,26,1,6]),new Uint8Array([103,46,1,2,2,10,33,42,0,0,1,4,0,3,0,1,1,3,0,0]),new Uint8Array([14,31,9,13,14,54,22,29,0,0,2,6,4,18,6,13,1,5,0,1]),new Uint8Array([85,39,0,0,1,9,69,40,0,0,0,1,0,3,0,1,2,3,0,0]),new Uint8Array([31,28,0,0,3,14,130,34,0,0,0,1,0,3,0,1,3,3,0,1]),new Uint8Array([171,25,0,0,1,5,25,21,0,0,0,1,0,1,0,0,0,0,0,0]),new Uint8Array([17,21,68,29,6,15,13,22,0,0,6,12,3,14,4,10,1,7,0,3]),new Uint8Array([51,39,0,1,2,12,91,44,0,0,0,2,0,3,0,1,2,3,0,1]),new Uint8Array([81,25,0,0,2,9,106,26,0,0,0,1,0,1,0,1,1,1,0,0]),new Uint8Array([140,37,0,1,1,8,24,33,0,0,1,2,0,2,0,1,1,2,0,0]),new Uint8Array([14,23,1,3,11,53,90,31,0,0,0,3,1,5,2,6,1,2,0,0]),new Uint8Array([123,29,0,0,1,7,57,30,0,0,0,1,0,1,0,1,0,1,0,0]),new Uint8Array([13,14,0,0,4,20,175,20,0,0,0,1,0,1,0,1,1,1,0,0]),new Uint8Array([202,23,0,0,1,3,2,9,0,0,0,1,0,1,0,1,0,0,0,0])]];const INVALID_REF=42;const MAX_HUFF_ELEMS=12;class VHN{constructor(){this.weight=0,this.sym=0,this.ch0=0,this.ch1=0}clone(){const c=new VHN();c.weight=this.weight;c.sym=this.sym;c.ch0=this.ch0;c.ch1=this.ch1;return c}copy(other){this.weight=other.weight,this.sym=other.sym,this.ch0=other.ch0,this.ch1=other.ch1}}function asU16(num){return num<<16>>>16}function prob2weight(a,b){let w=(asU16(asU16(a)*asU16(b))>>8)<<24>>>24;return(w==0)?1:w}class VH{constructor(){this.codes=new Uint16Array(MAX_HUFF_ELEMS),this.bits=new Uint8Array(MAX_HUFF_ELEMS)}build_codes(_){var a=new Uint8Array(12);a[11]=prob2weight(_[0],_[1]),a[0]=prob2weight(_[0],255-_[1]),a[1]=prob2weight(255-_[0],_[2]);let lvroot=prob2weight(255-_[0],255-_[2]);let tworoot=prob2weight(lvroot,_[3]);let hlroot=prob2weight(lvroot,255-_[3]);a[2]=prob2weight(tworoot,_[4]);let root34=prob2weight(tworoot,255-_[4]);a[3]=prob2weight(root34,_[5]),a[4]=prob2weight(root34,255-_[5]);let c1root=prob2weight(hlroot,_[6]);let c34root=prob2weight(hlroot,255-_[6]);a[5]=prob2weight(c1root,_[7]),a[6]=prob2weight(c1root,255-_[7]);let c3root=prob2weight(c34root,_[8]);let c4root=prob2weight(c34root,255-_[8]);a[7]=prob2weight(c3root,_[9]),a[8]=prob2weight(c3root,255-_[9]),a[9]=prob2weight(c4root,_[10]),a[10]=prob2weight(c4root,255-_[10]);this.build(a)}build_codes_zero_run(_){var a=new Uint8Array(9);let b=prob2weight(_[0],_[1]);a[0]=prob2weight(b,_[2]),a[1]=prob2weight(b,255-_[2]),b=prob2weight(_[0],255-_[1]),a[2]=prob2weight(b,_[3]),a[3]=prob2weight(b,255-_[3]),b=prob2weight(255-_[0],_[4]),a[8]=prob2weight(255-_[0],255-_[4]);let c=prob2weight(b,_[5]);let d=prob2weight(b,255-_[5]);a[4]=prob2weight(c,_[6]),a[5]=prob2weight(c,255-_[6]),a[6]=prob2weight(d,_[7]),a[7]=prob2weight(d,255-_[7]),this.build(a)}build(weights){let nodes=new Array(MAX_HUFF_ELEMS*2);for(let _=0;_<nodes.length;_++)nodes[_]=new VHN();let nlen=0;for(let _i=weights.length-1;_i>=0;_i--){let weight=weights[_i];let pos=nlen;for(let i=0;i<nlen;i++)if(nodes[i].weight>weight){pos=i;break}for(let j=nlen-1;j>=pos;j--)nodes[j+1].copy(nodes[j]);nodes[pos].weight=weight,nodes[pos].sym=((weights.length-nlen-1))<<24>>24,nlen+=1}let low=0,_nlen=nlen;for(let _=0;_<_nlen-1;_++){let nnode=new VHN();nnode.weight=(nodes[low].weight+nodes[low+1].weight)<<16>>>16,nnode.sym=-1,nnode.ch0=low,nnode.ch1=low+1,low+=2;let pos=low;while((pos<nlen)&&(nodes[pos].weight<nnode.weight))pos+=1;for(let j=nlen-1;j>=pos;j--)nodes[j+1].copy(nodes[j]);nodes[pos].copy(nnode),nlen+=1}this.get_codes(nodes,_nlen-1,0,0);for(let i=_nlen;i<this.codes.length;i++)this.codes[i]=this.codes[0],this.bits[i]=this.bits[0]}get_codes(nodes,pos,code,len){if(nodes[pos].sym>=0)this.codes[nodes[pos].sym]=code,this.bits[nodes[pos].sym]=len;else this.get_codes(nodes,nodes[pos].ch0,(code<<1)|0,len+1),this.get_codes(nodes,nodes[pos].ch1,(code<<1)|1,len+1)}}class VHM{constructor(){this.dc_token_tree=[new VH(),new VH()],this.ac_token_tree=[[[new VH(),new VH(),new VH(),new VH(),new VH(),new VH()],[new VH(),new VH(),new VH(),new VH(),new VH(),new VH()],[new VH(),new VH(),new VH(),new VH(),new VH(),new VH()]],[[new VH(),new VH(),new VH(),new VH(),new VH(),new VH()],[new VH(),new VH(),new VH(),new VH(),new VH(),new VH()],[new VH(),new VH(),new VH(),new VH(),new VH(),new VH()]]],this.zero_run_tree=[new VH(),new VH()]}}class V{constructor(){this.mv_models=[new R(),new R()],this.mbtype_models=[[new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S()],[new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S()],[new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S(),new S()]],this.coeff_models=[new T(),new T()],this.prob_xmitted=[new Uint8Array(20),new Uint8Array(20),new Uint8Array(20)],this.vp6models=new U(),this.vp6huff=new VHM()}}class W{constructor(){this.mb_type=new M(M.Intra),this.mv=new B(0,0)}}class X{constructor(){this.mb_x=0,this.mb_y=0,this.plane=0,this.coeff_cat=[new Uint8Array(64),new Uint8Array(64),new Uint8Array(64),new Uint8Array(64)],this.last_idx=new Uint32Array(4),this.top_ctx=0,this.ctx_idx=0,this.dc_quant=0,this.ac_quant=0,this.dc_zero_run=new Uint32Array(2),this.ac_zero_run=new Uint32Array(2)}}class Y{constructor(){this.dc_y=new Int16Array(0),this.dc_u=new Int16Array(0),this.dc_v=new Int16Array(0),this.ldc_y=new Int16Array(2),this.ldc_u=0,this.ldc_v=0,this.ref_y=new Uint8Array(0),this.ref_c=new Uint8Array(0),this.ref_left=0,this.y_idx=0,this.c_idx=0}reset(){this.update_row();for(var i=1;i<this.ref_y.length;i++)this.ref_y[i]=INVALID_REF;for(var i=1;i<this.ref_c.length;i++)this.ref_c[i]=INVALID_REF}update_row(){this.y_idx=1,this.c_idx=1,this.ldc_y=new Int16Array(2),this.ldc_u=0,this.ldc_v=0,this.ref_left=INVALID_REF}resize(a){this.dc_y=new Int16Array(a*2+2),this.dc_u=new Int16Array(a+2),this.dc_v=new Int16Array(a+2),this.ref_y=new Uint8Array(a*2+2),this.ref_y.fill(INVALID_REF),this.ref_c=new Uint8Array(a+2),this.ref_c.fill(INVALID_REF),this.ref_c[0]=0}next_mb(){this.y_idx+=2,this.c_idx+=1}}function rescale_mb_mode_prob(prob,total){return(255*prob /(1+total))<<24>>>24}function map_mb_type(_){switch(_.type){case M.InterNoMV:return 0;case M.Intra:return 1;case M.InterMV:return 2;case M.InterNearest:return 3;case M.InterNear:return 4;case M.GoldenNoMV:return 5;case M.GoldenMV:return 6;case M.InterFourMV:return 7;case M.GoldenNearest:return 8;case M.GoldenNear:return 9}}class Z{constructor(a,b,c){let vt=alloc_video_buffer(new G(24,24,false,VP_YUVA420_FORMAT),4);this.version=a,this.has_alpha=b,this.flip=c,this.shuf=new N(),this.width=0,this.height=0,this.mb_w=0,this.mb_h=0,this.models=new V(),this.amodels=new V(),this.coeffs=[new Int16Array(64),new Int16Array(64),new Int16Array(64),new Int16Array(64),new Int16Array(64),new Int16Array(64)],this.last_mbt=new M(M.InterNoMV),this.loop_thr=0,this.ilace_prob=0,this.ilace_mb=false,this.mb_info=[],this.fstate=new X(),this.dc_pred=new Y(),this.last_dc=[new Int16Array(4),new Int16Array(4),new Int16Array(4)],this.top_ctx=[new Uint8Array(0),new Uint8Array(0),new Uint8Array(0),new Uint8Array(0)],this.mc_buf=vt.get_vbuf()}set_dimensions(a,b){this.width=a,this.height=b,this.mb_w=(this.width+15)>>4,this.mb_h=(this.height+15)>>4,this.mb_info=[];for(var i=0;i<this.mb_w*this.mb_h;i++)this.mb_info.push(new W());this.top_ctx=[new Uint8Array(this.mb_w*2),new Uint8Array(this.mb_w),new Uint8Array(this.mb_w),new Uint8Array(this.mb_w*2)]}init(s,v){s.pool_u8.set_dec_bufs(3+(v.get_format().has_alpha()?1:0)),s.pool_u8.prealloc_video(new G(v.get_width(),v.get_height(),false,v.get_format()),4),this.set_dimensions(v.get_width(),v.get_height()),this.dc_pred.resize(this.mb_w)}decode_frame(supp,src,br){let aoffset,bc;if(this.has_alpha){if(!(src.length>=7))throw new Error("ValidationError");aoffset=((src[0])<<16)|((src[1])<<8)|(src[2]);if(!((aoffset>0)&&(aoffset<src.length-3)))throw new Error("ValidationError");bc=new O(src.subarray(3))}else{if(!(src.length>=4))throw new Error("ValidationError");aoffset=src.length;bc=new O(src)}let hdr=br.parseHeader(bc);if(!((hdr.offset)<aoffset))throw new Error("ValidationError");if(hdr.mb_w!=0&&(hdr.mb_w!=this.mb_w||hdr.mb_h!=this.mb_h))this.set_dimensions(hdr.mb_w*16,hdr.mb_h*16);let fmt=this.has_alpha?VP_YUVA420_FORMAT:YUV420_FORMAT,vinfo=new G(this.width,this.height,this.flip,fmt),ret=supp.pool_u8.get_free();if(ret===null)throw new Error("DecoderError::AllocError");let buf=ret;if(!buf.get_info().eq(vinfo)){this.shuf.clear(),supp.pool_u8.reset(),supp.pool_u8.prealloc_video(vinfo,4);let ret=supp.pool_u8.get_free();if(ret===null)throw new Error("DecoderError::AllocError");buf=ret}let dframe=J.from_video_buf(buf);if(hdr.is_intra)this.shuf.clear();else if(!this.shuf.has_refs())throw new Error("DecoderError::MissingReference");let psrc=src.subarray(this.has_alpha?3:0);this.decode_planes(br,dframe,bc,hdr,psrc,false);if(this.has_alpha){let asrc=src.subarray(aoffset+3);let _bc=new O(asrc);let ahdr=br.parseHeader(_bc);if(!(ahdr.mb_w==hdr.mb_w&&ahdr.mb_h==hdr.mb_h))throw new Error("ValidationError");var models=this.models;this.models=this.amodels;this.decode_planes(br,dframe,_bc,ahdr,asrc,true);this.models=models;if(hdr.is_golden&&ahdr.is_golden)this.shuf.add_golden_frame(buf.cloned());else if(hdr.is_golden&&!ahdr.is_golden){let cur_golden=this.shuf.get_golden();let off=cur_golden.get_offset(3);let stride=cur_golden.get_stride(3);let a1=supp.pool_u8.get_copy(buf);let dst=a1.get_data();let _src=cur_golden.get_data();dst.set(_src.subarray(off,off+(stride*this.mb_h*16)),off);this.shuf.add_golden_frame(a1)}else if(!hdr.is_golden&&ahdr.is_golden){let cur_golden=this.shuf.get_golden();let off=cur_golden.get_offset(3);let stride=cur_golden.get_stride(3);let a1=supp.pool_u8.get_copy(cur_golden);let dst=a1.get_data();let _src=buf.get_data();dst.set(_src.subarray(off,off+(stride*this.mb_h*16)),off);this.shuf.add_golden_frame(a1)}}if(hdr.is_golden&&!this.has_alpha)this.shuf.add_golden_frame(buf.cloned());this.shuf.add_frame(buf.cloned());return[new I(I.Video,buf),hdr.is_intra]}reset_mbtype_models(){const DEFAULT_XMITTED_PROBS=[new Uint8Array([42,69,2,1,7,1,42,44,22,6,3,1,2,0,5,1,1,0,0,0]),new Uint8Array([8,229,1,1,8,0,0,0,0,0,2,1,1,0,0,0,1,1,0,0]),new Uint8Array([35,122,1,1,6,1,34,46,0,0,2,1,1,0,1,0,1,1,0,0])];this.models.prob_xmitted[0].set(DEFAULT_XMITTED_PROBS[0],0),this.models.prob_xmitted[1].set(DEFAULT_XMITTED_PROBS[1],0),this.models.prob_xmitted[2].set(DEFAULT_XMITTED_PROBS[2],0)}decode_planes(br,dframe,bc,hdr,src,alpha){let cr;if(hdr.multistream){let off=hdr.offset;if(!hdr.use_huffman)cr=new Q(Q.Bool,new O(src.subarray(off)));else cr=new Q(Q.Huff,new A(src.subarray(off)))}else cr=new Q(Q.None);if(hdr.is_intra)br.reset_models(this.models),this.reset_mbtype_models();else this.decode_mode_prob_models(bc),br.decode_mv_models(bc,this.models.mv_models);br.decode_coeff_models(bc,this.models,hdr.is_intra);if(hdr.use_huffman){for(let i=0;i<2;i++)this.models.vp6huff.dc_token_tree[i].build_codes(this.models.coeff_models[i].dc_value_probs);for(let i=0;i<2;i++)for(let mode=0;mode<3;mode++)for(let band=0;band<6;band++)this.models.vp6huff.ac_token_tree[i][mode][band].build_codes(this.models.coeff_models[i].ac_val_probs[mode][band]);for(let i=0;i<2;i++)this.models.vp6huff.zero_run_tree[i].build_codes_zero_run(this.models.vp6models.zero_run_probs[i])}if(hdr.interlaced)this.ilace_prob=bc.read_bits(8);this.fstate=new X();this.fstate.dc_quant=(VP56_DC_QUANTS[hdr.quant]*4)|0;this.fstate.ac_quant=(VP56_AC_QUANTS[hdr.quant]*4)|0;this.loop_thr=VP56_FILTER_LIMITS[hdr.quant]|0;this.last_mbt=new M(M.InterNoMV);for(var i=0;i<this.top_ctx.length;i++)this.top_ctx[i].fill(0);this.last_dc=[new Int16Array(4),new Int16Array(4),new Int16Array(4)];this.last_dc[0][1]=0x80;this.last_dc[0][2]=0x80;this.dc_pred.reset();this.ilace_mb=false;for(var mb_y=0;mb_y<this.mb_h;mb_y++){this.fstate.mb_y=mb_y;this.fstate.coeff_cat[0].fill(0);this.fstate.coeff_cat[1].fill(0);this.fstate.coeff_cat[2].fill(0);this.fstate.coeff_cat[3].fill(0);this.fstate.last_idx.fill(24);for(var mb_x=0;mb_x<this.mb_w;mb_x++)this.fstate.mb_x=mb_x,this.decode_mb(dframe,bc,cr,br,hdr,alpha),this.dc_pred.next_mb();this.dc_pred.update_row()}}decode_mode_prob_models(bc){for(let ctx=0;ctx<3;ctx++){if(bc.read_prob(174)){let idx=bc.read_bits(4);for(let i=0;i<20;i++)this.models.prob_xmitted[ctx][i^1]=VP56_MODE_VQ[ctx][idx][i]}if(bc.read_prob(254)){for(let set=0;set<20;set++){if(bc.read_prob(205)){let sign=bc.read_bool();let diff=(bc.read_prob(171)?(bc.read_prob(199)?bc.read_bits(7):(bc.read_prob(140)?3:(bc.read_prob(125)?4:(bc.read_prob(104)?5:6)))):(bc.read_prob(83)?1:2))*4;if(!(diff<256))throw new Error("ValidationError");if(!sign){if(!(this.models.prob_xmitted[ctx][set^1]<=255-diff))throw new Error("ValidationError");this.models.prob_xmitted[ctx][set^1]+=diff}else{if(!(this.models.prob_xmitted[ctx][set^1]>=diff))throw new Error("ValidationError");this.models.prob_xmitted[ctx][set^1]-=diff}}}}}for(let ctx=0;ctx<3;ctx++){let h1=this.models.prob_xmitted[ctx];for(let mode=0;mode<10;mode++){let mdl=this.models.mbtype_models[ctx][mode],cnt=new Uint32Array(10),total=0;for(let i=0;i<10;i++){if(i==mode)continue;cnt[i]=100*h1[i*2];total+=cnt[i]}let sum=h1[mode*2]+h1[mode*2+1];mdl.probs[9]=255-rescale_mb_mode_prob(h1[mode*2+1],sum);let g1=cnt[0]+cnt[2],g2=cnt[3]+cnt[4],g3=cnt[5]+cnt[6],g4=cnt[8]+cnt[9],g5=cnt[1]+cnt[7];mdl.probs[0]=1+rescale_mb_mode_prob(g1+g2,total),mdl.probs[1]=1+rescale_mb_mode_prob(g1,g1+g2),mdl.probs[2]=1+rescale_mb_mode_prob(g5,g5+g3+g4),mdl.probs[3]=1+rescale_mb_mode_prob(cnt[0],g1),mdl.probs[4]=1+rescale_mb_mode_prob(cnt[3],g2),mdl.probs[5]=1+rescale_mb_mode_prob(cnt[1],g5),mdl.probs[6]=1+rescale_mb_mode_prob(g3,g3+g4),mdl.probs[7]=1+rescale_mb_mode_prob(cnt[5],g3),mdl.probs[8]=1+rescale_mb_mode_prob(cnt[8],g4)}}}find_mv_pred(ref_id){const CAND_POS=[new Int8Array([-1,0]),new Int8Array([0,-1]),new Int8Array([-1,-1]),new Int8Array([-1,1]),new Int8Array([-2,0]),new Int8Array([0,-2]),new Int8Array([-1,-2]),new Int8Array([-2,-1]),new Int8Array([-2,1]),new Int8Array([-1,2]),new Int8Array([-2,-2]),new Int8Array([-2,2])];let nearest_mv=ZERO_MV,near_mv=ZERO_MV,pred_mv=ZERO_MV,num_mv=0;for(let i=0;i<CAND_POS.length;i++){let[yoff,xoff]=CAND_POS[i];let cx=(this.fstate.mb_x)+xoff,cy=(this.fstate.mb_y)+yoff;if((cx<0)||(cy<0))continue;if((cx>=this.mb_w)||(cy>=this.mb_h))continue;let mb_pos=cx+cy*this.mb_w;let mv=this.mb_info[mb_pos].mv;if((this.mb_info[mb_pos].mb_type.get_ref_id()!=ref_id)||mv.eq(ZERO_MV))continue;if(num_mv==0){nearest_mv=mv,num_mv+=1;if((this.version>5)&&(i<2))pred_mv=mv}else if(!(mv.eq(nearest_mv))){near_mv=mv,num_mv+=1;break}}return[num_mv,nearest_mv,near_mv,pred_mv]}decode_mb_type(bc,ctx){let probs=this.models.mbtype_models[ctx][map_mb_type(this.last_mbt)].probs;if(!bc.read_prob(probs[9]))this.last_mbt=bc.read_prob(probs[0])?(bc.read_prob(probs[2])?(bc.read_prob(probs[6])?(bc.read_prob(probs[8])?new M(M.GoldenNear):new M(M.GoldenNearest)):(bc.read_prob(probs[7])?new M(M.GoldenMV):new M(M.GoldenNoMV))):(bc.read_prob(probs[5])?new M(M.InterFourMV):new M(M.Intra))):(bc.read_prob(probs[1])?(bc.read_prob(probs[4])?new M(M.InterNear):new M(M.InterNearest)):(bc.read_prob(probs[3])?new M(M.InterMV):new M(M.InterNoMV)));return this.last_mbt}decode_mb(frm,bc,cr,br,hdr,alpha){const FOURMV_SUB_TYPE=[new M(M.InterNoMV),new M(M.InterMV),new M(M.InterNearest),new M(M.InterNear)];let mb_x=this.fstate.mb_x,mb_y=this.fstate.mb_y;this.coeffs[0].fill(0);this.coeffs[1].fill(0);this.coeffs[2].fill(0);this.coeffs[3].fill(0);this.coeffs[4].fill(0);this.coeffs[5].fill(0);let mb_pos=mb_x+mb_y*this.mb_w;let four_mv=[ZERO_MV,ZERO_MV,ZERO_MV,ZERO_MV];let four_mbt=[new M(M.Intra),new M(M.Intra),new M(M.Intra),new M(M.Intra)];if(hdr.interlaced){let iprob=this.ilace_prob,prob;if(mb_x==0)prob=iprob;else if(!this.ilace_mb)prob=(iprob+((((256-iprob)>>1))<<24>>>24))<<24>>>24;else prob=(iprob-(iprob>>1))<<24>>>24;this.ilace_mb=bc.read_prob(prob)}let num_mv,nearest_mv,near_mv,pred_mv;if(hdr.is_intra)num_mv=0,nearest_mv=ZERO_MV,near_mv=ZERO_MV,pred_mv=ZERO_MV;else{var ggdfd=this.find_mv_pred(VP_REF_INTER);num_mv=ggdfd[0],nearest_mv=ggdfd[1],near_mv=ggdfd[2],pred_mv=ggdfd[3]}let mb_type;if(hdr.is_intra)mb_type=new M(M.Intra);else mb_type=this.decode_mb_type(bc,(num_mv+1)% 3);this.mb_info[mb_pos].mb_type=mb_type;if(mb_type.get_ref_id()!=VP_REF_GOLDEN){switch(mb_type.type){case M.Intra:case M.InterNoMV:this.mb_info[mb_pos].mv=ZERO_MV;break;case M.InterMV:let diff_mv=this.decode_mv(bc,br);this.mb_info[mb_pos].mv=pred_mv.add(diff_mv);break;case M.InterNearest:this.mb_info[mb_pos].mv=nearest_mv;break;case M.InterNear:this.mb_info[mb_pos].mv=near_mv;break;case M.InterFourMV:for(var i=0;i<4;i++)four_mbt[i]=FOURMV_SUB_TYPE[bc.read_bits(2)];for(var i=0;i<4;i++){switch(four_mbt[i].type){case M.InterNoMV:break;case M.InterMV:let diff_mv=this.decode_mv(bc,br);four_mv[i]=pred_mv.add(diff_mv);break;case M.InterNearest:four_mv[i]=nearest_mv;break;case M.InterNear:four_mv[i]=near_mv;break;default:throw new Error("unreachable")}}this.mb_info[mb_pos].mv=four_mv[3];break;default:throw new Error("unreachable")}}else{let[_num_mv,nearest_mv,near_mv,pred_mv]=this.find_mv_pred(VP_REF_GOLDEN);switch(mb_type.type){case M.GoldenNoMV:this.mb_info[mb_pos].mv=ZERO_MV;break;case M.GoldenMV:let diff_mv=this.decode_mv(bc,br);this.mb_info[mb_pos].mv=pred_mv.add(diff_mv);break;case M.GoldenNearest:this.mb_info[mb_pos].mv=nearest_mv;break;case M.GoldenNear:this.mb_info[mb_pos].mv=near_mv;break}}if(!mb_type.is_intra()&&(mb_type.type!=M.InterFourMV))this.do_mc(br,frm,mb_type,this.mb_info[mb_pos].mv,alpha);else if(mb_type.type==M.InterFourMV)this.do_fourmv(br,frm,four_mv,alpha);for(var blk_no=0;blk_no<4;blk_no++){this.fstate.plane=(!alpha?0:3);this.fstate.ctx_idx=blk_no>>1;this.fstate.top_ctx=this.top_ctx[this.fstate.plane][mb_x*2+(blk_no&1)];switch(cr.type){case Q.None:br.decode_block(bc,this.coeffs[blk_no],this.models.coeff_models[0],this.models.vp6models,this.fstate);break;case Q.Bool:br.decode_block(cr.value,this.coeffs[blk_no],this.models.coeff_models[0],this.models.vp6models,this.fstate);break;case Q.Huff:br.decode_block_huff(cr.value,this.coeffs[blk_no],this.models.vp6models,this.models.vp6huff,this.fstate);break}this.top_ctx[this.fstate.plane][mb_x*2+(blk_no&1)]=this.fstate.top_ctx;this.predict_dc(mb_type,mb_pos,blk_no,alpha);let bx=mb_x*2+(blk_no&1);let by=mb_y*2+(blk_no>>1);let has_ac=(this.fstate.last_idx[this.fstate.ctx_idx]>0);if(mb_type.is_intra()){if(!this.ilace_mb){if(has_ac)vp_put_block(this.coeffs[blk_no],bx,by,this.fstate.plane,frm);else vp_put_block_dc(this.coeffs[blk_no],bx,by,this.fstate.plane,frm)}else vp_put_block_ilace(this.coeffs[blk_no],bx,by,this.fstate.plane,frm)}else{if(!this.ilace_mb){if(has_ac)vp_add_block(this.coeffs[blk_no],bx,by,this.fstate.plane,frm);else vp_add_block_dc(this.coeffs[blk_no],bx,by,this.fstate.plane,frm)}else vp_add_block_ilace(this.coeffs[blk_no],bx,by,this.fstate.plane,frm)}}for(var blk_no=4;blk_no<6;blk_no++){this.fstate.plane=blk_no-3;this.fstate.ctx_idx=blk_no-2;this.fstate.top_ctx=this.top_ctx[this.fstate.plane][mb_x];switch(cr.type){case Q.None:br.decode_block(bc,this.coeffs[blk_no],this.models.coeff_models[1],this.models.vp6models,this.fstate);break;case Q.Bool:br.decode_block(cr.value,this.coeffs[blk_no],this.models.coeff_models[1],this.models.vp6models,this.fstate);break;case Q.Huff:br.decode_block_huff(cr.value,this.coeffs[blk_no],this.models.vp6models,this.models.vp6huff,this.fstate);break}this.top_ctx[this.fstate.plane][mb_x]=this.fstate.top_ctx;this.predict_dc(mb_type,mb_pos,blk_no,alpha);if(!alpha){let has_ac=this.fstate.last_idx[this.fstate.ctx_idx]>0;if(mb_type.is_intra()){if(has_ac)vp_put_block(this.coeffs[blk_no],mb_x,mb_y,this.fstate.plane,frm);else vp_put_block_dc(this.coeffs[blk_no],mb_x,mb_y,this.fstate.plane,frm)}else{if(has_ac)vp_add_block(this.coeffs[blk_no],mb_x,mb_y,this.fstate.plane,frm);else vp_add_block_dc(this.coeffs[blk_no],mb_x,mb_y,this.fstate.plane,frm)}}}}do_mc(br,frm,mb_type,mv,alpha){let x=this.fstate.mb_x*16,y=this.fstate.mb_y*16,plane=((!alpha)?0:3),src;if(mb_type.get_ref_id()==VP_REF_INTER)src=this.shuf.get_last();else src=this.shuf.get_golden();br.mc_block(frm,this.mc_buf,src,plane,x+0,y+0,mv,this.loop_thr);br.mc_block(frm,this.mc_buf,src,plane,x+8,y+0,mv,this.loop_thr);br.mc_block(frm,this.mc_buf,src,plane,x+0,y+8,mv,this.loop_thr);br.mc_block(frm,this.mc_buf,src,plane,x+8,y+8,mv,this.loop_thr);if(!alpha){let x=this.fstate.mb_x*8,y=this.fstate.mb_y*8;br.mc_block(frm,this.mc_buf,src,1,x,y,mv,this.loop_thr);br.mc_block(frm,this.mc_buf,src,2,x,y,mv,this.loop_thr)}}do_fourmv(br,frm,mvs,alpha){let x=this.fstate.mb_x*16,y=this.fstate.mb_y*16,plane=((!alpha)?0:3),src=this.shuf.get_last();for(let blk_no=0;blk_no<4;blk_no++)br.mc_block(frm,this.mc_buf,src,plane,x+(blk_no&1)*8,y+(blk_no&2)*4,mvs[blk_no],this.loop_thr);if(!alpha){let x=this.fstate.mb_x*8,y=this.fstate.mb_y*8;let sum=mvs[0].add(mvs[1].add(mvs[2].add(mvs[3])));let mv=new B((sum.x/4)|0,(sum.y/4)|0);br.mc_block(frm,this.mc_buf,src,1,x,y,mv,this.loop_thr);br.mc_block(frm,this.mc_buf,src,2,x,y,mv,this.loop_thr)}}decode_mv(bc,br){let x=br.decode_mv(bc,this.models.mv_models[0]);let y=br.decode_mv(bc,this.models.mv_models[1]);return new B(x,y)}predict_dc(mb_type,_mb_pos,blk_no,_alpha){let is_luma=blk_no<4,plane,dcs;switch(blk_no){case 4:plane=1;dcs=this.dc_pred.dc_u;break;case 5:plane=2;dcs=this.dc_pred.dc_v;break;default:plane=0;dcs=this.dc_pred.dc_y}let dc_ref;let dc_idx;if(is_luma)dc_ref=this.dc_pred.ref_y,dc_idx=this.dc_pred.y_idx+(blk_no&1);else dc_ref=this.dc_pred.ref_c,dc_idx=this.dc_pred.c_idx;let ref_id=mb_type.get_ref_id(),dc_pred=0,count=0,has_left_blk=is_luma&&((blk_no&1)==1);if(has_left_blk||this.dc_pred.ref_left==ref_id){var _=0;switch(blk_no){case 0:case 1:_=this.dc_pred.ldc_y[0];break;case 2:case 3:_=this.dc_pred.ldc_y[1];break;case 4:_=this.dc_pred.ldc_u;break;default:_=this.dc_pred.ldc_v}dc_pred+=_,count+=1}if(dc_ref[dc_idx]==ref_id)dc_pred+=dcs[dc_idx],count+=1;if(this.version==5){if((count<2)&&(dc_ref[dc_idx-1]==ref_id))dc_pred+=dcs[dc_idx-1],count+=1;if((count<2)&&(dc_ref[dc_idx+1]==ref_id))dc_pred+=dcs[dc_idx+1],count+=1}if(count==0)dc_pred=this.last_dc[ref_id][plane];else if(count==2)dc_pred/=2,dc_pred=dc_pred|0;this.coeffs[blk_no][0]+=dc_pred;let dc=this.coeffs[blk_no][0];if(blk_no!=4)dc_ref[dc_idx]=ref_id;switch(blk_no){case 0:case 1:this.dc_pred.ldc_y[0]=dc;break;case 2:case 3:this.dc_pred.ldc_y[1]=dc;break;case 4:this.dc_pred.ldc_u=dc;break;default:this.dc_pred.ldc_v=dc;this.dc_pred.ref_left=ref_id}dcs[dc_idx]=dc;this.last_dc[ref_id][plane]=dc;this.coeffs[blk_no][0]*=this.fstate.dc_quant}}function update_scan(_){let idx=1;for(var band=0;band<16;band++)for(var i=1;i<64;i++)if(_.scan_order[i]==band)_.scan[idx]=i,idx+=1;for(var i=1;i<64;i++)_.zigzag[i]=ZIGZAG[_.scan[i]]}function reset_scan(_,a){if(!a)_.scan_order.set(VP6_DEFAULT_SCAN_ORDER,0);else _.scan_order.set(VP6_INTERLACED_SCAN_ORDER,0);for(var i=0;i<64;i++)_.scan[i]=i;_.zigzag.set(ZIGZAG,0)}function expand_token_bc(bc,val_probs,token,version){let sign=false,level;if(token<TOKEN_LARGE){if(token!=0)sign=bc.read_bool();level=token}else{let cat=bc.read_prob(val_probs[6])?(bc.read_prob(val_probs[8])?(bc.read_prob(val_probs[10])?5:4):(bc.read_prob(val_probs[9])?3:2)):(bc.read_prob(val_probs[7])?1:0);if(version==5)sign=bc.read_bool();let add=0,add_probs=VP56_COEF_ADD_PROBS[cat];for(var i=0;i<add_probs.length;i++){var prob=add_probs[i];if(prob==128)break;add=(add<<1)|bc.read_prob(prob)}if(version!=5)sign=bc.read_bool();level=(VP56_COEF_BASE[cat]+add)|0}if(!sign)return level;else return -level}function decode_token_bc(bc,probs,prob34,is_dc,has_nnz){if(has_nnz&&!bc.read_prob(probs[0])){if(is_dc||bc.read_prob(probs[1]))return 0;else return TOKEN_EOB}else return(bc.read_prob(probs[2])?(bc.read_prob(probs[3])?TOKEN_LARGE:(bc.read_prob(probs[4])?(bc.read_prob(prob34)?4:3):2)):1)<<24>>>24}function decode_zero_run_bc(bc,probs){let val=bc.read_prob(probs[0])?(bc.read_prob(probs[4])?42:(bc.read_prob(probs[5])?(bc.read_prob(probs[7])?7:6):(bc.read_prob(probs[6])?5:4))):(bc.read_prob(probs[1])?(bc.read_prob(probs[3])?3:2):(bc.read_prob(probs[2])?1:0));if(val!=42)return val;else{let nval=8;for(var i=0;i<6;i++)nval+=(bc.read_prob(probs[i+8]))<<i;return nval}}function decode_eob_run_huff(br){let val=br.read(2);switch(val){case 0:return 0;case 1:return 1;case 2:let _val=br.read(2);return _val+2;default:var r=br.read_bool();return r?(br.read(6)+10):(br.read(2)+6)}}function decode_token_huff(br,huff){let tok=br.read_huff(huff);switch(tok){case 0:return[0,false];case 1:case 2:case 3:case 4:var r=br.read_bool();return[r?(-tok):tok,false];case 5:case 6:case 7:case 8:case 9:case 10:let base=(tok-5),add_bits=br.read(VP6_COEF_ADD_BITS[base]),val=VP56_COEF_BASE[base]+add_bits;var r=br.read_bool();return[r?(-val):val,false];default:return[0,true]}}function decode_zero_run_huff(br,huff){let val=br.read_huff(huff);return(val<8)?val:(br.read(6)+8)}function get_block(_,dstride,s1,comp,dx,dy,mv_x,mv_y){let[w,h]=s1.get_dimensions(comp);let sx=dx+mv_x,sy=dy+mv_y;if((sx-2<0)||(sx+8+2>(w))||(sy-2<0)||(sy+8+2>(h)))edge_emu(s1,sx-2,sy-2,8+2+2,8+2+2,_,dstride,comp,0);else{let sstride=s1.get_stride(comp),soff=s1.get_offset(comp),o1=s1.get_data();let u=soff+((sx-2))+((sy-2))*sstride,_t=12,a=0,b=0;while(_t--)_[a+0]=o1[(u+b)+0],_[a+1]=o1[(u+b)+1],_[a+2]=o1[(u+b)+2],_[a+3]=o1[(u+b)+3],_[a+4]=o1[(u+b)+4],_[a+5]=o1[(u+b)+5],_[a+6]=o1[(u+b)+6],_[a+7]=o1[(u+b)+7],_[a+8]=o1[(u+b)+8],_[a+9]=o1[(u+b)+9],_[a+10]=o1[(u+b)+10],_[a+11]=o1[(u+b)+11],a+=dstride,b+=sstride}}function calc_variance(var_off,src,stride){let sum=0,ssum=0,j=0,pix;for(let _=0;_<4;_++){for(let a=0;a<4;a++)pix=src[(var_off+j)+(a*2)],sum+=pix,ssum+=pix*pix;j+=stride*2}return(ssum*16-sum*sum)>>8}function mc_filter_bilinear(a,b,c){return(a*(8-c)+b*c+4)>>3}function mc_bilinear(dst_offest,dst,dstride,src,soff,sstride,mx,my){if(my==0){var dline_offest=0;for(let _=0;_<8;_++){for(let i=0;i<8;i++)dst[(dst_offest+dline_offest)+i]=mc_filter_bilinear(src[soff+i],src[soff+i+1],mx);soff+=sstride,dline_offest+=dstride}}else if(mx==0){var dline_offest=0;for(let _=0;_<8;_++){for(let i=0;i<8;i++)dst[(dst_offest+dline_offest)+i]=mc_filter_bilinear(src[soff+i],src[soff+i+sstride],my);soff+=sstride,dline_offest+=dstride}}else{let tmp=new Uint8Array(8);for(let i=0;i<8;i++)tmp[i]=mc_filter_bilinear(src[soff+i],src[soff+i+1],mx);soff+=sstride;var dline_offest=0;for(let _=0;_<8;_++){for(let i=0;i<8;i++){let cur=mc_filter_bilinear(src[soff+i],src[soff+i+1],mx);dst[(dst_offest+dline_offest)+i]=mc_filter_bilinear(tmp[i],cur,my);tmp[i]=cur}soff+=sstride,dline_offest+=dstride}}}function mc_filter_bicubic($src,$off,$step,$coeffs){return(Math.max(Math.min((($src[$off-$step]*$coeffs[0]+$src[$off]*$coeffs[1]+$src[$off+$step]*$coeffs[2]+$src[$off+$step*2]*$coeffs[3]+64)>>7),255),0))|0}function mc_bicubic(dst_offest,dst,dstride,src,soff,sstride,coeffs_w,coeffs_h){if(coeffs_h[1]==128){var dline_offest=0;for(let _=0;_<8;_++){for(let i=0;i<8;i++)dst[(dst_offest+dline_offest)+i]=mc_filter_bicubic(src,soff+i,1,coeffs_w);soff+=sstride,dline_offest+=dstride}}else if(coeffs_w[1]==128){var dline_offest=0;for(let _=0;_<8;_++){for(let i=0;i<8;i++)dst[(dst_offest+dline_offest)+i]=mc_filter_bicubic(src,soff+i,sstride,coeffs_h);soff+=sstride,dline_offest+=dstride}}else{let buf=new Uint8Array(16*11),a=0,_soff=16;soff-=sstride;for(let _=0;_<11;_++){for(let i=0;i<8;i++)buf[a+i]=mc_filter_bicubic(src,soff+i,1,coeffs_w);soff+=sstride,a+=16}a=0;for(let _=0;_<8;_++){for(let i=0;i<8;i++)dst[(dst_offest+a)+i]=mc_filter_bicubic(buf,_soff+i,16,coeffs_h);_soff+=16,a+=dstride}}}class VP6BR{constructor(){this.vpversion=0,this.profile=0,this.interlaced=false,this.do_pm=false,this.loop_mode=0,this.autosel_pm=false,this.var_thresh=0,this.mv_thresh=0,this.bicubic=false,this.filter_alpha=0}parseHeader(bc){let hdr=new P();let src=bc.src;let br=new A(src);hdr.is_intra=!br.read_bool(),hdr.is_golden=hdr.is_intra,hdr.quant=br.read(6),hdr.multistream=br.read_bool();if(hdr.is_intra){hdr.version=br.read(5);if(!((hdr.version>=6)&&(hdr.version<=8)))throw new Error("ValidationError");hdr.profile=br.read(2);if(!((hdr.profile==0)||(hdr.profile==3)))throw new Error("ValidationError");hdr.interlaced=br.read_bool()}else hdr.version=this.vpversion,hdr.profile=this.profile,hdr.interlaced=this.interlaced;if(hdr.multistream||(hdr.profile==0)){hdr.offset=br.read(16);if(!(hdr.offset>(hdr.is_intra?6:2)))throw new Error("ValidationError");hdr.multistream=true}let bytes=br.tell()>>3;bc.skip_bytes(bytes);this.loop_mode=0;if(hdr.is_intra){hdr.mb_h=bc.read_bits(8),hdr.mb_w=bc.read_bits(8),hdr.disp_h=bc.read_bits(8),hdr.disp_w=bc.read_bits(8);if(!((hdr.mb_h>0)&&(hdr.mb_w>0)))throw new Error("ValidationError");hdr.scale=bc.read_bits(2)}else{hdr.is_golden=bc.read_bool();if(hdr.profile==3){this.loop_mode=+bc.read_bool();if(this.loop_mode!=0){this.loop_mode+=+bc.read_bool();if(!(this.loop_mode<=1))throw new Error("ValidationError")}if(hdr.version==8)this.do_pm=bc.read_bool()}}if((hdr.profile==3)&&(hdr.is_intra||this.do_pm)){this.autosel_pm=bc.read_bool();if(this.autosel_pm){this.var_thresh=bc.read_bits(5);if(hdr.version!=8)this.var_thresh<<=5;this.mv_thresh=bc.read_bits(3)}else this.bicubic=bc.read_bool();if(hdr.version==8)this.filter_alpha=bc.read_bits(4);else this.filter_alpha=16}hdr.use_huffman=bc.read_bool(),this.vpversion=hdr.version,this.profile=hdr.profile,this.interlaced=hdr.interlaced;return hdr}decode_mv(bc,model){let val;if(!bc.read_prob(model.nz_prob))val=bc.read_prob(model.tree_probs[0])?(bc.read_prob(model.tree_probs[4])?(bc.read_prob(model.tree_probs[6])?7:6):(bc.read_prob(model.tree_probs[5])?5:4)):(bc.read_prob(model.tree_probs[1])?(bc.read_prob(model.tree_probs[3])?3:2):(bc.read_prob(model.tree_probs[2])?1:0));else{let raw=0;for(var i=0;i<LONG_VECTOR_ORDER.length;i++){var ord=LONG_VECTOR_ORDER[i];raw|=bc.read_prob(model.raw_probs[ord])<<ord}if((raw&0xF0)!=0)raw|=bc.read_prob(model.raw_probs[3])<<3;else raw|=1<<3;val=raw}if((val!=0)&&bc.read_prob(model.sign_prob))return-val;else return val}reset_models(models){for(var i=0;i<models.mv_models.length;i++){var mdl=models.mv_models[i];mdl.nz_prob=NZ_PROBS[i],mdl.sign_prob=128,mdl.raw_probs.set(RAW_PROBS[i],0),mdl.tree_probs.set(TREE_PROBS[i],0)}models.vp6models.zero_run_probs[0].set(ZERO_RUN_PROBS[0],0),models.vp6models.zero_run_probs[1].set(ZERO_RUN_PROBS[1],0),reset_scan(models.vp6models,this.interlaced)}decode_mv_models(bc,models){for(let comp=0;comp<2;comp++){if(bc.read_prob(HAS_NZ_PROB[comp]))models[comp].nz_prob=bc.read_probability();if(bc.read_prob(HAS_SIGN_PROB[comp]))models[comp].sign_prob=bc.read_probability()}for(let comp=0;comp<2;comp++)for(let i=0;i<HAS_TREE_PROB[comp].length;i++){const prob=HAS_TREE_PROB[comp][i];if(bc.read_prob(prob))models[comp].tree_probs[i]=bc.read_probability()}for(let comp=0;comp<2;comp++)for(let i=0;i<HAS_RAW_PROB[comp].length;i++){const prob=HAS_RAW_PROB[comp][i];if(bc.read_prob(prob))models[comp].raw_probs[i]=bc.read_probability()}}decode_coeff_models(bc,models,is_intra){let def_prob=new Uint8Array(11);def_prob.fill(128);for(var plane=0;plane<2;plane++)for(var i=0;i<11;i++)if(bc.read_prob(HAS_COEF_PROBS[plane][i])){def_prob[i]=bc.read_probability();models.coeff_models[plane].dc_value_probs[i]=def_prob[i]}else if(is_intra)models.coeff_models[plane].dc_value_probs[i]=def_prob[i];if(bc.read_bool()){for(var i=1;i<64;i++)if(bc.read_prob(HAS_SCAN_UPD_PROBS[i]))models.vp6models.scan_order[i]=bc.read_bits(4);update_scan(models.vp6models)}else reset_scan(models.vp6models,this.interlaced);for(var comp=0;comp<2;comp++)for(var i=0;i<14;i++)if(bc.read_prob(HAS_ZERO_RUN_PROBS[comp][i]))models.vp6models.zero_run_probs[comp][i]=bc.read_probability();for(var ctype=0;ctype<3;ctype++)for(var plane=0;plane<2;plane++)for(var group=0;group<6;group++)for(var i=0;i<11;i++)if(bc.read_prob(VP6_AC_PROBS[ctype][plane][group][i])){def_prob[i]=bc.read_probability();models.coeff_models[plane].ac_val_probs[ctype][group][i]=def_prob[i]}else if(is_intra)models.coeff_models[plane].ac_val_probs[ctype][group][i]=def_prob[i];for(var plane=0;plane<2;plane++){let mdl=models.coeff_models[plane];for(var i=0;i<3;i++)for(var k=0;k<5;k++)mdl.dc_token_probs[0][i][k]=rescale_prob(mdl.dc_value_probs[k],VP6_DC_WEIGHTS[k][i],255)}}decode_block(bc,coeffs,model,vp6model,fstate){var left_ctx=fstate.coeff_cat[fstate.ctx_idx][0],top_ctx=fstate.top_ctx;var dc_mode=top_ctx+left_ctx;var token=decode_token_bc(bc,model.dc_token_probs[0][dc_mode],model.dc_value_probs[5],true,true);var val=expand_token_bc(bc,model.dc_value_probs,token,6);coeffs[0]=val,fstate.last_idx[fstate.ctx_idx]=0;var idx=1;var last_val=val;while(idx<64){var ac_band=VP6_IDX_TO_AC_BAND[idx],ac_mode=Math.min(Math.abs(last_val),2);var has_nnz=(idx==1)||(last_val!=0);var _token=decode_token_bc(bc,model.ac_val_probs[ac_mode][ac_band],model.ac_val_probs[ac_mode][ac_band][5],false,has_nnz);if(_token==42)break;var _val=expand_token_bc(bc,model.ac_val_probs[ac_mode][ac_band],_token,6);coeffs[vp6model.zigzag[idx]]=_val*fstate.ac_quant;idx+=1,last_val=_val;if(_val==0){idx+=decode_zero_run_bc(bc,vp6model.zero_run_probs[(idx>=7)?1:0]);if(!(idx<=64))throw new Error("ValidationError")}}fstate.coeff_cat[fstate.ctx_idx][0]=(coeffs[0]!=0)?1:0,fstate.top_ctx=fstate.coeff_cat[fstate.ctx_idx][0],fstate.last_idx[fstate.ctx_idx]=idx}decode_block_huff(br,coeffs,vp6model,model,fstate){var plane=((fstate.plane==0)||(fstate.plane==3))?0:1;var last_val;if(fstate.dc_zero_run[plane]==0){var[val,eob]=decode_token_huff(br,model.dc_token_tree[plane]);if(eob)return;last_val=val,coeffs[0]=val;if(val==0)fstate.dc_zero_run[plane]=decode_eob_run_huff(br)}else last_val=0,fstate.dc_zero_run[plane]-=1;if(fstate.ac_zero_run[plane]>0){fstate.ac_zero_run[plane]-=1;fstate.last_idx[fstate.ctx_idx]=0;return}var idx=1;while(idx<64){var ac_band=Math.min(VP6_IDX_TO_AC_BAND[idx],3),ac_mode=Math.min(Math.abs(last_val),2);var[val,eob]=decode_token_huff(br,model.ac_token_tree[plane][ac_mode][ac_band]);if(eob){if(idx==1)fstate.ac_zero_run[plane]=decode_eob_run_huff(br);break}coeffs[vp6model.zigzag[idx]]=val*fstate.ac_quant;idx+=1,last_val=val;if(val==0){idx+=decode_zero_run_huff(br,model.zero_run_tree[(idx>=7)?1:0]);if(!(idx<=64))throw new Error("ValidationError")}}fstate.last_idx[fstate.ctx_idx]=idx}mc_block(dst,mc_buf,src,plane,x,y,mv,loop_str){let is_luma=(plane!=1)&&(plane!=2);let sx,sy,mx,my,msx,msy;if(is_luma)sx=mv.x>>2,sy=mv.y>>2,mx=(mv.x&3)<<1,my=(mv.y&3)<<1,msx=(mv.x/4)|0,msy=(mv.y/4)|0;else sx=mv.x>>3,sy=mv.y>>3,mx=mv.x&7,my=mv.y&7,msx=(mv.x/8)|0,msy=(mv.y/8)|0;let tmp_blk=mc_buf.get_data();get_block(tmp_blk,16,src,plane,x,y,sx,sy);if((msx&7)!=0){let foff=(8-(sx&7));let off=2+foff;vp31_loop_filter(tmp_blk,off,1,16,12,loop_str)}if((msy&7)!=0){let foff=(8-(sy&7));let off=(2+foff)*16;vp31_loop_filter(tmp_blk,off,16,1,12,loop_str)}let copy_mode=(mx==0)&&(my==0);let bicubic=!copy_mode&&is_luma&&this.bicubic;if(is_luma&&!copy_mode&&(this.profile==3)){if(!this.autosel_pm)bicubic=true;else{let mv_limit=1<<(this.mv_thresh+1);if((Math.abs(mv.x)<=mv_limit)&&(Math.abs(mv.y)<=mv_limit)){let var_off=16*2+2;if(mv.x<0)var_off+=1;if(mv.y<0)var_off+=16;let _var=calc_variance(var_off,tmp_blk,16);if(_var>=this.var_thresh)bicubic=true}}}let dstride=dst.stride[plane];let dbuf=dst.data;let h4=dst.offset[plane]+x+y*dstride;if(copy_mode){let h3=2*16+2,h1=0,h2=0;for(let _=0;_<8;_++)dbuf[(h4+h1)+0]=tmp_blk[(h3+h2)+0],dbuf[(h4+h1)+1]=tmp_blk[(h3+h2)+1],dbuf[(h4+h1)+2]=tmp_blk[(h3+h2)+2],dbuf[(h4+h1)+3]=tmp_blk[(h3+h2)+3],dbuf[(h4+h1)+4]=tmp_blk[(h3+h2)+4],dbuf[(h4+h1)+5]=tmp_blk[(h3+h2)+5],dbuf[(h4+h1)+6]=tmp_blk[(h3+h2)+6],dbuf[(h4+h1)+7]=tmp_blk[(h3+h2)+7],h1+=dst.stride[plane],h2+=16}else if(bicubic){let coeff_h=VP6_BICUBIC_COEFFS[this.filter_alpha][mx],coeff_v=VP6_BICUBIC_COEFFS[this.filter_alpha][my];mc_bicubic(h4,dbuf,dstride,tmp_blk,16*2+2,16,coeff_h,coeff_v)}else mc_bilinear(h4,dbuf,dstride,tmp_blk,16*2+2,16,mx,my)}}return{VP56Decoder:Z,VP6BR:VP6BR,NADecoderSupport:L,BoolCoder:O,NAVideoInfo:G,YUV420_FORMAT:YUV420_FORMAT,VP_YUVA420_FORMAT:VP_YUVA420_FORMAT}}());
		module.exports = AT_NIHAV_VP6
	},
	"./lib/libtess.js": function(module, exports, __webpack_require__) {
		module.exports = (function(){var n;function t(a,b){return a.b===b.b&&a.a===b.a}function u(a,b){return a.b<b.b||a.b===b.b&&a.a<=b.a}function v(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?d<e?b.a-a.a+d/(d+e)*(a.a-c.a):b.a-c.a+e/(d+e)*(c.a-a.a):0}function x(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?(b.a-c.a)*d+(b.a-a.a)*e:0}function z(a,b){return a.a<b.a||a.a===b.a&&a.b<=b.b}function aa(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?d<e?b.b-a.b+d/(d+e)*(a.b-c.b):b.b-c.b+e/(d+e)*(c.b-a.b):0}function ba(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?(b.b-c.b)*d+(b.b-a.b)*e:0}function ca(a){return u(a.b.a,a.a)}function da(a){return u(a.a,a.b.a)}function A(a,b,c,d){a=0>a?0:a;c=0>c?0:c;return a<=c?0===c?(b+d)/2:b+a/(a+c)*(d-b):d+c/(a+c)*(b-d)};function ea(a){var b=B(a.b);C(b,a.c);C(b.b,a.c);D(b,a.a);return b}function E(a,b){var c=!1,d=!1;a!==b&&(b.a!==a.a&&(d=!0,F(b.a,a.a)),b.d!==a.d&&(c=!0,G(b.d,a.d)),H(b,a),d||(C(b,a.a),a.a.c=a),c||(D(b,a.d),a.d.a=a))}function I(a){var b=a.b,c=!1;a.d!==a.b.d&&(c=!0,G(a.d,a.b.d));a.c===a?F(a.a,null):(a.b.d.a=J(a),a.a.c=a.c,H(a,J(a)),c||D(a,a.d));b.c===b?(F(b.a,null),G(b.d,null)):(a.d.a=J(b),b.a.c=b.c,H(b,J(b)));fa(a)}function K(a){var b=B(a),c=b.b;H(b,a.e);b.a=a.b.a;C(c,b.a);b.d=c.d=a.d;b=b.b;H(a.b,J(a.b));H(a.b,b);a.b.a=b.a;b.b.a.c=b.b;b.b.d=a.b.d;b.f=a.f;b.b.f=a.b.f;return b}function L(a,b){var c=!1,d=B(a),e=d.b;b.d!==a.d&&(c=!0,G(b.d,a.d));H(d,a.e);H(e,b);d.a=a.b.a;e.a=b.a;d.d=e.d=a.d;a.d.a=e;c||D(d,a.d);return d}function B(a){var b=new M,c=new M,d=a.b.h;c.h=d;d.b.h=b;b.h=a;a.b.h=c;b.b=c;b.c=b;b.e=c;c.b=b;c.c=c;return c.e=b}function H(a,b){var c=a.c,d=b.c;c.b.e=b;d.b.e=a;a.c=d;b.c=c}function C(a,b){var c=b.f,d=new N(b,c);c.e=d;b.f=d;c=d.c=a;do c.a=d,c=c.c;while(c!==a)}function D(a,b){var c=b.d,d=new ga(b,c);c.b=d;b.d=d;d.a=a;d.c=b.c;c=a;do c.d=d,c=c.e;while(c!==a)}function fa(a){var b=a.h;a=a.b.h;b.b.h=a;a.b.h=b}function F(a,b){var c=a.c,d=c;do d.a=b,d=d.c;while(d!==c);c=a.f;d=a.e;d.f=c;c.e=d}function G(a,b){var c=a.a,d=c;do d.d=b,d=d.e;while(d!==c);c=a.d;d=a.b;d.d=c;c.b=d};function ha(a){var b=0;Math.abs(a[1])>Math.abs(a[0])&&(b=1);Math.abs(a[2])>Math.abs(a[b])&&(b=2);return b};var O=4*1E150;function P(a,b){a.f+=b.f;a.b.f+=b.b.f}function ia(a,b,c){a=a.a;b=b.a;c=c.a;if(b.b.a===a)return c.b.a===a?u(b.a,c.a)?0>=x(c.b.a,b.a,c.a):0<=x(b.b.a,c.a,b.a):0>=x(c.b.a,a,c.a);if(c.b.a===a)return 0<=x(b.b.a,a,b.a);b=v(b.b.a,a,b.a);a=v(c.b.a,a,c.a);return b>=a}function Q(a){a.a.i=null;var b=a.e;b.a.c=b.c;b.c.a=b.a;a.e=null}function ja(a,b){I(a.a);a.c=!1;a.a=b;b.i=a}function ka(a){var b=a.a.a;do a=R(a);while(a.a.a===b);a.c&&(b=L(S(a).a.b,a.a.e),ja(a,b),a=R(a));return a}function la(a,b,c){var d=new ma;d.a=c;d.e=na(a.f,b.e,d);return c.i=d}function oa(a,b){switch(a.s){case 100130:return 0!==(b&1);case 100131:return 0!==b;case 100132:return 0<b;case 100133:return 0>b;case 100134:return 2<=b||-2>=b}return!1}function pa(a){var b=a.a,c=b.d;c.c=a.d;c.a=b;Q(a)}function T(a,b,c){a=b;for(b=b.a;a!==c;){a.c=!1;var d=S(a),e=d.a;if(e.a!==b.a){if(!d.c){pa(a);break}e=L(b.c.b,e.b);ja(d,e)}b.c!==e&&(E(J(e),e),E(b,e));pa(a);b=d.a;a=d}return b}function U(a,b,c,d,e,f){var g=!0;do la(a,b,c.b),c=c.c;while(c!==d);for(null===e&&(e=S(b).a.b.c);;){d=S(b);c=d.a.b;if(c.a!==e.a)break;c.c!==e&&(E(J(c),c),E(J(e),c));d.f=b.f-c.f;d.d=oa(a,d.f);b.b=!0;!g&&qa(a,b)&&(P(c,e),Q(b),I(e));g=!1;b=d;e=c}b.b=!0;f&&ra(a,b)}function sa(a,b,c,d,e){var f=[b.g[0],b.g[1],b.g[2]];b.d=null;b.d=a.o?a.o(f,c,d,a.c)||null:null;null===b.d&&(e?a.n||(V(a,100156),a.n=!0):b.d=c[0])}function ta(a,b,c){var d=[null,null,null,null];d[0]=b.a.d;d[1]=c.a.d;sa(a,b.a,d,[.5,.5,0,0],!1);E(b,c)}function ua(a,b,c,d,e){var f=Math.abs(b.b-a.b)+Math.abs(b.a-a.a),g=Math.abs(c.b-a.b)+Math.abs(c.a-a.a),h=e+1;d[e]=.5*g/(f+g);d[h]=.5*f/(f+g);a.g[0]+=d[e]*b.g[0]+d[h]*c.g[0];a.g[1]+=d[e]*b.g[1]+d[h]*c.g[1];a.g[2]+=d[e]*b.g[2]+d[h]*c.g[2]}function qa(a,b){var c=S(b),d=b.a,e=c.a;if(u(d.a,e.a)){if(0<x(e.b.a,d.a,e.a))return!1;if(!t(d.a,e.a))K(e.b),E(d,J(e)),b.b=c.b=!0;else if(d.a!==e.a){var c=a.e,f=d.a.h;if(0<=f){var c=c.b,g=c.d,h=c.e,k=c.c,l=k[f];g[l]=g[c.a];k[g[l]]=l;l<=--c.a&&(1>=l?W(c,l):u(h[g[l>>1]],h[g[l]])?W(c,l):va(c,l));h[f]=null;k[f]=c.b;c.b=f}else for(c.c[-(f+1)]=null;0<c.a&&null===c.c[c.d[c.a-1]];)--c.a;ta(a,J(e),d)}}else{if(0>x(d.b.a,e.a,d.a))return!1;R(b).b=b.b=!0;K(d.b);E(J(e),d)}return!0}function wa(a,b){var c=S(b),d=b.a,e=c.a,f=d.a,g=e.a,h=d.b.a,k=e.b.a,l=new N;x(h,a.a,f);x(k,a.a,g);if(f===g||Math.min(f.a,h.a)>Math.max(g.a,k.a))return!1;if(u(f,g)){if(0<x(k,f,g))return!1}else if(0>x(h,g,f))return!1;var r=h,p=f,q=k,y=g,m,w;u(r,p)||(m=r,r=p,p=m);u(q,y)||(m=q,q=y,y=m);u(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);u(q,p)?u(p,y)?(m=v(r,q,p),w=v(q,p,y),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,p.b)):(m=x(r,q,p),w=-x(r,y,p),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,y.b)):l.b=(q.b+p.b)/2;z(r,p)||(m=r,r=p,p=m);z(q,y)||(m=q,q=y,y=m);z(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);z(q,p)?z(p,y)?(m=aa(r,q,p),w=aa(q,p,y),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,p.a)):(m=ba(r,q,p),w=-ba(r,y,p),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,y.a)):l.a=(q.a+p.a)/2;u(l,a.a)&&(l.b=a.a.b,l.a=a.a.a);r=u(f,g)?f:g;u(r,l)&&(l.b=r.b,l.a=r.a);if(t(l,f)||t(l,g))return qa(a,b),!1;if(!t(h,a.a)&&0<=x(h,a.a,l)||!t(k,a.a)&&0>=x(k,a.a,l)){if(k===a.a)return K(d.b),E(e.b,d),b=ka(b),d=S(b).a,T(a,S(b),c),U(a,b,J(d),d,d,!0),!0;if(h===a.a){K(e.b);E(d.e,J(e));f=c=b;g=f.a.b.a;do f=R(f);while(f.a.b.a===g);b=f;f=S(b).a.b.c;c.a=J(e);e=T(a,c,null);U(a,b,e.c,d.b.c,f,!0);return!0}0<=x(h,a.a,l)&&(R(b).b=b.b=!0,K(d.b),d.a.b=a.a.b,d.a.a=a.a.a);0>=x(k,a.a,l)&&(b.b=c.b=!0,K(e.b),e.a.b=a.a.b,e.a.a=a.a.a);return!1}K(d.b);K(e.b);E(J(e),d);d.a.b=l.b;d.a.a=l.a;d.a.h=xa(a.e,d.a);d=d.a;e=[0,0,0,0];l=[f.d,h.d,g.d,k.d];d.g[0]=d.g[1]=d.g[2]=0;ua(d,f,h,e,0);ua(d,g,k,e,2);sa(a,d,l,e,!0);R(b).b=b.b=c.b=!0;return!1}function ra(a,b){for(var c=S(b);;){for(;c.b;)b=c,c=S(c);if(!b.b&&(c=b,b=R(b),null===b||!b.b))break;b.b=!1;var d=b.a,e=c.a,f;if(f=d.b.a!==e.b.a)a:{f=b;var g=S(f),h=f.a,k=g.a,l=void 0;if(u(h.b.a,k.b.a)){if(0>x(h.b.a,k.b.a,h.a)){f=!1;break a}R(f).b=f.b=!0;l=K(h);E(k.b,l);l.d.c=f.d}else{if(0<x(k.b.a,h.b.a,k.a)){f=!1;break a}f.b=g.b=!0;l=K(k);E(h.e,k.b);l.b.d.c=f.d}f=!0}f&&(c.c?(Q(c),I(e),c=S(b),e=c.a):b.c&&(Q(b),I(d),b=R(c),d=b.a));if(d.a!==e.a)if(d.b.a===e.b.a||b.c||c.c||d.b.a!==a.a&&e.b.a!==a.a)qa(a,b);else if(wa(a,b))break;d.a===e.a&&d.b.a===e.b.a&&(P(e,d),Q(b),I(d),b=R(c))}}function ya(a,b){a.a=b;for(var c=b.c;null===c.i;)if(c=c.c,c===b.c){var c=a,d=b,e=new ma;e.a=d.c.b;var f=c.f,g=f.a;do g=g.a;while(null!==g.b&&!f.c(f.b,e,g.b));var f=g.b,h=S(f),e=f.a,g=h.a;if(0===x(e.b.a,d,e.a))e=f.a,t(e.a,d)||t(e.b.a,d)||(K(e.b),f.c&&(I(e.c),f.c=!1),E(d.c,e),ya(c,d));else{var k=u(g.b.a,e.b.a)?f:h,h=void 0;f.d||k.c?(k===f?h=L(d.c.b,e.e):h=L(g.b.c.b,d.c).b,k.c?ja(k,h):(e=c,f=la(c,f,h),f.f=R(f).f+f.a.f,f.d=oa(e,f.f)),ya(c,d)):U(c,f,d.c,d.c,null,!0)}return}c=ka(c.i);e=S(c);f=e.a;e=T(a,e,null);if(e.c===f){var f=e,e=f.c,g=S(c),h=c.a,k=g.a,l=!1;h.b.a!==k.b.a&&wa(a,c);t(h.a,a.a)&&(E(J(e),h),c=ka(c),e=S(c).a,T(a,S(c),g),l=!0);t(k.a,a.a)&&(E(f,J(k)),f=T(a,g,null),l=!0);l?U(a,c,f.c,e,e,!0):(u(k.a,h.a)?d=J(k):d=h,d=L(f.c.b,d),U(a,c,d,d.c,d.c,!1),d.b.i.c=!0,ra(a,c))}else U(a,c,e.c,f,f,!0)}function za(a,b){var c=new ma,d=ea(a.b);d.a.b=O;d.a.a=b;d.b.a.b=-O;d.b.a.a=b;a.a=d.b.a;c.a=d;c.f=0;c.d=!1;c.c=!1;c.h=!0;c.b=!1;d=a.f;d=na(d,d.a,c);c.e=d};function Aa(a){this.a=new Ba;this.b=a;this.c=ia}function na(a,b,c){do b=b.c;while(null!==b.b&&!a.c(a.b,b.b,c));a=new Ba(c,b.a,b);b.a.c=a;return b.a=a};function Ba(a,b,c){this.b=a||null;this.a=b||this;this.c=c||this};function X(){this.d=Y;this.p=this.b=this.q=null;this.j=[0,0,0];this.s=100130;this.n=!1;this.o=this.a=this.e=this.f=null;this.m=!1;this.c=this.r=this.i=this.k=this.l=this.h=null}var Y=0;n=X.prototype;n.x=function(){Z(this,Y)};n.B=function(a,b){switch(a){case 100142:return;case 100140:switch(b){case 100130:case 100131:case 100132:case 100133:case 100134:this.s=b;return}break;case 100141:this.m=!!b;return;default:V(this,100900);return}V(this,100901)};n.y=function(a){switch(a){case 100142:return 0;case 100140:return this.s;case 100141:return this.m;default:V(this,100900)}return!1};n.A=function(a,b,c){this.j[0]=a;this.j[1]=b;this.j[2]=c};n.z=function(a,b){var c=b?b:null;switch(a){case 100100:case 100106:this.h=c;break;case 100104:case 100110:this.l=c;break;case 100101:case 100107:this.k=c;break;case 100102:case 100108:this.i=c;break;case 100103:case 100109:this.p=c;break;case 100105:case 100111:this.o=c;break;case 100112:this.r=c;break;default:V(this,100900)}};n.C=function(a,b){var c=!1,d=[0,0,0];Z(this,2);for(var e=0;3>e;++e){var f=a[e];-1E150>f&&(f=-1E150,c=!0);1E150<f&&(f=1E150,c=!0);d[e]=f}c&&V(this,100155);c=this.q;null===c?(c=ea(this.b),E(c,c.b)):(K(c),c=c.e);c.a.d=b;c.a.g[0]=d[0];c.a.g[1]=d[1];c.a.g[2]=d[2];c.f=1;c.b.f=-1;this.q=c};n.u=function(a){Z(this,Y);this.d=1;this.b=new Ca;this.c=a};n.t=function(){Z(this,1);this.d=2;this.q=null};n.v=function(){Z(this,2);this.d=1};n.w=function(){Z(this,1);this.d=Y;var a=this.j[0],b=this.j[1],c=this.j[2],d=!1,e=[a,b,c];if(0===a&&0===b&&0===c){for(var b=[-2*1E150,-2*1E150,-2*1E150],f=[2*1E150,2*1E150,2*1E150],c=[],g=[],d=this.b.c,a=d.e;a!==d;a=a.e)for(var h=0;3>h;++h){var k=a.g[h];k<f[h]&&(f[h]=k,g[h]=a);k>b[h]&&(b[h]=k,c[h]=a)}a=0;b[1]-f[1]>b[0]-f[0]&&(a=1);b[2]-f[2]>b[a]-f[a]&&(a=2);if(f[a]>=b[a])e[0]=0,e[1]=0,e[2]=1;else{b=0;f=g[a];c=c[a];g=[0,0,0];f=[f.g[0]-c.g[0],f.g[1]-c.g[1],f.g[2]-c.g[2]];h=[0,0,0];for(a=d.e;a!==d;a=a.e)h[0]=a.g[0]-c.g[0],h[1]=a.g[1]-c.g[1],h[2]=a.g[2]-c.g[2],g[0]=f[1]*h[2]-f[2]*h[1],g[1]=f[2]*h[0]-f[0]*h[2],g[2]=f[0]*h[1]-f[1]*h[0],k=g[0]*g[0]+g[1]*g[1]+g[2]*g[2],k>b&&(b=k,e[0]=g[0],e[1]=g[1],e[2]=g[2]);0>=b&&(e[0]=e[1]=e[2]=0,e[ha(f)]=1)}d=!0}g=ha(e);a=this.b.c;b=(g+1)%3;c=(g+2)%3;g=0<e[g]?1:-1;for(e=a.e;e!==a;e=e.e)e.b=e.g[b],e.a=g*e.g[c];if(d){e=0;d=this.b.a;for(a=d.b;a!==d;a=a.b)if(b=a.a,!(0>=b.f)){do e+=(b.a.b-b.b.a.b)*(b.a.a+b.b.a.a),b=b.e;while(b!==a.a)}if(0>e)for(e=this.b.c,d=e.e;d!==e;d=d.e)d.a=-d.a}this.n=!1;e=this.b.b;for(a=e.h;a!==e;a=d)if(d=a.h,b=a.e,t(a.a,a.b.a)&&a.e.e!==a&&(ta(this,b,a),I(a),a=b,b=a.e),b.e===a){if(b!==a){if(b===d||b===d.b)d=d.h;I(b)}if(a===d||a===d.b)d=d.h;I(a)}this.e=e=new Da;d=this.b.c;for(a=d.e;a!==d;a=a.e)a.h=xa(e,a);Ea(e);this.f=new Aa(this);za(this,-O);for(za(this,O);null!==(e=Fa(this.e));){for(;;){a:if(a=this.e,0===a.a)d=Ga(a.b);else if(d=a.c[a.d[a.a-1]],0!==a.b.a&&(a=Ga(a.b),u(a,d))){d=a;break a}if(null===d||!t(d,e))break;d=Fa(this.e);ta(this,e.c,d.c)}ya(this,e)}this.a=this.f.a.a.b.a.a;for(e=0;null!==(d=this.f.a.a.b);)d.h||++e,Q(d);this.f=null;e=this.e;e.b=null;e.d=null;this.e=e.c=null;e=this.b;for(a=e.a.b;a!==e.a;a=d)d=a.b,a=a.a,a.e.e===a&&(P(a.c,a),I(a));if(!this.n){e=this.b;if(this.m)for(a=e.b.h;a!==e.b;a=d)d=a.h,a.b.d.c!==a.d.c?a.f=a.d.c?1:-1:I(a);else for(a=e.a.b;a!==e.a;a=d)if(d=a.b,a.c){for(a=a.a;u(a.b.a,a.a);a=a.c.b);for(;u(a.a,a.b.a);a=a.e);b=a.c.b;for(c=void 0;a.e!==b;)if(u(a.b.a,b.a)){for(;b.e!==a&&(ca(b.e)||0>=x(b.a,b.b.a,b.e.b.a));)c=L(b.e,b),b=c.b;b=b.c.b}else{for(;b.e!==a&&(da(a.c.b)||0<=x(a.b.a,a.a,a.c.b.a));)c=L(a,a.c.b),a=c.b;a=a.e}for(;b.e.e!==a;)c=L(b.e,b),b=c.b}if(this.h||this.i||this.k||this.l)if(this.m)for(e=this.b,d=e.a.b;d!==e.a;d=d.b){if(d.c){this.h&&this.h(2,this.c);a=d.a;do this.k&&this.k(a.a.d,this.c),a=a.e;while(a!==d.a);this.i&&this.i(this.c)}}else{e=this.b;d=!!this.l;a=!1;b=-1;for(c=e.a.d;c!==e.a;c=c.d)if(c.c){a||(this.h&&this.h(4,this.c),a=!0);g=c.a;do d&&(f=g.b.d.c?0:1,b!==f&&(b=f,this.l&&this.l(!!b,this.c))),this.k&&this.k(g.a.d,this.c),g=g.e;while(g!==c.a)}a&&this.i&&this.i(this.c)}if(this.r){e=this.b;for(a=e.a.b;a!==e.a;a=d)if(d=a.b,!a.c){b=a.a;c=b.e;g=void 0;do g=c,c=g.e,g.d=null,null===g.b.d&&(g.c===g?F(g.a,null):(g.a.c=g.c,H(g,J(g))),f=g.b,f.c===f?F(f.a,null):(f.a.c=f.c,H(f,J(f))),fa(g));while(g!==b);b=a.d;a=a.b;a.d=b;b.b=a}this.r(this.b);this.c=this.b=null;return}}this.b=this.c=null};function Z(a,b){if(a.d!==b)for(;a.d!==b;)if(a.d<b)switch(a.d){case Y:V(a,100151);a.u(null);break;case 1:V(a,100152),a.t()}else switch(a.d){case 2:V(a,100154);a.v();break;case 1:V(a,100153),a.w()}}function V(a,b){a.p&&a.p(b,a.c)};function ga(a,b){this.b=a||this;this.d=b||this;this.a=null;this.c=!1};function M(){this.h=this;this.i=this.d=this.a=this.e=this.c=this.b=null;this.f=0}function J(a){return a.b.e};function Ca(){this.c=new N;this.a=new ga;this.b=new M;this.d=new M;this.b.b=this.d;this.d.b=this.b};function N(a,b){this.e=a||this;this.f=b||this;this.d=this.c=null;this.g=[0,0,0];this.h=this.a=this.b=0};function Da(){this.c=[];this.d=null;this.a=0;this.e=!1;this.b=new Ha}function Ea(a){a.d=[];for(var b=0;b<a.a;b++)a.d[b]=b;a.d.sort(function(a){return function(b,e){return u(a[b],a[e])?1:-1}}(a.c));a.e=!0;Ia(a.b)}function xa(a,b){if(a.e){var c=a.b,d=++c.a;2*d>c.f&&(c.f*=2,c.c=Ja(c.c,c.f+1));var e;0===c.b?e=d:(e=c.b,c.b=c.c[c.b]);c.e[e]=b;c.c[e]=d;c.d[d]=e;c.h&&va(c,d);return e}c=a.a++;a.c[c]=b;return-(c+1)}function Fa(a){if(0===a.a)return Ka(a.b);var b=a.c[a.d[a.a-1]];if(0!==a.b.a&&u(Ga(a.b),b))return Ka(a.b);do--a.a;while(0<a.a&&null===a.c[a.d[a.a-1]]);return b};function Ha(){this.d=Ja([0],33);this.e=[null,null];this.c=[0,0];this.a=0;this.f=32;this.b=0;this.h=!1;this.d[1]=1}function Ja(a,b){for(var c=Array(b),d=0;d<a.length;d++)c[d]=a[d];for(;d<b;d++)c[d]=0;return c}function Ia(a){for(var b=a.a;1<=b;--b)W(a,b);a.h=!0}function Ga(a){return a.e[a.d[1]]}function Ka(a){var b=a.d,c=a.e,d=a.c,e=b[1],f=c[e];0<a.a&&(b[1]=b[a.a],d[b[1]]=1,c[e]=null,d[e]=a.b,a.b=e,0<--a.a&&W(a,1));return f}function W(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f<<1;h<a.a&&u(d[c[h+1]],d[c[h]])&&(h+=1);var k=c[h];if(h>a.a||u(d[g],d[k])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}}function va(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f>>1,k=c[h];if(0===h||u(d[k],d[g])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}};function ma(){this.e=this.a=null;this.f=0;this.c=this.b=this.h=this.d=!1}function S(a){return a.e.c.b}function R(a){return a.e.a.b};var _={GluTesselator:X,windingRule:{GLU_TESS_WINDING_ODD:100130,GLU_TESS_WINDING_NONZERO:100131,GLU_TESS_WINDING_POSITIVE:100132,GLU_TESS_WINDING_NEGATIVE:100133,GLU_TESS_WINDING_ABS_GEQ_TWO:100134},primitiveType:{GL_LINE_LOOP:2,GL_TRIANGLES:4,GL_TRIANGLE_STRIP:5,GL_TRIANGLE_FAN:6},errorType:{GLU_TESS_MISSING_BEGIN_POLYGON:100151,GLU_TESS_MISSING_END_POLYGON:100153,GLU_TESS_MISSING_BEGIN_CONTOUR:100152,GLU_TESS_MISSING_END_CONTOUR:100154,GLU_TESS_COORD_TOO_LARGE:100155,GLU_TESS_NEED_COMBINE_CALLBACK:100156},gluEnum:{GLU_TESS_MESH:100112,GLU_TESS_TOLERANCE:100142,GLU_TESS_WINDING_RULE:100140,GLU_TESS_BOUNDARY_ONLY:100141,GLU_INVALID_ENUM:100900,GLU_INVALID_VALUE:100901,GLU_TESS_BEGIN:100100,GLU_TESS_VERTEX:100101,GLU_TESS_END:100102,GLU_TESS_ERROR:100103,GLU_TESS_EDGE_FLAG:100104,GLU_TESS_COMBINE:100105,GLU_TESS_BEGIN_DATA:100106,GLU_TESS_VERTEX_DATA:100107,GLU_TESS_END_DATA:100108,GLU_TESS_ERROR_DATA:100109,GLU_TESS_EDGE_FLAG_DATA:100110,GLU_TESS_COMBINE_DATA:100111}};X.prototype.gluDeleteTess=X.prototype.x;X.prototype.gluTessProperty=X.prototype.B;X.prototype.gluGetTessProperty=X.prototype.y;X.prototype.gluTessNormal=X.prototype.A;X.prototype.gluTessCallback=X.prototype.z;X.prototype.gluTessVertex=X.prototype.C;X.prototype.gluTessBeginPolygon=X.prototype.u;X.prototype.gluTessBeginContour=X.prototype.t;X.prototype.gluTessEndContour=X.prototype.v;X.prototype.gluTessEndPolygon=X.prototype.w;return _}());
	},
	"./src/core/assets/noto-sans-definefont3.bin": function(module, exports, __webpack_require__) {
		var base64 = "AQCMAQpOb3RvIFNhbnMAHwKACAAAgggAAPYIAAAeCQAAjwkAAFQKAACXCwAAhQwAAJoMAAAGDQAAcg0AALUNAADbDQAAHA4AAC4OAACPDgAApQ4AAIMPAADNDwAAdRAAAIcRAADrEQAAtRIAAPkTAAAWFAAAkRUAAMsWAACLFwAAKxgAAEwYAABtGAAAjRgAAKYZAADTGgAAEhsAAKsbAAAbHAAAaxwAAJMcAAC1HAAAMR0AAFkdAACFHQAAvh0AAPIdAAAJHgAAUB4AAJoeAAAaHwAAbR8AAPsfAABZIAAAByEAACQhAAB0IQAAoyEAAAUiAAA6IgAAYCIAAIYiAACjIgAAuSIAANUiAAD2IgAACCMAADIjAADYIwAAbCQAANMkAABjJQAA6CUAADgmAADpJgAARScAAIwnAAD6JwAANigAAEgoAADRKAAAJykAAKUpAAA3KgAAwSoAAAorAACpKwAA/isAAFQsAACPLAAADS0AAEEtAACiLQAAyC0AAHkuAACMLgAARy8AAOkvAADrLwAAODAAAKcwAAATMQAAuTEAAAIyAAAjMgAAJzMAAJQzAACmNAAAMTUAAHM1AACKNQAAnDUAAKc2AAC5NgAALjcAAGQ3AADQNwAAVjgAAIA4AADROAAAEjkAAEs5AACSOQAAvzkAADY6AAB4OgAA9zoAAKE7AAB5PAAAHz0AAIY9AADtPQAAXj4AAAc/AACxPwAAVUAAAJ1AAABSQQAAoUEAAPBBAABKQgAA3UIAADBDAACDQwAA4UMAAHhEAADdRAAAkUUAADlGAADhRgAAk0cAAH1IAABoSQAAn0kAAENKAAC6SgAAMUsAALNLAABuTAAAvEwAABtNAADkTQAAsk4AAIBPAABYUAAAaFEAAHhSAACMUwAAjlQAADlVAADlVQAAkVYAAEhXAAA3WAAAcFgAAKlYAADtWAAAaVkAAB9aAADgWgAAhVsAACpcAADaXAAAwl0AAKpeAAByXwAADWAAAItgAAAJYQAAkmEAAFNiAADbYgAAa2MAADZkAACFZAAAO2UAALllAACeZgAAGmcAAP1nAACVaAAAI2kAAMVpAABeagAABGsAAKBrAAA9bAAA0GwAAE1tAAAEbgAAaW4AAA1vAABFbwAA2W8AAD9wAAACcQAAX3EAABlyAAB9cgAAPnMAAJNzAABEdAAA8nQAANV1AACPdgAAf3cAADB4AAAWeQAAuXkAAJF6AADregAAeXsAAMV7AAA1fAAAy3wAAEd9AACDfQAApH0AAA9+AABffgAAx34AAEp/AACrfwAAvX8AACCAAADSgAAAPYEAAKiBAAADggAAZoIAAKCCAADfggAAGIMAAFaDAACPgwAAzYMAAAaEAABShAAAmYQAAM2EAAD8hAAAbYUAAOuFAABchgAA2YYAAFCHAADThwAARYgAAKWIAAAciQAArIkAADmKAAD4igAAtIsAAIOMAABPjQAA0Y0AALyOAABBjwAAsY8AADaQAACmkAAAMJEAAKWRAAB7kgAAQpMAACKUAADzlAAA5pUAAMqWAACllwAAcZgAANKYAABrmQAAtZkAADGaAABjmgAAx5oAAIGbAABCnAAAopwAAAidAACXnQAALJ4AAOqeAACunwAATaAAAPKgAAB+oQAAEaIAAKaiAABWowAArqMAAEGkAADSpAAAH6UAAGylAADHpQAAIqYAAHWmAADHpgAA/KYAAKSnAABoqAAAyKgAAGKpAADMqQAAVaoAAMWqAABiqwAA6qsAAE+sAADKrAAAI60AALmtAACHrgAArq4AADGvAADgrwAAIrAAAJqwAAA9sQAAzbEAAGWyAACpsgAA6bIAAFGzAACtswAA07MAAGi0AAAAtQAAcLUAAMe1AABStgAA8rYAAKG3AABguAAADrkAAIy5AABJugAAq7oAAFm7AAD3uwAALLwAAMC8AAAqvQAAbb0AAOa9AAApvgAAm74AABS/AACivwAABMAAAEnAAADEwAAAAsEAAD7BAACzwQAANMIAAJ3CAAA4wwAAvcMAADHEAACXxAAAHMUAAI/FAAChxQAAw8UAAP/FAABLxgAA7MYAAIzHAABsyAAAusgAAD3JAAC6yQAAO8oAAPDKAACyywAAHswAAPHMAABKzQAAiM0AADXOAADfzgAAXM8AAN/PAACo0AAAd9EAAE3SAAAp0wAAIdQAAB/VAAD11QAA0dYAAFbXAAAO2AAALdkAALHZAACc2gAA89oAAATcAACU3AAASd0AAPLdAADQ3gAAMN8AAJnfAABW4AAAEOEAAN3hAACn4gAASeMAAOPjAABI5AAAvOQAADDlAADk5QAAh+YAAF/nAADA5wAANOgAAKXoAAAj6QAA7OkAACjrAACX6wAAwOwA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LwEwATEBMgEzATQBNQE2ATcBOAE5AToBOwE8AT0BPgE/AUABQQFCAUMBRAFFAUYBRwFIAUkBSgFLAUwBTQFOAU8BUAFRAVIBUwFUAVUBVgFXAVgBWQFaAVsBXAFdAV4BXwFgAWEBYgFjAWQBZQFmAWcBaAFpAWoBawFsAW0BbgFvAXABcQFyAXMBdAF1AXYBdwF4AXkBegF7AXwBfQF+AX8BgAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEBkgGTAZQBlQGWAZcBmAGZAZoBmwGcAZ0BngGfAaABoQGiAaMBpAGlAaYBpwGoAakBqgGrAawBrQGuAa8BsAGxAbIBswG0AbUBtgG3AbgBuQG6AbsBvAG9Ab4BvwHAAcEBwgHDAcQBxQHGAccByAHJAcoBywHMAc0BzgHPAdAB0QHSAdMB1AHVAdYB1wHYAdkB2gHbAdwB3QHeAd8B4AHhAeIB4wHkAeUB5gHnAegB6QHqAesB7AHtAe4B7wHwAfEB8gHzAfQB9QH2AfcB+AH5AfoB+wH8Af0B/gH/AcYC3AIAIAEgAiADIAQgBSAGIAcgCCAJIAogCyAMIA0gDiAPIBIgEyAUIBUgFiAXIBggGSAaIBsgHCAdIB4gHyAgICEgIiAmICogKyAsIC0gLiAvIDAgMiAzIDQgOSA6IDwgPiBEIF4gaiBrIGwgbSBuIG8goCChIKIgoyCkIKUgpiCnIKggqSCrIKwgrSCuIK8gsCCxILIgsyC0ILUguSC6IAUhEyEWIRchIiEmIS4hTSFOIVMhVCFbIVwhXSFeIYxVcBf8HMgUtB4oKEQ0yC1AQpg6GBpIHEgcmDAQLAAUMBt8FWAiECwQLBAsECwQLBAsECwQLBAsECyYF5gXECwQLBAsaCn0RywzCDSMMnA6iCyQKUg6TDscG+AViDH0KZRIyDyAPnAwgD7EMegriCyEOgwwdErgLlAtyC2EHGAihBwQLOQgaC7sLDgxcCY4MSgtlBs4MXQxoBSgFLwqoBTYSnQxcDA4MTgxDCFcJugcdDGgKOQ+WCrIKKglQB80KxQeECzIFJAVyC3ILcgtyC0QLBgpaC6QQpgctCjILcgZkEIwG0wiyC0MHAwcaC7YMWw0fBUMEgwcFB60KDQ/ND80P8QiLDMsMywzLDMsMywzeEaMMogsiCyILIgsHBscGxwbHBtwOsg8gD6APoA+gD6APhAsgD6EOoQ6hDqEOlAtcDB4Muws7CzsLOws7CzsLCRFcCYoLSgtKC0oLaAUoBSgFKAUcDB0MXAwcDBwMHAwcDAQLHAwdDF0MXQxdDHIKDgxyCgsM+wsLDPsLCwz7CyMMnAmjDJwJowycCaMMnAmcDo4MXA6YDGILCgtiCwoLYgsKC2ILCgtiCwoLUg6ODFIOjgxSDo4MUg6ODFMO3QxTDt0MRwboBQcG6AUHBugFBwboBQcG6AU/DAsKeAVoBSIMbwqvCr0KaAU9CmgFPQpoBT0KQQa9CmgFMg8dDHIPHQxyDx0MVA3yDx0MYA+cDCAPnAwgD5wMExKtEvEMQwhxDEMIcQxDCHoK1wm6CtcJugrXCboK1wmiCzoHIgs6ByILOgchDp0MYQ6dDGEOnQxhDp0MYQ6dDGEOnQxdErkPlAtyChQLcgtqCXILaglyC2oJRgaODFwOjgxODHIMvwwjDKMMjwocDrYQDgxODFcMIgsJDsIL5ApyC1IOqAtxErkGxwbiDG8KqAUXCtsUsg8dDGUPrw+TDEEVqhD2DY4McQx6CtcJqAtxBjoHBgu6ByILGw+6DWUPgwwUC1cK8gtqCW4Lrgu2CfYJ6AtuC44Jwgl9C5UKVQpVCmQFVxnBGDMVsA/lD5UKahSfFEURiwz7CwcG6AUgD5wMIQ6dDGEOnQxhDp0MYQ6dDGEOnQxKC0sM+wsLDPsLHhGJEVIOjgxSDo4MYgxvCqAPnAwgD5wMLgu2CegFFxnBGDMVkg6ODEUS+Q0yDx0MUAz7Cx4RiRFgD5wMAAAAAAAKABQACgAUKQaABRcDcQsfBUEEAwIAAAAAAAAAAAAAMgtACgAUABQECzkIAAZ7BgAFPwNACgAKEghwBwEKQQpFB5gQAAAAAAAAAAAAAAEECReDBKoIEQv2BjYGOwnAChkCnwVAAAAAAAAAAAAAAAAyC3ILcgtyC3ILdhKyC0cPqRCmDVgMcgtyC3ILahNyC3ILUg6rDDoK4wyECzILbRBpCmkUZBC4D2UPogxwDoAIzQ/ND80PzQ/ND80PwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAA";
		var str = atob(base64);
		var data = new Uint8Array(str.length);
		for (let i = 0; i < data.length; i++) {
			data[i] = str.charCodeAt(i);
		}
		module.exports = data;
	},
	"./src/core/audio/audio.js": function(module, exports, __webpack_require__) {
		const MAX_SOUND = 32;

		class AudioManager {
			constructor() {
				this.sounds = [];
			}
			startSound(audio, sound, settings, display_object, avm1_object) {
				if (this.sounds.length < MAX_SOUND) {
					let handle = audio.startSound(sound, settings);
					let instance = {
						sound,
						instance: handle,
						display_object,
						stream_start_frame: null
					}
					this.sounds.push(instance);
					return handle;
				} else {
					return null;
				}
			}
			startStream(audio, movie_clip, clip_frame, data, stream_info) {
				if (this.sounds.length < MAX_SOUND) {
					let handle = audio.startStream(data, stream_info);
					let instance = {
						sound: null,
						instance: handle,
						display_object: movie_clip,
						stream_start_frame: clip_frame
					}
					this.sounds.push(instance);
					return handle;	
				} else {
					return null;
				}
			}
			stopSound(audio, instance) {
				for (let i = 0; i < this.sounds.length; i++) {
					const other = this.sounds[i];
					if (other.instance === instance) {
						audio.stopSound(other.instance);
						this.sounds.splice(i, 1);
						return;
					}
				}
			}
			stopSoundsWithHandle(audio, sound) {
				var newSounds = [];
				for (let i = 0; i < this.sounds.length; i++) {
					const s = this.sounds[i];
					if (s === sound) {
						audio.stopSound(s.instance);
					} else {
						newSounds.push(s);
					}
				}
				this.sounds = newSounds;
			}
			isSoundPlaying(sound) {
				for (let i = 0; i < this.sounds.length; i++) {
					const other = this.sounds[i];
					if (other.instance === sound) return true;
				}
				return false;
			}
			isSoundPlayingWithHandle(sound) {
				for (let i = 0; i < this.sounds.length; i++) {
					const other = this.sounds[i];
					if (other.sound === sound) {
						return true;
					}
				}
				return false;
			}
			stopAllSounds(audio) {
				this.sounds = [];
				audio.stopAllSounds();
			}
			updateSounds(context) {
				var newSounds = [];
				for (let i = 0; i < this.sounds.length; i++) {
					const sound = this.sounds[i];
					var pos = context.audio.getSoundPosition(sound.instance);
					if (pos != null) {
						newSounds.push(sound);
					} else {

					}
				}
				this.sounds = newSounds;
			}
			audioSkewTime(audio, offest_ms) {
				var g = [];
				for (let i = 0; i < this.sounds.length; i++) {
					const sound = this.sounds[i];
					if (sound.stream_start_frame != null) g.push(sound);
				}
				for (let i = 0; i < g.length; i++) {
					const element = g[i];
					this.stopSound(audio, element.instance);
				}
			}
		}

		module.exports = AudioManager;
	},
	"./src/core/audio/mixer.js": function(module, exports, __webpack_require__) {
		const { makeStreamDecoder, makeSeekableDecoder } = __webpack_require__("./src/core/audio/decoders.js");

		class Stream {
			constructor() {}
			sample_rate() {}
			next() {}
			isExhausted() {}
		}

		class Linear {
			constructor(left, right) {
				this.left = left;
				this.right = right;
			}
			interpolate(x) {
				var l = this.left;
				var r = this.right;
				var l_f = l;
				var r_f = r;
				var diff_l = r_f[0] - l_f[0];
				var diff_r = r_f[1] - l_f[1];
				return [
					((diff_l * x) + l_f[0]),
					((diff_r * x) + l_f[1])
				]
			}
			next_source_frame(source_frame) {
				this.left = this.right;
				this.right = source_frame;
			}
		}

		class ResampleHzToHz extends Stream {
			constructor(stream, sample_rate) {
				super();
				this._sample_rate = sample_rate;
				this.interpolation_value = 1;
				this.interpolator = new Linear([0, 0], [0, 0]);
				this.prevF = [0, 0];
				this.stream = stream;
				this.grate = 0;
				this.g = 0;
			}
			sample_rate() {
				return this._sample_rate;
			}
			getDecoder() {
				return this.stream.getDecoder();
			}
			isExhausted() {
				return this.stream.isExhausted();
			}
			next() {
				var rate = this.stream.sample_rate();
				var source_to_target_ratio = rate / this._sample_rate;
				while (this.interpolation_value >= 1) {
					this.interpolator.next_source_frame(this.stream.next());
					this.interpolation_value -= 1;
				}
				let out = this.interpolator.interpolate(this.interpolation_value);
				this.interpolation_value += source_to_target_ratio;
				return out;
			}
		}

		class SoundInstance {
			constructor(stream) {
				this.stream = stream;
				this.active = true;
			}
		}

		class EventSoundStream extends Stream {
			constructor(decoder, settings, num_sample_frames, skip_sample_frames) {
				super();
				this.decoder = decoder;
				var sample_divisor = 44100 / decoder.sample_rate();
				this.start_sample_frame = (((settings.inSample || 0) / sample_divisor) | 0) + skip_sample_frames;
				this.end_sample_frame = (((("outSample" in settings) ? (settings.outSample / sample_divisor) : num_sample_frames)) | 0) + skip_sample_frames;
				this.numLoops = ("numLoops" in settings) ? settings.numLoops : 1;
				this.is_exhausted = false;
				this.cur_sample_frame = this.start_sample_frame;
				this.nextLoop();
			}
			getDecoder() {
				return this.decoder;
			}
			sample_rate() {
				return this.decoder.sample_rate();
			}
			isExhausted() {
				return this.is_exhausted;
			}
			nextLoop() {
				if (this.numLoops > 0) {
					this.numLoops -= 1;
					this.decoder.seek_to_sample_frame(this.start_sample_frame);
					this.cur_sample_frame = this.start_sample_frame;
				} else {
					this.is_exhausted = true;
				}
			}
			next() {
				if (!this.is_exhausted) {
					var frame = this.decoder.next();
					if (frame) {
						this.cur_sample_frame += 1;
						if (this.cur_sample_frame > this.end_sample_frame) {
							this.nextLoop();
						}
						return frame;
					} else {
						this.nextLoop();
						return this.next();
					}
				} else {
					return [0, 0];
				}
			}
		}

		class DecoderStream extends Stream {
			constructor(decoder) {
				super();
				this.decoder = decoder;
				this.is_exhausted = false;
			}
			getDecoder() {
				return this.decoder;
			}
			sample_rate() {
				return this.decoder.sample_rate();
			}
			isExhausted() {
				return this.is_exhausted;
			}
			next() {
				var frame = this.decoder.next();
				if (frame) {
					return frame;
				} else {
					this.is_exhausted = true;
					return [0, 0];
				}
			}
		}

		class EnvelopeSignal {
			constructor(envelope) {
				this.cur_sample = 0;
				this.envelope = envelope;
				this.envelopeId = 0;
				this.left = this.envelope[0] ? this.envelope[0].leftVolume : 32768;
				this.right = this.envelope[0] ? this.envelope[0].rightVolume : 32768;
			}
			next() {
				this.cur_sample += 1;
				if (this.envelopeId < this.envelope.length) {
					var rs = this.envelope[this.envelopeId];
					var rs2 = this.envelope[this.envelopeId - 1];
					if (rs2) {
						var per = Math.max(Math.min((this.cur_sample - rs2.sample) / (rs.sample - rs2.sample), 1), 0);
						var startPer = 1 - per;
						var leftVal = ((rs2.leftVolume * startPer) + (rs.leftVolume * per));
						var rightVal = ((rs2.rightVolume * startPer) + (rs.rightVolume * per));
						this.left = Math.max(Math.min(leftVal, 32768), 0);
						this.right = Math.max(Math.min(rightVal, 32768), 0);
					}
					if (this.cur_sample >= rs.sample) {
						this.left = rs.leftVolume;
						this.right = rs.rightVolume;
						this.envelopeId++;
					}
				}
				return [this.left / 32768, this.right / 32768];
			}
		}
		class MulAmpStream extends Stream {
			constructor(stream, stream2) {
				super();
				this.stream = stream;
				this.stream2 = stream2;
			}
			sample_rate() {
				return this.stream.sample_rate();
			}
			getDecoder() {
				return this.stream.getDecoder();
			}
			isExhausted() {
				return this.stream.isExhausted();
			}
			next() {
				var frame = this.stream.next();
				var s = this.stream2.next();
				var l = frame[0] * s[0];
				var r = frame[1] * s[1];
				return [l, r];
			}
		}

		class ResampleGlobal {
			constructor(mixer, source_hz, target_hz) {
				this.mixer = mixer;
				this.source_to_target_ratio = source_hz / target_hz;
				this.interpolation_value = 0;
				this.interpolator = new Linear([0, 0], [0, 0]);
				this.l = 0;
				this.r = 0;
			}
			execute(g) {
				while (this.interpolation_value >= 1) {
					this.interpolator.next_source_frame(g());
					this.interpolation_value -= 1;
				}
				let out = this.interpolator.interpolate(this.interpolation_value);
				this.interpolation_value += this.source_to_target_ratio;
				this.l = out[0];
				this.r = out[1];
			}
		}

		const F = 11025;

		const J = 1024; // Normal
		
		class AudioMixer {
			constructor(audioContext) {
				this.audioContext = audioContext;
				this.volume = 100;
				this.node = this.audioContext.createGain();
				this.node.connect(this.audioContext.destination);
				this.node.gain.value = 0;
				this.soundInstances = [];
				this.resample_global = new ResampleGlobal(this, 44100, this.audioContext.sampleRate);
				this.left = new Float32Array(F);
				this.right = new Float32Array(F);
				this.source = this.audioContext.createScriptProcessor(J, 2, 2);
				this.source.onaudioprocess = (e) => { 
					this.writeSampleData(e);
				};
				this.source.connect(this.node);
				this.cur_time = 0;
				this.hdhfg = J;
				this.kgbk = 0;
				var jhgjhg = [];
				for (var i = 0; i < J; i++) {
					jhgjhg[i] = [0, 0];
				}
				this.jhgjhg = jhgjhg;
				this.debug_ms = 0;
			}
			setSpeed(speed) {
				var outputSampleRate = 44100 * speed;
				this.resample_global = new ResampleGlobal(this, outputSampleRate, this.audioContext.sampleRate);
			}
			getPlayingCompressSound() {
				var o = {};
				for (let i = 0; i < this.soundInstances.length; i++) {
					const sound = this.soundInstances[i];
					var e = sound.stream.getDecoder();
					var n = e.debugType();
					o[n] = true
				}
				return Object.keys(o);
			}
			pause() {
				this.node.gain.value = 0;
				this.stopSource();
			}
			resume() {
				this.node.gain.value = 1;
				this.startSource();
			}
			getPlayingAudioCount() {
				return this.soundInstances.length;
			}
			getVolume() {
				return this.volume;
			}
			setVolume(value) {
				this.volume = value;
			}
			getTimeRate() {
				return (this.audioContext.currentTime * this.audioContext.sampleRate) | 0;
			}
			getTime() {
				return ((this.cur_time / this.audioContext.sampleRate) * 1000) | 0;
			}
			stopSource() {
				if (this._source) {
					this._source.disconnect();
					this._source = null;
				}
			}
			startSource() {
				this.stopSource();
				this._source = this.audioContext.createBufferSource();
				this._source.connect(this.source);
				this._source.start();
			}
			writeSampleData(evt) {
				var output1 = evt.outputBuffer.getChannelData(0);
				var output2 = evt.outputBuffer.getChannelData(1);
				if (this._source) {
					var i = 0;
					this.mix(this.jhgjhg);
					this.kgbk = this.cur_time;
					for (i = 0; i < J; i++) {
						var l = this.jhgjhg[i][0];
						var r = this.jhgjhg[i][1];
						output1[i] = l;
						output2[i] = r;
						var s = (this.hdhfg + i) % F;
						this.left[s] = l;
						this.right[s] = r;
					}
					this.hdhfg += J;
					this.cur_time += J;
				}
			}
			mix(output_buffer) {
				var volume = this.volume / 100;
				var s = Date.now();
				this.mix_audio(this.soundInstances, volume, output_buffer);
				this.debug_ms = (Date.now() - s) | 0;
			}
			mix_audio(soundInstances, volume, output_buffer) {
				var _volume = (Math.pow(10, Math.log10(81) * volume) - 1) / 80;
				var se = () => {
					var l = 0;
					var r = 0;
					for (let j = 0; j < soundInstances.length; j++) {
						const sound = soundInstances[j];
						if (sound.active && !sound.stream.isExhausted()) {
							var sound_frame = sound.stream.next();
							var sound_frame_left = sound_frame[0] * _volume;
							var sound_frame_right = sound_frame[1] * _volume;
							l += sound_frame_left;
							r += sound_frame_right;
						} else {
							sound.active = false;
						}
					}
					return [l, r];
				}
				for (var i = 0; i < output_buffer.length; i++) {
					this.resample_global.execute(se);
					output_buffer[i][0] = this.resample_global.l;
					output_buffer[i][1] = this.resample_global.r;
				}
				var newSounds = [];
				for (let i = 0; i < soundInstances.length; i++) {
					const element = soundInstances[i];
					if (element.active) newSounds.push(element);
				}
				soundInstances.length = 0;
				for (let i = 0; i < newSounds.length; i++) {
					soundInstances.push(newSounds[i]);
				}
			}
			tick() {}
			stopAllSounds() {
				this.soundInstances = [];
			}
			getSoundPosition(instance) {
				for (let i = 0; i < this.soundInstances.length; i++) {
					const s = this.soundInstances[i];
					if (s === instance) {
						return 0;
					}
				}
				return null;
			}
			makeResampler(stream) {
				return new ResampleHzToHz(stream, 44100);
			}
			makeStreamFromEventSound(sound, settings, data) {
				var decoder = makeSeekableDecoder(sound.format, data);
				var res = new EventSoundStream(decoder, settings, sound.numSampleFrames, sound.skipSampleFrames);
				let stream = this.makeResampler(res);
				var envelope = settings.envelope;
				if (envelope) {
					stream = new MulAmpStream(stream, new EnvelopeSignal(envelope));
				}
				return stream;
			}
			makeStreamFromSwfSlice(stream_info, data_stream) {
				let clip_stream_decoder = makeStreamDecoder(stream_info, data_stream);
				var stream = new DecoderStream(clip_stream_decoder);
				stream = this.makeResampler(stream);
				return stream;
			}
			startSound(sound_handle, settings) {
				var data = sound_handle.data;
				let stream = this.makeStreamFromEventSound(sound_handle, settings, data);
				var i = new SoundInstance(stream);
				this.soundInstances.push(i);
				return i;
			}
			startStream(clip_data, stream_info) {
				let stream = this.makeStreamFromSwfSlice(stream_info, clip_data);
				var i = new SoundInstance(stream);
				this.soundInstances.push(i);
				return i;
			}
			stopSound(sound) {
				for (let i = 0; i < this.soundInstances.length; i++) {
					const s = this.soundInstances[i];
					if (s === sound) {
						this.soundInstances.splice(i, 1);
						return;
					}
				}
			}
			registerSound(swf_sound) {
				var data, skip_sample_frames;
				if (swf_sound.format.compression == "MP3") {
					data = swf_sound.data.subarray(2);
					skip_sample_frames = swf_sound.data[0] + (swf_sound.data[1] << 8);
				} else {
					data = swf_sound.data;
					skip_sample_frames = 0;
				}
				return {
					format: swf_sound.format,
					data: data,
					skipSampleFrames: skip_sample_frames,
					numSampleFrames: swf_sound.numSamples
				};
			}
			toWaveform(output) {
				if (!this._source) {
					output.fill(0);
					return;
				}
				var rg = (this.audioContext.sampleRate / 44100) * 1200;
				var time = this.kgbk;
				var max4 = output.length / 2;
				for (let i = 0; i < output.length; i += 2) {
					var _g = (((((i / 2) / max4) * rg) | 0) + time) % F;
					output[i] = this.left[_g] || 0;
					output[i + 1] = this.right[_g] || 0;
				}
			}
		}
		
		module.exports = AudioMixer;
	},
	"./src/core/audio/decoders.js": function(module, exports, __webpack_require__) {
		const AT_ASAO = __webpack_require__("./lib/at-asao.js");
		const AT_MP3 = __webpack_require__("./lib/at-mp3.min.js");

		class ByteReader {
			constructor() {
			}
			read() {
				return null;
			}
			setData(data) {
				this.data = data;
				this.bytePos = 0;
			}
			readData() {
				var result = this.read();
				this.data = result;
				this.bytePos = 0;
				return !!result;
			}
			bytesAvailable() {
				return this.data.length - this.bytePos;
			}
			readUint8() {
				return this.data[this.bytePos++];
			}
			readInt16() {
				return (this.data[this.bytePos++] + (this.data[this.bytePos++] << 8)) << 16 >> 16;
			}
			readByte() {
				return (this.data[this.bytePos++] << 24) >> 24;
			}
			readInt32() {
				return (this.data[this.bytePos++] << 24) + (this.data[this.bytePos++] << 16) + (this.data[this.bytePos++] << 8) + this.data[this.bytePos++];
				
			}
			readSub(n) {
				var r = this.data.subarray(this.bytePos, this.bytePos + n);
				this.bytePos += n;
				return r;
			}
			readString(n) {
				var r = this.data.slice(this.bytePos, this.bytePos + n);
				this.bytePos += n;
				return String.fromCharCode.apply(null, r);
			}
			isEOF() {
				return this.bytePos >= this.data.length;
			}
		}
		class RawDecoder {
			constructor(inner, sample_rate, isStereo, is_16_bit) {
				this.inner = inner;
				this.isStereo = isStereo;
				this.is_16_bit = is_16_bit;
				this._sample_rate = sample_rate;
			}
			debugType() {
				return "Raw " + (this.is_16_bit ? 16 : 8) + " BIT";
			}
			sample_rate() {
				return this._sample_rate;
			}
			read_sample() {
				return this.is_16_bit ? (this.inner.readInt16() / 0x7fff) : ((this.inner.readUint8() - 128) / 128);
			}
			next() {
				var left = this.read_sample();
				var right = this.isStereo ? this.read_sample() : left;
				return [left, right];
			}
			seek_to_sample_frame(frame) {
				this.inner.bytePos = 0;
				for (let _ = 0; _ < frame; _++) {
					this.next();
				}
			}
		}
		class BitReader {
			constructor(vec) {
				this.vec = vec;
				this.bytePos = 0;
				this.bitPos = 0;
			}
			readUB(n) {
				var value = 0;
				while (n--) value <<= 1, value |= this.readBit();
				return value;
			}
			readSB(n) {
				var uval = this.readUB(n);
				var shift = 32 - n;
				return (uval << shift) >> shift;
			}
			readBit() {
				var val = (this.vec[this.bytePos] >> (7 - this.bitPos++)) & 0x1;
				if (this.bitPos > 7) {
					this.bytePos++;
					this.bitPos = 0;
				}
				return val;
			}
		}
		class AdpcmDecoder {
			constructor(inner, sample_rate, isStereo) {
				var data = inner.data;
				this.input = new BitReader(data ? data : new Uint8Array(0));
				this.channels = isStereo ? 2 : 1;
				this.c = [{}, {}];
				this.bits_per_sample = this.input.readUB(2) + 2;
				this.decoder = AdpcmDecoder.SAMPLE_DELTA_CALCULATOR[this.bits_per_sample - 2];
				this.sample_num = 0;
				this._sample_rate = sample_rate;
			} 
			debugType() {
				return "ADPCM";
			}
			sample_rate() {
				return this._sample_rate;
			}
			next() {
				const j = this.input, m = this.bits_per_sample, d = this.decoder, _ = this.c, s = this.channels, h = 1 << (m - 1), n = AdpcmDecoder.INDEX_TABLE[m - 2];
				if (this.sample_num == 0) {
					for (let i = 0; i < s; i++) {
						let w = _[i];
						w.sample = j.readSB(16);
						w.stepIndex = j.readUB(6);
					}
				}
				this.sample_num = (this.sample_num + 1) % 4095;
				for (let i2 = 0; i2 < s; i2++) {
					let w = _[i2];
					let r = AdpcmDecoder.STEP_TABLE[w.stepIndex];
					let p = j.readUB(m);
					let g = p & (h - 1);
					let delta = d(r, g);
					w.sample = Math.max(-32768, Math.min(32767, w.sample + (p & h ? -delta : delta)));
					w.stepIndex = Math.max(0, Math.min(88, w.stepIndex + n[g]));
				}
				var l = _[0].sample / 0x8000;
				var r = s == 2 ? _[1].sample / 0x8000 : l;
				return [l, r];
			}
			seek_to_sample_frame(frame) {
				this.input.bytePos = 0;
				this.input.bitPos = 0;
				this.c = [{}, {}];
				this.bits_per_sample = this.input.readUB(2) + 2;
				this.decoder = AdpcmDecoder.SAMPLE_DELTA_CALCULATOR[this.bits_per_sample - 2];
				this.sample_num = 0;
				for (let _ = 0; _ < frame; _++) {
					this.next();
				}
			}
		}
		AdpcmDecoder.INDEX_TABLE = [new Int16Array([-1, 2]), new Int16Array([-1, -1, 2, 4]), new Int16Array([-1, -1, -1, -1, 2, 4, 6, 8]), new Int16Array([-1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16])];
		AdpcmDecoder.STEP_TABLE = new Uint16Array([7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767]);
		AdpcmDecoder.SAMPLE_DELTA_CALCULATOR = [
			function (a, b) {
				let c = a >> 1;
				if (b & 1) c += a;
				return c;
			},
			function (a, b) {
				let c = a >> 2;
				if (b & 1) c += a >> 1;
				if (b & 2) c += a;
				return c;
			},
			function (a, b) {
				let c = a >> 3;
				if (b & 1) c += a >> 2;
				if (b & 2) c += a >> 1;
				if (b & 4) c += a;
				return c;
			},
			function (a, b) {
				let c = a >> 4;
				if (b & 1) c += a >> 3;
				if (b & 2) c += a >> 2;
				if (b & 4) c += a >> 1;
				if (b & 8) c += a;
				return c;
			},
		];

		class MP3Decoder {
			constructor(inner) {
				this.stream_ended = true;
				this.frequency = 44100;
				this._debug_type = "";
				if (!inner.data && !inner.readData()) {
					return;
				}
				this.reader = inner;
				this.header = new AT_MP3.Header();
				var r = this.getHeaders();
				if (!r) {
					return;
				}
				var versionS = AT_MP3.Header.versionTable[this.header.version()];
				this._debug_type = MP3Decoder.types[versionS];
				this.reader.bytePos = 0;
				this.channels = (this.header.mode() == AT_MP3.Header.SINGLE_CHANNEL) ? 1 : 2;
				this.frequency = this.header.frequency();
				this.bitstream = new AT_MP3.BitStream();
				this.max_samples = (versionS == 1) ? 1152 : 576;
				this.samples = 0;
				this.buffer = null;
				this.pos = 0;
				this.decoder = new AT_MP3.Decoder();
				this.stream_ended = false;
			}
			sample_rate() {
				return this.frequency;
			}
			debugType() {
				return this._debug_type;
			}
			skipTags() {
				var startPos = this.reader.bytePos;
				var type = this.reader.readString(3);
				if (type == "ID3") {
					this.reader.bytePos += 3;
					var b3 = this.reader.readByte() | 0;
					var b2 = this.reader.readByte() | 0;
					var b1 = this.reader.readByte() | 0;
					var b0 = this.reader.readByte() | 0;
					var len = ((b3 << 21) + (b2 << 14) + (b1 << 7) + b0) | 0;
					this.reader.bytePos += len;
				} else if (type == "TAG") {
					this.reader.bytePos += 125;
				} else {
					this.reader.bytePos = startPos;
				}
			}
			getHeader() {
				while (this.reader.bytesAvailable() > 4) {
					this.skipTags();
					var bdfgd = this.reader.readInt32();
					if (AT_MP3.Header.isValidHeader(bdfgd)) {
						this.header.parseHeader(bdfgd);
						return true;
					} else {
						this.reader.bytePos -= 3;
					}
				}
				return false;
			}
			getHeaders() {
				while (true) {
					var isH = this.getHeader();
					if (isH) {
						return true;
					} else {
						if (!this.reader.readData()) {
							return false;
						}
					}
				}
			}
			next() {
				if (this.stream_ended) {
					return null;
				}
				var l, r;
				if (this.samples == 0) {
					this.pos = 0;
					this.samples = this.max_samples;
					var isH = this.getHeaders();
					if (!isH) {
						this.stream_ended = true;
						return null;
					}
					this.bitstream.setData(this.reader.readSub(this.header.framesize));
					var buf = this.decoder.decodeFrame(this.header, this.bitstream);
					this.buffer = buf.getBuffer();
				}
				l = this.buffer[this.pos++];
				if (this.channels == 2) r = this.buffer[this.pos++];
				else r = l;
				this.samples--;
				return [l, r];
			}
			seek_to_sample_frame(frame) {
				this.decoder = new AT_MP3.Decoder();
				this.reader.bytePos = 0;
				this.samples = 0;
				for (let _ = 0; _ < frame; _++) {
					this.next();
				}
			}
		}
		MP3Decoder.types = {
			1: "MPEG1",
			2: "MPEG2_LSF",
			2.5: "MPEG2.5_LSF",
		}
		class NellyMoserDecoder {
			constructor(inner, sample_rate) {
				this.stream_ended = true;
				if (!inner.data && !inner.readData()) {
					return;
				}
				this.inner = inner;
				this.state = new Float32Array(128);
				this.cur_frame = new Float32Array(256);
				this.cur_sample = 0;
				this._sample_rate = sample_rate;
				this.stream_ended = false;
			}
			debugType() {
				return "nellymoser";
			}
			sample_rate() {
				return this._sample_rate;
			}
			next_frame() {
				if (this.stream_ended) return;
				if (this.inner.isEOF()) {
					if (!this.inner.readData()) {
						this.stream_ended = true;
						return;
					}
				}
				var block = this.inner.readSub(64);
				AT_ASAO.decode(this.state, block, this.cur_frame);
				this.cur_sample = 0;
			}
			_next() {
				if (this.cur_sample >= 256) {
					this.next_frame();
				}
				let sample = this.cur_frame[this.cur_sample];
				this.cur_sample += 1;
				return sample;
			}
			next() {
				if (this.stream_ended) return [0, 0];
				var sample = this._next() / 32767;
				return [sample, sample];
			}
			seek_to_sample_frame(frame) {
				this.inner.bytePos = 0;
				for (let _ = 0; _ < frame; _++) {
					this.next();
				}
			}
		}

		const StreamTagReader = function(streamInfo, swf) {
			this.tags = swf.tags;
			this.pos = swf.pos;
			this.compression = streamInfo.stream.compression;
			this.current_audio_data = null;
			this.mp3_samples_buffered = 0;
			this.mp3_samples_per_block = streamInfo.samplePerBlock;
		}
		StreamTagReader.prototype.next = function() {
			let compression = this.compression;
			var found = false;
			while (true) {
				var pos = this.pos;
				while(pos < this.tags.length) {
					var tag = this.tags[pos];
					pos++;
					if (tag.tagcode == 19) {
						if (!found) {
							found = true;
							var audio_block = tag.compressed;
							if ((compression == "MP3") && (audio_block.length >= 4)) {
								let num_samples = audio_block[0] + (audio_block[1] << 8);
								this.mp3_samples_buffered += num_samples;
								audio_block = audio_block.subarray(4);
							}
							this.current_audio_data = audio_block;
						}
					} else if (tag.tagcode == 1) {
						if (compression == "MP3") this.mp3_samples_buffered -= this.mp3_samples_per_block;
						break;
					}
				}
				this.pos = pos;
				if (found) {
					return this.current_audio_data;
				} else if ((compression != "MP3") || (this.mp3_samples_buffered <= -this.mp3_samples_per_block) || !(this.pos < this.tags.length)) {
					return null;
				}
			}
		}

		class AdpcmStreamDecoder {
			constructor(stream_info, swf_data) {
				this.stream_info = stream_info;
				this.samples_per_block = stream_info.samplePerBlock;
				this.cur_frame = 0;
				this._sample_rate = stream_info.stream.sampleRate;
				this.tagReader = new StreamTagReader(stream_info, swf_data);
				var data = this.tagReader.next();
				if (data) this.decoder = this.createDecoder(data);
			}
			debugType() {
				return this.decoder ? this.decoder.debugType() : "";
			}
			sample_rate() {
				return this._sample_rate;
			}
			createDecoder(data) {
				var b = new ByteReader();
				b.setData(data);
				var stream_format = this.stream_info.stream;
				var compression = stream_format.compression;
				switch(compression) {
					case "uncompressed":
					case "uncompressedUnknownEndian":
						return new RawDecoder(b, stream_format.sampleRate, stream_format.isStereo, stream_format.is16Bit);
					case "ADPCM":
						return new AdpcmDecoder(b, stream_format.sampleRate, stream_format.isStereo);
				}
			}
			next() {
				if (this.decoder) {
					this.cur_frame += 1;
					var frame = this.decoder.next();
					if (this.cur_frame >= this.samples_per_block) {
						this.cur_frame = 0;
						var data = this.tagReader.next();
						if (data) this.decoder = this.createDecoder(data);
						else this.decoder = null;
					}
					return frame;
				} else {
					return null;
				}
			}
		}

		class ByteReaderStream extends ByteReader {
			constructor(stream) {
				super();
				this._stream = stream;
			}
			read() {
				var r = this._stream.next();
				return r;
			}
		}

		class StandardStreamDecoder {
			constructor(stream_info, swf_data) {
				this.stream_info = stream_info;
				var tagReader = new StreamTagReader(stream_info, swf_data);
				var byteReader = new ByteReaderStream(tagReader);
				this.isSkip = stream_info.latencySeek || 0;
				this.decoder = this.createDecoder(byteReader);
			}
			debugType() {
				return this.decoder ? this.decoder.debugType() : "";
			}
			sample_rate() {
				return this.decoder ? this.decoder.sample_rate() : 44100;
			}
			createDecoder(b) {
				var compression = this.stream_info.stream.compression;
				switch(compression) {
					case "MP3":
						return new MP3Decoder(b);
					case "nellymoser":
						return new NellyMoserDecoder(b, this.stream_info.stream.sampleRate);
				}
			}
			next() {
				var frame = null;
				if (this.isSkip != null) {
					for (let _ = 0; _ < this.isSkip; _++) {
						frame = this.decoder.next();
					}
					this.isSkip = null;
				}
				frame = this.decoder.next();
				return frame;
			}
		}

		function makeStreamDecoder(stream_info, swf_data) {
			var compression = stream_info.stream.compression;
			switch(compression) {
				case "ADPCM":
				case "uncompressed":
				case "uncompressedUnknownEndian":
					return new AdpcmStreamDecoder(stream_info, swf_data);
				default:
					return new StandardStreamDecoder(stream_info, swf_data);
			}
		}

		function makeSeekableDecoder(format, data) {
			var compression = format.compression;
			var b = new ByteReader();
			b.setData(data);
			switch (compression) {
				case "uncompressed":
				case "uncompressedUnknownEndian":
					return new RawDecoder(b, format.sampleRate, format.isStereo, format.is16Bit);
				case "ADPCM":
					return new AdpcmDecoder(b, format.sampleRate, format.isStereo);
				case "MP3":
					return new MP3Decoder(b);
				case "nellymoser":
					return new NellyMoserDecoder(b, format.sampleRate);
			}
		}

		exports.makeStreamDecoder = makeStreamDecoder;
		exports.makeSeekableDecoder = makeSeekableDecoder;
	},
	"./src/core/avm1/activation.js": function(module, exports, __webpack_require__) {
		const log = __webpack_require__("./src/core/log.js");
		const Avm1Value = __webpack_require__("./src/core/avm1/value.js");
		const Avm1Error = __webpack_require__("./src/core/avm1/error.js");
		const Avm1Reader = __webpack_require__("./src/swf/avm1_reader.js");
		
		class Avm1ReturnType {
			constructor(type, value) {
				this.type = type;
				if (arguments.length == 2) 
					this.value = value;
			}
		}
		Avm1ReturnType.implicit = 0;
		Avm1ReturnType.explicit = 1;

		class Avm1FrameControl {
			constructor(type, value) {
				this.type = type;
				if (arguments.length == 2) 
					this.value = value;
			}
		}
		Avm1FrameControl.continue = 0;
		Avm1FrameControl.return = 1;
		Avm1FrameControl.objContinue = new Avm1FrameControl(Avm1FrameControl.continue);

		const Avm1Activation = function(context) {
			this.context = context;
			this.swfVersion = 4;
			this.clip = null;
			this.spoce = null;
			this.stack = [];
			this.registers = [
				Avm1Value.INSTANCE.Undefined,
				Avm1Value.INSTANCE.Undefined,
				Avm1Value.INSTANCE.Undefined,
				Avm1Value.INSTANCE.Undefined
			];
			this.constantPool = [];
		}
		Avm1Activation.fromAction = function(context, id, swf_version, scope, constant_pool, base_clip, _this, callee) {
			var r = new Avm1Activation(context);
			r.swfVersion = swf_version;
			r.clip = base_clip;
			return r;
		}
		Avm1Activation.actionLibrary = [];
		
		Avm1Activation.prototype.push = function(value) {
			return this.stack.push(value);
		}
		Avm1Activation.prototype.pop = function() {
			return this.stack.pop();
		}
		Avm1Activation.prototype.setConstantPool = function(constantPool) {
			this.constantPool = constantPool;
		}
		
		Avm1Activation.prototype.getCurrentRegister = function(id) {
			return this.localRegister(id);
		}
		Avm1Activation.prototype.setCurrentRegister = function(id, value) {
			this.setLocalRegister(id, value);
		}
		Avm1Activation.prototype.hasLocalRegister = function(id) {
			return id in this.registers;
		}
		Avm1Activation.prototype.localRegister = function(id) {
			return this.registers[id];
		}
		Avm1Activation.prototype.setLocalRegister = function(id, value) {
			this.registers[id] = value;
		}
		Avm1Activation.prototype.getVariable = function(name) {
			var obj = this.clip.getObject();
			if (obj.hasProp(name)) {
				return obj.getProp(name);
			} else {
				return Avm1Value.INSTANCE.Undefined;
			}
		}
		Avm1Activation.prototype.setVariable = function(name, value) {
			var obj = this.clip.getObject();
			obj.setProp(name, value);
		}
		
		Avm1Activation.prototype.setLocalRegister = function(id, value) {
			this.register[id] = value;
		}
		
		Avm1Activation.prototype.stackPush = function(value) {
			// Note that there currently exists a subtle issue with this logic:
			// If the cached `Object` in a `MovieClipReference` becomes invalidated, causing it to switch back to path-based object resolution,
			// it should *never* switch back to cache-based resolution
			// However, currently if a `MovieClipReference` in this invalidated-cache state is converted back to an `Object`, such as when passed as an argument to a function,
			// if it pushed back onto the stack then it will be converted into a new `MovieClipReference`, causing it to switch back to cache-based resolution
			// Fixing this will require a thorough refactor of AVM1 to store `Either<MovieClipReference, Object>
			// can refer to a MovieClip
			// There is a ignored test for this issue of "reference laundering" at "avm1/string_paths_reference_launder"
			var _value;
			_value = value;
			this.push(_value);
		}
		
		Avm1Activation.prototype.runActions = function(action) {
			var read = new Avm1Reader(action);
			while(true) { 
				var result = this.doAction(read);
				if (result) {
					if (result.type === Avm1FrameControl.return) {
						var h = result.value;
						if (h.type === Avm1ReturnType.explicit) {
							return h.value;
						} else {
							return Avm1Value.INSTANCE.Undefined;
						}
					}
				} else {
					return Avm1Value.INSTANCE.Undefined;
				}
			}
		}
		Avm1Activation.prototype.doAction = function(reader) {
			var aScript = reader.readAction();
			var actionCode = aScript.opcode;
			var actionFunc = Avm1Activation.actionLibrary[actionCode];
			if (actionFunc) {
				var result = actionFunc.call(this, aScript);
				if (result) {
					return result;
				} else {
					//console.log("AVM1:" + actionCode);
					return null
				}
			} else {
				log.error("Unknown AVM1 opcode: " + actionCode);
				//return Avm1FrameControl.objContinue;
			}
		}
		const actionLibrary = Avm1Activation.actionLibrary;
		actionLibrary[0x00] = function(aScript) { // ActionEnd
			return new Avm1FrameControl(Avm1FrameControl.return, new Avm1ReturnType(Avm1ReturnType.implicit));
		}
		// SWFv3
		actionLibrary[0x81] = function(aScript) { // ActionGotoFrame
			this.clip.gotoFrame(this.context, aScript.frame + 1, true);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x83] = function(aScript) { // ActionGetURL
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x04] = function(aScript) { // ActionNextFrame
			this.clip.nextFrame(this.context);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x05] = function(aScript) { // ActionPreviousFrame
			this.clip.prevFrame(this.context);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x06] = function(aScript) { // ActionPlay
			this.clip.play(this.context);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x07] = function(aScript) { // ActionStop
			this.clip.stop(this.context);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x08] = function(aScript) { // ActionToggleQuality
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x09] = function(aScript) { // ActionStopSounds
			this.context.stopAllSounds();
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x8A] = function(aScript) { // ActionWaitForFrame
			console.log("WaitForFrame");
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x8B] = function(aScript) { // ActionSetTarget
			return Avm1FrameControl.objContinue;
		}
		
		// SWFv4
		actionLibrary[0x96] = function(aScript) { // ActionPush
			var values = aScript.values;
			for (let i = 0; i < values.length; i++) {
				const val = values[i];
				var type = val.type;
				var value = val.value;
				switch(type) {
					case 0:
						this.push(new Avm1Value(Avm1Value.String, value));
						break;
					case 2:
						this.push(Avm1Value.INSTANCE.Null);
						break;
					case 3:
						this.push(Avm1Value.INSTANCE.Undefined);
						break;
					case 1:
					case 6:
					case 7:
						this.push(new Avm1Value(Avm1Value.Number, value));
						break;
					case 5:
						this.push(new Avm1Value(Avm1Value.Bool, value));
						break;
					case 8:
					case 9:
						if (value in this.constantPool) {
							this.push(new Avm1Value(Avm1Value.String, this.constantPool[value]));
						} else {
							log.warn("ActionPush: Constant pool index " + value + " out of range (len = " + this.constantPool.length + ")");
						}
						break;
					default:
						console.log("value:" + type);
						this.push(Avm1Value.INSTANCE.Undefined);
				}
			}
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x17] = function(aScript) { // ActionPop
			this.pop();
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x0A] = function(aScript) { // ActionAdd
			var a = this.pop().coerceToNumber(this);
			var b = this.pop().coerceToNumber(this);
			var result = b + a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x0B] = function(aScript) { // ActionSubtract
			var a = this.pop().coerceToNumber(this);
			var b = this.pop().coerceToNumber(this);
			var result = b - a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x0C] = function(aScript) { // ActionMultiply
			var a = this.pop().coerceToNumber(this);
			var b = this.pop().coerceToNumber(this);
			var result = b * a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x0D] = function(aScript) { // ActionDivide
			var a = this.pop().coerceToNumber(this);
			var b = this.pop().coerceToNumber(this);
			var result = ((a == 0) && this.swfVersion < 5) ? new Avm1Value(Avm1Value.String, "#ERROR#") : new Avm1Value(Avm1Value.Number, b / a);
			this.push(result);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x0E] = function(aScript) { // ActionEquals
			var a = this.pop().coerceToNumber(this);
			var b = this.pop().coerceToNumber(this);
			var result = b == a;
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x0F] = function(aScript) { // ActionLess
		
		}
		actionLibrary[0x10] = function(aScript) { // ActionAnd
			var a = this.pop();
			var b = this.pop();
			var result = b.asBool(this.swfVersion) && a.asBool(this.swfVersion);
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x11] = function(aScript) { // ActionOr
			var a = this.pop();
			var b = this.pop();
			var result = b.asBool(this.swfVersion) || a.asBool(this.swfVersion);
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x12] = function(aScript) { // ActionNot
			var a = this.pop();
			var result = !a.asBool(this.swfVersion);
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x13] = function(aScript) { // ActionStringEquals
			var a = this.pop().coerceToString(this);
			var b = this.pop().coerceToString(this);
			var result = b == a;
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x14] = function(aScript) { // ActionStringLength
			// AS1 strlen
			// In SWF6+, this is the same as String.length (returns number of UTF-16 code units).
			// TODO: In SWF5, this returns the byte length, even though the encoding is locale dependent.
			var val = this.pop().coerceToString(this);
			this.push(new Avm1Value(Avm1Value.Number, val.length));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x21] = function(aScript) { // ActionStringAdd
			// SWFv4 string concatenation
			// TODO(Herschel): Result with non-string operands?
			var a = this.pop().coerceToString(this);
			var b = this.pop().coerceToString(this);
			var s = b + a;
			this.push(new Avm1Value(Avm1Value.String, s));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x15] = function(aScript) { // ActionStringExtract
		
		}
		actionLibrary[0x29] = function(aScript) { // ActionStringLess
			var a = this.pop().coerceToString(this);
			var b = this.pop().coerceToString(this);
			var result = b < a;
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x31] = function(aScript) { // ActionMBStringLength
		
		}
		actionLibrary[0x35] = function(aScript) { // ActionMBStringExtract
		
		}
		actionLibrary[0x18] = function(aScript) { // ActionToInteger
			var val = this.pop();
			var result = val.coerceToI32(this);
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x32] = function(aScript) { // ActionCharToAscii
		
		}
		actionLibrary[0x33] = function(aScript) { // ActionAsciiToChar
		
		}
		actionLibrary[0x36] = function(aScript) { // ActionCharToAscii
		
		}
		actionLibrary[0x37] = function(aScript) { // ActionAsciiToChar
		
		}
		actionLibrary[0x99] = function(aScript) { // ActionJump
		
		}
		actionLibrary[0x9D] = function(aScript) { // ActionIf
		
		}
		actionLibrary[0x9E] = function(aScript) { // ActionCall
		
		}
		actionLibrary[0x1C] = function(aScript) { // ActionGetVariable
			/*var var_path_val = this.pop();
			var path = var_path_val.coerceToString();
			console.log("ActionGetVariable");
			console.log(path);*/
		}
		actionLibrary[0x1D] = function(aScript) { // ActionSetVariable
			// Flash 4-style variable
			var value = this.pop();
			var var_path_val = this.pop();
			var var_path = var_path_val.coerceToString();
			/*console.log("ActionSetVariable");
			console.log(var_path);
			console.log(value);*/
		}
		actionLibrary[0x9A] = function(aScript) { // ActionGetURL2
		
		}
		actionLibrary[0x9F] = function(aScript) { // ActionGoToFrame2
		
		}
		actionLibrary[0x20] = function(aScript) { // ActionSetTarget2
		
		}
		actionLibrary[0x22] = function(aScript) { // ActionGetProperty
		
		}
		actionLibrary[0x23] = function(aScript) { // ActionSetProperty
		
		}
		actionLibrary[0x24] = function(aScript) { // ActionCloneSprite
		
		}
		actionLibrary[0x25] = function(aScript) { // ActionRemoveSprite
		
		}
		actionLibrary[0x27] = function(aScript) { // ActionStartDrag
		
		}
		actionLibrary[0x28] = function(aScript) { // ActionEndDrag
		
		}
		actionLibrary[0x8D] = function(aScript) { // ActionWaitForFrame2
		
		}
		actionLibrary[0x26] = function(aScript) { // ActionTrace
			let val = this.pop();
			log.log("[trace] " + val.coerceToString(this));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x34] = function(aScript) { // ActionGetTime
		
		}
		actionLibrary[0x30] = function(aScript) { // ActionRandomNumber
			
		}
		
		// SWFv5
		actionLibrary[0x3d] = function(aScript) { // ActionCallFunction
			
		}
		actionLibrary[0x52] = function(aScript) { // ActionCallMethod
			
		}
		actionLibrary[0x88] = function(aScript) { // ActionConstantPool
			this.setConstantPool(aScript.strings);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x8e] = function(aScript) { // ActionDefineFunction
			//console.log("ActionDefineFunction", aScript);
		}
		actionLibrary[0x3c] = function(aScript) { // ActionDefineLocal
			/*var value = this.pop();
			var name_val = this.pop();
			var name = name_val.coerceToString();
			console.log("DefineLocal");
			console.log(name);
			console.log(value);*/
		}
		actionLibrary[0x41] = function(aScript) { // ActionDefineLocal2
		
		}
		actionLibrary[0x3a] = function(aScript) { // ActionDelete
		
		}
		actionLibrary[0x3b] = function(aScript) { // ActionDelete2
		
		}
		actionLibrary[0x46] = function(aScript) { // ActionEnumerate
		
		}
		actionLibrary[0x49] = function(aScript) { // ActionEquals2
		
		}
		actionLibrary[0x4e] = function(aScript) { // ActionGetMember
			
		}
		actionLibrary[0x42] = function(aScript) { // ActionInitArray
		
		}
		actionLibrary[0x43] = function(aScript) { // ActionInitObject
			var num_props = this.pop().coerceToNumber();
			var result;
			if (num_props < 0) {
				result = Avm1Value.INSTANCE.Undefined;
			} else {
				for (let _ = 0; _ < num_props; _++) {
					let value = this.pop();
					let name_val = this.pop();
					let name = name_val.coerceToString(this);
				}
			}
		}
		actionLibrary[0x53] = function(aScript) { // ActionNewMethod
		
		}
		actionLibrary[0x40] = function(aScript) { // ActionNewObject
		
		}
		actionLibrary[0x4f] = function(aScript) { // ActionSetMember
			
		}
		actionLibrary[0x45] = function(aScript) { // ActionTargetPath
		
		}
		actionLibrary[0x94] = function(aScript) { // ActionWith
		
		}
		actionLibrary[0x4a] = function(aScript) { // ActionToNumber
			var val = this.pop();
			var result = val.coerceToNumber(this);
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x4b] = function(aScript) { // ActionToString
			var val = this.pop();
			var string = val.coerceToString(this);
			this.push(new Avm1Value(Avm1Value.String, string));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x44] = function(aScript) { // ActionTypeOf
		
		}
		actionLibrary[0x47] = function(aScript) { // ActionAdd2
		
		}
		actionLibrary[0x48] = function(aScript) { // ActionLess2
		
		}
		actionLibrary[0x3f] = function(aScript) { // ActionModulo
			// TODO: Wrong operands?
			var a = this.pop().coerceToNumber(this);
			var b = this.pop().coerceToNumber(this);
			let result = b % a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x60] = function(aScript) { // ActionBitAnd
			var a = this.pop().coerceToI32(this);
			var b = this.pop().coerceToI32(this);
			var result = a & b;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x63] = function(aScript) { // ActionBitLShift
			var a = this.pop().coerceToI32(this) & 0b11111;
			var b = this.pop().coerceToI32(this);
			var result = b << a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x61] = function(aScript) { // ActionBitOr
			var a = this.pop().coerceToI32(this);
			var b = this.pop().coerceToI32(this);
			var result = a | b;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x64] = function(aScript) { // ActionBitRShift
			var a = this.pop().coerceToI32(this) & 0b11111;
			var b = this.pop().coerceToI32(this);
			var result = b >> a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x65] = function(aScript) { // ActionBitURShift
			// TODO
			var a = this.pop().coerceToI32(this) & 0b11111;
			var b = this.pop().coerceToI32(this);
			var result = b >> a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x62] = function(aScript) { // ActionBitXor
			var a = this.pop().coerceToI32(this);
			var b = this.pop().coerceToI32(this);
			var result = b ^ a;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x51] = function(aScript) { // ActionDecrement
			var a = this.pop().coerceToNumber(this);
			let result = a - 1;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x50] = function(aScript) { // ActionIncrement
			var a = this.pop().coerceToNumber(this);
			let result = a + 1;
			this.push(new Avm1Value(Avm1Value.Number, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x4c] = function(aScript) { // ActionPushDuplicate
			var val = this.pop();
			this.push(val);
			this.push(val);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x3e] = function(aScript) { // ActionReturn
			let return_value = this.pop();
			return new Avm1FrameControl(Avm1FrameControl.return, new Avm1ReturnType(Avm1ReturnType.explicit, return_value));
		}
		actionLibrary[0x4d] = function(aScript) { // ActionStackSwap
			var a = this.pop();
			var b = this.pop();
			this.push(a);
			this.push(b);
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x87] = function(aScript) { // ActionStoreRegister
		
		}
		
		// SWFv6
		actionLibrary[0x54] = function(aScript) { // ActionInstanceOf
		
		}
		actionLibrary[0x55] = function(aScript) { // ActionEnumerate2
		
		}
		actionLibrary[0x66] = function(aScript) { // ActionStrictEquals
			var a = this.pop();
			var b = this.pop();
			var result  = a.eq(b);
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		actionLibrary[0x67] = function(aScript) { // ActionGreater
		
		}
		actionLibrary[0x68] = function(aScript) { // ActionStringGreater
			var a = this.pop().coerceToString(this);
			var b = this.pop().coerceToString(this);
			var result = b > a;
			this.push(new Avm1Value(Avm1Value.Bool, result));
			return Avm1FrameControl.objContinue;
		}
		
		// SWFv7
		actionLibrary[0x9b] = actionLibrary[0x8e]; // ActionDefineFunction2
		actionLibrary[0x69] = function(aScript) { // ActionExtends
		
		}
		actionLibrary[0x2b] = function(aScript) { // ActionCastOp
		
		}
		actionLibrary[0x2c] = function(aScript) { // ActionImplementsOp
		
		}
		actionLibrary[0x8f] = function(aScript) { // ActionTry
		
		}
		actionLibrary[0x2a] = function(aScript) { // ActionThrow
			var value = this.pop();
			//console.log("Thrown exception: " + value.coerceToString(this));
			throw new Avm1Error(value);
		}
		module.exports = Avm1Activation;
	},
	"./src/core/avm1/error.js": function(module, exports, __webpack_require__) {
		class Avm1Error extends Error {
			constructor(value) {
				super("A script has thrown a custom error.");
				this.name = "Avm1Error";
				this.value = value;
			}
		}
		module.exports = Avm1Error;
	},
	"./src/core/avm1/value.js": function(module, exports, __webpack_require__) {
		const Avm1Value = function(type, value) {
			this.type = type;
			if (arguments.length == 2) {
				this.value = value;
			}
		}
		Avm1Value.Undefined = 1;
		Avm1Value.Null = 2;
		Avm1Value.Bool = 3; // bool
		Avm1Value.Number = 4; // f64
		Avm1Value.String = 5; // AvmString
		Avm1Value.Object = 6; // Object
		Avm1Value.MovieClip = 7; // MovieClipReference
		Avm1Value.prototype.isPrimitive = function() {

		}
		Avm1Value.prototype.eq = function(other) {
			var thisType = this.type;
			var otherType = other.type;
			switch(true) {
				case (thisType == Avm1Value.Undefined) && (otherType == Avm1Value.Undefined):
					return true;
				case (thisType == Avm1Value.Null) && (otherType == Avm1Value.Null):
					return true;
				case (thisType == Avm1Value.Bool) && (otherType == Avm1Value.Bool):
					return this.value == other.value;
				case (thisType == Avm1Value.Number) && (otherType == Avm1Value.Number):
					return (this.value === other.value) || (Number.isNaN(this.value) && Number.isNaN(other.value));
				case (thisType == Avm1Value.String) && (otherType == Avm1Value.String):
					return (this.value === other.value);
				case (thisType == Avm1Value.Object) && (otherType == Avm1Value.Object):
					return (this.value === other.value);
				case (thisType == Avm1Value.MovieClip) && (otherType == Avm1Value.MovieClip):
					return (this.value === other.value);
				default:
					return false;
			}
		}
		Avm1Value.prototype.primitiveAsNumber = function(activation) {
			var type = this.type;
			var value = this.value;
			switch(type) {
				case Avm1Value.Undefined:
				case Avm1Value.Null:
					return (activation.swfVersion < 7) ? 0 : NaN;
				case Avm1Value.Object:
				case Avm1Value.MovieClip:
					return (activation.swfVersion < 5) ? 0 : NaN;
				case Avm1Value.Bool:
					return +value;
				case Avm1Value.Number:
					return value;
				case Avm1Value.String:
					return Number.parseFloat(value);
			}
		}
		Avm1Value.prototype.coerceToNumber = function(activation) {
			var type = this.type;
			switch(type) {
				case Avm1Value.Object:
				case Avm1Value.MovieClip:
					return NaN;
				default:
					return this.primitiveAsNumber(activation);
			}
		}
		Avm1Value.prototype.coerceToI32 = function(activation) {
			return this.coerceToNumber(activation) | 0;
		}
		Avm1Value.prototype.coerceToString = function(activation) {
			var type = this.type;
			var value = this.value;
			switch(type) {
				case Avm1Value.Object:
				case Avm1Value.MovieClip:
					return "";
				case Avm1Value.Undefined:
					return (activation.swfVersion < 7) ? "null" : "undefined";
				case Avm1Value.Null:
					return "null";
				case Avm1Value.Bool:
					return (activation.swfVersion < 5) ? (value ? "1" : "0") : (value + "");
				case Avm1Value.Number:
					return value + "";
				case Avm1Value.String:
					return value;
			}
		}
		Avm1Value.prototype.asBool = function(swfVersion) {
			var type = this.type;
			var value = this.value;
			switch(type) {
				case Avm1Value.Bool:
					return value;
				case Avm1Value.Number:
					return (!Number.isNaN(value)) && (value != 0);
				case Avm1Value.String:
					if (swfVersion >= 7) {
						return !value.length;
					} else {
						let num = parseFloat(value);
						return !Number.isNaN(num) && (num != 0);	
					}
				case Avm1Value.Object:
				case Avm1Value.MovieClip:
					return true;
				default:
					return false;
			}
		}

		Avm1Value.INSTANCE = {Undefined: new Avm1Value(Avm1Value.Undefined), Null: new Avm1Value(Avm1Value.Null)};
		
		module.exports = Avm1Value;
	},
	"./src/core/display_objects/interactive.js": function(module, exports, __webpack_require__) {
		const DisplayObject = __webpack_require__("./src/core/display_object.js");
		
		class InteractiveObject extends DisplayObject {
			constructor() {
				super();
				this._mouseEnabled = true;
			}
			get displayType() {
				return "InteractiveObject";
			}
			isInteractive() {
				return true;
			}
		}
		
		module.exports = InteractiveObject;
	},
	"./src/core/display_objects/container.js": function(module, exports, __webpack_require__) {
		const InteractiveObject = __webpack_require__("./src/core/display_objects/interactive.js");
		const { Transform } = __webpack_require__("./src/render/transform.js");

		class ChildContainer {
			constructor() {
				this.renderList = [];
				this.depthList = [];
			}
			numChildren() {
				return this.renderList.length;
			}
			replaceId(id, child) {
				this.renderList[id] = child;
			}
			insertId(id, child) {
				if (this.renderList.length) {
					if (id >= this.renderList.length) {
						this.renderList.push(child);
					} else {
						this.renderList.splice(id, 0, child);
					}
				} else {
					this.renderList.push(child);
				}
			}
			pushId(child) {
				this.renderList.push(child);
			}
			removeId(id) {
				if (this.renderList.length) {
					if (id >= this.renderList.length) {
						this.renderList.pop();
					} else {
						this.renderList.splice(id, 1);
					}
				}
			}
			removeChildFromDepthList(child) {
				let depth = child.getDepth();
				delete this.depthList[depth];
			}
			removeChildFromRenderList(child, context) {
				let rs = this.renderList.indexOf(child);
				if (rs >= 0) {
					this.removeId(rs);
				} else {
					console.log(child);
				}
			}
			getDepth(depth) {
				return this.depthList[depth];
			}
			insertChildIntoDepthList(depth, child) {
				let r = this.depthList[depth];
				this.depthList[depth] = child;
				return r;
			}
			replaceAtDepth(child, depth) {
				let prevChild = this.insertChildIntoDepthList(depth, child);
				if (prevChild) {
					console.log(prevChild);
				}
				let aboveChild = null;
				for (let i = 0; i < this.depthList.length; i++) {
					const c = this.depthList[i];
					if (c && i !== depth) {
						if (i > depth) {
							aboveChild = c;
							break;
						}
					}
				}
				if (aboveChild) {
					let rs = this.renderList.indexOf(aboveChild);
					if (rs >= 0) {
						this.insertId(rs, child);
					} else {
						this.pushId(child);
					}
				} else {
					this.pushId(child);
				}
			}
		}
		
		class DisplayObjectContainer extends InteractiveObject {
			constructor() {
				super();
				this.container = new ChildContainer();
			}
			get displayType() {
				return "Container";
			}
			// renderList
			numChildren() {
				return this.container.numChildren();
			}
			isContainer() {
				return true;
			}
			replaceAtDepth(context, child, depth) {
				let rawContainer = this.container;
				rawContainer.replaceAtDepth(child, depth);
				this.invalidateCachedBitmap();
			}
			childByDepth(depth) {
				return this.container.getDepth(depth);
			}
			removeChild(context, child) {
				this.removeChildDirectly(context, child);
			}
			removeChildDirectly(context, child) {
				let rawContainer = this.container;

				// Remove the child from the depth list, before moving it to a negative depth
				rawContainer.removeChildFromDepthList(child);
				rawContainer.removeChildFromRenderList(child, context);
		
				child.avm1Unload(context);

				this.invalidateCachedBitmap();
			}
			iterRenderList() {
				return this.container.renderList.slice(0);
			}
			updatePendingRemovals() {
				var chs = this.iterRenderList();
				for (let i = 0; i < chs.length; i++) {
					const c = chs[i];
					if (c.isAvm1PendingRemoval()) {
					}
				}
			}
			/// Renders the children of this container in render list order.
			renderChildren(context) {
				let clipDepth = 0;
				let clipDepthStack = [];

				var children = this.iterRenderList();

				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					let depth = child.getDepth();
					child.preRender(context);
					while ((clipDepth > 0) && (depth > clipDepth)) {
						let [prevClipDepth, clipChild] = clipDepthStack.pop();
						clipDepth = prevClipDepth;
						context.commands.deactivateMask();
						clipChild.render(context);
						context.commands.popMask();
					}
					if (child.clipDepth > 0 && child.allowAsMask()) {
						clipDepthStack.push([clipDepth, child]);
						clipDepth = child.clipDepth;
						context.commands.pushMask();
						child.render(context);
						context.commands.activateMask();
					} else if (child.getVisible() || context.commands.drawingMask()) {
						child.render(context);
					}
				}
				for (let j = clipDepthStack.length - 1; j >= 0; j--) {
					context.commands.deactivateMask();
					clipDepthStack[j][1].render(context);
					context.commands.popMask();
				}
			}
			debugRender(context, player) {
				player.debugTransformStack.stackPush(this.getRenderTransform(player.useLastBound));
				var children = this.iterRenderList();
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					if (child.getVisible()) {
						child.debugRender(context, player);
					}
				}
				if (!this.isRoot()) {
					var h = player.debugTransformStack.getTransform();
					var bm = this.renderBoundsWithTransform(h.matrix, true, context.stage.view_matrix());
					var coll = this._debug_colorDisplayType;
					context.transformStack.stackPush(new Transform([1, 0, 0, 1, 0, 0], h.colorTransform));
					context.transformStack.stackPush(new Transform([1, 0, 0, 1, 0, 0], [coll[0] / 255, coll[1] / 255, coll[2] / 255, coll[3], 0, 0, 0, 0]));
					player.drawTextW(context, bm.xMin, bm.yMin - (320 * player.getScaleBoundsText()), (0.25 * player.getScaleBoundsText()), this.getDisplayName());
					context.transformStack.stackPop();
					context.transformStack.stackPush(new Transform([(bm.xMax - bm.xMin) / 2000, 0, 0, (bm.yMax - bm.yMin) / 2000, bm.xMin, bm.yMin], [0, 0, 0, 1, 0, 0, 0, 0]));
					context.commands.renderShape(player.debugRectLineShapeRender, context.transformStack.getTransform());
					context.transformStack.stackPop();
					context.transformStack.stackPop();
				}
				player.debugTransformStack.stackPop();
			}
		}
		
		module.exports = DisplayObjectContainer;
	},
	"./src/core/display_objects/graphic.js": function(module, exports, __webpack_require__) {
		const DisplayObject = __webpack_require__("./src/core/display_object.js");
		const shapeUtils = __webpack_require__("./src/render/shape_utils.js");
		const matrixUtils = __webpack_require__("./src/render/matrix_utils.js");
		
		class Graphic extends DisplayObject {
			constructor() {
				super();
				this.shapeData = null;
			}
			get displayType() {
				return "Shape";
			}
			get _debug_colorDisplayType() {
				return [0, 0, 255, 1];
			}
			static fromSwfTag(movie, tag) {
				return new GraphicStatic(movie, tag);
			}
			getId() {
				return this.shapeData.characterId;
			}
			init(shapeData) {
				if (!shapeData) return;
				this.shapeData = shapeData;
			}
			replaceWith(context, characterId) {
				var movie = this.getMovie();
				this.init(movie.library.getGraphic(characterId));
				this.invalidateCachedBitmap();
			}
			postInstantiation(context, initObject, instantiatedBy, runFrame) {
				context.avm1.addExecuteList(this);
			}
			runFrameAvm1(context) {
				// Noop
			}
			selfBounds() {
				return this.shapeData.bounds;
			}
			getMovie() {
				return this.shapeData.movie;
			}
			hitTestShape(_context, point, options) {
				var _m = this.globalToLocalMatrix();
				var data = this.shapeData.data;
				return shapeUtils.shapeHitTest(data, matrixUtils.generateMatrix(point, _m), _m);
			}
			renderSelf(context) {
				var shapeRender = this.shapeData.getShape(context);
				context.commands.renderShape(shapeRender, context.transformStack.getTransform());
			}
		}
		
		class GraphicStatic {
			constructor(movie, data) {
				this.movie = movie;
				this.data = data;
				this.characterId = data.id;
				this.bounds = data.bounds;
				this.shapeRender = null;
			}
			getShape(context) {
				if (!this.shapeRender) {
					var resultShape = shapeUtils.shapeToRendererInfo(shapeUtils.convert(this.data, "shape"));
					this.shapeRender = context.renderer.registerShape(resultShape, this.movie.library);
				}
				return this.shapeRender;
			}
			instantiate() {
				var shape = new Graphic();
				shape.init(this);
				return shape;
			}
		}
		
		module.exports = Graphic;
	},
	"./src/core/display_objects/morph_shape.js": function(module, exports, __webpack_require__) {
		const DisplayObject = __webpack_require__("./src/core/display_object.js");
		const shapeUtils = __webpack_require__("./src/render/shape_utils.js");
		
		function cloneObject(src) {
			return JSON.parse(JSON.stringify(src));
		}
		
		class MorphShape extends DisplayObject {
			constructor() {
				super();
				this.morphShapeData = null;
				this.ratio = 0;
			}
			get displayType() {
				return "MorphShape";
			}
			get _debug_colorDisplayType() {
				return [0, 255, 255, 1];
			}
			static fromSwfTag(movie, tag) {
				return new MorphShapeStatic(movie, tag);
			}
			getId() {
				return this.morphShapeData.characterId;
			}
			init(morphShapeData) {
				if (!morphShapeData) return;
				this.morphShapeData = morphShapeData;
				this.invalidateCachedBitmap();
			}
			getMovie() {
				return this.morphShapeData.movie;
			}
			replaceWith(context, characterId) {
				var movie = this.getMovie();
				this.init(movie.library.getMorphShape(characterId));
			}
			runFrameAvm1(context) {
				// Noop
			}
			setRatio(ratio) {
				this.ratio = ratio;
				this.invalidateCachedBitmap();
			}
			selfBounds() {
				var frame = this.morphShapeData.getFrame(this.ratio);
				return frame.bounds;
			}
			renderSelf(context) {
				var ratio = this.ratio;
				var renderShape = this.morphShapeData.getShape(context, ratio);
				context.commands.renderShape(renderShape, context.transformStack.getTransform());
			}
		}
		
		class MorphShapeStatic {
			constructor(movie, data) {
				this.movie = movie;
				this.data = data;
				this.characterId = data.id;
				this.morphCaches = [];
			}
			getShape(context, ratio) {
				var frame = this.getFrame(ratio);
				if (!frame.shapeRender) {
					var resultCache = shapeUtils.shapeToRendererInfo(shapeUtils.convert(frame.shape, "morphshape"));
					frame.shapeRender = context.renderer.registerShape(resultCache, this.movie);
				}
				return frame.shapeRender;
			}
			instantiate() {
				var shape = new MorphShape();
				shape.init(this);
				return shape;
			}
			getFrame(ratio) {
				if (!this.morphCaches[ratio]) {
					this.morphCaches[ratio] = this.buildMorphFrame(ratio / 65535);
				}
				return this.morphCaches[ratio];
			}
			lerpTwips(start, end, per) {
				var startPer = 1 - per;
				return ((start * startPer) + (end * per)) | 0;
			}
			lerpColor(startColor, endColor, per) {
				// f32 -> u8 cast is defined to saturate for out of bounds values,
				// so we don't have to worry about clamping.
				var startPer = 1 - per;
				var result = [
					Math.floor(startColor[0] * startPer + endColor[0] * per),
					Math.floor(startColor[1] * startPer + endColor[1] * per),
					Math.floor(startColor[2] * startPer + endColor[2] * per),
					startColor[3] * startPer + endColor[3] * per
				];
				return result;
			}
			lerpMatrix(startMatrix, endMatrix, per) {
				var startPer = 1 - per;
				var result = [
					startMatrix[0] * startPer + endMatrix[0] * per,
					startMatrix[1] * startPer + endMatrix[1] * per,
					startMatrix[2] * startPer + endMatrix[2] * per,
					startMatrix[3] * startPer + endMatrix[3] * per,
					startMatrix[4] * startPer + endMatrix[4] * per,
					startMatrix[5] * startPer + endMatrix[5] * per
				];
				return result;
			}
			lerpFill(fillStyle, per) {
				var startPer = 1 - per;
				var fillStyleType = fillStyle.type;
				if (fillStyleType === 0x00) {
					return {
						color: this.lerpColor(fillStyle.startColor, fillStyle.endColor, per),
						type: fillStyleType
					};
				} else {
					if (fillStyleType == 0x40 || fillStyleType == 0x41 || fillStyleType == 0x42 || fillStyleType == 0x43) {
						return {
							bitmapId: fillStyle.bitmapId,
							bitmapMatrix: this.lerpMatrix(fillStyle.bitmapStartMatrix, fillStyle.bitmapEndMatrix, per),
							isSmoothed: fillStyle.isSmoothed,
							isRepeating: fillStyle.isRepeating,
							type: fillStyleType
						};
					} else {
						var gradient = fillStyle.gradient;
						var focalPoint = 0;
						if (fillStyleType == 19) {
							(fillStyle.startFocalPoint * startPer) + (fillStyle.endFocalPoint * per);
							focalPoint = (fillStyle.startFocalPoint * startPer) + (fillStyle.endFocalPoint * per);
						}
						var gRecords = [];
						var records = gradient.records;
						for (var gIdx = 0; gIdx < records.length; gIdx++) {
							var gRecord = records[gIdx];
							gRecords[gIdx] = {
								color: this.lerpColor(gRecord.startColor, gRecord.endColor, per),
								ratio: (gRecord.startRatio * startPer) + (gRecord.endRatio * per)
							};
						}
						return {
							gradient: {
								matrix: this.lerpMatrix(gradient.startMatrix, gradient.endMatrix, per),
								records: gRecords,
								spreadMode: gradient.spreadMode,
								interpolationMode: gradient.interpolationMode
							},
							focalPoint,
							type: fillStyleType
						};
					}
				}
			}
			lerpLine(lineStyle, per) {
				var width = this.lerpTwips(lineStyle.startWidth, lineStyle.endWidth, per);
				if (lineStyle.fillType) {
					return {
						width: width,
						fillType: this.lerpFill(lineStyle.fillType, per)
					};
				} else {
					return {
						width: width,
						color: this.lerpColor(lineStyle.startColor, lineStyle.endColor, per)
					};
				}
			}
			buildEdges(per) {
				var startPer = 1 - per;
		
				var startPosition = { x: 0, y: 0 };
				var endPosition = { x: 0, y: 0 };
		
				// TODO: Feels like this could be cleaned up a bit.
				// We step through both the start records and end records, interpolating edges pairwise.
				// Fill style/line style changes should only appear in the start records.
				// However, StyleChangeRecord move_to can appear it both start and end records,
				// and not necessarily in matching pairs; therefore, we have to keep track of the pen position
				// in case one side is missing a move_to; it will implicitly use the last pen position.
				var StartRecords = cloneObject(this.data.startEdges);
				var EndRecords = cloneObject(this.data.endEdges);
		
				var StartRecordLength = StartRecords.length;
				var EndRecordLength = EndRecords.length;
				var length = Math.max(StartRecordLength, EndRecordLength);
				for (var i = 0; i < length; i++) {
					var addRecode = {};
					var StartRecord = StartRecords[i];
					var EndRecord = EndRecords[i];
					if (!StartRecord || !EndRecord) {
						continue;
					}
					if (!StartRecord.isChange && !EndRecord.isChange) {
						if (StartRecord.isCurved) {
							startPosition.x += StartRecord.controlDeltaX + StartRecord.anchorDeltaX;
							startPosition.y += StartRecord.controlDeltaY + StartRecord.anchorDeltaY;
						} else {
							startPosition.x += StartRecord.deltaX;
							startPosition.y += StartRecord.deltaY;
						}
						if (EndRecord.isCurved) {
							endPosition.x += EndRecord.controlDeltaX + EndRecord.anchorDeltaX;
							endPosition.y += EndRecord.controlDeltaY + EndRecord.anchorDeltaY;
						} else {
							endPosition.x += EndRecord.deltaX;
							endPosition.y += EndRecord.deltaY;
						}
						continue;
					}
					if (StartRecord.isChange && !EndRecord.isChange) {
						addRecode = {
							fillStyle0: StartRecord.fillStyle0,
							fillStyle1: StartRecord.fillStyle1,
							lineStyle: StartRecord.lineStyle,
							stateFillStyle0: StartRecord.stateFillStyle0,
							stateFillStyle1: StartRecord.stateFillStyle1,
							stateLineStyle: StartRecord.stateLineStyle,
							stateMoveTo: StartRecord.stateMoveTo,
							stateNewStyles: StartRecord.stateNewStyles,
							isChange: true
						};
						if (StartRecord.stateMoveTo) {
							addRecode.moveX = endPosition.x;
							addRecode.moveY = endPosition.y;
							startPosition.x = StartRecord.moveX;
							startPosition.y = StartRecord.moveY;
						}
						EndRecords.splice(i, 0, addRecode);
					} else if (!StartRecord.isChange && EndRecord.isChange) {
						addRecode = {
							fillStyle0: EndRecord.fillStyle0,
							fillStyle1: EndRecord.fillStyle1,
							lineStyle: EndRecord.lineStyle,
							stateFillStyle0: EndRecord.stateFillStyle0,
							stateFillStyle1: EndRecord.stateFillStyle1,
							stateLineStyle: EndRecord.stateLineStyle,
							stateMoveTo: EndRecord.stateMoveTo,
							stateNewStyles: EndRecord.stateNewStyles,
							isChange: true
						};
						if (EndRecord.stateMoveTo) {
							addRecode.moveX = startPosition.x;
							addRecode.moveY = startPosition.y;
							endPosition.x = EndRecord.moveX;
							endPosition.y = EndRecord.moveY;
						}
						StartRecords.splice(i, 0, addRecode);
					} else {
						if (StartRecord.stateMoveTo) {
							startPosition.x = StartRecord.moveX;
							startPosition.y = StartRecord.moveY;
						}
						if (EndRecord.stateMoveTo) {
							endPosition.x = EndRecord.moveX;
							endPosition.y = EndRecord.moveY;
						}
					}
				}
				var FillType = 0;
				var FillStyle = 0;
				length = StartRecords.length;
				for (var i = 0; i < length; i++) {
					var record = StartRecords[i];
					if (!record.isChange) {
						continue;
					}
					if (record.stateFillStyle0) {
						FillStyle = record.fillStyle0;
					}
					if (FillStyle) {
						record.stateFillStyle0 = 1;
						record.stateFillStyle1 = 1;
						if (FillType) {
							record.fillStyle0 = 0;
							record.fillStyle1 = FillStyle;
						} else {
							record.fillStyle0 = FillStyle;
							record.fillStyle1 = 0;
						}
					} else {
						record.stateFillStyle1 = 1;
						record.fillStyle1 = 0;
					}
					FillType = (FillType) ? 0 : 1;
				}
		
				var newShapeRecords = [];
				var len = StartRecords.length;
				for (var i = 0; i < len; i++) {
					var StartRecord = StartRecords[i];
					if (!StartRecord) {
						continue;
					}
					var EndRecord = EndRecords[i];
					if (!EndRecord) {
						continue;
					}
					var newRecord = {};
					if (StartRecord.isChange) {
						var MoveX = 0;
						var MoveY = 0;
						if (StartRecord.stateMoveTo === 1) {
							MoveX = StartRecord.moveX * startPer + EndRecord.moveX * per;
							MoveY = StartRecord.moveY * startPer + EndRecord.moveY * per;
						}
						newRecord = {
							fillStyle0: StartRecord.fillStyle0,
							fillStyle1: StartRecord.fillStyle1,
							lineStyle: StartRecord.lineStyle,
							moveX: MoveX,
							moveY: MoveY,
							stateFillStyle0: StartRecord.stateFillStyle0,
							stateFillStyle1: StartRecord.stateFillStyle1,
							stateLineStyle: StartRecord.stateLineStyle,
							stateMoveTo: StartRecord.stateMoveTo,
							stateNewStyles: StartRecord.stateNewStyles,
							isChange: true
						};
					} else {
						newRecord = this.lerpEdges(StartRecord, EndRecord, per);
					}
					newShapeRecords[i] = newRecord;
				}
				return newShapeRecords;
			}
			lerpEdges(start, end, per) {
				var startIsCurved = start.isCurved;
				var endIsCurved = end.isCurved;
				if (!startIsCurved && !endIsCurved) {
					return {
						deltaX: this.lerpTwips(start.deltaX, end.deltaX, per),
						deltaY: this.lerpTwips(start.deltaY, end.deltaY, per),
						isCurved: false,
						isChange: false
					};
				} else if (startIsCurved && endIsCurved) {
					return {
						controlDeltaX: this.lerpTwips(start.controlDeltaX, end.controlDeltaX, per),
						controlDeltaY: this.lerpTwips(start.controlDeltaY, end.controlDeltaY, per),
						anchorDeltaX: this.lerpTwips(start.anchorDeltaX, end.anchorDeltaX, per),
						anchorDeltaY: this.lerpTwips(start.anchorDeltaY, end.anchorDeltaY, per),
						isCurved: true,
						isChange: false
					};
				} else if (!startIsCurved && endIsCurved) {
					var startControlX = start.deltaX / 2;
					var startControlY = start.deltaY / 2;
					var startAnchorX = startControlX;
					var startAnchorY = startControlY;
					return {
						controlDeltaX: this.lerpTwips(startControlX, end.controlDeltaX, per),
						controlDeltaY: this.lerpTwips(startControlY, end.controlDeltaY, per),
						anchorDeltaX: this.lerpTwips(startAnchorX, end.anchorDeltaX, per),
						anchorDeltaY: this.lerpTwips(startAnchorY, end.anchorDeltaY, per),
						isCurved: true,
						isChange: false
					};
				} else if (startIsCurved && !endIsCurved) {
					var endControlX = end.deltaX / 2;
					var endControlY = end.deltaY / 2;
					var endAnchorX = endControlX;
					var endAnchorY = endControlY;
					return {
						controlDeltaX: this.lerpTwips(start.controlDeltaX, endControlX, per),
						controlDeltaY: this.lerpTwips(start.controlDeltaY, endControlY, per),
						anchorDeltaX: this.lerpTwips(start.anchorDeltaX, endAnchorX, per),
						anchorDeltaY: this.lerpTwips(start.anchorDeltaY, endAnchorY, per),
						isCurved: true,
						isChange: false
					};
				}
			}
			buildMorphFrame(per) {
				// Interpolate MorphShapes into a Shape.
				var shape = {
					lineStyles: [],
					fillStyles: [],
					shapeRecords: []
				};
		
				var lineStyles = cloneObject(this.data.morphLineStyles);
				var fillStyles = cloneObject(this.data.morphFillStyles);
				for (var i = 0; i < lineStyles.length; i++) {
					shape.lineStyles[i] = this.lerpLine(lineStyles[i], per);
				}
				for (var i = 0; i < fillStyles.length; i++) {
					shape.fillStyles[i] = this.lerpFill(fillStyles[i], per);
				}
		
				shape.shapeRecords = this.buildEdges(per);
		
				var bounds = shapeUtils.calculateShapeBounds(shape.shapeRecords);
		
				return {
					bounds,
					shape,
					shapeRender: null
				};
			}
		}

		module.exports = MorphShape;
	},
	"./src/core/display_objects/text.js": function(module, exports, __webpack_require__) {
		const DisplayObject = __webpack_require__("./src/core/display_object.js");
		const matrixUtils = __webpack_require__("./src/render/matrix_utils.js");
		const shapeUtils = __webpack_require__("./src/render/shape_utils.js");
		const { Transform } = __webpack_require__("./src/render/transform.js");
		
		class StaticText extends DisplayObject {
			constructor() {
				super();
				this.staticData = null;
			}
			get displayType() {
				return "StaticText";
			}
			get _debug_colorDisplayType() {
				return [255, 0, 255, 1];
			}
			static fromSwfTag(movie, tag) {
				return new TextStatic(movie, tag);
			}
			getId() {
				return this.staticData.characterId;
			}
			init(textData) {
				if (!textData) return;
				this.staticData = textData;
			}
			replaceWith(context, characterId) {
				var movie = this.getMovie();
				this.init(movie.library.getText(characterId));
				this.invalidateCachedBitmap();
			}
			runFrameAvm1(context) {
				// Noop
			}
			getMovie() {
				return this.staticData.movie;
			}
			selfBounds() {
				return this.staticData.bounds;
			}
			renderSelf(context) {
				var movie = this.getMovie();
				var renderer = context.renderer;
				var color = [0, 0, 0, 0];
				var textHeight = 0;
				var fontData = null;
				context.transformStack.stackPush(new Transform(this.staticData.matrix, [1, 1, 1, 1, 0, 0, 0, 0]));
				var glyphMatrix = [1, 0, 0, 1, 0, 0];
				var textBlocks = this.staticData.textBlocks;
				for (var i = 0; i < textBlocks.length; i++) {
					var record = textBlocks[i];
					if ("fontId" in record) fontData = movie.library.getFont(record.fontId);
					if ("x" in record) glyphMatrix[4] = record.x;
					if ("y" in record) glyphMatrix[5] = record.y;
					if ("textColor" in record) color = record.textColor;
					if ("textHeight" in record) textHeight = record.textHeight;
					var entries = record.entries;
					if (fontData) {
						var _scale = textHeight / fontData.scale;
						glyphMatrix[0] = _scale;
						glyphMatrix[3] = _scale;
						for (var idx = 0; idx < entries.length; idx++) {
							var entry = entries[idx];
							var glyph = fontData.getGlyph(entry.index);
							if (glyph) {
								var shapeRender = glyph.getShapeHandle(renderer);
								if (shapeRender) {
									context.transformStack.stackPush(new Transform(glyphMatrix, [color[0] / 255, color[1] / 255, color[2] / 255, color[3], 0, 0, 0, 0]));
									context.commands.renderShape(shapeRender, context.transformStack.getTransform());
									context.transformStack.stackPop();
									glyphMatrix[4] += entry.advance;
								}
							}
						}
					}
				}
				context.transformStack.stackPop();
			}
			hitTestShape(context, point, _) {
				var movie = this.getMovie();
				var localMatrix = this.globalToLocalMatrix();
				var textMatrix = matrixUtils.invertMatrix(this.staticData.matrix);
				var _point = matrixUtils.generateMatrix(point, matrixUtils.multiplicationMatrix(textMatrix, localMatrix));
				var fontData = null;
				var textHeight = 0;
				var glyphMatrix = [1, 0, 0, 1, 0, 0];
				var textBlocks = this.staticData.textBlocks;
				for (var i = 0; i < textBlocks.length; i++) {
					var record = textBlocks[i];
					if ("fontId" in record) fontData = movie.library.getFont(record.fontId);
					if ("x" in record) glyphMatrix[4] = record.x;
					if ("y" in record) glyphMatrix[5] = record.y;
					if ("textHeight" in record) textHeight = record.textHeight;
					var entries = record.entries;
					if (fontData) {
						var _scale = textHeight / fontData.scale;
						glyphMatrix[0] = _scale;
						glyphMatrix[3] = _scale;
						for (var idx = 0; idx < entries.length; idx++) {
							var entry = entries[idx];
							var glyph = fontData.getGlyph(entry.index);
							if (glyph) {
								var commands = glyph.commands;
								var matrix = matrixUtils.invertMatrix(glyphMatrix);
								var __point = matrixUtils.generateMatrix(_point, matrix);
								if (shapeUtils.drawCommandFillHitTest(commands, matrixUtils.generateMatrix(__point, localMatrix))) {
									return true;
								}
								glyphMatrix[4] += entry.advance;
							}
						}	
					}
				}
				return false;
			}
		}
		
		class TextStatic {
			constructor(movie, data) {
		
				this.movie = movie;
				this.data = data;
				this.characterId = data.id;
				this.settings = null;
		
				this.bounds = null;
				this.matrix = [1, 0, 0, 1, 0, 0];
				this.textBlocks = [];
		
				this.init();
			}
			init() {
				this.bounds = this.data.bounds;
				this.matrix = this.data.matrix;
				this.textBlocks = this.data.records;
			}
			setRenderSettings(settings) {
				this.settings = settings;
			}
			instantiate() {
				var d = new StaticText();
				d.init(this);
				return d;
			}
		}
		
		module.exports = StaticText;
	},
	"./src/core/display_objects/edit_text.js": function(module, exports, __webpack_require__) {
		const { TextFormat, FormatSpans } = __webpack_require__("./src/core/html/text_format.js");
		const InteractiveObject = __webpack_require__("./src/core/display_objects/interactive.js");
		const { Transform } = __webpack_require__("./src/render/transform.js");
		
		class TextField extends InteractiveObject {
			constructor() {
				super();
				this.text_bounds = { xMin: 0, yMin: 0, yMax: 0, xMax: 0 };
				this.__backgroundColor = [255, 255, 255, 1];
				this.__border_color = [0, 0, 0, 1];
				this.__text = "";
				this.textColor = [0, 0, 0, 1];
				this.fontHeight = 0;
				this.staticData = null;
				this.HAS_BACKGROUND = false;
			}
			get displayType() {
				return "TextField";
			}
			get _debug_colorDisplayType() {
				return [255, 255, 0, 1];
			}
			static fromSwfTag(movie, tag) {
				var defaultFormat = TextFormat.fromSwfTag(movie, tag);

				var text = ("initialText" in tag) ? tag.initialText : "";
				
				//var text_spans = tag.HTML ? FormatSpans.fromHTML(text, default_format, false, movie.getVersion()) : FormatSpans.fromText(text, default_format);

				var r = new EditTextStatic(movie);
				r.data = tag;
				r.characterId = tag.id;
				r.textFormat = defaultFormat;
				return r;
			}
			getMovie() {
				return this.staticData.movie;
			}
			getId() {
				return this.staticData.characterId;
			}
			init(sd) {
				this.staticData = sd;
				var textInfo = sd.data;
				this.text_bounds = textInfo.bounds;
				if (textInfo.border) this.HAS_BACKGROUND = true;
				this.__text = ("initialText" in textInfo) ? textInfo.initialText : "";
				if (textInfo.HTML) this.__text = "";
				if ("fontHeight" in textInfo) this.fontHeight = textInfo.fontHeight;
				if ("textColor" in textInfo) this.textColor = textInfo.textColor.slice(0);
			}
			selfBounds() {
				return this.text_bounds;
			}
			postInstantiation(context, initObject, instantiatedBy, runFrame) {
				this.setDefaultInstanceName(context);
				context.avm1.addExecuteList(this);
			}
			runFrameAvm1(context) {
				// Noop
			}
			renderSelf(context) {
				var font = context.library.deviceFont;
				var sc = this.fontHeight / font.scale;
				var xMin = this.text_bounds.xMin;
				var yMin = this.text_bounds.yMin;
				var lists = this.__text.split("\r");
				var x = xMin;
				var y = yMin;
				for (let i = 0; i < lists.length; i++) {
					y += (font.ascent * sc);
					const element = lists[i];
					this.renderText(context, font, element, x, y);
				}
			}
			renderText(context, font, text, x, y) {
				var renderer = context.renderer;
				var rrr = 0;
				var sc = this.fontHeight / font.scale;
				context.transformStack.stackPush(new Transform([1, 0, 0, 1, 0, 0], [this.textColor[0] / 255, this.textColor[1] / 255, this.textColor[2] / 255, this.textColor[3], 0, 0, 0, 0]));
				for (var i = 0; i < text.length; i++) {
					var glyph = font.getGlyphForChar(text.charCodeAt(i));
					if (glyph) {
						var shapeHandle = glyph.getShapeHandle(renderer);
						context.transformStack.stackPush(new Transform([sc, 0, 0, sc, x + rrr, y], [1, 1, 1, 1, 0, 0, 0, 0]));
						context.commands.renderShape(shapeHandle, context.transformStack.getTransform());
						context.transformStack.stackPop();
						rrr += glyph.advance * sc;
					}
				}
				context.transformStack.stackPop();
			}
		}
		
		class EditTextStatic {
			constructor(movie) {
				this.movie = movie;
				this.data = null;
				this.characterId = 0;
				this.textFormat = null;
				this.settings = null;
			}
			instantiate() {
				var t = new TextField();
				t.init(this);
				return t;
			}
			setRenderSettings(settings) {
				this.settings = settings;
			}
		}
		
		module.exports = TextField;
	},
	"./src/core/display_objects/video.js": function(module, exports, __webpack_require__) {
		const DisplayObject = __webpack_require__("./src/core/display_object.js");
		const log = __webpack_require__("./src/core/log.js");
		
		class VideoDisplay extends DisplayObject {
			constructor() {
				super();
				this.__size = [0, 0];

				this.isInstantiated = false;
				this._result = 0;

				this.isSmoothed = false;
				this.keyframes = [];

				this.decoded_frame = null;

				this._debug_decoder_time = 0;
			}
			get displayType() {
				return "Video";
			}
			get _debug_colorDisplayType() {
				return [255, 100, 100, 1];
			}
			static fromSwfTag(movie, tag) {
				return new DefineVideoData(movie, tag);
			}
			getId() {
				return this.staticData.characterId;
			}
			getMovie() {
				return this.staticData.movie;
			}
			postInstantiation(context, initObject, instantiatedBy, runFrame) {
				context.avm1.addExecuteList(this);
				var streamdef = this.staticData.data;
				this.isSmoothed = !!streamdef.isSmoothed;
				var stream = context.video.registerVideoStream(streamdef.numFrames, [streamdef.width, streamdef.height], streamdef.codec, streamdef.codec);
				var keyframes = [];
				if (!stream.decoder) return;
				for (let i = 0; i < this.staticData.frames.length; i++) {
					var frame = this.staticData.frames[i];
					if (!frame) continue;
					let dep = context.video.preloadVideoStreamFrame(stream, {
						codec: streamdef.codec,
						data: frame,
						frameId: i,
					});
					keyframes[i] = !!dep;
				}
				this.keyframes = keyframes;
				var starting_seek = (this.isInstantiated ? 0 : this._result);
				this.isInstantiated = true;
				this._result = stream;
				this.seek(context, starting_seek);
			}
			selfBounds() {
				return {
					xMin: 0,
					yMin: 0,
					xMax: this.__size[0] * 20,
					yMax: this.__size[1] * 20,
				};
			}
			setRatio(ratio) {
				this.seek(ratio);
			}
			seek(context, frame_id) {
				this.invalidateCachedBitmap();
				if (!this.isInstantiated) {
					this._result = frame_id;
					return;
				}
				let last_frame = this.decoded_frame ? this.decoded_frame[0] : -1;
				if (last_frame == frame_id) return;
				let is_ordered_seek = (frame_id == 0) || frame_id == (last_frame + 1);
				let sweep_from = frame_id;
				if (!is_ordered_seek) {
					var keyframes = this.keyframes;
					let prev_keyframe_id = 0;
					for (let i = frame_id; i >= 0; i--) {
						if (i in keyframes) {
							const isKeyframe = keyframes[i];
							if (!isKeyframe) {
								prev_keyframe_id = i;
								break;
							}
						}
					}
					if (last_frame !== null) {
						if (frame_id > last_frame) {
							sweep_from = Math.max(prev_keyframe_id, last_frame + 1);
						} else {
							sweep_from = prev_keyframe_id;
						}
					} else {
						sweep_from = prev_keyframe_id;
					}
				}
				var fr = sweep_from;
				while (fr <= frame_id) {
					this.seek_internal(context, fr);
					fr++;
				}
			}
			seek_internal(context, frameId) {
				if (!this.isInstantiated) return;
				let stream = this._result;
				var res;
				var frame = this.staticData.frames[frameId];
				if (frame) {
					var encframe = {
						codec: this.staticData.data.codec,
						data: frame,
						frameId,
					};
					try {
						var _ = Date.now();
						res = context.video.decodeVideoStreamFrame(stream, encframe, context.renderer);
						this._debug_decoder_time = Date.now() - _;
					} catch(e) {
						log.error("Got error when seeking to video frame " + frameId + ":", e);
						return;
					}
				} else {
					if (!this.decoded_frame) return;
					res = this.decoded_frame[1];
				}
				this.decoded_frame = [frameId, res];
			}
			getDebugVideoText() {
				if (this.isInstantiated) {
					return this.staticData.data.codec + ":" + this.getId() + " " + this._debug_decoder_time + "ms";
				} else {
					return "";
				}
			}
			renderSelf(context) {
				if (this.decoded_frame && this.decoded_frame[1]) {
					context.commands.renderBitmap(this.decoded_frame[1], context.transformStack.getTransform(), this.isSmoothed);	
				}
			}
		}
		class DefineVideoData {
			constructor(movie, data) {
				this.movie = movie;
				this.characterId = data.id;
				this.width = data.width;
				this.height = data.height;
				this.data = data;
				this.frames = [];
			}
			instantiate() {
				var v = new VideoDisplay();
				v.__size[0] = this.width;
				v.__size[1] = this.height;
				v.staticData = this;
				return v;
			}
			preloadSwfFrame(tag) {
				this.frames[tag.frameNum] = tag.videoData;
			}
		}
		module.exports = VideoDisplay;
	},
	"./src/core/display_objects/bitmap.js": function(module, exports, __webpack_require__) {
		const DisplayObject = __webpack_require__("./src/core/display_object.js");
		
		class BitmapGraphic extends DisplayObject {
			constructor() {
				super();
				this.staticBitmap = null;
			}
			get displayType() {
				return "Bitmap";
			}
			get _debug_colorDisplayType() {
				return [255, 155, 0, 1];
			}
			static createStatic(movie, id) {
				return new BitmapGraphicData(movie, id);
			}
			getMovie() {
				return this.staticBitmap.movie;
			}
			postInstantiation(context, initObject, instantiatedBy, runFrame) {
				context.avm1.addExecuteList(this);
			}
			selfBounds() {
				if (this.staticBitmap) {
					return this.staticBitmap.getBounds();
				} else {
					return DisplayObject.prototype.selfBounds.call(this);
				}
			}
			renderSelf(context) {
				if (this.staticBitmap) {
					var renderer = context.renderer;
					var tex = this.staticBitmap.getTexture(renderer);
					if (tex) {
						context.commands.renderBitmap(tex, context.transformStack.getTransform(), false);
					}
				}
			}
		}
		
		class BitmapGraphicData {
			constructor(movie, id) {
				this.movie = movie;
				this.characterId = id;
				this.image = null;
				this.texture = null;
			}
			setBitmap(image) {
				this.image = image;
			}
			instantiate() {
				var d = new BitmapGraphic();
				d.staticBitmap = this;
				return d;
			}
			getTexture(renderer) {
				if (!this.texture) {
					var tex = renderer.registerBitmap(this.image);
					this.texture = tex;
				}
				return this.texture;
			}
			getBounds() {
				return {
					xMin: 0,
					yMin: 0,
					xMax: this.image.width * 20,
					yMax: this.image.height * 20,
				};
			}
		}
		
		module.exports = BitmapGraphic;
	},
	"./src/core/display_objects/avm1_button.js": function(module, exports, __webpack_require__) {
		const DisplayObjectContainer = __webpack_require__("./src/core/display_objects/container.js");
		const log = __webpack_require__("./src/core/log.js");
		const Filter = __webpack_require__("./src/render/filters.js");
		
		const typeButton = {
			"up": "buttonStateUp",
			"over": "buttonStateOver",
			"down": "buttonStateDown",
		}
		const typeButtonCxform = {
			"up": 0,
			"over": 1,
			"down": 2,
		}
		
		class Avm1Buttom extends DisplayObjectContainer {
			constructor() {
				super();
				this.staticData = null;
				this.__initialized = false;
				this._records = null;
				this._recordSounds = null;
				this._actions = [];
				this._recordColorTransforms = null;
				this._state = "";
				this.__clickflag = false;
				this.___appendclick = false;
				this.___object = null;
				this.___hitArea = [];
			}
			get displayType() {
				return "Buttom";
			}
			get _debug_colorDisplayType() {
				return [0, 255, 0, 1];
			}
			static fromSwfTag(movie, tag) {
				return new ButtonData(movie, tag);
			}
			getMovie() {
				return this.staticData.movie;
			}
			getId() {
				return this.staticData.characterId;
			}
			init(i) {
				this.staticData = i;
				this._records = i.data.records;
				this._soundInfo = i.soundInfo;
				this._actions = i.actions;
				this._recordColorTransforms = i.colorTransforms;
			}
			postInstantiation(context, initObject, instantiatedBy, runFrame) {
				this.setDefaultInstanceName(context);
				context.avm1.addExecuteList(this);
			}
			setState(context, state) {
				var movie = this.getMovie();
				this._state = state;
				var removedDepths = [];
		
				var cs = this.iterRenderList();
				for (let f = 0; f < cs.length; f++) {
					const jdf = cs[f];
					const de = jdf.getDepth();
					removedDepths[de] = jdf;
				}
		
				var children = [];
				for (var i = 0; i < this._records.length; i++) {
					var record = this._records[i];
					if (record[typeButton[state]]) {
		
						removedDepths[record.depth] = null;
		
						var child = null;
		
						var child1 = this.childByDepth(record.depth);
						if (child1) {
							if (child1.getId() == record.characterId) {
								child = child1;
							}
						}
						if (!child) {
							child = movie.library.instantiateById(record.characterId);
							child.setParent(context, this);
							child.setDepth(record.depth);
							children.push([record.depth, child]);
						}
		
						// Set transform of child (and modify previous child if it already existed)
						child.applyMatrix(record.matrix);
						if ("colorTransform" in record) {
							child.applyColorTransform(record.colorTransform);
						} else {
							child.applyColorTransform([1, 1, 1, 1, 0, 0, 0, 0]);
						}
						if ("blendMode" in record) {
							child.setBlendMode(record.blendMode);
						} else {
							child.setBlendMode(0);
						}
						if ("filters" in record) {
							var filters = record.filters;
							var result = [];
							for (let i = 0; i < filters.length; i++) {
								const _ = Filter.from(filters[i]);
								if (_) result.push(_);
							}
							child.setFilters(result);
						} else {
							child.setFilters([]);
						}
					}
				}
				for (let k = 0; k < removedDepths.length; k++) {
					const d = removedDepths[k];
					if (d) {
						var child = this.childByDepth(k);
						if (child) {
							this.removeChild(context, child);
						}
					}
				}
				for (let o = 0; o < children.length; o++) {
					const c = children[o];
					var depth = c[0];
		
					var lastC = this.childByDepth(depth);
					if (lastC) {
						this.removeChild(context, lastC);
					}
		
					var child = c[1];
		
					// Initialize new child.
					child.postInstantiation(context, null, null, false);
					child.runFrameAvm1(context);

					if (context.player.useLastBound) {
						child.debugSetLastMC(context.player, true, child.getMatrix(), child.getColorTransform());
						child.debugSetLastBound(context.player, true, child.getBounds());
					}
					
					this.replaceAtDepth(context, child, depth);
				}
		
				if (this._soundInfo && !this.__clickflag) {
					var g = this._soundInfo[state];
					if (g) {
						var sound = movie.library.getSound(g.id);
						if (sound) {
							this.playSound(context, sound, g.info);
						}
					}
				}
				if (this._recordColorTransforms) {
					var g = this._recordColorTransforms[typeButtonCxform[state]];
					if (g) {
						this.applyColorTransform(g);
					}
				}
				this.invalidateCachedBitmap();
			}
			playSound(context, sound, soundInfo) {
				switch (soundInfo.event) {
					case "event":
						context.startSound(sound, soundInfo, this, null);
						break;
					case "start":
						if (!context.isSoundPlayingWithHandle(sound)) {
							context.startSound(sound, soundInfo, this, null);
						}
						break;
					case "stop":
						context.stopSoundsWithHandle(sound);
						break;
				}
			}
			runFrameAvm1(context) {
				var movie = this.getMovie();
				if (!this.__initialized) {
					var new_children = [];
					this.__initialized = true;
					this.setState(context, "up");
					for (var i = 0; i < this._records.length; i++) {
						var record = this._records[i];
						if (record.buttonStateHitTest) {
							var child = movie.library.instantiateById(record.characterId);
							if (child) {
								child.applyMatrix(record.matrix);
								child.setParent(context, this);
								child.setDepth(record.depth);
								new_children.push([child, record.depth]);
							} else {
								log.error("Button ID: " + this.getId() + " could not instantiate child ID: " + record.characterId);
							}
						}
					}
					for (let o = 0; o < new_children.length; o++) {
						var c = new_children[o];
						var child = c[0];
						var depth = c[1];
						child.postInstantiation(context, null, null, false);
						this.___hitArea[depth] = child;
					}
				}
			}
			avm1Unload() {
				this.AVM1_REMOVED = true;
			}
			renderSelf(context) {
				this.renderChildren(context);
			}
			clickAction(context, typ) {
				var rootClip = this.getParent();
				if (rootClip) {
					for (var i = 0; i < this._actions.length; i++) {
						var g = this._actions[i];
						if (g[typ]) {
							context.actionQueue.queueAction(rootClip, {
								type: "normal",
								caches: g.actionScript
							}, false);
						}
					}
				}
			}
			mousePickAvm1(context, point, _) {
				for (let i = 0; i < this.___hitArea.length; i++) {
					const child = this.___hitArea[i];
					if (child) {
						if (child.hitTestShape(null, point, null)) {
							return this;
						}
					}
				}
			}
		}
		class ButtonData {
			constructor(movie, data) {
				this.movie = movie;
				this.data = data;
				this.characterId = data.id;

				this.actions = data.actions || [];

				this.soundInfo = {};
				this.colorTransforms = [];
			}
			instantiate() {
				var b = new Avm1Buttom();
				b.init(this);
				return b;
			}
			setSounds(tag) {
				/*
					buttonStateUpSoundInfo
					buttonStateUpSoundId
					
					buttonStateOverSoundInfo
					buttonStateOverSoundId
					
					buttonStateDownSoundInfo
					buttonStateDownSoundId
					
					buttonStateHitTestSoundInfo
					buttonStateHitTestSoundId
				*/
				if (tag.buttonStateUpSoundInfo) {
					this.soundInfo.up = {
						id: tag.buttonStateUpSoundId,
						info: tag.buttonStateUpSoundInfo
					};
				}
				if (tag.buttonStateOverSoundInfo) {
					this.soundInfo.over = {
						id: tag.buttonStateOverSoundId,
						info: tag.buttonStateOverSoundInfo
					};
				}
				if (tag.buttonStateDownSoundInfo) {
					this.soundInfo.down = {
						id: tag.buttonStateDownSoundId,
						info: tag.buttonStateDownSoundInfo
					};
				}
				if (tag.buttonStateHitTestSoundInfo) {
					this.soundInfo.hit = {
						id: tag.buttonStateHitTestSoundId,
						info: tag.buttonStateHitTestSoundInfo
					};
				}
			}
			setColorTransforms(tag) {
				var colorTransforms = tag.colorTransforms;
				if (colorTransforms) {
					this.colorTransforms = colorTransforms;
				}
			}
		}
		module.exports = Avm1Buttom;
	},
	"./src/core/display_objects/movie_clip.js": function(module, exports, __webpack_require__) {
		const Character = __webpack_require__("./src/core/character.js");
		const DisplayObjectContainer = __webpack_require__("./src/core/display_objects/container.js");
		const Graphic = __webpack_require__("./src/core/display_objects/graphic.js");
		const MorphShape = __webpack_require__("./src/core/display_objects/morph_shape.js");
		const StaticText = __webpack_require__("./src/core/display_objects/text.js");
		const TextField = __webpack_require__("./src/core/display_objects/edit_text.js");
		const VideoDisplay = __webpack_require__("./src/core/display_objects/video.js");
		const BitmapGraphic = __webpack_require__("./src/core/display_objects/bitmap.js");
		const Avm1Buttom = __webpack_require__("./src/core/display_objects/avm1_button.js");
		const BinaryData = __webpack_require__("./src/core/binary_data.js");
		const FlashFont = __webpack_require__("./src/core/font.js");
		const { SwfSlice, decode_tags } = __webpack_require__("./src/core/tag_utils.js");
		const {
			decodeDefineBitsJpeg,
			glueTablesToJpeg,
			decodeDefineBitsLossless
		} = __webpack_require__("./src/render/utils.js");
		
		const log = __webpack_require__("./src/core/log.js");
		
		function objectCopy(src) {
			var obj = {};
			for (var name in src) {
				obj[name] = src[name];
			}
			return obj;
		}
		
		function removeIdArray(array, i) {
			if (array.length) {
				if (i >= array.length) {
					array.pop();
				} else {
					array.splice(i, 1);
				}
			}
		}
		const tagUtils_decodeTags = function(reader, callback) {
			while (reader.pos < reader.tags.length) {
				var c = callback(reader.tags[reader.pos]);
				reader.pos++;
				if (c == "exit") {
					break;
				}
			}
		}

		class SwfTagStream {
			constructor(pos, tags) {
				this.pos = pos;
				this.tags = tags;
			}
			toSwfTag() {
				return {
					pos: this.pos,
					tags: this.tags
				}
			}
		}
		class GotoPlaceObject {
			constructor(frame, place, isRewind, index) {
				this.frame = frame;
				this.place = place;
				this.isRewind = isRewind;
				this.index = index;
		
				this.placeData = objectCopy(place);
				if (isRewind) {
					if (("characterId" in place) && !place.isMove) {
						if (!("matrix" in place)) {
							this.placeData.matrix = [1, 0, 0, 1, 0, 0];
						}
						if (!("colorTransform" in place)) {
							this.placeData.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
						}
						if (!("blendMode" in place)) {
							this.placeData.blendMode = 1;
						}
						if (!("filters" in place)) {
							this.placeData.filters = [];
						}
						/*if ("visible" in place) {
							this.placeData.visible = place.visible;
						}*/
						if (!("ratio" in place)) {
							this.placeData.ratio = 0;
						}
						if (!("backgroundColor" in place)) {
							//this.placeData.backgroundColor = [0, 0, 0, 0];
						}   
					}
				}
			}
			getDepth() {
				return this.placeData.depth;
			}
			merge(next) {
				let cur_place = this.placeData;
				let next_place = next.placeData;
				if (("characterId" in next_place)) {
					cur_place.characterId = next_place.characterId;
					cur_place.isMove = next_place.isMove;
					this.frame = next.frame;
				}
				if ("matrix" in next_place) {
					cur_place.matrix = next_place.matrix;
				}
				if ("colorTransform" in next_place) {
					cur_place.colorTransform = next_place.colorTransform;
				}
				if ("visible" in next_place) {
					cur_place.visible = next_place.visible;
				}
				if ("blendMode" in next_place) {
					cur_place.blendMode = next_place.blendMode;
				}
				if ("filters" in next_place) {
					cur_place.filters = next_place.filters;
				}
				if ("ratio" in next_place) {
					cur_place.ratio = next_place.ratio;
				}
				if ("backgroundColor" in next_place) {
					cur_place.backgroundColor = next_place.backgroundColor;
				}
				// Purposely omitted properties:
				// name, clip_depth, clip_actions, amf_data
				// These properties are only set on initial placement in `MovieClip::instantiate_child`
				// and can not be modified by subsequent PlaceObject tags.
			}
		}
		class MovieClip extends DisplayObjectContainer {
			constructor() {
				super();
		
				this.staticData = null;
		
				this.currentFrame = 0;
				this.framesloaded = 0;
				
				this.audioStream = null;
				this.tagStreamPos = 0;
		
				this.___object = null;
		
				// flags
				this.isPlaying = true;
				this.isLoop = true;
		
				/// Whether this `MovieClip` has run its initial frame.
				this.INITIALIZED = false;
				this.PROGRAMMATICALLY_PLAYED = false;
				this.EXECUTING_AVM2_FRAME_SCRIPT = false;
				this.LOOP_QUEUED = false;
			}
			get displayType() {
				return "MovieClip";
			}
			get _debug_colorDisplayType() {
				return [255, 0, 0, 1];
			}
			static playerRootMovie(activation, movie) {
				let num_frames = movie.numFrames;
				var root = MovieClipStatic.withData(0, SwfSlice.from(movie), num_frames);
				var s = root.instantiate();
				s.setIsRoot(true);
				return s;
			}
			getMovie() {
				return this.staticData.swf.movie;
			}
			getId() {
				return this.staticData.characterId;
			}
			getTotalFrames() {
				return this.staticData.totalframes;
			}
			getFramesloaded() {
				return this.staticData.preloadProgress.curPreloadFrame - 1;
			}
			postInstantiation(context, initObject, instantiatedBy, runFrame) {
				this.setDefaultInstanceName(context);
				context.avm1.addExecuteList(this);
				this.constructAvm1ValueObject(context, initObject, instantiatedBy, runFrame);
			}
			constructAvm1ValueObject(context, initObject, instantiatedBy, runFrame) {
				
			}
			preload(context, _) {
				return this.staticData.preload(context, _);
			}
			play(context) {
				// Can only play clips with multiple frames.
				if (this.getFramesloaded() > 1) {
					this.isPlaying = true;
				}
			}
			stop(context) {
				this.isPlaying = false;
				this.stopAudioStream(context);
			}
			determineNextFrame() {
				var totalframes = this.getFramesloaded();
				if (this.currentFrame < totalframes) {
					return "next";
				} else if (totalframes > 1) {
					return "first";
				} else {
					return "same";
				}
			}
			runIntervalFrame(context, runDisplayAction, runSounds) {
				let nextFrame = this.determineNextFrame();
				switch (nextFrame) {
					case "next":
						this.currentFrame++;
						if ((!this.isLoop) && (this.currentFrame == this.getFramesloaded())) {
							this.stop(context);
						}
						break;
					case "first":
						this.runGoto(context, 1, true);
						return;
					case "same":
						this.stop(context);
						break;
				}
				var reader = new SwfTagStream(this.tagStreamPos, this.staticData.tags);
				let tagCallback = (tag) => {
					switch (tag.tagcode) {
						case 4:
						case 26:
						case 70:
						case 94:
							if (runDisplayAction) {
								this.placeObject(context, tag);
							}
							break;
						case 5:
						case 28:
							if (runDisplayAction) {
								this.removeObject(context, tag);
							}
							break;
						case 15:
						case 89:
							if (runSounds) {
								this.startSound(context, tag);
							}
							break;
						case 19:
							if (runSounds) {
								this.soundStreamBlock(context, reader.toSwfTag());
							}
							break;
						case 12:
							this.doAction(context, tag);
							break;
						case 9:
							context.stage.setBackgroundColor(tag.rgb);
							break;
						case 1:
							return "exit";
					}
					return "continue";
				};
				tagUtils_decodeTags(reader, tagCallback);
		
				this.tagStreamPos = reader.pos;
		
				// Check if our audio track has finished playing.
				if (this.audioStream) {
					if (!context.isSoundPlaying(this.audioStream)) {
						this.audioStream = null;
					}
				}
			}
			runGoto(context, frame, isImplicit) {
				let frameBeforeRewind = this.currentFrame;
				this.setSkipNextEnterFrame(false);
		
				var gotoCommands = [];
		
				this.stopAudioStream(context);
		
				let isRewind = (frame <= this.currentFrame);
				if (isRewind) {
					// Because we can only step forward, we have to start at frame 1
					// when rewinding. We don't actually remove children yet because
					// otherwise AS3 can observe byproducts of the rewinding process.
		
					this.tagStreamPos = 0;
					this.currentFrame = 0;
				}
		
				let fromFrame = this.currentFrame;
		
				if (isImplicit) {
					this.setLoopQueued();
				}
		
				var index = 0;
		
				// Sanity; let's make sure we don't seek way too far.
				let clamped_frame = frame;
		
				var reader = new SwfTagStream(this.tagStreamPos, this.staticData.tags);
				
				var frame_pos = reader.pos;
		
				while (this.currentFrame < clamped_frame) {
					this.currentFrame++;
		
					frame_pos = reader.pos;
		
					let tagCallback = function (tag) {
						switch (tag.tagcode) {
							case 4:
							case 26:
							case 70:
							case 94:
								index++;
								this.gotoPlaceObject(tag, gotoCommands, isRewind, index);
								break;
							case 5:
							case 28:
								this.gotoRemoveObject(context, tag, gotoCommands, isRewind, fromFrame);
								break;
							case 1:
								return "exit";
						}
						return "continue";
					};
					tagUtils_decodeTags(reader, tagCallback.bind(this));
				}
		
				let hitTargetFrame = this.currentFrame == frame;
		
				if (isRewind) {
					// Remove all display objects that were created after the
					// destination frame.
					//
					// We do this after reading the clip timeline so that AS3 can't
					// observe side effects of the rewinding process.
					//
					// TODO: We want to do something like self.children.retain here,
					// but BTreeMap::retain does not exist.
					// TODO: Should AS3 children ignore GOTOs?
		
					let children = this.iterRenderList().filter(function (clip) {
						return clip.getPlaceFrame() > frame;
					});
		
					//collect
					for (var i = 0; i < children.length; i++) {
						var child = children[i];
						this.removeChild(context, child);
					}
				}
		
				let run_goto_command = (params) => {
					var child_entry = this.childByDepth(params.getDepth());
					var place = params.placeData;
					if (child_entry) {
						if ("characterId" in place) {
							child_entry.replaceWith(context, place.characterId);
							child_entry.applyPlaceObject(context, place);
							child_entry.setPlaceFrame(params.frame);
						} else {
							if (place.isMove) {
								child_entry.applyPlaceObject(context, place);
							}
						}
					} else {
						if ("characterId" in place) { // Place Replace
							var clip = this.instantiateChild(context, place.characterId, params.getDepth(), place);
							if (clip) {
								clip.setPlaceFrame(params.frame);
							}
						} else {
							log.error("Unexpected PlaceObject during goto", params);
							if (place.isMove) {
							}
						}
					}
				}   
		
				gotoCommands.filter(function (params) {
					return params.frame < frame;
				}).forEach((goto) => {
					run_goto_command(goto)
				});
				
				// Next, run the final frame for the parent clip.
				// Re-run the final frame without display tags (DoAction, etc.)
				// Note that this only happens if the frame exists and is loaded;
				// e.g. gotoAndStop(9999) displays the final frame, but actions don't run!
				if (hitTargetFrame) {
					this.currentFrame--;
					this.tagStreamPos = frame_pos;
					this.runIntervalFrame(context, false, frame != frameBeforeRewind);
				} else {
					this.currentFrame = clamped_frame;
				}
		
				gotoCommands.filter(function (params) {
					return params.frame >= frame;
				}).forEach((goto) => {
					run_goto_command(goto)
				});
			}
			gotoPlaceObject(place, gotoCommands, isRewind, index) {
				var depth = place.depth;
				var gotoPlace = new GotoPlaceObject(this.currentFrame, place, isRewind, index);
				var j = false;
				for (let i = 0; i < gotoCommands.length; i++) {
					const gc = gotoCommands[i];
					if (gc.getDepth() == depth) {
						gc.merge(gotoPlace);
						j = true;
						break;
					}
				}
				if (!j) {
					gotoCommands.push(gotoPlace);
				}
			}
			gotoRemoveObject(context, place, gotoCommands, isRewind, fromFrame) {
				var depth = place.depth;
				for (let i = 0; i < gotoCommands.length; i++) {
					const gc = gotoCommands[i];
					if (gc.getDepth() == depth) {
						removeIdArray(gotoCommands, i);
						break;
					}
				}
				if (!isRewind) {
					let to_frame = this.currentFrame;
					this.currentFrame = fromFrame;
					var child = this.childByDepth(depth);
					if (child) {
						this.removeChild(context, child);
					}
					this.currentFrame = to_frame;
				}
			}
			nextFrame(context) {
				if (this.currentFrame < this.getFramesloaded()) {
					this.gotoFrame(context, this.currentFrame + 1, true);
				}
			}
			prevFrame(context) {
				if (this.currentFrame > 1) {
					this.gotoFrame(context, this.currentFrame - 1, true);
				}
			}
			gotoFrame(context, frame, stop) {
				if (stop) {
					this.stop(context);
				} else {
					this.play(context);
				}
		
				var _frame = Math.max(frame, 1);
		
				if (_frame != this.currentFrame) {
					this.runGoto(context, _frame, false);
				}
			}
			setLoopQueued() {
				this.LOOP_QUEUED = true;
			}
			unsetLoopQueued() {
				this.LOOP_QUEUED = false;
			}
			renderSelf(context) {
				this.renderChildren(context);
			}
			runFrameAvm1(context) {
				var isLoadFrame = !this.INITIALIZED;
				if (isLoadFrame) {
					this.INITIALIZED = true;
				}
				// Run my SWF tags.
				// In AVM2, SWF tags are processed at enterFrame time.
				if (this.isPlaying) {
					this.runIntervalFrame(context, true, true);
				}
			}
			instantiateChild(context, id, depth, place) {
				var movie = this.getMovie();
				let child = movie.library.instantiateById(id);
				if (child) {
					let prevChild = this.replaceAtDepth(context, child, depth);
		
					// Set initial properties for child.
					child.INSTANTIATED_BY_TIMELINE = true;
					child.setDepth(depth);
					child.setParent(context, this);
					child.setPlaceFrame(this.currentFrame);
		
					// Apply PlaceObject parameters.
					child.applyPlaceObject(context, place);
					if ("name" in place) {
						/*
						let name = AvmString::new(context.gc_context, name.decode(encoding));
						child.set_name(context.gc_context, name);
						child.set_has_explicit_name(context.gc_context, true);
						*/
						child.setName(place.name);
						child.HAS_EXPLICIT_NAME = true;
					}
					if ("clipDepth" in place) {
						child.clipDepth = place.clipDepth;
					}
					// Clip events only apply to movie clips.
					if ("clipActions" in place) {
						//child.setClipEventHandlers(place.clipActions);
					}
					// TODO: Missing PlaceObject property: amf_data
					// Run first frame.
					child.postInstantiation(context, null, null, false);
					child.enterFrame(context);
		
					// In AVM1, children are added in `run_frame` so this is necessary.
					// In AVM2 we add them in `construct_frame` so calling this causes
					// duplicate frames
					child.runFrameAvm1(context);

					if (context.player.useLastBound) {
						child.debugSetLastMC(context.player, true, child.getMatrix(), child.getColorTransform());
						child.debugSetLastBound(context.player, true, child.getBounds());    
					}
				} else {
					log.error("Unable to instantiate display node id, reason being");
				}
				return child;
			}
			enterFrame(context) {
				let skipFrame = this.shouldSkipNextEnterFrame();
				//Child removals from looping gotos appear to resolve in reverse order.
				var children = this.iterRenderList();
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					if (skipFrame) {
						// If we're skipping our current frame, then we want to skip it for our children
						// as well. This counts as the skipped frame for any children that already
						// has this set to true (e.g. a third-level grandchild doesn't skip three frames).
						// We'll still call 'enter_frame' on the child - it will recurse, propagating along
						// the flag, and then set its own flag back to 'false'.
						//
						// We do *not* propagate `skip_frame=false` down to children, since a normally
						// executing parent can add a child that should have its first frame skipped.
						// FIXME - does this propagate through non-movie-clip children (Loader/Button)?
						child.setSkipNextEnterFrame(true);
					}
					child.enterFrame(context);
				}
				if (skipFrame) {
					this.setSkipNextEnterFrame(false);
				}
			}
			stopAudioStream(context) {
				if (this.audioStream) { // self.audio_stream.take()
					context.stopSound(this.audioStream);
					this.audioStream = null;
				}
			}
			getObject() {
				return this.___object;
			}
			avm1Unload(context) {
				var children = this.iterRenderList();
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					child.avm1Unload(context);
				}
				this.stopAudioStream(context);
				this.AVM1_REMOVED = true;
			}
			getTotalBytes() {
				var movie = this.getMovie();
				if (this.isRoot()) {
					return movie.uncompressedLength;
				} else {
					return this.tagStreamLen();
				}
			}
			getLoadedBytes() {
				let progress_read = this.staticData.preloadProgress;
				if (progress_read.nextPreloadChunk === null) {
					return Math.max(this.getTotalBytes(), 0);
				} 
				let swf_header_size = Math.max(this.getTotalBytes(), 0) - this.tagStreamLen();
				return swf_header_size + progress_read.nextPreloadChunk;
			}
			tagStreamLen() {
				return this.staticData.swf.end - this.staticData.swf.start;
			}

			// Control tags
			doAction(context, tag) {
				if (this.getMovie().isActionScript3()) {
					log.warn("DoAction tag in AVM2 movie");
					return;	
				}
				context.actionQueue.queueAction(this, {
					type: "normal",
					caches: tag.action
				}, false);
			}
			placeObject(context, place) {
				if ("characterId" in place) {
					if (place.isMove) {
						var child = this.childByDepth(place.depth);
						if (child) {
							child.replaceWith(context, place.characterId);
							child.applyPlaceObject(context, place);
							child.setPlaceFrame(this.currentFrame);
						}
					} else {
						this.instantiateChild(context, place.characterId, place.depth, place);
					}
				} else {
					if (place.isMove) {
						var child = this.childByDepth(place.depth);
						if (child) child.applyPlaceObject(context, place);
					}
				}
			}
			removeObject(context, re) {
				var child = this.childByDepth(re.depth);
				if (child) {
					this.removeChild(context, child);
				}
			}
			soundStreamBlock(context, tag) {
				if (this.isPlaying) {
					var stream_info = this.staticData.audioStreamInfo;
					if (stream_info && !this.audioStream) {
						var audioStream = context.startStream(this, this.currentFrame, tag, stream_info);
						this.audioStream = audioStream;
					}
				}
			}
			startSound(context, tag) {
				var movie = this.getMovie();
				var sound = movie.library.getSound(tag.id);
				if (sound) {
					var soundInfo = tag.info;
					switch (soundInfo.event) {
						case "event":
							context.startSound(sound, soundInfo, this, null);
							break;
						case "start":
							if (!context.isSoundPlayingWithHandle(sound)) {
								context.startSound(sound, soundInfo, this, null);
							}
							break;
						case "stop":
							context.stopSoundsWithHandle(sound);
							break;
					}
				}
			}
			mousePickAvm1(context, point, _) {
				var children = this.iterRenderList();
				var result = null;
				for (let i = children.length - 1; i >= 0; i--) {
					const child = children[i];
					if (!result) result = child.mousePickAvm1(context, point, false);
				}
				return result;
			}
		}

		class PreloadProgress {
			constructor() {
				this.nextPreloadChunk = 0;
				this.curPreloadFrame = 1;
				this.curPreloadSymbol = null;
			}
		}
		
		class MovieClipStatic {
			constructor() {
				this.tags = [];
				this.totalframes = 0;
				this.characterId = 0;
				this.audioStreamInfo = null;
				this.exportedName = null;
				this.preloadProgress = new PreloadProgress();
			}
			static withData(id, swf, totalFrames) {
				var mcs = new MovieClipStatic();
				mcs.characterId = id;
				mcs.swf = swf;
				mcs.totalframes = totalFrames;
				return mcs;
			}
			instantiate() {
				var clip = new MovieClip();
				clip.staticData = this;
				return clip;
			}
			getMovie() {
				return this.swf.movie;
			}
			preload(context, chunkLimit) {
				var timelineTags = this.tags;
				const preloadProgress = this.preloadProgress;
				var nextPreloadChunk = preloadProgress.nextPreloadChunk;
				var curPreloadSymbol = preloadProgress.curPreloadSymbol;
				if (nextPreloadChunk === null) return true;
				var g = this.swf.readFrom(nextPreloadChunk);
				if (curPreloadSymbol !== null) {
					var preloadSymbol = this.swf.movie.library.characterById(curPreloadSymbol).data;
					let sub_preload_done = preloadSymbol.preload(context, chunkLimit);
					if (sub_preload_done) {
						preloadProgress.curPreloadSymbol = null;
					}
				}
				let endTagFound = false;
				let subPreloadDone = preloadProgress.curPreloadSymbol === null;
				var tagCallback = (reader, tagCode, tagLength) => {
					switch (tagCode) {
						//////// frames ////////
						case 0:
							endTagFound = true;
							return true;
						case 1:
							preloadProgress.curPreloadFrame += 1;
							var tag = reader.parseTagWithCode(tagCode, tagLength);
							tag.tagcode = tagCode;
							timelineTags.push(tag);
							break;
						case 9:
						case 4:
						case 26:
						case 70:
						case 94:
						case 5:
						case 28:
						case 15:
						case 89:
						case 12:
						case 43:
						case 19:
							var tag = reader.parseTagWithCode(tagCode, tagLength);
							tag.tagcode = tagCode;
							timelineTags.push(tag);
							break;
						case 72:
						case 76:
						case 82:
							break;
						case 18:
							this.soundStreamHead(reader, 1);
							break;
						case 45:
							this.soundStreamHead(reader, 2);
							break;
						//////// Define ////////
						case 10:
							this.defineFont(reader, 1, tagLength);
							break;
						case 48:
							this.defineFont(reader, 2, tagLength);
							break;
						case 75:
							this.defineFont(reader, 3, tagLength);
							break;
						case 20:
							this.defineLossless(reader, 1, tagLength);
							break;
						case 36:
							this.defineLossless(reader, 2, tagLength);
							break;
						case 6:
							this.defineBits(reader, 1, tagLength);
							break;
						case 21:
							this.defineBits(reader, 2, tagLength);
							break;
						case 35:
							this.defineBits(reader, 3, tagLength);
							break;
						case 90:
							this.defineBits(reader, 4, tagLength);
							break;
						case 14:
							this.defineSound(context, reader, tagLength);
							break;
						case 60:
							this.defineVideoStream(reader);
							break;
						case 2:
							this.defineShape(reader, 1);
							break;
						case 22:
							this.defineShape(reader, 2);
							break;
						case 32:
							this.defineShape(reader, 3);
							break;
						case 83:
							this.defineShape(reader, 4);
							break;
						case 46:
							this.defineMorphShape(reader, 1);
							break;
						case 84:
							this.defineMorphShape(reader, 2);
							break;
						case 11:
							this.defineText(reader, 1);
							break;
						case 33:
							this.defineText(reader, 2);
							break;
						case 59:
							this.doInitAction(reader, tagLength);
							break;
						case 37:
							this.defineEditText(reader);
							break;
						case 7:
							this.defineButton(reader, 1, tagLength);
							break;
						case 34:
							this.defineButton(reader, 2, tagLength);
							break;
						case 87:
							this.defineBinaryData(reader, tagLength);
							break;
						case 17:
							this.defineButtonSound(reader);
							break;
						case 23:
							this.defineButtonCxform(reader, tagLength);
							break;
						case 8:
							this.jpegTables(reader, tagLength);
							break;
						case 61:
							this.preloadVideoFrame(reader, tagLength);
							break;
						case 56:
							this.exportAssets(reader);
							break;
						case 74:
							this.csmTextSettings(reader);
							break;
						case 39:
							return this.defineSprite(context, reader, tagLength, chunkLimit);
					}
					if (chunkLimit.didOpsBreachLimit(context, tagLength)) {
						return true;
					}
					return false;
				}
				
				var result;
				if (subPreloadDone) {
					result = decode_tags(g, tagCallback);
				} else {
					result = true;
				}
				if (subPreloadDone) {
					preloadProgress.nextPreloadChunk = g.byteStream.byte_offset;
				}
				var is_finished = endTagFound;
				if (is_finished) {
					preloadProgress.nextPreloadChunk = null;
				}
				return is_finished;
			}

			// Preloading of definition tags

			defineFont(reader, version, tagLength) {
				var movie = this.getMovie();
				let font;
				switch (version) {
					case 1:
						font = reader.parseDefineFont1(tagLength);
						break;
					case 2:
						font = reader.parseDefineFont2(2, tagLength);
						break;
					case 3:
						font = reader.parseDefineFont2(3, tagLength);
						break;
					case 4:
						font = reader.parseDefineFont4(tagLength);
						break;
				}
				var font_object = FlashFont.fromSwfTag(font);
				movie.library.registerCharacter(font.id, new Character(Character.Font, font_object));
			}
			defineBits(reader, version, tagLength) {
				var movie = this.getMovie();
				var tag1 = reader.parseDefineBits(version, tagLength);
				var rr = movie.library.jpegTables;
				var tag = BitmapGraphic.createStatic(movie, tag1.id);
				var jpegTables = (version == 1) ? rr : null;
				var data = tag1.data;
				var bitmadA = tag1.alphaData;
				var _JPEGData = glueTablesToJpeg(data, jpegTables);
				var img = decodeDefineBitsJpeg(_JPEGData, bitmadA);
				if (img) tag.setBitmap(img);
				movie.library.registerCharacter(tag1.id, new Character(Character.Bitmap, tag));
			}
			defineLossless(reader, version, tagLength) {
				var movie = this.getMovie();
				var bitmapInfo = reader.parseDefineBitsLossLess(version, tagLength);
				var canvas = decodeDefineBitsLossless(bitmapInfo);
				var rg = BitmapGraphic.createStatic(movie, bitmapInfo.id);
				rg.setBitmap(canvas);
				movie.library.registerCharacter(bitmapInfo.id, new Character(Character.Bitmap, rg));
			}
			defineSound(context, reader, tagLength) {
				var movie = this.getMovie();
				var tag = reader.parseDefineSound(tagLength);
				var sp = context.audio.registerSound(tag);
				movie.library.registerCharacter(tag.id, new Character(Character.Sound, sp));
			}
			defineShape(reader, version) {
				var movie = this.getMovie();
				var tag = reader.parseDefineShape(version);
				var shape = Graphic.fromSwfTag(movie, tag);
				movie.library.registerCharacter(tag.id, new Character(Character.Graphic, shape));
			}
			defineMorphShape(reader, version) {
				var movie = this.getMovie();
				var tag = reader.parseDefineMorphShape(version);
				var morph_shape = MorphShape.fromSwfTag(movie, tag);
				movie.library.registerCharacter(tag.id, new Character(Character.MorphShape, morph_shape));
			}
			defineSprite(context, reader, tagLength, chunkLimit) {
				var movie = this.getMovie();
				let id = reader.byteStream.readUint16();
				let numFrames = reader.byteStream.readUint16();
				var movieClip = MovieClipStatic.withData(id, this.swf.resizeToReader(reader, tagLength - 4), numFrames);
				movie.library.registerCharacter(id, new Character(Character.MovieClip, movieClip));
				this.preloadProgress.curPreloadSymbol = id;
				let should_exit = chunkLimit.didOpsBreachLimit(context, 4);
				if (should_exit)
					return true;
				if (movieClip.preload(context, chunkLimit)) {
					this.preloadProgress.curPreloadSymbol = null;
					return false;
				} else {
					return true;
				}
			}
			defineText(reader, version) {
				var movie = this.getMovie();
				var tag = reader.parseDefineText(version);
				var text = StaticText.fromSwfTag(movie, tag);
				movie.library.registerCharacter(tag.id, new Character(Character.Text, text));
			}
			defineEditText(reader) {
				var movie = this.getMovie();
				var edit_text = reader.parseDefineEditText();
				var et_obj = TextField.fromSwfTag(movie, edit_text);
				movie.library.registerCharacter(edit_text.id, new Character(Character.EditText, et_obj));
			}
			defineButton(reader, version, tagLength) {
				var movie = this.getMovie();

				var tag = reader.parseDefineButton(version, tagLength);

				var r = Avm1Buttom.fromSwfTag(movie, tag);
				movie.library.registerCharacter(tag.id, new Character(Character.Avm1Button, r));
			}
			defineBinaryData(reader, tagLength) {
				var movie = this.getMovie();
				var tag = reader.parseDefineBinaryData(tagLength);
				var binarydata_obj = BinaryData.fromSwfTag(tag);
				movie.library.registerCharacter(tag.id, new Character(Character.BinaryData, binarydata_obj));
			}
			defineVideoStream(reader) {
				var movie = this.getMovie();
				var streamdef = reader.parseDefineVideoStream();
				var video = VideoDisplay.fromSwfTag(movie, streamdef);
				movie.library.registerCharacter(streamdef.id, new Character(Character.Video, video));
			}
			defineButtonSound(reader) {
				var movie = this.getMovie();
				var tag = reader.parseDefineButtonSound();
				var resultButton = movie.library.characterById(tag.buttonId);
				if (resultButton) {
					if ((resultButton.type == Character.Avm1Button) || (resultButton.type == Character.Avm2Button)) {
						resultButton.data.setSounds(tag);
					} else {
						log.warn("DefineButtonCxform: Tried to apply on non-button ID " + tag.buttonId);
					}
				} else {
					log.warn("DefineButtonSound: Character ID " + tag.buttonId + " doesn't exist");
				}
			}
			defineButtonCxform(reader, tagLength) {
				var movie = this.getMovie();
				var tag = reader.parseDefineButtonCxform(tagLength);
				var resultButton = movie.library.characterById(tag.id);
				if (resultButton) {
					if (resultButton.type == Character.Avm1Button) {
						resultButton.data.setColorTransforms(tag);
					} else {
						log.warn("DefineButtonCxform: Tried to apply on non-button ID " + tag.id);
					}
				} else {
					log.warn("DefineButtonSound: Character ID " + tag.id + " doesn't exist");
				}
			}
			doInitAction(reader, tagLength) {
				var movie = this.getMovie();
				var spriteId = reader.byteStream.readUint16();
				var action = reader.byteStream.readBytes(tagLength - 2);
				var movieclip = movie.library.characterById(spriteId);
				console.log(movieclip, action);
			}
			soundStreamHead(reader, version) {
				this.audioStreamInfo = reader.parseSoundStreamHead(version);
			}
			preloadVideoFrame(reader, tagLength) {
				var movie = this.getMovie();
				let vframe = reader.parseVideoFrame(tagLength);
				let library = movie.library;
				let v = library.characterById(vframe.streamId);
				if (v.type == Character.Video) {
					v.data.preloadSwfFrame(vframe);
				}
			}
			exportAssets(reader) {
				var movie = this.getMovie();
				var tag = reader.parseExportAssets();

				var packages = tag.packages;
				for (let i = 0; i < packages.length; i++) {
					let _package = packages[i];
					let id = _package[0];
					let name = _package[1];
		
					// TODO: do other types of Character need to know their exported name?
					movie.library.registerExport(id, name);
					var character = movie.library.characterById(id);
					if (character) {
						if (character.type == Character.MovieClip) {
							character.data.exportedName = name;
						}
					} else {
						log.warn("Can't register export {}: Character ID {} doesn't exist");
					}
				}
			}
			csmTextSettings(reader) {
				var movie = this.getMovie();
				var tag = reader.parseCSMTextSettings();
				var ch = movie.library.characterById(tag.id);
				if (ch) {
					if (ch.type == Character.Text) {
						ch.data.setRenderSettings(tag);
					} else if (ch.type == Character.EditText) {
						ch.data.setRenderSettings(tag);
					} else {
						log.warn("Tried to apply CSMTextSettings to non-text character ID");
					}
				} else {
					log.warn("Tried to apply CSMTextSettings to unregistered character ID");
				}
			}
			jpegTables(reader, tagLength) {
				var movie = this.getMovie();
				let jpeg_data = reader.byteStream.readBytes(tagLength);
				movie.library.setJpegTables(jpeg_data);
			}
		}
		module.exports = MovieClip;
	},
	"./src/core/display_objects/stage.js": function(module, exports, __webpack_require__) {
		const DisplayObjectContainer = __webpack_require__("./src/core/display_objects/container.js");
		const { Transform } = __webpack_require__("./src/render/transform.js");

		class Stage extends DisplayObjectContainer {
			constructor(fullscreen, movie) {
				super();
				this.movie = movie;
				this.quality = "high";
				this.display_state = fullscreen ? "full_screen" : "normal";
				this.background_color = null;
				this.movie_size = [0, 0];
				this.viewport_matrix = [1, 0, 0, 1, 0, 0];
				this.setIsRoot(true);
			}
			get displayType() {
				return "Stage";
			}
			get _debug_colorDisplayType() {
				return [0, 0, 0, 1];
			}
			view_matrix() {
				return this.viewport_matrix;
			}
			setMovieSize(width, height) {
				this.movie_size = [width, height];
			}
			setMovie(movie) {
				this.movie = movie;
			}
			getBackgroundColor() {
				return this.background_color;
			}
			setBackgroundColor(color) {
				this.background_color = [color[0], color[1], color[2], 1];
			}
			render(context) {
				context.transformStack.stackPush(new Transform(this.viewport_matrix, [1, 1, 1, 1, 0, 0, 0, 0]));
				this.renderBase(context);
				context.transformStack.stackPop();
			}
			renderSelf(context) {
				this.renderChildren(context);
			}
			debugRender(context, player) {
				player.debugTransformStack.stackPush(new Transform(this.viewport_matrix, [1, 1, 1, 1, 0, 0, 0, 0]));
				super.debugRender(context, player);
				player.debugTransformStack.stackPop();
			}
		}

		module.exports = Stage;
	},
	"./src/core/html/text_format.js": function(module, exports, __webpack_require__) {
		const HTMLReader = __webpack_require__("./src/utils/html_reader.js");

		function parseHTML(html) {
			var reader = new HTMLReader(html);
			var events = [];
			while(true) {
				try {
					var result = reader.readEvent();
					if (result) {
						events.push(result);
					} else {
						break;
					}
				} catch(e) {
					console.log("Error while parsing HTML", e);
					break;
				}
			}
			return events;
		}

		function getAttributes(attributes, name) {
			for (let i = 0; i < attributes.length; i++) {
				const a = attributes[i];
				if (a[0].toLowerCase() == name) return a[1];
			}
			return null;
		}

		class TextSpan {
			constructor(parameters) {
				
			}
		}

		class FormatSpans {
			constructor() {
				this.text = "";
				this.displayedText = "";
				this.spans = [];
				this.defaultFormat = null;
			}
			static fromHTML(html, defaultFormat, isMultiline, swfVersion) {
				var h = parseHTML(html);
				console.log(h);

				var r = new FormatSpans();
				r.defaultFormat = defaultFormat;
				return r;
			}
			static fromText(text, format) {
				var r = new FormatSpans();
				r.text = text;
				r.defaultFormat = format;
				return r;
			}
		}
		
		class TextFormat {
			constructor() {
				this.font = null;
				this.size = null;
				this.color = null;
				this.align = null;
				this.bold = null;
				this.italic = null;
				this.underline = null;
				this.leftMargin = null;
				this.rightMargin = null;
				this.indent = null;
				this.blockIndent = null;
				this.kerning = null;
				this.leading = null;
				this.letterSpacing = null;
				this.tabStops = null;
				this.bullet = null;
				this.url = null;
				this.target = null;
			}
			static fromSwfTag(movie, tag) {
				var tf = new TextFormat();
				var layout = tag.layout;
				if ("fontID" in tag) {
				}
				if ("fontHeight" in tag) {
					tf.size = tag.fontHeight;
				}
				if ("textColor" in tag) {
					tf.color = tag.textColor.slice(0);
				}
				if (layout) {
					tf.leftMargin = layout.leftMargin;
					tf.rightMargin = layout.rightMargin;
					tf.indent = layout.indent;
					tf.leading = layout.leading;
				}
				return tf;
			}
			clone() {

			}
		}
		exports.TextFormat = TextFormat;
		exports.FormatSpans = FormatSpans;
	},
	"./src/core/avm1.js": function(module, exports, __webpack_require__) {
		const Avm1Activation = __webpack_require__("./src/core/avm1/activation.js");
		
		/*
			Object
			Array
			Function
			Number
		
			MovieClip
			MovieClipLoader
			LoadVars
			Xml
			Sound
			SharedObject
			Color
			Global
		*/
		
		class Avm1 {
			constructor() {
				this.version = 6;
				this.clipExecList = null;
			}
			findDisplayObjectsPendingRemoval(obj, out) {
				var parent = obj;
				if (parent.isContainer()) {
					var children = parent.iterRenderList();
					for (let i = 0; i < children.length; i++) {
						const child = children[i];
						if (child.isAvm1PendingRemoval()) {
							out.push(child);
							this.findDisplayObjectsPendingRemoval(child, out);
						}
					}
				}
			}
			removePending(context) {
				var vec = [];
				var rootClip = context.player.clip;
				if (rootClip) {
					this.findDisplayObjectsPendingRemoval(rootClip, vec);
				}
				for (let i = 0; i < vec.length; i++) {
					const child = vec[i];
					let parent = child.getParent();
					if (parent && (parent.isContainer())) {
						parent.removeChildDirectly(context, child);
						parent.updatePendingRemovals();
					}
				}
			}
			runFrame(context) {
				// Remove pending objects
				this.removePending(context);
		
				// In AVM1, we only ever execute the idle phase, and all the work that
				// would ordinarily be phased is instead run all at once in whatever order
				// the SWF requests it.
				var prev = null;
				var next = this.clipExecList;
				while (true) {
					var clip = next;
					if (!clip) {
						break;
					}
					next = clip.nextAvm1Clip;
					if (clip.AVM1_REMOVED) {
						// Clean up removed clips from this frame or a previous frame.
						if (prev) {
							prev.nextAvm1Clip = next;
						} else {
							this.clipExecList = next;
						}
						clip.nextAvm1Clip = null;
					} else {
						clip.runFrameAvm1(context);
						prev = clip;
					}
				}
			}
			addExecuteList(clip) {
				// Adding while iterating is safe, as this does not modify any active nodes.
				if (!clip.nextAvm1Clip) {
					clip.nextAvm1Clip = this.clipExecList;
					this.clipExecList = clip;
				}
			}
			runStackFrameForAction(clip, name, action, context) {
				var activation = Avm1Activation.fromAction(context, null, context.version, null, [], clip, null, null);
				activation.runActions(action);
			}
		}
		module.exports = Avm1;
	},
	"./src/core/binary_data.js": function(module, exports, __webpack_require__) {
		class BinaryData {
			constructor(data) {
				this.data = data.data;
			}
			static fromSwfTag(tag) {
				return new BinaryData(tag);
			}
		}
		module.exports = BinaryData;
	},
	"./src/core/character.js": function(module, exports, __webpack_require__) {
		class Character {
			constructor(type, data) {
				this.type = type;
				this.data = data;
			}
			get displayType() {
				switch (this.type) {
					case Character.EditText: return "EditText";
					case Character.Graphic: return "Graphic";
					case Character.MovieClip: return "MovieClip";
					case Character.Bitmap: return "Bitmap";
					case Character.Avm1Button: return "Button";
					case Character.Avm2Button: return "Button";
					case Character.Font: return "Font";
					case Character.MorphShape: return "MorphShape";
					case Character.Text: return "Text";
					case Character.Sound: return "Sound";
					case Character.Video: return "Video";
					case Character.BinaryData: return "BinaryData";
				}
			}
			toString() {
				switch (this.type) {
					case Character.EditText: return "[character EditText]";
					case Character.Graphic: return "[character Graphic]";
					case Character.MovieClip: return "[character MovieClip]";
					case Character.Bitmap: return "[character Bitmap]";
					case Character.Avm1Button: return "[character Avm1Button]";
					case Character.Avm2Button: return "[character Avm2Button]";
					case Character.Font: return "[character Font]";
					case Character.MorphShape: return "[character MorphShape]";
					case Character.Text: return "[character Text]";
					case Character.Sound: return "[character Sound]";
					case Character.Video: return "[character Video]";
					case Character.BinaryData: return "[character BinaryData]";
				}
			}
		}
		Character.EditText = 1;
		Character.Graphic = 2;
		Character.MovieClip = 3;
		Character.Bitmap = 4;
		Character.Avm1Button = 5;
		Character.Avm2Button = 6;
		Character.Font = 7;
		Character.MorphShape = 8;
		Character.Text = 9;
		Character.Sound = 10;
		Character.Video = 11;
		Character.BinaryData = 12;
		module.exports = Character;
	},
	"./src/core/context.js": function(module, exports, __webpack_require__) {
		class UpdateContext {
			constructor(data) {
				this.player = data.player;
				this.renderer = data.renderer;
				this.library = data.library;
				this.audio = data.audio;
				this.audioManager = data.audioManager;
				this.swf = data.swf;
				this.avm1 = data.avm1;
				this.video = data.video;
				this.stage = data.stage;
				this.actionQueue = data.actionQueue;
			}
			isSoundPlaying(sound) {
				return this.audioManager.isSoundPlaying(sound);
			}
			isSoundPlayingWithHandle(sound) {
				return this.audioManager.isSoundPlayingWithHandle(sound);
			}
			startStream(movie_clip, frame, data, stream_info) {
				return this.audioManager.startStream(this.audio, movie_clip, frame, data, stream_info);
			}
			startSound(sound, settings, owner, avm1_object) {
				return this.audioManager.startSound(this.audio, sound, settings, owner, avm1_object);
			}
			stopSound(instance) {
				this.audioManager.stopSound(this.audio, instance);
			}
			stopSoundsWithHandle(sound) {
				this.audioManager.stopSoundsWithHandle(this.audio, sound);
			}
			stopAllSounds() {
				this.audioManager.stopAllSounds(this.audio);
			}
			addInstanceCounter() {
				return this.player.addInstanceCounter();
			}
		}
		class RenderContext {
			constructor(data) {
				this.library = data.library;
				this.renderer = data.renderer;
				this.commands = data.commands;
				this.transformStack = data.transformStack;
				this.useLastBound = data.useLastBound;
				this.cacheDraws = data.cacheDraws;
				this.isOffscreen = data.isOffscreen;
				this.useBitmapCache = data.useBitmapCache;
				this.stage = data.stage;
			}
		}
		exports.UpdateContext = UpdateContext;
		exports.RenderContext = RenderContext;
	},
	"./src/core/display_object.js": function(module, exports, __webpack_require__) {
		const Avm1Value = __webpack_require__("./src/core/avm1/value.js");
		const matrixUtils = __webpack_require__("./src/render/matrix_utils.js");
		const Filter = __webpack_require__("./src/render/filters.js");
		const { Transform, TransformStack } = __webpack_require__("./src/render/transform.js");
		const { RenderContext } = __webpack_require__("./src/core/context.js");
		const CommandList = __webpack_require__("./src/render/commands.js");
		
		// Red: MovieClip
		// Orange: Bitmap
		// Yellow: TextField
		// Green Buttom
		// Blue: Shape
		// SBlue: MorphShape
		// Pulpe: StaticText
		// Pink: Video
		
		function cloneArray(src) {
			var arr = [];
			var length = src.length;
			for (var i = 0; i < length; i++) {
				arr[i] = src[i];
			}
			return arr;
		}
		
		class SoundTransform {
			constructor() {
				this.volume = 100;
				this.left_to_left = 100;
				this.left_to_right = 0;
				this.right_to_left = 0;
				this.right_to_right = 100;
			}
		}
		
		function getBlendMode(blendMode) {
			switch (blendMode) {
				case 0:
				case 1:
					return "normal";
				case 2:
					return "layer";
				case 3:
					return "multiply";
				case 4:
					return "screen";
				case 5:
					return "lighten";
				case 6:
					return "darken";
				case 7:
					return "difference";
				case 8:
					return "add";
				case 9:
					return "subtract";
				case 10:
					return "invert";
				case 11:
					return "alpha";
				case 12:
					return "erase";
				case 13:
					return "overlay";
				case 14:
					return "hardlight";
				default:
					return "normal";
			}
		}

		class BitmapCache {
			constructor() {
				this.matrix_a = 0;
				this.matrix_b = 0;
				this.matrix_c = 0;
				this.matrix_d = 0;
				this.source_width = 0;
				this.source_height = 0;
				this.draw_offset = [0, 0];
				this.bitmap = null;
			}
			makeDirty() {
				this.matrix_a = NaN;
			}
			isDirty(other, source_width, source_height) {
				return (this.matrix_a != other[0]) || (this.matrix_b != other[1]) || (this.matrix_c != other[2]) || (this.matrix_d != other[3]) || (this.source_width != source_width) || (this.source_height != source_height) || (!this.bitmap);
			}
			update(renderer, matrix, source_width, source_height, actual_width, actual_height, draw_offset, swf_version) {
				this.matrix_a = matrix[0];
				this.matrix_b = matrix[1];
				this.matrix_c = matrix[2];
				this.matrix_d = matrix[3];
				this.source_width = source_width;
				this.source_height = source_height;
				this.draw_offset = draw_offset;
				if (this.bitmap) {
					if ((this.bitmap.width == actual_width) && (this.bitmap.height == actual_height)) {
						return; // No need to resize it
					}
				}
				let acceptable_size;
				if (swf_version > 9) {
					let total = actual_width * actual_height;
					acceptable_size = (actual_width < 8191) && (actual_height < 8191) && (total < 16777215);
				} else {
					acceptable_size = (actual_width < 2880) && (actual_height < 2880);
				}
				if (renderer.is_offscreen_supported() && (actual_width > 0) && (actual_height > 0) && acceptable_size) {
					if (this.bitmap) {
						if (this.bitmap.handle) {
							this.bitmap.handle.delete();
						}
					}
					let handle = renderer.createEmptyTexture(actual_width, actual_height);
					this.bitmap = {
						width: actual_width,
						height: actual_height,
						handle
					}
				} else {
					if (this.bitmap) {
						if (this.bitmap.handle) {
							this.bitmap.handle.delete();
						}
					}
					this.bitmap = null;
				}
			}
			clear() {
				if (this.bitmap) {
					if (this.bitmap.handle) {
						this.bitmap.handle.delete();
					}
				}
				this.bitmap = null;
			}
			getHandle() {
				return this.bitmap ? this.bitmap.handle : null;
			}
		}

		class DisplayObject {
			constructor() {
				this.transform = new Transform();

				this.blendMode = "normal";
				this.filters = [];
		
				this.parent = null;
				this.placeFrame = 0;
				this.depth = 0;
				this.name = "";
				this.clipDepth = 0;
				this.nextAvm1Clip = null;
				this.soundTransform = new SoundTransform();
				this.masker = null;
				this.maskee = null;
				this.opaqueBackground = null;
				this.cache = null;
		
				/// flags
				this.AVM1_REMOVED = false;
				this.VISIBLE = true;
				this.SCALE_ROTATION_CACHED = false;
				this.TRANSFORMED_BY_SCRIPT = false;
				this.PLACED_BY_SCRIPT = false;
				this.INSTANTIATED_BY_TIMELINE = false;
				this.IS_ROOT = false;
				this.LOCK_ROOT = false;
				this.CACHE_AS_BITMAP = false;
				this.HAS_SCROLL_RECT = false;
				this.HAS_EXPLICIT_NAME = false;
				this.SKIP_NEXT_ENTER_FRAME = false;
				this.CACHE_INVALIDATED = false;
				
				this._debug_boundsLast = { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
				this._debug_matrix = [1,0,0,1,0,0];
				this._debug_colorTransform = [1,1,1,1,0,0,0,0];
			}
			get displayType() {
				return "Base";
			}
			get _debug_colorDisplayType() {
				return [0, 0, 0, 1];
			}
			boundsMatrix(bounds, matrix) {
				var no = Number.MAX_VALUE;
				var xMax = -no;
				var yMax = -no;
				var xMin = no;
				var yMin = no;
				var _xMin = bounds.xMin;
				var _xMax = bounds.xMax;
				var _yMin = bounds.yMin;
				var _yMax = bounds.yMax;
				var x0 = _xMax * matrix[0] + _yMax * matrix[2] + matrix[4];
				var x1 = _xMax * matrix[0] + _yMin * matrix[2] + matrix[4];
				var x2 = _xMin * matrix[0] + _yMax * matrix[2] + matrix[4];
				var x3 = _xMin * matrix[0] + _yMin * matrix[2] + matrix[4];
				var y0 = _xMax * matrix[1] + _yMax * matrix[3] + matrix[5];
				var y1 = _xMax * matrix[1] + _yMin * matrix[3] + matrix[5];
				var y2 = _xMin * matrix[1] + _yMax * matrix[3] + matrix[5];
				var y3 = _xMin * matrix[1] + _yMin * matrix[3] + matrix[5];
				return {
					xMin: Math.min(Math.min(Math.min(Math.min(xMin, x0), x1), x2), x3) | 0,
					xMax: Math.max(Math.max(Math.max(Math.max(xMax, x0), x1), x2), x3) | 0,
					yMin: Math.min(Math.min(Math.min(Math.min(yMin, y0), y1), y2), y3) | 0,
					yMax: Math.max(Math.max(Math.max(Math.max(yMax, y0), y1), y2), y3) | 0
				};
			}
			localToGlobalMatrix() {
				var matrix = this.getMatrix();
				var node = this.getParent();
				while(node) {
					if (node.displayType == "Stage") {
						break;
					}
					matrix = matrixUtils.multiplicationMatrix(node.getMatrix(), matrix);
					node = node.getParent();
				}
				return matrix;
			}
			globalToLocalMatrix() {
				var matrix = this.localToGlobalMatrix();
				return matrixUtils.invertMatrix(matrix);
			}
			////////  Transform  ////////
			getColorTransform() {
				return this.transform.colorTransform;
			}
			getMatrix() {
				return this.transform.matrix;
			}
			applyColorTransform(colorTransform) {
				this.transform.colorTransform[0] = colorTransform[0];
				this.transform.colorTransform[1] = colorTransform[1];
				this.transform.colorTransform[2] = colorTransform[2];
				this.transform.colorTransform[3] = colorTransform[3];
				this.transform.colorTransform[4] = colorTransform[4];
				this.transform.colorTransform[5] = colorTransform[5];
				this.transform.colorTransform[6] = colorTransform[6];
				this.transform.colorTransform[7] = colorTransform[7];
			}
			applyMatrix(matrix) {
				this.transform.matrix[0] = matrix[0];
				this.transform.matrix[1] = matrix[1];
				this.transform.matrix[2] = matrix[2];
				this.transform.matrix[3] = matrix[3];
				this.transform.matrix[4] = matrix[4];
				this.transform.matrix[5] = matrix[5];
			}
			getBlendMode() {
				return this.blendMode;
			}
			setBlendMode(mode) {
				var b = getBlendMode(mode) || "normal";
				var changed = b != this.blendMode;
				this.blendMode = b;
				if (changed) {
					var parent = this.getParent();
					if (parent) parent.invalidateCachedBitmap();
				}
			}
			getFilters() {
				return this.filters;
			}
			_setFilters(filters) {
				if (this.filters !== filters) {
					this.filters = filters;
					this.recheck_cache_as_bitmap();
					return true;
				} else {
					return false;
				}
			}
			setFilters(filters) {
				if (this._setFilters(filters)) {
					this.invalidateCachedBitmap();
				}
			}

			recheck_cache_as_bitmap() {
				let should_cache = this.is_bitmap_cached_preference() || this.filters.length;
				if (should_cache && !this.cache) {
					if (this.cache) {
						console.log("cache");
						this.cache.clear();
					}
					this.cache = new BitmapCache();
				} else if (!should_cache && this.cache) {
					if (this.cache) {
						this.cache.clear();
					}
					this.cache = null;
				}
			}

			is_bitmap_cached_preference() {
				return this.CACHE_AS_BITMAP;
			}
			set_bitmap_cached_preference(value) {
				this.CACHE_AS_BITMAP = value;
				this.recheck_cache_as_bitmap();
			}

			getRenderMatrix(useLastBound) {
				return useLastBound ? this._debug_matrix : this.getMatrix();
			}
			getRenderColorTransform(useLastBound) {
				return useLastBound ? this._debug_colorTransform : this.getColorTransform();
			}
			getRenderTransform(useLastBound) {
				return useLastBound ? new Transform(this.getRenderMatrix(useLastBound), this.getRenderColorTransform(useLastBound)) : this.transform;
			}

			isBitmapCached() {
				return !!this.cache;
			}
			_invalidateCachedBitmap() {
				if (this.CACHE_INVALIDATED) {
					return false;
				}
				if (this.cache) {
					this.cache.makeDirty();
				}
				this.CACHE_INVALIDATED = true;
				return true;
			}
			invalidateCachedBitmap() {
				if (this._invalidateCachedBitmap()) {
					var parent = this.getParent();
					if (parent) {
						parent.invalidateCachedBitmap();
					}
				}
			}
			clearInvalidateFlag() {
				this.CACHE_INVALIDATED = false;
			}
			swfVersion() {
				return this.getMovie().version;
			}
			getDepth() {
				return this.depth;
			}
			setDepth(depth) {
				this.depth = depth;
			}
			getId() {
				return 0;
			}
			getVisible() {
				return this.VISIBLE;
			}
			setVisible(visible) {
				var changed = this.VISIBLE != visible;
				this.VISIBLE = visible;
				if (changed) {
					var parent = this.getParent();
					if (parent) parent.invalidateCachedBitmap();
				}
			}

			getX() {
				var matrix = this.getMatrix();
				return (matrix) ? (matrix[4] / 20) : undefined;
			}
			getY() {
				var matrix = this.getMatrix();
				return (matrix) ? (matrix[5] / 20) : undefined;
			}
			getXScale() {
				var matrix = this.getMatrix();
				var xScale = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]) * 100;
				if (0 > matrix[0]) {
					xScale *= -1;
				}
				return xScale;
			}
			getYScale() {
				var matrix = this.getMatrix();
				var yScale = Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]) * 100;
				if (0 > matrix[3]) {
					yScale *= -1;
				}
				return yScale;
			}
			getWidth() {
				var local_bounds = this.localBounds();
				return Math.abs(local_bounds.xMax - local_bounds.xMin) / 20;
			}
			getHeight() {
				var local_bounds = this.localBounds();
				return Math.abs(local_bounds.yMax - local_bounds.yMin) / 20;
			}

			_setX(x) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				var changed = matrix[4] != x;
				matrix[4] = x;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
				return changed;
			}
			_setY(y) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				var changed = matrix[5] != y;
				matrix[5] = y;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
				return changed;
			}

			setX(x) {
				if (this._setX(x * 20)) {
					var parent = this.getParent();
					if (parent) {
						parent.invalidateCachedBitmap();
					}
				}
			}
			setY(y) {
				if (this._setY(y * 20)) {
					var parent = this.getParent();
					if (parent) {
						parent.invalidateCachedBitmap();
					}
				}
			}
			setXScale(xscale) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				var adjustment = 1;
				if (0 > matrix[0]) {
					adjustment = -1;
				}
				var radianX = Math.atan2(matrix[1], matrix[0]);
				xscale /= 100;
				matrix[0] = xscale * Math.cos(radianX) * adjustment;
				matrix[1] = xscale * Math.sin(radianX) * adjustment;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
				var parent = this.getParent();
				if (parent) {
					parent.invalidateCachedBitmap();
				}
			}
			setYScale(yscale) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				var adjustment = 1;
				if (0 > matrix[3]) {
					adjustment = -1;
				}
				var radianY = Math.atan2(-matrix[2], matrix[3]);
				yscale /= 100;
				matrix[2] = -yscale * Math.sin(radianY) * adjustment;
				matrix[3] = yscale * Math.cos(radianY) * adjustment;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
				var parent = this.getParent();
				if (parent) {
					parent.invalidateCachedBitmap();
				}
			}
			getPlaceFrame() {
				return this.placeFrame;
			}
			setPlaceFrame(frame) {
				this.placeFrame = frame;
			}
			getParent() {
				return this.parent;
			}
			setParent(context, parent) {
				this.parent = parent;
			}
			getOpaqueBackground() {
				return this.opaqueBackground;
			}
			setOpaqueBackground(color) {
				this.opaqueBackground = color;
				this.invalidateCachedBitmap();
			}
			isRoot() {
				return this.IS_ROOT;
			}
			setIsRoot(bool) {
				this.IS_ROOT = bool;
			}
			getName() {
				return this.name;
			}
			setName(name) {
				this.name = name;
			}
			setDefaultInstanceName(context) {
				if (!this.name.length) {
					var r = context.addInstanceCounter();
					this.setName("instance" + r);
				}
			}
			isAvm1PendingRemoval() {
				return this.depth < 0;
			}
			setSkipNextEnterFrame(b) {
				this.SKIP_NEXT_ENTER_FRAME = b;
			}
			shouldSkipNextEnterFrame() {
				return this.SKIP_NEXT_ENTER_FRAME;
			}
			applyPlaceObject(context, placeObject) {
				if (!this.TRANSFORMED_BY_SCRIPT) {
					if ("matrix" in placeObject) { // Matrix
						this.applyMatrix(placeObject.matrix);
						var parent = this.getParent();
						if (parent) {
							parent.invalidateCachedBitmap();
						}
					}
					if ("colorTransform" in placeObject) {
						this.applyColorTransform(placeObject.colorTransform);
						var parent = this.getParent();
						if (parent) {
							parent.invalidateCachedBitmap();
						}
					}
					if ("ratio" in placeObject) {
						if (this.displayType == "MorphShape") {
							this.setRatio(placeObject.ratio);
						} else if(this.displayType == "Video") {
							this.seek(context, placeObject.ratio);
						}
					}
					if ("bitmapCache" in placeObject) {
						this.set_bitmap_cached_preference(!!placeObject.bitmapCache);
					}
					if ("blendMode" in placeObject) {
						this.setBlendMode(placeObject.blendMode);
					}
					if (this.swfVersion() >= 11) {
						if ("visible" in placeObject) {
							this.setVisible(!!placeObject.visible);
						}
						if ("backgroundColor" in placeObject) {
							var backgroundColor = placeObject.backgroundColor.slice(0);
							var color = null;
							if (backgroundColor[3] > 0) {
								backgroundColor[3] = 1;
								color = backgroundColor;
							}
							this.setOpaqueBackground(color);
						}
					}
					if ("filters" in placeObject) {
						var filters = placeObject.filters;
						var result = [];
						for (let i = 0; i < filters.length; i++) {
							const _ = Filter.from(filters[i]);
							if (_) result.push(_);
						}
						this.setFilters(result);
					}
				}
			}
			/// Called when this object should be replaced by a PlaceObject tag.
			replaceWith(context, characterId) {
				// Noop for most symbols; only shapes can replace their innards with another Graphic.
			}
			postInstantiation(context, initObject, instantiatedBy, runFrame) {
				if (runFrame) {
					this.runFrameAvm1(context);
				}
			}
			getObject() {
				return Avm1Value.INSTANCE.Undefined;
			}
			getBounds() {
				return this.getBoundsWithTransform([1, 0, 0, 1, 0, 0]);
			}
			localBounds() {
				return this.getBoundsWithTransform(this.getMatrix());
			}
			getBoundsWithTransform(matrix) {
				var bounds = this.boundsMatrix(this.selfBounds(), matrix);
				if (this.isContainer()) {
					var children = this.iterRenderList();
					for (let i = 0; i < children.length; i++) {
						const child = children[i];
						var mat = matrixUtils.multiplicationMatrix(matrix, child.getMatrix());
						var b = child.getBoundsWithTransform(mat);
						var xMin = Math.min(bounds.xMin, b.xMin);
						var xMax = Math.max(bounds.xMax, b.xMax);
						var yMin = Math.min(bounds.yMin, b.yMin);
						var yMax = Math.max(bounds.yMax, b.yMax);
						bounds = { xMin, yMin, xMax, yMax };
					}
				}
				return bounds;
			}
			renderBoundsWithTransform(matrix, include_own_filters, view_matrix) {
				var bounds = this.boundsMatrix(this.selfBounds(), matrix);
				if (this.isContainer()) {
					var children = this.iterRenderList();
					for (let i = 0; i < children.length; i++) {
						const child = children[i];
						var mat = matrixUtils.multiplicationMatrix(matrix, child.getMatrix());
						var b = child.renderBoundsWithTransform(mat, true, view_matrix);
						var xMin = Math.min(bounds.xMin, b.xMin);
						var xMax = Math.max(bounds.xMax, b.xMax);
						var yMin = Math.min(bounds.yMin, b.yMin);
						var yMax = Math.max(bounds.yMax, b.yMax);
						bounds = { xMin, yMin, xMax, yMax };
					}
				}
				if (include_own_filters) {
					var filters = this.getFilters();
					for (let i = 0; i < filters.length; i++) {
						const filter = filters[i].clone();
						filter.scale(view_matrix[0], view_matrix[3]);
						bounds = filter.calculateDestRect(bounds);
					}
				}
				return bounds;
			}
			selfBounds() {
				return { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
			}
			hitTestShape(_context, point, options) {
				return false;
			}
			render(context) {
				this.renderBase(context);
			}
			renderBase(context) {
				context.transformStack.stackPush(this.getRenderTransform(context.useLastBound));
				let blendMode = this.getBlendMode();
				let originalCommands = (blendMode != "normal") ? context.commands.copy() : null; 
				if (originalCommands) {
					context.commands.clear();
				}
				let cache_info = null;
				if (context.useBitmapCache && this.isBitmapCached()) {
					var _cache_info = null;
					var base_transform = context.transformStack.getTransform().clone();
					var bounds = this.renderBoundsWithTransform(base_transform.matrix, false, context.stage.view_matrix());
					var filters = this.getFilters();
					let swf_version = this.swfVersion();
					filters = filters.filter((r) => !r.impotent());
					if (this.cache) {
						let stage_matrix = context.stage.view_matrix();
						let width = Math.ceil(Math.abs(bounds.xMax - bounds.xMin) / 20);
						let height = Math.ceil(Math.abs(bounds.yMax - bounds.yMin) / 20);
						if (width <= 0xffff && height <= 0xffff) {
							var filter_rect = {
								xMin: 0,
								xMax: width * 20,
								yMin: 0,
								yMax: height * 20
							}
							var resultFilters = [];
							for (let i = 0; i < filters.length; i++) {
								var filter = filters[i].clone();
								filter.scale(stage_matrix[0], stage_matrix[3]);
								filter_rect = filter.calculateDestRect(filter_rect);
								resultFilters.push(filter);
							}
							var filter_rect_result = {
								xMin: Math.floor(filter_rect.xMin / 20),
								xMax: Math.ceil(filter_rect.xMax / 20),
								yMin: Math.floor(filter_rect.yMin / 20),
								yMax: Math.ceil(filter_rect.yMax / 20)
							}
							let draw_offset = [filter_rect_result.xMin, filter_rect_result.yMin];
							if (this.cache.isDirty(base_transform.matrix, width, height)) {
								this.cache.update(
									context.renderer,
									base_transform.matrix,
									width,
									height,
									Math.abs(filter_rect_result.xMax - filter_rect_result.xMin),
									Math.abs(filter_rect_result.yMax - filter_rect_result.yMin),
									draw_offset,
									swf_version
								);
								var k = this.cache.getHandle();
								if (k) {
									_cache_info = {
										handle: k,
										dirty: true,
										base_transform: base_transform,
										bounds,
										draw_offset,
										filters: resultFilters,
									};
								}
							} else {
								var k = this.cache.getHandle();
								if (k) {
									_cache_info = {
										handle: k,
										dirty: false,
										base_transform: base_transform,
										bounds,
										draw_offset,
										filters: resultFilters,
									};
								}
							}
						} else {
							this.cache.clear();
							_cache_info = null;
						}
					}
					cache_info = _cache_info;
				}
				if (cache_info) {
					let offset_x = ((cache_info.bounds.xMin - cache_info.base_transform.matrix[4]) | 0) + (cache_info.draw_offset[0] * 20);
					let offset_y = ((cache_info.bounds.yMin - cache_info.base_transform.matrix[5]) | 0) + (cache_info.draw_offset[1] * 20);
					if (cache_info.dirty) {
						var transform_stack = new TransformStack();
						var nx = -offset_x;
						var ny = -offset_y;
						transform_stack.stackPush(new Transform([cache_info.base_transform.matrix[0], cache_info.base_transform.matrix[1], cache_info.base_transform.matrix[2], cache_info.base_transform.matrix[3], nx, ny]));
						var offscreen_context = new RenderContext({
							library: context.library,
							renderer: context.renderer,
							commands: new CommandList(),
							transformStack: transform_stack,
							cacheDraws: context.cacheDraws,
							isOffscreen: true,
							useBitmapCache: true,
							useLastBound: context.useLastBound,
							stage: context.stage
						});
						this.renderSelf(offscreen_context);
						var background = this.getOpaqueBackground();
						offscreen_context.cacheDraws.push({
							handle: cache_info.handle,
							commands: offscreen_context.commands,
							clear: background ? background.slice(0) : null,
							filters: cache_info.filters,
						});
					}
					var t = context.transformStack.getTransform().clone();
					var mx = (t.matrix[4] + offset_x) | 0;
					var my = (t.matrix[5] + offset_y) | 0;
					context.commands.renderBitmap(cache_info.handle, new Transform([1, 0, 0, 1, ((mx / 20) | 0) * 20, ((my / 20) | 0) * 20], cache_info.base_transform.colorTransform), true);
				} else {
					var background = this.getOpaqueBackground();
					if (background) {
						var base_transform = context.transformStack.getTransform().clone();
						var bounds = this.renderBoundsWithTransform(base_transform.matrix, true, context.stage.view_matrix());
						context.commands.drawRect(background, [Math.abs(bounds.xMax - bounds.xMin) / 20, 0, 0, Math.abs(bounds.yMax - bounds.yMin) / 20, bounds.xMin, bounds.yMin]);
					}
					this.renderSelf(context);
				}
				if (originalCommands) {
					var subCommands = context.commands.copy();
					context.commands.replace(originalCommands);
					context.commands.blend(subCommands, blendMode);
				}
				context.transformStack.stackPop();
			}
			renderSelf(context) {}
			preRender(context) {
				this.clearInvalidateFlag();
			}
			allowAsMask() {
				return true;
			}
			debugSetLastBound(player, isSet, b) {
				if (isSet) {
					this._debug_boundsLast.xMin = b.xMin;
					this._debug_boundsLast.yMin = b.yMin;
					this._debug_boundsLast.xMax = b.xMax;
					this._debug_boundsLast.yMax = b.yMax;  
				} else {
					var val = (player.wth == 1) ? 0.04 : player.getTickForFrameRate();
					var dt = Math.min(val, 1);
					this._debug_boundsLast.xMin += (b.xMin - this._debug_boundsLast.xMin) * dt;
					this._debug_boundsLast.yMin += (b.yMin - this._debug_boundsLast.yMin) * dt;
					this._debug_boundsLast.xMax += (b.xMax - this._debug_boundsLast.xMax) * dt;
					this._debug_boundsLast.yMax += (b.yMax - this._debug_boundsLast.yMax) * dt;    
				}
			}
			debugSetLastMC(player, isSet, m, c) {
				if (isSet) {
					if (player.wth == 1) {
						this._debug_matrix[0] = Math.random();
						this._debug_matrix[1] = Math.random();
						this._debug_matrix[2] = Math.random();
						this._debug_matrix[3] = Math.random();
						this._debug_matrix[4] = m[4];
						this._debug_matrix[5] = m[5];
					} else {
						this._debug_matrix[0] = m[0];
						this._debug_matrix[1] = m[1];
						this._debug_matrix[2] = m[2];
						this._debug_matrix[3] = m[3];
						this._debug_matrix[4] = m[4];
						this._debug_matrix[5] = m[5];
					}
					this._debug_colorTransform[0] = c[0];
					this._debug_colorTransform[1] = c[1];
					this._debug_colorTransform[2] = c[2];
					this._debug_colorTransform[3] = c[3];
					this._debug_colorTransform[4] = c[4];
					this._debug_colorTransform[5] = c[5];
					this._debug_colorTransform[6] = c[6];
					this._debug_colorTransform[7] = c[7];
				} else {
					var val = (player.wth == 1) ? (0.04 * (player.interpolation ? (player.speed / 2) : (45 / player.frameRate))) : player.getTickForFrameRate();
					var dt = Math.min(val, 1);
					this._debug_colorTransform[0] += ((c[0] - this._debug_colorTransform[0]) * dt);
					this._debug_colorTransform[1] += ((c[1] - this._debug_colorTransform[1]) * dt);
					this._debug_colorTransform[2] += ((c[2] - this._debug_colorTransform[2]) * dt);
					this._debug_colorTransform[3] += ((c[3] - this._debug_colorTransform[3]) * dt);
					this._debug_colorTransform[4] += ((c[4] - this._debug_colorTransform[4]) * dt);
					this._debug_colorTransform[5] += ((c[5] - this._debug_colorTransform[5]) * dt);
					this._debug_colorTransform[6] += ((c[6] - this._debug_colorTransform[6]) * dt);
					this._debug_colorTransform[7] += ((c[7] - this._debug_colorTransform[7]) * dt);
					if (player.wth == 2) return;
					this._debug_matrix[0] += ((m[0] - this._debug_matrix[0]) * dt);
					this._debug_matrix[1] += ((m[1] - this._debug_matrix[1]) * dt);
					this._debug_matrix[2] += ((m[2] - this._debug_matrix[2]) * dt);
					this._debug_matrix[3] += ((m[3] - this._debug_matrix[3]) * dt);
					this._debug_matrix[4] += ((m[4] - this._debug_matrix[4]) * dt);
					this._debug_matrix[5] += ((m[5] - this._debug_matrix[5]) * dt);
				}
			}
			debugRender(context, player) {
				player.debugTransformStack.stackPush(this.getRenderTransform(player.useLastBound));
				var oa = null;
				var hgfh = player.debugTransformStack.getTransform();
				var bm = this.renderBoundsWithTransform(hgfh.matrix, true, context.stage.view_matrix());
				var b = this.getBounds();
				var coll = this._debug_colorDisplayType;
				var collC = [coll[0] / 255, coll[1] / 255, coll[2] / 255, coll[3], 0, 0, 0, 0];
				var collM = [((b.xMax - b.xMin) / 2000) * 1, 0, 0, ((b.yMax - b.yMin) / 2000) * 1, b.xMin, b.yMin];
				context.transformStack.stackPush(hgfh);
				context.transformStack.stackPush(new Transform(collM, collC));
				oa = context.transformStack.getTransform();
				context.commands.renderShape(player.debugRectLineShapeRender, oa);
				context.transformStack.stackPop();
				context.transformStack.stackPop();
				context.transformStack.stackPush(new Transform([1, 0, 0, 1, 0, 0], hgfh.colorTransform));
				context.transformStack.stackPush(new Transform([(bm.xMax - bm.xMin) / 2000, 0, 0, (bm.yMax - bm.yMin) / 2000, bm.xMin, bm.yMin], [0, 0, 0, 1, 0, 0, 0, 0]));
				oa = context.transformStack.getTransform();
				context.commands.renderShape(player.debugRectLineShapeRender, oa);
				context.transformStack.stackPop();
				context.transformStack.stackPush(new Transform([1, 0, 0, 1, 0, 0], [coll[0] / 255, coll[1] / 255, coll[2] / 255, coll[3], 0, 0, 0, 0]));
				player.drawTextW(context, bm.xMin, (bm.yMin - (75 * player.getScaleBoundsText())), 0.25 * player.getScaleBoundsText(), this.getDisplayName());
				context.transformStack.stackPop();
				context.transformStack.stackPop();
				player.debugTransformStack.stackPop();
			}
			/// Run any start-of-frame actions for this display object.
			///
			/// When fired on `Stage`, this also emits the AVM2 `enterFrame` broadcast.
			enterFrame() { }
			/// Execute all other timeline actions on this object.
			runFrameAvm1() { }
			isInteractive() {
				return false;
			}
			isContainer() {
				return false;
			}
			avm1Unload(context) {
				// Unload children.
				if (this.isContainer()) {
					var children = this.iterRenderList();
					for (let i = 0; i < children.length; i++) {
						const child = children[i];
						child.avm1Unload(context);
					}
				}
				this.AVM1_REMOVED = true;
			}
			setState() {
			}
			getDisplayName() {
				return this.displayType + ": " + this.getId();
			}
			mousePickAvm1() {
			}
		}
		
		module.exports = DisplayObject;
	},
	"./src/core/font.js": function(module, exports, __webpack_require__) {
		const shapeUtils = __webpack_require__("./src/render/shape_utils.js");
		
		class Glyph {
			constructor(commands) {
				this.shapeHandle = null;
				this.commands = commands;
				this.advance = 0;
			}
			getShapeHandle(renderer) {
				if (!this.shapeHandle) {
					this.shapeHandle = renderer.registerShape(shapeUtils.shapeToRendererInfo(this.commands));
				}
				return this.shapeHandle;
			}
		}
		class GlyphSourceMemory {
			constructor(glyphs, codePointToGlyph, kerningPairs) {
				this.glyphs = glyphs;
				this.codePointToGlyph = codePointToGlyph;
				this.kerningPairs = kerningPairs;
			}
			getByIndex(i) {
				return this.glyphs[i];
			}
			getByCodePoint(codePoint) {
				var index = this.codePointToGlyph.get(codePoint);
				if (index != null) return this.glyphs[index];
				else return null;
			}
		}
		class FontDescriptor {
			constructor() {
				this.name = "";
				this.lowercaseName = "";
				this.isBold = false;
				this.isItalic = false;
			}
			static fromSwfTag(val) {
				var name = val.fontNameData ? val.fontNameData : "";
				var lowercaseName = name.toLowerCase();
				var f = new FontDescriptor();
				f.name = name;
				f.lowercaseName = lowercaseName;
				f.isBold = val.isBold;
				f.isItalic = val.isItalic;
				return f;
			}
		} 
		class FlashFont {
			constructor() {
				this.glyphs = null;
				this.scale = 1024;
				this.ascent = 0;
				this.descent = 0;
				this.leading = 0;
			}
			static fromSwfTag(tag) {
				let descriptor = FontDescriptor.fromSwfTag(tag);
				var glyphs = tag.glyphs;
				var layout = tag.layout;
				var codeTables = tag.codeTables;
				var codePointToGlyph = new Map();
				var glyphsResult = [];
				var kerningPairs = [];
				var ascent = 0;
				var descent = 0;
				var leading = 0;
				if (glyphs) {
					for (var i = 0; i < glyphs.length; i++) {
						var g = new Glyph(shapeUtils.convertWithCacheCodes(glyphs[i]));
						glyphsResult.push(g);
					}
					if (codeTables) {
						for (var i = 0; i < codeTables.length; i++) {
							codePointToGlyph.set(codeTables[i], i)
						}
					}
					if (layout) {
						ascent = layout.ascent;
						descent = layout.descent;
						leading = layout.leading;
						var advanceTable = layout.advanceTable;
						for (var i = 0; i < advanceTable.length; i++) {
							glyphsResult[i].advance = advanceTable[i];
						}
					}
				}
				var f = new FlashFont();
				f.descriptor = descriptor;
				f.scale = tag.version >= 3 ? 20480 : 1024;
				f.ascent = ascent;
				f.descent = descent;
				f.leading = leading;
				f.glyphs = new GlyphSourceMemory(glyphsResult, codePointToGlyph, kerningPairs);
				return f;
			}
			getGlyphForChar(c) {
				return this.glyphs.getByCodePoint(c);
			}
			getGlyph(index) {
				return this.glyphs.getByIndex(index);
			}
		}
		module.exports = FlashFont;
	},
	"./src/core/library.js": function(module, exports, __webpack_require__) {
		const FlashFont = __webpack_require__("./src/core/font.js");
		const log = __webpack_require__("./src/core/log.js");
		const Character = __webpack_require__("./src/core/character.js");

		class MovieLibrary {
			constructor() {
				this.characters = [];
				this.exportCharacters = [];
				this.jpegTables = null;
			}
			characterById(id) {
				return this.characters[id];
			}
			registerCharacter(id, character) {
				// TODO(Herschel): What is the behavior if id already exists?
				if (!this.containsCharacter(id)) {
					this.characters[id] = character;
				} else {
					log.error("Character ID collision: Tried to register ID twice: " + id);
				}
			}
			registerExport(id, exportName) {
				this.exportCharacters[id] = exportName;
			}
			containsCharacter(id) {
				return (id in this.characters);
			}
			instantiateById(id) {
				var c = this.characterById(id);
				if (c) {
					return this.instantiateDisplayObject(c);
				} else {
					log.error("Tried to instantiate non-registered character ID " + id);
				}
			}
			getDisplays() {
				var result = [];
				var characters = this.characters;
				for (var i = 0; i < characters.length; i++) {
					var c = characters[i];
					if (c) {
						result.push(c);
					}
				}
				return result;
			}
			getDisplayTypes() {
				var resultTypes = {};
				var characters = this.characters;
				for (var i = 0; i < characters.length; i++) {
					var c = characters[i];
					if (c) {
						var displayType = c.displayType;
						if (displayType) {
							if (!(displayType in resultTypes)) {
								resultTypes[displayType] = [];
							}
							resultTypes[displayType].push(c);
						}    
					}
				}
				return resultTypes;
			}
			instantiateDisplayObject(character) {
				switch (character.type) {
					case Character.EditText:
					case Character.Graphic:
					case Character.MovieClip:
					case Character.Bitmap:
					case Character.Avm1Button:
					case Character.MorphShape:
					case Character.Text:
					case Character.Video:
						return character.data.instantiate();
					default:
						log.error("Not a DisplayObject", character);
				}
			}
			getBitmap(id) {
				var ch = this.characters[id];
				if (ch) {
					return (ch.type == Character.Bitmap) ? ch.data : null;
				} else {
					return null;
				}
			}
			getFont(id) {
				var ch = this.characters[id];
				if (ch) {
					return (ch.type == Character.Font) ? ch.data : null;
				} else {
					return null;
				}
			}
			getGraphic(id) {
				var ch = this.characters[id];
				if (ch) {
					return (ch.type == Character.Graphic) ? ch.data : null;
				} else {
					return null;
				}
			}
			getMorphShape(id) {
				var ch = this.characters[id];
				if (ch) {
					return (ch.type == Character.MorphShape) ? ch.data : null;
				} else {
					return null;
				}
			}
			getSound(id) {
				var ch = this.characters[id];
				if (ch) {
					return (ch.type == Character.Sound) ? ch.data : null;
				} else {
					return null;
				}
			}
			getText(id) {
				var ch = this.characters[id];
				if (ch) {
					return (ch.type == Character.Text) ? ch.data : null;
				} else {
					return null;
				}
			}
			setJpegTables(jt) {
				if (this.jpegTables) {
					// SWF spec says there should only be one JPEGTables tag.
					// TODO: What is the behavior when there are multiples?
					log.warn("SWF contains multiple JPEGTables tags");
					return;
				}
				if (jt.length) {
					this.jpegTables = jt;
				}
			}
		}

		class Library {
			constructor() {
				this.deviceFont = null;
			}
			static createMovieLibrary() {
				return new MovieLibrary();
			}
			registerDeviceFont(definition) {
				var b = FlashFont.fromSwfTag(definition);
				this.deviceFont = b;
			}
		}
		module.exports = Library;
	},
	"./src/core/log.js": function(module, exports, __webpack_require__) {
		class PinkFieLog {
			constructor() {
				this._listeners = []; // [PinkFiePlayer, [type], [messages]]
			}
			subscribe(fn) {
				this._listeners.push(fn);
			}
			emit(type, messages) {
				if (this._listeners.length) {
					for (const listener of this._listeners) {
						listener[1](listener[0], type, messages);
					}	
				} else {
					console.log(...messages);
				}
			}
			log() {
				this.emit("log", arguments);
			}
			warn() {
				this.emit("warn", arguments);
			}
			error() {
				this.emit("error", arguments);
			}
		}
		module.exports = new PinkFieLog();
	},
	"./src/core/player.js": function(module, exports, __webpack_require__) {
		const Library = __webpack_require__("./src/core/library.js");
		const AudioMixer = __webpack_require__("./src/core/audio/mixer.js");
		const AudioManager = __webpack_require__("./src/core/audio/audio.js");
		const Avm1 = __webpack_require__("./src/core/avm1.js");
		const { TransformStack, Transform } = __webpack_require__("./src/render/transform.js");
		const RenderCanvas2d = __webpack_require__("./src/render/canvas2d.js");
		const RenderWebGL = __webpack_require__("./src/render/webgl.js");
		const pinkfieFont = __webpack_require__("./src/core/assets/noto-sans-definefont3.bin");
		const MovieClip = __webpack_require__("./src/core/display_objects/movie_clip.js");
		const Stage = __webpack_require__("./src/core/display_objects/stage.js");
		const config = __webpack_require__("./src/config.js");
		const SwfInput = __webpack_require__("./src/swf/swf_input.js");
		const CommandList = __webpack_require__("./src/render/commands.js");
		const VideoBackend = __webpack_require__("./src/video/backend.js");
		const { UpdateContext, RenderContext } = __webpack_require__("./src/core/context.js");
		const log = __webpack_require__("./src/core/log.js");

		function scaleMat(mat, sx, sy) {
			mat[0] *= sx;
			mat[1] *= sy;
			mat[2] *= sx;
			mat[3] *= sy;
			mat[4] *= sx;
			mat[5] *= sy;
		}

		function translateMat(mat, dx, dy) {
			mat[4] += dx;
			mat[5] += dy;
		}

		function invertMat(mat) {
			var det = mat[0] * mat[3] - mat[2] * mat[1];
			var tx = (mat[3] * mat[4] - mat[2] * mat[5]) / -det;
			var ty = (mat[1] * mat[4] - mat[0] * mat[5]) / det;
			var a = mat[3] / det;
			var b = mat[1] / -det;
			var c = mat[2] / -det;
			var d = mat[0] / det;

			mat[0] = a;
			mat[1] = b;
			mat[2] = c;
			mat[3] = d;
			mat[4] = tx;
			mat[5] = ty;
		}

		class ActionQueue {
			constructor() {
				this.actionQueue = [];
			}
			queueAction(clip, action, isUnload) {
				let _action = {};
				_action.clip = clip;
				_action.action = action;
				_action.isUnload = isUnload;
				this.actionQueue.unshift(_action);
			}
			popAction() {
				return this.actionQueue.pop();
			}
		}

		class Player {
			constructor(audioContext) {
				this.audioContext = audioContext;

				this.onload = null;
				this.onerror = null;
				this.onprogress = null;

				this._width = 0;
				this._height = 0;
		
				this.speed = 1;

				this.useBitmapCache = false;
		
				this.width = 0;
				this.height = 0;
				this.version = 0;
				this.frameRate = 5;
				this.mousePosition = [0, 0];
				this.mousePressed = false;
				this.needsRender = false;
				this.quality = "high";
				this.playing = false;
				this.vCamId = 0;
				this.vCamShow = false;
				this.renderScaleType = 0;
				this.root = document.createElement('div');
				this.root.classList.add('pinkfie-root');
				this.library = new Library();
				try {
					if (config.useWebGL) {
						this.renderer = new RenderWebGL();
					} else {
						this.renderer = new RenderCanvas2d();
					}
				} catch(e) {
					console.log(e);
					this.renderer = new RenderCanvas2d();
				}
				this.canvas = this.renderer.canvas;
				this.root.appendChild(this.canvas);
				this.canvas.tabIndex = 0;
				this.canvas.style.outline = 'none';
				this.audio = new AudioMixer(audioContext);
				this.audioManager = new AudioManager();
				this.avm1 = new Avm1();
				this.video = new VideoBackend();
				this.useLastBound = false;
				this.wth = false;
				this.interpolation = false;
				this._unloop = false;
				this.transformStack = new TransformStack();
				this.debugTransformStack = new TransformStack();
				this.instanceCounter = 0;
				this.actionQueue = new ActionQueue();
				this.cursor = 0;
				this.frame_accumulator = 0;
				this.time_offset = 0;
				this.last_time = 0;
				this.mouse_over_object = null;
				this.mouse_down_object = null;
				this.stage = new Stage(false, null);
				this.renderType = "render";
				this.addEventListeners();
				this.debugRectLineShapeRender = this.renderer.registerShape([{
					type: 1,
					width: 40,
					path2d: [[0, 0, 0], [2, 2000, 0], [2, 2000, 2000], [2, 0, 2000], [2, 0, 0]],
					fill: {
						type: 0,
						color: [255, 255, 255, 1]
					}
				}]);
				this.registerDeviceFont(new SwfInput(pinkfieFont, 32).parseDefineFont2(3, pinkfieFont.length));
			}
			get unloop() {
				return this._unloop;
			}
			set unloop(value) {
				this._unloop = value;
				this.clipSetLoop(!value);
			}
			addEventListeners() {
				this._onmousedown = this._onmousedown.bind(this);
				this._onmouseup = this._onmouseup.bind(this);
				this._onmousemove = this._onmousemove.bind(this);
				this._ontouchstart = this._ontouchstart.bind(this);
				this._ontouchend = this._ontouchend.bind(this);
				this._ontouchmove = this._ontouchmove.bind(this);
				document.addEventListener('mousedown', this._onmousedown);
				document.addEventListener('mouseup', this._onmouseup);
				document.addEventListener('mousemove', this._onmousemove);
				document.addEventListener('touchstart', this._ontouchstart, { passive: false });
				document.addEventListener('touchend', this._ontouchend);
				document.addEventListener('touchmove', this._ontouchmove);
			}
			removeEventListeners() {
				document.removeEventListener('mousedown', this._onmousedown);
				document.removeEventListener('mouseup', this._onmouseup);
				document.removeEventListener('mousemove', this._onmousemove);
				document.removeEventListener('touchstart', this._ontouchstart);
				document.removeEventListener('touchend', this._ontouchend);
				document.removeEventListener('touchmove', this._ontouchmove);
			}
			registerDeviceFont(definition) {
				this.library.registerDeviceFont(definition);
			}
			_onmousedown(e) {
				if (e.target === this.canvas) {
					this.updateMouse(e);
					this.updateMouseDown(e);
					e.preventDefault();
				}
			}
			_onmouseup(e) {
				this.updateMouseUp(e);
				if (e.target === this.canvas)
					e.preventDefault();
			}
			_onmousemove(e) {
				this.updateMouse(e);
			}
			_ontouchstart(e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					const t = e.changedTouches[i];
					if (e.target === this.canvas) {
						this.updateMouse(t);
						this.updateMouseDown(t);
						e.preventDefault();
					}
				}
			}
			_ontouchend(e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					const t = e.changedTouches[i];
					if (e.target === this.canvas) {
						this.updateMouseUp(t);
						e.preventDefault();
					}
				}
			}
			_ontouchmove(e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					const t = e.changedTouches[i];
					if (e.target === this.canvas) 
						this.updateMouse(t);
				}
			}
			updateMouse(e) {
				var rect = this.canvas.getBoundingClientRect();
				var xm = e.clientX - rect.left;
				var ym = e.clientY - rect.top;

				var g = this.getScaleRender();

				var x = ((xm / g[6]) - g[2]) / g[4];
				var y = ((ym / g[7]) - g[3]) / g[5];
		
				var wx = Math.round(x * this.width);
				var wy = Math.round(y * this.height);
		
				this.mouseMove(wx, wy);
			}
			updateMouseDown(e) {
				this.mouseDown();
			}
			updateMouseUp() {
				this.mouseUp();
			}
			getInstanceCounter() {
				return this.instanceCounter;
			}
			clipIsPlaying() {
				var clip = this.getRootClip();
				return clip ? clip.isPlaying : false;
			}
			rootCurrentFrame() {
				var clip = this.getRootClip();
				return clip ? clip.currentFrame : 0;
			}
			rootFramesloaded() {
				var clip = this.getRootClip();
				return clip ? clip.getFramesloaded() : 0;
			}
			getTotalFrames() {
				var clip = this.getRootClip();
				return clip ? clip.getTotalFrames() : 0;
			}
			addInstanceCounter() {
				return this.instanceCounter++;
			}
			isActionScript3() {
				return this.swf.isActionScript3();
			}
			getDisplayTypes() {
				return Object.keys(this.swf.library.getDisplayTypes());
			}
			getCompressSound() {
				var clip = this.getRootClip();
				var rootClipTag = clip.staticData;
				var characters = this.swf.library.getDisplays();
				var resultType = {};
				for (var i = 0; i < characters.length; i++) {
					var c = characters[i];
					var data = c.data;
					switch(c.displayType) {
						case "Sound":
							resultType[data.format.compression] = true;
							break;
						case "MovieClip":
							var audioStreamInfo = data.audioStreamInfo;
							if (audioStreamInfo) {
								var compression = audioStreamInfo.stream.compression;
								if (compression != "uncompressedUnknownEndian") {
									resultType[compression] = true;
								}
							}
							break;
					}
				}
				var audioStreamInfo = rootClipTag.audioStreamInfo;
				if (audioStreamInfo) {
					var compression = audioStreamInfo.stream.compression;
					if (compression != "uncompressedUnknownEndian") {
						resultType[compression] = true;
					}
				}
				return Object.keys(resultType);
			}
			getCompressVideo() {
				var characters = this.swf.library.getDisplays();
				var resultType = {};
				for (var i = 0; i < characters.length; i++) {
					var c = characters[i];
					var data = c.data;
					if (c.displayType == "Video") {
						resultType[data.data.codec] = true;
					}
				}
				return Object.keys(resultType);
			}
			getRootClip() {
				return this.stage.childByDepth(0);
			}
			getDebugVideoText() {
				var clip = this.getRootClip();

				if (!clip) return "";
				var resultTypes = this.getChildTypes(clip);

				var result = [];
				for (var i = 0; i < resultTypes.length; i++) {
					var r = resultTypes[i];
					if (r.displayType == "Video") {
						result.push(r);
					}
				}
				var txt = "";
				for (var i = 0; i < result.length; i++) {
					var r = result[i];
					txt += r.getDebugVideoText();
					if (i != (result.length - 1)) {
						txt += ", ";
					}
				}
				return txt;
			}
			getScaleBoundsText() {
				var scaleW = this._width / 640;
				var scaleH = this._height / 360;
				var scale = Math.min(Math.abs(scaleW), Math.abs(scaleH));
				if (this.quality == "low") {
					scale *= 0.5;
				} else if (this.quality == "medium") {
					scale *= 0.8;
				}
				return (this.renderScaleType == 1) ? 1 : scale;
			}
			getRectStage() {
				var _movieCanvas = this.canvas;
				var w, h;
				var x = 0, y = 0;
				var __Width = this._width;
				var __Height = this._height;
				if (this.renderScaleType) {
					w = _movieCanvas.width;
					h = _movieCanvas.height;
					x = 0;
					y = 0;
				} else {
					if ((__Height - (_movieCanvas.height * (__Width / _movieCanvas.width))) < 0) {
						w = (_movieCanvas.width * (__Height / _movieCanvas.height));
						h = (_movieCanvas.height * (__Height / _movieCanvas.height));
						x = (__Width - w) / 2;
					} else {
						w = (_movieCanvas.width * (__Width / _movieCanvas.width));
						h = (_movieCanvas.height * (__Width / _movieCanvas.width));
						y = (__Height - h) / 2;
					}	
				}
				return [x, y, w, h];
			}
			hitStageMouse() {
				return true;
			}
			getTickForFrameRate() {
				return Math.min(1, ((1 - (10 * (1 / this.frameRate))) * this.speed) * (1 * this.speed));
			}
			getPlayingAudioCount() {
				return this.audio.getPlayingAudioCount();
			}
			stopAllSounds() {
				this.audio.stopAllSounds(false);
			}
			getScaleRender() {
				var tx = 0;
				var ty = 0;
				var scaleX;
				var scaleY;
				var r = this.getRectStage();
				var a = r[2];
				var b = r[3];
				var c = 0;
				var d = 0;
				if (this.renderScaleType == 2) {
					scaleX = (this.canvas.width / this.width);
					scaleY = (this.canvas.height / this.height);
					a = this.width;
					b = this.height;
					c = (this._width / this.width);
					d = (this._height / this.height);
					tx = 0;
					ty = 0;
				} else if (this.renderScaleType == 1) {
					scaleX = scaleY = 1;
					a = this.width;
					b = this.height;
					c = (this._width / this.canvas.width);
					d = (this._height / this.canvas.height);
					tx = ((this.canvas.width / 2) - (this.width / 2));
					ty = ((this.canvas.height / 2) - (this.height / 2));
				} else {
					scaleX = (this.canvas.width / this.width);
					scaleY = (this.canvas.height / this.height);
					c = 1;
					d = 1;
				}
				return [scaleX, scaleY, tx, ty, a, b, c, d];
			}
			getTime() {
				return this.audio.getTime();
			}
			tick() {
				if (this.time_offset == 0) this.time_offset = this.getTime();
				if (this.playing) {
					var fd = Math.max(this.getTime() - this.time_offset, 0);
					while ((fd - this.last_time) >= 0) {
						this.last_time += 10;
						this.frame_accumulator += 10;
					}
					let frame_rate = this.frameRate;
					let frame_time = (1000 / frame_rate) / this.speed;
					var startTime = Date.now();
					var frame = 0;
					while ((((Date.now() - startTime) < 50) && (frame < 5)) && (this.frame_accumulator >= 0)) {
						if (this.useLastBound && !this.interpolation) {
							this.updateDebugLast();
							if (this.interpolation) this.needsRender = true;
						}
						this.runFrame();
						this.frame_accumulator -= frame_time;
						frame++;
					}
					var audioSkewTime = false;
					if (this.frame_accumulator >= 0) {
						this.frame_accumulator = 0;
						this.last_time = 0;
						this.time_offset = this.getTime();
						this.audioManager.audioSkewTime(this.audio, 0);
						audioSkewTime = true;
					}
					this.mutateWithUpdateContext((context) => {
						this.mousePick(context, "move");
					});
					if (this.useLastBound && this.interpolation) {
						this.updateDebugLast();
						if (this.interpolation) this.needsRender = true;
					}
					var tgs = (this.cursor > 0) && this.hitStageMouse();
					if (tgs) {
						this.canvas.style.cursor = "pointer";
					} else {
						this.canvas.style.cursor = "auto";
					}
					if (audioSkewTime) this.audio.resume();
					else this.audio.tick();
				} else {
					this.last_time = 0;
					this.time_offset = this.getTime();
				}
				if (this.needsRender) {
					this.render();
				}
			}
			mutateWithUpdateContext(callback) {
				var context = new UpdateContext({
					player: this,
					renderer: this.renderer,
					library: this.library,
					audio: this.audio,
					audioManager: this.audioManager,
					swf: this.swf,
					avm1: this.avm1,
					video: this.video,
					stage: this.stage,
					actionQueue: this.actionQueue
				});
				let ret = callback(context);
				return ret;
			}
			gotoFrame(frame) {
				this.mutateWithUpdateContext((context) => {
					var parent = this.getRootClip();
					if (parent) {
						parent.gotoFrame(context, frame, !parent.isPlaying);
					}
				});
			}
			updateDebugLast() {
				var parent = this.getRootClip();
				if (parent) {
					this.updateDebugLastChild(parent);
				}
			}
			updateDebugLastChild(child) {
				if (child.isContainer()) {
					var children = child.iterRenderList();
					for (var i = 0; i < children.length; i++) {
						var c = children[i];
						this.updateDebugLastChild(c);
					}
				}
				child.debugSetLastMC(this, false, child.getMatrix(), child.getColorTransform());
				child.debugSetLastBound(this, false, child.getBounds());
			}
			getChildrenTypes() {
				var clip = this.getRootClip();
				var types = [];
				var resultTypes = this.getChildTypes(clip);
				for (var i = 0; i < resultTypes.length; i++) {
					var c = resultTypes[i];
					types.push(c.displayType);
				}
				return types;
			}
			getChildTypes(child) {
				var types = [];
				if (child.isContainer()) {
					var children = child.iterRenderList();
					for (var i = 0; i < children.length; i++) {
						var c = children[i];
						var resultTypes = this.getChildTypes(c);
						for (var l = 0; l < resultTypes.length; l++) {
							types.push(resultTypes[l]);
						}
					}
				}
				types.push(child);
				return types;
			}
			mouseMove(x, y) {
				this.mousePosition = [x, y];
			}
			mouseDown() {
				this.mousePressed = true;
				this.mutateWithUpdateContext((context) => {
					this.mousePick(context, "down");
				});
			}
			mouseUp() {
				this.mousePressed = false;
				this.mutateWithUpdateContext((context) => {
					this.mousePick(context, "up");
					this.mousePick(context, "move");
				});
			}
			mousePick(context, type) {
				var clip = this.getRootClip();
				if (clip) {
					if ((type == "move") && !this.mouse_down_object) {
						var button = clip.mousePickAvm1(context, [this.mousePosition[0] * 20, this.mousePosition[1] * 20], false);
						if (button) {
							if (this.mouse_over_object !== button) {
								if (this.mouse_over_object) {
									this.mouse_over_object.setState(context, "up");
								}
								button.setState(context, "over");
								this.mouse_over_object = button;
							}
							this.openCursor();
						} else {
							if (this.mouse_over_object) {
								this.mouse_over_object.setState(context, "up");
								this.mouse_over_object = null;
							}
							this.closeCursor();
						}
					} else if (type == "down") {
						if (this.mouse_over_object) {
							this.mouse_down_object = this.mouse_over_object;
							this.mouse_over_object = null;
							this.mouse_down_object.setState(context, "down");
						}
					} else if (type == "up") {
						if (this.mouse_down_object) {
							this.mouse_down_object.clickAction(context, "condOverDownToOverUp");
							this.mouse_over_object = this.mouse_down_object;
							this.mouse_over_object.setState(context, "over");
							this.mouse_down_object = null;
							this.closeCursor();
						}
					}
				}
			}
			preload(executionLimit) {
				return this.mutateWithUpdateContext((context) => {
					var did_finish = true;
					var root = this.getRootClip();
					did_finish = root.preload(context, executionLimit);
					return did_finish;
				});
			}
			stopSounds() {
				this.audio.stopAllSounds();
			}
			setSpeed(speed) {
				this.speed = speed;
				this.audio.setSpeed(speed);
			}
			setQuality(quality) {
				this.quality = quality;
				this.renderer.setQuality(quality);
			}
			debugInfo() {
				var result = "# Player Info\n";
				result += this.renderer.debugInfo() + "\n";
				var swfMetadata = this.getMetadata();
				if (swfMetadata) {
					result += "\n# Metadata\n";
					result += "width: " + swfMetadata.width + "\n";
					result += "height: " + swfMetadata.height + "\n";
					result += "frameRate: " + swfMetadata.frameRate + "\n";
					result += "numFrames: " + swfMetadata.numFrames + "\n";
					result += "swfVersion: " + swfMetadata.version + "\n";
					result += "backgroundColor: " + swfMetadata.backgroundColor + "\n";
					result += "isActionScript3: " + swfMetadata.isActionScript3 + "\n";
					result += "uncompressedLength: " + swfMetadata.uncompressedLength + "\n";
				}
				return result;
			}
			getMetadata() {
				if (this.swf) {
					var version = this.swf.version;
					var width = this.swf.width;
					var height = this.swf.height;
					var frameRate = this.swf.frameRate;
					var numFrames = this.swf.numFrames;
					var backgroundColor = [255, 255, 255];
					var b = this.stage.getBackgroundColor();
					if (b) {
						backgroundColor[0] = b[0];
						backgroundColor[1] = b[1];
						backgroundColor[2] = b[2];	
					}
					return {
						backgroundColor,
						version,
						width,
						height,
						frameRate,
						numFrames,
						isActionScript3: this.swf.isActionScript3(),
						uncompressedLength: this.swf.uncompressedLength
					}
				} else {
					return null;
				}
			}
			setRootMovie(movie) {
				this.swf = movie;
				var version = movie.version;
				var width = movie.width;
				var height = movie.height;
				var frameRate = movie.frameRate;
				log.log(`Loaded SWF version ${version}, resolution ${width}x${height} @ ${frameRate} FPS`);
				this.version = version;
				this.frameRate = frameRate;
				this.width = width;
				this.height = height;
				this.avm1.version = version;

				this.stage.setMovieSize(width, height);
				this.stage.setMovie(movie);
				
				this.mutateWithUpdateContext((context) => {
					var root = MovieClip.playerRootMovie(null, movie);
					root.setIsRoot(true);
					root.postInstantiation(context, null, null, false);
					this.stage.replaceAtDepth(context, root, 0);
				});
			}
			runFrame() {
				this.needsRender = true;
				this.mutateWithUpdateContext((context) => {
					this.avm1.runFrame(context);
				});
				this.mutateWithUpdateContext((context) => {
					this.runActions(context);
					this.audioManager.updateSounds(context);
				});
				var _parent = this.getRootClip();
				if (this.vCamId) {
					var resultVcamId = null;
					var useScaleStage = false;
					try {
						resultVcamId = JSON.parse("[" + this.vCamId + "]");
					} catch(e) {
					}
					if (resultVcamId) {
						if (resultVcamId[0] == "USS") 
							useScaleStage = true;
						this.executeVCamById(_parent, resultVcamId, useScaleStage);
					}
				} else {
					_parent.applyMatrix([1, 0, 0, 1, 0, 0]);
					_parent.applyColorTransform([1, 1, 1, 1, 0, 0, 0, 0]);
				}
			}
			executeVCamById(clip, idList, useScaleStage) {
				var children = clip.iterRenderList();
				var activeVCam = false;
				for (var i = 0; i < children.length; i++) {
					var mc = children[i];
					if (mc instanceof MovieClip) {
						if (idList.indexOf(mc.getId()) >= 0) {
							activeVCam = true;
							this.executeVCam(clip, mc, useScaleStage);
						} else {
							this.executeVCamById(mc, idList, useScaleStage);
						}
					}
				}
				if (clip.hasClipVCam) {
					if (!activeVCam) {
						console.log("DESACTIVE VCAM", clip);
						clip.hasClipVCam = false;
						clip.applyMatrix([1, 0, 0, 1, 0, 0]);
						clip.applyColorTransform([1, 1, 1, 1, 0, 0, 0, 0]);  
					}
				} else {
					if (activeVCam) {
						if (!clip.hasClipVCam) {
							console.log("ACTIVE VCAM v1.1", clip);
							clip.hasClipVCam = true;
						}
					}
				}
			}
			executeVCam(_parent, vCam, useScaleStage) {
				if (vCam && (vCam instanceof MovieClip)) {
					var c = vCam.getColorTransform();
					vCam.setVisible(!!this.vCamShow);

					var bounds = vCam.getBounds();

					var camW = Math.abs(bounds.xMax - bounds.xMin) / 20;
					var camH = Math.abs(bounds.yMax - bounds.yMin) / 20;
					var sw = this.width;
					var sh = this.height;

					if (useScaleStage) {
						camW = sw;
						camH = sh;
					}

					var w = camW * vCam.getXScale();
					var h = camH * vCam.getYScale();
					var _scaleX = sw / w;
					var _scaleY = sh / h;

					var matrix = JSON.parse(JSON.stringify(vCam.getMatrix()));

					matrix[4] /= 20;
					matrix[5] /= 20;

					invertMat(matrix);
					scaleMat(matrix, vCam.getXScale(), vCam.getYScale());
					translateMat(matrix, (w / 2), (h / 2));
					scaleMat(matrix, _scaleX, _scaleY);

					matrix[4] *= 20;
					matrix[5] *= 20;

					_parent.applyMatrix(matrix);
					_parent.applyColorTransform([c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7]]);
				}
			}
			runActions(context) {
				var actionInfo;
				while (actionInfo = this.actionQueue.popAction()) {
					var action = actionInfo.action;
					switch (action.type) {
						case "normal":
							this.avm1.runStackFrameForAction(actionInfo.clip, "[Frame]", action.caches, context);
							break;
					}
				}
			}
			resize(w, h) {
				this.needsRender = true;
		
				this._width = w;
				this._height = h;
		
				var scaleW = w / this.width;
				var scaleH = h / this.height;
				var scale = Math.min(Math.abs(scaleW), Math.abs(scaleH));
		
				var qScale = 1;
				if (this.quality == "low") {
					qScale = 0.5;
				} else if (this.quality == "medium") {
					qScale = 0.8;
				}
				if (this.quality == "high") {
					qScale *= (window.devicePixelRatio || 1);
				}
		
				var _w = this.renderScaleType ? w : Math.floor(this.width * scale);
				var _h = this.renderScaleType ? h : Math.floor(this.height * scale);
		
				this.renderer.resize(_w * qScale, _h * qScale);
		
				var rc = this.getRectStage();
		
				this.canvas.style.left = rc[0] + "px";
				this.canvas.style.top = rc[1] + "px";
		
				this.canvas.style.width = _w + "px";
				this.canvas.style.height = _h + "px";
		
				this.render();
			}
			render() {
				var isR = this.renderType !== "bounds without render";
				var isB = (this.renderType == "bounds without render") || (this.renderType == "render with bounds");
				var backgroundColor = [255, 255, 255, 1];
				if (isR) {
					var b = this.stage.getBackgroundColor();
					if (b) {
						backgroundColor[0] = b[0];
						backgroundColor[1] = b[1];
						backgroundColor[2] = b[2];	
					}
				}
				var cacheDraws = [];
				var context = new RenderContext({
					library: this.library,
					renderer: this.renderer,
					commands: new CommandList(),
					transformStack: this.transformStack,
					debugTransformStack: this.debugTransformStack,
					cacheDraws,
					isOffscreen: false,
					useBitmapCache: this.useBitmapCache,
					useLastBound: this.useLastBound,
					stage: this.stage
				});
				let [scaleX, scaleY, tx, ty] = this.getScaleRender();
				this.stage.viewport_matrix[0] = scaleX;
				this.stage.viewport_matrix[1] = 0;
				this.stage.viewport_matrix[2] = 0;
				this.stage.viewport_matrix[3] = scaleY;
				this.stage.viewport_matrix[4] = tx * 20;
				this.stage.viewport_matrix[5] = ty * 20;
				if (isR) this.stage.render(context);
				if (isB) this.stage.debugRender(context, this);
				this.renderer.submitFrame(backgroundColor, context.commands, cacheDraws);
				this.needsRender = false;
			}
			drawTextW(context, x, y, scal, txt) {
				var deviceFont = context.library.deviceFont;
				var renderer = context.renderer;
				var fontScale = deviceFont.scale / 1024;
				var sc = scal;
				var rrr = 0;
				for (var i = 0; i < txt.length; i++) {
					var glyph = deviceFont.getGlyphForChar(txt.charCodeAt(i));
					if (glyph) {
						var shapeHandle = glyph.getShapeHandle(renderer);
						context.transformStack.stackPush(new Transform([sc / fontScale, 0, 0, sc / fontScale, (x + (rrr * sc)), y + (40 * scal)], [1, 1, 1, 1, 0, 0, 0, 0]));
						context.commands.renderShape(shapeHandle, context.transformStack.getTransform());
						context.transformStack.stackPop();
						rrr += glyph.advance / 20;
					}
				}
			}
			closeCursor() {
				this.cursor = 0;
			}
			openCursor() {
				this.cursor = 1;
			}
			destroy() {
				this.audio.pause();
				this.removeEventListeners();
				this.renderer.destroy();
			}

			
			// Controls
			pause() {
				this.playing = false;
				this.audio.pause();
			}
			resume() {
				this.playing = true;
				this.audio.resume();
			}
			runMenu(menu) {
				this.mutateWithUpdateContext((context) => {
					switch (menu) {
						case "play/stop":
							this.togglePlayRootMovie(context);
							break;
						case "loop":
							this.toggleLoopRootMovie();
							break;
						case "rewind":
							this.rewindRootMovie(context);
							break;
						case "forward":
							this.forwardRootMovie(context);
							break;
						case "back":
							this.backRootMovie(context);
							break;
					}
				});
			}
			clipGetLoop() {
				var clip = this.getRootClip();
				if (clip) {
					return clip.isLoop;
				}
				return false;
			}
			clipSetLoop(loop) {
				var clip = this.getRootClip();
				if (clip) {
					clip.isLoop = loop;
				}
			}
			togglePlayRootMovie(context) {
				var clip = this.getRootClip();
				if (clip) {
					if (clip.isPlaying) {
						clip.stop(context);
					} else {
						clip.play(context);
					}
				}
			}
			toggleLoopRootMovie() {
				var clip = this.getRootClip();
				if (clip) {
					clip.isLoop = !clip.isLoop;
				}
			}
			rewindRootMovie(context) {
				var clip = this.getRootClip();
				this.needsRender = true;
				if (clip) {
					clip.gotoFrame(context, 1, true);
				}
			}
			forwardRootMovie(context) {
				var clip = this.getRootClip();
				this.needsRender = true;
				if (clip) {
					clip.nextFrame(context);
				}
			}
			backRootMovie(context) {
				var clip = this.getRootClip();
				this.needsRender = true;
				if (clip) {
					clip.prevFrame(context);
				}
			}
		}
		
		module.exports = Player;
	},
	"./src/core/tag_utils.js": function(module, exports, __webpack_require__) {
		const Library = __webpack_require__("./src/core/library.js");
		const SwfInput = __webpack_require__("./src/swf/swf_input.js");

		class SwfMovie {
			constructor(header, movieInfo, fileAttributes) {
				this.library = Library.createMovieLibrary();
				this.header = header;
				this.movieInfo = movieInfo;
				this.attributes = {
					useDirectBlit: !!fileAttributes.useDirectBlit,
					useGPU: !!fileAttributes.useGPU,
					hasMetadata: !!fileAttributes.hasMetadata,
					isActionScript3: !!fileAttributes.isActionScript3,
					useNetworkSandbox: !!fileAttributes.useNetworkSandbox
				};
			}
			
			isActionScript3() {
				return this.attributes.isActionScript3;
			}
			getStageSize() {
				return this.movieInfo.bounds;
			}
			get version() {
				return this.header.version;
			}
			get numFrames() {
				return this.movieInfo.numFrames;
			}
			get width() {
				var stageSize = this.getStageSize();
				return (stageSize.xMax - stageSize.xMin) / 20;
			}
			get height() {
				var stageSize = this.getStageSize();
				return (stageSize.yMax - stageSize.yMin) / 20;
			}
			get frameRate() {
				return this.movieInfo.frameRate;
			}
			get uncompressedLength() {
				return this.header.uncompressedLength;
			}
		}

		class SwfSlice {
			constructor(movie) {
				this.movie = movie;
				this.start = 0;
				this.end = 0;
			}
			static from(movie) {
				var h = new SwfSlice(movie);
				h.start = 0;
				h.end = movie.data.length;
				return h;
			}
			readFrom(from) {
				var b = this.movie.data.subarray(this.start, this.end);
				var r = new SwfInput(b, this.movie.version);
				r.byteStream.byte_offset = from;
				return r;
			}
			resizeToReader(reader, size) {
				let outer_offset = this.start + reader.byteStream.byte_offset;
				let new_start = outer_offset;
				let new_end = outer_offset + size;
				var g = new SwfSlice(this.movie);
				g.start = new_start;
				g.end = new_end;
				return g;
			}
			get length() {
				return this.end - this.start;
			}
		}

		function decode_tags(reader, tag_callback) {
			while (true) {
				var { tagcode, length } = reader.parseTagCodeLength();
				var startO = reader.byteStream.byte_offset;
				var c = tag_callback(reader, tagcode, length);
				var s = startO + length;
				reader.byteStream.setOffset(s, 0);
				if (c) {
					break;
				}
			}
			return true;
		}

		exports.SwfMovie = SwfMovie;
		exports.SwfSlice = SwfSlice;
		exports.decode_tags = decode_tags;
	},
	"./src/render/bitmap.js": function(module, exports, __webpack_require__) {
		const yuv420_to_rgba = __webpack_require__("./src/utils/yuv420_to_rgba.js");
		class Bitmap {
			constructor(width, height, format, data) {
				this.width = width;
				this.height = height;
				this.format = format;
				this.data = data;
			}
			toRGBA() {
				switch (this.format) {
					case Bitmap.YUV420P:
						var luma_len = (this.width * this.height);
						var chroma_len = (this.chroma_width() * this.chroma_height());
						var y = this.data.subarray(0, luma_len);
						var u = this.data.subarray(luma_len, luma_len + chroma_len);
						var v = this.data.subarray(luma_len + chroma_len, luma_len + 2 * chroma_len);
						this.data = yuv420_to_rgba(y, u, v, this.width);
						break;
					case Bitmap.YUVA420P:
						var luma_len = (this.width * this.height);
						var chroma_len = (this.chroma_width() * this.chroma_height());
						var y = this.data.subarray(0, luma_len);
						var u = this.data.subarray(luma_len, luma_len + chroma_len);
						var v = this.data.subarray(luma_len + chroma_len, luma_len + 2 * chroma_len);
						let a = this.data.subarray(luma_len + 2 * chroma_len, 2 * luma_len + 2 * chroma_len);
						this.data = yuv420_to_rgba(y, u, v, this.width);
						for (let i = 0; i < this.data.length; i += 4) 
							this.data[i + 3] = a[(i / 4) | 0];
						break;
				}
				this.format = Bitmap.RGBA;
			}
			chroma_width() {
				return ((this.width + 1) / 2) | 0;
			}
			chroma_height() {
				return ((this.height + 1) / 2) | 0;
			}
		}
		Bitmap.RGBA = 1;
		Bitmap.YUV420P = 2;
		Bitmap.YUVA420P = 3;

		module.exports = Bitmap;
	},
	"./src/render/canvas2d.js": function(module, exports, __webpack_require__) {
		function cloneObject(src) {
			return JSON.parse(JSON.stringify(src));
		}
		function checkImageColorTransform(colorTransform) {
			return (colorTransform[0] !== 1) || (colorTransform[1] !== 1) || (colorTransform[2] !== 1) || colorTransform[4] || colorTransform[5] || colorTransform[6];
		}
		function generateColorTransform(color, data) {
			return [
				Math.max(0, Math.min((color[0] * data[0]) + data[4], 255)) | 0, // Red
				Math.max(0, Math.min((color[1] * data[1]) + data[5], 255)) | 0, // Green
				Math.max(0, Math.min((color[2] * data[2]) + data[6], 255)) | 0, // Blue
				Math.max(0, Math.min((color[3] * 255 * data[3]) + data[7], 255)) / 255 // Alpha
			];		
		}
		function linearGradientXY(m) {
			var x0 = -16384 * m[0] - 16384 * m[2] + m[4];
			var x1 =  16384 * m[0] - 16384 * m[2] + m[4];
			var x2 = -16384 * m[0] + 16384 * m[2] + m[4];
			var y0 = -16384 * m[1] - 16384 * m[3] + m[5];
			var y1 =  16384 * m[1] - 16384 * m[3] + m[5];
			var y2 = -16384 * m[1] + 16384 * m[3] + m[5];
			var vx2 = x2 - x0;
			var vy2 = y2 - y0;
			var r1 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
			vx2 /= r1;
			vy2 /= r1;
			var r2 = (x1 - x0) * vx2 + (y1 - y0) * vy2;
			return [x0 + r2 * vx2, y0 + r2 * vy2, x1, y1];
		}
		class RenderCanvas2dShapeInterval {
			constructor(renderer, interval) {
				this.renderer = renderer;
				this.shapeIntervalData = interval;
			}
		}
		class RenderCanvas2dTexture {
			constructor(renderer) {
				this.renderer = renderer;
				this.width = 0;
				this.height = 0;
				this.texture = null;
				this.ctx = null;
				this.isColorTransformCache = false;
				this.c = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
			}
			_initColorTransformCache() {
				this.tmpCanvas = document.createElement("canvas");
				this.tmpCtx = this.tmpCanvas.getContext("2d");
				this.isColorTransformCache = true;
			}
			getTexture(color) {
				if (color && checkImageColorTransform(color)) {
					if (!this.isColorTransformCache) this._initColorTransformCache();
					if (this.c[0] != color[0] || this.c[1] != color[1] || this.c[2] != color[2] || this.c[3] != color[3] || this.c[4] != color[4] || this.c[5] != color[5] || this.c[6] != color[6] || this.c[7] != color[7]) {
						var width = this.texture.width;
						var height = this.texture.height;
						this.tmpCanvas.width = width;
						this.tmpCanvas.height = height;
						this.tmpCtx.drawImage(this.texture, 0, 0);
						var imgData = this.tmpCtx.getImageData(0, 0, width, height);
						var pxData = imgData.data;
						var idx = 0;
						var RedMultiTerm = color[0];
						var GreenMultiTerm = color[1];
						var BlueMultiTerm = color[2];
						var AlphaMultiTerm = color[3];
						var RedAddTerm = color[4];
						var GreenAddTerm = color[5];
						var BlueAddTerm = color[6];
						var AlphaAddTerm = color[7];
						var length = width * height;
						if (length > 0) {
							while (length--) {
								var R = pxData[idx++];
								var G = pxData[idx++];
								var B = pxData[idx++];
								var A = pxData[idx++];
								pxData[idx - 4] = Math.max(0, Math.min((R * RedMultiTerm) + RedAddTerm, 255)) | 0;
								pxData[idx - 3] = Math.max(0, Math.min((G * GreenMultiTerm) + GreenAddTerm, 255)) | 0;
								pxData[idx - 2] = Math.max(0, Math.min((B * BlueMultiTerm) + BlueAddTerm, 255)) | 0;
								pxData[idx - 1] = Math.max(0, Math.min((A * AlphaMultiTerm) + AlphaAddTerm, 255));
							}
						}
						this.tmpCtx.putImageData(imgData, 0, 0);
						this.c[0] = color[0];
						this.c[1] = color[1];
						this.c[2] = color[2];
						this.c[3] = color[3];
						this.c[4] = color[4];
						this.c[5] = color[5];
						this.c[6] = color[6];
						this.c[7] = color[7];
					}
					return this.tmpCanvas;
				} else {
					return this.texture;
				}
			}
			emptyImage(width, height) {
				var imageData = new ImageData(width, height);
				this.setImageData(imageData);
			}
			setImageData(image) {
				this.width = image.width;
				this.height = image.height;
				this.c = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
				this.isColorTransformCache = false;
				if (!this.texture) {
					this.texture = document.createElement("canvas");
					this.ctx = this.texture.getContext("2d");
				}
				this.texture.width = image.width;
				this.texture.height = image.height;
				this.ctx.putImageData(image, 0, 0);
			}
			setImage(image) {
				var imageData = new ImageData(image.width, image.height);
				imageData.data.set(image.data, 0);
				this.setImageData(imageData);
			}
			delete() {}
		}
		function sameBlendMode(first, second) {
			return first == second;
		}
		function twipsToNumber(twips) {
			var n = ((twips || 0) / 20);
			return +n.toFixed(2);
		}
		function twipsToMatrix(matrix) {
			return [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4] / 20, matrix[5] / 20];
		}
		function twipsToBitmapMatrix(matrix) {
			return [matrix[0] / 20, matrix[1] / 20, matrix[2] / 20, matrix[3] / 20, matrix[4] / 20, matrix[5] / 20];
		}
		function executePathCmd(ctx, cmd) {
			for (let i = 0; i < cmd.length; i++) {
				switch (cmd[i]) {
					case 0:
						ctx.moveTo(cmd[i + 1] / 20, cmd[i + 2] / 20);
						i += 2;
						break;
					case 1:
						ctx.quadraticCurveTo(cmd[i + 1] / 20, cmd[i + 2] / 20, cmd[i + 3] / 20, cmd[i + 4] / 20);
						i += 4;
						break;
					case 2:
						ctx.lineTo(cmd[i + 1] / 20, cmd[i + 2] / 20);
						i += 2;
						break;
				}
			}
		}

		class RenderCanvas2d {
			constructor() {
				this.canvas = document.createElement("canvas");
				this.ctx = this.canvas.getContext("2d");
				this.quality = "high";
				this.width = 640;
				this.height = 480;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.maskState = 0;
				this.blendModes = ["normal"];
			}
			setQuality(quality) {
				this.quality = quality;
			}
			submitFrame(clear, commands, _cache_entries) {
				this.ctx.setTransform(1, 0, 0, 1, 0, 0);
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				var css = "rgba(" + [clear[0], clear[1], clear[2], 1] + ")";
				this.ctx.fillStyle = css;
				this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
				commands.execute(this);
			}
			isAllowImageColorTransform() {
				return (this.quality == "high");
			}
			buildCmd2dPath(cmd) {
				var result = [];
				for (let i = 0; i < cmd.length; i++) {
					var h = cmd[i];
					if (h) result.push(...h);
				}
				return new Int32Array(result);
			}
			shapeToInterval(shapeCache, library) {
				// 0 fill
				// 1 stroke
				// 0 color
				// 1 gradient
				// 2 bitmap
				var result = [];
				for (let i = 0; i < shapeCache.length; i++) {
					const si = shapeCache[i];
					result.push(this.shapeToCanvas(si, library));
				}
				return new RenderCanvas2dShapeInterval(this, result);
			}
			shapeToCanvas(shape, library) {
				var isStroke = (shape.type == 1);
				var width = twipsToNumber(shape.width);
				var fillInfo = shape.fill;
				if (!fillInfo) return;
				var cmdResult = this.buildCmd2dPath(shape.path2d);
				if (fillInfo.type == 0) {
					return {
						type: 0,
						cmd: cmdResult,
						color: fillInfo.color.slice(0),
						isStroke,
						width
					};
				} else if (fillInfo.type == 1) {
					return {
						type: 1,
						cmd: cmdResult,
						isRadial: fillInfo.isRadial,
						focal: fillInfo.focal,
						matrix: fillInfo.matrix,
						records: cloneObject(fillInfo.records),
						isStroke,
						width
					};
				} else if (fillInfo.type == 2) {
					var id = fillInfo.id;
					var bitmap = library.getBitmap(id);
					return {
						type: 2,
						cmd: cmdResult,
						matrix: fillInfo.matrix,
						texture: bitmap.getTexture(this),
						isSmoothed: fillInfo.isSmoothed,
						isRepeating: fillInfo.isRepeating,
						isStroke,
						width
					};
				}
			}
			applyBlendMode(blendMode) {
				var mode = 'source-over';
				switch(blendMode) {
					case "multiply":
						mode = 'multiply';
						break;
					case "screen":
						mode = 'screen';
						break;
					case "lighten":
						mode = 'lighten';
						break;
					case "darken":
						mode = 'darken';
						break;
					case "difference":
					case "subtract":
						mode = 'difference';
						break;
					case "add":
						mode = 'lighter';
						break;
					case "overlay":
						mode = 'overlay';
						break;
					case "hardlight":
						mode = 'hard-light';
						break;
				}
				this.ctx.globalCompositeOperation = mode;
			}
			pushBlendMode(blendMode) {
				if (!sameBlendMode(this.blendModes[this.blendModes.length - 1], blendMode)) this.applyBlendMode(blendMode);
				this.blendModes.push(blendMode);
			}
			popBlendMode() {
				let old = this.blendModes.pop();
				let current = this.blendModes[this.blendModes.length - 1] || "normal";
				if (!sameBlendMode(old, current)) this.applyBlendMode(current);
			}
			// RenderBackend
			destroy() {
			}
			is_offscreen_supported() {
				return false;
			}
			debugInfo() {
				return "Renderer: Canvas";
			} 
			get name() {
				return "canvas";
			}
			resize(w, h) {
				this.width = w;
				this.height = h;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
			}
			registerShape(shapes, library) {
				return this.shapeToInterval(shapes, library);
			}
			createEmptyTexture(width, height) {
				var tex = new RenderCanvas2dTexture(this);
				tex.emptyImage(width, height);
				return tex;
			}
			registerBitmap(image) {
				image.toRGBA();
				var tex = new RenderCanvas2dTexture(this);
				tex.setImage(image);
				return tex;
			}
			updateTexture(handle, image) {
				if (handle) {
					image.toRGBA();
					handle.setImage(image);
				}
			}

			// CommandHandler
			renderBitmap(texture, transform, isSmoothed) {
				var matrixTransform = transform.matrix;
				var colorTransform = transform.colorTransform;
				var tMatrix = twipsToMatrix(matrixTransform);
				var isA = this.isAllowImageColorTransform();
				this.ctx.imageSmoothingEnabled = (isSmoothed || false);
				if (texture) {
					this.ctx.setTransform(...tMatrix);
					if ((!isA) || (!checkImageColorTransform(colorTransform))) this.ctx.globalAlpha = Math.max(0, Math.min((255 * colorTransform[3]) + colorTransform[7], 255)) / 255;
					this.ctx.drawImage(texture.getTexture(isA ? colorTransform : null), 0, 0);
					this.ctx.globalAlpha = 1;
				}
			}
			renderShape(shapeInterval, transform) {
				var matrixTransform = transform.matrix;
				var colorTransform = transform.colorTransform;
				var tMatrix = twipsToMatrix(matrixTransform);
				var shapeRecords = shapeInterval.shapeIntervalData;
				var isA = this.isAllowImageColorTransform();
				for (let i = 0; i < shapeRecords.length; i++) {
					const si = shapeRecords[i];
					if (!si) return;
					var isStroke = si.isStroke;
					var cmd = si.cmd;
					var width = si.width || 0;
					if (this.maskState == 1) {
						this.ctx.setTransform(...tMatrix);
						executePathCmd(this.ctx, cmd);
					} else if (this.maskState == 2) {
						// Canvas backend doesn't have to do anything to clear masks.
					} else {
						if (si.type == 0) {
							var color = si.color;
							this.ctx.setTransform(...tMatrix);
							this.ctx.beginPath();
							executePathCmd(this.ctx, cmd);
							var css = 'rgba(' + generateColorTransform(color, colorTransform).join(',') + ')';
							if (isStroke) {
								this.ctx.lineWidth = width;
								this.ctx.lineCap = "round";
								this.ctx.lineJoin = "round";
								this.ctx.strokeStyle = css;
								this.ctx.stroke();
							} else {
								this.ctx.fillStyle = css;
								this.ctx.fill();
							}
						} else if (si.type == 1) {
							var isRadial = si.isRadial;
							this.ctx.setTransform(...tMatrix);
							this.ctx.beginPath();
							executePathCmd(this.ctx, cmd);
							var css;
							if (isRadial) {
								css = this.ctx.createRadialGradient((16384 * Math.min(Math.max(si.focal, -0.98), 0.98)), 0, 0, 0, 0, 16384);
							} else {
								var xy = linearGradientXY(si.matrix);
								css = this.ctx.createLinearGradient(twipsToNumber(xy[0] || 0), twipsToNumber(xy[1] || 0), twipsToNumber(xy[2] || 0), twipsToNumber(xy[3] || 0));
							}
							for (let j = 0; j < si.records.length; j++) {
								const rc = si.records[j];
								css.addColorStop(rc[1], 'rgba(' + generateColorTransform(rc[0], colorTransform).join(',') + ')');
							}
							if (isRadial) {
								this.ctx.save();
								this.ctx.transform(...twipsToBitmapMatrix(si.matrix));
							}
							if (isStroke) {
								this.ctx.lineWidth = width;
								this.ctx.lineCap = "round";
								this.ctx.lineJoin = "round";
								this.ctx.strokeStyle = css;
								this.ctx.stroke();
							} else {
								this.ctx.fillStyle = css;
								this.ctx.fill();
							}
							if (isRadial) {
								this.ctx.restore();
							}
						} else if (si.type == 2) {
							var bMatrix = twipsToBitmapMatrix(si.matrix);
							var repeat = si.isRepeating ? "repeat" : "no-repeat";
							var texture = si.texture;
							if (texture) {
								this.ctx.setTransform(...tMatrix);
								this.ctx.beginPath();
								executePathCmd(this.ctx, cmd);
								this.ctx.save();
								this.ctx.transform(...bMatrix);
								this.ctx.imageSmoothingEnabled = (si.isSmoothed || false);
								var image = texture.getTexture(isA ? colorTransform : null);
								if ((!isA) || (!checkImageColorTransform(colorTransform))) this.ctx.globalAlpha = Math.max(0, Math.min((255 * colorTransform[3]) + colorTransform[7], 255)) / 255;
								var p = this.ctx.createPattern(image, repeat);
								this.ctx.fillStyle = p;
								this.ctx.fill();
								this.ctx.globalAlpha = 1;
								this.ctx.restore();
							}
						}
					}
				}
			}
			drawRect(color, matrix) {
				var tMatrix = twipsToMatrix(matrix);
				if (this.maskState == 1) {
					this.ctx.setTransform(...tMatrix);
					this.ctx.beginPath();
					this.ctx.moveTo(0, 0);
					this.ctx.lineTo(1, 0);
					this.ctx.lineTo(1, 1);
					this.ctx.lineTo(0, 1);
					this.ctx.lineTo(0, 0);
				} else if (this.maskState == 0) {
					this.ctx.setTransform(...tMatrix);
					var css = "rgba(" + [color[0], color[1], color[2], color[3]] + ")";
					this.ctx.fillStyle = css;
					this.ctx.fillRect(0, 0, 1, 1);
				}
			}
			pushMask() {
				// Save the current mask layer so that it can be restored when the mask is popped.
				if (this.maskState == 0) {
					this.ctx.beginPath();
					this.ctx.save();
					this.maskState = 1;
				}
			}
			activateMask() {
				this.ctx.clip();
				this.maskState = 0;
			}
			deactivateMask() {
				if (this.maskState == 0) {
					this.maskState = 2;
				}
			}
			popMask() {
				if (this.maskState == 2) {
					// Pop the previous clipping state.
					this.ctx.restore();
					this.maskState = 0;
				}
			}
			blend(commands, blendMode) {
				this.pushBlendMode(blendMode);
				commands.execute(this);
				this.popBlendMode();
			}
		}
		module.exports = RenderCanvas2d;
	},
	"./src/render/commands.js": function(module, exports, __webpack_require__) {
		class CommandList {
			constructor() {
				this.commandLists = [];
				this.maskersInProgress = 0;
			}
			execute(renderer) {
				for (let i = 0; i < this.commandLists.length; i++) {
					const tsd = this.commandLists[i];
					switch (tsd[0]) {
						case "render_bitmap":
							renderer.renderBitmap(tsd[1], tsd[2], tsd[3]);
							break;
						case "render_shape":
							renderer.renderShape(tsd[1], tsd[2]);
							break;
						case "draw_rect":
							renderer.drawRect(tsd[1], tsd[2]);
							break;
						case "push_mask":
							renderer.pushMask();
							break;
						case "pop_mask":
							renderer.popMask();
							break;
						case "activate_mask":
							renderer.activateMask();
							break;
						case "deactivate_mask":
							renderer.deactivateMask();
							break;
						case "blend":
							renderer.blend(tsd[1], tsd[2]);
							break;
					}
				}
			}
			drawingMask() {
				return this.maskersInProgress > 0;
			}
			clear() {
				this.commandLists = [];
			}
			copy() {
				var clone = new CommandList();
				clone.commandLists = this.commandLists.slice(0);
				return clone;
			}
			replace(commands) {
				this.commandLists = commands.commandLists.slice(0);
			}
			renderBitmap(bitmap, transfrom, isSmoothed) {
				if (this.maskersInProgress <= 1)
					this.commandLists.push(["render_bitmap", bitmap, transfrom.clone(), isSmoothed]);
			}
			renderShape(shape, transfrom) {
				if (this.maskersInProgress <= 1)
					this.commandLists.push([
						"render_shape",
						shape,
						transfrom.clone()
					]);
			}
			drawRect(color, matrix) {
				this.commandLists.push(["draw_rect", color.slice(0), matrix.slice(0)]);
			}
			pushMask() {
				if (this.maskersInProgress == 0) this.commandLists.push(["push_mask"]);
				this.maskersInProgress += 1;
			}
			activateMask() {
				this.maskersInProgress -= 1;
				if (this.maskersInProgress == 0) this.commandLists.push(["activate_mask"]);
			}
			deactivateMask() {
				if (this.maskersInProgress == 0)
					this.commandLists.push(["deactivate_mask"]);
				this.maskersInProgress += 1;
			}
			popMask() {
				this.maskersInProgress -= 1;
				if (this.maskersInProgress == 0) this.commandLists.push(["pop_mask"]);
			}
			blend(commands, blendMode) {
				this.commandLists.push(["blend", commands, blendMode]);
			}
		}
		module.exports = CommandList;
	},
	"./src/render/filters.js": function(module, exports, __webpack_require__) {
		class Filter {
			constructor() {
			}
			static from(data) {
				var type = data.filterId;
				var filter = data.filter;
				switch(type) {
					case 0:
						return DropShadowFilter.from(filter);
					case 1:
						return BlurFilter.from(filter);
					case 2:
						return GlowFilter.from(filter);
					case 3:
						return BevelFilter.from(filter);
					case 6:
						return ColorMatrixFilter.from(filter);
					default:
						console.log(type, filter);
						return null;
				}
			}
			scale(_x, _y) {
			}
			impotent() {
				return false;
			}
			calculateDestRect(sourceRect) {
				return {
					xMin: sourceRect.xMin,
					xMax: sourceRect.xMax,
					yMin: sourceRect.yMin,
					yMax: sourceRect.yMax
				}
			}
		}
		const PASS_SCALES = [1.0, 2.1, 2.7, 3.1, 3.5, 3.8, 4.0, 4.2, 4.4, 4.6, 5.0, 6.0, 6.0, 7.0, 7.0];

		class BlurFilter extends Filter {
			constructor(blurX, blurY, passes) {
				super();
				this.blurX = blurX;
				this.blurY = blurY;
				this.passes = passes;
			}
			get type() {
				return "blur";
			}
			static from(filter) {
				return new BlurFilter(filter.blurX, filter.blurY, (filter.flags & (0b11111 << 3)) >> 3);
			}
			clone() {
				return new BlurFilter(this.blurX, this.blurY, this.passes);
			}
			scale(x, y) {
				this.blurX *= x;
				this.blurY *= y;
			}
			impotent() {
				return (this.passes == 0) || (this.blurX <= 1 && this.blurY <= 1);
			}
			calculateDestRect(sourceRect) {
				let scale = PASS_SCALES[Math.max(Math.min(this.passes, 15), 1) - 1];
				var mx = this.blurX * scale;
				var my = this.blurY * scale;
				var x = (Math.max(mx, 0) * 10) | 0;
				var y = (Math.max(my, 0) * 10) | 0;
				return {
					xMin: sourceRect.xMin - x,
					xMax: sourceRect.xMax + x,
					yMin: sourceRect.yMin - y,
					yMax: sourceRect.yMax + y
				}
			}
		}
		class GlowFilter extends Filter {
			constructor(blurX, blurY, color, strength, is_inner, is_knockout, composite_source, num_passes) {
				super();
				this.blurX = blurX;
				this.blurY = blurY;
				this.color = color;
				this.strength = strength;
				this.is_inner = is_inner;
				this.is_knockout = is_knockout;
				this.composite_source = composite_source;
				this.passes = num_passes;
			}
			get type() {
				return "glow";
			}
			static from(filter) {
				var is_inner = filter.flags & (1 << 7);
				var is_knockout = filter.flags & (1 << 6);
				var composite_source = filter.flags & (1 << 5);
				var num_passes = filter.flags & 0b11111;
				return new GlowFilter(filter.blurX, filter.blurY, filter.color.slice(0), filter.strength, is_inner, is_knockout, composite_source, num_passes);
			}
			clone() {
				return new GlowFilter(this.blurX, this.blurY, this.color.slice(0), this.strength, this.is_inner, this.is_knockout, this.composite_source, this.passes);
			}
			scale(x, y) {
				this.blurX *= x;
				this.blurY *= y;
			}
			impotent() {
				return false;
			}
			innerBlurFilter() {
				return new BlurFilter(this.blurX, this.blurY, this.passes);
			}
			calculateDestRect(sourceRect) {
				return this.innerBlurFilter().calculateDestRect(sourceRect);
			}
		}
		class DropShadowFilter extends Filter {
			constructor(blurX, blurY, color, angle, distance, strength, is_inner, is_knockout, composite_source, num_passes) {
				super();
				this.color = color;
				this.blurX = blurX;
				this.blurY = blurY;
				this.angle = angle;
				this.distance = distance;
				this.strength = strength;
				this.is_inner = is_inner;
				this.is_knockout = is_knockout;
				this.composite_source = composite_source;
				this.passes = num_passes;
			}
			get type() {
				return "drop_shadow";
			}
			static from(filter) {
				var is_inner = filter.flags & (1 << 7);
				var is_knockout = filter.flags & (1 << 6);
				var composite_source = filter.flags & (1 << 5);
				var num_passes = filter.flags & 0b11111;
				return new DropShadowFilter(filter.blurX, filter.blurY, filter.color.slice(0), filter.angle, filter.distance, filter.strength, is_inner, is_knockout, composite_source, num_passes);
			}
			clone() {
				return new DropShadowFilter(this.blurX, this.blurY, this.color.slice(0), this.angle, this.distance, this.strength, this.is_inner, this.is_knockout, this.composite_source, this.passes);
			}
			scale(x, y) {
				this.blurX *= x;
				this.blurY *= y;
				this.distance *= y;
			}
			impotent() {
				return false;
			}
			innerGlowFilter() {
				return new GlowFilter(this.blurX, this.blurY, this.color.slice(0), this.strength, this.is_inner, this.is_knockout, this.composite_source, this.passes);
			}
			calculateDestRect(sourceRect) {
				var result = this.innerGlowFilter().calculateDestRect(sourceRect);
				let distance = this.distance;
				let angle = this.angle;
				var x = ((Math.cos(angle) * distance) * 20) | 0;
				var y = ((Math.sin(angle) * distance) * 20) | 0;
				if (x < 0) {
					result.xMin += x;
				} else {
					result.xMax += x;
				}
				if (y < 0) {
					result.yMin += y;
				} else {
					result.yMax += y;
				}
				return result;
			}
		}
		class BevelFilter extends Filter {
			constructor(blurX, blurY, num_passes, angle, distance, strength, shadow_color, highlight_color, is_inner, is_knockout, is_on_top) {
				super();
				this.blurX = blurX;
				this.blurY = blurY;
				this.passes = num_passes;
				this.angle = angle;
				this.distance = distance;
				this.strength = strength;
				this.shadow_color = shadow_color;
				this.highlight_color = highlight_color;
				this.is_inner = is_inner;
				this.is_knockout = is_knockout;
				this.is_on_top = is_on_top;
			}
			get type() {
				return "bevel";
			}
			static from(filter) {
				var is_inner = filter.flags & (1 << 7);
				var is_knockout = filter.flags & (1 << 6);
				var composite_source = filter.flags & (1 << 5);
				var on_top = filter.flags & (1 << 4);
				var num_passes = filter.flags & 0b1111;
				return new BevelFilter(filter.blurX, filter.blurY, num_passes, filter.angle, filter.distance, filter.strength, filter.shadowColor, filter.highlightColor, is_inner, is_knockout, on_top);
			}
			scale(x, y) {
				this.blurX *= x;
				this.blurY *= y;
				this.distance *= y;
			}
			impotent() {
				return false;
			}
			clone() {
				return new BevelFilter(this.blurX, this.blurY, this.passes, this.angle, this.distance, this.strength, this.shadow_color.slice(0), this.highlight_color.slice(0), this.is_inner, this.is_knockout, this.is_on_top);
			}
			innerBlurFilter() {
				return new BlurFilter(this.blurX, this.blurY, this.passes);
			}
			calculateDestRect(sourceRect) {
				var result = this.innerBlurFilter().calculateDestRect(sourceRect);
				let distance = this.distance;
				let angle = this.angle;
				var x = ((Math.cos(angle) * distance) * 20) | 0;
				var y = ((Math.sin(angle) * distance) * 20) | 0;
				if (x < 0) {
					result.xMin += x;
				} else {
					result.xMax += x;
				}
				if (y < 0) {
					result.yMin += y;
				} else {
					result.yMax += y;
				}
				return result;
			}
		}
		class ColorMatrixFilter extends Filter {
			constructor(matrix) {
				super();
				this.matrix = matrix;
			}
			get type() {
				return "color_matrix";
			}
			static from(filter) {
				return new ColorMatrixFilter(filter.slice(0));
			}
			clone() {
				return new ColorMatrixFilter(this.matrix.slice(0));
			}
		}
		module.exports = Filter;
	},
	"./src/render/matrix_utils.js": function(module, exports, __webpack_require__) {
		function multiplicationMatrix(a, b) {
			return [
				a[0] * b[0] + a[2] * b[1], // ScaleX
				a[1] * b[0] + a[3] * b[1], // RotateSkew0
				a[0] * b[2] + a[2] * b[3], // RotateSkew1
				a[1] * b[2] + a[3] * b[3], // ScaleY
				a[0] * b[4] + a[2] * b[5] + a[4], // TranslateX
				a[1] * b[4] + a[3] * b[5] + a[5] // TranslateY
			];
		}
		function invertMatrix(mat) {
			var det = mat[0] * mat[3] - mat[2] * mat[1];
			var tx = (mat[3] * mat[4] - mat[2] * mat[5]) / -det;
			var ty = (mat[1] * mat[4] - mat[0] * mat[5]) / det;
			var a = mat[3] / det;
			var b = mat[1] / -det;
			var c = mat[2] / -det;
			var d = mat[0] / det;
			return [a, b, c, d, tx, ty];
		}
		function generateMatrix(point, data) {
			return [(point[0] * data[0] + point[1] * data[2] + data[4]), point[0] * data[1] + point[1] * data[3] + data[5]];
		}
		module.exports = {
			generateMatrix,
			multiplicationMatrix,
			invertMatrix
		}
	},
	"./src/render/utils.js": function(module, exports, __webpack_require__) {
		const ZLib = __webpack_require__("./src/utils/ZLib.js");
		const AT_JPG_Decoder = __webpack_require__("./lib/at-jpg-decoder.js");
		const Bitmap = __webpack_require__("./src/render/bitmap.js");

		/// Determines the format of the image data in `data` from a DefineBitsJPEG2/3 tag.
		function determineJpegTagFormat(data) {
			if ((data[0] == 0xff) && (data[1] == 0xd8)) {
				return "jpeg";
			} else if ((data[0] == 0xff) && (data[1] == 0xd9) && (data[2] == 0xff) && (data[3] == 0xd8)) { // erroneous header in SWF
				return "jpeg";
			} else if ((data[0] == 0x89) && (data[1] == 0x50) && (data[2] == 0x4e) && (data[3] == 0x47) && (data[4] == 0x0d) && (data[5] == 0x0a) && (data[6] == 0x1a) && (data[7] == 0x0a)) {
				return "png";
			} else if ((data[0] == 0x47) && (data[1] == 0x49) && (data[2] == 0x46) && (data[3] == 0x38) && (data[4] == 0x39) && (data[5] == 0x61)) {
				return "gif";
			} else {
				return "unknown";
			}
		}

		/// Decodes bitmap data from a DefineBitsJPEG2/3 tag.
		/// The data is returned with pre-multiplied alpha.
		function decodeDefineBitsJpeg(data, alphaData) {
			var format = determineJpegTagFormat(data);
			var result;
			try {
				switch(format) {
					case "jpeg":
						result = decodeJpeg(data, alphaData);
						break;
					case "png":
					case "gif":
						console.log("TODO", format, data);
						break;
				}
			} catch(e) {
				console.log(e);
			}
			return result;
		}
		
		/// Glues the JPEG encoding tables from a JPEGTables SWF tag to the JPEG data
		/// in a DefineBits tag, producing complete JPEG data suitable for a decoder.
		function glueTablesToJpeg(jpedData, jpedTable) {
			if (jpedTable) {
				if ((jpedTable.length >= 2)) {
					var len = jpedTable.length - 2;
					var full_jpeg = new Uint8Array(jpedData.length + jpedTable.length);
					full_jpeg.set(jpedTable.subarray(0, len), 0);
					full_jpeg.set(jpedData.subarray(2), len);
					return full_jpeg;	
				}
			}

			// No JPEG tables or not enough data; return JPEG data as is
			return jpedData;
			
		}

		/// Removes potential invalid JPEG data from SWF DefineBitsJPEG tags.
		/// These bytes need to be removed for the JPEG to decode properly.
		function removeInvalidJpegData(JPEGData) {
			var i = 0;
			var idx = 0;
			var str = "";
			var length = JPEGData.length;
			if (JPEGData[0] === 0xFF && JPEGData[1] === 0xD9 && JPEGData[2] === 0xFF && JPEGData[3] === 0xD8) {
				for (i = 4; i < length; i++) {
					str += String.fromCharCode(JPEGData[i]);
				}
			} else if (JPEGData[i++] === 0xFF && JPEGData[i++] === 0xD8) {
				for (idx = 0; idx < i; idx++) {
					str += String.fromCharCode(JPEGData[idx]);
				}
				while (i < length) {
					if (JPEGData[i] === 0xFF) {
						if (JPEGData[i + 1] === 0xD9 && JPEGData[i + 2] === 0xFF && JPEGData[i + 3] === 0xD8) {
							i += 4;
							for (idx = i; idx < length; idx++) {
								str += String.fromCharCode(JPEGData[idx]);
							}
							break;
						} else if (JPEGData[i + 1] === 0xDA) {
							for (idx = i; idx < length; idx++) {
								str += String.fromCharCode(JPEGData[idx]);
							}
							break;
						} else {
							var segmentLength = (JPEGData[i + 2] << 8) + JPEGData[i + 3] + i + 2;
							for (idx = i; idx < segmentLength; idx++) {
								str += String.fromCharCode(JPEGData[idx]);
							}
							i += segmentLength - i;
						}
					}
				}
			} else {
				for (i = 0; i < length; i++) {
					str += String.fromCharCode(JPEGData[i]);
				}
			}
			var dfa = new Uint8Array(str.length);
			for (let i = 0; i < str.length; i++) {
				dfa[i] = str.charCodeAt(i);
			}
			return dfa;
		}

		function decodeJpeg(jpedData, alphaData) {
			var fi = removeInvalidJpegData(jpedData);
			var res = AT_JPG_Decoder.decode(fi);
			var width = res.width;
			var height = res.height;
			var pxData = res.data;
			if (alphaData) {
				var len = width * height;
				var dat = ZLib.decompress(alphaData, len, 0);
				var adata = dat;
				var pxIdx = 3;
				for (var i = 0; i < len; i++) {
					pxData[pxIdx] = adata[i];
					pxIdx += 4;
				}
			}
			return new Bitmap(res.width, res.height, "rgba", pxData);
		}
		
		function decodeDefineBitsLossless(bitmapTag) {
			var isAlpha = (bitmapTag.version == 2);
			var width = bitmapTag.width;
			var height = bitmapTag.height;
			var format = bitmapTag.format;
			var colorTableSize = 0;
			if (format === 3) 
				colorTableSize = bitmapTag.numColors + 1;
			var sizeZLib = 5;
			var decoded_data = ZLib.decompress(bitmapTag.data, ((width * height) * sizeZLib), 0);
			var out_data = new Uint8Array((width * height) * 4);
			var idx = 0;
			var pxIdx = 0;
			var x = width;
			var y = height;
			if (format === 5 && !isAlpha) {
				idx = 0;
				pxIdx = 0;
				for (y = height; y--;) {
					for (x = width; x--;) {
						idx++;
						out_data[pxIdx++] = decoded_data[idx++];
						out_data[pxIdx++] = decoded_data[idx++];
						out_data[pxIdx++] = decoded_data[idx++];
						out_data[pxIdx++] = 255;
					}
				}
			} else {
				var bpp = (isAlpha) ? 4 : 3;
				var cmIdx = colorTableSize * bpp;
				var pad = 0;
				if (colorTableSize) 
					pad = ((width + 3) & ~3) - width;
				for (y = height; y--;) {
					for (x = width; x--;) {
						idx = (colorTableSize) ? decoded_data[cmIdx++] * bpp : cmIdx++ * bpp;
						if (!isAlpha) {
							out_data[pxIdx++] = decoded_data[idx++];
							out_data[pxIdx++] = decoded_data[idx++];
							out_data[pxIdx++] = decoded_data[idx++];
							idx++;
							out_data[pxIdx++] = 255;
						} else {
							var alpha = (format === 3) ? decoded_data[idx + 3] : decoded_data[idx++];
							out_data[pxIdx++] = decoded_data[idx++];
							out_data[pxIdx++] = decoded_data[idx++];
							out_data[pxIdx++] = decoded_data[idx++];
							out_data[pxIdx++] = alpha;
							if (format === 3) {
								idx++;
							}
						}
					}
					cmIdx += pad;
				}
			}
			return new Bitmap(width, height, Bitmap.RGBA, out_data);
		}

		module.exports = {
			decodeDefineBitsJpeg,
			glueTablesToJpeg,
			decodeDefineBitsLossless
		}
	},
	"./src/render/shape_utils.js": function(module, exports, __webpack_require__) {
		var gradientSpread = function(code) {
			switch (code) {
				case 0: // Pad
				// Per SWF19 p. 136, SpreadMode 3 is reserved.
				// Flash treats it as pad mode.
				case 3:
					return "pad";
				case 1: // Reflect
					return "reflect";
				case 2: // Repeat
					return "repeat";
				default:
					return null;
			}
		}
		var gradientInterpolation = function(code) {
			switch (code) {
				case 0: // Rgb
				// Per SWF19 p. 136, InterpolationMode 2 and 3 are reserved.
				// Flash treats them as normal RGB mode interpolation.
				case 2:
				case 3:
					return "rgb";
				case 1: // LinearRgb
					return "linearRgb";
				default:
					return null;
			}
		}
		function shapeToRendererInfo(shapes) {
			if (Array.isArray(shapes[0])) {
				return [{
					type: 0,
					path2d: shapes,
					fill: {
						type: 0,
						color: [255, 255, 255, 1]
					}
				}];
			}
			var result = [];
			for (let i = 0; i < shapes.length; i++) {
				const s = shapes[i];
				var obj = s.obj;
				var cmd = s.cmd;
				result.push(lagObjToInfo(obj, cmd));
			}
			return result;
		}
		function fixedStrokeCMD(cmds) {
			var result = [];
			var posX = 0, posY = 0;
			var isM = true;
			for (var i = 0; i < cmds.length; i++) {
				var cmd = cmds[i];
				if (cmd[0] == 0) {
					if (isM || !((posX == cmd[1]) && (posY == cmd[2]))) {
						posX = cmd[1], posY = cmd[2];
						result.push([0, posX, posY]);	
						isM = false;
					}
				} else if (cmd[0] == 1) {
					result.push([1, cmd[1], cmd[2], cmd[3], cmd[4]]);
					posX = cmd[3], posY = cmd[4];
				} else if (cmd[0] == 2) {
					result.push([2, cmd[1], cmd[2]]);
					posX = cmd[1], posY = cmd[2];
				}
			}
			return {
				isClosed: false,
				result
			};
		}
		function lagObjToInfo(obj, cmd) {
			var isLine = ("width" in obj);
			if (isLine) {
				return {
					type: 1,
					width: obj.width,
					path2d: cmd,
					fill: lineToInfo(obj),
				};
			} else {
				return {
					type: 0,
					path2d: cmd,
					fill: fillToInfo(obj),
				};
			}
		}
		function fillToInfo(fill) {
			var type = fill.type;
			switch (type) {
				case 0:
					var color = fill.color;
					return {
						type: 0,
						color: color
					};
				case 0x10:
				case 0x12:
				case 0x13:
					var gradient = fill.gradient;
					var gradientMatrix = gradient.matrix;
					var isRadial = (type !== 16);
					var focal = 0;
					if (type == 19) {
						focal = fill.focalPoint;
					}
					var records = gradient.records;
					var css = [];
					for (var rIdx = 0; rIdx < records.length; rIdx++) {
						var record = records[rIdx];
						var color = record.color;
						var ratio = record.ratio;
						css.push([color, ratio]);
					}
					var spreadMode = gradientSpread(gradient.spreadMode);
					var repeatMode = 0;
					if (spreadMode == "repeat") {
						repeatMode = 1;
					}
					if (spreadMode == "reflect") {
						repeatMode = 2;
					}
					return {
						type: 1,
						matrix: gradientMatrix,
						focal: focal,
						isRadial,
						repeat: repeatMode,
						records: css
					};
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					var bitmapId = fill.bitmapId;
					var bMatrix = fill.bitmapMatrix;
					return {
						type: 2,
						matrix: bMatrix,
						id: bitmapId,
						isSmoothed: fill.isSmoothed,
						isRepeating: fill.isRepeating,
					};
				default:
					return null;
			}
		}
		function lineToInfo(line) {
			if ("fillType" in line) {
				return fillToInfo(line.fillType);
			} else {
				return {
					type: 0,
					color: line.color
				};
			}
		}

		function cloneObject(src) {
			return JSON.parse(JSON.stringify(src));
		}
		const shapeUtils = {
			calculateShapeBounds: function(shapeRecords) {
				var xMin = Infinity;
				var yMin = Infinity;
				var xMax = -Infinity;
				var yMax = -Infinity;
				function dfgfd(x, y) {
					if (x < xMin) xMin = x;
					if (y < yMin) yMin = y;
					if (x > xMax) xMax = x;
					if (y > yMax) yMax = y;
				}
				var currentPosition = {x: 0, y: 0};
				var hasShapeRecord = false;
				for (let i = 0; i < shapeRecords.length; i++) {
					const record = shapeRecords[i];
					if (!record) continue;
					hasShapeRecord = true;
					if (record.isChange) {
						if (record.stateMoveTo) {
							currentPosition.x = record.moveX;
							currentPosition.y = record.moveY;
							dfgfd(currentPosition.x, currentPosition.y);
						}
					} else {
						var isCurved = record.isCurved;
						if (isCurved) {
							var _controlX = currentPosition.x + record.controlDeltaX;
							var _controlY = currentPosition.y + record.controlDeltaY;
							currentPosition.x = _controlX + record.anchorDeltaX;
							currentPosition.y = _controlY + record.anchorDeltaY;
							dfgfd(_controlX, _controlY);
							dfgfd(currentPosition.x, currentPosition.y);
						} else {
							currentPosition.x += record.deltaX;
							currentPosition.y += record.deltaY;
							dfgfd(currentPosition.x, currentPosition.y);
						}
					}
				}
				if (hasShapeRecord) {
					return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
				} else {
					return {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
				}
			},
			convertCurrentPosition: function(src) {
				var array = [];
				var currentPosition = {x: 0, y: 0};
				for (let i = 0; i < src.length; i++) {
					const record = src[i];
					if (record) {
						if (record.isChange) {
							if (record.stateMoveTo) {
								currentPosition.x = record.moveX;
								currentPosition.y = record.moveY;
							}
							array.push(record);
						} else {
							var isCurved = record.isCurved;
							if (isCurved) {
								var _controlX = currentPosition.x + record.controlDeltaX;
								var _controlY = currentPosition.y + record.controlDeltaY;
								currentPosition.x = _controlX + record.anchorDeltaX;
								currentPosition.y = _controlY + record.anchorDeltaY;
								array.push({
									controlX: _controlX,
									controlY: _controlY,
									anchorX: currentPosition.x,
									anchorY: currentPosition.y,
									isCurved: true,
									isChange: false
								});
							} else {
								currentPosition.x += record.deltaX;
								currentPosition.y += record.deltaY;
								array.push({
									controlX: 0,
									controlY: 0,
									anchorX: currentPosition.x,
									anchorY: currentPosition.y,
									isCurved: false,
									isChange: false
								});
							}
						}
					} else {
						array.push(null);
					}
				}
				array.push(null);
				return array;
			},
			convertWithCacheCodes: function(shapeRecords) {
				var records = this.convertCurrentPosition(shapeRecords);
				var _cmd = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					if (!record) {
						break;
					}
					var isCurved = record.isCurved;
					var isChange = record.isChange;
					var code;
					if (isChange) {
						code = [0, record.moveX, record.moveY];
					} else {
						if (isCurved) {
							code = [1, record.controlX, record.controlY, record.anchorX, record.anchorY];
						} else {
							code = [2, record.anchorX, record.anchorY];
						}
					}
					_cmd.push(code);
				}
				return _cmd;
			},
			convert: function(shapes, type) {
				var isMorph = (type == "morphshape");
				var lineStyles = shapes.lineStyles || [];
				var fillStyles = shapes.fillStyles || [];
				var records = this.convertCurrentPosition(shapes.shapeRecords);
				var idx = 0;
				var obj = {};
				var cache = [];
				var AnchorX = 0;
				var AnchorY = 0;
				var MoveX = 0;
				var MoveY = 0;
				var LineX = 0;
				var LineY = 0;
				var FillStyle0 = 0;
				var FillStyle1 = 0;
				var LineStyle = 0;
				var fills0 = [];
				var fills1 = [];
				var lines = [];
				var stack = [];
				var depth = 0;
				var length = records.length;
				for (var i = 0; i < length; i++) {
					var record = records[i];
					if (!record) {
						this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
						this.setStack(stack, lines);
						break;
					}
					if (record.isChange) {
						depth++;
						if (record.stateNewStyles) {
							AnchorX = 0;
							AnchorY = 0;
							this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
							this.setStack(stack, lines);
							fills0 = [];
							fills1 = [];
							lines = [];
							if (record.numFillBits) {
								fillStyles = record.fillStyles;
							}
							if (record.numLineBits) {
								lineStyles = record.lineStyles;
							}
						}
						MoveX = AnchorX;
						MoveY = AnchorY;
						if (record.stateMoveTo) {
							MoveX = record.moveX;
							MoveY = record.moveY;
						}
						LineX = MoveX;
						LineY = MoveY;
						if (record.stateFillStyle0) {
							FillStyle0 = record.fillStyle0;
						}
						if (record.stateFillStyle1) {
							FillStyle1 = record.fillStyle1;
						}
						if (record.stateLineStyle) {
							LineStyle = record.lineStyle;
						}
					} else {
						var isCurved = record.isCurved;
						AnchorX = record.anchorX;
						AnchorY = record.anchorY;
						var ControlX = record.controlX;
						var ControlY = record.controlY;
						if (FillStyle0) {
							idx = FillStyle0 - 1;
							if (!(idx in fills0)) {
								fills0[idx] = [];
							}
							if (!(depth in fills0[idx])) {
								fills0[idx][depth] = {
									obj: fillStyles[idx],
									startX: MoveX,
									startY: MoveY,
									endX: 0,
									endY: 0,
									cache: []
								};
							}
							obj = fills0[idx][depth];
							cache = obj.cache;
							cache[cache.length] = cloneObject(record);
							obj.endX = AnchorX;
							obj.endY = AnchorY;
						}
						if (FillStyle1) {
							idx = FillStyle1 - 1;
							if (!(idx in fills1)) {
								fills1[idx] = [];
							}
							if (!(depth in fills1[idx])) {
								fills1[idx][depth] = {
									obj: fillStyles[idx],
									startX: MoveX,
									startY: MoveY,
									endX: 0,
									endY: 0,
									cache: []
								};
							}
							obj = fills1[idx][depth];
							cache = obj.cache;
							cache[cache.length] = cloneObject(record);
							obj.endX = AnchorX;
							obj.endY = AnchorY;
						}
						if (LineStyle) {
							idx = LineStyle - 1;
							if (!(idx in lines)) {
								lines[idx] = {
									obj: lineStyles[idx],
									cache: []
								};
							}
							obj = lines[idx];
							cache = obj.cache;
							cache[cache.length] = [0, LineX, LineY];
							var code = [2, AnchorX, AnchorY];
							if (isCurved) {
								code = [1, ControlX, ControlY, AnchorX, AnchorY];
							}
							cache[cache.length] = code;
						}
						LineX = AnchorX;
						LineY = AnchorY;
					}
				}
				return stack;
			},
			fillMerge: function(fills0, fills1, isMorph) {
				fills0 = this.fillReverse(fills0);
				if (fills0.length) {
					for (var i in fills0) {
						if (!fills0.hasOwnProperty(i)) {
							continue;
						}
						var fills = fills0[i];
						if (i in fills1) {
							var fill1 = fills1[i];
							for (var depth in fills) {
								if (!fills.hasOwnProperty(depth)) {
									continue;
								}
								fill1[fill1.length] = fills[depth];
							}
						} else {
							fills1[i] = fills;
						}
					}
				}
				return this.coordinateAdjustment(fills1, isMorph);
			},
			fillReverse: function(fills0) {
				if (!fills0.length) {
					return fills0;
				}
				for (var i in fills0) {
					if (!fills0.hasOwnProperty(i)) {
						continue;
					}
					var fills = fills0[i];
					for (var depth in fills) {
						if (!fills.hasOwnProperty(depth)) {
							continue;
						}
						var AnchorX = 0;
						var AnchorY = 0;
						var obj = fills[depth];
						var cacheX = obj.startX;
						var cacheY = obj.startY;
						var cache = obj.cache;
						var length = cache.length;
						if (length) {
							for (var idx in cache) {
								if (!cache.hasOwnProperty(idx)) {
									continue;
								}
								var recode = cache[idx];
								AnchorX = recode.anchorX;
								AnchorY = recode.anchorY;
								recode.anchorX = cacheX;
								recode.anchorY = cacheY;
								cacheX = AnchorX;
								cacheY = AnchorY;
							}
							var array = [];
							if (length > 0) {
								while (length--) {
									array[array.length] = cache[length];
								}
							}
							obj.cache = array;
						}
						cacheX = obj.startX;
						cacheY = obj.startY;
						obj.startX = obj.endX;
						obj.startY = obj.endY;
						obj.endX = cacheX;
						obj.endY = cacheY;
					}
				}
				return fills0;
			},
			coordinateAdjustment: function(fills1, isMorph) {
				for (var i in fills1) {
					if (!fills1.hasOwnProperty(i)) {
						continue;
					}
					var array = [];
					var fills = fills1[i];
					for (var depth in fills) {
						if (!fills.hasOwnProperty(depth)) {
							continue;
						}
						array[array.length] = fills[depth];
					}
					var adjustment = [];
					if (array.length > 1 && !isMorph) {
						while (true) {
							if (!array.length) {
								break;
							}
							var fill = array.shift();
							if (fill.startX === fill.endX && fill.startY === fill.endY) {
								adjustment[adjustment.length] = fill;
								continue;
							}
							var mLen = array.length;
							if (mLen < 0) {
								break;
							}
							var isMatch = 0;
							while (mLen--) {
								var comparison = array[mLen];
								if (comparison.startX === fill.endX && comparison.startY === fill.endY) {
									fill.endX = comparison.endX;
									fill.endY = comparison.endY;
									var cache0 = fill.cache;
									var cache1 = comparison.cache;
									var cLen = cache1.length;
									for (var cIdx = 0; cIdx < cLen; cIdx++) {
										cache0[cache0.length] = cache1[cIdx];
									}
									array.splice(mLen, 1);
									array.unshift(fill);
									isMatch = 1;
									break;
								}
							}
							if (!isMatch) {
								array.unshift(fill);
							}
						}
					} else {
						adjustment = array;
					}
					var aLen = adjustment.length;
					var cache = [];
					var obj = {};
					for (var idx = 0; idx < aLen; idx++) {
						var data = adjustment[idx];
						obj = data.obj;
						var caches = data.cache;
						var cacheLength = caches.length;
						cache[cache.length] = [0, data.startX, data.startY];
						for (var compIdx = 0; compIdx < cacheLength; compIdx++) {
							var r = caches[compIdx];
							var code = [2, r.anchorX, r.anchorY];
							if (r.isCurved) {
								code = [1, r.controlX, r.controlY, r.anchorX, r.anchorY];
							}
							cache[cache.length] = code;
						}
					}
					fills1[i] = {cache: cache, obj: obj};
				}
				return fills1;
			},
			setStack: function(stack, array) {
				if (array.length) {
					for (var i in array) {
						if (!array.hasOwnProperty(i)) {
							continue;
						}
						var data = array[i];
						stack.push({
							obj: data.obj,
							cmd: data.cache
						});
					}
				}
			},
		}
		function stroke_minimum_width(matrix) {
			var sx = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
			   var sy = Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d);
			var scale = Math.max(sx, sy);
			return scale;
		}
		function winding_number_line(test_point, begin, end) {
			var d0 = { x: test_point[0] - begin.x, y: test_point[1] - begin.y };
			var d1 = { x: end.x - begin.x, y: end.y - begin.y };
			if (begin.y < test_point[1]) {
				if (end.y >= test_point[1] && ((d1.x * d0.y) > (d1.y * d0.x))) {
					return 1;
				}
			} else if ((end.y < test_point[1]) && ((d1.x * d0.y) < (d1.y * d0.x))) {
				return -1;
			}
			return 0;
		}
		const COEFFICIENT_EPSILON = 0.0000001;
		function solve_quadratic(a, b, c) {
			if (Math.abs(a) <= COEFFICIENT_EPSILON) {
				if (b >= 0.0) {
					return [NaN, -c / b];
				} else {
					return [-c / b, NaN];
				}
			}
			var disc = b * b - 4.0 * a * c;
			if (disc < 0.0) {
				return [NaN, NaN];
			}
			disc = Math.sqrt(disc);
			if (b >= 0.0) {
				var root0 = (-b - disc) / (2.0 * a);
				   var root1 = c / (a * root0);
				return [root0, root1];
			} else {
				var root0 = (-b + disc) / (2.0 * a);
				var root1 = c / (a * root0);
				return [root1, root0];
			}
		}
		function solve_cubic(a, b, c, d) {
			var roots = [];
			if (Math.abs(a) <= COEFFICIENT_EPSILON) {
				var [t0, t1] = solve_quadratic(b, c, d);
				roots.push(t0, t1);
				return roots;
			}
			var p = (b * b - 3.0 * a * c) / (9.0 * a * a);
			var q = (9.0 * a * b * c - 27.0 * a * a * d - 2.0 * b * b * b) / (54.0 * a * a * a);
			var offset = b / (3.0 * a);
			var disc = p * p * p - q * q;
			if (disc > 0.0) {
				var theta = Math.acos(q / (p * Math.sqrt(p)));
				var r = 2.0 * Math.sqrt(p);
				var t0 = r * Math.cos(theta / 3.0) - offset;
				var t1 = r * Math.cos((theta + 2.0 * Math.PI) / 3.0) - offset;
				var t2 = r * Math.cos((theta + 4.0 * Math.PI) / 3.0) - offset;
				roots.push(t0, t1, t2);
			} else {
				let gamma1 = Math.cbrt(q + Math.sqrt(-disc));
				let gamma2 = Math.cbrt(q - Math.sqrt(-disc));
				let t0 = gamma1 + gamma2 - offset;
				let t1 = -0.5 * (gamma1 + gamma2) - offset;
				roots.push(t0);
				if (disc == 0.0) {
					roots.push(t1);
				}
			}
			return roots;
		}
		function winding_number_curve(test_point, begin, control, anchor) {
			var d0 = { dx: begin.x - test_point[0], dy: begin.y - test_point[1] };
			var d1 = { dx: control.x - test_point[0], dy: control.y - test_point[1] };
			var d2 = { dx: anchor.x - test_point[0], dy: anchor.y - test_point[1] };
			if ((d0.dy < 0 && d1.dy < 0 && d2.dy < 0) || (d0.dy > 0 && d1.dy > 0 && d2.dy > 0) || (d0.dx <= 0 && d1.dx <= 0 && d2.dx <= 0)) {
				return 0;
			}
			var x0 = d0.dx;
			var y0 = d0.dy;
			var x1 = d1.dx;
			var y1 = d1.dy;
			var x2 = d2.dx;
			var y2 = d2.dy;
			var a = y0 - 2.0 * y1 + y2;
			var b = 2.0 * (y1 - y0);
			var c = y0;
			let [t0, t1] = solve_quadratic(a, b, c);
			let is_t0_valid = Number.isFinite(t0);
			let is_t1_valid = Number.isFinite(t1);
			if (!is_t0_valid && !is_t1_valid) {
				return 0;
			}
			var winding = 0;
			var ax = x0 - 2.0 * x1 + x2;
			var bx = 2.0 * (x1 - x0);
			var t_extrema = -0.5 * b / a;
			var is_monotonic = t_extrema <= 0.0 || t_extrema >= 1.0;
			if (a >= 0.0) {
				var y_min = is_monotonic ? Math.min(y0, y2) : (a * t_extrema * t_extrema + b * t_extrema + c);
				if (is_t0_valid && y0 >= 0.0 && y_min < 0.0) {
					let x = x0 + bx * t0 + ax * t0 * t0;
					if (x > 0.0) {
						winding += 1;
					}
				}
				if (is_t1_valid && y_min < 0.0 && y2 >= 0.0) {
					let x = x0 + bx * t1 + ax * t1 * t1;
					if (x > 0.0) {
						winding -= 1;
					}
				}
			} else {
				var y_max = is_monotonic ? Math.max(y0, y2) : (a * t_extrema * t_extrema + b * t_extrema + c);
				if (is_t1_valid && y0 < 0.0 && y_max >= 0.0) {
					let x = x0 + bx * t1 + ax * t1 * t1;
					if (x > 0.0) {
						winding -= 1;
					}
				}
				if (is_t0_valid && y_max >= 0.0 && y2 < 0.0) {
					let x = x0 + bx * t0 + ax * t0 * t0;
					if (x > 0.0) {
						winding += 1;
					}
				}
			}
			return winding;
		}
		function hit_test_stroke(test_point, begin, end, _stroke_width) {
			var [stroke_width, stroke_width_sq] = _stroke_width;
			var px = test_point[0];
			var py = test_point[1];
			var x0 = begin.x;
			var y0 = begin.y;
			var x1 = end.x;
			var y1 = end.y;
			var x_min = Math.min(x0, x1);
			var x_max = Math.max(x0, x1);
			if (px < x_min - stroke_width || px > x_max + stroke_width) {
				return false;
			}
			var y_min = Math.min(y0, y1);
			var y_max = Math.max(y0, y1);
			if (py < y_min - stroke_width || py > y_max + stroke_width) {
				return false;
			}
			var abx = x1 - x0;
			var aby = y1 - y0;
			var apx = px - x0;
			var apy = py - y0;
			var dot_a = abx * apx + aby * apy;
			var dist;
			if (dot_a <= 0.0) {
				dist = apx * apx + apy * apy;
			} else {
				var bpx = px - x1;
				var bpy = py - y1;
				var dot_b = abx * bpx + aby * bpy;
				if (dot_b >= 0.0) {
					dist = bpx * bpx + bpy * bpy;
				} else {
					var len = abx * abx + aby * aby;
					var ex = apx - dot_a * abx / len;
					var ey = apy - dot_a * aby / len;
					dist = ex * ex + ey * ey;
				}
			}
			return dist <= stroke_width_sq;
		}
		function hit_test_stroke_curve(test_point, begin, control, anchor, _stroke_width) {
			var [stroke_width, stroke_width_sq] = _stroke_width;
			var px = test_point[0];
			var py = test_point[1];
			var x0 = begin.x;
			var y0 = begin.y;
			var x1 = control.x;
			var y1 = control.y;
			var x2 = anchor.x;
			var y2 = anchor.y;
			var x_min = Math.min(Math.min(x0, x1), x2);
			var x_max = Math.max(Math.max(x0, x1), x2);
			if (px < x_min - stroke_width || px > x_max + stroke_width) {
				return false;
			}
			var y_min = Math.min(Math.min(y0, y1), y2);
			var y_max = Math.max(Math.max(y0, y1), y2);
			if (py < y_min - stroke_width || py > y_max + stroke_width) {
				return false;
			}
			var ax = x1 - x0;
			var ay = y1 - y0;
			var bx = x2 - x1 - ax;
			var by = y2 - y1 - ay;
			var mx = x0 - px;
			var my = y0 - py;
			var a = bx * bx + by * by;
			var b = 3.0 * (ax * bx + ay * by);
			var c = 2.0 * (ax * ax + ay * ay) + (mx * bx + my * by);
			var d = mx * ax + my * ay;
			var distance_to_curve = function(t) {
				let comp_t = 1.0 - t;
				let cx = comp_t * comp_t * x0 + 2.0 * comp_t * t * x1 + t * t * x2;
				let cy = comp_t * comp_t * y0 + 2.0 * comp_t * t * y1 + t * t * y2;
				let dx = cx - px;
				let dy = cy - py;
				return dx * dx + dy * dy;
			}
			var dist = distance_to_curve(0.0);
			dist = Math.min(dist, distance_to_curve(1.0));
			var _r = solve_cubic(a, b, c, d);
			for (let i = 0; i < _r.length; i++) {
				var t = _r[i];
				if (t >= 0.0 && t <= 1.0) {
					dist = Math.min(dist, distance_to_curve(t));
				}
			}
			return dist <= stroke_width_sq;
		}
		function shapeHitTest(shape, test_point, local_matrix) {
			var cursor = { x: 0, y: 0 };
			var winding = 0;
			var has_fill_style0 = false;
			var has_fill_style1 = false;
			let min_width = stroke_minimum_width(local_matrix);
			var stroke_width = null;
			var line_styles = shape.lineStyles;
			for (let i = 0; i < shape.shapeRecords.length; i++) {
				const record = shape.shapeRecords[i];
				if (record.isChange) {
					if (record.stateNewStyles) {
						if ((winding & 0b1) != 0) {
							return true;
						}
						line_styles = record.lineStyles;
						winding = 0;
					}
					if (record.stateMoveTo) {
						cursor.x = record.moveX;
						cursor.y = record.moveY;
					}
					if (record.stateFillStyle0) {
						has_fill_style0 = record.fillStyle0 > 0;
					}
					if (record.stateFillStyle1) {
						has_fill_style1 = record.fillStyle1 > 0;
					}
					if (record.stateLineStyle) {
						if (record.lineStyle > 0) {
							var line_style = line_styles[record.lineStyle - 1];
							if (line_style) {
								var width = line_style.width;
								var scaled_width = 0.5 * width;
								stroke_width = [scaled_width, scaled_width * scaled_width];
							} else {
								stroke_width = null;
							}
						} else {
							stroke_width = null;
						}
					}
				} else {
					if (record.isCurved) {
						var control = { x: cursor.x + record.controlDeltaX, y: cursor.y + record.controlDeltaY };
						var anchor = { x: control.x + record.anchorDeltaX, y: control.y + record.anchorDeltaY };
						if (has_fill_style1) {
							if (!has_fill_style0) {
								winding += winding_number_curve(test_point, cursor, control, anchor);
							}
						} else if (has_fill_style0) {
							winding += winding_number_curve(test_point, anchor, control, cursor);
						}
						if (stroke_width) {
							if (hit_test_stroke_curve(test_point, cursor, control, anchor, stroke_width)) return true;
						}
						cursor.x = anchor.x;
						cursor.y = anchor.y;
					} else {
						var end = { x: cursor.x + record.deltaX, y: cursor.y + record.deltaY };
						if (has_fill_style1) {
							if (!has_fill_style0) {
								winding += winding_number_line(test_point, cursor, end);
							}
						} else if (has_fill_style0) {
							winding += winding_number_line(test_point, end, cursor);
						}
						if (stroke_width) {
							if (hit_test_stroke(test_point, cursor, end, stroke_width)) return true;
						}
						cursor.x = end.x;
						cursor.y = end.y;
					}
				}
			}
			return (winding & 0b1) != 0;
		}
		function drawCommandFillHitTest(commands, test_point) {
			var cursor = { x: 0, y: 0 };
			var fillStart = { x: 0, y: 0 };
			var winding = 0;
			for (let i = 0; i < commands.length; i++) {
				const c = commands[i];
				if (c[0] == 0) {
					cursor.x = c[1];
					cursor.y = c[2];
					fillStart.x = c[1];
					fillStart.y = c[2];
				} else if (c[0] == 1) {
					winding += winding_number_curve(test_point, cursor, { x: c[1], y: c[2] }, { x: c[3], y: c[4] });
					cursor.x = c[3];
					cursor.y = c[4];
				} else if (c[0] == 2) {
					winding += winding_number_line(test_point, cursor, { x: c[1], y: c[2] });
					cursor.x = c[1];
					cursor.y = c[2];
				}
			}
			if (!((cursor.x == fillStart.x) && (cursor.y == fillStart.y))) {
				winding += winding_number_line(test_point, cursor, fillStart);
			}
			return (winding & 0b1) != 0;
		}
		shapeUtils.shapeHitTest = shapeHitTest;
		shapeUtils.drawCommandFillHitTest = drawCommandFillHitTest;
		shapeUtils.shapeToRendererInfo = shapeToRendererInfo;
		module.exports = shapeUtils;
	},
	"./src/render/tessellator.js": function(module, exports, __webpack_require__) {
		// TODO: Unsupported at-lyon-js.

		var libtess = __webpack_require__("./lib/libtess.js");
		
		var tessy = (function initTesselator() {
			// function called for each vertex of tesselator output
			function vertexCallback(data, polyVertArray) {
			  // console.log(data[0], data[1]);
			  polyVertArray[polyVertArray.length] = data[0];
			  polyVertArray[polyVertArray.length] = data[1];
			}
			function begincallback(type) {
			  if (type !== libtess.primitiveType.GL_TRIANGLES) {
				console.log('expected TRIANGLES but got type: ' + type);
			  }
			}
			function errorcallback(errno) {
			  console.log('error callback');
			  console.log('error number: ' + errno);
			}
			// callback for when segments intersect and must be split
			function combinecallback(coords, data, weight) {
			  // console.log('combine callback');
			  return [coords[0], coords[1], coords[2]];
			}
			function edgeCallback(flag) {
			  // don't really care about the flag, but need no-strip/no-fan behavior
			  // console.log('edge flag: ' + flag);
			}

			var tessy = new libtess.GluTesselator();
			// tessy.gluTessProperty(libtess.gluEnum.GLU_TESS_WINDING_RULE, libtess.windingRule.GLU_TESS_WINDING_POSITIVE);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_VERTEX_DATA, vertexCallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_BEGIN, begincallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_ERROR, errorcallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_COMBINE, combinecallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_EDGE_FLAG, edgeCallback);

			return tessy;
		})();
		function TaskList() {
			this.list = [];
			this.hash = Object.create(null);
		}
		TaskList.prototype.push = function(index) {
			if (this.hash[index]) return;
			this.hash[index] = true;
			this.list.push(index);
		};
		TaskList.prototype.pop = function() {
			if (this.list.length) {
				var value = this.list.pop();
				delete this.hash[value];
				return value;
			} else return null;
		};
		
		/* Union-find functions */
		
		function unionFindUnion(obj1, obj2) {
			var root1 = unionFindFind(obj1);
			var root2 = unionFindFind(obj2);
			if (root1 !== root2) {
				if (root1.rank < root2.rank) {
					root1.parent = root2;
				} else {
					root2.parent = root1;
					if (root1.rank === root2.rank) root1.rank += 1;
				}
			}
		}
		
		function unionFindFind(x) {
			if (x.parent !== x) x.parent = unionFindFind(x.parent);
			return x.parent;
		}
		
		/* Fast collision test for rectangles*/
		
		function subTest(p1, p2 , r) {
			var position;
			var norm = norm2(p1, p2);
			var product, localPosition;
			for (var i = 0; i < 4; i++) {
				product = innerProduct(p1, p2, p1, r[i]);
				if (product <= 0) localPosition = -1;
				else if (product >= norm) localPosition = 1;
				else return false;
				if (i === 0) {
					position = localPosition;
				} else {
					if (localPosition !== position) {
						return false;
					}
				}
			}
			return true;
		}
		
		function rectanglesCollide(r1, r2) {
			return !(subTest(r1[0], r1[1], r2) || subTest(r1[1], r1[2], r2) || subTest(r2[0], r2[1], r1) || subTest(r2[1], r2[2], r1));
		}
		
		/* Geometry helpers */
		
		function innerProduct(p1, p2, p3, p4) {
			return (p2[0] - p1[0]) * (p4[0] - p3[0]) + (p2[1] - p1[1]) * (p4[1] - p3[1]);
		}
		function norm2(p1, p2) {
			var dx = p2[0] - p1[0];
			var dy = p2[1] - p1[1];
			return dx * dx + dy * dy;
		}
		
		function segmentIntersection(p1, p2, p3, p4) {
			// find intersection point of [p1, p2] and [p3, p4], supposing it exists
			var dx = p2[0] - p1[0];
			var dy = p2[1] - p1[1];
			var dx2 = p4[0] - p3[0];
			var dy2 = p4[1] - p3[1];
			var lambda = ((p2[0] - p3[0]) * dy - dx * (p2[1] - p3[1])) /
				(dx2 * dy - dx * dy2);
			return [p3[0] + lambda * dx2, p3[1] + lambda * dy2];
		}
		function rayIntersection(p1, p2, p3, p4) {
			// find intersection point of (p1, p2] and (p3, p4]
			var dx = p2[0] - p1[0];
			var dy = p2[1] - p1[1];
			var dx2 = p4[0] - p3[0];
			var dy2 = p4[1] - p3[1];
			var denom = dx2 * dy - dx * dy2;
			if (denom === 0) return {point: p1, valid: true};
			var lambda = ((p2[0] - p3[0]) * dy - dx * (p2[1] - p3[1])) / denom;
			var inter = [p3[0] + lambda * dx2, p3[1] + lambda * dy2];
			if (lambda > 1 || innerProduct(p2, inter, p2, p1) < 0) return {point: inter, valid: false};
			else return {point: inter, valid: true};
		}
		
		function getData(from, to, w) {
			var ux = to[0] - from[0];
			var uy = to[1] - from [1];
			var Nu = Math.sqrt(ux * ux + uy * uy);
			var theta = Math.acos(ux / Nu);
			if (uy < 0) theta *= -1;
			return {
				angle: theta,
				norm: Nu,
				dir: [ux, uy],
				ortho: [- w * uy / Nu, w * ux / Nu]
			};
		}
		
		/* main function */
		
		function graphDraw(graph, width, cb, maxAngle) {
			var w = width / 2;
			maxAngle = Math.max(Math.PI, maxAngle || 2 * Math.PI);
			/* Data structures setup */
		
			var vertices = graph.vertices.map(function(coords) {
				return {
					coords: coords,
					neighList: []
				};
			});
			var edges = graph.edges.map(function(edge, index) {
				var from = edge[0];
				var to = edge[1];
				var vertexFrom = vertices[from];
				var vertexTo = vertices[to];
				var data = getData(vertexFrom.coords, vertexTo.coords, w);
				vertexFrom.neighList.push({
					to: to,
					angle: data.angle,
					dir: data.dir,
					ortho: data.ortho,
					index: index
				});
				vertexTo.neighList.push({
					to: from,
					angle: data.angle <= 0 ? data.angle + Math.PI : data.angle - Math.PI,
					dir: [-data.dir[0], -data.dir[1]],
					ortho: [-data.ortho[0], -data.ortho[1]],
					index: index
				});
				var obj = {
					rank: 0,
					edge: edge,
					points: {}
				};
				obj.points[to] = {};
				obj.points[from] = {};
				obj.parent = obj;
				return obj;
			});
		
			/* Build edges contour points */
		
			var toPostProcess = [];
			vertices.forEach(function(vertex, vindex) {
				var point = vertex.coords;
				var prepared = vertex.neighList;
				prepared.sort(function(a, b) {return a.angle - b.angle;});
				var n = prepared.length;
				if (n === 1) {
					var edge = prepared[0];
					var p1 = [point[0] + edge.ortho[0], point[1] + edge.ortho[1]];
					var p2 = [point[0] - edge.ortho[0], point[1] - edge.ortho[1]];
					var edgePoints = edges[edge.index].points;
					edgePoints[vindex].first_vertex = edge.index;
					edgePoints[vindex].last_vertex = edge.index;
					edgePoints[vindex].first = p1;
					edgePoints[vindex].remove_middle_first = true;
					edgePoints[vindex].remove_middle_last = true;
					edgePoints[vindex].last = p2;
				} else {
					prepared.forEach(function(edge, index) {
						var last = (index === n - 1);
						var next = prepared[last ? 0 : index + 1];
						var edgePoints = edges[edge.index].points;
						var nextPoints = edges[next.index].points;
						edgePoints[vindex].first_vertex = next.index;
						nextPoints[vindex].last_vertex = edge.index;
						var p1 = [point[0] + edge.ortho[0], point[1] + edge.ortho[1]];
						var p2 = [p1[0] + edge.dir[0], p1[1] + edge.dir[1]];
						var p3 = [point[0] - next.ortho[0], point[1] - next.ortho[1]];
						var p4 = [p3[0] + next.dir[0], p3[1] + next.dir[1]];
						var intersection = rayIntersection(p1, p2, p3, p4);
						var newPoint = intersection.point;
						if (intersection.valid) {
							var nextAngle = last ? next.angle + 2 * Math.PI : next.angle;
							if (nextAngle - edge.angle > maxAngle) {
								edgePoints[vindex].first = p1;
								nextPoints[vindex].last = p3;
								var vec = [newPoint[0] - point[0], newPoint[1] - point[1]];
								var invNorm = 1 / Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
								edgePoints[vindex].miter_first = nextPoints[vindex].miter_last = [
									point[0] + w * vec[0] * invNorm,
									point[1] + w * vec[1] * invNorm
								];
							} else {
								edgePoints[vindex].first = newPoint;
								nextPoints[vindex].last = newPoint;
							}
							if (n === 2) {
								edgePoints[vindex].remove_middle_first = true;
								nextPoints[vindex].remove_middle_last = true;
							}
						} else {
							var q1 = [newPoint[0] - edge.ortho[0], newPoint[1] - edge.ortho[1]];
							var q3 = [newPoint[0] + next.ortho[0], newPoint[1] + next.ortho[1]];
		
							toPostProcess.push({
								done: [edge.index, next.index],
								todo: [vindex, edge.to, next.to],
								rectangles: [[p1, newPoint, q1, point], [p3, newPoint, q3, point]]
							});
		
							edgePoints[vindex].first = p1;
							nextPoints[vindex].last = p3;
						}
					});
				}
			});
		
			/* Build each edge polygon */
		
			edges.forEach(function(obj) {
				var edge = obj.edge;
				var from = edge[0];
				var to = edge[1];
				var obj1 = obj.points[from];
				var obj2 = obj.points[to];
				var fromCoords = vertices[from].coords;
				var toCoords = vertices[to].coords;
				var newPoly = obj.polygon = [];
		
				if (innerProduct(obj1.last, obj2.first, fromCoords, toCoords) < 0) {
					var i1 = obj1.last_vertex;
					var i2 = obj2.first_vertex;
					unionFindUnion(edges[i1], edges[i2]);
					newPoly.push(segmentIntersection(obj1.miter_last || fromCoords, obj1.last, obj2.first, obj2.miter_first || toCoords));
				} else {
					newPoly.push(obj1.last, obj2.first);
				}
				if (obj2.miter_first) newPoly.push(obj2.miter_first);
				if (!(obj2.remove_middle_first && obj2.remove_middle_last)) newPoly.push(toCoords);
				if (obj2.miter_last) newPoly.push(obj2.miter_last);
				if (innerProduct(obj1.first, obj2.last, fromCoords, toCoords) < 0) {
					var i1 = obj1.first_vertex;
					var i2 = obj2.last_vertex;
					unionFindUnion(edges[i1], edges[i2]);
					newPoly.push(segmentIntersection(obj1.first, obj1.miter_first || fromCoords, obj2.miter_last || toCoords, obj2.last));
				} else {
					newPoly.push(obj2.last, obj1.first);
				}
				if (obj1.miter_first) newPoly.push(obj1.miter_first);
				if (!(obj1.remove_middle_first && obj1.remove_middle_last)) newPoly.push(fromCoords);
				if (obj1.miter_last) newPoly.push(obj1.miter_last);
			});
		
			/* Find locally overlapping edges */
		
			var shapeMemo = Object.create(null);
		
			toPostProcess.forEach(function(obj) {
				var done = Object.create(null);
				var i1 = obj.done[0];
				var i2 = obj.done[1];
				var e1 = edges[i1];
				var e2 = edges[i2];
				unionFindUnion(e1, e2);
				done[i1] = true;
				done[i2] = true;
				var todo = new TaskList();
				obj.todo.forEach(function(vertex) {
					todo.push(vertex);
				});
				var from;
				var r1 = obj.rectangles[0];
				var r2 = obj.rectangles[1];
				while((from = todo.pop()) !== null) {
					vertices[from].neighList.forEach(function(neigh) {
						var index = neigh.index;
						if (done[index]) return;
						var to = neigh.to;
						var rectangle = shapeMemo[index];
						if (!rectangle) {
							var fromCoords = vertices[from].coords;
							var toCoords = vertices[to].coords;
							var p1 = [fromCoords[0] + neigh.ortho[0], fromCoords[1] + neigh.ortho[1]];
							var p2 = [toCoords[0] + neigh.ortho[0], toCoords[1] + neigh.ortho[1]];
							var p3 = [toCoords[0] - neigh.ortho[0], toCoords[1] - neigh.ortho[1]];
							var p4 = [fromCoords[0] - neigh.ortho[0], fromCoords[1] - neigh.ortho[1]];
							rectangle = shapeMemo[index] = [p1, p2, p3, p4];
						}
						done[index] = true;
						if (rectanglesCollide(rectangle, r1) || rectanglesCollide(rectangle, r2)) {
							unionFindUnion(e1, edges[index]);
							todo.push(to);
						}
					});
				}
			});
		
			/* Execute cb on each polygon */
		
			var needUnion = [];
			edges.forEach(function(obj, index) {
				if (obj.rank > 0 && obj.parent === obj) {
					obj.union = obj.union || [];
					obj.union.push(obj.polygon);
					needUnion.push(index);
				} else {
					if (obj.parent === obj) {
						cb(obj.polygon);
					} else {
						var root = unionFindFind(obj);
						root.union = root.union || [];
						root.union.push(obj.polygon);
					}
				}
			});
		}
		function triangulate(contours) {
			tessy.gluTessNormal(0, 0, 1);
			var triangleVerts = [];
			tessy.gluTessBeginPolygon(triangleVerts);
			for (var i = 0; i < contours.length; i++) {
			  tessy.gluTessBeginContour();
			  var contour = contours[i];
			  for (var j = 0; j < contour.length; j += 2) {
				var coords = [contour[j], contour[j + 1], 0];
				tessy.gluTessVertex(coords, coords);
			  }
			  tessy.gluTessEndContour();
			}
			tessy.gluTessEndPolygon();
			return triangleVerts;
		}
		module.exports = {
			stroke: function(arrs, width) {
				var vex = [];
				for (let i = 0; i < arrs.length; i++) {
					var _arr = arrs[i];
					if (_arr.length < 4) continue;
					var vertices = [];
					var edges = [];
					var id = 0;
					for (let j = 0; j < _arr.length; j+=2) {
						var fs1 = _arr[j];
						var fs2 = _arr[j + 1];
						if (j == 0) {
							vertices.push([fs1, fs2])
						} else {
							vertices.push([fs1, fs2])
							edges.push([id - 1, id]);
						}
						id++;
					}
					graphDraw({vertices, edges}, width, function(res) {
						if (res.length == 4) { // TODO
							var x1 = res[0][0];
							var y1 = res[0][1];
							var x2 = res[1][0];
							var y2 = res[1][1];
							var x3 = res[2][0];
							var y3 = res[2][1];
							var x4 = res[3][0];
							var y4 = res[3][1];
							if (isFinite(x1) && isFinite(y1) && isFinite(x2) && isFinite(y2) && isFinite(x3) && isFinite(y3) && isFinite(x4) && isFinite(y4)) {
								vex.push(x1, y1);
								vex.push(x2, y2);
								vex.push(x3, y3);
								vex.push(x1, y1);
								vex.push(x3, y3);
								vex.push(x4, y4);	
							}
						}
					});
				}
				return vex;
			},
			fill: function(data) {
				return triangulate(data);
			}
		}
	},
	"./src/render/transform.js": function(module, exports, __webpack_require__) {
		const matrixUtils = __webpack_require__("./src/render/matrix_utils.js");

		function multiplicationColor(a, b) {
			return [
				a[0] * b[0], // Red Multiply
				a[1] * b[1], // Green Multiply
				a[2] * b[2], // Blue Multiply
				a[3] * b[3], // Alpha Multiply
				a[0] * b[4] + a[4], // Red Addition
				a[1] * b[5] + a[5], // Green Addition
				a[2] * b[6] + a[6], // Blue Addition
				a[3] * b[7] + a[7] // Transparency Addition
			];
		}
		class Transform {
			constructor(matrix, colorTransform) {
				this.matrix = matrix || [1, 0, 0, 1, 0, 0];
				this.colorTransform = colorTransform || [1, 1, 1, 1, 0, 0, 0, 0];
			}
			clone() {
				return new Transform(this.matrix.slice(0), this.colorTransform.slice(0));
			}
		}
		class TransformStack {
			constructor() {
				this.stack = [new Transform()];
			}
			stackPush(transform) {
				let cur_transform = this.getTransform();
				var matrix = matrixUtils.multiplicationMatrix(cur_transform.matrix, transform.matrix);
				var colorTransform = multiplicationColor(cur_transform.colorTransform, transform.colorTransform);
				this.stack.push(new Transform(matrix, colorTransform));
			}
			stackPop() {
				this.stack.pop();
			}
			getTransform() {
				return this.stack[this.stack.length - 1];
			}
		}
		exports.Transform = Transform;
		exports.TransformStack = TransformStack;
	},
	"./src/render/webgl.js": function(module, exports, __webpack_require__) {
		const AT_Tess = __webpack_require__("./src/render/tessellator.js");

		function multiplicationMatrix(a, b) {
			return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
		};
		function QuadraticBezierP0( t, p ) {
			const k = 1 - t;
			return k * k * p;
		}
		function QuadraticBezierP1( t, p ) {
			return 2 * (1 - t) * t * p;
		}
		function QuadraticBezierP2( t, p ) {
			return t * t * p;
		}
		function QuadraticBezier(t, p0, p1, p2) {
			return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
		}
		function swf_to_gl_matrix(m) {
			var tx = m[4];
			var ty = m[5];
			var det = m[0] * m[3] - m[2] * m[1];
			var a = m[3] / det;
			var b = -m[2] / det;
			var c = -(tx * m[3] - m[2] * ty) / det;
			var d = -m[1] / det;
			var e = m[0] / det;
			var f = (tx * m[1] - m[0] * ty) / det;
			a *= 20 / 32768.0;
			b *= 20 / 32768.0;
			d *= 20 / 32768.0;
			e *= 20 / 32768.0;
			c /= 32768.0;
			f /= 32768.0;
			c += 0.5;
			f += 0.5;
			return [a, d, 0.0, b, e, 0.0, c, f, 1.0];
		}
		function swf_bitmap_to_gl_matrix(m, bitmap_width, bitmap_height) {
			var tx = m[4];
			var ty = m[5];
			var det = m[0] * m[3] - m[2] * m[1];
			var a = m[3] / det;
			var b = -m[2] / det;
			var c = -(tx * m[3] - m[2] * ty) / det;
			var d = -m[1] / det;
			var e = m[0] / det;
			var f = (tx * m[1] - m[0] * ty) / det;
			a *= 20 / bitmap_width;
			b *= 20 / bitmap_width;
			d *= 20 / bitmap_height;
			e *= 20 / bitmap_height;
			c /= bitmap_width;
			f /= bitmap_height;
			return [a, d, 0.0, b, e, 0.0, c, f, 1.0];
		}
		class RenderWebGLShapeInterval {
			constructor(renderer, interval) {
				this.renderer = renderer;
				this.shapeIntervalData = interval;
			}
		}
		class RenderWebGLImageInterval {
			constructor(renderer, width, height, texture) {
				this.renderer = renderer;
				this.width = width;
				this.height = height;
				this.texture = texture;
			}
			delete() {
				if (this.texture) {
					this.renderer.gl.deleteTexture(this.texture);
				}
			}
		}
		class Shader {
			constructor(gl, program) {
				this.gl = gl;
				this.program = program;
				this.uniformLocations = {};
				this.attributeLocations = {};
				const activeUniforms = gl.getProgramParameter(program, this.gl.ACTIVE_UNIFORMS);
				for (let index = 0; index < activeUniforms; index++) {
					const info = gl.getActiveUniform(program, index);
					if (!info) {
						throw new Error('uniform at index ' + index + ' does not exist');
					}
					const name = info.name;
					const location = gl.getUniformLocation(program, name);
					if (!location) {
						throw new Error('uniform named ' + name + ' does not exist');
					}
					this.uniformLocations[name] = location;
				}
				const activeAttributes = gl.getProgramParameter(program, this.gl.ACTIVE_ATTRIBUTES);
				for (let index = 0; index < activeAttributes; index++) {
					const info = gl.getActiveAttrib(program, index);
					if (!info) {
						throw new Error('attribute at index ' + index + ' does not exist');
					}
					this.attributeLocations[info.name] = gl.getAttribLocation(program, info.name);
				}
			}
			uniform1f(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform1f(location, value);
			}
			uniform1i(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform1i(location, value);
			}
			uniform1fv(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform1fv(location, value);
			}
			uniform4fv(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform4fv(location, value);
			}
			uniform2f(name, a, b) {
				const location = this.getUniform(name);
				this.gl.uniform2f(location, a, b);
			}
			uniform3f(name, a, b, c) {
				const location = this.getUniform(name);
				this.gl.uniform3f(location, a, b, c);
			}
			uniform4f(name, a, b, c, d) {
				const location = this.getUniform(name);
				this.gl.uniform4f(location, a, b, c, d);
			}
			uniformMatrix3(name, value) {
				const location = this.getUniform(name);
				this.gl.uniformMatrix3fv(location, false, value);
			}
			uniformMatrix4(name, value) {
				const location = this.getUniform(name);
				this.gl.uniformMatrix4fv(location, false, value);
			}
			hasUniform(name) {
				return this.uniformLocations.hasOwnProperty(name);
			}
			getUniform(name) {
				if (!this.hasUniform(name)) {
					throw new Error('uniform of name ' + name + ' does not exist');
				}
				return this.uniformLocations[name];
			}
		}
		class Shaders {
			constructor(gl) {
				this.gl = gl;
				this.shaderTexture = this.createShader(Shaders.shader_texture, Shaders.shader_bitmap);
				this.shaderColor = this.createShader(Shaders.shader_color_vertex, Shaders.shader_color_fragment);
				this.shaderGradient = this.createShader(Shaders.shader_texture, Shaders.shader_gradient);
				this.shaderCopy = this.createShader(Shaders.shader_texture, Shaders.shader_copy);

				// blends
				this.shaderBlendNormal = this.createShader(Shaders.shader_texture, Shaders.shader_blend_normal);
				this.shaderBlendAdd = this.createShader(Shaders.shader_texture, Shaders.shader_blend_add);
				this.shaderBlendSubtract = this.createShader(Shaders.shader_texture, Shaders.shader_blend_subtract);
				this.shaderBlendMultiply = this.createShader(Shaders.shader_texture, Shaders.shader_blend_multiply);
				this.shaderBlendLighten = this.createShader(Shaders.shader_texture, Shaders.shader_blend_lighten);
				this.shaderBlendDarken = this.createShader(Shaders.shader_texture, Shaders.shader_blend_darken);
				this.shaderBlendScreen = this.createShader(Shaders.shader_texture, Shaders.shader_blend_screen);
				this.shaderBlendOverlay = this.createShader(Shaders.shader_texture, Shaders.shader_blend_overlay);
				this.shaderBlendHardlight = this.createShader(Shaders.shader_texture, Shaders.shader_blend_hardlight);
				this.shaderBlendDifference = this.createShader(Shaders.shader_texture, Shaders.shader_blend_difference);
				this.shaderBlendInvert = this.createShader(Shaders.shader_texture, Shaders.shader_blend_invert);
				this.shaderBlendAlpha = this.createShader(Shaders.shader_texture, Shaders.shader_blend_alpha);
				this.shaderBlendErase = this.createShader(Shaders.shader_texture, Shaders.shader_blend_erase);

				// filters
				this.shaderFilterBlur = this.createShader(Shaders.shader_filter_blur_vertex, Shaders.shader_filter_blur_fragment);
				this.shaderFilterGlow = this.createShader(Shaders.shader_filter_glow_vertex, Shaders.shader_filter_glow_fragment);
				this.shaderFilterBevel = this.createShader(Shaders.shader_filter_bevel_vertex, Shaders.shader_filter_bevel_fragment);
				this.shaderFilterColorMatrix = this.createShader(Shaders.shader_filter_color_matrix_vertex, Shaders.shader_filter_color_matrix_fragment);
			}
			createShader(vs, fs, definitions) {
				const program = this.compileProgram(vs, fs, definitions);
				return new Shader(this.gl, program);
			}
			compileProgram(vs, fs, definitions) {
				const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vs, definitions);
				const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fs, definitions);
				const program = this.gl.createProgram();
				if (!program) {
					throw new Error('Cannot create program');
				}
				this.gl.attachShader(program, vertexShader);
				this.gl.attachShader(program, fragmentShader);
				this.gl.linkProgram(program);
				if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
					const error = this.gl.getProgramInfoLog(program);
					this.gl.deleteProgram(program);
					throw new Error('Program compilation error: ' + error);
				}
				return program;
			}
			compileShader(type, source, definitions) {
				if (definitions) {
					for (const def of definitions) {
						source = '#define ' + def + '\n' + source;
					}
				}
				const shader = this.gl.createShader(type);
				if (!shader) {
					throw new Error('Cannot create shader');
				}
				this.gl.shaderSource(shader, source);
				this.gl.compileShader(shader);
				if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
					const error = this.gl.getShaderInfoLog(shader);
					this.gl.deleteShader(shader);
					throw new Error('Shader compilation error: ' + error);
				}
				return shader;
			}
		}
		Shaders.shader_texture = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;

	attribute vec2 position;

	varying vec2 frag_uv;

	void main() {
		frag_uv = vec2(u_matrix * vec3(position, 1.0));
		gl_Position = view_matrix * world_matrix * vec4(position, 0.0, 1.0);
	}`;
	Shaders.shader_bitmap = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;

	uniform sampler2D u_texture;

	varying vec2 frag_uv;

	void main() {
		vec4 color = texture2D(u_texture, frag_uv);

		// Unmultiply alpha before apply color transform.
		if( color.a > 0.0 ) {
			color.rgb /= color.a;
			color = clamp(mult_color * color + add_color, 0.0, 1.0);
			float alpha = clamp(color.a, 0.0, 1.0);
			color = vec4(color.rgb * alpha, alpha);
		}

		gl_FragColor = color;
	}`;
	Shaders.shader_copy = `
#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

uniform mat4 view_matrix;
uniform mat4 world_matrix;
uniform vec4 mult_color;
uniform vec4 add_color;
uniform mat3 u_matrix;

uniform sampler2D u_texture;

varying vec2 frag_uv;

void main() {
	gl_FragColor = texture2D(u_texture, frag_uv);
}`;
Shaders.shader_color_vertex = `
	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform vec4 u_color;

	attribute vec2 position;

	varying vec4 frag_color;

	void main() {
	  frag_color = clamp(u_color * mult_color + add_color, 0.0, 1.0);
	  float alpha = clamp(frag_color.a, 0.0, 1.0);
	  frag_color = vec4(frag_color.rgb * alpha, alpha);

	  gl_Position =  view_matrix * world_matrix * vec4(position, 0.0, 1.0);
	}`;
	Shaders.shader_color_fragment = `
	precision mediump float;

	varying vec4 frag_color;

	void main() {
	  gl_FragColor = frag_color;
	}`;
	Shaders.shader_gradient = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;

	uniform int u_gradient_type;
	uniform float u_ratios[16];
	uniform vec4 u_colors[16];
	uniform int u_repeat_mode;
	uniform float u_focal_point;
	uniform int u_interpolation;

	varying vec2 frag_uv;

	vec4 interpolate(float t, float ratio1, float ratio2, vec4 color1, vec4 color2) {
		color1 = clamp(mult_color * color1 + add_color, 0.0, 1.0);
		color2 = clamp(mult_color * color2 + add_color, 0.0, 1.0);
		float a = (t - ratio1) / (ratio2 - ratio1);
		return mix(color1, color2, a);
	}

	vec3 linear_to_srgb(vec3 linear) {
		vec3 a = 12.92 * linear;
		vec3 b = 1.055 * pow(linear, vec3(1.0 / 2.4)) - 0.055;
		vec3 c = step(vec3(0.0031308), linear);
		return mix(a, b, c);
	}

	void main() {
		float t;
		if( u_gradient_type == 0 )
		{
			t = frag_uv.x;
		}
		else if( u_gradient_type == 1 )
		{
			t = length(frag_uv * 2.0 - 1.0);
		}
		else if( u_gradient_type == 2 )
		{
			vec2 uv = frag_uv * 2.0 - 1.0;
			vec2 d = vec2(u_focal_point, 0.0) - uv;
			float l = length(d);
			d /= l;
			t = l / (sqrt(1.0 -  u_focal_point*u_focal_point*d.y*d.y) + u_focal_point*d.x);
		}
		if( u_repeat_mode == 0 )
		{
			// Clamp
			t = clamp(t, 0.0, 1.0);
		}
		else if( u_repeat_mode == 1 )
		{
			// Repeat
			t = fract(t);
		}
		else
		{
			// Mirror
			if( t < 0.0 )
			{
				t = -t;
			}

			if( int(mod(t, 2.0)) == 0 ) {
				t = fract(t);
			} else {
				t = 1.0 - fract(t);
			}
		}

		// TODO: No non-constant array access in WebGL 1, so the following is kind of painful.
		// We'd probably be better off passing in the gradient as a texture and sampling from there.
		vec4 color;
		if( t <= u_ratios[0] ) {
			color = clamp(mult_color * u_colors[0] + add_color, 0.0, 1.0);
		} else if( t <= u_ratios[1] ) {
			color = interpolate(t, u_ratios[0], u_ratios[1], u_colors[0], u_colors[1]);
		} else if( t <= u_ratios[2] ) {
			color = interpolate(t, u_ratios[1], u_ratios[2], u_colors[1], u_colors[2]);
		} else if( t <= u_ratios[3] ) {
			color = interpolate(t, u_ratios[2], u_ratios[3], u_colors[2], u_colors[3]);
		} else if( t <= u_ratios[4] ) {
			color = interpolate(t, u_ratios[3], u_ratios[4], u_colors[3], u_colors[4]);
		} else if( t <= u_ratios[5] ) {
			color = interpolate(t, u_ratios[4], u_ratios[5], u_colors[4], u_colors[5]);
		} else if( t <= u_ratios[6] ) {
			color = interpolate(t, u_ratios[5], u_ratios[6], u_colors[5], u_colors[6]);
		} else if( t <= u_ratios[7] ) {
			color = interpolate(t, u_ratios[6], u_ratios[7], u_colors[6], u_colors[7]);
		} else if( t <= u_ratios[8] ) {
			color = interpolate(t, u_ratios[7], u_ratios[8], u_colors[7], u_colors[8]);
		} else if( t <= u_ratios[9] ) {
			color = interpolate(t, u_ratios[8], u_ratios[9], u_colors[8], u_colors[9]);
		} else if( t <= u_ratios[10] ) {
			color = interpolate(t, u_ratios[9], u_ratios[10], u_colors[9], u_colors[10]);
		} else if( t <= u_ratios[11] ) {
			color = interpolate(t, u_ratios[10], u_ratios[11], u_colors[10], u_colors[11]);
		} else if( t <= u_ratios[12] ) {
			color = interpolate(t, u_ratios[11], u_ratios[12], u_colors[11], u_colors[12]);
		} else if( t <= u_ratios[13] ) {
			color = interpolate(t, u_ratios[12], u_ratios[13], u_colors[12], u_colors[13]);
		} else if( t <= u_ratios[14] ) {
			color = interpolate(t, u_ratios[13], u_ratios[14], u_colors[13], u_colors[14]);
		} else {
			color = clamp(mult_color * u_colors[14] + add_color, 0.0, 1.0);
		}

		if( u_interpolation != 0 ) {
			color = vec4(linear_to_srgb(vec3(color)), color.a);
		}

		float alpha = clamp(color.a, 0.0, 1.0);
		gl_FragColor = vec4(color.rgb * alpha, alpha);
	}`;

	//////// blend shaders ////////

	Shaders.shader_blend_normal = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			return src + dst - dst * src.a;
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_add = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			vec4 c = vec4(dst.rgb + src.rgb, dst.a + src.a);
			return mix(c, src, step(1.0, 0.0));
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_subtract = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			vec4 c = vec4(dst.rgb - src.rgb, dst.a + src.a);
			return mix(c, src, step(dst.a, 0.0));
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_multiply = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			vec4 a = src - src * dst.a;
			vec4 b = dst - dst * src.a;
			vec4 c = src * dst;
			return a + b + c;
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_lighten = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				src.rgb /= src.a;
				vec4 c = vec4(mix(dst.rgb, src.rgb, step(dst.rgb, src.rgb)), 1.0) * src.a;
				return c + dst * (1.0 - src.a);
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_darken = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (dst.a == 0.0) {
				return src;
			} else if (src.a > 0.0) {
				src.rgb /= src.a;
				vec4 c = vec4(mix(dst.rgb, src.rgb, step(src.rgb, dst.rgb)), 1.0) * src.a;
				return c + dst * (1.0 - src.a);
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_screen = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				vec4 _src = src;
				vec4 _dst = dst;
				_src.rgb /= src.a;
				_dst.rgb /= dst.a;
				vec4 _out = _src;
				_out.r = (1.0 - ((1.0 - _src.r) * (1.0 - _dst.r)));
				_out.g = (1.0 - ((1.0 - _src.g) * (1.0 - _dst.g)));
				_out.b = (1.0 - ((1.0 - _src.b) * (1.0 - _dst.b)));
				return vec4(src.rgb * (1.0 - dst.a) + dst.rgb * (1.0 - src.a) + src.a * dst.a * _out.rgb, src.a + dst.a * (1.0 - src.a));
			} else {
				return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_overlay = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D parent_texture;
		uniform sampler2D current_texture;

		varying vec2 frag_uv;

		void main() {
			vec4 dst = texture2D(parent_texture, frag_uv);
			vec4 src = texture2D(current_texture, frag_uv);
			if (src.a > 0.0) {
				vec4 _src = src;
				vec4 _dst = dst;
				_src.rgb /= src.a;
				_dst.rgb /= dst.a;
				vec4 _out = _src;
				if (_dst.r <= 0.5) { _out.r = (2.0 * _src.r * _dst.r); } else { _out.r = (1.0 - 2.0 * (1.0 - _dst.r) * (1.0 - _src.r)); }
				if (_dst.g <= 0.5) { _out.g = (2.0 * _src.g * _dst.g); } else { _out.g = (1.0 - 2.0 * (1.0 - _dst.g) * (1.0 - _src.g)); }
				if (_dst.b <= 0.5) { _out.b = (2.0 * _src.b * _dst.b); } else { _out.b = (1.0 - 2.0 * (1.0 - _dst.b) * (1.0 - _src.b)); }
				gl_FragColor = vec4(src.rgb * (1.0 - dst.a) + dst.rgb * (1.0 - src.a) + src.a * dst.a * _out.rgb, src.a + dst.a * (1.0 - src.a));
			} else {
				gl_FragColor = dst;
			}
		}`;
		Shaders.shader_blend_hardlight = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				vec4 _src = src;
				vec4 _dst = dst;
				_src.rgb /= src.a;
				_dst.rgb /= dst.a;
				vec4 _out = _src;
				if (_src.r <= 0.5) { _out.r = (2.0 * _src.r * _dst.r); } else { _out.r = (1.0 - 2.0 * (1.0 - _dst.r) * (1.0 - _src.r)); }
				if (_src.g <= 0.5) { _out.g = (2.0 * _src.g * _dst.g); } else { _out.g = (1.0 - 2.0 * (1.0 - _dst.g) * (1.0 - _src.g)); }
				if (_src.b <= 0.5) { _out.b = (2.0 * _src.b * _dst.b); } else { _out.b = (1.0 - 2.0 * (1.0 - _dst.b) * (1.0 - _src.b)); }
				_out.a = 1.0;
				return vec4(src.rgb * (1.0 - dst.a) + dst.rgb * (1.0 - src.a) + src.a * dst.a * _out.rgb, src.a + dst.a * (1.0 - src.a));
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_difference = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				return vec4(src.rgb * (1.0 - dst.a) + dst.rgb * (1.0 - src.a) + src.a * dst.a * (1.0 - dst.rgb / dst.a), src.a + dst.a * (1.0 - src.a));
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_invert = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D parent_texture;
		uniform sampler2D current_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				vec4 c = vec4(1.0 - dst.rgb, 1.0) * src.a;
				return c + dst * (1.0 - src.a);
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 dst = texture2D(parent_texture, frag_uv);
			vec4 src = texture2D(current_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_alpha = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D parent_texture;
		uniform sampler2D current_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				return vec4(dst.rgb * src.a, src.a * dst.a);
			} else {
				return dst;
			}
		}

		void main() {
			vec4 dst = texture2D(parent_texture, frag_uv);
			vec4 src = texture2D(current_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		Shaders.shader_blend_erase = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D parent_texture;
		uniform sampler2D current_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				return vec4(dst.rgb * (1.0 - src.a), (1.0 - src.a) * dst.a);
			} else {
				return dst;
			}
		}

		void main() {
			vec4 dst = texture2D(parent_texture, frag_uv);
			vec4 src = texture2D(current_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;

		//////// filter shaders ////////
		Shaders.shader_filter_blur_vertex = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;
	uniform float u_dir_x;
	uniform float u_dir_y;
	uniform float u_full_size;
	uniform float u_m;
	uniform float u_m2;
	uniform float u_first_weight;
	uniform float u_last_offset;
	uniform float u_last_weight;

	attribute vec2 position;

	varying vec2 frag_uv;

	void main() {
		frag_uv = vec2(u_matrix * vec3(position, 1.0));
		vec2 direction = vec2(u_dir_x, u_dir_y);
		frag_uv -= direction * u_m;
		gl_Position = view_matrix * world_matrix * vec4(position, 0.0, 1.0);
	}`;
		Shaders.shader_filter_blur_fragment = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;
	uniform float u_dir_x;
	uniform float u_dir_y;
	uniform float u_full_size;
	uniform float u_m;
	uniform float u_m2;
	uniform float u_first_weight;
	uniform float u_last_offset;
	uniform float u_last_weight;

	uniform sampler2D u_texture;

	varying vec2 frag_uv;

	void main() {
		vec2 direction = vec2(u_dir_x, u_dir_y);
		vec4 total = vec4(0.0);
		total += texture2D(u_texture, frag_uv - direction) * u_first_weight;
		vec4 center = vec4(0.0);
		float i = 0.5;
		for (float _i = 0.0; _i < 512.0; _i += 1.0) {
			if (i >= u_m2) {
				break;
			}
			center += texture2D(u_texture, frag_uv + direction * i);
			i += 2.0;
		}
    	total += center * 2.0;
		vec2 last_location = frag_uv + direction * (u_m2 + u_last_offset);
		total += texture2D(u_texture, last_location) * u_last_weight;
   		vec4 result = total / u_full_size;
		gl_FragColor = floor(result * 255.0) / 255.0;
	}`;
	Shaders.shader_filter_glow_vertex = `
#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

uniform mat4 view_matrix;
uniform mat4 world_matrix;
uniform vec4 mult_color;
uniform vec4 add_color;
uniform mat3 u_matrix;
uniform vec4 u_color;
uniform float strength;
uniform int inner;
uniform int knockout;
uniform int composite_source;
uniform float u_dir_x;
uniform float u_dir_y;

attribute vec2 position;

varying vec2 frag_uv;

void main() {
	frag_uv = vec2(u_matrix * vec3(position, 1.0));
	gl_Position = view_matrix * world_matrix * vec4(position, 0.0, 1.0);
}`;
	Shaders.shader_filter_glow_fragment = `
#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

uniform mat4 view_matrix;
uniform mat4 world_matrix;
uniform vec4 mult_color;
uniform vec4 add_color;
uniform mat3 u_matrix;
uniform float strength;
uniform int inner;
uniform int knockout;
uniform int composite_source;
uniform float u_dir_x;
uniform float u_dir_y;
uniform vec4 u_color;

uniform sampler2D u_blurred;
uniform sampler2D u_texture;

varying vec2 frag_uv;

void main() {
	vec2 direction = vec2(u_dir_x, u_dir_y);
	vec2 blur_dir = frag_uv - direction;
	float blur = texture2D(u_texture, blur_dir).a;
	vec4 dest = texture2D(u_blurred, frag_uv);
	if (blur_dir.x < 0.0 || blur_dir.x > 1.0 || blur_dir.y < 0.0 || blur_dir.y > 1.0) {
        blur *= 0.0;
    }
	vec4 color = vec4(u_color.r, u_color.g, u_color.b, 1.0);
	if (inner > 0) {
		float alpha2 = u_color.a * ((1.0 - blur) * strength);
		if (alpha2 > 1.0) {
			alpha2 = 1.0;
		}
		if (alpha2 < 0.0) {
			alpha2 = 0.0;
		}
		if (knockout > 0) {
            color = color * alpha2 * dest.a;
        } else if (composite_source > 0) {
			color = color * alpha2 * dest.a + dest * (1.0 - alpha2);
		} else {
			color = color * alpha2 * dest.a;
		}
	} else {
		float alpha = u_color.a * (blur * strength);
		if (alpha > 1.0) {
			alpha = 1.0;
		}
		if (alpha < 0.0) {
			alpha = 0.0;
		}
		if (knockout > 0) {
			color = color * alpha * (1.0 - dest.a);
		} else if (composite_source > 0) {
			color = color * alpha * (1.0 - dest.a) + dest;
		} else {
			color = color * alpha;
		}
	}
	gl_FragColor = color;
}`;
Shaders.shader_filter_bevel_vertex = `
#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform mat4 view_matrix;
uniform mat4 world_matrix;
uniform vec4 mult_color;
uniform vec4 add_color;
uniform mat3 u_matrix;

uniform vec4 highlight_color;
uniform vec4 shadow_color;
uniform float strength;
uniform int bevel_type;
uniform int knockout;
uniform int composite_source;
uniform float u_dir_x;
uniform float u_dir_y;

attribute vec2 position;

varying vec2 frag_uv;

void main() {
	frag_uv = vec2(u_matrix * vec3(position, 1.0));
	gl_Position = view_matrix * world_matrix * vec4(position, 0.0, 1.0);
}`;
Shaders.shader_filter_bevel_fragment = `
#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform mat4 view_matrix;
uniform mat4 world_matrix;
uniform vec4 mult_color;
uniform vec4 add_color;
uniform mat3 u_matrix;

uniform vec4 highlight_color;
uniform vec4 shadow_color;
uniform float strength;
uniform int bevel_type;
uniform int knockout;
uniform int composite_source;
uniform float u_dir_x;
uniform float u_dir_y;

uniform sampler2D u_blurred;
uniform sampler2D u_texture;

varying vec2 frag_uv;

void main() {
	vec2 direction = vec2(u_dir_x, u_dir_y);
	vec2 direction2 = vec2(0.0 - u_dir_x, 0.0 - u_dir_y);
	vec2 blur_left_dir = frag_uv - direction2;
	vec2 blur_right_dir = frag_uv - direction;
	float blur_left = texture2D(u_texture, blur_left_dir).a;
	float blur_right = texture2D(u_texture, blur_right_dir).a;
	vec4 dest = texture2D(u_blurred, frag_uv);
	if (blur_left_dir.x < 0.0 || blur_left_dir.x > 1.0 || blur_left_dir.y < 0.0 || blur_left_dir.y > 1.0) {
		blur_left *= 0.0;
	}
	if (blur_right_dir.x < 0.0 || blur_right_dir.x > 1.0 || blur_right_dir.y < 0.0 || blur_right_dir.y > 1.0) {
		blur_right *= 0.0;
	}
	int outer = ((bevel_type == 0) || (bevel_type == 2)) ? 1 : 0;
	int inner = ((bevel_type == 1) || (bevel_type == 2)) ? 1 : 0;
	float highlight_alpha = (blur_left - blur_right) * strength;
    float shadow_alpha = (blur_right - blur_left) * strength;
	if (highlight_alpha > 1.0) {
		highlight_alpha = 1.0;
	}
	if (highlight_alpha < 0.0) {
		highlight_alpha = 0.0;
	}
	if (shadow_alpha > 1.0) {
		shadow_alpha = 1.0;
	}
	if (shadow_alpha < 0.0) {
		shadow_alpha = 0.0;
	}
    vec4 glow = (highlight_color * highlight_alpha) + (shadow_color * shadow_alpha);
	if ((inner > 0) && (outer > 0)) {
        if (knockout > 0) {
            gl_FragColor = glow;
        } else {
            gl_FragColor = dest - dest * glow.a + glow;
        }
    } else if (inner > 0) {
        if (knockout > 0) {
            gl_FragColor = glow * dest.a;
        } else {
            gl_FragColor = glow * dest.a + dest * (1.0 - glow.a);
        }
    } else {
        if (knockout > 0) {
            gl_FragColor = glow - glow * dest.a;
        } else {
            gl_FragColor = dest + glow - glow * dest.a;
        }
    }
}`;
Shaders.shader_filter_color_matrix_vertex = `
#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform mat4 view_matrix;
uniform mat4 world_matrix;
uniform vec4 mult_color;
uniform vec4 add_color;
uniform mat3 u_matrix;

uniform float r_to_r;
uniform float g_to_r;
uniform float b_to_r;
uniform float a_to_r;
uniform float r_extra;
uniform float r_to_g;
uniform float g_to_g;
uniform float b_to_g;
uniform float a_to_g;
uniform float g_extra;
uniform float r_to_b;
uniform float g_to_b;
uniform float b_to_b;
uniform float a_to_b;
uniform float b_extra;
uniform float r_to_a;
uniform float g_to_a;
uniform float b_to_a;
uniform float a_to_a;
uniform float a_extra;

attribute vec2 position;

varying vec2 frag_uv;

void main() {
	frag_uv = vec2(u_matrix * vec3(position, 1.0));
	gl_Position = view_matrix * world_matrix * vec4(position, 0.0, 1.0);
}`;
Shaders.shader_filter_color_matrix_fragment = `
#version 100

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform mat4 view_matrix;
uniform mat4 world_matrix;
uniform vec4 mult_color;
uniform vec4 add_color;
uniform mat3 u_matrix;

uniform float r_to_r;
uniform float g_to_r;
uniform float b_to_r;
uniform float a_to_r;
uniform float r_extra;
uniform float r_to_g;
uniform float g_to_g;
uniform float b_to_g;
uniform float a_to_g;
uniform float g_extra;
uniform float r_to_b;
uniform float g_to_b;
uniform float b_to_b;
uniform float a_to_b;
uniform float b_extra;
uniform float r_to_a;
uniform float g_to_a;
uniform float b_to_a;
uniform float a_to_a;
uniform float a_extra;

uniform sampler2D u_texture;

varying vec2 frag_uv;

void main() {
	vec4 src = texture2D(u_texture, frag_uv);
	vec4 color = vec4(
        clamp((r_to_r * src.r / src.a) + (g_to_r * src.g / src.a) + (b_to_r * src.b / src.a) + (a_to_r * src.a) + (r_extra / 255.0), 0.0, 1.0),
        clamp((r_to_g * src.r / src.a) + (g_to_g * src.g / src.a) + (b_to_g * src.b / src.a) + (a_to_g * src.a) + (g_extra / 255.0), 0.0, 1.0),
        clamp((r_to_b * src.r / src.a) + (g_to_b * src.g / src.a) + (b_to_b * src.b / src.a) + (a_to_b * src.a) + (b_extra / 255.0), 0.0, 1.0),
        clamp((r_to_a * src.r / src.a) + (g_to_a * src.g / src.a) + (b_to_a * src.b / src.a) + (a_to_a * src.a) + (a_extra / 255.0), 0.0, 1.0)
    );
    gl_FragColor = vec4(color.rgb * color.a, color.a);
}`;

		class Surface {
			constructor(renderer, w, h, useMultisample) {
				this.renderer = renderer;
				this.shaders = renderer.shaders;
				this.quatVao = renderer.quatVao;
				this.gl = this.renderer.gl;
				this.blendIndex = 0;
				this.maskStateDirty = true;
				this.maskState = 0;
				this.numMasks = 0;
				this.blendType = [];
				this.view_matrix = [
					1.0 / (w / 2.0), 0.0, 0.0, 0.0,
					0.0, 1.0 / (h / 2.0), 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					-1.0, -1.0, 0.0, 1.0
				];
				this.renderbuffer_width = w;
				this.renderbuffer_height = h;
				this.useMultisample = useMultisample;
				this.build_msaa_buffers();
			}
			build_msaa_buffers() {
				let framebuffer_texture = this.renderer.createTexture();
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.renderbuffer_width, this.renderbuffer_height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
				let stencil_renderbuffer = null;
				let render_framebuffer = null;
				let color_framebuffer = null;
				let color_renderbuffer = null;
				if (this.useMultisample) {
					render_framebuffer = this.gl.createFramebuffer();
					color_framebuffer = this.gl.createFramebuffer();
					color_renderbuffer = this.gl.createRenderbuffer();
					this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, color_renderbuffer);
					this.gl.renderbufferStorageMultisample(this.gl.RENDERBUFFER, this.renderer.msaa_sample_count, this.gl.RGBA8, this.renderbuffer_width, this.renderbuffer_height);
					stencil_renderbuffer = this.gl.createRenderbuffer();
					this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, stencil_renderbuffer);
					this.gl.renderbufferStorageMultisample(this.gl.RENDERBUFFER, this.renderer.msaa_sample_count, this.gl.STENCIL_INDEX8, this.renderbuffer_width, this.renderbuffer_height);
					this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, render_framebuffer);
					this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0,  this.gl.RENDERBUFFER, color_renderbuffer);
					this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.STENCIL_ATTACHMENT,  this.gl.RENDERBUFFER, stencil_renderbuffer);
					this.gl.bindTexture(this.gl.TEXTURE_2D, framebuffer_texture);
					this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, color_framebuffer);
					this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, framebuffer_texture, 0);
				} else {
					stencil_renderbuffer = this.renderer.createStencilRenderbuffer(this.renderbuffer_width, this.renderbuffer_height);
					render_framebuffer = this.renderer.createFramebuffer(framebuffer_texture, stencil_renderbuffer);	
				}
				this.gl.bindTexture(this.gl.TEXTURE_2D, null);
				this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
				var blend = [];
				this.msaa_buffers = {
					stencil_renderbuffer,
					render_framebuffer,
					framebuffer_texture,
					color_framebuffer,
					color_renderbuffer,
					// blend
					blend,
					blend_back: null
				};
			}
			delete(not_delete_texture) {
				if (this.msaa_buffers) {
					const gl = this.gl;
					if (this.msaa_buffers.color_framebuffer) gl.deleteFramebuffer(this.msaa_buffers.color_framebuffer);
					if (this.msaa_buffers.color_renderbuffer) gl.deleteRenderbuffer(this.msaa_buffers.color_renderbuffer);
					gl.deleteRenderbuffer(this.msaa_buffers.stencil_renderbuffer);
					gl.deleteFramebuffer(this.msaa_buffers.render_framebuffer);
					if (!not_delete_texture) gl.deleteTexture(this.msaa_buffers.framebuffer_texture);
					var bb = this.msaa_buffers.blend_back;
					if (bb) {
						gl.deleteFramebuffer(bb.framebuffer);
						gl.deleteTexture(bb.texture);		
					}
					for (let i = 0; i < this.msaa_buffers.blend.length; i++) {
						const a = this.msaa_buffers.blend[i];
						gl.deleteFramebuffer(a.framebuffer);
						gl.deleteTexture(a.texture);
					}
				}
			}
			createblendBuffer() {
				const gl = this.gl;
				let texture = gl.createTexture(); 
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.renderbuffer_width, this.renderbuffer_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
				let framebuffer = this.renderer.createFramebuffer(texture);
				return {
					framebuffer,
					texture
				}
			}
			getBlendShader(blendMode) {
				switch (blendMode) {
					case "add":
						return this.shaders.shaderBlendAdd;
					case "subtract":
						return this.shaders.shaderBlendSubtract;
					case "multiply":
						return this.shaders.shaderBlendMultiply;
					case "lighten":
						return this.shaders.shaderBlendLighten;
					case "darken":
						return this.shaders.shaderBlendDarken;
					case "screen":
						return this.shaders.shaderBlendScreen;
					case "overlay":
						return this.shaders.shaderBlendOverlay;
					case "hardlight":
						return this.shaders.shaderBlendHardlight;
					case "difference":
						return this.shaders.shaderBlendDifference;
					case "invert":
						return this.shaders.shaderBlendInvert;
					case "alpha":
						return this.shaders.shaderBlendAlpha;
					case "erase":
						return this.shaders.shaderBlendErase;
					case "layer":
						return this.shaders.shaderBlendNormal;
					default:
						return this.shaders.shaderBlendNormal;
				}
			}
			getBlendBack() {
				if (!this.msaa_buffers.blend_back) {
					this.msaa_buffers.blend_back = this.createblendBuffer();
				}
				return this.msaa_buffers.blend_back;
			}
			pushBlendMode(blendMode) {
				const gl = this.gl;
				if (this.maskState == 0) {
					if (this.blendIndex >= this.msaa_buffers.blend.length) {
						this.msaa_buffers.blend.push(this.createblendBuffer());
					}
					var blendShader = this.getBlendShader(blendMode);
					this.blendType.push(blendShader);
					var blendBuffer = this.msaa_buffers.blend[this.blendIndex];
					this.blendIndex++;
					gl.disable(gl.STENCIL_TEST);
					gl.colorMask(true, true, true, true);
					var renderTexture = this.getRenderTexture();
					gl.bindFramebuffer(gl.FRAMEBUFFER, blendBuffer.framebuffer);
					this.renderer.useShader(this.shaders.shaderCopy);
					this.shaders.shaderCopy.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
					this.shaders.shaderCopy.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
					this.shaders.shaderCopy.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
					this.renderer.bindVertexArray(this.quatVao);
					gl.bindTexture(gl.TEXTURE_2D, renderTexture);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.drawArrays(gl.TRIANGLES, 0, 12);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					gl.clearColor(0, 0, 0, 0);
					gl.stencilMask(0xff);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
				} else {
					this.blendType.push(null);
				}
			}
			popBlendMode() {
				const gl = this.gl;
				var blendShader = this.blendType.pop();
				if (blendShader) {
					this.blendIndex--;
					var blendBack = this.getBlendBack();
					var blendBuffer = this.msaa_buffers.blend[this.blendIndex];
					gl.disable(gl.STENCIL_TEST);
					gl.colorMask(true, true, true, true);
					var renderTexture = this.getRenderTexture();
					gl.bindFramebuffer(gl.FRAMEBUFFER, blendBack.framebuffer);
					this.renderer.useShader(this.shaders.shaderCopy);
					this.shaders.shaderCopy.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
					this.shaders.shaderCopy.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
					this.shaders.shaderCopy.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
					this.renderer.bindVertexArray(this.quatVao);
					gl.bindTexture(gl.TEXTURE_2D, renderTexture);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.drawArrays(gl.TRIANGLES, 0, 12);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					gl.clearColor(0, 0, 0, 0);
					gl.stencilMask(0xff);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
					this.renderer.useShader(blendShader);
					blendShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
					blendShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
					blendShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
					blendShader.uniform1i('parent_texture', 0);
					blendShader.uniform1i('current_texture', 1);
					this.renderer.bindVertexArray(this.quatVao);
					gl.bindTexture(gl.TEXTURE_2D, blendBuffer.texture);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.activeTexture(gl.TEXTURE1);
					gl.bindTexture(gl.TEXTURE_2D, blendBack.texture);
					gl.activeTexture(gl.TEXTURE1);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.activeTexture(gl.TEXTURE0);
					gl.drawArrays(gl.TRIANGLES, 0, 12);
					gl.bindFramebuffer(gl.FRAMEBUFFER, blendBuffer.framebuffer);
					gl.clear(gl.COLOR_BUFFER_BIT);
					gl.bindFramebuffer(gl.FRAMEBUFFER, blendBack.framebuffer);
					gl.clear(gl.COLOR_BUFFER_BIT);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
				}
			}
			setStencilState() {
				if (this.maskStateDirty) {
					switch(this.maskState) {
						case 0:
							this.gl.disable(this.gl.STENCIL_TEST);
							this.gl.colorMask(true, true, true, true);
							break;
						case 1:
							this.gl.enable(this.gl.STENCIL_TEST);
							this.gl.stencilFunc(this.gl.EQUAL, this.numMasks - 1, 0xff);
							this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.INCR);
							this.gl.colorMask(false, false, false, false);
							break;
						case 2:
							this.gl.enable(this.gl.STENCIL_TEST);
							this.gl.stencilFunc(this.gl.EQUAL, this.numMasks, 0xff);
							this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.KEEP);
							this.gl.colorMask(true, true, true, true);
							break;
						case 3:
							this.gl.enable(this.gl.STENCIL_TEST);
							this.gl.stencilFunc(this.gl.EQUAL, this.numMasks, 0xff);
							this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.DECR);
							this.gl.colorMask(false, false, false, false);
							break;
					}	
				}
			}
			getRenderTexture() {
				const gl = this.gl;
				if (this.useMultisample) {
					gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.msaa_buffers.color_framebuffer);
					gl.blitFramebuffer(0, 0, this.renderbuffer_width, this.renderbuffer_height, 0, 0, this.renderbuffer_width, this.renderbuffer_height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
				}
				return this.msaa_buffers.framebuffer_texture;
			}
			drawCommands(commands, clear) {
				this.blendType = [];
				this.blendIndex = 0;
				this.maskState = 0;
				this.numMasks = 0;
				this.maskStateDirty = true;
				const gl = this.gl;
				gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
				gl.viewport(0, 0, this.renderbuffer_width, this.renderbuffer_height);
				this.setStencilState();
				if (clear) {
					gl.clearColor(clear[0] / 255, clear[1] / 255, clear[2] / 255, clear[3]);
				} else {
					gl.clearColor(0, 0, 0, 0);
				}
				gl.stencilMask(0xff);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
				commands.execute(this);
				gl.disable(gl.STENCIL_TEST);
				gl.colorMask(true, true, true, true);
				var renderTexture = this.getRenderTexture();
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				return renderTexture;
			}
			// CommandHandler
			renderBitmap(imageInterval, transform, isSmoothed) {
				if (!imageInterval) return;
				var matrix = transform.matrix;
				var colorTransform = transform.colorTransform;
				matrix = multiplicationMatrix(matrix, [imageInterval.width, 0, 0, imageInterval.height, 0, 0])
				let world_matrix = [
					matrix[0], matrix[1], 0.0, 0.0,
					matrix[2], matrix[3], 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					(matrix[4] / 20), (matrix[5] / 20), 0.0, 1.0,
				];
				this.setStencilState();
				this.renderer.useShader(this.shaders.shaderTexture);
				this.shaders.shaderTexture.uniformMatrix4("view_matrix", this.view_matrix);
				this.shaders.shaderTexture.uniformMatrix4("world_matrix", world_matrix);
				this.shaders.shaderTexture.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
				this.shaders.shaderTexture.uniform4f('mult_color', colorTransform[0], colorTransform[1], colorTransform[2], colorTransform[3]);
				this.shaders.shaderTexture.uniform4f('add_color', colorTransform[4] / 255, colorTransform[5] / 255, colorTransform[6] / 255, colorTransform[7] / 255);
				this.renderer.bindVertexArray(this.quatVao);
				let filter = isSmoothed ? this.gl.LINEAR : this.gl.NEAREST;
				this.gl.bindTexture(this.gl.TEXTURE_2D, imageInterval.texture);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, filter);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, filter);
				let wrap = this.gl.CLAMP_TO_EDGE;
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap);
				this.gl.drawArrays(this.gl.TRIANGLES, 0, 12);
			}
			renderShape(shapeInterval, transform) {
				if (!shapeInterval) return;
				var matrix = transform.matrix;
				var colorTransform = transform.colorTransform;
				var array = shapeInterval.shapeIntervalData;
				this.setStencilState();
				let world_matrix = [
					matrix[0], matrix[1], 0.0, 0.0,
					matrix[2], matrix[3], 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					(matrix[4] / 20), (matrix[5] / 20), 0.0, 1.0,
				];
				for (let i = 0; i < array.length; i++) {
					const si = array[i];
					var shader;
					if (si.type == 0) {
						shader = this.shaders.shaderColor;
					} else if (si.type == 1) {
						shader = this.shaders.shaderGradient;
					} else if (si.type == 2) {
						shader = this.shaders.shaderTexture;
					}
					this.renderer.useShader(shader);
					this.renderer.bindVertexArray(si.vao);
					if (si.type == 0) {
						shader.uniform4f("u_color", si.color[0], si.color[1], si.color[2], si.color[3]);
					} else if (si.type == 1) {
						shader.uniformMatrix3("u_matrix", si.matrix);
						shader.uniform1fv("u_ratios[0]", si.ratios);
						shader.uniform4fv("u_colors[0]", si.colors);
						shader.uniform1i("u_gradient_type", si.isRadial ? 2 : 0);
						shader.uniform1i("u_repeat_mode", si.repeat);
						shader.uniform1f("u_focal_point", si.focal);
						shader.uniform1i("u_interpolation", 0);
					} else if (si.type == 2) {
						let filter = si.isSmoothed ? this.gl.LINEAR : this.gl.NEAREST;
						this.gl.bindTexture(this.gl.TEXTURE_2D, si.texture);
						this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, filter);
						this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, filter);
						let wrap = si.isRepeating ? this.gl.REPEAT : this.gl.CLAMP_TO_EDGE;
						this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap);
						this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap);
						shader.uniformMatrix3("u_matrix", si.matrix);
					}
					shader.uniformMatrix4("view_matrix", this.view_matrix);
					shader.uniformMatrix4("world_matrix", world_matrix);
					shader.uniform4f('mult_color', colorTransform[0], colorTransform[1], colorTransform[2], colorTransform[3]);
					shader.uniform4f('add_color', colorTransform[4] / 255, colorTransform[5] / 255, colorTransform[6] / 255, colorTransform[7] / 255);
					this.gl.drawArrays(this.gl.TRIANGLES, 0, si.num);
				}
			}
			drawRect(color, matrix) {
				let world_matrix = [
					matrix[0], matrix[1], 0.0, 0.0,
					matrix[2], matrix[3], 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					(matrix[4] / 20), (matrix[5] / 20), 0.0, 1.0,
				];
				this.setStencilState();
				var shaderColor = this.shaders.shaderColor;
				this.renderer.useShader(shaderColor);
				this.renderer.bindVertexArray(this.renderer.quatVao);
				shaderColor.uniform4f("u_color", color[0] / 255, color[1] / 255, color[2] / 255, color[3]);
				shaderColor.uniformMatrix4("view_matrix", this.view_matrix);
				shaderColor.uniformMatrix4("world_matrix", world_matrix);
				shaderColor.uniform4f('mult_color', 1, 1, 1, 1);
				shaderColor.uniform4f('add_color', 0, 0, 0, 0);
				this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
			}
			pushMask() {
				this.numMasks += 1;
				this.maskState = 1;
				this.maskStateDirty = true;
			}
			activateMask() {
				this.maskState = 2;
				this.maskStateDirty = true;
			}
			deactivateMask() {
				this.maskState = 3;
				this.maskStateDirty = true;
			}
			popMask() {
				this.numMasks -= 1;
				if (this.numMasks == 0) {
					this.maskState = 0;
				} else {
					this.maskState = 2;
				}
				this.maskStateDirty = true;
			}
			blend(commands, blendMode) {
				this.pushBlendMode(blendMode);
				commands.execute(this);
				this.popBlendMode();
			}
		}
		function isMobileOrTablet() {
			if (window) {
				return ("orientation" in window);
			}
			return false;
		}
		class RenderWebGL {
			constructor() {
				const canvas = document.createElement('canvas');
				canvas.width = 480;
				canvas.height = 360;
				var options = {
					stencil: true,
					alpha: true,
					antialias: false,
					depth: false,
					failIfMajorPerformanceCaveat: true,
					premultipliedAlpha: true
				}
				var vao_ext;
				var isGL2;
				var msaa_sample_count;
				var gl = canvas.getContext('webgl2', options);
				if (gl) {
					msaa_sample_count = isMobileOrTablet() ? 2 : 4;
					var max_samples = gl.getParameter(gl.MAX_SAMPLES);
					if (max_samples != null) {
						max_samples = (max_samples || 0) >>> 0;
						if (max_samples > 0 && max_samples < msaa_sample_count) {
							msaa_sample_count = max_samples;
						}
					}
					isGL2 = true;
					vao_ext = null;
				} else {
					isGL2 = false;
					options.antialias = true;
					gl = canvas.getContext('webgl', options);
					if (gl) {
						vao_ext = gl.getExtension("OES_vertex_array_object");
						if (!vao_ext) {
							throw new Error("VAO extension not found");
						}
						msaa_sample_count = 1;
					} else {
						throw new Error("Couldn't create GL context");
					}
				}
				this.isGL2 = isGL2;
				this.useMultisample = true;
				this.canvas = canvas;
				this.gl = gl;
				this.msaa_sample_count = msaa_sample_count;
				this.vao_ext = vao_ext;
				this.shaders = new Shaders(this.gl);
				this.gl.enable(this.gl.BLEND);
				this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
				this.quatVao = this.buildQuadMesh();
				this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD);
				this.gl.blendFuncSeparate(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
				this.surface = null;
				this.resize(480, 360);
			}
			createStencilRenderbuffer(width, height) {
				const gl = this.gl;
				const stencilBuffer = gl.createRenderbuffer();
				if (!stencilBuffer)
					throw new Error('Cannot create rendebuffer');
				gl.bindRenderbuffer(gl.RENDERBUFFER, stencilBuffer);
				gl.renderbufferStorage(gl.RENDERBUFFER, gl.STENCIL_INDEX8, width, height);
				return stencilBuffer;
			}
			createFramebuffer(texture, stencil) {
				const gl = this.gl;
				let framebuffer = gl.createFramebuffer();
				gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
				if (stencil) {
					gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, stencil);
				}
				return framebuffer;
			}
			buildQuadMesh() {
				const gl = this.gl;
				var quatVao = this.createVertexArray();
				var quatBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, quatBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
				gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray(0);
				this.bindVertexArray(null);
				return quatVao;
			}
			createTexture(filtering = this.gl.NEAREST) {
				const texture = this.gl.createTexture();
				this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, filtering);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, filtering);
				return texture;
			}
			useShader(shader) {
				if (this.currentShader !== shader) {
					this.gl.useProgram(shader.program);
					this.currentShader = shader;
				}
			}
			shapeToInterval(shapeCache, library) {
				var result = [];
				for (let i = 0; i < shapeCache.length; i++) {
					var shape = shapeCache[i];
					var fill = shape.fill;
					var r = (shape.type == 1) ? this.createStroke(shape.path2d, Math.max(shape.width / 20, 1)) : this.createFill(shape.path2d);
					var num = r.length / 2;
					var vao = this.createVertexArray();
					var bufferPos = this.gl.createBuffer();
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferPos);
					this.gl.bufferData(this.gl.ARRAY_BUFFER, r, this.gl.STATIC_DRAW);
					this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
					this.gl.enableVertexAttribArray(0);
					if (fill.type == 0) {
						var color = fill.color;
						result.push({
							type: 0,
							color: [color[0] / 255, color[1] / 255, color[2] / 255, color[3]],
							num,
							vao
						});
					} else if (fill.type == 1) {
						var ratios = [];
						var colors = [];
						var re = fill.records;
						for (let i = 0; i < 16; i++) {
							const g = re[Math.min(i, re.length - 1)];
							colors.push(g[0][0] / 255);
							colors.push(g[0][1] / 255);
							colors.push(g[0][2] / 255);
							colors.push(g[0][3]);
							ratios.push(g[1]);
						}
						result.push({
							type: 1,
							num,
							ratios,
							colors,
							focal: fill.focal || 0,
							isRadial: fill.isRadial,
							repeat: fill.repeat,
							matrix: swf_to_gl_matrix(fill.matrix),
							vao
						});
					} else if (fill.type == 2) {
						var id = fill.id;
						var bitmap = library.getBitmap(id);
						var texture = bitmap.getTexture(this);
						result.push({
							type: 2,
							num,
							texture: texture.texture,
							isRepeating: fill.isRepeating,
							isSmoothed: fill.isSmoothed,
							matrix: swf_bitmap_to_gl_matrix(fill.matrix, texture.width, texture.height),
							vao
						});
					}
					this.bindVertexArray(null);
				}
				return new RenderWebGLShapeInterval(this, result);
			}
			allowMultisample() {
				return (this.isGL2 && (this.msaa_sample_count >= 2)) && this.useMultisample;
			}
			submitFrame(clear, commands, cache_entries) {
				const gl = this.gl;
				// for like: (Ruffle WebGL) Bitmap caching is unavailable on the webgl backend
				if (cache_entries.length) {
					for (let i = 0; i < cache_entries.length; i++) {
						const entry = cache_entries[i];
						var texture = entry.handle;
						var filters = entry.filters;
						var surface = new Surface(this, texture.width, texture.height, this.checkFiltersSurfaceMultisamples(filters));
						var copyTexture = surface.drawCommands(entry.commands, entry.clear);
						surface.delete(true);
						var resultTexture = null;
						resultTexture = this.applyFilters(texture, filters, copyTexture);
						if (!resultTexture) resultTexture = copyTexture;
						if (texture.texture) this.gl.deleteTexture(texture.texture);
						texture.texture = resultTexture;
					}
				}
				var gfhf = this.surface.drawCommands(commands, clear);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.viewport(0, 0, this.canvas.width, this.canvas.height);
				this.useShader(this.shaders.shaderCopy);
				this.currentShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
				this.currentShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
				this.currentShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
				this.bindVertexArray(this.quatVao);
				gl.bindTexture(gl.TEXTURE_2D, gfhf);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.drawArrays(gl.TRIANGLES, 0, 12);
			}
			checkFiltersSurfaceMultisamples(filters) {
				var result = true;
				for (let i = 0; i < filters.length; i++) {
					const filter = filters[i];
					switch(filter.type) {
						case "blur":
							if ((filter.blurX <= 3) || (filter.blurY <= 3)) {
								result = false;
							}
							break;
					}
				}
				return result && (filters.length <= 1) && this.allowMultisample();
			}
			applyFilters(texture, filters, _in) {
				const gl = this.gl;
				var h = _in;
				var result = null;
				for (let i = 0; i < filters.length; i++) {
					const filter = filters[i];
					var res = null;
					switch(filter.type) {
						case "blur":
							res = this.applyBlurFilter(texture, filter, h);
							break;
						case "glow":
							res = this.applyGlowFilter(texture, filter, h, 0, 0);
							break;
						case "drop_shadow":
							res = this.applyDropShadowFilter(texture, filter, h);
							break;
						case "bevel":
							res = this.applyBevelFilter(texture, filter, h);
							break;
						case "color_matrix":
							res = this.applyColorMatrixFilter(texture, filter, h);
							break;
					}
					if (res) {
						if (h) gl.deleteTexture(h);
						result = res;
						h = res;
					}
				}
				return result;
			}
			applyBlurFilter(texture, filter, _in) {
				const gl = this.gl;
				var filterShader = this.shaders.shaderFilterBlur;
				var flipTexture = this.createTexture();
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
				var flipFrameBuffer = this.createFramebuffer(flipTexture);
				var flopTexture = this.createTexture();
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
				var flopFrameBuffer = this.createFramebuffer(flopTexture);
				var first = true;
				for (let _ = 0; _ < filter.passes; _++) {
					if (_ >= 3) break;
					for (let i = 0; i < 2; i++) {
						var horizontal = (i % 2) == 0;
						var strength = horizontal ? filter.blurX : filter.blurY;
						var full_size = Math.min(strength, 255);
						if (full_size <= 1.0) continue;
						var previous_view = null;
						if (first) {
							first = false;
							previous_view = _in;
						} else {
							previous_view = flipTexture;
						}
						var radius = (full_size - 1.0) / 2.0;
						var m = Math.ceil(radius) - 1.0;
						var alpha = Math.floor((radius - m) * 255.0) / 255.0;
						var last_offset = 1.0 / ((1.0 / alpha) + 1.0);
						var last_weight = alpha + 1.0;
						this.gl.bindFramebuffer(gl.FRAMEBUFFER, flopFrameBuffer);
						gl.clear(gl.COLOR_BUFFER_BIT);
						gl.viewport(0, 0, texture.width, texture.height);
						this.useShader(filterShader);
						filterShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
						filterShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
						filterShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
						filterShader.uniform1f("u_m", m);
						filterShader.uniform1f("u_m2", m * 2.0);
						filterShader.uniform1f("u_dir_x", horizontal ? (1 / texture.width) : 0);
						filterShader.uniform1f("u_dir_y", horizontal ? 0 : (1 / texture.height));
						filterShader.uniform1f("u_full_size", full_size);
						filterShader.uniform1f("u_first_weight", alpha);
						filterShader.uniform1f("u_last_offset", last_offset);
						filterShader.uniform1f("u_last_weight", last_weight);
						this.bindVertexArray(this.quatVao);
						this.gl.bindTexture(this.gl.TEXTURE_2D, previous_view);
						gl.drawArrays(gl.TRIANGLES, 0, 12);
						var _00 = flipTexture;
						var _01 = flipFrameBuffer;
						var _10 = flopTexture;
						var _11 = flopFrameBuffer;
						flipTexture = _10;
						flipFrameBuffer = _11;
						flopTexture = _00;
						flopFrameBuffer = _01;
					}
				}
				if (first) {
					this.gl.deleteTexture(flipTexture);
					this.gl.deleteFramebuffer(flipFrameBuffer);
					this.gl.deleteTexture(flopTexture);
					this.gl.deleteFramebuffer(flopFrameBuffer);
					return null;
				} else {
					this.gl.deleteFramebuffer(flipFrameBuffer);
					this.gl.deleteTexture(flopTexture);
					this.gl.deleteFramebuffer(flopFrameBuffer);
					return flipTexture;
				}
			}
			applyGlowFilter(texture, filter, _in, dir_x, dir_y) {
				const gl = this.gl;
				var isInner = !!filter.is_inner;
				var is_knockout = !!filter.is_knockout;
				var is_composite_source = !!filter.composite_source;
				var filterShader = this.shaders.shaderFilterGlow;
				var txt = this.applyBlurFilter(texture, filter.innerBlurFilter(), _in);
				if (!txt) txt = _in;
				var copyTexture2 = this.createTexture();
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
				var copyFramebuffer2 = this.createFramebuffer(copyTexture2);
				this.gl.bindFramebuffer(gl.FRAMEBUFFER, copyFramebuffer2);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.viewport(0, 0, texture.width, texture.height);
				this.useShader(filterShader);
				filterShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
				filterShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
				filterShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
				filterShader.uniform1i('u_texture', 0);
				filterShader.uniform1i('u_blurred', 1);
				filterShader.uniform4f("u_color", filter.color[0] / 255, filter.color[1] / 255, filter.color[2] / 255, filter.color[3]);
				filterShader.uniform1f("u_dir_x", (dir_x / texture.width));
				filterShader.uniform1f("u_dir_y", (dir_y / texture.height));
				filterShader.uniform1f("strength", filter.strength || 0);
				filterShader.uniform1i("inner", isInner ? 1 : 0);
				filterShader.uniform1i("knockout", is_knockout ? 1 : 0);
				filterShader.uniform1i("composite_source", is_composite_source ? 1 : 0);
				this.bindVertexArray(this.quatVao);
				this.gl.bindTexture(this.gl.TEXTURE_2D, txt);
				gl.activeTexture(gl.TEXTURE1);
				this.gl.bindTexture(this.gl.TEXTURE_2D, _in);
				gl.activeTexture(gl.TEXTURE0);
				gl.drawArrays(gl.TRIANGLES, 0, 12);
				this.gl.deleteFramebuffer(copyFramebuffer2);
				this.gl.deleteTexture(_in);
				this.gl.deleteTexture(txt);
				return copyTexture2;
			}
			applyBevelFilter(texture, filter, _in) {
				var dir_x = (Math.cos(filter.angle) * filter.distance);
				var dir_y = (Math.sin(filter.angle) * filter.distance);
				const gl = this.gl;
				var is_inner = !!filter.is_inner;
				var is_on_top = !!filter.is_on_top;
				var bevel_type = 0;
				if (is_on_top) {
					bevel_type = 2;
				} else if (is_inner) {
					bevel_type = 1;
				} else {
					bevel_type = 0;
				}
				var is_knockout = !!filter.is_knockout;
				var filterShader = this.shaders.shaderFilterBevel;
				var txt = this.applyBlurFilter(texture, filter.innerBlurFilter(), _in);
				if (!txt) txt = _in;
				var copyTexture2 = this.createTexture();
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
				var copyFramebuffer2 = this.createFramebuffer(copyTexture2);
				this.gl.bindFramebuffer(gl.FRAMEBUFFER, copyFramebuffer2);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.viewport(0, 0, texture.width, texture.height);
				this.useShader(filterShader);
				filterShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
				filterShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
				filterShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
				filterShader.uniform1i('u_texture', 0);
				filterShader.uniform1i('u_blurred', 1);
				var highlight_color = [filter.highlight_color[0] / 255, filter.highlight_color[1] / 255, filter.highlight_color[2] / 255, filter.highlight_color[3]];
				highlight_color[0] *= highlight_color[3];
				highlight_color[1] *= highlight_color[3];
				highlight_color[2] *= highlight_color[3];
				var shadow_color = [filter.shadow_color[0] / 255, filter.shadow_color[1] / 255, filter.shadow_color[2] / 255, filter.shadow_color[3]];
				shadow_color[0] *= shadow_color[3];
				shadow_color[1] *= shadow_color[3];
				shadow_color[2] *= shadow_color[3];
				filterShader.uniform4f("highlight_color", highlight_color[0], highlight_color[1], highlight_color[2], highlight_color[3]);
				filterShader.uniform4f("shadow_color", shadow_color[0], shadow_color[1], shadow_color[2], shadow_color[3]);
				filterShader.uniform1f("u_dir_x", ((dir_x || 0) / texture.width));
				filterShader.uniform1f("u_dir_y", ((dir_y || 0) / texture.height));
				filterShader.uniform1f("strength", filter.strength || 0);
				filterShader.uniform1i("knockout", is_knockout ? 1 : 0);
				filterShader.uniform1i("bevel_type", bevel_type);
				this.bindVertexArray(this.quatVao);
				this.gl.bindTexture(this.gl.TEXTURE_2D, txt);
				gl.activeTexture(gl.TEXTURE1);
				this.gl.bindTexture(this.gl.TEXTURE_2D, _in);
				gl.activeTexture(gl.TEXTURE0);
				gl.drawArrays(gl.TRIANGLES, 0, 12);
				this.gl.deleteFramebuffer(copyFramebuffer2);
				this.gl.deleteTexture(_in);
				this.gl.deleteTexture(txt);
				return copyTexture2;
			}
			applyDropShadowFilter(texture, filter, _in) {
				var dir_x = (Math.cos(filter.angle) * filter.distance);
				var dir_y = (Math.sin(filter.angle) * filter.distance);
				return this.applyGlowFilter(texture, filter.innerGlowFilter(), _in, dir_x, dir_y);
			}
			applyColorMatrixFilter(texture, filter, _in) {
				const gl = this.gl;
				var filterShader = this.shaders.shaderFilterColorMatrix;
				var copyTexture = this.createTexture();
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, texture.width, texture.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
				var copyFramebuffer = this.createFramebuffer(copyTexture);
				this.gl.bindFramebuffer(gl.FRAMEBUFFER, copyFramebuffer);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.viewport(0, 0, texture.width, texture.height);
				this.useShader(filterShader);
				filterShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
				filterShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
				filterShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
				filterShader.uniform1f("r_to_r", filter.matrix[0]);
				filterShader.uniform1f("g_to_r", filter.matrix[1]);
				filterShader.uniform1f("b_to_r", filter.matrix[2]);
				filterShader.uniform1f("a_to_r", filter.matrix[3]);
				filterShader.uniform1f("r_extra", filter.matrix[4]);
				filterShader.uniform1f("r_to_g", filter.matrix[5]);
				filterShader.uniform1f("g_to_g", filter.matrix[6]);
				filterShader.uniform1f("b_to_g", filter.matrix[7]);
				filterShader.uniform1f("a_to_g", filter.matrix[8]);
				filterShader.uniform1f("g_extra", filter.matrix[9]);
				filterShader.uniform1f("r_to_b", filter.matrix[10]);
				filterShader.uniform1f("g_to_b", filter.matrix[11]);
				filterShader.uniform1f("b_to_b", filter.matrix[12]);
				filterShader.uniform1f("a_to_b", filter.matrix[13]);
				filterShader.uniform1f("b_extra", filter.matrix[14]);
				filterShader.uniform1f("r_to_a", filter.matrix[15]);
				filterShader.uniform1f("g_to_a", filter.matrix[16]);
				filterShader.uniform1f("b_to_a", filter.matrix[17]);
				filterShader.uniform1f("a_to_a", filter.matrix[18]);
				filterShader.uniform1f("a_extra", filter.matrix[19]);
				this.bindVertexArray(this.quatVao);
				this.gl.bindTexture(this.gl.TEXTURE_2D, _in);
				gl.drawArrays(gl.TRIANGLES, 0, 12);
				this.gl.deleteFramebuffer(copyFramebuffer);
				this.gl.deleteTexture(_in);
				return copyTexture;
			}
			createVertexArray() {
				if (this.vao_ext) {
					let vao = this.vao_ext.createVertexArrayOES();
					this.vao_ext.bindVertexArrayOES(vao);
					return vao;	
				} else {
					let vao = this.gl.createVertexArray();
					this.gl.bindVertexArray(vao);
					return vao;	
				}
			}
			bindVertexArray(vao) {
				if (this.vao_ext) {
					this.vao_ext.bindVertexArrayOES(vao);	
				} else {
					this.gl.bindVertexArray(vao);
				}
			}
			path2dToVex(path2d) {
				var arrs = [];
				var arr = [];
				var posX = 0;
				var posY = 0;
				for (let i = 0; i < path2d.length; i++) {
					const a = path2d[i];
					switch (a[0]) {
						case 0:
							arr = [(a[1] || 0) / 20, (a[2] || 0) / 20];
							arrs.push(arr);
							posX = a[1] || 0;
							posY = a[2] || 0;
							break;
						case 1:
							for (let _ = 1; _ <= 5; _++) {
								var x = QuadraticBezier(_ / 5, posX, a[1] || 0, a[3] || 0) | 0;
								var y = QuadraticBezier(_ / 5, posY, a[2] || 0, a[4] || 0) | 0;
								arr.push(x / 20, y / 20);
							}
							posX = a[3];
							posY = a[4];
							break;
						case 2:
							if (!(((a[1] || 0) == posX) && ((a[2] || 0) == posY))) {
								arr.push((a[1] || 0) / 20, (a[2] || 0) / 20);
								posX = a[1] || 0;
								posY = a[2] || 0;	
							}
							break;
					}
				}
				return arrs;
			}
			createFill(path2d) {
				return new Float32Array(AT_Tess.fill(this.path2dToVex(path2d)));
			}
			createStroke(path2d, width) {
				var arrs = this.path2dToVex(path2d);
				return new Float32Array(AT_Tess.stroke(arrs, width));
			}
			resetSurface() {
				if (this.surface) this.surface.delete(false);
				this.surface = new Surface(this, this.width, this.height, this.allowMultisample());
			}
			// RenderBackend
			destroy() {
				var ext = this.gl.getExtension("WEBGL_lose_context");
				if (ext) {
					ext.loseContext();
				}
			}
			setQuality(quality) {}
			is_offscreen_supported() {
				return true;
			}
			debugInfo() {
				var result = [];
				if (this.isGL2) {
					result.push("Renderer: WebGL 2.0");
				} else {
					result.push("Renderer: WebGL 1.0");
				}

				var add_line = function(name, val) {
					if (val) {
						result.push(name + ": " + (val ? val : "<unknown>"));
					}
				}
				
				var driver_info = this.gl.getExtension("WEBGL_debug_renderer_info");
				if (driver_info) add_line("Adapter Name", this.gl.getParameter(driver_info.UNMASKED_RENDERER_WEBGL));
				add_line("Adapter Vendor", this.gl.getParameter(this.gl.VENDOR));
				add_line("Adapter Renderer", this.gl.getParameter(this.gl.RENDERER));
				add_line("Adapter Version", this.gl.getParameter(this.gl.VERSION));

				result.push("Surface samples: x" + this.msaa_sample_count);
				result.push("Surface size: " + this.width + "x" + this.height);

				return result.join("\n");
			} 
			get name() {
				return "webgl";
			}
			resize(w, h) {
				this.width = w;
				this.height = h;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
				this.resetSurface();
			}
			registerShape(shapes, library) {
				return this.shapeToInterval(shapes, library);
			}
			createEmptyTexture(width, height) {
				var texture = this.createTexture(this.gl.LINEAR);
				return new RenderWebGLImageInterval(this, width, height, texture);
			}
			registerBitmap(image) {
				image.toRGBA();
				var texture = this.createTexture(this.gl.LINEAR);
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, image.width, image.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image.data);
				return new RenderWebGLImageInterval(this, image.width, image.height, texture);
			}
			updateTexture(handle, image) {
				const gl = this.gl;
				if (handle) {
					image.toRGBA();
					var texture = handle.texture;
					gl.bindTexture(gl.TEXTURE_2D, texture);
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image.data);
					handle.width = image.width;
					handle.height = image.height;
				}
			}
		}
		module.exports = RenderWebGL;
	},
	"./src/swf/avm1_reader.js": function(module, exports, __webpack_require__) {
		const ByteStream = __webpack_require__("./src/utils/byte_stream.js");
		
		class Avm1Reader {
			constructor(data) {
				this.byteStream = new ByteStream(data);
			}
			seek(offest) {
				this.byteStream.byte_offset += offest;
			}
			readAction() {
				let { opcode, length } = this.parseOpcodeAndLength();
				let startOffset = this.byteStream.byte_offset;
				let action = this.parseOpcode(opcode, length);
				action.opcode = opcode;
				if ((this.byteStream.byte_offset - startOffset) !== action.len) {
					console.log("Length mismatch in AVM1 action: ", opcode, ((this.byteStream.byte_offset - startOffset) + " = " + action.len));
					this.byteStream.byte_offset = startOffset + action.len;
				}
				return action;
			}
			parseOpcodeAndLength() {
				let opcode = this.byteStream.readUint8();
				let length = (opcode >= 0x80) ? this.byteStream.readUint16() : 0;
				return { opcode, length };
			}
			parseOpcode(opcode, length) {
				var action = {};
				var lenFix = length;
				switch (opcode) {
					case 0x00: // End
					case 0x04: // NextFrame
					case 0x05: // PreviousFrame
					case 0x06: // Play
					case 0x07: // Stop
					case 0x08: // ToggleQuality
					case 0x09: // StopSounds
					case 0x0A: // Add
					case 0x0B: // Subtract
					case 0x0C: // Multiply
					case 0x0D: // Divide
					case 0x0E: // Equals
					case 0x0F: // Less
					case 0x10: // And
					case 0x11: // Or
					case 0x12: // Not
					case 0x13: // StringEquals
					case 0x14: // StringLength
					case 0x15: // StringExtract

					case 0x17: // Pop
					case 0x18: // ToInteger

					case 0x1C: // GetVariable
					case 0x1D: // SetVariable

					case 0x20: // SetTarget2
					case 0x21: // StringAdd
					case 0x22: // GetProperty
					case 0x23: // SetProperty
					case 0x24: // CloneSprite
					case 0x25: // RemoveSprite
					case 0x26: // Trace
					case 0x27: // StartDrag
					case 0x28: // EndDrag
					case 0x29: // StringLess
					case 0x2A: // Throw
					case 0x2B: // CastOp
					case 0x2C: // ImplementsOp
					case 0x2D: // FsCommand2

					case 0x30: // RandomNumber
					case 0x31: // MBStringLength
					case 0x32: // CharToAscii
					case 0x33: // AsciiToChar
					case 0x34: // GetTime
					case 0x35: // MBStringExtract
					case 0x36: // MBCharToAscii
					case 0x37: // MBAsciiToChar

					case 0x3A: // Delete
					case 0x3B: // Delete2
					case 0x3C: // DefineLocal
					case 0x3D: // CallFunction
					case 0x3E: // Return
					case 0x3F: // Modulo
					case 0x40: // NewObject
					case 0x41: // DefineLocal2
					case 0x42: // InitArray
					case 0x43: // InitObject
					case 0x44: // TypeOf
					case 0x45: // TargetPath
					case 0x46: // Enumerate
					case 0x47: // Add2
					case 0x48: // Less2
					case 0x49: // Equals2
					case 0x4a: // ToNumber
					case 0x4b: // ToString
					case 0x4c: // PushDuplicate
					case 0x4d: // StackSwap
					case 0x4e: // GetMember
					case 0x4f: // SetMember
					case 0x50: // Increment
					case 0x51: // Decrement
					case 0x52: // CallMethod
					case 0x53: // NewMethod
					case 0x54: // InstanceOf
					case 0x55: // Enumerate2

					case 0x60: // BitAnd
					case 0x61: // BitOr
					case 0x62: // BitXor
					case 0x63: // BitLShift
					case 0x64: // BitRShift
					case 0x65: // BitURShift
					case 0x66: // StrictEquals
					case 0x67: // Greater
					case 0x68: // StringGreater
					case 0x69: // Extends

					case 0x9E: // Call
						break;
					case 0x81: // GotoFrame
						action.frame = this.byteStream.readUint16();
						break;
					case 0x83: // GetUrl
						action.url = this.byteStream.readStringWithUntil();
						action.target = this.byteStream.readStringWithUntil();
						break;
					case 0x87: // StoreRegister
						action.register = this.byteStream.readUint8();
						break;
					case 0x88: // ConstantPool
						var count = this.byteStream.readUint16();
						var strings = [];
						if (count > 0) {
							while (count--) {
								strings.push(this.byteStream.readStringWithUntil());
							}
						}
						action.strings = strings;
						break;
					case 0x8A: // WaitForFrame
						action.frame = this.byteStream.readUint16();
						action.numActionsToSkip = this.byteStream.readUint8();
						break;
					case 0x8B: // SetTarget
						action.target = this.byteStream.readStringWithUntil();
						break;
					case 0x8C: // GotoLabel
						action.label = this.byteStream.readStringWithUntil();
						break;
					case 0x8D: // WaitForFrame2
						action.numActionsToSkip = this.byteStream.readUint8();
						break;
					case 0x8E: // DefineFunction2
						var name = this.byteStream.readStringWithUntil();
						var numParams = this.byteStream.readUint16();
						var registerCount = this.byteStream.readUint8();
						var flags = this.byteStream.readUint16();
						var params = [];
						while (numParams--) {
							params.push({
								registerIndex: this.byteStream.readUint8(),
								name: this.byteStream.readStringWithUntil()
							});
						}
						var codeLength = this.byteStream.readUint16();
						action.name = name;
						action.params = params;
						action.registerCount = registerCount;
						action.preloadThis = flags & 1;
						action.suppressThis = (flags >>> 1) & 1;
						action.preloadArguments = (flags >>> 2) & 1;
						action.suppressArguments = (flags >>> 3) & 1;
						action.preloadSuper = (flags >>> 4) & 1;
						action.suppressSuper = (flags >>> 5) & 1;
						action.preloadRoot = (flags >>> 6) & 1;
						action.preloadParent = (flags >>> 7) & 1;
						action.preloadGlobal = (flags >>> 8) & 1;
						action.actions = this.byteStream.readBytes(codeLength);
						lenFix += codeLength;
						break;
					case 0x8F: // Try
						if (length < 7) {
							action.tryBody = [];
						} else {
							var flags = this.byteStream.readUint8();
							let trySize = this.byteStream.readUint16();
							let catchSize = this.byteStream.readUint16();
							let finallySize = this.byteStream.readUint16();
							var catchVar;
							if ((flags >>> 2) & 1) {
								catchVar = this.byteStream.readUint8();
							} else {
								catchVar = this.byteStream.readStringWithUntil();
							}
							var tryBody = this.byteStream.readBytes(trySize);
							var catchBody = this.byteStream.readBytes(catchSize);
							var finallyBody = this.byteStream.readBytes(finallySize);
							action.catchVar = catchVar;
							action.tryBody = tryBody;
							if (flags & 1) {
								action.catchBody = catchBody;
							}
							if ((flags >>> 1) & 1) {
								action.finallyBody = finallyBody;
							}
							lenFix += (trySize + catchSize + finallySize);
						}
						break;
					case 0x94: // With
						var codeLength = this.byteStream.readUint16();
						action.actions = this.byteStream.readBytes(codeLength);
						lenFix += codeLength;
						break;
					case 0x96: // Push
						var startOffset = this.byteStream.byte_offset;
						var values = [];
						while (this.byteStream.byte_offset < (startOffset + length)) {
							var value;
							var type = this.byteStream.readUint8();
							switch (type) {
								case 0: // String
									value = this.byteStream.readStringWithUntil();
									break;
								case 1: // Float
									value = this.byteStream.readFloat32();
									break;
								case 2: // Null
									value = null;
									break;
								case 3: // Undefined
									value = undefined;
									break;
								case 4: // Register
									value = this.byteStream.readUint8();
									break;
								case 5: // Boolean
									value = (this.byteStream.readUint8() != 0);
									break;
								case 6: // Double
									value = this.byteStream.readFloat64();
									break;
								case 7: // Int
									value = this.byteStream.readInt32();
									break;
								case 8: // ConstantPool
									value = this.byteStream.readUint8();
									break;
								case 9: // ConstantPool
									value = this.byteStream.readUint16();
									break;
								default:
									console.log("Invalid value type: " + type + " in ActionPush");
							}
							values.push({
								type: type,
								value: value
							});
						}
						action.values = values;
						break;
					case 0x99: // Jump
						action.offset = this.byteStream.readInt16();
						break;
					case 0x9A: // GetUrl2
						action.loadVariablesFlag = this.byteStream.readUB(1); // 0=none, 1=LoadVariables
						action.loadTargetFlag = this.byteStream.readUB(1); // 0=web, 1=Sprite
						this.byteStream.readUB(4); // Reserved
						action.sendVarsMethod = this.byteStream.readUB(2); // 0=NONE, 1=GET, 2=POST
						this.byteStream.byteAlign();
						break;
					case 0x9B: // DefineFunction
						var name = this.byteStream.readStringWithUntil();
						var count = this.byteStream.readUint16();
						var params = [];
						if (count > 0) {
							while (count--) {
								params.push(this.byteStream.readStringWithUntil());
							}
						}
						var codeLength = this.byteStream.readUint16();
						action.name = name;
						action.params = params;
						action.actions = this.byteStream.readBytes(codeLength);
						lenFix += codeLength;
						break;
					case 0x9D: // If
						action.offset = this.byteStream.readInt16();
						break;
					case 0x9F: // GotoFrame2
						var flags = this.byteStream.readUint8();
						action.setPlaying = flags & 0b1 != 0;
						action.sceneOffset = ((flags & 0b10) != 0) ? this.byteStream.readUint16() : 0;
						break;
					default:
						console.log("Unknown AVM1 opcode: " + opcode);
						this.byteStream.byte_offset += length;
				}
				action.len = lenFix;
				return action;
			}
		}
		module.exports = Avm1Reader;
	},
	"./src/swf/swf_input.js": function(module, exports, __webpack_require__) {
		const ByteStream = __webpack_require__("./src/utils/byte_stream.js");
		//! The data structures used in an Adobe SWF file.
		//!
		//! These structures are documented in the Adobe SWF File Format Specification

		class SwfInput {
			constructor(data, version) {
				this.byteStream = new ByteStream(data);
				this._swfVersion = version;
			}
			emitMessage(message, type) {
				console.log(type, message);
			}
			parseTagList() {
				var tags = [];
				while (true) {
					var tag = this.parseTag();
					if (tag.tagcode == 0) {
						break;
					}
					tags.push(tag);
				}
				return tags;
			}
			parseTag() {
				var { tagcode, length } = this.parseTagCodeLength();
				var result = this.parseTagWithCode(tagcode, length);
				result.tagcode = tagcode;
				result._byteLength = length;
				return result;
			}
			parseTagCodeLength() {
				var tagCodeAndLength = this.byteStream.readUint16();
				var tagcode = tagCodeAndLength >> 6;
				var length = (tagCodeAndLength & 0b111111);
				if (length == 0b111111) {
					// Extended tag.
					length = this.byteStream.readUint32();
				}
				return { tagcode, length };
			}
			parseTagWithCode(tagType, length) {
				var tagReader = new SwfInput(this.byteStream.readBytes(length));
				var byteStream = tagReader.byteStream;
				var obj = {};
				switch (tagType) {
					case 0: // End
					case 1: // ShowFrame
						break;
					case 2: // DefineShape
						obj = tagReader.parseDefineShape(1);
						break;
					case 22: // DefineShape2
						obj = tagReader.parseDefineShape(2);
						break;
					case 32: // DefineShape3
						obj = tagReader.parseDefineShape(3);
						break;
					case 83: // DefineShape4
						obj = tagReader.parseDefineShape(4);
						break;
					case 6: // DefineBits
						obj = tagReader.parseDefineBits(1, length);
						break;
					case 21: // DefineBitsJPEG2
						obj = tagReader.parseDefineBits(2, length);
						break;
					case 35: // DefineBitsJPEG3
						obj = tagReader.parseDefineBits(3, length);
						break;
					case 90: // DefineBitsJPEG4
						obj = tagReader.parseDefineBits(4, length);
						break;
					case 7: // DefineButton
						obj = tagReader.parseDefineButton(1, length);
						break;
					case 34: // DefineButton2
						obj = tagReader.parseDefineButton(2, length);
						break;
					case 10: // DefineFont
						obj = tagReader.parseDefineFont1(length);
						break;
					case 48: // DefineFont2
						obj = tagReader.parseDefineFont2(2, length);
						break;
					case 75: // DefineFont3
						obj = tagReader.parseDefineFont2(3, length);
						break;
					case 91: // DefineFont4
						obj = tagReader.parseDefineFont4(length);
						break;
					case 11: // DefineText
						obj = tagReader.parseDefineText(1);
						break;
					case 33: // DefineText2
						obj = tagReader.parseDefineText(2);
						break;
					case 13: // DefineFontInfo
						obj = tagReader.parseDefineFontInfo(1, length);
						break;
					case 62: // DefineFontInfo2
						obj = tagReader.parseDefineFontInfo(2, length);
						break;
					case 14: // DefineSound
						obj = tagReader.parseDefineSound(length);
						break;
					case 17: // DefineButtonSound
						obj = tagReader.parseDefineButtonSound();
						break;
					case 20: // DefineBitsLossless
						obj = tagReader.parseDefineBitsLossLess(1, length);
						break;
					case 36: // DefineBitsLossless2
						obj = tagReader.parseDefineBitsLossLess(2, length);
						break;
					case 23: // DefineButtonCxform
						obj = tagReader.parseDefineButtonCxform(length);
						break;
					case 37: // DefineEditText
						obj = tagReader.parseDefineEditText();
						break;
					case 39: // DefineSprite
						obj = tagReader.parseDefineSprite(length);
						break;
					case 46: // DefineMorphShape
						obj = tagReader.parseDefineMorphShape(1);
						break;
					case 84: // DefineMorphShape2
						obj = tagReader.parseDefineMorphShape(2);
						break;
					case 60: // DefineVideoStream
						obj = tagReader.parseDefineVideoStream();
						break;
					case 73: // DefineFontAlignZones
						obj = tagReader.parseDefineFontAlignZones(length);
						break;
					case 78: // DefineScalingGrid
						obj = tagReader.parseDefineScalingGrid();
						break;
					case 86: // DefineSceneAndFrameLabelData
						obj = tagReader.parseDefineSceneAndFrameLabelData();
						break;
					case 87: // DefineBinaryData
						obj = tagReader.parseDefineBinaryData(length);
						break;
					case 88: // DefineFontName
						obj = tagReader.parseDefineFontName();
						break;
					case 4: // PlaceObject
						obj = tagReader.parsePlaceObject(1, length);
						break;
					case 26: // PlaceObject2
						obj = tagReader.parsePlaceObject(2, length);
						break;
					case 70: // PlaceObject3
						obj = tagReader.parsePlaceObject(3, length);
						break;
					case 94: // PlaceObject4
						obj = tagReader.parsePlaceObject(4, length);
						break;
					case 5: // RemoveObject1
						obj = tagReader.parseRemoveObject(1);
						break;
					case 28: // RemoveObject2
						obj = tagReader.parseRemoveObject(2);
						break;
					case 8: // JpegTables
						obj.jpegtable = byteStream.readBytes(length);
						break;
					case 9: // SetBackgroundColor
						obj.rgb = tagReader.rgb();
						break;
					case 12: // DoAction
						obj = tagReader.parseDoAction(length);
						break;
					case 15: // StartSound
						obj = tagReader.parseStartSound(1);
						break;
					case 89: // StartSound2
						obj = tagReader.parseStartSound(2);
						break;
					case 18: // SoundStreamHead
						obj = tagReader.parseSoundStreamHead(1);
						break;
					case 45: // SoundStreamHead2
						obj = tagReader.parseSoundStreamHead(2);
						break;
					case 19: // SoundStreamBlock
						obj = tagReader.parseSoundStreamBlock(length);
						break;
					case 24: // Protect
						if (length > 0) {
							byteStream.readUint16(); // Reserved
							obj.data = byteStream.readBytes(length - 2);
						}
						break;
					case 40: // NameCharacter
						obj = tagReader.parseNameCharacter();
						break;
					case 41: // ProductInfo
						obj = tagReader.parseProductInfo();
						break;
					case 43: // FrameLabel
						obj = tagReader.parseFrameLabel(length);
						break;
					case 56: // ExportAssets
						obj = tagReader.parseExportAssets();
						break;
					case 57: // ImportAssets
						obj = tagReader.parseImportAssets(1);
						break;
					case 71: // ImportAssets2
						obj = tagReader.parseImportAssets(2);
						break;
					case 58: // EnableDebugger
						obj.debugger = byteStream.readStringWithUntil();
						break;
					case 64: // EnableDebugger2
						byteStream.readUint16(); // Reserved
						obj.debugger = byteStream.readStringWithUntil();
						break;
					case 59: // DoInitAction
						obj = tagReader.parseDoInitAction(length);
						break;
					case 61: // VideoFrame
						obj = tagReader.parseVideoFrame(length);
						break;
					case 63: // DebugID
						obj = tagReader.parseDebugID(length);
						break;
					case 65: // ScriptLimits
						obj.maxRecursionDepth = byteStream.readUint16();
						obj.timeoutSeconds = byteStream.readUint16();
						break;
					case 66: // SetTabIndex
						obj.depth = byteStream.readUint16();
						obj.tabIndex = byteStream.readUint16();
						break;
					case 69: // FileAttributes
						obj = tagReader.parseFileAttributes();
						break;
					case 72: // DoAbc
						obj = tagReader.parseDoABC(1, length);
						break;
					case 82: // DoAbc2
						obj = tagReader.parseDoABC(2, length);
						break;
					case 74: // CsmTextSettings
						obj = tagReader.parseCSMTextSettings();
						break;
					case 76: // SymbolClass
						obj = tagReader.parseSymbolClass();
						break;
					case 77: // Metadata
						obj.metadata = byteStream.readStringWithUntil();
						break;
					case 93: // EnableTelemetry
						byteStream.readUint16(); // Reserved
						if (length > 2) {
							obj.passwordHash = byteStream.readBytes(32);
						}
						break;
					case 38: // DefineVideo
					case 42: // DefineTextFormat
					case 44: // DefineBehavior
					case 50: // DefineCommandObject
					case 53: // DefineFunction
					case 3: // FreeCharacter
					case 16: // StopSound
					case 25: // PathsArePostScript
					case 29: // SyncFrame
					case 31: // FreeAll
					case 47: // FrameTag
					case 49: // GeProSet
					case 51: // CharacterSet
					case 52: // FontRef
					case 54: // PlaceFunction
					case 55: // GenTagObject
						console.log("[base] tagType -> " + tagType);
						break;
					case 27: // 27 (invalid)
					case 30: // 30 (invalid)
					case 67: // 67 (invalid)
					case 68: // 68 (invalid)
					case 79: // 79 (invalid)
					case 80: // 80 (invalid)
					case 81: // 81 (invalid)
					case 85: // 85 (invalid)
					case 92: // 92 (invalid)
						break;
					default: // null
						break;
				}
				return obj;
			}
			//////// color rect matrix ////////
			rect() {
				var byteStream = this.byteStream;
				byteStream.byteAlign();
				var nBits = byteStream.readUB(5);
				var obj = {};
				obj.xMin = byteStream.readSB(nBits);
				obj.xMax = byteStream.readSB(nBits);
				obj.yMin = byteStream.readSB(nBits);
				obj.yMax = byteStream.readSB(nBits);
				return obj;
			}
			rgb() {
				var byteStream = this.byteStream;
				return [byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8(), 1];
			}
			rgba() {
				var byteStream = this.byteStream;
				return [byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8() / 255];
			}
			colorTransform(hasAlpha) {
				var byteStream = this.byteStream;
				byteStream.byteAlign();
				var result = [1, 1, 1, 1, 0, 0, 0, 0];
				var first6bits = byteStream.readUB(6);
				var hasAddTerms = first6bits >> 5;
				var hasMultiTerms = (first6bits >> 4) & 1;
				var nbits = first6bits & 0x0f;
				if (hasMultiTerms) {
					result[0] = byteStream.readSBFixed8(nbits);
					result[1] = byteStream.readSBFixed8(nbits);
					result[2] = byteStream.readSBFixed8(nbits);
					if (hasAlpha) {
						result[3] = byteStream.readSBFixed8(nbits);
					}
				}
				if (hasAddTerms) {
					result[4] = byteStream.readSB(nbits);
					result[5] = byteStream.readSB(nbits);
					result[6] = byteStream.readSB(nbits);
					if (hasAlpha) {
						result[7] = byteStream.readSB(nbits);
					}
				}
				return result;
			}
			matrix() {
				var byteStream = this.byteStream;
				byteStream.byteAlign();
				var result = [1, 0, 0, 1, 0, 0];
				// Scale
				if (byteStream.readBit()) {
					var nScaleBits = byteStream.readUB(5);
					result[0] = byteStream.readSBFixed16(nScaleBits);
					result[3] = byteStream.readSBFixed16(nScaleBits);
				}
				// Rotate/Skew
				if (byteStream.readBit()) {
					var nRotateBits = byteStream.readUB(5);
					result[1] = byteStream.readSBFixed16(nRotateBits);
					result[2] = byteStream.readSBFixed16(nRotateBits);
				}
				// Translate (always present)
				var nTranslateBits = byteStream.readUB(5);
				result[4] = byteStream.readSB(nTranslateBits);
				result[5] = byteStream.readSB(nTranslateBits);
				return result;
			}
			//////// Structure ////////
			//////// Shapes ////////
			fillStyleArray(shapeVersion) {
				var byteStream = this.byteStream;
				var count = byteStream.readUint8();
				if ((shapeVersion >= 2) && (count == 0xff)) {
					count = byteStream.readUint16();
				}
				var fillStyles = [];
				while (count--) {
					fillStyles.push(this.fillStyle(shapeVersion));
				}
				return fillStyles;
			}
			gradient(shapeVersion) {
				var byteStream = this.byteStream;
				var matrix = this.matrix();
				var flags = byteStream.readUint8();
				var spreadMode = (flags >> 6) & 0b11;
				var interpolationMode = (flags >> 4) & 0b11;
				var numGradients = (flags & 0b1111);
				var records = [];
				for (var i = numGradients; i--;) {
					var ratio = byteStream.readUint8() / 255;
					var color = ((shapeVersion >= 3) ? this.rgba() : this.rgb());
					records.push({ ratio, color });
				}
				return {
					spreadMode,
					interpolationMode,
					records,
					matrix: matrix
				};
			}
			fillStyle(shapeVersion) {
				var byteStream = this.byteStream;
				var obj = {};
				var bitType = byteStream.readUint8();
				obj.type = bitType;
				switch (bitType) {
					case 0x00:
						if (shapeVersion >= 3) {
							obj.color = this.rgba();
						} else {
							obj.color = this.rgb();
						}
						break;
					case 0x10:
						obj.gradient = this.gradient(shapeVersion);
						break;
					case 0x12:
						obj.gradient = this.gradient(shapeVersion);
						break;
					case 0x13:
						// SWF19 says focal gradients are only allowed in SWFv8+ and DefineShape4,
						// but it works even in earlier tags (#2730).
						obj.gradient = this.gradient(shapeVersion);
						obj.focalPoint = byteStream.readFixed8();
						break;
					case 0x40:
					case 0x41:
					case 0x42:
					case 0x43:
						obj.bitmapId = byteStream.readUint16();
						obj.bitmapMatrix = this.matrix();
						// Bitmap smoothing only occurs in SWF version 8+.
						obj.isSmoothed = (this._swfVersion >= 8) && ((bitType & 0b10) == 0);
						obj.isRepeating = (bitType & 0b01) == 0;
						break;
					default:
						this.emitMessage("Invalid fill style: " + bitType, "error");
						break;
				}
				return obj;
			}
			lineStyleArray(shapeVersion) {
				var byteStream = this.byteStream;
				var count = byteStream.readUint8();
				if ((shapeVersion >= 2) && (count === 0xff)) {
					count = byteStream.readUint16();
				}
				var lineStyles = [];
				while (count--) {
					lineStyles.push(this.lineStyles(shapeVersion));
				}
				return lineStyles;
			}
			lineStyles(shapeVersion) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.width = byteStream.readUint16();
				if (shapeVersion == 4) {
					// LineStyle2 in DefineShape4
					obj.startCapStyle = byteStream.readUB(2);
					obj.joinStyle = byteStream.readUB(2);
					obj.hasFill = byteStream.readBit();
					obj.noHScale = byteStream.readBit();
					obj.noVScale = byteStream.readBit();
					obj.pixelHinting = byteStream.readBit();
					byteStream.readUB(5); // Reserved
					obj.noClose = byteStream.readBit();
					obj.endCapStyle = byteStream.readUB(2);
					if (obj.joinStyle === 2) {
						obj.miterLimitFactor = byteStream.readFixed8();
					}
					if (obj.hasFill) {
						obj.fillType = this.fillStyle(shapeVersion);
					} else {
						obj.color = this.rgba();
					}
				} else {
					// LineStyle1
					if (shapeVersion >= 3) {
						obj.color = this.rgba();
					} else {
						obj.color = this.rgb();
					}
				}
				return obj;
			}
			shapeRecords(shapeVersion, currentNumBits) {
				var byteStream = this.byteStream;
				var shapeRecords = [];
				while (true) {
					var first6Bits = byteStream.readUB(6);
					var shape = null;
					if (first6Bits & 0x20) {
						var numBits = first6Bits & 0b1111;
						if (first6Bits & 0x10) {
							shape = this.straightEdgeRecord(numBits);
						} else {
							shape = this.curvedEdgeRecord(numBits);
						}
					} else {
						if (first6Bits) {
							shape = this.styleChangeRecord(shapeVersion, first6Bits, currentNumBits);
						}
					}
					if (!shape) {
						byteStream.byteAlign();
						break;
					} else {
						shapeRecords.push(shape);
					}
				}
				return shapeRecords;
			}
			straightEdgeRecord(numBits) {
				var byteStream = this.byteStream;
				var deltaX = 0;
				var deltaY = 0;
				var GeneralLineFlag = byteStream.readBit();
				if (GeneralLineFlag) {
					deltaX = byteStream.readSB(numBits + 2);
					deltaY = byteStream.readSB(numBits + 2);
				} else {
					var VertLineFlag = byteStream.readBit();
					if (VertLineFlag) {
						deltaX = 0;
						deltaY = byteStream.readSB(numBits + 2);
					} else {
						deltaX = byteStream.readSB(numBits + 2);
						deltaY = 0;
					}
				}
				return {
					deltaX,
					deltaY,
					isCurved: false,
					isChange: false
				};
			}
			curvedEdgeRecord(numBits) {
				var byteStream = this.byteStream;
				var controlDeltaX = byteStream.readSB(numBits + 2);
				var controlDeltaY = byteStream.readSB(numBits + 2);
				var anchorDeltaX = byteStream.readSB(numBits + 2);
				var anchorDeltaY = byteStream.readSB(numBits + 2);
				return {
					controlDeltaX,
					controlDeltaY,
					anchorDeltaX,
					anchorDeltaY,
					isCurved: true,
					isChange: false
				};
			}
			styleChangeRecord(shapeVersion, changeFlag, currentNumBits) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.stateMoveTo = changeFlag & 1;
				obj.stateFillStyle0 = (changeFlag >> 1) & 1;
				obj.stateFillStyle1 = (changeFlag >> 2) & 1;
				obj.stateLineStyle = (changeFlag >> 3) & 1;
				obj.stateNewStyles = (changeFlag >> 4) & 1;
				if (obj.stateMoveTo) {
					var moveBits = byteStream.readUB(5);
					obj.moveX = byteStream.readSB(moveBits);
					obj.moveY = byteStream.readSB(moveBits);
				}
				obj.fillStyle0 = 0;
				if (obj.stateFillStyle0) {
					obj.fillStyle0 = byteStream.readUB(currentNumBits.fillBits);
				}
				obj.fillStyle1 = 0;
				if (obj.stateFillStyle1) {
					obj.fillStyle1 = byteStream.readUB(currentNumBits.fillBits);
				}
				obj.lineStyle = 0;
				if (obj.stateLineStyle) {
					obj.lineStyle = byteStream.readUB(currentNumBits.lineBits);
				}
				if (obj.stateNewStyles) {
					obj.fillStyles = this.fillStyleArray(shapeVersion);
					obj.lineStyles = this.lineStyleArray(shapeVersion);
					var numBits = byteStream.readUint8();
					currentNumBits.fillBits = obj.numFillBits = numBits >> 4;
					currentNumBits.lineBits = obj.numLineBits = numBits & 0b1111;
				}
				obj.isChange = true;
				return obj;
			}
			morphFillStyleArray(shapeVersion) {
				var byteStream = this.byteStream;
				var fillStyleCount = byteStream.readUint8();
				if ((shapeVersion >= 2) && (fillStyleCount == 0xff)) {
					fillStyleCount = byteStream.readUint16();
				}
				var fillStyles = [];
				for (var i = fillStyleCount; i--;) {
					fillStyles.push(this.morphFillStyle());
				}
				return fillStyles;
			}
			morphFillStyle() {
				var byteStream = this.byteStream;
				var obj = {};
				var bitType = byteStream.readUint8();
				obj.type = bitType;
				switch (bitType) {
					case 0x00:
						obj.startColor = this.rgba();
						obj.endColor = this.rgba();
						break;
					case 0x10:
						obj.gradient = this.morphGradient();
						break;
					case 0x12:
						obj.gradient = this.morphGradient();
						break;
					case 0x13:
						// SWF19 says focal gradients are only allowed in SWFv8+ and DefineMorphShape2,
						// but it works even in earlier tags (#2730).
						// TODO(Herschel): How is focal_point stored?
						obj.gradient = this.morphGradient();
						obj.startFocalPoint = byteStream.readFixed8();
						obj.endFocalPoint = byteStream.readFixed8();
						break;
					case 0x40:
					case 0x41:
					case 0x42:
					case 0x43:
						obj.bitmapId = byteStream.readUint16();
						obj.bitmapStartMatrix = this.matrix();
						obj.bitmapEndMatrix = this.matrix();
						obj.isSmoothed = (bitType & 0b10) == 0;
						obj.isRepeating = (bitType & 0b01) == 0;
						break;
					default:
						this.emitMessage("Invalid fill style: " + bitType, "error");
				}
				return obj;
			}
			morphGradient() {
				var obj = {};
				var byteStream = this.byteStream;
				obj.startMatrix = this.matrix();
				obj.endMatrix = this.matrix();
				var flags = byteStream.readUint8();
				obj.spreadMode = (flags >> 6) & 0b11;
				obj.interpolationMode = (flags >> 4) & 0b11;
				var numGradients = flags & 0b1111;
				var records = [];
				for (var i = numGradients; i--;) {
					records.push({
						startRatio: byteStream.readUint8() / 255,
						startColor: this.rgba(),
						endRatio: byteStream.readUint8() / 255,
						endColor: this.rgba()
					});
				}
				obj.records = records;
				return obj;
			}
			morphLineStyleArray(shapeVersion) {
				var byteStream = this.byteStream;
				var lineStyleCount = byteStream.readUint8();
				if ((shapeVersion >= 2) && (lineStyleCount == 0xff)) {
					lineStyleCount = byteStream.readUint16();
				}
				var lineStyles = [];
				for (var i = lineStyleCount; i--;) {
					lineStyles[lineStyles.length] = this.morphLineStyle(shapeVersion);
				}
				return lineStyles;
			}
			morphLineStyle(shapeVersion) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.startWidth = byteStream.readUint16();
				obj.endWidth = byteStream.readUint16();
				if (shapeVersion < 2) {
					obj.startColor = this.rgba();
					obj.endColor = this.rgba();
				} else {
					// MorphLineStyle2 in DefineMorphShape2
					obj.startCapStyle = byteStream.readUB(2);
					obj.joinStyle = byteStream.readUB(2);
					obj.hasFill = byteStream.readBit();
					obj.noHScale = byteStream.readBit();
					obj.noVScale = byteStream.readBit();
					obj.pixelHinting = byteStream.readBit();
					byteStream.readUB(5); // Reserved
					obj.noClose = byteStream.readBit();
					obj.endCapStyle = byteStream.readUB(2);
					if (obj.joinStyle === 2) {
						obj.miterLimitFactor = byteStream.readFixed8();
					}
					if (obj.hasFill) {
						obj.fillType = this.morphFillStyle();
					} else {
						obj.startColor = this.rgba();
						obj.endColor = this.rgba();
					}
				}
				return obj;
			}
			morphShapeWithStyle(shapeVersion, t) {
				var byteStream = this.byteStream;
				var numBits = byteStream.readUint8();
				var NumFillBits = numBits >> 4;
				var NumLineBits = numBits & 0b1111;
				// NumFillBits and NumLineBits are written as 0 for the end shape.
				if (t) {
					NumFillBits = 0;
					NumLineBits = 0;
				}
				var ShapeRecords = this.shapeRecords(shapeVersion, {
					fillBits: NumFillBits,
					lineBits: NumLineBits
				});
				return ShapeRecords;
			}
			//////// Font Text ////////
			getTextRecords(ver, GlyphBits, AdvanceBits) {
				var byteStream = this.byteStream;
				var array = [];
				while (true) {
					var flags = byteStream.readUint8();
					if (flags == 0) {
						// End of text records.
						break;
					}
					var obj = {};
					if (flags & 0b1000) {
						obj.fontId = byteStream.readUint16();
					}
					if (flags & 0b100) {
						if (ver === 1) {
							obj.textColor = this.rgb();
						} else {
							obj.textColor = this.rgba();
						}
					}
					if (flags & 0b1) {
						obj.x = byteStream.readInt16();
					}
					if (flags & 0b10) {
						obj.y = byteStream.readInt16();
					}
					if (flags & 0b1000) {
						obj.textHeight = byteStream.readUint16();
					}
					obj.entries = this.getGlyphEntries(GlyphBits, AdvanceBits);
					array.push(obj);
				}
				return array;
			}
			getGlyphEntries(GlyphBits, AdvanceBits) {
				// TODO(Herschel): font_id and height are tied together. Merge them into a struct?
				var byteStream = this.byteStream;
				var count = byteStream.readUint8();
				var array = [];
				while (count--) {
					array.push({
						index: byteStream.readUB(GlyphBits),
						advance: byteStream.readSB(AdvanceBits)
					});
				}
				return array;
			}
			buttonRecords(ver) {
				var records = [];
				var byteStream = this.byteStream;
				while (true) {
					var flags = byteStream.readUint8();
					if (flags == 0) break;
					var obj = {};
					obj.buttonStateUp = flags & 1;
					obj.buttonStateOver = (flags >>> 1) & 1;
					obj.buttonStateDown = (flags >>> 2) & 1;
					obj.buttonStateHitTest = (flags >>> 3) & 1;
					obj.characterId = byteStream.readUint16();
					obj.depth = byteStream.readUint16();
					obj.matrix = this.matrix();
					if (ver == 2) {
						obj.colorTransform = this.colorTransform(true);
					}
					if (flags & 16) {
						obj.filters = this.getFilterList();
					}
					if (flags & 32) {
						obj.blendMode = this.byteStream.readUint8();
					}
					records.push(obj);
				}
				return records;
			}
			buttonActions(endOffset) {
				var byteStream = this.byteStream;
				var results = [];
				while (true) {
					var obj = {};
					var condActionSize = byteStream.readUint16();
					var flags = byteStream.readUint16();
					obj.condIdleToOverUp = flags & 1;
					obj.condOverUpToIdle = (flags >>> 1) & 1;
					obj.condOverUpToOverDown = (flags >>> 2) & 1;
					obj.condOverDownToOverUp = (flags >>> 3) & 1;
					obj.condOverDownToOutDown = (flags >>> 4) & 1;
					obj.condOutDownToOverDown = (flags >>> 5) & 1;
					obj.condOutDownToIdle = (flags >>> 6) & 1;
					obj.condIdleToOverDown = (flags >>> 7) & 1;
					obj.condOverDownToIdle = (flags >>> 8) & 1;
					obj.condKeyPress = (flags >> 9);
					byteStream.byteAlign();
					if (condActionSize >= 4) {
						obj.actionScript = byteStream.readBytes(condActionSize - 4);
					} else if (condActionSize == 0) {
						// Last action, read to end.
						obj.actionScript = byteStream.readBytes(endOffset - byteStream.byte_offset);
					} else {
						// Some SWFs have phantom action records with an invalid length.
						// See 401799_pre_Scene_1.swf
						// TODO: How does Flash handle this?
					}
					results.push(obj);
					if (condActionSize == 0) {
						break;
					}
					if (byteStream.byte_offset > endOffset) {
						break;
					}
				}
				return results;
			}
			parseSoundFormat() {
				var byteStream = this.byteStream;
				var obj = {};
				var frags = byteStream.readUint8();
				var compression;
				switch (frags >> 4) {
					case 0: // UncompressedUnknownEndian
						compression = "uncompressedUnknownEndian";
						break;
					case 1: // ADPCM
						compression = "ADPCM";
						break;
					case 2: // MP3
						compression = "MP3";
						break;
					case 3: // Uncompressed
						compression = "uncompressed";
						break;
					case 4: // Nellymoser16Khz
						compression = "nellymoser16Khz";
						break;
					case 5: // Nellymoser8Khz
						compression = "nellymoser8Khz";
						break;
					case 6: // Nellymoser
						compression = "nellymoser";
						break;
					case 11: // Speex
						compression = "speex";
						break;
					default:
						this.emitMessage("Invalid audio format", "error");
				}
				obj.compression = compression;
				var sampleRate;
				switch ((frags & 0b1100) >> 2) {
					case 0:
						sampleRate = 5512;
						break;
					case 1:
						sampleRate = 11025;
						break;
					case 2:
						sampleRate = 22050;
						break;
					case 3:
						sampleRate = 44100;
						break;
					default:
						console.log("unreachable");
				}
				obj.sampleRate = sampleRate;
				obj.is16Bit = frags & 0b10;
				obj.isStereo = frags & 0b1;
				return obj;
			}
			parseClipActions(startOffset, length) {
				var byteStream = this.byteStream;
				byteStream.readUint16();
				var allEventFlags = this.parseClipEventFlags();
				var endLength = startOffset + length;
				var actionRecords = [];
				while (byteStream.byte_offset < endLength) {
					var clipActionRecord = this.parseClipActionRecord(endLength);
					actionRecords.push(clipActionRecord);
					if (endLength <= byteStream.byte_offset) {
						break;
					}
					var endFlag = (this._swfVersion <= 5) ? byteStream.readUint16() : byteStream.readUint32();
					if (!endFlag) {
						break;
					}
					if (this._swfVersion <= 5) {
						byteStream.byte_offset -= 2;
					} else {
						byteStream.byte_offset -= 4;
					}
					if (clipActionRecord.keyCode) {
						byteStream.byte_offset -= 1;
					}
				}
				return { allEventFlags, actionRecords };
			}
			parseClipActionRecord(endLength) {
				var byteStream = this.byteStream;
				var obj = {};
				var eventFlags = this.parseClipEventFlags();
				if (endLength > byteStream.byte_offset) {
					var ActionRecordSize = byteStream.readUint32();
					if (eventFlags.keyPress) {
						obj.keyCode = byteStream.readUint8();
					}
					obj.eventFlags = eventFlags;
					obj.actions = byteStream.readBytes(ActionRecordSize);
				}
				return obj;
			}
			parseClipEventFlags() {
				var obj = {};
				var byteStream = this.byteStream;
				obj.keyUp = byteStream.readUB(1);
				obj.keyDown = byteStream.readUB(1);
				obj.mouseUp = byteStream.readUB(1);
				obj.mouseDown = byteStream.readUB(1);
				obj.mouseMove = byteStream.readUB(1);
				obj.unload = byteStream.readUB(1);
				obj.enterFrame = byteStream.readUB(1);
				obj.load = byteStream.readUB(1);
				if (this._swfVersion >= 6) {
					obj.dragOver = byteStream.readUB(1);
					obj.rollOut = byteStream.readUB(1);
					obj.rollOver = byteStream.readUB(1);
					obj.releaseOutside = byteStream.readUB(1);
					obj.release = byteStream.readUB(1);
					obj.press = byteStream.readUB(1);
					obj.initialize = byteStream.readUB(1);
				}
				obj.data = byteStream.readUB(1);
				if (this._swfVersion >= 6) {
					byteStream.readUB(5);
					obj.construct = byteStream.readUB(1);
					obj.keyPress = byteStream.readUB(1);
					obj.dragOut = byteStream.readUB(1);
					byteStream.readUB(8);
				}
				byteStream.byteAlign();
				return obj;
			}
			getFilterList() {
				var byteStream = this.byteStream;
				var result = [];
				var numberOfFilters = byteStream.readUint8();
				while (numberOfFilters--) {
					result.push(this.getFilter());
				}
				return result;
			}
			getFilter() {
				var byteStream = this.byteStream;
				var filterId = byteStream.readUint8();
				var filter;
				switch (filterId) {
					case 0:
						filter = this.dropShadowFilter();
						break;
					case 1:
						filter = this.blurFilter();
						break;
					case 2:
						filter = this.glowFilter();
						break;
					case 3:
						filter = this.bevelFilter();
						break;
					case 4:
						filter = this.gradientFilter();
						break;
					case 5:
						filter = this.convolutionFilter();
						break;
					case 6:
						filter = this.colorMatrixFilter();
						break;
					case 7:
						filter = this.gradientFilter();
						break;
					default:
						this.emitMessage("Invalid filter type: " + filterId, "error");
				}
				return { filterId, filter };
			}
			dropShadowFilter() {
				var byteStream = this.byteStream;
				var color = this.rgba();
				var blurX = byteStream.readFixed16();
				var blurY = byteStream.readFixed16();
				var angle = byteStream.readFixed16();
				var distance = byteStream.readFixed16();
				var strength = byteStream.readFixed8();
				var flags = byteStream.readUint8();
				return { distance, angle, color, blurX, blurY, strength, flags };
			}
			blurFilter() {
				var byteStream = this.byteStream;
				var blurX = byteStream.readFixed16();
				var blurY = byteStream.readFixed16();
				var flags = byteStream.readUint8();
				return { blurX, blurY, flags };
			}
			glowFilter() {
				var byteStream = this.byteStream;
				var color = this.rgba();
				var blurX = byteStream.readFixed16();
				var blurY = byteStream.readFixed16();
				var strength = byteStream.readFixed8();
				var flags = byteStream.readUint8();
				return { color, blurX, blurY, strength, flags };
			}
			bevelFilter() {
				var byteStream = this.byteStream;
				var highlightColor = this.rgba();
				var shadowColor = this.rgba();
				var blurX = byteStream.readFixed16();
				var blurY = byteStream.readFixed16();
				var angle = byteStream.readFixed16();
				var distance = byteStream.readFixed16();
				var strength = byteStream.readFixed8();
				var flags = byteStream.readUint8();
				return { distance, angle, highlightColor, shadowColor, blurX, blurY, strength, flags };
			}
			gradientFilter() {
				var byteStream = this.byteStream;
				var i;
				var numColors = byteStream.readUint8();
				var colors = [];
				for (i = 0; i < numColors; i++) {
					colors.push(this.rgba());
				}
				var gradient_records = [];
				for (i = 0; i < colors.length; i++) {
					gradient_records.push({
						color: colors[i],
						ratio: byteStream.readUint8()
					});
				}
				var blurX = byteStream.readFixed16();
				var blurY = byteStream.readFixed16();
				var angle = byteStream.readFixed16();
				var distance = byteStream.readFixed16();
				var strength = byteStream.readFixed8();
				var flags = byteStream.readUint8();
				return {
					distance,
					angle,
					colors: gradient_records,
					blurX,
					blurY,
					strength,
					flags
				}
			}
			convolutionFilter() {
				var byteStream = this.byteStream;
				var obj = {};
				obj.matrixX = byteStream.readUint8();
				obj.matrixY = byteStream.readUint8();
				obj.divisor = byteStream.readFloat32();
				obj.bias = byteStream.readFloat32();
				var count = obj.matrixX * obj.matrixY;
				var matrixArr = [];
				while (count--) {
					matrixArr.push(byteStream.readFloat32());
				}
				obj.defaultColor = this.rgba();
				byteStream.readUB(6);
				obj.clamp = byteStream.readUB(1);
				obj.preserveAlpha = byteStream.readUB(1);
				return obj;
			}
			colorMatrixFilter() {
				var byteStream = this.byteStream;
				var matrixArr = [];
				for (var i = 0; i < 20; i++) {
					matrixArr.push(byteStream.readFloat32());
				}
				return matrixArr;
			}
			parseSoundInfo() {
				var obj = {};
				var byteStream = this.byteStream;
				var flags = byteStream.readUint8();
				switch ((flags >> 4) & 0b11) {
					case 0: // Event
						obj.event = 'event';
						break;
					case 1: // Start
						obj.event = 'start';
						break;
					case 2: // Stop
						obj.event = 'stop';
						break;
				}
				if (flags & 0b1) {
					obj.inSample = byteStream.readUint32();
				}
				if (flags & 0b10) {
					obj.outSample = byteStream.readUint32();
				}
				if (flags & 0b100) {
					obj.numLoops = byteStream.readUint16();
				}
				if (flags & 0b1000) {
					var count = byteStream.readUint8();
					var envelope = [];
					while (count--) {
						envelope.push({
							sample: byteStream.readUint32(),
							leftVolume: byteStream.readUint16(),
							rightVolume: byteStream.readUint16()
						});
					}
					obj.envelope = envelope;
				}
				return obj;
			}
			//////// Define ////////
			parseDefineButton(ver, length) {
				var byteStream = this.byteStream;
				var obj = {};
				var endOffset = byteStream.byte_offset + length;
				obj.id = byteStream.readUint16();
				var ActionOffset = 0;
				if (ver == 2) {
					obj.flag = byteStream.readUint8();
					obj.trackAsMenu = (obj.flag & 0b1);
					ActionOffset = byteStream.readUint16();
				}
				obj.records = this.buttonRecords(ver);
				byteStream.byteAlign();
				if (ver === 1) {
					obj.actions = byteStream.readBytes(endOffset - byteStream.byte_offset);
				} else {
					if (ActionOffset > 0) {
						obj.actions = this.buttonActions(endOffset);
					}
				}
				byteStream.byteAlign();
				return obj;
			}
			parseDefineButtonSound() {
				var byteStream = this.byteStream;
				var obj = {};
				obj.buttonId = byteStream.readUint16();

				// Some SWFs (third-party soundboard creator?) create SWFs with a malformed
				// DefineButtonSound tag that has fewer than all 4 sound IDs.
				for (var i = 0; i < 4; i++) {
					var soundId = byteStream.readUint16();
					if (soundId) {
						var soundInfo = this.parseSoundInfo();
						switch (i) {
							case 0:
								obj.buttonStateUpSoundInfo = soundInfo;
								obj.buttonStateUpSoundId = soundId;
								break;
							case 1:
								obj.buttonStateOverSoundInfo = soundInfo;
								obj.buttonStateOverSoundId = soundId;
								break;
							case 2:
								obj.buttonStateDownSoundInfo = soundInfo;
								obj.buttonStateDownSoundId = soundId;
								break;
							case 3:
								obj.buttonStateHitTestSoundInfo = soundInfo;
								obj.buttonStateHitTestSoundId = soundId;
								break;
						}
					}
				}
				return obj;
			}
			parseDefineFont1(length) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.version = 1;
				var endOffset = byteStream.byte_offset + length;
				var i;
				obj.id = byteStream.readUint16();
				var offset = byteStream.byte_offset;
				var numGlyphs = byteStream.readUint16();
				var offsetTable = [];
				offsetTable.push(numGlyphs);
				numGlyphs /= 2;
				numGlyphs--;
				for (i = numGlyphs; i--;) {
					offsetTable.push(byteStream.readUint16());
				}
				numGlyphs++;
				var glyphs = [];
				for (i = 0; i < numGlyphs; i++) {
					byteStream.setOffset(offset + offsetTable[i], 0);
					var numBits = byteStream.readUint8();
					glyphs.push(this.shapeRecords(1, {
						fillBits: numBits >> 4,
						lineBits: numBits & 0b1111
					}));
				}
				obj.glyphs = glyphs;
				byteStream.byte_offset = endOffset;
				byteStream.bit_offset = 0;
				return obj;
			}
			parseDefineFont2(ver, length) {
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;

				var obj = {};
				obj.version = ver;
				obj.id = byteStream.readUint16();
				var i = 0;
				var fontFlags = byteStream.readUint8();
				obj.isBold = (fontFlags) & 1;
				obj.isItalic = (fontFlags >>> 1) & 1;
				var isWideCodes = (fontFlags >>> 2) & 1;
				obj.isWideCodes = isWideCodes;
				var isWideOffsets = (fontFlags >>> 3) & 1;
				obj.isWideOffsets = isWideOffsets;
				obj.isANSI = (fontFlags >>> 4) & 1;
				obj.isSmallText = (fontFlags >>> 5) & 1;
				obj.isShiftJIS = (fontFlags >>> 6) & 1;
				var hasLayout = (fontFlags >>> 7) & 1;
				obj.language = this.byteStream.readUint8();

				// SWF19 states that the font name should not have a terminating null byte,
				// but it often does (depends on Flash IDE version?)
				obj.fontNameData = byteStream.readStringWithLength();

				var numGlyphs = byteStream.readUint16();
				obj.numGlyphs = numGlyphs;

				// SWF19 p. 164 doesn't make it super clear: If there are no glyphs,
				// then the following tables are omitted. But the table offset values
				// may or may not be written... (depending on Flash IDE version that was used?)
				if (numGlyphs == 0) {
					// Try to read the CodeTableOffset. It may or may not be present,
					// so just dump any error.
					if (isWideOffsets) {
						byteStream.readUint32();
					} else {
						byteStream.readUint16();
					}
				} else {
					var offset = byteStream.byte_offset;
					// OffsetTable
					var OffsetTable = [];
					if (isWideOffsets) {
						for (i = numGlyphs; i--;) {
							OffsetTable[OffsetTable.length] = byteStream.readUint32();
						}
					} else {
						for (i = numGlyphs; i--;) {
							OffsetTable[OffsetTable.length] = byteStream.readUint16();
						}
					}

					// CodeTableOffset
					var codeTableOffset;
					if (isWideOffsets) {
						codeTableOffset = byteStream.readUint32();
					} else {
						codeTableOffset = byteStream.readUint16();
					}

					// GlyphShapeTable
					var glyphShapeTable = [];
					for (i = 0; i < numGlyphs; i++) {
						// The glyph shapes are assumed to be positioned per the offset table.
						// Panic on debug builds if this assumption is wrong, maybe we need to
						// seek into these offsets instead?
						byteStream.setOffset(offset + OffsetTable[i], 0);

						// The glyph shapes must not overlap. Avoid exceeding to the next one.
						// TODO: What happens on decreasing offsets?
						var availableBytes;
						if (i < (numGlyphs - 1)) {
							availableBytes = (OffsetTable[i + 1] - OffsetTable[i]);
						} else {
							availableBytes = (codeTableOffset - OffsetTable[i]);
						}
						if (availableBytes == 0) {
							continue;
						}
						var numBits = byteStream.readUint8();
						if (availableBytes == 1) {
							continue;
						}
						// TODO: Avoid reading more than `available_bytes - 1`?
						var numFillBits = numBits >> 4;
						var numLineBits = numBits & 0b1111;
						glyphShapeTable.push(this.shapeRecords(1, {
							fillBits: numFillBits,
							lineBits: numLineBits
						}));
					}
					obj.glyphs = glyphShapeTable;

					// The code table is assumed to be positioned right after the glyph shapes.
					// Panic on debug builds if this assumption is wrong, maybe we need to seek
					// into the code table offset instead?
					byteStream.setOffset(offset + codeTableOffset, 0);

					// CodeTable
					var CodeTable = [];
					if (isWideCodes) {
						for (i = numGlyphs; i--;) {
							CodeTable.push(byteStream.readUint16());
						}
					} else {
						for (i = numGlyphs; i--;) {
							CodeTable.push(byteStream.readUint8());
						}
					}
					obj.codeTables = CodeTable;
				}

				// TODO: Is it possible to have a layout when there are no glyphs?
				if (hasLayout) {
					obj.layout = {};
					obj.layout.ascent = byteStream.readUint16();
					obj.layout.descent = byteStream.readUint16();
					obj.layout.leading = byteStream.readInt16();
					var advanceTable = [];
					for (i = numGlyphs; i--;) {
						advanceTable.push(byteStream.readInt16());
					}
					obj.layout.advanceTable = advanceTable;
					// Some older SWFs end the tag here, as this data isn't used until v7.
					var boundsTable = [];
					if ((byteStream.byte_offset - startOffset) < length) {
						for (i = numGlyphs; i--;) {
							boundsTable.push(this.rect());
						}
						byteStream.byteAlign();
					}
					obj.layout.boundsTable = boundsTable;
					var kernings = [];
					if ((byteStream.byte_offset - startOffset) < length) {
						var kerningCount = byteStream.readUint16();
						for (i = kerningCount; i--;) {
							var kerningCode1 = ((isWideCodes) ? byteStream.readUint16() : byteStream.readUint8());
							var kerningCode2 = ((isWideCodes) ? byteStream.readUint16() : byteStream.readUint8());
							var kerningAdjustment = byteStream.readInt16();
							kernings.push({
								leftCode: kerningCode1,
								rightCode: kerningCode2,
								adjustment: kerningAdjustment
							});
						}
					}
					obj.kernings = kernings;
				}
				return obj;
			}
			parseDefineFont4(length) {
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				var obj = {};
				obj.version = 4;
				obj.id = byteStream.readUint16();
				var flags = byteStream.readUint8();
				obj.name = byteStream.readStringWithUntil();
				if (flags & 0b100) {
					obj.data = byteStream.readBytes(length - (byteStream.byte_offset - startOffset));
				} else {
					var e = (length - (byteStream.byte_offset - startOffset));
					byteStream.byte_offset += e;
				}
				obj.isItalic = (flags & 0b10);
				obj.isBold = (flags & 0b1);
				return obj;
			}
			parseDefineFontInfo(ver, length) {
				var byteStream = this.byteStream;
				var endOffset = byteStream.byte_offset + length;
				var obj = {};
				obj.id = byteStream.readUint16();
				obj.version = ver;
				obj.fontNameData = byteStream.readStringWithLength();
				var flags = byteStream.readUint8();
				obj.isWideCodes = flags & 1;
				obj.isBold = (flags >>> 1) & 1;
				obj.isItalic = (flags >>> 2) & 1;
				obj.isShiftJIS = (flags >>> 3) & 1;
				obj.isANSI = (flags >>> 4) & 1;
				obj.isSmallText = (flags >>> 5) & 1;
				byteStream.byteAlign();
				if (ver === 2) {
					obj.language = this.byteStream.readUint8();
				}
				var codeTable = [];
				var tLen = endOffset - byteStream.byte_offset;
				if (obj.isWideCodes) {
					while (tLen > 1) {
						codeTable[codeTable.length] = byteStream.readUint16();
						tLen -= 2;
					}
				} else {
					// TODO(Herschel): Warn for version 2.
					while (tLen > 0) {
						codeTable[codeTable.length] = byteStream.readUint8();
						tLen--;
					}
				}
				obj.codeTable = codeTable;

				// SWF19 has ANSI and Shift-JIS backwards?
				return obj;
			}
			parseDefineEditText() {
				var byteStream = this.byteStream;
				var obj = {};
				obj.id = byteStream.readUint16();
				obj.bounds = this.rect();
				var flag1 = byteStream.readUint16();

				var hasFont = flag1 & 1;
				var hasMaxLength = (flag1 >>> 1) & 1;
				var hasTextColor = (flag1 >>> 2) & 1;
				var isReadOnly = (flag1 >>> 3) & 1;
				var isPassword = (flag1 >>> 4) & 1;
				var isMultiline = (flag1 >>> 5) & 1;
				var isWordWrap = (flag1 >>> 6) & 1;
				var hasInitialText = (flag1 >>> 7) & 1;
				var outlines = (flag1 >>> 8) & 1;
				var HTML = (flag1 >>> 9) & 1;
				var wasStatic = (flag1 >>> 10) & 1;
				var border = (flag1 >>> 11) & 1;
				var noSelect = (flag1 >>> 12) & 1;
				var hasLayout = (flag1 >>> 13) & 1;
				var autoSize = (flag1 >>> 14) & 1;
				var hasFontClass = (flag1 >>> 15) & 1;

				obj.isReadOnly = isReadOnly;
				obj.isPassword = isPassword;
				obj.isMultiline = isMultiline;
				obj.isWordWrap = isWordWrap;
				obj.outlines = outlines;
				obj.HTML = HTML;
				obj.wasStatic = wasStatic;
				obj.border = border;
				obj.noSelect = noSelect;
				obj.autoSize = autoSize;

				if (hasFont) {
					obj.fontID = byteStream.readUint16();
				}
				if (hasFontClass) {
					obj.fontClass = byteStream.readStringWithUntil();
				}
				if (hasFont && !hasFontClass) {
					obj.fontHeight = byteStream.readUint16();
				}
				if (hasTextColor) {
					obj.textColor = this.rgba();
				}
				if (hasMaxLength) {
					obj.maxLength = byteStream.readUint16();
				}
				if (hasLayout) {
					obj.layout = {};
					obj.layout.align = byteStream.readUint8();
					obj.layout.leftMargin = byteStream.readUint16();
					obj.layout.rightMargin = byteStream.readUint16();
					obj.layout.indent = byteStream.readUint16();
					obj.layout.leading = byteStream.readInt16();
				}
				obj.variableName = byteStream.readStringWithUntil();
				if (hasInitialText) {
					obj.initialText = byteStream.readStringWithUntil();
				}
				return obj;
			}
			parseDefineSprite() {
				var obj = {};
				var byteStream = this.byteStream;
				obj.id = byteStream.readUint16();
				obj.numFrames = byteStream.readUint16();
				obj.tags = this.parseTagList();
				return obj;
			}
			parseDefineShape(shapeVersion) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.id = byteStream.readUint16();
				obj.bounds = this.rect();
				obj.version = shapeVersion;
				if (shapeVersion >= 4) {
					obj.edgeBounds = this.rect();
					var flags = byteStream.readUint8();
					obj.scalingStrokes = flags & 1;
					obj.nonScalingStrokes = (flags >>> 1) & 1;
					obj.fillWindingRule = (flags >>> 2) & 1;
				}
				var fillStyles = this.fillStyleArray(shapeVersion);
				var lineStyles = this.lineStyleArray(shapeVersion);
				var numBits = byteStream.readUint8();
				var numFillBits = numBits >> 4;
				var numLineBits = numBits & 0b1111;
				var shapeRecords = this.shapeRecords(shapeVersion, {
					fillBits: numFillBits,
					lineBits: numLineBits
				});
				obj.fillStyles = fillStyles;
				obj.lineStyles = lineStyles;
				obj.shapeRecords = shapeRecords;
				obj.numFillBits = numFillBits;
				obj.numLineBits = numLineBits;
				return obj;
			}
			parseDefineSound(length) {
				var obj = {};
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				obj.id = byteStream.readUint16();
				obj.format = this.parseSoundFormat();
				obj.numSamples = byteStream.readUint32();
				var sub = byteStream.byte_offset - startOffset;
				var dataLength = length - sub;
				obj.data = byteStream.readBytes(dataLength);
				return obj;
			}
			parseDefineText(ver) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.id = byteStream.readUint16();
				obj.bounds = this.rect();
				obj.matrix = this.matrix();
				var GlyphBits = byteStream.readUint8();
				var AdvanceBits = byteStream.readUint8();
				obj.records = this.getTextRecords(ver, GlyphBits, AdvanceBits);
				return obj;
			}
			parseDefineBinaryData(length) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.id = byteStream.readUint16();
				byteStream.readUint32();
				obj.data = byteStream.readBytes(length - 6);
				return obj;
			}
			parseDefineScalingGrid() {
				var byteStream = this.byteStream;
				var obj = {};
				obj.characterId = byteStream.readUint16();
				obj.splitter = this.rect();
				byteStream.byteAlign();
				return obj;
			}
			parseDefineSceneAndFrameLabelData() {
				var byteStream = this.byteStream;
				var obj = {};
				var sceneCount = byteStream.readEncodedU32();
				obj.sceneInfo = [];
				while (sceneCount--) {
					obj.sceneInfo.push({
						offset: byteStream.readEncodedU32(),
						name: byteStream.readStringWithUntil()
					});
				}
				var frameLabelCount = byteStream.readEncodedU32();
				obj.frameInfo = [];
				while (frameLabelCount--) {
					obj.frameInfo.push({
						num: byteStream.readEncodedU32(),
						label: byteStream.readStringWithUntil()
					});
				}
				return obj;
			}
			parseDefineVideoStream() {
				var byteStream = this.byteStream;
				var obj = {};
				obj.id = byteStream.readUint16();
				obj.numFrames = byteStream.readUint16();
				obj.width = byteStream.readUint16();
				obj.height = byteStream.readUint16();
				// TODO(Herschel): Check SWF version.
				var flags = byteStream.readUint8();
				switch (byteStream.readUint8()) {
					case 0: // None
						obj.codec = "none";
						break;
					case 2: // H263
						obj.codec = "H263";
						break;
					case 3: // ScreenVideo
						obj.codec = "ScreenVideo";
						break;
					case 4: // Vp6
						obj.codec = "Vp6";
						break;
					case 5: // Vp6WithAlpha
						obj.codec = "Vp6WithAlpha";
						break;
					case 6: // ScreenVideoV2
						obj.codec = "ScreenVideoV2";
						break;
					default:
						this.emitMessage("Invalid video codec.", "error");
				}
				switch ((flags >> 1) & 0b111) {
					case 0: // None
						obj.deblocking = "useVideoPacketValue";
						break;
					case 1: // None
						obj.deblocking = "none";
						break;
					case 2: // Level1
						obj.deblocking = "Level1";
						break;
					case 3: // Level2
						obj.deblocking = "Level2";
						break;
					case 4: // Level3
						obj.deblocking = "Level3";
						break;
					case 5: // Level4
						obj.deblocking = "Level4";
						break;
					default:
						this.emitMessage("Invalid video deblocking value.", "error");
				}
				obj.isSmoothed = flags & 0b1;
				return obj;
			}
			parseDefineBitsLossLess(ver, length) {
				var obj = {};
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				obj.id = byteStream.readUint16();
				obj.version = ver;
				var format = byteStream.readUint8();
				obj.width = byteStream.readUint16();
				obj.height = byteStream.readUint16();
				switch (format) {
					case 3: // ColorMap8
						obj.numColors = byteStream.readUint8();
						break;
					case 4: // Rgb15
					case 5: // Rgb32
						break;
					default:
						this.emitMessage("Invalid bitmap format: " + format, "error");
				}
				var sub = byteStream.byte_offset - startOffset;
				obj.data = byteStream.readBytes(length - sub);
				obj.format = format;
				return obj;
			}
			parseDefineFontName() {
				var obj = {};
				var byteStream = this.byteStream;
				obj.id = byteStream.readUint16();
				obj.name = byteStream.readStringWithUntil();
				obj.copyrightInfo = byteStream.readStringWithUntil();
				return obj;
			}
			parseDefineBits(ver, length) {
				var obj = {};
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				obj.id = byteStream.readUint16();
				if (ver <= 2) {
					obj.data = byteStream.readBytes(length - 2);
				} else {
					var dataSize = byteStream.readUint32();
					if (ver >= 4) obj.deblocking = byteStream.readUint16();
					var data = byteStream.readBytes(dataSize);
					var sub = byteStream.byte_offset - startOffset;
					var alphaData = byteStream.readBytes(length - sub);
					obj.data = data;
					obj.alphaData = alphaData;
				}
				return obj;
			}
			parseDefineButtonCxform(length) {
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				var obj = {};
				// SWF19 is incorrect here. You can have >1 color transforms in this tag. They apply
				// to the characters in a button in sequence.
				obj.id = byteStream.readUint16();
				var colorTransforms = [];

				// Read all color transforms.
				while ((byteStream.byte_offset - startOffset) < length) {
					colorTransforms.push(this.colorTransform(false));
					byteStream.byteAlign();
				}
				obj.colorTransforms = colorTransforms;
				return obj;
			}
			parseDefineMorphShape(ver) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.id = byteStream.readUint16();
				obj.startBounds = this.rect();
				obj.endBounds = this.rect();
				if (ver == 2) {
					obj.startEdgeBounds = this.rect();
					obj.endEdgeBounds = this.rect();
					var flags = byteStream.readUint8();
					obj.isScalingStrokes = flags & 1;
					obj.isNonScalingStrokes = (flags >>> 1) & 1;
				}
				byteStream.readUint32(); // Offset to EndEdges.
				obj.morphFillStyles = this.morphFillStyleArray(ver);
				obj.morphLineStyles = this.morphLineStyleArray(ver);

				// TODO(Herschel): Add read_shape
				obj.startEdges = this.morphShapeWithStyle(ver, false);
				obj.endEdges = this.morphShapeWithStyle(ver, true);
				return obj;
			}
			parseDefineFontAlignZones(length) {
				var byteStream = this.byteStream;
				var tag = {};
				var startOffset = byteStream.byte_offset;
				tag.id = byteStream.readUint16();
				tag.thickness = byteStream.readUint8();
				var zones = [];
				while (byteStream.byte_offset < (startOffset + length)) {
					byteStream.readUint8(); // Always 2.
					zones.push({
						left: byteStream.readInt16(),
						width: byteStream.readInt16(),
						bottom: byteStream.readInt16(),
						height: byteStream.readInt16()
					});
					byteStream.readUint8(); // Always 0b000000_11 (2 dimensions).
				}
				tag.zones = zones;
				return tag;
			}
			parsePlaceObject(ver, length) {
				var byteStream = this.byteStream;
				var obj = {};
				var startOffset = byteStream.byte_offset;
				obj.version = ver;
				if (ver === 1) {
					obj.isMove = false;
					obj.characterId = byteStream.readUint16();
					obj.depth = byteStream.readUint16();
					obj.matrix = this.matrix();
					byteStream.byteAlign();
					if ((byteStream.byte_offset - startOffset) < length) {
						obj.colorTransform = this.colorTransform();
					}
				} else {
					var flags;
					if (ver >= 3) {
						flags = byteStream.readUint16();
					} else {
						flags = byteStream.readUint8();
					}
					obj.depth = byteStream.readUint16();

					var isMove = (flags & 1);
					var hasCharacter = (flags >>> 1) & 1;
					var hasMatrix = (flags >>> 2) & 1;
					var hasColorTransform = (flags >>> 3) & 1;
					var hasRatio = (flags >>> 4) & 1;
					var hasName = (flags >>> 5) & 1;
					var hasClipDepth = (flags >>> 6) & 1;
					var hasClipActions = (flags >>> 7) & 1;
					// PlaceObject3
					var hasFilters = (flags >>> 8) & 1;
					var hasBlendMode = (flags >>> 9) & 1;
					var hasBitmapCache = (flags >>> 10) & 1;
					var hasClassName = (flags >>> 11) & 1;
					var hasImage = (flags >>> 12) & 1;
					var hasVisible = (flags >>> 13) & 1;
					var hasBackgroundColor = (flags >>> 14) & 1;

					// PlaceObject3
					// SWF19 p.40 incorrectly says class name if (HasClassNameFlag || (HasImage && HasCharacterID))
					// I think this should be if (HasClassNameFlag || (HasImage && !HasCharacterID)),
					// you use the class name only if a character ID isn't present.
					// But what is the case where we'd have an image without either HasCharacterID or HasClassName set?
					obj.hasImage = hasImage;
					if ((hasClassName) || ((obj.hasImage) && !hasCharacter)) {
						obj.className = byteStream.readStringWithUntil();
					}
					obj.isMove = isMove;
					if (hasCharacter) {
						obj.characterId = byteStream.readUint16();
					}
					if (!obj.isMove && !hasCharacter) {
						this.emitMessage("Invalid PlaceObject type", "error");
					}
					if (hasMatrix) {
						obj.matrix = this.matrix();
					}
					if (hasColorTransform) {
						obj.colorTransform = this.colorTransform(true);
					}
					if (hasRatio) {
						obj.ratio = byteStream.readUint16();
					}
					if (hasName) {
						obj.name = byteStream.readStringWithUntil();
					}
					if (hasClipDepth) {
						obj.clipDepth = byteStream.readUint16();
					}
					// PlaceObject3
					if (hasFilters) {
						obj.filters = this.getFilterList();
					}
					if (hasBlendMode) {
						obj.blendMode = this.byteStream.readUint8();
					}
					if (hasBitmapCache) {
						obj.bitmapCache = byteStream.readUint8();
					}
					if (hasVisible) {
						obj.visible = byteStream.readUint8();
					}
					if (hasBackgroundColor) {
						obj.backgroundColor = this.rgba();
					}
					if (hasClipActions) {
						obj.clipActions = this.parseClipActions(startOffset, length);
					}
					// PlaceObject4
					if (ver === 4) {
						byteStream.byteAlign();
						obj.amfData = byteStream.readBytes((length - (byteStream.byte_offset - startOffset)));
					}
				}
				byteStream.byteAlign();
				return obj;
			}
			parseDoAction(length) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.action = byteStream.readBytes(length);
				return obj;
			}
			parseDoInitAction(length) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.spriteId = byteStream.readUint16();
				obj.action = byteStream.readBytes(length - 2);
				return obj;
			}
			parseDoABC(ver, length) {
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				var obj = {};
				obj.version = ver;
				if (ver == 2) {
					obj.flags = byteStream.readUint32();
					obj.name = byteStream.readStringWithUntil();
				}
				var offset = (length - (byteStream.byte_offset - startOffset));
				obj.abc = byteStream.readBytes(offset);
				return obj;
			}
			parseProductInfo() {
				// Not documented in SWF19 reference.
				// See http://wahlers.com.br/claus/blog/undocumented-swf-tags-written-by-mxmlc/
				var byteStream = this.byteStream;
				var obj = {};
				obj.productID = byteStream.readUint32();
				obj.edition = byteStream.readUint32();
				obj.majorVersion = byteStream.readUint8();
				obj.minorVersion = byteStream.readUint8();
				obj.buildBumber = byteStream.readUint64();
				obj.compilationDate = byteStream.readUint64();
				return obj;
			}
			parseDebugID(length) {
				// Not documented in SWF19 reference.
				// See http://wahlers.com.br/claus/blog/undocumented-swf-tags-written-by-mxmlc/
				var byteStream = this.byteStream;
				var obj = {};
				obj.debugId = byteStream.readUint8();
				byteStream.byte_offset--;
				byteStream.byte_offset += length;
				return obj;
			}
			parseNameCharacter() {
				// Not documented in SWF19 reference, and seems to be ignored by the official Flash Player.
				// Not generated by any version of the Flash IDE, but some 3rd party tools contain it.
				// See https://www.m2osw.com/swf_tag_namecharacter
				var byteStream = this.byteStream;
				var obj = {};
				obj.id = byteStream.readUint16();
				obj.name = byteStream.readStringWithUntil();
				return obj;
			}
			parseFileAttributes() {
				var byteStream = this.byteStream;
				var obj = {};
				var flags = byteStream.readUint32();

				/// Whether this SWF requests hardware acceleration to blit to the screen.
				obj.useDirectBlit = (flags >> 6) & 1;

				/// Whether this SWF requests hardware acceleration for compositing.
				obj.useGPU = (flags >> 5) & 1;

				/// Whether this SWF contains XMP metadata in a Metadata tag.
				obj.hasMetadata = (flags >> 4) & 1;

				/// Whether this SWF uses ActionScript 3 (AVM2).
				obj.isActionScript3 = (flags >> 3) & 1;

				/// Whether this SWF should be placed in the network sandbox when run locally.
				///
				/// SWFs in the network sandbox can only access network resources,  not local resources.
				/// SWFs in the local sandbox can only access local resources, not network resources.
				obj.useNetworkSandbox = (flags >> 0) & 1;
				return obj;
			}
			parseSymbolClass() {
				var byteStream = this.byteStream;
				var obj = {};
				var symbols = [];
				var count = byteStream.readUint16();
				while (count--) {
					symbols.push({
						tagId: byteStream.readUint16(),
						path: byteStream.readStringWithUntil()
					});
				}
				obj.symbols = symbols;
				return obj;
			}
			parseFrameLabel(length) {
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				var obj = {};
				obj.label = byteStream.readStringWithUntil();
				var isAnchor = false;
				if (this._swfVersion >= 6 && (byteStream.byte_offset - startOffset) !== length) {
					isAnchor = byteStream.readUint8() != 0;
				}
				obj.isAnchor = isAnchor;
				return obj;
			}
			parseRemoveObject(ver) {
				var obj = {};
				if (ver == 1) {
					obj.characterId = this.byteStream.readUint16();
				}
				obj.depth = this.byteStream.readUint16();
				return obj;
			}
			parseExportAssets() {
				var obj = {};
				var byteStream = this.byteStream;
				var count = byteStream.readUint16();
				var packages = [];
				while (count--) {
					var id = byteStream.readUint16();
					var name = byteStream.readStringWithUntil();
					packages.push([id, name]);
				}
				obj.packages = packages;
				return obj;
			}
			parseImportAssets(ver) {
				var obj = {};
				var url = this.byteStream.readStringWithUntil();
				if (ver == 2) {
					this.byteStream.readUint8(); // Reserved; must be 1
					this.byteStream.readUint8(); // Reserved; must be 0
				}
				var num_imports = this.byteStream.readUint16();
				var imports = [];
				while (num_imports--) {
					imports.push({
						id: this.byteStream.readUint16(),
						name: this.byteStream.readStringWithUntil()
					});
				}
				obj.url = url;
				obj.imports = imports;
				return obj;
			}
			parseStartSound(ver) {
				var byteStream = this.byteStream;
				var obj = {};
				if (ver == 2) {
					obj.className = byteStream.readStringWithUntil();
				} else {
					obj.id = byteStream.readUint16();
				}
				obj.info = this.parseSoundInfo();
				return obj;
			}
			parseSoundStreamHead(ver) {
				var obj = {};
				var byteStream = this.byteStream;
				// TODO: Verify version requirements.
				obj.playback = this.parseSoundFormat();
				obj.stream = this.parseSoundFormat();
				obj.samplePerBlock = byteStream.readUint16();
				obj.latencySeek = 0;
				if (obj.stream.compression === "MP3") {
					// SWF19 says latency seek is i16, not u16. Is this wrong> How are negative values used?
					// Some software creates SWF files that incorrectly omit this value.
					// Fail silently if it's missing.
					// TODO: What is Flash's behavior in this case? Does it read the value from the following bytes?
					obj.latencySeek = byteStream.readInt16();
				}
				byteStream.byteAlign();
				return obj;
			}
			parseSoundStreamBlock(length) {
				var byteStream = this.byteStream;
				var obj = {};
				obj.compressed = byteStream.readBytes(length);
				return obj;
			}
			parseVideoFrame(length) {
				var byteStream = this.byteStream;
				var startOffset = byteStream.byte_offset;
				var obj = {};
				obj.streamId = byteStream.readUint16();
				obj.frameNum = byteStream.readUint16();
				var sub = byteStream.byte_offset - startOffset;
				var dataLength = length - sub;
				obj.videoData = byteStream.readBytes(dataLength);
				return obj;
			}
			parseCSMTextSettings() {
				var obj = {};
				var byteStream = this.byteStream;
				obj.id = byteStream.readUint16();
				var flags = byteStream.readUint8();
				obj.useAdvancedRendering = flags & 0b01000000;
				switch ((flags >> 3) & 0b11) {
					case 0:
						obj.gridFit = "none";
						break;
					case 1:
						obj.gridFit = "pixel";
						break;
					case 2:
						obj.gridFit = "subPixel";
						break;
					default:
						this.emitMessage("Invalid text grid fitting", "error");
				}
				obj.thickness = byteStream.readFloat32();
				obj.sharpness = byteStream.readFloat32();
				byteStream.readUint8(); // Reserved (0).
				return obj;
			}
		}

		SwfInput.tagCodes = {0: "End", 1: "ShowFrame", 2: "DefineShape", 4: "PlaceObject", 5: "RemoveObject", 6: "DefineBits", 7: "DefineButton", 8: "JpegTables", 9: "SetBackgroundColor", 10: "DefineFont", 11: "DefineText", 12: "DoAction", 13: "DefineFontInfo", 14: "DefineSound", 15: "StartSound", 17: "DefineButtonSound", 18: "SoundStreamHead", 19: "SoundStreamBlock", 20: "DefineBitsLossless", 21: "DefineBitsJpeg2", 22: "DefineShape2", 23: "DefineButtonCxform", 24: "Protect", 26: "PlaceObject2", 28: "RemoveObject2", 32: "DefineShape3", 33: "DefineText2", 34: "DefineButton2", 35: "DefineBitsJpeg3", 36: "DefineBitsLossless2", 37: "DefineEditText", 39: "DefineSprite", 40: "NameCharacter", 41: "ProductInfo", 43: "FrameLabel", 45: "SoundStreamHead2", 46: "DefineMorphShape", 48: "DefineFont2", 56: "ExportAssets", 57: "ImportAssets", 58: "EnableDebugger", 59: "DoInitAction", 60: "DefineVideoStream", 61: "VideoFrame", 62: "DefineFontInfo2", 63: "DebugId", 64: "EnableDebugger2", 65: "ScriptLimits", 66: "SetTabIndex", 69: "FileAttributes", 70: "PlaceObject3", 71: "ImportAssets2", 73: "DefineFontAlignZones", 74: "CsmTextSettings", 75: "DefineFont3", 76: "SymbolClass", 77: "Metadata", 78: "DefineScalingGrid", 82: "DoAbc", 83: "DefineShape4", 84: "DefineMorphShape2", 86: "DefineSceneAndFrameLabelData", 87: "DefineBinaryData", 88: "DefineFontName", 89: "StartSound2", 90: "DefineBitsJpeg4", 91: "DefineFont4", 93: "EnableTelemetry", 94: "PlaceObject4"};

		module.exports = SwfInput;
	},
	"./src/swf/swf_decompress.js": function(module, exports, __webpack_require__) {
		const ByteStream = __webpack_require__("./src/utils/byte_stream.js");
		const ZLib = __webpack_require__("./src/utils/ZLib.js");
		const LZMA = __webpack_require__("./src/utils/LZMA.js");
		const SwfInput = __webpack_require__("./src/swf/swf_input.js");
		
		class SwfDecompress {
			constructor(data) {
				this.byteStream = new ByteStream(data);
				this.clear();
				this.tick = this.tick.bind(this);
			}
			clear() {
				this.isLoad = false;
				this.result = null;
				this.header = null;
				this.headerMovie = null;
				this.fileAttributes = null;
				this._interval = null;
				this._swfVersion = 0;
				this._stopped = false;
				this._loadedType = 0;
				this._compression = null;
				this._uncompressedLength = 0;
				this._compressStream = null;
				this.aborted = false;

				// 0 RUNNING
				// 1 PROMISE
				this.status = 0;

				this.onload = null;
				this.onerror = null;
				this.onprogress = null;

				this._bytesLoaded = 0;
				this._bytesTotal = this.byteStream.length;
			}
			cancel() {
				if (this._interval) {
					clearInterval(this._interval);
					this._interval = null;
				}
				this.onload = null;
				this.onerror = null;
				this.onprogress = null;
				this.aborted = true;
			}
			load() {
				this._interval = setInterval(this.tick, 5);
			}
			getProgress() {
				return {
					bytesLoaded: this._bytesLoaded,
					bytesTotal: this._bytesTotal
				};
			}
			tick() {
				if (this.isLoad) 
					return;
				if (this._stopped) 
					return;
				this._stopped = true;
				try {
					if (this.status == 0) {
						this.tickParse();
					}
				} catch (e) {
					if (this._interval) {
						clearInterval(this._interval);
						this._interval = null;
					}
					if (this.onerror) {
						this.onerror(e);
					}
				}
				if (this.isLoad) {
					if (!this.aborted) {
						if (this.onload) {
							this.onload(this.result);
						}
					}
				}
				this._stopped = false;
			}
			tickParse() {
				if (this._loadedType == 3) {
					if (this._interval) {
						clearInterval(this._interval);
						this._interval = null;
					}
					this.result = {
						header: this.header,
						movieInfo: this.headerMovie,
						fileAttributes : this.fileAttributes,
						data: this.resultData
					};
					this.isLoad = true;
				} else {
					if (this._loadedType == 2) {
						// Some SWF streams may not be compressed correctly,
						// (e.g. incorrect data length in the stream), so decompressing
						// may throw an error even though the data otherwise comes
						// through the stream.
						// We'll still try to parse what we get if the full decompression fails.
						// (+ 8 for header size)
						if ((this.byteStream.length + 8) !== this._uncompressedLength) {
							console.log("SWF length doesn't match header, may be corrupt");
						}

						var reader = new SwfInput(this.byteStream.data, this._swfVersion);

						var bounds = reader.rect();
						var frameRate = reader.byteStream.readFixed8();
						var numFrames = reader.byteStream.readUint16();

						this.headerMovie = {
							bounds,
							frameRate,
							numFrames
						};

						var startA = reader.byteStream.byte_offset;

						this.resultData = reader.byteStream.readBytes(reader.byteStream.bytesAvailable);

						reader.byteStream.byte_offset = startA;

						var { tagcode, length } = reader.parseTagCodeLength();
						var fileAttributes = (tagcode == 69) ? reader.parseFileAttributes() : {};

						this.fileAttributes = fileAttributes;

						this._loadedType++;
					} else {
						if (this._loadedType == 1) {
							// Now the SWF switches to a compressed stream.
							if (this._compressStream) {
								this._compressStream.tick();
								this._bytesLoaded = this._compressStream.getProgress()[0];
								this._bytesTotal = this._compressStream.getProgress()[1];
								if (this.onprogress) this.onprogress(this._compressStream.loaded);
								if (this._compressStream.isLoad) {
									this.byteStream = new ByteStream(this._compressStream.result);
									this._compressStream = null;
									this._loadedType++;
								}
							} else {
								var compressStream = this.decompressStream(this._compression, this._uncompressedLength);
								if (compressStream) {
									if (compressStream instanceof Uint8Array) {
										this.byteStream = new ByteStream(compressStream);
										this._loadedType++;
									} else {
										this._compressStream = compressStream;
									}
								} else {
									this._loadedType++;
								}
							}
							if (this._loadedType == 2) {
								if (this.onprogress) this.onprogress(1);
							}
						} else {
							var header = this.parseHeader();
							this.header = header;
							this._compression = header.compression;
							this._swfVersion = header.version;
							this._uncompressedLength = header.uncompressedLength;
							if (this.onprogress) this.onprogress(0);
							this._loadedType++;
						}
					}
				}
			}
			parseHeader() {
				// Read SWF header.
				var compression = this.byteStream.readString(3);
				var version = this.byteStream.readUint8();

				// Check whether the SWF version is 0.
				// Note that the behavior should actually vary, depending on the player version:
				// - Flash Player 9 and later bail out (the behavior we implement).
				// - Flash Player 8 loops through all the frames, without running any AS code.
				// - Flash Player 7 and older don't fail and use the player version instead: a
				// function like `getSWFVersion()` in AVM1 will then return the player version.
				if (version == 0) {
					throw new Error("Invalid SWF version");
				}
				var uncompressedLength = this.byteStream.readUint32();
				return { compression, version, uncompressedLength };
			}
			decompressStream(compression, size) {
				var compressed = this.byteStream.readBytes(this.byteStream.bytesAvailable);

				// Now the SWF switches to a compressed stream.
				switch (compression) {
					case "FWS":
						return compressed;
					case "CWS":
						return new ZLib(compressed, size - 8, 0);
					case "ZWS":
						return LZMA.parse(this.byteStream.data, size - 8);
					default:
						throw new Error("Invalid SWF");
				}
			}
		}

		module.exports = SwfDecompress;
	},
	"./src/utils/byte_stream.js": function(module, exports, __webpack_require__) {
		function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
			var e, m;
			var eLen = nBytes * 8 - mLen - 1;
			var eMax = (1 << eLen) - 1;
			var eBias = eMax >> 1;
			var nBits = -7;
			var i = isLE ? nBytes - 1 : 0;
			var d = isLE ? -1 : 1;
			var s = buffer[offset + i];
			i += d;
			e = s & (1 << -nBits) - 1;
			s >>= -nBits;
			nBits += eLen;
			for (; nBits > 0; e = e * 256 + buffer[offset + i],
			i += d,
			nBits -= 8) {}
			m = e & (1 << -nBits) - 1;
			e >>= -nBits;
			nBits += mLen;
			for (; nBits > 0; m = m * 256 + buffer[offset + i],
			i += d,
			nBits -= 8) {}
			if (e === 0) {
				e = 1 - eBias
			} else if (e === eMax) {
				return m ? NaN : (s ? -1 : 1) * Infinity
			} else {
				m = m + Math.pow(2, mLen);
				e = e - eBias
			}
			return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
		}
		class ByteStream {
			constructor(data) {
				this.data = data;
				this.bit_offset = 0;
				this.byte_offset = 0;
			}
			get length() {
				return this.data.length;
			}
			get bytesAvailable() {
				return this.data.length - this.byte_offset;
			}
			readString(length) {
				var str = "";
				var count = length;
				while (count) {
					var code = this.data[this.byte_offset++];
					str += String.fromCharCode(code);
					count--;
				}
				return str;
			}
			readBytes(length) {
				this.byteAlign();
				var bytes = this.data.subarray(this.byte_offset, this.byte_offset + length);
				this.byte_offset += length;
				return bytes;
			}
			readStringWithUntil() {
				this.byteAlign();
				var bo = this.byte_offset;
				var offset = 0;
				var length = this.data.length;
				while (true) {
					var val = this.data[bo + offset];
					offset++;
					if (val === 0 || (bo + offset) >= length) {
						break;
					}
				}
				this.byte_offset = bo + offset;
				return new TextDecoder().decode(this.data.slice(bo, bo + offset - 1));
			}
			readStringWithLength() {
				var count = this.readUint8();
				var val = '';
				while (count--) {
					var dat = this.data[this.byte_offset++];
					if (dat == 0) {
						continue;
					}
					val += String.fromCharCode(dat);
				}
				return val;
			}
			incrementOffset(byteInt, bitInt) {
				this.byte_offset += byteInt;
				this.bit_offset += bitInt;
				this.byteCarry();
			}
			setOffset(byteInt, bitInt) {
				this.byte_offset = byteInt;
				this.bit_offset = bitInt;
			}
			//////// ByteReader ////////
			byteAlign() {
				if (!this.bit_offset) return;
				this.byte_offset += ((this.bit_offset + 7) / 8) | 0;
				this.bit_offset = 0;
			}
			readUint8() {
				this.byteAlign();
				return this.data[this.byte_offset++];
			}
			readUint16() {
				this.byteAlign();
				return this.data[this.byte_offset++] + (this.data[this.byte_offset++] << 8);
			}
			readUint24() {
				this.byteAlign();
				return this.data[this.byte_offset++] + (this.data[this.byte_offset++] << 8) + (this.data[this.byte_offset++] << 16);
			}
			readUint32() {
				this.byteAlign();
				return this.readInt32() >>> 0;
			}
			readUint64() {
				this.byteAlign();
				var n1 = this.readUint32();
				var n2 = this.readUint32();
				return n1 + (Math.pow(2, 32) * n2);
			}
			readInt8() {
				return this.readUint8() << 24 >> 24;
			}
			readInt16() {
				return this.readUint16() << 16 >> 16;
			}
			readInt24() {
				let t = this.readUint24();
				return t >> 23 && (t -= 16777216), t;
			}
			readInt32() {
				return (this.data[this.byte_offset++] + (this.data[this.byte_offset++] << 8) + (this.data[this.byte_offset++] << 16) + (this.data[this.byte_offset++] << 24));
			}
			readFixed8() {
				return +(this.readInt16() / 0x100).toFixed(1);
			}
			readFixed16() {
				return +(this.readInt32() / 0x10000).toFixed(2);
			}
			readFloat32() {
				var t = this.data[this.byte_offset++];
				var e = this.data[this.byte_offset++];
				var s = this.data[this.byte_offset++];
				var a = 0;
				a |= this.data[this.byte_offset++] << 24, a |= s << 16, a |= e << 8, a |= t << 0;
				const i = a >> 23 & 255;
				return a && 2147483648 !== a ? (2147483648 & a ? -1 : 1) * (8388608 | 8388607 & a) * Math.pow(2, i - 127 - 23) : 0;
			}
			readFloat64() {
				var upperBits = this.readUint32();
				var lowerBits = this.readUint32();
				var sign = upperBits >>> 31 & 0x1;
				var exp = upperBits >>> 20 & 0x7FF;
				var upperFraction = upperBits & 0xFFFFF;
				return (!upperBits && !lowerBits) ? 0 : ((sign === 0) ? 1 : -1) * (upperFraction / 1048576 + lowerBits / 4503599627370496 + 1) * Math.pow(2, exp - 1023);
			}
			readDouble() {
				var r = ieee754_read(this.data, this.byte_offset, true, 52, 8);
				this.byte_offset += 8;
				return r;
			}
			readEncodedU32() {
				this.byteAlign();
				var val = 0;
				var i = 0;
				while (i < 35) {
					var byte = this.readUint8();
					val |= (byte & 0b01111111) << i;
					if ((byte & 0b10000000) == 0) {
						break;
					}
					i += 7;
				}
				return val >>> 0;
			}
			//////// BitReader ////////
			byteCarry() {
				if (this.bit_offset > 7) {
					this.byte_offset += ((this.bit_offset + 7) / 8) | 0;
					this.bit_offset &= 0x07;
				} else {
					while (this.bit_offset < 0) {
						this.byte_offset--;
						this.bit_offset += 8;
					}
				}
			}
			readUB(n) {
				var value = 0;
				while (n--) {
					value <<= 1;
					value |= this.readBit();
				}
				return value >>> 0;
			}
			readBit() {
				var val = (this.data[this.byte_offset] >> (7 - this.bit_offset++)) & 0x1;
				this.byteCarry();
				return val;
			}
			readSB(n) {
				var uval = this.readUB(n);
				var shift = 32 - n;
				return (uval << shift) >> shift;
			}
			readSBFixed8(n) {
				return +(this.readSB(n) / 0x100).toFixed(2);
			}
			readSBFixed16(n) {
				return +(this.readSB(n) / 0x10000).toFixed(4);
			}
		}
		module.exports = ByteStream;
	},
	"./src/utils/html_reader.js": function(module, exports, __webpack_require__) {
		class HTMLReader {
			constructor(source) {
				this.source = source;
				this.index = 0;
			}
			char() {
				return this.source[this.index];
			}
			charAt(index) {
				return this.source[index];
			}
			next() {
				this.index++;
			}
			isEOF() {
				return this.index >= this.source.length;
			}
			peek(length = 1, offset = 1) {
				if (length === 1)
					return this.charAt(this.index + offset);
				let result = '';
				for (var i = 0; i < length; i++) {
					result += this.charAt(this.index + offset + i);
				}
				return result;
			}
			skipWhilespace() {
				while (/\s/.test(this.char())) {
					if (this.isEOF()) break;
					this.next();
				}
			}
			lineInfo() {
				let line = 0;
				let column = 0;
				for (var i = 0; i < this.index; i++) {
					if (this.source[i] === '\n') {
						line++;
						column = 0;
					}
					else {
						column++;
					}
				}
				return { line: line + 1, column: column + 1 };
			}
			error(message) {
				const { line, column } = this.lineInfo();
				throw new SyntaxError(`HTMLParser: ${message} (Line ${line} Column ${column})`);
			}
			expect(char) {
				if (this.char() !== char) {
					this.error(`Expected '${char}' but found '${this.char()}'`);
				}
				this.next();
			}
			readAttributes() {
				var result = [];
				this.skipWhilespace();
				while(this.char() != ">") {
					this.skipWhilespace();
					if (this.isEOF()) break;
					var name = "";
					while(((!this.isEOF()) && (this.char() != " ") && (this.char() != "=") && (this.char() != ">"))) {
						name += this.char();
						this.next();
					}
					this.skipWhilespace();
					if (this.isEOF() || (this.char() == ">")) {
						result.push([name]);
					} else {
						if (this.char() == "=") {
							this.next();
							this.skipWhilespace();
							var value = this.readString();
							result.push([name, value]);
						}
					}
				}
				return result;
			}
			readString() {
				this.expect('"');
				let result = '';
				if (this.char() === '"') {
					this.next();
					return '';
				}
				while (true) {
					const char = this.char();
					result += char;
					if (this.peek() === '"') {
						break;
					}
					this.next();
				}
				this.next();
				this.expect('"');
				return result;
			}
			readEvent() {
				this.skipWhilespace();
				if (this.isEOF()) return null;
				if (this.char() == "<") {
					this.next();
					var tagName = "";
					if (this.char() == "/") {
						this.next();
						while(((!this.isEOF()) && (this.char() != " ") && (this.char() != ">"))) {
							tagName += this.char();
							this.next();
						}
						this.expect(">");
						return {
							type: "end",
							tagName
						}
					} else {
						while(((!this.isEOF()) && (this.char() != " ") && (this.char() != ">"))) {
							tagName += this.char();
							this.next();
						}
						var attributes = this.readAttributes();
						this.expect(">");
						return {
							type: "start",
							tagName,
							attributes
						}
					}
					
				} else {
					var text = "";
					while(((!this.isEOF()) && (this.char() != "<"))) {
						text += this.char();
						this.next();
					}
					return {
						type: "text",
						text
					}
				}
			}
		}

		module.exports = HTMLReader;
	},
	"./src/utils/LZMA.js": function(module, exports, __webpack_require__) {
		function __init(e) {
			const t = [];
			t.push(e[12], e[13], e[14], e[15], e[16], e[4], e[5], e[6], e[7]);
			let s = 8;
			for (let e = 5; e < 9; ++e) {
				if (t[e] >= s) {
					t[e] = t[e] - s | 0;
					break
				}
				t[e] = 256 + t[e] - s | 0,s = 1
			}
			return t.push(0, 0, 0, 0), e.set(t, 4),e.subarray(4)
		}
		function __reverseDecode2(e, t, s, i) {
			let r = 1, o = 0, d = 0;
			for (; d < i; ++d) {
				const i = s.decodeBit(e, t + r);
				r = r << 1 | i,o |= i << d
			}
			return o
		}
		function __decompress(e, t) {
			const s = new Decoder, i = s.decodeHeader(e), r = i.uncompressedSize;
			if (s.setProperties(i),!s.decodeBody(e, t, r))
				throw new Error("Error in lzma data stream");
			return t
		}
		const OutWindow = function() {
			this._buffer = null,
			this._stream = null,
			this._pos = 0,
			this._streamPos = 0,
			this._windowSize = 0
		}
		OutWindow.prototype.create = function(e) {
			this._buffer && this._windowSize === e || (this._buffer = new Uint8Array(e)),
			this._windowSize = e
		}
		OutWindow.prototype.flush = function() {
			const e = this._pos - this._streamPos;
			e && (this._stream.writeBytes(this._buffer, e),
			this._pos >= this._windowSize && (this._pos = 0),
			this._streamPos = this._pos)
		}
		OutWindow.prototype.releaseStream = function() {
			this.flush(),
			this._stream = null
		}
		OutWindow.prototype.setStream = function(e) {
			this._stream = e
		}
		OutWindow.prototype.init = function(e=!1) {
			e || (this._streamPos = 0,this._pos = 0)
		}
		OutWindow.prototype.copyBlock = function(e, t) {
			let s = this._pos - e - 1;
			for (s < 0 && (s += this._windowSize); t--; )
				s >= this._windowSize && (s = 0),
				this._buffer[this._pos++] = this._buffer[s++],
				this._pos >= this._windowSize && this.flush()
		}
		OutWindow.prototype.putByte = function(e) {
			this._buffer[this._pos++] = e,
			this._pos >= this._windowSize && this.flush()
		}
		OutWindow.prototype.getByte = function(e) {
			let t = this._pos - e - 1;
			return t < 0 && (t += this._windowSize),this._buffer[t]
		}
		const RangeDecoder = function() {
			this._stream = null,
			this._code = 0,
			this._range = -1
		}
		RangeDecoder.prototype.setStream = function(e) {
			this._stream = e
		}
		RangeDecoder.prototype.releaseStream = function() {
			this._stream = null
		}
		RangeDecoder.prototype.init = function() {
			let e = 5;
			for (this._code = 0,this._range = -1; e--; ) this._code = this._code << 8 | this._stream.readByte()
		}
		RangeDecoder.prototype.decodeDirectBits = function(e) {
			let t = 0, s = e;
			for (; s--; ) {
				this._range >>>= 1;
				const e = this._code - this._range >>> 31;
				this._code -= this._range & e - 1,t = t << 1 | 1 - e,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8)
			}
			return t
		}
		RangeDecoder.prototype.decodeBit = function(e, t) {
			const s = e[t], i = (this._range >>> 11) * s;
			return (2147483648 ^ this._code) < (2147483648 ^ i) ? (this._range = i,e[t] += 2048 - s >>> 5,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8),0) : (this._range -= i,this._code -= i,e[t] -= s >>> 5,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8),1)
		}
		const BitTreeDecoder = function(e) {
			this._models = Array(1 << e).fill(1024),
			this._numBitLevels = e
		}
		BitTreeDecoder.prototype.decode = function(e) {
			let t = 1, s = this._numBitLevels;
			for (; s--; )t = t << 1 | e.decodeBit(this._models, t);
			return t - (1 << this._numBitLevels)
		}
		BitTreeDecoder.prototype.reverseDecode = function(e) {
			let t = 1, s = 0, i = 0;
			for (; i < this._numBitLevels; ++i) {
				const r = e.decodeBit(this._models, t);
				t = t << 1 | r,s |= r << i
			}
			return s
		}
		const LenDecoder = function() {
			this._choice = [1024, 1024],
			this._lowCoder = [],
			this._midCoder = [],
			this._highCoder = new BitTreeDecoder(8),
			this._numPosStates = 0
		}
		LenDecoder.prototype.create = function(e) {
			for (; this._numPosStates < e; ++this._numPosStates) this._lowCoder[this._numPosStates] = new BitTreeDecoder(3),this._midCoder[this._numPosStates] = new BitTreeDecoder(3)
		}
		LenDecoder.prototype.decode = function(e, t) {
			return 0 === e.decodeBit(this._choice, 0) ? this._lowCoder[t].decode(e) : 0 === e.decodeBit(this._choice, 1) ? 8 + this._midCoder[t].decode(e) : 16 + this._highCoder.decode(e)
		}
		const Decoder2 = function() {
			this._decoders = Array(768).fill(1024)
		}
		Decoder2.prototype.decodeNormal = function(e) {
			let t = 1;
			do {
				t = t << 1 | e.decodeBit(this._decoders, t)
			} while (t < 256);return 255 & t
		}
		Decoder2.prototype.decodeWithMatchByte = function(e, t) {
			let s = 1;
			do {
				const i = t >> 7 & 1;
				t <<= 1;
				const r = e.decodeBit(this._decoders, (1 + i << 8) + s);
				if (s = s << 1 | r,i !== r) {
					for (; s < 256; )s = s << 1 | e.decodeBit(this._decoders, s);
					break
				}
			} while (s < 256);return 255 & s
		}
		const LiteralDecoder = function() {
		}
		LiteralDecoder.prototype.create = function(e, t) {
			if (this._coders && this._numPrevBits === t && this._numPosBits === e) return;
			this._numPosBits = e,
			this._posMask = (1 << e) - 1,
			this._numPrevBits = t,
			this._coders = [];
			let s = 1 << this._numPrevBits + this._numPosBits;
			for (; s--; )this._coders[s] = new Decoder2
		}
		LiteralDecoder.prototype.getDecoder = function(e, t) {
			return this._coders[((e & this._posMask) << this._numPrevBits) + ((255 & t) >>> 8 - this._numPrevBits)]
		}
		const Decoder = function() {
			this._outWindow = new OutWindow,
			this._rangeDecoder = new RangeDecoder,
			this._isMatchDecoders = Array(192).fill(1024),
			this._isRepDecoders = Array(12).fill(1024),
			this._isRepG0Decoders = Array(12).fill(1024),
			this._isRepG1Decoders = Array(12).fill(1024),
			this._isRepG2Decoders = Array(12).fill(1024),
			this._isRep0LongDecoders = Array(192).fill(1024),
			this._posDecoders = Array(114).fill(1024),
			this._posAlignDecoder = new BitTreeDecoder(4),
			this._lenDecoder = new LenDecoder,
			this._repLenDecoder = new LenDecoder,
			this._literalDecoder = new LiteralDecoder,
			this._dictionarySize = -1,
			this._dictionarySizeCheck = -1,
			this._posSlotDecoder = [new BitTreeDecoder(6), new BitTreeDecoder(6), new BitTreeDecoder(6), new BitTreeDecoder(6)]
		}
		Decoder.prototype.setDictionarySize = function(e) {
			return !(e < 0) && (this._dictionarySize !== e && (this._dictionarySize = e,this._dictionarySizeCheck = Math.max(this._dictionarySize, 1),this._outWindow.create(Math.max(this._dictionarySizeCheck, 4096))),!0)
		}
		Decoder.prototype.setLcLpPb = function(e, t, s) {
			if (e > 8 || t > 4 || s > 4)return !1;
			const i = 1 << s;
			return this._literalDecoder.create(t, e),this._lenDecoder.create(i),this._repLenDecoder.create(i),this._posStateMask = i - 1,!0
		}
		Decoder.prototype.setProperties = function(e) {
			if (!this.setLcLpPb(e.lc, e.lp, e.pb))throw Error("Incorrect stream properties");
			if (!this.setDictionarySize(e.dictionarySize))throw Error("Invalid dictionary size")
		}
		Decoder.prototype.decodeHeader = function(e) {
			if (e._$size < 13)return !1;
			let t = e.readByte();
			const s = t % 9;
			t = ~~(t / 9);
			const i = t % 5, r = ~~(t / 5);let o = e.readByte();o |= e.readByte() << 8,o |= e.readByte() << 16,o += 16777216 * e.readByte();let d = e.readByte();return d |= e.readByte() << 8,d |= e.readByte() << 16,d += 16777216 * e.readByte(),e.readByte(),e.readByte(),e.readByte(),e.readByte(),{lc: s,lp: i,pb: r,dictionarySize: o,uncompressedSize: d}
		}
		Decoder.prototype.decodeBody = function(e, t, s) {
			let i, r, o = 0, d = 0, h = 0, c = 0, n = 0, _ = 0, a = 0;
			for (this._rangeDecoder.setStream(e),this._rangeDecoder.init(),this._outWindow.setStream(t),this._outWindow.init(!1); _ < s; ) {
				const e = _ & this._posStateMask;if (0 === this._rangeDecoder.decodeBit(this._isMatchDecoders, (o << 4) + e)) {
					const e = this._literalDecoder.getDecoder(_++, a);a = o >= 7 ? e.decodeWithMatchByte(this._rangeDecoder, this._outWindow.getByte(d)) : e.decodeNormal(this._rangeDecoder),this._outWindow.putByte(a),o = o < 4 ? 0 : o - (o < 10 ? 3 : 6)
				} else {
					if (1 === this._rangeDecoder.decodeBit(this._isRepDecoders, o))i = 0,0 === this._rangeDecoder.decodeBit(this._isRepG0Decoders, o) ? 0 === this._rangeDecoder.decodeBit(this._isRep0LongDecoders, (o << 4) + e) && (o = o < 7 ? 9 : 11,i = 1) : (0 === this._rangeDecoder.decodeBit(this._isRepG1Decoders, o) ? r = h : (0 === this._rangeDecoder.decodeBit(this._isRepG2Decoders, o) ? r = c : (r = n,n = c),c = h),h = d,d = r),0 === i && (i = 2 + this._repLenDecoder.decode(this._rangeDecoder, e),o = o < 7 ? 8 : 11);else {n = c,c = h,h = d,i = 2 + this._lenDecoder.decode(this._rangeDecoder, e),o = o < 7 ? 7 : 10;const t = this._posSlotDecoder[i <= 5 ? i - 2 : 3].decode(this._rangeDecoder);
						if (t >= 4) {
							const e = (t >> 1) - 1;if (d = (2 | 1 & t) << e,t < 14)d += __reverseDecode2(this._posDecoders, d - t - 1, this._rangeDecoder, e);
							else if (d += this._rangeDecoder.decodeDirectBits(e - 4) << 4,d += this._posAlignDecoder.reverseDecode(this._rangeDecoder),d < 0) {
								if (-1 === d)break;
								return !1
							}
						} else d = t
					}
					if (d >= _ || d >= this._dictionarySizeCheck)return !1;
					this._outWindow.copyBlock(d, i),_ += i,a = this._outWindow.getByte(0)
				}
			}
			return this._outWindow.releaseStream(),this._rangeDecoder.releaseStream(),!0
		}
		const InStream = function(e) {
			this._$data = e;
			this._$size = e.length;this._$offset = 0;
		}
		InStream.prototype.readByte = function() {
			return this._$data[this._$offset++];
		}
		const OutStream = function(e) {
			this.size = 0;
			this.buffers = e;
		}
		OutStream.prototype.writeBytes = function(e, t) {
			if (e.length === t) {
				this.buffers.set(e, this.size);
			} else {
				this.buffers.set(e.subarray(0, t), this.size);
			}
			this.size += t;
		}
		module.exports = {
			parse: function (data, fileLength) {
				const t = fileLength,s = data.slice(0),i = new Uint8Array(t);
				__decompress(new InStream(__init(s)), new OutStream(i));
				return i
			}
		};
	},
	"./src/utils/yuv420_to_rgba.js": function(module, exports, __webpack_require__) {
		function SATURATE(_) {
			return (_ > 255) ? 255 : ((_ < 0) ? 0 : _);
		}
		function yuv420_to_rgba(y, u, v, y_width) {
			let y_height = (y.length / y_width) | 0;
			let chroma_width = ((y_width + 1) / 2) | 0;
			let rgba = new Uint8Array(y.length * 4);
			for (let h = 0; h < y_height; h++) {
				for (let w = 0; w < y_width; w++) {
					let idx = w + h * y_width;
					let chroma_idx = (w >> 1) + (h >> 1) * chroma_width;
					let Y = y[idx] - 16;
					let U = u[chroma_idx] - 128;
					let V = v[chroma_idx] - 128;
					let outputData_pos = w * 4 + y_width * h * 4;
					rgba[outputData_pos] = SATURATE(1.164 * Y + 1.596 * V);
					rgba[outputData_pos + 1] = SATURATE(1.164 * Y - 0.813 * V - 0.391 * U);
					rgba[outputData_pos + 2] = SATURATE(1.164 * Y + 2.018 * U);
					rgba[outputData_pos + 3] = 255;
				}
			}
			return rgba;
		}
		module.exports = yuv420_to_rgba;
	},
	"./src/utils/ZLib.js": function(module, exports, __webpack_require__) {
		const fixedDistTable = {
			key: new Uint16Array([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]),
			value: new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
		}
		const fixedLitTable = {
			key: new Uint16Array([7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]),
			value: new Uint16Array([256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 280, 281, 282, 283, 284, 285, 286, 287, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255])
		}

		const ORDER = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
		const LEXT = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99]);
		const LENS = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]);
		const DEXT = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
		const DISTS = new Uint16Array([ 1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577]);
		
		function buildHuffTable(data) {
			const length = data.length;
			let maxBits = Math.max.apply(null, data);
			const blCount = new Uint8Array(maxBits);
			let i = length;
			let len = 0;
			while (i--) 
				len = data[i],
				blCount[len] += (len > 0);
			let code = 0;
			const nextCode = new Uint16Array(maxBits + 1);
			let o = 0;
			for (i = 0; i < maxBits; ) {
				code = (code + blCount[i++]) << 1;
				nextCode[i] = code | 0;
				o = Math.max(o, code);
			}
			const n = o + length;
			const key = new Uint16Array(n);
			const value = new Uint16Array(n);
			for (i = 0; i < length; i++) {
				len = data[i];
				if (len) {
					const tt = nextCode[len];
					key[tt] = len;
					value[tt] = i;
					nextCode[len] = (tt + 1) | 0;
				}
			}
			return { key, value };
		}

		function decodeSymbol(b, key, value) {
			var len = 0;
			var code = 0;
			while (true) {
				code = (code << 1) | b.readUB(1);
				len++;
				if (key[code] === len) {
					return value[code];
				}
			}
		}

		class ZLib {
			constructor(data, size, startOffset) {
				this.stream = data;
				this.isEnd = false;
				this.result = null;
				this.size = size + startOffset;
				this.loaded = 0;
				this.isLoad = false;
				this._data = new Uint8Array(size);
				for (let i = 0; i < startOffset; i++) {
					this._data[i] = this.stream[i];
				}
				this._size = startOffset;
				this.byte_offset = startOffset + 2;
				this.bit_offset = 8;
				this.bit_buffer = null;
			}
			static decompress(arrayBuffer, uncompressedSizesize, startOffset) {
				var r = new ZLib(arrayBuffer, uncompressedSizesize, startOffset || 0);
				return r.tick(true);
			}
			readUB(length) {
				var value = 0;
				for (var i = 0; i < length; i++) {
					if (this.bit_offset === 8) {
						this.bit_buffer = this.stream[this.byte_offset++];
						this.bit_offset = 0;
					}
					value |= (this.bit_buffer & (1 << this.bit_offset++) ? 1 : 0) << i;
				}
				return value;
			}
			readNumber(n) {
				var value = 0;
				var o = this.byte_offset;
				var i = o + n;
				while (i > o) {
					value = (value << 8) | this.stream[--i];
				}
				this.byte_offset += n;
				return value;
			}
			tick(tsTurbo) {
				if (this.isEnd) return;
				var sym = 0;
				var i = 0;
				var length = 0;
				var data = this._data;
				var _this = this;
				var flag = 0;
				var _size = this._size;
				var startTime = Date.now();
				var codeLengths = new Uint8Array(19);
				while (true) {
					flag = _this.readUB(1);
					var type = _this.readUB(2);
					var distTable = null;
					var litTable = null;
					switch (type) {
						case 0:
							this.bit_offset = 8;
							this.bit_buffer = null;
							length = _this.readNumber(2);
							_this.readNumber(2);
							while (length--) {
								data[_size++] = _this.readNumber(1);
							}
							break;
						default:
							switch (type) {
								case 1:
									distTable = fixedDistTable;
									litTable = fixedLitTable;
									break;
								default:
									const numLitLengths = _this.readUB(5) + 257;
									const numDistLengths = _this.readUB(5) + 1;
									const numCodeLengths = _this.readUB(4) + 4;
									for (i = 0; i < numCodeLengths; i++) {
										codeLengths[ORDER[i]] = _this.readUB(3);
									}
									const codeTable = buildHuffTable(codeLengths);
									codeLengths.fill(0);
									var prevCodeLen = 0;
									const maxLengths = numLitLengths + numDistLengths;
									const litLengths = new Uint8Array(maxLengths);
									let litLengthSize = 0;
									while (litLengthSize < maxLengths) {
										sym = decodeSymbol(_this, codeTable.key, codeTable.value);
										switch (sym) {
											case 0:
											case 1:
											case 2:
											case 3:
											case 4:
											case 5:
											case 6:
											case 7:
											case 8:
											case 9:
											case 10:
											case 11:
											case 12:
											case 13:
											case 14:
											case 15:
												litLengths[litLengthSize++] = sym;
												prevCodeLen = sym;
												break;
											case 16:
												i = _this.readUB(2) + 3;
												litLengths.fill(prevCodeLen, litLengthSize, litLengthSize + i);
												litLengthSize += i;
												break;
											case 17:
												i = _this.readUB(3) + 3;
												litLengthSize += i;
												break;
											case 18:
												i = _this.readUB(7) + 11;
												litLengthSize += i;
												break;
										}
									}
									distTable = buildHuffTable(litLengths.subarray(numLitLengths));
									litTable = buildHuffTable(litLengths.subarray(0, numLitLengths));
							}
							sym = 0;
							while (true) {
								sym = (0 | decodeSymbol(_this, litTable.key, litTable.value));
								if (256 === sym) break;
								if (sym < 256) {
									data[_size++] = sym;
								} else {
									const mapIdx = sym - 257 | 0;
									length = LENS[mapIdx] + _this.readUB(LEXT[mapIdx]) | 0;
									const distMap = decodeSymbol(_this, distTable.key, distTable.value);
									i = _size - (DISTS[distMap] + _this.readUB(DEXT[distMap]) | 0) | 0;
									while (length--) {
										data[_size++] = data[i++];
									}
								}
							}
					}
					if (flag) {
						this.isEnd = true;
						this.isLoad = true;
						this.result = data;
						break;
					}
					if (!tsTurbo && ((Date.now() - startTime) > 40)) {
						break;
					}
				}
				if (tsTurbo) {
					return this.result;
				}
				this._size = _size;
				this.loaded = (_size / this.size);
			}
			getProgress() {
				return [this.byte_offset, this.stream.length];
			}
		}
		module.exports = ZLib;
	},
	"./src/video/decoder/h263.js": function(module, exports, __webpack_require__) {
		const Bitmap = __webpack_require__("./src/render/bitmap.js");
		const AT_H263_Decoder = __webpack_require__("./lib/at-h263-js.js");

		const H263Decoder = function (deblocking) {
			this.state = new AT_H263_Decoder.H263State({
				sorensonSpark: true,
				useScalabilityMode: false,
			});
			this.deblocking = deblocking;
		};
		H263Decoder.prototype.preloadFrame = function (encodedFrame) {
			var reader = new AT_H263_Decoder.H263Reader(encodedFrame.data);
			let picture = this.state.parsePicture(reader, null);
			switch(picture.picture_type.getType()) {
				case "IFrame":
					return false;
				case "PFrame":
				case "DisposablePFrame":
					return true;
				default:
					throw new Error("Invalid picture type code: " + picture.picture_type.type);
			}
		};
		H263Decoder.prototype.decodeFrame = function (encodedFrame) {
			var reader = new AT_H263_Decoder.H263Reader(encodedFrame.data);
			this.state.decodeNextPicture(reader);
			var picture = this.state.getLastPicture();
			let [y, b, r] = picture.as_yuv();
			let [width, height] = picture.format.intoWidthAndHeight();
			var yuv = new Uint8Array(y.length + b.length + r.length);
			yuv.set(y, 0);
			yuv.set(b, y.length);
			yuv.set(r, y.length + b.length);
			return new Bitmap(width, height, Bitmap.YUV420P, yuv);
		};

		module.exports = H263Decoder;
	},
	"./src/video/decoder/screen.js": function(module, exports, __webpack_require__) {
		const Bitmap = __webpack_require__("./src/render/bitmap.js");
		const ZLib = __webpack_require__("./src/utils/ZLib.js");

		const ByteReader = function(data) {
			this.data = data;
			this.offest = 0;
		}
		ByteReader.prototype.readByte = function() {
			if (this.offest >= this.data.length) 
				throw new Error("Unexpected end of file");
			return this.data[this.offest++];
		}
		ByteReader.prototype.readUint16be = function() {
			var byte1 = this.readByte();
			var byte2 = this.readByte();
			return (byte1 << 8) | byte2;
		}
		ByteReader.prototype.readBuf = function(length) {
			if ((this.offest + length) > this.data.length) 
				throw new Error("Unexpected end of file");
			var result = this.data.subarray(this.offest, this.offest + length);
			this.offest += length;
			return result;
		}
		
		const ScreenVideoDecoder = function (version) {
			this.version = version;
			this.w = 0;
			this.h = 0;
			this.blockW = 0;
			this.blockH = 0;
			this.lastFrame = null;
		};
		ScreenVideoDecoder.prototype.preloadFrame = function (encodedFrame) {
			var byte_input = new ByteReader(encodedFrame.data);
			var type = byte_input.readByte() >> 4;
			switch (type) {
				case 1:
					return 0;
				case 2:
					return 1;
				default:
					throw new Error("Invalid frame type: " + type);
			}
		}
		ScreenVideoDecoder.prototype.fillBlock = function (a, b, x, y, cur_w, cur_h) {
			for (let _y = 0; _y < cur_h; _y++) {
				for (let _x = 0; _x < cur_w; _x++) {
					var rgbIdx = (_x + (cur_w * ((cur_h - _y) - 1))) * 3;
					var idx = ((_x + x) + (this.w * (_y + y))) * 4;
					a[idx] = b[rgbIdx + 2];
					a[idx + 1] = b[rgbIdx + 1];
					a[idx + 2] = b[rgbIdx];
					a[idx + 3] = 255;
				}
			}
		}
		ScreenVideoDecoder.prototype.decodeFrame = function (encodedFrame) {
			var byte_input = new ByteReader(encodedFrame.data);
			var isKeyframe = byte_input.readByte() >> 4 == 1;
			if (!isKeyframe && !this.lastFrame) 
				throw new Error("Missing reference frame");
			var hdr0 = byte_input.readUint16be();
			var blk_w = ((hdr0 >> 12) * 16) + 16;
			var w = hdr0 & 0xFFF;
			var hdr1 = byte_input.readUint16be();
			var blk_h = ((hdr1 >> 12) * 16) + 16;
			var h = hdr1 & 0xFFF;
			if (this.w != w || this.h != h || this.blockW != blk_w || this.blockH != blk_h) {
				this.w = w;
				this.h = h;
				this.blockW = blk_w;
				this.blockH = blk_h;
				this.lastFrame = new Uint8Array(w * h * 4);
			}
			var rgba = this.lastFrame;
			var is_intra = true;
			for (let yc = 0; yc < this.h; yc += this.blockH) {
				let cur_h = Math.min((this.h - yc), this.blockH);
				for (let xc = 0; xc < this.w; xc += this.blockW) {
					let cur_w = Math.min((this.w - xc), this.blockW);
					var dataSize = byte_input.readUint16be();
					if (dataSize > 0) this.fillBlock(rgba, ZLib.decompress(byte_input.readBuf(dataSize), (cur_w * cur_h) * 3), xc, (this.h - yc) - cur_h, cur_w, cur_h);
					else is_intra = false;
				}
			}
			if (is_intra != isKeyframe) 
				throw new Error("Not all blocks were updated by a supposed keyframe");
			return new Bitmap(w, h, Bitmap.RGBA, rgba);
		};

		module.exports = ScreenVideoDecoder;
	},
	"./src/video/decoder/vp6.js": function(module, exports, __webpack_require__) {
		const Bitmap = __webpack_require__("./src/render/bitmap.js");
		const AT_NIHAV_VP6_Decoder = __webpack_require__("./lib/at-vp6.min.js");
		const log = __webpack_require__("./src/core/log.js");

		function crop(data, width, to_width, to_height) {
			let height = (data.length / width) | 0;
			if (width > to_width) {
				let new_width = to_width;
				let new_height = Math.min(height, to_height);
				let _data = new Uint8Array(new_width * new_height);
				for (let row = 0; row < new_height; row++) {
					_data.set(data.subarray(row * width, (row * width + new_width)), row * new_width);
				}
				return _data;
			} else {
				return data.subarray(0, width * Math.min(height, to_height));
			}
		}

		const Vp6Decoder = function (size, withAlpha) {
			this.width = size[0];
			this.height = size[1];
			this.withAlpha = withAlpha;
			this.decoder = new AT_NIHAV_VP6_Decoder.VP56Decoder(6, withAlpha, true);
			this.support = new AT_NIHAV_VP6_Decoder.NADecoderSupport();
			this.bitreader = new AT_NIHAV_VP6_Decoder.VP6BR();
			this.initCalled = false;
			this.lastFrame = null; // NABufferRef NAVideoBuffer
		};
		Vp6Decoder.prototype.preloadFrame = function (encodedFrame) {
			let flag_index = this.withAlpha ? 3 : 0;
			return encodedFrame.data[flag_index] & 128;
		};
		Vp6Decoder.prototype.decodeFrame = function (encodedFrame) {
			var videoData = encodedFrame.data;
			if (!this.initCalled) {
				var bool_coder = new AT_NIHAV_VP6_Decoder.BoolCoder(videoData.subarray(this.withAlpha ? 3 : 0));
				let header = this.bitreader.parseHeader(bool_coder);
				let video_info = new AT_NIHAV_VP6_Decoder.NAVideoInfo(header.disp_w * 16, header.disp_h * 16, true, this.withAlpha ? AT_NIHAV_VP6_Decoder.VP_YUVA420_FORMAT : AT_NIHAV_VP6_Decoder.YUV420_FORMAT);
				this.decoder.init(this.support, video_info);
				this.initCalled = true;
			}
			let decoded;
			var frame = null;
			decoded = this.decoder.decode_frame(this.support, videoData, this.bitreader);
			frame = decoded[0].value;
			let yuv = frame.get_data();
			let [width, height] = frame.get_dimensions(0);
			let [chroma_width, chroma_height] = frame.get_dimensions(1);
			let offsets = [
				frame.get_offset(0),
				frame.get_offset(1),
				frame.get_offset(2)
			];
			if ((width < this.width) || (height < this.height)) {
				log.warn("A VP6 video frame is smaller than the bounds of the stream it belongs in. This is not supported.");
			}
			let y = yuv.subarray(offsets[0], offsets[0] + width * height);
			let u = yuv.subarray(offsets[1], offsets[1] + chroma_width * chroma_height);
			let v = yuv.subarray(offsets[2], offsets[2] + chroma_width * chroma_height);
			let _y = crop(y, width, this.width, this.height);
			let _u = crop(u, chroma_width, ((this.width + 1) / 2) | 0, ((this.height + 1) / 2) | 0);
			let _v = crop(v, chroma_width, ((this.width + 1) / 2) | 0, ((this.height + 1) / 2) | 0);
			width = this.width;
			height = this.height;
			if (this.withAlpha) {
				let [alpha_width, alpha_height] = frame.get_dimensions(3);
				let alpha_offset = frame.get_offset(3);
				let alpha = yuv.subarray(alpha_offset, alpha_offset + alpha_width * alpha_height);
				let a = crop(alpha, alpha_width, this.width, this.height);
				let yuvData = new Uint8Array(_y.length + _u.length + _v.length + a.length);
				yuvData.set(_y, 0);
				yuvData.set(_u, _y.length);
				yuvData.set(_v, _y.length + _u.length);
				yuvData.set(a, _y.length + _u.length + _v.length);
				return new Bitmap(width, height, Bitmap.YUVA420P, yuvData);
			} else {
				let yuvData = new Uint8Array(_y.length + _u.length + _v.length);
				yuvData.set(_y, 0);
				yuvData.set(_u, _y.length);
				yuvData.set(_v, _y.length + _u.length);
				return new Bitmap(width, height, Bitmap.YUV420P, yuvData);
			}
		};

		module.exports = Vp6Decoder;
	},
	"./src/video/backend.js": function(module, exports, __webpack_require__) {
		const H263Decoder = __webpack_require__("./src/video/decoder/h263.js");
		const ScreenVideoDecoder = __webpack_require__("./src/video/decoder/screen.js");
		const Vp6Decoder = __webpack_require__("./src/video/decoder/vp6.js");
		const log = __webpack_require__("./src/core/log.js");

		/// Software video backend that proxies to CPU-only codec implementations that
		/// ship with PinkFie.

		const VideoStream = function(decoder) {
			this.bitmap = null;
			this.decoder = decoder;
		}

		class VideoBackend {
			constructor() {
			}
			registerVideoStream(_num_frames, size, codec, filter) {
				var decoder;
				switch (codec) {
					case "none":
						decoder = null;
						break;
					case "H263":
						decoder = new H263Decoder(filter);
						break;
					case "ScreenVideo":
						decoder = new ScreenVideoDecoder(false);
						break;
					case "Vp6":
						decoder = new Vp6Decoder(size, false);
						break;
					case "Vp6WithAlpha":
						decoder = new Vp6Decoder(size, true);
						break;
					default:
						log.error("Unsupported video codec type " + codec);
				}
				return new VideoStream(decoder);
			}
			preloadVideoStreamFrame(stream, encodedFrame) {
				return stream.decoder.preloadFrame(encodedFrame);
			}
			decodeVideoStreamFrame(stream, encodedFrame, renderer) {
				var _stream = stream;
				var decoder = _stream.decoder;
				var result = decoder.decodeFrame(encodedFrame);
				let handle;
				if (result || !stream.bitmap) {
					if (stream.bitmap) {
						handle = stream.bitmap;
						renderer.updateTexture(handle, result);
					} else {
						handle = renderer.registerBitmap(result);
					}    
				} else {
					handle = stream.bitmap;
				}
				stream.bitmap = handle;
				return handle;
			}
		}
		module.exports = VideoBackend;
	},
	"./src/config.js": function(module, exports, __webpack_require__) {
		module.exports = {
			useWebGL: false
		}
	},
	"./src/index.js": function(module, exports, __webpack_require__) {
		const config = __webpack_require__("./src/config.js");
		const SwfDecompress = __webpack_require__("./src/swf/swf_decompress.js");
		const shapeUtils = __webpack_require__("./src/render/shape_utils.js");
		const Player = __webpack_require__("./src/pinkfie_player.js");
		const H263Decoder = __webpack_require__("./src/video/decoder/h263.js");
		const ScreenVideoDecoder = __webpack_require__("./src/video/decoder/screen.js");
		const Vp6Decoder = __webpack_require__("./src/video/decoder/vp6.js");
		const SwfInput = __webpack_require__("./src/swf/swf_input.js");
		const AudioMixer = __webpack_require__("./src/core/audio/mixer.js");
		const {
			decodeDefineBitsJpeg,
			glueTablesToJpeg,
			decodeDefineBitsLossless
		} = __webpack_require__("./src/render/utils.js");
		module.exports = {
			SwfInput,
			SwfDecompress,
			shapeUtils,
			Player,
			AudioMixer,
			H263Decoder,
			ScreenVideoDecoder,
			Vp6Decoder,
			decodeDefineBitsJpeg,
			glueTablesToJpeg,
			decodeDefineBitsLossless,
			config
		}
	},
	"./src/pinkfie_player.js": function(module, exports, __webpack_require__) {
		const Player = __webpack_require__("./src/core/player.js");
		const SwfDecompress = __webpack_require__("./src/swf/swf_decompress.js");
		const { SwfMovie } = __webpack_require__("./src/core/tag_utils.js");
		const log = __webpack_require__("./src/core/log.js");
		
		function getByteText(byte) {
			if (byte >= 1000000) {
				return "" + (Math.floor(byte / 10000) / 100) + "MB";
			} else {
				if (byte >= 1000) {
					return "" + Math.floor(byte / 1000) + "KB";
				} else {
					return "" + byte + "B";
				}
			}
		}

		class ExecutionLimit {
			constructor(limit) {
				this.limit = limit;
			}
			didOpsBreachLimit(context, g) {
				this.limit -= g;
				return this.limit < 0;
			}
		}

		class Loader {
			constructor(file) {
				this.progressText = 'loading';
				this.swfFile = file;
				this.onload = null;
				this.onerror = null;
				this.onprogress = null;
				this.swfdecompress = null;
				this.aborted = false;
				this.audioContext = null;
				this.interval = null;
			}
			cancel() {
				if (this.swfdecompress) {
					this.swfdecompress.cancel();
					this.swfdecompress = null;
				}
				this.cancelInterval();
				this.onload = null;
				this.onerror = null;
				this.onprogress = null;
				this.aborted = true;
			}
			cancelInterval() {
				if (this.interval !== null) {
					clearInterval(this.interval);
					this.interval = null;
				}
			}
			emitProgress(fs, bytesLoaded, bytesTotal) {
				this.progressText = ((fs[0] > 0) ? 'Building Tags ' : 'Descompressing SWF ') + (getByteText(bytesLoaded) + " / " + getByteText(bytesTotal));
				if (this.onprogress) {
					this.onprogress(fs);
				}
			}
			loadSwfMovie(swfData, calllback) {
				var _this = this;
		
				var stage = new Player(this.audioContext);
		
				var swfdecompress = new SwfDecompress(swfData);
				swfdecompress.onprogress = function (fs) {
					var _ = swfdecompress.getProgress();
					_this.emitProgress([0, fs], _.bytesLoaded, _.bytesTotal);
				};
				swfdecompress.onload = function (result) {
					if (!_this.aborted) {
						var movie = new SwfMovie(result.header, result.movieInfo, result.fileAttributes);
						movie.data = result.data;
						stage.setRootMovie(movie);

						_this.interval = setInterval(function() {
							var g = stage.preload(new ExecutionLimit(200000));
							if (g) {
								_this.cancelInterval();
								if (!_this.aborted) calllback(stage);
							} else {
								var root = stage.getRootClip();
								var l = root.getLoadedBytes();
								var r = root.getTotalBytes();
								_this.emitProgress([1, l / r], l, r);
							}
						}, 10);
					}
					_this.swfdecompress = null;
				};
				swfdecompress.onerror = function (e) {
					if (_this.onerror) {
						_this.onerror(e);
					}
				};
				_this.swfdecompress = swfdecompress;
				swfdecompress.load();
			}
			load() {
				var _this = this;
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = new Uint8Array(e.target.result);
					_this.loadSwfMovie(data, function (stage) {
						if (_this.onload) {
							_this.onload(stage);
						}
					});
				};
				reader.readAsArrayBuffer(this.swfFile);
			}
		}
		
		function getDuraction(num) {
			var txt = '';
			var _ms = Math.floor(num);
			var _mm = Math.floor(num / 60);
		
			var ms = _ms % 60;
			var mm = _mm % 60;
			var mh = Math.floor(num / 3600);
			if (_mm >= 60) {
				txt += '' + mh;
				txt += ':';
			}
			if ((mm >= 10) || (_ms < 600)) {
				txt += '' + mm;
			} else {
				txt += '0' + mm;
			}
			txt += ':';
			if (ms >= 10) {
				txt += '' + ms;
			} else {
				txt += '0' + ms;
			}
			return txt;
		}
		
		class Slot {
			constructor() {
				this._listeners = [];
			}
			subscribe(fn) {
				this._listeners.push(fn);
			}
			emit() {
				for (const listener of this._listeners) {
					listener(...arguments);
				}
			}
		}

		function JPEGEncoder(quality) {var self = this;var fround = Math.round;var ffloor = Math.floor;var YTable = new Array(64);var UVTable = new Array(64);var fdtbl_Y = new Array(64);var fdtbl_UV = new Array(64);var YDC_HT;var UVDC_HT;var YAC_HT;var UVAC_HT;var bitcode = new Array(65535); var category = new Array(65535); var outputfDCTQuant = new Array(64); var DU = new Array(64); var byteout = []; var bytenew = 0; var bytepos = 7; var YDU = new Array(64); var UDU = new Array(64); var VDU = new Array(64); var clt = new Array(256); var RGB_YUV_TABLE = new Array(2048); var currentQuality; var ZigZag = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63]; var std_dc_luminance_nrcodes = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]; var std_dc_luminance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; var std_ac_luminance_nrcodes = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125]; var std_ac_luminance_values = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250]; var std_dc_chrominance_nrcodes = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]; var std_dc_chrominance_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; var std_ac_chrominance_nrcodes = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119]; var std_ac_chrominance_values = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250]; function initQuantTables(sf) { var YQT = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99]; for (var i = 0; i < 64; i++) { var t = ffloor((YQT[i] * sf + 50) / 100); if (t < 1) { t = 1 } else if (t > 255) { t = 255 } YTable[ZigZag[i]] = t } var UVQT = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99]; for (var j = 0; j < 64; j++) { var u = ffloor((UVQT[j] * sf + 50) / 100); if (u < 1) { u = 1 } else if (u > 255) { u = 255 } UVTable[ZigZag[j]] = u } var aasf = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379]; var k = 0; for (var row = 0; row < 8; row++) { for (var col = 0; col < 8; col++) { fdtbl_Y[k] = 1 / (YTable[ZigZag[k]] * aasf[row] * aasf[col] * 8); fdtbl_UV[k] = 1 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8); k++ } } } function computeHuffmanTbl(nrcodes, std_table) { var codevalue = 0; var pos_in_table = 0; var HT = new Array; for (var k = 1; k <= 16; k++) { for (var j = 1; j <= nrcodes[k]; j++) { HT[std_table[pos_in_table]] = []; HT[std_table[pos_in_table]][0] = codevalue; HT[std_table[pos_in_table]][1] = k; pos_in_table++; codevalue++ } codevalue *= 2 } return HT } function initHuffmanTbl() { YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes, std_dc_luminance_values); UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes, std_dc_chrominance_values); YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes, std_ac_luminance_values); UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes, std_ac_chrominance_values) } function initCategoryNumber() { var nrlower = 1; var nrupper = 2; for (var cat = 1; cat <= 15; cat++) { for (var nr = nrlower; nr < nrupper; nr++) { category[32767 + nr] = cat; bitcode[32767 + nr] = []; bitcode[32767 + nr][1] = cat; bitcode[32767 + nr][0] = nr } for (var nrneg = -(nrupper - 1); nrneg <= -nrlower; nrneg++) { category[32767 + nrneg] = cat; bitcode[32767 + nrneg] = []; bitcode[32767 + nrneg][1] = cat; bitcode[32767 + nrneg][0] = nrupper - 1 + nrneg } nrlower <<= 1; nrupper <<= 1 } } function initRGBYUVTable() { for (var i = 0; i < 256; i++) { RGB_YUV_TABLE[i] = 19595 * i; RGB_YUV_TABLE[i + 256 >> 0] = 38470 * i; RGB_YUV_TABLE[i + 512 >> 0] = 7471 * i + 32768; RGB_YUV_TABLE[i + 768 >> 0] = -11059 * i; RGB_YUV_TABLE[i + 1024 >> 0] = -21709 * i; RGB_YUV_TABLE[i + 1280 >> 0] = 32768 * i + 8421375; RGB_YUV_TABLE[i + 1536 >> 0] = -27439 * i; RGB_YUV_TABLE[i + 1792 >> 0] = -5329 * i } } function writeBits(bs) { var value = bs[0]; var posval = bs[1] - 1; while (posval >= 0) { if (value & 1 << posval) { bytenew |= 1 << bytepos } posval--; bytepos--; if (bytepos < 0) { if (bytenew == 255) { writeByte(255); writeByte(0) } else { writeByte(bytenew) } bytepos = 7; bytenew = 0 } } } function writeByte(value) { byteout.push(value) } function writeWord(value) { writeByte(value >> 8 & 255); writeByte(value & 255) } function fDCTQuant(data, fdtbl) { var d0, d1, d2, d3, d4, d5, d6, d7; var dataOff = 0; var i; var I8 = 8; var I64 = 64; for (i = 0; i < I8; ++i) { d0 = data[dataOff]; d1 = data[dataOff + 1]; d2 = data[dataOff + 2]; d3 = data[dataOff + 3]; d4 = data[dataOff + 4]; d5 = data[dataOff + 5]; d6 = data[dataOff + 6]; d7 = data[dataOff + 7]; var tmp0 = d0 + d7; var tmp7 = d0 - d7; var tmp1 = d1 + d6; var tmp6 = d1 - d6; var tmp2 = d2 + d5; var tmp5 = d2 - d5; var tmp3 = d3 + d4; var tmp4 = d3 - d4; var tmp10 = tmp0 + tmp3; var tmp13 = tmp0 - tmp3; var tmp11 = tmp1 + tmp2; var tmp12 = tmp1 - tmp2; data[dataOff] = tmp10 + tmp11; data[dataOff + 4] = tmp10 - tmp11; var z1 = (tmp12 + tmp13) * .707106781; data[dataOff + 2] = tmp13 + z1; data[dataOff + 6] = tmp13 - z1; tmp10 = tmp4 + tmp5; tmp11 = tmp5 + tmp6; tmp12 = tmp6 + tmp7; var z5 = (tmp10 - tmp12) * .382683433; var z2 = .5411961 * tmp10 + z5; var z4 = 1.306562965 * tmp12 + z5; var z3 = tmp11 * .707106781; var z11 = tmp7 + z3; var z13 = tmp7 - z3; data[dataOff + 5] = z13 + z2; data[dataOff + 3] = z13 - z2; data[dataOff + 1] = z11 + z4; data[dataOff + 7] = z11 - z4; dataOff += 8 } dataOff = 0; for (i = 0; i < I8; ++i) { d0 = data[dataOff]; d1 = data[dataOff + 8]; d2 = data[dataOff + 16]; d3 = data[dataOff + 24]; d4 = data[dataOff + 32]; d5 = data[dataOff + 40]; d6 = data[dataOff + 48]; d7 = data[dataOff + 56]; var tmp0p2 = d0 + d7; var tmp7p2 = d0 - d7; var tmp1p2 = d1 + d6; var tmp6p2 = d1 - d6; var tmp2p2 = d2 + d5; var tmp5p2 = d2 - d5; var tmp3p2 = d3 + d4; var tmp4p2 = d3 - d4; var tmp10p2 = tmp0p2 + tmp3p2; var tmp13p2 = tmp0p2 - tmp3p2; var tmp11p2 = tmp1p2 + tmp2p2; var tmp12p2 = tmp1p2 - tmp2p2; data[dataOff] = tmp10p2 + tmp11p2; data[dataOff + 32] = tmp10p2 - tmp11p2; var z1p2 = (tmp12p2 + tmp13p2) * .707106781; data[dataOff + 16] = tmp13p2 + z1p2; data[dataOff + 48] = tmp13p2 - z1p2; tmp10p2 = tmp4p2 + tmp5p2; tmp11p2 = tmp5p2 + tmp6p2; tmp12p2 = tmp6p2 + tmp7p2; var z5p2 = (tmp10p2 - tmp12p2) * .382683433; var z2p2 = .5411961 * tmp10p2 + z5p2; var z4p2 = 1.306562965 * tmp12p2 + z5p2; var z3p2 = tmp11p2 * .707106781; var z11p2 = tmp7p2 + z3p2; var z13p2 = tmp7p2 - z3p2; data[dataOff + 40] = z13p2 + z2p2; data[dataOff + 24] = z13p2 - z2p2; data[dataOff + 8] = z11p2 + z4p2; data[dataOff + 56] = z11p2 - z4p2; dataOff++ } var fDCTQuant; for (i = 0; i < I64; ++i) { fDCTQuant = data[i] * fdtbl[i]; outputfDCTQuant[i] = fDCTQuant > 0 ? fDCTQuant + .5 | 0 : fDCTQuant - .5 | 0 } return outputfDCTQuant } function writeAPP0() { writeWord(65504); writeWord(16); writeByte(74); writeByte(70); writeByte(73); writeByte(70); writeByte(0); writeByte(1); writeByte(1); writeByte(0); writeWord(1); writeWord(1); writeByte(0); writeByte(0) } function writeSOF0(width, height) { writeWord(65472); writeWord(17); writeByte(8); writeWord(height); writeWord(width); writeByte(3); writeByte(1); writeByte(17); writeByte(0); writeByte(2); writeByte(17); writeByte(1); writeByte(3); writeByte(17); writeByte(1) } function writeDQT() { writeWord(65499); writeWord(132); writeByte(0); for (var i = 0; i < 64; i++) { writeByte(YTable[i]) } writeByte(1); for (var j = 0; j < 64; j++) { writeByte(UVTable[j]) } } function writeDHT() { writeWord(65476); writeWord(418); writeByte(0); for (var i = 0; i < 16; i++) { writeByte(std_dc_luminance_nrcodes[i + 1]) } for (var j = 0; j <= 11; j++) { writeByte(std_dc_luminance_values[j]) } writeByte(16); for (var k = 0; k < 16; k++) { writeByte(std_ac_luminance_nrcodes[k + 1]) } for (var l = 0; l <= 161; l++) { writeByte(std_ac_luminance_values[l]) } writeByte(1); for (var m = 0; m < 16; m++) { writeByte(std_dc_chrominance_nrcodes[m + 1]) } for (var n = 0; n <= 11; n++) { writeByte(std_dc_chrominance_values[n]) } writeByte(17); for (var o = 0; o < 16; o++) { writeByte(std_ac_chrominance_nrcodes[o + 1]) } for (var p = 0; p <= 161; p++) { writeByte(std_ac_chrominance_values[p]) } } function writeSOS() { writeWord(65498); writeWord(12); writeByte(3); writeByte(1); writeByte(0); writeByte(2); writeByte(17); writeByte(3); writeByte(17); writeByte(0); writeByte(63); writeByte(0) } function processDU(CDU, fdtbl, DC, HTDC, HTAC) { var EOB = HTAC[0]; var M16zeroes = HTAC[240]; var pos; var I16 = 16; var I63 = 63; var I64 = 64; var DU_DCT = fDCTQuant(CDU, fdtbl); for (var j = 0; j < I64; ++j) { DU[ZigZag[j]] = DU_DCT[j] } var Diff = DU[0] - DC; DC = DU[0]; if (Diff == 0) { writeBits(HTDC[0]) } else { pos = 32767 + Diff; writeBits(HTDC[category[pos]]); writeBits(bitcode[pos]) } var end0pos = 63; for (; end0pos > 0 && DU[end0pos] == 0; end0pos--) {} if (end0pos == 0) { writeBits(EOB); return DC } var i = 1; var lng; while (i <= end0pos) { var startpos = i; for (; DU[i] == 0 && i <= end0pos; ++i) {} var nrzeroes = i - startpos; if (nrzeroes >= I16) { lng = nrzeroes >> 4; for (var nrmarker = 1; nrmarker <= lng; ++nrmarker) writeBits(M16zeroes); nrzeroes = nrzeroes & 15 } pos = 32767 + DU[i]; writeBits(HTAC[(nrzeroes << 4) + category[pos]]); writeBits(bitcode[pos]); i++ } if (end0pos != I63) { writeBits(EOB) } return DC } function initCharLookupTable() { var sfcc = String.fromCharCode; for (var i = 0; i < 256; i++) { clt[i] = sfcc(i) } } this.encode = function(image, quality) { if (quality) setQuality(quality); byteout = new Array; bytenew = 0; bytepos = 7; writeWord(65496); writeAPP0(); writeDQT(); writeSOF0(image.width, image.height); writeDHT(); writeSOS(); var DCY = 0; var DCU = 0; var DCV = 0; bytenew = 0; bytepos = 7; this.encode.displayName = "_encode_"; var imageData = image.data; var width = image.width; var height = image.height; var quadWidth = width * 4; var tripleWidth = width * 3; var x, y = 0; var r, g, b; var start, p, col, row, pos; while (y < height) { x = 0; while (x < quadWidth) { start = quadWidth * y + x; p = start; col = -1; row = 0; for (pos = 0; pos < 64; pos++) { row = pos >> 3; col = (pos & 7) * 4; p = start + row * quadWidth + col; if (y + row >= height) { p -= quadWidth * (y + 1 + row - height) } if (x + col >= quadWidth) { p -= x + col - quadWidth + 4 } r = imageData[p++]; g = imageData[p++]; b = imageData[p++]; YDU[pos] = (RGB_YUV_TABLE[r] + RGB_YUV_TABLE[g + 256 >> 0] + RGB_YUV_TABLE[b + 512 >> 0] >> 16) - 128; UDU[pos] = (RGB_YUV_TABLE[r + 768 >> 0] + RGB_YUV_TABLE[g + 1024 >> 0] + RGB_YUV_TABLE[b + 1280 >> 0] >> 16) - 128; VDU[pos] = (RGB_YUV_TABLE[r + 1280 >> 0] + RGB_YUV_TABLE[g + 1536 >> 0] + RGB_YUV_TABLE[b + 1792 >> 0] >> 16) - 128 } DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT); DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT); DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT); x += 32 } y += 8 } if (bytepos >= 0) { var fillbits = []; fillbits[1] = bytepos + 1; fillbits[0] = (1 << bytepos + 1) - 1; writeBits(fillbits) } writeWord(65497); return new Uint8Array(byteout); } ; function setQuality(quality) { if (quality <= 0) { quality = 1 } if (quality > 100) { quality = 100 } if (currentQuality == quality) return; var sf = 0; if (quality < 50) { sf = Math.floor(5e3 / quality) } else { sf = Math.floor(200 - quality * 2) } initQuantTables(sf); currentQuality = quality } function init() { if (!quality) quality = 50; initCharLookupTable(); initHuffmanTbl(); initCategoryNumber(); initRGBYUVTable(); setQuality(quality); } init() }
		function jpeg_encode(imgData, qu) {if (typeof qu === "undefined")qu = 50;var encoder = new JPEGEncoder(qu);var data = encoder.encode(imgData, qu);return {data: data,width: imgData.width,height: imgData.height}}

		class ScreenCap {
			constructor() {
				this.canvas = document.createElement("canvas");
				this.ctx = this.canvas.getContext("2d");
			}
			scanWithJPEG(image, width, height) {
				this.canvas.width = width || image.width;
				this.canvas.height = height || image.height;
				this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
				var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
				var result = jpeg_encode(imgData, 100);
				return result.data;
			}
		}

		class LoaderSwfUrl {
			constructor(url, callback, callback2) {
				this.url = url;
				this.callback = callback;
				this.callback2 = callback2;
			}
			cancel() {
				this.callback = null;
				this.callback2 = null;
			}
			fetchSwfMd5(md5, callback, callbackProgress) {
				var xhr = new XMLHttpRequest();
				xhr.onload = function () {
					if (xhr.status == 200) {
						callback(new Uint8Array(xhr.response.slice(0x2c)));
					} else {
						callback(null, xhr.status);
					}
				};
				xhr.onprogress = function (e) {
					if (callbackProgress) callbackProgress(e.loaded / e.total, e.loaded, e.total);
				};
				xhr.onerror = function () {
					callback(null, "");
				};
				xhr.responseType = "arraybuffer";
				xhr.open("GET", "https://assets.scratch.mit.edu/internalapi/asset/" + md5 + ".wav/get/");
				xhr.send();
			}
			fetchSwfUrl(url, callback, callbackProgress) {
				var _this = this;
				if (Array.isArray(url)) {
					var result = [];
					var id_md5 = 0;
					function _excgfd() {
						if (result.length > 1) {
							var len = 0;
							for (var i = 0; i < result.length; i++) {
								len += result[i].length;
							}
							var res = new Uint8Array(len);
							var offest = 0;
							for (var i = 0; i < result.length; i++) {
								res.set(result[i], offest);
								offest += result[i].length;
							}
							callback(new Blob([res]), null);
						} else {
							callback(new Blob([result[0]]), null);
						}
					}
					function _next() {
						_this.fetchSwfMd5(url[id_md5], function(res, status) {
							if (!res) {
								callback(null, "failed md5: " + status, "");
								return;
							}
							id_md5++;
							result.push(res);
							if (id_md5 >= url.length) {
								_excgfd();
							} else {
								_next();
							}
						}, function(_p, l, t) {
							if (callbackProgress) callbackProgress((id_md5 / url.length) + (_p / url.length), l, t);
						});
					}
					_next();
				} else {
					var xhr = new XMLHttpRequest();
					xhr.onload = function () {
						var dat = new Uint8Array(xhr.response);
						if (xhr.status !== 200) {
							log.log(url + " => " + (xhr.statusText || xhr.status));
							var mh = "";
							try {
								if (dat.length < 125) {
									mh = new TextDecoder().decode(dat);
									log.log(mh);
								}
							} catch(e) {
							}
							callback(null, xhr.status, mh || xhr.statusText);
						} else {
							callback(new Blob([dat]), null);
						}
					};
					xhr.onprogress = function (e) {
						if (callbackProgress) callbackProgress(e.loaded / e.total, e.loaded, e.total);
					};
					xhr.onerror = function () {
						callback(null, "unknown");
					};
					xhr.responseType = "arraybuffer";
					xhr.open("GET", url);
					xhr.send();
				}
			}
			load() {
				var _this = this;
				var url = this.url;
				this.fetchSwfUrl(url, function() {
					if (_this.callback) _this.callback(...arguments);
				}, function() {
					if (_this.callback2) _this.callback2(...arguments);
				});
			}
		}

		class Waveform {
			constructor() {
				this.canvas = document.createElement("canvas");
				this.ctx = this.canvas.getContext("2d");
				this.canvas.style.background = '#000';
				this.width = 100;
				this.height = 40;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.waveform = new Float32Array(this.width * 4);
			}
			render() {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.ctx.strokeStyle = "#fff";
				this.ctx.lineWidth = 1;
				this.ctx.beginPath();
				this.ctx.moveTo(0, (this.height * 0.25));
				for (let i = 0; i < this.width *2; i+=1) {
					var o = ((((i / (this.width*2)) * this.waveform.length) / 2) | 0) * 2;
					var l = this.waveform[o];
					this.ctx.lineTo(i/2, ((l * (this.height * 0.25)) + (this.height * 0.25)) | 0);
				}
				this.ctx.moveTo(0, (this.height * 0.75));
				for (let i = 0; i < this.width*2; i+=1) {
					var o = ((((i / (this.width*2)) * this.waveform.length) / 2) | 0) * 2;
					var l = this.waveform[o + 1];
					this.ctx.lineTo(i/2, ((l * (this.height * 0.25)) + (this.height * 0.75)) | 0);
				}
				this.ctx.stroke();
			}
		}

		function urlToNameFile(url) {
			try {
				var j = url;
				var h = j.indexOf("?");
				var s = j.length;
				if (h >= 0) {
					s = h;
				}
				var o = s;
				while((s >= 0) && (j.charAt(s) != "/")) {
					s--;
				}
				return j.slice(s + 1, o);
			} catch(e) {
				return url;
			}
		}

		/*Renderer: WebGL 2.0
		Adapter Name: ANGLE (AMD, Radeon RX550/550 Series (0x0000699F) Direct3D11 vs_5_0 ps_5_0, D3D11)
		Adapter Vendor: WebKit
		Adapter Renderer: WebKit WebGL
		Adapter Version: WebGL 2.0 (OpenGL ES 3.0 Chromium)
		Surface samples: x4
		Surface size: 556x400*/

		const PinkFie_Version = "1.3.7";
		const PinkFie_Create = "2025-04-25";

		class PinkFiePlayer {
			constructor(options = {}) {
				this.version = PinkFie_Version;
				this.built = PinkFie_Create;

				this.audioContext = new AudioContext();
				this.onload = new Slot();
				this.onstartload = new Slot();
				this.oncleanup = new Slot();
				this.onerror = new Slot();
				this.onprogress = new Slot();
				this.onresume = new Slot();
				this.onpause = new Slot();
				this.onoptionschange = new Slot();
				this.MAGIC = {
					LARGE_Z_INDEX: '9999999999',
				};
				this.scanned = new ScreenCap();
				this.stage = null;
				this.currentLoader = null;
				this.currentLoaderSwfUrl = null;
				this.fullscreenEnabled = false;
				this.clickToPlayContainer = null;
				this.width = 0;
				this.height = 0;
				this._width = 0;
				this._height = 0;
				this.root = document.createElement('div');
				this.root.className = 'pinkfie-player-root';
				this.playerContainer = document.createElement('div');
				this.playerContainer.className = 'pinkfie-player-stage';
				this.root.appendChild(this.playerContainer);
				this.options = {};
				this._viewFrame = false;
				this._displayMessage = [0, "", 0, 1500];
				this.mousePoint = [0, 0];
				this.tickTime = 0;
				this.swfTitle = null;
				this.swfUrl = null;
				this.swfData = null;
				this.view_waveforn = new Waveform();
				this.addStatsControls();
				this.addloadingC();
				this.addMenuVerticals();
				this.addSettingVerticals();
				this.addControlVerticals();
				this.setOptions(Object.assign(Object.assign({}, options), PinkFiePlayer.DEFAULT_OPTIONS));
				window.addEventListener('resize', () => this.updateFullscreen());
				document.addEventListener('fullscreenchange', () => this.onfullscreenchange());
				document.addEventListener('mozfullscreenchange', () => this.onfullscreenchange());
				document.addEventListener('webkitfullscreenchange', () => this.onfullscreenchange());
				document.addEventListener('contextmenu', (e) => {
					if (this.stage) {
						if ((e.target === this.stage.canvas) || (e.target === this.clickToPlayContainer)) {
							e.preventDefault();
							this.sendList(e);
						}
					} else {
						if (e.target === this.loadingContainer) {
							e.preventDefault();
							this.sendList(e);	
						}
					}
				});
				document.addEventListener('click', (e) => {
					this.MenuVertical.style.display = 'none';
				});
				this.handleError = this.handleError.bind(this);
				this.resize(640, 400);
				setInterval(this.tick.bind(this), 10);
			}
			menuSettingControls(visible) {
				for (var i = 0; i < this._controlsSettigs.length; i++) {
					this._controlsSettigs[i].style.display = visible ? "" : "none";
				}
			}
			addMenuVerticals() {
				this.MenuVertical = document.createElement('div');
				this.MenuVertical.className = 'watcher-pinkfie-menu-vertical';
				this.movie_playPause = this._createE('Pause', (e) => {
					e.preventDefault();
					this.toggleRunning();
					this.MenuVertical.style.display = 'none';
				});
				this.MenuVertical.appendChild(this.movie_playPause);

				var controlsMC = [];

				this.movie_playStop = this._createE('Stop', (e) => {
					e.preventDefault();
					this.c_playStop();
					this.MenuVertical.style.display = 'none';
				});

				this.movie_loopButton = this._createE('Loop: OFF', (e) => {
					e.preventDefault();
					this.c_loop();
					this.MenuVertical.style.display = 'none';
				});
				controlsMC.push(this.movie_playStop);
				controlsMC.push(this.movie_loopButton);
				controlsMC.push(this._createE('Rewind', (e) => {
					e.preventDefault();
					this.c_rewind();
					this.MenuVertical.style.display = 'none';
				}));
				controlsMC.push(this._createE('Step Forward', (e) => {
					e.preventDefault();
					this.c_Forward();
					this.MenuVertical.style.display = 'none';
				}));
				controlsMC.push(this._createE('Step Back', (e) => {
					e.preventDefault();
					this.c_Back();
					this.MenuVertical.style.display = 'none';
				}));

				for (var i = 0; i < controlsMC.length; i++) {
					this.MenuVertical.appendChild(controlsMC[i]);	
				}

				this._controlsMC = controlsMC;

				this.fullscreenButton = this._createE('Enter fullscreen', (e) => {
					e.preventDefault();
					this.setOptions({
						fullscreenMode: e.shiftKey ? 'window' : 'full'
					});
					this.fullscreen();
					this.MenuVertical.style.display = 'none';
				});

				this.MenuVertical.appendChild(this.fullscreenButton);

				var _ffdgdf2 = this._createE('Copy debug info', (e) => {
					e.preventDefault();
					this.copyDebugInfo();
				});

				this.__fdgdf = this._createE('Download SWF', (e) => {
					e.preventDefault();
					this.downloadSwf();
				});
				this.MenuVertical.appendChild(_ffdgdf2);
				this.MenuVertical.appendChild(this.__fdgdf);
				var ss = [];
				ss.push(this._createE('Controls', (e) => {
					e.preventDefault();
					this.showControls();
					this.MenuVertical.style.display = 'none';
				}));
				ss.push(this._createE('Settings', (e) => {
					e.preventDefault();
					this.showSetting();
					this.MenuVertical.style.display = 'none';
				}));

				for (var i = 0; i < ss.length; i++) {
					this.MenuVertical.appendChild(ss[i]);	
				}

				ss.push(_ffdgdf2);

				this._controlsSettigs = ss;

				this.MenuVertical.style.display = 'none';
				this.playerContainer.appendChild(this.MenuVertical);
			}
			addSettingVerticals() {
				this.settingVertical = document.createElement('div');
				this.settingVertical.className = 'watcher-pinkfie-setting';
				this.settingVertical.style = '';
				this.settingVertical.style.display = 'none';
				this.settingVertical.style.overflow = 'auto';
				this.settingVertical.style.position = 'absolute';
				this.settingVertical.style.top = '0';
				this.settingVertical.style.left = '50%';
				this.settingVertical.style.padding = '6px';
				this.settingVertical.style.transform = 'translate(-50%, 0)';
				this.settingVertical.style.width = '320px';
				this.settingVertical.style.height = 'auto';
				this.settingVertical.innerHTML = '<h3 style="margin:0;">Settings</h3>';

				var rrj2 = document.createElement('a');
				rrj2.onclick = () => {
					this.settingVertical.style.display = 'none';
				};
				rrj2.style = '';
				rrj2.style.position = 'fixed';
				rrj2.style.display = 'block';
				rrj2.style.top = '0px';
				rrj2.style.right = '0px';
				rrj2.style["background-position"] = '50% 80%';
				rrj2.innerHTML = "[x]";
		
				var rrj5 = document.createElement('label');
				rrj5.innerHTML = "Render Mode: ";
		
				var rrj6 = document.createElement('select');
				rrj6.innerHTML = '<option value="render">render<option value="render with bounds">render with display bounds<option value="bounds without render">display bounds without render';
				rrj6.addEventListener("change", () => {
					if (rrj6.value) {
						this.setOptions({
							rendermode: rrj6.value
						});
					}
				});
		
				this._rrj6 = rrj6;

				var kjhjhkh = document.createElement('label');
				kjhjhkh.innerHTML = "Render Scale Mode: ";

				var _kjhjhkh = document.createElement('select');
				_kjhjhkh.innerHTML = '<option value="0">Zoom to Fit<option value="2">Stretch to Fit<option value="1">Unscale (100%)';
				_kjhjhkh.addEventListener("change", () => {
					if (_kjhjhkh.value) {
						this.setOptions({
							renderscalemode: +_kjhjhkh.value
						});
					}
				});

				this._kjhjhkh = _kjhjhkh;
		
				var rrj7 = document.createElement('label');
				rrj7.innerHTML = "Quality: ";
		
				var rrj8 = document.createElement('select');
				rrj8.innerHTML = '<option value="high">high<option value="medium">medium<option value="low">low';
				rrj8.addEventListener("change", () => {
					if (rrj8.value) {
						this.setOptions({
							quality: rrj8.value
						});
					}
				});
		
				this.__rrj8 = rrj8;

				var rrjhg7 = document.createElement('label');
				rrjhg7.innerHTML = "VCAM: ";

				var rrj9 = document.createElement('input');
				rrj9.type = 'text';
				rrj9.style.width = "80px";

				rrj9.placeholder = "(sprite id)";

				rrj9.addEventListener("change", () => {
					if (rrj9.value) {
						this.setOptions({
							vCamId: rrj9.value
						});
					}
				});
		
				this.__rrj9 = rrj9;
		
				this.settingVertical.appendChild(rrj2);
				this.settingVertical.appendChild(rrj7);
				this.settingVertical.appendChild(rrj8);
				this.settingVertical.appendChild(rrjhg7);
				this.settingVertical.appendChild(rrj9);

				this.settingVertical.appendChild(document.createElement('br'));

				this.settingVertical.appendChild(rrj5);
				this.settingVertical.appendChild(rrj6);

				this.settingVertical.appendChild(document.createElement('br'));

				this.settingVertical.appendChild(kjhjhkh);
				this.settingVertical.appendChild(_kjhjhkh);

				this.settingVertical.appendChild(document.createElement('br'));

				var rrjhg8 = document.createElement('label');
				rrjhg8.innerHTML = "Enable Bitmap Cache: ";
				this.settingVertical.appendChild(rrjhg8);

				var rrjhg9 = document.createElement('input');
				rrjhg9.type = 'checkbox';
				rrjhg9.addEventListener('click', (e) => {
					this.setOptions({
						useBitmapCache: e.target.checked
					});
				});

				this.__rrjhg9 = rrjhg9;

				this.settingVertical.appendChild(rrjhg9);
		
				this.playerContainer.appendChild(this.settingVertical);
			}
			addControlVerticals() {
				this.controlVertical = document.createElement('div');
				this.controlVertical.className = 'watcher-pinkfie-setting';
				this.controlVertical.style = '';
				this.controlVertical.style.display = 'none';
				this.controlVertical.style.overflow = 'auto';
				this.controlVertical.style.position = 'absolute';
				this.controlVertical.style.bottom = '0';
				this.controlVertical.style.left = '50%';
				this.controlVertical.style.padding = '6px';
				this.controlVertical.style.transform = 'translate(-50%, 0)';
				this.controlVertical.style.width = '320px';
				this.controlVertical.style.height = 'auto';
				this.controlVertical.innerHTML = '<h3 style="margin:0;">Controls</h3>';

				var rrj2 = document.createElement('a');
				rrj2.onclick = () => {
					this.controlVertical.style.display = 'none';
				};
				rrj2.style = '';
				rrj2.style.position = 'fixed';
				rrj2.style.display = 'block';
				rrj2.style.top = '0px';
				rrj2.style.right = '0px';
				rrj2.style["background-position"] = '50% 80%';
				rrj2.innerHTML = "[x]";

				var rrj3 = document.createElement('label');
				rrj3.innerHTML = "volume:";
				var rrj4 = document.createElement('input');
				rrj4.type = "range";
				rrj4.style.width = "80px";
				rrj4.value = 100;
				rrj4.max = 100;
				rrj4.min = 0;
				rrj4.addEventListener('input', () => {
					this.setVolume(rrj4.value);
				});
				this._rrj4 = rrj4;
		
				var rrj3o = document.createElement('label');
				rrj3o.innerHTML = "speed:";
				var rrj4o = document.createElement('select');
				rrj4o.innerHTML = '<option value="0.25">0.25x<option value="0.33">0.33x<option value="0.5">0.5x<option value="0.67">0.67x<option value="0.75">0.75x<option value="0.85">0.85x<option value="0.9">0.9x<option value="1">1x<option value="1.15">1.15x<option value="1.25">1.25x<option value="1.5">1.5x<option value="1.75">1.75x<option value="2">2x<option value="2.5">2.5x<option value="3">3x<option value="4">4x';
				rrj4o.value = 1;
				rrj4o.addEventListener('input', () => {
					this.setOptions({ speed: +rrj4o.value });
				});
				this._rrj4o = rrj4o;

				var _fdfj = document.createElement('div');

				var fdfj = document.createElement('input');
				fdfj.type = 'range';
				fdfj.value = 1;
				fdfj.min = 1;
				fdfj.max = 2;
				fdfj.addEventListener("input", () => {
					if (fdfj.value && this.stage) {
						this.stage.gotoFrame(+fdfj.value);
					}
				});
				this.__fdfj = fdfj;
				var a = document.createElement("label");
				a.innerHTML = 'Seek Frame';
				var a2 = document.createElement("label");
				a2.innerHTML = '1/1';
				this.__a2 = a2;
				
				_fdfj.appendChild(a);
				_fdfj.appendChild(fdfj);
				_fdfj.appendChild(a2);

				this.__agdfdf = _fdfj;
				
				this.controlVertical.appendChild(rrj2);
			
				this.controlVertical.appendChild(rrj3);
				this.controlVertical.appendChild(rrj4);
				this.controlVertical.appendChild(rrj3o);
				this.controlVertical.appendChild(rrj4o);

				this.controlVertical.appendChild(document.createElement('br'));

				this.controlVertical.appendChild(_fdfj);
		
				var di3 = document.createElement('a');
				di3.innerHTML = "View Stats";
				di3.style.margin = "4px";
				di3.onclick = this.viewStats.bind(this);

				this.controlVertical.appendChild(di3);

				var fdgdf2 = document.createElement("a");

				fdgdf2.innerHTML = "Stop Sounds";

				fdgdf2.style.margin = "4px";

				fdgdf2.onclick = () => {
					if (this.stage) {
						this.stage.stopAllSounds();
					}
				}

				this.controlVertical.appendChild(fdgdf2);

				var gfdfg = document.createElement("a");

				gfdfg.innerHTML = "Save Screenshot";

				gfdfg.style.margin = "4px";

				gfdfg.onclick = () => {
					this.saveScreenshot();
				}

				this.controlVertical.appendChild(gfdfg);
		
				this.playerContainer.appendChild(this.controlVertical);
			}
			addStatsControls() {
				this.statsE = document.createElement("div");
				this.statsE.style.color = "#fff";
				this.statsE.style.position = "absolute";
				this.statsE.style.top = "0px";
				this.statsE.style.left = "0px";
				this.statsE.style.fontSize = "15px";
				this.statsE.style.display = "none";
		
				var r = document.createElement("div");
				r.className = "watcher-pinkfie-stats";
				r.style.display = "none";

				var r1 = document.createElement("div");
		
				var playpause = document.createElement("div");
				playpause.textContent = "Pause";
				playpause.className = "watcher-pinkfie-stats";
				playpause.style.display = "none";
		
				this.statsE_R = r;
		
				this.statsE_R1 = r1;

				r.appendChild(r1);
				r.appendChild(this.view_waveforn.canvas);

				this.statsE_PP = playpause;
		
				this.statsE.appendChild(playpause);
				this.statsE.appendChild(r);
		
				this.playerContainer.appendChild(this.statsE);
			}
			addloadingC() {
				var loadingContainer = document.createElement("div");
				loadingContainer.className = "pinkfie-player-loading";
				loadingContainer.innerHTML = '';
		
				var a1 = document.createElement("div");
				a1.className = 'pinkfie-player-loading-image';
				var a2 = document.createElement("div");
				a2.className = 'pinkfie-player-loading-anim';
				var a3 = document.createElement("div");
				a3.className = 'pinkfie-player-loading-progress';
				var a4 = document.createElement("div");
				a4.style.width = "0%";
				a3.appendChild(a4);
		
				loadingContainer.appendChild(a1);
				loadingContainer.appendChild(a2);
				loadingContainer.appendChild(a3);

				var rfg = document.createElement('p');
				rfg.textContent = "(c) 2025 Anim Tred Studio";
				rfg.style.color = "#000";
				rfg.style.margin = "4px";
				rfg.style.position = "absolute";
				rfg.style.bottom = "0";
				rfg.style.left = "50%";
				rfg.style.transform = "translate(-50%,0)";

				loadingContainer.appendChild(rfg);
		
				loadingContainer.style.display = "none";
				this.loadingContainerProgress = a4;
				this.loadingContainerProgressText = a2;
				this.loadingContainer = loadingContainer;
				this.playerContainer.appendChild(this.loadingContainer);
			}
			_createE(name, fun) {
				var MVG1 = document.createElement('div');
				MVG1.textContent = name;
				MVG1.onclick = fun.bind(this);
				return MVG1;
			}
			sendList(event) {
				var rect = this.playerContainer.getBoundingClientRect();
				this.showMenuVertical(event.clientX - rect.left, event.clientY - rect.top);
			}
			showMenuVertical(x, y) {
				var totalframes = this.stage ? (this.stage.rootFramesloaded() > 1) : 0;
				for (var i = 0; i < this._controlsMC.length; i++) {
					this._controlsMC[i].style.display = totalframes ? "" : "none";
				}
				this.MenuVertical.style = '';
				this.MenuVertical.style.position = 'absolute';
				this.MenuVertical.style.left = x + 'px';
				this.MenuVertical.style.top = y + 'px';
				this.MenuVertical.style.height = 'auto';
			}
			getSwfName() {
				if (this.swfTitle) {
					var n = this.swfTitle.split(".");
					var j = n.pop();
					if (j !== "swf") {
						n.push(j);
					}
					return n.join(".");
				} else {
					var swf = this.stage.swf;
					return "pinkfie_" + swf.header.compression + "_" + swf.header.version + "_" + swf.header.uncompressedLength + "_fps" + swf.movieInfo.frameRate + "_frames" + swf.movieInfo.numFrames;
				}
			}
			hasStage() {
				return !!this.stage;
			}
			getOptions() {
				return this.options;
			}
			takeScreenshotJPEG() {
				var _movieCanvas = this.stage.canvas;
				this.stage.render();
				return this.scanned.scanWithJPEG(_movieCanvas);
			}
			saveScreenshot() {
				if (!this.hasStage()) return;
				var j = this.getSwfName();
				var _j = this.takeScreenshotJPEG();
				var _h = new Blob([_j]);
				var a = document.createElement("a");
				a.href = URL.createObjectURL(_h);
				a.download = j + ".jpg";
				a.click();
			}
			downloadSwf() {
				if (!this.swfData) return;
				var j = this.hasStage() ? this.getSwfName() : "swf_download";
				var h = URL.createObjectURL(this.swfData);
				var a = document.createElement("a");
				a.href = h;
				a.download = j + ".swf";
				a.click();
			}
			copyDebugInfo() {
				var text = this.debugInfo();
				if ("clipboard" in navigator) {
					navigator.clipboard.writeText(text);
				} else {
					console.log(text);
				}
			}
			debugInfo() {
				var text = "";
				if (this.hasStage()) {
					text += this.stage.debugInfo();
					text += "\n";
				}
				text += "# Page Info";
				text += "\nPage URL: " + window.location.href;
				if (this.swfUrl) {
					text += "\nSWF URL: " + this.swfUrl;
				}
				text += "\n";
				text += "\n# Browser Info";
				text += "\nUser Agent: " + navigator.userAgent;
				text += "\nHas touch support: " + ("ontouchstart" in window) + "\n";
				text += "\n# PinkFie Info";
				text += "\nVersion: " + this.version;
				text += "\nBuilt: " + this.built;
				return text;
			}
			isPlayMovie() {
				if (!this.hasStage()) return false;
				return this.stage.clipIsPlaying();
			}
			isLoopMovie() {
				if (!this.hasStage()) return false;
				return this.stage.clipGetLoop();
			}
			c_playStop() {
				if (!this.hasStage()) return;
				this.stage.runMenu("play/stop");
			}
			c_loop() {
				if (!this.hasStage()) return;
				this.stage.runMenu("loop");
			}
			c_rewind() {
				if (!this.hasStage()) return;
				this.stage.runMenu("rewind");
			}
			c_Forward() {
				if (!this.hasStage()) return;
				this.stage.runMenu("forward");
			}
			c_Back() {
				if (!this.hasStage()) return;
				this.stage.runMenu("back");
			}
			setOptions(changedOptions) {
				this.options = Object.assign(Object.assign({}, this.options), changedOptions);
				if (this.hasStage()) {
					this.applyOptionsToStage();
				}
				this._rrj4.value = this.options.volume;
				this._rrj4o.value = this.options.speed;
				if (this.__rrj8) {
					this.__rrj8.value = this.options.quality;
				}
				if (this.__rrj9) {
					this.__rrj9.value = this.options.vCamId;
				}
				this.__rrjhg9.checked = this.options.useBitmapCache;
				this.onoptionschange.emit(changedOptions);
			}
			viewStats() {
				if (this._viewFrame) {
					this._viewFrame = false;
				} else {
					this._viewFrame = true;
				}
			}
			showSetting() {
				this.settingVertical.style.display = '';
			}
			showControls() {
				this.controlVertical.style.display = '';
			}
			enableAttribute(name) {
				this.root.setAttribute(name, '');
			}
			disableAttribute(name) {
				this.root.removeAttribute(name);
			}
			setAttribute(name, enabled) {
				if (enabled) {
					this.enableAttribute(name);
				} else {
					this.disableAttribute(name);
				}
			}
			updateFullscreen() {
				if (!this.fullscreenEnabled) {
					this.applyResizeStage();
					return;
				}
				this._resize(window.innerWidth, window.innerHeight);
				this.root.style.paddingLeft = '0px';
				this.root.style.paddingTop = '0px';
			}
			onfullscreenchange() {
				if (typeof document.fullscreen === 'boolean' && document.fullscreen !== this.fullscreenEnabled) {
					this.exitFullscreen();
				} else if (typeof document.webkitIsFullScreen === 'boolean' && document.webkitIsFullScreen !== this.fullscreenEnabled) {
					this.exitFullscreen();
				}
			}
			enterFullscreen() {
				if (this.options.fullscreenMode === 'full') {
					if (this.root.requestFullScreenWithKeys) {
						this.root.requestFullScreenWithKeys();
					} else if (this.root.webkitRequestFullScreen) {
						this.root.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					} else if (this.root.requestFullscreen) {
						this.root.requestFullscreen();
					}
				}
				document.body.classList.add('pinkfie-body-fullscreen');
				this.root.style.zIndex = this.MAGIC.LARGE_Z_INDEX;
				this.enableAttribute('fullscreen');
				this.fullscreenEnabled = true;
				this.updateFullscreen();
			}
			exitFullscreen() {
				this.disableAttribute('fullscreen');
				this.fullscreenEnabled = false;
				if (document.fullscreenElement === this.root || document.webkitFullscreenElement === this.root) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					}
				}
				this.root.style.zIndex = '';
				document.body.classList.remove('pinkfie-body-fullscreen');
				this._resize(this.width, this.height);
			}
			handleError(error) {
				console.log(error);
				this.onerror.emit(error);
			}
			beginLoadingSWF() {
				this.cleanup();
				this.loadingContainer.style.display = "";
				this.onstartload.emit();
			}
			loadLoader(loader) {
				var _this = this;
				_this.currentLoaderSwfUrl = null;
				_this.currentLoader = loader;
				loader.audioContext = this.audioContext;
				loader.onprogress = function (fs) {
					var r = fs[1];
					_this.onprogress.emit(r);
					_this.loadingContainerProgressText.textContent = loader.progressText;
					_this.loadingContainerProgress.style.width = (r * 100) + "%";
				};
				loader.onload = function (stage) {
					_this.currentLoader = null;
					_this.loadingContainerProgress.style.width = "0%";
					_this.setStage(stage);
				};
				loader.onerror = function (e) {
					_this.handleError(e);
				};
				loader.load();
			}
			loadSwfFromFile(file) {
				this.beginLoadingSWF();
				this.loadingContainerProgressText.textContent = "Loading SWF Data";
				this.swfData = file;
				var loader = new Loader(file);
				this.loadLoader(loader);
			}
			loadSwfFromURL(url) {
				this.beginLoadingSWF();
				this.loadingContainerProgressText.textContent = "Loading SWF URL";
				var _this = this;
				var loaderC = new LoaderSwfUrl(url, function (file, status, message) {
					if (file) {
						_this.swfData = file;
						var loader = new Loader(file);
						_this.loadLoader(loader);
						if (!Array.isArray(url)) {
							_this.swfUrl = url;
							_this.swfTitle = urlToNameFile(url);
							_this.__fdgdf.style.display = "";
						}
					} else {
						_this.loadingContainerProgressText.textContent = "Failed to load SWF: " + status;
						_this.loadingContainerProgressText.title = message || "";
					}
				}, function(r, l, t) {
					_this.loadingContainerProgressText.textContent = "Loading SWF URL " + getByteText(l) + " / " + getByteText(t);
					_this.loadingContainerProgress.style.width = Math.round(r * 100) + "%";
				});
				this.currentLoaderSwfUrl = loaderC;
				loaderC.load();
			}
			fullscreen() {
				if (this.fullscreenEnabled) {
					this.fullscreenButton.textContent = "Enter fullscreen";
					this.exitFullscreen();
				} else {
					this.fullscreenButton.textContent = "Exit fullscreen";
					this.enterFullscreen();
				}
			}
			reload() {
				var swfData = this.swfData;
				if (swfData) {
					var a = this.__fdgdf.style.display;
					this.beginLoadingSWF();
					this.swfData = swfData;
					var loader = new Loader(swfData);
					this.__fdgdf.style.display = a;
					this.loadLoader(loader);	
				}
			}
			getInfoStage() {
				var stage = this.stage;
				return {
					width: stage.width,
					height: stage.height
				};
			}
			setStage(stage) {
				this.stage = stage;
				this.applyOptionsToStage();
				this.applyResizeStage();
				this.statsE.style.display = "";
				this.playerContainer.insertBefore(stage.root, this.playerContainer.childNodes[0]);
				this.loadingContainer.style.display = "none";
				this.applyAutoplayPolicy(this.options.autoplayPolicy);
				this.onload.emit(stage);
			}
			applyAutoplayPolicy(policy) {
				switch (policy) {
					case 'always': {
						this.triggerStartMovie();
						break;
					}
					case 'if-audio-playable': {
						if (this.audioContext) {
							if (this.audioContext.state === 'running') {
								this.triggerStartMovie();
							} else {
								this.showClickToPlayContainer();
							}	
						} else {
							this.triggerStartMovie();
						}
						break;
					}
					case 'never': {
						this.showClickToPlayContainer();
						break;
					}
				}
			}
			triggerStartMovie() {
				this.stage.resume();
				this.loadingContainer.style.display = "none";
				if (this.clickToPlayContainer) {
					this.removeClickToPlayContainer();
				}
			}
			showClickToPlayContainer() {
				if (!this.clickToPlayContainer) {
					this.clickToPlayContainer = document.createElement('div');
					this.clickToPlayContainer.className = 'pinkfie-player-click-to-play-container';
					this.clickToPlayContainer.onclick = () => {
						this.removeClickToPlayContainer();
						this.triggerStartMovie();
					};
					const content = document.createElement('div');
					content.className = 'pinkfie-player-click-to-play-icon';
					this.clickToPlayContainer.appendChild(content);
					this.stage.root.appendChild(this.clickToPlayContainer);
				}
			}
			removeClickToPlayContainer() {
				if (this.clickToPlayContainer) {
					this.stage.root.removeChild(this.clickToPlayContainer);
					this.clickToPlayContainer = null;
				}
			}
			applyResizeStage() {
				if (this.stage) {
					this.stage.resize(this._width, this._height);
					var rc = this.stage.getRectStage();
					var XG = rc[0];
					var YG = rc[1];
					this.statsE.style.top = YG + "px";
					this.statsE.style.left = XG + "px";
				}
			}
			resize(w, h) {
				this.width = w;
				this.height = h;
				if (!this.fullscreenEnabled) {
					this._resize(w, h);
				}
			}
			_resize(w, h) {
				this._width = w;
				this._height = h;
				this.playerContainer.style.width = w + "px";
				this.playerContainer.style.height = h + "px";
				this.applyResizeStage();
				this.render();
			}
			applyOptionsToStage() {
				if (this.stage) {
					this.stage.audio.setVolume(this.options.volume);
					this.stage.setSpeed(this.options.speed);
					this.stage.vCamId = this.options.vCamId;
					this.stage.vCamShow = this.options.vCamShow;
					this.stage.wth = this.options.wth;
					this.stage.interpolation = this.options.interpolation;
					this.stage.clipSetLoop(!this.options.unloop);
					this.stage.useLastBound = this.stage.wth ? true : this.options.interpolation;
					var renderDirty = false;
					if (this.stage.quality != this.options.quality) {
						this.stage.setQuality(this.options.quality);
						renderDirty = true;
					}
					if (this.stage.renderType != this.options.rendermode) {
						this.stage.renderType = this.options.rendermode;
						renderDirty = true;
					}
					if (this.stage.renderScaleType != this.options.renderscalemode) {
						this.stage.renderScaleType = this.options.renderscalemode;
						renderDirty = true;
					}
					if (this.stage.useBitmapCache != this.options.useBitmapCache) {
						this.stage.useBitmapCache = this.options.useBitmapCache;
						renderDirty = true;
					}
					if (renderDirty) {
						this.applyResizeStage();
					}
				}
			}
			tick() {
				this.tickTime += 10;
				if (this.hasStage()) {
					var clip_current_frame = this.stage.rootCurrentFrame();
					var clip_total_frames = this.stage.getTotalFrames();
					if (clip_total_frames > 1) {
						this.__a2.textContent = clip_current_frame + "/" + clip_total_frames;
						this.__fdfj.min = 1;
						this.__fdfj.max = clip_total_frames;
						this.__fdfj.value = clip_current_frame;
						this.__agdfdf.style.display = '';
					} else {
						this.__agdfdf.style.display = 'none';
					}
				} else {
					this.__agdfdf.style.display = 'none';
				}
				if (this.hasStage()) {
					this.stage.tick(10);
					if (this.isPlayMovie()) this.movie_playStop.innerHTML = "Stop";
					else this.movie_playStop.innerHTML = "Play";
					if (this.isLoopMovie()) this.movie_loopButton.innerHTML = "Loop: ON";
					else this.movie_loopButton.innerHTML = "Loop: OFF";
					if (this._displayMessage[0] == 1) {
						if ((!this.stage.playing)) {
							this._displayMessage[2] = this.tickTime;
						}
						if (this.stage.playing) {
							this._displayMessage[1] = "Play";
						} else {
							this._displayMessage[1] = "Pause";
						}
					}
				}
				if (this.hasStage() && this.stage.playing) {
					this.movie_playPause.innerHTML = "Pause";
				} else {
					this.movie_playPause.innerHTML = "Resume";
				}
				this.render();
			}
			setVolume(val) {
				this.setOptions({ volume: val });
			}
			resume() {
				if (this.hasStage()) {
					if (this.clickToPlayContainer) {
						this.removeClickToPlayContainer();
					}
					this.stage.resume();
				}
			}
			pause() {
				if (this.hasStage()) {
					if (this.clickToPlayContainer) {
						this.removeClickToPlayContainer();
					}
					this.stage.pause();
				}
			}
			toggleRunning() {
				if (this.hasStage()) {
					this._displayMessage[0] = 1;
					if (this.stage.playing) {
						this.pause();
					} else {
						this.resume();
					}
				}
			}
			render() {
				if (this.hasStage()) {
					var rrgg = ((this.tickTime - this._displayMessage[2]) < this._displayMessage[3]);
					if (this._viewFrame && this.stage) {
						var clip_current_frame = this.stage.rootCurrentFrame();
						var clip_total_frames = this.stage.rootFramesloaded();
						var _r = getDuraction((clip_current_frame / clip_total_frames) * (clip_total_frames / this.stage.frameRate)) + "/" + getDuraction(clip_total_frames / this.stage.frameRate);
						var _u = clip_current_frame + "/" + clip_total_frames;
						var hkj = "Time: " + _r;
						hkj += "<br>Frame: " + _u;
						hkj += "<br>Playing Audio: " + this.stage.getPlayingAudioCount() + " " + this.stage.audio.debug_ms + "ms";
						var resultPlayingCompressSound = this.stage.audio.getPlayingCompressSound().join(" ");
						if (resultPlayingCompressSound && this.stage.playing) {
							hkj += "<br>" + resultPlayingCompressSound;
							this.view_waveforn.canvas.style.display = "";
							this.stage.audio.toWaveform(this.view_waveforn.waveform); 
							this.view_waveforn.render();
						} else {
							this.view_waveforn.canvas.style.display = "none";
						}
						var _gh = this.stage.getDebugVideoText();
						if (_gh) {
							hkj += "<br>Time Videos Codec:<br>" + _gh;
						}
						this.statsE_R.style.display = "";
						this.statsE_R1.innerHTML = hkj;
					} else {
						this.statsE_R.style.display = "none";
					}
					if ((this._displayMessage[0] && rrgg)) {
						var GSGGG = this._displayMessage[1];
						this.statsE_PP.textContent = GSGGG;
						this.statsE_PP.style.display = "inline-block";
					} else {
						if (this._displayMessage[0] !== 1) {
							if (this._displayMessage[0]) {
								if (this.clickToPlayContainer) {
									this._displayMessage[0] = 0;
								} else {
									this._displayMessage[0] = 1;
								}
							}
						}
						this.statsE_PP.style.display = "none";
					}
				}
			}
			cleanup() {
				this.swfTitle = null;
				this.swfUrl = null;
				this.swfData = null;
				this.__fdfj.min = 1;
				this.__fdfj.max = 2;
				this.__fdfj.value = 1;
				this.__fdgdf.style.display = "none";
				this.loadingContainer.style.display = "none";
				this.loadingContainerProgressText.textContent = "";
				this.loadingContainerProgressText.title = "";
				this.loadingContainerProgress.style.width = "0%";
				this.statsE.style.display = "none";
				this._displayMessage[0] = 0;
				this.__agdfdf.style.display = 'none';
				for (var i = 0; i < this._controlsMC.length; i++) {
					this._controlsMC[i].style.display = "none";
				}
				if (this.currentLoader) {
					this.currentLoader.cancel();
					this.currentLoader = null;
				}
				if (this.currentLoaderSwfUrl) {
					this.currentLoaderSwfUrl.cancel();
					this.currentLoaderSwfUrl = null;
				}
				if (this.clickToPlayContainer) {
					this.removeClickToPlayContainer();
				}
				if (this.stage) {
					this.stage.destroy();
					this.playerContainer.removeChild(this.stage.root);
					this.stage = null;
				}
				this.oncleanup.emit();
			}
		}
		PinkFiePlayer.DEFAULT_OPTIONS = {
			autoplayPolicy: 'if-audio-playable',
			volume: 100,
			fullscreenMode: 'full',
			speed: 1,
			quality: "high",
			rendermode: "render",
			vCamId: 0,
			vCamShow: false,
			wth: false,
			unloop: false,
			interpolation: false,
			renderscalemode: 0,
			useBitmapCache: false
		}
		module.exports = PinkFiePlayer;
	},
}));