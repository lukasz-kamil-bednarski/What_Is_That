import React from 'react';
import '../PopUpView.css';
import gitLogo from '../../assets/git.jpg';


export const AuthorView = () =>{

    return (
        <div className={"Paragraph-wrapper"}>
            <h1>Author info</h1>
            <p className={"Paragraph"}>
                    I am AGH University of Science and Technology student of Computer Science.
                    I am passionate about IT issues, general programming(including frontend & backend)
                    and Machine-Learning especially Deep Learning and building AI models.
            </p>

            <div className={"Visit-wrapper"}>
                <p> For more info watch my GitHub account to see who I am and what I am doing.</p>
                <a href={"https://github.com/lukasy09"} target={"_blank"}><img className={"Git-logo"} src={gitLogo} height={80} width={80}/></a>
            </div>
        </div>
    )
};



