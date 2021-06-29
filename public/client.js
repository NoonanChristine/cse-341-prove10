const socket = io();

socket.on('update-list', () => {
    populateList()
})

const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('fetchAll')
        .then(res => res.json())
        .then(data => {
            //clear the list
            while (nameList.firstChild) nameList.firstChild.remove()

            //repopulate the list
            for (const avenger of data.avengers) {
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(avenger.name))
                nameList.appendChild(li)
            }
        })
        .catch(err => {
            console.log(error(err))
        })
}

const submitName = () => {
    //get the value of the new name
    const newName = document.getElementById('newName').value

    fetch('insertName', {
            method: 'POST',
            headers: {
                //content-type since this will be JSON
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newName
            })
        })
        .then(res => {
            //clear the input
            document.getElementById('newName').value = ''
            //repopulate list with new name added
            populateList()
            socket.emit("new-name", "Hello!");
        })
        .catch(err => {
            //clear the input
            document.getElementById('newName').value = ''
            console.error(err)
        })
}

//initialize the list
populateList()