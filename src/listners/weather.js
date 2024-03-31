import { getWeahterData } from "../helper/getWeather.js";
const REFRESH_RATE = 30 * 1000

export const weatherListner = async (socket) => {
    let cronJob
    socket.on('current', async ({ longitude, latitude }) => {
        try {
            //inital responses
            let data = await getWeahterData(latitude, longitude)
            socket.emit("update", data)
            //starting a cron job to retrive and send recent weather data
            cronJob = setInterval(async () => {
                try {
                    socket.volatile.emit("update", data)
                    data = await getWeahterData(latitude, longitude)
                } catch (error) {
                    console.log(error)
                    socket.emit("exception", {
                        failed_to_fetch: true
                    })
                }
            }, REFRESH_RATE)
        } catch (error) {
            //if failes error sent to handle
            socket.emit("exception", {
                failed_to_fetch: true
            })
        }
    });
    socket.on('disconnect', () => {
        clearInterval(cronJob)
    })
}