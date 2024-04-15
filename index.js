let phonebook = require('./phonebook') // CommonJS modules
const { numberOfEntries, requestTime } = require('./dataAboutPhonebook');

const express = require('express')
const app = express()

app.use(express.json())


app.get('/api/persons', (request, response) => {
  response.json(phonebook);
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${numberOfEntries()} people <br>
       ${requestTime()}
    </p>
  `);
});


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(pb => pb.id === id)

  if (person){
    response.json(person)
  } else{
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const initialLength = phonebook.length;
  phonebook = phonebook.filter(pb => pb.id !== id);


  if (initialLength === phonebook.length) {
    console.log('ID not found in phonebook:', id);
    return response.status(404).send({ error: 'unknown id' });
  }

  response.status(204).end();
});


const generateId = () => {
  const maxId = 1000000;
  return Math.floor(Math.random() * maxId);
}

  
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const pb = {
    id: generateId(),
    name: body.name, //name
    number: body.number
    
  }

  phonebook = phonebook.concat(pb)

  response.json(pb)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
