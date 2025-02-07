function Message () {
    const name = "Maxim"
    if (name){
        return <h1>Hello {name}</h1>
    }
    else{
        return <h1>No name</h1>
    }

}

export default Message