let api_key = 'CWB-EB1D69D1-7768-425C-8056-89FEB2A08800'
let url = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=${api_key}&downloadType=WEB&format=JSON`

var place_data = [
    {
        tag: "Taipei_City",
        place: "Taipei City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "New Taipei_City",
        place: "New Taipei City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "Taoyuan_City",
        place: "Taoyuan City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "Taichung_City",
        place: "Taichung City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "Tainan_City",
        place: "Tainan City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "Kaohsiung_City",
        place: "Kaohsiung City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "Hsinchu_County",
        place: "Hsinchu County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Miaoli_County",
        place: "Miaoli County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Changhua_County",
        place: "Changhua County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Nantou_County",
        place: "Nantou County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Yunlin_County",
        place: "Yunlin County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Chiayi_County",
        place: "Chiayi County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Pingtung_County",
        place: "Pingtung County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Yilan_County",
        place: "Yilan County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Hualien_County",
        place: "Hualien County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Taitung_County",
        place: "Taitung County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Penghu_County",
        place: "Penghu County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Kinmen_County",
        place: "Kinmen County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Lienchiang_County",
        place: "Lienchiang County",
        low: 20,
        high: 24,
        weather: "Sunny"
    },

    {
        tag: "Keelung_City",
        place: "Keelung City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "Hsinchu_City",
        place: "Hsinchu City",
        low: 21,
        high: 25,
        weather: "Rainy"
    },

    {
        tag: "Chiayi_City",
        place: "Chiayi City",
        low: 21,
        high: 25,
        weather: "Rainy"
    }];


var paths;
const app = new Vue({
    el: '#app',
    mounted() {
        axios.get(url).then(data => {
            console.log(data)
            this.weather_data = data.data.cwbopendata.dataset.locations.location
        })

        paths = document.querySelectorAll('path');
        let _this = this
        paths.forEach(e => {
            e.onmouseover = function () {
                _this.filter = this.dataset.name
                console.log(this.dataset.name)
            }
        })
    },
    data: () => {
        return {
            filter: '',
            place_data: null,
            weather_data: []
        }
    },
    computed: {
        now_area() {
            let data = {}
            let result = this.weather_data.find((obj) => {
                return obj.locationName === this.filter
            })

            if (result) {
                let high = result.weatherElement.find(el => el.elementName === 'MaxT').time[0].elementValue.value
                let low = result.weatherElement.find(el => el.elementName === 'MinT').time[0].elementValue.value
                let weather = result.weatherElement.find(el => el.elementName === 'WeatherDescription').time[0].elementValue.value
                data = {
                    place: this.filter,
                    low: low,
                    high: high,
                    weather: weather,
                    placeTempRange: this.filter + '　|　' + low + ' ~ ' + high + ' °C'
                }
            }
            return data
        }
    },
})
