/*
    MIT License
*/
!function(u){(u.crypto||(u.crypto={})).sha1=function(e,f,a){var h,c,d,g,n,l,k=0,b=[],p=1732584193,q=4023233417,r=2562383102,s=271733878,t=3285377520,b=e;if("string"==typeof b){b=unescape(encodeURIComponent(b));a=b.length;e=0;for(var m=[];e<a;)m[e>>2]=b.charCodeAt(e++)<<24|b.charCodeAt(e++)<<16|b.charCodeAt(e++)<<8|b.charCodeAt(e++);m.len=a;b=m;a=b.len}else a=a||b.length<<2;b[a>>2]|=128<<24-(31&(a<<=3));b[(a+64>>9<<4)+15]=a;e=b;for(m=e.length;k<m;){for(b=e.slice(k,k+=a=16);80>a;)h=b,c=a++,d=b[a-4]^
b[a-9]^b[a-15]^b[a-17],h[c]=d<<1|d>>>31;h=p;c=q;d=r;g=s;n=t;for(a=0;80>a;)l=(20>a?(c&d|~c&g)+1518500249:40>a?(c^d^g)+1859775393:60>a?(c&d|c&g|d&g)+2400959708:(c^d^g)+3395469782)+(h<<5|h>>>27)+n+(b[a++]|0),n=g,g=d,d=c<<30|c>>>2,c=h,h=l>>>0;p+=h;q+=c;r+=d;s+=g;t+=n}l=[p,q,r,s,t];if(f)f=l;else{f=l;for(k=f.length;k--;)f[k]=("0000000"+(f[k]>>>0).toString(16)).slice(-8);f=f.join("")}return f}}(this);
