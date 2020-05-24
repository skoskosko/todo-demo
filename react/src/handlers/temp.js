  sortNotes() {
    // get notes. 
    // go trough greate map of spots in notes.
    // map by id. Map by after.

    let temp_array
    // This is n! so that is bad. 

    var idMap = {}
    var afterMap = {}
    for (var note of this.notes) {
      idMap[note.id] = note.after
      if(note.after) afterMap[note.after] = note.id
    }

    let inserted = []
    let temp_array = []
    for (let note of this.notes) {
      if(!note.after && !inserted.includes(note.id) ){
        temp_array.unshift(note); // Item has no after value. It can be placed in the beginning.
        inserted.push(note.id)
      }else if(!inserted.includes(note.id)) {
        // item is after some item.
        let temp_stack = []
        console.log("note", note)
        var cur_val = note
        console.log("cur_val",cur_val)
        while(true){
          if (!cur_val) break;
          if (inserted.includes(cur_val.id) ){
            break
          }
          temp_stack.push(cur_val)
          inserted.push(cur_val.id)
          if (cur_val.after){
            cur_val = idMap[cur_val.after.id]
          }
          else {
            cur_val = null
            break;
          }
        }
        if (cur_val){
          // insert pile after cur_val.id
          for(let i = 0; i < temp_array.length ; i++){
            if(temp_array[i].id === cur_val.id) {;
              let first = temp_array.slice(0, i)
              let second = temp_array.slice(i + 1)
              first.concat(temp_stack)
              first.concat(second)
              break;
            }
          }
        }else{
          // append after first null
          for(let i = 0; i < temp_array.length ; i++){
            let done = false;
            if(temp_array[i].id != null) {;
              let first = temp_array.slice(0, i-1)
              let second = temp_array.slice(i)
              first.concat(temp_stack)
              first.concat(second)
              done = true;
              break;
            }
            if(!done){
              temp_array.concat(temp_stack)
            }
          }
        }
      }
      
      // we need to check if item to follow is already in.
    }

    this.sortedNotes = temp_array
    this.renderList()
  }