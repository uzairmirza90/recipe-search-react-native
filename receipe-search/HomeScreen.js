import * as React from 'react';
import { Text, TextInput, Image, SafeAreaView, TouchableOpacity, View, FlatList, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';

function HomeScreen({ navigation }) {
    const [recipes, setRecipes] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [numberOfRecipes, setNumberOfRecipes] = useState('1')
    const [loading, setLoading] = useState(false);

    const apiId = '94a2c70b';
    const apiKey = `9e3e04555736959ec8b0d044f1d334bf`;
    const apiUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKey}&from=0&to=${numberOfRecipes}&calories=591-722&health=alcohol-free`;

    useEffect(() => {
        setLoading(true)
        apiCall();
    }, [])

    async function apiCall() {
        setLoading(true)
        let resp = await fetch(apiUrl);
        let respJson = await resp.json();
        setRecipes(respJson.hits)
        setLoading(false)
        
        Keyboard.dismiss();
        setSearchQuery('')
    }
    return (

        <View style={styles.container}>
            <Text style={{ fontSize: 23, fontWeight: '800', width: '90%', color: '#008080' }}>What Recipe Would You like to Search?</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TextInput
                    placeholder='Search Recipe...'
                    style={styles.inputField}
                    onChangeText={text => setSearchQuery(text)}
                >

                </TextInput>

                <TextInput

                    onChangeText={text => setNumberOfRecipes(text)}
                    style={[styles.inputField, { width: '20%', fontSize: 18, marginLeft: 15, color: '#008080', fontWeight: 'bold' }]}
                    value={numberOfRecipes}
                    keyboardType='number-pad'
                >

                </TextInput>
            </View>


            <TouchableOpacity style={styles.button} onPress={apiCall} title='submit'>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>


            <SafeAreaView style={{ flex: 1 }}>
                {loading ? <ActivityIndicator size="large" color="#008080" /> :
                    <FlatList
                        style={styles.recipes}
                        data={recipes}
                        renderItem={({ item }) => (
                            <View style={styles.recipe}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: `${item.recipe.image}`,
                                    }}
                                />
                                <View style={{ padding: 20, flexDirection: 'row' }}>
                                    <Text style={styles.label}>{item.recipe.label}</Text>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Details', { recipe: item.recipe }) }}>
                                        <Text style={{ marginLeft: 50, fontSize: 20, color: '#008080' }}>Details</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />}
            </SafeAreaView>
        </View>

    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    inputField: {
        height: '120%',
        width: '65%',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 10,
        paddingLeft: 15,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#008080',
        width: '90%',
        alignItems: 'center',
        margin: 15,
        height: 35,
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    label: {
        fontSize: 15,
        width: '60%',
        color: '#008080',
        fontWeight: '700'
    },
    recipe: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        marginBottom: 40
    },
});


export default HomeScreen;