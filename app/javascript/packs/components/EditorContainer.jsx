import {EditorState,convertToRaw,ContentState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import React from "react";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
export default class EditorContainer extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        editorState: this.initEditorState(this.props.body),
        stateSaver: this.props.stateSaver
      };
      this.onEditorStateChange = this.onEditorStateChange.bind(this);
      this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    }

    initEditorState(body){
        if(body){
            const blocksFromHtml = htmlToDraft(body);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            return EditorState.createWithContent(contentState);
        }
        return EditorState.createEmpty();
    }
    onEditorStateChange(editorState){
      this.state.stateSaver(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      this.setState({
        ...this.state,
        editorState,
      });
    };
  
    uploadImageCallBack(file) {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.cloudinary.com/v1_1/doawjnttx/image/upload');
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'ls7xtoul');
            data.append('cloud_name','doawjnttx')
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              resolve({data:{link: response.url}});
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
      }
    render(){
      const { editorState } = this.state;
      return <div className='editor'>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}    
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    }
  }