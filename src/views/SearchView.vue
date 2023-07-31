<template>
    <div class="container">
        <h3 class="prt">Pretraga</h3>
        <div class="input-group mb-3 w-100">
            <span class="input-group-text bg " id="desc">Destination:</span>
            <input type="text" class="form-control" placeholder="Unesite destinaciju" aria-describedby="desc" list="destOpt"
                v-model="tekst" @keypress="(e) => pronadjiLet()" @input="(e)=> autocomplete()" @change="(e)=>pronadjiLet()">
            <datalist id="destOpt">
                <option v-for="option in opcije" :value="option" @click="(e)=> console.log(option)"></option>
            </datalist>
            <button class="text-light border-light btn btn-outline-primary" @click="(e) => pronadjiLet()">Pronadji</button>
        </div>
        <div class="tabla">
        <table class="table table-striped table-dark" v-if="letovi">
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
                <FlightTableRow v-for="flight in letovi.content" :flight="flight" />
            </tbody>
        </table>
    </div>
    </div>
</template>

<script setup>
import FlightService from '@/services/flight.services';
import FlightTableRow from '@/components/FlightTableRow.vue';
import { ref } from 'vue';

const tekst = ref();
const letovi = ref();
const opcije = ref();

function pronadjiLet() {
    if (tekst && tekst.value != '') {
        FlightService.getAllFlightsForDestination(tekst.value).then(rsp => {
            letovi.value = rsp.data
        })
    }
}

function autocomplete() {
    FlightService.autocompleteDestinations(tekst.value).then(rsp => {
        if (tekst.value === rsp.data[0]) return // Ako je ukucana vrednost vec u ponudjenim, ne prikazuj je
        opcije.value = rsp.data
    })
}
</script>

<style>

.search{
    text-align: center;
    
}

.container{
    width: 100%;
    text-align: center;
}

.prt{
    font-size: 40px;
}

.desc{
    background-color: #e00e0e;
}

</style>