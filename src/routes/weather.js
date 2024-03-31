import express from 'express'
import axios from 'axios'
import { config } from 'dotenv'
import { getWeahterData } from '../helper/getWeather'
config()
export const router=express.Router()
//api endpoint - /api/weather
//use: fetch weather data
//not used at all. everything handled by WebSockets
router.post('/',async (req,res)=>{
    try {
        const {latitude,longitude}=req.body
        const data=await getWeahterData(latitude,longitude)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
})