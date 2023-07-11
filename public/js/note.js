
// On name input or text textarea change, fetch to update note in db
function onTextChange(event, id) {
  update(id);
}

// Update note with given id in db
async function update(id) {
  var name = document.getElementById("noteName").value;
  var text = document.getElementById("noteText").value;
  const response = await fetch("/note/" + id, {
    method: "post",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name: name, text: text})
  });
}
