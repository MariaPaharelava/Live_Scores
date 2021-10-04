import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './SignUpScreenStyles';
import Hide from '../../icons/login/Hide.svg';
import Show from '../../icons/login/Show.svg';
import Indicator from '../../component/ActivityIndicator';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from '../../redux/actions/AuthActions';
import {Formik} from 'formik';
import * as yup from 'yup';

const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email adress is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password  is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),

  name: yup
    .string()
    .min(4, ({min}) => `Name must be at least ${min} characters`)
    .required('Name  is required'),
});
const SignUpScreen = ({navigation}) => {
  const loading = useSelector(state => state.AuthReducer.signupProcessing);
  const error = useSelector(state => state.AuthReducer.signupError);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  if (loading) {
    return <Indicator />;
  }

  return (
    <Formik
      initialValues={{email: '', password: '', confirmPassword: '', name: ''}}
      validateOnMount={true}
      onSubmit={values =>
        dispatch(
          signupUser({
            email: values.email,
            password: values.password,
            name: values.name,
          }),
        )
      }
      validationSchema={signUpValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={styles.text_footer}>Email</Text>
              <View style={styles.action}>
                <TextInput
                  placeholderTextColor="#65656B"
                  placeholder="Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errors}> {errors.email} </Text>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}>
                Password
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholderTextColor="#65656B"
                  placeholder="Your Password"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Show /> : <Hide />}
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errors}> {errors.password} </Text>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}>
                Confirm Password
              </Text>
              <View style={styles.action}>
                <TextInput
                  placehol
                  placeholderTextColor="#65656B"
                  derTextColor="#65656B"
                  placeholder="Confirm Your Password"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <Show /> : <Hide />}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errors}> {errors.confirmPassword} </Text>
              )}
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}>
                Name
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholderTextColor="#65656B"
                  placeholder="Your Name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {errors.name && touched.name && (
                <Text style={styles.errors}> {errors.name} </Text>
              )}

              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                  {' '}
                  Terms of service
                </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                  {' '}
                  Privacy policy
                </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity style={styles.signUp} onPress={handleSubmit}>
                  <View colors={['#246BFD', '#246BFD']} style={styles.signUp}>
                    <Text style={styles.textSignUp}>Sign Up</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('SignInScreen')}
                  style={styles.signIn}>
                  <Text style={styles.textSignIn}>Sign In</Text>
                </TouchableOpacity>
                {!!error && <Text>{error.message}</Text>}
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      )}
    </Formik>
  );
};

export default SignUpScreen;
