import React from 'react';
import './App.css';
import TopHeader from './components/TopHeader';
import WeatherCard from './components/WeatherCard';
import GitHubCard from './components/GitHubCard';
import TableSoccer from './components/TabelSoccer';
import NewsCard from './components/NewsCard';
// import MusicCard from './components/MusicCard';
import VisitorsCard from './components/VisitorsCard';
import SocialMediaCard from './components/SocialMediaCard';

let cardNames = [];
let activeComponents = [];
let activeCards = [];
let currentItem = 0;
let itemsPerPage = 3;
let renderNewsOnly;
let newsIndex; 

class App extends React.Component {

  state = {   
    cards:{
      NewsCard: {
        component: NewsCard,
        active: false,
      },
      WeatherCard: {
        component: WeatherCard,
        active: false,
      },
      SoccerCard: {
        component: TableSoccer,
        active: false,
      },
      GitHubCard: {
        component: GitHubCard,
        active: false,
      },
      VisitorsCard: {
        component: VisitorsCard,
        active: false,
      },
      SocialMediaCard: {
        component: SocialMediaCard,
        active: false,
      }
    },
    animateNow: false,
    animateCards: ""
  };    

  constructor(props) {
    super(props);
    
    cardNames = Object.keys(this.state.cards);
  }

  componentDidMount() {

    this.renderCards();
    this.setState({animateNow: true, animateCards: "animate-in"});
    setTimeout(() => {this.setState({animateNow: false, animateCards: "animate-out"})}, 8000);

    setInterval(() => {
      this.renderCards();
      this.setState({animateNow: true, animateCards: "animate-in"});
      setTimeout(() => {this.setState({animateNow: false, animateCards: "animate-out"})}, 8000);
    }, 10000);
  }

  deactivateCards(cards) {
    activeCards.map(x => {cards[x].active = false; return null;})
    activeComponents = [];
    activeCards = [];
  }

  renderCards() {

    //copy state
    const cards = {...this.state.cards};

    //check of er al components bestaan, zo ja, zet state.active = false en maak array leeg 
    if(activeComponents.length !== 0) {
      this.deactivateCards(cards);
    }

    //zoek drie nieuwe kaarten en zet components en namen in arrays 
    for (let i = 0; i < itemsPerPage; i++) {
      if (currentItem >= (cardNames.length)) {
        currentItem = 0; // Reset first item again
      } 
      
      let item = cardNames[currentItem];
      
      if(renderNewsOnly === true && i === 0) {
        
        let nextCycleItem = currentItem;
        currentItem = newsIndex;

        for (i = 0; i < itemsPerPage; i++) {

          item = cardNames[currentItem];
          activeComponents.push(this.state.cards[item].component);
          activeCards.push(cardNames[currentItem]);
        }  
        
        currentItem = nextCycleItem;
        renderNewsOnly = false;
        return;
      }

      if(item === 'NewsCard') {

        renderNewsOnly = true;
        newsIndex = currentItem;
        currentItem++
        if (currentItem >= (cardNames.length)) {
          currentItem = 0; // Reset first item again
        } 
      
        item = cardNames[currentItem];
        activeComponents.push(this.state.cards[item].component);
        
        //push namen van Cards naar activeCards  
        activeCards.push(cardNames[currentItem]);

        currentItem++

      } else {

        //push components naar array die gebruikt worden 
        activeComponents.push(this.state.cards[item].component);

        //push namen van Cards naar activeCards  
        activeCards.push(cardNames[currentItem]);
        currentItem++;
      }
    } 
    //zet waardes naar true
    activeCards.map(x => {cards[x].active = true; return null;})
    //update state
    this.setState({cards});
  }
  
  render(){
    let setStateTimeout = 2500;
    return (
      <React.Fragment>
        <div id="loader"></div>
        <div className="start-up-animation">
          <TopHeader animateNow={this.state.animateNow}/>
          <div className="content-center"> 
            <div className={"content-section " + this.state.animateCards} id="content-section">
                { //check active cards 
                
                  activeComponents.map((component, index) => {
                    let ComponentToRender = component;
                    
                    let newsFeed = ['nieuws', 'bizar', 'nijmegen'];
                    if(component === NewsCard) {
                      setStateTimeout =+ 500;
                      return < ComponentToRender key={index} newsFeed={newsFeed[index]} stateTimeOut={setStateTimeout} /> 
                      
                    } else {
                      return < ComponentToRender key={index} />;
                    }                   
                  })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
}

export default App;


















// renderCards = () => {
  //   let newState = { ...this.state };
  //   let components = Object.keys(this.state).map(cards => {

  //     console.log(this.state.WeatherCard.component);           
      
      
  //     return this.state[cards].component

  //   })    
    
  //   this.setState(({
       
  //     WeatherCard: {
  //         ...newState.WeatherCard,
  //         active: true
  //     },
  //     SoccerCard: {
  //       id: 2,
  //       component: '<WeatherCard 2/>',
  //       active: false,
  //       time: 90000
  //     },
  //     GitHubCard: {
  //       id: 3,
  //       component: '<WeatherCard 3/>',
  //       active: false,
  //       time: 80000
  //     },
  //     NewsCard: {
  //       id: 4,
  //       component: '<WeatherCard 4/>',
  //       active: false,
  //       time: 10000
  //     }
      
  //   }))
    

  //   return components

  // }