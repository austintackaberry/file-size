import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fileName: " No file chosen",
      file: '',
      size: ''
    }
    this.handleBrowseClick = this.handleBrowseClick.bind(this);
    this.handleChosenFile = this.handleChosenFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBrowseClick() {
    this.inputElement.click();
  }

  handleChosenFile() {
    this.setState({fileName:this.inputElement.files[0].name});
    this.setState({file: this.inputElement.files[0]});
  }

  handleSubmit(event) {
    event.preventDefault();
    var sendFile = new FormData()
    sendFile.append("file",this.state.file);

    fetch('/upload', {
      method: 'POST',
      body: sendFile
    }).then(
      res => res.json()
    ).then(data => {
      if (data.size < 1000) {
        this.setState({size: Math.round(data.size*10)/10 + " bytes"})
      }
      else if (data.size < 1000*1000) {
        this.setState({size: Math.round(data.size/1000*10)/10 + " kB"})
      }
      else if (data.size < 1000*1000*1000) {
        this.setState({size: Math.round(data.size/1000/1000*10)/10 + " MB"})
      }
      else if (data.size < 1000*1000*1000*1000) {
        this.setState({size: Math.round(data.size/1000/1000/1000*10)/10 + " GB"})
      }
    }
  )}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">File Metadata Microservice</h1>
          <p>Upload your sexy file right here</p>
          <form onSubmit={this.handleSubmit}>
            <input ref={input => this.inputElement = input} onChange={this.handleChosenFile} type="file" id="img-upload" />
            <input type="button" id="browse" value="Choose File" onClick={this.handleBrowseClick} />
            <p id="fileName">{this.state.fileName} </p>
            <button id="submit" >Submit</button>
          </form>
          <p>{this.state.size}</p>
        </header>
      </div>
    );
  }
}

export default App;
