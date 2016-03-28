var url="http://www.amazon.com/b?ie=UTF8&node=256346011";

console.log(url.split('&').reduce(function(s,c){var t=c.split('=');s[t[0]]=t[1];return s;},{}).node);
