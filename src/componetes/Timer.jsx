import React from 'react';

class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ahora: new Date()
        }
    }
    componentDidMount(){
        console.log("timer esta montado")

        setInterval(() => {
            console.log("nuevo segundo")
            this.setState(
                {
                    ahora: new Date()
                }
            )
        }, 1000);
    }
    render(){

      //const ahora = new Date()

      return(
          <h1>{this.state.ahora.getHours()} : {this.state.ahora.getMinutes()}</h1>
      )  
    }
}

export default Timer