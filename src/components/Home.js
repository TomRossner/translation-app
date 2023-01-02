import React, { useEffect, useState } from 'react';
import Button from './Button';
import {IoPlay} from "react-icons/io5";
import {RxReset} from "react-icons/rx";
import {BsTranslate} from "react-icons/bs";
import axios from "axios";
import {API_KEY} from "../APIKEY";

const Home = () => {
    const [text, setText] = useState("");
    const [voices, setVoices] = useState(window.speechSynthesis.getVoices());
    const [voice, setVoice] = useState(null);
    const [error, setError] = useState("");
    const [language, setLanguage] = useState("");
    const [previewTranslation, setPreviewTranslation] = useState("");

    const handleChange = ({target: {value}}) => {
        setText(value);
    };
    const handleSelect = ({target: {value}}) => {
        setVoice(voices.find((voice) => voice.name === value));
    };
    const resetText = () => {
        setText("");
        setError("");
        setPreviewTranslation("");
    };

    const translate = async () => {
        const showTranslation = await getTranslation();
        setPreviewTranslation(showTranslation);
        return showTranslation;
    }

    const getTranslation = async () => {
        try {
            const options = {
                method: 'POST',
                url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
                params: {
                  'to': language.split("-")[0],
                  'api-version': '3.0',
                  profanityAction: 'NoAction',
                  textType: 'plain'
                },
                headers: {
                  'content-type': 'application/json',
                  'X-RapidAPI-Key': API_KEY,
                  'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
                },
                data: [{"Text":`${text}`}]
              };
              
            const {data} = await axios.request(options);
            const {text: translatedText} = data[0].translations[0];
            return translatedText;
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const play = async () => {
        if (!text) return setError("Cannot say nothing");
        else {
            try {
                const speechText = await getTranslation();
                const speech = new SpeechSynthesisUtterance(speechText);
                speech.lang = voice.lang;
                speech.voice = voice;
                speechSynthesis.speak(speech);
            } catch (error) {
                console.log(error.response.data)
            }
        };
    }

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        loadVoices();
    }, [])

    useEffect(() => {
        if (!voices.length) return;
        const loadVoice = () => setVoice(voices[0]);
        loadVoice();
    }, [voices])

    useEffect(() => {
        if (!voice) return;
        const loadLanguage = () => setLanguage(voice.lang);
        loadLanguage();
    }, [voice])

  return (
    <div className='container'>
        <h1>Text to Speech</h1>
        <div className='content'>
            {!text && error && <p className='error'>{error}</p>}
            {para && <p>{para}</p>}
            <div className='text-areas-container'>
                <textarea onChange={handleChange} value={text}/>
                <textarea readOnly disabled value={previewTranslation}/>
            </div>
            {voices.length
            ?   <select onChange={handleSelect}>
                    {voices.map((voice) => {
                    return <option key={voice.name} value={voice.name}>{voice.name}</option>})}
                </select>
            : null}
            <div className='buttons-container'>
                <Button type="button" title="Translate" onClick={translate} icon={<BsTranslate className='icon'/>}/>
                <Button type="button" title="Play audio" onClick={play} icon={<IoPlay className='icon'/>}/>
                <Button type="button" title="Reset" onClick={resetText} icon={<RxReset className='icon'/>}/>
            </div>
        </div>
    </div>
  )
}

export default Home;