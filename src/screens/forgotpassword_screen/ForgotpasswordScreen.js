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
import Message from '../../icons/login/Message.svg';

import styles from './ForgotpasswordScreenStyles';
import Indicator from '../../component/ActivityIndicator';
import {forgotPasswordUser} from '../../redux/actions/AuthActions';
import {RoundedButton} from '../../buttons/RoundedButton';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGES} from '../../images/Images';
import {Formik} from 'formik';
import * as yup from 'yup';

const forgotValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email adress is required'),
});

const ForgotPasswordScreen = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector(state => state.AuthReducer.loginProcessing);

  const dispatch = useDispatch();

  if (loading) {
    return <Indicator />;
  }

  return (
    <Formik
      initialValues={{email: ''}}
      validateOnMount={true}
      onSubmit={values =>
        dispatch(
          forgotPasswordUser({
            email: values.email,
          }),
        )
      }
      validationSchema={forgotValidationSchema}>
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

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Pressable onPress={() => navigation.navigate('SignInScreen')}>
              <View style={styles.hideLine} />
            </Pressable>
            <View style={styles.forgotHeader}>
              <Text style={styles.text_footer}>Forgot Password?</Text>
            </View>

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

              {/* <View style={styles.password}>
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
              )} */}
            </View>

            <View style={styles.button}>
              <RoundedButton
                title="Send Email"
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

export default ForgotPasswordScreen;
