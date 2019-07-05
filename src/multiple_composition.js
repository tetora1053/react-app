import React from 'react';

export default function App() {
    return (
        <SplitPane 
            left={<Title />}
            right={<Content />}
        />
    );
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function Title() {
    return (
        <h1>
            welcome to my app!
        </h1>
    );
}

function Content() {
    return (
        <div>
            my app content here.
        </div>
    );
}