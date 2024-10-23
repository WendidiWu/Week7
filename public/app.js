window.addEventListener('load',()=>{
    document.getElementById('button_emoji').addEventListener('click',()=>{
        let userEmojis = document.getElementById('input_emoji').value;
        console.log(userEmojis);

        //creating the object
        let obj = {'userInput': userEmojis};
        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route userEmojis
        fetch('/userEmojis', {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('input_emoji').value ='';
        });
    
    document.getElementById('load_emoji').addEventListener('click',()=>{
        fetch('/getEmojis')
        .then(resp=> resp.json())
        .then(data=>{
            document.getElementById('all_emoji').innerHTML ='';
            for(let i=0; i<data.data.length; i++){
                let string = data.data[i].emoji.userInput;
                let elt = document.createElement('p');
                elt.innerHTML = string;

                //Randomize the position from chatGpt
                let container = document.getElementById('all_emoji');
                let maxWidth = container.offsetWidth;
                let maxHeight = container.offsetHeight;

                let randomX = Math.random() * (maxWidth - 50);  // random left position (subtract 50 to prevent overflow)
                let randomY = Math.random() * (maxHeight - 50); // random top position (subtract 50 to prevent overflow)

                elt.style.position = 'absolute';
                elt.style.left = `${randomX}px`;
                elt.style.top = `${randomY}px`;
                document.getElementById('all_emoji').appendChild(elt);
            }
        })
    })
    })
        
})

