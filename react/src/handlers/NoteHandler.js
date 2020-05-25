import axios from 'axios';

class NoteHandler{
  notes = []
  sortedNotes = []

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
    this.renderList()
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


  getNotes() {
    return this.sortedNotes
  }

  
}

export default NoteHandler;