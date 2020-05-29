import axios from 'axios';

/**
 * Class that handles all api calls with axios
 */
class ApiHandler {
  notes = []
  users = []
  sortedNotes = []
  active = null


  constructor(renderList) {
    this.renderList = () => { }
    this.getNotesHard()
  }

  /**
   * Gets notes from rest api
   */
  getNotesHard() {
    axios.get(process.env.REACT_APP_API_URL + `/api/notes`)
      .then(res => {
        const notes = res.data
        this.notes = notes
        this.sortNotes()
        this.getUsersHard()
      })
  }

  /**
   * Gets users from rest api
   */
  getUsersHard() {
    axios.get(process.env.REACT_APP_API_URL + `/api/users`)
      .then(res => {
        this.users = res.data
        this.renderList()
      })
  }

  /**
   * Defines renders callback function to be used when data is loaded. 
   * This could have been defined in constructor if handler would have only been defined inside app component
   * However it was not and i decided not to change it, for it is not broken
   * @param {callback} cb callback of the render function
   */
  setCallback(cb) {
    this.renderList = cb
  }

  /**
   * Sorts notes according to after value. 
   * Id did not calulate the O but it should be acceptable
   */
  sortNotes() {
    let nulls = []
    let afterMap = {}
    for (let note of this.notes) {
      if (note.after) {
        afterMap[note.after.id] = note
      } else {
        nulls.push(note)
      }
    }
    // now if we build stack for each item in nulls we should have included every item
    let stacks = {}
    let lonelyNulls = []
    for (let note of nulls) {
      if (afterMap[note.id]) {
        // this item is after null
        stacks[note.id] = [note]
        var follower = afterMap[note.id]

        while (follower) {
          stacks[note.id].push(follower)
          if (afterMap[follower.id]) {
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

  /**
   * Stolen function to move item inside an array
   * 
   * @param {array} arr  array of items
   * @param {number} old_index index of movable items old spot
   * @param {number} new_index index of mobable items new spot
   */
  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  /**
   * Sorts items in array and posts new order to api
   * 
   * @param {object} result drag event with source and destination
   */
  handleDrag(result) {
    if (result.source && result.destination) {
      this.array_move(this.sortedNotes, result.source.index, result.destination.index)
      let note_order = []
      for (const note of this.sortedNotes) {
        note_order.push(note.id)
      }
      axios.post(process.env.REACT_APP_API_URL + `/api/notes/order`, { order: note_order })
        .then(res => {
          this.getNotesHard()
        })
    }
  }

  /**
   * Sets id of new active note
   * 
   * @param {number | null} id id of new active note
   */
  setActive(id) {
    this.active = id
  }

  /**
   * Gets id of currently active note or placeholder
   * @returns {object} note object
   */
  getActive() {
    for (const note of this.notes) {
      if (note.id === this.active) return note
    }
    return { title: "Placeholder", text: "Click on a note to read it. Or click plus at top left to add new." }
  }

  /**
   * Returns all notes that have been sorted
   * @return {array} sorted array of notes
   */
  getNotes() {
    return this.sortedNotes
  }

  /**
   * deletes note with given id
   * @param {number} id id of note to be deleted
   */
  deleteNote(id) {
    axios.delete(process.env.REACT_APP_API_URL + `/api/notes/` + id)
      .then(res => {
        this.getNotesHard()
      })
  }

  /**
   * Updates edited note to api
   * 
   * @param {object} note  note object with id title text and assignee
   */
  editNote(note) {
    if (note.assignee === "") note.assignee = null
    axios.post(process.env.REACT_APP_API_URL + `/api/notes/` + note.id, { title: note.title, text: note.text, assignedTo: note.assignee })
      .then(res => {
        this.getNotesHard()
      })
  }

  /**
   * Adds new note
   * 
   * @param {object} note note object with title text and assignee
   */
  addNote(note) {
    let after = null
    if (this.sortedNotes[this.sortedNotes.length - 1]) after = this.sortedNotes[this.sortedNotes.length - 1].id
    if (note.assignee === "") note.assignee = null
    axios.put(process.env.REACT_APP_API_URL + `/api/notes`, { title: note.title, text: note.text, after: after, assignedTo: note.assignee })
      .then(res => {
        this.getNotesHard()
      })
  }
  /**
   * Adds new User
   * 
   * @param {string} name name of the new user
   */
  addUser(name) {
    axios.put(process.env.REACT_APP_API_URL + `/api/users`, { name: name })
      .then(res => {
        this.getNotesHard()
      })
  }

  /**
   * deletes User
   * 
   * @param {number} id id of user to be deleted
   */
  deleteUser(id) {
    console.log(id)
    axios.delete(process.env.REACT_APP_API_URL + `/api/users/` + id)
      .then(res => {
        this.getNotesHard()
      })
  }

  /**
   * Search  titles assignees and texts for occurrences of searchword
   * 
   * @param {string} text searchword
   * @returns {array} array of notes
   */
  find(text) {
    text = text.split(' ');
    return this.notes.filter(function (item) {

      return text.every(function (el) {
        if (item.assignedTo) return (item.title.toUpperCase().indexOf(el.toUpperCase()) > -1 || item.text.toUpperCase().indexOf(el.toUpperCase()) > -1 || item.assignedTo.name.toUpperCase().indexOf(el.toUpperCase()) > -1);
        else return (item.title.toUpperCase().indexOf(el.toUpperCase()) > -1 || item.text.toUpperCase().indexOf(el.toUpperCase()) > -1);
      });

    });
  }

  /**
   * Gets aviable users
   * @returns array of users
   */
  getUsers() {
    return this.users
  }

  /**
   * Called in App.js to fire re.render outside component
   */
  callCallback() {
    this.renderList()
  }
}

export default ApiHandler;