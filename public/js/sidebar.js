
window.onload = function () {
  loadNotes();
}

async function loadNotes() {
  const response = await fetch("/note");
  const notes = await response.json();
  var li = `
  <li class="nav-item">
    <a class="nav-link" href="/note/#ID">
      <h6><i class="bi bi-journal-text"></i> #NAME</h6>
    </a>
  </li>
  `;
  var ul = document.getElementById("sidebarNotes");
  for (i in notes)
    ul.innerHTML += li.replace("#NAME", notes[i].name).replace("#ID", notes[i]._id);
}                    
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
