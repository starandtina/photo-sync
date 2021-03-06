<!DOCTYPE html>
<html>
<head>
  <title>Photo Sync Exercise</title>
  <link rel='stylesheet' type='text/css' href='app/styles/main.css'>
</head>
<body>

  <div id='app' class='app'></div>

  <script src='bower_components/jquery/dist/jquery.js'></script>
  <script src='bower_components/underscore/underscore.js'></script>
  <script src='bower_components/backbone/backbone.js'></script>
  <script src='bower_components/traceur/traceur.js'></script>
  <script src='bower_components/es6-module-loader/dist/es6-module-loader.js'></script>
  <script>System.import('app/scripts/main')</script>


  <script type="text/template" name="home">
    <div class='home'>
      <h1>Home</h1>
      <a href="#photos">Go to "Photos"</a>
    </div>
  </script>

  <script type='text/template' name='photos'>
    
    <% _.forEach(photos, function(photoGroup, key) { %>
      <dl>
        <dt><%= key %></dt>
      <% _.forEach(photoGroup, function(photo, index) { %>
        <% if (index % 5 === 0) { %>
        <div class='clear'></div>
        <% } %>
        <dd><img src=<%= photo.imageURL %> width=<%= photo.width %> height=<%= photo.height %> /></dd> 
      <% }); %>
      </dl>
    <% }); %>

  </script>

</body>
</html>