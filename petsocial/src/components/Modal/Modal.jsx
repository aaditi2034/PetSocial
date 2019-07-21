import React from 'react';
import Dropzone from 'react-dropzone';

const Modal = (props) => {
    const {
        handleChangeFunc,
        onDropFunc,
        submitUploadPostFunc,
        closePopUpFunc
    } = props;

    return (
        <div className="popup_sec" id="pop_forgt">
            <div className="clos_btn">
                <img src="./img/clos.png" alt='Not loaded' id="clos_pop" onClick={closePopUpFunc} />
            </div>
            <div className="pop_hdr">
                Upload Post
            </div>
            <div className="man_contnt">
                <ul>
                    <li>
                        Category <select
                            type='select'
                            name='category'
                            onChange={handleChangeFunc} >
                            <option>Select Category</option>
                            {
                            this.state.categories.length > 0 ?
                                this.state.categories.map((item, index) => {
                                return <option key={index}>{item.categeory}</option>
                                })
                            : null
                            }
                        </select>
                    </li><br/>
                    <li style={{ borderStyle: 'dotted', padding: '30px' }}>
                        <Dropzone onDrop={this.onDrop} accept='image/*' name='filename'>
                            {({getRootProps, getInputProps, isDragActive}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
                            </div>
                            )}
                        </Dropzone>
                    </li><br/>
                    <li>
                        Description <input
                            type='text'
                            name='description'
                            value={this.state.uploadDetails.description}
                            placeholder='Enter descripton for selected image'
                            onChange={this.handleChange} />
                    </li>
                </ul>
                <input type="submit" onClick={this.submitUploadPost} defaultValue="Ok" />
            </div>
        </div>
    );
};

export default Modal;
