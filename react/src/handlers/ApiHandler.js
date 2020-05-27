import axios from 'axios';

class ApiHandler{
  notes = []
  users = []
  sortedNotes = []
  active = null


  constructor(renderList) {
    this.renderList = () => {}
    this.getNotesHard()
  }
  
  getNotesHard(){
    axios.get( process.env.REACT_APP_API_URL + `/api/notes`)
    .then(res => {
      const notes = res.data
      this.notes = notes
      this.sortNotes()
      this.getUsersHard()
    })
  }

  getUsersHard(){
    axios.get( process.env.REACT_APP_API_URL + `/api/users`)
      .then(res => {
        this.users = res.data
        this.renderList()
      })
  }

  setCallback(cb){
    this.renderList = cb
  }

  // truly beutiful and bugless function
  sortNotes() {
    

    let nulls = []
    let afterMap = {}
    for (let note of this.notes) {
      if(note.after) {
        afterMap[note.after.id] = note
      }else {
        nulls.push(note)
      }
    }
    // now if we build stack for each item in nulls we should have included every item
    let stacks = {}
    let lonelyNulls = []
    for(let note of nulls) {
      if (afterMap[note.id]) {
        // this item is after null
        stacks[note.id] = [note]
        var follower = afterMap[note.id]
        
        while(follower){
          stacks[note.id].push(follower)
          if(afterMap[follower.id]){    
            follower = afterMap[follower.id]
          } else {
            follower = null
          }
        }
      } else {
        // null has no folloewers
        lonelyNulls.push(note)
      }
    }
    let sortedArray = lonelyNulls
    for (let i in stacks) sortedArray = sortedArray.concat(stacks[i])
    this.sortedNotes = sortedArray
  }
  
  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    // return arr; // for testing
  };

  handleDrag(result) {
    if (result.source && result.destination) {
      this.array_move(this.sortedNotes, result.source.index, result.destination.index)
      let note_order = []
      for(const note of this.sortedNotes){
        note_order.push(note.id)
      }
      axios.post( process.env.REACT_APP_API_URL + `/api/notes/order`, {order: note_order})
      .then(res => {
        this.getNotesHard()
      })
    }
  }

  setActive(id) {
    this.active = id
  }

  getActive() {
    for(const note of this.notes){
      if (note.id === this.active) return note
    }
    return {title: "Placeholder", text: "Click on a note to read it. Or click plus at top left to add new."}
  }

  getNotes() {
    return this.sortedNotes
  }

  deleteNote(id){
    axios.delete( process.env.REACT_APP_API_URL + `/api/notes/` + id)
      .then(res => {
        this.getNotesHard()
      })
  }

  editNote(note){
    if(note.assignee === "") note.assignee = null
    axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + note.id, {title: note.title, text: note.text, assignedTo:note.assignee})
      .then(res => {
        this.getNotesHard()
      })
  }

  addNote(note){
    let after = null
    if(this.sortedNotes[this.sortedNotes.length-1]) after = this.sortedNotes[this.sortedNotes.length-1].id
    if(note.assignee === "") note.assignee = null
    axios.put( process.env.REACT_APP_API_URL + `/api/notes`, {title: note.title, text: note.text, after: after, assignedTo:note.assignee })
      .then(res => {
        this.getNotesHard()
      })
  }

  addUser(name){
    axios.put( process.env.REACT_APP_API_URL + `/api/users`, { name: name })
      .then(res => {
        this.getNotesHard()
      })
  }

  deleteUser(id){
    console.log(id)
    axios.delete( process.env.REACT_APP_API_URL + `/api/users/` + id)
      .then(res => {
        this.getNotesHard()
      })
  }

  find(text) {
    text = text.split(' ');
    return this.notes.filter(function(item) {

      return text.every(function(el) {

        if(item.assignedTo) return (item.title.toUpperCase().indexOf(el.toUpperCase()) > -1 || item.text.toUpperCase().indexOf(el.toUpperCase()) > -1 || item.assignedTo.name.toUpperCase().indexOf(el.toUpperCase()) > -1);
        else return (item.title.toUpperCase().indexOf(el.toUpperCase()) > -1 || item.text.toUpperCase().indexOf(el.toUpperCase()) > -1);

      });

    });

  }
  

  getUsers(){
    return this.users
  }

  callCallback(){
    this.renderList()
  }
  
}

export default ApiHandler;