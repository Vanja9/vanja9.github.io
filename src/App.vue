<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#"><img src="@/assets/airserbia.png" height="28"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">


        <li class="nav-item ">
          <strong><router-link class="nav-link " to="/">Home</router-link></strong>
        </li>
        <li class="nav-item">
          <strong><router-link class="nav-link " to="/search">Search</router-link></strong>
        </li>
        <li class="nav-item">
          <strong><router-link class="nav-link " to="about">About</router-link></strong>
        </li>


      </ul>
    </div>
  </nav>
  <div class="text-light"><router-view /></div>

  <footer class="text-light text-center container mt-4"> &copy; {{ year }} Univerzitet Singidunum </footer>
</template>


<script setup>
const year = new Date().getFullYear();
</script>


