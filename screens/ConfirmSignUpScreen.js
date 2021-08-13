import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { Button, useTheme } from 'react-native-paper';
import { FontAwesome, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import validator from 'validator';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import Clipboard from 'expo-clipboard';
import { Auth } from 'aws-amplify';

const ConfirmSignUpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        email: '',
        authCode: '',
        check_EmailInput: false,
        isValidEmail: true,
        check_CCodeChange: false,
        pastedCode: ''
    });

    const { colors } = useTheme();

    const handleEmailInput = (val) => {
        if (validator.isEmail(val) && val.length !== 0) {
            setData({
                ...data,
                email: val,
                username: val,
                isValidEmail: true,
                check_EmailInput: true
            });
        } else {
            setData({
                ...data,
                email: val,
                username: val,
                isValidEmail: false,
                check_EmailInput: false,
            });
        }
    }

    const handleCCodeChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                authCode: val,
                check_CCodeChange: true
            });
        } else {
            setData({
                ...data,
                authCode: val,
                check_CCodeChange: false
            });
        }
    }

    const fetchCopiedText = async () => {
        const val = await Clipboard.getStringAsync();
        setData({
            ...data,
            authCode: val,
            pastedCode: val
        })
      };

    async function confirmSignUp(username, authCode) {
            if(data.check_EmailInput){
                try {
                    await Auth.confirmSignUp(username, authCode);
                    console.log('Code confirmed');
                    Alert.alert('Code confirmed', 'Code was verified', [
                        {text: 'Okay'}
                    ]);
                    navigation.navigate('SignInScreen');
                } catch (error) {
                    console.log(
                        'Verification Failed',
                        error.message
                    );
                    Alert.alert('Verification Failed', error.message, [
                        {text: 'Okay'}
                    ]);
                }
            }else{
                Alert.alert('Wrong Input', 'Email field can not be left empty', [
                    {text: 'Okay'}
                ]);
            }
        }

          async function resendConfirmationCode(username) {
            if(data.check_EmailInput){
                try {
                    await Auth.resendSignUp(username);
                    console.log('Code resent successfully');
                    Alert.alert('Code resent successfully', 'Your new code was succesfully sent', [
                        {text: 'Okay'}
                    ]);
                } catch (err) {
                    console.log('Error resending code: ', err.message);
                    Alert.alert('Error resending code', err.message, [
                        {text: 'Okay'}
                    ]);
                }
            }else{
                Alert.alert('Wrong Input', 'Email field can not be left empty', [
                    {text: 'Okay'}
                ]);
            }
        }

          return (  
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.container}>
                  <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Confirm your Email!</Text>
                </View>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="envelope-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput 
                            placeholder="Email"
                            placeholderTextColor="#666666"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleEmailInput(val)}
                        />
                        {data.isValidEmail ? 
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather 
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                    </View>
                    {data.isValidEmail ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Email is invalid</Text>
                    </Animatable.View>
                    }
                    
        
                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Confirmation Code</Text>
                    <View style={styles.action}>
                        <MaterialCommunityIcons 
                            name="numeric"
                            color={colors.text}
                            size={22}
                        />
                        <TextInput 
                            placeholder="Enter confirmation code"
                            placeholderTextColor="#666666"
                            keyboardType="numeric"
                            value={data.authCode}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleCCodeChange(val)}
                        />
                        <TouchableOpacity
                    onPress={() => fetchCopiedText()}
                >
                    <MaterialCommunityIcons  
                        name="clipboard-text-multiple-outline"
                        color="grey"
                        size={20}
                    />
                    </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity onPress={() => {resendConfirmationCode(data.username)}}>
                        <Text style={{color: '#42a4e3', marginTop:15}}>Resend Code</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {confirmSignUp(data.username, data.authCode)}}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
        
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: '#42a4e3',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
              </View>
            </TouchableWithoutFeedback>
            );
        };

export default ConfirmSignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#42a4e3'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        backgroundColor: '#42a4e3',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 4,
        fontSize: 18
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
