(function() {

// Require Jasmine's core files. Specifically, this requires and attaches all of Jasmine's code to the `jasmine` reference.
 window.jasmine = jasmineRequire.core(jasmineRequire);

 jasmineRequire.html(jasmine);

 // This is used to run all specs in a project.
 var env = jasmine.getEnv();

 // Build up the functions that will be exposed as the Jasmine public interface.
 var jasmineInterface = jasmineRequire.interface(jasmine, env);

 // Add all of the Jasmine global/public interface to the proper global
 if (typeof window == "undefined" && typeof exports == "object") {
   extend(exports, jasmineInterface);
 } else {
   extend(window, jasmineInterface);
 }

 var queryString = new jasmine.QueryString({
   getWindowLocation: function() { return window.location; }
 });

 var catchingExceptions = queryString.getParam("catch");
 env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);


  //Builds all of the HTML UI for the runner page
 var htmlReporter = new jasmine.HtmlReporter({
   env: env,
   onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
   getContainer: function() { return document.body; },
   createElement: function() { return document.createElement.apply(document, arguments); },
   createTextNode: function() { return document.createTextNode.apply(document, arguments); },
   timer: new jasmine.Timer()
 });

// The jsApiReporter receives spec results.
 env.addReporter(jasmineInterface.jsApiReporter);
 env.addReporter(htmlReporter);

 var specFilter = new jasmine.HtmlSpecFilter({
   filterString: function() { return queryString.getParam("spec"); }
 });

 env.specFilter = function(spec) {
   return specFilter.matches(spec.getFullName());
 };


  //Setting up timing functions.
 window.setTimeout = window.setTimeout;
 window.setInterval = window.setInterval;
 window.clearTimeout = window.clearTimeout;
 window.clearInterval = window.clearInterval;

 // Replace the browser window's onload
 var currentWindowOnload = window.onload;

 window.onload = function() {
   if (currentWindowOnload) {
     currentWindowOnload();
   }
   htmlReporter.initialize();
   env.execute();
 };

// Helper function for readability
 function extend(destination, source) {
   for (var property in source) destination[property] = source[property];
   return destination;
 }

}());
