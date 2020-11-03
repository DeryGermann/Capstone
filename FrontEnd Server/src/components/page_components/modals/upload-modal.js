import React, { Component } from 'react';

class UploadModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            new_image: "",
            new_name: "",
            new_tags: "",
            imagePreview: "placeholder_image.png",
            refresh: false
        }

        this.submitData = this.submitData.bind(this);
        this.showImagePreview = this.showImagePreview.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
    }

    showImagePreview = (evt) => {
        let fileReader = new FileReader();
        let blob_image;
        let saveable_image;

        this.setState(
            { imagePreview: URL.createObjectURL(evt.target.files[0]) }, async () => {
                blob_image = await fetch(this.state.imagePreview)
                .then(res => res.blob());

                fileReader.readAsDataURL(blob_image);

                fileReader.onloadend = () => {
                    saveable_image = fileReader.result

                    this.setState({
                        new_image : blob_image
                    });
                };
            }
        );
    }
    onNameChange = (evt) => {
        this.setState({
            new_name : evt.target.value
        });
    }
    onTagChange = (evt) => {
        this.setState({
            new_tags : evt.target.value
        });
    }
    
    submitData = (evt) => {
        console.log(this.state.new_image)
        if (this.state.new_name !== "" && this.state.new_image !== "") {
            fetch(`http://localhost:3001/puzzles?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                {
                    method: "POST",
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded', 
                    }),
                    body: `account_id=${this.props.accountId}&personal_puzzle.name=${this.state.new_name}&personal_puzzle.tags=${this.state.new_tags}&personal_puzzle.image=${this.state.new_image}`
                }
            ).then(res => console.log(res.json()))
            .then(this.setState({ refresh : true }));
        } else {
            console.log('missing content');
        }
    }

    render() {
        const showHideClassName = this.props.show ? 
        "upload-modal upload-display-block" : "upload-modal upload-display-none";
      
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <span className='close-button topright' 
                    onClick={this.props.handleClose.bind(this)}>&times;</span>
                    <form id='upload-form'>
                        <div id='form-image'>
                            <label>Image</label>
                            <img src={this.state.imagePreview} alt='No Image Uploaded Yet'/>
                            <input type='file' name='image' accept='image/*'
                            onChange={this.showImagePreview}/>
                        </div>
                        <div id='form-content'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' id='name'
                            value={this.state.new_name}
                            onChange={this.onNameChange}/>
    
                            <label htmlFor='tags'>Image Tags</label>
                            <input type='text' name='tags' id='tags'
                            value={this.state.new_tags}
                            onChange={this.onTagChange}/>
                            <div style={{display: 'inline-block'}}>
                                <p style={{fontSize: '10pt'}}>
                                    Example: "cute sleepy dog nighttime"
                                </p>
                                <p style={{color: 'red'}}>DISCLAIMER:</p> 
                                <p style={{fontSize: '10pt'}}>
                                    <em>
                                        <strong>Image Tags</strong> are a way for 
                                        friends/other users to easily find related 
                                        images.
                                    </em>
                                    <br/>
                                    <em>
                                        <strong>Images</strong> need to be ".PNG" or ".JPG" or ".JPEG" to
                                        upload.
                                    </em>
                                </p>
                            </div>
    
                            <br />
    
                            <div className='button'
                            onClick={this.submitData}>
                                Submit
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
  };

export default UploadModal;