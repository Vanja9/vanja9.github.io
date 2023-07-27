<template>
  <div class=" text-light container mt-4" >

    <h2>Prikaz letova</h2>
    <div v-if="letovi">
      <nav>
        <ul class="pagination">
          <li class="page-item ">
            <button class="page-link bg-dark text-white" type="button" @click="(e)=> loadFirst()">Prva</button>
          </li>
          <li class="page-item ">
            <button class="page-link bg-dark text-white" type="button" @click="(e)=> loadPrevous()">Prethodna</button>
          </li>
          <li class="page-item bg-secondary">
            <a class="page-link bg-secondary boder-secondary">{{ letovi.number + 1 }} </a>
          </li>
          <li class="page-item">
            <button class="page-link bg-dark text-white" type="button" @click="(e)=> loadNext()">Sledeca</button>
          </li>
          <li class="page-item ">
            <button class="page-link bg-dark text-white" type="button" @click="(e)=> loadLast()">Poslednja</button>
          </li>
        </ul>
      </nav>


      <div>
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">BROJ LETA</th>
              <th scope="col">DESTINACIJA</th>
              <th scope="col">MODEL AVIONA</th>
              <th scope="col">VREME</th>
              <th scope="col">AKCIJA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="letAviona in letovi.content">
              <th scope="row">{{ letAviona.id }}</th>
              <td>{{ letAviona.flightNumber }}</td>
              <td>{{ letAviona.destination }}</td>
              <td>{{ letAviona.plane }}</td>
              <td>{{ letAviona.scheduledAt }}</td>
              <td><router-link class="btn btn-outline-light btn-sm " :to="'/flight/' + letAviona.id">Detalji</router-link> </td>
            </tr>



          </tbody>
        </table>
      </div>
    </div>
    <div class="text-light" v-else>Ucitavanjee</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FlightServices from '@/services/flight.services'

const letovi = ref()


function loadData(page = 0){
  FlightServices.getAllFlights(page, 12)
  .then(rsp => {
    console.log(rsp)
    letovi.value = rsp.data
  })
}


loadData()


function loadFirst() {
  if(letovi.value.first) return
  loadData(0)
}

function loadNext() {
  if(letovi.last) return
  loadData(letovi.value.number + 1)
  }

  function loadPrevous() {
  if(letovi.first) return
  loadData(letovi.value.number - 1)
  }

  function loadLast() {
  if(letovi.last) return
  loadData(letovi.value.totalPages - 1)
  }
</script>







