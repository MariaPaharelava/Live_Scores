import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CheckBox from '@react-native-community/checkbox';
import Message from '../../icons/login/Message.svg';
import Password from '../../icons/login/Password.svg';
import Hide from '../../icons/login/Hide.svg';
import Show from '../../icons/login/Show.svg';
import styles from './SignInScreenStyles';
import Indicator from '../../component/ActivityIndicator';
import {loginUser} from '../../redux/actions/AuthActions';
import {RoundedButton} from '../../buttons/RoundedButton';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGES} from '../../images/Images';
import {Formik} from 'formik';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
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
});

const SignInScreen = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector(state => state.AuthReducer.loginProcessing);

  const dispatch = useDispatch();

  if (loading) {
    return <Indicator />;
  }

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      onSubmit={values =>
        dispatch(
          loginUser({
            email: values.email,
            password: values.password,
          }),
        )
      }
      validationSchema={loginValidationSchema}>
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
          <Image
            style={styles.onboardingImage}
            source={IMAGES.ONBOARDING_IMAGE}
          />

          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: '#222232',
              },
            ]}>
            <Pressable onPress={() => navigation.navigate('Onboarding')}>
              <View style={styles.hideLine} />
            </Pressable>
            <Text
              style={[
                styles.text_footer,
                {
                  color: 'white',
                  paddingBottom: 20,
                },
              ]}>
              Welcome
            </Text>

            <View>
              <View style={styles.password}>
                <Message style={styles.imageStyle} />
                <TextInput
                  placeholderTextColor="#65656B"
                  placeholder="Email"
                  color="white"
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

              <View style={styles.password}>
                <Password style={styles.imageStyle} />

                <TextInput
                  placeholderTextColor="#65656B"
                  placeholder="Password"
                  style={styles.textInput}
                  color="white"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Show /> : <Hide />}
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errors}> {errors.password} </Text>
              )}
            </View>

            <View style={styles.checkbox}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.rememberText}>Remember me</Text>
              <TouchableOpacity>
                <Text style={{color: 'white'}}>Forgot password</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <RoundedButton
                title="Sign in"
                onPress={handleSubmit}
                isValid={!isValid}
              />
              <View style={styles.lastView}>
                <Text style={styles.quastion}>Don't have account?</Text>
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={() => navigation.navigate('SignUpScreen')}>
                  <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </View>
      )}
    </Formik>
  );
};

export default SignInScreen;
