(this["webpackJsonpfinancial-tracker-client"]=this["webpackJsonpfinancial-tracker-client"]||[]).push([[0],{101:function(e,t,n){e.exports=n(112)},106:function(e,t,n){},109:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(16),o=n.n(r),i=n(156),c=n(151),l=(n(106),n(107),n(30)),d=n(31),u=n(36),h=n(32),g=n(11),m=n(37),p=n(162),f=n(154),v=n(38),b=n(165),y=n(8),k=n(161),w=n(164),L=n(163),S=n(27),T=n(157),C=n(158);var E={getServerUrl:function(){return"https://fintrack-image-occpy2fuaa-an.a.run.app"},isReachable:function(){return fetch(this.getServerUrl(),{method:"HEAD",mode:"no-cors"}).then((function(e){return!0})).catch((function(e){return!1}))},login:function(e,t){var n=this.getServerUrl()+"/api/user/login";return fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserName:e,Password:t})}).then((function(e){return e.ok?e.json().then((function(e){return{success:!0,accessToken:e.accessToken,refreshToken:e.refreshToken}})):{success:!1}}))},register:function(e,t){var n=this.getServerUrl()+"/api/user/register";return fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserName:e,Password:t})}).then((function(e){return e.ok?e.json().then((function(e){return{success:!0,accessToken:e.accessToken,refreshToken:e.refreshToken}})):{success:!1}}))},renew:function(e){var t=this.getServerUrl()+"/api/user/renew";return e?fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:'"'.concat(e,'"')}).then((function(e){return e.ok?e.json().then((function(e){return{success:!0,accessToken:e.accessToken}})):{success:!1}})):{success:!1}}};var I={getToken:function(){return{accessToken:localStorage.getItem("accessToken"),refreshToken:localStorage.getItem("refreshToken")}},saveToken:function(e,t){localStorage.setItem("accessToken",e),localStorage.setItem("refreshToken",t)}},O=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).showLogin=n.showLogin.bind(Object(g.a)(n)),n.showRegister=n.showRegister.bind(Object(g.a)(n)),n.handleInputChange=n.handleInputChange.bind(Object(g.a)(n)),n.handleLogin=n.handleLogin.bind(Object(g.a)(n)),n.handleRegister=n.handleRegister.bind(Object(g.a)(n)),n.verifyPassword=n.verifyPassword.bind(Object(g.a)(n)),n.loggedIn=n.props.completionCallback,n.state={showLogin:!0,showRegister:!1,showSpinner:!1,regSuccess:!1,regFailed:!1,loginFailed:!1,LoginUserName:"",LoginPassword:"",RegUserName:"",RegPassword:"",RegPasswordVerify:""},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"showLogin",value:function(){this.setState({showLogin:!0,showRegister:!1,regSuccess:!1,regFailed:!1,loginFailed:!1})}},{key:"showRegister",value:function(){this.setState({showLogin:!1,showRegister:!0,regSuccess:!1,regFailed:!1,loginFailed:!1})}},{key:"handleInputChange",value:function(e){var t=e.target.value,n=e.target.name;this.setState(Object(v.a)({},n,t))}},{key:"verifyPassword",value:function(e){return e===this.state.RegPassword?"":"Passwords do not match"}},{key:"handleLogin",value:function(e){var t=this;e.preventDefault(),this.setState({showSpinner:!0}),E.login(this.state.LoginUserName,this.state.LoginPassword).then((function(e){t.setState({showSpinner:!1}),e.success?(I.saveToken(e.accessToken,e.refreshToken),t.setState({regSuccess:!1,loginFailed:!1}),t.loggedIn()):t.setState({regSuccess:!1,loginFailed:!0})}))}},{key:"handleRegister",value:function(e){var t=this;e.preventDefault(),this.state.RegPassword===this.state.RegPasswordVerify&&(this.setState({showSpinner:!0}),E.register(this.state.LoginUserName,this.state.LoginPassword).then((function(e){t.setState({showSpinner:!1}),e.success?(I.saveToken(e.accessToken,e.refreshToken),t.setState({showLogin:!0,showRegister:!1,regSuccess:!1,regFailed:!1}),t.loggedIn()):t.setState({regFailed:!0})})))}},{key:"render",value:function(){return s.a.createElement("div",null,this.state.showLogin&&s.a.createElement("form",{onSubmit:this.handleLogin},s.a.createElement(T.a,{tokens:{childrenGap:10},horizontalAlign:"center"},this.state.regSuccess&&s.a.createElement(b.a,{messageBarType:y.a.success,isMultiline:!1},"Registration successful"),this.state.loginFailed&&s.a.createElement(b.a,{messageBarType:y.a.error,isMultiline:!1},"The username and password do not match"),s.a.createElement(C.a,{label:"User name",name:"LoginUserName",value:this.state.LoginUserName,onChange:this.handleInputChange,required:!0}),s.a.createElement(C.a,{label:"Password",name:"LoginPassword",value:this.state.LoginPassword,onChange:this.handleInputChange,type:"password",required:!0}),s.a.createElement(T.a,{horizontal:!0,tokens:{childrenGap:10},verticalAlign:"center"},s.a.createElement(k.a,{text:"Login",type:"submit"}),this.state.showSpinner&&s.a.createElement(L.a,{size:S.a.small})),s.a.createElement(w.a,{onClick:this.showRegister},"Click here to register"))),this.state.showRegister&&s.a.createElement("form",{onSubmit:this.handleRegister},s.a.createElement(T.a,{tokens:{childrenGap:10},horizontalAlign:"center"},this.state.regFailed&&s.a.createElement(b.a,{messageBarType:y.a.error,isMultiline:!1},"The username and password do not match."),s.a.createElement(C.a,{label:"User name",name:"RegUserName",value:this.state.RegUserName,onChange:this.handleInputChange,required:!0}),s.a.createElement(C.a,{label:"Password",name:"RegPassword",type:"password",value:this.state.RegPassword,onChange:this.handleInputChange,required:!0}),s.a.createElement(C.a,{label:"Verify password",name:"RegPasswordVerify",type:"password",value:this.state.RegPasswordVerify,onChange:this.handleInputChange,onGetErrorMessage:this.verifyPassword,required:!0}),s.a.createElement(T.a,{horizontal:!0,tokens:{childrenGap:10},verticalAlign:"center"},s.a.createElement(k.a,{text:"Register",type:"submit"}),this.state.showSpinner&&s.a.createElement(L.a,{size:S.a.small})),s.a.createElement(w.a,{onClick:this.showLogin},"Return to login"))))}}]),t}(a.Component),j=n(152),U=n(153),N=n(169);var x,H={getServerUrl:function(){return"https://fintrack-image-occpy2fuaa-an.a.run.app"},listLedgers:function(e){var t=this.getServerUrl()+"/api/ledger/list",n=new Headers({Authorization:"Bearer "+e});return fetch(t,{headers:n}).then((function(e){return e.ok?e.json().then((function(e){return{success:!0,data:e}})):404===e.status?{success:!1,status:"Not found"}:401===e.status||403===e.status?{success:!1,status:"Unauthorized"}:{success:!1,status:"Error",data:[]}}))},getLedger:function(e,t,n){var a=this.getServerUrl()+"/api/ledger/get?year="+t+"&month="+n,s=new Headers({Authorization:"Bearer "+e});return fetch(a,{headers:s}).then((function(e){return e.ok?e.json().then((function(e){return{success:!0,data:e}})):401===e.status||403===e.status?{success:!1,status:"Unauthorized"}:404===e.status?{success:!1,status:"Not found"}:{success:!1,status:"Error",data:{Id:"",Owner:"",Type:"",Month:"",Year:"",Debits:[],DebitTotal:"",Credits:[],CreditTotal:""}}}))},addLedger:function(e,t){var n=this.getServerUrl()+"/api/ledger/add",a=new Headers({Authorization:"Bearer "+e,"Content-Type":"application/json"});return fetch(n,{method:"POST",headers:a,body:JSON.stringify(t)}).then((function(e){return e.ok?{success:!0}:401===e.status||403===e.status?{success:!1,status:"Unauthorized"}:{success:!1,status:"Error"}}))},updateLedger:function(e,t){var n=this.getServerUrl()+"/api/ledger/update?id="+t.Id,a=new Headers({Authorization:"Bearer "+e,"Content-Type":"application/json"});return fetch(n,{method:"PUT",headers:a,body:JSON.stringify(t)}).then((function(e){return e.ok?{success:!0}:401===e.status||403===e.status?{success:!1,status:"Unauthorized"}:{success:!1,status:"Error"}}))},deleteLedger:function(e,t){var n=this.getServerUrl()+"/api/ledger/delete?id="+t.Id,a=new Headers({Authorization:"Bearer "+e,"Content-Type":"application/json"});return fetch(n,{method:"DELETE",headers:a}).then((function(e){return e.ok?{success:!0}:401===e.status||403===e.status?{success:!1,status:"Unauthorized"}:{success:!1,status:"Error"}}))}},D=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).updateLedgerList=n.updateLedgerList.bind(Object(g.a)(n)),n.addLedger=n.addLedger.bind(Object(g.a)(n)),n.showFixed=n.showFixed.bind(Object(g.a)(n)),n.onChangeHandler=n.onChangeHandler.bind(Object(g.a)(n)),n.renderCell=n.renderCell.bind(Object(g.a)(n)),n.showingFixed=!1,n.selectionHandler=n.props.selectHandler,n.loginHandler=n.props.loginHandler,n.months=["","January","February","March","April","May","June","July","August","September","October","November","December"],n.ledgers=[],n.commandItems=[{key:"new",text:"New item",iconProps:{iconName:"Add"},onClick:n.addLedger}],n.farItems=[{key:"fixed",text:"Fixed",iconProps:{iconName:"Calendar"},onClick:n.showFixed},{key:"refresh",text:"Refresh",ariaLabel:"Refresh",iconOnly:!0,iconProps:{iconName:"Refresh"},onClick:n.updateLedgerList}],n.state={dropdownOptions:[],displayedLedgers:[],showSpinner:!1},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.updateLedgerList()}},{key:"configureDropdown",value:function(){for(var e=[],t=0;t<this.ledgers.length;t++)-1===e.indexOf(this.ledgers[t].Year)&&e.push(parseInt(this.ledgers[t].Year));e.sort((function(e,t){return t-e}));var n=[];n.push({key:"",text:""});for(var a=0;a<e.length;a++)n.push({key:e[a],text:e[a]});this.setState({dropdownOptions:n})}},{key:"updateLedgerList",value:function(){var e=this;this.setState({showSpinner:!0});var t=I.getToken().accessToken;H.listLedgers(t).then((function(t){e.setState({showSpinner:!1}),t.success?(e.ledgers=t.data.filter((function(e){return"regular"===e.Type})),e.ledgers.sort(e.sortLedgers),e.setState({displayedLedgers:e.ledgers}),e.configureDropdown()):"Unauthorized"===t.status&&e.loginHandler()}))}},{key:"showFixed",value:function(){this.selectionHandler({target:{dataset:{year:0,month:0}}})}},{key:"filterByYear",value:function(e){return this.ledgers.filter((function(t){return parseInt(t.Year)===parseInt(e)}))}},{key:"sortLedgers",value:function(e,t){return e.Year!==t.Year?t.Year-e.Year:t.Month-e.Month}},{key:"addLedger",value:function(){var e=new Date,t=e.getFullYear(),n=e.getMonth()+1;this.ledgers.length>0&&(t=parseInt(this.ledgers[0].Year),n=parseInt(this.ledgers[0].Month),13===++n&&(t++,n=1)),this.selectionHandler({target:{dataset:{year:t,month:n}}})}},{key:"onChangeHandler",value:function(e,t){""===t.value?this.setState({displayedLedgers:this.ledgers}):this.setState({displayedLedgers:this.filterByYear(t.value).sort(this.sortLedgers)})}},{key:"renderCell",value:function(e,t){return s.a.createElement("div",{className:"list-item",onClick:this.selectionHandler,"data-year":e.Year,"data-month":e.Month},s.a.createElement(p.a,{"data-year":e.Year,"data-month":e.Month},"".concat(e.Year," ").concat(this.months[e.Month])))}},{key:"render",value:function(){return s.a.createElement("div",{"data-is-scrollable":"true"},s.a.createElement(T.a,null,s.a.createElement(U.a,{placeholder:"Filter by year",options:this.state.dropdownOptions,onChange:this.onChangeHandler}),s.a.createElement(j.a,{items:this.commandItems,farItems:this.farItems,ariaLabel:""}),this.state.showSpinner&&s.a.createElement(L.a,{size:S.a.medium}),s.a.createElement(N.a,{items:this.state.displayedLedgers,onRenderCell:this.renderCell})))}}]),t}(a.Component),P=n(40),R=n(160),A=n(87),F=n(150),M=n(22),z=n(6),Y=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).save=n.save.bind(Object(g.a)(n)),n.addItem=n.addItem.bind(Object(g.a)(n)),n.handleTabClick=n.handleTabClick.bind(Object(g.a)(n)),n.renderItemColumn=n.renderItemColumn.bind(Object(g.a)(n)),n.onChangeHandler=n.onChangeHandler.bind(Object(g.a)(n)),n.populateFixedItems=n.populateFixedItems.bind(Object(g.a)(n)),n.loginHandler=n.props.loginHandler,n.backToList=n.props.returnHandler,n.parameters={year:n.props.selection.year,month:n.props.selection.month,type:0===n.props.selection.year?"fixed":"regular"},n.newLedger=!1,n.displayprops={columns:[{key:"item",name:"Item",fieldName:"Label",isPadded:!0},{key:"amount",name:"Amount",fieldName:"Amount",isPadded:!0}],stackItemStyles:{root:{alignItems:"center",justifyContent:"right",display:"grid"}}},n.commandItems=[{key:"back",text:"Back",ariaLabel:"Back",iconOnly:!0,iconProps:{iconName:"Back"},onClick:n.backToList},{key:"new",text:"New item",iconProps:{iconName:"Add"},onClick:n.addItem}],n.farItems=[{key:"save",text:"Save",ariaLabel:"Save",iconOnly:!0,iconProps:{iconName:"CheckMark"},onClick:n.save}],n.state={ledger:{Type:n.parameters.type,Month:n.parameters.month,Year:n.parameters.year,Debits:[],DebitTotal:"",Credits:[],CreditTotal:""},selectedTab:"Debits",saveSuccess:!1,saveFailed:!1,dataLoaded:!1},n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.getLedgerDetails()}},{key:"componentDidUpdate",value:function(e){this.props.selection.Year!==e.selection.Year&&this.props.selection.Month!==e.selection.Month&&this.getLedgerDetails()}},{key:"getLedgerDetails",value:function(){var e=this;console.log("Loading ".concat(this.parameters.year,"/").concat(this.parameters.month));var t=I.getToken().accessToken;H.getLedger(t,this.parameters.year,this.parameters.month).then((function(t){e.setState({dataLoaded:!0}),t.success?e.setState({ledger:t.data}):"Not found"===t.status?(console.log("No data found. New ledger will be created"),e.newLedger=!0,"regular"===e.state.ledger.Type&&e.populateFixedItems()):"Unauthorized"===t.status&&e.loginHandler()}))}},{key:"populateFixedItems",value:function(){var e=this;console.log("Loading fixed items"),this.setState({dataLoaded:!1});var t=I.getToken().accessToken;H.getLedger(t,0,0).then((function(t){e.setState({dataLoaded:!0}),t.success?e.setState((function(e){return{ledger:Object(P.a)({},e.ledger,{Debits:e.ledger.Debits.concat({Label:"Fixed expenses",Amount:t.data.DebitTotal}),Credits:e.ledger.Credits.concat({Label:"Fixed income",Amount:t.data.CreditTotal}),DebitTotal:t.data.DebitTotal,CreditTotal:t.data.CreditTotal})}})):"Unauthorized"===t.status&&e.loginHandler()}))}},{key:"addItem",value:function(){var e=this;console.log("Adding new item to ".concat(this.state.selectedTab)),this.setState((function(t){return{ledger:Object(P.a)({},t.ledger,Object(v.a)({},e.state.selectedTab,t.ledger[e.state.selectedTab].concat({Label:"",Amount:""})))}}))}},{key:"save",value:function(){var e=this;this.setState({saveSuccess:!1,saveFailed:!1});var t=I.getToken().accessToken;this.newLedger?H.addLedger(t,this.state.ledger).then((function(t){t.success?e.setState({saveSuccess:!0}):e.setState({saveFailed:!0})})):H.updateLedger(t,this.state.ledger).then((function(t){t.success?e.setState({saveSuccess:!0}):e.setState({saveFailed:!0})}))}},{key:"calculateTotal",value:function(e,t){return t.Amount?e+parseInt(t.Amount):e}},{key:"handleTabClick",value:function(e){this.setState({selectedTab:e.props.itemKey})}},{key:"onChangeHandler",value:function(e){var t=this,n=e.target.value,a=e.target.name,s=parseInt(e.target.dataset.index);console.log("Updating ".concat(a," of item ").concat(s," of ").concat(this.state.selectedTab)),this.setState((function(e){return{ledger:Object(P.a)({},e.ledger,Object(v.a)({},t.state.selectedTab,e.ledger[t.state.selectedTab].map((function(e,t){return t===s?Object(P.a)({},e,Object(v.a)({},a,n)):e}))))}}),(function(){"Debits"===t.state.selectedTab?t.setState((function(e){return{ledger:Object(P.a)({},e.ledger,{DebitTotal:e.ledger.Debits.reduce(t.calculateTotal,0)})}})):t.setState((function(e){return{ledger:Object(P.a)({},e.ledger,{CreditTotal:e.ledger.Credits.reduce(t.calculateTotal,0)})}}))}))}},{key:"renderItemColumn",value:function(e,t,n){switch(n.key){case"item":return s.a.createElement(C.a,{ariaLabel:"Item",name:"Label","data-index":t,value:this.state.ledger[this.state.selectedTab][t].Label,onChange:this.onChangeHandler});case"amount":return s.a.createElement(C.a,{ariaLabel:"Amount",name:"Amount",type:"number","data-index":t,value:this.state.ledger[this.state.selectedTab][t].Amount,onChange:this.onChangeHandler});default:return}}},{key:"render",value:function(){return s.a.createElement("div",null,this.state.saveSuccess&&s.a.createElement(b.a,{messageBarType:y.a.success,isMultiline:!1},"Saved"),this.state.saveFailed&&s.a.createElement(b.a,{messageBarType:y.a.error,isMultiline:!1},"Could not save. Please try again."),s.a.createElement(j.a,{items:this.commandItems,farItems:this.farItems,ariaLabel:""}),s.a.createElement(R.a,{selectedKey:this.state.selectedTab,onLinkClick:this.handleTabClick,styles:{link:{width:"50%"},linkIsSelected:{width:"50%"}}},s.a.createElement(A.a,{headerText:"Expenses",itemKey:"Debits"},s.a.createElement("div",{"data-is-scrollable":"true"},s.a.createElement(F.a,{items:this.state.ledger.Debits,columns:this.displayprops.columns,selectionMode:M.b.none,layoutMode:z.e.justified,isHeaderVisible:!0,enableShimmer:!this.state.dataLoaded,onRenderItemColumn:this.renderItemColumn}),s.a.createElement(T.a,{horizontal:!0,horizontalAlign:"end",tokens:{childrenGap:10,padding:32}},s.a.createElement(T.a.Item,{grow:5,styles:this.displayprops.stackItemStyles},"Total"),s.a.createElement(T.a.Item,{grow:!0,styles:this.displayprops.stackItemStyles},this.state.ledger.DebitTotal)))),s.a.createElement(A.a,{headerText:"Income",itemKey:"Credits"},s.a.createElement("div",{"data-is-scrollable":"true"},s.a.createElement(F.a,{items:this.state.ledger.Credits,columns:this.displayprops.columns,selectionMode:M.b.none,layoutMode:z.e.justified,isHeaderVisible:!0,enableShimmer:!this.state.dataLoaded,onRenderItemColumn:this.renderItemColumn}),s.a.createElement(T.a,{horizontal:!0,horizontalAlign:"end",tokens:{childrenGap:10,padding:32}},s.a.createElement(T.a.Item,{grow:5,styles:this.displayprops.stackItemStyles},"Total"),s.a.createElement(T.a.Item,{grow:!0,styles:this.displayprops.stackItemStyles},this.state.ledger.CreditTotal))))),s.a.createElement(T.a,{horizontal:!0,horizontalAlign:"end",tokens:{childrenGap:10,padding:32}},s.a.createElement(T.a.Item,{grow:5,styles:this.displayprops.stackItemStyles},s.a.createElement("b",null,"Net")),s.a.createElement(T.a.Item,{grow:!0,styles:this.displayprops.stackItemStyles},s.a.createElement("b",null,this.state.ledger.CreditTotal-this.state.ledger.DebitTotal))))}}]),t}(a.Component),B=(n(109),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).loginHandler=n.loginHandler.bind(Object(g.a)(n)),n.selectionHandler=n.selectionHandler.bind(Object(g.a)(n)),n.backToList=n.backToList.bind(Object(g.a)(n)),n.loggedIn=n.loggedIn.bind(Object(g.a)(n)),n.state={title:"Ledgers",showLedgerList:!0,showLedger:!1,showLogin:!1,selectedLedger:{year:"",month:""}},n.months=["","January","February","March","April","May","June","July","August","September","October","November","December"],n}return Object(m.a)(t,e),Object(d.a)(t,[{key:"loginHandler",value:function(){var e=this,t=I.getToken().refreshToken;E.renew(t).then((function(n){n.success?I.saveToken(n.accessToken,t):(e.origin=e.state.title,e.setState({title:"Sign in",showLedgerList:!1,showLedger:!1,showLogin:!0}))}))}},{key:"loggedIn",value:function(){"Ledgers"===this.origin?this.setState({title:"Ledgers",showLedgerList:!0,showLedger:!1,showLogin:!1}):this.setState({title:this.origin,showLedgerList:!1,showLedger:!0,showLogin:!1})}},{key:"selectionHandler",value:function(e){var t=parseInt(e.target.dataset.year),n=parseInt(e.target.dataset.month),a="".concat(t," ").concat(this.months[n]);0===t&&0===n&&(a="Fixed items"),this.setState({title:a,selectedLedger:{year:t,month:n},showLedgerList:!1,showLedger:!0,showLogin:!1})}},{key:"backToList",value:function(){this.setState({title:"Ledgers",showLedgerList:!0,showLedger:!1,showLogin:!1})}},{key:"render",value:function(){return s.a.createElement("div",{className:"ms-Grid",dir:"ltr"},s.a.createElement("div",{className:"ms-Grid-row header"},s.a.createElement("div",{className:"ms-Grid-col ms-sm12 align-center"},s.a.createElement(p.a,{variant:"large"},this.state.title))),s.a.createElement(f.a,{in:this.state.showLedgerList,timeout:200,classNames:"ledgerList",mountOnEnter:!0,unmountOnExit:!0},s.a.createElement(D,{selectHandler:this.selectionHandler,loginHandler:this.loginHandler})),s.a.createElement(f.a,{in:this.state.showLedger,timeout:200,classNames:"ledgerDetails",mountOnEnter:!0,unmountOnExit:!0},s.a.createElement(Y,{selection:this.state.selectedLedger,loginHandler:this.loginHandler,returnHandler:this.backToList})),s.a.createElement(f.a,{in:this.state.showLogin,timeout:200,classNames:"authScreen",mountOnEnter:!0,unmountOnExit:!0},s.a.createElement(O,{completionCallback:this.loggedIn})))}}]),t}(a.Component)),q=window.indexedDB.open("FinTrackDB",1);q.onsuccess=function(e){x=e.target.result},q.onerror=function(e){console.log("Unable to use IndexedDB")},q.onupgradeneeded=function(e){var t=(x=e.target.result).createObjectStore("ledgers",{autoIncrement:!0});t.createIndex("Id","Id",{unique:!1}),t.createIndex("Year","Year",{unique:!1}),t.createIndex("Month","Month",{unique:!1})};var J=H.getServerUrl(),G=!0;function W(){navigator.onLine?E.isReachable(J).then((function(e){e?(console.log("Client online"),G=!0):(console.log("No connectivity"),G=!1)})):(console.log("Client offline"),G=!1)}window.addEventListener("online",W),window.addEventListener("offline",W);var V=I.getToken().accessToken;setInterval((function(){if(G){x.transaction("ledgers").objectStore("ledgers").openCursor().onsuccess=function(e){var t,n=e.target.result;n&&(console.log("Syncing entry "+n.value.key),(t=n.value,void H.getLedger(V,t.Year,t.Month).then((function(e){if(e.success){var n=Date.parse(e.data.UpdatedAt);return!(Date.parse(t.UpdatedAt)>n)||function(e){H.updateLedger(V,e).then((function(e){return!!e.success||("Unauthorized"===e.status&&postMessage("Unauthorized"),!1)}))}(t).then((function(e){return e}))}return"Unauthorized"===e.status?(postMessage("Unauthorized"),!1):"Not found"===e.status?function(e){H.addLedger(V,e).then((function(e){return!!e.success||("Unauthorized"===e.status&&postMessage("Unauthorized"),!1)}))}(t).then((function(e){return e})):void 0}))).then((function(e){e&&(console.log("Entry "+n.value.key+" synced"),console.log("Deleting entry "+n.value.key),x.transaction("ledgers","readwrite").objectStore("ledgers").delete(n.value.key).onsuccess=function(){return!0})})).then((function(e){console.log("Delete complete"),n.continue()})).catch((function(){console.log("Syncing failed for entry "+n.value.key),n.continue()})))}}}),1e4);var K={onmessage:function(e){x.transaction(["ledgers"],"readwrite").objectStore("ledgers").add(e.data)}},$=[""];K.onmessage=function(e){e.data},window.addEventListener("install",(function(e){console.log("[Service worker] Install"),e.waitUntil(caches.open("fintrackCache-v1").then((function(e){return console.log("[Service worker] Caching app shell"),e.addAll($)})))})),window.addEventListener("fetch",(function(e){e.respondWith(fetch(e.request).then((function(t){return caches.open("fintrackCache-v1").then((function(n){return console.log("[Service Worker] Caching new resource: "+e.request.url),n.put(e.request,t.clone()),t}))})).catch((function(){"GET"==e.request.method?caches.match(e.request).then((function(e){return e})).catch((function(){return new Response(JSON.stringify({error:"No network connection"}))})):e.request.json().then((function(e){K.postMessage(e)}))})))})),window.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if("fintrackCache-v1"!==e)return caches.delete(e)})))})))}));var Q=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function X(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}Object(c.a)(),o.a.render(s.a.createElement(i.a,null,s.a.createElement(B,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/fintracker-client",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/fintracker-client","/js/workers/service-worker.js");Q?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):X(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):X(t,e)}))}}()}},[[101,1,2]]]);
//# sourceMappingURL=main.3a4f1883.chunk.js.map