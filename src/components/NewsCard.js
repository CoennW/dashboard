import React from 'react';
import moment from '../../node_modules/moment';
import Parser from 'rss-parser';
const feed = require('rss-to-json');

class NewsCard extends React.Component {

    /**
     * constructor if needed
     */
    constructor(props) {
        super(props);
        let savedData = JSON.parse(localStorage.getItem('newsData'));
        this.state = {articleNumber: localStorage.getItem('articleNumber')}
        let articleNumber = this.state.articleNumber;

        if(savedData != null && (articleNumber >= savedData.nieuws.items.length - 1 || 
        articleNumber >= savedData.nieuws.items.length - 1 || 
        articleNumber >= savedData.nieuws.items.length - 1)) {            
            this.state = {articleNumber: 0};
            localStorage.setItem('articleNumber', 0);
        }
        this.state.articleNumber++;
    }

    /**
     * Callback when component is loaded
     */
    componentDidMount(){
 
        let savedData = JSON.parse(localStorage.getItem('newsData'));

        if (savedData != null) {
            this.setState({
                rssData: JSON.parse(localStorage.getItem('newsData'))
            });             
        }

        if (localStorage.getItem('newsTimeStamp') === null || moment().diff(new Date(localStorage.getItem('newsTimeStamp')), 'minutes') >= 60) {
            localStorage.setItem('newsTimeStamp', new Date());
            this.getNews();

        } else {
            console.log("News data update over: " + (60 - moment().diff(new Date(localStorage.getItem('newsTimeStamp')), 'minutes')) + ' minuten.');
        }  
    }

    /**
     * Callback when component will be destroyed
     */
    componentWillUnmount() {
       
        localStorage.setItem('articleNumber', this.state.articleNumber);
    }

    getNews = async () => {

        // Maak de localstorage leeg.
        localStorage.removeItem("newsData");
        let newData = {};
       
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
            
            let parser = new Parser({
                customFields:   {
                    item: [
                        ['media:content', 'media', { keepArray: false }]
                    ]
                }
            });
            
            try {
                
            await parser.parseURL(CORS_PROXY + 'https://www.ad.nl/nijmegen/rss.xml', (err, feed) => {
                if (err) throw err;

                newData.nijmegen = feed;
                localStorage.setItem('newsData', JSON.stringify(newData));
            })

            await parser.parseURL(CORS_PROXY + 'https://www.ad.nl/bizar/rss.xml', (err, feed) => {
                if (err) throw err;
                
                newData.bizar = feed;
                localStorage.setItem('newsData', JSON.stringify(newData));
               
            })
            await parser.parseURL(CORS_PROXY + 'https://www.ad.nl/nieuws/rss.xml', (err, feed) => {
                if (err) throw err;
              
                newData.nieuws = feed;
                localStorage.setItem('newsData', JSON.stringify(newData));
                
                this.setState({
                    rssData: newData
                })
            })

            } catch {
                console.log('cant get data');
            }
            

            
    } 

    render() {
        let imgToRender;
        let titleToRender;
        let paragraphToRender; 

        switch(this.props.newsFeed) {
            case 'nieuws':
                imgToRender = this.state.rssData ? this.state.rssData.nieuws.items[this.state.articleNumber].media.$.url : "...";
                titleToRender = this.state.rssData ? this.state.rssData.nieuws.items[this.state.articleNumber].title : "Loading...";
                paragraphToRender = this.state.rssData ? this.state.rssData.nieuws.items[this.state.articleNumber].contentSnippet : "...";
                break;
            case 'bizar':
                imgToRender = this.state.rssData ? this.state.rssData.bizar.items[this.state.articleNumber].media.$.url : "...";
                titleToRender = this.state.rssData ? this.state.rssData.bizar.items[this.state.articleNumber].title : "Loading...";
                paragraphToRender = this.state.rssData ? this.state.rssData.bizar.items[this.state.articleNumber].contentSnippet : "..."; 
                break;
              case 'nijmegen':
                imgToRender = this.state.rssData ? this.state.rssData.nijmegen.items[this.state.articleNumber].media.$.url : "...";
                titleToRender = this.state.rssData ? this.state.rssData.nijmegen.items[this.state.articleNumber].title : "Loading...";
                paragraphToRender = this.state.rssData ? this.state.rssData.nijmegen.items[this.state.articleNumber].contentSnippet : "...";
                break;  
            default:
              // code block
          }
        
        return (
            <div className="col">
                <div className="news-item">
                    <div className="news-image">
                        <img src={imgToRender} alt="header_image"/>
                    </div>
                    <div className="news-description">
                        
                        <div className="news-title">
                            <h2>{titleToRender}</h2>
                            <h2 id="category">{this.props.newsFeed}</h2>
                        </div>
                        <p>{paragraphToRender}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsCard; 