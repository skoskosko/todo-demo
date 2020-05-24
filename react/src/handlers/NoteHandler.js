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
  
  // array_move(arr, old_index, new_index) {
  //   if (new_index >= arr.length) {
  //       var k = new_index - arr.length + 1;
  //       while (k--) {
  //           arr.push(undefined);
  //       }
  //   }
  //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  //   // return arr; // for testing
  // };

  handleDrag(result) {
    console.log(result)
    // array_move(items, result.source.index, result.destination.index )
    if (result.source && result.destination) {
      // Update note
      if(result.destination.index === 0 && result.source.index !== 0 ) {
        console.log("1", this.sortedNotes[result.source.index].id, " to null and " , this.sortedNotes[0].id , " after it")
        axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[result.source.index].id, { after: null 
        }).then(res => { 
            axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[0].id, {after: this.sortedNotes[result.source.index].id
            }).then(res => { this.getNotesHard()})
        })
      }else if(result.destination.index === 0 && result.source.index === 0 ) {
        console.log("2", this.sortedNotes[result.source.index].id, " to null and " , this.sortedNotes[1].id , " after it")
        axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[result.source.index].id, { after: null 
        }).then(res => { 
            axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[1].id, {after: this.sortedNotes[result.source.index].id
            }).then(res => { this.getNotesHard()})
        })
      }else if (result.destination.index <= result.source.index) {
        console.log("3", this.sortedNotes[result.source.index].id, " after ", this.sortedNotes[result.destination.index-1].id)
        axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[result.source.index].id, { after: this.sortedNotes[result.destination.index-1].id 
        }).then(res => { this.getNotesHard()
        })
      }else {
        console.log("4", this.sortedNotes[result.source.index].id, " after ", this.sortedNotes[result.destination.index].id)
        axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[result.source.index].id, { after: this.sortedNotes[result.destination.index].id 
        }).then(res => { this.getNotesHard()
        })
      }
      

      // if(result.destination.index === 0) {
        // Set result.source.index after as null and set current 0 to have it after as result.source.index

      // }else {
      //   // set result.source.index after as result.destination.index-1
      //   if(this.sortedNotes[result.destination.index-1].id !== this.sortedNotes[result.source.index].id){
      //     axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[result.source.index].id, {
      //       after: this.sortedNotes[result.destination.index-1].id
      //     })
      //       .then(res => {
      //         console.log("updated", res)
      //         this.getNotesHard()
      //     })
      //   }
        
      // }
      // this.sortNotes()
    }
  }


  getNotes() {
    console.log(this.sortedNotes)
    return this.sortedNotes
  }

  
}

export default NoteHandler;