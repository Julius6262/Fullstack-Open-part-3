const phonebook = require('./phonebook') // CommonJS modules
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

/*
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
*/
/*
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  */
 /*
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })
*/
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
