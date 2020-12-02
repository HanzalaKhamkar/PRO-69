import * as React from 'react';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class ScanScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      hasCameraPermissions : null,
      scanned : false,
      scannedData : '',
      buttonState : 'normal'
    } 
  }

  getCameraPermissions = async () => {

    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status == 'granted',
      buttonState: 'clicked',
      scanned: false
    })
  } 

  handleBarCodeScanned  = async ({type , data}) => {
    this.setState ({
      scanned : true,
      scannedData : data,
      buttonState : 'normal'
    })
  
  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState

    if( buttonState == 'clicked' && hasCameraPermissions ) {
      return (
        <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned } />
      )
    }
    else if(buttonState == 'normal' ) {
      return(

        <View>
          
          <Image
            style={styles.image}
          source = {{
            uri : 'barcode.jpg',
          }}
          
          />

          <Text>
            {
              hasCameraPermissions == true ? this.state.scannedData : "Permission for Camera Required"
            }
          </Text>

          <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermissions}>
            <Text>QR Code Scanner</Text>
          </TouchableOpacity>

        </View>
      )
    }
  }
}

const styles = StyleSheet.create ({
  scanButton : {
    backgroundColor : 'purple',
    width : 120,
    height : 30,
    borderRadius : 30,
    alignSelf : 'center',
    textAlign : 'center'
  },

  image: { width: 300, height: 300, alignSelf: 'center' }
})
