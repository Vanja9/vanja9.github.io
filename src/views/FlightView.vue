<template>
    <div class="flight">
        <div v-if="flight && mapData && weather">
            <h3 class="text-center">Detalji leta</h3>
            <div class="bg-dark card w-75 mx-auto mt-3">
                <img :src="'https://img.pequla.com/destination/' + flight.destination.toLowerCase().split(' ')[0] + '.jpg'"
                    class="card-img-top">
                <div class="text-light card-body">
                    <h5 class="card-title">{{ mapData.items[0].title }}</h5>
                </div>
                <ul class="text-light list-group list-group-flush">
                    <li class="bg-dark list-group-item">Broj leta: <strong>{{ flight.flightNumber }}</strong></li>
                    <li class="bg-dark list-group-item">Trenutna temperatura: <strong>{{ toCelsious(weather.current.temp) }} &deg;C</strong></li>
                    <li class="bg-dark list-group-item">Osecaj: <strong>{{ toCelsious(weather.current.feels_like) }} &deg;C</strong></li>
                    <li class="bg-dark list-group-item">Vlažnost vazduha: <strong>{{ weather.current.humidity }}%</strong></li>
                </ul>

                <div>
                    <iframe class="mx-auto" width="100%" height="400"
                        :src="`https://www.google.com/maps?output=embed&q=${mapData.items[0].title}`" allowfullscreen=""
                        loading="lazy" referrerpolicy="no-referrer-when-downgrade" id="gmaps"></iframe>
                </div>

            </div>

        </div>
        <div class="mx-auto text-center" v-else>
            <img src="@/assets/loading.gif" width="80">
            <h1>UCITAVANJE....</h1>
        </div>
    </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import axios from 'axios'
import FlightServices from '@/services/flight.services'
import WeatherService from '@/services/weather.service'


const route = useRoute();
const id = route.params.id

const flight = ref();
const mapData = ref();
const weather = ref()

FlightServices.getFlightById(id)
    .then(rsp => {
        flight.value = rsp.data


            // lokacija
        WeatherService.destGeoCode(rsp.data.destination)
            .then(rsp => {
                mapData.value = rsp.data

                // vremenska prognoza
                const pos = rsp.data.items[0].position
                WeatherService.getWeatherData(pos)
                    .then(rsp => {
                        weather.value = rsp.data
                    })

            })

    })


function toCelsious(k) {
    return Math.round(k - 273.15)
}
</script>