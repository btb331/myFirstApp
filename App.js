import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

class Greeting extends Component {

	addZeros(num){
		if(num<10){
			num = "0" + num
		}
		return num
	}

	buttonPress(){
  		if(this.running){
			this.setState({buttonName: "Start"})
			clearInterval(this.timer)
		}else{
			this.setState({buttonName: "Stop"})
			this.timer = setInterval(()=>(
			this.setState(previousState=>(
					{
						milSeconds:previousState.milSeconds+1
					}
			))), 10)
		}
		this.running = !this.running
	}

	constructor(props){
		super(props)
		this.mins = -1
		this.seconds = -1

		this.running = true
		this.state = {milSeconds: 0, buttonName: "Stop"};
			
		this.timer = setInterval(()=>(
			this.setState(previousState=>(
					{
						milSeconds:previousState.milSeconds+1
					}
			))), 10)
	}

 	render() {
  		var milSeconds = this.state.milSeconds
  		milSeconds = this.addZeros(milSeconds)
  		if(milSeconds==59){
			this.state.milSeconds = -1
		}
		if(milSeconds==0){
			this.seconds++
		}
		if(this.seconds==60){
			this.seconds = -0
		}
		if(this.seconds==0 && milSeconds==0){
			this.mins++
		}
		var sec = this.addZeros(this.seconds)
		var mins = this.addZeros(this.mins)
    	return (
    		<View>
      			<View>
        			<Text>{mins}:{sec}:{milSeconds}</Text>
      			</View>
      			<View style={styles.button}>
					<Button 
						onPress={()=>{
							this.buttonPress()
							}} title={this.state.buttonName}
					/>
				</View>
			</View>
    	);
  	}
}





export default class MainScreen extends Component{
	render(){
			var name = this.buttonName
		return(
			<View style={styles.container}>
				<View style={styles.timer}>
					<Greeting />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
      	// alignItems: 'center',
    flex: 1
  },
  button:{
  		// flexDirection: 'row',
  	// alignItems: 'center',
   justifyContent: 'space-between',
   margin: 20
  },
  timer:{
  		// flexDirection: 'row',
  	alignItems: 'center',
   justifyContent: 'center',
  }
});
