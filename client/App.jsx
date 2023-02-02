import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import { useRecoilState } from "recoil";
import { campaignState, commentState, creatorState, pledgeState } from "./state";
import Faq from './components/Faq';
import Campaign from './components/Campaign';
import Community from './components/Community';
import Updates from './components/Updates';
import Comments from './components/Comment';




const App = () => {
  const [campaign, setCampaign] = useRecoilState(campaignState);
  const [creator, setCreator] = useRecoilState(creatorState);
  const [pledge, setPledge] = useRecoilState(pledgeState)

    useEffect(() => {
        fetch("http://localhost:3000/projects", {
        mode:"cors",
       })
       .then((res) => res.json())
       .then(result => {
       });
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/campaign", {
           mode:"cors",
       })
       .then((res) => res.json())
       .then((result) => {
        setCampaign(result);
       });
    }, []) 
    
    useEffect(() => {
        fetch("http://localhost:3000/creator", {
           mode:"cors",
       })
       .then((res) => res.json())
       .then(result => {
        setCreator(result)
       });
    }, [])

    useEffect(() => {
      fetch("http://localhost:3000/pledge", {
         mode:"cors",
     })
     .then((res) => res.json())
     .then(result => {
      setPledge(result)
     });
  }, [])

      /*======================================COMMENTS===========================================*/
  const [comments, setComments] = useRecoilState(commentState);

  useEffect(() => {
    fetch("http://localhost:3000/comments", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((comments) => {
        setComments(comments);
      });
  }, []);

  return (
    <>
    <Router>
    <Routes>
        <Route path='/' element={pledge.length !== 0 && campaign.length !== 0 && creator.length !== 0 && <Campaign pledge={pledge} campaign={campaign} creator={creator} />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/updates' element={<Updates />} />
        <Route path='/comments' element={<Comments comments={comments} />} />
        <Route path='/community' element={<Community />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
