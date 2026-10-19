import { useContext } from 'react';
import { Image, StyleSheet, Text, View, Platform, TextInput, FlatList } from 'react-native';
import { InvoiceContext } from '../contexts/invoiceContext';

const isPad = Platform.isPad;

const Item = ({ item }) => {
  return (
    <View>
      <Image
        source={{ uri: item?.uri }}
        contentFit='contain'
        style={styles.image}
      />
    </View>
  );
}

const InvoiceDetails = ({ invoiceData, index }) => {
  return (
    <View key={index} style={styles.fieldset}>
      <TextInput
        style={styles.textInput}
        disabled
        placeholder='Име на фирма'
        value={invoiceData?.companyName}
      />
      <TextInput
        disabled
        style={styles.textInput}
        placeholder='Булстат'
        value={invoiceData?.vatNumber}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Телефон'
        value={invoiceData?.phone}
      />
      <TextInput
        disabled
        style={styles.textInput}
        placeholder='email'
        value={invoiceData?.email}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Адрес'
        value={invoiceData?.address}
      />
      {invoiceData?.items?.map((item, index) => {
        return (
          <View key={index}>
            <Item item={item} />
          </View>
        );
      })}
    </View>
  )
}

const EmptyData = () => (<View style={styles.container}>
  <Text style={styles.title}>Няма запазени фактури</Text></View>)

const Separator = () => <View style={styles.separator} />

const LoadInvoice = () => {
  const { invoices } = useContext(InvoiceContext)

  console.log('From Load Invoice Data:');
  console.log('Invoice Data:', invoices);
  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        style={{ flex: 1 }}
        ListEmptyComponent={() => <EmptyData />}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item, index }) => <InvoiceDetails invoiceData={item} index={index} />}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
  fieldset: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4d719e',
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: '#106e8e',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 40,
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
  image: { width: 450, aspectRatio: 1 },
  separator: { width: '100%', height: 2, backgroundColor: '#375f8b' }
});

export default LoadInvoice;
