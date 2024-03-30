import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../assets/colors/colors';

interface LoaderProps {
    backgroundColor?: string; // Optional background color
}

const Loader: React.FC<LoaderProps> = ({ backgroundColor }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loader;
