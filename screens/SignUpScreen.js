import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Component
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather, FontAwesome} from '@expo/vector-icons';
import { Button, useTheme } from 'react-native-paper';
import validator from 'validator';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import { Auth } from 'aws-amplify';

const SignUpScreen = ({navigation}) => {

    const { colors } = useTheme();

    const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        check_textInputChange: false,
        check_EmailInput: true,
        check_PNumberInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isVerifiedMatch: true
    });

    const textInputChange = (val) => {
        if( val.length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const handleEmailChange = (val) => {
        if (validator.isEmail(val)) {
            setData({
                ...data,
                email: val,
                username: val,
                check_EmailInput: true
            });
        } else {
            setData({
                ...data,
                email: val,
                username: val,
                check_EmailInput: false
            });
        }
    }

    const handlePNumberChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                phone_number: '+1' + val,
                check_PNumberInputChange: true
            });
        } else {
            setData({
                ...data,
                phone_number: '+1' + val,
                check_PNumberInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
        /*if( val == data.password )
        {
            setData({
                ...data,
                confirm_password: val,
                isVerifiedMatch: true
            });
        }
        else
        {
            setData({
                ...data,
                confirm_password: val,
                isVerifiedMatch: false
            });
        }*/
    }
    
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }


    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
        
    }
    function handleVerifyPW(){
        console.log(data);
        if( data.password == data.confirm_password )
        {
            setData({
                ...data,
                isVerifiedMatch: true
            });
        }
        else
        {
            setData({
                ...data,
                isVerifiedMatch: false
            });
        }

    }

    async function signUp(username, password, email, phone_number) {
        console.log(data.phone_number);
        if ( data.username.length !== 0 && data.email.length !== 0  && data.password.length !== 0  && data.phone_number.length !== 2  ){
            if (data.isValidPassword){
                if (data.isVerifiedMatch){
                    try {
                        await Auth.signUp({ username, password, attributes: { email, phone_number } });
                        console.log('Sign-up Confirmed');
                        navigation.navigate('ConfirmSignUpScreen');
                    } catch (error) {
                        console.log('Error signing up', error.message);
                        Alert.alert('Error signing up', error.message, [
                            {text: 'Okay'}
                        ]);
                    }

                }else{
                    console.log('Password Mismatch', 'Your confirm password does not match');
                    Alert.alert('Password Mismatch', 'Your confirm password does not match', [
                        {text: 'Okay'}
                    ]);
                    return;
                }
            }else{
                console.log('Password Invalid', 'Password must be 8 characters long');
                    Alert.alert('Password Invalid', 'Password must be 8 characters long', [
                        {text: 'Okay'}
                    ]);
                    return;
            }
        } else {
            console.log('Wrong Input!', 'Please fill all fields');
                Alert.alert('Wrong Input!', 'Please fill all fields', [
                    {text: 'Okay'}
                ]);
                return;
        }       
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <ScrollView>
            {/*<Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
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
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }*/}
            <Text style={[styles.text_footer, {
                //marginTop: 10
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCorrect= {false}
                    autoCompleteType = "off"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onChangeText={(val) => handleEmailChange(val)}
                />
                {data.check_EmailInput ? 
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
            { data.check_EmailInput ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Email is invalid</Text>
                </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {handlePasswordChange(val)}}
                    onEndEditing = {handleVerifyPW}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                    
                </TouchableOpacity>
            </View>
            <BarPasswordStrengthDisplay
                password={data.password} minLength = {8}
            />
            { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {handleConfirmPasswordChange(val)}}
                    onEndEditing = {handleVerifyPW}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isVerifiedMatch ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password Mismatch.</Text>
                </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Phone Number</Text>
            <View style={styles.action}>
                <Feather 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Phone Number"
                    keyboardType = 'numeric'
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePNumberChange(val)}
                />
            </View>

            <TouchableOpacity
                    onPress={() => navigation.navigate('ConfirmSignUpScreen')}
                >
                    <Text style={{color: '#42a4e3', marginTop:15}}>Have a code?</Text>
                </TouchableOpacity>

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {signUp(data.username, data.password, data.email, data.phone_number)}}
                >
                
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
      </TouchableWithoutFeedback>
    );
};

export default SignUpScreen;

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
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    }
  });
