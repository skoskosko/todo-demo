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
    this.sortedNotes = this.notes;
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
    console.log(this)
    console.log(this.sortedNotes)
    // array_move(items, result.source.index, result.destination.index )
    if (result.source && result.destination) {
      // Update note
      if(result.destination.index === 0) {
        // Set result.source.index after as null and set current 0 to have it after as result.source.index
        axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[result.source.index].id, {
          after: null
        })
          .then(res => {
            axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[0].id, {
              after: this.sortedNotes[result.source.index].id
            })
              .then(res => {
                this.sortNotes()
            })
        })
      }else {
        // set result.source.index after as result.destination.index-1
        axios.post( process.env.REACT_APP_API_URL + `/api/notes/` + this.sortedNotes[result.source.index].id, {
          after: this.sortedNotes[result.destination.index-1].id
        })
          .then(res => {
            this.sortNotes()
        })
      }
      // this.sortNotes()
    }
  }


  getNotes() {
    return this.sortedNotes
  }

  
}

export default NoteHandler;