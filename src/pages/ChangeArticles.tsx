import React, { useEffect, useState } from "react";
import TextInput from '../components/TextInput';
import TextAreaInput from '../components/TextAreaInput';
import '../styles/ChangeArticles.css';
import ArticleData from "../Data/ArticleData";
import { create_article_success_msg } from "../components/messages";

function ChangeArticles() {

    const [articleTitle, setArticleTitle] = useState<string>('');
    const [titleAlert, setTitleAlert] = useState<string>('');

    const [articleSummary, setArticleSummary] = useState<string>('');
    const [summaryAlert, setSummaryAlert] = useState<string>('');

    const [articleDate, setArticleDate] = useState<string>('');
    const [dateAlert, setDateAlert] = useState<string>('');

    const [articlePublisher, setArticlePublisher] = useState<string>('');
    const [publisherAlert, setPublisherAlert] = useState<string>('');

    const [alertString, setAlertString] = useState<string>('');
    const [dataToPost, setDataToPost] = useState<ArticleData | null>(null);
    const [successString, setSuccessString] = useState<string>('');
  
    const handleInputChange = (
      setInputValue: React.Dispatch<React.SetStateAction<string>>, 
      setAlertValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
      return (value: string) => {
        setInputValue(value);
        if (value.trim() === '') {
          setAlertValue('*Required');
        } else {
          setAlertValue('');
        }
      }
    }
  
    const checkValue = (value: string, setAlertValue: React.Dispatch<React.SetStateAction<string>>) => {
      if ( value.trim() === '' ) {
        setAlertValue('*Required');
      } else {
        setAlertValue('');
      }
    }

    const handleClick = () => {
      checkValue(articleTitle, setTitleAlert);
      checkValue(articleSummary, setSummaryAlert);
      checkValue(articlePublisher, setPublisherAlert);
      checkValue(articleDate, setDateAlert);

      if ( articleTitle.trim() === '' 
          ||  articleSummary.trim() === '' 
          || articlePublisher.trim() === '' 
          || articleDate === '' ) {

        setSuccessString('');
        setAlertString('Please fill in all fields!');

      } else {
        
        // call api with values before clearing the values
        setDataToPost({
          "title": articleTitle.trim(),
          "summary": articleSummary,
          "publisher": articlePublisher.trim(),
          "date": articleDate
        });

        setArticleTitle('');
        setArticleSummary('');
        setArticleDate('');
        setArticlePublisher('');
      }
    }

    useEffect(() => {
      if (!dataToPost) {
        return;
      }

      fetch('http://localhost:5223/api/articles', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPost)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setDataToPost(null);
        return response.text();
      })
      .then((text) => {
        const body = JSON.parse(text);


        if (body.Message !== create_article_success_msg) {
          setAlertString(body.Message);
          setSuccessString('');
          throw new Error(`Error: ${body.Message}`);
        }
        setAlertString('');
        setSuccessString(body.Message);
        
      })
      .catch((error) => console.error('Error adding article:', error));
    })
    
  
    return (
      <div className="App-background App">
        <header className="App-header">
          Add News Article
        </header>

        <div className="Article-Form">
          <table>
            <tbody>
              <tr>
                <td>
                  <text>Article Title:</text>
                  <small className="Alert">{titleAlert}</small><br/>
                  <TextInput
                    textinput={articleTitle}
                    onChange={handleInputChange(setArticleTitle, setTitleAlert)}
                    placeholder=""
                    className='short-text-input'
                  />
                </td>
                <td rowSpan={3}>
                  <text>Article Summary:</text>
                  <small className="Alert">{summaryAlert}</small><br/>
                  <TextAreaInput
                    textinput={articleSummary}
                    onChange={handleInputChange(setArticleSummary, setSummaryAlert)}
                    placeholder=""
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <text>Date Published:</text>
                  <small className="Alert">{dateAlert}</small><br/>
                  <TextInput
                    textinput={articleDate}
                    onChange={handleInputChange(setArticleDate, setDateAlert)}
                    placeholder=""
                    type="date"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <text>Article Publisher:</text>
                  <small className="Alert">{publisherAlert}</small><br/>
                  <TextInput
                    textinput={articlePublisher}
                    onChange={handleInputChange(setArticlePublisher, setPublisherAlert)}
                    placeholder=""
                    className='short-text-input'
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleClick}>Submit</button>

          <text className="Alert">{alertString}</text>
          <text className="Notification">{successString}</text>
        </div>
      </div>
    );
}

export default ChangeArticles;