import React from "react";
import { Editor } from "react-draft-wysiwyg";

import { makeStyles } from '@material-ui/core/styles';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Block } from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import useRichTextEditor from "./useRichTextEditor";

const RichTextEditor = ({blogData, rawData, setRawData}) => {
  const classes = useStyles();
  const {editorState, imageUploadCallBack, updateTextDescription, createMarkup} = useRichTextEditor(blogData, rawData, setRawData)
  
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={updateTextDescription}
        wrapperStyle={{background:"white", minHeight:"50vh", border:"1px solid black", width:"100%"}}
        editorStyle={{padding:"0px 10px", wordWrap:"break-word", width:"100%"}}
        uploadCallback={imageUploadCallBack}
        toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
                className: undefined,
                component: undefined,
                popupClassName: undefined,
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: imageUploadCallBack,
                previewImage: true,
                alt: { present: true, mandatory: true },
                defaultSize: {
                  height: 'auto',
                  width: 'auto',
                },
              },
        }}
      />
      <h3>Preview</h3>
      <div className={classes.container} dangerouslySetInnerHTML={createMarkup(rawData)}>
      </div>
    </div>
  );
};



const useStyles = makeStyles((theme) => ({
  imageStyles: {
    textAlign:"center",
    margin:"auto",
    color:"red",
    background:"blue !important"
  },

  container:{
    background:"white", minHeight:"50vh", border:"1px solid black", width:"100%",
    '& > img':{
      textAlign:"center",
      background:"red",
      // display:'block',
      // margin:"auto",
    }
  }
}));

export default RichTextEditor;

/*
framework:
import {home, about} from '@TDM/Screens'
route component = {home}
route component = {about}

Screens:
import {section1, section2, section3} from '@TDM/sections;
import {ComponentCustom} from '@TDM/components;
<View>
<Section1/>
<Section2/>
<Section3/>
<ComponentCustom props/>
</View>

compnents:
import {component1, component2, component3} from '@TDM/components;
<View>
<View style={{marginLeft:50}}>
  <component1/>
</View>
<component2/>
<component3/>
</View>

data={
  title: "",
  description: "",
  keywords: "",
  canonical/slug: "",
  html: [file],
  banner:"",
  date:"",
  descriptionLong:"",
}

api.themagnit.com/blogs?latest=true&limit=3
api.themagnit.com/blogs?trending=true&limit=9&page=2

totalResults: 52

5x9 = 45
6x9 = 54



api.themagnit.com/v1/blogs/{canonical}
*/
