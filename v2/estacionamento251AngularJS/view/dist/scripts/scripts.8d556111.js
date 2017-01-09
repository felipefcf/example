"use strict";var app=angular.module("estacionamento",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngAnimate","ngTouch","ui.bootstrap","ngGrid","angularFileUpload","angulartics","angulartics.piwik","swaggerUi","config"]).config(["$routeProvider","USER_ROLES",function(a,b){a.when("/",{templateUrl:"views/dashboard/dashboard.html",controller:"DashboardController",data:{authorizedRoles:[b.NOT_LOGGED]}}).when("/login",{templateUrl:"views/login.html",controller:"AuthController",data:{authorizedRoles:[b.NOT_LOGGED]}}).when("/dashboard",{templateUrl:"views/dashboard/dashboard.html",controller:"DashboardController",data:{authorizedRoles:[b.NOT_LOGGED]}}).when("/403",{templateUrl:"views/403.html",data:{authorizedRoles:[b.NOT_LOGGED]}}).when("/fabricante",{templateUrl:"views/fabricante/listar.html",controller:"FabricanteController",data:{authorizedRoles:[b.NOT_LOGGED]}}).when("/fabricante/edit",{templateUrl:"views/fabricante/edit.html",controller:"FabricanteController",data:{authorizedRoles:[b.ADMINISTRADOR]}}).when("/fabricante/edit/:id",{templateUrl:"views/fabricante/edit.html",controller:"FabricanteController",data:{authorizedRoles:[b.NOT_LOGGED]}}).when("/usuario",{templateUrl:"views/usuario/listar.html",controller:"UsuarioController",data:{authorizedRoles:[b.ADMINISTRADOR]}}).when("/usuario/edit",{templateUrl:"views/usuario/edit.html",controller:"UsuarioController",data:{authorizedRoles:[b.ADMINISTRADOR]}}).when("/usuario/edit/:id",{templateUrl:"views/usuario/edit.html",controller:"UsuarioController",data:{authorizedRoles:[b.ADMINISTRADOR]}}).when("/swagger",{templateUrl:"views/swagger.html",controller:"SwaggerController",data:{authorizedRoles:[b.NOT_LOGGED]}}).otherwise({redirectTo:"/dashboard",data:{authorizedRoles:[b.NOT_LOGGED]}})}]);app.config(["$httpProvider",function(a){a.interceptors.push(["$q","$rootScope","AppService","ENV",function(a,b,c,d){return{request:function(e){b.$broadcast("loading-started");var f=c.getToken();return"development"==d.name&&-1!==e.url.indexOf("api")&&(e.url=d.apiEndpoint+e.url),f&&(e.headers.Authorization="Token "+f),e||a.when(e)},response:function(c){return b.$broadcast("loading-complete"),c||a.when(c)},responseError:function(c){return b.$broadcast("loading-complete"),a.reject(c)},requestError:function(c){return b.$broadcast("loading-complete"),a.reject(c)}}}]),a.interceptors.push(["$injector",function(a){return a.get("AuthInterceptor")}])}]),app.run(["$rootScope","$location","$window","AUTH_EVENTS","APP_EVENTS","USER_ROLES","AuthService","AppService","AlertService",function(a,b,c,d,e,f,g,h,i){a.$on("$routeChangeStart",function(b,c){if("/"!==c.redirectTo){var e=c.data.authorizedRoles;-1===e.indexOf(f.NOT_LOGGED)&&(g.isAuthorized(e)||(b.preventDefault(),g.isAuthenticated()?a.$broadcast(d.notAuthorized):a.$broadcast(d.notAuthenticated)))}}),a.$on(d.notAuthorized,function(){b.path("/403")}),a.$on(d.notAuthenticated,function(){a.currentUser=null,h.removeToken(),b.path("/login")}),a.$on(d.loginFailed,function(){h.removeToken(),b.path("/login")}),a.$on(d.logoutSuccess,function(){a.currentUser=null,h.removeToken(),b.path("/dashboard")}),a.$on(d.loginSuccess,function(){b.path("/dashboard")}),a.$on(e.offline,function(){i.clear(),i.addWithTimeout("danger","Servidor esta temporariamente indisponível, tente mais tarde")}),c.addEventListener("load",function(a){c.applicationCache.addEventListener("updateready",function(a){c.applicationCache.status===c.applicationCache.UPDATEREADY&&(c.location.reload(),alert("Uma nova versão será carregada!"))},!1)},!1)}]),app.constant("APP_EVENTS",{offline:"app-events-offline"}),app.constant("AUTH_EVENTS",{loginSuccess:"auth-login-success",loginFailed:"auth-login-failed",logoutSuccess:"auth-logout-success",sessionTimeout:"auth-session-timeout",notAuthenticated:"auth-not-authenticated",notAuthorized:"auth-not-authorized"}),app.constant("USER_ROLES",{ADMINISTRADOR:"ADMINISTRADOR",FUNCIONARIO:"FUNCIONARIO",CLIENTE:"CLIENTE",NOT_LOGGED:"NOT_LOGGED"}),app.constant("LAYOUTS",[{name:"Cerulean",url:"cerulean"},{name:"Cosmos",url:"cosmos"},{name:"Cyborg",url:"cyborg"},{name:"Darkly",url:"darkly"},{name:"Default",url:"default"},{name:"Flatly",url:"flatly"},{name:"Journal",url:"journal"},{name:"Lumen",url:"lumen"},{name:"Material",url:"material"},{name:"Readable",url:"readable"},{name:"Sandstone",url:"sandstone"},{name:"Simplex",url:"simplex"},{name:"Slate",url:"slate"},{name:"Spacelab",url:"spacelab"},{name:"Superhero",url:"superhero"},{name:"United",url:"united"},{name:"Yeti",url:"yeti"}]),app.factory("AuthInterceptor",["$rootScope","$q","AUTH_EVENTS","APP_EVENTS",function(a,b,c,d){return{responseError:function(e){return a.$broadcast({"-1":d.offline,0:d.offline,404:d.offline,503:d.offline,401:c.notAuthenticated,419:c.sessionTimeout,440:c.sessionTimeout}[e.status],e),b.reject(e)}}}]),angular.module("config",[]).constant("ENV",{name:"production",apiEndpoint:"http://estacionamento-pgxp.rhcloud.com/app/"}),window.ngGrid.i18n.en={ngAggregateLabel:"items",ngGroupPanelDescription:"Drag a column header here and drop it to group by that column.",ngSearchPlaceHolder:"Search...",ngMenuText:"Choose Columns:",ngShowingItemsLabel:"Showing Items:",ngTotalItemsLabel:"Total Items:",ngSelectedItemsLabel:"Selected Items:",ngPageSizeLabel:"Page Size:",ngPagerFirstTitle:"First Page",ngPagerNextTitle:"Next Page",ngPagerPrevTitle:"Previous Page",ngPagerLastTitle:"Last Page"},window.ngGrid.i18n.pt={ngAggregateLabel:"itens",ngGroupPanelDescription:"Arraste um cabeçalho de coluna aqui e solte-o para agrupar por essa coluna.",ngSearchPlaceHolder:"Procurar...",ngMenuText:"Escolha a coluna:",ngShowingItemsLabel:"Mostrar Itens:",ngTotalItemsLabel:"Total Itens:",ngSelectedItemsLabel:"Itens selecionados:",ngPageSizeLabel:"Itens por página:",ngPagerFirstTitle:"Primeiro",ngPagerNextTitle:"Próximo",ngPagerPrevTitle:"Anterior",ngPagerLastTitle:"Último"},app.directive("uiLinhabar",["$rootScope","$anchorScroll",function(a,b){return{restrict:"AC",template:'<span class="bar"></span>',link:function(a,c,d){c.addClass("linhabar hide"),a.$on("$routeChangeStart",function(a){b(),c.removeClass("hide").addClass("active")}),a.$on("$routeChangeSuccess",function(a,b,d,e){a.targetScope.$watch("$viewContentLoaded",function(){c.addClass("hide").removeClass("active")})}),a.$on("loading-started",function(a){c.removeClass("hide").addClass("active")}),a.$on("loading-complete",function(a){c.addClass("hide").removeClass("active")})}}}]),app.directive("backButton",function(){return{restrict:"A",link:function(a,b,c){b.bind("click",function(){history.back(),a.$apply()})}}}),app.directive("alerts",function(){return{restrict:"E",templateUrl:"partials/alerts.html"}}),app.directive("autofill",function(){return{require:"ngModel",link:function(a,b,c,d){a.$on("autofill:update",function(){d.$setViewValue(b.val())})}}}),app.directive("appVersion",["version",function(a){return function(b,c,d){c.text(a)}}]),app.directive("hasRoles",["AuthService",function(a){return{restrict:"A",link:function(b,c,d){var e=d.hasRoles.split(",");a.isAuthorized(e)||c.remove()}}}]),app.directive("isLogged",["AuthService",function(a){return{restrict:"A",link:function(b,c,d){a.isAuthenticated()||c.remove()}}}]),app.directive("confirmButton",["$timeout",function(a){return{restrict:"A",scope:{actionOK:"&confirmAction",actionCancel:"&cancelAction"},link:function(b,c,d){var e,f,g,h,i;e=Math.floor(1e10*Math.random()),d.buttonId=e,f=d.message||"Tem certeza?",i=d.yes||"Sim",g=d.no||"Não",h=d.title||"Confirmação",c.bind("click",function(c){bootbox.dialog({message:f,title:h,buttons:{success:{label:i,className:"btn-success",callback:function(){a(function(){b.$apply(b.actionOK)})}},danger:{label:g,className:"btn-danger",callback:function(){b.$apply(b.actionCancel)}}}})})}}}]),app.directive("validationMsg",["ValidationService",function(a){return{restrict:"E",scope:{propriedade:"@"},template:"<div class='error text-danger' ng-show='msg'><small class='error' >{{msg}}</small></div>",controller:["$scope",function(b){b.$watch(function(){return a.validation[b.propriedade]},function(a){b.msg=a})}]}}]),app.directive("maxLength",["$compile","AlertService",function(a,b){return{restrict:"A",require:"ngModel",link:function(a,c,d,e){d.$set("ngTrim","false");var f=parseInt(d.maxLength,10);e.$parsers.push(function(a){return void 0!==a&&void 0!==a.length&&a.length>f&&(b.addWithTimeout("warning","O valor máximo de caracteres ("+f+") para esse campo já foi alcançado"),a=a.substr(0,f),e.$setViewValue(a),e.$render()),a})}}}]),app.directive("hasRolesDisable",["AuthService",function(a){return{restrict:"A",link:function(b,c,d){var e=d.hasRolesDisable.split(",");a.isAuthorized(e)||angular.forEach(c.find("input, select, textarea, button, a"),function(a){var b=angular.element(a);b.attr("disabled","true")})}}}]),app.directive("ngEnter",function(){return function(a,b,c){b.bind("keydown keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter)}),b.preventDefault())})}}),app.filter("tamanho",function(){return function(a){var b=1024;if(b>a)return a+" B";var c=["kB","MB","GB","TB","PB","EB","ZB","YB"],d=-1;do a/=b,++d;while(a>=b);return a.toFixed(1)+" "+c[d]}}),app.filter("tipoArquivo",function(){var a={},b="images/filetypes/";return a.image=b+"doc.png",a.doc=b+"doc.png",a.xls=b+"xls.png",a.zip=b+"zip.png",a.pdf=b+"pdf.png",a.unknow=b+"unknow.png",function(b){var c=a.unknow;return b.indexOf("image")>-1?c=a.image:b.indexOf("doc")>-1?c=a.doc:b.indexOf("odt")>-1?c=a.odt:b.indexOf("xls")>-1?c=a.xls:b.indexOf("zip")>-1?c=a.zip:b.indexOf("rar")>-1?c=a.zip:b.indexOf("tar")>-1?c=a.zip:b.indexOf("gz")>-1?c=a.zip:b.indexOf("pdf")>-1&&(c=a.pdf),c}});var operacoes={CRIAR:{icone:"glyphicon glyphicon-plus",badge:"info"},ATUALIZAR:{icone:"glyphicon glyphicon-floppy-disk",badge:"primary"},APROVAR:{icone:"glyphicon glyphicon-thumbs-up",badge:"success"},REPROVAR:{icone:"glyphicon glyphicon-thumbs-down",badge:"danger"},FINALIZAR:{icone:"glyphicon glyphicon-ok",badge:"warning"},EXCLUIR:{icone:"glyphicon glyphicon-alert",badge:"danger"}};app.filter("startFrom",function(){return function(a,b){return a?(b=+b,a.slice(b)):a}}),app.filter("range",function(){return function(a,b){b=parseInt(b);for(var c=0;b>c;c++)a.push(c);return a}});