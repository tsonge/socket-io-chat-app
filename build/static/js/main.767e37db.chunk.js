(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{38:function(e,t,n){e.exports=n(82)},43:function(e,t,n){},44:function(e,t,n){},75:function(e,t){},78:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(20),c=n.n(s),o=(n(43),n(13)),r=n(9),u=n(7),l=n(1),m=n(2),h=n(4),d=n(3),p=(n(44),n(37)),g=n.n(p),D=(n(78),function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"render",value:function(){return i.a.createElement("ul",{id:"messages"},this.props.messages.map((function(e,t){return i.a.createElement("li",{key:t},e[0]," :: ",e[1])})))}}]),n}(i.a.Component)),b=n(6),f=(n(79),function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={value:""},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(b.a)(a)),a}return Object(m.a)(n,[{key:"handleChange",value:function(e){this.setState({value:e.target.value}),this.props.isTypingEmitFunc()}},{key:"handleSubmit",value:function(e){this.props.emitMsgFunc(this.state.value),e.preventDefault(),this.setState({value:""})}},{key:"render",value:function(){return i.a.createElement("form",{className:"messageInputFormElement",onSubmit:this.handleSubmit},i.a.createElement("input",{className:"messageInputInputElement",autoComplete:"off",value:this.state.value,onChange:this.handleChange}),i.a.createElement("button",{className:"messageInputSendButton"},"Send"))}}]),n}(i.a.Component)),v=(n(80),n(12)),w=n.n(v),y=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(m.a)(n,[{key:"render",value:function(){var e=this;return i.a.createElement(w.a,null,i.a.createElement("div",{className:"onlineNowBox"},i.a.createElement("h1",null,"Online Users"),i.a.createElement("ul",null,Object.entries(this.props.userList).map((function(t,n){return i.a.createElement("li",{key:n},i.a.createElement("a",{href:"/#",onClick:function(){return e.props.createNewDMWindowFunc(t)}},t[1]))})))))}}]),n}(i.a.Component),M=(n(81),function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={value:""},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(b.a)(a)),a}return Object(m.a)(n,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){console.log("called"),this.props.emitDMMessageFunc(this.props.IDnickPair[0],this.state.value),e.preventDefault(),this.setState({value:""})}},{key:"render",value:function(){var e=this;return i.a.createElement(w.a,null,i.a.createElement("div",{className:"DMWindowDiv"},i.a.createElement("div",{className:"DMWindowHeader"}," ","Direct Messages with: "+this.props.IDnickPair[1]," "),i.a.createElement("ul",{className:"DMul"},this.props.messages.map((function(e,t){return i.a.createElement("li",{key:t},e[0]," :: ",e[1])}))),i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("input",{className:"DMInputElement",type:"text",value:this.state.value,onChange:this.handleChange})),i.a.createElement("button",{onClick:function(){return e.props.closeButtonFunc(e.props.IDnickPair[0])}},"Close DM")))}}]),n}(i.a.Component)),O=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).isTypingEmit=function(){a.state.socket.emit("is typing",a.state.ourNick)},a.emitMessage=function(e){a.state.socket.emit("chat message",e,a.state.ourNick)},a.emitDMMessage=function(e,t){a.state.socket.emit("DM",e,t)},a.createNewDMWindow=function(e){console.log("createNewDMWindow fired, IDnickPair=",e),a.setState({DMWindowData:Object(u.a)(Object(u.a)({},a.state.DMWindowData),{},Object(r.a)({},e[0],{IDnickPair:e,messages:[]}))})},a.closeDMWindow=function(e){var t=Object(u.a)({},a.state.DMWindowData);delete t[e],a.setState({DMWindowData:t})},a.state={messages:[],onlineNow:{dummySocketID:"dummyNick"},DMWindowData:{},whoIsTyping:[]},a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=g()(),n=prompt("Please enter your nick","Harry Potter");this.setState({socket:t,ourNick:n}),t.emit("whose online add",n),t.on("chat message",(function(t,n){e.setState({messages:e.state.messages.concat([[n,t]])})})),t.on("update whose online now",(function(t){e.setState({onlineNow:t})})),t.on("DM received",(function(t,n,a){n in e.state.DMWindowData?e.setState({DMWindowData:Object(u.a)(Object(u.a)({},e.state.DMWindowData),{},Object(r.a)({},n,{IDnickPair:[n,t],messages:[].concat(Object(o.a)(e.state.DMWindowData[n].messages),[[t,a]])}))}):e.setState({DMWindowData:Object(u.a)(Object(u.a)({},e.state.DMWindowData),{},Object(r.a)({},n,{IDnickPair:[n,t],messages:[[t,a]]}))})})),t.on("somebody is typing",(function(t){e.state.whoIsTyping.includes(t)||(e.setState({whoIsTyping:[].concat(Object(o.a)(e.state.whoIsTyping),[t])}),setTimeout((function(){var n=Object(o.a)(e.state.whoIsTyping),a=n.indexOf(t);-1!==a&&n.splice(a,1),e.setState({whoIsTyping:n})}),2500))}))}},{key:"render",value:function(){for(var e,t=[],n=0,a=Object.values(this.state.DMWindowData);n<a.length;n++){var s=a[n];t.push(i.a.createElement(M,{key:s.IDnickPair[0],IDnickPair:s.IDnickPair,messages:s.messages,closeButtonFunc:this.closeDMWindow,emitDMMessageFunc:this.emitDMMessage}))}return e=this.state.whoIsTyping.length>0?i.a.createElement("div",{className:"isTypingDiv"},this.state.whoIsTyping.map((function(e){return e+", "}))," is typing..."):i.a.createElement("div",{className:"isTypingDiv"}),i.a.createElement(i.a.Fragment,null,i.a.createElement(y,{userList:this.state.onlineNow,createNewDMWindowFunc:this.createNewDMWindow}),t,e,i.a.createElement(D,{messages:this.state.messages}),i.a.createElement(f,{emitMsgFunc:this.emitMessage,isTypingEmitFunc:this.isTypingEmit}))}}]),n}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.767e37db.chunk.js.map