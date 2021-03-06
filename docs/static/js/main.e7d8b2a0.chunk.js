(this.webpackJsonpjsinvest=this.webpackJsonpjsinvest||[]).push([[0],{48:function(e,t,a){},49:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var c=a(2),n=a.n(c),r=a(20),o=a.n(r),s=(a(47),a(48),a(49),a(42)),i=a(14),l=a(16),j=a(12),b=a(27),d=a(9),h=a(6),u=a(40),m=a(11),x=a(41),g=["Name","Symbol","Type","Shares","Share Price","Purchase Price","Allocated","Remainder","Symbol Allocation %","Group Allocation %","From Balance"],O=a(10),y=a(38),p=a(1),f=function(e){var t=e.accounts,a=e.idx,c=e.onAcctNameChange,n=e.onAcctBalanceChange,r=e.onAcctStrategyChange,o=e.onAcctAdd,s=e.onAcctDel,i=e.getStrategies;return Object(p.jsx)("div",{className:"mb-3",children:Object(p.jsx)(j.a,{children:Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{sm:3,children:Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(O.a.Prepend,{children:Object(p.jsx)(O.a.Text,{children:"Name"})}),Object(p.jsx)(j.a.Control,{type:"text",placeholder:"401k","data-idx":a,id:"accounts-".concat(a,"-name"),value:t[a].name,onChange:function(e){c(a,e.target.value)}})]})}),Object(p.jsx)(h.a,{sm:4,children:Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(O.a.Prepend,{children:Object(p.jsx)(O.a.Text,{children:"Balance"})}),Object(p.jsx)(j.a.Control,{type:"text",placeholder:"401k","data-idx":a,"data-balance":t[a].balance,id:"accounts-".concat(a,"-balance"),value:t[a].balance,onBlur:function(e){e.target.value=t[a].balance.toLocaleString("en-US",{style:"currency",currency:"USD"})},onChange:function(e){var t=e.target.value.replace(/[^0-9.-]+/g,"");if(console.log(t),""!==t){var c=Number.parseFloat(t);Number.isNaN(c)||n(a,c)}else n(a,0)}})]})}),Object(p.jsx)(h.a,{sm:4,children:Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(O.a.Prepend,{children:Object(p.jsx)(O.a.Text,{children:"Strategy"})}),Object(p.jsx)(j.a.Control,{as:"select",id:"accounts-".concat(a,"-strategy"),value:t[a].strategy,onChange:function(e){r(a,e.target.value)},children:i().map((function(e,t){return Object(p.jsx)("option",{children:e},"account-".concat(a,"-strategy-option-").concat(t))}))})]})}),Object(p.jsx)(h.a,{sm:1,children:Object(p.jsxs)(y.a,{"aria-label":"accounts-manage-buttons-".concat(a),children:[Object(p.jsx)(m.a,{onClick:function(){o(a)},children:"+"}),Object(p.jsx)(m.a,{variant:"danger",disabled:t.length<=1,onClick:function(){s(a)},children:"-"})]})})]})})})},v=function(e){var t=e.idx,a=e.strategies,c=e.onStrategyNameChange,r=(e.onStrategyAdd,e.onStrategyDel),o=e.onStrategySymbolAdd,s=e.onStrategySymbolDel,i=e.onStrategySymbolChange,l=e.onAllocationTypeChange,b=e.onAllocationAmountChange,u=e.onAllocationAdd,x=e.onAllocationDel;return Object(p.jsxs)(n.a.Fragment,{children:[Object(p.jsx)(d.a,{className:"border-top pt-3",children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)("label",{htmlFor:"strategy-name-".concat(t),children:"Strategy name"}),Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(j.a.Control,{type:"text",placeholder:"401k","data-idx":t,name:"strategy-name-".concat(t),id:"strategy-name-".concat(t),value:a[t].name,onChange:function(e){c(e,t)}}),Object(p.jsx)(O.a.Append,{children:Object(p.jsx)(m.a,{className:"",variant:"outline-danger",disabled:a.length<=1,onClick:function(){r(t)},children:"-"})})]})]})}),Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{sm:1}),Object(p.jsx)(h.a,{sm:11,children:Object(p.jsx)("p",{className:"text-muted",children:Object(p.jsxs)("i",{children:[Object(p.jsx)("b",{children:"Symbols"})," - choose the symbols (stock/ETF names) and their allocations (grouping) here."]})})})]}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:a[t].symbols.map((function(e,c){return Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{sm:1}),Object(p.jsx)(h.a,{sm:5,children:Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(O.a.Prepend,{children:Object(p.jsx)(O.a.Text,{children:"Symbol"})}),Object(p.jsx)(j.a.Control,{type:"text",placeholder:"SCHB","data-idx":t,"data-symbol-idx":c,id:"strategy-".concat(t,"-symbols-").concat(c,"-symbol"),value:a[t].symbols[c].symbol,onChange:function(e){var n=a[t].symbols[c];n.symbol=e.target.value.toUpperCase(),i(t,c,n)}})]})}),Object(p.jsx)(h.a,{sm:6,children:Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(O.a.Prepend,{children:Object(p.jsx)(O.a.Text,{children:"Type"})}),Object(p.jsx)(j.a.Control,{type:"text",placeholder:"broad","data-idx":t,"data-symbol-idx":c,id:"strategy-".concat(t,"-symbols-").concat(c,"-type"),value:a[t].symbols[c].type,onChange:function(e){var n=a[t].symbols[c];n.type=e.target.value,i(t,c,n)}}),Object(p.jsxs)(O.a.Append,{children:[Object(p.jsx)(m.a,{className:"",variant:"outline-secondary",onClick:function(){o(t)},children:"+"}),Object(p.jsx)(m.a,{className:"",variant:"outline-secondary",disabled:a[t].symbols.length<=1,onClick:function(){s(t,c)},children:"-"})]})]})})]},"strategy-".concat(t,"-symbols-").concat(c,"-row"))}))})}),Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{sm:1}),Object(p.jsx)(h.a,{sm:11,children:Object(p.jsx)("p",{className:"text-muted",children:Object(p.jsxs)("i",{children:[Object(p.jsx)("b",{children:"Allocations"})," - choose how to group and divide the above stocks/ETFs here."]})})})]}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:a[t].allocations.map((function(e,c){return Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{sm:1,xs:0}),Object(p.jsx)(h.a,{xs:6,sm:5,children:Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(O.a.Prepend,{children:Object(p.jsx)(O.a.Text,{children:"Type"})}),Object(p.jsx)(j.a.Control,{type:"text",placeholder:"broad","data-idx":t,"data-symbol-idx":c,id:"strategy-".concat(t,"-allocations-").concat(c,"-type"),value:a[t].allocations[c].type,onChange:function(e){l(t,c,e.target.value)}})]})}),Object(p.jsx)(h.a,{xs:6,sm:6,children:Object(p.jsxs)(O.a,{className:"mb-3",children:[Object(p.jsx)(j.a.Control,{type:"number",placeholder:"broad","data-idx":t,"data-symbol-idx":c,id:"strategy-".concat(t,"-allocations-").concat(c,"-amount"),value:a[t].allocations[c].amount,onChange:function(e){var a=Number.parseFloat(e.target.value);Number.isNaN(a)&&(a=0),b(t,c,a)}}),Object(p.jsxs)(O.a.Append,{children:[Object(p.jsx)(O.a.Text,{children:"%"}),Object(p.jsx)(m.a,{className:"",variant:"outline-secondary",onClick:function(){u(t)},children:"+"}),Object(p.jsx)(m.a,{className:"",variant:"outline-secondary",disabled:a[t].allocations.length<=1,onClick:function(){x(t,c)},children:"-"})]})]})})]},"strategy-".concat(t,"-allocations-").concat(c,"-row"))}))})})]},"strategy-".concat(t))},C=function(e,t,a){var c=[],n={};return t.symbols.forEach((function(e,t){n[e.type]||(n[e.type]={}),n[e.type][e.symbol]={}})),console.log(n),Object.keys(n).forEach((function(r,o){var s=function(e,t){var a=e.allocations.filter((function(e,a){if(e.type===t)return console.log(e),e}));return 1===a.length?a[0]:(console.warn("matched multiple or no allocations, should only have found one"),{type:"",amount:0})}(t,r);if(s.type){var i=s.amount/100*e.balance,l=s.amount/Object.keys(n[r]).length,j=i/Object.keys(n[r]).length;console.log(i,l,j),Object.keys(n[r]).forEach((function(t,o){a.forEach((function(a,o){if(a.rawQuote.symbol===t){var i=Math.floor(j/a.price),b=i*a.price;n[r][t]={shares:i,sharePrice:a.price,remainder:j-b,totalAllocated:b,idealAllocation:j,idealGroupAllocationPercentage:s.amount,idealSymbolAllocationPercentage:l};var d={name:e.name,symbol:t,type:r,shares:i,sharePrice:a.price,purchasePrice:b,allocated:j,remainder:n[r][t].remainder,symbolAllocationPercentage:n[r][t].idealSymbolAllocationPercentage,groupAllocationPercentage:n[r][t].idealGroupAllocationPercentage,fromBalance:e.balance};console.log(d),c.push(d)}}))})),console.log(n)}})),c},k=a(39),S=a.n(k),A=function(e){var t={rawQuote:e,price:0,change:0,changePercent:0,isActive:!1,isRegularTradingSession:!1};return"REGULAR"===e.marketState?(t.price=e.regularMarketPrice,t.change=e.regularMarketChange,t.changePercent=e.regularMarketChangePercent,t.isActive=!0,t.isRegularTradingSession=!0,t):"POST"===e.marketState&&0===e.postMarketPrice?(t.rawQuote=e,t.price=e.regularMarketPrice,t.change=e.regularMarketChange,t.changePercent=e.regularMarketChangePercent,t.isActive=!0,t.isRegularTradingSession=!1,t):"PRE"===e.marketState&&0===e.preMarketPrice?(t.rawQuote=e,t.price=e.regularMarketPrice,t.change=e.regularMarketChange,t.changePercent=e.regularMarketChangePercent,t.isActive=!1,t.isRegularTradingSession=!1,t):"POST"===e.marketState?(t.rawQuote=e,t.price=e.postMarketPrice,t.change=e.postMarketChange+e.regularMarketChange,t.changePercent=e.postMarketChangePercent+e.regularMarketChangePercent,t.isActive=!0,t.isRegularTradingSession=!1,t):"PRE"===e.marketState?(t.rawQuote=e,t.price=e.preMarketPrice,t.change=e.preMarketChange,t.changePercent=e.preMarketChangePercent,t.isActive=!0,t.isRegularTradingSession=!1,t):0!==e.postMarketPrice?(t.rawQuote=e,t.price=e.postMarketPrice,t.change=e.postMarketChange+e.regularMarketChange,t.changePercent=e.postMarketChangePercent+e.regularMarketChangePercent,t.isActive=!1,t.isRegularTradingSession=!1,t):(t.rawQuote=e,t.price=e.regularMarketPrice,t.change=e.regularMarketChange,t.changePercent=e.regularMarketChangePercent,t.isActive=!1,t.isRegularTradingSession=!1,t)},P=a(19),N=a(17),w=function(e){return e.toLocaleString("en-US",{style:"currency",currency:"USD"})},T=function(e){return"".concat(e.toFixed(2),"%")},M=function(){var e=function(){return{name:"AggressiveRetirement",symbols:[{symbol:"SCHB",type:"broad"}],allocations:[t()]}},t=function(){return{type:"broad",amount:100}},a=function(e,t){return{accounts:e,strategies:t}},n=function(e){M(e);var t=N.stringify(a(E,e),N.defaultOptions);W(t)},r=function(e){F(e);var t=N.stringify(a(e,k),N.defaultOptions);W(t)},o=function(e,t){M(e.strategies),F(e.accounts),t&&W(t)},O=Object(c.useState)([e()]),y=Object(l.a)(O,2),k=y[0],M=y[1],R=Object(c.useState)([{name:"401k",balance:1e5,strategy:"AggressiveRetirement"}]),B=Object(l.a)(R,2),E=B[0],F=B[1],I=Object(c.useState)([{name:"AggressiveRetirement1",symbol:"SCHB",type:"broad",shares:0,sharePrice:0,purchasePrice:0,allocated:0,remainder:0,symbolAllocationPercentage:0,groupAllocationPercentage:0,fromBalance:0}]),D=Object(l.a)(I,2),H=D[0],L=D[1],G=Object(c.useState)(""),U=Object(l.a)(G,2),q=U[0],Q=U[1],J=Object(c.useState)(""),V=Object(l.a)(J,2),Y=V[0],W=V[1],z=Object(c.useState)(!1),X=Object(l.a)(z,2),Z=X[0],K=X[1],$=function(e,t){var a=Object(i.a)(k);a[t].name=e.target.value,n(a)},_=function(){n([].concat(Object(i.a)(k),[Object(s.a)({},e())]))},ee=function(e){var t=k.filter((function(t,a){if(a!==e)return t}));n(t)},te=function(e){var t=k.map((function(t,a){return e===a?(t.symbols.push({symbol:"SCHB",type:"broad"}),t):t}));n(t)},ae=function(e,t){var a=Object(i.a)(k);a[e].symbols.splice(e,1),n(a)},ce=function(e,t,a){var c=Object(i.a)(k);c[e].symbols[t]=a,n(c)},ne=function(e,t,a){var c=Object(i.a)(k);c[e].allocations[t].type=a,n(c)},re=function(e,t,a){var c=Object(i.a)(k);c[e].allocations[t].amount=a,n(c)},oe=function(e){var a=Object(i.a)(k);a[e].allocations.push(t()),n(a)},se=function(e,t){var a=Object(i.a)(k);a[e].allocations.splice(t,1),n(a)},ie=function(e,t){var a=Object(i.a)(E);a[e].name=t,r(a)},le=function(e,t){var a=Object(i.a)(E);a[e].balance=t,r(a)},je=function(e,t){var a=Object(i.a)(E);a[e].strategy=t,r(a)},be=function(e){var t=Object(i.a)(E);t.splice(e,0,{name:"401k",balance:1e5,strategy:"AggressiveRetirement"}),r(t)},de=function(e){var t=Object(i.a)(E);t.splice(e,1),r(t)},he=function(){var e={};return k.forEach((function(t){e[t.name]=t.name})),Object.keys(e)},ue=Object(c.useState)(!1),me=Object(l.a)(ue,2),xe=me[0],ge=me[1],Oe=Object(c.useState)(!0),ye=Object(l.a)(Oe,2),pe=ye[0],fe=ye[1],ve=Object(c.useState)(!1),Ce=Object(l.a)(ve,2),ke=Ce[0],Se=Ce[1],Ae=Object(c.useState)(!1),Pe=Object(l.a)(Ae,2),Ne=Pe[0],we=Pe[1],Te=Object(c.useState)(!1),Me=Object(l.a)(Te,2),Re=Me[0],Be=Me[1];return Object(p.jsxs)(b.a,{fluid:!0,style:{paddingLeft:"0px",paddingRight:"0px"},children:[Object(p.jsxs)(u.a,{children:[Object(p.jsx)("h1",{children:"Invest faster!"}),Object(p.jsx)("p",{children:"Use this tool to balance your financial accounts according to strategies that you set up. If you have multiple financial accounts, but the same financial strategies across many of them and need to split share prices across different account balances, this is for you."}),Object(p.jsxs)("p",{children:["This tool was written by ",Object(p.jsx)("a",{href:"https://charlesmknox.com",rel:"noopener noreferer",children:"charles-m-knox"}),". View the source code on ",Object(p.jsx)("a",{href:"https://github.com/charles-m-knox/jsinvest",rel:"noopener noreferer",children:"GitHub here"}),". If you want to send me a tip, ",Object(p.jsx)("a",{href:"https://charlesmknox.com/about/#ways-to-support-me-directly",rel:"noopener noreferer",children:'visit the "about" page on my site here'}),". I do not store any data about your interactions with this site."]}),Object(p.jsxs)("p",{children:[Object(p.jsx)(m.a,{variant:"primary",className:"mr-3 mb-3","aria-controls":"import-export-opener","aria-expanded":xe,onClick:function(){!function(){var e={accounts:E,strategies:k},t=N.stringify(e,N.defaultOptions);W(t)}(),xe||(fe(!1),Se(!1),we(!1),Be(!1)),ge(!xe)},children:"Import/export"}),Object(p.jsx)(m.a,{variant:"primary",className:"mr-3 mb-3","aria-controls":"load-example",onClick:function(){o({strategies:[{name:"Retirement",symbols:[{symbol:"SCHA",type:"small"},{symbol:"SCHB",type:"broad"},{symbol:"SCHD",type:"large"},{symbol:"SCHF",type:"international"},{symbol:"SCHG",type:"large"},{symbol:"SCHX",type:"large"}],allocations:[{type:"fixed",amount:5},{type:"small",amount:10},{type:"medium",amount:10},{type:"large",amount:10},{type:"international",amount:10},{type:"broad",amount:10},{type:"cash",amount:2},{type:"stock",amount:0}]},{name:"Hodl",symbols:[{symbol:"GME",type:"stock"}],allocations:[{type:"cash",amount:2},{type:"stock",amount:98}]},{name:"BigTechStocks",symbols:[{symbol:"AAPL",type:"stock"},{symbol:"AMZN",type:"stock"},{symbol:"FB",type:"stock"},{symbol:"GOOG",type:"stock"},{symbol:"INTC",type:"stock"},{symbol:"AMD",type:"stock"},{symbol:"NVDA",type:"stock"}],allocations:[{type:"cash",amount:2},{type:"stock",amount:98}]}],accounts:[{name:"401k",balance:50500,strategy:"Retirement"},{name:"Brokerage 1",balance:1e4,strategy:"Hodl"},{name:"Brokerage 2",balance:1e4,strategy:"BigTechStocks"}]},""),fe(!0),Se(!1),we(!1),Be(!1),ge(!1)},children:"Load Example"}),Object(p.jsx)(m.a,{variant:"primary",className:"mr-3 mb-3","aria-controls":"load-example",onClick:function(){o({strategies:[{name:"Retirement",symbols:[{symbol:"SCHA",type:"small"}],allocations:[{type:"broad",amount:10}]}],accounts:[{name:"401k",balance:50500,strategy:"Retirement"}]},""),fe(!0),Se(!1),we(!1),Be(!1),ge(!1)},children:"Reset"})]})]}),Object(p.jsxs)(b.a,{style:{paddingLeft:"15px",paddingRight:"15px"},children:[Object(p.jsx)(P.a,{in:xe,children:Object(p.jsx)(d.a,{children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{style:{cursor:"pointer"},onClick:function(){ge(!xe)},children:Object(p.jsx)("h2",{children:"Import/export"})})}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:Object(p.jsx)("p",{children:"You can also import/export using the below options."})})}),Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{children:Object(p.jsxs)(j.a.Group,{controlId:"import-textarea",children:[Object(p.jsx)(j.a.Label,{children:"Paste here to Import:"}),Object(p.jsx)(j.a.Control,{as:"textarea",rows:6,value:q,onChange:function(e){Q(e.target.value)}})]})}),Object(p.jsx)(h.a,{children:Object(p.jsxs)(j.a.Group,{controlId:"export-textarea",children:[Object(p.jsx)(j.a.Label,{children:"Export:"}),Object(p.jsx)(j.a.Control,{as:"textarea",rows:6,readOnly:!0,onChange:function(e){},value:Y})]})})]}),Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{children:Object(p.jsx)(m.a,{className:"mb-3",onClick:function(){var e=N.parse(q,N.defaultOptions);e&&(o(e,q),ge(!1),fe(!0),Se(!0),we(!0),Be(!1))},children:"Import"})}),Object(p.jsx)(h.a,{children:Object(p.jsx)(m.a,{className:"mb-3",onClick:function(){navigator.clipboard.writeText(Y)},children:"Copy to Clipboard"})})]})]})})}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{style:{cursor:"pointer"},onClick:function(){fe(!pe)},children:Object(p.jsx)("h2",{children:"Step 1. Strategies"})})}),Object(p.jsx)(P.a,{in:pe,children:Object(p.jsx)(d.a,{children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:Object(p.jsxs)("p",{children:["An investment strategy can be the same across different accounts. For example, you might have a 401k, HSA, and Roth IRA all with long-term growth as the goal, with the ",Object(p.jsx)("b",{children:"same exact investments"}),", but just across different accounts. This is one specific investment ",Object(p.jsx)("i",{children:"strategy"}),"."]})})}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:k.map((function(e,t){return Object(p.jsx)(v,{idx:t,strategies:k,onStrategyNameChange:$,onStrategyAdd:_,onStrategyDel:ee,onStrategySymbolAdd:te,onStrategySymbolDel:ae,onStrategySymbolChange:ce,onAllocationTypeChange:ne,onAllocationAmountChange:re,onAllocationAdd:oe,onAllocationDel:se},"strategyview-".concat(t))}))})}),Object(p.jsxs)(d.a,{children:[Object(p.jsx)(h.a,{children:Object(p.jsx)(m.a,{className:"mb-3",onClick:function(){fe(!1),Se(!ke),we(!1)},children:"Next step"})}),Object(p.jsx)(h.a,{children:Object(p.jsx)(m.a,{className:"mb-3",variant:"outline-primary",onClick:_,children:"Add strategy"})})]})]})})}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{style:{cursor:"pointer"},onClick:function(){Se(!ke)},children:Object(p.jsx)("h2",{children:"Step 2. Set up Accounts"})})}),Object(p.jsx)(P.a,{in:ke,children:Object(p.jsx)(d.a,{children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:Object(p.jsx)("p",{children:"Next, you can create any number of accounts that you want, each with its own balance. Then, you can choose a strategy from above to assign to it."})})}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:E.map((function(e,t){return Object(p.jsx)(f,{accounts:E,idx:t,onAcctNameChange:ie,onAcctBalanceChange:le,onAcctStrategyChange:je,onAcctAdd:be,onAcctDel:de,getStrategies:he},"accountview-".concat(t))}))})}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:Object(p.jsx)(m.a,{className:"mb-3",onClick:function(){fe(!1),Se(!1),we(!0)},children:"Final step"})})})]})})}),Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{style:{cursor:"pointer"},onClick:function(){we(!Ne)},children:Object(p.jsx)("h2",{children:"Step 3. Get results"})})}),Object(p.jsx)(P.a,{in:Ne,children:Object(p.jsx)(d.a,{children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:Object(p.jsx)("p",{children:'Just click the "Balance" button to query the Yahoo Finance servers to get quotes for each symbol from above. A table below will populate, and you can copy the results as CSV, so that they can be pasted into your favorite spreadsheet processor.'})})}),Object(p.jsx)(d.a,{children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)(m.a,{className:"mb-3 mr-3",onClick:function(){var e=[],t={};k.forEach((function(e){e.symbols.forEach((function(e){t[e.symbol]=e.symbol}))})),function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a="https://873laarwv8.execute-api.us-west-2.amazonaws.com/?symbols=".concat(e.join(","));return!0===t&&(a="https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=".concat(e.join(","))),S.a.get(a).then((function(e){var t=e.data;if(t.quoteResponse.result){var a=[];return t.quoteResponse.result.forEach((function(e){a.push(A(e))})),a}})).catch((function(e){return console.error(e),[]}))}(Object.keys(t),Z).then((function(t){if(Array.isArray(t))return E.forEach((function(a){k.forEach((function(c){if(c.name.toLowerCase()===a.strategy.toLowerCase()){var n=C(a,c,t);console.log(n),e=[].concat(Object(i.a)(e),Object(i.a)(n))}}))})),console.log(e),L(Object(i.a)(e)),void Be(!0);console.error("did not receive quotes from backend: ".concat(JSON.stringify(t)))}))},children:"Balance"}),Object(p.jsx)(m.a,{className:"mb-3 mr-3",variant:"outline-secondary",onClick:function(){K(!Z)},children:Z?"Use Direct Query":"Use Proxy (default)"})]})}),Object(p.jsx)(P.a,{in:Z,children:Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{children:Object(p.jsxs)("span",{className:"text-muted small",children:["Warning: When directly connecting to Yahoo's API through the browser, CORS manipulation is needed. Requests will fail unless you know what you're doing. If this sounds scary, just press the \"Use Proxy (default)\" button.",Object(p.jsx)("br",{}),Object(p.jsx)("br",{}),"I have provided a proxy using an AWS API gateway and Lambda function that will query the Yahoo Finance servers and allow this website as an origin only."]})})})}),Object(p.jsx)(P.a,{in:Re,children:Object(p.jsx)(d.a,{children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)(d.a,{children:Object(p.jsx)(h.a,{className:"mb-3",children:Object(p.jsxs)(x.a,{striped:!0,bordered:!0,hover:!0,responsive:!0,children:[Object(p.jsx)("thead",{children:Object(p.jsxs)("tr",{children:[Object(p.jsx)("th",{children:"#"}),g.map((function(e,t){return Object(p.jsx)("td",{children:e},"results-header-".concat(t))}))]})}),Object(p.jsx)("tbody",{children:H.map((function(e,t){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:t+1}),Object(p.jsx)("td",{children:e.name}),Object(p.jsx)("td",{children:e.symbol}),Object(p.jsx)("td",{children:e.type}),Object(p.jsx)("td",{children:e.shares}),Object(p.jsx)("td",{children:w(e.sharePrice)}),Object(p.jsx)("td",{children:w(e.purchasePrice)}),Object(p.jsx)("td",{children:w(e.allocated)}),Object(p.jsx)("td",{children:w(e.remainder)}),Object(p.jsx)("td",{children:T(e.symbolAllocationPercentage)}),Object(p.jsx)("td",{children:T(e.groupAllocationPercentage)}),Object(p.jsx)("td",{children:w(e.fromBalance)})]},"results-row-".concat(t))}))})]})})}),Object(p.jsx)(d.a,{children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)(m.a,{className:"mb-3 mr-3",onClick:function(){navigator.clipboard.writeText(function(e){var t=["#,".concat(g.join(","))];return e.forEach((function(e,a){t.push([a+1,'"'.concat(e.name,'"'),'"'.concat(e.symbol,'"'),'"'.concat(e.type,'"'),'"'.concat(e.shares,'"'),'"'.concat(w(e.sharePrice),'"'),'"'.concat(w(e.purchasePrice),'"'),'"'.concat(w(e.allocated),'"'),'"'.concat(w(e.remainder),'"'),'"'.concat(T(e.symbolAllocationPercentage),'"'),'"'.concat(T(e.groupAllocationPercentage),'"'),'"'.concat(w(e.fromBalance),'"')].join(","))})),t.join("\n")}(H))},children:"Copy as CSV"}),Object(p.jsx)(m.a,{className:"mb-3 mr-3",onClick:function(){fe(!0),Se(!1),we(!1)},children:"Back to top"})]})})]})})})]})})})]})]})},R=function(){return Object(p.jsx)(n.a.Fragment,{children:Object(p.jsx)(M,{})})},B=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,79)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),c(e),n(e),r(e),o(e)}))};o.a.render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsx)(R,{})}),document.getElementById("root")),B()}},[[76,1,2]]]);
//# sourceMappingURL=main.e7d8b2a0.chunk.js.map