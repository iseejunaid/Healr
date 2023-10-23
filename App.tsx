import * as React from "react";
import {Text, StyleSheet, Image, View} from "react-native";

const Frame = () => {
  	
  	return (
    		<View style={styles.view}>
      			<Text style={[styles.skip, styles.skipTypo]}>Skip</Text>
      			<View style={styles.ellipseIconContainer}>
              <Image style={styles.ellipseIcon} source={require('./assets/images/ellipseBlack.png')} />
              <Image style={styles.ellipseIcon} source={require('./assets/images/ellipseWhite.png')} />
              <Image style={styles.ellipseIcon} source={require('./assets/images/ellipseWhite.png')} />
              <Image style={styles.ellipseIcon} source={require('./assets/images/ellipseWhite.png')} />
             </View>
            <Text style={[styles.healrIsA1, styles.skipTypo]}>Healr is a powerful messaging app designed exclusively for doctors. It enables seamless communication and collaboration among healthcare professionals, transforming the way you provide care to your patients.</Text>
      			<Image style={styles.doctorscuateIcon} resizeMode="cover" source={require('./assets/images/ob1.png')} />
      			<Text style={[styles.connectCollaborateAnd1, styles.welcomeToHealr1Position]}>Connect, Collaborate, and Care</Text>
      			<Text style={[styles.welcomeToHealr1, styles.welcomeToHealr1Position]}>Welcome to Healr</Text>
    		</View>);
};

const styles = StyleSheet.create({
  	skipTypo: {
    		textAlign: "center",
    		color: "#222831",
    		fontSize: 12,
    		left: "50%",
    		fontFamily: "Poppins-Regular",
    		position: "absolute",
  	},
  	welcomeToHealr1Position: {
    		textAlign: "left",
    		color: "#222831",
    		left: "50%",
    		position: "absolute",
  	},
  	skip: {
    		marginLeft: '-3.5%',
    		top: '92.4%',
    		width: '13.5%',
  	},
  	healrIsA1: {
    		marginLeft: '-37%',
    		top: '70.3%',
        height: '15%',
    		width: '90%',
  	},
  	doctorscuateIcon: {
    		height: "62.71%",
    		top: "10.5%",
    		right: "0%",
    		bottom: "26.79%",
    		left: "0%",
    		maxWidth: "100%",
    		maxHeight: "100%",
    		position: "absolute",
    		overflow: "hidden",
    		width: "100%",
  	},
  	connectCollaborateAnd1: {
    		marginLeft: '-32.3%',
        width: '94%',
    		top: '14.4%',
    		fontSize: 16,
    		fontFamily: "Poppins-Regular",
    		textAlign: "left",
  	},
  	welcomeToHealr1: {
    		marginLeft: '-36.8%',
        width:'103%',
    		top: '8.2%',
    		fontSize: 32,
    		fontFamily: "Poppins-SemiBold",
  	},
  	view: {
    		backgroundColor: "#90d1d4",
    		flex: 1,
    		overflow: "hidden",
    		width: "100%",
  	},
    ellipseIconContainer: {
      top: '175.7%',
      width: '100%',
      height: "5%",
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    ellipseIcon:{
      height:'10%',
      marginLeft:'1.2%',
      width:'3%',
      borderRadius:15,
    }
});

export default Frame;