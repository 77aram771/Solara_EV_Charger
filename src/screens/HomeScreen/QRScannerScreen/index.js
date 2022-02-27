import React, {useState, useEffect, useContext} from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {windowHeight} from "../../../shared/Const"
import Context from "../../../../Context"

export const QRScannerScreen = ({navigation}) => {
    const {handleHideTabBar} = useContext(Context)

    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleHideTabBar(false)
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true)
        alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{height: windowHeight, borderWidth: 1, borderColor: 'red'}}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        zIndex: 1,
    },
})
