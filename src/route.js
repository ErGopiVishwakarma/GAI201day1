const codeRouter = require('express').Router();
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY})

codeRouter.get('/',(req,res)=>{
    res.send('hii')
})


codeRouter.post("/convert",async (req,res)=>{
    const {code,language} = req.body
    console.log(req.body)
   
    try {
     
        const completion = await openai.chat.completions.create({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `convert this code ${code} into ${language} and give response only converted code not explanation`}],
          "temperature": 0.7
        });
        res.status(200).send(completion.choices[0].message.content);
      
    } catch (error) {
      res.status(400).send({
        error }
      )
    }
  })

  codeRouter.post("/debug",async (req,res)=>{
    const {code} = req.body
    console.log(req.body)
   
    try {
     
        const completion = await openai.chat.completions.create({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `debug the code ${code} and give response with proper explanation`}],
          "temperature": 0.7
        });
        res.status(200).send(completion.choices[0].message.content);
      
    } catch (error) {
      res.status(400).send({
        error } 
      )
    }
  })

  codeRouter.post("/check",async (req,res)=>{
    const {code} = req.body
    console.log(req.body)
   
    try {
     
        const completion = await openai.chat.completions.create({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `check the quality of code ${code} and give proper feedback`}],
          "temperature": 0.7
        });
        res.status(200).send(completion.choices[0].message.content);
      
    } catch (error) {
      res.status(400).send({
        error } 
      )
    }
  })

  module.exports = codeRouter