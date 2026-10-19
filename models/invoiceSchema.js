import * as yup from 'yup';

export const invoiceSchema = yup.object({
  companyName: yup.string().min(3, 'Име на фирма трябва да бъде поне 3 символа'),//.required('Моля, въведете име на фирма.'),
  vatNumber: yup.string().min(9, 'Булстат трябва да бъде поне 9 символа'),//.required('Моля, въведете Булстат.'),
  phone: yup.string().min(10, 'Телефонният номер трябва да бъде поне 10 символа'),//.required('Моля, въведете телефонен номер.'),
  email: yup.string().email('Моля, въведете валиден имейл адрес.'),//.required('Моля, въведете имейл адрес.'),
  address: yup.string().min(5, 'Адресът трябва да бъде поне 5 символа'),//.required('Моля, въведете адрес.'),
});