<template>
    <div class="flight">
        <div class="sve" v-if="flight && mapData && weather">


            <h3 class="naslov">Detalji leta</h3>
            <div class="container-sve">

                <div class="sit">


                    <img :src="'https://img.pequla.com/destination/' + flight.destination.toLowerCase().split(' ')[0] + '.jpg'"
                        class="slikaaa">





                    <ul class="tablica">
                        <li class="bg-dark list-group-item">
                            <h5 class="naslovv">{{ mapData.items[0].title }}</h5>
                        </li>
                        <li class="bg-dark list-group-item" id="tabla1">Broj leta: <strong>{{ flight.flightNumber
                        }}</strong>
                        </li>
                        <li class="bg-dark list-group-item" id="tabla2">Trenutna temperatura: <strong>{{
                            toCelsious(weather.current.temp) }} &deg;C</strong></li>
                        <li class="bg-dark list-group-item">Osecaj: <strong>{{ toCelsious(weather.current.feels_like) }}
                                &deg;C</strong></li>
                        <li class="bg-dark list-group-item">Vlažnost vazduha: <strong>{{ weather.current.humidity
                        }}%</strong>
                        </li>
                    </ul>


                </div>


                <div class="containerm">
                    <iframe class="mapa" :src="`https://www.google.com/maps?output=embed&q=${mapData.items[0].title}`"
                        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id="gmaps"></iframe>
                </div>
            </div>



        </div>


        <LoadingWidget v-else />
    </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import FlightServices from '@/services/flight.services'
import WeatherService from '@/services/weather.service'
import LoadingWidget from '@/components/LoadingWidget.vue'


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

<style>
.naslov {
    font-size: 37px;
    text-align: center;

}

.sve {
    background: #343a40;
    margin: 50px;

}

.sit {
    margin: 20px;
    display: flex;
    flex-direction: row;
    background-color: #343a40;
}

.slikaaa {
    width: 50%;
    margin: auto;
}

.tablica {
    width: 100%;

    margin: auto;
    text-align: left;
}

.mapa {
    width: 100%;
    height: 400px;

}

.containerm {
    text-align: center;
    margin: 20px;
}


.containers {
    text-align: center;
    margin: 0 auto;
}
.container-sve{
    display:flex;
    flex-direction: column;
}


.ucitavanje{
    text-align: center;
}
</style>