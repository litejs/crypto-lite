/*
    MIT License
*/
!function(w){function u(c){for(var e=c.length;e--;)c[e]=("0000000"+(c[e]>>>0).toString(16)).slice(-8);return c.join("")}function v(c){c=unescape(encodeURIComponent(c));for(var e=c.length,a=0,g=[];a<e;)g[a>>2]=c.charCodeAt(a++)<<24|c.charCodeAt(a++)<<16|c.charCodeAt(a++)<<8|c.charCodeAt(a++);g.len=e;return g}function q(c,e,a,g){var b=0,f=[],h=[];for(e=64<e.length?c(e,1):v(e);16>b;)f[b]=e[b]^909522486,h[b]=e[b++]^1549556828;"string"==typeof a?(a=v(a),e=a.len):e=4*a.length;b=c(h.concat(c(f.concat(a),
1,64+e)),1);return g?b:u(b)}var k=w.crypto||(w.crypto={});k.hmac=function(c,e,a){return q(k[c],e,a)};k.pbkdf2=k.pbkdf2Sync=function(c,e,a,g,b,f){"function"==typeof b&&(f=b,b="sha1");b=k[b]||k.sha1;a=a||1E3;var h,m,p,n,d,l=[],x=g>>2||5;for(d=1;l.length<x;d++){h=m=q(b,c,e+String.fromCharCode(d>>24&15,d>>16&15,d>>8&15,d&15),1);for(p=a;--p;)for(m=q(b,c,m,1),n=m.length;n--;)h[n]^=m[n];l.push.apply(l,h)}l=u(l).slice(0,2*g||40);if(f)f(null,l);else return l};k.sha1=function(c,e,a){var g,b,f,h,m,p,n=0,d=[],
l=1732584193,k=4023233417,r=2562383102,s=271733878,t=3285377520,d=c;"string"==typeof d?(d=v(d),a=d.len):a=a||d.length<<2;d[a>>2]|=128<<24-(31&(a<<=3));d[(a+64>>9<<4)+15]=a;c=d;for(var q=c.length;n<q;){for(d=c.slice(n,n+=a=16);80>a;)g=d,b=a++,f=d[a-4]^d[a-9]^d[a-15]^d[a-17],g[b]=f<<1|f>>>31;g=l;b=k;f=r;h=s;m=t;for(a=0;80>a;)p=(20>a?(b&f|~b&h)+1518500249:40>a?(b^f^h)+1859775393:60>a?(b&f|b&h|f&h)+2400959708:(b^f^h)+3395469782)+(g<<5|g>>>27)+m+(d[a++]|0),m=h,h=f,f=b<<30|b>>>2,b=g,g=p>>>0;l+=g;k+=b;r+=
f;s+=h;t+=m}p=[l,k,r,s,t];return e?p:u(p)}}(this);