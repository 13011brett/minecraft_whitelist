import React, {createContext} from "react";
import { WithContext as ReactTags } from "react-tag-input";

const TagContext = createContext();

// Specifies which characters should terminate tags input. An array of character codes.
const KeyCodes = {
    comma: 188,
    space: 32,
    enter: 13,
    tab: 9,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.tab, KeyCodes.space];

const InputTag = (test) => {
    const [tags, setTags] = React.useState([]);

    // Method to delete tag from Array
    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    // Method to Add tag into Array
    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };
    return (
        <TagContext.Provider value={tags}>
        <div id="tags">
            <ReactTags
                handleInputFocus={e => test = tags}
                handleInputBlur={e => test = tags}
                handleInputChange={e => console.log(tags)}
                inline={false}
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                inputFieldPosition="bottom"
                autocomplete
                allowDragDrop={false}
                placeholder="Please enter a Players Name"
            />
        </div>
        </TagContext.Provider>
    );
};

export default InputTag;