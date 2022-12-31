import React, { useEffect, useState } from 'react';
import Button from './Button';
import {IoPause, IoPlay} from "react-icons/io5";
import {RxReset} from "react-icons/rx";
import {BsTranslate} from "react-icons/bs";
import axios from "axios";

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
        const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {
              'to': language.substring(0, 2),
              'api-version': '3.0',
              profanityAction: 'NoAction',
              textType: 'plain'
            },
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '3166312f4dmshe264424dac8cb19p11fee3jsn5713145c8876',
              'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            data: [{"Text":`${text}`}]
          };
          
        const {data} = await axios.request(options);
        const {text: translatedText} = data[0].translations[0];
        return translatedText;
    }

    const play = async () => {
        if (!text) return setError("Cannot say nothing");
        else {
            const speechText = await getTranslation();
            const speech = new SpeechSynthesisUtterance(speechText);
            speech.lang = voice.lang;
            speech.voice = voice;
            speechSynthesis.speak(speech);
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

    useEffect(() => {
        if (!text) return;
        translate();
    }, [voice])
  return (
    <div className='container'>
        <h1>Text to Speech</h1>
        <div className='content'>
            {!text && error && <p className='error'>{error}</p>}
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
                <Button type="button" onClick={translate} icon={<BsTranslate className='icon'/>}/>
                <Button type="button" onClick={play} icon={<IoPlay className='icon'/>}/>
                <Button type="button" onClick={resetText} icon={<RxReset className='icon'/>}/>
            </div>
        </div>
    </div>
  )
}

export default Home;