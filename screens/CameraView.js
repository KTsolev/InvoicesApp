import { useRef, useContext, useEffect } from 'react';
import { Alert, Pressable, Button, StyleSheet, Text, View, Platform } from 'react-native';
import {
  Camera,
  useCameraPermission,
  usePhotoOutput,
  useCameraDevice
} from "react-native-vision-camera";
import { useNavigation } from '@react-navigation/native';
import { InvoiceContext } from '../contexts/invoiceContext';

const isPad = Platform.isPad;

const CameraViewScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const photoOutput = usePhotoOutput()
  const device = useCameraDevice('back');
  const { setInvoiceData, invoiceData, setInvoices, invoices } = useContext(InvoiceContext);

  console.log('Invoices: ', invoices)

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive
          photo
          outputs={[photoOutput]}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={takePicture} />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.separator} />
          <Button
            color={'#01aa69'}
            onPress={() => {
              setInvoices([...invoices, invoiceData])
              Alert.alert('Фактурата е запазена успешно')
            }}
            title='Запази фактурата' />
          <View style={styles.separator} />
          <Button
            onPress={() => navigation.navigate('Create Invoice')}
            title='Направи нова' />
        </View>
      </View>
    )
  }

  const takePicture = async () => {
    if (cameraRef.current == null) return;
    try {
      const { filePath } = await photoOutput.capturePhotoToFile({}, {})
      if (filePath) {
        setInvoiceData(() => ({
          ...invoiceData,
          items: invoiceData?.items ? [...invoiceData?.items, { uri: `file:///${filePath}` }] : [{ uri: `file:///${filePath}` }]
        }));
        console.log('Invoice Data after taking picture:', invoiceData);
      }
      console.log('Photo captured successfully:', filePath);
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  useEffect(() => {
    console.log(`Permission ${hasPermission}`)

    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) return <View style={styles.container}>
    <Text>No camera permission</Text>
    <Button title='Give Permission' onPress={requestPermission} />
  </View>;
  if (device == null) return <View style={styles.container}><Text>No camera device found</Text></View>;

  if (hasPermission) {
    return (
      <View style={styles.container}>
        {renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%',
    height: '100%'

  },
  message: {
    textAlign: 'center',
    fontSize: isPad ? 20 : 18,
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  bottomContainer: {
    marginTop: 40,
    justifyContent: 'space-evenly'
  },
  separator: {
    width: '100%',
    height: 10,
    backgroundColor: '#ffffff'
  },
  button: {
    backgroundColor: '#34ab82',
    padding: 45,
    borderRadius: 24,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CameraViewScreen;