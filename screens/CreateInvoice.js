import { useContext, useState } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { invoiceSchema } from '../models/invoiceSchema';
import { InvoiceContext } from '../contexts/invoiceContext';

const isPad = Platform.isPad;

const CreateInvoice = () => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);
  const { setInvoiceData } = useContext(InvoiceContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
  });

  const onSubmit = (data) => {
    if (errors && Object.keys(errors).length > 0) {
      console.log('Invoice Data:', errors);
      setIsReady(false);
      return
    }
    console.log('Invoice Data:', data);

    setIsReady(true);
    setInvoiceData({
      companyName: data.companyName,
      vatNumber: data.vatNumber,
      phone: data.phone,
      email: data.email,
      address: data.address,
      items: [],
    });
    navigation.navigate('Camera');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text style={styles.title}>Добре дошли!</Text>
      <Text style={styles.title}>Данни за фактура</Text>
      <View style={styles.fieldset}>
        <Controller
          control={control}
          name='companyName'
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInput}
              onChangeText={onChange}
              placeholder='Име на фирма'
              value={value}
            />
          )} />
        {errors.companyName && <Text style={{ color: 'red' }}>{errors.companyName.message}</Text>}
        <Controller
          control={control}
          name='vatNumber'
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInput}
              onChangeText={onChange}
              placeholder='Булстат'
              value={value}
            />
          )} />
        {errors.vatNumber && <Text style={{ color: 'red' }}>{errors.vatNumber.message}</Text>}
        <Controller
          control={control}
          name='phone'
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInput}
              onChangeText={onChange}
              placeholder='Телефон'
              value={value}
            />
          )} />
        {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInput}
              onChangeText={onChange}
              placeholder='email'
              value={value}
            />
          )} />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
        <Controller
          control={control}
          name='address'
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInput}
              onChangeText={onChange}
              placeholder='Адрес'
              value={value}
            />
          )} />
        {errors.address && <Text style={{ color: 'red' }}>{errors.address.message}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={false}>
        <Text style={styles.buttonText}>Направи снимка</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    flex: 0.2,
    width: '50%',
    height: isPad ? 80 : 50,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#095d6e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: isPad ? 36 : 24,
    fontWeight: 'bold',
    color: '#000913',
  },
  text: {
    fontSize: isPad ? 36 : 24,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    width: '100%',
    height: isPad ? 80 : 50,
    borderWidth: 1,
    fontSize: isPad ? 24 : 16,
    borderColor: '#095d6e',
    marginBottom: isPad ? 16 : 10,
    paddingHorizontal: 10,
    color: '#000913',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  fieldset: {
    width: '80%',
    height: isPad ? 500 : 400,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4d719e',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: isPad ? 38 : 20,
    color: '#106e8e',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default CreateInvoice;
