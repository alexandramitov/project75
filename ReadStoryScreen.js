import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state={
      search: '',
    }
  }

  updateSearch = (search) => {
    this.setState({search})
  }



  retrieveStories=()=>{
     try {
        var allStories= []
        var stories = db.collection("stories") .get().then((querySnapshot)=> {
           querySnapshot.forEach((doc)=> { 
             // doc.data() is never undefined for query doc snapshots
              allStories.push(doc.data())
               console.log('this are the stories',allStories) })
               this.setState({allStories}) }) } 
               catch (error)
               { console.log(error); } };


  
  searchFilter=()=>{
    var dataSource= [];
    var enteredText = text.split("")
    var text = text.toUpperCase();


    if (enteredText[0].toUpperCase() ==='B'){
      const searches =  await db.collection("stories").where('Author','==',text).get()
      allSearches.docs.map((doc)=>{
        this.setState({
          allSearches:[...this.state.allSearches,doc.data()],
          lastVisibleStory: doc
        })
      })
    }

    else if(enteredText[0].toUpperCase() === 'S'){
      const searches = await db.collection('stories').where('Title','==',text).get()
      allSearches.docs.map((doc)=>{
        this.setState({
          allSearches:[...this.state.allStories,doc.data()],
          lastVisibleSearch: doc
        })
      })
    }
    
  }


  componentDidMount = async ()=>{
    const query = await db.collection("stories").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allSearches: [],
        lastVisibleSearch: doc
      })
    })
  }


    render(){
      const{search} = this.state;

        return(
          <View>

          <ScrollView>
            { this.state.allSearches.map((searches)=>{
              return(
                <View></View>
              )
            })}
            
                <SearchBar
                placeholder= "Type here"
                onChangeText={this.updateSearch}
                value={search}/>
                
            
            <FlatList
            data= {this.state.allSearches}
            renderItem={({item})=>{
              <View>
                  <Text>{searches.allSearches}</Text>
                  <Text>{"Author:" + searches.Author}</Text>
                  <Text>{"Title:" + searches.Title}</Text>
                </View>
            }}
            keyExtractor={(item, index)=> index.toString()}
            />

            
            </ScrollView>

            </View>
                           
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});