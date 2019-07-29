//client side javascript

var updateButton = document.getElementById('update');

var trash = document.getElementsByClassName("fa-trash");
var edit = document.getElementsByClassName("fa-edit");


Array.from(edit).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const friendcode = this.parentNode.parentNode.childNodes[3].innerText
    fetch('inGameCodes', {
      method: 'put',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        "name": name,
        "friendcode": "***************"
      })
    })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data =>{
      console.log(data)
      window.location.reload(true)
      })
    })
  })

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const friendcode = this.parentNode.parentNode.childNodes[3].innerText
    fetch('deleted', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'friendcode': friendcode
      })
    }).then(data =>{
      console.log(data)
      window.location.reload()
    })
  })
})
